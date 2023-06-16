import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getMemberCustomWorkouts, getWorkoutGroups, getWorkouts, deleteWorkout } from "../managers/WorkoutManager"

export const WorkoutsPage = () => {
    const [workouts, setWorkouts] = useState([])
    const [memberCustomWorkouts, setMemberCustomWorkouts] = useState([])
    const [workoutGroups, setWorkoutGroups] = useState([])
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [selectedWorkoutId, setSelectedWorkoutId] = useState(null);
    const localUser = localStorage.getItem("qfs_user")
    const userObject = JSON.parse(localUser)
    const navigate = useNavigate()


    useEffect(() => {
        Promise.all([
            getWorkouts(userObject.user_id),
            getWorkoutGroups(),
            getMemberCustomWorkouts()

        ])
            .then(([workoutsRes, groupsRes, customWorkoutsRes]) => {
                setWorkouts(workoutsRes)
                setWorkoutGroups(groupsRes)
                setMemberCustomWorkouts(customWorkoutsRes)

            })
            .catch(error => {
                console.error(error)
            })
    }, [])

    const handleDeleteWorkout = (workoutId) => {
        setShowConfirmation(true);
        setSelectedWorkoutId(workoutId);
    };

    const confirmDelete = () => {
        deleteWorkout(selectedWorkoutId)
            .then(() => {
                getMemberCustomWorkouts().then(res => setMemberCustomWorkouts(res))
                getWorkouts().then(res => setWorkouts(res))
            })
            .catch(error => {
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
        <div>
            <div className="m-5 text-xl font-bold">Workouts Page</div>

            <div>
                <h2 className="font-bold">My Custom Workouts</h2>
                <button className="bg-green-600 rounded-lg p-2 text-white shadow-md"
                    onClick={() => navigate("/workout/create")}>Create Custom workout</button>
                {memberCustomWorkouts?.map(customWorkout => {

                    return (
                        <div className="m-2 shadow-md p-4 rounded-lg bg-slate-300" key={customWorkout.id}>
                            <div className="font-bold">Name: {customWorkout.workout.name}</div>
                            <div>Description: {customWorkout.workout.description}</div>
                            <div>Group: {customWorkout.workout.workout_group?.name}</div>
                            <div>Exercises {customWorkout.workout.exercises?.map(exercise => <li key={exercise.id}>{exercise.name}</li>)}</div>
                            <button
                                className="bg-green-300 shadow-md rounded-md p-2"
                                onClick={() => navigate(`/workout/${customWorkout.workout.id}`)}>Do Workout</button>
                            <button
                                className="bg-red-200  shadow-md rounded-md ml-2 p-2"
                                onClick={() => handleDeleteWorkout(customWorkout.workout.id)}
                            >
                                Delete Workout
                            </button>

                        </div>
                    )
                })}
            </div>

            <div>
                <h2 className="font-bold mt-20">All Workouts</h2>
                {workouts.map(workout => {
                    const workoutGroup = workoutGroups.find(group => group.id === workout.workout_group)
                    return (
                        <div className="m-2 shadow-md p-4 rounded-lg bg-slate-400" key={workout.id}>
                            <div className="font-bold">Name: {workout.name}</div>
                            <div>Description: {workout.description}</div>
                            <div>Group: {workoutGroup?.name}</div>
                            <div>Exercises {workout.exercises.map(exercise => <li key={exercise.id}>{exercise.name}</li>)}</div>
                            <button className="bg-green-300 shadow-md rounded-md p-2"
                                onClick={() => navigate(`/workout/${workout.id}`)}>Do Workout</button>
                            <button
                                className="bg-red-200  shadow-md rounded-md ml-2 p-2"
                                onClick={() => handleDeleteWorkout(workout.id)}
                            >
                                Delete Workout
                            </button>
                        </div>
                    )
                })}
            </div>
            {showConfirmation && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-4 rounded-md">
                        <h2 className="text-xl font-bold mb-2">Confirm Deletion</h2>
                        <p>Are you sure you want to delete this workout?</p>
                        <div className="flex justify-end mt-4">
                            <button className="bg-red-200 shadow-md rounded-md px-4 py-2 mr-2" onClick={confirmDelete}>
                                Delete
                            </button>
                            <button className="bg-gray-200 rounded-md px-4 py-2" onClick={cancelDelete}>
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )

}


