import React, { useState } from 'react'

export default function AddCard({ addTask, parentId, closeEditor }) {
  const [cardText, setCardText] = useState('')
  function changeCardText(event) {
    setCardText(event.target.value)
  }
  function onEnterPress(event) {
    if (event.key === 'Enter') addNewTask()
  }
  function addNewTask() {
    if (cardText.trim()) {
      addTask(cardText, parentId)
      setCardText('')
      closeEditor()
    }
  }
  return (
    <div className='add-card'>
      <input
        onChange={changeCardText}
        onKeyDown={onEnterPress}
        value={cardText}
        type='text'
        placeholder='Enter the text for this card'
      />
      <div className='add-card__actions'>
        <button className='add-card-btn' onClick={addNewTask}>
          Add card
        </button>
        <button className='close' onClick={closeEditor}>
          Close
        </button>
      </div>
    </div>
  )
}
