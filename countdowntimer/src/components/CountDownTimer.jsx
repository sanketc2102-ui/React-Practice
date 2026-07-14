import { useEffect, useState } from "react";

export default function CountDownTimer() {
  const [time, setTime] = useState({
    hrs: "",
    mins: "",
    secs: "",
  });
  const [timeLeft, setTimeLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!isRunning) return;

    if (timeLeft <= 0) {
      setIsRunning(false);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((preveState) => preveState - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [isRunning, timeLeft]);

  function hanldeOnChange(filed, value) {
    console.log(filed, value);

    setTime((preveState) => ({
      ...preveState,
      [filed]: value,
    }));
  }

  function handleToggle() {
    if (started) {
      setIsRunning(!isRunning);
      return;
    }

    const h = parseInt(time.hrs) || 0;
    const m = parseInt(time.mins) || 0;
    const s = parseInt(time.secs) || 0;
    const totalSecs = h * 3600 + m * 60 + s;

    if (totalSecs <= 0) {
      alert("Please enter a valid time");
      return;
    }

    setTimeLeft(totalSecs);
    setStarted(true);
    setIsRunning(true);
  }

  const displayTime = {
    hrs: Math.floor(timeLeft / 3600),
    mins: Math.floor((timeLeft % 3600) / 60),
    secs: timeLeft % 60,
  };

  function hanldeReset() {
    setIsRunning(false);
    setStarted(false);
    setTimeLeft(0);
    setTime({ hrs: "", mins: "", secs: "" });
  }

  const pad = (num) => (num < 10 ? "0" + num : String(num));

  return (
    <div className="container">
      <h1>Countdown Timer</h1>
      <div className="inputs-container">
        <input
          type="text"
          placeholder="Hrs"
          value={started ? pad(displayTime.hrs) : time.hrs}
          onChange={(e) => hanldeOnChange("hrs", e.target.value)}
        />
        :
        <input
          type="text"
          placeholder="mins"
          value={started ? pad(displayTime.mins) : time.mins}
          onChange={(e) => hanldeOnChange("mins", e.target.value)}
        />
        :
        <input
          type="text"
          placeholder="secs"
          value={started ? pad(displayTime.secs) : time.secs}
          onChange={(e) => hanldeOnChange("secs", e.target.value)}
        />
      </div>
      <div className="btns">
        <button onClick={handleToggle}>{isRunning ? "pasue" : "start"}</button>
        <button onClick={hanldeReset}>reset</button>
      </div>
    </div>
  );
}
