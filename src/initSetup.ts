import type { Edge, Node } from '@vue-flow/core'
import { ref } from 'vue'

export const initNodes = ref<Node[]>([
  {
    id: '1',
    type: 'custom',
    label: 'Node 1',
    position: { x: 100, y: 100 },
    data: {
      outputs: [
        { id: 'int-1', label: 'Output 1', type: 'int' },
      ],
    },
  },
  {
    id: '2',
    type: 'custom',
    label: 'Node 2',
    position: { x: 400, y: 100 },
    data: {
      outputs: [
        { id: 'int-1', label: 'Output 1', type: 'int' },
        { id: 'int-2', label: 'Output 2', type: 'int' },
      ],
    },
  },
  {
    id: '3',
    type: 'custom',
    label: 'Node 3',
    position: { x: 100, y: 300 },
    data: {
      inputs: [
        { id: 'int-1', label: 'Input 1', type: 'int' },
        { id: 'int-2', label: 'Input 2', type: 'int' },
      ],
      outputs: [
        { id: 'int-1', label: 'Output 1', type: 'int' },
        { id: 'int-2', label: 'Output 2', type: 'int' },
        { id: 'int-3', label: 'Output 3', type: 'int' },
      ],
    },
  },
  {
    id: '4',
    type: 'custom',
    label: 'Node 4',
    position: { x: 400, y: 300 },
    data: {
      inputs: [
        { id: 'int-1', label: 'Input 1', type: 'int' },
        { id: 'int-2', label: 'Input 2', type: 'int' },
      ],
      outputs: [
        { id: 'int-1', label: 'Output 1', type: 'int' },
        { id: 'int-2', label: 'Output 2', type: 'int' },
      ],
    },
  },
])

export const initEdges = ref<Edge[]>([])
