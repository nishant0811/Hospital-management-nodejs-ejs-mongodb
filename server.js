const express = require("express");
const ejs = require("ejs")
const app = express();
const bp = require('body-parser')
const mongoose = require('mongoose')
app.set('view engine', 'ejs');
app.use(bp.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb+srv://Nishant:nishant1234@cluster0.m0yjk.mongodb.net/hospital?retryWrites=true&w=majority",{ useNewUrlParser: true , useUnifiedTopology: true, useCreateIndex : true, useFindAndModify : false})

const port = 3000 || process.env.PORT


app.use("/admindash",require("./routes/api/admindash"));
app.use("/pullIssues", require("./routes/api/issues"));
app.use("/receptionDash",require("./routes/api/receptionDash"))
app.get("/",(req,res)=>{
  res.render("home")
})



app.post("/",(req,res)=>{
  console.log(req.body);
})
app.listen(3000,()=>{
  console.log("Server Up and running on port 3000");
})