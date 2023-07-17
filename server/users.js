const express = require('express');
const validate = require('./validates/usersValidates');
const usersDB = require('../dataBase/usersDB');
const { json } = require('stream/consumers');

const usersRouter = express.Router();

//// GET ////
usersRouter.get('/info/:username', async (req, res)=>{
    
    const result = await usersDB.getUserByUsername(req.params);
    
    if(!result[0]){
        res.status(400).send("username or password incorrect");
        return;
    }
    
    res.status(200).send(result);
});

usersRouter.get('/all/:username', async (req, res)=>{
    
    const userDetailes = await usersDB.getUserByUsername(req.params);
    if(userDetailes[0].access_level_Id !== 1){
        res.status(403).send(`${req.params.username} does not have access for this action.`);
        return;
    }
    
    const result = await usersDB.getUsers(req.params);
    
    if(!result[0]){
        res.status(400).send("something went wrong, please try again");
        return;
    }
    console.log(result[0]);
    res.status(200).send(result);
});

//// POST ////
usersRouter.post('/login', async (req, res)=>{
   const { error, value } =  validate.userLoginDetailsValidate(req.body)

    if(error){
        res.status(400).send(error.details.map(detail => detail.message).join('\n'))
        return;
    }
    
    const result = await usersDB.getUserByUsername(req.body);

    if(!result[0]){
        res.status(400).send("username or password incorrect");
        return;
    }
    
    if(result[0].password != req.body.password){
        res.status(400).send("username or password incorrect");
        return;
    }

    res.status(200).send(result);
});

usersRouter.post('/register', async (req, res)=>{
 
    const {error, value} = validate.userRegisterDetailsValidate(req.body);

    if(error){
        res.status(400).send(error.details.map(detail => detail.message).join('\n'))
        return;
    }

    const result = await usersDB.addUser(req.body);

    if(!result[0]){
        res.status(400).send("something went wrong, please try again");
        return;
    }

    res.status(201).send(result.toString());
});

//// PUT ////
usersRouter.put('/update/:username', async (req, res)=>{
  
    const {error, value} = validate.userUpdateDetailsValidate(req.body);

    if(error){
        res.status(400).send(error.details.map(detail => detail.message).join('\n'))
        return;
    }


    const newDetaild = {...req.body, ...req.params}
    const result = await usersDB.updateUser(newDetaild);

    if(!result[0]){
        res.status(400).send("something went wrong, please try again");
        return;
    }

    res.status(200).send(result);
});

//// DELETE ////
usersRouter.delete('/delete/:username', async (req, res) => {

    const result = await usersDB.deleteUserByUsername(req.params);
    
    if(!result[0]){
        res.status(400).send("something went wrong, please try again");
        return;
    }

    res.status(200).send("user had been deleted");
});

module.exports = usersRouter;