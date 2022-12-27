const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());

let todos = [
  {
    id: 1,
    text: 'Learn Node.js',
    completed: false,
  },
  {
    id: 2,
    text: 'Learn Express',
    completed: false,
  },
  {
    id: 3,
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
    id: todos.length + 1,
    text: req.body.text,
    completed: false,
  };
  todos.push(newTodo);
  res.send(newTodo);
});

app.put('/api/todos/:id', (req, res) => {
  const todo = todos.find((t) => t.id === parseInt(req.params.id));
  if (!todo) return res.status(404).send('Todo not found');
  todo.text = req.body.text;
  res.send(todo);
});

app.delete('/api/todos/:id', (req, res) => {
  const todo = todos.find((t) => t.id === parseInt(req.params.id));
  if (!todo) return res.status(404).send('Todo not found');
  const index = todos.indexOf(todo);
  todos.splice(index, 1);
  res.send(todo);
});

app.listen(port, () => {
  console.log(`Todo app listening at http://localhost:${port}`);
});

