"use client";

import { useRef } from "react";
import BoardSvg from "../svgs/BoardSvg";
import AddBoardForm from "../board/AddBoardForm";

export default function NewBoard({
  isOnSidebar = false,
}: {
  isOnSidebar?: boolean;
}) {
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  function handleOpen() {
    dialogRef.current?.showModal();
  }

  function handleClose() {
    dialogRef.current?.close();
  }

  return (
    <>
      <button
        onClick={handleOpen}
        className={
          isOnSidebar
            ? "flex items-center gap-3 py-4 pl-8 text-lg font-bold transition duration-300 group text-c-main-purple hover:text-c-main-purple-hover active:scale-95"
            : `group px-6 py-4 active:scale-95 hover:bg-c-main-purple-hover font-bold transition duration-300 rounded-full text-c-white bg-c-main-purple`
        }
      >
        {isOnSidebar && (
          <BoardSvg
            hoverColor="fill-c-main-purple-hover"
            color="fill-c-main-purple"
          />
        )}
        + Create New Board
      </button>
      <AddBoardForm dialogRef={dialogRef} handleClose={handleClose} />
    </>
  );
}
