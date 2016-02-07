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

		let camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 1, 1000 );
		camera.position.z = 5;


		//let triangulations = box.triangulate(1,1,1);
		//let geometry = parseTriangulations(triangulations);
		//
		//let material = new THREE.MeshNormalMaterial({side: THREE.DoubleSide});
		//let cube = new THREE.Mesh( geometry, material );
		//
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

		let formHandle = new FormHandle('controlsForm');
		formHandle.observe().subscribe(
			(triangulations) => {
				let geometry = createGeometryByTriangulations(triangulations);


				let material = new THREE.MeshNormalMaterial({side: THREE.DoubleSide});
				let cube = new THREE.Mesh( geometry, material );

				scene.add( cube );

				let light = new THREE.PointLight();
				light.position.set(5, 5, 5);
				scene.add(this.light);

				render();
			},
			(err) => {
				console.log(err)
			});


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

	//	addEventListener(controlsForm, 'submit', (e) => {
	//		e.preventDefault();
	//
	//		let length = controlsForm.elements.boxLength.value;
	//		let width = controlsForm.elements.boxWidth.value;
	//		let height = controlsForm.elements.boxHeight.value;
	//
	//		let xhr = new XMLHttpRequest();
	//
	//		xhr.open('GET', `
	//	http://localhost:1337/triangulate?
	//	length=${length}&
	//	width=${width}&
	//	height=${height}`, true);
	//		xhr.setRequestHeader('Content-Type', 'application/json');
	//		xhr.send();
	//
	//		xhr.onreadystatechange = () => {
	//			if (xhr.readyState != 4) return;
	//
	//			if (xhr.status != 200) {
	//				console.log(xhr.status + ': ' + xhr.statusText);
	//			} else {
	//				let triangulations = JSON.parse(xhr.responseText);
	//
	//				let geometry = parseTriangulations(triangulations);
	//
	//				let material = new THREE.MeshNormalMaterial({side: THREE.DoubleSide});
	//				cube = new THREE.Mesh( geometry, material );
	//
	//				scene.add( cube );
	//
	//				render();
	//			}
	//
	//		}
	//
	//	})
	//
	}

	document.addEventListener('DOMContentLoaded', main);



})();