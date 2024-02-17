import { ColumnType } from "@/types/data";
import Task from "./Task";

const colors = [
  "bg-cyan-500",
  "bg-red-500",
  "bg-green-500",
  "bg-yellow-500",
  "bg-purple-500",
  "bg-pink-500",
  "bg-blue-500",
  "bg-indigo-500",
  "bg-gray-500",
];

export default function Column({
  column,
  index,
}: {
  column: ColumnType;
  index: number;
}) {
  return (
    <div className="w-72 flex-shrink-0">
      <h2 className="text-c-medium-grey text-base tracking-[0.2em] flex gap-2 items-center">
        <div className={`size-4 rounded-full ${colors[index]}`}></div>
        <span>
          {column.name} ({column.tasks.length})
        </span>
      </h2>
      <Task column={column} key={column.name} />
    </div>
  );
}
