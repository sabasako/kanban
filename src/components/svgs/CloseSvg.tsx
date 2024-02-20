export default function CloseSvg({
  strokeWidth = 1.5,
  size = 6,
}: {
  strokeWidth?: number;
  size?: number;
}) {
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={strokeWidth}
        className={`transition duration-300 size-${size} stroke-c-medium-grey hover:opacity-60 active:scale-95`}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6 18 18 6M6 6l12 12"
        />
      </svg>
    </>
  );
}
