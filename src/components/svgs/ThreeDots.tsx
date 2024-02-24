"use client";

import useCurrentBoard from "@/hooks/useCurrentBoard";
import { useRef, useState } from "react";
import EditBoardForm from "../board/EditBoardForm";

export default function ThreeDots() {
  const [currentBoard] = useCurrentBoard();
  const [isOpen, setIsOpen] = useState(false);

  const dialogRef = useRef<HTMLDialogElement | null>(null);

  function handleOpen() {
    dialogRef.current?.showModal();
  }

  function handleClose() {
    dialogRef.current?.close();
    setIsOpen(false);
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
          className="transition duration-300 group-hover:fill-c-white"
          fill="#828FA3"
        />
        <circle
          cx="2.30769"
          cy="10"
          r="2.30769"
          className="transition duration-300 group-hover:fill-c-white"
          fill="#828FA3"
        />
        <circle
          cx="2.30769"
          cy="17.6923"
          r="2.30769"
          className="transition duration-300 group-hover:fill-c-white"
          fill="#828FA3"
        />
      </svg>
      {currentBoard !== undefined && isOpen && (
        <>
          <div className="top-[calc(var(--header-height)+8px)] fixed right-2 flex flex-col justify-start w-auto gap-2 p-4 rounded-lg shadow-lg bg-c-dark-grey ">
            <button
              onClick={handleOpen}
              className="transition duration-300 text-start text-c-medium-grey hover:text-c-white"
            >
              Edit Board
            </button>
            <button className="transition duration-300 text-start text-c-main-red hover:text-c-main-red-hover">
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
    </div>
  );
}
