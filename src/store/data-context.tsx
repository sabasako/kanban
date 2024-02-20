"use client";

import { createContext, useState } from "react";
import data from "@/data.json";
import { DataType } from "@/types/data";

export const DataContext = createContext<{
  todoData: DataType[];
  addBoard: (
    boardName: string,
    columns: { value: string; id: string }[],
    id: string
  ) => void;
}>({
  todoData: data,
  addBoard: () => {},
});

export default function DataContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [todoData, setTodoData] = useState(data);

  // adds new board which has board name and columnt titles, it doesn't have tasks or subtasks
  function addBoard(
    boardName: string,
    columns: { value: string; id: string }[],
    id: string
  ) {
    setTodoData((prev) => [
      ...prev,
      {
        id,
        name: boardName,
        columns: columns.map((col) => ({
          id: col.id,
          name: col.value,
          tasks: [],
        })),
      },
    ]);
  }

  function editBoard(
    boardName: string,
    columns: { value: string; id: string }[],
    id: string
  ) {
    setTodoData((prev) => {
      const currentBoard = prev.find((board) => board.id === id);

      const newBoard = {
        id,
        name: boardName,
        columns: columns.map((col) => ({
          id: col.id,
          name: col.value,
          tasks: [],
        })),
      };
      const newData = prev.filter((board) => board.id !== id);
      return newData;
    });
  }

  const dataValue = { todoData, addBoard, editBoard };

  return (
    <DataContext.Provider value={dataValue}>{children}</DataContext.Provider>
  );
}
