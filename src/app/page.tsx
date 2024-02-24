"use client";

import EmptyButton from "@/components/button/EmptyButton";
import { SidebarContext } from "@/store/sidebar-context";
import { useContext } from "react";

export default function Home() {
  const { isSidebarOpen } = useContext(SidebarContext);

  return (
    <main className={`${isSidebarOpen ? "pl-80 sm:pl-0" : "pl-0"} pt-28`}>
      <EmptyButton text="Create a new Board to get started." />
    </main>
  );
}
