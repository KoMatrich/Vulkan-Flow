import type {Node, NodeTypes} from "@xyflow/react";
import {InputNode} from "./InputNode";
import {OutputNode} from "./OutputNode";
import {ProcessingNode} from "./ProcessingNode";

export const initialNodes: Node[] = [
    {
        id: "a", type: "input", position: {x: 0, y: 0},
        data: {
            outputType: "string"
        }
    },
    {
        id: "b",
        type: "processing",
        position: {x: 100, y: 100},
        data: {
            inputType: "string",
            outputType: "number"
        }
    },
    {
        id: "c",
        type: "output",
        position: {x: 0, y: 200},
        data: {inputType: "number"}
    },
];

export const nodeTypes = {
    input: InputNode,
    processing: ProcessingNode,
    output: OutputNode,
} satisfies NodeTypes;
