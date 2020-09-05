import React, { useState }  from 'react';
import './App.css';

function App() {
  const [todos, setTodos] = useState(['Do task 1', 'Do task 2', 'Do task 3']);
  const [input, setInput] = useState('');

  //Event to occur when button is clicked
  const addTodo = (event) => {
    setTodos([...todos, input]);
  }

  return (
    <div className="App">
      <h1>Hello World!</h1>
      <input value={input} onChange={event => setInput(event.target.value)}/>
      <button onClick={addTodo}>Add Todo</button>

      <ul>
        {todos.map(todo => (
          <li>{todo}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
