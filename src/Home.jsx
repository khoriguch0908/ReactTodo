import React, { useState, useEffect } from 'react'
import Create from './Create'

function Home() {
  const [todos, setTodos] = useState([])

  const fetchTodos = () => {
    fetch('http://localhost:3001/get')
      .then((res) => res.json())
      .then((data) => setTodos(data))
      .catch(console.error)
  }

  useEffect(() => {
    fetchTodos()
  }, [])

  return (
    <div>
      <h2>Todo List</h2>
      <Create onTodoAdded={fetchTodos} />
      {todos.length === 0 ? (
        <div>No Record</div>
      ) : (
        todos.map((todo) => (
          <div key={todo._id}>{todo.task}</div>
        ))
      )}
    </div>
  )
}

export default Home
