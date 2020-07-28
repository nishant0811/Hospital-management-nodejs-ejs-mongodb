const express = require("express");
const ejs = require("ejs")
const app = express();
const bp = require('body-parser')
app.set('view engine', 'ejs');
app.use(bp.urlencoded({extended: true}));
app.use(express.static("public"));


const port = 3000 || process.env.PORT


app.use("/admindash",require("./routes/api/admindash"))

app.get("/",(req,res)=>{
  res.render("home")
})

app.post("/",(req,res)=>{
  console.log(req.body);
})
app.listen(3000,()=>{
  console.log("Server Up and running on port 3000");
})
