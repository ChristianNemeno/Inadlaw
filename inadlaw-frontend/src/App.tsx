import { useEffect, useState } from "react";
import axios from "axios";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";
import { type Todo } from "./types";
import './App.css'

export default function App() {
  const [tasks, setTasks] = useState<Todo[]>([])

  useEffect(() => {
    axios.get<Todo[]>("https://localhost:7259/api/Todo").then((res) => setTasks(res.data));
    
  }, []);

  const addTask = (task: Todo) => setTasks((prev) => [...prev, task]);

  const toggleTask = (id: number) =>
    setTasks((prev) => 
      prev.map( (t) => (t.id === id ? {...t, isComplete: !t.isComplete} : t))
    );
    
    const deleteTask = (id: number) =>
      setTasks((prev) => prev.filter((t) => (t.id !== id)));

  const editTask = (id: number, newTitle:string) =>
    setTasks((prev) =>
        prev.map((t) => (t.id === id ? {...t, title: newTitle} : t))
    );
        


  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold text-blue-600 mb-6">Todo App</h1>
        <TaskForm addTask={addTask} />
        <TaskList tasks={tasks} onToggle={toggleTask} onDelete={deleteTask} onEdit={editTask} />
      </div>
    </div>
  );
}
