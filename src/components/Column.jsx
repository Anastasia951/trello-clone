import React, { useState } from 'react'
import { Draggable } from 'react-beautiful-dnd'
import { changeTitle } from '../redux/actions/actions'
import AddCard from './AddCard'
import TaskList from './TaskList'

export default function Column({ list, index, addTask, dispatch }) {
  const [isEditingTask, setIsEditingTask] = useState(false)
  const [isEditingTitle, setIsEditingTitle] = useState(false)
  const [newTitle, setNewTitle] = useState(list.title)
  function addNewTask() {
    setIsEditingTask(true)
  }
  function closeEditor() {
    setIsEditingTask(false)
  }
  function toggleTitle() {
    setIsEditingTitle(state => !state)
  }
  function setTitle(event) {
    setNewTitle(event.target.value)
  }
  function changeTitleHandler() {
    toggleTitle()
    if (newTitle.trim()) {
      dispatch(changeTitle(newTitle, list.id))
    }
  }
  return (
    <Draggable draggableId={list.id} index={index}>
      {provided => (
        <div
          className='column'
          {...provided.draggableProps}
          ref={provided.innerRef}>
          {isEditingTitle ? (
            <div {...provided.dragHandleProps} className='add-card'>
              <input type='text' value={newTitle} onChange={setTitle} />
              <div className='add-card__actions'>
                <button className='add-card-btn' onClick={changeTitleHandler}>
                  Change Title
                </button>
                <button className='close' onClick={toggleTitle}>
                  Close
                </button>
              </div>
            </div>
          ) : (
            <h3 className='column__title' {...provided.dragHandleProps}>
              <span>{list.title}</span>
              <div className='pencil' onClick={toggleTitle}>
                ✎
              </div>
            </h3>
          )}
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
