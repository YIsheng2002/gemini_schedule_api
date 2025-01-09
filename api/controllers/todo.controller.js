const Todo = require('../models/todo.model.js');
const TodoTask = require('../models/todoTask.model.js');
const { 
    getTodo, 
    getTodoTask, 
    addTodoTask,
    insertTodo, 
    insertTodoTask, 
    checkTodoIsDefault,  
    updateTodoTask, 
    removeTodoTask, 
} = require('../services/todo.service');

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

//create a todo task 
exports.createTodoTask = async (req, res) => {
    try{
        const userId = req.params.user_id;
        const inputDate = req.params.date;
        const newTodoTask = req.body;
        const output = await checkTodoIsDefault(userId, inputDate);
        if (!output) {
            const newTodoId = await insertTodo(inputDate, userId);
            const todoTask = await addTodoTask(newTodoId.id, newTodoTask);
            sleep(3000);
            return res.status(200).json({
                message: "Successfully created todo task",
                todoTask: todoTask
            });
        } 
        if (output.date != null) {
            const todoTask = await addTodoTask(output.id, newTodoTask);
            return res.status(200).json({
                message: "Successfully created todo task",
                todoTask: newTodoTask
            });
        }
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}

//check is todo is default or not
exports.editTodoTask = async (req, res) => {
    try {
        const userId = req.params.user_id;
        const inputDate = req.params.date;
        const updatedTodoTask = req.body;
        const output = await checkTodoIsDefault(userId, inputDate);
        console.log(output);
        if (!output) {
            const newTodoId = await insertTodo(inputDate, userId);
            const todoTask = await insertTodoTask(newTodoId.id, inputDate, userId);
            sleep(3000);
            console.log(updatedTodoTask);
            const newTodoTask = await updateTodoTask(updatedTodoTask, inputDate);
            return res.status(200).json({
                message: "Successfully update todo task",
                todoTask: todoTask,
                newTodoTask: newTodoTask
            });
        } 
        if (output.date != null) {
            const newtodoTask = await updateTodoTask(updatedTodoTask, inputDate);
            return res.status(200).json({
                message: "Successfully updated todo task",
                todoTask: newtodoTask
            });
        }
    }
    catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}       

//delete a todo task //havent test
exports.deleteTodoTask = async (req, res) => {
    try {
        const userId = req.params.user_id;
        const taskId = req.params.task_id;
        const inputDate = req.params.date;
        const output = await checkTodoIsDefault(userId, inputDate);
        console.log(output);
        if (!output) {
            const newTodoId = await insertTodo(inputDate, userId);
            const todoTask = await insertTodoTask(newTodoId.id, inputDate, userId);
            sleep(3000);
            removeTodoTask(taskId, inputDate);
            return res.status(200).json({
                message: "Todo Task deleted successfully."
            });
        } 
        if (output.date != null) {
            removeTodoTask(taskId, inputDate);
            return res.status(200).json({
                message: "Todo Task deleted successfully.",
            });
        }
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}

const sleep = (time) => (
    new Promise(resolve => setTimeout(resolve, time))
)
