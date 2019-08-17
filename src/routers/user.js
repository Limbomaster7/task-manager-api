const express = require("express")
const router = new express.Router()
const User = require("../models/user")
const auth = require("../middleware/auth")

router.post("/users", async(req,res) => {

    const user = new User(req.body)

    

    try {
    
        await user.save()

        const token = await user.generateAuthToken()


        res.status(201).send({ user, token})
    
    } catch(error) {
    
        res.status(400).send(error.message)
    
    }
    
  
})

router.post("/users/login", async(req,res) => {


    
    try {
    
        const user = await User.findByCredentials(req.body.email, req.body.password)

        const token = await user.generateAuthToken()
        
        res.send({ user, token})
        
    
    } catch(error) {
    
        res.status(400).send()    
    
    }
})

router.get("/users/me", auth, async(req,res) => {


    res.send(req.user)
    
    // try {
    
    //     const users = await User.find()
    //     res.send(users)
    
    // } catch(error) {
    
    //     res.status(500).send(error)
    
    // }
    

})

router.get("/users/:id", async(req,res) => {

    try {
    
        const user = await User.findById(req.params.id)

        if (!user) {

            res.status(404).send("User not found by that id")
        }


        res.send(user)
    
    } catch(error) {
    
        res.status(500).send(error)
    
    }
    

    
})

router.patch("/users/:id", async(req,res) => {

    const updates = Object.keys(req.body)
    const allowedUpdates = ["name", "email", "password", "age"]
    const isValidOperation = updates.every(x=> {
        return allowedUpdates.includes(x)
    })

    if (!isValidOperation) {

        return res.status(400).send("Update error")
    }

    
    
    try {
    
        const user = await User.findById(req.params.id)

        updates.forEach( x=>{
            user[x] = req.body[x]
        })
        
        await user.save()


        
        // const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })


        if (!user) {

            return res.status(404).send("User not found")

        }

        res.status(202).send(user)

    } catch(error) {
    
        res.status(400).send("Failed: " + error)
    
    }
})

router.delete("/users/:id", async(req,res) => {

    try {
    
        const user = await User.findByIdAndDelete(req.params.id)

        if (!user) {

            return res.status(404).send("No user found")
        }

        res.send("Delete success")
    
    } catch(error) {
    
        res.status(400).send("No good: " + error)
        
    
    }
})

module.exports = router
