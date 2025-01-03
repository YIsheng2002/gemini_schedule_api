const express = require('express');
const router = express.Router();

const todo = require('../controllers/todo.controller');

// Fetch todos
router.get('/todos/:user_id/:date', todo.fetchTodos);

//router.put('/todos/:task_id', todo.editTodoTask);
router.put('/todos/:task_id/:date', todo.editTodoTask);

module.exports = router;