import React, { useState, useRef } from "react"
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom"
import { loginUser } from "../managers/AuthManager";
import "./Login.css"


export const Login = () => {
    const [username, setUsername] = useState()
    const [password, setPassword] = useState()
    const navigate = useNavigate()
    const invalidDialog = useRef()

    const handleLogin = (e) => {
        e.preventDefault()

        const user = {
            username: username,
            password: password
        }
        console.log(user)

        loginUser(user)
            .then(res => {
                console.log(res)
                if ("valid" in res && res.valid && "token" in res) {
                    localStorage.setItem("qfs_user", res.token)
                    navigate("/")
                }
                else {
                    invalidDialog.current.showModal()
                }
            })
    }

    return (
        <main className="container--login">
            <section>
                <form className="form--login" onSubmit={handleLogin}>
                    <h1>QuickFitS</h1>
                    <h2>Please sign in</h2>
                    <fieldset>
                        <label htmlFor="inputUsername"> Username</label>
                        <input type="username"
                            value={username}
                            onChange={evt => setUsername(evt.target.value)}
                            className="form-control"
                            placeholder="Username"
                            required autoFocus />
                    </fieldset>
                    <fieldset>
                        <label htmlFor="inputPassword"> Password </label>
                        <input type="password"
                            value={password}
                            onChange={evt => setPassword(evt.target.value)}
                            className="form-control"
                            placeholder="Password"
                            required />
                    </fieldset>
                    <fieldset>
                        <button type="submit">
                            Sign in
                        </button>
                    </fieldset>
                </form>
            </section>
            <section className="link--register">
                <Link to="/register">Not a member yet?</Link>
            </section>
        </main>
    )
}

