const express = require('express');
const app = express();

const mongoose = require('mongoose');

const bodyParser = require('body-parser');

const cors = require('cors');

require('./models/config.js');
const postsRoute = require('./routes/postController');

app.use(bodyParser.json());
app.use(cors());
app.use('/posts', postsRoute);

app.listen(5500,()=>{
    console.log("server started : 5500")
});