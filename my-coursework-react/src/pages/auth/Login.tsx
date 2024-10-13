import axios from "axios";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
function Login() {
    const { login } = useAuth();
    const navigate = useNavigate()
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string>("");
    async function submit(event: any) {
        event.preventDefault();
        if (username === "" || password === "") {
            setError("Username and password are required")
        }
        const data = {
            username: username,
            password: password
        }
        try {
            const response = await axios.post("http://localhost:8081/auth/login", data);
            login(response.data);
            navigate("/");
        } catch (error) {
            setError("There was an error logging in");
        }
    }
    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img
                    alt="Point of Sale System (POS)"
                    src="https://sgsolutions.com.mt/wp-content/uploads/2020/04/POS-Icon.png"
                    className="mx-auto h-10 w-auto"
                />
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Point of Sale System (POS)
                    Login
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form action="#" method="POST" className="space-y-6" onSubmit={submit}>
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                            Username
                        </label>
                        <div className="mt-2">
                            <input type="text" onChange={function (event) {
                                setUsername(event.target.value);
                                setError("");
                            }} className="block w-full p-2 border border-gray-200 rounded-lg" placeholder="Enter your username" />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                Password
                            </label>
                        </div>
                        <div className="mt-2">
                            <input type="password" onChange={function (event) {
                                setPassword(event.target.value);
                                setError("");
                            }} className="block w-full p-2 border border-gray-200 rounded-lg" placeholder="Enter your password" />

                        </div>
                    </div>
                    {error && <div className="text-sm text-red-500">{error}</div>}
                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default Login;