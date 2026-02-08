import "tailwindcss";
import taskData from '../data/testing.json'
import AddTask from "./AddTask";
import { useState } from "react";

function ToDoList () {
    const [complete, setCompleted] = useState(false);
    
    return (
        <>
            <div className="bg-[#F4F3EE]/65 outline-4 outline-[#6D6943] outline-double rounded-lg px-30 py-40">
            <AddTask />
                {taskData.map((task) =>
                    <div key={task.id}>
                        <p>{task.task}</p>
                    </div>
                )}
            </div>
        </>
    );
}

export default ToDoList;