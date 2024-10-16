import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AddTodoForm from '../Todo/AddTodoForm';
import '@testing-library/jest-dom';

test('renders input and button in AddTodoForm', () => {
  render(<AddTodoForm onAddTodo={() => {}} />);

  const inputElement = screen.getByLabelText(/title/i);
  const buttonElement = screen.getByRole('button', { name: /add/i });

  expect(inputElement).toBeInTheDocument();
  expect(buttonElement).toBeInTheDocument();
});

test('calls onAddTodo when form is submitted', () => {
  const onAddTodoMock = jest.fn();
  render(<AddTodoForm onAddTodo={onAddTodoMock} />);

  const inputElement = screen.getByLabelText(/title/i);
  const buttonElement = screen.getByRole('button', { name: /add/i });

  fireEvent.change(inputElement, { target: { value: 'New Todo' } });
  fireEvent.click(buttonElement);

  expect(onAddTodoMock).toHaveBeenCalledTimes(1);
  expect(onAddTodoMock).toHaveBeenCalledWith('New Todo');
});
