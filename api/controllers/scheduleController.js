const {
    getSchedule,
} = require("../services/geminiPrompt.service.js");
const { Schedule } = require("../models/schedule.model.js");
const { ScheduleTask } = require("../models/scheduleTask.model.js");
const { insertScheduleFromGemini, insertScheduleTask } = require("../services/schedule.service.js");
const { insertTodoFromSchedule, insertdefaultTodoTask } = require("../services/todo.service.js");
const { User } = require("../models/user.model.js")

// Array of weekdays
weekday = ["0", "1", "2", "3", "4"];

// Get schedule controller
const getScheduleController = async (req, res) => {
    try {
        if(!req.body){
            res.status(400).send({
                message: 'Content can not be empty!'
            });
        }
    
        const user = new User({
            id: req.body.id,
            age: req.body.age,
            email: req.body.email,
            gender: req.body.gender,
            name : req.body.name,
            weight : req.body.weight,
            height : req.body.height,
            goal_calories : req.body.goal_calories,
            area_of_living : req.body.area_of_living,
            health_history : req.body.health_history,
            no_of_family_member : req.body.no_of_family_member,
            occupation_time : req.body.occupation_time,
            occupation_type : req.body.occupation_type
        });
        
        const schedule = await getSchedule(user);
        // Extract schedule
        jsonOutput = extractSchedule(schedule);
        // loop through the schedule and insert into the database
        for (let i = 0; i < jsonOutput.schedule.length; i++) {
            // Insert schedule
            insertScheduleFromGemini(jsonOutput.schedule[i], user.id, (err, data) => {
                if (err) {
                    return res.status(500).json({
                        message: err.message,
                    });
                }
                console.log(data);
            });
            // Insert todo
            insertTodoFromSchedule(jsonOutput.schedule[i], user.id, (err, data) => {
                if (err) {
                    return res.status(500).json({
                        message: err.message,
                    });
                }
                console.log(data);
            });
        }
        // loop through the weekdays and insert into the database daily tasks
        for (let i = 0; i < weekday.length; i++) {
            for (let j = 0; j < jsonOutput.weekdayTasks.length; j++) {
                // Insert schedule task for each weekday
                insertScheduleTask(jsonOutput.weekdayTasks[j], user.id, weekday[i], (err, data) => {
                    if (err) {
                        return res.status(500).json({
                            message: err.message,
                        });
                    }
                    console.log(data);
                });
                // Insert default todo task for each weekday
                insertdefaultTodoTask(jsonOutput.weekdayTasks[j], user.id, weekday[i], (err, data) => {
                    if (err) {
                        return res.status(500).json({
                            message: err.message,
                        });
                    }
                    console.log(data);
                }
                );
            }
        }
        for (let i = 0; i < jsonOutput.weekendSchedules.Saturday.length; i++) {
            // Insert schedule task for Saturday
            insertScheduleTask(jsonOutput.weekendSchedules.Saturday[i], user.id, "5", (err, data) => {
                if (err) {
                    return res.status(500).json({
                        message: err.message,
                    });
                }
                console.log(data);
            });
            // Insert default todo task for Saturday
            insertdefaultTodoTask(jsonOutput.weekendSchedules.Saturday[i], user.id, "5", (err, data) => {
                if (err) {
                    return res.status(500).json({
                        message: err.message,
                    });
                }
                console.log(data);
            }
            );
        }
        for (let i = 0; i < jsonOutput.weekendSchedules.Sunday.length; i++) {
            // Insert schedule task for Sunday
            insertScheduleTask(jsonOutput.weekendSchedules.Sunday[i], user.id, "6", (err, data) => {
                if (err) {
                    return res.status(500).json({
                        message: err.message,
                    });
                }
                console.log(data);
            });
            // Insert default todo task for Sunday
            insertdefaultTodoTask(jsonOutput.weekendSchedules.Sunday[i], user.id, "6", (err, data) => {
                if (err) {
                    return res.status(500).json({
                        message: err.message,
                    });
                }
                console.log(data);
            }
            );
        }
        
        return res.status(200).json({
            "response": jsonOutput
            //"response" :"Schedule created successfully",
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
}

function extractSchedule(originalSchedule) {
    // Safely extract weekday schedule
    const weekdayTasks = originalSchedule.schedule_template 
        ? originalSchedule.schedule_template.map(task => 
            new ScheduleTask({
                id: null,
                scheduleId: null,
                title: task.title,
                type: task.type,
                startTime: task.startTime,
                endTime: task.endTime,
                day: "weeekday"
            })
        )
        : [];

    // Safely extract weekend schedules
    const weekendSchedules = originalSchedule.weekend_schedule
        ? originalSchedule.weekend_schedule.map(weekend => 
            weekend.schedule.map(task => 
                new ScheduleTask({
                    id: null,
                    scheduleId: null,
                    title: task.title,
                    type: task.type,
                    startTime: task.startTime,
                    endTime: task.endTime,
                    day: weekend.day
                })
            )
        )
        : [];

    //Create schedules for seven days
    const sevenDaySchedules = [
        new Schedule({ id: null, userId: null, day: '0' }),
        new Schedule({ id: null, userId: null, day: '1' }),
        new Schedule({ id: null, userId: null, day: '2' }),
        new Schedule({ id: null, userId: null, day: '3' }),
        new Schedule({ id: null, userId: null, day: '4' }),
        new Schedule({ id: null, userId: null, day: '5' }),
        new Schedule({ id: null, userId: null, day: '6' })
    ];

    return {
        calories: {
            burnt: originalSchedule.daily_calories_burnt || null,
            intake: originalSchedule.daily_calories_intake || null
        },
        weekdayTasks: weekdayTasks,
        weekendSchedules: {
            Saturday: weekendSchedules[0],
            Sunday: weekendSchedules[1]
        },
        schedule: sevenDaySchedules
    };
}



module.exports = {
    getScheduleController,
};