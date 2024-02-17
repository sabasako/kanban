import { ColumnType } from "@/types/data";

export default function Task({ column }: { column: ColumnType }) {
  return (
    <ul className="mt-6">
      {column.tasks.map((task) => (
        <li
          className="w-72 py-6 px-4 bg-c-white dark:bg-c-dark-grey flex justify-center rounded-2xl flex-col gap-2 mb-5"
          key={task?.title}
        >
          <span className="text-xl text-c-black dark:text-c-white">
            {task.title}
          </span>
          <span className="text-c-medium-grey text-sm">0 of 3 substasks</span>
        </li>
      ))}
    </ul>
  );
}
