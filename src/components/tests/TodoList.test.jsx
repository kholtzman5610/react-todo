import React from 'react';
import { render, screen } from '@testing-library/react';
import TodoList from '../Todo/TodoList';
import '@testing-library/jest-dom';

test('renders todo list and handles interactions', () => {
  const todoList = [
    { id: '1', title: 'Learn React', completedAt: null },
    { id: '2', title: 'Build a Todo App', completedAt: null },
  ];
  const onRemoveTodo = jest.fn();
  const onToggleComplete = jest.fn();
  const onEdit = jest.fn();

  render(
    <TodoList
      todoList={todoList}
      onRemoveTodo={onRemoveTodo}
      onToggleComplete={onToggleComplete}
      onEdit={onEdit}
    />
  );

  const todoItems = screen.getAllByRole('listitem');
  expect(todoItems).toHaveLength(todoList.length);

  todoList.forEach(todo => {
    expect(screen.getByText(todo.title)).toBeInTheDocument();
  });
});
