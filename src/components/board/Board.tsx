// prettier-ignore
import { DataContext } from "@/store/data-context";
import { DataType } from "@/types/data";
import {
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  MouseSensor,
  PointerSensor,
  TouchSensor,
  closestCorners,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
// prettier-ignore
import { SortableContext, horizontalListSortingStrategy, sortableKeyboardCoordinates,} from "@dnd-kit/sortable";
import { useContext } from "react";
import Column from "./Column";

export default function Board({ currentBoard }: { currentBoard: DataType }) {
  const { dragColumn, dragLinkIntoSameColumn } = useContext(DataContext);

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 150,
        tolerance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragEnd(event: DragEndEvent) {
    if (!currentBoard) return;
    const { active, over } = event;
    if (!over || !active || !currentBoard) return;
    if (active?.id === over?.id) return;

    // Executes code when user drags column, not task
    if (currentBoard.columns.some((col) => col.id === active.id)) {
      dragColumn(event, currentBoard.id);
    } else {
      dragLinkIntoSameColumn(event, currentBoard);
    }
  }

  return (
    <DndContext
      id="fdjoiioqpgh90-ujls913jki-fwejoil123"
      sensors={sensors}
      onDragEnd={handleDragEnd}
      collisionDetection={closestCorners}
    >
      <SortableContext
        items={currentBoard.columns}
        strategy={horizontalListSortingStrategy}
      >
        {currentBoard.columns.map((column, index) => (
          <Column
            currentBoard={currentBoard}
            column={column}
            index={index}
            key={column.id}
          />
        ))}
      </SortableContext>
    </DndContext>
  );
}
