import {
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  MouseSensor,
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
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 150,
        tolerance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );
  const { dragBoardLinks, todoData: data } = useContext(DataContext);

  function handleDragEnd(event: DragEndEvent) {
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
        <ul className="">
          {data.map((board) => (
            <BoardButton link={board.id} text={board.name} key={board.id} />
          ))}
        </ul>
      </SortableContext>
    </DndContext>
  );
}
