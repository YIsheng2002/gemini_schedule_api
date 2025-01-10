const User = require('../models/user.model');
const { getUserById, addUserInformation } = require('../services/user.service')

// fetch user data
exports.fetchUser = async (req, res)=>{
    user_id = req.params.user_id;
    if (!user_id) {
        return res.status(400).json({
            message: "Invalid request"
        });
    }
    try {
        const user = await getUserById(user_id);
        return res.status(200).json({
            message: "Successfully fetched user",
            user: user
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}

// add user information
exports.addUserGenInformation = async (req, res)=>{
    try {
        
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}