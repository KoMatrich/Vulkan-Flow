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
} from '@xyflow/react';

import '@xyflow/react/dist/style.css';
import React from "react";
import {initialNodes, nodeTypes} from "./nodes";
import {edgeTypes, initialEdges} from "./edges";

export default function App() {
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

    const onNodeContextMenu = (event: React.MouseEvent, node: Node) => {
        event.preventDefault(); // Prevent the default browser context menu
        // Confirm and remove node
        if (window.confirm("Delete this node?")) {
            setNodes((nds) => nds.filter((n) => n.id !== node.id));
        }
    }

    const onEdgeContextMenu = (event: React.MouseEvent, edge: Edge) => {
        event.preventDefault(); // Prevent the default browser context menu
        // Confirm and remove edge
        if (window.confirm("Delete this connection?")) {
            setEdges((eds) => eds.filter((e) => e.id !== edge.id));
        }
    };

    const onConnect = (params: Connection) => {
        const sourceNode = nodes.find((node) => node.id === params.source);
        const targetNode = nodes.find((node) => node.id === params.target);
        if (!sourceNode || !targetNode) {
            alert('Invalid connection! Missing source or target node');
            return;
        }

        // check if data contains outputType key
        const outputType = sourceNode.data['outputType'];
        const inputType = targetNode.data['inputType'];
        if (!outputType || !inputType) {
            alert('Invalid connection! Missing outputType or inputType');
            return
        }

        // Check if the output type of the source matches the input type of the target
        if (outputType !== inputType) {
            alert('Invalid connection! Output type does not match input type');
            return;
        }

        // If types match, allow the edge creation
        setEdges((eds) => addEdge(params, eds));
    };

    return (
        <ReactFlow
            nodes={nodes}
            nodeTypes={nodeTypes}
            onNodesChange={onNodesChange}
            onNodeContextMenu={onNodeContextMenu}
            edges={edges}
            edgeTypes={edgeTypes}
            onEdgesChange={onEdgesChange}
            onEdgeContextMenu={onEdgeContextMenu}
            onConnect={onConnect}
            fitView
        >
            <Background/>
            <MiniMap/>
            <Controls/>
        </ReactFlow>
    );
}
