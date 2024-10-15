import React, { useState } from 'react';
import PropTypes from 'prop-types';
import InputWithLabel from './InputWithLabel';
import './AddTodoForm.css';

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

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleAddTodo(event);
    }
  };

  const handleInput = (event) => {
    const textarea = event.target;
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
  };
  

  return (
    <div className="add-todo-form">
      <p className="info-paragraph">
        Press Enter to submit, Shift+Enter for a new line.
      </p>
      <form onSubmit={handleAddTodo}>
        <InputWithLabel 
          id="todoTitle" 
          todoTitle={todoTitle} 
          handleTitleChange={handleTitleChange} 
          handleKeyDown={handleKeyDown}
        >
          Title
        </InputWithLabel>
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

AddTodoForm.propTypes = {
  onAddTodo: PropTypes.func.isRequired,
};

export default AddTodoForm;
