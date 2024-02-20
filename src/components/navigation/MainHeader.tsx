import { Suspense } from "react";
import AddTask from "../button/AddTask";
import ShowSidebar from "../button/ShowSidebar";
import ThreeDots from "../svgs/ThreeDots";
import BoardName from "./BoardName";

export default function MainHeader() {
  return (
    <header className="fixed right-0 flex items-center border-b sm:border-b-0 left-sidebar-width h-header-height bg-c-white dark:bg-c-dark-grey border-c-lines-light dark:border-c-lines-dark sm:left-14 sm:z-30">
      <nav className="flex items-center justify-between flex-grow p-8 sm:pl-0 sm:pr-4">
        <h1 className="text-2xl font-bold lg:text-xl text-c-black dark:text-c-white">
          <Suspense>
            <BoardName shouldBeHiddenForSmallScreens={true} />
            <ShowSidebar />
          </Suspense>
        </h1>
        <div className="flex items-center gap-12 sm:gap-3">
          <AddTask />
          <button>
            <ThreeDots />
          </button>
        </div>
      </nav>
    </header>
  );
}
