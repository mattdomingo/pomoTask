import { useAppState } from '../context/AppState';

export default function StatsPanel() {
  const { completedToday, timerState } = useAppState();

  return (
    <div className="p-4 border rounded">
      <h3 className="font-semibold mb-2">Daily Stats</h3>
      <p>Pomodoros completed: {timerState.completedPomodoros}</p>
      <p>Tasks completed: {completedToday}</p>
    </div>
  );
} 