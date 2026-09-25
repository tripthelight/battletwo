import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { VertexNormalsHelper } from 'three/addons/helpers/VertexNormalsHelper.js';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';

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

				this.mouse = { x: 0, y: 0 };
				this.defaultCameraPos = { x: 0, y: 0, z: 10 };

				this._setupCamera();
				this._setupLight();
				this._setupModel();
				this._setupControls();

				window.onresize = this.resize.bind(this);
				window.onmousemove = this.mousemove.bind(this);
				this.resize();

				requestAnimationFrame(this.render.bind(this));
			}

			_setupCamera() {
				const camera = new THREE.PerspectiveCamera(
					75,
					window.innerWidth / window.innerHeight,
					0.1,
					100
				);

				// camera.position.z = 100;
				// camera.position.set(0,0,10);
				camera.position.set(
					this.defaultCameraPos.x,
					this.defaultCameraPos.y,
					this.defaultCameraPos.z
				);
				camera.lookAt(0,0,0);
				this._camera = camera;
			}

			_setupLight() {
				const light = new THREE.AmbientLight("#FFF", 5);
				this._scene.add(light);
				this._light = light;
			}

			_setupModel() {
				// 2. 가로, 세로, 높이, 세그먼트(부드러움), 반지름(Radius) 설정
				const width = 2;
				const height = 2.8;
				const depth = 0.01; // 아주 얇은 두께
				const radius = 0.16;    // 모서리 반지름

				// 1. 둥근 사각형 2D Shape 그리기
				const shape = new THREE.Shape();

				// 왼쪽 위에서 시작하여 시계 방향으로 경로 그리기
				shape.moveTo(-width / 2 + radius, height / 2);
				shape.lineTo(width / 2 - radius, height / 2);
				shape.quadraticCurveTo(width / 2, height / 2, width / 2, height / 2 - radius);
				shape.lineTo(width / 2, -height / 2 + radius);
				shape.quadraticCurveTo(width / 2, -height / 2, width / 2 - radius, -height / 2);
				shape.lineTo(-width / 2 + radius, -height / 2);
				shape.quadraticCurveTo(-width / 2, -height / 2, -width / 2, -height / 2 + radius);
				shape.lineTo(-width / 2, height / 2 - radius);
				shape.quadraticCurveTo(-width / 2, height / 2, -width / 2 + radius, height / 2);

				// 2. Extrude 옵션 설정 (앞뒤 모서리 베벨은 끄기)
				const extrudeSettings = {
					depth: depth,          // 카드의 두께
					bevelEnabled: false,   // 3D 앞뒤 모서리 자체를 깎는 기능은 비활성화
					curveSegments: 24      // 모서리 곡선의 부드러움 (세그먼트)
				};

				// 3. 지오메트리 생성
				const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);

				// 4. 중심점(Pivot)을 카드의 정중앙으로 맞추기
				geometry.center();

				const material = new THREE.MeshStandardMaterial({ color: 0xffffff, side: THREE.DoubleSide });
				const card = new THREE.Mesh(geometry, material);
				card.position.set(0, 0, 0); // x, y, z 위치로 이동

				this._scene.add(card);
			}

			_setupControls() {
				new OrbitControls(this._camera, this._divController);
			}

			mousemove(event) {
				// 마우스 좌표를 -1 ~ 1 사이의 값으로 정규화 (가운데가 0, 0)
				this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
				this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
			}

			update(time) {
				time *= 0.001; // second unit

				this.defaultCameraPos.z = this._camera.position.z * 0.4;

				const targetX = this.defaultCameraPos.x - (this.mouse.x * this.defaultCameraPos.z);
				const targetY = this.defaultCameraPos.y - (this.mouse.y * this.defaultCameraPos.z);

				// 부드러운 움직임(Lerp) 효과 적용 (0.05 값을 조절하여 속도 변경 가능)
				this._camera.position.x += (targetX - this._camera.position.x) * 0.05;
				this._camera.position.y += (targetY - this._camera.position.y) * 0.05;

				// 카메라이동 후에도 항상 화면 중심(또는 생성한 카드 mesh)을 바라보도록 설정
				this._camera.lookAt(0, 0, 0);
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
		}

		new App();
  } catch (error) {
    throw throwObj(
      error?.errCase ?? 'errorComn',
      error?.message ?? 'indianPocker.js error'
    );
  }
}
