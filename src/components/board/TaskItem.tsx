import { TaskType } from "@/types/data";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export default function TaskItem({
  task,
  handleOpen,
}: {
  task: TaskType;
  handleOpen: (id: string) => void;
}) {
  const {
    attributes,
    transform,
    transition,
    setNodeRef,
    listeners,
    isDragging,
  } = useSortable({
    id: task.id,
    data: {
      type: "task",
      task,
    },
  });

  return (
    <li
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={{ transition, transform: CSS.Translate.toString(transform) }}
      onClick={() => handleOpen(task.id)}
      className={`flex flex-col justify-center gap-2 px-4 py-6 cursor-pointer w-72 bg-c-white dark:bg-c-dark-grey rounded-2xl hover:opacity-60 ${
        isDragging ? "opacity-50" : ""
      }`}
    >
      <span
        className={`overflow-hidden text-ellipsis whitespace-nowrap text-md text-c-black dark:text-c-white ${
          isDragging ? "opacity-0" : ""
        }`}
      >
        {task.title}
      </span>
      <span
        className={`text-sm text-c-medium-grey ${
          isDragging ? "opacity-0" : ""
        }`}
      >
        {task.subtasks.filter((subtask) => subtask.isCompleted).length} of{" "}
        {task.subtasks.length} substasks
      </span>
    </li>
  );
}
