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

  return (
    <div className="add-todo-form">
      <p className="info-paragraph">
        The Enter key saves the changes and adds it to the list
      </p>
      <form onSubmit={handleAddTodo}>
        <InputWithLabel 
          id="todoTitle" 
          todoTitle={todoTitle} 
          handleTitleChange={handleTitleChange} 
          onKeyDown={handleKeyDown}
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
