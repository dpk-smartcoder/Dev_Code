import dotenv from 'dotenv';
dotenv.config();
import {main} from './comparision.js';
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

userSchema.plugin(findOrCreate);

const User = mongoose.model('User', userSchema);

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

app.listen(process.env.PORT, function() {
    main();
    console.log(`Server started on port ${process.env.PORT}.`);
});
