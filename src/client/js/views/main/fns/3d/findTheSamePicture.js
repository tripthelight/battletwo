import * as THREE from 'three';

import alphabetAUrl from '@/client/assets/images/svg/findsamepicture/alphabet/A.svg';
import alphabetBUrl from '@/client/assets/images/svg/findsamepicture/alphabet/B.svg';
import alphabetCUrl from '@/client/assets/images/svg/findsamepicture/alphabet/C.svg';
import alphabetDUrl from '@/client/assets/images/svg/findsamepicture/alphabet/D.svg';
import alphabetEUrl from '@/client/assets/images/svg/findsamepicture/alphabet/E.svg';
import alphabetFUrl from '@/client/assets/images/svg/findsamepicture/alphabet/F.svg';
import alphabetGUrl from '@/client/assets/images/svg/findsamepicture/alphabet/G.svg';
import alphabetHUrl from '@/client/assets/images/svg/findsamepicture/alphabet/H.svg';
import alphabetIUrl from '@/client/assets/images/svg/findsamepicture/alphabet/I.svg';
import alphabetJUrl from '@/client/assets/images/svg/findsamepicture/alphabet/J.svg';
import alphabetKUrl from '@/client/assets/images/svg/findsamepicture/alphabet/K.svg';
import alphabetLUrl from '@/client/assets/images/svg/findsamepicture/alphabet/L.svg';
import alphabetMUrl from '@/client/assets/images/svg/findsamepicture/alphabet/M.svg';
import alphabetNUrl from '@/client/assets/images/svg/findsamepicture/alphabet/N.svg';
import alphabetOUrl from '@/client/assets/images/svg/findsamepicture/alphabet/O.svg';
import alphabetPUrl from '@/client/assets/images/svg/findsamepicture/alphabet/P.svg';
import alphabetQUrl from '@/client/assets/images/svg/findsamepicture/alphabet/Q.svg';
import alphabetRUrl from '@/client/assets/images/svg/findsamepicture/alphabet/R.svg';
import alphabetSUrl from '@/client/assets/images/svg/findsamepicture/alphabet/S.svg';
import alphabetTUrl from '@/client/assets/images/svg/findsamepicture/alphabet/T.svg';
import alphabetUUrl from '@/client/assets/images/svg/findsamepicture/alphabet/U.svg';
import alphabetVUrl from '@/client/assets/images/svg/findsamepicture/alphabet/V.svg';
import alphabetWUrl from '@/client/assets/images/svg/findsamepicture/alphabet/W.svg';
import alphabetXUrl from '@/client/assets/images/svg/findsamepicture/alphabet/X.svg';
import alphabetYUrl from '@/client/assets/images/svg/findsamepicture/alphabet/Y.svg';
import alphabetZUrl from '@/client/assets/images/svg/findsamepicture/alphabet/Z.svg';
import pictureCard1Url from '@/client/assets/images/svg/findsamepicture/card/card_1.svg';
import pictureCard2Url from '@/client/assets/images/svg/findsamepicture/card/card_2.svg';
import pictureCard3Url from '@/client/assets/images/svg/findsamepicture/card/card_3.svg';
import pictureCard4Url from '@/client/assets/images/svg/findsamepicture/card/card_4.svg';
import pictureCard5Url from '@/client/assets/images/svg/findsamepicture/card/card_5.svg';
import pictureCard6Url from '@/client/assets/images/svg/findsamepicture/card/card_6.svg';
import pictureCard7Url from '@/client/assets/images/svg/findsamepicture/card/card_7.svg';
import pictureCard8Url from '@/client/assets/images/svg/findsamepicture/card/card_8.svg';
import pictureCard9Url from '@/client/assets/images/svg/findsamepicture/card/card_9.svg';
import pictureCard10Url from '@/client/assets/images/svg/findsamepicture/card/card_10.svg';
import pictureCard11Url from '@/client/assets/images/svg/findsamepicture/card/card_11.svg';
import pictureCard12Url from '@/client/assets/images/svg/findsamepicture/card/card_12.svg';
import pictureCard13Url from '@/client/assets/images/svg/findsamepicture/card/card_13.svg';
import pictureCard14Url from '@/client/assets/images/svg/findsamepicture/card/card_14.svg';
import pictureCard15Url from '@/client/assets/images/svg/findsamepicture/card/card_15.svg';
import pictureCard16Url from '@/client/assets/images/svg/findsamepicture/card/card_16.svg';
import pictureCard17Url from '@/client/assets/images/svg/findsamepicture/card/card_17.svg';
import pictureCard18Url from '@/client/assets/images/svg/findsamepicture/card/card_18.svg';
import pictureCard19Url from '@/client/assets/images/svg/findsamepicture/card/card_19.svg';
import pictureCard20Url from '@/client/assets/images/svg/findsamepicture/card/card_20.svg';
import pictureCard21Url from '@/client/assets/images/svg/findsamepicture/card/card_21.svg';
import pictureCard22Url from '@/client/assets/images/svg/findsamepicture/card/card_22.svg';
import pictureCard23Url from '@/client/assets/images/svg/findsamepicture/card/card_23.svg';
import pictureCard24Url from '@/client/assets/images/svg/findsamepicture/card/card_24.svg';
import pictureCard25Url from '@/client/assets/images/svg/findsamepicture/card/card_25.svg';
import pictureCard26Url from '@/client/assets/images/svg/findsamepicture/card/card_26.svg';
import pictureCard27Url from '@/client/assets/images/svg/findsamepicture/card/card_27.svg';
import pictureCard28Url from '@/client/assets/images/svg/findsamepicture/card/card_28.svg';

import throwObj from '@/client/js/module/errorHandler/throwObj';

