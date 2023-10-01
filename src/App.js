// App.js

import React from 'react';
import './App.css';
import TodoList from './components/ToDoList';

function App() {
  return (
    <div className="App">
      <h1
      style={{
        color:'#00006F'
      }}>Your To-do App</h1>
      <TodoList />
    </div>
  );
}

export default App;
