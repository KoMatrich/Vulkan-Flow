import { Node, Edge, Connection, addEdge } from "@xyflow/react";

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

    setEdges((eds) => addEdge(params, eds));
};