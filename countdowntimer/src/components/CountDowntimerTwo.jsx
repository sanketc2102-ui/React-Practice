import React, { useEffect, useState } from "react";

export default function CountDowntimerTwo() {
  const [time, setTime] = useState({
    hrs: "",
    mins: "",
    secs: "",
  });
  const [isRunning, setIsRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [started, setStarted] = useState(false);

  console.log(timeLeft);

  useEffect(
    function () {
      if (!isRunning) return;

      if (timeLeft <= 0) {
        setIsRunning(false);
      }
      const timerId = setInterval(function () {
        setTimeLeft((time) => time - 1);
      }, 1000);

      return () => clearInterval(timerId);
    },

    [isRunning, timeLeft],
  );

  function hanldeTimeChange(value, field) {
    setTime((time) => ({
      ...time,
      [field]: value,
    }));
  }

  function hanldeToggle() {
    if (started) {
      setIsRunning((prev) => !prev);
      return;
    }

    const h = parseInt(time.hrs) || 0;
    const m = parseInt(time.mins) || 0;
    const s = parseInt(time.secs) || 0;
    const totalTime = h * 3600 + m * 60 + s;

    setTimeLeft(totalTime);
    setIsRunning((prev) => !prev);
    setStarted(true);
  }

  function hanldeReset() {
    setIsRunning(false);
    setStarted(false);
    setTime({
      hrs: "",
      mins: "",
      secs: "",
    });
  }

  const displayTime = {
    hrs: Math.floor(timeLeft / 3600),
    mins: Math.floor((timeLeft % 3600) / 60),
    secs: timeLeft % 60,
  };

  console.log(displayTime.secs);

  const padd = (num) => (num < 10 ? `0${num}` : String(num));

  return (
    <div className="timer">
      <h1>countdown timer</h1>
      <div className="inputs">
        <input
          type="text"
          placeholder="hh"
          value={started ? padd(displayTime.hrs) : time.hrs}
          onChange={(e) => hanldeTimeChange(e.target.value, "hrs")}
        />
        :
        <input
          type="text"
          placeholder="mm"
          value={started ? padd(displayTime.mins) : time.mins}
          onChange={(e) => hanldeTimeChange(e.target.value, "mins")}
        />
        :
        <input
          type="text"
          placeholder="ss"
          value={started ? padd(displayTime.secs) : time.secs}
          onChange={(e) => hanldeTimeChange(e.target.value, "secs")}
        />
      </div>

      <div className="btns">
        <button onClick={hanldeToggle}>{isRunning ? "pause" : "start"}</button>
        <button onClick={hanldeReset}>reset</button>
      </div>
    </div>
  );
}
