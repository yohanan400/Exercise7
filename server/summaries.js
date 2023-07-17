const express = require('express');
const validate = require('./validates/summariesValidation');
const summariesDB = require('../dataBase/summariesDB');
const firebaseInit = require("./firebase");
const { uploadBytes, ref } = require("firebase/storage");

const summeriesRouter = express.Router();

//// GET ////
summeriesRouter.get('/', async (req, res)=>{

    let result; 
    
    if(req.query.limit){
        result = await summariesDB.getLimmitedSummaries(req.query.limit, req.query.offset);
    }
    else{
        result = await summariesDB.getSummaries();
    }
    
    if (!result){
        res.status(400).send("something went worng, please try again.");
        return;
    }

    res.status(200).send(result);
});

summeriesRouter.get('/:id', async (req, res)=>{
    const result = await summariesDB.getSummaryById(req.params);

    if (!result){
        res.status(400).send("something went worng, please try again.");
        return;
    }

    res.status(200).send(result);
});

//// POST ////
summeriesRouter.post('/newSummary', async (req, res)=>{
    const {error, value} = validate.newSummariesValidation(req.body);

    if(!error){
        res.status(400).send(error.details.map(detail => detail.message).join('\n'))
        return;
    }

    console.log("making reference to firebase");
    const fileRef = ref(firebaseInit.storage, `summeries/${req.files.file.name}`);
    const path = `gs://fullstack7-f3630.appspot.com/${fileRef.fullPath}`;
    
    console.log("starting upload to firebase");
    await uploadBytes(fileRef, req.files.file.data);
    console.log("finish!");

    const result = await summariesDB.addSummary(req.body, path);

    if(!result){
        res.status(400).send("something went wrong, please try again.");
        return;
    }

    res.status(200).send(result);
});

// //// PUT ////
summeriesRouter.put('/update/:id', async (req, res)=>{
    const {error, value} = validate.updateSummaryValidation(req.body);

    if(!error){
        res.status(400).send(error.details.map(detail => detail.message).join('\n'))
        return;
    }

    const newDetaild = {...req.body, ...req.params}
    const result = await summariesDB.updateSummaryById(newDetaild);


    if (!result) {
        res.status(400).send("something went wrong, please try again");
        return;
    }

    res.status(200).send("summary successfully updated");
} );

// //// DELETE ////
summeriesRouter.delete('/delete/:id', async (req, res)=>{
    
    const result = await summariesDB.deleteSummary(req.params);

    if (!result){
        res.status(400).send("something went worng, please try again.");
        return;
    }

    res.status(200).send(result);

});

module.exports = summeriesRouter;