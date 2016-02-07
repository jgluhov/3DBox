/**
 * Created by jgluhov on 07/02/16.
 */

import {THREE} from 'three.js/node_modules/three';
import BoxGeometry from './custom.box.geometry';

export default class Cube extends THREE.Mesh {
	constructor(triangulations) {
		let geometry = new BoxGeometry(triangulations);


		geometry.setColours();
		super(geometry, material);
		this.matrixAutoUpdate = true;
	}

	update(triangulations) {
		this.geometry.update(triangulations);
	}


}