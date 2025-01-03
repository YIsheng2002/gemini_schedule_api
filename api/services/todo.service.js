const sql = require('../models/db');

// Get todo by user_id and date (will check if exist or not if not exist fetch default)
function getTodo(user_id, date){
    return new Promise((resolve, reject) => {
        let query = `
            SELECT * FROM todo 
            WHERE user_id = ?
            AND (
                CASE 
                    WHEN DATE_FORMAT(?, '%Y-%m-%d') IN (SELECT date FROM todo WHERE user_id = ?)
                    THEN date = DATE_FORMAT(?, '%Y-%m-%d')
                    ELSE day = WEEKDAY(?)
                END
            );
        `;
        
        sql.query(query, [user_id, date, user_id, date, date], (err, res) => {
            if(err){
                console.log("error: ", err);
                reject(err);
                return;
            }
                
            console.log("Query Result:", res);
            
            if(res.length){
                console.log("found todo: ", res[0]);
                resolve(res[0]);
                return;
            }
            
            resolve(null);
        });
    });
}

// Get todo task by todo_id
function getTodoTask(todoId){
    return new Promise((resolve, reject) => {
        let query = `SELECT * FROM todo_task WHERE todo_id = '${todoId}'`;
        sql.query(query, (err, res) => {
            if(err){
                console.log("error: ", err);
                reject(err);
                return;
            }
            if(res.length){
                resolve(res);
                return;
            }
            resolve(null);
        }
    );
})};

function insertTodoFromSchedule(newTodo, userId, result){
    let query = "INSERT INTO todo (user_id, day) VALUES (?, ?)";
    sql.query(query, [userId, newTodo.day], (err, res) => {
        if(err){
            console.log("error: ", err);
            result(err, null);
            return;
        }
        result(null, {id: res.insertId, ...newTodo});
    });
}

// Insert default todo task from schedule
function insertdefaultTodoTask(newTodoTask, userId, day, result){
    let query = `
    INSERT INTO todo_task (todo_id, title, type, start_time, end_time)
    SELECT t.id, '${newTodoTask.title}', '${newTodoTask.type}', '${newTodoTask.startTime}', '${newTodoTask.endTime}'
    FROM todo t
    WHERE t.user_id = '${userId}' AND t.day = '${day}'`;
    sql.query(query, [newTodoTask.title, newTodoTask.type, newTodoTask.startTime, newTodoTask.endTime, userId, day], (err, res) => {
        if(err){
            console.log("error: ", err);
            result(err, null);
            return;
        }
        result(null, {id: res.insertId, ...newTodoTask});
    });
}

// insert todo
function insertTodo(date, userId, result){

    return new Promise((resolve, reject) => {
        let query = `INSERT INTO todo (date, user_id) VALUES (?, ?)`;
        sql.query(query, [date, userId], (err, res) => {
            if(err){
                console.log("error: ", err);
                reject(err);
                return;
            }
            resolve({id: res.insertId});
        });
    }
)};



// check todo is default or not
function checkTodoIsDefault(todoTaskId){
    return new Promise((resolve, reject) => {
        let query = `SELECT t.date, t.user_id FROM todo t WHERE t.id IN ( SELECT tt.todo_id FROM todo_task tt WHERE tt.id = ? );`;
        sql.query(query, [todoTaskId], (err, res) => {
            if(err){
                console.log("error: ", err);
                reject(err);
                return;
            }
            if(res.length){
                resolve(res[0]);
                return;
            }
            resolve(null);
        });
    });
}

//create todo task from default todo
function insertTodoTask(newTodoId, inputDate, user_id, result){
    return new Promise((resolve, reject) => {
        let query = `INSERT INTO todo_task (todo_id, title, description, start_time, end_time, type, is_complete) 
        SELECT ?, tt.title, tt.description, tt.start_time, tt.end_time, tt.type, tt.is_complete 
        FROM todo_task tt JOIN todo t ON tt.todo_id = t.id 
        WHERE t.day = WEEKDAY(?) and t.date IS NULL AND t.user_id = ?;`;
        sql.query(query, [newTodoId, inputDate, user_id], (err, res) => {
            if(err){
                console.log("error: ", err);
                reject(err);
                return;
            }
            resolve({id: res.insertId});
        });
    });
}

function updateTodoTaskfromDefault(updatedTodoTask, date, result){
    return new Promise((resolve, reject) => {
        let query = `UPDATE todo_task tt
        JOIN todo t ON tt.todo_id = t.id
        SET 
            tt.title = ?,
            tt.description = ?,
            tt.start_time = ?,
            tt.end_time = ?
        WHERE tt.start_time = (SELECT start_time FROM todo_task WHERE id = ?)
        AND tt.end_time = (SELECT end_time FROM todo_task WHERE id = ?)
        AND t.date = ?;`;
        sql.query(query, [updatedTodoTask.title, updatedTodoTask.description, updatedTodoTask.startTime, updatedTodoTask.endTime, updatedTodoTask.id, updatedTodoTask.id, date], (err, res) => {
            if(err){
                console.log("error: ", err);
                reject(err, null);
                return;
            }
            resolve(null, {id: updatedTodoTask.id, ...updatedTodoTask});
        });
    });
}

function updateTodoTask(updatedTodoTask, date, result){
    return new Promise((resolve, reject) => {
        let query = `UPDATE todo_task tt
        JOIN todo t ON tt.todo_id = t.id
        SET 
            tt.title = ?,
            tt.description = ?,
            tt.start_time = ?,
            tt.end_time = ?
        WHERE tt.id = ?
        AND t.date = ?;`;
        sql.query(query, [updatedTodoTask.title, updatedTodoTask.description, updatedTodoTask.startTime, updatedTodoTask.endTime, updatedTodoTask.id, date], (err, res) => {
            if(err){
                console.log("error: ", err);
                reject(err, null);
                return;
            }
            resolve(null, {id: updatedTodoTask.id, ...updatedTodoTask});
        });
    });
}

module.exports = {
    insertTodoFromSchedule,
    insertdefaultTodoTask,
    getTodo,
    getTodoTask,
    insertTodo,
    insertTodoTask,
    checkTodoIsDefault,
    updateTodoTaskfromDefault,
    updateTodoTask
};