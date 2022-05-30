import React from 'react'

export default function AddList({ createEmptyList }) {
  return (
    <div className='add-list' onClick={createEmptyList}>
      + Add a List
    </div>
  )
}
