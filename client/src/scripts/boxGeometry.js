/**
 * Created by jgluhov on 06/02/16.
 */
import {THREE} from 'three.js/node_modules/three';

export default class BoxGeometry extends THREE.Geometry {
	/**
	 * Create a box geometry.
	 * @param {array} triangulations - Array of triangulations received from server
	 */
	constructor(triangulations) {
		super();
		this.update(triangulations);
		this.dynamic = true;
		this.__dirtyVertices = true;
		this.__dirtyElements = true;
	}
	update(triangulations) {
		this.faces = [];
		this.vertices = [];

		for(let triangle of triangulations) {
			let i = this.vertices.length;

			for(let j = 0; j < triangle.length; j++) {
				this.vertices.push(new THREE.Vector3(triangle[j].x, triangle[j].y, triangle[j].z))
			}
			this.faces.push( new THREE.Face3 (i, i+1, i+2))
		}
		this.verticesNeedUpdate = true;
		this.elementsNeedUpdate = true;
		this.groupsNeedUpdate = true;
	}
	setColours() {
		for ( let i = 0; i < this.faces.length; i += 2 ) {

			var hex = Math.random() * 0xffffff;
			this.faces[ i ].color.setHex( hex );
			this.faces[ i + 1 ].color.setHex( hex );
		}
	}
}