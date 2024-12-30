const connection = require('../models/db');

insertScheduleFromGemini=(newSchedule, userId, result)=>{
    let query = `INSERT INTO schedule (user_id, day) VALUES ('${userId}', '${newSchedule.day}');`;
    connection.query(query, (err, res) => {
        if(err){
            console.log("error: ", err);
            result(err, null);
            return;
        }
        result(null, {id: res.insertId, ...newSchedule});
    });
}

insertScheduleTask=(newScheduleTask, userId, day, result)=>{
    let query = `
    INSERT INTO schedule_task (schedule_id, title, type, start_time, end_time)
    SELECT s.id, '${newScheduleTask.title}', '${newScheduleTask.type}', '${newScheduleTask.startTime}', '${newScheduleTask.endTime}'
    FROM schedule s
    WHERE s.user_id = '${userId}' AND s.day = '${day}'`;
    connection.query(query, (err, res) => {
        if(err){
            console.log("error: ", err);
            result(err, null);
            return;
        }
        result(null, {id: res.insertId, ...newScheduleTask});
    });
}

module.exports = {
    insertScheduleFromGemini,
    insertScheduleTask
};