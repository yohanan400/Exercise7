const Joi = require('joi');
const express = require('express');
const fileUpload = require('express-fileupload');

const usersRouter = require('./users')
const articlesRouter = require('./articles')
const summeriesRouter = require('./summaries')
const videosRouter = require('./videos')
const clustersRouter = require('./clusters')
const postsRouter = require('./posts')
const commentsRouter = require('./comments')

const app = express();
app.use(express.json());
app.use(fileUpload());
app.use(express.static('public'));

app.use('/users', usersRouter);
app.use('/articles', articlesRouter);
app.use('/summeries', summeriesRouter);
app.use('/videos', videosRouter);
app.use('/clusters', clustersRouter);
app.use('/posts', postsRouter);
app.use('/comments', commentsRouter);

const port = process.env.PORT || 3001;
app.listen(port, ()=> console.log(`listening to ${port}..`));

