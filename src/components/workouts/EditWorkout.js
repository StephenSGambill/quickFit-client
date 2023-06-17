import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getWorkoutGroups, saveWorkout, getWorkoutById, updateWorkout } from "../managers/WorkoutManager"
import { getExercises, saveExercise } from "../managers/ExcerciseManager"
import { useParams } from "react-router-dom"

export const EditWorkout = () => {
    const [currentWorkout, setCurrentWorkout] = useState({
        name: "",
        description: "",
        workout_group: 0,
        exercises: [],
    })
    const [workoutGroups, setWorkoutGroups] = useState([])
    const [exercises, setExercises] = useState([])
    const [workoutExercises, setworkoutExercises] = useState([])
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [selectedExercise, setSelectedExercise] = useState(null)
    const navigate = useNavigate()
    const { id } = useParams()

    useEffect(() => {
        Promise.all([getWorkoutById(id), getExercises(), getWorkoutGroups()])
            .then(([workoutData, exerciseData, workoutGroupData]) => {
                setCurrentWorkout(workoutData)
                setExercises(exerciseData)
                setWorkoutGroups(workoutGroupData)
            })
    }, [])

    useEffect(() => {
        const selectedExerciseIds = currentWorkout.exercises.map(exercise => exercise.id);
        // const updatedExercises = exercises.map(exercise => ({
        //     ...exercise,
        //     selected: selectedExerciseIds
        // }));
        setworkoutExercises(selectedExerciseIds);
    }, [currentWorkout.exercises]);

    const handleInputChange = (evt) => {
        const { name, value } = evt.target;

        if (name === "workout_group") {
            setCurrentWorkout((prevState) => ({
                ...prevState,
                [name]: parseInt(value),
            }));
        } else {
            setCurrentWorkout((prevState) => ({ ...prevState, [name]: value }));
        }
    };

    const handleCheckboxChange = (evt) => {
        const { checked, value } = evt.target;
        const exerciseId = parseInt(value);

        setCurrentWorkout((prevState) => {
            if (checked) {
                return {
                    ...prevState,
                    exercises: [...prevState.exercises, { id: exerciseId }],
                };
            } else {
                return {
                    ...prevState,
                    exercises: prevState.exercises.filter((exercise) => exercise.id !== exerciseId),
                };
            }
        });

        setworkoutExercises((prevExercises) => {
            if (checked) {
                return [...prevExercises, exerciseId];
            } else {
                return prevExercises.filter((id) => id !== exerciseId);
            }
        });
    };




    const handleSaveWorkout = () => {
        setShowConfirmation(true);
    };

    const confirmDelete = () => {
        setShowConfirmation(false);
        updateWorkout(id, currentWorkout)
            .then((response) => {
                console.log("Workout saved successfully");
                navigate("/workouts");
            })
            .catch((error) => {
                console.error("Failed to save workout", error);
                // Display an error message to the user
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


    return (<>
        <div className="m-5 text-xl font-bold">Edit Workout</div>
        <fieldset className="bg-gray-400 p-6 rounded-lg">
            <div>
                <label htmlFor="name">Name:</label>
                <input type="text" name="name" required
                    autoFocus
                    value={currentWorkout.name}
                    onChange={handleInputChange}
                />
            </div>
            <fieldset>
                <div>
                    <label htmlFor="description">Description:</label>
                    <input type="text" name="description" required
                        value={currentWorkout.description}
                        onChange={handleInputChange}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="">
                    <label htmlFor="workout_group">Workout Group: </label>
                    <select name="workout_group" value={currentWorkout.workout_group} onChange={handleInputChange}>
                        <option value="0" >Select type...</option>
                        {
                            workoutGroups.map(workoutGroup =>
                                <option key={workoutGroup.id} value={workoutGroup.id}>{workoutGroup.name}</option>)
                        }
                    </select>
                </div>
            </fieldset>
            <fieldset>
                <div className="">
                    <label>Exercises: (click to see description)</label>
                    {exercises.map((exercise) => (
                        <div key={exercise.id} className="flex items-center">
                            <input
                                type="checkbox"
                                name="exercises"
                                value={exercise.id}
                                checked={workoutExercises.includes(exercise.id)}
                                onChange={handleCheckboxChange}
                            />
                            <button
                                onClick={() => handleExerciseClick(exercise.id)}
                                className="text-black transition-transform hover:scale-110 focus:outline-none font-bold ml-2"
                            >
                                {exercise.name}
                            </button>
                        </div>
                    ))}
                </div>
            </fieldset>


            <button className="bg-green-300 rounded-lg p-2 shadow-md " onClick={handleSaveWorkout}>Save Workout</button>
            {showConfirmation && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-2 rounded-md">
                        <h2 className="text-xl font-bold mb-2">Confirm Save</h2>
                        <p>Are you sure you want to save the workout?</p>
                        <div className="flex justify-end mt-4">
                            <button
                                className="bg-red-200 shadow-md rounded-md px-4 py-2 mr-2"
                                onClick={confirmDelete}
                            >
                                Save
                            </button>
                            <button
                                className="bg-gray-200 rounded-md px-4 py-2"
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
                    <div className="bg-white p-4 rounded-md w-1/2">
                        <h2 className="text-xl font-bold mb-2">Exercise Details</h2>
                        <p className="font-bold">{selectedExercise.name}</p>
                        <p className="">Description: {selectedExercise.description}</p>
                        <button
                            className="bg-gray-200 rounded-md px-4 py-2 mt-4"
                            onClick={() => setSelectedExercise(null)}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}

        </fieldset>
    </>)
}

