const express = require('express');
const accessLevelDB = require("../dataBase/accessLevelDB");

const accessLevelRouter = express.Router();

//// GET ////
accessLevelRouter.get('/', async (req, res) => {

    let result
    try {
        result = await accessLevelDB.getAllAccessLevels();
    } catch (e) {
        res.status(400).send(JSON.stringify("something went wrong, please try again"));
        return;
    }

    if (!result) {
        res.status(400).send(JSON.stringify("something went worng, please try again."));
        return;
    }

    res.status(200).send(JSON.stringify(result));
});

//// POST ////
accessLevelRouter.post('/new', async (req, res) => {

    let result
    try {
        result = await accessLevelDB.addAccessLevel(req.body);
    } catch (e) {
        res.status(400).send(JSON.stringify("something went wrong, please try again"));
        return;
    }

    if (!result) {
        res.status(400).send(JSON.stringify("something went wrong, please try again."));
        return;
    }

    res.status(200).send(JSON.stringify(result));
});

// //// PUT ////
accessLevelRouter.put('/update/:id', async (req, res) => {

    const newDetaild = { ...req.body, ...req.params }
    let result;
    try {
        result = await accessLevelDB.updateAccessLevelById(newDetaild);
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
accessLevelRouter.delete('/delete/:id', async (req, res) => {

    let result;

    try {
        result = await accessLevelDB.deleteAccessLevel(req.params);
    } catch (e) {
        res.status(400).send(JSON.stringify("something went wrong, please try again"));
        return;
    }

    if (!result) {
        res.status(400).send(JSON.stringify("something went worng, please try again."));
        return;
    }

    res.status(200).send(JSON.stringify(result));
});

module.exports = accessLevelRouter;