import React, { useState } from 'react'
import { Draggable } from 'react-beautiful-dnd'
import AddCard from './AddCard'
import TaskList from './TaskList'

export default function Column({ list, index, addTask }) {
  const [isEditingTask, setIsEditingTask] = useState(false)
  function addNewTask() {
    setIsEditingTask(true)
  }
  function closeEditor() {
    setIsEditingTask(false)
  }
  return (
    <Draggable draggableId={list.id} index={index}>
      {provided => (
        <div
          className='column'
          {...provided.draggableProps}
          ref={provided.innerRef}>
          <h3 className='column__title' {...provided.dragHandleProps}>
            {list.title}
          </h3>
          <TaskList tasks={list.tasks} listId={list.id} />
          {isEditingTask ? (
            <AddCard
              addTask={addTask}
              parentId={list.id}
              closeEditor={closeEditor}
            />
          ) : (
            <button className='column__add-card' onClick={addNewTask}>
              + Add a card
            </button>
          )}
        </div>
      )}
    </Draggable>
  )
}
