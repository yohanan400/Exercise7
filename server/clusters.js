const express = require('express');
const clustersDB = require("../dataBase/clustersDB")
const validate = require("./validates/clustersValidation")

const clustersRouter = express.Router();

//// GET ////
clustersRouter.get('/', async (req, res)=>{

    let result; 
    
    if(req.query){
        result = await clustersDB.getLimmitedClusters(req.query.limit, req.query.offset);
    }
    else{
        result = await clustersDB.getClusters();
    }
    
    if (!result){
        res.status(400).send("something went worng, please try again.");
        return;
    }

    res.status(200).send(result);
});

//// POST ////
clustersRouter.post('/new/newCluster', async (req, res)=>{
    const {error, value} = validate.newClusterValidation(req.body);

    if(!error){
        res.status(400).send(error.details.map(detail => detail.message).join('\n'))
        return;
    }

    const result = await clustersDB.addCluster(req.body);

    if(!result){
        res.status(400).send("something went wrong, please try again.");
        return;
    }

    res.status(200).send(result);
});

// //// PUT ////
clustersRouter.put('/:id/update', async (req, res)=>{
    const {error, value} = validate.updateClusterValidation(req.body);

    if(!error){
        res.status(400).send(error.details.map(detail => detail.message).join('\n'))
        return;
    }

    const result = await clustersDB.updateClusterById(req.params, req.body);


    if (!result) {
        res.status(400).send("something went wrong, please try again");
        return;
    }

    res.status(200).send(result);
} );

// //// DELETE ////
clustersRouter.delete('/:id/delete', async (req, res)=>{
    
    const result = await clustersDB.deleteClusterById(req.params);

    if (!result){
        res.status(400).send("something went worng, please try again.");
        return;
    }

    res.status(200).send(result);

});

module.exports = clustersRouter;