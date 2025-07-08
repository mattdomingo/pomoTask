import type { FormEvent } from 'react';
import { useState } from 'react';
import { useAppState } from '../context/AppState';

export default function TaskList() {
  const { tasks, addTask, toggleTask, deleteTask } = useAppState();
  const [input, setInput] = useState('');

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (input.trim() === '') return;
    addTask(input.trim());
    setInput('');
  };

  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">Tasks</h3>
      <form onSubmit={onSubmit} className="flex gap-2 mb-4">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 border rounded p-1 text-black"
          placeholder="Add a task"
          aria-label="Task title"
        />
        <button type="submit" className="btn">
          Add
        </button>
      </form>

      <ul className="space-y-1">
        {tasks.map((task) => (
          <li
            key={task.id}
            className="flex items-center justify-between gap-2"
          >
            <label className="flex-1 inline-flex items-center gap-2">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTask(task.id)}
              />
              <span
                className={task.completed ? 'line-through opacity-60' : ''}
              >
                {task.title}
              </span>
            </label>
            <button
              aria-label="Delete task"
              onClick={() => deleteTask(task.id)}
              className="btn text-red-500"
            >
              ×
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
} 