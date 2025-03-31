<script lang="ts" setup>
import {Handle, type HandleConnectableFunc, Position} from '@vue-flow/core'

const singleConnection: HandleConnectableFunc = (node, connectedEdges) => {
  // only allow connections if the node has less than x connections
  return connectedEdges.length < 1
}
</script>

<template>
  <div class="custom-node">
    <Handle type="target" class="target-handle" :position="Position.Top" :connectable="singleConnection" :id="'type-1'" />
    <Handle type="source" class="source-handle" :position="Position.Bottom" :id="'type-1'" />
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

.target-handle {
  width: 5px;
  height: 5px;
  border: 1px solid black;
}

.source-handle {
  width: 6px;
  height: 6px;
}
</style>
