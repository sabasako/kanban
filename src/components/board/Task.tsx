import { ColumnType } from "@/types/data";

export default function Task({ column }: { column: ColumnType }) {
  return (
    <ul className="mt-6">
      {column.tasks.map((task) => (
        <li
          className="flex flex-col justify-center gap-2 px-4 py-6 mb-5 w-72 bg-c-white dark:bg-c-dark-grey rounded-2xl"
          key={task?.title}
        >
          <span className="text-md text-c-black dark:text-c-white">
            {task.title}
          </span>
          <span className="text-sm text-c-medium-grey">0 of 3 substasks</span>
        </li>
      ))}
    </ul>
  );
}
