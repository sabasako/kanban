"use client";

import { useRef } from "react";
import useCurrentBoard from "@/hooks/useCurrentBoard";
import AddTaskForm from "../board/AddTaskForm";

export default function AddTask() {
  const diaologRef = useRef<HTMLDialogElement | null>(null);

  const [currentBoard] = useCurrentBoard();
  const buttonIsDisabled = !currentBoard || currentBoard?.columns.length === 0;

  function handleOpen() {
    if (currentBoard !== undefined) {
      diaologRef.current?.showModal();
    }
  }

  function handleClose() {
    diaologRef.current?.close();
  }

  return (
    <>
      <button
        disabled={buttonIsDisabled}
        onClick={handleOpen}
        className={` px-6 py-4 font-bold transition duration-300 rounded-full text-c-white flex gap-2 lg:py-0 bg-c-main-purple ${
          buttonIsDisabled
            ? "cursor-not-allowed opacity-50"
            : "hover:bg-c-main-purple-hover active:scale-95"
        }`}
      >
        <span className="relative lg:text-3xl bottom-[2px]">+</span>
        <span className="lg:hidden">Add New Task</span>
      </button>
      {currentBoard !== undefined && (
        <AddTaskForm
          currentBoard={currentBoard}
          dialogRef={diaologRef}
          handleClose={handleClose}
        />
      )}
    </>
  );
}
