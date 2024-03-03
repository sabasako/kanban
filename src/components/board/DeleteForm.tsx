type DeleteBoardFormProps = {
  dialogRef: React.RefObject<HTMLDialogElement>;
  handleClose: () => void;
  handleDelete: () => void;
  heading: string;
  description: string;
};

export default function DeleteForm({
  dialogRef,
  handleClose,
  handleDelete,
  heading,
  description,
}: DeleteBoardFormProps) {
  return (
    <dialog ref={dialogRef} id="my_modal_2" className="modal">
      <div className="relative p-8 modal-box bg-c-white dark:bg-c-dark-grey">
        <h3 className="mb-6 text-lg font-bold text-c-main-red">{heading}</h3>
        <p>{description}</p>
        <div className="flex justify-between gap-8 mt-6">
          <button
            className="w-full px-8 py-4 font-bold transition duration-300 rounded-full bg-c-main-red text-c-white hover:bg-c-main-red-hover active:scale-95"
            onClick={handleDelete}
          >
            Delete
          </button>
          <button
            className="w-full px-8 py-4 font-bold transition duration-300 rounded-full bg-[#625fc74c] dark:bg-c-white text-c-main-purple hover:opacity-60 active:scale-95"
            onClick={handleClose}
          >
            Cancel
          </button>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button id="closeButton" onClick={handleClose}>
          close
        </button>
      </form>
    </dialog>
  );
}
