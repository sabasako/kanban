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
  id: string;
  title: string;
  description: string;
  status: string;
  subtasks: SubtaskType[];
};

export type SubtaskType = {
  id: string;
  title: string;
  isCompleted: boolean;
};
