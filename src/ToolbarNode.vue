<script setup>
import { Handle, Position, useVueFlow } from '@vue-flow/core'
import { NodeToolbar } from '@vue-flow/node-toolbar'
import { ref } from 'vue'

const props = defineProps(['id', 'data'])

const actions = ['👎', '✋', '👍']

const { updateNodeData } = useVueFlow()

// Make sure toolbar is visible when the component is rendered
const isVisible = ref(true)
</script>

<template>
  <NodeToolbar :is-visible="isVisible" :position="data.toolbarPosition || Position.Top">
    <button
      v-for="action of actions"
      :key="action"
      type="button"
      :class="{ selected: action === data.action }"
      @click="updateNodeData(props.id, { action })"
    >
      {{ action }}
    </button>
  </NodeToolbar>

  <div>
    {{ data.label }}
  </div>

  <Handle type="target" :position="Position.Left" />
  <Handle type="source" :position="Position.Right" />
</template>
