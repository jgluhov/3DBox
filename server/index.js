'use strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./routes');

const hostname = '127.0.0.1';
const port = 1337;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', routes);

app.listen(port, hostname, () => {
	console.log(`Server running at http://${hostname}:${port}`);
});