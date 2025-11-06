import axios from "axios";
import { type Todo } from "./types";


/**
 * this interface is defining the properties that
 * TaskList, must receive from its parent component
 * 
 * other words 
 * 
 * Tasklist component expects to receive
 * array of Todo
 * a function to toggle a task
 * a function to delete a task
 */
interface TaskListProps {
    tasks : Todo[];
    onToggle: (id: number) => void;
    onDelete: (id: number) => void;
    onEdit: (id: number, newTitle: string) => void;
}


export default function TaskList({ tasks, onToggle, onDelete, onEdit }: TaskListProps ) {

    const toggleComplete = async (task: Todo) => {
        const updated = { ...task, isComplete: !task.isComplete };
        await axios.put(`https://localhost:7259/api/todo/${task.id}`, updated);
        onToggle(task.id);
    };


    const deleteTask = async (id: number) => {
        await axios.delete(`https://localhost:7259/api/todo/${id}`);
        onDelete(id);
    };

    const editTask = async (id: number , newTitle: string) => {
        const task = tasks.find(t => t.id === id);
        if(!task) return;

        const updated = {title : newTitle, isCompleted: task.isComplete } // isCompleted ni sha kay sa ako model isCompleted, ur object needs(?) to match 
        await axios.put(`https://localhost:7259/api/todo/${id}`, updated);
        onEdit(id, newTitle);

    };

    const handleEdit = (id: number) => {
        const newTitle = prompt("Enter new task title:");
        if (newTitle && newTitle.trim()) {
            editTask(id, newTitle.trim());
        }
    }

    return (
        <ul>
            {tasks.map((t) => (
                <li key ={t.id}
                    className="flex items-center justify-between bg-blue-100  px-4 py-2 rounded-xl shadow-sm hover:shadow-md transition cursor-pointer"
                    onClick = {() => toggleComplete(t)}
                    
                >
                    <span
                        className ={t.isComplete ? "line-through" : ""} 
                    >
                        {t.title}
                    </span>
                    <button onClick = {(e) => { e.stopPropagation(); handleEdit(t.id)}}>
                        Edit
                    </button>
                    <button onClick = {(e) => { e.stopPropagation(); deleteTask(t.id)}}
                        className="text-red-500 hover:text-red-700 font-bold text-lg px-2 transition  rounded-full"
                    >
                    X
                    </button>
                </li>
            )

        )}             
        </ul>
    );  
}

