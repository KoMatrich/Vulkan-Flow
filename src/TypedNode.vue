<script lang="ts" setup>
import { Handle, Position } from '@vue-flow/core'
import { ref } from 'vue'
</script>

<template>
  <div class="custom-node">
    <Handle type="target" :position="Position.Top" :id="'input-type-1'" />
    <Handle type="source" :position="Position.Bottom" :id="'output-type-1'" />
    <p>Custom node</p>
  </div>
</template>

<style>
.custom-node {
  min-width: 100px;
  gap: 4px;
  padding: 8px;
  background: white;
  border: 1px solid black;
  border-radius: 4px;
}
</style>
