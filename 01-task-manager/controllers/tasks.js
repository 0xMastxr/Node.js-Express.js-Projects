const Task = require("../models/task")
const asyncWrapper = require("../middleware/async")
const { createCustomError } = require("../errors/custom-error")

const getAllTasks = asyncWrapper(async (req, res) => {
    const tasks = await Task.find({})
    res.status(200).json({
        tasks,
    })
})

const createTask = asyncWrapper(async (req, res) => {
    const task = await Task.create(req.body)
    res.status(201).json({ task })
})

const getTask = asyncWrapper(async (req, res) => {
    const { id: taskId } = req.params
    const task = await Task.findOne({ _id: taskId })
    if (!task) {
        return next(createCustomError(`No task with ID: ${taskId}`, 404))
    }
    res.status(200).json({ task })
})

const deleteTask = asyncWrapper(async (req, res) => {
    const task = await Task.findOneAndDelete({ _id: req.params.id })
    if (!task) {
        return next(createCustomError(`No task with ID: ${taskId}`, 404))
    }
    res.status(200).json({ task })
})

const updateTask = asyncWrapper(async (req, res) => {
    const task = await Task.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true, runValidators: true }
        //This way the user won't be able to send a null name (we run the validator of the MODEL)
    )
    if (!task) {
        return next(createCustomError(`No task with ID: ${taskId}`, 404))
    }
    res.status(200).json({ task })
})

module.exports = {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask,
}
