import { useState } from "react";
import "tailwindcss";
import { addTask, type Task } from "../api/task";

type AddTaskProps = {
    onTaskAdded: (task: Task) => void;
};

function AddTask({ onTaskAdded }: AddTaskProps) {
    const [task, setTask] = useState("");

    async function onSubmit(event: React.SubmitEvent) {
        event.preventDefault();
        if (!task.trim()) return;
        
        try {
            const createdTask = await addTask({ task: task.trim(), completed: false });
            onTaskAdded(createdTask);
            setTask("");
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <div className="mb-12">
                <form onSubmit={onSubmit}>
                    <div>
                        <label htmlFor="task" className="block text-sm/6 text-center font-medium">
                            Add a task
                        </label>
                        <input value={task} onChange={(e) => setTask(e.target.value)} type="text" className="block w-full rounded-md bg-isabelline px-3 py-1.5 text-base outline-1 -outline-offset-1 focus:outline-pinklav"/>
                        <button type='submit' className="mt-3 flex w-full justify-center rounded-md rounded-mg bg-[#C8A1B1] px-3 py-1.5 text-sm/6 font-semibold hover:bg-[#6D6943] hover:text-isabelline focus-visible:outline-2 focus-visible:outline-offset-2 cursor-pointer">
                            add!
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default AddTask;
