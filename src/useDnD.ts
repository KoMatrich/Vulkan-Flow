import { useVueFlow } from '@vue-flow/core';
import { Ref, ref, watch } from 'vue';

let id = 0;

/**
 * Generates a unique id.
 *
 * @returns {string} A unique id.
 */
function getId(): string {
  return `dndnode_${id++}`;
}

/**
 * State for drag and drop functionality.
 */
interface DragAndDropState {
  draggedType: Ref<string | null>;
  isDragOver: Ref<boolean>;
  isDragging: Ref<boolean>;
}

const state: DragAndDropState = {
  /**
   * The type of the node being dragged.
   */
  draggedType: ref(null),
  isDragOver: ref(false),
  isDragging: ref(false),
};

export default function useDragAndDrop(): {
  draggedType: Ref<string | null>;
  isDragOver: Ref<boolean>;
  isDragging: Ref<boolean>;
  onDragStart: (event: DragEvent, type: string) => void;
  onDragLeave: () => void;
  onDragOver: (event: DragEvent) => void;
  onDrop: (event: DragEvent) => void;
} {
  const { draggedType, isDragOver, isDragging } = state;

  const { addNodes, screenToFlowCoordinate, onNodesInitialized, updateNode } = useVueFlow();

  watch(isDragging, (dragging) => {
    document.body.style.userSelect = dragging ? 'none' : '';
  });

  /**
   * Handles the drag start event.
   *
   * @param {DragEvent} event
   * @param {string} type
   */
  function onDragStart(event: DragEvent, type: string): void {
    if (event.dataTransfer) {
      event.dataTransfer.setData('application/vueflow', type);
      event.dataTransfer.effectAllowed = 'move';
    }

    draggedType.value = type;
    isDragging.value = true;

    document.addEventListener('drop', onDragEnd);
  }

  /**
   * Handles the drag over event.
   *
   * @param {DragEvent} event
   */
  function onDragOver(event: DragEvent): void {
    event.preventDefault();

    if (draggedType.value) {
      isDragOver.value = true;

      if (event.dataTransfer) {
        event.dataTransfer.dropEffect = 'move';
      }
    }
  }

  /**
   * Handles the drag leave event.
   */
  function onDragLeave(): void {
    isDragOver.value = false;
  }

  /**
   * Handles the drag end event.
   */
  function onDragEnd(): void {
    isDragging.value = false;
    isDragOver.value = false;
    draggedType.value = null;
    document.removeEventListener('drop', onDragEnd);
  }

  /**
   * Handles the drop event.
   *
   * @param {DragEvent} event
   */
  function onDrop(event: DragEvent): void {
    const position = screenToFlowCoordinate({
      x: event.clientX,
      y: event.clientY,
    });

    const nodeId = getId();

    const newNode = {
      id: nodeId,
      type: draggedType.value ?? undefined,
      position,
      data: { label: nodeId },
    };

    /**
     * Align node position after drop, so it's centered to the mouse
     *
     * We can hook into events even in a callback, and we can remove the event listener after it's been called.
     */
    const { off } = onNodesInitialized(() => {
      updateNode(nodeId, (node) => ({
        position: { x: node.position.x - node.dimensions.width / 2, y: node.position.y - node.dimensions.height / 2 },
      }));

      off();
    });

    addNodes(newNode);
  }

  return {
    draggedType,
    isDragOver,
    isDragging,
    onDragStart,
    onDragLeave,
    onDragOver,
    onDrop,
  };
}
