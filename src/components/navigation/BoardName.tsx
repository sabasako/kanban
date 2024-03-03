"use client";

import useCurrentBoard from "@/hooks/useCurrentBoard";
import { usePathname } from "next/navigation";

export default function BoardName({
  shouldBeHiddenForSmallScreens,
}: {
  shouldBeHiddenForSmallScreens: boolean;
}) {
  const [currentBoard] = useCurrentBoard();
  const path = usePathname();

  if (path === "/") {
    return (
      <span className={`${shouldBeHiddenForSmallScreens ? "sm:hidden" : ""}`}>
        Home
      </span>
    );
  }

  if (currentBoard === undefined) {
    return (
      <span className={`${shouldBeHiddenForSmallScreens ? "sm:hidden" : ""}`}>
        Board wasn&apos;t found
      </span>
    );
  }

  return (
    <span
      className={`${
        shouldBeHiddenForSmallScreens ? "sm:hidden" : ""
      } sm:text-sm`}
    >
      {currentBoard.name}
    </span>
  );
}
