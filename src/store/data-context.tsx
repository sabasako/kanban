"use client";

import { createContext, useState } from "react";
import data from "@/data.json";
import { DataType, TaskType } from "@/types/data";

type DataContextType = {
  todoData: DataType[];
  addBoard: (
    boardName: string,
    columns: { value: string; id: string }[],
    id: string
  ) => void;
  editBoard: (
    currentBoard: DataType,
    boardName: string,
    columns: { name: string; id: string; tasks: TaskType[] }[]
  ) => void;
};

export const DataContext = createContext<DataContextType>({
  todoData: data,
  addBoard: () => {},
  editBoard: () => {},
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
    currentBoard: DataType,
    boardName: string,
    columns: { name: string; id: string; tasks: TaskType[] }[]
  ) {
    setTodoData((prev) => {
      const newBoard = {
        id: currentBoard.id,
        name: boardName,
        columns: columns.map((col) => ({
          id: col.id,
          name: col.name,
          tasks: col?.tasks,
        })),
      };
      const newDataWithoutCurrent = prev.filter(
        (board) => board.id !== currentBoard.id
      );
      const newData = [...newDataWithoutCurrent, newBoard];
      return newData;
    });
  }

  const dataValue = { todoData, addBoard, editBoard };

  return (
    <DataContext.Provider value={dataValue}>{children}</DataContext.Provider>
  );
}
