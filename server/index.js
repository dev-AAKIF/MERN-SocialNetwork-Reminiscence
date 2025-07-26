import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';

import router from './routes/auth.js';
import "./models/user.js";

const app = express();
const PORT = 5000; 

app.use(cors());
app.use(express.json());

app.use(bodyParser.json({ limit: "30mb", extendeed: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));

const customMiddleware = (req,res,next) => {
    console.log("Middleware Executed!!!");
    next();
};

app.get("/home",(req,res)=>{
    console.log("Hello from Home Page"); //Terminal
    res.send("I am Home Page"); // Browser    
});

app.get("/login",customMiddleware,(req,res)=>{
    console.log("Hello from Login Page"); //Terminal
    res.send("I am Login Page"); // Browser    
});

app.listen(PORT,()=> {
    console.log("SERVER RUNNING ON :", PORT);
});

const CONNECTION_URL = 'mongodb+srv://socialnetwork:socialnetwork@cluster0.wp9kdhn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
app.use(router);

mongoose.connect(CONNECTION_URL).then(()=> {
    console.log(`SERVER connect DATABASE Through : ${PORT}`)
})


// mongodb+srv://socialnetwork:socialnetwork@cluster0.wp9kdhn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
// get vs post method in api sending 