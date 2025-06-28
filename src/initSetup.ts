import {ref} from "vue";
import type {Edge, Node} from "@vue-flow/core";

export const initNodes = ref<Node[]>([
    {
        id: '1', type: 'custom', label: 'Node 1', position: {x: 100, y: 100}, data: {
            outputs: [
                {id: 'int-1', label: 'Output 1'},
            ],
        },
    },
    {
        id: '2', type: 'custom', label: 'Node 2', position: {x: 400, y: 100}, data: {
            outputs: [
                {id: 'int-1', label: 'Output 1'},
                {id: 'int-2', label: 'Output 2'},
            ]
        },
    },
    {
        id: '3', type: 'custom', label: 'Node 3', position: {x: 100, y: 300}, data: {
            inputs: [
                {id: 'int-1', label: 'Input 1'},
                {id: 'int-2', label: 'Input 2'},
            ],
            outputs: [
                {id: 'int-1', label: 'Output 1'},
                {id: 'int-2', label: 'Output 2'},
                {id: 'int-3', label: 'Output 3'},
            ]
        },
    },
    {
        id: '4', type: 'custom', label: 'Node 3', position: {x: 400, y: 300}, data: {
            inputs: [
                {id: 'int-1', label: 'Input 1'},
                {id: 'int-2', label: 'Input 2'},
            ],
            outputs: [
                {id: 'int-1', label: 'Output 1'},
                {id: 'int-2', label: 'Output 2'},
            ]
        },
    },
])

export const initEdges = ref<Edge[]>([])