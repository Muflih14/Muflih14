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
  ITask,
} from "../../types";
import { useEffect, useState } from "react";
import TaskList from "./TaskList";
import TaskForm from "./TaskForm";
import TaskSearch from "./TaskSearch";
import TaskHeader from "./TaskHeader";
import TaskFilter from "./TaskFilter";
import Context from "./Context";
import { Notification } from "@mantine/core";
import "./style.css";
import { CONTRACT_ADDRESS } from "../../constants";
import { useAccount, useContract, useSigner } from "wagmi";
import artifacts from "../../../src/artifacts/contracts/Tasks.sol/Tasks.json";

export default function Task() {
  const [tasks, setTasks] = useState({ data: [] as ITask[] });
  const [term, setTerm] = useState("");
  const [filt, setFilt] = useState("all");

  const { address } = useAccount();
  const { data: signer } = useSigner();
  const contract = useContract({
    address: CONTRACT_ADDRESS,
    abi: artifacts.abi,
    signerOrProvider: signer,
  });

  const addTask: AddTask = async (newData) => {
    try {
      const tx = await contract?.addTask(newData.label);
      tx.wait();
      setTasks((prevState) => ({
        data: [...prevState.data, newData],
      }));
      alert("Added task to the blockchain EVM");
      console.log("Add task " + newData + " to blockchain");
    } catch {
      alert("Failed to add task to the blockchain");
      console.log("Failed to add task to the blockchain");
    }
  };

  const removeTask: RemoveTask = async (id) => {
    try {
      const tx = await contract?.deleteTask(id);
      tx.wait();

      getAllItems();
      alert("Task Removed successfully from the blockchain");
      console.log("Remove Task " + id + " from the blockchain");
    } catch {
      alert("An issue occured while removing this task!");
      console.log("Issue occured while removing task item-" + id);
    }
  };

  const updateTask: UpdateTask = async (id, newValue) => {
    try {
      const tx = await contract?.updateTask(id, newValue.label);
      tx.wait();

      let updatedTask = tasks.data.map((item) =>
        item.id === id ? newValue : item
      );
      setTasks({ data: updatedTask });
      alert("Task " + id + "has been successfully removed from the blockchain");
      console.log("Remove Task " + id + " from the blockchain");
    } catch {
      alert("An issue occured while removing task item " + id);
      console.log("Issue occured while removing task item-" + id);
    }
  };

  const onToggleImportant: OnToggleImportant = async (id) => {
    try {
      await contract?.toggleImportance(id);
      alert("The importance of task " + id + "has been changed successfully!");
      console.log("OnToggleImportant(): Change importance of task " + id);
    } catch (error) {
      alert("An issue occured while changing the importance of task " + id);
      console.log("Failed to change Status of task " + id + " in blockchain");
    }

    const newData = tasks.data.map((ele) => {
      if (ele.id === id) {
        return { ...ele, important: !ele.important };
      }
      return ele;
    });
    setTasks({ data: newData });
  };

  const onToggleCompleted: OnToggleCompleted = async (id) => {
    try {
      await contract?.markAsComplete(id);
      alert("The status of taks " + id + "has been successfully changed");
      console.log("changeTaskStatus(): Change status of task " + id);
    } catch (error) {
      alert("An issue occured while changing the status of task " + id);
      console.log("Failed to change Status of task " + id + " in blockchain");
    }

    const newData = tasks.data.map((ele) => {
      if (ele.id === id) {
        return { ...ele, isCompleted: !ele.completed };
      }
      return ele;
    });
    setTasks({ data: newData });
  };

  const updateSearch: UpdateSearch = (text) => {
    setTerm(text);
  };

  const searchTask: SearchTask = (items, term) => {
    if (term === "") {
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
    if (filt === "completed") {
      return items.filter((item) => item.completed);
    } else {
      return items;
    }
  };

  const getAllItems = async function () {
    const items = await contract?.getTasks();

    const arrTasks = items
      .map((item: any) => {
        return {
          id: item.id.toNumber(),
          label: item.task,
          important: item.isImportant,
          completed: item.isCompleted,
          isDeleted: item.isDeleted,
        };
      })
      .filter((item: any) => {
        return !item.isDeleted;
      });
    console.log({ data: arrTasks });

    setTasks({ data: arrTasks });
  };

  const visibleTasks: ITask[] = filterTask(searchTask(tasks.data, term), filt);
  const completedTask = tasks.data.filter((item) => item.completed).length;
  const allTasks = tasks.data.length;

  useEffect(() => {
    if (!signer || !address) return;

    getAllItems();
  }, [signer, address]);

  return (
    <>
      <div>
        <NavBar />
      </div>
      <div className="content">
        <TaskHeader completedTask={completedTask} allTasks={allTasks} />
        <div className="search-panel d-flex">
          <TaskSearch updateSearch={updateSearch} />
          <TaskFilter filt={filt} updateFilter={updateFilter} />
        </div>
        <Context.Provider
          value={{
            removeTask,
            updateTask,
            onToggleImportant,
            onToggleCompleted,
          }}
        >
          <TaskList tasks={visibleTasks} />
        </Context.Provider>
        <TaskForm addTask={addTask} />
      </div>
    </>
  );
}
