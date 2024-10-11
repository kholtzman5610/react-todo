import React from 'react';
import TodoListItem from './TodoListItem';
import PropTypes from 'prop-types';

const TodoList = ({ todoList, onRemoveTodo, onToggleComplete, onEdit }) => (
  <ul>
    {todoList.map((todo) => (
      <TodoListItem
        key={todo.id}
        todo={todo}
        onRemoveTodo={onRemoveTodo}
        onToggleComplete={onToggleComplete}
        onEdit={onEdit}
      />
    ))}
  </ul>
);

TodoList.propTypes = {
  todoList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      completedAt: PropTypes.string,
    })
  ).isRequired,
  onRemoveTodo: PropTypes.func.isRequired,
  onToggleComplete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
};

export default TodoList;
