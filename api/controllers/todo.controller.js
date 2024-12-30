const Todo = require('../models/todo.model.js');
const TodoTask = require('../models/todoTask.model.js');
const { getTodo, getTodoTask, insertTodo, insertTodoTask, checkTodoIsDefault} = require('../services/todo.service');

// fetch todos for a user on a specific date
exports.fetchTodos = async (req, res) => {
    user_id = req.params.user_id;
    console.log(user_id);
    date = req.params.date;
    console.log(date);
    if (!user_id || !date) {
        return res.status(400).json({
            message: "Invalid request"
        });
    }
    try {
        const todo = await getTodo(user_id, date);
        if (!todo) {
            return res.status(404).json({
                message: "Todo not found"
            });
        }
        const todoTasks = await getTodoTask(todo.id);
        return res.status(200).json({
            message: "Successfully fetched todos",
            todo: todo,
            todoTasks: todoTasks
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}

//create a todo task // havent test
exports.createTodoTask = async (req, res) => {
    try {
        const newTodoTask = req.body;
        const todoTask = await insertTodoTask(newTodoTask);
        return res.status(200).json({
            message: "Successfully created todo task",
            todoTask: todoTask
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}

//check is todo is default or not
exports.createTodoFromDefault = async (req, res) => {
    try {
        const taskId = req.params.task_id;
        const inputDate = req.params.date;
        const output = await checkTodoIsDefault(taskId);
        if (!output) {
            return res.status(404).json({
                message: "Todo not found"
            });
        }
        if (output.date == null) {
            const newTodoId = await insertTodo(inputDate, output.user_id);
            const todoTask = await insertTodoTask(newTodoId.id, inputDate, output.user_id);
            return res.status(200).json({
                message: "Successfully created todo task",
                todoTask: todoTask
            });
        } 
    }
    catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}
            

//update a todo task // havent test
const editTodoTask = async (req, res) => {
    try {
        const updatedTodoTask = req.body;
        const todoTask = await updateTodoTask(updatedTodoTask);
        return res.status(200).json({
            message: "Successfully updated todo task",
            todoTask: todoTask
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}

//delete a todo task //havent test
exports.deleteTodoTask = async (req, res) => {
    try {
        const todoTaskId = req.params.id;
        const todoTask = await removeTodoTask(todoTaskId);
        return res.status(200).json({
            message: "Successfully deleted todo task",
            todoTask: todoTask
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}
