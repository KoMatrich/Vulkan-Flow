<script lang="ts" setup>
import { useVueFlow } from '@vue-flow/core'
import useDragAndDrop from './useDnD'

const { onDragStart } = useDragAndDrop()

const { nodes, addNodes, dimensions, toObject, fromObject } = useVueFlow()

const flowKey = 'vue-flow--save-restore'

function onSave() {
  localStorage.setItem(flowKey, JSON.stringify(toObject()))
}

function onRestore() {
  const storedFlow = localStorage.getItem(flowKey)
  const flow = storedFlow ? JSON.parse(storedFlow) : null

  if (flow) {
    fromObject(flow)
  }
}

</script>

<template>
  <aside>
    <div class="description">You can drag these nodes to the pane.</div>

    <div class="nodes">
      <div class="vue-flow__node-input" :draggable="true" @dragstart="onDragStart($event, 'input')">Input Node</div>

      <div class="vue-flow__node-default" :draggable="true" @dragstart="onDragStart($event, 'default')">Default Node</div>

      <div class="vue-flow__node-output" :draggable="true" @dragstart="onDragStart($event, 'output')">Output Node</div>
    </div>

    <div class="buttons">
      <button title="save graph" @click="onSave">
        <p>Save</p>
      </button>
      <button title="restore graph" @click="onRestore">
        <p>Restore</p>
      </button>
    </div>
  </aside>
</template>
