import User from '../model/User.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import express from 'express';
const router = express.Router({ mergeParams: true });

 router.post('/signup',async (req, res) => {
    try {    
        let { name, email, password } = new User(req.body);
        let userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ error: "User already exists" });
        }
        const hash = await bcrypt.hash(password, 15);

        password = hash;
            
        let user =  new User({ name, email, password });
            
        await user.save();
            const token = jwt.sign({ user }, "meninblack", { expiresIn: '7d' });
            res.status(200).send({ token: token, user: user});
    }
    catch (err) {
        console.log(err.message);

        res.status(400).send("Error in saving user");
    }
});

router.post('/login',async (req, res) => {
    try {
        let { email, password } = req.body;
        let user = await User.findOne({ email: email });
        if(user==null){
            throw new Error("User not found");
        }
        const match = await bcrypt.compare(password, user.password);
        if (!user && !match) {
            throw new Error("User not found");
        }
        console.log("match");
        const token = jwt.sign({ user }, "meninblack", { expiresIn: '7d' })

        res.status(200).send({ token: token, user: user });
    } catch (err) {
        console.log(err.message);
        res.status(400).send(err.message);
    }
} );

router.get('/',async (req, res) => {
    try{
        let allUsers = await User.find();
        res.send(JSON.stringify(allUsers));
    }
    catch(err){
        res.status(400).send("Error in getting all users");
    }
}) 

export default router;
