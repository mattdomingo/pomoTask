import { tick, createInitialTimerState, TimerPhase, start } from '../src/hooks/useTimer';
import { describe, it, expect } from 'vitest';

function tickN(state: Parameters<typeof tick>[0], n: number) {
  let s = state;
  for (let i = 0; i < n; i += 1) {
    s = tick(s);
  }
  return s;
}

describe('tick()', () => {
  it('decrements seconds when running', () => {
    let state = createInitialTimerState();
    state = start(state);
    const next = tick(state);
    expect(next.secondsLeft).toBe(state.secondsLeft - 1);
  });

  it('switches to BREAK after 25 minutes', () => {
    let state = createInitialTimerState();
    state = start(state);
    const afterFocus = tickN(state, state.secondsLeft + 1); // +1 to cross boundary
    expect(afterFocus.phase).toBe(TimerPhase.BREAK);
    expect(afterFocus.secondsLeft).toBe(5 * 60);
  });

  it('cycles back to FOCUS after break', () => {
    let state = createInitialTimerState();
    state = start(state);
    // Finish focus
    state = tickN(state, state.secondsLeft + 1);
    // Finish break phase
    state = tickN(state, state.secondsLeft + 1);
    expect(state.phase).toBe(TimerPhase.FOCUS);
    expect(state.secondsLeft).toBe(25 * 60);
  });
}); 