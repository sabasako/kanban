"use client";

import { createContext, useEffect, useState } from "react";

export const SidebarContext = createContext({
  isSidebarOpen: false,
  theme: "dark",
  handleSidebarOpen() {},
  handleSidebarClose() {},
});

export default function SidebarContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  function handleSidebarOpen() {
    setIsSidebarOpen(false);
    localStorage.isSidebarOpen = false;
  }

  function handleSidebarClose() {
    setIsSidebarOpen(true);
    localStorage.isSidebarOpen = true;
  }

  useEffect(() => {
    if (localStorage.isSidebarOpen !== undefined) {
      setIsSidebarOpen(JSON.parse(localStorage.isSidebarOpen));
    }
  }, []);

  const SidebarContextValue = {
    isSidebarOpen,
    theme: "dark",
    handleSidebarOpen,
    handleSidebarClose,
  };

  return (
    <SidebarContext.Provider value={SidebarContextValue}>
      {children}
    </SidebarContext.Provider>
  );
}
