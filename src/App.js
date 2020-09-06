import React, { useState, useEffect }  from 'react';
import Todo from './Todo';
import TodoForm from './TodoForm';
import Header from './Header';
import './App.css';
import { db } from "./firebase";
import firebase from 'firebase';

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());

  // When website loads, listen to the database and fetch new todos as they get added/removed
  useEffect( () => {
    //collect all the todos from the firestore, everytime it chanages take a snapshot run a callback
    db.collection('todos').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
      //Docs are all of the todos in the DB, doc.data just returns an object of the data so we need to get the string value
      //We pass in an object into the array to contain the doc.id in order for deletion of the data
      setTodos(snapshot.docs.map(doc => ({id: doc.id, todo: doc.data().todo, deadline: doc.data().deadline})))
    });
  }, []); //blank array as a dependency means run once when app loads 

  //Event to occur when button is clicked
  const addTodo = (event) => {
    //prevent refresh since states get deleted after refreshing
    event.preventDefault();

    db.collection('todos').add({
      todo: input,
      deadline: selectedDate,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });

    setInput('');
  };

  return (
    <div className="App">
      <Header />
      <div>
        <TodoForm input={input} addTodo={addTodo} setInput={setInput} selectedDate={selectedDate} setSelectedDate={setSelectedDate}/>
      </div>
      <ul>      
        {todos.map(todo => (
        <Todo todo={todo}/>
        ))}
      </ul>
    </div>
  );
}

export default App;
