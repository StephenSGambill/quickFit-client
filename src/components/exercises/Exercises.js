import React, { useEffect, useState } from "react";
import {
    getExercises,
    saveExercise,
    deleteExercise,
    updateExercise,
    getExercisesByGroup
} from "../managers/ExcerciseManager";
import { getWorkoutGroups } from "../managers/WorkoutManager";

export const ExercisesPage = () => {
    const [exercises, setExercises] = useState([]);
    const [groups, setGroups] = useState([]);
    const [showAddExercisePopup, setShowAddExercisePopup] = useState(false);
    const [showDeletePopup, setShowDeletePopup] = useState(false);
    const [exerciseToDelete, setExerciseToDelete] = useState(null);
    const [showEditExercisePopup, setShowEditExercisePopup] = useState(false);
    const [exerciseToEdit, setExerciseToEdit] = useState(null);
    const [selectedGroup, setSelectedGroup] = useState(0);

    const [newExercise, setNewExercise] = useState({
        name: "",
        description: "",
        workout_group: 0,
        gif: "",
        duration: 0,
        rest: 0,
        iterations: 0
    });

    const resetNewExercise = () => {
        setNewExercise({
            name: "",
            description: "",
            workout_group: 0,
            gif: "",
            duration: 0,
            rest: 0,
            iterations: 0
        });
    };

    useEffect(() => {
        Promise.all([getExercises(), getWorkoutGroups()])
            .then(([exercisesRes, groupsRes]) => {
                setExercises(exercisesRes);
                setGroups(groupsRes);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    const openDeletePopup = exercise => {
        setExerciseToDelete(exercise);
        setShowDeletePopup(true);
    };

    const closeDeletePopup = () => {
        setShowDeletePopup(false);
        setExerciseToDelete(null);
    };

    const deleteThisExercise = exerciseId => {
        deleteExercise(exerciseId);
        console.log("Deleting exercise:", exerciseId);

        setExercises(prevExercises =>
            prevExercises.filter(exercise => exercise.id !== exerciseToDelete.id)
        );

        closeDeletePopup();
    };

    const openAddExercisePopup = () => {
        setShowAddExercisePopup(true);
    };

    const closeAddExercisePopup = () => {
        setShowAddExercisePopup(false);
        resetNewExercise();
    };

    const openEditExercisePopup = exercise => {
        console.log(exercise)
        setExerciseToEdit(exercise);
        setShowEditExercisePopup(true);
    };

    const closeEditExercisePopup = () => {
        setShowEditExercisePopup(false);
        setExerciseToEdit(null);
    };

    const addExercise = () => {
        saveExercise(newExercise)
            .then(() => getExercises())
            .then(exercisesRes => {
                setExercises(exercisesRes);
                closeAddExercisePopup();
            })
            .catch(error => {
                console.error(error);
                // Handle error if necessary
            });
    };

    const updateEditedExercise = (id) => {
        updateExercise(id, exerciseToEdit)
            .then(() => getExercises())
            .then(exercisesRes => {
                setExercises(exercisesRes);
                closeEditExercisePopup();
            })
            .catch(error => {
                console.error(error);
                // Handle error if necessary
            });
    };

    const handleGroupFilter = groupId => {
        if (groupId === "0") {
            getExercises().then(exercisesRes => {
                setExercises(exercisesRes);
            });
        } else {
            getExercisesByGroup(groupId).then(exercisesRes => {
                setExercises(exercisesRes);
            });
        }
    };

    return (
        <div>
            <div className="m-5 text-xl font-bold">Exercises Page</div>

            <div className="flex justify-center items-center mx-5">
                <div className="flex justify-between items-center mx-5">
                    <div>
                        <label className="font-bold">Workout Group:</label>
                        <select
                            value={selectedGroup}
                            onChange={e => {
                                setSelectedGroup(e.target.value);
                                handleGroupFilter(e.target.value);
                            }}
                            className="border border-gray-300 px-2 py-1 rounded"
                        >
                            <option value="0">All</option>
                            {groups.map(group => (
                                <option key={group.id} value={group.id}>
                                    {group.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div>
                    <button
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mt-2"
                        onClick={openAddExercisePopup}
                    >
                        Add Exercise
                    </button>
                </div>
            </div>

            {exercises.map(exercise => {
                return (
                    <div className="m-2 w-1/2 shadow-md p-4 rounded-lg bg-slate-300 mx-auto" key={exercise.id}>
                        <div className="font-bold text-lg">{exercise.name}</div>
                        <div>Description: {exercise.description}</div>
                        <div className="font-bold">{exercise.workout_group?.name}</div>
                        <img className="h-56 rounded-xl mt-10" src={exercise.gif} alt="Exercise Demonstration" />
                        <div className="flex justify-end">
                            <button
                                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded mr-2"
                                onClick={() => openDeletePopup(exercise)}
                            >
                                Delete
                            </button>
                            <button
                                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
                                onClick={() => openEditExercisePopup(exercise)}
                            >
                                Edit
                            </button>
                        </div>
                    </div>
                );
            })}

            {showAddExercisePopup && (
                <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-gray-500 bg-opacity-50">
                    <div className="bg-white p-4 rounded-lg">
                        <h3 className="text-lg font-bold mb-2">Add New Exercise</h3>
                        <div className="flex flex-col space-y-4">
                            <div>
                                <label className="font-bold">Name:</label>
                                <input
                                    type="text"
                                    value={newExercise.name}
                                    onChange={e => setNewExercise({ ...newExercise, name: e.target.value })}
                                    className="border border-gray-300 px-2 py-1 rounded"
                                />
                            </div>
                            <div>
                                <label className="font-bold">Description:</label>
                                <textarea
                                    value={newExercise.description}
                                    onChange={e => setNewExercise({ ...newExercise, description: e.target.value })}
                                    className="border border-gray-300 px-2 py-1 rounded"
                                ></textarea>
                            </div>
                            <div>
                                <label className="font-bold">Group:</label>
                                <select
                                    value={newExercise.workout_group}
                                    onChange={e => setNewExercise({ ...newExercise, workout_group: e.target.value })}
                                    className="border border-gray-300 px-2 py-1 rounded"
                                >
                                    <option value="">Select Group</option>
                                    {groups.map(group => (
                                        <option key={group.id} value={group.id}>
                                            {group.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="font-bold">Demonstration Link:</label>
                                <input
                                    type="text"
                                    value={newExercise.gif}
                                    onChange={e => setNewExercise({ ...newExercise, gif: e.target.value })}
                                    className="border border-gray-300 px-2 py-1 rounded"
                                />
                            </div>
                            <div className="flex justify-end">
                                <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded" onClick={closeAddExercisePopup}>
                                    Cancel
                                </button>
                                <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded ml-2" onClick={addExercise}>
                                    Confirm
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {showEditExercisePopup && (
                <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-gray-500 bg-opacity-50">
                    <div className="bg-white p-4 rounded-lg">
                        <h3 className="text-lg font-bold mb-2">Edit Exercise</h3>
                        <div className="flex flex-col space-y-4">
                            <div>
                                <label className="font-bold">Name:</label>
                                <input
                                    type="text"
                                    value={exerciseToEdit.name}
                                    onChange={e => setExerciseToEdit({ ...exerciseToEdit, name: e.target.value })}
                                    className="border border-gray-300 px-2 py-1 rounded"
                                />
                            </div>
                            <div>
                                <label className="font-bold">Description:</label>
                                <textarea
                                    value={exerciseToEdit.description}
                                    onChange={e => setExerciseToEdit({ ...exerciseToEdit, description: e.target.value })}
                                    className="border border-gray-300 px-2 py-1 rounded"
                                ></textarea>
                            </div>
                            <div>
                                <label className="font-bold">Workout Group:</label>
                                <select
                                    value={exerciseToEdit.workout_group.id}
                                    onChange={e => setExerciseToEdit({ ...exerciseToEdit, workout_group: e.target.value })}
                                    className="border border-gray-300 px-2 py-1 rounded"
                                >
                                    <option value="">Select Group</option>
                                    {groups.map(group => (
                                        <option key={group.id} value={group.id}>
                                            {group.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="font-bold">Demonstration Link:</label>
                                <input
                                    type="text"
                                    value={exerciseToEdit.gif}
                                    onChange={e => setExerciseToEdit({ ...exerciseToEdit, gif: e.target.value })}
                                    className="border border-gray-300 px-2 py-1 rounded"
                                />
                            </div>
                            <div className="flex justify-end">
                                <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded" onClick={closeEditExercisePopup}>
                                    Cancel
                                </button>
                                <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded ml-2" onClick={() => updateEditedExercise(exerciseToEdit.id)}>
                                    Confirm
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {showDeletePopup && (
                <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-gray-500 bg-opacity-50">
                    <div className="bg-white p-4 rounded-lg">
                        <h3 className="text-lg font-bold mb-2">Delete Exercise</h3>
                        <p>Are you sure you want to delete this exercise?</p>
                        <div className="flex justify-end">
                            <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded" onClick={closeDeletePopup}>
                                Cancel
                            </button>
                            <button
                                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded ml-2"
                                onClick={() => deleteThisExercise(exerciseToDelete.id)}
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