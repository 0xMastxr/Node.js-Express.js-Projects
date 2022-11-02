const express = require("express")
const router = express()
const {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask,
} = require("../controllers/tasks")

router.route("/").get(getAllTasks).post(createTask)
router.route("/:id").get(getTask).patch(updateTask).delete(deleteTask)
//We use patch instead of put
//Put is to REPLACE the whole item (if we don't pass "completed", it won't appear anymore as a property)
//Patch just update the properties of the body we pass

module.exports = router
