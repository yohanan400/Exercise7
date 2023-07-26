const express = require('express');
const rolesDB = require("../dataBase/rolesDB");

const rolesRouter = express.Router();

//// GET ////
rolesRouter.get('/', async (req, res) => {

    let result;

    try {
        if (req.query.limit) {
            result = await rolesDB.getLimmitedRoles(req.query.limit, req.query.offset);
        }
        else {
            result = await rolesDB.getRoles();
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
rolesRouter.post('/new', async (req, res) => {

    let result;

    try {
        result = await rolesDB.addRole(req.body);
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
rolesRouter.put('/update/:id', async (req, res) => {

    const newDetaild = { ...req.body, ...req.params }
    let result;

    try {
        result = await rolesDB.updateRoleById(newDetaild);
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
rolesRouter.delete('/delete/:id', async (req, res) => {

    let result;

    try {
        result = await rolesDB.deleteRole(req.params);
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

module.exports = rolesRouter;