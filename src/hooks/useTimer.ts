import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * The two phases of a classic Pomodoro cycle.
 */
export const TimerPhase = {
  FOCUS: 'FOCUS',
  BREAK: 'BREAK',
} as const;

export type TimerPhase = typeof TimerPhase[keyof typeof TimerPhase];

export const FOCUS_DURATION_SECS = 25 * 60; // 25 min
export const BREAK_DURATION_SECS = 5 * 60; // 5 min

export interface TimerState {
  /** Current phase of the pomodoro – focus or break. */
  phase: TimerPhase;
  /** Seconds left in the current phase. */
  secondsLeft: number;
  /** Whether the timer is actively counting down. */
  isRunning: boolean;
  /** Completed focus sessions for the current day. */
  completedPomodoros: number;
}

/**
 * Returns an initial timer state – 25 minutes of FOCUS, not running.
 */
export function createInitialTimerState(): TimerState {
  return {
    phase: TimerPhase.FOCUS,
    secondsLeft: FOCUS_DURATION_SECS,
    isRunning: false,
    completedPomodoros: 0,
  };
}

/**
 * Advances the timer state by one second (if `isRunning === true`).
 * Handles automatic phase switching when the counter reaches zero.
 */
export function tick(state: TimerState): TimerState {
  if (!state.isRunning) return state;
  // If there is still time left in the current phase just decrement.
  if (state.secondsLeft > 0) {
    return { ...state, secondsLeft: state.secondsLeft - 1 };
  }
  // Phase finished → switch to the next one.
  if (state.phase === TimerPhase.FOCUS) {
    return {
      phase: TimerPhase.BREAK,
      secondsLeft: BREAK_DURATION_SECS,
      isRunning: state.isRunning,
      completedPomodoros: state.completedPomodoros + 1,
    };
  }
  // Coming from BREAK ⇒ back to FOCUS.
  return {
    phase: TimerPhase.FOCUS,
    secondsLeft: FOCUS_DURATION_SECS,
    isRunning: state.isRunning,
    completedPomodoros: state.completedPomodoros,
  };
}

/**
 * Start the timer (idempotent).
 */
export function start(state: TimerState): TimerState {
  if (state.isRunning) return state;
  return { ...state, isRunning: true };
}

/**
 * Pause the timer (idempotent).
 */
export function pause(state: TimerState): TimerState {
  if (!state.isRunning) return state;
  return { ...state, isRunning: false };
}

/**
 * Reset the timer back to its initial values.
 */
export function reset(): TimerState {
  return createInitialTimerState();
}

/**
 * INTENTIONALLY UNIMPLEMENTED: skipping a break should immediately jump back
 * to a fresh 25-minute focus session. This stub exists so that the provided
 * `skipBreak.test.ts` fails, as required by the upgrade brief.
 */
export function skipBreak(_state: TimerState): TimerState {
  /* TODO intentionally unimplemented so tests fail */
  throw new Error('skipBreak not implemented');
}

/**
 * A React hook wrapping the pure helper functions. Exposes
 * state + imperative actions to components.
 */
export function useTimer() {
  const [state, setState] = useState<TimerState>(createInitialTimerState());
  const intervalRef = useRef<number | null>(null);

  // Drive ticking when the timer is running.
  useEffect(() => {
    // Clear any existing interval first
    if (intervalRef.current !== null) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    if (state.isRunning) {
      intervalRef.current = window.setInterval(() => {
        setState((s) => tick(s));
      }, 1000);
    }

    // Cleanup function
    return () => {
      if (intervalRef.current !== null) {
        window.clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [state.isRunning]);

  // Imperative action wrappers.
  const actions = {
    start: useCallback(() => setState((s) => start(s)), []),
    pause: useCallback(() => setState((s) => pause(s)), []),
    reset: useCallback(() => setState(createInitialTimerState()), []),
    skipBreak: useCallback(() => setState((s) => skipBreak(s)), []),
  } as const;

  return { state, ...actions };
} 