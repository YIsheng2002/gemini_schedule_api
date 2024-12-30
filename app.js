const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const scheduleRoutes = require('./api/routes/schedule.route');
const todoRoutes = require('./api/routes/todo.route');
const userRoutes = require('./api/routes/user.route');

const app = express();

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
        return res.status(200).json({});
    }
    next();
})

// routes
app.use('/api/v1', scheduleRoutes);
app.use('/api/v1', todoRoutes);
app.use('/api/v1', userRoutes);

// error handling for routes not found
app.use((req,res,next)=>{
    const error = new Error('Not found');
    error.status=404;
    next(error);
})

// error handling for other errors
app.use((err,req,res,next)=>{
    res.status(err.status || 500);
    res.json({
        error:{
            message: err.message
        }
    });
});

module.exports = app;