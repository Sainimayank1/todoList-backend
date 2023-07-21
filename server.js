import express from "express"
import { db, Todo } from './db.js'
import cors from "cors"
const app = express();

app.use(express.json())
app.use(cors());
db();

app.get("/", async (req, res) => {
    const name = req.query.name;
    try {
        const data = await Todo.find({ name });
        if (data)
            res.status(200).json({ data: data });
    } catch (error) {
        res.status(400).json(error)
    }
})

app.post("/", async (req, res) => {
    const { name, title, isDone } = req.body;
    try {
        const data = await Todo.create({ name, title, isDone })
        if (data)
            res.status(200).json({
                msg: "Succesfully submit"
            })
    } catch (error) {
        res.status(400).json(error)
    }
})

app.delete("/", async (req, res) => {
    const { _id } = req.body;
    try {
        const data = await Todo.deleteOne({ _id})
        if (data)
            res.status(200).json({
                msg: "Succesfully Deleted"
            })
    } catch (error) {
        res.status(400).json(error)
    }
})

app.post("/markTodo", async (req, res) => {
    const { _id, isDone } = req.body;
    const done = !isDone;

    try {
        const data = await Todo.updateOne({ _id }, { isDone : done })
        if (data)
            res.status(200).json({
                msg: "Succesfully Updated"
            })
    } catch (error) {
        res.status(400).json(error)
    }
})

app.listen(8000, () => {
    console.log("App listining on port 8000")
})