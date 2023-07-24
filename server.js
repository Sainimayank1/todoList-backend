// import { db, Todo } from './db.js'
import express from "express"
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs'
import cors from "cors"

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();

app.use(express.json())
app.use(cors());
app.use((req, res, next) => {
    console.log(req.url);
    next()
})

// FILE BASED

app.get("/", (req, res) => {
    res.status(200).sendFile(__dirname + "/public/index.html");
})

app.post("/", async (req, res) => {
    const { name, title, isDone } = req.body;
    const id = uuidv4();
    try {
        fs.readFile(__dirname + "/todoData.mp4", 'utf8', function (err, data) {
            if (err)
                res.status(400).json(err)
            if (data.length === 0) {
                data = "[]";
            }
            let todos = JSON.parse(data);
            todos.push({ "name": name, "title": title, "isDone": isDone, "id": id });
            fs.writeFile("./todoData.mp4", JSON.stringify(todos), function (error) {
                if (error)
                    res.status(400).json(err);
                else
                    res.status(200).json({
                        msg: "Succesfully submit"
                    })
            });

        });
    } catch (error) {
        console.log(error)
        res.status(400).json(error)
    }
})


app.get("/todos",(req,res)=>
{
    const { name } = req.query;
    try {
        fs.readFile(__dirname + "/todoData.mp4", 'utf8', function (err, data) {
            if (err)
                res.status(400).json(err)
            if (data.length === 0) {
                data = "[]";
            }
            let todos = JSON.parse(data);

            const newdata = todos.filter((val)=>
            {
                return val.name === name;
            })
            if(newdata)
                res.status(200).json({ data: newdata });
        });
    } catch (error) {
        console.log(error)
        res.status(400).json(error)
    }
})

app.delete("/", async (req, res) => {
    const { id } = req.body;
    try {
        fs.readFile(__dirname + "/todoData.mp4", 'utf8', function (err, data) {
            if (err)
                res.status(400).json(err)

            let todos = JSON.parse(data);

            const newdata = todos.filter((val)=>
            {
                return val.id !== id;
            })
            fs.writeFile("./todoData.mp4", JSON.stringify(newdata), function (error) {
                if (error)
                    res.status(400).json(err);
                else
                    res.status(200).json({
                        msg: "Succesfully Delete"
                    })
            });
        });
    } catch (error) {
        console.log(error)
        res.status(400).json(error)
    }
})

 app.post("/markTodo", async (req, res) => {
        const { id, isDone } = req.body;
        const done = !isDone;
    
        try {
            fs.readFile(__dirname + "/todoData.mp4", 'utf8', function (err, data) {
                if (err)
                    res.status(400).json(err)
    
                let todos = JSON.parse(data);
                const newdata = todos.map((val)=>
                {
                    if(val.id === id)
                        val.isDone = !val.isDone;
                    
                    return val;
                })

                fs.writeFile("./todoData.mp4", JSON.stringify(newdata), function (error) {
                    if (error)
                        res.status(400).json(err);
                    else
                        res.status(200).json({
                            msg: "Succesfully Update"
                        })
                });
            });
        } catch (error) {
            console.log(error)
            res.status(400).json(error)
        }
    })












// MONGODB BASED
// db();

// app.get("/", async (req, res) => {
//     const name = req.query.name;
//     try {
//         const data = await Todo.find({ name });
//         if (data)
//             res.status(200).json({ data: data });
//     } catch (error) {
//         res.status(400).json(error)
//     }
// })

// app.post("/", async (req, res) => {
//     const { name, title, isDone } = req.body;
//     try {
//         const data = await Todo.create({ name, title, isDone })
//         if (data)
//             res.status(200).json({
//                 msg: "Succesfully submit"
//             })
//     } catch (error) {
//         res.status(400).json(error)
//     }
// })

// app.delete("/", async (req, res) => {
//     const { _id } = req.body;
//     try {
//         const data = await Todo.deleteOne({ _id})
//         if (data)
//             res.status(200).json({
//                 msg: "Succesfully Deleted"
//             })
//     } catch (error) {
//         res.status(400).json(error)
//     }
// })

// app.post("/markTodo", async (req, res) => {
//     const { _id, isDone } = req.body;
//     const done = !isDone;

//     try {
//         const data = await Todo.updateOne({ _id }, { isDone : done })
//         if (data)
//             res.status(200).json({
//                 msg: "Succesfully Updated"
//             })
//     } catch (error) {
//         res.status(400).json(error)
//     }
// })

app.listen(8000, () => {
    console.log("App listining on port 8000")
})