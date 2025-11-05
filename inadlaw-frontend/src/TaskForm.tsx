import { useState, type FormEvent } from "react";
import axios from "axios";
import { type Todo } from "./types";


interface TaskFormProps {
        onAdd: (task: Todo) => void;
} 

export default function TaskForm({ onAdd }: TaskFormProps) {
    const [title, setTitle] = useState("");

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if(!title.trim()) return;

        const res = await axios.post<Todo>("http://localhost:7259/api/todo", {
         title,
         isCompleted: false,   
        });

        onAdd(res.data);
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