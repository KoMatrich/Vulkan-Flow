import { Handle, Position, type NodeProps, type Node } from "@xyflow/react";

export type InputNode = Node<{ label?: string }, "input">;

export function InputNode({ data }: NodeProps<InputNode>) {
  return (
    <div>
      <div>Input</div>
      {data.label && <div>{data.label}</div>}
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}
