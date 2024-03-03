"use client";

import useCurrentBoard from "@/hooks/useCurrentBoard";
import { useContext, useRef, useState } from "react";
import EditBoardForm from "../board/EditBoardForm";
import DeleteForm from "../board/DeleteForm";
import { DataContext } from "@/store/data-context";
import { useRouter } from "next/navigation";

export default function ThreeDots() {
  const { deleteBoard, todoData } = useContext(DataContext);

  const [currentBoard] = useCurrentBoard();

  const [isOpen, setIsOpen] = useState(false);

  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const deleteDialogRef = useRef<HTMLDialogElement | null>(null);

  const router = useRouter();

  function handleBoardDelete() {
    if (currentBoard === undefined) return;
    deleteBoard(currentBoard.id);

    ////////////////////////////////////////////
    // when user deletes board, react schedules state update, so we when we check todoData, we need to consider current board as part of the array

    // if there is only one board left (Which is current board, that wasn't deleted yet), redirect user to home page (there is no other board to redirect to)
    if (todoData.length === 1) {
      router.push(`/`);
      return;
    }

    // if the current board is the last board in the array, redirect user to the previous board in the array
    if (todoData[todoData.length - 1].id === currentBoard.id) {
      router.push(`/board-?id=${todoData[todoData.length - 2].id}`);
      return;
    }

    // if the current board is not the last board in the array, redirect user to the last board in the array
    router.push(`/board-?id=${todoData[todoData.length - 1].id}`);
  }

  function handleOpen() {
    dialogRef.current?.showModal();
    setIsOpen(false);
  }

  function handleClose() {
    dialogRef.current?.close();
  }

  function handleDeleteOpen() {
    deleteDialogRef.current?.showModal();
    setIsOpen(false);
  }

  function handleDeleteClose() {
    deleteDialogRef.current?.close();
  }

  function handleClick() {
    setIsOpen((prev) => !prev);
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
      {currentBoard !== undefined && isOpen && (
        <>
          <div className="top-[calc(var(--header-height)+8px)] fixed right-2 flex flex-col justify-start w-auto gap-2 p-4 rounded-lg shadow-lg bg-c-white dark:bg-c-dark-grey ">
            <button
              onClick={handleOpen}
              className="transition duration-300 text-start text-c-medium-grey hover:opacity-65 dark:hover:text-c-white"
            >
              Edit Board
            </button>
            <button
              onClick={handleDeleteOpen}
              className="transition duration-300 text-start text-c-main-red hover:text-c-main-red-hover"
            >
              Delete Board
            </button>
          </div>
          <div
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/10 -z-10"
          ></div>
        </>
      )}
      {currentBoard !== undefined && (
        <EditBoardForm
          currentBoard={currentBoard}
          dialogRef={dialogRef}
          handleClose={handleClose}
        />
      )}
      {currentBoard !== undefined && (
        <DeleteForm
          dialogRef={deleteDialogRef}
          handleClose={handleDeleteClose}
          handleDelete={handleBoardDelete}
          heading="Delete this board?"
          description={`Are you sure you want to delete the ‘${currentBoard.name}’ board? This action will remove all columns and tasks and cannot be reversed.`}
        />
      )}
    </div>
  );
}
