"use client";

import { useEffect, useState } from "react";
import Dark from "../svgs/Dark";
import EyeSlash from "../svgs/EyeSlash";
import Light from "../svgs/Light";

export default function DarkThemeToggle({
  onSidebar,
}: {
  onSidebar: () => void;
}) {
  const [theme, setTheme] = useState("");

  useEffect(() => {
    if (localStorage.theme === "light") {
      setTheme("light");
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.remove("bg-c-very-dark-grey");
      document.documentElement.classList.add("bg-c-light-grey");
    } else {
      setTheme("dark");
      document.documentElement.classList.add("dark");
      document.documentElement.classList.add("bg-c-very-dark-grey");
      document.documentElement.classList.remove("bg-c-light-grey");
    }
  }, []);

  function handleDarkTheme(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.checked === true) {
      setTheme("dark");
      document.documentElement.classList.add("dark");
      document.documentElement.classList.add("bg-c-very-dark-grey");
      document.documentElement.classList.remove("bg-c-light-grey");
      localStorage.theme = "dark";
    } else {
      setTheme("light");
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.remove("bg-c-very-dark-grey");
      document.documentElement.classList.add("bg-c-light-grey");
      localStorage.theme = "light";
    }
  }

  return (
    <div className="relative flex items-end flex-grow mx-auto mt-5 sm:mb-6">
      <div>
        <label className="flex items-center justify-center p-6 px-12 cursor-pointer rounded-xl dark:bg-c-very-dark-grey bg-c-light-grey gap-7 sm:px-8 sm:p-4">
          <Light />
          <input
            id="themeToggle"
            onChange={handleDarkTheme}
            type="checkbox"
            checked={theme === "dark"}
            value="synthwave"
            className="toggle theme-controller hover:bg-c-main-purple-hover bg-c-white border-c-main-purple [--tglbg:#635FC7]"
          />
          <Dark />
        </label>
        <button
          onClick={onSidebar}
          className="flex items-center justify-center w-full gap-4 py-4 mt-6 mb-12 text-xl font-bold transition duration-300 rounded-xl text-c-medium-grey dark:hover:bg-c-white hover:bg-c-main-purple-hover hover:text-c-main-purple active:scale-95 sm:hidden"
        >
          <EyeSlash /> Hide Sidebar
        </button>
      </div>
    </div>
  );
}
