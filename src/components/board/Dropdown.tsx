"use client";

import { useState } from "react";
import DownArrow from "../svgs/DownArrow";

type DropdownProps = {
  inputPlaceholderText: string;
  data: string[];
};

export default function Dropdown({
  inputPlaceholderText,
  data,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [placeholder, setPlaceholder] = useState(inputPlaceholderText);

  function handleDropdown() {
    setIsOpen((prev) => !prev);
  }

  function handleSelect(col: string) {
    setIsOpen(true);
    setPlaceholder(col);
  }

  return (
    <div
      onClick={handleDropdown}
      className="relative w-full h-11 px-4 py-2 border rounded-sm text-c-white bg-c-dark-grey border-[#828fa362] transition duration-300 hover:border-c-main-purple flex justify-between items-center cursor-pointer"
    >
      <p>{placeholder}</p>
      <DownArrow isSidebarOpen={isOpen} />
      {isOpen && (
        <div className="absolute left-0 right-0 overflow-auto translate-y-4 rounded-b shadow-2xl max-h-40 top-full bg-c-dark-grey">
          <ul className="text-sm">
            {data.map((col, i) => (
              <li
                key={col + i}
                className={`px-3 py-2 hover:bg-c-main-purple  ${
                  placeholder === col ? "bg-c-main-purple " : ""
                }`}
                onClick={() => handleSelect(col)}
              >
                {col}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
