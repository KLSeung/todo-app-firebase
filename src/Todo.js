import React, {useState} from 'react'
import './Todo.css'
import { List, ListItemText, ListItem, Button, makeStyles, Modal, Backdrop, Fade, FormControl, InputLabel, Input } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { db } from './firebase'

const useStyles = makeStyles((theme) => ({
  todoList: {
    textAlign: "center",
  },
  todoContainer: {
    borderBottom: "1px solid #A8A8A8",
    borderColor: "grey"
  },
  deleteButton: {
    "&:hover": {
      "& $deleteIcon": {
        color: "#ff7171"
      }
    }
  },
  deleteIcon: {
    color: "black"
  },
  editButton: {
    "&:hover": {
      "& $editIcon": {
        color: "#4050b5"
      }
    }
  },
  editIcon: {
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
  editForm: {
    marginTop: "20px",
    width: "400px"
  },
  inputLabel: {
    top: 'auto',
    left: 'auto'
  }
}));

function Todo(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');

  const updateTodo = () => {
    db.collection('todos').doc(props.todo.id).set({
      todo: input
    }, { merge: true });
    setOpen(false);
    setInput('');
  }

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
            <h2 id="transition-modal-title">{`Edit Todo: ${props.todo.todo}`}</h2>
            <FormControl className={classes.editForm}>
              <InputLabel>Change todo to</InputLabel>
              <Input 
                value={input}
                onChange={event => setInput(event.target.value)} 
                onKeyPress={(event) => {
                  if (event.key === 'Enter') {
                    updateTodo();
                  }
                }}
                />
              <Button type="submit" disabled={!input} onClick={updateTodo}>Update Todo</Button>
            </FormControl>
          </div>
        </Fade>
      </Modal>
        <List className={classes.todoContainer}>
          <ListItem className={classes.todoList}>
            <ListItemText primary={props.todo.todo} secondary={`Deadline: ${new Intl.DateTimeFormat('en-US', {
                year: 'numeric',
                month: 'numeric',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
            }).format(props.todo.deadline.toDate())}`}/>
          </ListItem>
          <Button className={classes.editButton} onClick={e => setOpen(true)}>
            <EditIcon className={classes.editIcon}/>
          </Button>
          <Button className={classes.deleteButton} onClick={() => db.collection('todos').doc(props.todo.id).delete()}>
            <DeleteIcon className={classes.deleteIcon} />
          </Button>
        </List>
    </div>
  )
}

export default Todo
