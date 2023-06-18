import React, { useState, useEffect, useRef } from "react"
import { useParams, useNavigate } from "react-router-dom"
import workSound from "../mp3/boxing-bell.mp3"
import restSound from "../mp3/buzzer.mp3"
import ambientPiano from "../mp3/ambient-piano.mp3"
import lofi from "../mp3/lofi.mp3"
import guitar from "../mp3/guitar.mp3"
import hyped from "../mp3/hyped.mp3"
import soothing from "../mp3/soothing.mp3"

import { completeWorkout, getWorkoutById } from "../managers/WorkoutManager"

export const WorkoutPage = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const workAudioRef = useRef(null)
    const restAudioRef = useRef(null)

    const [roundLength, setRoundLength] = useState(45)
    const [breakLength, setBreakLength] = useState(15)
    const [rounds, setRounds] = useState(4)

    const [currentRound, setCurrentRound] = useState(rounds)
    const [currentTime, setCurrentTime] = useState(roundLength)
    const [timeOn, setTimeOn] = useState(false)
    const [timer, setTimer] = useState(null)
    const [breakOn, setBreakOn] = useState(false)
    const [workout, setWorkout] = useState({})
    const [exercises, setExercises] = useState([])

    const [showConfirmation, setShowConfirmation] = useState(false)
    const [currentCard, setCurrentCard] = useState(0)

    const [selectedAudio, setSelectedAudio] = useState("");
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [showPopup, setShowPopup] = useState(false);


    useEffect(() => {
        const fetchWorkout = async () => {
            try {
                const [workoutRef] = await Promise.all([getWorkoutById(id)]);
                setWorkout(workoutRef);
                setExercises(workoutRef.exercises);
                setRounds(workoutRef.exercises?.length * rounds);
            } catch (error) {
                // Handle any errors that occur during the Promise execution
                console.error(error);
            }
        };

        fetchWorkout();
    }, []);

    useEffect(() => {
        setCurrentTime(roundLength)

    }, [roundLength, rounds])

    useEffect(() => {
        updateScreen()
    }, [])

    useEffect(() => {
        checkTime()
    }, [currentTime, breakOn, currentRound])

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



    const convertNumToMin = (num) => {
        const mins = Math.floor(num / 60)
        const secs = num - mins * 60
        return `${mins}:${secs.toString().padStart(2, "0")}`
    }

    const handleDecreaseroundLength = () => {
        setRoundLength((prevValue) => Math.max(prevValue - 10, 0))
    }
    const handleIncreaseroundLength = () => {
        setRoundLength((prevValue) => prevValue + 10)
    }
    const handleDecreaseBreakLength = () => {
        setBreakLength((prevValue) => Math.max(prevValue - 10, 0))
    }
    const handleIncreaseBreakLength = () => {
        setBreakLength((prevValue) => prevValue + 10)
    }
    const handleDecreaserounds = () => {
        setRounds((prevValue) => Math.max(prevValue - 1, 0))
    }
    const handleIncreaserounds = () => {
        setRounds((prevValue) => prevValue + 1)
    }
    const handleDecreaseroundLengthBy5 = () => {
        setRoundLength((prevValue) => Math.max(prevValue - 5, 0))
    }
    const handleIncreaseroundLengthBy5 = () => {
        setRoundLength((prevValue) => prevValue + 5)
    }
    const handleDecreaseBreakLengthBy5 = () => {
        setBreakLength((prevValue) => Math.max(prevValue - 5, 0))
    }
    const handleIncreaseBreakLengthBy5 = () => {
        setBreakLength((prevValue) => prevValue + 5)
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

    const handleResetButtonClick = () => {
        setCurrentTime(roundLength)
        setCurrentRound(rounds)
        setTimeOn(false)
        clearInterval(timer)
        setBreakOn(false)
    }

    const checkTime = () => {
        if (currentTime < 0 && !breakOn) {
            setCurrentTime(breakLength)
            setBreakOn(true)
            restAudioRef.current.currentTime = 0
            restAudioRef.current.play()

            if (currentCard === exercises.length - 1) {
                setCurrentCard(0)
            } else {
                setCurrentCard((prevValue) => prevValue + 1)
            }
        } else if (currentTime < 0 && breakOn) {
            setCurrentTime(roundLength)
            setBreakOn(false)
            setCurrentRound((prevValue) => {
                if (prevValue > 0) {
                    return prevValue - 1
                }
                return prevValue
            })

            if (currentRound === 1) {
                setTimeOn(false)
                clearInterval(timer)
            }
            workAudioRef.current.currentTime = 0
            workAudioRef.current.play()
        }
        if (currentRound === 0) {
            setTimeOn(false)
            clearInterval(timer)
        }
    }

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
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ml-2"
                    onClick={togglePlay}
                >
                    {isPlaying ? "Pause" : "Play"}
                </button>
                <audio ref={audioRef} loop />
            </div>

            <div className="flex">
                <div className="w-1/2">
                    <div className=" mt-2 bg-slate-600 p-10 rounded shadow-xl shadow-black">
                        <div onClick={handleTimerClick}>
                            <div
                                className={`text-center mt-55 rounded ${breakOn ? "bg-green-600" : "bg-red-500"
                                    }`}
                            >
                                <h1 className="text-6xl mb-0 rounded bg-slate-300">
                                    {convertNumToMin(currentTime)}
                                </h1>
                                <h3 className="text-gray-50 text-lg m-0">
                                    {breakOn ? "Rest!" : "Work!"}
                                </h3>
                            </div>
                        </div>
                        <div className="settings-card text-center bg-slate-400 p-4 rounded">
                            <p className="text-gray-50 ">Work Length</p>
                            <div className="mt-4 flex items-center justify-between">
                                <button className=" bg-slate-300 w-8 rounded" onClick={handleDecreaseroundLength}>
                                    -10
                                </button>
                                <button
                                    className=" bg-slate-300 w-6 rounded"
                                    onClick={handleDecreaseroundLengthBy5}
                                >
                                    -5
                                </button>
                                <h4 className="text-2xl">{convertNumToMin(roundLength)}</h4>
                                <button
                                    className=" bg-slate-300 w-6 rounded"
                                    onClick={handleIncreaseroundLengthBy5}
                                >
                                    +5
                                </button>
                                <button className="  bg-slate-300 w-8 rounded" onClick={handleIncreaseroundLength}>
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


                            <p className="text-gray-50">Number of Rounds</p>
                            <div className="mt-4 flex items-center justify-between">
                                <button className="mr-4  bg-slate-300 w-6 rounded" onClick={handleDecreaserounds}>
                                    -1
                                </button>
                                <h4 className="text-2xl">{rounds}</h4>
                                <button className="ml-4  bg-slate-300 w-6 rounded" onClick={handleIncreaserounds}>
                                    +1
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center justify-between mt-4">
                            <button className="bg-green-600 hover:bg-green-700 p-2 rounded text-white" onClick={handleResetButtonClick}>
                                Reset
                            </button>
                            <button className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded" onClick={handleTimerClick}>
                                {timeOn ? "Pause" : "Start"}
                            </button>
                        </div>
                    </div>
                    <audio ref={workAudioRef} src={workSound} />
                    <audio ref={restAudioRef} src={restSound} />
                </div>

                <div className="w-1/2">

                    <div className="card max-h-80 ">
                        <div className="bg-slate-400 p-2 m-2 shadow-xl rounded" key={exercises[currentCard]?.id}>
                            <div className="font-bold text-lg">{exercises[currentCard]?.name}</div>
                            <div>Description: {exercises[currentCard]?.description}</div>
                            <div className="flex justify-center">
                                <img className="h-56 rounded-xl mt-10 mx-auto" src={exercises[currentCard]?.gif} alt="Exercise Demonstration" />
                            </div>
                        </div>
                    </div>
                    <div className="text-center">
                        <h1 className="text-4xl font-bold mt-8 text-orange-600 ">
                            {breakOn ? "Up Next" : "Go!"}
                        </h1>
                    </div>
                </div>

            </div>
            <div className="text-center">
                <button className="bg-blue-500 hover:bg-blue-700 p-2 text-white rounded shadow-lg mt-8 " onClick={() => setShowConfirmation(true)}>
                    Mark as Complete
                </button>

            </div>

            {showConfirmation && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-8 rounded">
                        <h2 className="text-2xl font-bold mb-4">Confirmation</h2>
                        <p className="text-gray-700 mb-4">Are you sure you want to mark the workout as complete?</p>
                        <div className="flex justify-center">
                            <button
                                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded mr-2"
                                onClick={handleMarkComplete}
                            >
                                Confirm
                            </button>
                            <button
                                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
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
