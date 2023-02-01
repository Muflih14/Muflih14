import { ITask } from "../../types";
import TaskItem from "./TaskItem";

interface TaskListProps {
  tasks: ITask[];
}

export default function TaskList({ tasks }: TaskListProps) {
  const elements = tasks.map((task) => {
    return (
      <div className="list-group-item" key={task.id}>
        <TaskItem task={task} />
      </div>
    );
  });
  return (
    <>
      {tasks.length > 0 ? (
        <div className="app-list">{elements}</div>
      ) : (
        <h4>No Tasks!</h4>
      )}
    </>
  );
}
