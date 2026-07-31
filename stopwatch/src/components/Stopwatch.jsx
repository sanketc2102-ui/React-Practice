import React, { useEffect, useState } from "react";

export default function StopWatch() {
  const [elapsed, setElapsed] = useState(0); // total time in ms
  const [isRunning, setIsRunning] = useState(false);

  // ticks every 10ms while running, adding 10ms each time
  useEffect(() => {
    if (!isRunning) return;
    const timerId = setInterval(() => {
      setElapsed((prev) => prev + 10);
    }, 10);
    return () => clearInterval(timerId);
  }, [isRunning]);

  const handleToggle = () => {
    setIsRunning((prev) => !prev);
  };

  const handleReset = () => {
    setIsRunning(false);
    setElapsed(0);
  };

  // break total ms down into hrs / mins / secs / ms
  const displayTime = {
    hours: Math.floor(elapsed / 3600000),
    minutes: Math.floor((elapsed % 3600000) / 60000),
    seconds: Math.floor((elapsed % 60000) / 1000),
    ms: elapsed % 1000,
  };

  const pad = (num, size = 2) => String(num).padStart(size, "0");

  return (
    <div className="stopwatch-container">
      <h2>Stopwatch</h2>

      <div className="time-display">
        {pad(displayTime.hours)}:{pad(displayTime.minutes)}:
        {pad(displayTime.seconds)}
        <span className="ms-display">.{pad(displayTime.ms, 3)}</span>
      </div>

      <div className="button-group">
        <button onClick={handleToggle}>{isRunning ? "Pause" : "Start"}</button>
        <button onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
}
