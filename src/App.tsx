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
    Panel,
    ControlButton
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
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

    const onNodeContext = (event: React.MouseEvent, node: Node) => onNodeContextMenuHandler(event, node, setNodes);
    const onEdgeContextMenu = (event: React.MouseEvent, edge: Edge) => onEdgeContextMenuHandler(event, edge, setEdges);
    const onConnect = (connection: Connection) => onConnectHandler(connection, nodes, setEdges);

    const updatedEdges = updateEdgeStyles(edges, nodes);

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
                </Panel>
            </ReactFlow>
        </div>
    );
}