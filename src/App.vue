<script lang="ts" setup>
import { Controls } from '@vue-flow/controls'
import type { Connection } from '@vue-flow/core'
import { ConnectionMode, useVueFlow, VueFlow } from '@vue-flow/core'
import { MiniMap } from '@vue-flow/minimap'
import { type Component, markRaw, ref } from 'vue'
import { initEdges, initNodes } from '~/initSetup'
import DropzoneBackground from './DropzoneBackground.vue'
import Sidebar from './SideBar.vue'
import TypedEdge from './TypedEdge.vue'
import TypedNode from './TypedNode.vue'
import useDragAndDrop from './useDnD'

// Error handling state
const errorMessage = ref<string | null>(null)
const showError = ref(false)

function displayError(message: string) {
  errorMessage.value = message
  showError.value = true
  // Auto-hide error after 5 seconds
  setTimeout(() => {
    showError.value = false
  }, 5000)
}

function hideError() {
  showError.value = false
  errorMessage.value = null
}

const { onConnect, addEdges, edges } = useVueFlow({
  defaultEdgeOptions: { type: 'custom', updatable: true },
  nodeTypes: {
    custom: markRaw(TypedNode) as Component,
  },
  edgeTypes: { custom: markRaw(TypedEdge) as Component },
})

const { onDragOver, onDrop, onDragLeave, isDragOver } = useDragAndDrop()

/**
 * Checks if connecting two nodes would create a loop in the graph
 * @param sourceNodeId - The source node ID
 * @param targetNodeId - The target node ID
 * @returns true if a loop would be created, false otherwise
 */
function wouldCreateLoop(sourceNodeId: string, targetNodeId: string): boolean {
  // console.log(`Checking connection from ${sourceNodeId} to ${targetNodeId}`)

  if (sourceNodeId === targetNodeId) {
    displayError('Cannot connect a node to itself')
    return true
  }

  const visited: Set<string> = new Set()

  function dfs(currentNodeId: string, targetNodeId: string, path: string[] = []): boolean {
    const newPath = [...path, currentNodeId]

    if (currentNodeId === targetNodeId) {
      displayError(`Loop detected: ${newPath.join(' → ')}`)
      return true
    }

    if (visited.has(currentNodeId)) {
      // console.log(`Node ${currentNodeId} already visited, skipping`)
      return false
    }
    visited.add(currentNodeId)

    const outgoingEdges = edges.value.filter(edge => edge.source === currentNodeId)
    // console.log(`Outgoing edges from node ${currentNodeId}:`, outgoingEdges)

    for (const edge of outgoingEdges) {
      if (dfs(edge.target, targetNodeId, newPath)) {
        return true
      }
    }

    return false
  }

  return dfs(targetNodeId, sourceNodeId)
}

// Handle new connections with validation
onConnect((params: Connection) => {
  const sourceType = params.sourceHandle?.split('-')[1]
  const targetType = params.targetHandle?.split('-')[1]

  if (sourceType !== targetType) {
    displayError(`Handle type mismatch: ${sourceType} cannot connect to ${targetType}`)
    return
  }

  const sourceNodeId = params.source
  const targetNodeId = params.target

  if (wouldCreateLoop(sourceNodeId, targetNodeId)) {
    console.warn('Connection would create a loop')
    return
  }

  addEdges([params])
})
</script>

<template>
  <div class="dnd-flow" @drop="onDrop">
    <!-- Error notification -->
    <div v-if="showError" class="error-notification" @click="hideError">
      <div class="error-content">
        <span class="error-icon">⚠️</span>
        <span class="error-message">{{ errorMessage }}</span>
        <button class="error-close" @click="hideError">
          ×
        </button>
      </div>
    </div>

    <VueFlow
      :connection-mode="ConnectionMode.Strict"
      :edges="initEdges"
      :nodes="initNodes"
      center
      fit-view-on-init
      @dragleave="onDragLeave"
      @dragover="onDragOver"
    >
      <MiniMap />
      <Controls />

      <DropzoneBackground
        :style="{
          backgroundColor: isDragOver ? '#e7f3ff' : 'transparent',
          transition: 'background-color 0.2s ease',
        }"
      >
        <p v-if="isDragOver">
          Drop here
        </p>
      </DropzoneBackground>
    </VueFlow>
    <Sidebar />
  </div>
</template>

<style scoped>
.error-notification {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1000;
  max-width: 400px;
  background: #fee;
  border: 1px solid #fcc;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  animation: slideIn 0.3s ease-out;
}

.error-content {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  gap: 8px;
}

.error-icon {
  font-size: 18px;
  flex-shrink: 0;
}

.error-message {
  flex: 1;
  color: #d63031;
  font-weight: 500;
  font-size: 14px;
  line-height: 1.4;
}

.error-close {
  background: none;
  border: none;
  font-size: 20px;
  color: #d63031;
  cursor: pointer;
  padding: 0;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  transition: background-color 0.2s;
}

.error-close:hover {
  background-color: rgba(214, 48, 49, 0.1);
}

@keyframes slideIn {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}
</style>
