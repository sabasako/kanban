"use client";

import { createContext, useState } from "react";
import data from "@/data.json";
import { DataType, SubtaskType, TaskType } from "@/types/data";

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
  addTask: (
    title: string,
    description: string,
    subtasks: SubtaskType[],
    id: string,
    statusId: string,
    statusName: string
  ) => void;
  deleteBoard: (boardId: string) => void;
};

export const DataContext = createContext<DataContextType>({
  todoData: data,
  addBoard: () => {},
  editBoard: () => {},
  addTask: () => {},
  deleteBoard: () => {},
});

export default function DataContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [todoData, setTodoData] = useState(data);

  function deleteBoard(boardId: string) {
    setTodoData((prev) => prev.filter((board) => board.id !== boardId));
  }

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

  // edits the board name and columns
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

  // adds new task and subtasks to the board
  function addTask(
    title: string,
    description: string,
    subtasks: SubtaskType[],
    id: string,
    statusId: string,
    statusName: string
  ) {
    setTodoData((prev) => {
      const newTask = {
        id,
        title,
        description,
        subtasks,
        status: statusName,
      };

      return prev.map((board) => {
        const newColumns = board.columns.map((column) => {
          if (column.id === statusId) {
            return {
              ...column,
              tasks: [...column.tasks, newTask],
            };
          }
          return column;
        });
        return {
          ...board,
          columns: newColumns,
        };
      });
    });
  }

  const dataValue = { todoData, addBoard, editBoard, addTask, deleteBoard };

  return (
    <DataContext.Provider value={dataValue}>{children}</DataContext.Provider>
  );
}
