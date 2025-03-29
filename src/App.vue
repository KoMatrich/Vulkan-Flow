<script lang="ts" setup>
import { h, ref } from 'vue'
import { Controls } from '@vue-flow/controls'
import { MiniMap } from '@vue-flow/minimap'
import { VueFlow, useVueFlow, type Node, type Edge, Position } from '@vue-flow/core'
import DropzoneBackground from './DropzoneBackground.vue'
import Sidebar from './SideBar.vue'
import useDragAndDrop from './useDnD'
import ToolbarNode from './ToolbarNode.vue'

const { onConnect, addEdges } = useVueFlow()

const nodes = ref<Node[]>([
  { id: '1', type: 'input', label: 'Node 1', position: { x: 250, y: 5 }, data: { toolbarPosition: Position.Top, toolbarVisible: true } },
  { id: '2', type: 'output', label: 'Node 2', position: { x: 100, y: 100 }, data: { toolbarPosition: Position.Top } },
  { id: '3', type: 'custom', label: 'Node 3', position: { x: 400, y: 100 }, data: { toolbarPosition: Position.Top } },
])

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

      <template #node-menu="props">
        <ToolbarNode :id="props.id" :data="props.data" />
      </template>
    </VueFlow>
    <Sidebar />
  </div>
</template>