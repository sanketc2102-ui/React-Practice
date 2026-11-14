import { useEffect, useState } from "react";

export default function CountDownTimer() {
  const [time, setTime] = useState({
    hrs: "",
    mins: "",
    secs: "",
  });
  const [started, setStarted] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);

  console.log(timeLeft);

  useEffect(
    function () {
      if (!isRunning) {
        return;
      }

      if (timeLeft <= 0) {
        setIsRunning(false);
        return;
      }

      const timerId = setInterval(function () {
        setTimeLeft((timeleft) => timeleft - 1);
      }, 1000);

      return () => clearInterval(timerId);
    },

    [timeLeft, isRunning],
  );

  function hanldeTimeChange(value, field) {
    setTime((prevState) => ({ ...prevState, [field]: value }));
  }

  function hanldeToggle() {
    if (started) {
      setIsRunning((prevState) => !prevState);
      return;
    }

    let h = parseInt(time.hrs) || 0;
    let m = parseInt(time.mins) || 0;
    let s = parseInt(time.secs) || 0;
    const totalTime = h * 3600 + m * 60 + s;

    setTimeLeft(totalTime);
    setStarted(true);
    setIsRunning(true);
  }

  function hanldeReset() {
    setStarted(false);
    setIsRunning(false);
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

  const padd = (num) => (num < 10 ? `0${num}` : String(num));

  return (
    <div className="container">
      <h1>Countdonw Timer</h1>

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
          placeholder="ms"
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
