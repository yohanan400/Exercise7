const Joi = require('joi');
const express = require('express');
const fileUpload = require('express-fileupload');

const usersRouter = require('./users')
const articlesRouter = require('./articles')
const summeriesRouter = require('./summaries')
const videosRouter = require('./videos')
const clustersRouter = require('./clusters')
const postsRouter = require('./posts')
const commentsRouter = require('./comments');
const categoriesRouter = require('./categories');
const rolesRouter = require('./roles');
const accessLevelRouter = require('./accessLevel');

const app = express();
app.use(express.json());
app.use(fileUpload());
app.use(express.static('public'));
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', '*');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.use('/users', usersRouter);
app.use('/articles', articlesRouter);
app.use('/summeries', summeriesRouter);
app.use('/videos', videosRouter);
app.use('/clusters', clustersRouter);
app.use('/posts', postsRouter);
app.use('/comments', commentsRouter);
app.use('/Categories', categoriesRouter);
app.use('/roles', rolesRouter);
app.use('/accessLevel', accessLevelRouter);

const port = process.env.PORT || 3001;
app.listen(port, ()=> console.log(`listening to ${port}..`));

