"use client";

export default function AddTask() {
  function handleClick() {
    console.log("AddTask clicked");
  }

  return (
    <button
      onClick={handleClick}
      className={` px-6 py-4 hover:bg-c-main-purple-hover font-bold transition duration-300 rounded-full opacity-50 text-c-white flex items-center gap-2 lg:py-0 bg-c-main-purple active:scale-95`}
    >
      <span className="relative lg:text-3xl bottom-1">+</span>
      <span className="lg:hidden">Add New Task</span>
    </button>
  );
}
