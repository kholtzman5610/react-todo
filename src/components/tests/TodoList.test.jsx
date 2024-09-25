import React from 'react';
import { render, screen } from '@testing-library/react';
import TodoList from '../TodoList';
import '@testing-library/jest-dom';

test('renders todo list and calls onRemoveTodo and onToggleComplete', () => {
  const todoList = [
    { id: '1', title: 'Learn React', completedAt: null },
    { id: '2', title: 'Build a Todo App', completedAt: null },
  ];
  const onRemoveTodo = jest.fn();
  const onToggleComplete = jest.fn();

  render(
    <TodoList
      todoList={todoList}
      onRemoveTodo={onRemoveTodo}
      onToggleComplete={onToggleComplete}
    />
  );

  // Check if the todo items are rendered
  const todoItems = screen.getAllByRole('listitem');
  expect(todoItems).toHaveLength(todoList.length);
  expect(screen.getByText('Learn React')).toBeInTheDocument();
  expect(screen.getByText('Build a Todo App')).toBeInTheDocument();

  // Check if the buttons are present
  const completeButtons = screen.getAllByRole('button', { name: /mark as completed/i });
  expect(completeButtons.length).toBe(todoList.length);
  const removeButtons = screen.getAllByRole('button', { name: /remove/i });
  expect(removeButtons.length).toBe(todoList.length);
});
