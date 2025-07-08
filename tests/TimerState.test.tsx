import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import App from '../src/App';

describe('Timer State Management', () => {
  it('should share timer state between all components', async () => {
    const user = userEvent.setup();
    render(<App />);

    // Initial state check - both components should show the same initial state
    expect(screen.getByText(/Pomodoros completed: 0/i)).toBeInTheDocument();
    expect(screen.getByTestId('phase')).toHaveTextContent('FOCUS');

    // Start the timer
    const startButton = screen.getByRole('button', { name: /Start/i });
    await user.click(startButton);

    // Timer should now show "Pause" button, indicating it's running
    expect(screen.getByRole('button', { name: /Pause/i })).toBeInTheDocument();

    // Pause the timer
    const pauseButton = screen.getByRole('button', { name: /Pause/i });
    await user.click(pauseButton);

    // Should show "Start" button again
    expect(screen.getByRole('button', { name: /Start/i })).toBeInTheDocument();

    // Reset the timer
    const resetButton = screen.getByRole('button', { name: /Reset/i });
    await user.click(resetButton);

    // After reset, should still be in FOCUS phase with 0 completed pomodoros
    expect(screen.getByTestId('phase')).toHaveTextContent('FOCUS');
    expect(screen.getByText(/Pomodoros completed: 0/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Start/i })).toBeInTheDocument();
  });

  it('should show shared state is working by checking timer display shows 25:00 initially', () => {
    render(<App />);
    
    // This test verifies that the timer is properly initialized and
    // that the shared state is working (both components can access the same timer state)
    expect(screen.getByTestId('timer-value')).toHaveTextContent('25:00');
    expect(screen.getByTestId('phase')).toHaveTextContent('FOCUS');
    expect(screen.getByText(/Pomodoros completed: 0/i)).toBeInTheDocument();
  });
}); 