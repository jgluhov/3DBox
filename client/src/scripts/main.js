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
		camera.position.z = 5;


		let box = new Box();
		let cube;
		//let triangulations = box.triangulate(1,1,1);
		//let geometry = parseTriangulations(triangulations);
		//
		//let material = new THREE.MeshNormalMaterial({side: THREE.DoubleSide});
		//let cube = new THREE.Mesh( geometry, material );
		//
		//scene.add( cube );

		// Create box geometry
		function parseTriangulations(triangulations) {

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

		//render();

		let controlsForm = document.getElementById('controlsForm');

		// Events helper
		let addEventListener = (function() {
			if(document.addEventListener) {
				return function(element, event, handler) {
					element.addEventListener(event, handler, false);
				};
			}
			else {
				return function(element, event, handler) {
					element.attachEvent('on' + event, handler);
				};
			}
		}());

		addEventListener(controlsForm, 'submit', (e) => {
			e.preventDefault();

			let length = controlsForm.elements.boxLength.value;
			let width = controlsForm.elements.boxWidth.value;
			let height = controlsForm.elements.boxHeight.value;

			let xhr = new XMLHttpRequest();

			xhr.open('GET', `
		http://localhost:1337/triangulate?
		length=${length}&
		width=${width}&
		height=${height}`, true);
			xhr.setRequestHeader('Content-Type', 'application/json');
			xhr.send();

			xhr.onreadystatechange = () => {
				if (xhr.readyState != 4) return;

				if (xhr.status != 200) {
					console.log(xhr.status + ': ' + xhr.statusText);
				} else {
					let triangulations = JSON.parse(xhr.responseText);

					let geometry = parseTriangulations(triangulations);

					let material = new THREE.MeshNormalMaterial({side: THREE.DoubleSide});
					cube = new THREE.Mesh( geometry, material );

					scene.add( cube );

					render();
				}

			}

		})

	}

	document.addEventListener('DOMContentLoaded', main);



})();