<script lang="ts" setup>
import {type Component, markRaw} from 'vue'
import {Controls} from '@vue-flow/controls'
import {MiniMap} from '@vue-flow/minimap'
import {
  Connection,
  ConnectionMode,
  useVueFlow,
  VueFlow
} from '@vue-flow/core'
import {NodeToolbar} from '@vue-flow/node-toolbar' // Import NodeToolbar
import DropzoneBackground from './DropzoneBackground.vue'
import Sidebar from './SideBar.vue'
import useDragAndDrop from './useDnD'
import TypedNode from './TypedNode.vue'
import TypedEdge from './TypedEdge.vue'
import {initEdges, initNodes} from "~/initSetup";

const { onConnect, addEdges, edges } = useVueFlow({
  defaultEdgeOptions: {type: "custom", updatable: true},
  nodeTypes: {
    custom: markRaw(TypedNode) as Component
  },
  edgeTypes: { custom: markRaw(TypedEdge) as Component }
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
onConnect((params: Connection) => {
  const sourceType = params.sourceHandle?.split("-")[1];
  const targetType = params.targetHandle?.split("-")[1];

  if (sourceType !== targetType) {
    console.warn('Handle type mismatch (' + sourceType + ' vs ' + targetType + ')');
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
    <VueFlow :nodes="initNodes" :edges="initEdges" :connection-mode="ConnectionMode.Strict" @dragover="onDragOver" @dragleave="onDragLeave" fit-view-on-init center>
      <MiniMap />
      <Controls />

      <DropzoneBackground :style="{
        backgroundColor: isDragOver ? '#e7f3ff' : 'transparent',
        transition: 'background-color 0.2s ease',
      }">
        <p v-if="isDragOver">Drop here</p>
      </DropzoneBackground>
    </VueFlow>
    <Sidebar />
  </div>
</template>
