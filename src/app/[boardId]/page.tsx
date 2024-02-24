"use client";

import Column from "@/components/board/Column";
import EditBoardForm from "@/components/board/EditBoardForm";
import EmptyButton from "@/components/button/EmptyButton";
import { DataContext } from "@/store/data-context";
import { SidebarContext } from "@/store/sidebar-context";
import { useContext, useRef } from "react";

export default function BoardPage({
  searchParams,
}: {
  searchParams: { id: string };
}) {
  const { isSidebarOpen } = useContext(SidebarContext);
  const { todoData } = useContext(DataContext);
  const currentBoard = todoData.find((board) => board.id === searchParams.id);

  const dialogRef = useRef<HTMLDialogElement | null>(null);

  function handleOpen() {
    dialogRef.current?.showModal();
  }

  function handleClose() {
    dialogRef.current?.close();
  }

  // If the board wasn't found, show a message
  if (currentBoard === undefined) {
    return (
      <div className={`${isSidebarOpen ? "pl-80 sm:pl-0" : "pl-0"} pt-28`}>
        <EmptyButton text="Board wasn't found" />
      </div>
    );
  }

  // If there are no columns, show a message to create a new column
  if (currentBoard.columns.length === 0) {
    return (
      <div
        className={`${
          isSidebarOpen ? "pl-80 sm:pl-0" : "pl-0"
        } pt-28 flex max-h-[600px] h-dvh flex-col gap-6 justify-center items-center`}
      >
        <h2 className="text-xl">
          This board is empty. Create a new column to get started.
        </h2>
        <button
          onClick={handleOpen}
          className={`bg-c-main-purple rounded-full py-4 px-8 text-c-white hover:bg-c-main-purple-hover transition duration-300 active:scale-95`}
        >
          + Add a column
        </button>
        <EditBoardForm
          handleClose={handleClose}
          dialogRef={dialogRef}
          currentBoard={currentBoard}
        />
      </div>
    );
  }

  return (
    <div
      className={`${
        isSidebarOpen ? "pl-[344px] sm:pl-4" : "pl-4"
      } pt-32 flex gap-6 overflow-x-auto transition-[padding] duration-300`}
    >
      {currentBoard.columns.map((column, index) => (
        <Column
          column={column}
          index={index}
          key={column.name + Math.random()}
        />
      ))}
      <button
        onClick={handleOpen}
        className="flex-shrink-0 text-c-medium-grey text-2xl flex justify-center items-center bg-gradient-to-t  from-[#e9effa8e] to-[#e9effa2c] dark:from-[#2B2C3775] dark:to-[#2b2c3721] min-h-[calc(100lvh-200px)] w-72 rounded-2xl font-bold cursor-pointer mt-12 mb-6 transition duration-300 hover:text-c-dark-grey hover:dark:text-c-light-grey active:scale-95 "
      >
        + New Column
      </button>
      <EditBoardForm
        handleClose={handleClose}
        dialogRef={dialogRef}
        currentBoard={currentBoard}
      />
    </div>
  );
}
