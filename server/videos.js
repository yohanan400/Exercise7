const express = require('express');
const videosDB = require("../dataBase/videosDB")
const validate = require('./validates/videosValidation')

const videosRouter = express.Router();

//// GET ////
videosRouter.get('/', async (req, res)=>{

    let result; 
    
    if(req.query.limit){
        result = await videosDB.getLimmitedVideos(req.query.limit, req.query.offset);
    }
    else{
        result = await videosDB.getVideos();
    }
    
    if (!result){
        res.status(400).send("something went worng, please try again.");
        return;
    }

    res.status(200).send(result);
});

videosRouter.get('/byUsername/:username', async (req, res)=>{
    const result = await videosDB.getVideoByUsername(req.params);

    if (!result){
        res.status(400).send("something went worng, please try again.");
        return;
    }

    res.status(200).send(result);
});

videosRouter.get('/byCategory/:category', async (req, res)=>{
    const result = await videosDB.getVideoByCategory(req.params);

    if (!result){
        res.status(400).send("something went worng, please try again.");
        return;
    }

    res.status(200).send(result);
});

//// POST ////
videosRouter.post('/new', async (req, res)=>{
    const {error, value} = validate.newVideoValidation(req.body);

    if(!error){
        res.status(400).send(error.details.map(detail => detail.message).join('\n'))
        return;
    }

    console.log("making reference to firebase");
    const fileRef = ref(firebaseInit.storage, `videos/${req.files.file.name}`);
    const path = `gs://fullstack7-f3630.appspot.com/${fileRef.fullPath}`;
    
    console.log("starting upload to firebase");
    await uploadBytes(fileRef, req.files.file.data);
    console.log("finish!");

    const result = await videosDB.addVideo(req.body, path);

    if(!result){
        res.status(400).send("something went wrong, please try again.");
        return;
    }

    res.status(200).send(result);
});

// //// PUT ////
videosRouter.put('/update/:id', async (req, res)=>{
    const {error, value} = validate.updateVideoValidation(req.body);

    if(!error){
        res.status(400).send(error.details.map(detail => detail.message).join('\n'))
        return;
    }

    const newDetaild = {...req.body, ...req.params}
    const result = await videosDB.updateVideoById(newDetaild);


    if (!result) {
        res.status(400).send("something went wrong, please try again");
        return;
    }

    res.status(200).send(result);
} );

// //// DELETE ////
videosRouter.delete('/delete/:id', async (req, res)=>{
    
    const result = await videosDB.deleteVideoById(req.params);

    if (!result){
        res.status(400).send("something went worng, please try again.");
        return;
    }

    res.status(200).send(result);

});

module.exports = videosRouter;