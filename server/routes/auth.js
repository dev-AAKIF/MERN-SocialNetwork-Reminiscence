import express from "express";
import mongoose from "mongoose";
import "../../server/models/user.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { SecretValues } from "../keys.js";
import { requireLogin } from "../middleware/requireLogin.js";

const router = express.Router();
const User = mongoose.model("User");

router.get("/", (req, res) => {
  res.send("hello");
});

// router.get("/protected",requireLogin, (req,res) => {
//   res.send("Hello User");
//   });


router.post("/signup", (req,res) => {
  const {name, email, password} = req.body;
  if(!name || !email || !password) {
    return res.status(422).json({error: "Signup:- Please add all details"});
  }
  User.findOne({ email: email })
    .then((savedUser) => {
      if (savedUser) {
        return res
          .status(422)
          .json({ error: "User already Exists with that email" });
      }
        bcryptjs.hash(password, 12).then((hashedPassword) => {
            const user = new User({
                name: name,
                email: email,
                password: hashedPassword,
            });
            user.save()
                .then((user) => {
                    res.json({ message: "Account Created Successfully" });
                })
                .catch((err) => {
                    console.log(err);
                });
        });
    })
    .catch((err) => {
      console.log(err);
    });
});

// router.post("/signin", (req, res) => {
//   const { email, password } = req.body;
//   if ( !email || !password) {
//     return res.status(422).json({ error: "Please add all details" });
//   }
//   User.findOne({ email: email})
//     .then((savedUser) => {
//       if (savedUser) {
//           ((user) => {
//           res.json({ message: "Account Logged in Successfully" });
//           })
//           .catch((err) => {
//             console.log(err);
//           });
//         // return res
//         //   .status(422)
//         //   .json({ error: "User already Exists with that email" });
//       }
//         bcryptjs.hash(password, 12).then((hashedPassword) => {
//             const user = new User({
//                 email: email,
//                 password: hashedPassword,
//             });
//             return res
//               .status(422)
//               .json({error: "Invalid Credentials"})
//             // user.save()
//             //     .then((user) => {
//             //         res.json({ message: "Account Created Successfully" });
//             //     })
//             //     .catch((err) => {
//             //         console.log(err);
//             //     });
//         });
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

// router.post("/signin", (req, res) => {
//   const { email, password } = req.body;
//     if(email, password) {
//       User.findOne({ email: email})
//     .then((savedUser) => {
//       if (savedUser) {
//           // ((user) => {
//           // })
//           res.json({ message: "Account Logged in Successfully" });
//           // .catch((err) => {
//           //   console.log(err);
//           // });
//         // return res
//         //   .status(422)
//         //   .json({ error: "User already Exists with that email" });
//       }
//         bcryptjs.hash(password, 12).then((hashedPassword) => {
//             const user = new User({
//                 email: email,
//                 password: hashedPassword,
//             });
//             return res
//               .status(422)
//               .json({error: "Invalid Credentials"})
//             // user.save()
//             //     .then((user) => {
//             //         res.json({ message: "Account Created Successfully" });
//             //     })
//             //     .catch((err) => {
//             //         console.log(err);
//             //     });
//         });
//     })
//     }
// });

router.post("/signin", (req, res) => {
  const { email, password} = req.body;
  if (!email || !password ) {//receiving blank details from client
    return res.status(422).json({ error: "SignIn:- Please add all Details"});
  }
  User.findOne({email: email})
    .then(savedUser=> {
      if( !savedUser) {// receiving wrong email id from client
        return res.status(422).json({ error: "Invalid Credentials"});
      }
      bcryptjs.compare(password, savedUser.password)
        .then(doMatch=> {
          if(doMatch) {
            // res.json({message: "From Server:- Logged In Successfully"});
            const token = jwt.sign({_id:savedUser._id},SecretValues);
            const { _id, name,email} = savedUser;
            res.json({token,user:{_id, name, email}});
            console.log(token);
          }
          else{
            return res.status(422).json({ error: "Invalid Credentials 2"});
          }
        })
        .catch(err => {
          console.log(err);
        }) 
    })
});

export default router;
