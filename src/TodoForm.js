import React, {useState} from 'react'
import { Button, FormControl, Input, InputLabel, makeStyles } from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns'; 
import {
  DateTimePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';

const useStyles = makeStyles({
  addButon: {
    marginTop: "10px",
    marginLeft: "20px"
  }
})

function TodoForm(props) {
  const classes = useStyles();

  return (
    <div>
      <FormControl>
        <InputLabel>Write your Todo!</InputLabel>
        <Input 
          value={props.input} 
          onKeyPress={(event) => {
            if (event.key === 'Enter') {
              props.addTodo(event)
            }
          }}
          onChange={event => props.setInput(event.target.value)}/>
          <MuiPickersUtilsProvider utils ={DateFnsUtils}>
            <DateTimePicker value={props.selectedDate} onChange={props.setSelectedDate}></DateTimePicker>
          </MuiPickersUtilsProvider>
      </FormControl>
      <Button
        className={classes.addButon}
        type="submit" 
        disabled={!props.input}
        variant="contained" 
        color="primary" 
        onClick={props.addTodo}>
        Add Todo
      </Button>
    </div>
  )
}

export default TodoForm