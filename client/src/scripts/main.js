/**
 * Created by jgluhov on 05/02/16.
 */
import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import '../styles/main.styl';
import {THREE} from 'three.js/node_modules/three';

import Box from './box';
import FormHandle from './formHandle';

(function() {

	function main() {

		let scene = new THREE.Scene();
		let cube = null;
		var windowHalfX = window.innerWidth / 2;
		var windowHalfY = window.innerHeight / 2;
		var targetRotation = 0;
		var targetRotationOnMouseDown = 0;

		var mouseX = 0;
		var mouseXOnMouseDown = 0;
		let camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 1, 1000 );
		camera.position.z = 5;

		let formHandle = new FormHandle('controlsForm');


		formHandle.observe().subscribe(
			(triangulations) => {
				let geometry = createGeometryByTriangulations(triangulations);

				for ( let i = 0; i < geometry.faces.length; i += 2 ) {

					var hex = Math.random() * 0xffffff;
					geometry.faces[ i ].color.setHex( hex );
					geometry.faces[ i + 1 ].color.setHex( hex );

				}

				var material = new THREE.MeshBasicMaterial( { side: THREE.DoubleSide, vertexColors: THREE.FaceColors, overdraw: 0.5 } );

				cube = new THREE.Mesh( geometry, material );

				scene.add( cube );
			},
			(err) => console.log(err));


		// Create renderer
		let renderer = new THREE.WebGLRenderer();
		renderer.setClearColor( 0xf0f0f0 );
		renderer.setPixelRatio( window.devicePixelRatio );
		renderer.setSize( window.innerWidth, window.innerHeight );

		document.body.appendChild( renderer.domElement );

		window.addEventListener( 'resize', onWindowResize, false );

		let render = function () {
			requestAnimationFrame( render );
			if(cube) cube.rotation.x += 0.005;
			if(cube) cube.rotation.y += 0.005;
			renderer.render(scene, camera);
		};

		render();

		// Create box geometry
		function createGeometryByTriangulations(triangulations) {

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

		function onWindowResize() {

			windowHalfX = window.innerWidth / 2;
			windowHalfY = window.innerHeight / 2;

			camera.aspect = window.innerWidth / window.innerHeight;
			camera.updateProjectionMatrix();

			renderer.setSize( window.innerWidth, window.innerHeight );

		}

	}

	document.addEventListener('DOMContentLoaded', main);



})();