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
  },
  title: {
    flexGrow: 1,
    textAlign: "center",
    marginLeft: "250px"
  }
}));

function Header(props) {
  const classes = useStyles();
  const [loginOpen, setLoginOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);
  const [loginIDInput, setLoginIDInput] = useState('');
  const [loginPassInput, setLoginPassInput] = useState(''); 
  const [registerIDInput, setRegisterIDInput] = useState('');
  const [registerPassInput, setRegisterPassInput] = useState(''); 
  
  const signup = () => {
    //This is async so it returns a promise
    auth.createUserWithEmailAndPassword(registerIDInput, registerPassInput).then(cred => {
      setRegisterOpen(false);
      setRegisterIDInput('');
      setRegisterPassInput('');
    });
  };

  const login = () => {
    auth.signInWithEmailAndPassword(loginIDInput, loginPassInput).then(cred => {
      setLoginOpen(false);
      setLoginIDInput('');
      setLoginPassInput('');
    });
  };

  const logout = () => {
    auth.signOut();
    props.setUser('')
  }

  const NavButtons = () => {
    if (props.user) {
      console.log('true')
      return (<Button color="inherit" onClick={logout}>Logout</Button>)
    } else {
      console.log('false')
      return (
        
        <div>
          <Button color="inherit" onClick={e => {setLoginOpen(true)}}>Login</Button>
          <Button color="inherit" onClick={e => {setRegisterOpen(true)}}>Register</Button>
        </div>
      )
    }
  }

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            WhatToDo
          </Typography>
        {props.user ?
        <div>
          <Button color="inherit">Welcome User!</Button>
          <Button color="inherit" onClick={logout}>Logout</Button> 
        </div>
        :
        <div>
          <Button color="inherit" onClick={e => {setLoginOpen(true)}}>Login</Button>
          <Button color="inherit" onClick={e => {setRegisterOpen(true)}}>Register</Button>
        </div>
        }
        </Toolbar>
      </AppBar>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}           
        open={loginOpen}
        onClose={event => {
          setLoginOpen(false)
          setLoginIDInput('')
          setLoginPassInput('')
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
                type="email"
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
                type="password"
                value={loginPassInput}
                onChange={event => setLoginPassInput(event.target.value)} 
                onKeyPress={(event) => {
                  if (event.key === 'Enter') {
                    login();
                  }
                }}
                />
            </FormControl>
              <Button className={classes.button} type="submit" disabled={!loginIDInput || !loginPassInput} onClick={login} >Login</Button>
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
          setRegisterIDInput('')
          setRegisterPassInput('')
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
                type="email"
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
                type="password"
                value={registerPassInput}
                onChange={event => setRegisterPassInput(event.target.value)} 
                onKeyPress={(event) => {
                  if (event.key === 'Enter') {
                    signup()
                  }
                }}
                />
            </FormControl>
            <Button className={classes.button} type="submit" disabled={!registerIDInput} onClick={signup} >Register</Button>
          </div>
        </Fade>
      </Modal>
    </div>
  )
}

export default Header
