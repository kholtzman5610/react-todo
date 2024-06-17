import * as React from 'react';

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
function App() {
  return (
    <div>
      <h1> Todo List</h1>
      <ul>
        {todoList.map(function (item) {
          return <li key={item.id}>{item.title}</li>
        })}
      </ul>
    </div>
  )
}

export default App
