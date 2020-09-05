import React, {useState} from 'react'
import './Todo.css'
import { List, ListItemText, ListItem, Button, makeStyles, Modal, Backdrop, Fade } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete';
import { db } from './firebase'

const useStyles = makeStyles((theme) => ({
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
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    fontSize: "20px"
  },
}));

function Todo(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}           
        open={open}
        onClose={event => setOpen(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title">Edit Todo!</h2>
          </div>
        </Fade>
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
