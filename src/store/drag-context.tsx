// "use client";

// import { DataType } from "@/types/data";
// import { DragEndEvent, DragMoveEvent } from "@dnd-kit/core";
// import { arrayMove } from "@dnd-kit/sortable";
// import { createContext } from "react";

// export const DragContext = createContext({});

// export default function DragContextProvider({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   // handles drag and drop of board links
//   function dragBoardLinks(event: DragEndEvent) {
//     const { active, over } = event;

//     if (!active || !over) return;
//     if (active?.id === over?.id) return;

//     setTodoData((prev) => {
//       // prettier-ignore
//       const originalPosition = prev.findIndex((task) => task.id === active.id);
//       const newPosition = prev.findIndex((task) => task.id === over.id);

//       return arrayMove(prev, originalPosition, newPosition);
//     });
//   }

//   // handles drag and drop of columns
//   function dragColumn(event: DragEndEvent, currentBoardId: string) {
//     const { active, over } = event;

//     if (!active || !over) return;
//     if (active?.id === over?.id) return;

//     setTodoData((prev) => {
//       const currentBoard = prev.find((board) => board.id === currentBoardId);
//       if (!currentBoard) return prev;

//       const originalPosition = currentBoard.columns.findIndex(
//         (column) => column.id === active.id
//       );
//       const newPosition = currentBoard.columns.findIndex(
//         (column) => column.id === over.id
//       );

//       const newColumns = arrayMove(
//         currentBoard.columns,
//         originalPosition,
//         newPosition
//       );

//       const newData = prev.map((board) => ({
//         ...board,
//         columns: board.id === currentBoardId ? newColumns : board.columns,
//       }));

//       return newData;
//     });
//   }

//   // handles drag and drop of tasks
//   function dragTask(event: DragMoveEvent, currentBoard: DataType) {
//     const activeId = event.active.id;
//     const overId = event.over?.id;

//     if (!event.active || !event.over) return;

//     const isActiveATask = event.active.data.current?.type === "task";
//     const isOverColumn = event.over.data.current?.type === "column";
//     const isColumnEmpty = event.over.data.current?.column?.tasks?.length === 0;

//     // If none of the active items are tasks, then it's a column, therefore stop function (we handle that case in handleDragEnd)
//     if (!isActiveATask) return;

//     const activeColumn = currentBoard?.columns.find((col) =>
//       col.tasks.find((task) => task.id === activeId)
//     );
//     const overColumn = currentBoard?.columns.find((col) =>
//       col.tasks.find((task) => task.id === overId)
//     );

//     const isSameColumn = activeColumn?.id === overColumn?.id;

//     // If user is draggin task onto same column
//     if (isSameColumn) {
//       setTodoData((prev) => {
//         if (!activeColumn || !overColumn) return prev;

//         const activeIndex = activeColumn.tasks.findIndex(
//           (task) => task.id === activeId
//         );
//         const overIndex = overColumn.tasks.findIndex(
//           (task) => task.id === overId
//         );

//         const newTasks = arrayMove(activeColumn.tasks, activeIndex, overIndex);

//         return prev.map((board) => ({
//           ...board,
//           columns:
//             board.id === currentBoard.id
//               ? board.columns.map((col) => ({
//                   ...col,
//                   tasks: col.id === activeColumn.id ? newTasks : col.tasks,
//                 }))
//               : board.columns,
//         }));
//       });
//     } else if (!isSameColumn && !isColumnEmpty) {
//       // If user is draggin task onto different column
//       setTodoData((prev) => {
//         if (!activeColumn || !overColumn) return prev;
//         const overIndex = overColumn.tasks.findIndex(
//           (task) => task.id === overId
//         );

//         const filteredTasks = activeColumn.tasks.filter(
//           (task) => task.id !== activeId
//         );
//         const newTasks = [
//           ...overColumn.tasks.slice(0, overIndex),
//           event.active.data.current?.task,
//           ...overColumn.tasks.slice(overIndex),
//         ];

//         return prev.map((board) => ({
//           ...board,
//           columns:
//             board.id === currentBoard.id
//               ? board.columns.map((col) => {
//                   if (col.id === activeColumn.id) {
//                     return {
//                       ...col,
//                       tasks: filteredTasks,
//                     };
//                   } else if (col.id === overColumn.id) {
//                     return {
//                       ...col,
//                       tasks: newTasks,
//                     };
//                   } else {
//                     return col;
//                   }
//                 })
//               : board.columns,
//         }));
//       });
//     } else if (isOverColumn && isColumnEmpty) {
//       // if user is draggin task onto different column, which is empty
//       setTodoData((prev) => {
//         // Existing method of finding overColumn will be wrong, because i found it using over tasks, which isn't case here, because there are no tasks in this column. Now overId will belong to over column not over tasks
//         const newOverColumn = currentBoard.columns.find(
//           (col) => col.id === overId
//         );

//         if (!activeColumn || !newOverColumn) return prev;

//         const filteredTasks = activeColumn.tasks.filter(
//           (task) => task.id !== activeId
//         );
//         const newTask = event.active.data.current?.task;

//         return prev.map((board) => ({
//           ...board,
//           columns:
//             board.id === currentBoard.id
//               ? board.columns.map((col) => {
//                   if (col.id === activeColumn.id) {
//                     return {
//                       ...col,
//                       tasks: filteredTasks,
//                     };
//                   } else if (col.id === newOverColumn.id) {
//                     return {
//                       ...col,
//                       tasks: [newTask],
//                     };
//                   } else {
//                     return col;
//                   }
//                 })
//               : board.columns,
//         }));
//       });
//     }
//   }

//   const value = {};
//   return <DragContext.Provider value={value}>{children}</DragContext.Provider>;
// }
