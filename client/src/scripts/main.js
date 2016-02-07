/**
 * Created by jgluhov on 05/02/16.
 */
import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import '../styles/main.styl';
import {THREE} from 'three.js/node_modules/three';
import * as Detector from 'three-detector';

import CustomBoxGeometry from './custom.box.geometry';
import FormHandle from './formHandle';

(function () {
	// Global scene object
	let scene;

	// Global camera object
	let camera;

	// Global mesh object of the cube
	let cubeMesh;

	// Global render object
	let renderer;

	// The cube has to rotate around all three axes, so we need three rotation values.
	// x, y and z rotation
	let xRotation = 0.0;
	let yRotation = 0.0;
	let zRotation = 0.0;

	// Initialize the scene
	initializeScene();

	// Animate the scene
	animateScene();

	/**
	 * Initialize the scene
	 */
	function initializeScene() {
		// Check whether the browser supports WebGL. If so, instantiate the hardware accelerated
		// WebGL renderer. For antialiasing, we have to enable it. The canvas renderer uses
		// antialiasing by default.

		if (Detector.webgl) {
			renderer = new THREE.WebGLRenderer({antialias: true});
		} else {
			// If its not supported, instantiate the canvas renderer to support all non WebGL
			// browsers
			renderer = new THREE.CanvasRenderer();
		}

		// Set the background color of the renderer to lightgray, with full opacity
		renderer.setClearColor(0x767676, 1);

		// Get the size of the inner window (content area) to create a full size renderer
		let canvasWidth = window.innerWidth;
		let canvasHeight = window.innerHeight;

		// Set the renderers size to the content areas size
		renderer.setSize(canvasWidth, canvasHeight);

		// Get the DIV element from the HTML document by its ID and append the renderers DOM
		// object to it
		document.getElementById("WebGLCanvas").appendChild(renderer.domElement);

		// Create the scene, in which all objects are stored.
		scene = new THREE.Scene();

		// Create the camera to look into scene.
		camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
		camera.position.set(500, 500, 500);
		camera.lookAt(scene.position);
		scene.add(camera);

		// Create a white basic material and activate the 'doubleSided' attribute to force the
		// rendering of both sides of each face (front and back).
		let boxMaterial = new THREE.MeshLambertMaterial({
			side: THREE.DoubleSide
		});

		// Add two point lights to set our world more like as on photo
		// Directional light doesn't suit for this as this ones.
		var pointLight1 = new THREE.PointLight(0xffffff);
		pointLight1.position.set(500,500,500);
		scene.add(pointLight1);

		var pointLight2 = new THREE.PointLight( 0xffffff, 1, 1000 );
		pointLight2.position.set( 250, 450, 250 );
		scene.add( pointLight2 );

		// Create a form handle to change dimensions of the box.
		let formHandle = new FormHandle('controlsForm');
		formHandle.observe().subscribe(
			(triangulations) => {
				scene.remove(cubeMesh);
				let boxGeometry = new CustomBoxGeometry(triangulations);
				cubeMesh = new THREE.Mesh(boxGeometry, boxMaterial);
				scene.add(cubeMesh);
			});
	}

	/**
	 * Animate the scene and call rendering.
	 */
	function animateScene() {

		if(cubeMesh) {
			// Increase the x, y and z rotation of the cube
			xRotation += 0.03;
			yRotation += 0.02;
			zRotation += 0.04;
			cubeMesh.rotation.set(xRotation, yRotation, zRotation);
		}


		// Define the function, which is called by the browser supported timer loop.
		requestAnimationFrame(animateScene);

		// Render the scene. Map the 3D world to the 2D screen.
		renderScene();
	}

	function renderScene() {
		// Update the scene and camera
		renderer.render(scene, camera);
	}

	/**
	 * Events handlers
	 */
	function onWindowResize() {
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();

		renderer.setSize(window.innerWidth, window.innerHeight);
	}

	window.addEventListener('resize', onWindowResize, false);

})();