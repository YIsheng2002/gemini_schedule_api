const { get } = require('http');
const connection = require('../models/db');

function getDailyPerformance(userId, date){
    return new Promise((resolve, reject) => {
        let query = `
            SELECT * FROM daily_performance 
            WHERE user_id = ?
            AND date = DATE_FORMAT(?, '%Y-%m-%d');
        `;
        
        connection.query(query, [userId, date], (err, res) => {
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