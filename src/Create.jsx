import React, { useState } from 'react'
import axios from 'axios'

function Create({ onTodoAdded }) {
  const [task, setTask] = useState('')

  const handleAdd = () => {
    if (!task.trim()) return

    axios
      .post('http://localhost:3000/add', { task })
      .then(() => {
        setTask('')
        onTodoAdded()
      })
      .catch((err) => console.log(err))
  }

  return (
    <div className="create_form">
      <input
        type="text"
        placeholder="Enter Task"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <button type="button" onClick={handleAdd}>
        Add
      </button>
    </div>
  )
}

export default Create
