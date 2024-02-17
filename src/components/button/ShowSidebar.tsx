"use client";

import { useContext } from "react";
import DownArrow from "../svgs/DownArrow";
import { SidebarContext } from "@/store/sidebar-context";

export default function ShowSidebar() {
  const { handleSidebarClose, handleSidebarOpen, isSidebarOpen } =
    useContext(SidebarContext);

  return (
    <button
      onClick={isSidebarOpen ? handleSidebarOpen : handleSidebarClose}
      className="items-center hidden gap-2 sm:flex"
    >
      Platform Launch
      <DownArrow isSidebarOpen={isSidebarOpen} />
    </button>
  );
}
