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
  editTask: (
    title: string,
    description: string,
    subtasks: SubtaskType[],
    statusId: { name: string; id: string },
    taskId: string
  ) => void;
  changeTaskStatus: (statusId: string, currentTask: TaskType) => void;
  deleteTask: (id: string) => void;
  deleteBoard: (boardId: string) => void;
  changeSubtask: (taskId: string, subtaskId: string) => void;
};

export const DataContext = createContext<DataContextType>({
  todoData: data,
  addBoard: () => {},
  editBoard: () => {},
  addTask: () => {},
  editTask: () => {},
  changeTaskStatus: () => {},
  deleteTask: () => {},
  deleteBoard: () => {},
  changeSubtask: () => {},
});

export default function DataContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [todoData, setTodoData] = useState(data);

  // deletes the board
  function deleteBoard(boardId: string) {
    setTodoData((prev) => prev.filter((board) => board.id !== boardId));
  }

  // adds new board which has board name and column titles, it doesn't have tasks or subtasks
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

  // edits the task
  function editTask(
    title: string,
    description: string,
    subtasks: SubtaskType[],
    status: { name: string; id: string },
    taskId: string
  ) {
    setTodoData((prev) =>
      prev.map((board) => ({
        ...board,
        columns: board.columns.map((column) => ({
          ...column,
          tasks:
            status.id === column.id
              ? [
                  ...column.tasks,
                  {
                    title,
                    description,
                    subtasks,
                    id: taskId,
                    status: status.name,
                  },
                ]
              : column.tasks.filter((task) => task.id !== taskId),
        })),
      }))
    );
  }

  // changes the status of a task
  function changeTaskStatus(statusId: string, currentTask: TaskType) {
    setTodoData((prev) =>
      prev.map((board) => ({
        ...board,
        columns: board.columns.map((column) => ({
          ...column,
          tasks:
            statusId === column.id
              ? [...column.tasks, currentTask]
              : column.tasks.filter((task) => task.id !== currentTask.id),
        })),
      }))
    );
  }

  // deletes the task
  function deleteTask(id: string) {
    setTodoData((prev) =>
      prev.map((board) => ({
        ...board,
        columns: board.columns.map((column) => ({
          ...column,
          tasks: column.tasks.filter((task) => task.id !== id),
        })),
      }))
    );
  }

  // toggles isCompleted status of a subtask.
  function changeSubtask(taskId: string, subtaskId: string) {
    setTodoData((prev) =>
      prev.map((board) => ({
        ...board,
        columns: board.columns.map((column) => ({
          ...column,
          tasks: column.tasks.map((task) => ({
            ...task,
            subtasks:
              task.id === taskId
                ? task.subtasks.map((subtask) => ({
                    ...subtask,
                    isCompleted:
                      subtask.id === subtaskId
                        ? !subtask.isCompleted
                        : subtask.isCompleted,
                  }))
                : task.subtasks,
          })),
        })),
      }))
    );
  }

  const dataValue = {
    todoData,
    deleteBoard,
    addBoard,
    editBoard,
    addTask,
    changeTaskStatus,
    changeSubtask,
    deleteTask,
    editTask,
  };

  return (
    <DataContext.Provider value={dataValue}>{children}</DataContext.Provider>
  );
}
