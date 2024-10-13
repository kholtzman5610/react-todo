import React, { useState, useEffect, useCallback } from 'react';
import TodoList from './TodoList';
import AddTodoForm from './AddTodoForm';
import { FaClipboardList } from 'react-icons/fa';
import PropTypes from 'prop-types';

const TodoContainer = ({ tableName }) => {
  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`,
      },
    };

    const url = `https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID}/${tableName}?view=Grid%20view&sort[0][field]=title&sort[0][direction]=asc`;

    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      const todos = data.records
        .map((record) => ({
          title: record.fields.title,
          id: record.id,
          completedAt: record.fields.completedAt || null,
        }))
        .sort((a, b) => {
          const titleA = a.title.toLowerCase();
          const titleB = b.title.toLowerCase();
          return sortOrder === 'asc' ? (titleA < titleB ? -1 : titleA > titleB ? 1 : 0) : (titleA > titleB ? -1 : titleA < titleB ? 1 : 0);
        });

      setTodoList(todos);
    } catch (error) {
      setError(error.message);
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [sortOrder, tableName]);

  const addTodo = useCallback(async (newTodoTitle) => {
    const options = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fields: {
          title: newTodoTitle,
        },
      }),
    };

    const url = `https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID}/${tableName}`;

    try {
      const response = await fetch(url, options);
      const result = await response.json();
      const newTodo = { title: result.fields.title, id: result.id };

      // Sort the todo list alphabetically by title after adding a new todo
      setTodoList((prevTodoList) => {
        const updatedList = [...prevTodoList, newTodo];
        return updatedList.sort((a, b) => a.title.toLowerCase().localeCompare(b.title.toLowerCase()));
      });
    } catch (error) {
      setError(error.message);
      console.error('Error adding todo:', error);
    }
  }, [tableName]);

  const editTodo = useCallback(async (id, newTitle) => {
    const options = {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fields: {
          title: newTitle,
        },
      }),
    };

    const url = `https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID}/${tableName}/${id}`;

    try {
      const response = await fetch(url, options);
      const data = await response.json();

      if (!response.ok) {
        console.error('Error response from Airtable:', data);
        throw new Error(`Error: ${response.status} - ${data.error.message}`);
      }

      setTodoList((prevTodoList) =>
        prevTodoList.map((todo) =>
          todo.id === id ? { ...todo, title: newTitle } : todo
        )
      );
    } catch (error) {
      setError(error.message);
      console.error('Error editing todo:', error);
    }
  }, [tableName]);

  const removeTodo = useCallback(async (id) => {
    const options = {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}` },
    };

    const url = `https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID}/${tableName}/${id}`;

    try {
      await fetch(url, options);
      setTodoList((prevTodoList) => prevTodoList.filter((todo) => todo.id !== id));
    } catch (error) {
      setError(error.message);
      console.error('Error deleting todo:', error);
    }
  }, [tableName]);

  const toggleComplete = useCallback(async (id, currentCompletedAt) => {
    const isCompleted = Boolean(currentCompletedAt);
    const newCompletedAt = isCompleted ? null : new Date().toISOString().split('T')[0];

    const options = {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fields: {
          completedAt: newCompletedAt,
        },
      }),
    };

    const url = `https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}/${id}`;

    try {
      const response = await fetch(url, options);

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error: ${response.status} - ${errorText}`);
      }

      setTodoList((prevTodoList) =>
        prevTodoList.map((todo) =>
          todo.id === id ? { ...todo, completedAt: newCompletedAt } : todo
        )
      );
    } catch (error) {
      setError(error.message);
      console.error('Error toggling todo completion:', error);
    }
  }, [tableName]);


  const toggleSortOrder = () => {
    setSortOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'));
  };

  return (
    <div>
      <div className="header">
        <FaClipboardList className="icon" />
        <h1>Todo List for {tableName}</h1>
      </div>
      <button onClick={toggleSortOrder}>
        Toggle Sort Order ({sortOrder === 'asc' ? 'A-Z' : 'Z-A'})
      </button>
      <AddTodoForm onAddTodo={addTodo} />
      {isLoading ? <p>Loading...</p> : error ? <p>Error: {error}</p> : (
        <TodoList
          todoList={todoList}
          onRemoveTodo={removeTodo}
          onToggleComplete={toggleComplete}
          onEdit={editTodo}
        />
      )}
    </div>
  );
};

TodoContainer.propTypes = {
  tableName: PropTypes.string.isRequired,
};

export default TodoContainer;
