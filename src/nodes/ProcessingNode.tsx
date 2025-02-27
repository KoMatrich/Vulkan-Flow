import { Handle, Position, type NodeProps, type Node } from "@xyflow/react";

export type ProcessingNode = Node<{ label?: string }, "processing">;

export function ProcessingNode({ data }: NodeProps<ProcessingNode>) {
  return (
    <div className="react-flow__node-default">
      <div>Processing</div>
      {data.label && <div>{data.label}</div>}
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}
