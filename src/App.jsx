import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TodoContainer from './components/Todo/TodoContainer';
import Home from './components/Home/Home';
import './App.css';
import './navbar-style.scss';
import Navigation from './components/Navigation/Navigation';
import NavLink from './components/Navigation/NavLink';


function App() {
  return (
    <Router>
      <Navigation>
        <NavLink text='Home' url='/' />
        <NavLink text='Todo List' url='/todos' />
      </Navigation>
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/todos" element={<TodoContainer tableName={import.meta.env.VITE_TABLE_NAME} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;