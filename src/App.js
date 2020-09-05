import React, { useState, useEffect }  from 'react';
import { Button, FormControl, Input, InputLabel } from '@material-ui/core';
import Todo from './Todo';
import './App.css';
import { db } from "./firebase";
import firebase from 'firebase';

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  // When website loads, listen to the database and fetch new todos as they get added/removed
  useEffect( () => {
    //collect all the todos from the firestore, everytime it chanages take a snapshot run a callback
    db.collection('todos').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
      //Docs are all of the todos in the DB, doc.data just returns an object of the data so we need to get the string value
      //We pass in an object into the array to contain the doc.id in order for deletion of the data
      setTodos(snapshot.docs.map(doc => ({id: doc.id, todo: doc.data().todo})))
    });
  }, []); //blank array as a dependency means run once when app loads 

  //Event to occur when button is clicked
  const addTodo = (event) => {
    //prevent refresh since states get deleted after refreshing
    event.preventDefault();

    db.collection('todos').add({
      todo: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });

    setInput('');
  };

  return (
    <div className="App">
      <h1>Todo App! 📔</h1>
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
        <Todo todos={todos}/>
      </ul>
    </div>
  );
}

export default App;
