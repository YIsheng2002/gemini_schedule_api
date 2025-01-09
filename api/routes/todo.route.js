const express = require('express');
const router = express.Router();

const todo = require('../controllers/todo.controller');

// Fetch todos
router.get('/todos/:user_id/:date', todo.fetchTodos);

router.post('/todos/:user_id/:date', todo.createTodoTask);
router.put('/todos/:user_id/:date', todo.editTodoTask);
router.delete('/todos/:user_id/:task_id/:date', todo.deleteTodoTask);

module.exports = router;