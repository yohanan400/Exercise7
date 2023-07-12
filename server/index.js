const Joi = require('joi');
const express = require('express');
const fileUpload = require('express-fileupload');

const usersRouter = require('./users')
const articlesRouter = require('./articles')
const summeriesRouter = require('./summaries')
//import {usersRouter} from "./users";


const app = express();
app.use(express.json());
app.use(fileUpload());
app.use(express.static('public'));



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
app.use('/articles', articlesRouter);
app.use('/summeries', summeriesRouter);