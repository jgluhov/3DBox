/**
 * Created by jgluhov on 07/02/16.
 */

import {THREE} from 'three.js/node_modules/three';
import BoxGeometry from './boxGeometry';

export default class Cube extends THREE.Mesh {
	constructor(triangulations) {
		let geometry = new BoxGeometry(triangulations);

		let material = new THREE.MeshBasicMaterial( {
			side: THREE.DoubleSide,
			vertexColors: THREE.FaceColors,
			overdraw: 0.5
		} );
		geometry.setColours();
		super(geometry, material);
		this.matrixAutoUpdate = true;
	}

	update(triangulations) {
		this.geometry.update(triangulations);
	}


}