import { useContext, useState } from 'react';
import Context from './Context';
import { ITask } from '../../types';
import TaskForm from './TaskForm';

interface TaskItemProps {
  task: ITask;
}

export default function TaskItem({ task }: TaskItemProps) {
  const { removeTask, updateTask, onToggleImportant, onToggleCompleted } = useContext(Context);

  const [edit, setEdit] = useState({
    id: 0,
    label: ''
  });

  const editTask = (task: ITask) => {
    updateTask(edit.id, task);
    setEdit({
      id: 0,
      label: ''
    });
  };

  if (edit.id) {
    return <TaskForm edit={edit} addTask={editTask} />;
  }

  let classNames = 'app-list-item d-flex justify-content-between';
  if (task.important) {
    classNames += ' important';
  }
  if (task.completed) {
    classNames += ' completed';
  }

  return (
    <div className={classNames}>
      <span onClick={() => onToggleCompleted(task.id)} className='app-list-item-label'>
        {task.label}
      </span>
      <div className='d-flex justify-content-center align-itme-center'>
        <button onClick={() => onToggleImportant(task.id)} className='btn-star btn-sm bg' type='button'>
          <i className='fa fa-star'></i>
        </button>
        <button onClick={() => removeTask(task.id)} className='btn-trash btn-sm bg' type='button'>
          <i className='fa fa-trash-o'></i>
        </button>
        <button
          onClick={() => setEdit({ id: task.id, label: task.label })}
          className='btn-trash btn-sm bg'
          type='button'
        >
          <i className='fa fa-pencil'></i>
        </button>
        <i className='fa fa-check'></i>
      </div>
    </div>
  );
}
