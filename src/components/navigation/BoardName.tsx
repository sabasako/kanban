"use client";

import useCurrentBoard from "@/hooks/useCurrentBoard";

export default function BoardName({
  shouldBeHiddenForSmallScreens,
}: {
  shouldBeHiddenForSmallScreens: boolean;
}) {
  const [currentBoard] = useCurrentBoard();

  if (currentBoard === undefined) {
    return <span>Board wasn&apos;t found</span>;
  }

  return (
    <span className={`${shouldBeHiddenForSmallScreens ? "sm:hidden" : ""}`}>
      {currentBoard.name}
    </span>
  );
}
