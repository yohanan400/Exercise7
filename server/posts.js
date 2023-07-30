const express = require('express');
const postsDB = require("../dataBase/postsDB")
const validate = require("./validates/postsValidations")

const postsRouter = express.Router();

//// GET ////
postsRouter.get('/', async (req, res) => {

    let result;
    try {
        if (req.query.limit) {
            result = await postsDB.getLimmitedPosts(req.query.limit, req.query.offset);
        }
        else {
            result = await postsDB.getPosts();
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

postsRouter.get('/byId/:id', async (req, res) => {
    let result;
    try {
        result = await postsDB.getPostById(req.params);
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

postsRouter.get('/byCluster/:cluster', async (req, res) => {
    let result;

    try {
        result = await postsDB.getPostsByCluster(req.params);
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

postsRouter.get('/all/:username', async (req, res) => {
    let result;

    try {
        result = await postsDB.getPostsByUsername(req.params);
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
postsRouter.post('/new', async (req, res) => {
    const { error, value } = validate.newPostValidation(req.body);

    if (!error) {
        res.status(400).send(error.details.map(detail => detail.message).join('\n'))
        return;
    }

    let result;

    try {
        result = await postsDB.addPost(req.body);
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
postsRouter.put('/update/:id', async (req, res) => {
    const { error, value } = validate.updatePostValidation(req.body);

    if (!error) {
        res.status(400).send(error.details.map(detail => detail.message).join('\n'))
        return;
    }

    const newDetaild = { ...req.body, ...req.params }

    let result;
    try {
        result = await postsDB.updatePostById(newDetaild);
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
postsRouter.delete('/delete/:id', async (req, res) => {

    let result;

    try {
        result = await postsDB.deletePostById(req.params);
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

module.exports = postsRouter;