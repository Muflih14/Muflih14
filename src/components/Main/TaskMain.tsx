import NavBar from "../NavBar/NavBar";
import {
    RemoveTask,
    OnToggleImportant,
    OnToggleCompleted,
    UpdateTask,
    AddTask,
    UpdateSearch,
    SearchTask,
    UpdateFilter,
    FilterTask,
    ITask
  } from '../../types';
  import { useState } from 'react';
  import { initialTask } from './initialTask';
  import TaskList from './TaskList';
  import TaskForm from './TaskForm';
  import TaskSearch from './TaskSearch';
  import TaskHeader from './TaskHeader';
  import TaskFilter from './TaskFilter';
  import Context from './Context';
  import './style.css';
  
  export default function Task() {
    const [tasks, setTasks] = useState(initialTask);
    const [term, setTerm] = useState('');
    const [filt, setFilt] = useState('all');
  
    const addTask: AddTask = (newData) => {
      setTasks((prevState) => ({
        data: [...prevState.data, newData]
      }));
    };
  
    const removeTask: RemoveTask = (id) => {
      const newData = tasks.data.filter((ele) => ele.id !== id);
      setTasks({ data: newData });
    };
  
    const updateTask: UpdateTask = (id, newValue) => {
      let updatedTask = tasks.data.map((item) => (item.id === id ? newValue : item));
      setTasks({ data: updatedTask });
    };
  
    const onToggleImportant: OnToggleImportant = (id) => {
      const newData = tasks.data.map((ele) => {
        if (ele.id === id) {
          return { ...ele, important: !ele.important };
        }
        return ele;
      });
      setTasks({ data: newData });
    };
  
    const onToggleCompleted: OnToggleCompleted = (id) => {
      const newData = tasks.data.map((ele) => {
        if (ele.id === id) {
          return { ...ele, completed: !ele.completed };
        }
        return ele;
      });
      setTasks({ data: newData });
    };
  
    const updateSearch: UpdateSearch = (text) => {
      setTerm(text);
    };
  
    const searchTask: SearchTask = (items, term) => {
      if (term === '') {
        return items;
      }
      return items.filter((item) => {
        return item.label.toLowerCase().includes(term.toLowerCase());
      });
    };
  
    const updateFilter: UpdateFilter = (filte) => {
      setFilt(filte);
    };
  
    const filterTask: FilterTask = (items, filt) => {
      if (filt === 'completed') {
        return items.filter((item) => item.completed);
      } else {
        return items;
      }
    };
  
    const visibleTasks: ITask[] = filterTask(searchTask(tasks.data, term), filt);
    const completedTask = tasks.data.filter((item) => item.completed).length;
    const allTasks = tasks.data.length;
  
    return (
      <>
       <div>
        <NavBar />
        </div>
        <div className='content'>
          <TaskHeader completedTask={completedTask} allTasks={allTasks} />
          <div className='search-panel d-flex'>
            <TaskSearch updateSearch={updateSearch} />
            <TaskFilter filt={filt} updateFilter={updateFilter} />
          </div>
          <Context.Provider value={{ removeTask, updateTask, onToggleImportant, onToggleCompleted }}>
            <TaskList tasks={visibleTasks} />
          </Context.Provider>
          <TaskForm addTask={addTask} />
        </div>
      </>      
    );
  }
  