import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, beforeEach } from 'vitest';
import TaskList from '../src/components/TaskList';
import { AppStateProvider } from '../src/context/AppState';

// A helper to render TaskList within the required provider
const renderTaskList = () => {
  return render(
    <AppStateProvider>
      <TaskList />
    </AppStateProvider>
  );
};

describe('TaskList Component', () => {
  beforeEach(() => {
    // Clear localStorage before each test to ensure isolation
    localStorage.clear();
  });

  it('should add a new task when the form is submitted', async () => {
    const user = userEvent.setup();
    renderTaskList();

    const input = screen.getByPlaceholderText('Add a task');
    const addButton = screen.getByRole('button', { name: /Add/i });

    // No tasks are shown initially
    expect(screen.queryByRole('listitem')).not.toBeInTheDocument();

    // Add a new task
    await user.type(input, 'My first task');
    await user.click(addButton);

    // Verify the new task is displayed
    expect(screen.getByText('My first task')).toBeInTheDocument();
    expect(screen.getByRole('listitem')).toBeInTheDocument();
  });

  it('should toggle a task completion status on click', async () => {
    const user = userEvent.setup();
    renderTaskList();

    // Add a task to work with
    const input = screen.getByPlaceholderText('Add a task');
    await user.type(input, 'Task to be toggled');
    await user.click(screen.getByRole('button', { name: /Add/i }));

    const taskText = screen.getByText('Task to be toggled');
    const checkbox = screen.getByRole('checkbox');

    // Initially, the task is not completed
    expect(checkbox).not.toBeChecked();
    expect(taskText).not.toHaveClass('line-through');

    // Toggle to completed
    await user.click(checkbox);
    expect(checkbox).toBeChecked();
    expect(taskText).toHaveClass('line-through');
    
    // Toggle back to incomplete
    await user.click(checkbox);
    expect(checkbox).not.toBeChecked();
    expect(taskText).not.toHaveClass('line-through');
  });

  it('should delete a task when the delete button is clicked', async () => {
    const user = userEvent.setup();
    renderTaskList();

    // Add a task
    const input = screen.getByPlaceholderText('Add a task');
    await user.type(input, 'Task to be deleted');
    await user.click(screen.getByRole('button', { name: /Add/i }));

    // Verify the task exists
    const taskItem = screen.getByText('Task to be deleted');
    expect(taskItem).toBeInTheDocument();

    // Find and click the delete button within the same list item
    const deleteButton = screen.getByRole('button', { name: /Delete task/i });
    await user.click(deleteButton);

    // Verify the task has been removed
    expect(screen.queryByText('Task to be deleted')).not.toBeInTheDocument();
    expect(screen.queryByRole('listitem')).not.toBeInTheDocument();
  });

  it('should not add a task if the input is empty or contains only whitespace', async () => {
    const user = userEvent.setup();
    renderTaskList();
    
    const input = screen.getByPlaceholderText('Add a task');
    const addButton = screen.getByRole('button', { name: /Add/i });

    // Attempt to add an empty task
    await user.click(addButton);
    expect(screen.queryByRole('listitem')).not.toBeInTheDocument();

    // Attempt to add a task with only whitespace
    await user.type(input, '   ');
    await user.click(addButton);
    expect(screen.queryByRole('listitem')).not.toBeInTheDocument();
  });
}); 