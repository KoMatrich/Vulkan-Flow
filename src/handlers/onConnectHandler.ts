import {addEdge, Connection, Edge, Node} from "@xyflow/react";
import React from "react";
import {Type2Color} from "../type2Colors.ts";

export const onConnectHandler = (
    params: Connection,
    nodes: Node[],
    setEdges: React.Dispatch<React.SetStateAction<Edge[]>>
) => {
    const sourceNode = nodes.find((node) => node.id === params.source);
    const targetNode = nodes.find((node) => node.id === params.target);

    if (!sourceNode || !targetNode) {
        alert('Invalid connection! Missing source or target node');
        return;
    }

    const outputType = sourceNode.data['outputType'];
    const inputType = targetNode.data['inputType'];

    if (!outputType || !inputType) {
        alert('Invalid connection! Missing outputType or inputType');
        return;
    }

    if (outputType !== inputType) {
        alert('Invalid connection! Output type does not match input type');
        return;
    }

    // set edge color based on type
    params['animated'] = true;
    params['type'] = outputType;
    params['style'] = {stroke: Type2Color(outputType)};

    setEdges((eds) => addEdge(params, eds));
};