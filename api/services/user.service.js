const sql = require('../models/db')

// get user by user_id
function getUserById(user_id){
    return new Promise((resolve, reject)=>{
        let query = `SELECT * FROM user 
            WHERE id = ?;`;
        sql.query(query,[user_id],(err,res)=>{
            if (err){
                console.log("error: ", err);
                reject(err);
                return;
            }
            if(res.length){
                resolve(res[0]);
                return;
            }
            
            resolve(null);
        })
    })
}


function addUserInformation(user_id, area_of_living, health_history, no_of_family_member, occupation_time, occupation_type, goal_calories){
    return new Promise((resolve, reject)=>{
        let query = `INSERT INTO user (area_of_living, health_history, no_of_family_member, occupation_time, occupation_type, goal_calories)
        VALUES (?, ?, ?, ?, ?, ?);`;
        sql.query(query, [area_of_living, health_history, no_of_family_member, occupation_time, occupation_type, goal_calories], (err, res) => {
            if(err){
                console.log("error: ", err);
                reject(err);
                return;
            }
            resolve(null);
        });
    });
}

module.exports = {
    getUserById,
    addUserInformation
}