import React, { useState, useEffect } from "react";
import "./timer.css";

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

    const handleTabataBtnClick = () => {
        setSessionLength(20);
        setCurrentTime(20);
        setBreakLength(10);
        setNumSessions(8);
        setCurrentSession(8);
        setTimeOn(false);
        clearInterval(timer);
        setBreakOn(false);
    };

    // const handlePomodoroBtnClick = () => {
    //     setSessionLength(1500);
    //     setCurrentTime(1500);
    //     setBreakLength(300);
    //     setNumSessions(4);
    //     setCurrentSession(4);
    //     setTimeOn(false);
    //     clearInterval(timer);
    //     setBreakOn(false);
    // };

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

    const handleCircleClick = () => {
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
    };

    return (
        <div className="container bg-white">
            <div className="header">
                <h1>Countdown</h1>
            </div>

            <div className="presets">
                <button className="btn" onClick={handleTabataBtnClick}>
                    Reset
                </button>
                {/* <button className="btn" onClick={handlePomodoroBtnClick}>
                    Pomodoro
                </button> */}
            </div>

            <div className="centerWrapper">
                <div className="circle" id="circle" onClick={handleCircleClick}>
                    <div id="inner_circle"></div>
                    <div className="timeInfo">
                        <h1 id="timeR">{convertNumToMin(currentTime)}</h1>
                        <h3>time remaining</h3>
                        <h2 id="timeE">{convertNumToMin(breakOn ? breakLength - currentTime : sessionLength - currentTime)}</h2>
                        <h3>time elapsed</h3>
                    </div>
                    <h2 id="label">{breakOn ? "BREAK!" : "GO!"}&nbsp;&nbsp;&nbsp;{numSessions - currentSession + 1} / {numSessions}</h2>
                </div>

                <div className="customizations">
                    <div className="btns">
                        <p>session length</p>
                        <button className="mybtn btnL" onClick={handleDecreaseSessionLength}>
                            -
                        </button>
                        <h4 id="sessL">{convertNumToMin(sessionLength)}</h4>
                        <button className="mybtn btnR" onClick={handleIncreaseSessionLength}>
                            +
                        </button>
                    </div>
                    <div className="btns">
                        <p>break length</p>
                        <button className="mybtn btnL" onClick={handleDecreaseBreakLength}>
                            -
                        </button>
                        <h4 id="breakL">{convertNumToMin(breakLength)}</h4>
                        <button className="mybtn btnR" onClick={handleIncreaseBreakLength}>
                            +
                        </button>
                    </div>
                    <div className="btns">
                        <p>number of sessions</p>
                        <button className="mybtn btnL" onClick={handleDecreaseNumSessions}>
                            -
                        </button>
                        <h4 id="numS">{numSessions}</h4>
                        <button className="mybtn btnR" onClick={handleIncreaseNumSessions}>
                            +
                        </button>
                    </div>
                </div>

                <button className="resetBtn" onClick={handleResetButtonClick}>
                    Reset
                </button>
            </div>
        </div>
    );
};

// export default WorkoutPage;
