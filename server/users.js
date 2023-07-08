const express = require('express');
const validate = require('./validates/usersValifates');
const usersDB = require('../dataBase/usersDB');

const usersRouter = express.Router();

//// GET ////

usersRouter.get('/login', async (req, res)=>{
    
   const { error, value } =  validate.userLoginDetailsValidate(req.body)

    if(error){
        res.status(400).send(error.details.map(detail => detail.message).join('\n'))
        return;
    }
    
    const result = await usersDB.getUserByUsername(req.body);

    if(!result){
        res.status(400).send("username or password incorrect");
        return;
    }

    res.status(200).send(result);
});

usersRouter.get('/:username', async (req, res)=>{

    const result = await usersDB.getUserByUsername(req.params);

    if(!result){
        res.status(400).send("username or password incorrect");
        return;
    }

    res.status(200).send(result);
});

usersRouter.get('/:username/all', async (req, res)=>{

    const userDetailes = usersDB.getUserByUsername(req.params);

    if(userDetailes.access_level_id != 1){
        res.status(403).send(`${req.params.username} does not have access for this action.`);
        return;
    }

    const result = await usersDB.getUsers(req.params);

    if(!result){
        res.status(400).send("something went wrong, please try again");
        return;
    }

    res.status(200).send(result);
});

//// POST ////
usersRouter.post('/register', async (req, res)=>{
 
    const {error, value} = validate.userRegisterDetailsValidate(req.body);

    if(error){
        res.status(400).send(error.details.map(detail => detail.message).join('\n'))
        return;
    }

    const result = await usersDB.addUser(req.body);

    if(!result){
        res.status(400).send("something went wrong, please try again");
        return;
    }

    res.status(201).send(result);
});

//// PUT ////
usersRouter.put('/:username/update', async (req, res)=>{
  
    const {error, value} = validate.userUpdateDetailsValidate(req.body);

    if(error){
        res.status(400).send(error.details.map(detail => detail.message).join('\n'))
        return;
    }

    const result = await usersDB.updateUser(req.body);

    if(!result){
        res.status(400).send("something went wrong, please try again");
        return;
    }

    res.status(200).send(result);
});

//// DELETE ////
usersRouter.delete('/:username/delete', async (req, res) => {

    const result = await usersDB.deleteUserByUsername(req.params);
    
    if(!result){
        res.status(400).send("something went wrong, please try again");
        return;
    }

    res.status(200).send("user had been deleted");
});

module.exports = usersRouter;