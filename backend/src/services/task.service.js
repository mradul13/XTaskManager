const {Task} = require('../models');
const ApiError = require('../utils/ApiError');
const httpStatus = require('http-status');

/** 
 * @async
 * @function getTasks
 * @returns {Promise<Task[]>}
 * @throws {ApiError}
**/
const getTasks = async ()=>{
    try{
        const tasks = Task.find({});
        if(!tasks){
            throw new ApiError(404, "No Tasks found");
        }
        return tasks;
    }
    catch(error){
        if(error instanceof ApiError){
            throw error;
        }
        else{
            throw new ApiError(500, "Falied to retrieve tasks")
        }
    }
}


/**
 * @async
 * @function createTask
 * @params {Object}
 * @returns {Object}
 * @throws {ApiError}
**/
const createTask = async (data)=>{
    try{
        const newTask = await Task.create(data);
        return newTask;
    }
    catch(error){
        throw new ApiError(500, "Failed to create task")
    }
}

/**
 * @async
 * @function editTask
 * @params {String}
 * @params {Object}
 * @returns {Object}
 * @throws {ApiError}
**/
const editTask = async (taskId, data)=>{
    try{
        const task = await Task.findById(taskId);
        if(!task){
            throw new ApiError(400, "Task does not exist");
        }
        const updatedTask = await Task.findByIdAndUpdate(taskId, data, {
            new: true,
        });
        return updatedTask;
    }
    catch(error){
        if(error instanceof ApiError){
            throw error;
        }
        else{
            throw new ApiError(500, "Failed to update task")
        }
    }
}

const deleteTask = async (taskId)=>{
    try{
        await Task.findByIdAndDelete(taskId);
    }
    catch(error){
        throw new ApiError(500, "Failed to delete task")
    }
}

module.exports = {
    getTasks, 
    createTask, 
    editTask, 
    deleteTask
}