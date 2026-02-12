import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

function SignUp() {
    const { signup } = useAuth();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const navigate = useNavigate();

    async function onSubmit(event: React.SubmitEvent) {
        event.preventDefault();
        setErrorMessage("");
        try{
            await signup({username, password, name});
            navigate('/');
        } catch(error) {
            setErrorMessage(String(error));
        }
    }

    return (
        <>
            <div className="flex min-h-screen items-center justify-center p-4">
            <div className="bg-[#F4F3EE]/70 backdrop-blur-sm outline-4 outline-[#6D6943] outline-double rounded-lg px-8 py-10 w-full max-w-md shadow-2xl">

            <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img 
                    src="././images/one_star.png"
                    className="mx-auto h-10 w-auto"
                />
                </div>
                <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight">Create your account </h2>
            </div>

            {errorMessage && <p>{errorMessage}</p>}

            <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-sm">
                <form onSubmit={onSubmit}>
                    <div>
                        <label htmlFor="name" className="block text-sm/6 font-medium">
                            Name
                        </label>
                        <div className="mt-2">
                            <input value={name} onChange={(e) => setName(e.target.value)} name="name" type="text" className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base outline-1 -outline-offset-1"/>
                        </div>

                    </div>
                    <div>
                    <div className="mt-2 flex items-center justify-between">
                        <label htmlFor="username" className="block text-sm/6 font-medium">
                            Username
                        </label>
                    </div>
                    <div className="mt-2">
                        <input value={username} onChange={(e) => setUsername(e.target.value)} name="username" type="text" className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base outline-1 -outline-offset-1"/>
                    </div>
                    </div>

                    <div>
                    <div className="mt-2 flex items-center justify-between">
                        <label htmlFor="password" className="block text-sm/6 font-medium">
                            Password
                        </label>
                    </div>
                    <div className="mt-2">
                        <input value={password} onChange={(e) => setPassword(e.target.value)} name="password" type="password" className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base outline-1 -outline-offset-1"/>
                    </div>
                    </div>

                    <div className="mt-10">
                        <button type="submit" className="flex w-full justify-center rounded-mg bg-[#C8A1B1] px-3 py-1.5 text-sm/6 font-semibold hover:bg-[#6D6943] focus-visible:outline-2 focus-visible:outline-offset-2 cursor-pointer">
                            Sign up!
                        </button>
                    </div>

                </form>
            </div>
        </div>
        </div>
        </>
    )
}

export default SignUp;
