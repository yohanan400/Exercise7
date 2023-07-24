const express = require('express');
const accessLevelDB = require("../dataBase/accessLevelDB");

const accessLevelRouter = express.Router();

//// GET ////
accessLevelRouter.get('/', async (req, res)=>{

    const result = await accessLevelDB.getAllAccessLevels();
    
    if (!result){
        res.status(400).send("something went worng, please try again.");
        return;
    }

    res.status(200).send(result);
});

//// POST ////
accessLevelRouter.post('/new', async (req, res)=>{

    const result = await accessLevelDB.addAccessLevel(req.body);

    if(!result){
        res.status(400).send("something went wrong, please try again.");
        return;
    }

    res.status(200).send(result);
});

// //// PUT ////
accessLevelRouter.put('/update/:id', async (req, res)=>{
 
    const newDetaild = {...req.body, ...req.params}
    const result = await accessLevelDB.updateAccessLevelById(newDetaild);

    if (!result) {
        res.status(400).send("something went wrong, please try again");
        return;
    }

    res.status(200).send(result);
} );

// //// DELETE ////
accessLevelRouter.delete('/delete/:id', async (req, res)=>{
    
    const result = await accessLevelDB.deleteAccessLevel(req.params);

    if (!result){
        res.status(400).send("something went worng, please try again.");
        return;
    }

    res.status(200).send(result);

});

module.exports = accessLevelRouter;