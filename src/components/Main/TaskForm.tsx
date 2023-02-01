import React, { useState } from "react";
import { AddTask, IEdit } from "../../types";

interface TaskFormProps {
  addTask: AddTask;
  edit?: IEdit;
}

export default function TaskForm({ addTask, edit }: TaskFormProps) {
  const [state, setState] = useState(edit ? edit.label : "");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!state || /^\s*$/.test(state)) return;
    addTask({
      id: Date.now(),
      label: state,
      important: false,
      completed: false,
    });
    setState("");
  };

  return (
    <form onSubmit={handleSubmit} className="botton-panel d-flex">
      {edit ? (
        <>
          <input
            className="form-control new-post-label"
            type="text"
            placeholder="new task"
            onChange={handleChange}
            value={state}
          />
          <button className="btn btn-outline-secondary" type="submit">
            Update
          </button>
        </>
      ) : (
        <>
          <input
            className="form-control new-post-label"
            type="text"
            placeholder="new task"
            onChange={handleChange}
            value={state}
          />
          <button className="btn btn-outline-secondary" type="submit">
            Add
          </button>
        </>
      )}
    </form>
  );
}
