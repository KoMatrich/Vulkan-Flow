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
  label: {
    type: String,
    default: 'Typed Node',
  },
  data: {
    type: Object,
    default: () => ({
      inputs: {
        type: Array as () => HandleData[],
      },
      outputs: {
        type: Array as () => HandleData[],
      }
    }),
  },
})
</script>

<template>
  <div class="custom-node">
    <div class="custom-node__header">
      <div class="handles-container">
        <template v-for="(input) in data.inputs" :key="input.id">
          <div class="handle-wrapper">
            <Handle
                :id="`${input.type}-${input.id}`"
                type="target"
                :position="Position.Top"
                :connectable="'single'"
                style="position: relative; left: 50%;"
            />
            <span class="handle-label">{{ input.label }}</span>
          </div>
        </template>
      </div>
    </div>

    <p>{{ label }}</p>
    <p>Typed node {{ id }}</p>

    <div class="custom-node__footer">
      <div class="handles-container">
        <template v-for="(output) in data.outputs" :key="output.id">
          <div class="handle-wrapper">
            <span class="handle-label">{{ output.label }}</span>
            <Handle
                :id="`${output.type}-${output.id}`"
                type="source"
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
  margin-left: 8px;
  margin-right: 8px;
}

.handle-label {
  display: block;
  font-size: 6px;
  text-align: center;
}
</style>
