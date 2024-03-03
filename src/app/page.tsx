"use client";

import EmptyButton from "@/components/button/EmptyButton";
import { DataContext } from "@/store/data-context";
import { SidebarContext } from "@/store/sidebar-context";
import { useContext } from "react";

export default function Home() {
  const { isSidebarOpen } = useContext(SidebarContext);
  const { todoData } = useContext(DataContext);

  return (
    <main className={`${isSidebarOpen ? "pl-80" : "pl-0"} pt-28 sm:px-8`}>
      <EmptyButton
        text={`Create a new Board to get started ${
          todoData.length !== 0 ? "or select existing one on sidebar" : ""
        }.`}
      />
    </main>
  );
}
