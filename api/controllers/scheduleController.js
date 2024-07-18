const {
    getSchedule,
} = require("../services/scheduleService");

const getScheduleController = async (req, res) => {
    try {
        const schedule = await getSchedule();
        return res.status(200).json({
            schedule,
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
}

module.exports = {
    getScheduleController,
};