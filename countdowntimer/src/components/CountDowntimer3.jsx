import { useEffect, useState } from "react";

export default function CountDowntimer3() {
  const [time, setTime] = useState({
    hrs: "",
    mins: "",
    secs: "",
  });
  const [isRunning, setIsRunning] = useState(false);
  const [started, setStarted] = useState(false);

  console.log(isRunning);

  useEffect(
    function () {
      if (!isRunning) return;

      if (time <= 0) {
        setIsRunning(false);
      }

      const timerId = setInterval(function () {
        setTime((time) => time - 1);
      }, 1000);

      return () => clearInterval(timerId);
    },
    [isRunning, time],
  );

  console.log(time);

  function hanldeInputTimeChange(e) {
    const { value, name } = e.target;

    setTime((time) => ({ ...time, [name]: value }));
  }

  function hanldeStartNPauseTimer() {
    if (started) {
      setIsRunning((prv) => !prv);
      return;
    }

    const h = Number(time.hrs) || 0;
    const m = Number(time.mins) || 0;
    const s = Number(time.secs) || 0;
    const totalTime = h * 3600 + m * 60 + s; // convert user inputed time to seconds

    setTime(totalTime);
    setIsRunning(true);
    setStarted(true);
  }

  function hanldeRset() {
    setIsRunning(false);
    setTime({
      hrs: "",
      mins: "",
      secs: "",
    });
    setStarted(false);
  }

  const disPlayTime = {
    hrs: Math.floor(time / 3600),
    mins: Math.floor((time % 3600) / 60),
    secs: time % 60,
  };

  const padd = (num) => (num < 10 ? `0${num}` : String(num));

  return (
    <div className="container">
      <h1>countdown timer</h1>
      <div className="inputs">
        <input
          type="text"
          placeholder="hh"
          name="hrs"
          value={started ? padd(disPlayTime.hrs) : time.hrs}
          onChange={hanldeInputTimeChange}
        />
        :
        <input
          type="text"
          placeholder="mm"
          name="mins"
          value={started ? padd(disPlayTime.mins) : time.mins}
          onChange={hanldeInputTimeChange}
        />
        :
        <input
          type="text"
          placeholder="ss"
          name="secs"
          value={started ? padd(disPlayTime.secs) : time.secs}
          onChange={hanldeInputTimeChange}
        />
      </div>

      <div className="btns">
        <button onClick={hanldeStartNPauseTimer}>
          {isRunning ? "pause" : "start"}
        </button>
        <button onClick={hanldeRset}>reset</button>
      </div>
    </div>
  );
}
