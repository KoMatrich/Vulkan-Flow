import React from "react";
import {
    Background,
    Connection,
    Controls,
    Edge,
    MiniMap,
    Node,
    ReactFlow,
    useEdgesState,
    useNodesState,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import {initialNodes, nodeTypes} from "./nodes";
import {edgeTypes, initialEdges} from "./edges";
import {onNodeContextMenuHandler} from "./handlers/onNodeContextMenuHandler.ts";
import {onEdgeContextMenuHandler} from "./handlers/onEdgeContextMenuHandler.ts";
import {onConnectHandler} from "./handlers/onConnectHandler.ts";
import {updateEdgeStyles} from "./edges/updateEdgeStyles.ts";
import ConnectionLine from "./edges/connectionLine.tsx";

export default function App() {
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

    const onNodeContext = (event: React.MouseEvent, node: Node) => onNodeContextMenuHandler(event, node, setNodes);
    const onEdgeContextMenu = (event: React.MouseEvent, edge: Edge) => onEdgeContextMenuHandler(event, edge, setEdges);
    const onConnect = (params: Connection) => onConnectHandler(params, nodes, setEdges);

    const updatedEdges = updateEdgeStyles(edges, nodes);

    return (
        <ReactFlow
            nodes={nodes}
            nodeTypes={nodeTypes}
            onNodesChange={onNodesChange}
            onNodeContextMenu={onNodeContext}

            edges={updatedEdges}
            edgeTypes={edgeTypes}
            onEdgesChange={onEdgesChange}
            onEdgeContextMenu={onEdgeContextMenu}
            connectionLineComponent={ConnectionLine}
            onConnect={onConnect}
            fitView
        >
            <Background/>
            <MiniMap/>
            <Controls/>
        </ReactFlow>
    );
}
