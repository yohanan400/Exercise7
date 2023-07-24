const express = require('express');
const rolesDB = require("../dataBase/rolesDB");

const rolesRouter = express.Router();

//// GET ////
rolesRouter.get('/', async (req, res)=>{

    let result; 
    
    if(req.query.limit){
        result = await rolesDB.getLimmitedRoles(req.query.limit, req.query.offset);
    }
    else{
        result = await rolesDB.getRoles();
    }
    
    if (!result){
        res.status(400).send("something went worng, please try again.");
        return;
    }

    res.status(200).send(result);
});

//// POST ////
rolesRouter.post('/new', async (req, res)=>{

    const result = await rolesDB.addRole(req.body);

    if(!result){
        res.status(400).send("something went wrong, please try again.");
        return;
    }

    res.status(200).send(result);
});

// //// PUT ////
rolesRouter.put('/update/:id', async (req, res)=>{
 
    const newDetaild = {...req.body, ...req.params}
    const result = await rolesDB.updateRoleById(newDetaild);

    if (!result) {
        res.status(400).send("something went wrong, please try again");
        return;
    }

    res.status(200).send(result);
} );

// //// DELETE ////
rolesRouter.delete('/delete/:id', async (req, res)=>{
    
    const result = await rolesDB.deleteRole(req.params);

    if (!result){
        res.status(400).send("something went worng, please try again.");
        return;
    }

    res.status(200).send(result);

});

module.exports = rolesRouter;