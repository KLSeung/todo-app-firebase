import React from 'react'
import './Todo.css'
import { List, ListItemText, ListItem, Button, makeStyles } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete';
import { db } from './firebase'

const useStyles = makeStyles({

  button: {
    "&:hover": {
      "& $icon": {
        color: "#658dae"
      }
    }
  },
  icon: {
    color: "black"
  }
});

function Todo(props) {
  const classes = useStyles();

  return (
    <div>
      {props.todos.map(todo => (
        <List className="todo__list">
          <ListItem>
            <ListItemText primary={todo.todo} secondary="deadline"/>
          </ListItem>
          {/* <Button onClick={() => db.collection('todos').doc(todo.id).delete()}></Button> */}
          <Button className={classes.button} onClick={() => db.collection('todos').doc(todo.id).delete()}>
            <DeleteIcon className={classes.icon} />
          </Button>

        </List>
      ))}
    </div>
  )
}

export default Todo
