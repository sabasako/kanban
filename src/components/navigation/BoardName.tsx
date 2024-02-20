"use client";

import { DataContext } from "@/store/data-context";
import { useSearchParams } from "next/navigation";
import { useContext } from "react";

export default function BoardName({
  shouldBeHiddenForSmallScreens,
}: {
  shouldBeHiddenForSmallScreens: boolean;
}) {
  const { todoData } = useContext(DataContext);
  const searchParams = useSearchParams();

  const currentBoard = todoData.find(
    (board) => board.id === searchParams.get("id")
  );

  if (currentBoard === undefined) {
    return <span>Board wasn&apos;t found</span>;
  }

  return (
    <span className={`${shouldBeHiddenForSmallScreens ? "sm:hidden" : ""}`}>
      {currentBoard.name}
    </span>
  );
}
