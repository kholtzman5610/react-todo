import React from 'react';
import { render, screen } from '@testing-library/react';
import InputWithLabel from '../InputWithLabel';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

test('renders input with label and calls handleTitleChange when typing', async () => {
  const handleTitleChange = jest.fn();
  render(
    <InputWithLabel
      label="Title"
      id="title"
      todoTitle=""
      handleTitleChange={handleTitleChange}
    >
      Title
    </InputWithLabel>
  );

  // Check if the label and input elements are rendered
  const labelElement = screen.getByLabelText(/title/i);
  expect(labelElement).toBeInTheDocument();

  const inputElement = screen.getByRole('textbox', { name: /title/i });
  expect(inputElement).toBeInTheDocument();

  await userEvent.type(inputElement, 'Learn React');
  expect(handleTitleChange).toHaveBeenCalledTimes(11);
  expect(handleTitleChange).toHaveBeenCalledWith(expect.any(Object));
});
