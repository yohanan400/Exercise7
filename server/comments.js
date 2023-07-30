const express = require('express');
const commentsDB = require("../dataBase/commentsDB")
const validate = require("./validates/commentsValidation")

const commentsRouter = express.Router();

//// GET ////
commentsRouter.get('/', async (req, res) => {

    let result;
    try {
        if (req.query.limit) {
            result = await commentsDB.getLimmitedComments(req.query.limit, req.query.offset);
        }
        else {
            result = await commentsDB.getComments();
        }
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

commentsRouter.get('/all/:username', async (req, res) => {

    let result;
    try {
        result = await commentsDB.getCommentsByUsername(req.params);
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

commentsRouter.get('/byPostId/:postId', async (req, res) => {

    let result;

    try {
        if (req.query.limit) {
            result = await commentsDB.getLimmitedCommentsByPostId(req.params.postId, req.query.limit, req.query.offset);
        }
        else {
            result = await commentsDB.getCommentByPostId(req.params);
        }
    } catch (e) {
        console.log(e);
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
commentsRouter.post('/new', async (req, res) => {
    const { error, value } = validate.newcommentValidation(req.body);

    if (!error) {
        res.status(400).send(error.details.map(detail => detail.message).join('\n'))
        return;
    }

    let result;
    try {
        result = await commentsDB.addComment(req.body);
    } catch (e) {
        res.status(400).send(JSON.stringify("something went wrong, please try again (catch)"));
        return;
    }

    if (!result) {
        res.status(400).send(JSON.stringify("something went wrong, please try again"));
        return;
    }

    res.status(200).send(JSON.stringify(result));
});

// //// PUT ////
commentsRouter.put('/update/:id', async (req, res) => {
    const { error, value } = validate.updatecommentValidation(req.body);

    if (!error) {
        res.status(400).send(error.details.map(detail => detail.message).join('\n'))
        return;
    }

    const newDetaild = { ...req.body, ...req.params }

    let result;
    try {
        result = await commentsDB.updateCommentById(newDetaild);
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
commentsRouter.delete('/delete/:id', async (req, res) => {

    let result;
    try {
        result = await commentsDB.deleteCommentById(req.params);
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

module.exports = commentsRouter;