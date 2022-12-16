const express = require('express')
const router = express.Router()

const TaskController = require('../controller/tasks')

router.route('/').get(TaskController.gettAllTasks).post(TaskController.createTask)
router.route('/:id').get(TaskController.getTask).patch(TaskController.editTask).delete(TaskController.deleteTask)

module.exports = router