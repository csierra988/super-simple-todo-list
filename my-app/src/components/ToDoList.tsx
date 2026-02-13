import "tailwindcss";
// import taskData from '../data/testing.json'
import AddTask from "./AddTask";
import { useEffect, useState } from "react";
import { type Task, deleteTask, getAllTasks, updateTask } from "../api/task";
import stars from "../../images/multiple_stars.png";
import stars_uncomplete from "../../images/multiple_stars_uncomplete.png";
import TrashSolidIcon from "../assets/TrashSolidIcon";

function ToDoList () {
    const [tasks, setTasks] = useState<Task[]>([]);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await getAllTasks();
                setTasks(response);
            } catch (error) {
                console.log(error);
            }
        };
        fetchTasks();
    }, []); //only runs once on mount

    function handleTaskAdded(newTask: Task) {
        setTasks((prevTasks) => [newTask, ...prevTasks]);
    }

    async function handleDelete(taskId: number) {
        const confirmation = window.confirm("Are you sure you want to delete this task?");

        if (confirmation) {
            try {
                await deleteTask(taskId);
                setTasks(tasks.filter(t => t.taskId !== taskId));
            } catch (error) {
                console.log(error);
            }
        }
    }

    async function handleUpdateTask(taskId: number, currentCompleted: boolean) {
        const nextCompleted = !currentCompleted;

        setTasks((prevTasks) =>
            prevTasks.map((task) =>
                task.taskId === taskId ? { ...task, completed: nextCompleted } : task
            )
        );

        try {
            await updateTask(taskId, { completed: nextCompleted });
        } catch (error) {
            setTasks((prevTasks) =>
                prevTasks.map((task) =>
                    task.taskId === taskId ? { ...task, completed: currentCompleted } : task
                )
            );
            console.log(error);
        }
    }
    
    return (
        <>
            <div className="bg-[#F4F3EE]/65 outline-4 outline-[#6D6943] backdrop-blur-sm outline-double rounded-lg w-[92vw] max-w-[860px] px-20 py-10 h-[70vh] max-h-[70vh] flex flex-col">
            <div>
                <AddTask onTaskAdded={handleTaskAdded} />
            </div>
            <div className="scrollbar-transparent flex-1 overflow-y-auto px-4 pr-6">
                {tasks.map((task) =>
                    <div key={task.taskId} className="flex w-full flex-row items-center gap-3 py-1 pr-2">
                        <img src={task.completed ? stars : stars_uncomplete} onClick={() => handleUpdateTask(task.taskId, task.completed)} className="h-10 w-auto shrink-0 cursor-pointer"/>
                        <p className="min-w-0 flex-1 break-words">{task.task}</p>
                        <button onClick={(() => handleDelete(task.taskId))} type="button" className="ml-auto cursor-pointer p-1 text-white">
                            <TrashSolidIcon size={20} color="#6D6943" />
                        </button>
                    </div>
                )}
            </div>
            </div>
        </>
    );
}

export default ToDoList;
