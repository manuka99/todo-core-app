const Todo = require('../models/Todo');

function notFound() {
  const err = new Error('Not found');
  err.statusCode = 404;
  return err;
}

async function getAllTodos(req, res) {
  const todos = await Todo.find().sort({ createdAt: -1 });
  res.json(todos);
}

async function createTodo(req, res) {
  const { title, description } = req.body;
  if (title === undefined || title === null || String(title).trim() === '') {
    return res.status(400).json({ message: 'Title is required' });
  }
  const todo = await new Todo({ title, description }).save();
  res.status(201).json(todo);
}

async function updateTodo(req, res) {
  const body = req.body && typeof req.body === 'object' ? req.body : {};
  const hasTitle = Object.prototype.hasOwnProperty.call(body, 'title');
  const hasDescription = Object.prototype.hasOwnProperty.call(
    body,
    'description'
  );
  if (!hasTitle && !hasDescription) {
    return res
      .status(400)
      .json({ message: 'Provide title and/or description' });
  }

  const { title, description } = body;
  const update = {};
  if (title !== undefined) update.title = title;
  if (description !== undefined) update.description = description;

  const todo = await Todo.findByIdAndUpdate(req.params.id, update, {
    new: true,
    runValidators: true,
  });
  if (!todo) throw notFound();
  res.json(todo);
}

async function toggleDone(req, res) {
  const todo = await Todo.findById(req.params.id);
  if (!todo) throw notFound();
  todo.done = !todo.done;
  await todo.save();
  res.json(todo);
}

async function deleteTodo(req, res) {
  const deleted = await Todo.findByIdAndDelete(req.params.id);
  if (!deleted) throw notFound();
  res.status(204).send();
}

module.exports = {
  getAllTodos,
  createTodo,
  updateTodo,
  toggleDone,
  deleteTodo,
};
