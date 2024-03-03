import { useContext, useEffect, useState } from "react";
import Dropdown from "./Dropdown";
import { ColumnType, DataType, TaskType } from "@/types/data";
import { v4 as uuidv4 } from "uuid";
import { DataContext } from "@/store/data-context";

type AddTaskFormProps = {
  dialogRef: React.RefObject<HTMLDialogElement>;
  handleClose: () => void;
  handleEditClose: () => void;
  currentBoard: DataType;
  task: TaskType;
  currentColumn: ColumnType;
};

const MAX_SUBTASK_LENGTH = 100;

export default function EditTaskForm({
  dialogRef,
  handleClose,
  handleEditClose,
  currentBoard,
  task,
  currentColumn,
}: AddTaskFormProps) {
  const { editTask } = useContext(DataContext);

  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [subtasks, setSubtasks] = useState(task.subtasks);
  const [statusPlaceholder, setStatusPlaceholder] = useState({
    name: currentColumn.name,
    id: currentColumn.id,
  });

  // updates initial value for states, without this useEffect, the form will not update the initial value when task changes
  useEffect(() => {
    setTitle(task.title);
    setDescription(task.description);
    setSubtasks(task.subtasks);
    setStatusPlaceholder({ name: currentColumn.name, id: currentColumn.id });
  }, [task, currentColumn]);

  function handleForm(e: React.FormEvent) {
    e.preventDefault();

    if (
      title.length === 0 ||
      subtasks.some(
        (subtask) =>
          subtask.title.length === 0 ||
          subtask.title.length > MAX_SUBTASK_LENGTH
      )
    ) {
      return;
    }

    editTask(title, description, subtasks, statusPlaceholder, task.id);

    handleClose();
    handleEditClose();
  }

  function handleSubtaskChange(id: string, value: string) {
    setSubtasks((prev) => {
      const newSubtasks = prev.map((subtask) => {
        if (subtask.id === id) {
          return {
            ...subtask,
            title: value,
          };
        }
        return subtask;
      });
      return newSubtasks;
    });
  }

  function handleAddNewSubtask() {
    setSubtasks((prev) => [
      ...prev,
      { id: uuidv4(), title: "", isCompleted: false },
    ]);
  }

  function handleSubtaskDelete(id: string) {
    setSubtasks((prev) => prev.filter((subtask) => subtask.id !== id));
  }

  function handlePlaceholderChange(name: string, id: string) {
    setStatusPlaceholder({ name, id });
  }

  return (
    <dialog
      ref={dialogRef}
      id="my_modal_2"
      className="overflow-y-auto taskMaxHeight:overflow-y-visible modal"
    >
      <div className="relative p-8 overflow-y-visible taskMaxHeight:overflow-y-auto modal-box bg-c-white dark:bg-c-dark-grey">
        <button className="absolute top-2 right-2" onClick={handleEditClose}>
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
        <h3 className="mb-6 text-lg font-bold text-c-black dark:text-c-white">
          Edit Task
        </h3>
        <form action="" onSubmit={handleForm}>
          <div className="flex flex-col gap-2">
            <label
              className="font-bold text-c-medium-grey dark:text-c-white"
              htmlFor="taskTitle"
            >
              Title
            </label>
            <input
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 border rounded-md text-c-black dark:text-c-white bg-c-white dark:bg-c-dark-grey border-[#828fa362] focus:outline-none focus:border-c-main-purple"
              type="text"
              name="taskTitle"
              id="taskTitle"
              placeholder="e.g. Take coffee break"
            />
          </div>

          <div className="flex flex-col gap-2 mt-5">
            <label
              className="font-bold text-c-medium-grey dark:text-c-white"
              htmlFor="taskDescription"
            >
              Description (optional)
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2 resize-y max-h-56 border rounded-md text-c-black dark:text-c-white bg-c-white dark:bg-c-dark-grey border-[#828fa362] focus:outline-none focus:border-c-main-purple"
              name="taskDescription"
              id="taskDescription"
              cols={30}
              rows={5}
              placeholder="e.g. It’s always good to take a break. This 15 minute break will 
          recharge the batteries a little."
            ></textarea>
          </div>

          <div className="flex flex-col gap-2 mt-6 max-h-[300px] overflow-y-auto taskMaxHeight:max-h-none taskMaxHeight:overflow-y-visible">
            <p className="font-bold text-c-medium-grey dark:text-c-white">
              Subtasks
            </p>
            {subtasks.length === 0 && <p>No subtasks added</p>}
            {subtasks.map((subtask) => (
              <div key={subtask.id}>
                <div className="flex items-center gap-2 pr-4">
                  <input
                    required
                    value={subtask.title}
                    onChange={(e) =>
                      handleSubtaskChange(subtask.id, e.target.value)
                    }
                    className="w-full px-4 py-2 border rounded-md text-c-black dark:text-c-white bg-c-white dark:bg-c-dark-grey border-[#828fa362] focus:outline-none focus:border-c-main-purple"
                    type="text"
                    id={`columnTitle${subtask.id}`}
                    name={`columnTitle${subtask.id}`}
                    placeholder="e.g. Make coffee"
                  />
                  <button onClick={() => handleSubtaskDelete(subtask.id)}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={3}
                      className={`transition duration-300 size-6 stroke-c-medium-grey hover:opacity-60 active:scale-95`}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18 18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
                {subtask.title.length > MAX_SUBTASK_LENGTH && (
                  <p className="text-sm text-c-main-red">
                    Subtask should be less than {MAX_SUBTASK_LENGTH} characters
                  </p>
                )}
              </div>
            ))}
            <button
              onClick={handleAddNewSubtask}
              className="py-3 mt-3 font-bold duration-300 rounded-full transtion hover:opacity-60 active:scale-95 bg-[#625fc73c] dark:bg-c-white text-c-main-purple"
            >
              + Add New Subtask
            </button>
          </div>

          <div className="flex flex-col gap-2 mt-5">
            <p className="font-bold text-c-medium-grey dark:text-c-white">
              Status
            </p>
            <Dropdown
              onPlaceholderChange={handlePlaceholderChange}
              placeholder={statusPlaceholder}
              data={currentBoard.columns}
            />
          </div>

          <button
            className="w-full py-3 mt-6 font-bold duration-300 rounded-full transtion hover:bg-c-main-purple-hover active:scale-95 bg-c-main-purple text-c-white"
            type="submit"
          >
            Save Changes
          </button>
        </form>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button id="closeButton" onClick={handleEditClose}>
          close
        </button>
      </form>
    </dialog>
  );
}
