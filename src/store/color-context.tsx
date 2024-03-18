import { createContext, useEffect, useState } from "react";
import defaultColors from "@/data/colors.json";
import { ColorType } from "@/types/colorType";
import { produce } from "immer";

export const ColorContext = createContext<{
  colors: ColorType[];
  changeColor: (color: string, columnId: string) => void;
}>({
  colors: defaultColors,
  changeColor: () => {},
});

export default function ColorContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [colors, setColors] = useState<ColorType[]>(defaultColors);

  useEffect(() => {
    const storedColors = window.localStorage.getItem("colors");
    if (storedColors) {
      setColors(JSON.parse(storedColors));
    }
  }, []);

  function changeColor(color: string, columnId: string) {
    const newColors = produce(colors, (draft) => {
      draft.forEach((currentColor) => {
        if (currentColor.columnId === columnId) {
          currentColor.color = color;
        }
      });
    });
    window.localStorage.setItem("colors", JSON.stringify(newColors));
    setColors(newColors);
  }

  return (
    <ColorContext.Provider value={{ colors, changeColor }}>
      {children}
    </ColorContext.Provider>
  );
}
