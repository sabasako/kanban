import AddButton from "../button/AddTask";
import ShowSidebar from "../button/ShowSidebar";
import ThreeDots from "../svgs/ThreeDots";

export default function MainHeader() {
  return (
    <header className="fixed right-0 flex items-center border-b sm:border-b-0 left-sidebar-width h-header-height bg-c-white dark:bg-c-dark-grey border-c-lines-light dark:border-c-lines-dark sm:left-14 sm:z-30">
      <nav className="flex items-center justify-between flex-grow p-8 sm:pl-0 sm:pr-4">
        <h1 className="text-2xl font-bold lg:text-xl text-c-black dark:text-c-white">
          <span className="sm:hidden">Platform Launch</span>
          <ShowSidebar />
        </h1>
        <div className="flex items-center gap-12 sm:gap-3">
          <AddButton />
          <button>
            <ThreeDots />
          </button>
        </div>
      </nav>
    </header>
  );
}
