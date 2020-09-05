import React, { useState }  from 'react';
import { Button, FormControl, Input, InputLabel } from '@material-ui/core';
import './App.css';

function App() {
  const [todos, setTodos] = useState(['Do task 1', 'Do task 2', 'Do task 3']);
  const [input, setInput] = useState('');

  //Event to occur when button is clicked
  const addTodo = (event) => {
    //prevent refresh since states get deleted after refreshing
    event.preventDefault();
    setTodos([...todos, input]);
    setInput('');
  };

  return (
    <div className="App">
      <h1>Hello World!</h1>
      <FormControl>
        <InputLabel>Write your Todo!</InputLabel>
        <Input 
          value={input} 
          onKeyPress={(event) => {
            if (event.key === 'Enter') {
              addTodo(event)
            }
          }}
          onChange={event => setInput(event.target.value)}/>
      </FormControl>
      <Button 
        type="submit" 
        disabled={!input}
        variant="contained" 
        color="primary" 
        onClick={addTodo}>
        Add Todo
      </Button>
      <ul>
        {todos.map(todo => (
          <li>{todo}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
