import { useState } from "react";
import "tailwindcss";
import { addTask } from "../api/task";

function AddTask () {
    const [task, setTask] = useState("");

    async function onSubmit(event: React.SubmitEvent) {
        event.preventDefault();
        
        try {
            await addTask({ task, completed: false });
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
                        <input value={task} onChange={(e) => setTask(e.target.value)} type="text" className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base outline-1 -outline-offset-1"/>
                        <button type='submit' className="flex w-full justify-center rounded-mg bg-[#C8A1B1] px-3 py-1.5 text-sm/6 font-semibold hover:bg-[#6D6943] focus-visible:outline-2 focus-visible:outline-offset-2 cursor-pointer">
                            add!
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default AddTask;
