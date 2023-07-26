const express = require('express');
const videosDB = require("../dataBase/videosDB")
const validate = require('./validates/videosValidation')

const videosRouter = express.Router();

//// GET ////
videosRouter.get('/', async (req, res) => {

    let result;

    try {
        if (req.query.limit) {
            result = await videosDB.getLimmitedVideos(req.query.limit, req.query.offset);
        }
        else {
            result = await videosDB.getVideos();
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

videosRouter.get('/byUsername/:username', async (req, res) => {
    let result;

    try {
        result = await videosDB.getVideoByUsername(req.params);
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

videosRouter.get('/byCategory/:category', async (req, res) => {
    let result;

    try {
        result = await videosDB.getVideoByCategory(req.params);
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
videosRouter.post('/new', async (req, res) => {
    const { error, value } = validate.newVideoValidation(req.body);

    if (!error) {
        res.status(400).send(error.details.map(detail => detail.message).join('\n'))
        return;
    }

    console.log("making reference to firebase");
    const fileRef = ref(firebaseInit.storage, `videos/${req.files.file.name}`);
    const path = `gs://fullstack7-f3630.appspot.com/${fileRef.fullPath}`;

    console.log("starting upload to firebase");
    await uploadBytes(fileRef, req.files.file.data);
    console.log("finish!");

    let result;

    try {
        result = await videosDB.addVideo(req.body, path);
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
videosRouter.put('/update/:id', async (req, res) => {
    const { error, value } = validate.updateVideoValidation(req.body);

    if (!error) {
        res.status(400).send(error.details.map(detail => detail.message).join('\n'))
        return;
    }

    const newDetaild = { ...req.body, ...req.params }
    let result;

    try {
        result = await videosDB.updateVideoById(newDetaild);
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

// //// DELETE ////
videosRouter.delete('/delete/:id', async (req, res) => {

    let result;

    try {
        result = await videosDB.deleteVideoById(req.params);
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

module.exports = videosRouter;