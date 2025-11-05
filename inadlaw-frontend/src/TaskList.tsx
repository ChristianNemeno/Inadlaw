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
}


export default function TaskList({ tasks, onToggle, onDelete }: TaskListProps ) {

    const toggleComplete = async (task: Todo) => {
        const updated = { ...task, isComplete: !task.isComplete };
        await axios.put(`http://localhost:7259/api/todo/${task.id}`, updated);
        onToggle(task.id);
    };


    const deleteTask = async (id: number) => {
        await axios.delete(`http://localhost:7259/api/todo/${id}`);
        onDelete(id);
    };

    return (
        <ul>
            {tasks.map((t) => (
                <li key ={t.id}>
                    <span
                        onClick = {() => toggleComplete(t)}
                    >
                        {t.title}
                    </span>
                    <button onClick = {() => deleteTask(t.id)}>X</button>
                </li>
            )

        )}             
        </ul>
    );  
}

