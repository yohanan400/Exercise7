const Joi = require('joi');
const express = require('express');

const usersRouter = require('./users')
//import {usersRouter} from "./users";


const app = express();
app.use(express.json());


/////// EXAMPLE //////////
app.get('/', (req, res)=>res.send("in the get"));

app.post('/api/register', (req, res)=>{
    const schema = Joi.object( {
        name : Joi.string().min(3).required()
    });

    const result = schema.validate(req.body);
    if(result.error){
        res.status(400).send(result.error.details[0].message)
    }
})
/////// END OF EXAMPLE //////////


const port = process.env.PORT || 3000;
app.listen(port, ()=> console.log(`listening to ${port}..`));


app.use('/users', usersRouter);