"use client";

import { useRef } from "react";
import Dropdown from "../board/Dropdown";

export default function AddTask() {
  const diaologRef = useRef<HTMLDialogElement | null>(null);

  function handleOpen() {
    diaologRef.current?.showModal();
  }

  function handleClose() {
    diaologRef.current?.close();
  }

  function handleForm(e: React.FormEvent) {
    e.preventDefault();
  }

  return (
    <>
      <button
        onClick={handleOpen}
        className={` px-6 py-4 hover:bg-c-main-purple-hover font-bold transition duration-300 rounded-full opacity-50 text-c-white flex items-center gap-2 lg:py-0 bg-c-main-purple active:scale-95`}
      >
        <span className="relative lg:text-3xl bottom-1">+</span>
        <span className="lg:hidden">Add New Task</span>
      </button>
      <dialog
        ref={diaologRef}
        id="my_modal_2"
        className="modal overflow-y-auto"
      >
        <div className="relative p-8 modal-box overflow-y-visible max-h-[1000px] bg-c-dark-grey">
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
          <h3 className="mb-6 text-lg font-bold text-c-white">Add New Task</h3>
          <form action="" onSubmit={handleForm}>
            <div className="flex flex-col gap-2">
              <label className="text-c-white" htmlFor="taskTitle">
                Title
              </label>
              <input
                className="w-full px-4 py-2 border rounded-md text-c-white bg-c-dark-grey border-[#828fa362] focus:outline-none focus:border-c-main-purple"
                type="text"
                name="taskTitle"
                id="taskTitle"
                placeholder="e.g. Take coffee break"
              />
            </div>

            <div className="flex flex-col gap-2 mt-5">
              <label className="text-c-white" htmlFor="taskDescription">
                Description
              </label>
              <textarea
                className="w-full px-4 py-2 border rounded-md text-c-white bg-c-dark-grey border-[#828fa362] focus:outline-none focus:border-c-main-purple"
                name="taskDescription"
                id="taskDescription"
                cols={30}
                rows={5}
                placeholder="e.g. It’s always good to take a break. This 15 minute break will 
                recharge the batteries a little."
              ></textarea>
            </div>

            <div className="flex flex-col gap-2 mt-6">
              <label className="text-c-white" htmlFor="columnTitle">
                Subtasks
              </label>
              <div className="flex items-center gap-2">
                <input
                  className="w-full px-4 py-2 border rounded-md text-c-white bg-c-dark-grey border-[#828fa362] focus:outline-none focus:border-c-main-purple"
                  type="text"
                  id="columnTitle"
                  name="columnTitle"
                  placeholder="e.g. Make coffee"
                />
                <button>
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
              <div className="flex items-center gap-2">
                <input
                  className="w-full px-4 py-2 border rounded-md text-c-white bg-c-dark-grey border-[#828fa362] focus:outline-none focus:border-c-main-purple"
                  type="text"
                  id="columnTitle1"
                  name="columnTitle"
                  placeholder="e.g. Drink coffee & smile"
                />
                <button>
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
              <button className="py-3 mt-3 font-bold duration-300 rounded-full transtion hover:opacity-60 active:scale-95 bg-c-white text-c-main-purple">
                + Add New Subtask
              </button>
            </div>

            <div className="flex flex-col gap-2 mt-5">
              <p className="text-c-white">Status</p>
              <Dropdown
                inputPlaceholderText="Select Column"
                data={["To Do", "In Progress", "Done", "ge", "ge", "ge"]}
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
    </>
  );
}
