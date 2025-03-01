import { Node, Edge, Connection, addEdge } from "@xyflow/react";

export const onEdgeContextMenuHandler = (
    event: React.MouseEvent,
    edge: Edge,
    setEdges: React.Dispatch<React.SetStateAction<Edge[]>>
) => {
    event.preventDefault();
    if (window.confirm("Delete this connection?")) {
        setEdges((eds) => eds.filter((e) => e.id !== edge.id));
    }
};