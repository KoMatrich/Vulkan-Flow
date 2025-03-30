<script lang="ts" setup>
import {type Component, markRaw} from 'vue'
import {Controls} from '@vue-flow/controls'
import {MiniMap} from '@vue-flow/minimap'
import {Position, useVueFlow, VueFlow} from '@vue-flow/core'
import {NodeToolbar} from '@vue-flow/node-toolbar' // Import NodeToolbar
import DropzoneBackground from './DropzoneBackground.vue'
import Sidebar from './SideBar.vue'
import useDragAndDrop from './useDnD'
import TypedNode from './TypedNode.vue'
import TypedEdge from './TypedEdge.vue'
import {initEdges, initNodes} from "~/initSetup";

const { onConnect, addEdges, onNodeClick, setNodes, edges, nodes } = useVueFlow({
  defaultEdgeOptions: { type: 'custom' },
  nodeTypes: { 
    custom: markRaw(TypedNode) as Component
  },
  edgeTypes: { custom: markRaw(TypedEdge) as Component }
})

// Handle node click to show toolbar
onNodeClick(({ node }) => {
  console.log('Node clicked:', node.id)
  setNodes((nds) =>
    nds.map((n) => {
      if (n.id === node.id) {
        n.data = { ...n.data, toolbarVisible: true }
      } else {
        n.data = { ...n.data, toolbarVisible: false }
      }
      return n
    })
  )
})

const { onDragOver, onDrop, onDragLeave, isDragOver } = useDragAndDrop()

function wouldCreateLoop(sourceNodeId: string, targetNodeId: string) {
  console.log(`Going from ${sourceNodeId} to ${targetNodeId}`);

  if (sourceNodeId === targetNodeId) {
    console.log('Source and target are the same, loop detected');
    return true;
  }

  const visited: Set<string> = new Set();

  function dfs(currentNodeId: string, targetNodeId: string): boolean {
    if (currentNodeId === targetNodeId) {
      console.log(`Reached target node ${targetNodeId}, loop detected`);
      return true;
    }

    if (visited.has(currentNodeId)) {
      console.log(`Node ${currentNodeId} already visited, skipping`);
      return false;
    }
    visited.add(currentNodeId);

    const outgoingEdges = edges.value.filter(edge => edge.source === currentNodeId);
    console.log(`Outgoing edges from node ${currentNodeId}:`, outgoingEdges);

    for (const edge of outgoingEdges) {
      if (dfs(edge.target, targetNodeId)) {
        return true;
      }
    }

    return false;
  }

  return dfs(targetNodeId, sourceNodeId);
}

// Example usage in your onConnect handler
onConnect((params) => {
  const sourceType = params.sourceHandle?.split('-')[2];
  const targetType = params.targetHandle?.split('-')[2];

  if (sourceType !== targetType) {
    console.warn('Cannot connect different types');
    return;
  }

  const sourceNodeId = params.source;
  const targetNodeId = params.target;

  if (wouldCreateLoop(sourceNodeId, targetNodeId)) {
    console.warn('Cannot create a loop in the graph');
    return;
  }

  addEdges([params]);
});
</script>

<template>
  <div class="dnd-flow" @drop="onDrop">
    <VueFlow :nodes="initNodes" :edges="initEdges" @dragover="onDragOver" @dragleave="onDragLeave" fit-view-on-init center>
      <MiniMap />
      <Controls />

      <DropzoneBackground :style="{
        backgroundColor: isDragOver ? '#e7f3ff' : 'transparent',
        transition: 'background-color 0.2s ease',
      }">
        <p v-if="isDragOver">Drop here</p>
      </DropzoneBackground>
      
      <!-- Add NodeToolbar directly to each node -->
      <template v-for="node in initNodes" :key="node.id">
        <NodeToolbar v-if="node.data.toolbarVisible" :node-id="node.id" :position="Position.Top">
          <div class="vue-flow__node-toolbar">
            <button>👎</button>
            <button>✋</button>
            <button>👍</button>
          </div>
        </NodeToolbar>
      </template>
    </VueFlow>
    <Sidebar />
  </div>
</template>

<style>
.vue-flow__node-toolbar {
  display: flex;
  gap: 0.5rem;
  align-items: center;
  background-color: #2d3748;
  padding: 8px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}

.vue-flow__node-toolbar button {
  background: #4a5568;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  cursor: pointer;
}

.vue-flow__node-toolbar button.selected {
  background: #2563eb;
}

.vue-flow__node-toolbar button:hover {
  background: #2563eb;
}

</style>
