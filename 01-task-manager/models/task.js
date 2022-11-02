const mongoose = require("mongoose")

const TaskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "must provide a name"],
        trim: true, //trim is for not saving spaces before or after the name
        maxlength: [20, "name cannot be more than 20 characters"],
    },
    completed: {
        type: Boolean,
        default: false /*By default the task wont be done until the user says it*/,
    },
})

module.exports = mongoose.model("Task", TaskSchema)
