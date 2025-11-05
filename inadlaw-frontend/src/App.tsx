import { useEffect, useState } from "react";
import axios from "axios";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";
import { type Todo } from "./types";
import './App.css'

function App() {
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
        


  return (
    <div>
      <h1>Todo App</h1>
      <TaskForm addTask={addTask} />
      <TaskList tasks={tasks} onToggle={toggleTask} onDelete={deleteTask} />
    </div>
  );
}

export default App;
