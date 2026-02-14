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
        <div className="flex items-center justify-center min-h-screen w-full p-4">
            <div className="flex flex-col items-center">
                
                <h1 className='font-milton-bold text-9xl z-10 -mb-8 -ml-36 italic'>
                    {user.name}’s
                </h1>

                <h2 className='font-vogue text-5xl tracking-tight [word-spacing:-4px] relative z-0'>
                    TO DO LIST
                </h2>

                <div className="mt-4">
                    <ToDoList />
                </div>
                
            </div>
        </div>
    )
}

export default ToDoPage;