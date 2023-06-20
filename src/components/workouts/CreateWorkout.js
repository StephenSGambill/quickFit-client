import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getWorkoutGroups, saveWorkout } from "../managers/WorkoutManager"
import { getExercises, saveExercise } from "../managers/ExcerciseManager"

export const CreateWorkout = () => {
    const [newWorkout, setNewWorkout] = useState({
        name: "",
        description: "",
        workout_group: 0,
        exercises: [],
    })
    const [workoutGroups, setWorkoutGroups] = useState([])
    const [exercises, setExercises] = useState([])
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [selectedExercise, setSelectedExercise] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        Promise.all([getExercises(), getWorkoutGroups()])
            .then(([exerciseData, workoutGroupData]) => {
                setExercises(exerciseData)
                setWorkoutGroups(workoutGroupData)
            })
    }, [])


    const handleInputChange = (evt) => {
        const { name, value } = evt.target;

        if (name === "workout_group") {
            setNewWorkout((prevState) => ({
                ...prevState,
                [name]: parseInt(value),
            }));
        } else {
            setNewWorkout((prevState) => ({ ...prevState, [name]: value }));
        }
    };

    const handleCheckboxChange = evt => {
        const { name, checked, value } = evt.target;
        const exerciseId = parseInt(value);

        setNewWorkout(prevState => {
            if (checked) {
                if (prevState.exercises.includes(exerciseId)) {
                    return prevState;
                } else {
                    return {
                        ...prevState,
                        exercises: [...prevState.exercises, exerciseId]
                    };
                }
            } else {
                return {
                    ...prevState,
                    exercises: prevState.exercises.filter(exercise => exercise !== exerciseId)
                };
            }
        });
    };

    const handleSaveWorkout = () => {
        setShowConfirmation(true);
    };

    const confirmDelete = () => {
        setShowConfirmation(false);
        saveWorkout(newWorkout)
            .then((response) => {
                navigate("/workouts");
            })
            .catch((error) => {
                console.error("Failed to save workout", error);
            });
    };

    const cancelDelete = () => {
        setShowConfirmation(false);
    };

    const handleExerciseClick = (exerciseId) => {
        const selectedExercise = exercises.find(
            (exercise) => exercise.id === exerciseId
        );
        setSelectedExercise(selectedExercise);
    };


    return (
        <>
            <div className="m-5 text-xl font-bold">Create Workout</div>
            <fieldset className="bg-gray-400 p-6 rounded-2xl">
                <div>
                    <label htmlFor="name" className="text-black">Name:</label>
                    <input
                        type="text"
                        name="name"
                        required
                        autoFocus
                        value={newWorkout.name}
                        onChange={handleInputChange}
                        className="w-full bg-gray-200 p-2 rounded-md"
                    />
                </div>
                <fieldset>
                    <div>
                        <label htmlFor="description" className="text-black">Description:</label>
                        <input
                            type="text"
                            name="description"
                            required
                            value={newWorkout.description}
                            onChange={handleInputChange}
                            className="w-full bg-gray-200 p-2 rounded-md"
                        />
                    </div>
                </fieldset>
                <fieldset>
                    <div>
                        <label htmlFor="workout_group" className="text-black">Workout Group: </label>
                        <select
                            name="workout_group"
                            value={newWorkout.workout_group}
                            onChange={handleInputChange}
                            className="w-full bg-gray-200 p-2 rounded-md"
                        >
                            <option value="0">Select type...</option>
                            {workoutGroups.map((workoutGroup) => (
                                <option key={workoutGroup.id} value={workoutGroup.id}>
                                    {workoutGroup.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </fieldset>
                <fieldset>
                    <div className="">
                        <label className="text-black">Exercises: (click to see description)</label>
                        {exercises.map((exercise) => (
                            <div key={exercise.id} className="flex items-center">
                                <input
                                    type="checkbox"
                                    name="exercises"
                                    value={exercise.id}
                                    checked={newWorkout.exercises.includes(exercise.id)}
                                    onChange={handleCheckboxChange}
                                    className="mr-2"
                                />
                                <button
                                    onClick={() => handleExerciseClick(exercise.id)}
                                    className="text-black transition-transform hover:scale-110 focus:outline-none "
                                >
                                    {exercise.name} - {exercise.workout_group.name}
                                </button>
                            </div>
                        ))}
                    </div>
                </fieldset>

                <button
                    className="bg-green-600 hover:bg-green-700 text-white rounded-2xl p-2 shadow-md"
                    onClick={handleSaveWorkout}
                >
                    Save Workout
                </button>
                {showConfirmation && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="bg-white p-2 rounded-2xl">
                            <h2 className="text-xl font-bold mb-2">Confirm Save</h2>
                            <p>Are you sure you want to save the workout?</p>
                            <div className="flex justify-end mt-4">
                                <button
                                    className="bg-red-200 shadow-md rounded-2xl px-4 py-2 mr-2"
                                    onClick={confirmDelete}
                                >
                                    Save
                                </button>
                                <button
                                    className="bg-gray-200 rounded-2xl px-4 py-2"
                                    onClick={cancelDelete}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                )}
                {selectedExercise && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="bg-white p-4 rounded-2xl w-1/2">
                            <h2 className="text-xl font-bold mb-2">Exercise Details</h2>
                            <p className="font-bold">{selectedExercise.name}</p>
                            <p className="">{selectedExercise.description}</p>
                            <img
                                src={selectedExercise.gif}
                                alt={selectedExercise.name}
                                className="my-4 h-40 max-w-full rounded-2xl"
                            />
                            <button
                                className="bg-gray-200 rounded-2xl px-4 py-2 mt-4"
                                onClick={() => setSelectedExercise(null)}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                )}
            </fieldset>
        </>
    );
}


