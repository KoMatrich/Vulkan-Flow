import {Handle, type Node, type NodeProps, NodeToolbar, Position} from "@xyflow/react";
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

            <Handle
                id={data.inputType}
                type="target"
                position={Position.Left}
                style={{
                    backgroundColor: "transparent",
                    border: `1px solid ${inputColor}`, // Outlined handle for input
                }}
            />
            <Handle
                id={data.outputType}
                type="source"
                position={Position.Right}
                style={{
                    backgroundColor: outputColor, // Filled handle for output
                    border: "none"
                }}
            />

            <video width="100%" height="100%">
                <source src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"/>
                Your browser does not support the video tag.
            </video>
        </div>
    );
}
