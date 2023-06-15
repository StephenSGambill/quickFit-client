import React, { useState, useEffect } from "react";

export const WorkoutPage = () => {
    const [sessionLength, setSessionLength] = useState(20);
    const [breakLength, setBreakLength] = useState(10);
    const [numSessions, setNumSessions] = useState(8);
    const [currentSession, setCurrentSession] = useState(numSessions);
    const [timeOn, setTimeOn] = useState(false);
    const [currentTime, setCurrentTime] = useState(sessionLength);
    const [timer, setTimer] = useState(null);
    const [breakOn, setBreakOn] = useState(false);

    useEffect(() => {
        updateScreen();
    }, [sessionLength, breakLength, numSessions, currentSession, breakOn, currentTime]);

    useEffect(() => {
        setCurrentTime(sessionLength);
    }, [sessionLength])
    useEffect(() => {
        updateScreen();
    }, []); // Empty dependency array for initial setup

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
        } else if (currentTime < 0 && breakOn) {
            setCurrentTime(sessionLength);
            setBreakOn(false);
            setCurrentSession((prevValue) => prevValue - 1);
            if (currentSession === 1) {
                setTimeOn(false);
                clearInterval(timer);
            }
        }
    }


    return (<>
        <div className="m-5 text-xl font-bold">Workout Page</div>
        <div className="flex justify-center">
            <div className=" my-10 bg-slate-600 p-10 rounded-lg">
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


                    <p className="text-gray-50">Session Length</p>
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
                        <h4>{convertNumToMin(sessionLength)}</h4>
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
                        <h4>{convertNumToMin(breakLength)}</h4>
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
                        <h4>{numSessions}</h4>
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
        </div>
    </>)
}
