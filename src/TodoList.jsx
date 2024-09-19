import React from 'react';
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

export default TodoList;
