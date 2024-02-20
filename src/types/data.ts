export type DataType = {
  id: string;
  name: string;
  columns: ColumnType[];
};

export type ColumnType = {
  id: string;
  name: string;
  tasks: TaskType[];
};

export type TaskType = {
  title: string;
  description: string;
  status: string;
  subtasks: SubtaskType[];
};

export type SubtaskType = {
  title: string;
  isCompleted: boolean;
};
