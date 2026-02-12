import "tailwindcss";
import taskData from '../data/testing.json'
import AddTask from "./AddTask";
import { useState } from "react";

function ToDoList () {
    const [complete, setCompleted] = useState(false);
    
    return (
        <>
            <div className="bg-[#F4F3EE]/65 outline-4 outline-[#6D6943] backdrop-blur-sm outline-double rounded-lg px-20 py-10 min-h-120">
            <div>
                <AddTask />
            </div>
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