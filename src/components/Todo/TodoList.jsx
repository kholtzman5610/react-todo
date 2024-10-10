import React, { memo } from 'react';
import PropTypes from 'prop-types';
import TodoListItem from './TodoListItem';

function TodoList({ todoList, onRemoveTodo, onToggleComplete }) {
  return (
    <ul>
      {todoList.map((todo) => (
        <TodoListItem
          key={todo.id}
          todo={todo}
          onRemove={() => onRemoveTodo(todo.id)}
          onToggleComplete={() => onToggleComplete(todo.id, todo.completedAt)}
        />
      ))}
    </ul>
  );
}

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
};

export default memo(TodoList);
