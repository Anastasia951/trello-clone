import React, { useState, useEffect, useRef } from 'react'
import Column from './Column'
import { Droppable } from 'react-beautiful-dnd'
import { useDispatch } from 'react-redux'

import AddList from './AddList'
import EmptyCardForm from './EmptyCardForm'

import { createNewList, addTask } from '../redux/actions/actions.js'
export default function Board({ lists }) {
  const dispatch = useDispatch()
  const [isEditingEmptyList, setIsEditingEmptyList] = useState(false)
  function createEmptyList() {
    setIsEditingEmptyList(true)
  }
  function sendList(title) {
    dispatch(createNewList(title))
    setIsEditingEmptyList(false)
  }
  function closeEditor() {
    setIsEditingEmptyList(false)
  }
  function addNewTask(text, parentId) {
    dispatch(addTask(text, parentId))
  }
  return (
    <div className='board-wrapper'>
      <Droppable droppableId='all-columns' direction='horizontal' type='column'>
        {provided => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className='board'>
            {lists.map((list, index) => (
              <Column
                key={list.id}
                list={list}
                index={index}
                addTask={addNewTask}
              />
            ))}
            {isEditingEmptyList ? (
              <EmptyCardForm sendList={sendList} closeEditor={closeEditor} />
            ) : (
              <AddList createEmptyList={createEmptyList} />
            )}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  )
}
