import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getWorkoutGroups, saveWorkout } from "../managers/WorkoutManager"
import { getExercises, saveExercise } from "../managers/ExcerciseManager"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

export const CreateWorkout = () => {
    const [currentWorkout, setCurrentWorkout] = useState({
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
            setCurrentWorkout((prevState) => ({
                ...prevState,
                [name]: parseInt(value),
            }));
        } else {
            setCurrentWorkout((prevState) => ({ ...prevState, [name]: value }));
        }
    };

    // const handleCheckboxChange = evt => {
    //     const { name, checked, value } = evt.target;
    //     const exerciseId = parseInt(value);

    //     setCurrentWorkout(prevState => {
    //         if (checked) {
    //             if (prevState.exercises.includes(exerciseId)) {
    //                 return prevState;
    //             } else {
    //                 return {
    //                     ...prevState,
    //                     exercises: [...prevState.exercises, exerciseId]
    //                 };
    //             }
    //         } else {
    //             return {
    //                 ...prevState,
    //                 exercises: prevState.exercises.filter(exercise => exercise !== exerciseId)
    //             };
    //         }
    //     });
    // };

    const handleSaveWorkout = () => {
        setShowConfirmation(true);
    };

    const confirmDelete = () => {
        setShowConfirmation(false);
        saveWorkout(currentWorkout)
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

    const handleDragEnd = (result) => {
        // Check if there is a valid destination for the dragged item
        if (!result.destination) return;

        // Destructure the source and destination properties from the result object
        const { source, destination } = result;

        // Get the ID of the dragged exercise as an integer
        const draggedExerciseId = parseInt(result.draggableId);

        // Check if the source and destination droppable IDs are the same
        if (source.droppableId === destination.droppableId) {
            // Reordering exercises within the same column

            // Update the state by reordering the exercises
            setCurrentWorkout((prevState) => {
                const updatedExercises = Array.from(prevState.exercises);
                const [removed] = updatedExercises.splice(source.index, 1); // Remove the dragged exercise
                updatedExercises.splice(destination.index, 0, removed); // Insert the exercise at the new position

                return {
                    ...prevState,
                    exercises: updatedExercises,
                };
            });
        } else {
            // Moving exercise between columns

            if (destination.droppableId === "included-exercises") {
                // Moving exercise from available exercises to included exercises

                // Update the state by moving the exercise
                setCurrentWorkout((prevState) => {
                    const updatedExercises = Array.from(prevState.exercises);
                    const removedExerciseIndex = updatedExercises.indexOf(draggedExerciseId);
                    if (removedExerciseIndex !== -1) {
                        updatedExercises.splice(removedExerciseIndex, 1); // Remove the exercise from the array
                    }
                    updatedExercises.splice(destination.index, 0, draggedExerciseId); // Insert the exercise at the new position

                    return {
                        ...prevState,
                        exercises: updatedExercises,
                    };
                });
            } else if (destination.droppableId === "available-exercises") {
                // Moving exercise from included exercises to available exercises

                // Update the state by moving the exercise
                setCurrentWorkout((prevState) => {
                    const updatedExercises = Array.from(prevState.exercises);
                    const removedExerciseIndex = updatedExercises.indexOf(draggedExerciseId);
                    if (removedExerciseIndex !== -1) {
                        updatedExercises.splice(removedExerciseIndex, 1); // Remove the exercise from the array
                    }

                    return {
                        ...prevState,
                        exercises: updatedExercises,
                    };
                });
            }
        }
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
                        value={currentWorkout.name}
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
                            value={currentWorkout.description}
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
                            value={currentWorkout.workout_group}
                            onChange={handleInputChange}
                            className=" bg-gray-200 p-2 rounded-md"
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

                <div className="grid grid-cols-2 gap-4 mt-4">
                    <DragDropContext onDragEnd={handleDragEnd}>
                        <Droppable droppableId="available-exercises">
                            {(provided) => (
                                <div
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                    className="border border-gray-500 rounded-md p-2 h-64 overflow-y-auto"
                                >
                                    <h2 className="font-bold mb-2">Available Exercises</h2>
                                    {exercises.map((exercise, index) => {
                                        if (
                                            !currentWorkout.exercises.includes(exercise.id)
                                        ) {
                                            return (
                                                <Draggable
                                                    key={exercise.id}
                                                    draggableId={exercise.id.toString()}
                                                    index={index}
                                                >
                                                    {(provided) => (
                                                        <div
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                            className="flex items-center mb-2 bg-white p-2 rounded-md cursor-pointer"
                                                            onClick={() =>
                                                                handleExerciseClick(exercise.id)
                                                            }
                                                        >
                                                            <span>{exercise.name}  - {workoutGroups.find((workoutGroup) => exercise.workout_group.id === workoutGroup.id)?.name}</span>
                                                        </div>
                                                    )}
                                                </Draggable>
                                            );
                                        }
                                        return null;
                                    })}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>

                        <Droppable droppableId="included-exercises">
                            {(provided) => (
                                <div
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                    className="border border-gray-500 rounded-md p-2 h-64 overflow-y-auto"
                                >
                                    <h2 className="font-bold mb-2">Included Exercises</h2>
                                    {currentWorkout.exercises.map((exerciseId, index) => {
                                        const exercise = exercises.find(
                                            (exercise) => exercise.id === exerciseId
                                        );

                                        return (
                                            <Draggable
                                                key={exercise.id}
                                                draggableId={exercise.id.toString()}
                                                index={index}
                                            >
                                                {(provided) => (
                                                    <div
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        className="flex items-center mb-2 bg-white p-2 rounded-md cursor-pointer"
                                                        onClick={() =>
                                                            handleExerciseClick(exercise.id)
                                                        }
                                                    >
                                                        <span>{exercise.name}  - {workoutGroups.find((workoutGroup) => exercise.workout_group.id === workoutGroup.id)?.name}</span>
                                                    </div>
                                                )}
                                            </Draggable>
                                        );
                                    })}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </DragDropContext>
                </div>

                <button
                    className="bg-green-600 hover:bg-green-700 text-white rounded-2xl p-2 shadow-md mt-4"
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


