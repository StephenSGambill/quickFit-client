import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"

export const NavBar = () => {
    const navigate = useNavigate()

    return (

        <ul className="navbar bg-gray-600 p-5 h-20 text-gray-50 shadow-md fixed top-0 left-0 right-0">
            <li className="navbar__item active">
                <Link
                    className="navbar__link transition-all duration-200 transform hover:font-extrabold hover:translate-x-2"
                    to="/about"
                >
                    About
                </Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link transition-all duration-200 transform hover:font-extrabold hover:translate-x-2" to="/profile">Profile</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link transition-all duration-200 transform hover:font-extrabold hover:translate-x-2" to="/workouts">Workouts</Link>
            </li>

            <li className="navbar__item active">
                <Link className="navbar__link transition-all duration-200 transform hover:font-extrabold hover:translate-x-2" to="/exercises">Exercises</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link transition-all duration-200 transform hover:font-extrabold hover:translate-x-2" to="/members">Members</Link>
            </li>
            {
                localStorage.getItem("qfs_user")
                    ? <li className="navbar__item navbar__logout">
                        <Link className="navbar__link transition-all duration-200 transform hover:font-extrabold hover:translate-x-2" to="" onClick={() => {
                            localStorage.removeItem("qfs_user")
                            navigate("/", { replace: true })
                        }}>Logout</Link>
                    </li>
                    : ""
            }
        </ul>
    )
}

