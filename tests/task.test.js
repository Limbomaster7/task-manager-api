const request = require("supertest")
const app = require("../src/app")
const Task = require("../src/models/task")
const jwt = require("jsonwebtoken")
const User = require("../src/models/user")
const { userOneId, userOne, setupDatabase
        , userTwo, userTwoId, taskOne, taskTwo, taskThree } = require("./fixtures/db")


beforeEach(setupDatabase)



test("Should create task for user", async ()=>{

    const response = await request(app)
                            .post("/tasks")
                            .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
                            .send({
                                description: "Go get food"
                            })
                            .expect(201)

    const task = await Task.findById(response.body._id)

    expect(task).not.toBeNull()
    expect(task.completed).toBe(false)
})


test("Should fetch user tasks", async()=>{

    const response = await request(app)
                .get("/tasks")
                .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
                .send()
                .expect(200)

    expect(response.body.length).toEqual(2)
    
})


test("Should not delete other users tasks", async () => {

    const response = await request(app)
                            .delete("/tasks/${taskOne._id}")
                            .set("Authorization", `Bearer ${userTwo.tokens[0].token}`)
                            .send()
                            .expect(400)


    const task = await Task.findById(taskOne._id)
    expect(task).not.toBeNull()
    
})