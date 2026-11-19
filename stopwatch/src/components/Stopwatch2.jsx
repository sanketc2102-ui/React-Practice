import { useEffect, useState } from "react";

export function Stopwatch2() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(
    function () {
      if (!isRunning) return;

      const timerId = setInterval(() => {
        setTime((time) => time + 10);
      }, 10);

      return () => clearInterval(timerId);
    },
    [isRunning],
  );

  function hanldeToggle() {
    setIsRunning((prev) => !prev);
  }

  function hanldeReset() {
    setTime(0);
    setIsRunning(false);
  }

  const displayTime = {
    hrs: Math.floor(time / 36_00_000),
    mins: Math.floor((time % 36_00_00) / 60_000),
    secs: Math.floor((time % 60_000) / 1000),
    ms: time % 1000,
  };

  const padd = (num, value = 2) => String(num).padStart(value, "0");

  return (
    <div className="container">
      <h1>stopwatch</h1>
      <div className="time-display">
        <span>{padd(displayTime.hrs)}</span>:
        <span>{padd(displayTime.mins)}</span>:
        <span>{padd(displayTime.secs)}</span>.
        <span>{padd(displayTime.ms, 3)}</span>
      </div>
      <div className="btns">
        <button onClick={hanldeToggle}>{isRunning ? "pause" : "start"}</button>
        <button onClick={hanldeReset}>reset</button>
      </div>
    </div>
  );
}
