import {Node} from "@xyflow/react";
import React from "react";

export const onNodeContextMenuHandler = (
    event: React.MouseEvent,
    node: Node,
    setNodes: React.Dispatch<React.SetStateAction<Node[]>>
) => {
    event.preventDefault();
    if (window.confirm("Delete this node?")) {
        setNodes((nds) => nds.filter((n) => n.id !== node.id));
    }
};