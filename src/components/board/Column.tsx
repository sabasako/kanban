import { ColumnType, DataType } from "@/types/data";
import { Task } from "./Task";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { memo } from "react";

// prettier-ignore
const colors = [ "bg-cyan-500", "bg-red-500", "bg-green-500", "bg-yellow-500", "bg-purple-500", "bg-pink-500", "bg-blue-500", "bg-indigo-500", "bg-gray-500",];

export const Column = memo(function Column({
  currentBoard,
  column,
  index,
}: {
  currentBoard: DataType;
  column: ColumnType;
  index: number;
}) {
  const {
    attributes,
    transform,
    transition,
    isDragging,
    setNodeRef,
    listeners,
  } = useSortable({
    id: column.id,
    data: {
      type: "column",
      column,
    },
  });

  return (
    <div
      {...attributes}
      ref={setNodeRef}
      style={{ transition, transform: CSS.Translate.toString(transform) }}
      className={`flex-shrink-0 w-72 cursor-auto ${
        isDragging
          ? "opacity-50 z-30 bg-c-white dark:bg-c-dark-grey rounded-3xl"
          : ""
      }`}
    >
      <div
        className={`flex justify-between items-center ${
          isDragging ? "opacity-0" : ""
        }`}
      >
        <div className={`flex gap-2 items-center`}>
          <div
            className={`size-4 rounded-full ${
              colors[index] || colors[Math.floor(Math.random() * colors.length)]
            }`}
          ></div>
          <span className="text-c-medium-grey max-w-60 text-base tracking-[0.2em] break-words overflow-ellipsis">
            {column.name} ({column.tasks.length})
          </span>
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 cursor-pointer hover:opacity-65"
          {...listeners}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
          />
        </svg>
      </div>
      <Task
        isDragging={isDragging}
        currentBoard={currentBoard}
        column={column}
        key={column.name}
      />
    </div>
  );
});
