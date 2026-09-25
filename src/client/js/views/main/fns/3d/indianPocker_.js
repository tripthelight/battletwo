import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { VertexNormalsHelper } from 'three/addons/helpers/VertexNormalsHelper.js';

import { RectAreaLightUniformsLib } from 'three/addons/lights/RectAreaLightUniformsLib.js';
import { RectAreaLight } from 'three';
import { RectAreaLightHelper } from 'three/addons/helpers/RectAreaLightHelper.js';

import Stats from 'three/addons/libs/stats.module.js';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
import { radixSort } from 'three/addons/utils/SortUtils.js';

import throwObj from '@/client/js/module/errorHandler/throwObj';

export default () => {
  try {
		class App {
			constructor() {
				const divController = document.body;
				this._divController = divController;

				const renderer = new THREE.WebGLRenderer({ antialias: true });
				renderer.setPixelRatio(window.devicePixelRatio);
				renderer.shadowMap.enabled = true;
				divController.appendChild(renderer.domElement);

				this._renderer = renderer;

				const scene = new THREE.Scene();
				this._scene = scene;

				this._setupCamera();
				this._setupLight();
				this._setupModel();
				this._setupControls();

				window.onresize = this.resize.bind(this);
				this.resize();

				requestAnimationFrame(this.render.bind(this));
			}

			_setupCamera() {
				const width = window.innerWidth;
				const height = window.innerHeight;

				const camera = new THREE.PerspectiveCamera(
					75,
					width / height,
					0.1,
					100
				);

				// const aspect = width / height;
				// const camera = new THREE.OrthographicCamera(
				// 	-1*aspect, 1*aspect, // xLeft, xRight
				// 	1, -1, // yTop, yBottom
				// 	0.1, 100 // zNear, zFar
				// );

				// camera.zoom = 0.1;

				// camera.position.z = 2;
				camera.position.set(7,7,0);
				camera.lookAt(0,0,0);

				this._camera = camera;
			}

			_setupLight() {
				const auxLight = new THREE.DirectionalLight(0xffffff, 0,5);
				auxLight.position.set(0, 5, 0);
				auxLight.target.position.set(0 ,0, 0);
				this._scene.add(auxLight.target);
				this._scene.add(auxLight);

				// const light = new THREE.DirectionalLight(0xffffff, 0.5);
				// light.position.set(0, 5, 0);
				// light.target.position.set(0 ,0, 0);
				// this._scene.add(light.target);
				// light.shadow.camera.top = light.shadow.camera.right = 6;
				// light.shadow.camera.bottom = light.shadow.camera.left = -6;

				// const light = new THREE.PointLight(0xffffff, 0.7);
				// light.position.set(0, 5, 0);

				const light = new THREE.SpotLight(0xffffff, 50);
				light.position.set(0, 5, 0);
				light.target.position.set(0 ,0, 0);
				light.angle = THREE.MathUtils.degToRad(30);
				light.penumbra = 1;
				this._scene.add(light.target);

				light.shadow.mapSize.width = light.shadow.mapSize.height = 2048;
				light.shadow.radius = 1;

				const cameraHelper = new THREE.CameraHelper(light.shadow.camera);
				this._scene.add(cameraHelper);

				this._scene.add(light);
				this._light = light;
				light.castShadow = true;
			}

			_setupModel() {
				const groundGeometry = new THREE.PlaneGeometry(10, 10);
				const groundMaterial = new THREE.MeshStandardMaterial({
					color: "#2c3e50",
					roughness: 0.5,
					metalness: 0.5,
					side: THREE.DoubleSide
				});

				const ground = new THREE.Mesh(groundGeometry, groundMaterial);
				ground.rotation.x = THREE.MathUtils.degToRad(-90);
				ground.receiveShadow = true;
				this._scene.add(ground);

				// const bigSphereGeometry = new THREE.SphereGeometry(1.5, 64, 64, 0, Math.PI);
				const bigSphereGeometry = new THREE.TorusKnotGeometry(1, 0.3, 128, 64, 2, 3);
				const bigSphereMaterial = new THREE.MeshStandardMaterial({
					color: "#ffffff",
					roughness: 0.1,
					metalness: 0.2,
				});
				const bigSphere = new THREE.Mesh(bigSphereGeometry, bigSphereMaterial);
				// bigSphere.rotation.x = THREE.MathUtils.degToRad(-90);
				bigSphere.rotation.y = 1.6;
				bigSphere.receiveShadow = true;
				bigSphere.castShadow = true;
				this._scene.add(bigSphere);

				const torusGeometry = new THREE.TorusGeometry(0.4, 0.1, 32, 32);
				const torusMaterial = new THREE.MeshStandardMaterial({
					color: "#9b59b6",
					roughness: 0.5,
					metalness: 0.9,
				});

				for (let i = 0; i < 8; i++) {
					const torusPivot = new THREE.Object3D();
					const torus = new THREE.Mesh(torusGeometry, torusMaterial);
					torusPivot.rotation.y = THREE.MathUtils.degToRad(45 * i);
					torus.position.set(3, 0.5, 0);
					torusPivot.add(torus);
					torus.receiveShadow = true;
					torus.castShadow = true;
					this._scene.add(torusPivot);
				}

				const smallSphereGeometry = new THREE.SphereGeometry(0.3, 32, 32);
				const smallSphereMaterial = new THREE.MeshStandardMaterial({
					color: "#e74c3c",
					roughness: 0.2,
					metalness: 0.5,
				});
				const smallSpherePivot = new THREE.Object3D();
				const smallSphere = new THREE.Mesh(smallSphereGeometry, smallSphereMaterial);
				smallSpherePivot.add(smallSphere);
				smallSpherePivot.name = "smallSpherePivot";
				smallSphere.position.set(3, 0.5, 0);
				smallSphere.receiveShadow = true;
				smallSphere.castShadow = true;
				this._scene.add(smallSpherePivot);

				//
				const targetPivot = new THREE.Object3D();
				const target = new THREE.Object3D();
				targetPivot.add(target);
				targetPivot.name = "targetPivot";
				target.position.set(3, 0.5, 0);
				this._scene.add(targetPivot);
				//
			}

			_setupControls() {
				new OrbitControls(this._camera, this._divController);
			}

			update(time) {
				time *= 0.001; // second unit

				const smallSpherePivot = this._scene.getObjectByName("smallSpherePivot");
				if (smallSpherePivot) {
					smallSpherePivot.rotation.y = THREE.MathUtils.degToRad(time * 50);

					//
					// const smallSphere = smallSpherePivot.children[0];
					// smallSphere.getWorldPosition(this._camera.position);

					// const targetPivot = this._scene.getObjectByName("targetPivot");
					// if (targetPivot) {
					// 	targetPivot.rotation.y = THREE.MathUtils.degToRad(time*50 + 10);

					// 	const target = targetPivot.children[0];
					// 	const pt = new THREE.Vector3();

					// 	target.getWorldPosition(pt);
					// 	this._camera.lookAt(pt);
					// }
					//

					if (this._light.target) {
						const smallSphere = smallSpherePivot.children[0];
						smallSphere.getWorldPosition(this._light.target.position);

						if (this._lightHelper) this._lightHelper.update();
					}

					// PointLight
					if (this._light instanceof THREE.PointLight) {
						const smallSphere = smallSpherePivot.children[0];
						smallSphere.getWorldPosition(this._light.position);
					}
				}
			}

			render(time) {
				this._renderer.render(this._scene, this._camera);
				this.update(time);
				requestAnimationFrame(this.render.bind(this));
			}


			resize() {
				const width = this._divController.clientWidth;
				const height = this._divController.clientHeight;
				this._camera.aspect = width / height;
				this._camera.updateProjectionMatrix();
				this._renderer.setSize(width, height);
			}
			/*
			resize() {
				const width = this._divController.clientWidth;
				const height = this._divController.clientHeight;
				const aspect = width / height;

				if (this._camera instanceof THREE.PerspectiveCamera) {
					this._camera.aspect = aspect;
				} else {
					this._camera.left = -1 * aspect; // xLeft
					this._camera.right = 1 * aspect; // xRight
				}

				this._camera.updateProjectionMatrix();
				this._renderer.setSize(width, height);
			}
				*/
		}

		new App();
  } catch (error) {
    throw throwObj(
      error?.errCase ?? 'errorComn',
      error?.message ?? 'indianPocker.js error'
    );
  }
}
