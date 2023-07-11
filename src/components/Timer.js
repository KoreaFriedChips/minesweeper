import React, { useState, useEffect } from "react";

export default function Timer({ gameOver, sendTime }) {
    let [time, setTime] = useState(0);
    let [timerStarted, setTimerStarted] = useState(false);
    let timeIntervalId = null;

    useEffect(() => {
        if (timerStarted) {
            timeIntervalId = setInterval(() => {
                setTime(prevTime => prevTime + 1);
            }, 1000);
        } else if (gameOver) {
            setTimerStarted(false)
        }
        return () => {
            clearInterval(timeIntervalId);
        };
    }, [timerStarted]);

    const handleTimerClick = () => {
        setTimerStarted(true);
    };

    return (
        <div
            style={{ color: "white", fontSize: 20, background: "maroon", cursor: "pointer" }}
            onClick={handleTimerClick}
        >
            <span role="img" aria-label="clock" style={{ paddingRight: 10 }}>
                ⏰
            </span>
            {time}
        </div>
    );
}
