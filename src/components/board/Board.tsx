// prettier-ignore
import { DataContext } from "@/store/data-context";
import { ColumnType, DataType, TaskType } from "@/types/data";
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  closestCorners,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
// prettier-ignore
import { SortableContext, horizontalListSortingStrategy, sortableKeyboardCoordinates,} from "@dnd-kit/sortable";
import { useContext, useState } from "react";
import { Column } from "./Column";
import { createPortal } from "react-dom";
import TaskItem from "./TaskItem";

export default function Board({ currentBoard }: { currentBoard: DataType }) {
  const { dragColumn, dragTask } = useContext(DataContext);

  const [activeTask, setActiveTask] = useState<TaskType | null>(null);
  const [activeColumn, setActiveColumn] = useState<ColumnType | null>(null);

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

  function handleDragStart(event: DragStartEvent) {
    if (event.active.data.current?.type === "task") {
      setActiveTask(event.active.data.current?.task);
    } else if (event.active.data.current?.type === "column") {
      setActiveColumn(event.active.data.current?.column);
    }
  }

  function handleDragOver(event: DragOverEvent) {
    const { over, active } = event;
    if (!over || !active || active?.id === over?.id) return;

    dragTask(event, currentBoard);
  }

  function handleDragEnd(event: DragEndEvent) {
    setActiveColumn(null);
    setActiveTask(null);

    const { active, over } = event;
    if (!over || !active || !currentBoard) return;

    if (active?.id === over?.id) return;

    // Returns if the active item is a task, i handle that case on drag over
    if (active.data.current?.type !== "column") return;

    dragColumn(event, currentBoard.id);
  }

  console.log("board");

  return (
    <DndContext
      id="fdjoiioqpgh90-ujls913jki-fwejoil123"
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
      collisionDetection={closestCorners}
    >
      <SortableContext
        items={currentBoard.columns}
        strategy={horizontalListSortingStrategy}
      >
        {currentBoard.columns.map((column) => (
          <Column currentBoard={currentBoard} column={column} key={column.id} />
        ))}
      </SortableContext>
      {/* Checks if we aran't on the server and then adds drag overlay if user is dragging either column or task item */}
      {typeof window !== "undefined" &&
        createPortal(
          <DragOverlay>
            {activeTask && (
              <TaskItem task={activeTask} handleOpen={() => null} />
            )}
            {activeColumn && (
              <Column currentBoard={currentBoard} column={activeColumn} />
            )}
          </DragOverlay>,
          document.body
        )}
    </DndContext>
  );
}