const ALPHABET_FACE_URLS = [
  alphabetAUrl, alphabetBUrl, alphabetCUrl, alphabetDUrl, alphabetEUrl,
  alphabetFUrl, alphabetGUrl, alphabetHUrl, alphabetIUrl, alphabetJUrl,
  alphabetKUrl, alphabetLUrl, alphabetMUrl, alphabetNUrl, alphabetOUrl,
  alphabetPUrl, alphabetQUrl, alphabetRUrl, alphabetSUrl, alphabetTUrl,
  alphabetUUrl, alphabetVUrl, alphabetWUrl, alphabetXUrl, alphabetYUrl,
  alphabetZUrl
];
const PICTURE_FACE_URLS = [
  pictureCard1Url, pictureCard2Url, pictureCard3Url, pictureCard4Url,
  pictureCard5Url, pictureCard6Url, pictureCard7Url, pictureCard8Url,
  pictureCard9Url, pictureCard10Url, pictureCard11Url, pictureCard12Url,
  pictureCard13Url, pictureCard14Url, pictureCard15Url, pictureCard16Url,
  pictureCard17Url, pictureCard18Url, pictureCard19Url, pictureCard20Url,
  pictureCard21Url, pictureCard22Url, pictureCard23Url, pictureCard24Url,
  pictureCard25Url, pictureCard26Url, pictureCard27Url, pictureCard28Url
];
const CARD_FACE_URLS = [...ALPHABET_FACE_URLS, ...PICTURE_FACE_URLS];
const ALPHABET_FACE_COUNT = ALPHABET_FACE_URLS.length;
const PICTURE_FACE_COUNT = PICTURE_FACE_URLS.length;
const FACE_ATLAS_COLUMNS = 8;
const FACE_ATLAS_ROWS = 8;
const FACE_ATLAS_TARGET_SIZE = 2048;
const FACE_TILE_INSET_RATIO = 0.02;
const HASH_SALT_ALPHABET = 0xa54ff53a;
const HASH_SALT_PICTURE = 0x510e527f;
const HASH_SALT_SIDE = 0x9b05688c;
const SVG_NS = 'http://www.w3.org/2000/svg';
const XHTML_NS = 'http://www.w3.org/1999/xhtml';
const PATH_NUMBER = /-?(?:\d+\.?\d*|\.\d+)(?:e[-+]?\d+)?/gi;
const MAX_PIXEL_RATIO = 2;
const MAX_GRID_INSTANCES = 4096;
const PICTURE_CARD_BOARD_TILT_RATIO = 0.4; // 0: no tilt, 0.4 ~= 21.8deg at a viewport edge.
const PICTURE_CARD_WHEEL_ZOOM_SPEED = 0.0014;
const PICTURE_CARD_MIN_SCALE = 0.35;
const PICTURE_CARD_MAX_SCALE = 4;
const PICTURE_CARD_FLIP_EASING = 'ease'; // ease | linear | ease-in | ease-out | ease-in-out | cubic-bezier(n, n, n, n)
const PICTURE_CARD_FLIP_DURATION = 0.35; // seconds. 0 = instant; larger values = slower.
let nextLayerId = 0;
let activeApp = null;

class FindTheSamePicture_3D {
  constructor() {
    this._svg = document.querySelector('svg.card.findTheSamePicture');
    if (!this._svg) {
      throw throwObj(
        'elementLoss',
        'findTheSamePicture.js - svg.card.findTheSamePicture element failed.'
      );
    }

    this._shapePath = this._svg.querySelector(
      "path.shape-path[data-shape='findTheSamePicture']"
    );
    if (!this._shapePath) {
      throw throwObj(
        'elementLoss',
        'findTheSamePicture.js - findTheSamePicture shape path failed.'
      );
    }

    this._cardWidth = 1;
    this._cardHeight = 1;
    this._cardDepth = 0.2;
    this._cardMargin = 0.2;
    this._pitchX = this._cardWidth + this._cardMargin;
    this._pitchY = this._cardHeight + this._cardMargin;
    this._boardTiltRatio = PICTURE_CARD_BOARD_TILT_RATIO;
    this._pictureCardBackgroundColor = '#141414';
    this._wheelZoomSpeed = PICTURE_CARD_WHEEL_ZOOM_SPEED;
    this._minBoardScale = PICTURE_CARD_MIN_SCALE;
    this._maxBoardScale = PICTURE_CARD_MAX_SCALE;
    this._boardScale = 1;
    this._cardFlipEasing = PICTURE_CARD_FLIP_EASING;
    this._cardFlipDuration = PICTURE_CARD_FLIP_DURATION;
    this._cardPatternSeed = (Math.random() * 0x100000000) >>> 0;
    this.defaultCameraPos = { x: 0, y: 0, z: 5 };

    this._disposed = false;
    this._layoutDirty = true;
    this._gridDirty = true;
    this._tiltDirty = true;
    this._hoverDirty = true;
    this._needsRender = true;
    this._layerVisible = false;
    this._layerMetrics = null;
    this._layerBounds = null;
    this._layoutKey = '';
    this._pixelRatio = 0;
    this._gridBounds = null;
    this._gridCapacity = 0;
    this._faceAtlasTexture = null;
    this._faceAtlasReady = false;
    this._frameId = 0;
    this._hoverCellKey = null;
    this._flipStates = new Map();
    this._flipEasingCacheKey = '';
    this._flipEasingCacheFn = null;

    this._pointerClientX = window.innerWidth * 0.5;
    this._pointerClientY = window.innerHeight * 0.5;
    this._pointerNdcX = 0;
    this._pointerNdcY = 0;
    this._boardTiltX = 0;
    this._boardTiltY = 0;

    this._instanceMatrix = new THREE.Matrix4();
    this._boardInverse = new THREE.Matrix4();
    this._rayOriginLocal = new THREE.Vector3();
    this._rayPointLocal = new THREE.Vector3();
    this._hoverRayOriginLocal = new THREE.Vector3();
    this._hoverRayPointLocal = new THREE.Vector3();
    this._svgHitPoint = this._svg.createSVGPoint();
    this._pointerHitCol = 0;
    this._pointerHitRow = 0;

    this._renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this._renderer.setClearColor(0x000000, 0);
    const gl = this._renderer.getContext();
    this._gpuMaxCanvasSide = Math.min(
      this._renderer.capabilities.maxTextureSize || 16384,
      gl.getParameter(gl.MAX_RENDERBUFFER_SIZE) || 16384
    );

    this._scene = new THREE.Scene();
    this._setupCamera();
    this._setupModel();
    this._mountCanvas();
    this._setupWheelZoom();
    this._setupPointerTilt();
    this._setupObservers();

    this._boundFrame = this._frame.bind(this);
    this._scheduleFrame();
    void this._loadFaceAtlas();
  }

  _setupCamera() {
    // A square virtual camera. Only the visible SVG crop receives a real GPU buffer.
    this._camera = new THREE.PerspectiveCamera(75, 1, 0.1, 100);
    this._camera.position.set(
      this.defaultCameraPos.x,
      this.defaultCameraPos.y,
      this.defaultCameraPos.z
    );
    this._camera.lookAt(0, 0, 0);
  }

