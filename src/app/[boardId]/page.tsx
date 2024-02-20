"use client";

import AddBoardForm from "@/components/board/AddBoardForm";
import Column from "@/components/board/Column";
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

  if (currentBoard === undefined) {
    return (
      <div className={`${isSidebarOpen ? "pl-80 sm:pl-0" : "pl-0"} pt-28`}>
        <EmptyButton text="Board wasn't found" />
      </div>
    );
  }

  return (
    <div
      className={`${
        isSidebarOpen ? "pl-[344px] sm:pl-4" : "pl-4"
      } pt-32 flex gap-6 overflow-x-auto`}
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
        className="flex-shrink-0 text-c-medium-grey text-2xl flex justify-center items-center bg-gradient-to-t  from-[#e9effa8e] to-[#e9effa2c] dark:from-[#2B2C3775] dark:to-[#2b2c3721] min-h-[calc(100lvh-200px)] w-72 rounded-2xl font-bold cursor-pointer mt-12 mb-6 transition duration-300 hover:scale-105 active:scale-100"
      >
        + New Column
      </button>
      <AddBoardForm
        initialBoardName={currentBoard.name}
        initialColumns={currentBoard.columns.map((col) => {
          return { value: col.name, id: col.id };
        })}
        dialogRef={dialogRef}
        handleClose={handleClose}
      />
    </div>
  );
}
