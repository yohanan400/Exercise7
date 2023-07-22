const express = require('express');
const postsDB = require("../dataBase/postsDB")
const validate = require("./validates/postsValidations")

const postsRouter = express.Router();

//// GET ////
postsRouter.get('/', async (req, res)=>{

    let result; 
    
    if(req.query.limit){
        result = await postsDB.getLimmitedPosts(req.query.limit, req.query.offset);
    }
    else{
        result = await postsDB.getPosts();
    }
    
    if (!result){
        res.status(400).send("something went worng, please try again.");
        return;
    }

    res.status(200).send(result);
});

postsRouter.get('/byId/:id', async (req, res)=>{
    const result = await postsDB.getPostById(req.params);

    if(!result){
        res.status(400).send("something went wrong, please try again.");
        return;
    }

    res.status(200).send(result);
});

postsRouter.get('/byCategory/:category', async (req, res)=>{
    const result = await postsDB.getPostsByCategory(req.params);

    if(!result){
        res.status(400).send("something went wrong, please try again.");
        return;
    }

    res.status(200).send(result);
});

postsRouter.get('/all/:username', async (req, res)=>{
    const result = await postsDB.getPostsByUsername(req.params);

    if(!result){
        res.status(400).send("something went wrong, please try again.");
        return;
    }

    res.status(200).send(result);
});

//// POST ////
postsRouter.post('/new', async (req, res)=>{
    const {error, value} = validate.newPostValidation(req.body);

    if(!error){
        res.status(400).send(error.details.map(detail => detail.message).join('\n'))
        return;
    }

    const result = await postsDB.addPost(req.body);

    if(!result){
        res.status(400).send("something went wrong, please try again.");
        return;
    }

    res.status(200).send(result);
});

// //// PUT ////
postsRouter.put('/update/:id', async (req, res)=>{
    const {error, value} = validate.updatePostValidation(req.body);

    if(!error){
        res.status(400).send(error.details.map(detail => detail.message).join('\n'))
        return;
    }

    const newDetaild = {...req.body, ...req.params}
    const result = await postsDB.updatePostById(newDetaild);


    if (!result) {
        res.status(400).send("something went wrong, please try again");
        return;
    }

    res.status(200).send(result);
} );

// //// DELETE ////
postsRouter.delete('/delete/:id', async (req, res)=>{
    
    const result = await postsDB.deletePostById(req.params);

    if (!result){
        res.status(400).send("something went worng, please try again.");
        return;
    }

    res.status(200).send(result);

});

module.exports = postsRouter;