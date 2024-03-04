import { TaskType } from "@/types/data";
import { DragOverlay } from "@dnd-kit/core";
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
  } = useSortable({ id: task.id, data: task });

  return (
    <>
      <li
        ref={setNodeRef}
        {...attributes}
        {...listeners}
        style={{ transition, transform: CSS.Translate.toString(transform) }}
        onClick={() => handleOpen(task.id)}
        className={`flex flex-col justify-center gap-2 px-4 py-6 my-5 cursor-pointer w-72 bg-c-white dark:bg-c-dark-grey rounded-2xl hover:opacity-60 ${
          isDragging ? "opacity-50" : "opacity-100"
        }`}
      >
        <span className="break-words text-md text-c-black dark:text-c-white ">
          {task.title}
        </span>
        <span className="text-sm text-c-medium-grey">
          {task.subtasks.filter((subtask) => subtask.isCompleted).length} of{" "}
          {task.subtasks.length} substasks
        </span>
      </li>
      {isDragging && (
        <DragOverlay>
          <li
            className={`flex flex-col justify-center gap-2 px-4 py-6 my-5 cursor-pointer w-72 bg-c-white dark:bg-c-dark-grey rounded-2xl opacity-100`}
          >
            <span className="break-words text-md text-c-black dark:text-c-white ">
              {task.title}
            </span>
            <span className="text-sm text-c-medium-grey">
              {task.subtasks.filter((subtask) => subtask.isCompleted).length} of{" "}
              {task.subtasks.length} substasks
            </span>
          </li>
        </DragOverlay>
      )}
    </>
  );
}
