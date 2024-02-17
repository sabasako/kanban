"use client";

import { createContext, useState } from "react";
import data from "@/data.json";

const dataWithIds = data.map((item, index) => {
  return { ...item, id: String(index + 1) };
});

export const DataContext = createContext(dataWithIds);

export default function DataContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [todoData, setTodoData] = useState(dataWithIds);

  const dataValue = todoData;

  return (
    <DataContext.Provider value={dataValue}>{children}</DataContext.Provider>
  );
}
