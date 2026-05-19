import React, { useState, useEffect } from 'react'
import Create from './Create'
import { BsCircleFill, BsCheckCircleFill, BsFillTrashFill } from 'react-icons/bs'
import axios from 'axios'

function Home() {
  const [todos, setTodos] = useState([])

  const fetchTodos = () => {
    fetch('http://localhost:3000/todos')
      .then((res) => res.json())
      .then((data) => setTodos(data))
      .catch(console.error)
  }

  useEffect(() => {
    fetchTodos()
  }, [])
const handleEdit = (id) => {
  axios.put(`http://localhost:3000/update/${id}`)
    .then((res) => {
      console.log(res.data)
      fetchTodos()      // refresh the list from the server
    })
    .catch(console.error)
}

const handleDelete = (id) => {
  axios.delete(`http://localhost:3000/delete/${id}`)
    .then(() => fetchTodos())
    .catch(console.error)
}

return (
  <div className="card">
    <h2>To-Do List</h2>
    <Create onTodoAdded={fetchTodos} />
    {todos.length === 0 ? (
      <div style={{ textAlign: 'center', color: '#888' }}>No Record</div>
    ) : (
      todos.map((todo) => (
        <div key={todo._id} className="task">
          <div className="checkbox" onClick={() => handleEdit(todo._id)}>
            {todo.done
              ? <BsCheckCircleFill className="icon" style={{ color: '#4caf50' }} />
              : <BsCircleFill className="icon" />}
            <p className={todo.done ? "line_through" : ""}>{todo.task}</p>
          </div>
          <span onClick={() => handleDelete(todo._id)}>
            <BsFillTrashFill className="icon" />
          </span>
        </div>
      ))
    )}
  </div>
)
}

export default Home
