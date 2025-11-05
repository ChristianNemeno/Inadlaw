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

