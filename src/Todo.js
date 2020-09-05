import React from 'react'
import './Todo.css'
import { List, ListItemText, ListItem } from '@material-ui/core'

function Todo(props) {
return (
    <div>
      {props.todos.map(todo => (
        <List className="todo__list">
          <ListItem>
            <ListItemText primary={todo} secondary="deadline"/>
          </ListItem>
        </List>
      ))}
    </div>
  )
}

export default Todo
