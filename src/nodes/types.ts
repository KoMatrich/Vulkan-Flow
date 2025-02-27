import { OutputNode } from './OutputNode';
import { PositionLoggerNode } from './PositionLoggerNode';
import { InputNode } from './InputNode';
import { ProcessingNode } from './ProcessingNode';

export type AppNode = PositionLoggerNode | OutputNode | InputNode | ProcessingNode;
