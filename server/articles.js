const express = require('express');
const validate = require('./validates/articlesValidation');
const articlesDB = require('../dataBase/articlesDB');

const articlesRouter = express.Router();

//// GET ////
articlesRouter.get('/', async (req, res)=>{
    const result = await articlesDB.getArticles();

    if (!result){
        res.status(400).send("something went worng, please try again.");
        return;
    }

    res.status(200).send(result);
});

articlesRouter.get('/:category', async(req, res)=>{
    const result = await articlesDB.getArticlesByCategory(req.params);

    if (!result){
        res.status(400).send("something went worng, please try again.");
        return;
    }

    res.status(200).send(result);
} );

articlesRouter.get('/:title', async(req, res)=>{
    const result = await articlesDB.getArticleByTitle(req.params);

    if (!result){
        res.status(400).send("something went worng, please try again.");
        return;
    }

    res.status(200).send(result);
} );

articlesRouter.get('/:username', async(req, res)=>{
    const result = await articlesDB.getArticlesByUsername(req.params);

    if (!result){
        res.status(400).send("something went worng, please try again.");
        return;
    }

    res.status(200).send(result);
} );

//// POST ////
articlesRouter.post('/newArticle', async (req, res)=>{
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
articlesRouter.put('/:articleId/update', async (req, res)=>{
    const {error, value} = validate.updateArticleValidation(req.body);

    if(!error){
        res.status(400).send(error.details.map(detail => detail.message).join('\n'))
        return;
    }

    const result = await articlesDB.updateArticleById(req.params, req.body);

    if (!result) {
        res.status(400).send("something went wrong, please try again");
        return;
    }

    res.status(200).send("article successfully updated");
} );

//// DELETE ////
articlesRouter.delete('/:articleId/delete', async (req, res)=>{
    
    const result = await articlesDB.deleteArticleById(req.params);

    if (!result){
        res.status(400).send("something went worng, please try again.");
        return;
    }

    res.status(200).send(result);

});

module.exports = articlesRouter;