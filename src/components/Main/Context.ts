import { createContext } from "react";
import {
  RemoveTask,
  OnToggleImportant,
  OnToggleCompleted,
  UpdateTask,
} from "../../types";

interface ContextProps {
  removeTask: RemoveTask;
  updateTask: UpdateTask;
  onToggleImportant: OnToggleImportant;
  onToggleCompleted: OnToggleCompleted;
}

const Context = createContext<ContextProps>({
  removeTask: () => {},
  updateTask: () => {},
  onToggleImportant: () => {},
  onToggleCompleted: () => {},
});

export default Context;
