import mongoose from "mongoose";

// const { ObjectId } = mongoose.Schema.Types; 
const Schema = mongoose.Schema; 

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        required: true
    },
    postedBy: {
        // type: ObjectId,
        type: Schema.Types.ObjectId,
        ref: "User"
    }
}, { timestamps: true});

export default mongoose.model("Post", postSchema);