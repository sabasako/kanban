"use client";

import { useState } from "react";
import DownArrow from "../svgs/DownArrow";
import { ColumnType } from "@/types/data";

type DropdownProps = {
  data: ColumnType[];
  placeholder: { name: string; id: string };
  onPlaceholderChange: (name: string, id: string) => void;
};

export default function Dropdown({
  placeholder,
  data,
  onPlaceholderChange,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  function handleDropdown() {
    setIsOpen((prev) => !prev);
  }

  return (
    <div
      onClick={handleDropdown}
      className="relative w-full h-11 px-4 py-2 border rounded-sm text-c-black dark:text-c-white bg-c-white dark:bg-c-dark-grey border-[#828fa362] transition duration-300 hover:border-c-main-purple flex justify-between items-center cursor-pointer"
    >
      <p>{placeholder.name}</p>
      <DownArrow isSidebarOpen={isOpen} />
      <div
        className={`absolute left-0 right-0 overflow-auto translate-y-4 rounded-b shadow-2xl top-full bg-c-white dark:bg-c-dark-grey transition-all duration-300 ${
          isOpen
            ? "max-h-28 overflow-auto pointer-events-auto visible opacity-100"
            : "max-h-0 overflow-hidden pointer-events-none invisible opacity-0 -z-10"
        }`}
      >
        <ul className="text-sm">
          {data.map((col) => (
            <li
              key={col.id}
              className={`px-3 py-2 mb-1 hover:bg-c-main-purple hover:text-c-white ${
                placeholder.id === col.id ? "bg-c-main-purple text-c-white" : ""
              }`}
              onClick={() => {
                setIsOpen(true);
                onPlaceholderChange(col.name, col.id);
              }}
            >
              {col.name}
            </li>
          ))}
        </ul>
      </div>
      {/* {isOpen && (
      
      )} */}
    </div>
  );
}
