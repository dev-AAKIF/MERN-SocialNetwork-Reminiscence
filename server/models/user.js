import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        requireed: true   
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});
mongoose.model("User", userSchema)