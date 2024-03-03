import { ColumnType, DataType } from "@/types/data";
import { useRef, useState } from "react";
import TaskInformation from "./TaskInformation";

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
    <ul className="mt-6">
      {column.tasks.map((task) => (
        <li
          key={task.id}
          onClick={() => handleOpen(task.id)}
          className="flex flex-col justify-center gap-2 px-4 py-6 mb-5 transition duration-300 cursor-pointer w-72 bg-c-white dark:bg-c-dark-grey rounded-2xl hover:opacity-60"
        >
          <span className="text-md text-c-black dark:text-c-white">
            {task.title}
          </span>
          <span className="text-sm text-c-medium-grey">
            {task.subtasks.filter((subtask) => subtask.isCompleted).length} of{" "}
            {task.subtasks.length} substasks
          </span>
        </li>
      ))}
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
