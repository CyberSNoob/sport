import { useState, useRef, useEffect } from 'react';

const seconds = 60;
const repPauseLength = 5;

function TimerView({ minutes, onBack }) {
  // const fullTime = minutes * seconds;
  const fullTime = 10;
  const [started, setStarted] = useState(false);
  const [displayTime, setDisplayTime] = useState(fullTime);
  const [repPauseTime, setRepPauseTime] = useState(repPauseLength);
  const intervalRef = useRef(null);
  const repPauseIntervalRef = useRef(null);

  const toggle = () => {
    // updateDisplayTime();
    // updateRepPauseTime();
    setStarted((prevState) => !prevState);
  };

  const clearIntervals = () => {
    clearInterval(intervalRef.current);
    clearInterval(repPauseIntervalRef.current);
    intervalRef.current = null;
    repPauseIntervalRef.current = null;
  };

  const reset = () => {
    setStarted(false);
    setDisplayTime(fullTime);
    setRepPauseTime(repPauseLength);
    clearIntervals();
  };

  const updateDisplayTime = () =>
    setDisplayTime((prev) => {
      if (prev <= 0) {
        setStarted(false);
        clearIntervals();
        // reset();
        return 0;
      }
      return prev - 1;
    });

  const updateRepPauseTime = () =>
    setRepPauseTime((prev) => {
      if (intervalRef.current <= 0) return 0;
      if (prev <= 0) {
        const beep = new Audio('/public/mmm-2-tone-sexy.mp3');
        beep.play().catch(err => console.log("Audio play error: ", err));
        return repPauseLength - 1;
      }
      return prev - 1;
    });

  useEffect(() => {
    if (started && displayTime > 0) {
      if (!intervalRef.current) {
        intervalRef.current = setInterval(updateDisplayTime, 1000);
      }
      if (!repPauseIntervalRef.current) {
        repPauseIntervalRef.current = setInterval(updateRepPauseTime, 1000);
      }
    } else {
      clearIntervals();
    }
    return () => {
      clearIntervals();
    };
  }, [started]);

  const formatTime = (secondsRemaining) => {
    const min = Math.floor(secondsRemaining / seconds)
      .toString()
      .padStart(2, '0');
    const sec = (secondsRemaining % seconds).toString().padStart(2, '0');
    return `${min}:${sec}`;
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center text-center">
      <h1 className="text-4xl font-bold mb-6">{minutes} Minute Timer</h1>
      <div className="text-lg mb-4 flex flex-col gap-2">
        <p>{started ? 'Session started.' : 'Start your focused session.'}</p>
        <p>{formatTime(displayTime)}</p>
        <p>{formatTime(repPauseTime)}</p>
      </div>

      <div className="flex gap-4 text-xl text-white">
        <button
          onClick={() => {
            reset();
            onBack();
          }}
          className="w-28 py-2 rounded-2xl bg-gray-700 hover:bg-gray-800 transition"
        >
          Back
        </button>
        {displayTime !== fullTime && (
          <button onClick={reset} className="w-28 py-2 rounded-2xl bg-gray-700 hover:bg-gray-800 transition">
            Reset
          </button>
        )}
        <button
          onClick={toggle}
          className={`w-28 py-2 rounded-2xl ${
            started ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-600 hover:bg-blue-700'
          } transition`}
        >
          {!started && displayTime === fullTime ? 'Start' : started ? 'Pause' : 'Resume'}
        </button>
      </div>
    </div>
  );
}

export default TimerView;
