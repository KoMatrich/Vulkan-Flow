import {Handle, type Node, type NodeProps, Position} from "@xyflow/react";

export type OutputNode = Node<{ label?: string }, "output">;

export function OutputNode({data}: NodeProps<OutputNode>) {
    data['inputType'] = 'number';
    return (
        <div>
            <div>Output</div>
            {data.label && <div>{data.label}</div>}
            <Handle type="target" position={Position.Top}/>
        </div>
    );
}
