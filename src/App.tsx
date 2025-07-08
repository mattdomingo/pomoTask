import './App.css';
import TimerDisplay from './components/TimerDisplay';
import TaskList from './components/TaskList';
import StatsPanel from './components/StatsPanel';
import SettingsModal from './components/SettingsModal';
import { AppStateProvider } from './context/AppState';

export default function App() {
  return (
    <AppStateProvider>
      <main className="container mx-auto p-4 max-w-xl text-center space-y-6">
        <h1 className="text-3xl font-bold">Pomotask</h1>
        <TimerDisplay />
        <TaskList />
        <StatsPanel />
        <SettingsModal />
      </main>
    </AppStateProvider>
  );
}
