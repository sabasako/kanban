import { useContext, useState } from "react";
import Dropdown from "./Dropdown";
import { DataType, SubtaskType } from "@/types/data";
import { v4 as uuidv4 } from "uuid";
import { DataContext } from "@/store/data-context";

type AddTaskFormProps = {
  dialogRef: React.RefObject<HTMLDialogElement>;
  handleClose: () => void;
  currentBoard: DataType;
};

export default function AddTaskForm({
  dialogRef,
  handleClose,
  currentBoard,
}: AddTaskFormProps) {
  const { addTask } = useContext(DataContext);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [subtasks, setSubtasks] = useState<SubtaskType[]>([
    { id: "dasdas-12321cdsf-vn12if9fsnd12", title: "", isCompleted: false },
    { id: "dasdas-12321cdsf-doi1231dwwk", title: "", isCompleted: false },
  ]);
  const [statusPlaceholder, setStatusPlaceholder] = useState({
    name: "Select Column",
    id: "dweq-12321-fdfdsf",
  });
  const [statusError, setStatusError] = useState(false);

  function handleForm(e: React.FormEvent) {
    e.preventDefault();

    if (statusPlaceholder.id === "dweq-12321-fdfdsf") {
      setStatusError(true);
      return;
    }

    // add task
    addTask(
      title,
      description,
      subtasks,
      uuidv4(),
      statusPlaceholder.id,
      statusPlaceholder.name
    );

    // reset form
    setTitle("");
    setDescription("");
    setSubtasks([
      { id: uuidv4(), title: "", isCompleted: false },
      { id: uuidv4(), title: "", isCompleted: false },
    ]);
    setStatusPlaceholder({ name: "Select Column", id: "dweq-12321-fdfdsf" });
    handleClose();
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
    setStatusError(false);
  }

  return (
    <dialog
      ref={dialogRef}
      id="my_modal_2"
      className="overflow-y-auto taskMaxHeight:overflow-y-visible modal"
    >
      <div className="relative p-8 overflow-y-visible taskMaxHeight:overflow-y-auto modal-box bg-c-white dark:bg-c-dark-grey">
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
        <h3 className="mb-6 text-lg font-bold text-c-black dark:text-c-white">
          Add New Task
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
              <div key={subtask.id} className="flex items-center gap-2 pr-4">
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
            {statusError && (
              <p className="text-c-main-red">Please select a column</p>
            )}
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
            Create Task
          </button>
        </form>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button id="closeButton" onClick={handleClose}>
          close
        </button>
      </form>
    </dialog>
  );
}
