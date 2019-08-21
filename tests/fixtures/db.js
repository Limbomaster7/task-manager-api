const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")
const User = require("../../src/models/user")
const Task = require("../../src/models/task")
const userOneId = new mongoose.Types.ObjectId()
const userOne = {
    _id: userOneId,
    name: "Jabon",
    email: "Jabon@example.com",
    password: "90909090",
    tokens: [{
        token: jwt.sign({_id: userOneId }, process.env.JWT_SECRET)
    }]
}
const userTwoId = new mongoose.Types.ObjectId()
const userTwo = {
    _id: userTwoId,
    name: "Dodoria",
    email: "Dodoria@example.com",
    password: "90909090",
    tokens: [{
        token: jwt.sign({_id: userTwoId }, process.env.JWT_SECRET)
    }]
}

const taskOne = {
    _id: new mongoose.Types.ObjectId(),
    description: "first task",
    completed: false,
    owner: userOneId
}
const taskTwo = {
    _id: new mongoose.Types.ObjectId(),
    description: "Second task",
    completed: true,
    owner: userOneId
}
const taskThree = {
    _id: new mongoose.Types.ObjectId(),
    description: "Third task",
    completed: true,
    owner: userTwoId
}

const setupDatabase = async() => {

    await User.deleteMany()
    await Task.deleteMany()
    const user = new User(userOne)
    await user.save()
    const user2 = new User(userTwo)
    await user2.save()
    await new Task(taskOne).save()
    await new Task(taskTwo).save()
    await new Task(taskThree).save()
}

module.exports = {
    setupDatabase,
    userOneId,
    userOne,
    userTwoId,
    userTwo,
    taskOne,
    taskTwo,
    taskThree,
}