import { DataContext } from "@/store/data-context";
import { ColumnType, DataType, TaskType } from "@/types/data";
import { useContext } from "react";
import Dropdown from "./Dropdown";

type TaskInformationProps = {
  dialogRef: React.RefObject<HTMLDialogElement>;
  handleClose: () => void;
  taskId: string;
  tasks: TaskType[];
  currentColumn: ColumnType;
  currentBoard: DataType;
};

export default function TaskInformation({
  dialogRef,
  handleClose,
  taskId,
  tasks,
  currentColumn,
  currentBoard,
}: TaskInformationProps) {
  const { changeSubtask, changeTaskStatus } = useContext(DataContext);

  const task = tasks.find((task) => task.id === taskId);

  if (task === undefined) {
    return (
      <dialog ref={dialogRef} id="my_modal_2" className="modal">
        <div className="relative p-8 modal-box bg-c-white dark:bg-c-dark-grey">
          <h2>Task not found</h2>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button id="closeButton" onClick={handleClose}>
            close
          </button>
        </form>
      </dialog>
    );
  }

  function handleCompleteSubtask(id: string) {
    if (task !== undefined) {
      changeSubtask(task.id, id);
    }
  }

  function handlePlaceholderChange(name: string, id: string) {
    changeTaskStatus(id, name);
    console.log(currentBoard.columns);
  }

  return (
    <dialog
      ref={dialogRef}
      id="my_modal_2"
      className="overflow-y-auto taskInformationMaxHeight:overflow-y-visible modal"
    >
      <div className="relative p-8 overflow-y-visible taskInformationMaxHeight:overflow-y-auto modal-box bg-c-white dark:bg-c-dark-grey">
        <button className="absolute top-2 right-2" onClick={handleClose}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            className={`transition duration-300 size-6 stroke-c-medium-grey hover:opacity-60 active:scale-95`}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        </button>
        <h2 className="mb-2 text-lg font-bold text-c-black dark:text-c-white">
          {task.title}
        </h2>
        <p>{task.description === "" ? "No description" : task.description}</p>
        <h3 className="mt-6 mb-4 text-base font-bold text-c-medium-grey dark:text-c-white">
          Subtasks (
          {task.subtasks.filter((subtask) => subtask.isCompleted).length} of{" "}
          {task.subtasks.length})
        </h3>
        <ul className="max-h-[300px] overflow-auto taskInformationMaxHeight:max-h-none taskInformationMaxHeight:overflow-visible">
          {task.subtasks.map((subtask) => (
            <li
              onClick={() => handleCompleteSubtask(subtask.id)}
              key={subtask.id}
              className={`p-4 bg-c-light-grey dark:bg-c-very-dark-grey flex items-center gap-4 mb-2 rounded-md text-sm cursor-pointer hover:opacity-60 transition duration-300 font-semibold ${
                subtask.isCompleted
                  ? "line-through text-c-medium-grey dark:bg-[#20212c6b]"
                  : "text-c-black bg-[#625fc727] dark:text-c-white"
              }`}
            >
              <input
                type="checkbox"
                onChange={() => {}} //  This tells React that change event is handled elsewhere, and now warning is gone.
                checked={subtask.isCompleted}
                className="checkbox border-[#828fa346] checked:border-indigo-600 [--chkbg:theme(colors.indigo.600)] [--chkfg:white]"
              />
              <span>{subtask.title}</span>
            </li>
          ))}
        </ul>
        <h3 className="mt-6 mb-2 font-bold text-c-medium-grey dark:text-c-white">
          Current Status
        </h3>
        <Dropdown
          data={currentBoard.columns}
          placeholder={{ name: currentColumn.name, id: currentColumn.id }}
          onPlaceholderChange={handlePlaceholderChange}
        />
      </div>
      <form method="dialog" className="modal-backdrop">
        <button id="closeButton" onClick={handleClose}>
          close
        </button>
      </form>
    </dialog>
  );
}