  _setupModel() {
    this._cardGeometry = new THREE.BoxGeometry(
      this._cardWidth,
      this._cardHeight,
      this._cardDepth
    );

    // Pure white card body. MeshBasicMaterial ignores lights, so board tilt never
    // introduces shadows or dull gray shading.
    this._cardMaterial = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      toneMapped: false
    });

    this._faceGeometry = this._createFaceGeometry();
    this._transparentFaceTexture = new THREE.DataTexture(
      new Uint8Array([0, 0, 0, 0]),
      1,
      1,
      THREE.RGBAFormat
    );
    this._transparentFaceTexture.needsUpdate = true;
    this._transparentFaceTexture.colorSpace = THREE.SRGBColorSpace;

    this._faceMaterial = new THREE.ShaderMaterial({
      uniforms: {
        faceAtlas: { value: this._transparentFaceTexture }
      },
      vertexShader: `
        attribute vec2 instanceFaceIndices;
        attribute float faceSide;
        varying vec2 vAtlasUv;

        void main() {
          float tileIndex = mix(instanceFaceIndices.x, instanceFaceIndices.y, faceSide);
          float tileColumn = mod(tileIndex, ${FACE_ATLAS_COLUMNS.toFixed(1)});
          float tileRow = floor(tileIndex / ${FACE_ATLAS_COLUMNS.toFixed(1)});

          vec2 faceUv = mix(
            vec2(${FACE_TILE_INSET_RATIO.toFixed(3)}),
            vec2(${(1 - FACE_TILE_INSET_RATIO).toFixed(3)}),
            uv
          );
          vAtlasUv = vec2(
            (tileColumn + faceUv.x) / ${FACE_ATLAS_COLUMNS.toFixed(1)},
            (${(FACE_ATLAS_ROWS - 1).toFixed(1)} - tileRow + faceUv.y) / ${FACE_ATLAS_ROWS.toFixed(1)}
          );

          vec4 localPosition = vec4(position, 1.0);
          #ifdef USE_INSTANCING
            localPosition = instanceMatrix * localPosition;
          #endif
          gl_Position = projectionMatrix * modelViewMatrix * localPosition;
        }
      `,
      fragmentShader: `
        uniform sampler2D faceAtlas;
        varying vec2 vAtlasUv;

        void main() {
          vec4 faceColor = texture2D(faceAtlas, vAtlasUv);
          if (faceColor.a <= 0.001) discard;
          gl_FragColor = faceColor;
          #include <colorspace_fragment>
        }
      `,
      transparent: true,
      depthTest: true,
      depthWrite: false,
      side: THREE.FrontSide,
      toneMapped: false
    });

    this._boardGroup = new THREE.Group();
    this._scene.add(this._boardGroup);
    this._cardGrid = null;
    this._faceGrid = null;
  }

  _createFaceGeometry() {
    const halfWidth = this._cardWidth * 0.5;
    const halfHeight = this._cardHeight * 0.5;
    const z = this._cardDepth * 0.5 + 0.002;
    const geometry = new THREE.BufferGeometry();

    // The back quad is the front quad rotated 180deg around Y. That keeps the
    // picture upright when the whole card is initially turned to its back side.
    geometry.setAttribute('position', new THREE.Float32BufferAttribute([
      -halfWidth, -halfHeight, z,
       halfWidth, -halfHeight, z,
       halfWidth,  halfHeight, z,
      -halfWidth,  halfHeight, z,

       halfWidth, -halfHeight, -z,
      -halfWidth, -halfHeight, -z,
      -halfWidth,  halfHeight, -z,
       halfWidth,  halfHeight, -z
    ], 3));
    geometry.setAttribute('uv', new THREE.Float32BufferAttribute([
      0, 0, 1, 0, 1, 1, 0, 1,
      0, 0, 1, 0, 1, 1, 0, 1
    ], 2));
    geometry.setAttribute('faceSide', new THREE.Float32BufferAttribute([
      0, 0, 0, 0,
      1, 1, 1, 1
    ], 1));
    geometry.setIndex([
      0, 1, 2, 0, 2, 3,
      4, 5, 6, 4, 6, 7
    ]);
    geometry.computeBoundingSphere();
    return geometry;
  }

  _loadImage(url) {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.decoding = 'async';
      image.onload = () => resolve(image);
      image.onerror = () => reject(new Error(`Failed to load card face: ${url}`));
      image.src = url;
    });
  }

  async _loadFaceAtlas() {
    try {
      const images = await Promise.all(CARD_FACE_URLS.map(url => this._loadImage(url)));
      if (this._disposed) return;

      const maxTextureSize = this._renderer.capabilities.maxTextureSize || 2048;
      const atlasSize = Math.max(
        FACE_ATLAS_COLUMNS,
        Math.min(FACE_ATLAS_TARGET_SIZE, maxTextureSize)
      );
      const cellSize = Math.max(1, Math.floor(
        atlasSize / Math.max(FACE_ATLAS_COLUMNS, FACE_ATLAS_ROWS)
      ));
      const canvasSize = cellSize * Math.max(FACE_ATLAS_COLUMNS, FACE_ATLAS_ROWS);
      const canvas = document.createElement('canvas');
      canvas.width = canvasSize;
      canvas.height = canvasSize;
      const context = canvas.getContext('2d', { alpha: true });
      if (!context) throw new Error('Could not create findTheSamePicture face atlas.');

      context.clearRect(0, 0, canvas.width, canvas.height);
      context.imageSmoothingEnabled = true;
      context.imageSmoothingQuality = 'high';

      const inset = Math.max(1, Math.round(cellSize * FACE_TILE_INSET_RATIO));
      const faceSize = Math.max(1, cellSize - inset * 2);
      for (let index = 0; index < images.length; index++) {
        const column = index % FACE_ATLAS_COLUMNS;
        const row = Math.floor(index / FACE_ATLAS_COLUMNS);
        context.drawImage(
          images[index],
          column * cellSize + inset,
          row * cellSize + inset,
          faceSize,
          faceSize
        );
      }

      const texture = new THREE.CanvasTexture(canvas);
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.generateMipmaps = true;
      texture.minFilter = THREE.LinearMipmapLinearFilter;
      texture.magFilter = THREE.LinearFilter;
      texture.anisotropy = Math.min(8, this._renderer.capabilities.getMaxAnisotropy());
      texture.needsUpdate = true;

      if (this._disposed) {
        texture.dispose();
        return;
      }

      this._faceAtlasTexture?.dispose();
      this._faceAtlasTexture = texture;
      this._faceMaterial.uniforms.faceAtlas.value = texture;
      this._faceAtlasReady = true;
      if (this._faceGrid) this._faceGrid.visible = true;
      this._needsRender = true;
      this._scheduleFrame();
    } catch (error) {
      if (!this._disposed) {
        console.error('findTheSamePicture.js - card face atlas load failed.', error);
      }
    }
  }

  _mountCanvas() {
    const serial = ++nextLayerId;
    this._defs = document.createElementNS(SVG_NS, 'defs');
    const clipPath = document.createElementNS(SVG_NS, 'clipPath');
    const clipUse = document.createElementNS(SVG_NS, 'use');
    this._foreignObject = document.createElementNS(SVG_NS, 'foreignObject');

    this._addedSourceId = !this._shapePath.id;
    if (this._addedSourceId) {
      this._shapePath.id = `findTheSamePicture-three-source-${serial}`;
    }

    clipPath.id = `findTheSamePicture-three-clip-${serial}`;
    clipPath.setAttribute('clipPathUnits', 'userSpaceOnUse');
    clipUse.setAttribute('href', `#${this._shapePath.id}`);
    clipPath.appendChild(clipUse);
    this._defs.appendChild(clipPath);

    const layer = this._foreignObject;
    layer.classList.add('findTheSamePicture-three-layer');
    layer.setAttribute('clip-path', `url(#${clipPath.id})`);
    layer.setAttribute('pointer-events', 'none');
    layer.style.pointerEvents = 'none';
    layer.style.visibility = 'hidden';

    // Keep the background independent from WebGL so its color can be changed
    // without rebuilding the grid, materials, lights, or renderer state.
    this._backgroundDiv = document.createElementNS(XHTML_NS, 'div');
    this._backgroundDiv.className = 'findTheSamePicture-three-background';
    this._backgroundDiv.style.position = 'relative';
    this._backgroundDiv.style.width = '100%';
    this._backgroundDiv.style.height = '100%';
    this._backgroundDiv.style.backgroundColor = this._pictureCardBackgroundColor;
    this._backgroundDiv.style.overflow = 'hidden';
    this._backgroundDiv.style.pointerEvents = 'none';

    const canvas = this._renderer.domElement;
    canvas.classList.add('findTheSamePicture-three-canvas');
    canvas.style.display = 'block';
    canvas.style.position = 'absolute';
    canvas.style.left = '0';
    canvas.style.top = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';

    this._backgroundDiv.appendChild(canvas);
    layer.appendChild(this._backgroundDiv);
    this._svg.insertBefore(this._defs, this._svg.firstChild);
    this._svg.appendChild(layer);
  }

  _setupWheelZoom() {
    this._onWheel = event => {
      if (event.deltaY === 0) return;

      // Zoom only while the pointer is on this card's original SVG path.
      // Consuming the wheel here also prevents another full-screen card layer
      // or the page itself from reacting to the same gesture.
      event.preventDefault();
      event.stopPropagation();

      let delta = event.deltaY;
      if (event.deltaMode === 1) delta *= 16;
      else if (event.deltaMode === 2) delta *= Math.max(1, window.innerHeight);

      const speed = Number.isFinite(this._wheelZoomSpeed)
        ? Math.max(0, this._wheelZoomSpeed)
        : 0;
      if (speed === 0) return;

      const minScale = Number.isFinite(this._minBoardScale)
        ? Math.max(0.01, this._minBoardScale)
        : 0.35;
      const maxScale = Number.isFinite(this._maxBoardScale)
        ? Math.max(minScale, this._maxBoardScale)
        : 4;
      const nextScale = THREE.MathUtils.clamp(
        this._boardScale * Math.exp(-delta * speed),
        minScale,
        maxScale
      );

      if (Math.abs(nextScale - this._boardScale) <= 1e-6) return;

      this._boardScale = nextScale;
      this._boardGroup.scale.setScalar(nextScale);
      this._boardGroup.updateMatrixWorld(true);
      this._gridDirty = true;
      this._hoverDirty = true;
      this._needsRender = true;
      this._scheduleFrame();
    };

    this._shapePath.addEventListener('wheel', this._onWheel, { passive: false });
  }

  _setupPointerTilt() {
    this._pointerInWindow = true;

    this._onMouseMove = event => {
      this._pointerInWindow = true;
      this._pointerClientX = event.clientX;
      this._pointerClientY = event.clientY;
      this._hoverDirty = true;

      // A pressed-button drag must not drive the board tilt. Hover tracking still
      // runs so a pressed mouse cannot leave a card permanently flipped.
      if (event.buttons === 0) {
        const nextX = THREE.MathUtils.clamp(
          this._pointerClientX / Math.max(1, window.innerWidth) * 2 - 1,
          -1,
          1
        );
        const nextY = THREE.MathUtils.clamp(
          1 - this._pointerClientY / Math.max(1, window.innerHeight) * 2,
          -1,
          1
        );

        if (nextX !== this._pointerNdcX || nextY !== this._pointerNdcY) {
          this._pointerNdcX = nextX;
          this._pointerNdcY = nextY;
          this._tiltDirty = true;
        }
      }
      this._scheduleFrame();
    };

    this._onWindowBlur = () => {
      this._pointerInWindow = false;
      this._hoverDirty = true;
      this._scheduleFrame();
    };

    window.addEventListener('mousemove', this._onMouseMove, { passive: true });
    window.addEventListener('blur', this._onWindowBlur);
  }

  _setupObservers() {
    this._markLayoutDirty = () => {
      this._layoutDirty = true;
      this._hoverDirty = true;
      this._scheduleFrame();
    };

    this._onResize = this._markLayoutDirty;
    window.addEventListener('resize', this._onResize, { passive: true });
    window.addEventListener('scroll', this._onResize, { passive: true, capture: true });

    this._mutationObserver = new MutationObserver(this._markLayoutDirty);
    this._mutationObserver.observe(this._shapePath, {
      attributes: true,
      attributeFilter: ['d', 'transform', 'style']
    });
    this._mutationObserver.observe(this._svg, {
      attributes: true,
      attributeFilter: ['style', 'class', 'transform', 'viewBox']
    });

    this._svgParent = this._svg.parentElement;
    if (this._svgParent) {
      this._mutationObserver.observe(this._svgParent, {
        attributes: true,
        childList: true,
        attributeFilter: ['style', 'class', 'transform']
      });
    }

    if (typeof ResizeObserver !== 'undefined') {
      this._resizeObserver = new ResizeObserver(this._markLayoutDirty);
      this._resizeObserver.observe(this._svg);
      if (this._svgParent) this._resizeObserver.observe(this._svgParent);
    }

    this._onVisibilityChange = () => {
      if (document.visibilityState !== 'hidden') {
        this._layoutDirty = true;
        this._scheduleFrame();
      }
    };
    document.addEventListener('visibilitychange', this._onVisibilityChange);
  }

  _getPathPolygonPoints() {
    const d = this._shapePath.getAttribute('d') || '';
    if (d && !d.replace(PATH_NUMBER, '').replace(/[MLZmlz,\s]/g, '')) {
      const numbers = d.match(PATH_NUMBER);
      if (
        numbers &&
        numbers.length >= 6 &&
        numbers.length % 2 === 0 &&
        !/[ml]/.test(d.replace(PATH_NUMBER, ''))
      ) {
        const points = new Array(numbers.length / 2);
        for (let i = 0, pointIndex = 0; i < numbers.length; i += 2, pointIndex++) {
          points[pointIndex] = { x: Number(numbers[i]), y: Number(numbers[i + 1]) };
        }
        return points;
      }
    }

    try {
      const box = this._shapePath.getBBox();
      if (box.width <= 0 || box.height <= 0) return [];
      return [
        { x: box.x, y: box.y },
        { x: box.x + box.width, y: box.y },
        { x: box.x + box.width, y: box.y + box.height },
        { x: box.x, y: box.y + box.height }
      ];
    } catch (_error) {
      return [];
    }
  }

  _clipPolygonToViewport(polygon, width, height) {
    const clipEdge = (points, inside, intersection) => {
      if (!points.length) return points;
      const result = [];
      let previous = points[points.length - 1];
      let previousInside = inside(previous);

      for (const point of points) {
        const currentInside = inside(point);
        if (currentInside !== previousInside) result.push(intersection(previous, point));
        if (currentInside) result.push(point);
        previous = point;
        previousInside = currentInside;
      }
      return result;
    };

    let points = polygon;
    points = clipEdge(
      points,
      point => point.x >= 0,
      (a, b) => ({ x: 0, y: a.y + (b.y - a.y) * (-a.x) / (b.x - a.x) })
    );
    points = clipEdge(
      points,
      point => point.x <= width,
      (a, b) => ({ x: width, y: a.y + (b.y - a.y) * (width - a.x) / (b.x - a.x) })
    );
    points = clipEdge(
      points,
      point => point.y >= 0,
      (a, b) => ({ x: a.x + (b.x - a.x) * (-a.y) / (b.y - a.y), y: 0 })
    );
    return clipEdge(
      points,
      point => point.y <= height,
      (a, b) => ({ x: a.x + (b.x - a.x) * (height - a.y) / (b.y - a.y), y: height })
    );
  }

  _getLayoutMetrics() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    if (width <= 0 || height <= 0) return null;

    const matrix = this._svg.getScreenCTM();
    if (!matrix) return null;

    const determinant = matrix.a * matrix.d - matrix.b * matrix.c;
    if (!Number.isFinite(determinant) || Math.abs(determinant) < 1e-12) return null;

    const xScale = Math.hypot(matrix.a, matrix.b);
    const yScale = Math.hypot(matrix.c, matrix.d);
    const unitScale = Math.min(xScale, yScale);
    if (!Number.isFinite(unitScale) || unitScale <= 0) return null;

    const viewBox = this._svg.viewBox.baseVal;
    if (viewBox.width <= 0 || viewBox.height <= 0) return null;

    const coverSize = (Math.hypot(width, height) + 8) / unitScale;
    const sum = xScale * xScale + yScale * yScale;
    const maxScale = Math.sqrt(
      (sum + Math.sqrt(Math.max(0, sum * sum - 4 * determinant * determinant))) * 0.5
    );

    return {
      width,
      height,
      matrix,
      determinant,
      unitScale,
      coverSize,
      coverX: viewBox.x + viewBox.width / 2 - coverSize / 2,
      coverY: viewBox.y + viewBox.height / 2 - coverSize / 2,
      renderSize: Math.ceil(coverSize * maxScale)
    };
  }

  _getTightVisibleBounds(metrics) {
    const localPoints = this._getPathPolygonPoints();
    if (localPoints.length < 3) return null;

    const m = metrics.matrix;
    const screenPoints = new Array(localPoints.length);
    for (let i = 0; i < localPoints.length; i++) {
      const point = localPoints[i];
      screenPoints[i] = {
        x: m.a * point.x + m.c * point.y + m.e,
        y: m.b * point.x + m.d * point.y + m.f
      };
    }

    const clipped = this._clipPolygonToViewport(
      screenPoints,
      metrics.width,
      metrics.height
    );
    if (clipped.length < 3) return null;

    let minX = Infinity;
    let maxX = -Infinity;
    let minY = Infinity;
    let maxY = -Infinity;

    for (const point of clipped) {
      const dx = point.x - m.e;
      const dy = point.y - m.f;
      const x = (m.d * dx - m.c * dy) / metrics.determinant;
      const y = (-m.b * dx + m.a * dy) / metrics.determinant;
      minX = Math.min(minX, x);
      maxX = Math.max(maxX, x);
      minY = Math.min(minY, y);
      maxY = Math.max(maxY, y);
    }

    const padding = 2 / metrics.unitScale;
    minX = Math.max(minX - padding, metrics.coverX);
    minY = Math.max(minY - padding, metrics.coverY);
    maxX = Math.min(maxX + padding, metrics.coverX + metrics.coverSize);
    maxY = Math.min(maxY + padding, metrics.coverY + metrics.coverSize);

    if (maxX <= minX || maxY <= minY) return null;
    return { x: minX, y: minY, width: maxX - minX, height: maxY - minY };
  }

  _updateLayerLayout() {
    this._layoutDirty = false;

    // Preserve pointer/board behavior across viewport resizes even when the mouse is stationary.
    const nextPointerNdcX = THREE.MathUtils.clamp(
      this._pointerClientX / Math.max(1, window.innerWidth) * 2 - 1,
      -1,
      1
    );
    const nextPointerNdcY = THREE.MathUtils.clamp(
      1 - this._pointerClientY / Math.max(1, window.innerHeight) * 2,
      -1,
      1
    );
    if (nextPointerNdcX !== this._pointerNdcX || nextPointerNdcY !== this._pointerNdcY) {
      this._pointerNdcX = nextPointerNdcX;
      this._pointerNdcY = nextPointerNdcY;
      this._tiltDirty = true;
    }

    const metrics = this._getLayoutMetrics();
    const bounds = metrics && this._getTightVisibleBounds(metrics);
    if (!bounds) {
      if (this._layerVisible) {
        this._foreignObject.style.visibility = 'hidden';
        this._layerVisible = false;
        this._renderer.setSize(1, 1, false);
      }
      this._hoverCellKey = null;
      this._flipStates.clear();
      return;
    }

    const ratio = Math.min(window.devicePixelRatio || 1, MAX_PIXEL_RATIO);
    const maxCropSide = Math.max(bounds.width, bounds.height);
    const safeVirtualSize = Math.max(1, Math.floor(
      (this._gpuMaxCanvasSide - ratio - 1) * metrics.coverSize / (maxCropSide * ratio)
    ));
    metrics.renderSize = Math.max(1, Math.min(metrics.renderSize, safeVirtualSize));

    if (ratio !== this._pixelRatio) {
      this._renderer.setPixelRatio(ratio);
      this._pixelRatio = ratio;
    }

    const unitToVirtualPixel = metrics.renderSize / metrics.coverSize;
    const offsetX = (bounds.x - metrics.coverX) * unitToVirtualPixel;
    const offsetY = (bounds.y - metrics.coverY) * unitToVirtualPixel;
    const renderWidth = Math.max(1, Math.ceil(bounds.width * unitToVirtualPixel));
    const renderHeight = Math.max(1, Math.ceil(bounds.height * unitToVirtualPixel));
    const key = [
      metrics.renderSize,
      bounds.x,
      bounds.y,
      bounds.width,
      bounds.height,
      offsetX,
      offsetY,
      renderWidth,
      renderHeight,
      ratio
    ].join('|');

    this._layerMetrics = metrics;
    this._layerBounds = bounds;

    if (key !== this._layoutKey || !this._layerVisible) {
      const layer = this._foreignObject;
      layer.setAttribute('x', String(bounds.x));
      layer.setAttribute('y', String(bounds.y));
      layer.setAttribute('width', String(bounds.width));
      layer.setAttribute('height', String(bounds.height));

      this._camera.aspect = 1;
      this._camera.setViewOffset(
        metrics.renderSize,
        metrics.renderSize,
        offsetX,
        offsetY,
        renderWidth,
        renderHeight
      );
      this._renderer.setSize(renderWidth, renderHeight, false);

      this._layoutKey = key;
      this._gridDirty = true;
      this._needsRender = true;
    }

    if (!this._layerVisible) {
      this._foreignObject.style.visibility = 'visible';
      this._layerVisible = true;
      this._gridDirty = true;
      this._needsRender = true;
    }
  }

  _syncBoardTilt() {
    this._tiltDirty = false;

    const ratio = Number.isFinite(this._boardTiltRatio)
      ? Math.max(0, this._boardTiltRatio)
      : 0;
    const maxTilt = Math.atan(ratio);
    const tiltX = -this._pointerNdcY * maxTilt;
    const tiltY = this._pointerNdcX * maxTilt;

    if (
      Math.abs(tiltX - this._boardTiltX) <= 1e-7 &&
      Math.abs(tiltY - this._boardTiltY) <= 1e-7
    ) {
      return false;
    }

    this._boardTiltX = tiltX;
    this._boardTiltY = tiltY;
    this._boardGroup.rotation.set(tiltX, tiltY, 0);
    this._boardGroup.updateMatrixWorld(true);

    // The whole board tilts as a single unit. Only grid coverage may need to grow/shrink.
    this._gridDirty = true;
    this._hoverDirty = true;
    this._needsRender = true;
    return true;
  }

  _visiblePlaneBounds() {
    const camera = this._camera;
    camera.updateMatrixWorld(true);
    this._boardGroup.updateMatrixWorld(true);

    this._boardInverse.copy(this._boardGroup.matrixWorld).invert();
    const origin = this._rayOriginLocal.copy(camera.position).applyMatrix4(this._boardInverse);
    const point = this._rayPointLocal;
    let minX = Infinity;
    let maxX = -Infinity;
    let minY = Infinity;
    let maxY = -Infinity;

    for (let i = 0; i < 4; i++) {
      point.set(i & 1 ? 1 : -1, i & 2 ? 1 : -1, 0.5)
        .unproject(camera)
        .applyMatrix4(this._boardInverse);

      const dz = point.z - origin.z;
      if (Math.abs(dz) < 1e-8) return null;

      const t = -origin.z / dz;
      if (t <= 0 || !Number.isFinite(t)) return null;

      const x = origin.x + (point.x - origin.x) * t;
      const y = origin.y + (point.y - origin.y) * t;
      if (!Number.isFinite(x) || !Number.isFinite(y)) return null;

      minX = Math.min(minX, x);
      maxX = Math.max(maxX, x);
      minY = Math.min(minY, y);
      maxY = Math.max(maxY, y);
    }

    return { minX, maxX, minY, maxY };
  }

  _hashCell(col, row, salt) {
    let hash = (
      this._cardPatternSeed ^
      salt ^
      Math.imul(col | 0, 0x9e3779b1) ^
      Math.imul(row | 0, 0x85ebca77)
    ) >>> 0;
    hash ^= hash >>> 16;
    hash = Math.imul(hash, 0x7feb352d);
    hash ^= hash >>> 15;
    hash = Math.imul(hash, 0x846ca68b);
    hash ^= hash >>> 16;
    return hash >>> 0;
  }

  _cellKey(col, row) {
    return `${col}:${row}`;
  }

  _getBaseCardAngle(col, row) {
    return (this._hashCell(col, row, HASH_SALT_SIDE) & 1) === 1 ? Math.PI : 0;
  }

  _createCubicBezier(x1, y1, x2, y2) {
    const cx = 3 * x1;
    const bx = 3 * (x2 - x1) - cx;
    const ax = 1 - cx - bx;
    const cy = 3 * y1;
    const by = 3 * (y2 - y1) - cy;
    const ay = 1 - cy - by;
    const sampleX = t => ((ax * t + bx) * t + cx) * t;
    const sampleY = t => ((ay * t + by) * t + cy) * t;
    const sampleDerivativeX = t => (3 * ax * t + 2 * bx) * t + cx;

    return progress => {
      const x = THREE.MathUtils.clamp(progress, 0, 1);
      if (x === 0 || x === 1) return x;

      let t = x;
      for (let i = 0; i < 5; i++) {
        const slope = sampleDerivativeX(t);
        if (Math.abs(slope) < 1e-7) break;
        const next = t - (sampleX(t) - x) / slope;
        if (next < 0 || next > 1) break;
        t = next;
      }

      let low = 0;
      let high = 1;
      for (let i = 0; i < 8; i++) {
        const sampled = sampleX(t);
        if (Math.abs(sampled - x) < 1e-6) break;
        if (sampled < x) low = t;
        else high = t;
        t = (low + high) * 0.5;
      }
      return sampleY(t);
    };
  }

  _resolveFlipEasing() {
    const value = String(this._cardFlipEasing || 'ease').trim().toLowerCase();
    if (value === this._flipEasingCacheKey && this._flipEasingCacheFn) {
      return this._flipEasingCacheFn;
    }

    const presets = {
      linear: [0, 0, 1, 1],
      ease: [0.25, 0.1, 0.25, 1],
      'ease-in': [0.42, 0, 1, 1],
      'ease-out': [0, 0, 0.58, 1],
      'ease-in-out': [0.42, 0, 0.58, 1]
    };
    let points = presets[value];

    if (!points && value.startsWith('cubic-bezier(') && value.endsWith(')')) {
      const numbers = value.slice(13, -1).split(',').map(part => Number(part.trim()));
      if (
        numbers.length === 4 &&
        numbers.every(Number.isFinite) &&
        numbers[0] >= 0 && numbers[0] <= 1 &&
        numbers[2] >= 0 && numbers[2] <= 1
      ) {
        points = numbers;
      }
    }

    if (!points) points = presets.ease;
    const fn = this._createCubicBezier(points[0], points[1], points[2], points[3]);
    this._flipEasingCacheKey = value;
    this._flipEasingCacheFn = fn;
    return fn;
  }

  _findPointerCell() {
    if (
      !this._pointerInWindow ||
      !this._layerVisible ||
      !this._layerMetrics ||
      !this._layerBounds ||
      !this._gridBounds
    ) {
      return false;
    }

    const metrics = this._layerMetrics;
    const bounds = this._layerBounds;
    const m = metrics.matrix;
    const dx = this._pointerClientX - m.e;
    const dy = this._pointerClientY - m.f;
    const svgX = (m.d * dx - m.c * dy) / metrics.determinant;
    const svgY = (-m.b * dx + m.a * dy) / metrics.determinant;

    if (
      svgX < bounds.x || svgX > bounds.x + bounds.width ||
      svgY < bounds.y || svgY > bounds.y + bounds.height
    ) {
      return false;
    }

    if (typeof this._shapePath.isPointInFill === 'function') {
      this._svgHitPoint.x = svgX;
      this._svgHitPoint.y = svgY;
      try {
        if (!this._shapePath.isPointInFill(this._svgHitPoint)) return false;
      } catch (_error) {
        // Chromium supports isPointInFill. If a browser does not, the tight SVG
        // layer bounds still prevent hit testing outside this card's visible area.
      }
    }

    const ndcX = (svgX - bounds.x) / bounds.width * 2 - 1;
    const ndcY = 1 - (svgY - bounds.y) / bounds.height * 2;
    const camera = this._camera;
    camera.updateMatrixWorld(true);
    this._boardGroup.updateMatrixWorld(true);
    this._boardInverse.copy(this._boardGroup.matrixWorld).invert();

    const origin = this._hoverRayOriginLocal
      .copy(camera.position)
      .applyMatrix4(this._boardInverse);
    const point = this._hoverRayPointLocal
      .set(ndcX, ndcY, 0.5)
      .unproject(camera)
      .applyMatrix4(this._boardInverse);
    const dz = point.z - origin.z;
    if (Math.abs(dz) < 1e-8) return false;

    const t = -origin.z / dz;
    if (t <= 0 || !Number.isFinite(t)) return false;

    const x = origin.x + (point.x - origin.x) * t;
    const y = origin.y + (point.y - origin.y) * t;
    const col = Math.round(x / this._pitchX);
    const row = Math.round(y / this._pitchY);
    if (
      Math.abs(x - col * this._pitchX) > this._cardWidth * 0.5 ||
      Math.abs(y - row * this._pitchY) > this._cardHeight * 0.5
    ) {
      return false;
    }

    const grid = this._gridBounds;
    if (
      col < grid.minCol || col > grid.maxCol ||
      row < grid.minRow || row > grid.maxRow
    ) {
      return false;
    }

    this._pointerHitCol = col;
    this._pointerHitRow = row;
    return true;
  }

  _getNextFlipTarget(baseAngle, currentAngle, hovered) {
    const turn = Math.PI * 2;
    let target = baseAngle + (hovered ? Math.PI : 0);
    while (target <= currentAngle + 1e-7) target += turn;
    return target;
  }

  _writeCellMatrix(col, row, angle) {
    const grid = this._gridBounds;
    if (!grid || !this._cardGrid || !this._faceGrid) return false;
    if (
      col < grid.minCol || col > grid.maxCol ||
      row < grid.minRow || row > grid.maxRow
    ) {
      return false;
    }

    const columns = grid.maxCol - grid.minCol + 1;
    const index = (row - grid.minRow) * columns + (col - grid.minCol);
    this._instanceMatrix.makeRotationY(angle);
    this._instanceMatrix.setPosition(col * this._pitchX, row * this._pitchY, 0);
    this._cardGrid.setMatrixAt(index, this._instanceMatrix);
    this._faceGrid.setMatrixAt(index, this._instanceMatrix);
    return true;
  }

  _markInstanceMatricesDirty() {
    if (!this._cardGrid || !this._faceGrid) return;
    this._cardGrid.instanceMatrix.needsUpdate = true;
    this._faceGrid.instanceMatrix.needsUpdate = true;
    this._needsRender = true;
  }

  _sampleFlipState(state, timestamp) {
    if (!state.animating) return state.currentAngle;
    const progress = state.duration <= 0
      ? 1
      : THREE.MathUtils.clamp((timestamp - state.startTime) / state.duration, 0, 1);
    const eased = progress >= 1 ? 1 : state.easing(progress);
    state.currentAngle = state.startAngle +
      (state.targetAngle - state.startAngle) * eased;
    if (progress >= 1) state.animating = false;
    return state.currentAngle;
  }

  _startCellFlip(col, row, hovered, timestamp) {
    const key = this._cellKey(col, row);
    const baseAngle = this._getBaseCardAngle(col, row);
    let state = this._flipStates.get(key);

    if (!state) {
      state = {
        col,
        row,
        baseAngle,
        currentAngle: baseAngle,
        startAngle: baseAngle,
        targetAngle: baseAngle,
        startTime: timestamp,
        duration: 0,
        easing: null,
        hovered: false,
        animating: false
      };
      this._flipStates.set(key, state);
    }

    if (state.animating) this._sampleFlipState(state, timestamp);
    if (state.hovered === hovered && (state.animating || hovered)) return;
    state.hovered = hovered;

    const durationSeconds = Number.isFinite(this._cardFlipDuration)
      ? Math.max(0, this._cardFlipDuration)
      : PICTURE_CARD_FLIP_DURATION;

    if (durationSeconds === 0) {
      state.currentAngle = hovered ? baseAngle + Math.PI : baseAngle;
      state.animating = false;
      if (this._writeCellMatrix(col, row, state.currentAngle)) {
        this._markInstanceMatricesDirty();
      }
      if (!hovered) this._flipStates.delete(key);
      return;
    }

    const targetAngle = this._getNextFlipTarget(
      baseAngle,
      state.currentAngle,
      hovered
    );
    const distanceRatio = Math.max(1e-6, (targetAngle - state.currentAngle) / Math.PI);
    state.startAngle = state.currentAngle;
    state.targetAngle = targetAngle;
    state.startTime = timestamp;
    state.duration = durationSeconds * 1000 * distanceRatio;
    state.easing = this._resolveFlipEasing();
    state.animating = true;
  }

  _syncPointerHover(timestamp) {
    this._hoverDirty = false;
    const hasCell = this._findPointerCell();
    const nextCol = hasCell ? this._pointerHitCol : 0;
    const nextRow = hasCell ? this._pointerHitRow : 0;
    const sameCell = hasCell
      ? this._hoverCellKey !== null &&
        nextCol === this._hoverCol && nextRow === this._hoverRow
      : this._hoverCellKey === null;

    if (sameCell) return false;

    if (this._hoverCellKey !== null) {
      this._startCellFlip(this._hoverCol, this._hoverRow, false, timestamp);
    }

    this._hoverCellKey = hasCell ? this._cellKey(nextCol, nextRow) : null;
    if (hasCell) {
      this._hoverCol = nextCol;
      this._hoverRow = nextRow;
      this._startCellFlip(nextCol, nextRow, true, timestamp);
    }
    return true;
  }

  _applyFlipStatesToGrid() {
    let changed = false;
    for (const state of this._flipStates.values()) {
      if (this._writeCellMatrix(state.col, state.row, state.currentAngle)) {
        changed = true;
      }
    }
    return changed;
  }

  _updateFlipAnimations(timestamp) {
    let wroteMatrix = false;
    let hasActiveAnimation = false;

    for (const [key, state] of this._flipStates) {
      if (!state.animating) continue;

      this._sampleFlipState(state, timestamp);

      if (!state.animating) {
        state.currentAngle = state.targetAngle;
        if (!state.hovered) {
          state.currentAngle = state.baseAngle;
          if (this._writeCellMatrix(state.col, state.row, state.baseAngle)) {
            wroteMatrix = true;
          }
          this._flipStates.delete(key);
          continue;
        }
      } else {
        hasActiveAnimation = true;
      }

      if (this._writeCellMatrix(state.col, state.row, state.currentAngle)) {
        wroteMatrix = true;
      }
    }

    if (wroteMatrix) this._markInstanceMatricesDirty();
    return hasActiveAnimation;
  }

  _ensureGridCapacity(required) {
    if (required <= this._gridCapacity) return true;

    let capacity = Math.max(16, this._gridCapacity || 0);
    while (capacity < required && capacity < MAX_GRID_INSTANCES) capacity *= 2;
    capacity = Math.min(capacity, MAX_GRID_INSTANCES);
    if (capacity < required) return false;

    const previousCardGrid = this._cardGrid;
    const previousFaceGrid = this._faceGrid;

    const nextCardGrid = new THREE.InstancedMesh(
      this._cardGeometry,
      this._cardMaterial,
      capacity
    );
    nextCardGrid.count = 0;
    nextCardGrid.frustumCulled = false;
    nextCardGrid.instanceMatrix.setUsage(THREE.DynamicDrawUsage);

    const faceGeometry = this._faceGeometry.clone();
    const faceIndices = new THREE.InstancedBufferAttribute(
      new Float32Array(capacity * 2),
      2
    );
    faceIndices.setUsage(THREE.DynamicDrawUsage);
    faceGeometry.setAttribute('instanceFaceIndices', faceIndices);

    const nextFaceGrid = new THREE.InstancedMesh(
      faceGeometry,
      this._faceMaterial,
      capacity
    );
    nextFaceGrid.count = 0;
    nextFaceGrid.frustumCulled = false;
    nextFaceGrid.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    nextFaceGrid.visible = this._faceAtlasReady;

    this._boardGroup.add(nextCardGrid, nextFaceGrid);
    this._cardGrid = nextCardGrid;
    this._faceGrid = nextFaceGrid;
    this._gridCapacity = capacity;

    if (previousCardGrid) {
      this._boardGroup.remove(previousCardGrid);
      previousCardGrid.dispose?.();
    }
    if (previousFaceGrid) {
      this._boardGroup.remove(previousFaceGrid);
      previousFaceGrid.geometry.dispose();
      previousFaceGrid.dispose?.();
    }
    return true;
  }

  _syncGridBounds() {
    this._gridDirty = false;

    const view = this._visiblePlaneBounds();
    if (!view) return false;

    const minCol = Math.floor((view.minX - this._cardWidth / 2) / this._pitchX) - 1;
    const maxCol = Math.ceil((view.maxX + this._cardWidth / 2) / this._pitchX) + 1;
    const minRow = Math.floor((view.minY - this._cardHeight / 2) / this._pitchY) - 1;
    const maxRow = Math.ceil((view.maxY + this._cardHeight / 2) / this._pitchY) + 1;

    const previous = this._gridBounds;
    if (
      previous &&
      previous.minCol === minCol &&
      previous.maxCol === maxCol &&
      previous.minRow === minRow &&
      previous.maxRow === maxRow
    ) {
      return false;
    }

    const columnCount = maxCol - minCol + 1;
    const rowCount = maxRow - minRow + 1;
    const required = columnCount * rowCount;
    if (required <= 0 || required > MAX_GRID_INSTANCES) return false;
    if (!this._ensureGridCapacity(required) || !this._cardGrid || !this._faceGrid) {
      return false;
    }

    const faceIndices = this._faceGrid.geometry.getAttribute('instanceFaceIndices');
    let index = 0;

    for (let row = minRow; row <= maxRow; row++) {
      const y = row * this._pitchY;
      for (let col = minCol; col <= maxCol; col++) {
        const x = col * this._pitchX;
        const alphabetIndex = this._hashCell(col, row, HASH_SALT_ALPHABET) %
          ALPHABET_FACE_COUNT;
        const pictureIndex = ALPHABET_FACE_COUNT +
          this._hashCell(col, row, HASH_SALT_PICTURE) % PICTURE_FACE_COUNT;
        const baseAngle = this._getBaseCardAngle(col, row);

        if (baseAngle === 0) {
          this._instanceMatrix.makeTranslation(x, y, 0);
        } else {
          this._instanceMatrix.makeRotationY(baseAngle);
          this._instanceMatrix.setPosition(x, y, 0);
        }

        this._cardGrid.setMatrixAt(index, this._instanceMatrix);
        this._faceGrid.setMatrixAt(index, this._instanceMatrix);
        faceIndices.setXY(index, alphabetIndex, pictureIndex);
        index++;
      }
    }

    this._cardGrid.count = required;
    this._faceGrid.count = required;
    this._gridBounds = { minCol, maxCol, minRow, maxRow };
    this._applyFlipStatesToGrid();
    this._cardGrid.instanceMatrix.needsUpdate = true;
    this._faceGrid.instanceMatrix.needsUpdate = true;
    faceIndices.needsUpdate = true;

    this._hoverDirty = true;
    this._needsRender = true;
    return true;
  }

  _scheduleFrame() {
    if (this._disposed || this._frameId || document.visibilityState === 'hidden') return;
    this._frameId = requestAnimationFrame(this._boundFrame);
  }

  _frame(timestamp) {
    this._frameId = 0;
    if (this._disposed) return;

    if (!this._svg.isConnected) {
      this.dispose();
      if (activeApp === this) activeApp = null;
      return;
    }

    if (document.visibilityState === 'hidden') return;

    if (this._layoutDirty) this._updateLayerLayout();

    let hasActiveFlip = false;
    if (this._layerVisible) {
      if (this._tiltDirty) this._syncBoardTilt();
      if (this._gridDirty) this._syncGridBounds();
      if (this._hoverDirty) this._syncPointerHover(timestamp);
      hasActiveFlip = this._updateFlipAnimations(timestamp);

      if (this._needsRender) {
        this._renderer.render(this._scene, this._camera);
        this._needsRender = false;
      }
    }

    if (hasActiveFlip) this._scheduleFrame();
  }

  dispose() {
    if (this._disposed) return;
    this._disposed = true;

    if (this._frameId) cancelAnimationFrame(this._frameId);
    this._frameId = 0;

    this._shapePath.removeEventListener('wheel', this._onWheel);
    window.removeEventListener('mousemove', this._onMouseMove);
    window.removeEventListener('blur', this._onWindowBlur);
    window.removeEventListener('resize', this._onResize);
    window.removeEventListener('scroll', this._onResize, true);
    document.removeEventListener('visibilitychange', this._onVisibilityChange);
    this._mutationObserver?.disconnect();
    this._resizeObserver?.disconnect();
    this._flipStates.clear();
    this._hoverCellKey = null;

    if (this._cardGrid) {
      this._boardGroup.remove(this._cardGrid);
      this._cardGrid.dispose?.();
    }
    if (this._faceGrid) {
      this._boardGroup.remove(this._faceGrid);
      this._faceGrid.geometry.dispose();
      this._faceGrid.dispose?.();
    }
    if (this._boardGroup) this._scene.remove(this._boardGroup);

    this._cardGeometry?.dispose();
    this._faceGeometry?.dispose();
    this._cardMaterial?.dispose();
    this._faceMaterial?.dispose();
    this._faceAtlasTexture?.dispose();
    this._transparentFaceTexture?.dispose();

    this._renderer.dispose();
    this._renderer.forceContextLoss?.();
    this._renderer.domElement.remove();
    this._foreignObject.remove();
    this._defs.remove();

    if (this._addedSourceId) this._shapePath.removeAttribute('id');
  }
}

export default () => {
  try {
    activeApp?.dispose();
    const app = new FindTheSamePicture_3D();
    activeApp = app;

    return () => {
      if (activeApp === app) {
        activeApp.dispose();
        activeApp = null;
      }
    };
  } catch (error) {
    throw throwObj(
      error?.errCase ?? 'errorComn',
      error?.message ?? '3d findTheSamePicture.js error'
    );
  }
};
