<script lang="ts" setup>
import {Handle, Position} from '@vue-flow/core'

type HandleData = {
  id: string
  label: string
  type: string
}

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  inputs: {
    type: Array as () => HandleData[],
    default: () => [
      {id: 'int-1', label: 'Input 1'},
      {id: 'int-2', label: 'Input 2'},
    ],
  },
  outputs: {
    type: Array as () => HandleData[],
    default: () => [
      {id: 'int-1', label: 'Output 1'},
      {id: 'int-2', label: 'Output 2'},
    ],
  },
})
</script>

<template>
  <div class="custom-node">
    <div class="custom-node__header">
      <div class="handles-container">
        <template v-for="(input) in inputs" :key="input.id">
          <div class="handle-wrapper">
            <Handle
                :id="`${input.type}-${input.id}`"
                type="source"
                :position="Position.Top"
                :connectable="'single'"
                style="position: relative; left: 50%;"
            />
            <span class="handle-label">{{ input.label }}</span>
          </div>
        </template>
      </div>
    </div>

    <p>Typed node {{ id }}</p>

    <div class="custom-node__footer">
      <div class="handles-container">
        <template v-for="(output) in outputs" :key="output.id">
          <div class="handle-wrapper">
            <span class="handle-label">{{ output.label }}</span>
            <Handle
                :id="`${output.type}-${output.id}`"
                type="target"
                :position="Position.Bottom"
                style="position: relative; left: 50%;"
            />
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<style>
.custom-node {
  min-width: 100px;
  gap: 4px;
  padding-left: 4px;
  padding-right: 4px;
  background: white;
  border: 1px solid black;
  border-radius: 4px;
}

.custom-node__header {
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.handles-container {
  position: relative;
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.handle-wrapper {
  margin-left: 4px;
  margin-right: 4px;
}

.handle-label {
  display: block;
  font-size: 12px;
  text-align: center;
}
</style>
