export default function DownArrow({
  isSidebarOpen,
}: {
  isSidebarOpen: boolean;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      className={`stroke-c-main-purple size-5 transition duration-300 ${
        isSidebarOpen ? "rotate-180" : ""
      }`}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m19.5 8.25-7.5 7.5-7.5-7.5"
      />
    </svg>
  );
}
