
const mongoose = require("mongoose")



const taskSchema = new mongoose.Schema( {
    completed: {
        type: Boolean,
        default: false
    },
    description: {
        type: String,
        trim: true,
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    }
}, {
    timestamps: true
})


// taskSchema.pre("save", function(next) {

//     console.log(this)
    
//     next()
    
// })


const Task = mongoose.model("Task", taskSchema)


module.exports = Task