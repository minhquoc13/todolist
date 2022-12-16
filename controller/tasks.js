const Task = require('../models/Task')

class TaskController {

 gettAllTasks = async (req, res) => {
    const tasks = await Task.find({})
    res.status(200).json({tasks})
}

 getTask = async (req, res) => {
    const { id: taskId } = req.params
    const task = await Task.findOne({_id: taskId})

    if(!task) {
        const error = new Error('Task not found')
        error.status = 404
        return res.json(error)
    }
    res.status(200).json({task})
}

 createTask = async (req, res) => {
    const task = await Task.create(req.body)
    res.status(201).json({ task })
}

 editTask = async (req, res) => {
    const { id: taskId } = req.params
    const task = await Task.findOneAndUpdate({_id: taskId}, req.body, {
        new: true,
        runValidators: true
    })

    if(!task) {
        return res.status(404).json({msg: 'Task can not be edited'})
    }
    res.status(200).json({task})
} 

 deleteTask = async (req, res) => {
    const {id: taskId} = req.params
    const task = await Task.findByIdAndDelete({_id: taskId})

    if(!task) {
        return res.status(404).json({msg: 'No task with id ' + taskId })
    }

    res.status(200).json({task: null, status: 'success'})

 }

}

module.exports = new TaskController()