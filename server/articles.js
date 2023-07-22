const express = require('express');
const validate = require('./validates/articlesValidation');
const articlesDB = require('../dataBase/articlesDB');

const articlesRouter = express.Router();

//// GET ////
articlesRouter.get('/', async (req, res)=>{

    let result;

    if (req.query.limit) {
        result = await articlesDB.getLimmitedArticles(req.query);
    }
    else {
        result = await articlesDB.getArticles();
    }

    if (!result){
        res.status(400).send("something went worng, please try again.");
        return;
    }

    res.status(200).send(result);
});

articlesRouter.get('/byCategory/:category', async(req, res)=>{
    const result = await articlesDB.getArticlesByCategory(req.params);

    if (!result){
        res.status(400).send("something went worng, please try again.");
        return;
    }

    res.status(200).send(result);
} );

articlesRouter.get('/byTitle/:title', async(req, res)=>{
    const result = await articlesDB.getArticleByTitle(req.params);

    if (!result){
        res.status(400).send("something went worng, please try again.");
        return;
    }

    res.status(200).send(result);
} );

articlesRouter.get('/byUsername/:username', async(req, res)=>{
    const result = await articlesDB.getArticlesByUsername(req.params);

    if (!result){
        res.status(400).send("something went worng, please try again.");
        return;
    }

    res.status(200).send(result);
} );

//// POST ////
articlesRouter.post('/new', async (req, res)=>{
    const {error, value} = validate.newArticleValidation(req.body);

    if(!error){
        res.status(400).send(error.details.map(detail => detail.message).join('\n'))
        return;
    }

    const result = await articlesDB.addArticle(req.body);

    if(!result){
        res.status(400).send("something went wrong, please try again.");
        return;
    }

    res.status(200).send(result);
});

//// PUT ////
articlesRouter.put('/update/:id', async (req, res)=>{
    const {error, value} = validate.updateArticleValidation(req.body);

    if(!error){
        res.status(400).send(error.details.map(detail => detail.message).join('\n'))
        return;
    }

    const newDetaild = {...req.body, ...req.params}
    const result = await articlesDB.updateArticleById(newDetaild);

    if (!result) {
        res.status(400).send("something went wrong, please try again");
        return;
    }

    res.status(200).send("article successfully updated");
} );

//// DELETE ////
articlesRouter.delete('/delete/:id', async (req, res)=>{
    
    const result = await articlesDB.deleteArticleById(req.params);

    if (!result){
        res.status(400).send("something went worng, please try again.");
        return;
    }

    res.status(200).send(result);
});

module.exports = articlesRouter;