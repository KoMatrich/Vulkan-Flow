import {Handle, type Node, type NodeProps, Position} from "@xyflow/react";
import {Type2Color} from "../type2Colors.ts";

export type OutputNode = Node<{ inputType?: string }, "output">;

export function OutputNode({data}: NodeProps<OutputNode>) {
    const inputColor = Type2Color(data.inputType);

    return (
        <div>
            <div>Output</div>

            {/* Target Handle (Input - Outlined) */}
            <Handle
                id={data.inputType}
                type="target"
                position={Position.Top}
                style={{
                    backgroundColor: "transparent",
                    border: `1px solid ${inputColor}`, // Outlined handle for input
                }}
            />
        </div>
    );
}
