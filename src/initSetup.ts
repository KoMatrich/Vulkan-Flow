import {ref} from "vue";
import type {Edge, Node} from "@vue-flow/core";

export const initNodes = ref<Node[]>([
    {id: '1', type: 'input', label: 'Node 1', position: {x: 250, y: 5}, data: {toolbarVisible: true}},
    {id: '2', type: 'default', label: 'Node 2', position: {x: 100, y: 100}, data: {toolbarVisible: true}},
    {id: '3', type: 'custom', label: 'Node 3', position: {x: 400, y: 100}, data: {toolbarVisible: true}},
    {id: '4', type: 'custom', label: 'Node 3', position: {x: 400, y: 200}, data: {toolbarVisible: true}},
])
export const initEdges = ref<Edge[]>([
    {id: 'e1-2', source: '1', target: '2', type: 'custom'},
    {id: 'e1-3', source: '1', target: '3', animated: true},
])