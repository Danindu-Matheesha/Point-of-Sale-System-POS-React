import axios from "axios";
import { useState } from "react";


function createuser (){

    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const [error, setError] = useState<string>("");

    function handleName(event: any) {
        setUsername(event.target.value);
    }

    function handlePassword(event: any) {
        setPassword(event.target.value);
    }

    async function handleSubmit(event: any) {

        event.preventDefault();
        if (username === "" || password === "0") {
            setError("Insert Deta")
        }

        const data = {
            username: username,
            password: password,
        }

        try {
            await axios.post("http://localhost:8081/users", data);
            setUsername("");
            setPassword("");
            setError("User Add")
        } catch (error: any) {
            console.log(error.response.data);
            setError("There was an error adding the user");
        }
    }


    return(
        <div className="container mx-auto pt-5 pb-5">
            <div className="container mx-auto pt-5 pb-5 flex items-baseline justify-between border-b border-gray-400 pb-15 pt-24">
                <h1 className="text-4xl font-bold tracking-tight text-gray-900">Create New User</h1>
                <div className="hidden lg:flex lg:flex-1 lg:justify-end ">
                    <a
                        href="/auth/login"
                        className="text-sm font-semibold leading-6 text-gray-900"
                    > Login
                        <span aria-hidden="true">&rarr;</span>
                    </a>
                </div>
            </div>
            <div
                aria-hidden="true"
                className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
                <div
                    className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                />
            </div>

            <div className="pt-4 pb-4 "></div>

            <div className="border border-slate-600 py-3 px-4 rounded-lg max-w-[350px] ">
                <form>
                    <div>
                        <label className="text-slate-600 font-sm block mb-2">User Name</label>
                        <input type="text" className="text-slate-600 font-sm block mb-3 w-full p-2 border border-slate-400 rounded-lg" placeholder="Enter your username" value={username} onChange={handleName} required />
                    </div>

                    <div>
                        <label className="text-slate-600 font-sm block mb-2">Password</label>
                        <input type="password" className="text-slate-600 font-sm block mb-3 w-full p-2 border border-slate-400 rounded-lg" placeholder="Enter your password" value={password} onChange={handlePassword} required />
                    </div>

                    {error && <div className="text-sm text-red-500 text-center">{error}</div>}
                    <button type="button" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 clear" onClick={handleSubmit}>Create User</button>
                </form>
            </div>
        </div>
    )
}
export default createuser;