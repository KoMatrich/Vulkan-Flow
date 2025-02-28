import {Handle, type Node, type NodeProps, Position} from "@xyflow/react";
import React from "react";
import {useNodeClickHandlers} from "../handlers/onClick.ts";

export type InputNode = Node<{ label?: string }, "input">;

export function InputNode({ data }: NodeProps<InputNode>) {
    const {handleClick, handleDoubleClick} = useNodeClickHandlers(
        () => console.log("Input Node Single Clicked:", data.label),
        () => console.log("Input Node Double Clicked:", data.label)
    );

    return (
        <div onClick={handleClick} onDoubleClick={handleDoubleClick} className="border p-2 rounded bg-gray-100">
            <div>Input</div>
            {data.label && <div>{data.label}</div>}
            <Handle type="source" position={Position.Bottom}/>
        </div>
    );
}
