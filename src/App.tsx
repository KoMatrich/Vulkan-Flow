import React from "react";
import {
    addEdge,
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
import { initialNodes, nodeTypes } from "./nodes";
import { edgeTypes, initialEdges } from "./edges";
import {onNodeContextMenuHandler} from "./handlers/onNodeContextMenuHandler.ts";
import {onEdgeContextMenuHandler} from "./handlers/onEdgeContextMenuHandler.ts";
import {onConnectHandler} from "./handlers/onConnectHandler.ts";

export default function App() {
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

    const onNodeContext = (event, node) => onNodeContextMenuHandler(event, node, setNodes);
    const onEdgeContextMenu = (event, edge) => onEdgeContextMenuHandler(event, edge, setEdges);
    const onConnect = (params: Connection) => onConnectHandler(params, nodes, setEdges);

    return (
        <ReactFlow
            nodes={nodes}
            nodeTypes={nodeTypes}
            onNodesChange={onNodesChange}
            onNodeContextMenu={onNodeContext}
            edges={edges}
            edgeTypes={edgeTypes}
            onEdgesChange={onEdgesChange}
            onEdgeContextMenu={onEdgeContextMenu}
            onConnect={onConnect}
            fitView
        >
            <Background />
            <MiniMap />
            <Controls />
        </ReactFlow>
    );
}
