import {Edge, Node} from "@xyflow/react";
import {Type2Color} from "../type2Colors.ts";

export function updateEdgeStyles(edges: Edge[], nodes: Node[]): Edge[] {
    return edges.map(edge => {
        const sourceNode = nodes.find(node => node.id === edge.source);
        const targetNode = nodes.find(node => node.id === edge.target);

        if (sourceNode && targetNode) {
            const outputType = sourceNode.data['outputType'] as string;
            const inputType = targetNode.data['inputType'] as string;

            if (outputType && inputType && outputType === inputType) {
                edge.animated = true;
                edge.type = outputType;
                edge.style = {stroke: Type2Color(outputType)};
            }
        }

        return edge;
    });
}