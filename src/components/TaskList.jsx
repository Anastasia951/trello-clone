import React from 'react'
import Task from './Task'
import { Droppable } from 'react-beautiful-dnd'

export default function TaskList({ tasks, listId }) {
  return (
    <Droppable droppableId={listId} type='task'>
      {provided => (
        <div
          className='column__tasks'
          ref={provided.innerRef}
          {...provided.droppableProps}>
          {tasks.map((task, index) => (
            <Task key={task.id} task={task} index={index} />
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  )
}
