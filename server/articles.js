const express = require('express');
const validate = require('./validates/articlesValidation');
const articlesDB = require('../dataBase/articlesDB');

const articlesRouter = express.Router();

//// GET ////
articlesRouter.get('/', async (req, res) => {

    let result;

    try {
        if (req.query.limit) {
            result = await articlesDB.getLimmitedArticles(req.query);
        }
        else {
            result = await articlesDB.getArticles();
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

articlesRouter.get('/byCategory/:category', async (req, res) => {
    let result;

    try {
        result = await articlesDB.getArticlesByCategory(req.params);
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

articlesRouter.get('/byTitle/:title', async (req, res) => {
    let result;

    try {
        result = await articlesDB.getArticleByTitle(req.params);
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

articlesRouter.get('/byUsername/:username', async (req, res) => {

    let result;
    try {
        result = await articlesDB.getArticlesByUsername(req.params);
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
articlesRouter.post('/new', async (req, res) => {
    const { error, value } = validate.newArticleValidation(req.body);

    if (!error) {
        res.status(400).send(error.details.map(detail => detail.message));
        return;
    }

    let result;
    try {
        result = await articlesDB.addArticle(req.body);
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

//// PUT ////
articlesRouter.put('/update/:id', async (req, res) => {
    const { error, value } = validate.updateArticleValidation(req.body);

    if (!error) {
        res.status(400).send(error.details.map(detail => detail.message));
        return;
    }

    const newDetaild = { ...req.body, ...req.params }

    let result;
    try {
        result = await articlesDB.updateArticleById(newDetaild);
    } catch (e) {
        res.status(400).send(JSON.stringify("something went wrong, please try again"));
        return;
    }

    if (!result) {
        res.status(400).send(JSON.stringify("something went wrong, please try again"));
        return;
    }

    res.status(200).send(JSON.stringify("article successfully updated"));
});

//// DELETE ////
articlesRouter.delete('/delete/:id', async (req, res) => {

    let result;
    try {
        result = await articlesDB.deleteArticleById(req.params);
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

module.exports = articlesRouter;