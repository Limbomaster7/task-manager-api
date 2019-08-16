const express = require("express")
const router = new express.Router()
const Task = require("../models/task")


router.post("/tasks", async(req,res) => {

    const task = new Task(req.body)

    try {
    
        await task.save()
        res.status(201).send("success")
    
    } catch(error) {
    
        res.status(400).send("Failed"+ error)
    
    }

    

    
})


router.get("/tasks", async(req,res) => {

    try {
    
        const tasks = await Task.find()
        res.send(tasks)
    
    } catch(error) {
    
        res.status(500).send(error)
    
    }
})


router.get("/tasks/:id", async(req,res) => {

    try {
        
        const task = await Task.findById(req.params.id)

        if (!task) {
            res.status(404).send("No task found by that id")
        }
        res.send(task)
    
    } catch(error) {
    
        res.status(500).send(error)
    
    }
})


router.patch("/tasks/:id", async(req,res) => {

    const updates = Object.keys(req.body)

    const allowedUpdates = ["completed", "description"]

    const isValidUpdate = updates.every( x=> {
        return allowedUpdates.includes(x)
    })

    if(!isValidUpdate) {

        return res.status(400).send("Update not possible")
    }

    try {
        
        const task = await Task.findByIdAndUpdate(req.params.id, req.body,{
            new: true,
            runValidators: true
        })


        if (!task) {

            return res.status(404).send("Task not found")
        }

        res.status(202).send("Update Success")
    
    
    } catch(error) {
    
    
        res.status(400).send("Failed: "+error)
    
    }
})


router.delete("/tasks/:id", async(req,res) => {

    try {
    
        const task = await Task.findByIdAndDelete(req.params.id)

        if (!task) {

            return res.status(404).send("No task found")
        }

        res.send("Delete success")
    
    } catch(error) {
    
        res.status(400).send("No good: " + error)
        
    
    }
})





module.exports = router

