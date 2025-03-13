import {Handle, type Node, type NodeProps, Position} from "@xyflow/react";
import {Type2Color} from "../type2Colors.ts";

export type OutputNode = Node<{ inputType?: string }, "output">;

export function OutputNode({data}: NodeProps<OutputNode>) {
    const inputColor = Type2Color(data.inputType);

    return (
        <div>
            <div>Output</div>
            
            <Handle
                id={data.inputType}
                type="target"
                position={Position.Top}
                style={{
                    backgroundColor: "transparent",
                    border: `1px solid ${inputColor}`, // Outlined handle for input
                }}
            />

            <video width="100%" height="100%">
                <source src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"/>
                Your browser does not support the video tag.
            </video>
        </div>
    );
}
