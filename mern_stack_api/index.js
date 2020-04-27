require('./DB');

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

var postMessageRoutes = require('./controller/postMessageController');

var app = express();
app.use(bodyParser.json());
app.use(cors({origin:'http://localhost:3000'}))
app.listen(4000, () => console.log("Server Started At: 4000"));

app.use('/postMessages', postMessageRoutes);