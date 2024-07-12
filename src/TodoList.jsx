import * as React from 'react';
import TodoListItem from './TodoListItem';

const todoList = [
  {
    id: 1,
    title: 'Complete assignment',
  },
  {
    id: 2,
    title: 'Make a to-do list',
  },
  {
    id: 3,
    title: 'Complete the to-do list',
  },
];

function TodoList() {
  return (
    <ul>
      {todoList.map(function (item) {
        return <TodoListItem key={item.id} todo={item} />;
      })}
    </ul>
  );
}

export default TodoList;
