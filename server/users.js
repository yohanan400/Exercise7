const express = require('express');
const validate = require('./validates/usersValidates');
const usersDB = require('../dataBase/usersDB');
const { json } = require('stream/consumers');

const usersRouter = express.Router();

//// GET ////
usersRouter.get('/info/:username', async (req, res) => {

    let result;
    try {
        result = await usersDB.getUserByUsername(req.params);
    } catch (e) {
        res.status(400).send(JSON.stringify("something went wrong, please try again"));
        return;
    }

    if (!result[0]) {
        res.status(400).send(JSON.stringify("username or password incorrect"));
        return;
    }

    res.status(200).send(result);
});

usersRouter.get('/all/:username', async (req, res) => {

    let userDetailes

    try {
        userDetailes = await usersDB.getUserByUsername(req.params);
    } catch (e) {
        res.status(400).send(JSON.stringify("something went wrong, please try again"));
        return;
    }

    if (!userDetailes[0]) {
        res.status(400).send(JSON.stringify("something went wrong, please try again"));
        return;
    }

    if (userDetailes[0].access_level_Id !== 1) {
        res.status(403).send(JSON.stringify(`${req.params.username} does not have access for this action.`));
        return;
    }

    let result;
    try {
        result = await usersDB.getUsers(req.params);
    } catch (e) {
        res.status(400).send(JSON.stringify("something went wrong, please try again"));
        return;
    }

    if (!result[0]) {
        res.status(400).send(JSON.stringify("something went wrong, please try again"));
        return;
    }
    res.status(200).send(result);
});

//// POST ////
usersRouter.post('/login', async (req, res) => {
    const { error, value } = validate.userLoginDetailsValidate(req.body)

    if (error) {
        res.status(400).send(error.details.map(detail => detail.message))
        return;
    }

    let result;
    try {
        result = await usersDB.getUserByUsername(req.body);
    } catch (e) {
        res.status(400).send(JSON.stringify("something went wrong, please try again"));
        return;
    }

    if (!result[0] || result[0].password != req.body.password) {
        res.status(400).send(JSON.stringify("username or password incorrect"));
        return;
    }

    res.status(200).send(result);
});

usersRouter.post('/register', async (req, res) => {

    const { error, value } = validate.userRegisterDetailsValidate(req.body);

    if (error) {
        res.status(400).send(error.details.map(detail => detail.message))
        return;
    }

    let result;
    try {
        result = await usersDB.addUser(req.body);
    } catch (e) {
        res.status(400).send(JSON.stringify("something went wrong, please try again"));
        return;
    }

    if (!result[0]) {
        res.status(400).send(JSON.stringify("something went wrong, please try again"));
        return;
    }

    res.status(201).send(JSON.stringify(result));
});

//// PUT ////
usersRouter.put('/update/:username', async (req, res) => {

    const { error, value } = validate.userUpdateDetailsValidate(req.body);

    if (error) {
        res.status(400).send(error.details.map(detail => detail.message))
        return;
    }

    const newDetaild = { ...req.body, ...req.params }

    let result;
    try {
        result = await usersDB.updateUser(newDetaild);
    } catch (e) {
        res.status(400).send(JSON.stringify("something went wrong, please try again"));
        return;
    }

    if (!result[0]) {
        res.status(400).send(JSON.stringify("something went wrong, please try again"));
        return;
    }

    res.status(200).send(result);
});

//// DELETE ////
usersRouter.delete('/delete/:username', async (req, res) => {

    let result;
    try {
        result = await usersDB.deleteUserByUsername(req.params);
    } catch (e) {
        res.status(400).send(JSON.stringify("something went wrong, please try again"));
        return;
    }

    if (!result[0]) {
        res.status(400).send(JSON.stringify("something went wrong, please try again"));
        return;
    }

    res.status(200).send(JSON.stringify("user had been deleted"));
});

module.exports = usersRouter;