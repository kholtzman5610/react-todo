import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TodoList from './components/TodoList';
import AddTodoForm from './components/AddTodoForm';
import './App.css';
import { FaClipboardList } from "react-icons/fa";

function App() {
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

    const url = `https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}?view=Grid%20view&sort[0][field]=title&sort[0][direction]=asc`;

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
        .sort((objectA, objectB) => {
          const titleA = objectA.title.toLowerCase();
          const titleB = objectB.title.toLowerCase();

          if (sortOrder === 'asc') {
            return titleA < titleB ? -1 : titleA > titleB ? 1 : 0;
          } else {
            return titleA < titleB ? 1 : titleA > titleB ? -1 : 0;
          }
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
  }, [sortOrder]);

  useEffect(() => {
    const debounceSave = setTimeout(() => {
      if (!isLoading) {
        localStorage.setItem('savedTodoList', JSON.stringify(todoList));
      }
    }, 500);

    return () => clearTimeout(debounceSave);
  }, [todoList, isLoading]);

  const addTodo = useCallback(async (newTodoTitle) => {
    if (!newTodoTitle || typeof newTodoTitle !== 'string') {
      console.error('Invalid title value:', newTodoTitle);
      setError('Invalid title value');
      return;
    }

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

    const url = `https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}`;

    try {
      const response = await fetch(url, options);

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error: ${response.status} - ${errorText}`);
      }

      const result = await response.json();
      const newTodo = {
        title: result.fields.title,
        id: result.id,
      };

      setTodoList((prevTodoList) => [...prevTodoList, newTodo]);
    } catch (error) {
      setError(error.message);
      console.error('Error adding todo:', error);
    }
  }, []);

  const toggleTodoCompletion = useCallback(async (id, currentCompletedAt) => {
    const isCompleted = Boolean(currentCompletedAt);
    const completedAt = isCompleted ? null : new Date().toISOString().split('T')[0];

    const options = {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fields: {
          completedAt: completedAt,
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
          todo.id === id ? { ...todo, completedAt } : todo
        )
      );
    } catch (error) {
      setError(error.message);
      console.error('Error toggling todo completion:', error);
    }
  }, []);

  const removeTodo = useCallback(async (id) => {
    const options = {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`,
      },
    };

    const url = `https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}/${id}`;

    try {
      const response = await fetch(url, options);

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error: ${response.status} - ${errorText}`);
      }

      setTodoList((prevTodoList) => prevTodoList.filter((todo) => todo.id !== id));
    } catch (error) {
      setError(error.message);
      console.error('Error deleting todo:', error);
    }
  }, []);

  const toggleSortOrder = () => {
    setSortOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'));
  };

  return (
    <Router>
      <div className="container">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <div className="header">
                  <FaClipboardList className="icon" />
                  <h1>Todo List</h1>
                </div>
                <button onClick={toggleSortOrder}>
                  Toggle Sort Order ({sortOrder === 'asc' ? 'A-Z' : 'Z-A'})
                </button>
                <div className="add-todo-form">
                  <AddTodoForm onAddTodo={addTodo} />
                </div>
                {isLoading ? (
                  <p>Loading...</p>
                ) : error ? (
                  <p>Error: {error}</p>
                ) : (
                  <TodoList todoList={todoList} onRemoveTodo={removeTodo} onToggleComplete={toggleTodoCompletion} />
                )}
              </>
            }
          />
          <Route path="/new" element={<h1>New Todo List</h1>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
