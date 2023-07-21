import { timeStamp } from "console";
import mongoose from "mongoose";

function db() {
    mongoose.connect("mongodb+srv://mayanksaini4455:EMbdBrwWyT8UmDsg@cluster0.ejze86a.mongodb.net/?retryWrites=true&w=majority").then(() => {
        console.log("Connected to database")
    })
}

const TodoSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    title: {
        type: String,
        required: true,
    },
    isDone:{
        type:Boolean,
        default:false,
    }
},{timestamps: true});

const Todo = mongoose.model("Todo", TodoSchema);


export { db, Todo }