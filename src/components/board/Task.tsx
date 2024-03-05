import { ColumnType, DataType } from "@/types/data";
import { useRef, useState } from "react";
import TaskInformation from "./TaskInformation";
import TaskItem from "./TaskItem";
import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable";

export default function Task({
  column,
  currentBoard,
}: {
  column: ColumnType;
  currentBoard: DataType;
}) {
  const [activeId, setActiveId] = useState("");

  const diaologRef = useRef<HTMLDialogElement | null>(null);

  function handleOpen(id: string) {
    setActiveId(id);
    diaologRef.current?.showModal();
  }

  function handleClose() {
    diaologRef.current?.close();
  }

  return (
    <ul className="mt-6 space-y-5">
      <SortableContext items={column.tasks.map((task) => task.id)}>
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
}
