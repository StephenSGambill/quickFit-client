import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getWorkoutGroups, getWorkouts, deleteWorkout } from "../managers/WorkoutManager";

export const WorkoutsPage = () => {
    const [workouts, setWorkouts] = useState([]);
    const [workoutGroups, setWorkoutGroups] = useState([]);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [selectedWorkoutId, setSelectedWorkoutId] = useState(null);

    const qfsUserInfo = localStorage.getItem("qfs_user");
    const userInfoObj = JSON.parse(qfsUserInfo);
    const isStaff = userInfoObj.isStaff;

    const navigate = useNavigate();

    useEffect(() => {
        Promise.all([getWorkouts(), getWorkoutGroups()])
            .then(([workoutsRes, groupsRes]) => {
                const sortedWorkouts = workoutsRes.slice().sort((a, b) => a.name.localeCompare(b.name));
                setWorkouts(sortedWorkouts);
                setWorkoutGroups(groupsRes);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    const handleDeleteWorkout = (workoutId) => {
        setShowConfirmation(true);
        setSelectedWorkoutId(workoutId);
    };

    const confirmDelete = () => {
        deleteWorkout(selectedWorkoutId)
            .then(() => {
                getWorkouts().then((res) => setWorkouts(res));
            })
            .catch((error) => {
                console.error(error);
            })
            .finally(() => {
                setShowConfirmation(false);
                setSelectedWorkoutId(null);
            });
    };

    const cancelDelete = () => {
        setShowConfirmation(false);
        setSelectedWorkoutId(null);
    };

    return (
        <div className="m-5">
            <div className="text-xl font-bold mb-5">Workouts Page</div>

            <div>
                {isStaff ? <button
                    className="bg-green-600  hover:bg-green-700 rounded-2xl p-2 text-white shadow-md"
                    onClick={() => navigate("/workout/create")}
                >
                    Create New Workout
                </button> : <></>}

            </div>

            <div className="workout-card flex flex-wrap gap-3">
                {workouts.map((workout) => {
                    const workoutGroup = workoutGroups.find((group) => group.id === workout.workout_group);
                    return (
                        <div className="m-2 shadow-md p-4 rounded-2xl bg-slate-400 w-72 " key={workout.id}>
                            <button
                                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-2xl"
                                onClick={() => navigate(`/workout/${workout.id}`)}
                            >
                                Do Workout
                            </button>

                            {isStaff ? <><button
                                className="bg-blue-500 hover:bg-blue-700 text-white shadow-md rounded-2xl p-2 ml-2"
                                onClick={() => navigate(`/workout/edit/${workout.id}`)}
                            >
                                Edit Workout
                            </button>
                                <button
                                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-2xl mt-2"
                                    onClick={() => handleDeleteWorkout(workout.id)}
                                >
                                    Delete Workout
                                </button></> : <></>}

                            <div className="font-bold mt-2">{workout.name}</div>
                            <div><span className="font-bold">Description:</span> {workout.description}</div>
                            <div><span className="font-bold"></span>Group: {workoutGroup?.name}</div>
                            <div><span className="font-bold">
                                Exercises:</span>
                                <ul className="list-disc list-inside">
                                    {workout.exercises.map((exercise) => (
                                        <li key={exercise.id}>
                                            {exercise.name}
                                        </li>
                                    ))}
                                </ul>

                            </div>
                            <div className="mt-2"><span className="font-bold">
                                Creator:</span> {workout.member.user.first_name} {workout.member.user.last_name}
                            </div>

                        </div>
                    );
                })}            </div>

            {showConfirmation && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-4 rounded-2xl">
                        <h2 className="text-xl font-bold mb-2">Confirm Deletion</h2>
                        <p>Are you sure you want to delete this workout?</p>
                        <div className="flex justify-end mt-4">
                            <button
                                className="bg-gray-200 rounded-2xl px-4 py-2 mr-2"
                                onClick={cancelDelete}
                            >
                                Cancel
                            </button>
                            <button
                                className="bg-red-200 shadow-md rounded-2xl px-4 py-2 "
                                onClick={confirmDelete}
                            >
                                Delete
                            </button>

                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
