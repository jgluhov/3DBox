/**
 * Created by jgluhov on 06/02/16.
 */

export default class Box {
	constructor() {
		this.vertices = [];
		this.triangles = [];
		this.triangulations = [];
	}

	generateVertices(length, width, height) {
		this.vertices.push(this.createVertex(0, 0, 0));  // 0
		this.vertices.push(this.createVertex(0, length, 0)); // 1
		this.vertices.push(this.createVertex(0, 0, height)); // 2
		this.vertices.push(this.createVertex(0, length, height)); // 3
		this.vertices.push(this.createVertex(width, 0, 0)); // 4
		this.vertices.push(this.createVertex(width, 0, height)); // 5
		this.vertices.push(this.createVertex(width, length, 0)); // 6
		this.vertices.push(this.createVertex(width, length, height)); // 7
	}

	generateTriangulations() {
		this.triangles.forEach((face) => {
			this.triangulations.push(
					[
						this.vertices[face.a],
						this.vertices[face.b],
						this.vertices[face.c]
					]
			)
		});
	}

	generateFaces() {
		this.triangles = [
			{ a: 0, b: 1, c: 6 },
			{ a: 0, b: 4, c: 6 },

			{ a: 2, b: 3, c: 7 },
			{ a: 2, b: 5, c: 7 },

			{ a: 0, b: 2, c: 3 },
			{ a: 0, b: 1, c: 3 },

			{ a: 1, b: 3, c: 7 },
			{ a: 1, b: 6, c: 7 },

			{ a: 6, b: 7, c: 5 },
			{ a: 6, b: 4, c: 5 },

			{ a: 4, b: 5, c: 2 },
			{ a: 4, b: 0, c: 2 }
		];
	}

	createVertex(x,y,z) {
		return {x,y,z};
	}

	createFace(a,b,c) {
		return {a,b,c};
	}

	triangulate(length, width, height) {
		this.generateVertices(length, width, height);
		this.generateFaces();
		this.generateTriangulations();

		/**
		 * Return triangulations object
		 */
		return this.triangulations;
	}

}