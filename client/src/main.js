/**
 * Created by jgluhov on 05/02/16.
 */
import 'bootstrap/dist/css/bootstrap.css';
import './styles/main.styl';
import {THREE} from 'three.js';

(function() {

	function main() {

		var scene = new THREE.Scene();

		var camera = new THREE.PerspectiveCamera( 70, window.innerWidth/window.innerHeight, 1, 1000 );
		camera.position.z = 500;


		var renderer = new THREE.WebGLRenderer();
		renderer.setClearColor( 0x434343 );
		renderer.setPixelRatio( window.devicePixelRatio );
		renderer.setSize( window.innerWidth, window.innerHeight );
		document.body.appendChild( renderer.domElement );

		var geometry = new THREE.BoxGeometry( 200, 200, 200 );
		var material = new THREE.MeshBasicMaterial( { color: 0x838383 } );
		var cube = new THREE.Mesh( geometry, material );
		cube.rotateY(100);
		cube.rotateZ(90);
		cube.rotateX(150);


		scene.add( cube );


		var render = function () {
			requestAnimationFrame( render );
			renderer.render(scene, camera);
		};

		render();

	}

	document.addEventListener('DOMContentLoaded', main)

})();