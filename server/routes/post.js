import express from "express";
import mongoose from "mongoose";
import { requireLogin } from "../middleware/requireLogin.js";
import Post from "../models/post.js";

const postRouter = express.Router();

postRouter.post("/createpost", requireLogin, (req,res) => {
    const { title, body, photo } = req.body;
    if( !title || !body || !photo ) {
        return res.status(422).json({ error: "Please add all fields"});
    }

    const post = new Post({
        title: title,
        body: body,
        photo,
        postedBy: req.user
    })

    post.save().then(result => {
        return res.json({post:result})
    })
    .catch(err => {
        console.log(err)
        return res.status(500).json({ error: "Something went wrong while saving post" });
    })
})

postRouter.get("/allpost", requireLogin, (req,res) => {
    Post.find()
    .populate([{ path: "postedBy", strictPopulate: false}])
    .populate("postedBy", "_id name")
    .sort({ createdAt: -1 })   
    .then(posts => {
        res.json({ posts });
    })
    .catch(err => {
        console.log(err);
        return res.status(500).json({ error: "Failed to fetch posts" });  
    })
})

postRouter.get("/mypost", requireLogin, (req,res) => {
    Post.find({postedBy: req.user._id})
    .populate([{ path: "postedBy", strictPopulate: false}])
    .populate("postedBy", "_id name")
    .sort({ createdAt: -1 })   
    .then(mypost => {
        res.json({mypost});
    })
    .catch(err => {
        console.log(err);
        return res.status(500).json({ error: "Failed to fetch your posts" });
    })
})

export default postRouter;