import React from 'react';
import TodoListItem from './TodoListItem';

function TodoList({ todoList, onRemoveTodo, onCompleteTodo }) {
  return (
    <ul>
      {todoList.map((todo) => (
        <TodoListItem
          key={todo.id}
          todo={todo}
          onRemove={() => onRemoveTodo(todo.id)}
          onComplete={() => onCompleteTodo(todo.id)}
        />
      ))}
    </ul>
  );
}

export default TodoList;
