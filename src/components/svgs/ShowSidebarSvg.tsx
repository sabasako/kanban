export default function ShowSidebarSvg({
  onClick,
  isSidebarOpen,
}: {
  onClick: () => void;
  isSidebarOpen: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={`fixed left-0 px-8 py-6 transition duration-300 rounded-r-full cursor-pointer bottom-12 hover:bg-c-main-purple-hover active:scale-95 bg-c-main-purple sm:hidden ${
        isSidebarOpen
          ? "opacity-0 pointer-events-none -translate-x-16"
          : "opacity-100 pointer-events-auto translate-x-0"
      }`}
    >
      <svg
        width="32"
        height="22"
        viewBox="0 0 16 11"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M15.8154 4.43419C14.2491 1.77636 11.328 0 8 0C4.67056 0 1.75012 1.77761 0.184624 4.43419C-0.0615413 4.8519 -0.0615413 5.37033 0.184624 5.78805C1.75087 8.44585 4.67195 10.2222 8 10.2222C11.3294 10.2222 14.2499 8.4446 15.8154 5.78802C16.0615 5.37031 16.0615 4.85189 15.8154 4.43419ZM8 8.88887C5.91217 8.88887 4.22223 7.19924 4.22223 5.1111C4.22223 3.02327 5.91184 1.33333 8 1.33333C10.0878 1.33333 11.7778 3.02294 11.7778 5.1111C11.7778 7.19893 10.0882 8.88887 8 8.88887ZM8 7.99999C9.5955 7.99999 10.8889 6.7066 10.8889 5.1111C10.8889 3.51561 9.5955 2.22222 8 2.22222C7.50811 2.22222 7.04503 2.3453 6.63964 2.56211L6.64053 2.56208C7.2975 2.56208 7.83008 3.09466 7.83008 3.75163C7.83008 4.40858 7.2975 4.94116 6.64053 4.94116C5.98356 4.94116 5.45098 4.4086 5.45098 3.75163L5.451 3.75074C5.2342 4.15613 5.11112 4.61921 5.11112 5.1111C5.11112 6.7066 6.4045 7.99999 8 7.99999Z"
          fill="white"
        />
      </svg>
    </button>
  );
}
