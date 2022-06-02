import React, { useState } from 'react'
import { Draggable } from 'react-beautiful-dnd'

export default function Task({ task, index, editTask }) {
  const editTaskHandler = () => {
    // editTask(task.id)
    setIsEditingTask(state => !state)
  }
  const changeTask = event => {
    setTaskText(event.target.value)
  }
  const submitHandler = () => {
    if (taskText.trim()) {
      editTask(task.id, taskText)
      editTaskHandler()
    }
  }
  const [isEditingTask, setIsEditingTask] = useState(false)
  const [taskText, setTaskText] = useState(task.text)
  return (
    <Draggable
      draggableId={task.id}
      index={index}
      isDragDisabled={isEditingTask}>
      {provided =>
        isEditingTask ? (
          <>
            <input
              className='column__task'
              onChange={changeTask}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              ref={provided.innerRef}
              value={taskText}
            />
            <div className='add-card__actions'>
              <button className='add-card-btn' onClick={submitHandler}>
                Change Text
              </button>
              <button className='close' onClick={editTaskHandler}>
                Close
              </button>
            </div>
          </>
        ) : (
          <div
            className='column__task'
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}>
            {task.text}
            <div className='pencil' onClick={editTaskHandler}>
              ✎
            </div>
            {provided.placeholder}
          </div>
        )
      }
    </Draggable>
  )
}
