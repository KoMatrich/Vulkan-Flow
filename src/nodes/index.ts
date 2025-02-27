import type { NodeTypes } from "@xyflow/react";

import { PositionLoggerNode } from "./PositionLoggerNode";
import { AppNode } from "./types";
import { InputNode } from "./InputNode";
import { OutputNode } from "./OutputNode";
import { ProcessingNode } from "./ProcessingNode";

export const initialNodes: AppNode[] = [
  { id: "a", type: "input", position: { x: 0, y: 0 }, data: { label: "wire" } },
  {
    id: "b",
    type: "position-logger",
    position: { x: -100, y: 100 },
    data: { label: "drag me!" },
  },
  {
    id: "c",
    type: "processing",
    position: { x: 100, y: 100 },
    data: { label: "test" },
  },
  {
    id: "d",
    type: "output",
    position: { x: 0, y: 200 },
    data: { label: "test" },
  },
];

export const nodeTypes = {
  "position-logger": PositionLoggerNode,
  input: InputNode,
  processing: ProcessingNode,
  output: OutputNode,
} satisfies NodeTypes;
