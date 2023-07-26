const express = require('express');
const validate = require('./validates/summariesValidation');
const summariesDB = require('../dataBase/summariesDB');
const firebaseInit = require("./firebase");
const { uploadBytes, ref } = require("firebase/storage");

const summeriesRouter = express.Router();

//// GET ////
summeriesRouter.get('/', async (req, res) => {

    let result;
    try {
        if (req.query.limit) {
            result = await summariesDB.getLimmitedSummaries(req.query.limit, req.query.offset);
        }
        else {
            result = await summariesDB.getSummaries();
        }
    } catch (e) {
        res.status(400).send(JSON.stringify("something went wrong, please try again"));
        return;
    }

    if (!result) {
        res.status(400).send(JSON.stringify("something went wrong, please try again"));
        return;
    }

    res.status(200).send(JSON.stringify(result));
});

summeriesRouter.get('/:id', async (req, res) => {
    let result;

    try {
        result = await summariesDB.getSummaryById(req.params);
    } catch (e) {
        res.status(400).send(JSON.stringify("something went wrong, please try again"));
        return;
    }

    if (!result) {
        res.status(400).send(JSON.stringify("something went wrong, please try again"));
        return;
    }

    res.status(200).send(JSON.stringify(result));
});

//// POST ////
summeriesRouter.post('/new', async (req, res) => {
    const { error, value } = validate.newSummariesValidation(req.body);

    if (!error) {
        res.status(400).send(error.details.map(detail => detail.message).join('\n'))
        return;
    }

    console.log("making reference to firebase");
    const fileRef = ref(firebaseInit.storage, `summeries/${req.files.file.name}`);
    const path = `gs://fullstack7-f3630.appspot.com/${fileRef.fullPath}`;

    console.log("starting upload to firebase");
    await uploadBytes(fileRef, req.files.file.data);
    console.log("finish!");

    let result;

    try {
        result = await summariesDB.addSummary(req.body, path);
    } catch (e) {
        res.status(400).send(JSON.stringify("something went wrong, please try again"));
        return;
    }

    if (!result) {
        res.status(400).send(JSON.stringify("something went wrong, please try again"));
        return;
    }

    res.status(200).send(JSON.stringify(result));
});

// //// PUT ////
summeriesRouter.put('/update/:id', async (req, res) => {
    const { error, value } = validate.updateSummaryValidation(req.body);

    if (!error) {
        res.status(400).send(error.details.map(detail => detail.message).join('\n'))
        return;
    }

    const newDetaild = { ...req.body, ...req.params }
    let result;

    try {
        result = await summariesDB.updateSummaryById(newDetaild);
    } catch (e) {
        res.status(400).send(JSON.stringify("something went wrong, please try again"));
        return;
    }


    if (!result) {
        res.status(400).send(JSON.stringify("something went wrong, please try again"));
        return;
    }

    res.status(200).send(JSON.stringify("summary successfully updated"));
});

// //// DELETE ////
summeriesRouter.delete('/delete/:id', async (req, res) => {

    let result;

    try {
        result = await summariesDB.deleteSummary(req.params);
    } catch (e) {
        res.status(400).send(JSON.stringify("something went wrong, please try again"));
        return;
    }

    if (!result) {
        res.status(400).send(JSON.stringify("something went wrong, please try again"));
        return;
    }

    res.status(200).send(JSON.stringify(result));
});

module.exports = summeriesRouter;