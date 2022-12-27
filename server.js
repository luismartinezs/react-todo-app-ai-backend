const express = require('express');
const cors = require('cors');
const uuid = require('uuid').v4;
const app = express();
const port = 3000;

app.use(cors());

let todos = [
  {
    id: uuid(),
    text: 'Learn Node.js',
    completed: false,
  },
  {
    id: uuid(),
    text: 'Learn Express',
    completed: false,
  },
  {
    id: uuid(),
    text: 'Learn MongoDB',
    completed: false,
  },
];

app.use(express.json());

app.get('/api/todos', (req, res) => {
  res.send(todos);
});

app.post('/api/todos', (req, res) => {
  const newTodo = {
    id: uuid(),
    text: req.body.text,
    completed: false,
  };
  todos.push(newTodo);
  res.send(newTodo);
});

app.put('/api/todos/:id', (req, res) => {
  const id = req.params.id;
  const todo = todos.find((t) => t.id === id);
  if (!todo) return res.status(404).send('Todo not found');
  todo.text = req.body.text;
  todo.completed = req.body.completed;
  res.send(todo);
});


app.delete('/api/todos/:id', (req, res) => {
  const id = req.params.id;
  const todo = todos.find((t) => t.id === id);
  if (!todo) return res.status(404).send('Todo not found');
  const index = todos.indexOf(todo);
  todos.splice(index, 1);
  res.send(todo);
});

app.listen(port, () => {
  console.log(`Todo app listening at http://localhost:${port}`);
});

