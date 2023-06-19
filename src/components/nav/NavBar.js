import { Link, useNavigate } from "react-router-dom";
// import "./NavBar.css";

export const NavBar = () => {
    const navigate = useNavigate();

    return (
        <ul className="flex flex-wrap justify-start bg-gray-600 px-8 py-4 h-14 text-gray-50 shadow-md rounded-b-2xl bg-gray-200 fixed top-0 left-0 right-0">
            <li className="navbar__item flex-auto">
                <Link
                    className="transition-all duration-200 transform hover:font-extrabold hover:translate-x-2"
                    to="/about"
                >
                    About
                </Link>
            </li>
            <li className="navbar__item flex-auto">
                <Link
                    className="transition-all duration-200 transform hover:font-extrabold hover:translate-x-2"
                    to="/profile"
                >
                    Profile
                </Link>
            </li>
            <li className="navbar__item flex-auto">
                <Link
                    className="transition-all duration-200 transform hover:font-extrabold hover:translate-x-2"
                    to="/exercises"
                >
                    Exercises
                </Link>
            </li>
            <li className="navbar__item flex-auto">
                <Link
                    className="transition-all duration-200 transform hover:font-extrabold hover:translate-x-2"
                    to="/workouts"
                >
                    Workouts
                </Link>
            </li>
            <li className="navbar__item flex-auto">
                <Link
                    className="transition-all duration-200 transform hover:font-extrabold hover:translate-x-2"
                    to="/members"
                >
                    Members
                </Link>
            </li>
            {localStorage.getItem("qfs_user") ? (
                <li className="navbar__item navbar__logout ml-auto">
                    <Link
                        className="transition-all duration-200 transform hover:font-extrabold hover:translate-x-2"
                        to=""
                        onClick={() => {
                            localStorage.removeItem("qfs_user");
                            navigate("/", { replace: true });
                        }}
                    >
                        Logout
                    </Link>
                </li>
            ) : (
                ""
            )}
        </ul>
    );
};
