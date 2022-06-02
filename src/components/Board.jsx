import React, { useState } from 'react'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import { useDispatch, useSelector } from 'react-redux'

import {
  swapColumns,
  updateTasks,
  updateTasksFromDifferentLists,
} from '../redux/actions/actions'

import Column from './Column'
import AddList from './AddList'
import EmptyCardForm from './EmptyCardForm'

import { createNewList, addTask } from '../redux/actions/actions.js'

export default function Board() {
  const dispatch = useDispatch()
  const lists = useSelector(state => state.lists)
  const [isEditingEmptyList, setIsEditingEmptyList] = useState(false)
  function toggleIsEditingTask() {
    setIsEditingEmptyList(state => !state)
  }
  function sendList(title) {
    dispatch(createNewList(title))
    toggleIsEditingTask()
  }
  function addNewTask(text, parentId) {
    dispatch(addTask(text, parentId))
  }
  const onDragEnd = result => {
    const { source, destination, type } = result
    if (!destination) return

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return

    if (type === 'task') {
      if (destination.droppableId === source.droppableId) {
        const list = lists.find(list => list.id === source.droppableId)
        const newTasks = list.tasks

        const draggableElem = newTasks[source.index]
        newTasks.splice(source.index, 1)
        newTasks.splice(destination.index, 0, draggableElem)
        dispatch(updateTasks(newTasks, list.id))
      } else {
        const startList = lists.find(list => list.id === source.droppableId)
        const endList = lists.find(list => list.id === destination.droppableId)

        endList.tasks.splice(
          destination.index,
          0,
          startList.tasks[source.index]
        )
        startList.tasks.splice(source.index, 1)
        dispatch(
          updateTasksFromDifferentLists({
            startTasks: startList.tasks,
            endTasks: endList.tasks,
            startId: startList.id,
            endId: endList.id,
          })
        )
      }
    }

    if (type === 'column') {
      const { destination, source } = result
      if (destination.index === source.index) return
      dispatch(swapColumns({ end: destination.index, start: source.index }))
    }
  }
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className='board-wrapper'>
        <Droppable
          droppableId='all-columns'
          direction='horizontal'
          type='column'>
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
                  dispatch={dispatch}
                />
              ))}
              {isEditingEmptyList ? (
                <EmptyCardForm
                  sendList={sendList}
                  closeEditor={toggleIsEditingTask}
                />
              ) : (
                <AddList createEmptyList={toggleIsEditingTask} />
              )}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </DragDropContext>
  )
}
