/**
 * Created by jgluhov on 06/02/16.
 */
var express = require('express');
var url = require('url');
var router = express.Router();

const box = require('../addons/build/Release/box');

// define the home page route
router.get('/', function(req, res) {
	res.send('3DBox Server.');
});

router.get('/triangulate', function(req, res) {
	var parts = url.parse(req.url, true);
	var query = parts.query;

	var triangulations = box.triangulate(query.length, query.width, query.height);

	res.json(triangulations);
});

module.exports = router;