import React, { useCallback } from "react";
import {
    Background,
    Connection,
    Controls,
    MiniMap,
    ReactFlow,
    useEdgesState,
    useNodesState,
    Edge,
    Node,
    Panel
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import ELK from 'elkjs';
import { initialNodes, nodeTypes } from "./nodes";
import { edgeTypes, initialEdges } from "./edges";
import { onNodeContextMenuHandler } from "./handlers/onNodeContextMenuHandler.ts";
import { onEdgeContextMenuHandler } from "./handlers/onEdgeContextMenuHandler.ts";
import { onConnectHandler } from "./handlers/onConnectHandler.ts";
import { updateEdgeStyles } from "./edges/updateEdgeStyles.ts";
import ConnectionLine from "./edges/connectionLine.tsx";

export default function App() {
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

    const onNodeContext = (event: React.MouseEvent, node: Node) => 
        onNodeContextMenuHandler(event, node, setNodes);
    const onEdgeContextMenu = (event: React.MouseEvent, edge: Edge) => 
        onEdgeContextMenuHandler(event, edge, setEdges);
    const onConnect = (connection: Connection) => 
        onConnectHandler(connection, nodes, setEdges);

    const updatedEdges = updateEdgeStyles(edges, nodes);

    // Save and load state functions
    const saveState = useCallback(() => {
        const state = { nodes, edges };
        localStorage.setItem("appState", JSON.stringify(state));
        alert("State saved!");
    }, [nodes, edges]);

    const loadState = useCallback(() => {
        const stateString = localStorage.getItem("appState");
        if (stateString) {
            const state = JSON.parse(stateString);
            setNodes(state.nodes);
            setEdges(state.edges);
            alert("State loaded!");
        } else {
            alert("No saved state found.");
        }
    }, [setNodes, setEdges]);

    // Function to auto layout using ELKjs
    const autoLayout = useCallback(() => {
        const elkInstance = new ELK();
        // Prepare graph structure for ELK
        const graph = {
            id: 'root',
            layoutOptions: { 'elk.algorithm': 'layered' },
            children: nodes.map(node => ({
                id: node.id,
                // Use node width and height or set defaults if not available
                width: node.width || 200,
                height: node.height || 50,
            })),
            edges: edges.map(edge => ({
                id: edge.id,
                sources: [edge.source],
                targets: [edge.target],
            }))
        };

        elkInstance.layout(graph)
            .then(layout => {
                // Update nodes with positions computed by ELK
                const newNodes = nodes.map(node => {
                    const layoutNode = layout.children.find(n => n.id === node.id);
                    if (layoutNode) {
                        return {
                            ...node,
                            position: { x: layoutNode.x, y: layoutNode.y },
                        };
                    }
                    return node;
                });
                setNodes(newNodes);
            })
            .catch(err => console.error("ELK layout error:", err));
    }, [nodes, edges, setNodes]);

    autoLayout();

    return (
        <div style={{ width: "100%", height: "100%" }}>
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
                <Background />
                <MiniMap />
                <Controls />
                <Panel position="top-left" style={{ padding: "5px" }}>
                    <button 
                        className="react-flow__controls-button"
                        onClick={saveState}
                    >
                        Save
                    </button>
                    <button 
                        className="react-flow__controls-button" 
                        onClick={loadState}
                    >
                        Load
                    </button>
                    <button 
                        className="react-flow__controls-button" 
                        onClick={autoLayout}
                    >
                        Auto Layout
                    </button>
                </Panel>
            </ReactFlow>
        </div>
    );
}
