interface TaskHeaderProps {
  completedTask: number;
  allTasks: number;
}

export default function TaskHeader({
  completedTask,
  allTasks,
}: TaskHeaderProps) {
  return (
    <div className="app-header d-flex">
      <h1>Become a Solidity Developer</h1>
      <h2>
        {allTasks} records, from them Completed {completedTask}{" "}
      </h2>
    </div>
  );
}
