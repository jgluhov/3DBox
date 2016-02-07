/**
 * Created by jgluhov on 06/02/16.
 */
var express = require('express');
var url = require('url');
var router = express.Router();

// define the home page route
router.get('/', function(req, res) {
	res.send('3DBox Server.');
});

// define triangulations handles
function Box() {

		this.vertices = [];
		this.triangles = [];
		this.triangulations = [];


	this.getFaces = function(){
		return this.triangles;
	};

	this.getVertices = function() {
		return this.vertices;
	};

	this.generateVertices = function(length, width, height) {
		//this.vertices.push(this.createVertex(0, 0, 0));  // 0
		//this.vertices.push(this.createVertex(0, length, 0)); // 1
		//this.vertices.push(this.createVertex(0, 0, height)); // 2
		//this.vertices.push(this.createVertex(0, length, height)); // 3
		//this.vertices.push(this.createVertex(width, 0, 0)); // 4
		//this.vertices.push(this.createVertex(width, 0, height)); // 5
		//this.vertices.push(this.createVertex(width, length, 0)); // 6
		//this.vertices.push(this.createVertex(width, length, height)); // 7

		//length => x
		//width => y
		//height => x

		this.vertices.push(this.createVertex(-width/2, -length/2, 0));  // 0
		this.vertices.push(this.createVertex(-width/2, length/2, 0)); // 1
		this.vertices.push(this.createVertex(-width/2, -length/2, height)); // 2
		this.vertices.push(this.createVertex(-width/2, length/2, height)); // 3
		this.vertices.push(this.createVertex(width/2, -length/2, 0)); // 4
		this.vertices.push(this.createVertex(width/2, -length/2, height)); // 5
		this.vertices.push(this.createVertex(width/2, length/2, 0)); // 6
		this.vertices.push(this.createVertex(width/2, length/2, height)); // 7
	};

	this.generateTriangulations = function() {
		this.triangles.forEach((face) => {
			this.triangulations.push(
				[
					this.vertices[face.a],
					this.vertices[face.b],
					this.vertices[face.c]
				]
			)
		});
	};

	this.generateFaces = function(){
		this.triangles = [
			{a: 0, b: 6, c: 1},
			{a: 0, b: 4, c: 6},

			{a: 2, b: 7, c: 3},
			{a: 2, b: 5, c: 7},

			{a: 0, b: 3, c: 2},
			{a: 0, b: 1, c: 3},

			{a: 1, b: 3, c: 7},
			{a: 1, b: 7, c: 6},

			{a: 6, b: 7, c: 5},
			{a: 6, b: 5, c: 4},

			{a: 4, b: 5, c: 2},
			{a: 4, b: 2, c: 0}
		];
	}

	this.createVertex = function(x, y, z){
		return {x:x, y:y, z:z};
	}


	this.triangulate = function(length, width, height) {
		console.log(length, width, height)
		this.generateVertices(length, width, height);
		this.generateFaces();
		this.generateTriangulations();

		/**
		 * Return triangulations object
		 */
		return this.triangulations;
	}
}


router.get('/triangulate', function(req, res) {
	var parts = url.parse(req.url, true);
	var query = parts.query;

	var box = new Box();
	var triangulations = box.triangulate(query.length, query.width, query.height);

	res.json(triangulations);
});

module.exports = router;