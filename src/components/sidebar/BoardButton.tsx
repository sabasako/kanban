"use client";

import Link from "next/link";
import BoardSvg from "../svgs/BoardSvg";
import { useSearchParams } from "next/navigation";

type BoardButtonProps = {
  color?: string;
  link: string;
  text: string;
};

export default function BoardButton({ link, text }: BoardButtonProps) {
  const search = useSearchParams();
  const id = search.get("id");

  const active = id === link;

  return (
    <li>
      <Link
        className={`group flex cursor-grab mb-1 items-center text-md font-extrabold w-[90%] justify-start gap-3 py-4 pl-8 rounded-r-full duration-300 transition ${
          active
            ? "bg-c-main-purple text-c-white "
            : "text-c-medium-grey dark:hover:bg-c-white hover:text-c-main-purple hover:bg-c-main-purple-hover"
        } `}
        href={`board-?${new URLSearchParams({ id: link })}`}
      >
        <BoardSvg
          hoverColor="fill-c-main-purple"
          color={active ? "fill-c-white" : "fill-c-medium-grey"}
        />
        {text}
      </Link>
    </li>
  );
}
