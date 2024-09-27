import React from 'react';
import { render, screen } from '@testing-library/react';
import TodoListItem from '../TodoListItem';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { waitFor } from '@testing-library/react';

test('renders todo item and calls onRemove and onToggleComplete', async () => {
  const todo = { id: '1', title: 'Learn React', completedAt: null };
  const onRemove = jest.fn();
  const onToggleComplete = jest.fn();

  render(
    <TodoListItem
      todo={todo}
      onRemove={onRemove}
      onToggleComplete={onToggleComplete}
    />
  );

  // Check if the todo title is rendered
  expect(screen.getByText('Learn React')).toBeInTheDocument();

  // Check for buttons
  const completeButton = screen.getByRole('button', { name: /mark as completed/i });
  const removeButton = screen.getByRole('button', { name: /remove/i });

  // Simulate button clicks
  userEvent.click(completeButton);
  await waitFor(() => {
    expect(onToggleComplete).toHaveBeenCalledTimes(1);
  });

  userEvent.click(removeButton);
  await waitFor(() => {
    expect(onRemove).toHaveBeenCalledTimes(1);
  });
});
