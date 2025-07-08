import type { ReactNode } from 'react';
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import { load, save } from '../utils/storage';
import { useTimer, type TimerState } from '../hooks/useTimer';

export interface Task {
  id: string;
  title: string;
  completed: boolean;
  createdAt: number;
}

interface AppState {
  tasks: Task[];
  addTask: (title: string) => void;
  toggleTask: (id: string) => void;
  deleteTask: (id: string) => void;
  completedToday: number;
  // Timer state and actions
  timerState: TimerState;
  startTimer: () => void;
  pauseTimer: () => void;
  resetTimer: () => void;
  skipBreak: () => void;
}

const STORAGE_KEY = 'pomotask.tasks';

const AppStateCtx = createContext<AppState | undefined>(undefined);

function useProvideAppState(): AppState {
  const [tasks, setTasks] = useState<Task[]>(() => load<Task[]>(STORAGE_KEY, []));
  const { state: timerState, start, pause, reset, skipBreak } = useTimer();

  const persist = useCallback(
    (next: Task[]) => {
      setTasks(next);
      save(STORAGE_KEY, next);
    },
    [],
  );

  const addTask = useCallback((title: string) => {
    const task: Task = {
      id: crypto.randomUUID(),
      title,
      completed: false,
      createdAt: Date.now(),
    };
    persist([...tasks, task]);
  }, [tasks, persist]);

  const toggleTask = useCallback((id: string) => {
    persist(
      tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
    );
  }, [tasks, persist]);

  const deleteTask = useCallback((id: string) => {
    persist(tasks.filter((t) => t.id !== id));
  }, [tasks, persist]);

  const completedToday = useMemo(
    () => tasks.filter((t) => t.completed).length,
    [tasks],
  );

  return { 
    tasks, 
    addTask, 
    toggleTask, 
    deleteTask, 
    completedToday,
    timerState,
    startTimer: start,
    pauseTimer: pause,
    resetTimer: reset,
    skipBreak,
  };
}

export function AppStateProvider({ children }: { children: ReactNode }) {
  const value = useProvideAppState();
  return <AppStateCtx.Provider value={value}>{children}</AppStateCtx.Provider>;
}

export function useAppState(): AppState {
  const ctx = useContext(AppStateCtx);
  if (!ctx) throw new Error('useAppState must be used inside <AppStateProvider>');
  return ctx;
} 