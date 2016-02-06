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
		let width = window.innerWidth;
		let height = window.innerHeight;

		let camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 1, 1000 );
		camera.position.z = 5;

		let box = new Box();
		let triangulations = box.triangulate(1,1,1);
		let geometry = createGeometry(triangulations);

		let material = new THREE.MeshNormalMaterial({side: THREE.DoubleSide});
		let cube = new THREE.Mesh( geometry, material );


		scene.add( cube );

		// Create box geometry
		function createGeometry(triangulations) {

			let geometry = new THREE.Geometry();

			for(let triangle of triangulations) {
				let i = geometry.vertices.length;

				for(let j = 0; j < triangle.length; j++) {
					geometry.vertices.push(new THREE.Vector3(triangle[j].x, triangle[j].y, triangle[j].z))
				}
				geometry.faces.push( new THREE.Face3 (i, i+1, i+2))
			}

			return geometry;
		}


		// Create renderer
		let renderer = new THREE.WebGLRenderer();
		renderer.setClearColor( 0x434343 );
		renderer.setPixelRatio( window.devicePixelRatio );
		renderer.setSize( window.innerWidth, window.innerHeight );

		document.body.appendChild( renderer.domElement );

		let render = function () {
			requestAnimationFrame( render );

			cube.rotation.x += 0.005;
			cube.rotation.y += 0.01;

			renderer.render(scene, camera);
		};

		render();

	}

	document.addEventListener('DOMContentLoaded', main)

})();