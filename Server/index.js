const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const TodoModel = require('./Models/Todo')

const app = express()
app.use(cors())
app.use(express.json())

mongoose
  .connect('mongodb://127.0.0.1:27017/test')
  .then(() => console.log('MongoDB connected'))
  .catch((err) => {
    console.error('MongoDB connection error:', err.message)
    process.exit(1)
  })

app.get('/get', async (req, res) => {
  try {
    const todos = await TodoModel.find()
    res.json(todos)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

app.post('/add', async (req, res) => {
  try {
    const { task } = req.body
    if (!task) return res.status(400).json({ error: 'task is required' })

    const newTodo = await TodoModel.create({ task })
    res.status(201).json(newTodo)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

app.listen(3001, () => {
  console.log('Server is running on http://localhost:3001')
})
