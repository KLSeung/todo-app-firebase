import React, { useState, useEffect }  from 'react';
import Todo from './Todo';
import TodoForm from './TodoForm';
import Header from './Header';
import './App.css';
import { db, auth } from "./firebase";
import firebase from 'firebase';
import { useRadioGroup } from '@material-ui/core';

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // const checkIfLoggedIn = (callback) => {
  //   auth.onAuthStateChanged(user => {
  //     if (user) {
  //       setUser(user);
  //       callback(user);
  //     }
  //   })
  // }

  // When website loads, listen to the database and fetch new todos as they get added/removed
  useEffect(() => {
    //collect all the todos from the firestore, everytime it chanages take a snapshot run a callback

    auth.onAuthStateChanged(user => { 
      if (user) {
        setUser(user);
        db.collection('todos').where('userID', '==', user.uid).orderBy('timestamp', 'desc').onSnapshot(snapshot => {
          //Docs are all of the todos in the DB, doc.data just returns an object of the data so we need to get the string value
          //We pass in an object into the array to contain the doc.id in order for deletion of the data
          setTodos(snapshot.docs.map(doc => ({id: doc.id, todo: doc.data().todo, deadline: doc.data().deadline})))})
        
        } else {
          setUser(user);
          setTodos([]);
      }
      setIsLoading(false);
    })
  }, []); //blank array as a dependency means run once when app loads 
  //Event to occur when button is clicked
  const addTodo = (event) => {
    //prevent refresh since states get deleted after refreshing
    event.preventDefault();

    //I added userID to each data, but I'm not sure how to get firestore rules to filter out only the data that 
    //has the current userID... Otherwise this project is pretty much completed!
    db.collection('todos').add({
      todo: input,
      deadline: selectedDate,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      userID: user.uid
    });

    setInput('');
    console.log(user.uid)
  };

    if (isLoading) {
      return null
    } else {
      return (
      <div className="App">
        <Header user={user} setUser={setUser}/>
        {user ? 
          <div>       
          <TodoForm input={input} addTodo={addTodo} setInput={setInput} selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
          {todos.map(todo => (
          <Todo todo={todo} />
          ))} 
          </div> : <h1>Please Login to see your Todos!</h1>  
        }
      </div>)
    }

}

export default App;
