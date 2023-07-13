const express = require('express');
const commentsDB = require("../dataBase/commentsDB")
const validate = require("./validates/commentsValidation")

const commentsRouter = express.Router();

//// GET ////
commentsRouter.get('/', async (req, res) => {

    let result;

    if (req.query) {
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

commentsRouter.get('/:username/all', async (req, res) => {

    const result = await commentsDB.getCommentsByUsername(req.params);

    if (!result) {
        res.status(400).send("something went worng, please try again.");
        return;
    }

    res.status(200).send(result);
});

//// POST ////
commentsRouter.post('/new/newCluster', async (req, res) => {
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
commentsRouter.put('/:id/update', async (req, res) => {
    const { error, value } = validate.updatecommentValidation(req.body);

    if (!error) {
        res.status(400).send(error.details.map(detail => detail.message).join('\n'))
        return;
    }

    const result = await commentsDB.updateCommentById(req.params, req.body);


    if (!result) {
        res.status(400).send("something went wrong, please try again");
        return;
    }

    res.status(200).send("summary successfully updated");
});

// //// DELETE ////
commentsRouter.delete('/:id/delete', async (req, res) => {

    const result = await commentsDB.deleteCommentById(req.params);

    if (!result) {
        res.status(400).send("something went worng, please try again.");
        return;
    }

    res.status(200).send(result);

});

module.exports = commentsRouter;