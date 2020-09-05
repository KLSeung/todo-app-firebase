import React from 'react'
import './Todo.css'
import { List, ListItemText, ListItem, Button, makeStyles } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete';
import { db } from './firebase'

const useStyles = makeStyles({
  todoList: {
    textAlign: "center",
  },
  button: {
    "&:hover": {
      "& $icon": {
        color: "#ff7171"
      }
    }
  },
  icon: {
    color: 'black'
  }
});

function Todo(props) {
  const classes = useStyles();

  return (
    <div>
      {props.todos.map(todo => (
        <List>
          {/* (todo.timestamp ? todo.timestamp.toDateString() : null) */}
          <ListItem className={classes.todoList}>
            <ListItemText primary={todo.todo} secondary={`Deadline: ${new Intl.DateTimeFormat('en-US', {
                year: 'numeric',
                month: 'numeric',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
            }).format(todo.deadline.toDate())}`}/>
          </ListItem>
          <Button className={classes.button} onClick={() => db.collection('todos').doc(todo.id).delete()}>
            <DeleteIcon className={classes.icon} />
          </Button>
        </List>
      ))}
    </div>
  )
}

export default Todo
