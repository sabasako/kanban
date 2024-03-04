"use client";

import Link from "next/link";
import BoardSvg from "../svgs/BoardSvg";
import { useSearchParams } from "next/navigation";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

type BoardButtonProps = {
  color?: string;
  link: string;
  text: string;
};

export default function BoardButton({ link, text }: BoardButtonProps) {
  const search = useSearchParams();
  const id = search.get("id");
  const active = id === link;

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: link });

  const style = { transition, transform: CSS.Transform.toString(transform) };

  return (
    <li
      ref={setNodeRef}
      key={id}
      style={style}
      {...attributes}
      {...listeners}
      className="touch-none"
    >
      <Link
        className={`group flex cursor-grab mb-1 items-center text-md font-extrabold w-[90%] justify-start gap-3 py-4 pl-8 rounded-r-full duration-300 transition
         ${isDragging ? "pointer-events-none" : ""} 
        ${
          active
            ? "bg-c-main-purple text-c-white "
            : "text-c-medium-grey dark:hover:bg-c-white hover:text-c-main-purple hover:bg-c-main-purple-hover"
        } `}
        href={`board-?${new URLSearchParams({ id: link })}`}
      >
        <BoardSvg
          hoverColor="fill-c-main-purple"
          color={active ? "fill-c-white" : "fill-c-medium-grey"}
          isActive={active}
        />
        {text}
      </Link>
    </li>
  );
}
