import { useState, type FormEvent } from "react";
import axios from "axios";
import { type Todo } from "./types";


interface TaskFormProps {
        addTask: (task: Todo) => void;
} 

export default function TaskForm({ addTask }: TaskFormProps) {
    const [title, setTitle] = useState("");

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if(!title.trim()) return;

        const res = await axios.post<Todo>("https://localhost:7259/api/todo", {
         title,
         isComplete: false,   
        });

        addTask(res.data);
        setTitle("");
    };

    return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "1rem" }}>
      <input
        type="text"
        placeholder="Add a task"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{ padding: "8px", marginRight: "8px" }}
      />
      <button type="submit">Add</button>
    </form>
  );
}