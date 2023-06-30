import React, { useState, useEffect, useRef } from "react"
import { useParams, useNavigate } from "react-router-dom"
import workSound from "../mp3/boxing-bell.mp3"
import restSound from "../mp3/buzzer.mp3"
import ambientPiano from "../mp3/ambient-piano.mp3"
import lofi from "../mp3/lofi.mp3"
import guitar from "../mp3/guitar.mp3"
import hyped from "../mp3/hyped.mp3"
import soothing from "../mp3/soothing.mp3"
import { convertNumToMin } from "../../utils/convertNumToMin"

import { completeWorkout, getWorkoutById } from "../managers/WorkoutManager"

export const WorkoutPage = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const workAudioRef = useRef(null)
    const restAudioRef = useRef(null)

    const [workLength, setWorkLength] = useState(45)
    const [breakLength, setBreakLength] = useState(15)
    const [sets, setSets] = useState(3)

    const [currentTime, setCurrentTime] = useState(workLength)
    const [timeOn, setTimeOn] = useState(false)
    const [timer, setTimer] = useState(null)
    const [breakOn, setBreakOn] = useState(true)
    const [workout, setWorkout] = useState({})
    const [exercises, setExercises] = useState([])

    const [showConfirmation, setShowConfirmation] = useState(false)
    const [currentCard, setCurrentCard] = useState(0)

    const [selectedAudio, setSelectedAudio] = useState("");
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);


    useEffect(() => {
        const fetchWorkout = async () => {
            try {
                const [workoutRef] = await Promise.all([getWorkoutById(id)]);
                setWorkout(workoutRef);
                setExercises(workoutRef.exercises);
            } catch (error) {
                // Handle any errors that occur during the Promise execution
                console.error(error);
            }
        };

        fetchWorkout();
    }, []);


    useEffect(() => {
        setCurrentTime(breakLength)

    }, [breakLength])

    useEffect(() => {
        updateScreen()
    }, [])

    useEffect(() => {
        checkTime()
    }, [currentTime, breakOn])

    useEffect(() => {
        if (selectedAudio) {
            audioRef.current.src = selectedAudio;
            setIsPlaying(true)
            audioRef.current.play();
        }
    }, [selectedAudio]);

    const updateScreen = () => {
        checkTime()
    }

    const handleDecreaseWorkLength = () => {
        setWorkLength((prevValue) => Math.max(prevValue - 10, 0))
    }
    const handleIncreaseWorkLength = () => {
        setWorkLength((prevValue) => prevValue + 10)
    }
    const handleDecreaseWorkLengthBy5 = () => {
        setWorkLength((prevValue) => Math.max(prevValue - 5, 0))
    }
    const handleIncreaseWorkLengthBy5 = () => {
        setWorkLength((prevValue) => prevValue + 5)
    }

    const handleDecreaseBreakLength = () => {
        setBreakLength((prevValue) => Math.max(prevValue - 10, 0))
    }
    const handleIncreaseBreakLength = () => {
        setBreakLength((prevValue) => prevValue + 10)
    }
    const handleDecreaseBreakLengthBy5 = () => {
        setBreakLength((prevValue) => Math.max(prevValue - 5, 0))
    }
    const handleIncreaseBreakLengthBy5 = () => {
        setBreakLength((prevValue) => prevValue + 5)
    }
    const handleDecreaseSets = () => {
        setSets((prevValue) => Math.max(prevValue - 1, 0))
    }
    const handleIncreaseSets = () => {
        setSets((prevValue) => prevValue + 1)
    }

    const handleTimerClick = () => {
        if (!timeOn) {
            setTimeOn(true)
            const newTimer = setInterval(() => {
                setCurrentTime((prevTime) => prevTime - 1)
            }, 1000)
            setTimer(newTimer)
        } else {
            setTimeOn(false)
            clearInterval(timer)
        }
    }

    const checkTime = () => {
        if (currentTime < 0 && !breakOn) {
            setCurrentTime(breakLength);
            setBreakOn(true);
            restAudioRef.current.currentTime = 0;
            restAudioRef.current.play();

            setCurrentCard((prevValue) => {
                if (prevValue === exercises.length - 1) {
                    // Check if all exercises have gone through their break/work cycle
                    if (sets > 1) {
                        // If sets is greater than 1, decrement it
                        setSets((prevValue) => prevValue - 1);
                    } else {
                        // If sets is 1, stop the timer and set sets to 0
                        setTimeOn(false);
                        clearInterval(timer);
                        setSets(0);
                    }
                    return 0;
                }
                return prevValue + 1;
            });
        } else if (currentTime < 0 && breakOn) {
            setCurrentTime(workLength);
            setBreakOn(false);

            workAudioRef.current.currentTime = 0;
            workAudioRef.current.play();
        }
    };

    const handleMarkComplete = () => {
        const completedWorkout = {
            workout: workout.id
        }
        completeWorkout(completedWorkout)
        setShowConfirmation(false)
        navigate('/profile')

    }

    const handleAudioChange = (event) => {
        setSelectedAudio(event.target.value);
    };

    const togglePlay = () => {
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying((prevIsPlaying) => !prevIsPlaying);
    };

    const getTotalTime = () => {
        const totalWorkTime = exercises.length * workLength * sets;
        const totalRestTime = (exercises.length) * breakLength * sets;
        const totalTime = totalWorkTime + totalRestTime;
        return totalTime;
    };



    return (
        <>
            <div className="m-5 text-xl font-bold">Workout - {workout.name}</div>

            <div className="items-center space-y-4">
                <select
                    className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={selectedAudio}
                    onChange={handleAudioChange}
                >
                    <option value="">Select Audio</option>
                    <option value={ambientPiano}>Ambient Piano</option>
                    <option value={guitar}>Guitar</option>
                    <option value={hyped}>Hyped</option>
                    <option value={lofi}>Lo-Fi</option>
                    <option value={soothing}>Soothing</option>
                </select>
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 ml-2"
                    onClick={togglePlay}
                >
                    {isPlaying ? "Pause" : "Play"}
                </button>
                <audio ref={audioRef} loop />
            </div>
            <p className="text-blue-700 font-bold mt-2">
                Total Workout Time: {convertNumToMin(getTotalTime())}
            </p>
            <div className="flex">
                <div className="w-1/2">
                    <div className=" mt-2 bg-slate-600 p-10 rounded-2xl shadow-xl shadow-black">
                        <div onClick={handleTimerClick}>
                            <div
                                className={`text-center mt-55 rounded ${breakOn ? "bg-red-500" : "bg-green-600"
                                    }`}
                            >
                                <h1 className="text-6xl mb-0 rounded bg-slate-300">
                                    {convertNumToMin(currentTime)}
                                </h1>
                                <h3 className="text-gray-50 text-2xl m-0">
                                    {breakOn ? "Rest!" : "Work!"}
                                </h3>
                            </div>
                        </div>
                        <div className="settings-card text-center bg-slate-400 p-4 rounded">
                            <p className="text-gray-50 ">Work Length</p>
                            <div className="mt-4 flex items-center justify-between">
                                <button className=" bg-slate-300 w-8 rounded" onClick={handleDecreaseWorkLength}>
                                    -10
                                </button>
                                <button
                                    className=" bg-slate-300 w-6 rounded"
                                    onClick={handleDecreaseWorkLengthBy5}
                                >
                                    -5
                                </button>
                                <h4 className="text-2xl">{convertNumToMin(workLength)}</h4>
                                <button
                                    className=" bg-slate-300 w-6 rounded"
                                    onClick={handleIncreaseWorkLengthBy5}
                                >
                                    +5
                                </button>
                                <button className="  bg-slate-300 w-8 rounded" onClick={handleIncreaseWorkLength}>
                                    +10
                                </button>
                            </div>


                            <p className="text-gray-50">Break Length</p>
                            <div className="mt-4 flex items-center justify-between">
                                <button className="  bg-slate-300 w-8 rounded" onClick={handleDecreaseBreakLength}>
                                    -10
                                </button>
                                <button
                                    className=" bg-slate-300 w-6 rounded"
                                    onClick={handleDecreaseBreakLengthBy5}
                                >
                                    -5
                                </button>
                                <h4 className="text-2xl">{convertNumToMin(breakLength)}</h4>
                                <button
                                    className=" bg-slate-300 w-6 rounded"
                                    onClick={handleIncreaseBreakLengthBy5}
                                >
                                    +5
                                </button>
                                <button className=" bg-slate-300 w-8 rounded" onClick={handleIncreaseBreakLength}>
                                    +10
                                </button>
                            </div>


                            <p className="text-gray-50">Number of Sets</p>
                            <div className="mt-4 flex items-center justify-between">
                                <button className="mr-4  bg-slate-300 w-6 rounded" onClick={handleDecreaseSets}>
                                    -1
                                </button>
                                <h4 className="text-2xl"> {sets}</h4>
                                <button className="ml-4  bg-slate-300 w-6 rounded" onClick={handleIncreaseSets}>
                                    +1
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center  mt-4">
                            <button className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-2xl" onClick={handleTimerClick}>
                                {timeOn ? "Pause" : "Start"}
                            </button>
                        </div>
                    </div>
                    <audio ref={workAudioRef} src={workSound} />
                    <audio ref={restAudioRef} src={restSound} />
                </div>

                <div className="w-1/2">

                    <div className="card max-h-80 ">
                        <div className="bg-slate-400 p-2 m-2 shadow-xl rounded-2xl" key={exercises[currentCard]?.id}>
                            <div className="font-bold text-lg">{exercises[currentCard]?.name}</div>
                            <div>Description: {exercises[currentCard]?.description}</div>
                            <div className="flex justify-center">
                                <img className="h-56 rounded-xl mt-10 mx-auto" src={exercises[currentCard]?.gif} alt="Exercise Demonstration" />
                            </div>
                        </div>
                    </div>
                    <div className="text-center">
                        <h1 className={`text-4xl font-bold mt-8 ${breakOn ? "text-red-500 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]" : "text-green-500 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]"}`}>
                            {breakOn ? "Up Next" : "Go!"}
                        </h1>
                    </div>
                </div>


            </div>

            <div className="text-center">
                <button className="bg-blue-500 hover:bg-blue-700 p-2 text-white rounded-2xl shadow-lg mt-8 " onClick={() => navigate("/workouts")}>
                    Return to Workouts
                </button>
                <button className="bg-blue-500 hover:bg-blue-700 p-2 text-white rounded-2xl shadow-lg mt-8 ml-2" onClick={() => setShowConfirmation(true)}>
                    Mark as Complete
                </button>

            </div>

            {
                showConfirmation && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="bg-white p-8 rounded-2xl">
                            <h2 className="text-2xl font-bold mb-4">Confirmation</h2>
                            <p className="text-gray-700 mb-4">Are you sure you want to mark the workout as complete?</p>
                            <div className="flex justify-center">
                                <button
                                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-2xl mr-2"
                                    onClick={handleMarkComplete}
                                >
                                    Confirm
                                </button>
                                <button
                                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-2xl"
                                    onClick={() => setShowConfirmation(false)}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    )
}
