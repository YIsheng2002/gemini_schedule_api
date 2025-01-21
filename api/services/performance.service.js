const { get } = require('http');
const connection = require('../models/db');

function getDailyPerformance(userId, date){
    return new Promise((resolve, reject) => {
        let query = `
            SELECT ? as date, 
            COUNT(CASE WHEN type != 'c' THEN 1 END) as total_tasks,
            COUNT(CASE WHEN type != 'c' AND is_complete = true THEN 1 END) as completed_tasks, 
            ? as user_id 
            FROM todo_task tt JOIN todo t ON t.id = tt.todo_id 
            WHERE user_id = ? AND date = ?;
        `;
        
        connection.query(query, [date, userId, date, date], (err, res) => {
            if(err){
                console.log("error: ", err);
                reject(err);
                return;
            }
                
            console.log("Query Result:", res);
            
            if(res.length){
                console.log("found performance: ", res[0]);
                resolve(res[0]);
                return;
            }
            
            resolve(null);
        });
    });
}

function getMonthlyPerformance(userId, month){
    return new Promise((resolve, reject) => {
        let query = `
            SELECT * FROM daily_performance 
            WHERE user_id = ?
            AND MONTH(date) = MONTH(?);
        `;
        
        connection.query(query, [userId, month], (err, res) => {
            if(err){
                console.log("error: ", err);
                reject(err);
                return;
            }
                
            console.log("Query Result:", res);
            
            if(res.length){
                console.log("found performance: ", res);
                resolve(res);
                return;
            }
            
            resolve(null);
        });
    });
}

module.exports = {
    getDailyPerformance,
    getMonthlyPerformance
};