/**
 * Created by jgluhov on 05/02/16.
 */
import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import '../styles/main.styl';
import {THREE} from 'three.js/node_modules/three';


import Cube from './cube';
import FormHandle from './formHandle';

(function() {

	/**
	 * Initialize the scene
	 */
	function initialize() {

		let scene = new THREE.Scene();
		let cube = null;
		let camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 1, 1000 );
		camera.position.z = 3;

		let formHandle = new FormHandle('controlsForm');
		formHandle.observe().subscribe(
			(triangulations) => {
				if(!cube) {
					cube = new Cube( triangulations );
					scene.add( cube );
				} else {
					scene.remove(cube);
					cube = new Cube( triangulations );
					scene.add( cube );
				}
			});


		// Create renderer
		let renderer = new THREE.WebGLRenderer({antialias:true});
		renderer.setClearColor( 0x767676 );
		renderer.setPixelRatio( window.devicePixelRatio );
		renderer.setSize( window.innerWidth, window.innerHeight );


		document.body.appendChild( renderer.domElement );

		let render = function () {
			requestAnimationFrame( render );
			renderer.render(scene, camera);
		};

		render();

		function onWindowResize() {
			camera.aspect = window.innerWidth / window.innerHeight;
			camera.updateProjectionMatrix();

			renderer.setSize( window.innerWidth, window.innerHeight );
		}

		window.addEventListener( 'resize', onWindowResize, false );
	}

	document.addEventListener('DOMContentLoaded', initialize);




})();