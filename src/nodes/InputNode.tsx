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

            {/* Source Handle (Output - Filled) */}
            <Handle
                id={data.outputType}
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
