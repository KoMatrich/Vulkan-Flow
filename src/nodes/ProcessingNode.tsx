import {Handle, type Node, type NodeProps, Position} from "@xyflow/react";

export type ProcessingNode = Node<{ label?: string }, "processing">;

export function ProcessingNode({data}: NodeProps<ProcessingNode>) {
    data['inputType'] = 'string';
    data['outputType'] = 'number';
    return (
        <div className="react-flow__node-default">
            <div>Processing</div>
            {data.label && <div>{data.label}</div>}
            <Handle type="target" position={Position.Top}/>
            <Handle type="source" position={Position.Bottom}/>
        </div>
    );
}
