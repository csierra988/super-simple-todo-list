import { useState } from "react";
import { useAuth } from "../auth/AuthContext";
import { Link, useNavigate } from "react-router-dom";

function Login() {
    const {login} = useAuth();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const navigate = useNavigate();

    async function onSubmit(event: React.SubmitEvent) {
        event.preventDefault();
        setErrorMessage("");
        try {
            await login(username, password);
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
                <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight">Login to your account </h2>
            </div>

            {errorMessage && <p>{errorMessage}</p>}

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form onSubmit={onSubmit}>
                    <div>
                        <label htmlFor="username" className="block text-sm/6 font-medium">
                            Username
                        </label>
                        <div className="mt-2">
                            <input value={username} onChange={(e) => setUsername(e.target.value)} name="username" type="text" className="block w-full rounded-md bg-isabelline px-3 py-1.5 text-base outline-1 -outline-offset-1 focus:outline-pinklav"/>
                        </div>

                    </div>
                    <div>
                    <div className="mt-2 flex items-center justify-between">
                        <label htmlFor="password" className="block text-sm/6 font-medium">
                            Password
                        </label>
                    </div>
                    <div className="mt-2">
                        <input value={password} onChange={(e) => setPassword(e.target.value)} name="password" type="password" className="block w-full rounded-md bg-isabelline px-3 py-1.5 text-base outline-1 -outline-offset-1 focus:outline-pinklav"/>
                    </div>
                    </div>

                    <div className="mt-10">
                        <button type="submit" className="flex w-full justify-center rounded-md rounded-mg bg-[#C8A1B1] px-3 py-1.5 text-sm/6 font-semibold hover:bg-[#6D6943] hover:text-isabelline focus-visible:outline-2 focus-visible:outline-offset-2 cursor-pointer">
                            Log in
                        </button>
                    </div>

                    <nav className="mt-6 text-center text-sm/6">
                        <Link to="/signup" className="font-semibold hover:text-[#6D6943]">
                            Sign up here!
                        </Link>
                    </nav>

                </form>
            </div>
        </div>
        </div>
        </>
    )
}

export default Login;
