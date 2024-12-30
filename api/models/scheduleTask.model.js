const sql = require("./db.js");

//constructor
const ScheduleTask = function(scheduleTask){
    this.id = scheduleTask.id ?? null;
    this.scheduleId = scheduleTask.scheduleId ?? null;
    this.title = scheduleTask.title;
    this.type = scheduleTask.type;
    this.startTime = scheduleTask.startTime;
    this.endTime = scheduleTask.endTime;
    this.day = scheduleTask.day;
}

module.exports = {ScheduleTask};