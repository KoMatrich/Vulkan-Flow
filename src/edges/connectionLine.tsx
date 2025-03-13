import {useConnection} from "@xyflow/react";
import {Type2Color} from "../type2Colors.ts";

export default ({fromX, fromY, toX, toY}) => {
    const {fromHandle: connection} = useConnection();

    const type = connection?.id as string;
    const color = Type2Color(type);

    const ioType = connection?.type as string;
    const fromSource = ioType === "source";
    const fromTarget = ioType === "target";

    const controlPointX1 = fromX;
    const controlPointX2 = toX;
    const controlPointY = (fromY + toY) / 2;

    return (
        <g>
            <path
                fill="none"
                stroke={color}
                strokeWidth={1.5}
                d={`M${fromX},${fromY} C ${controlPointX1} ${controlPointY}, ${controlPointX2} ${controlPointY}, ${toX},${toY}`}
            />
            {fromSource && <circle cx={toX} cy={toY} r={3.5} fill={color}/>}
            {fromTarget && <circle cx={toX} cy={toY} r={3.5} fill="none" stroke={color} strokeWidth={1}/>}
        </g>
    );
};
