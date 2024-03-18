"use client";

import { createContext, useState } from "react";
import data from "@/data/data.json";
import { DataType, SubtaskType, TaskType } from "@/types/data";
import { arrayMove } from "@dnd-kit/sortable";
import { DragEndEvent, DragMoveEvent } from "@dnd-kit/core";

// prettier-ignore
export const colors = [ "#ef4444", "#1d4ed8", "#84cc16", "#f97316", "#d946ef", "#082f49", "#f59e0b", "#fafaf9", "#422006", "#facc15", "#86efac", "#166534", "#b91c1c", "#0f766e", "#6d28d9", "#db2777", "#6d28d9", "#4c0519",];

type DataContextType = {
  todoData: DataType[];

  dragBoardLinks: (event: any) => void;
  dragColumn: (event: DragEndEvent, currentBoardId: string) => void;
  dragTask: (event: DragMoveEvent, currentBoard: DataType) => void;

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
  dragTask: () => {},

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

  // handles drag and drop of board links
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

  // handles drag and drop of columns
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

  // handles drag and drop of tasks
  function dragTask(event: DragMoveEvent, currentBoard: DataType) {
    const activeId = event.active.id;
    const overId = event.over?.id;

    if (!event.active || !event.over) return;

    const isActiveATask = event.active.data.current?.type === "task";
    const isOverColumn = event.over.data.current?.type === "column";
    const isColumnEmpty = event.over.data.current?.column?.tasks?.length === 0;

    // If none of the active items are tasks, then it's a column, therefore stop function (we handle that case in handleDragEnd)
    if (!isActiveATask) return;

    const activeColumn = currentBoard?.columns.find((col) =>
      col.tasks.find((task) => task.id === activeId)
    );
    const overColumn = currentBoard?.columns.find((col) =>
      col.tasks.find((task) => task.id === overId)
    );

    const isSameColumn = activeColumn?.id === overColumn?.id;

    // If user is draggin task onto same column
    if (isSameColumn) {
      setTodoData((prev) => {
        if (!activeColumn || !overColumn) return prev;

        const activeIndex = activeColumn.tasks.findIndex(
          (task) => task.id === activeId
        );
        const overIndex = overColumn.tasks.findIndex(
          (task) => task.id === overId
        );

        const newTasks = arrayMove(activeColumn.tasks, activeIndex, overIndex);

        return prev.map((board) => ({
          ...board,
          columns:
            board.id === currentBoard.id
              ? board.columns.map((col) => ({
                  ...col,
                  tasks: col.id === activeColumn.id ? newTasks : col.tasks,
                }))
              : board.columns,
        }));
      });
    } else if (!isSameColumn && !isColumnEmpty) {
      // If user is draggin task onto different column
      setTodoData((prev) => {
        if (!activeColumn || !overColumn) return prev;
        const overIndex = overColumn.tasks.findIndex(
          (task) => task.id === overId
        );

        const filteredTasks = activeColumn.tasks.filter(
          (task) => task.id !== activeId
        );
        const newTasks = [
          ...overColumn.tasks.slice(0, overIndex),
          event.active.data.current?.task,
          ...overColumn.tasks.slice(overIndex),
        ];

        return prev.map((board) => ({
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
        }));
      });
    } else if (isOverColumn && isColumnEmpty) {
      // if user is draggin task onto different column, which is empty
      setTodoData((prev) => {
        // Existing method of finding overColumn will be wrong, because i found it using over tasks, which isn't case here, because there are no tasks in this column. Now overId will belong to over column not over tasks
        const newOverColumn = currentBoard.columns.find(
          (col) => col.id === overId
        );

        if (!activeColumn || !newOverColumn) return prev;

        const filteredTasks = activeColumn.tasks.filter(
          (task) => task.id !== activeId
        );
        const newTask = event.active.data.current?.task;

        return prev.map((board) => ({
          ...board,
          columns:
            board.id === currentBoard.id
              ? board.columns.map((col) => {
                  if (col.id === activeColumn.id) {
                    return {
                      ...col,
                      tasks: filteredTasks,
                    };
                  } else if (col.id === newOverColumn.id) {
                    return {
                      ...col,
                      tasks: [newTask],
                    };
                  } else {
                    return col;
                  }
                })
              : board.columns,
        }));
      });
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
          color: colors[Math.floor(Math.random() * colors.length)],
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
          color: colors[Math.floor(Math.random() * colors.length)],
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
                  {
                    title,
                    description,
                    subtasks,
                    id: taskId,
                    status: status.name,
                  },
                  ...column.tasks.filter((task) => task.id !== taskId),
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
    dragTask,

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
