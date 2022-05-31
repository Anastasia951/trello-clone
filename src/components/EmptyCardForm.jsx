import React, { useState, useRef, useEffect } from 'react'

export default function EmptyCardForm({ sendList, closeEditor }) {
  const [title, setTitle] = useState('')
  const inputRef = useRef()
  useEffect(() => {
    inputRef.current.focus()
  })
  function changeTitle(event) {
    setTitle(event.target.value)
  }
  function createList() {
    if (title.trim()) {
      sendList(title)
      setTitle('')
    }
  }
  function onEnterPress(event) {
    if (event.key === 'Enter') createList()
  }
  return (
    <div className='empty-card'>
      <input
        ref={inputRef}
        onChange={changeTitle}
        onKeyDown={onEnterPress}
        type='text'
        value={title}
        placeholder='Type your text here...'
      />
      <div className='empty-card__actions'>
        <button className='create-empty-list' onClick={createList}>
          Add List
        </button>
        <button className='close' onClick={closeEditor}>
          Close
        </button>
      </div>
    </div>
  )
}
