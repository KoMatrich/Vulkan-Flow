import {Handle, type Node, type NodeProps, Position} from "@xyflow/react";
import {useNodeClickHandlers} from "../handlers/onClick.ts";
import {Type2Color} from "../type2Colors.ts";

export type InputNode = Node<{ outputType?: string }, "input">;

export function InputNode({data}: NodeProps<InputNode>) {
    const {handleClick, handleDoubleClick} = useNodeClickHandlers(
        () => console.log("Input Node Single Clicked"),
        () => console.log("Input Node Double Clicked")
    );

    const outputColor = Type2Color(data.outputType);

    return (
        <div
            onClick={handleClick}
            onDoubleClick={handleDoubleClick}
        >
            <div>Input</div>

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
