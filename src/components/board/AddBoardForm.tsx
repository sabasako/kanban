import { DataContext } from "@/store/data-context";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const MAX_BOARDNAME_LENGTH = 30;
const MAX_COLUMNNAME_LENGTH = 25;

type AddBoardFormProps = {
  dialogRef: React.RefObject<HTMLDialogElement>;
  handleClose: () => void;
};

export default function AddBoardForm({
  dialogRef,
  handleClose,
}: AddBoardFormProps) {
  const { addBoard } = useContext(DataContext);
  const router = useRouter();

  const boardId = uuidv4();

  const [boardName, setBoardName] = useState("");
  const [columns, setColumns] = useState([{ value: "", id: "" }]);

  // handles the form submission
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    // checks if the board name and column titles are valid
    if (boardName.length > MAX_BOARDNAME_LENGTH) return;
    if (columns.some((col) => col.value.length > MAX_COLUMNNAME_LENGTH)) return;

    // submits form based on if user is editing or adding new board
    addBoard(boardName, columns, boardId);
    router.push(`/boards?${new URLSearchParams({ id: boardId })}`);

    // resets the form
    setBoardName("");
    setColumns([{ value: "", id: "" }]);
    handleClose();
  }

  // updates the columns title
  function handleNewColumnChange(id: string, value: string) {
    setColumns((prev) =>
      prev.map((col) => {
        if (col.id === id) {
          return { ...col, value };
        }
        return col;
      })
    );
  }

  // adds new column to the board
  function handleNewColumn() {
    setColumns((prev) => [...prev, { id: uuidv4(), value: "" }]);
  }

  // deletes the column
  function handleColumnDelete(
    e: React.MouseEvent<HTMLButtonElement>,
    id: string
  ) {
    e.preventDefault();
    setColumns((prev) => prev.filter((col) => col.id !== id));
  }

  return (
    <dialog ref={dialogRef} id="my_modal_2" className="modal">
      <div className="relative p-8 modal-box bg-c-white dark:bg-c-dark-grey">
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
          Add New Board
        </h3>
        <form action="" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2">
            <label
              className="font-bold text-c-medium-grey dark:text-c-white"
              htmlFor="boardName"
            >
              Board Name
            </label>
            <input
              required
              value={boardName}
              onChange={(e) => setBoardName(e.target.value)}
              className="w-full px-4 py-2 border rounded-md text-c-black dark:text-c-white bg-c-white dark:bg-c-dark-grey border-[#828fa362] focus:outline-none focus:border-c-main-purple"
              type="text"
              name="boardName"
              id="boardName"
              placeholder="e.g. Web Design"
            />
            {boardName.length > MAX_BOARDNAME_LENGTH && (
              <p className="text-sm text-c-main-red">
                Board name should be less than {MAX_BOARDNAME_LENGTH} characters
              </p>
            )}
          </div>

          <div className="flex flex-col gap-2 mt-6">
            <p className="font-bold text-c-medium-grey dark:text-c-white">
              Board Columns
            </p>
            {columns.length === 0 && <p>No Columns Added</p>}
            {columns.map((col) => (
              <div key={col.id}>
                <div className="flex items-center gap-2">
                  <input
                    required
                    value={col.value}
                    onChange={(e) =>
                      handleNewColumnChange(col.id, e.target.value)
                    }
                    className="w-full px-4 py-2 border rounded-md text-c-black dark:text-c-white bg-c-white dark:bg-c-dark-grey border-[#828fa362] focus:outline-none focus:border-c-main-purple"
                    type="text"
                    id={col.id}
                    name={col.id}
                    placeholder={"e.g. Todo"}
                  />
                  <button
                    type="button"
                    onClick={(e) => handleColumnDelete(e, col.id)}
                  >
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
                {col.value.length > MAX_COLUMNNAME_LENGTH && (
                  <p className="mt-1 text-sm text-c-main-red">
                    Column title should be less than {MAX_COLUMNNAME_LENGTH}{" "}
                    characters
                  </p>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={handleNewColumn}
              className="py-3 mt-3 font-bold duration-300 rounded-full transtion hover:opacity-60 active:scale-95 bg-[#625fc73c] dark:bg-c-white text-c-main-purple"
            >
              + Add New Column
            </button>
          </div>
          <button
            className="w-full py-3 mt-6 font-bold duration-300 rounded-full transtion hover:bg-c-main-purple-hover active:scale-95 bg-c-main-purple text-c-white"
            type="submit"
          >
            Create New Board
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
