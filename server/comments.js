const express = require('express');
const commentsDB = require("../dataBase/commentsDB")
const validate = require("./validates/commentsValidation")

const commentsRouter = express.Router();

//// GET ////
commentsRouter.get('/', async (req, res) => {

    let result;

    if (req.query.limit) {
        result = await commentsDB.getLimmitedComments(req.query.limit, req.query.offset);
    }
    else {
        result = await commentsDB.getComments();
    }

    if (!result) {
        res.status(400).send("something went worng, please try again.");
        return;
    }

    res.status(200).send(result);
});

commentsRouter.get('/all/:username', async (req, res) => {

    const result = await commentsDB.getCommentsByUsername(req.params);

    if (!result) {
        res.status(400).send("something went worng, please try again.");
        return;
    }

    res.status(200).send(result);
});

commentsRouter.get('/byPostId/:postId', async (req, res) => {

    let result;

    if (req.query.limit) {
        result = await commentsDB.getLimmitedCommentsByPostId(req.params.postId, req.query.limit, req.query.offset);
    }
    else {
        result = await commentsDB.getCommentByPostId(req.params);
    }

    if (!result) {
        res.status(400).send("something went worng, please try again.");
        return;
    }

    res.status(200).send(result);
});
//// POST ////
commentsRouter.post('/new', async (req, res) => {
    const { error, value } = validate.newcommentValidation(req.body);

    if (!error) {
        res.status(400).send(error.details.map(detail => detail.message).join('\n'))
        return;
    }

    const result = await commentsDB.addComment(req.body);

    if (!result) {
        res.status(400).send("something went wrong, please try again.");
        return;
    }

    res.status(200).send(result);
});

// //// PUT ////
commentsRouter.put('/update/:id', async (req, res) => {
    const { error, value } = validate.updatecommentValidation(req.body);

    if (!error) {
        res.status(400).send(error.details.map(detail => detail.message).join('\n'))
        return;
    }

    const newDetaild = {...req.body, ...req.params}
    const result = await commentsDB.updateCommentById(newDetaild);


    if (!result) {
        res.status(400).send("something went wrong, please try again");
        return;
    }

    res.status(200).send("summary successfully updated");
});

// //// DELETE ////
commentsRouter.delete('/delete/:id', async (req, res) => {

    const result = await commentsDB.deleteCommentById(req.params);

    if (!result) {
        res.status(400).send("something went worng, please try again.");
        return;
    }

    res.status(200).send(result);

});

module.exports = commentsRouter;