"use client";

import { createContext, useState } from "react";
import data from "@/data.json";
import { DataType, SubtaskType, TaskType } from "@/types/data";
import { arrayMove } from "@dnd-kit/sortable";
import { DragEndEvent } from "@dnd-kit/core";

type DataContextType = {
  todoData: DataType[];

  dragBoardLinks: (event: any) => void;
  dragColumn: (event: DragEndEvent, currentBoardId: string) => void;
  dragLinkIntoSameColumn: (event: DragEndEvent, currentBoard: DataType) => void;

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

  dragBoardLinks: () => {},
  dragColumn: () => {},
  dragLinkIntoSameColumn: () => {},

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

  function dragBoardLinks(event: DragEndEvent) {
    const { active, over } = event;

    if (!active || !over) return;
    if (active?.id === over?.id) return;

    setTodoData((prev) => {
      // prettier-ignore
      const originalPosition = prev.findIndex((task) => task.id === active.id);
      const newPosition = prev.findIndex((task) => task.id === over.id);

      return arrayMove(prev, originalPosition, newPosition);
    });
  }

  function dragColumn(event: DragEndEvent, currentBoardId: string) {
    const { active, over } = event;

    if (!active || !over) return;
    if (active?.id === over?.id) return;

    setTodoData((prev) => {
      const currentBoard = prev.find((board) => board.id === currentBoardId);
      if (!currentBoard) return prev;

      const originalPosition = currentBoard.columns.findIndex(
        (column) => column.id === active.id
      );
      const newPosition = currentBoard.columns.findIndex(
        (column) => column.id === over.id
      );

      const newColumns = arrayMove(
        currentBoard.columns,
        originalPosition,
        newPosition
      );

      const newData = prev.map((board) => ({
        ...board,
        columns: board.id === currentBoardId ? newColumns : board.columns,
      }));

      return newData;
    });
  }

  function dragLinkIntoSameColumn(event: DragEndEvent, currentBoard: DataType) {
    if (!currentBoard) return;
    const { active, over } = event;
    if (!over || !active || !currentBoard) return;
    if (active?.id === over?.id) return;

    // finds the column which contains active task
    const activeColumn = currentBoard?.columns.find((col) =>
      col.tasks.find((task) => task.id === active.id)
    );

    // finds the column where the task is being dragged over
    const overColumn = currentBoard?.columns.find((col) =>
      col.tasks.find((task) => task.id === over.id)
    );

    // If any container is undefined, return
    if (!activeColumn || !overColumn) return;

    // finds the active task
    const activeTask = activeColumn?.tasks.find(
      (task) => task.id === active.id
    );

    // finds the index of the active task
    const activeTaskIndex = activeColumn?.tasks.findIndex(
      (task) => task.id === active.id
    );

    // finds destination (over) task index
    const overTaskIndex = overColumn.tasks.findIndex(
      (task) => task.id === over.id
    );

    console.log(overTaskIndex);

    // if user dragged into same container
    if (activeColumn.id === overColumn.id) {
      const originalPosition = activeTaskIndex;
      const newPosition = overTaskIndex;

      const newTasks = arrayMove(
        activeColumn.tasks,
        originalPosition,
        newPosition
      );

      setTodoData((prev) => {
        const newData = prev.map((board) => ({
          ...board,
          columns:
            board.id === currentBoard.id
              ? board.columns.map((col) => ({
                  ...col,
                  tasks: col.id === overColumn.id ? newTasks : col.tasks,
                }))
              : board.columns,
        }));

        return newData;
      });
    } else {
      if (!activeTask) return;
      const filteredTasks = activeColumn.tasks.filter(
        (task) => task.id !== activeTask?.id
      );
      const newTasks = [
        ...overColumn.tasks.slice(0, overTaskIndex),
        activeTask,
        ...overColumn.tasks.slice(overTaskIndex),
      ];

      setTodoData((prev) =>
        prev.map((board) => ({
          ...board,
          columns:
            board.id === currentBoard.id
              ? board.columns.map((col) => {
                  if (col.id === activeColumn.id) {
                    return {
                      ...col,
                      tasks: filteredTasks,
                    };
                  } else if (col.id === overColumn.id) {
                    return {
                      ...col,
                      tasks: newTasks,
                    };
                  } else {
                    return col;
                  }
                })
              : board.columns,
        }))
      );
    }
  }

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

    dragBoardLinks,
    dragColumn,
    dragLinkIntoSameColumn,

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
