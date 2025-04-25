import express from 'express'
import Videos from '../model/Videos.js'
import {isLogin} from '../middleware/auth.js'
const router  = express.Router({mergeParams:true});


router.get('/',async (req,res)=>{
    try{
        console.log("Getting all Videos");
        let data = await Videos.find();
        res.status(200).send(data);
    }
    catch(err){
        console.log(err);
        res.send(400),send("Got some Error");
    }
})
.post('/',isLogin,async (req,res)=>{
    try{
        let {data} = req.body;
        console.log(req.user._id)
        data.uploader = req.user._id;
        let newVideo = new Videos(data);
        await newVideo.save();
        res.status(200).send("Videos added successfully");
    }
    catch(err){
        console.log(err);
        res.send(400),send("Got some Error");
    }
});

router.get('/:id',async(req,res)=>{
    try{
        let {id} = req.params;
        let video = await Videos.findById(id);

        res.status(200).send(video);
    }
    catch(err){
        console.log(err);
        res.status(400).send("Got some error");
    }
});

export default router;
