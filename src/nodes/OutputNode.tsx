import { Handle, Position, type NodeProps, type Node } from "@xyflow/react";

export type OutputNode = Node<{ label?: string }, "output">;

export function OutputNode({ data }: NodeProps<OutputNode>) {
  return (
    <div>
      <div>Output</div>
      {data.label && <div>{data.label}</div>}
      <Handle type="target" position={Position.Top} />
    </div>
  );
}
