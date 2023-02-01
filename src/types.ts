export interface ITask {
  id: number;
  label: string;
  important: boolean;
  completed: boolean;
}
export interface IData {
  data: ITask[];
}
export interface IEdit {
  id: number | null;
  label: string;
}
export interface IArray {
  name: string;
  label: string;
}
export type RemoveTask = (id: number) => void;
export type UpdateTask = (id: number, value: ITask) => void;
export type OnToggleImportant = (id: number) => void;
export type OnToggleCompleted = (id: number) => void;
export type AddTask = (task: ITask) => void;
export type UpdateSearch = (term: string) => void;
export type SearchTask = (items: ITask[], term: string) => ITask[];
export type UpdateFilter = (filt: string) => void;
export type OnSelect = (item: IArray) => void;
export type FilterTask = (items: ITask[], filt: string) => ITask[];
