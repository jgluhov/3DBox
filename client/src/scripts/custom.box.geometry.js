/**
 * Created by jgluhov on 06/02/16.
 */
import {THREE} from 'three.js/node_modules/three';

export default class CustomBoxGeometry extends THREE.Geometry {
	/**
	 * Create a box geometry.
	 * @param {array} triangulations - Array of triangulations received from server
	 */
	constructor(triangulations) {
		super();
		this.parse(triangulations);
		this.computeFaceNormals();
	}
	parse(triangulations) {
		this.faces = [];
		this.vertices = [];

		for(let triangle of triangulations) {
			let i = this.vertices.length;

			for(let j = 0; j < triangle.length; j++) {
				this.vertices.push(new THREE.Vector3(triangle[j].x, triangle[j].y, triangle[j].z))
			}
			this.faces.push( new THREE.Face3 (i, i+1, i+2))
		}
	}
}