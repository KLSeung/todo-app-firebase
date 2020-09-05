import React, {useState} from 'react'
import { Button, FormControl, Input, InputLabel, makeStyles } from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns'; 
import {
  DateTimePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';

const useStyles = makeStyles({
  addButon: {
    marginTop: "60px",
    marginLeft: "20px"
  },
  deadlineForm: {
    marginTop: "20px",
    width: "400px"
  },
  formContainer: {
    backgroundColor: "#f7f8fa",
    margin: "30px",
    padding: "80px",
    borderRadius: "3%",
  },
  inputLabel: {
    top: 'auto',
    left: 'auto'
  }
})

function TodoForm(props) {
  const classes = useStyles();

  return (
    <div>
      <div>
      <FormControl className={classes.formContainer}>
        <InputLabel className={classes.inputLabel}>Write your Todo!</InputLabel>
        <Input        
          value={props.input} 
          onKeyPress={(event) => {
            if (event.key === 'Enter') {
              props.addTodo(event)
            }
          }}
          onChange={event => props.setInput(event.target.value)}/>
          <MuiPickersUtilsProvider utils ={DateFnsUtils}>
            <DateTimePicker className={classes.deadlineForm} value={props.selectedDate} onChange={props.setSelectedDate}></DateTimePicker>
          </MuiPickersUtilsProvider>
          <Button
            className={classes.addButon}
            type="submit" 
            disabled={!props.input}
            variant="contained" 
            color="primary" 
            onClick={props.addTodo}>
              Add Todo
          </Button>
      </FormControl>
      </div>
    </div>
  )
}

export default TodoForm