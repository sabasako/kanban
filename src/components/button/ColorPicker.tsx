import { ColorContext } from "@/store/color-context";
import { useContext } from "react";

export default function ColorPicker({ columnId }: { columnId: string }) {
  const { changeColor, colors } = useContext(ColorContext);
  const currentColor = colors.find((color) => color.columnId === columnId);

  return (
    <div
      className={`size-4 rounded-full relative`}
      style={{
        backgroundColor: currentColor?.color,
      }}
    >
      <input
        onChange={(e) => changeColor(e.target.value, columnId)}
        className="absolute inset-0 p-0 bg-transparent rounded-full outline-none cursor-pointer border-red-50 size-4"
        value={currentColor?.color}
        type="color"
      />
    </div>
  );
}
