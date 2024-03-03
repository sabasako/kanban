import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  closestCorners,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import BoardButton from "./BoardButton";
import { useContext } from "react";
import { DataContext } from "@/store/data-context";

export default function BoardLinks() {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        tolerance: 5,
        delay: 200,
      },
    }),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );
  const { dragBoardLinks, todoData: data } = useContext(DataContext);

  function handleDragEnd(event: any) {
    dragBoardLinks(event);
  }

  return (
    <DndContext
      id="1412h412u4gfdg-12414n1ju4-fgdsgju124"
      sensors={sensors}
      onDragEnd={handleDragEnd}
      collisionDetection={closestCorners}
    >
      <SortableContext items={data} strategy={verticalListSortingStrategy}>
        <ul className="overflow-hidden">
          {data.map((board) => (
            <BoardButton link={board.id} text={board.name} key={board.id} />
          ))}
        </ul>
      </SortableContext>
    </DndContext>
  );
}
