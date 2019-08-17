const express = require("express")
const app = express()
const port = process.env.PORT || 3000
require("./db/mongoose")
const userRouter = require("./routers/user")
const taskRouter = require("./routers/task")
const jwt = require("jsonwebtoken")



// app.use((req,res,next) => {

//     if (req.method === "GET") {
//         console.log("hi")
//         res.status(400).send("You don't Get Get")
//     } else {
//         next()
//     }
// })


// app.use((req,res,next)=>{

//     console.log("Site under maintenance!")
    
//     res.status(503).send("Site under maintenance!")
// })


app.use(express.json())
app.use(userRouter)
app.use(taskRouter)








app.listen(port, ()=>{
    console.log("Server is up on port " + port)
})


const myfunction = async() => {

    const token =  jwt.sign({ _id: "abc123" }, "seaisvastandthereismuchtoeat", { expiresIn: "7 days"})
     console.log(token)
    
    const data = jwt.verify(token, "seaisvastandthereismuchtoeat")
    console.log(data)
}



myfunction()