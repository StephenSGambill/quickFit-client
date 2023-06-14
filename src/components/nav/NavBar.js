import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"

export const NavBar = () => {
    const navigate = useNavigate()

    return (

        <ul className="navbar bg-gray-600 p-5 h-20 text-gray-50 shadow-md fixed top-0 left-0 right-0">
            <li className="navbar__item active">
                <Link className="navbar__link" to="/about">About</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/profile">Profile</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/workouts">Workouts</Link>
            </li>
            <li className="navbar__item active text-emerald-400 font-extrabold ">
                <Link className="navbar__link" to="/workout">Workout Now</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/exercises">Exercises</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/members">Members</Link>
            </li>
            {
                localStorage.getItem("qfs_user")
                    ? <li className="navbar__item navbar__logout">
                        <Link className="navbar__link" to="" onClick={() => {
                            localStorage.removeItem("qfs_user")
                            navigate("/", { replace: true })
                        }}>Logout</Link>
                    </li>
                    : ""
            }
        </ul>
    )
}

