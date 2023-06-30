import { useState, useRef } from "react"
import { Link, useNavigate } from "react-router-dom"
import { registerUser } from "../managers/AuthManager"
import "./Login.css"

export const Register = (props) => {
    const [customer, setCustomer] = useState({
        username: "",
        password: "",
        first_name: "",
        last_name: "",
        email: ""
    })
    const verifyPassword = useRef()
    const passwordDialog = useRef()
    const navigate = useNavigate()

    const handleRegister = (e) => {
        e.preventDefault()

        if (customer.password === verifyPassword.current.value) {
            registerUser(customer)
                .then(res => {
                    if ("token" in res) {
                        const resString = JSON.stringify({
                            token: res.token,
                            isStaff: res.isStaff,
                        })
                        localStorage.setItem("qfs_user", resString)
                        navigate("/profile")
                    }
                })

        } else {
            passwordDialog.current.showModal()
        }
    }

    const updateCustomer = (evt) => {
        const copy = { ...customer }
        copy[evt.target.id] = evt.target.value
        setCustomer(copy)
    }

    return (
        <main className="container mx-auto">
            <div className="flex items-center justify-center h-screen">
                <form className="w-96 p-8 bg-white rounded-2xl shadow-lg" onSubmit={handleRegister}>
                    <h1 className="text-4xl font-bold mb-4">Please Register for QuickFitS</h1>
                    <fieldset className="mb-4">
                        <label htmlFor="username" className="block mb-2 font-semibold">
                            Username
                        </label>
                        <input
                            onChange={updateCustomer}
                            type="text"
                            id="username"
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
                            placeholder="Enter your Username"
                            required
                            autoFocus
                        />
                    </fieldset>
                    <fieldset className="mb-4">
                        <label htmlFor="password" className="block mb-2 font-semibold">
                            Password
                        </label>

                        <input
                            onChange={updateCustomer}
                            type="password"
                            id="password"
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
                            placeholder="Password"
                            required
                        />
                    </fieldset>
                    <fieldset>
                        <label htmlFor="verifyPassword"> Verify Password </label>
                        <input ref={verifyPassword} type="password" name="verifyPassword" className="form-control" placeholder="Verify password" required />
                    </fieldset>
                    <fieldset className="mb-4">
                        <label htmlFor="first_name" className="block mb-2 font-semibold">
                            First Name
                        </label>
                        <input
                            onChange={updateCustomer}
                            type="text"
                            id="first_name"
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
                            placeholder="First Name"
                            required
                        />
                    </fieldset>
                    <fieldset className="mb-4">
                        <label htmlFor="last_name" className="block mb-2 font-semibold">
                            Last Name
                        </label>
                        <input
                            onChange={updateCustomer}
                            type="text"
                            id="last_name"
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
                            placeholder="Last Name"
                            required
                        />
                    </fieldset>
                    <fieldset className="mb-4">
                        <label htmlFor="email" className="block mb-2 font-semibold">
                            Email
                        </label>
                        <input
                            onChange={updateCustomer}
                            type="email"
                            id="email"
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
                            placeholder="Email"
                            required
                        />
                    </fieldset>
                    <fieldset>
                        <button
                            type="submit"
                            className="w-full px-4 py-2 font-semibold text-white bg-blue-500 rounded-2xl hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
                        >
                            Register
                        </button>
                    </fieldset>
                    <section className="link--register text-blue-500 hover:underline text-center">
                        <Link to="/login">Already registered? Login</Link>
                    </section>
                </form>


            </div>
            <dialog ref={passwordDialog} className="flex flex-col border border-gray-400 bg-red-200 rounded-md shadow-lg">
                <p>Passwords do not match. Please try again.</p>
                <button className="border border-solid border-gray-500 text-center p-1 rounded-md " onClick={() => passwordDialog.current.close()}>Close</button>
            </dialog>
        </main>
    );


}

