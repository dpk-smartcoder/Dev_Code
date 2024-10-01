require('dotenv').config();
const jwt=require("jwt-decode");
const express = require("express");
const mongoose = require("mongoose");
const findOrCreate = require('mongoose-findorcreate');
const app = express();
const cors=require("cors");
mongoose.connect(process.env.MONGO,{useNewUrlParser:true});
app.use(cors());
app.use(express.json());
const userSchema = new mongoose.Schema ({
  name:String,
  email: String,
  googleId: String,
});
userSchema.plugin(findOrCreate);
const User=mongoose.model("User",userSchema);
app.post("/login", function(req, res){
  var x=req;
  try{
    x=jwt.jwtDecode(x.body.response.credential)
    User.findOrCreate({name:x.name,email:x.email,googleId:x.sub});
  }catch(err){
    console.log(err);
  }
  res.json(x.sub);
});
app.post("/getuserdetails",async(req,res)=>{
  try{
    const x=await User.find({googleId:(req.body.u)});
    const us={
      name:x[0].name,
      email:x[0].email
    }
    res.json(us);
    
  }catch(err){
    console.log(err);
  }
});
app.listen(process.env.PORT, function() {
  console.log("Server started on port 8000.");
});