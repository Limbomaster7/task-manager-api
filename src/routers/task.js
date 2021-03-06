const express = require("express")
const router = new express.Router()
const Task = require("../models/task")
const auth = require("../middleware/auth")

router.post("/tasks",auth,  async(req,res) => {

    // const task = new Task(req.body)

    const task = new Task({
        ...req.body,
        owner: req.user._id
    })

    try {
    
        await task.save()
        res.status(201).send(task)
    
    } catch(error) {
    
        res.status(400).send("Failed"+ error)
    
    }

    

    
})


router.get("/tasks", auth, async(req,res) => {

    const match = {}
    const sort = {}

    if (req.query.sortBy) {

        const parts = req.query.sortBy.split("_")
        sort[parts[0]] = parts[1] === "desc" ? -1 : 1
        
    }
    
    if (req.query.completed) {
        match.completed = req.query.completed === 'true'
    } 
    
    try {
    
        
        await req.user.populate({
            path: "tasks",
            match,
            options: {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort
            }
        }).execPopulate()
        
        res.send(req.user.tasks)

    
    } catch(error) {
    
        res.status(500).send(error)
    
    }
})


router.get("/tasks/:id",auth,  async(req,res) => {

    const _id = req.params.id

    try {
        


        const task = await Task.findOne({ _id, owner: req.user._id })

        if (!task) {
            res.status(404).send("No task found by that id")
        }
        res.send(task)
    
    } catch(error) {
    
        res.status(500).send(error)
    
    }
})


router.patch("/tasks/:id", auth, async(req,res) => {

    const updates = Object.keys(req.body)

    const allowedUpdates = ["completed", "description"]

    const isValidUpdate = updates.every( x=> {
        return allowedUpdates.includes(x)
    })

    if(!isValidUpdate) {

        return res.status(400).send("Update not possible")
    }

    try {
        
        const task = await Task.findOne({ _id: req.params.id, owner: req.user._id})


        if (!task) {

            return res.status(404).send("Task not found")
        }
        

        updates.forEach(x=> {
            task[x] = req.body[x]
        })
 
        await task.save()
        
      

        

        res.status(202).send("Update Success")
    
    
    } catch(error) {
    
    
        res.status(400).send("Failed: "+error)
    
    }
})


router.delete("/tasks/:id", auth, async(req,res) => {

    try {
    
        const task = await Task.findOne({ _id: req.params.id, owner: req.user._id})

     

        if (!task) {

            return res.status(404).send("No task found")
        }

        await task.remove()

        res.send("Delete success")
    
    } catch(error) {
    
        res.status(400).send("No good: " + error)
        
    
    }
})





module.exports = router

