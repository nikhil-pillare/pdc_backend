const express = require('express');
const app = express();
const mongoose = require('mongoose')
const userModel = require('./models/userModel')
const cors = require('cors')
require('dotenv').config()

app.use(express.json())
app.use(cors())
const authenticateAdmin = (req, res, next) => {
    const { userName, password } = req.body;
  
    if(userName === "admin" && password=="admin" ){  //hardcoded usename and password for simplicity
      next();
    } else{
      res.status(401).json({error: 'authentication failure'});
    }
  };

app.use("/",(req,res)=>{
    res.send("welcome here")
})

app.post('/add', authenticateAdmin, async(req, res) => {
  const {userName, password, selected}= req.body;

  try {
    const data= new userModel({userName, password, selected});
    await data.save();

    res.status(200).json({"addeddata":data})
} catch (error) {
    res.status(401).json({error: 'data not added'});
}
});

app.listen(8080, async() => {
  mongoose.connect(process.env.mongourl)
  console.log("server is running");
});
