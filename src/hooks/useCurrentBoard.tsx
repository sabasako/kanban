"use client";

import { DataContext } from "@/store/data-context";
import { useSearchParams } from "next/navigation";
import { useContext } from "react";

export default function useCurrentBoard() {
  const { todoData } = useContext(DataContext);
  const searchParams = useSearchParams();

  const currentBoard = todoData.find(
    (board) => board.id === searchParams.get("id")
  );

  return [currentBoard];
}
