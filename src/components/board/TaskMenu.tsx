import { useRef, useState } from "react";
import DeleteForm from "./DeleteForm";
import { ColumnType, DataType, TaskType } from "@/types/data";
import EditTaskForm from "./EditTaskForm";

export default function TaskMenu({
  deleteTask,
  task,
  currentBoard,
  currentColumn,
  handleClose,
}: {
  deleteTask: () => void;
  task: TaskType;
  currentBoard: DataType;
  currentColumn: ColumnType;
  handleClose: () => void;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const deleteDialogRef = useRef<HTMLDialogElement | null>(null);

  function handleClick() {
    setIsOpen((prev) => !prev);
  }

  function handleEditOpen() {
    dialogRef.current?.showModal();
    setIsOpen(false);
  }

  function handleEditClose() {
    dialogRef.current?.close();
  }

  function handleDeleteOpen() {
    deleteDialogRef.current?.showModal();
    setIsOpen(false);
  }

  function handleDeleteClose() {
    deleteDialogRef.current?.close();
  }

  return (
    <div className="relative">
      <svg
        onClick={handleClick}
        className="cursor-pointer group hover:scale-110 active:scale-100"
        width="5"
        height="20"
        viewBox="0 0 5 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="2.30769"
          cy="2.30769"
          r="2.30769"
          className="transition duration-300 group-hover:fill-c-main-purple dark:group-hover:fill-c-white"
          fill="#828FA3"
        />
        <circle
          cx="2.30769"
          cy="10"
          r="2.30769"
          className="transition duration-300 group-hover:fill-c-main-purple dark:group-hover:fill-c-white"
          fill="#828FA3"
        />
        <circle
          cx="2.30769"
          cy="17.6923"
          r="2.30769"
          className="transition duration-300 group-hover:fill-c-main-purple dark:group-hover:fill-c-white"
          fill="#828FA3"
        />
      </svg>
      {isOpen && (
        <>
          <div className="absolute flex flex-col justify-start gap-2 p-4 rounded-lg shadow-task-menu-shadow w-36 top-[calc(100%+1rem)] right-0 translate-x-1/2 bg-c-white dark:bg-c-dark-grey ">
            <button
              onClick={handleEditOpen}
              className="transition duration-300 text-start text-c-medium-grey hover:opacity-60 dark:hover:text-c-white"
            >
              Edit Task
            </button>
            <button
              onClick={handleDeleteOpen}
              className="transition duration-300 text-start text-c-main-red hover:text-c-main-red-hover"
            >
              Delete Task
            </button>
          </div>
        </>
      )}
      <DeleteForm
        dialogRef={deleteDialogRef}
        handleClose={handleDeleteClose}
        handleDelete={deleteTask}
        heading="Delete this Task?"
        description={`Are you sure you want to delete the ‘${task.title}’ task? This action will remove all of its subtasks and cannot be reversed.`}
      />

      <EditTaskForm
        handleClose={handleClose}
        dialogRef={dialogRef}
        handleEditClose={handleEditClose}
        currentBoard={currentBoard}
        task={task}
        currentColumn={currentColumn}
      />
    </div>
  );
}
