import * as React from 'react';

function AddTodoForm(props) {
  const [todoTitle, setTodoTitle] = React.useState('');

  const handleTitleChange = (event) => {
    setTodoTitle(event.target.value);
  };

  const handleAddTodo = (event) => {
    event.preventDefault();
    props.onAddTodo({
      title: todoTitle,
      id: Date.now(),
    });
    setTodoTitle('');
  };

  return (
    <form onSubmit={handleAddTodo}>
      <label htmlFor="title">Title</label>
      <input type="text" id="title" name="title" value={todoTitle} onChange={handleTitleChange} />
      <button type="submit">Add</button>
    </form>
  );
}

export default AddTodoForm;
