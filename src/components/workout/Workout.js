import React, { useState, useEffect, useRef } from "react"
import { useParams, useNavigate } from "react-router-dom"
import workSound from "../mp3/boxing-bell.mp3"
import restSound from "../mp3/buzzer.mp3"
import { completeWorkout, getWorkoutById, saveWorkout } from "../managers/WorkoutManager"

export const WorkoutPage = () => {
    const [sessionLength, setSessionLength] = useState(20);
    const [breakLength, setBreakLength] = useState(10);
    const [numSessions, setNumSessions] = useState(9);
    const [currentSession, setCurrentSession] = useState(numSessions);
    const [timeOn, setTimeOn] = useState(false);
    const [currentTime, setCurrentTime] = useState(sessionLength);
    const [timer, setTimer] = useState(null);
    const [breakOn, setBreakOn] = useState(false);
    const workAudioRef = useRef(null)
    const restAudioRef = useRef(null)
    const { id } = useParams()
    const [workout, setWorkout] = useState({})
    const [exercises, setExercises] = useState([])
    const [showConfirmation, setShowConfirmation] = useState(false);
    const navigate = useNavigate()


    useEffect(() => {
        getWorkoutById(id)
            .then(workoutRef => {
                setWorkout(workoutRef)
                setExercises(workoutRef.exercises)
            })
    }, [])


    useEffect(() => {
        updateScreen();
    }, [sessionLength, breakLength, numSessions, currentSession, breakOn, currentTime]);

    useEffect(() => {
        setCurrentTime(sessionLength);
    }, [sessionLength])
    useEffect(() => {
        updateScreen();
    }, []);

    useEffect(() => {
        checkTime();
    }, [currentTime, breakOn, currentSession]);

    const updateScreen = () => {
        checkTime();
    };

    const convertNumToMin = (num) => {
        const mins = Math.floor(num / 60);
        const secs = num - mins * 60;
        return `${mins}:${secs.toString().padStart(2, "0")}`;
    };

    const handleDecreaseSessionLength = () => {
        setSessionLength((prevValue) => Math.max(prevValue - 10, 0));
    };

    const handleIncreaseSessionLength = () => {
        setSessionLength((prevValue) => prevValue + 10);
    };

    const handleDecreaseBreakLength = () => {
        setBreakLength((prevValue) => Math.max(prevValue - 10, 0));
    };

    const handleIncreaseBreakLength = () => {
        setBreakLength((prevValue) => prevValue + 10);
    };

    const handleDecreaseNumSessions = () => {
        setNumSessions((prevValue) => Math.max(prevValue - 1, 0));
    };

    const handleIncreaseNumSessions = () => {
        setNumSessions((prevValue) => prevValue + 1);
    };


    const handleDecreaseSessionLengthBy5 = () => {
        setSessionLength((prevValue) => Math.max(prevValue - 5, 0));
    };

    const handleIncreaseSessionLengthBy5 = () => {
        setSessionLength((prevValue) => prevValue + 5);
    };

    const handleDecreaseBreakLengthBy5 = () => {
        setBreakLength((prevValue) => Math.max(prevValue - 5, 0));
    };

    const handleIncreaseBreakLengthBy5 = () => {
        setBreakLength((prevValue) => prevValue + 5);
    };

    const handleTimerClick = () => {
        if (!timeOn) {
            setTimeOn(true);
            const newTimer = setInterval(() => {
                setCurrentTime((prevTime) => prevTime - 1);
            }, 1000);
            setTimer(newTimer);
        } else {
            setTimeOn(false);
            clearInterval(timer);
        }
    };

    const handleResetButtonClick = () => {
        setCurrentTime(sessionLength);
        setCurrentSession(numSessions);
        setTimeOn(false);
        clearInterval(timer);
        setBreakOn(false);
    };

    const checkTime = () => {
        if (currentTime < 0 && !breakOn) {
            setCurrentTime(breakLength);
            setBreakOn(true);
            restAudioRef.current.currentTime = 0; // Reset the audio to the beginning
            restAudioRef.current.play(); // Play the audio
        } else if (currentTime < 0 && breakOn) {
            setCurrentTime(sessionLength);
            setBreakOn(false);
            setCurrentSession((prevValue) => prevValue - 1);
            if (currentSession === 1) {
                setTimeOn(false);
                clearInterval(timer);
            }
            workAudioRef.current.currentTime = 0; // Reset the audio to the beginning
            workAudioRef.current.play(); // Play the audio
        }
    }

    const handleMarkComplete = () => {
        const completedWorkout = {
            workout: workout.id
        }
        completeWorkout(completedWorkout)
        setShowConfirmation(false)
        navigate('/profile')

    };



    return (<>
        <div className="m-5 text-xl font-bold">Workout - {workout.name}</div>
        <div className="flex justify-center">
            <div className=" my-10 bg-slate-600 p-10 rounded-lg shadow-xl shadow-black">
                <div onClick={handleTimerClick}>
                    <div
                        className={`text-center mt-55 rounded-lg ${breakOn ? "bg-green-500" : "bg-red-500"
                            }`}
                    >
                        <h1 className="text-6xl mb-0 rounded-lg bg-slate-300">
                            {convertNumToMin(currentTime)}
                        </h1>
                        <h3 className="text-gray-50 text-lg m-0">
                            {breakOn ? "Rest!" : "Work!"}
                        </h3>
                    </div>
                </div>

                <div className="text-center bg-slate-400 p-4 rounded-lg w-60">


                    <p className="text-gray-50 ">Session Length</p>
                    <div className="mt-4 flex items-center justify-between">
                        <button className="mr-2 bg-slate-300 w-6 rounded" onClick={handleDecreaseSessionLength}>
                            -10
                        </button>
                        <button
                            className="mr-2 bg-slate-300 w-6 rounded"
                            onClick={handleDecreaseSessionLengthBy5}
                        >
                            -5
                        </button>
                        <h4 className="text-2xl">{convertNumToMin(sessionLength)}</h4>
                        <button
                            className="ml-2 bg-slate-300 w-6 rounded"
                            onClick={handleIncreaseSessionLengthBy5}
                        >
                            +5
                        </button>
                        <button className="ml-2  bg-slate-300 w-6 rounded" onClick={handleIncreaseSessionLength}>
                            +10
                        </button>
                    </div>


                    <p className="text-gray-50">Break Length</p>
                    <div className="mt-4 flex items-center justify-between">
                        <button className="mr-2  bg-slate-300 w-6 rounded" onClick={handleDecreaseBreakLength}>
                            -10
                        </button>
                        <button
                            className="mr-2 bg-slate-300 w-6 rounded"
                            onClick={handleDecreaseBreakLengthBy5}
                        >
                            -5
                        </button>
                        <h4 className="text-2xl">{convertNumToMin(breakLength)}</h4>
                        <button
                            className="mr-2 bg-slate-300 w-6 rounded"
                            onClick={handleIncreaseBreakLengthBy5}
                        >
                            +5
                        </button>
                        <button className="ml-2  bg-slate-300 w-6 rounded" onClick={handleIncreaseBreakLength}>
                            +10
                        </button>
                    </div>


                    <p className="text-gray-50">Number of Sessions</p>
                    <div className="mt-4 flex items-center justify-between">
                        <button className="mr-4  bg-slate-300 w-6 rounded" onClick={handleDecreaseNumSessions}>
                            -1
                        </button>
                        <h4 className="text-2xl">{numSessions}</h4>
                        <button className="ml-4  bg-slate-300 w-6 rounded" onClick={handleIncreaseNumSessions}>
                            +1
                        </button>
                    </div>
                </div>

                <div className="flex items-center justify-between mt-4">
                    <button className="bg-green-300 p-2 rounded-lg text-black" onClick={handleResetButtonClick}>
                        Reset
                    </button>
                    <button className="bg-blue-300 p-2 rounded-lg text-black" onClick={handleTimerClick}>
                        {timeOn ? "Pause" : "Start"}
                    </button>
                </div>
            </div>
            <audio ref={workAudioRef} src={workSound} />
            <audio ref={restAudioRef} src={restSound} />
        </div>
        <div className="flex justify-center">
            <div className="card">
                {exercises.map(exercise => {
                    return (
                        <div className="bg-slate-400 p-2 m-2 rounded-lg" key={exercise.id}>
                            <div className="font-bold text-lg">{exercise.name}</div>
                            <div>Description: {exercise.description}</div>
                            <div className="flex justify-center">
                                <img className="h-56 rounded-xl mt-10 mx-auto" src={exercise.gif} alt="Exercise Demonstration" />
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
        <div className="flex justify-end">
            <button className="bg-blue-300 p-2 rounded-lg text-black" onClick={() => setShowConfirmation(true)}>
                Mark as Complete
            </button>
        </div>

        {showConfirmation && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white p-8 rounded-lg">
                    <h2 className="text-2xl font-bold mb-4">Confirmation</h2>
                    <p className="text-gray-700 mb-4">Are you sure you want to mark the workout as complete?</p>
                    <div className="flex justify-center">
                        <button
                            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg mr-2"
                            onClick={handleMarkComplete}
                        >
                            Confirm
                        </button>
                        <button
                            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                            onClick={() => setShowConfirmation(false)}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        )}
    </>
    )
}
