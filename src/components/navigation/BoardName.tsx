"use client";

import useCurrentBoard from "@/hooks/useCurrentBoard";

export default function BoardName({
  shouldBeHiddenForSmallScreens,
}: {
  shouldBeHiddenForSmallScreens: boolean;
}) {
  const [currentBoard] = useCurrentBoard();

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
