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
import { useState } from "react";
import { initialTask } from "./initialTask";
import TaskList from "./TaskList";
import TaskForm from "./TaskForm";
import TaskSearch from "./TaskSearch";
import TaskHeader from "./TaskHeader";
import TaskFilter from "./TaskFilter";
import Context from "./Context";
import "./style.css";
import Web3 from "web3";
// import { ethers } from "ethers";

const { abi } = require("../../abi/Tasks.json");
const contractAddress = process.env.TASK_CONTRACT_ADDRESs!;
const provider =
  "https://spring-muddy-energy.ethereum-goerli.discover.quiknode.pro/1a6cb2cc56c1256ac3d90d4146fdcadcf69a827d/";
const web3Provider = new Web3.providers.HttpProvider(provider);
const web3 = new Web3(web3Provider || "http://localhost:8545");
web3.eth.getBlockNumber().then((result) => {
  console.log("Latest Ethereum Block is ", result);
});

export default function Task() {
  const [tasks, setTasks] = useState(initialTask);
  const [term, setTerm] = useState("");
  const [filt, setFilt] = useState("all");

  const contract = new web3.eth.Contract(abi, contractAddress);

  const addTask: AddTask = async (newData) => {
    setTasks((prevState) => ({
      data: [...prevState.data, newData],
    }));
    try {
      await contract.methods
        .addTask(newData)
        .send({ from: web3.eth.defaultAccount });
      console.log("Add task " + newData + " to blockchain");
    } catch {
      console.log("Failed to add task to EVM");
    }
  };

  const removeTask: RemoveTask = async (id) => {
    const newData = tasks.data.filter((ele) => ele.id !== id);
    setTasks({ data: newData });

    try {
      await contract.methods
        .deleteTask(id)
        .send({ from: web3.eth.defaultAccount });
      console.log("Remove Task " + id + " from the blockchain");
    } catch {
      console.log("Issue occured while removing task item-" + id);
    }
  };

  const updateTask: UpdateTask = (id, newValue) => {
    let updatedTask = tasks.data.map((item) =>
      item.id === id ? newValue : item
    );
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

  const onToggleCompleted: OnToggleCompleted = async (id) => {
    const newData = tasks.data.map((ele) => {
      if (ele.id === id) {
        return { ...ele, completed: !ele.completed };
      }
      return ele;
    });
    setTasks({ data: newData });

    try {
      await contract.methods
        .updateStatus(id)
        .send({ from: web3.eth.defaultAccount });
      console.log("changeTaskStatus(): Change status of task " + id);
    } catch (error) {
      console.log("Failed to change Status of task " + id + " in blockchain");
    }
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

  const visibleTasks: ITask[] = filterTask(searchTask(tasks.data, term), filt);
  const completedTask = tasks.data.filter((item) => item.completed).length;
  const allTasks = tasks.data.length;

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
