import {Handle, type Node, type NodeProps, Position} from "@xyflow/react";
import {Type2Color} from "../type2Colors.ts";

export type ProcessingNode = Node<{ inputType?: string; outputType?: string }, "processing">;

export function ProcessingNode({data}: NodeProps<ProcessingNode>) {
    const inputColor = Type2Color(data.inputType);
    const outputColor = Type2Color(data.outputType);

    return (
        <div
            className="react-flow__node-default"
        >
            <div>Processing</div>

            {/* Target Handle (Input - Outlined) */}
            <Handle
                type="target"
                position={Position.Top}
                style={{
                    backgroundColor: "transparent",
                    border: `1px solid ${inputColor}`, // Outlined handle for input
                }}
            />

            {/* Source Handle (Output - Filled) */}
            <Handle
                type="source"
                position={Position.Bottom}
                style={{
                    backgroundColor: outputColor, // Filled handle for output
                    border: "none"
                }}
            />
        </div>
    );
}
