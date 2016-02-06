/**
 * Created by jgluhov on 05/02/16.
 */
import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import '../styles/main.styl';
import {THREE} from 'three.js/node_modules/three';
import Box from './box';

(function() {

	function main() {

		let scene = new THREE.Scene();

		let camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 1, 1000 );
		camera.position.z = 4;
		camera.position.x = -2;

		let box = new Box();
		let triangulations = box.triangulate(1,1,1);
		let geometry = createGeometry(triangulations);

		console.log(geometry)

		function createGeometry(triangulations) {

			let geometry = new THREE.Geometry();

			for(let triangle of triangulations) {
				let i = geometry.vertices.length;
				for(let j = 0; j < triangle.length; j++) {
					geometry.vertices.push(new THREE.Vector3(triangle[i].x, triangle[i].y, triangle[i].z))
				}
				geometry.faces.push( new THREE.Face3 (i, i+1, i+2))
			}

			return geometry;
		}



		//geometry.vertices.push(
		//
		//	new THREE.Vector3(
		//		triangulations.vertices[0].x,
		//		triangulations.vertices[0].y,
		//		triangulations.vertices[0].z
		//	),
		//	new THREE.Vector3(
		//		triangulations.vertices[2].x,
		//		triangulations.vertices[2].y,
		//		triangulations.vertices[2].z
		//	),
		//	new THREE.Vector3(
		//		triangulations.vertices[3].x,
		//		triangulations.vertices[3].y,
		//		triangulations.vertices[3].z
		//	)
		//);

		//geometry.faces.push( new THREE.Face3( 0, 1, 2 ) );
		//
		//var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
		//
		//var cube = new THREE.Mesh( geometry, material );
		//scene.add( cube );



		// Create renderer
		let renderer = new THREE.WebGLRenderer();
		renderer.setClearColor( 0x434343 );
		renderer.setPixelRatio( window.devicePixelRatio );
		renderer.setSize( window.innerWidth, window.innerHeight );

		document.body.appendChild( renderer.domElement );

		let render = function () {
			requestAnimationFrame( render );
			renderer.render(scene, camera);
		};

		render();

	}

	document.addEventListener('DOMContentLoaded', main)

})();