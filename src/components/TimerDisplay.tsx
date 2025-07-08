import { useAppState } from '../context/AppState';

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60)
    .toString()
    .padStart(2, '0');
  const s = (seconds % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

export default function TimerDisplay() {
  const { timerState, startTimer, pauseTimer, resetTimer } = useAppState();

  return (
    <div className="flex flex-col items-center gap-4">
      <h2 className="text-5xl font-mono" data-testid="timer-value">
        {formatTime(timerState.secondsLeft)}
      </h2>
      <div className="flex gap-2">
        {timerState.isRunning ? (
          <button className="btn" onClick={pauseTimer}>
            Pause
          </button>
        ) : (
          <button className="btn" onClick={startTimer}>
            Start
          </button>
        )}
        <button className="btn" onClick={resetTimer}>
          Reset
        </button>
      </div>
      <p className="text-sm opacity-75">
        Phase: <span data-testid="phase">{timerState.phase}</span>
      </p>
    </div>
  );
} 