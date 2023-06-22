import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "./Login.css"

export const Register = (props) => {
    const [customer, setCustomer] = useState({
        username: "",
        password: "",
        first_name: "",
        last_name: "",
        email: ""
    })
    let navigate = useNavigate()

    const handleRegister = () => {
        return fetch("http://localhost:8000/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(customer)
        })
            .then(res => res.json())
            .then(createdUser => {
                if (createdUser.hasOwnProperty("id")) {
                    localStorage.setItem("qfs_user", JSON.stringify({
                        id: createdUser.id,
                        staff: createdUser.isStaff
                    }))

                    navigate("/login")
                }
            })
    }

    const updateCustomer = (evt) => {
        const copy = { ...customer }
        copy[evt.target.id] = evt.target.value
        setCustomer(copy)
    }

    return (
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
            </form>
        </div>
    );

}

