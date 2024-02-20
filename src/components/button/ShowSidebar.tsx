"use client";

import { useContext } from "react";
import DownArrow from "../svgs/DownArrow";
import { SidebarContext } from "@/store/sidebar-context";
import BoardName from "../navigation/BoardName";

export default function ShowSidebar() {
  const { handleSidebarClose, handleSidebarOpen, isSidebarOpen } =
    useContext(SidebarContext);

  return (
    <button
      onClick={isSidebarOpen ? handleSidebarOpen : handleSidebarClose}
      className="items-center text-lg hidden gap-2 sm:flex"
    >
      <BoardName shouldBeHiddenForSmallScreens={false} />
      <DownArrow isSidebarOpen={isSidebarOpen} />
    </button>
  );
}
