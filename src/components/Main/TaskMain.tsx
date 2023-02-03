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

const { abi } = require("../../abi/Tasks.json");
const contractAddress = process.env.TASK_CONTRACT_ADDRESs!;
const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");

async function getAccount() {
  let accounts = await web3.eth.getAccounts();
  web3.eth.defaultAccount = accounts[0];
  console.log(web3.eth.defaultAccount + " account detected");
  return web3.eth.defaultAccount;
}

export default function Task() {
  const [tasks, setTasks] = useState(initialTask);
  const [term, setTerm] = useState("");
  const [filt, setFilt] = useState("all");

  // Set contract //
  const contract = new web3.eth.Contract(abi, contractAddress);

  const addTask: AddTask = async (newData) => {
    setTasks((prevState) => ({
      data: [...prevState.data, newData],
    }));
    try {
      await getAccount();
      console.log("account gotten");
      try {
        const numberOfTask = await contract.methods
          .getTaskCount()
          .call({ from: web3.eth.defaultAccount });
        console.log("Number of Tasks are " + numberOfTask);
        if (numberOfTask !== 0) {
          console.log("Start fetching task ...");
          let taskIterator = 0;
          while (taskIterator < numberOfTask) {
            try {
              let task = await contract.methods
                .getTask(taskIterator)
                .call({ from: web3.eth.defaultAccount });
              if (task[0] !== "") {
                updateTask(taskIterator, task[1]);
              } else {
                console.log("The index " + taskIterator + " is empty");
              }
            } catch {
              console.log("Failed to get Task " + taskIterator);
            }
            taskIterator++;
          }
        }
      } catch {
        console.log("Failed to get task count from blockchain");
      }
    } catch {
      console.log("Failed to get the account");
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
