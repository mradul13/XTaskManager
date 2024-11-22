const {taskService} = require('../services');
const catchAsync = require('../utils/catchAsync');
const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');

/**
* @async
* @function getTasks
* @param {Object} req - Express request object
* @param {Object} res - Express response object
* @returns {Promise<void>} Sends back a JSON response with status code 200 and list of tasks.
**/
const getTasks = catchAsync(async (req, res)=>{
    const tasks = await taskService.getTasks();
    res.status(200).send(tasks)
})

/**
* @async
* @function createTask
* @param {Object} req - Express request object
* @param {Object} res - Express response object
* @returns {Promise<void>} Sends back a JSON response with status code 201 and a copy of created task
**/
const createTask = catchAsync(async (req, res)=>{
    const {title, description, deadline} = req.body;

    const linkedFile = req.file?{data: req.file.buffer, contentType: req.file.mimetype}:null;

    const task = await taskService.createTask({title, description, deadline, linkedFile});
    res.status(201).send(task);
});


/**
* @async
* @function editTask
* @param {Object} req - Express request object
* @param {Object} res - Express response object
* @returns {Promise<void>} Sends back a JSON response with status code 200 and a copy of edited task.
**/
const editTask = catchAsync(async (req, res)=>{
    const taskId = req.params.taskId;

    const linkedFile = req.file?{data: req.file.buffer, contentType: req.file.mimetype}: null;

    const task = await taskService.editTask(taskId, req.body);
    res.status(200).send(task);
})

/**
* @async
* @function deleteTask
* @param {Object} req - Express request object
* @param {Object} res - Express response object
* @returns {Promise<void>} Sends back a response with status code 203.
**/
const deleteTask = catchAsync(async (req, res)=>{
    await taskService.deleteTask(req.params.taskId);
    res.status(203).send()
})

module.exports = {
    getTasks,
    createTask,
    editTask,
    deleteTask
}

