import { useAuth } from "../auth/AuthContext";
import ToDoList from "../components/ToDoList";

function ToDoPage() {
    const {user} = useAuth();
    
    if (!user) {
        return (
            <>
            <p> im not authenticated</p>
            </>
        )
    }

    return (
        <>
        <div className="flex items-center justify-center h-screen w-full">
        <div className="grid grid-cols-1 grid-rows-1">
            <p className='text-center'>{user.name}'s</p>
            <p className='text-center pb-6'>TO DO LIST</p>
            <ToDoList />
        </div>
      </div>
        </>
    )
}

export default ToDoPage;