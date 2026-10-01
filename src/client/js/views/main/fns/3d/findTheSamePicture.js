import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

import throwObj from '@/client/js/module/errorHandler/throwObj';

class FindTheSamePicture_3D {
  constructor() {
    const divContainer = document.body;
    this._divContainer = divContainer;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    divContainer.appendChild(renderer.domElement);
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
    const width = this._divContainer.clientWidth;
    const height = this._divContainer.clientHeight;
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 100);
    camera.position.z = 5;
    this._camera = camera;
  }

  _setupLight() {
    const color = 0xffffff;
    const intensity = 1;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(-1, 2, 4);
    this._scene.add(light);
  }

  _setupModel() {
    const geometry = new THREE.BoxGeometry(1, 1, 0.2);
    const material = new THREE.MeshPhongMaterial({ color: 0x44a88 });
    const pictureCard = new THREE.Mesh(geometry, material);
    this._scene.add(pictureCard);
    this._pictureCard = pictureCard;
  }

  resize() {
    const width = this._divContainer.clientWidth;
    const height = this._divContainer.clientHeight;
    this._camera.aspect = width / height;
    this._camera.updateProjectionMatrix();
    this._renderer.setSize(width, height);
  }

  _setupControls() {
    new OrbitControls(this._camera, this._divContainer);
  }

  render(time) {
    this._renderer.render(this._scene, this._camera);
    this.update(time);
    requestAnimationFrame(this.render.bind(this));
  }

  update(time) {
    time *= 0.0001; // second unit
  }
}

export default () => {
  try {
    new FindTheSamePicture_3D();
  } catch (error) {
    throw throwObj(error?.errCase ?? 'errorComn', error?.message ?? '3d findTheSamePicture.js error');
  }
};
