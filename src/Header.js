import React, {useState} from 'react'
import { AppBar, Toolbar, IconButton, Typography, Button, makeStyles, Modal, Backdrop, Fade, FormControl, Input, InputLabel } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu';
import { auth } from './firebase.js'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center'
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    fontSize: "20px",
    outline: "none"
  },
  forms: {
    display: "block",
  },
  button: {
    marginTop: "20px"
  },
  input: {
    width: "300px"
  }
}));

function Header() {
  const classes = useStyles();
  const [loginOpen, setLoginOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);
  const [loginIDInput, setLoginIDInput] = useState('');
  const [loginPassInput, setLoginPassInput] = useState(''); 
  const [registerIDInput, setRegisterIDInput] = useState('');
  const [registerPassInput, setRegisterPassInput] = useState(''); 

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            WhatToDo
          </Typography>
          <Button color="inherit" onClick={e => {setLoginOpen(true)}}>Login</Button>
          <Button color="inherit" onClick={e => {setRegisterOpen(true)}}>Register</Button>
        </Toolbar>
      </AppBar>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}           
        open={loginOpen}
        onClose={event => {
          setLoginOpen(false)
        }}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={loginOpen}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title">Login</h2>
            <FormControl className={classes.forms}>
              <InputLabel>Email</InputLabel>
              <Input 
                className={classes.input}
                value={loginIDInput}
                onChange={event => setLoginIDInput(event.target.value)} 
                onKeyPress={(event) => {
                  if (event.key === 'Enter') {
                  }
                }}
                />
            </FormControl>
            <FormControl className={classes.forms}>
            <InputLabel>Password</InputLabel>
              <Input 
                className={classes.input}
                value={loginPassInput}
                onChange={event => setLoginPassInput(event.target.value)} 
                onKeyPress={(event) => {
                  if (event.key === 'Enter') {
                  }
                }}
                />
            </FormControl>
              <Button className={classes.button} type="submit" disabled={!loginIDInput || !loginPassInput} >Login</Button>
          </div>
        </Fade>
      </Modal>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}           
        open={registerOpen}
        onClose={event => {
          setRegisterOpen(false)
        }}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={registerOpen}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title">Register</h2>
            <FormControl className={classes.forms}>
              <InputLabel>Email</InputLabel>
              <Input 
                className={classes.input}
                value={registerIDInput}
                onChange={event => setRegisterIDInput(event.target.value)} 
                onKeyPress={(event) => {
                  if (event.key === 'Enter') {
                  }
                }}
                />
            </FormControl>
            <FormControl className={classes.forms}>
            <InputLabel>Password</InputLabel>
              <Input 
                className={classes.input}
                value={loginPassInput}
                onChange={event => setLoginPassInput(event.target.value)} 
                onKeyPress={(event) => {
                  if (event.key === 'Enter') {
                  }
                }}
                />
            </FormControl>
            <Button className={classes.button} type="submit" disabled={!registerIDInput} >Register</Button>
          </div>
        </Fade>
      </Modal>
    </div>
  )
}

export default Header
