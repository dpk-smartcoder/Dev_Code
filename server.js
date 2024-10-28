import dotenv from 'dotenv';
dotenv.config();
import {questionImageCapture,verdictChecker} from './comparision.js';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import {jwtDecode} from 'jwt-decode';
import findOrCreate from 'mongoose-findorcreate';

const app = express();

mongoose.connect(process.env.MONGO, { useNewUrlParser: true });

app.use(cors());
app.use(express.json());

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    googleId: String,
});
const questionSchema = new mongoose.Schema({
    element: String,
    image: String,
    css:String
});
const contestSchema = new mongoose.Schema({
    qId:String,
    rankings:Array,
    startTime:Date
});
const submissionSchema = new mongoose.Schema({
    uId:String,
    qId:String,
    t:Date,
});
userSchema.plugin(findOrCreate);
const Question = mongoose.model('Question',questionSchema);
const User = mongoose.model('User', userSchema);
const Contest = mongoose.model('Contest', contestSchema);
const Submission = mongoose.model('Submission', submissionSchema);
app.post('/login', async function(req, res) {
    let x = req;
    try {
        x = await jwtDecode(req.body.response.credential);
        await User.findOrCreate({ name: x.name, email: x.email, googleId: x.sub });
    } catch (err) {
        console.log(err);
    }
    res.json(x.sub);
});

app.post('/getuserdetails', async (req, res) => {
    try {
        const x = await User.find({ googleId: req.body.u });
        const us = {
            name: x[0].name,
            email: x[0].email,
        };
        res.json(us);
    } catch (err) {
        console.log(err);
    }
});

app.get("/admin/override/createcontest",async (req,res)=>{
    try{const ct= new Date();
    const qId=await Question.aggregate([{ $sample: { size: 1 } }]);
    var c=new Contest({startTime:ct,qId:qId[0]._id,rankings:[]});
    await c.save();
    res.json(true);}
    catch(err){
        res.json(false);
    }
});

app.post('/question',async (req,res)=>{
    try{
    var q=await Question.findOne({_id:req.body.qId});
    res.json(q)
    }catch(err){
        console.log(err);
    }
});

app.get('/upcomingcontests',async (req,res)=>{
    try{const ct=new Date(new Date().getTime()-3600001);
    var uc=await Contest.find({startTime:{$gt:ct}});
    res.json(uc)}catch(err){
        console.log(err);
    }
});

app.get('/pastcontests',async (req,res)=>{
    try{const ct=new Date(new Date().getTime() - 3599999);
    var pc=await Contest.find({startTime:{$lt:ct}});
    res.json(pc);}catch(err){console.log(err);}
});

app.post("/submit",async (req,res)=>{
    try{const q=await Question.findOne({_id:req.body.qId});
        const c=await Contest.findOne({_id:req.body.cId});
        const css=q.css;
        const element=q.element;
        const t=new Date();
        const obj={
            css1:req.body.css,
            css2:css,
            element:element
        };
        const v=verdictChecker(obj);
        if(new Date(c.startTime.getTime()+3600000)>t&&new Date(c.startTime.getTime())<=t){
            if(v){
            var s= new Submission({
                uId:req.body.uId,
                qId:q._id,
                t:t,
            });
            await s.save();}
            res.json(v);
        }
        else{
            res.json(v);
        }
    }catch(err){console.log(err);}
});

app.post("/conteststandings", async (req,res)=>{
    try{
        const c = await Contest.findOne({_id:cId});
        const subArr=await Submission.find({qId:c.qId},{uId:1,t:1},{sort:{time:1}});
        res.json(subArr);
    }catch(err){
        console.log(err);
    }
});

app.post("/addquestion", async (req,res)=>{
    try{
        var obj={css:req.body.css,element:req.body.element};
        var ss=await questionImageCapture(obj);
        const q= new Question({
            image:ss,
            element:obj.element,
            css:obj.css
        });
        await q.save();
        res.json(true);
    }catch(err){
        console.log(err);
        res.json(false);
    }
});
app.listen(process.env.PORT, function() {
    console.log(`Server started on port ${process.env.PORT}.`);
});
