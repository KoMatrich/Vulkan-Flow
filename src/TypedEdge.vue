<script lang="ts" setup>
import {computed} from 'vue'
import type {EdgeProps} from '@vue-flow/core'
import {BaseEdge, getBezierPath} from '@vue-flow/core'

const props = defineProps<EdgeProps>()

const path = computed(() => getBezierPath(props))
</script>

<script lang="ts">
export default {
  inheritAttrs: false
}
</script>

<template>
  <BaseEdge :path="path[0]" class="animated-edge"/>
</template>

<style>
.animated-edge {
  stroke-dasharray: 5;
  animation: dash 1s linear infinite;
}

@keyframes dash {
  to {
    stroke-dashoffset: -10;
  }
}
</style>