const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    linkedFile: {
        data: Buffer,
        contentType: String,
    },
    status: {
        type: String,
        enum: ["TODO", "DONE"],
        default: "TODO"
    },
    deadline: {
        type: Date,
        required: true,
    }
},
    {timestamps:true}
)

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;