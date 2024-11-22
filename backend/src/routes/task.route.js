const express = require('express');
const {taskController} = require('../controllers');
const upload = require('../config/multerConfig')

const router = express.Router()

router.get('/', taskController.getTasks);

router.post('/', upload.single('pdf'), taskController.createTask);

router.patch('/:taskId',  taskController.editTask);

router.delete('/:taskId', taskController.deleteTask);

module.exports = router