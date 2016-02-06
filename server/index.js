'use strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const hostname = '127.0.0.1';
const port = 1337;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
	res.send('3DBox Server.');
});

app.get('/compute', (req, res) => {
	res.end('Compute');
});

app.listen(port, hostname, () => {
	console.log(`Server running at http://${hostname}:${port}`);
});