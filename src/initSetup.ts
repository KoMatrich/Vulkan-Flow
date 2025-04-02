import {ref} from "vue";
import type {Edge, Node} from "@vue-flow/core";

export const initNodes = ref<Node[]>([
    {id: '1', type: 'custom', label: 'Node 3', position: {x: 400, y: 100}, data: {toolbarVisible: true}},
    {id: '2', type: 'custom', label: 'Node 3', position: {x: 400, y: 300}, data: {toolbarVisible: true}},
])

export const initEdges = ref<Edge[]>([
])