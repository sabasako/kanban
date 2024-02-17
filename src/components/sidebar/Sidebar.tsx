"use client";

import BoardButton from "./BoardButton";
import DarkThemeToggle from "./DarkThemeToggle";
import Logo from "../svgs/Logo";
import NewBoard from "../button/NewBoard";
import { useContext } from "react";
import ShowSidebarSvg from "../svgs/ShowSidebarSvg";
import { SidebarContext } from "@/store/sidebar-context";
import { DataContext } from "@/store/data-context";

export default function Sidebar() {
  const { isSidebarOpen, handleSidebarClose, handleSidebarOpen } =
    useContext(SidebarContext);

  const todoData = useContext(DataContext);

  return (
    <>
      <div
        className={`flex fixed items-center px-8 min-h-header-height w-sidebar-width border-c-lines-light bg-c-white dark:bg-c-dark-grey dark:border-c-lines-dark border-r sm:border-b-0 sm:border-r-0 sm:w-auto sm:px-4 sm:z-20 ${
          isSidebarOpen ? "" : "border-b"
        }`}
      >
        <Logo />
      </div>
      <div
        className={`h-[calc(100%-7rem)] lg:h-[calc(100%-5rem)] sm:h-auto sm:left-1/2 sm:right-1/2 sm:-translate-x-1/2 sm:top-24  sm:rounded-2xl sm:w-64 overflow-y-auto transition-transform sm:transition-opacity top-header-height fixed duration-300 flex flex-col flex-grow border-c-lines-light bg-c-white dark:bg-c-dark-grey dark:border-c-lines-dark w-sidebar-width border-r sm:border-r-0 sm:z-20 ${
          isSidebarOpen
            ? "sm:opacity-100 sm:pointer-events-auto"
            : "-translate-x-sidebar-width sm:opacity-0 sm:pointer-events-none"
        }`}
      >
        <h2 className="py-6 pl-8 font-semibold tracking-widest text-md text-c-medium-grey">
          All Boards ({todoData.length})
        </h2>
        <ul>
          {todoData.map((board) => (
            <BoardButton link={board.id} text={board.name} key={board.id} />
          ))}
        </ul>
        <NewBoard isOnSidebar={true} />
        <DarkThemeToggle onSidebar={handleSidebarOpen} />
      </div>
      <ShowSidebarSvg
        isSidebarOpen={isSidebarOpen}
        onClick={handleSidebarClose}
      />
      {isSidebarOpen && (
        <button
          onClick={handleSidebarOpen}
          className="fixed inset-0 z-10 hidden sm:block bg-black/35"
        ></button>
      )}
    </>
  );
}
