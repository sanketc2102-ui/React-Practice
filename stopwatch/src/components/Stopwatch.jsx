import { useEffect } from "react";
import { useState } from "react";

export default function Stopwatch() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  console.log(time);

  useEffect(
    function () {
      if (!isRunning) return;

      const timerId = setInterval(() => {
        setTime((prevState) => prevState + 10);
      }, 10);

      return () => clearInterval(timerId);
    },
    [isRunning],
  );

  function hanldeToggle() {
    setIsRunning((prevState) => !prevState);
  }

  const displayTime = {
    hrs: Math.floor(time / 3600000),
    mins: Math.floor((time % 360000) / 60000),
    secs: Math.floor((time % 60000) / 1000),
    ms: time % 1000,
  };

  function hanldeReset() {
    setTime(0);
    setIsRunning(false);
  }

  const padd = (num, trim = 2) => String(num).padStart(trim, "0");

  return (
    <div className="contianer">
      <h1>Stopwatch</h1>
      <div className="outputs">
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
