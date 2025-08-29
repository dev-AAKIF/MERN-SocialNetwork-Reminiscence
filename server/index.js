import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';

import authRouter from './routes/auth.js';
import postRouter from './routes/post.js';
import "./models/user.js";
import "./models/post.js";

const app = express();
const PORT = 5000; 

app.use(cors());
app.use(express.json());
app.use(authRouter);
app.use(postRouter);

app.use(bodyParser.json({ limit: "30mb", extendeed: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));

const CONNECTION_URL = 'mongodb+srv://socialnetwork:socialnetwork@cluster0.wp9kdhn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(CONNECTION_URL).then(()=> {
    console.log(`SERVER connect DATABASE Through : ${PORT}`)
})

app.listen(PORT,()=> {
    console.log("SERVER RUNNING ON :", PORT);
});

// mongodb+srv://socialnetwork:socialnetwork@cluster0.wp9kdhn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
// get vs post method in api sending 