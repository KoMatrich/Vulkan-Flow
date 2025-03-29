<script lang="ts" setup>
import { h, ref, markRaw, type Component } from 'vue'
import { Controls } from '@vue-flow/controls'
import { MiniMap } from '@vue-flow/minimap'
import { VueFlow, useVueFlow, type Node, type Edge, Position } from '@vue-flow/core'
import { NodeToolbar } from '@vue-flow/node-toolbar' // Import NodeToolbar
import DropzoneBackground from './DropzoneBackground.vue'
import Sidebar from './SideBar.vue'
import useDragAndDrop from './useDnD'
import CustomNode from './CustomNode.vue'
import CustomEdge from './CustomEdge.vue'

const { onConnect, addEdges, onNodeClick, setNodes } = useVueFlow({
  defaultEdgeOptions: { type: 'custom' },
  nodeTypes: { 
    custom: markRaw(CustomNode) as Component
  },
  edgeTypes: { custom: markRaw(CustomEdge) as Component }
})

const nodes = ref<Node[]>([
  { id: '1', type: 'input', label: 'Node 1', position: { x: 250, y: 5 }, data: { toolbarVisible: true } },
  { id: '2', type: 'default', label: 'Node 2', position: { x: 100, y: 100 }, data: { toolbarVisible: true } },
  { id: '3', type: 'custom', label: 'Node 3', position: { x: 400, y: 100 }, data: { toolbarVisible: true } },
])

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

const edges = ref<Edge[]>([
  { id: 'e1-2', source: '1', target: '2', type: 'custom' },
  { id: 'e1-3', source: '1', target: '3', animated: true },
])

const { onDragOver, onDrop, onDragLeave, isDragOver } = useDragAndDrop()

onConnect((params) => {
  addEdges([params])
})
</script>

<template>
  <div class="dnd-flow" @drop="onDrop">
    <VueFlow :nodes="nodes" :edges="edges" @dragover="onDragOver" @dragleave="onDragLeave" fit-view-on-init center>
      <MiniMap />
      <Controls />

      <DropzoneBackground :style="{
        backgroundColor: isDragOver ? '#e7f3ff' : 'transparent',
        transition: 'background-color 0.2s ease',
      }">
        <p v-if="isDragOver">Drop here</p>
      </DropzoneBackground>
      
      <!-- Add NodeToolbar directly to each node -->
      <template v-for="node in nodes" :key="node.id">
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

.vue-flow__node-menu {
  padding: 16px 24px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}

.vue-flow__node-menu.selected {
  box-shadow: 0 0 0 2px #2563eb;
}
</style>
