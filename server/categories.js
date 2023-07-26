const express = require('express');
const categoriesDB = require("../dataBase/categoryDB")

const categoriesRouter = express.Router();

//// GET ////
categoriesRouter.get('/', async (req, res) => {

    let result;

    try {
        if (req.query.limit) {
            result = await categoriesDB.getLimmitedCategories(req.query.limit, req.query.offset);
        }
        else {
            result = await categoriesDB.getCategories();
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

//// POST ////
categoriesRouter.post('/new', async (req, res) => {

    let result;
    try {
        result = await categoriesDB.addCategory(req.body);
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
categoriesRouter.put('/update/:id', async (req, res) => {

    const newDetaild = { ...req.body, ...req.params }
    let result;
    try {
        result = await categoriesDB.updateCategoryById(newDetaild);
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
categoriesRouter.delete('/delete/:id', async (req, res) => {

    let result;
    try {
        result = await categoriesDB.deleteCategory(req.params);
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

module.exports = categoriesRouter;