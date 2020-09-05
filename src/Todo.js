import React, {useState} from 'react'
import './Todo.css'
import { List, ListItemText, ListItem, Button, makeStyles, Modal } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete';
import { db } from './firebase'

const useStyles = makeStyles({
  todoList: {
    textAlign: "center",
  },
  todoContainer: {
    borderBottom: "1px solid #A8A8A8",
    borderColor: "grey"
  },
  button: {
    "&:hover": {
      "& $icon": {
        color: "#ff7171"
      }
    }
  },
  icon: {
    color: "black"
  }
});

function Todo(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div>
      <Modal           
        open={open}
        onClose={e => setOpen(false)}>
          <div>
            <h1>open</h1>
            <button onClick={e => setOpen(false)}>Close</button>
          </div>
      </Modal>
      {props.todos.map(todo => (
        <List className={classes.todoContainer}>
          <ListItem className={classes.todoList}>
            <ListItemText primary={todo.todo} secondary={`Deadline: ${new Intl.DateTimeFormat('en-US', {
                year: 'numeric',
                month: 'numeric',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
            }).format(todo.deadline.toDate())}`}/>
          </ListItem>
          <button onClick={e => setOpen(true)}>Edit</button>
          <Button className={classes.button} onClick={() => db.collection('todos').doc(todo.id).delete()}>
            <DeleteIcon className={classes.icon} />
          </Button>
        </List>
      ))}
    </div>
  )
}

export default Todo
