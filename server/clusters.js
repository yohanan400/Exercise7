const express = require('express');
const clustersDB = require("../dataBase/clustersDB")
const validate = require("./validates/clustersValidation")

const clustersRouter = express.Router();

//// GET ////
clustersRouter.get('/', async (req, res) => {

    var result;

    try {
        if (req.query.limit) {
            result = await clustersDB.getLimmitedClusters(req.query);
        }
        else {
            result = await clustersDB.getClusters();

        }
    } catch (e) {
        res.status(400).send(JSON.stringify("something went wrong, please try again"));
        return;
    }

    if (!result) {
        res.status(400).send(JSON.stringify("something went worng, please try again."));
        return;
    }

    res.status(200).send(result);
});

//// POST ////
clustersRouter.post('/new', async (req, res) => {
    const { error, value } = validate.newClusterValidation(req.body);

    if (!error) {
        res.status(400).send(error.details.map(detail => detail.message).join('\n'))
        return;
    }

    let result;
    try {
        result = await clustersDB.addCluster(req.body);
    } catch (e) {
        res.status(400).send(JSON.stringify("something went wrong, please try again"));
        return;
    }

    if (!result) {
        res.status(400).send(JSON.stringifyׂ("something went wrong, please try again."));
        return;
    }

    res.status(200).send(JSON.stringify(result));
});

// //// PUT ////
clustersRouter.put('/update/:id', async (req, res) => {
    const { error, value } = validate.updateClusterValidation(req.body);

    if (!error) {
        res.status(400).send(error.details.map(detail => detail.message).join('\n'))
        return;
    }

    const newDetaild = { ...req.body, ...req.params }
    let result;
    try {
        result = await clustersDB.updateClusterById(newDetaild);
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
clustersRouter.delete('/delete/:id', async (req, res) => {

    let result;
    try {
        result = await clustersDB.deleteClusterById(req.params);
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

module.exports = clustersRouter;