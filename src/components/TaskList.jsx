import React from 'react'
import Task from './Task'
import { Droppable } from 'react-beautiful-dnd'
import { changeTask, deleteTask } from '../redux/actions/actions'

export default function TaskList({ tasks, listId, dispatch }) {
  const editTask = (taskId, text) => {
    dispatch(changeTask({ taskId, listId, text }))
  }
  return (
    <Droppable droppableId={listId} type='task'>
      {provided => (
        <div
          className='column__tasks'
          ref={provided.innerRef}
          {...provided.droppableProps}>
          {tasks.map((task, index) => (
            <Task editTask={editTask} key={task.id} task={task} index={index} />
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  )
}
