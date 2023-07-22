const express = require('express');
const categoriesDB = require("../dataBase/categoryDB")

const categoriesRouter = express.Router();

//// GET ////
categoriesRouter.get('/', async (req, res)=>{

    let result; 
    
    if(req.query.limit){
        result = await categoriesDB.getLimmitedCategories(req.query.limit, req.query.offset);
    }
    else{
        result = await categoriesDB.getCategories();
    }
    
    if (!result){
        res.status(400).send("something went worng, please try again.");
        return;
    }

    res.status(200).send(result);
});

//// POST ////
categoriesRouter.post('/new', async (req, res)=>{

    const result = await categoriesDB.addCategory(req.body);

    if(!result){
        res.status(400).send("something went wrong, please try again.");
        return;
    }

    res.status(200).send(result);
});

// //// PUT ////
categoriesRouter.put('/update/:id', async (req, res)=>{
 
    const newDetaild = {...req.body, ...req.params}
    const result = await categoriesDB.updateCategoryById(newDetaild);

    if (!result) {
        res.status(400).send("something went wrong, please try again");
        return;
    }

    res.status(200).send(result);
} );

// //// DELETE ////
categoriesRouter.delete('/delete/:id', async (req, res)=>{
    
    const result = await categoriesDB.deleteCategory(req.params);

    if (!result){
        res.status(400).send("something went worng, please try again.");
        return;
    }

    res.status(200).send(result);

});

module.exports = categoriesRouter;