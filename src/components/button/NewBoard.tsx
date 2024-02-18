"use client";

import { useRef } from "react";
import BoardSvg from "../svgs/BoardSvg";

export default function NewBoard({
  isOnSidebar = false,
}: {
  isOnSidebar?: boolean;
}) {
  const diaologRef = useRef<HTMLDialogElement | null>(null);

  function handleOpen() {
    diaologRef.current?.showModal();
  }

  function handleClose() {
    diaologRef.current?.close();
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
      <dialog ref={diaologRef} id="my_modal_2" className="modal">
        <div className="modal-box">
          <h3 className="text-lg font-bold">Hello!</h3>
          <p className="py-4">Press ESC key or click outside to close</p>
          <button onClick={handleClose}>close</button>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button onClick={handleClose}>close</button>
        </form>
      </dialog>
    </>
  );
}
