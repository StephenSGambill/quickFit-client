import React, { useState, useRef } from "react"
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom"
import { loginUser } from "../managers/AuthManager";
import "./Login.css"


export const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    const passwordDialog = useRef()

    const handleLogin = (e) => {
        e.preventDefault()

        const user = {
            username: username,
            password: password
        }


        loginUser(user)
            .then(res => {
                if ("valid" in res && res.valid && "token" in res) {
                    localStorage.setItem("qfs_user", res.token)
                    navigate("/profile")
                }
                else {
                    passwordDialog.current.showModal()
                }
            })
    }

    return (
        <main className="container mx-auto">
            <section className="flex flex-col items-center justify-center h-screen">
                <form className="w-96 p-8 bg-white rounded-2xl shadow-lg" onSubmit={handleLogin}>
                    <h1 className="text-4xl font-bold mb-4">QuickFitS</h1>
                    <h2 className="text-lg font-semibold mb-4">Please sign in</h2>
                    <fieldset className="mb-4">
                        <label htmlFor="inputUsername" className="block mb-2 font-semibold">Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(evt) => setUsername(evt.target.value)}
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
                            placeholder="Username"
                            required
                            autoComplete="username"
                            autoFocus
                        />
                    </fieldset>
                    <fieldset className="mb-4">
                        <label htmlFor="inputPassword" className="block mb-2 font-semibold">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(evt) => setPassword(evt.target.value)}
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
                            placeholder="Password"
                            autoComplete="new-password"
                            required
                        />
                    </fieldset>
                    <fieldset>
                        <button
                            type="submit"
                            className="w-full px-4 py-2 font-semibold text-white bg-blue-500 rounded-2xl hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
                        >
                            Sign in
                        </button>
                    </fieldset>
                </form>
                <section className="mt-4 text-center">
                    <Link to="/register" className="text-blue-500 hover:underline">Not a member yet?</Link>
                </section>
            </section>
            <dialog ref={passwordDialog} className="flex flex-col border border-gray-400 bg-red-200 rounded-md shadow-lg">
                <p>Incorrect password. <br /> Please try again.</p>
                <button className="border border-solid border-gray-500 text-center p-1 rounded-md " onClick={() => passwordDialog.current.close()}>Close</button>
            </dialog>
        </main>
    );
}

