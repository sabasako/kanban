import { ColumnType, DataType } from "@/types/data";
import { memo, useCallback, useRef, useState } from "react";
import TaskInformation from "./TaskInformation";
import TaskItem from "./TaskItem";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

export const Task = memo(function Task({
  column,
  currentBoard,
  isDragging,
}: {
  column: ColumnType;
  currentBoard: DataType;
  isDragging: boolean;
}) {
  const [activeId, setActiveId] = useState("");

  const diaologRef = useRef<HTMLDialogElement | null>(null);

  const handleOpen = useCallback((id: string) => {
    setActiveId(id);
    diaologRef.current?.showModal();
  }, []);

  function handleClose() {
    diaologRef.current?.close();
  }

  console.log("Task rendered");

  return (
    <ul className={`mt-6 space-y-5 pb-24 ${isDragging ? "opacity-0" : ""}`}>
      <SortableContext
        items={column.tasks.map((task) => task.id)}
        strategy={verticalListSortingStrategy}
      >
        {column.tasks.map((task) => (
          <TaskItem key={task.id} task={task} handleOpen={handleOpen} />
        ))}
      </SortableContext>
      <TaskInformation
        taskId={activeId}
        tasks={column.tasks}
        dialogRef={diaologRef}
        handleClose={handleClose}
        currentColumn={column}
        currentBoard={currentBoard}
      />
    </ul>
  );
});
