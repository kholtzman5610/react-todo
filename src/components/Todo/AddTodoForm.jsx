import React, { useState } from 'react';
import PropTypes from 'prop-types';
import InputWithLabel from './InputWithLabel';


const AddTodoForm = ({ onAddTodo }) => {
  const [todoTitle, setTodoTitle] = useState('');

  const handleTitleChange = (event) => {
    setTodoTitle(event.target.value);
  };

  const handleAddTodo = (event) => {
    event.preventDefault();
    if (todoTitle.trim()) {
      onAddTodo(todoTitle);
      setTodoTitle('');
    }
  };

  return (
    <form onSubmit={handleAddTodo}>
      <InputWithLabel id="todoTitle" todoTitle={todoTitle} handleTitleChange={handleTitleChange}>
        Title
      </InputWithLabel>
      <button type="submit">Add</button>
    </form>
  );
};

AddTodoForm.propTypes = {
  onAddTodo: PropTypes.func.isRequired,
};

export default AddTodoForm;
