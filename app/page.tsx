"use client";
import { useState } from "react";

export default function Home() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  const handlesubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (task.trim()) {
      setTasks([...tasks, task]);
      setTask("");
    }
  };

  const handledelete = (index: number) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const [cdc, setCompletedTasks] = useState<never[]>([]);

  const handlemarkasdone = (index: number) => {
    setCompletedTasks([...cdc, tasks[index]]);
    handledelete(index);
  };

  const handleCompleteddelete = (index: number) => {
    setCompletedTasks(cdc.filter((_, i) => i !== index));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>To-Do List app</h1>

      <div>
        <form onSubmit={handlesubmit}>
          <input
            type="text"
            placeholder="Add a task"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            className="text-black p-2 border-2 border-gray-300 rounded-md m-2"
          />
          <button type="submit">Add</button>
        </form>
      </div>

      <div className="flex flex-col items-center justify-center w-[1200px] mt-4">
        <ul className="w-[40%] flex flex-col items-center justify-center gap-1">
          {tasks.map((task, index) => (
            <li
              key={index}
              className="flex flex-row gap-10 items-center justify-between w-full bg-slate-100 mt-2 p-3 rounded-md">
              <input
                type="checkbox"
                className="mr-2"
                onChange={(e) =>
                  e.target.checked ? handlemarkasdone(index) : null
                }
              />
              <p>{task}</p>
              <button
                className="text-red-500"
                onClick={() => handledelete(index)}>
                Delete
              </button>
            </li>
          ))}

          {cdc.map((task, i) => {
            return (
              <li
                key={i}
                className="flex flex-row gap-10 items-center justify-between w-full bg-slate-100 mt-2 p-3 rounded-md">
                <p style={{ textDecoration: "line-through" }}>{task}</p>
                <button
                  className="text-red-500"
                  onClick={() => handleCompleteddelete(i)}>
                  Delete
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
