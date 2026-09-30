import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

import throwObj from '@/client/js/module/errorHandler/throwObj';

const SVG_NS = 'http://www.w3.org/2000/svg';
const XHTML_NS = 'http://www.w3.org/1999/xhtml';
const PATH_NUMBER = /-?(?:\d+\.?\d*|\.\d+)(?:e[-+]?\d+)?/gi;
const MAX_PIXEL_RATIO = 2;
const MAX_GRID_INSTANCES = 16384;
const CUBE_SINK_DEPTH_RATIO = 3.0; // cube위에 mouse over 시 들어가는 최대 깊이 - default: 3.0
const CUBE_SINK_ANIMATION_SPEED = 3.0; // cube위에 mouse over 시 들어가는 animation 속도 - default: 6.0
const CUBE_BOARD_TILT_RATIO = 0.4;
const CUBE_DEPTH_LIGHTING_RATIO = 0; // 화면에 보여지는 cube의 입체감 - default: 0.35
const CUBE_COLOR_BLACK = 0x000000;
const CUBE_COLOR_WHITE = 0xffffff;
const BLACK_CUBE_NUMBERS = Object.freeze([0, 2, 4, 6, 8]);
const WHITE_CUBE_NUMBERS = Object.freeze([1, 3, 5, 7]);
const NUMBER_ATLAS_COLUMNS = 3;
const NUMBER_ATLAS_ROWS = 3;
const NUMBER_ATLAS_CELL_WIDTH = 384;
const NUMBER_ATLAS_CELL_HEIGHT = 538;
const NUMBER_ATLAS_UV_SCALE = 0.3;
const NUMBER_ATLAS_UV_PADDING = (1 / NUMBER_ATLAS_COLUMNS - NUMBER_ATLAS_UV_SCALE) * 0.5;
const NUMBER_FACE_OFFSET = 0.006;
const DEPTH_EPSILON = 1e-7;
let nextLayerId = 0;
let activeApp = null;

class BlackAndWhite1_3D {
  constructor() {
    this._svg = document.querySelector('svg.card.blackAndWhite1');
    if (!this._svg) {
      throw throwObj('elementLoss', 'blackAndWhite1.js - svg.card.blackAndWhite1 element failed.');
    }

    this._shapePath = this._svg.querySelector("path.shape-path[data-shape='blackAndWhite1']");
    if (!this._shapePath) {
      throw throwObj('elementLoss', 'blackAndWhite1.js - blackAndWhite1 shape path failed.');
    }

    this._cubeWidth = 1;
    this._cubeHeight = 1.4;
    this._cubeDepth = 0.4;
    this._cubeMargin = 0.6; // cube와 cube사이의 간격
    this._pitchX = this._cubeWidth + this._cubeMargin;
    this._pitchY = this._cubeHeight + this._cubeMargin;
    // Maximum backward movement = cube depth × this ratio. Set 0 to disable.
    this._cubeSinkDepthRatio = CUBE_SINK_DEPTH_RATIO;
    // Time-based sink/return smoothing. Larger values react faster; 0 snaps instantly.
    this._cubeSinkAnimationSpeed = CUBE_SINK_ANIMATION_SPEED;
    // Whole-board tilt: 0 disables it; larger values increase the maximum tilt.
    // 0.4 corresponds to atan(0.4) ≈ 21.8° at a viewport edge.
    this._cubeBoardTiltRatio = CUBE_BOARD_TILT_RATIO;
    // Lighting-only depth: 0 is completely flat; larger values strengthen facet contrast.
    this._cubeDepthLightingRatio = CUBE_DEPTH_LIGHTING_RATIO;
    // Editable XHTML background below the transparent WebGL canvas.
    this._cubeBackgroundColor = '#e9eff6';
    this.defaultCameraPos = { x: 0, y: 0, z: 10 };

    this._disposed = false;
    this._layoutDirty = true;
    this._gridDirty = true;
    this._tiltDirty = true;
    this._projectionDirty = true;
    this._depthDirty = true;
    this._needsRender = true;
    this._layerVisible = false;
    this._activeMotionCount = 0;
    this._layerMetrics = null;
    this._layerBounds = null;
    this._layoutKey = '';
    this._pixelRatio = 0;
    this._gridBounds = null;
    this._gridCapacity = 0;
    this._gridScreenPositions = null;
    this._numberAtlasOffsets = null;
    this._depthTargets = null;
    // Reused scratch buffer for preserving the current sink depth when the
    // visible grid bounds shift because of board tilt/zoom/resize.
    this._gridDepthSnapshot = null;
    this._depthAnimating = false;
    this._lastFrameTime = 0;
    this._frameId = 0;
    this._depthEdges = [];
    this._shapeHitInverse = null;
    this._shapeHitPoint = typeof DOMPoint !== 'undefined' ? new DOMPoint() : { x: 0, y: 0 };
    this._pointerClientX = window.innerWidth * 0.5;
    this._pointerClientY = window.innerHeight * 0.5;
    this._pointerNdcX = 0;
    this._pointerNdcY = 0;
    this._pointerInside = false;
    this._boardTiltX = 0;
    this._boardTiltY = 0;

    this._gridMatrix = new THREE.Matrix4();
    this._cubeColorBlack = new THREE.Color(CUBE_COLOR_BLACK);
    this._cubeColorWhite = new THREE.Color(CUBE_COLOR_WHITE);
    this._colorSeed = (Math.random() * 0x100000000) >>> 0;
    this._viewProjection = new THREE.Matrix4();
    this._boardViewProjection = new THREE.Matrix4();
    this._boardInverse = new THREE.Matrix4();
    this._rayOriginLocal = new THREE.Vector3();
    this._rayPointLocal = new THREE.Vector3();

    this._renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this._renderer.setClearColor(0x000000, 0);
    const gl = this._renderer.getContext();
    this._gpuMaxCanvasSide = Math.min(
      this._renderer.capabilities.maxTextureSize || 16384,
      gl.getParameter(gl.MAX_RENDERBUFFER_SIZE) || 16384
    );

    this._scene = new THREE.Scene();
    this._setupCamera();
    this._setupLight();
    this._setupModel();
    this._mountCanvas();
    this._setupControls();
    this._setupPointerDepth();
    this._setupObservers();

    this._boundFrame = this._frame.bind(this);
    this._scheduleFrame();
  }

  _setupCamera() {
    this._camera = new THREE.PerspectiveCamera(75, 1, 0.1, 100);
    this._camera.position.set(
      this.defaultCameraPos.x,
      this.defaultCameraPos.y,
      this.defaultCameraPos.z
    );
    this._camera.lookAt(0, 0, 0);
  }

  _setupLight() {
    const ratio = Number.isFinite(this._cubeDepthLightingRatio)
      ? Math.max(0, this._cubeDepthLightingRatio)
      : 0;

    // Keep ratio=0 visually flat, then trade a little ambient light for directional
    // contrast as the ratio rises. This preserves the black/white identity while
    // exposing only a subtle amount of the cube's Z thickness.
    this._ambientLight = new THREE.AmbientLight(0xffffff, 1 / (1 + ratio));
    this._scene.add(this._ambientLight);

    if (ratio <= 0) return;

    this._keyLight = new THREE.DirectionalLight(0xffffff, ratio);
    this._keyLight.position.set(-3, 4, 8);
    this._scene.add(this._keyLight);

    this._fillLight = new THREE.DirectionalLight(0xffffff, ratio * 0.18);
    this._fillLight.position.set(4, -2, 3);
    this._scene.add(this._fillLight);
  }

  _setupModel() {
    this._cubeGeometry = new THREE.BoxGeometry(
      this._cubeWidth,
      this._cubeHeight,
      this._cubeDepth
    );
    this._cubeMaterial = new THREE.MeshPhongMaterial({
      color: 0xffffff,
      specular: 0x333333,
      shininess: 42
    });

    this._numberTexture = this._createNumberAtlasTexture();
    // The number plane doubles as an unlit front-face cover. This keeps the
    // visible face exactly black/white regardless of directional lighting while
    // the BoxGeometry sides retain subtle depth shading.
    this._numberGeometry = new THREE.PlaneGeometry(this._cubeWidth, this._cubeHeight);
    this._numberGeometry.translate(0, 0, this._cubeDepth * 0.5 + NUMBER_FACE_OFFSET);
    this._numberMaterial = new THREE.MeshBasicMaterial({
      map: this._numberTexture,
      transparent: false,
      depthWrite: true,
      toneMapped: false
    });
    this._numberMaterial.onBeforeCompile = shader => {
      shader.vertexShader = shader.vertexShader
        .replace(
          '#include <common>',
          '#include <common>\nattribute vec2 instanceAtlasOffset;'
        )
        .replace(
          '#include <uv_vertex>',
          `#include <uv_vertex>\n#ifdef USE_MAP\n  vMapUv = uv * vec2(${NUMBER_ATLAS_UV_SCALE.toFixed(9)}) + instanceAtlasOffset;\n#endif`
        );
    };
    this._numberMaterial.customProgramCacheKey = () => 'blackAndWhite1-number-atlas-v1';

    this._boardGroup = new THREE.Group();
    this._scene.add(this._boardGroup);
    this._cubeGrid = null;
    this._numberGrid = null;
  }

  _createNumberAtlasTexture() {
    const width = NUMBER_ATLAS_COLUMNS * NUMBER_ATLAS_CELL_WIDTH;
    const height = NUMBER_ATLAS_ROWS * NUMBER_ATLAS_CELL_HEIGHT;
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;

    const context = canvas.getContext('2d');
    if (!context) {
      throw throwObj('errorComn', 'blackAndWhite1.js - number atlas canvas context failed.');
    }

    context.clearRect(0, 0, width, height);
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.lineJoin = 'round';
    context.miterLimit = 2;

    const fontSize = Math.round(NUMBER_ATLAS_CELL_WIDTH * 0.68);
    context.font = `600 ${fontSize}px "Arial Narrow", "Helvetica Neue", Arial, sans-serif`;

    for (let digit = 0; digit <= 8; digit++) {
      const column = digit % NUMBER_ATLAS_COLUMNS;
      const row = Math.floor(digit / NUMBER_ATLAS_COLUMNS);
      const cellX = column * NUMBER_ATLAS_CELL_WIDTH;
      const cellY = row * NUMBER_ATLAS_CELL_HEIGHT;
      const centerX = cellX + NUMBER_ATLAS_CELL_WIDTH * 0.5;
      const centerY = cellY + NUMBER_ATLAS_CELL_HEIGHT * 0.5 + NUMBER_ATLAS_CELL_HEIGHT * 0.013;
      const isBlackCubeNumber = (digit & 1) === 0;

      context.save();
      // Opaque exact-color face: lighting can never turn white gray or black
      // charcoal on the screen-facing face.
      context.fillStyle = isBlackCubeNumber ? '#000000' : '#ffffff';
      context.fillRect(cellX, cellY, NUMBER_ATLAS_CELL_WIDTH, NUMBER_ATLAS_CELL_HEIGHT);

      context.shadowOffsetX = 0;
      context.shadowOffsetY = Math.round(NUMBER_ATLAS_CELL_WIDTH * 0.012);
      context.shadowBlur = Math.round(NUMBER_ATLAS_CELL_WIDTH * 0.025);
      context.shadowColor = isBlackCubeNumber
        ? 'rgba(0, 0, 0, 0.72)'
        : 'rgba(255, 255, 255, 0.72)';
      context.lineWidth = Math.max(2, NUMBER_ATLAS_CELL_WIDTH * 0.008);
      context.strokeStyle = isBlackCubeNumber
        ? 'rgba(255, 255, 255, 0.34)'
        : 'rgba(0, 0, 0, 0.16)';
      context.fillStyle = isBlackCubeNumber ? '#f4f1e8' : '#171a1f';
      context.strokeText(String(digit), centerX, centerY);
      context.fillText(String(digit), centerX, centerY);
      context.restore();
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.minFilter = THREE.LinearMipmapLinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.generateMipmaps = true;
    texture.anisotropy = Math.min(8, this._renderer.capabilities.getMaxAnisotropy?.() || 1);
    if ('colorSpace' in texture && THREE.SRGBColorSpace) texture.colorSpace = THREE.SRGBColorSpace;
    texture.needsUpdate = true;
    return texture;
  }

  _mountCanvas() {
    const serial = ++nextLayerId;
    this._defs = document.createElementNS(SVG_NS, 'defs');
    const clipPath = document.createElementNS(SVG_NS, 'clipPath');
    const clipUse = document.createElementNS(SVG_NS, 'use');
    this._foreignObject = document.createElementNS(SVG_NS, 'foreignObject');

    this._addedSourceId = !this._shapePath.id;
    if (this._addedSourceId) {
      this._shapePath.id = `blackAndWhite1-three-source-${serial}`;
    }

    clipPath.id = `blackAndWhite1-three-clip-${serial}`;
    clipPath.setAttribute('clipPathUnits', 'userSpaceOnUse');
    clipUse.setAttribute('href', `#${this._shapePath.id}`);
    clipPath.appendChild(clipUse);
    this._defs.appendChild(clipPath);

    const layer = this._foreignObject;
    layer.classList.add('blackAndWhite1-three-layer');
    layer.setAttribute('clip-path', `url(#${clipPath.id})`);
    layer.setAttribute('pointer-events', 'none');
    layer.style.pointerEvents = 'none';
    layer.style.visibility = 'hidden';

    // Keep the background independent from WebGL so it can be edited without
    // touching cube materials, lights, renderer clear color, or grid state.
    this._backgroundDiv = document.createElementNS(XHTML_NS, 'div');
    this._backgroundDiv.className = 'blackAndWhite1-three-background';
    this._backgroundDiv.style.position = 'relative';
    this._backgroundDiv.style.width = '100%';
    this._backgroundDiv.style.height = '100%';
    this._backgroundDiv.style.backgroundColor = this._cubeBackgroundColor;
    this._backgroundDiv.style.overflow = 'hidden';
    this._backgroundDiv.style.pointerEvents = 'none';

    const canvas = this._renderer.domElement;
    canvas.classList.add('blackAndWhite1-three-canvas');
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

    this._pointerActiveId = null;
    this._dragged = false;
    this._suppressNextClick = false;

    this._onDragMove = event => {
      if (event.pointerId !== this._pointerActiveId || this._dragged) return;
      const dx = event.clientX - this._pointerDownX;
      const dy = event.clientY - this._pointerDownY;
      if (dx * dx + dy * dy > 16) this._dragged = true;
    };

    this._stopDragTracking = () => {
      document.removeEventListener('pointermove', this._onDragMove);
      document.removeEventListener('pointerup', this._onDragEnd);
      document.removeEventListener('pointercancel', this._onDragCancel);
    };

    this._onDragEnd = event => {
      if (event.pointerId !== this._pointerActiveId) return;
      this._suppressNextClick = this._dragged;
      this._pointerActiveId = null;
      this._stopDragTracking();
    };

    this._onDragCancel = event => {
      if (event.pointerId !== this._pointerActiveId) return;
      this._pointerActiveId = null;
      this._dragged = false;
      this._suppressNextClick = false;
      this._stopDragTracking();
    };

    this._onPathPointerDown = event => {
      this._pointerActiveId = event.pointerId;
      this._pointerDownX = event.clientX;
      this._pointerDownY = event.clientY;
      this._dragged = false;
      this._suppressNextClick = false;
      document.addEventListener('pointermove', this._onDragMove, { passive: true });
      document.addEventListener('pointerup', this._onDragEnd, { passive: true });
      document.addEventListener('pointercancel', this._onDragCancel, { passive: true });
    };

    this._onPathClick = event => {
      if (!this._suppressNextClick) return;
      this._suppressNextClick = false;
      event.preventDefault();
      event.stopPropagation();
    };

    this._shapePath.addEventListener('pointerdown', this._onPathPointerDown, { passive: true });
    this._shapePath.addEventListener('click', this._onPathClick);
  }

  _setupControls() {
    this._controls = new OrbitControls(this._camera, this._svg);
    this._controls.minDistance = 1;
    this._controls.maxDistance = 30;
    this._controls.enableRotate = false;
    this._controls.enablePan = false;
    this._controls.enableZoom = true;

    this._onControlsChange = () => {
      this._gridDirty = true;
      this._projectionDirty = true;
      this._depthDirty = true;
      this._needsRender = true;
      this._scheduleFrame();
    };
    this._controls.addEventListener('change', this._onControlsChange);
  }

  _setupPointerDepth() {
    this._onMouseMove = event => {
      // Pointer-position effects are hover-only. A pressed-button drag must not
      // rotate, pan, sink or otherwise drive the Three.js board.
      if (event.buttons !== 0) return;

      const x = event.clientX;
      const y = event.clientY;
      if (x === this._pointerClientX && y === this._pointerClientY) return;

      const wasInside = this._pointerInside;
      this._pointerClientX = x;
      this._pointerClientY = y;
      this._pointerNdcX = THREE.MathUtils.clamp(x / Math.max(1, window.innerWidth) * 2 - 1, -1, 1);
      this._pointerNdcY = THREE.MathUtils.clamp(1 - y / Math.max(1, window.innerHeight) * 2, -1, 1);
      this._pointerInside = this._pointInsideShape(x, y);

      this._tiltDirty = true;
      // Depth only needs a refresh while entering, leaving or moving inside the path.
      if (wasInside || this._pointerInside) this._depthDirty = true;
      this._scheduleFrame();
    };

    window.addEventListener('mousemove', this._onMouseMove, { passive: true });
  }

  _setupObservers() {
    this._markLayoutDirty = () => {
      this._layoutDirty = true;
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

    this._motionTarget = this._svgParent || this._svg;
    this._onMotionStart = () => {
      this._activeMotionCount++;
      this._layoutDirty = true;
      this._scheduleFrame();
    };
    this._onMotionEnd = () => {
      this._activeMotionCount = Math.max(0, this._activeMotionCount - 1);
      this._layoutDirty = true;
      this._scheduleFrame();
    };

    for (const eventName of ['transitionstart', 'animationstart']) {
      this._motionTarget.addEventListener(eventName, this._onMotionStart, true);
    }
    for (const eventName of ['transitionend', 'transitioncancel', 'animationend', 'animationcancel']) {
      this._motionTarget.addEventListener(eventName, this._onMotionEnd, true);
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

  _refreshShapeHitTest() {
    const matrix = this._shapePath.getScreenCTM();
    if (!matrix) {
      this._shapeHitInverse = null;
      return;
    }

    const determinant = matrix.a * matrix.d - matrix.b * matrix.c;
    if (!Number.isFinite(determinant) || Math.abs(determinant) < 1e-12) {
      this._shapeHitInverse = null;
      return;
    }

    const invDet = 1 / determinant;
    this._shapeHitInverse = {
      a: matrix.d * invDet,
      b: -matrix.b * invDet,
      c: -matrix.c * invDet,
      d: matrix.a * invDet,
      e: (matrix.c * matrix.f - matrix.d * matrix.e) * invDet,
      f: (matrix.b * matrix.e - matrix.a * matrix.f) * invDet
    };
  }

  _pointInsideShape(x, y) {
    const inverse = this._shapeHitInverse;
    const isPointInFill = this._shapePath.isPointInFill;

    if (inverse && typeof isPointInFill === 'function') {
      const point = this._shapeHitPoint;
      point.x = inverse.a * x + inverse.c * y + inverse.e;
      point.y = inverse.b * x + inverse.d * y + inverse.f;

      try {
        return isPointInFill.call(this._shapePath, point);
      } catch (_error) {
        // Older engines can reject DOMPointInit variants. Fall back to the
        // already-cached continuous polygon boundary without changing behavior.
      }
    }

    return this._pointInsideDepthBoundary(x, y);
  }

  _setDepthBoundary(screenPolygon) {
    const count = screenPolygon.length;
    if (count < 3) {
      this._depthEdges = [];
      this._pointerInside = false;
      return;
    }

    let centerX = 0;
    let centerY = 0;
    for (let i = 0; i < count; i++) {
      centerX += screenPolygon[i].x;
      centerY += screenPolygon[i].y;
    }
    centerX /= count;
    centerY /= count;

    const edges = new Array(count);
    for (let i = 0; i < count; i++) {
      const a = screenPolygon[i];
      const b = screenPolygon[(i + 1) % count];
      let edgeA = -(b.y - a.y);
      let edgeB = b.x - a.x;
      let edgeC = -(edgeA * a.x + edgeB * a.y);

      if (edgeA * centerX + edgeB * centerY + edgeC < 0) {
        edgeA = -edgeA;
        edgeB = -edgeB;
        edgeC = -edgeC;
      }
      edges[i] = { a: edgeA, b: edgeB, c: edgeC, pointerSide: 0 };
    }

    this._depthEdges = edges;
    this._pointerInside = this._pointInsideShape(
      this._pointerClientX,
      this._pointerClientY
    );
  }

  _pointInsideDepthBoundary(x, y) {
    const edges = this._depthEdges;
    if (edges.length < 3) return false;

    for (let i = 0; i < edges.length; i++) {
      const edge = edges[i];
      if (edge.a * x + edge.b * y + edge.c < -DEPTH_EPSILON) return false;
    }
    return true;
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

    const clipped = this._clipPolygonToViewport(screenPoints, metrics.width, metrics.height);
    if (clipped.length < 3) return null;
    this._setDepthBoundary(clipped);

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
    this._depthEdges = [];
    this._pointerInside = false;
    this._refreshShapeHitTest();

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
      this._depthDirty = true;
      this._depthAnimating = false;
      if (this._layerVisible) {
        this._foreignObject.style.visibility = 'hidden';
        this._layerVisible = false;
        this._renderer.setSize(1, 1, false);
      }
      return;
    }

    // Path/viewport changes can alter both projection and depth boundary.
    this._projectionDirty = true;
    this._depthDirty = true;

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
      this._projectionDirty = true;
      this._depthDirty = true;
      this._needsRender = true;
    }

    if (!this._layerVisible) {
      this._foreignObject.style.visibility = 'visible';
      this._layerVisible = true;
      this._gridDirty = true;
      this._projectionDirty = true;
      this._depthDirty = true;
      this._needsRender = true;
    }
  }

  _syncBoardTilt() {
    this._tiltDirty = false;

    const ratio = Number.isFinite(this._cubeBoardTiltRatio)
      ? Math.max(0, this._cubeBoardTiltRatio)
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

    // The tilted board changes the local area required to cover the camera crop,
    // and the cached screen positions used by pointer depth.
    this._gridDirty = true;
    this._projectionDirty = true;
    this._depthDirty = true;
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

  _ensureGridCapacity(required) {
    if (required <= this._gridCapacity) return;

    let capacity = Math.max(16, this._gridCapacity || 0);
    while (capacity < required) capacity *= 2;
    capacity = Math.min(capacity, MAX_GRID_INSTANCES);

    const previousCubeGrid = this._cubeGrid;
    const previousNumberGrid = this._numberGrid;

    const nextCubeGrid = new THREE.InstancedMesh(
      this._cubeGeometry,
      this._cubeMaterial,
      capacity
    );
    nextCubeGrid.count = 0;
    nextCubeGrid.frustumCulled = false;
    nextCubeGrid.instanceMatrix.setUsage(THREE.DynamicDrawUsage);

    const atlasOffsets = new THREE.InstancedBufferAttribute(
      new Float32Array(capacity * 2),
      2
    );
    atlasOffsets.setUsage(THREE.DynamicDrawUsage);
    this._numberGeometry.setAttribute('instanceAtlasOffset', atlasOffsets);

    const nextNumberGrid = new THREE.InstancedMesh(
      this._numberGeometry,
      this._numberMaterial,
      capacity
    );
    nextNumberGrid.count = 0;
    nextNumberGrid.frustumCulled = false;
    nextNumberGrid.renderOrder = 1;
    nextNumberGrid.instanceMatrix.setUsage(THREE.DynamicDrawUsage);

    this._boardGroup.add(nextCubeGrid, nextNumberGrid);
    this._cubeGrid = nextCubeGrid;
    this._numberGrid = nextNumberGrid;
    this._numberAtlasOffsets = atlasOffsets;
    this._gridCapacity = capacity;
    this._gridScreenPositions = new Float32Array(capacity * 2);
    this._depthTargets = new Float32Array(capacity);
    this._depthAnimating = false;

    if (previousCubeGrid) {
      this._boardGroup.remove(previousCubeGrid);
      previousCubeGrid.dispose?.();
    }
    if (previousNumberGrid) {
      this._boardGroup.remove(previousNumberGrid);
      previousNumberGrid.dispose?.();
    }
  }

  _cubeHash(row, col) {
    // One seed per app + deterministic coordinate hash: a fresh layout on init,
    // but stable color/number identity across resize and wheel zoom.
    let hash = Math.imul(col, 0x1f123bb5) ^ Math.imul(row, 0x5f356495) ^ this._colorSeed;
    hash ^= hash >>> 16;
    hash = Math.imul(hash, 0x45d9f3b);
    hash ^= hash >>> 16;
    return hash >>> 0;
  }

  _syncGridBounds() {
    this._gridDirty = false;

    const view = this._visiblePlaneBounds();
    if (!view) return false;

    const minCol = Math.floor((view.minX - this._cubeWidth / 2) / this._pitchX) - 1;
    const maxCol = Math.ceil((view.maxX + this._cubeWidth / 2) / this._pitchX) + 1;
    const minRow = Math.floor((view.minY - this._cubeHeight / 2) / this._pitchY) - 1;
    const maxRow = Math.ceil((view.maxY + this._cubeHeight / 2) / this._pitchY) + 1;

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

    // Board tilt changes the visible plane continuously. Whenever that crosses a
    // grid-cell boundary, the row/column range shifts by one. Rebuilding every
    // instance at z=0 here used to make all already-sunk cubes pop forward for
    // one frame and restart their damping animation. Snapshot only the current Z
    // values (not full matrices) and remap them by stable row/column coordinates.
    const previousGrid = this._cubeGrid;
    const previousCount = previousGrid?.count ?? 0;
    const previousColumnCount = previous
      ? previous.maxCol - previous.minCol + 1
      : 0;
    let previousDepths = null;

    if (previous && previousGrid && previousCount > 0 && previousColumnCount > 0) {
      if (!this._gridDepthSnapshot || this._gridDepthSnapshot.length < previousCount) {
        this._gridDepthSnapshot = new Float32Array(previousCount);
      }

      previousDepths = this._gridDepthSnapshot;
      const previousMatrices = previousGrid.instanceMatrix.array;
      for (let previousIndex = 0; previousIndex < previousCount; previousIndex++) {
        previousDepths[previousIndex] = previousMatrices[previousIndex * 16 + 14];
      }
    }

    this._ensureGridCapacity(required);
    if (!this._cubeGrid || required > this._gridCapacity) return false;

    const atlasOffsets = this._numberAtlasOffsets.array;
    let index = 0;
    for (let row = minRow; row <= maxRow; row++) {
      const y = row * this._pitchY;
      for (let col = minCol; col <= maxCol; col++) {
        const hash = this._cubeHash(row, col);
        const isWhiteCube = (hash & 1) === 0;
        const numberPool = isWhiteCube ? WHITE_CUBE_NUMBERS : BLACK_CUBE_NUMBERS;
        const digit = numberPool[(hash >>> 1) % numberPool.length];

        let currentZ = 0;
        if (
          previousDepths &&
          row >= previous.minRow && row <= previous.maxRow &&
          col >= previous.minCol && col <= previous.maxCol
        ) {
          const previousIndex =
            (row - previous.minRow) * previousColumnCount +
            (col - previous.minCol);
          if (previousIndex >= 0 && previousIndex < previousCount) {
            currentZ = previousDepths[previousIndex];
          }
        }

        this._gridMatrix.makeTranslation(col * this._pitchX, y, currentZ);
        this._cubeGrid.setMatrixAt(index, this._gridMatrix);
        this._numberGrid.setMatrixAt(index, this._gridMatrix);
        this._cubeGrid.setColorAt(
          index,
          isWhiteCube ? this._cubeColorWhite : this._cubeColorBlack
        );

        const atlasIndex = index * 2;
        const atlasColumn = digit % NUMBER_ATLAS_COLUMNS;
        const atlasRow = Math.floor(digit / NUMBER_ATLAS_COLUMNS);
        atlasOffsets[atlasIndex] =
          atlasColumn / NUMBER_ATLAS_COLUMNS + NUMBER_ATLAS_UV_PADDING;
        atlasOffsets[atlasIndex + 1] =
          1 - (atlasRow + 1) / NUMBER_ATLAS_ROWS + NUMBER_ATLAS_UV_PADDING;
        index++;
      }
    }

    this._cubeGrid.count = required;
    this._numberGrid.count = required;
    this._cubeGrid.instanceMatrix.needsUpdate = true;
    this._numberGrid.instanceMatrix.needsUpdate = true;
    this._numberAtlasOffsets.needsUpdate = true;
    if (this._cubeGrid.instanceColor) this._cubeGrid.instanceColor.needsUpdate = true;
    this._gridBounds = { minCol, maxCol, minRow, maxRow };
    this._projectionDirty = true;
    this._depthDirty = true;
    return true;
  }

  _syncGridProjection() {
    this._projectionDirty = false;

    const grid = this._cubeGrid;
    const gridBounds = this._gridBounds;
    const positions = this._gridScreenPositions;
    const layerBounds = this._layerBounds;
    const metrics = this._layerMetrics;
    if (!grid || !gridBounds || !positions || !layerBounds || !metrics) return false;

    const camera = this._camera;
    camera.updateMatrixWorld(true);
    this._boardGroup.updateMatrixWorld(true);
    this._viewProjection.multiplyMatrices(
      camera.projectionMatrix,
      camera.matrixWorldInverse
    );
    const projection = this._boardViewProjection.multiplyMatrices(
      this._viewProjection,
      this._boardGroup.matrixWorld
    ).elements;
    const screenMatrix = metrics.matrix;
    const halfWidth = layerBounds.width * 0.5;
    const halfHeight = layerBounds.height * 0.5;
    let index = 0;

    for (let row = gridBounds.minRow; row <= gridBounds.maxRow; row++) {
      const y = row * this._pitchY;
      for (let col = gridBounds.minCol; col <= gridBounds.maxCol; col++) {
        const x = col * this._pitchX;
        const w = projection[3] * x + projection[7] * y + projection[15];
        const screenIndex = index * 2;

        if (Math.abs(w) <= DEPTH_EPSILON) {
          positions[screenIndex] = Number.NaN;
          positions[screenIndex + 1] = Number.NaN;
        } else {
          const invW = 1 / w;
          const localX = layerBounds.x +
            ((projection[0] * x + projection[4] * y + projection[12]) * invW + 1) * halfWidth;
          const localY = layerBounds.y +
            (1 - (projection[1] * x + projection[5] * y + projection[13]) * invW) * halfHeight;
          positions[screenIndex] =
            screenMatrix.a * localX + screenMatrix.c * localY + screenMatrix.e;
          positions[screenIndex + 1] =
            screenMatrix.b * localX + screenMatrix.d * localY + screenMatrix.f;
        }
        index++;
      }
    }

    this._depthDirty = true;
    return true;
  }

  _syncCubeDepthTargets() {
    this._depthDirty = false;

    const grid = this._cubeGrid;
    const positions = this._gridScreenPositions;
    const targets = this._depthTargets;
    if (!grid || !positions || !targets || !this._gridBounds) {
      this._depthAnimating = false;
      return false;
    }

    const ratio = Number.isFinite(this._cubeSinkDepthRatio)
      ? Math.max(0, this._cubeSinkDepthRatio)
      : 0;
    const maxDepth = this._cubeDepth * ratio;
    const edges = this._depthEdges;
    const useDepth = maxDepth > 0 && this._pointerInside && edges.length >= 3;
    const matrices = grid.instanceMatrix.array;
    const epsilon = Math.max(1e-5, this._cubeDepth * 1e-4);

    if (!useDepth) {
      let needsAnimation = false;
      for (let index = 0; index < grid.count; index++) {
        targets[index] = 0;
        if (Math.abs(matrices[index * 16 + 14]) > epsilon) needsAnimation = true;
      }
      this._depthAnimating = needsAnimation;
      return needsAnimation;
    }

    const pointerX = this._pointerClientX;
    const pointerY = this._pointerClientY;
    for (let i = 0; i < edges.length; i++) {
      const edge = edges[i];
      edge.pointerSide = Math.max(
        0,
        edge.a * pointerX + edge.b * pointerY + edge.c
      );
    }

    let needsAnimation = false;
    for (let index = 0; index < grid.count; index++) {
      const screenIndex = index * 2;
      const screenX = positions[screenIndex];
      const screenY = positions[screenIndex + 1];
      let targetZ = 0;

      if (Number.isFinite(screenX) && Number.isFinite(screenY)) {
        const dx = screenX - pointerX;
        const dy = screenY - pointerY;
        let weight = 1;

        if (dx * dx + dy * dy > DEPTH_EPSILON) {
          let boundaryScale = Infinity;
          for (let edgeIndex = 0; edgeIndex < edges.length; edgeIndex++) {
            const edge = edges[edgeIndex];
            const change = edge.a * dx + edge.b * dy;
            if (change >= -DEPTH_EPSILON) continue;

            const scale = -edge.pointerSide / change;
            if (scale < boundaryScale) boundaryScale = scale;
          }

          if (!Number.isFinite(boundaryScale) || boundaryScale <= 1) {
            weight = 0;
          } else {
            weight = THREE.MathUtils.clamp(1 - 1 / boundaryScale, 0, 1);
            // Smoothstep: pointer=1, every visible boundary=0, smooth in-between.
            weight = weight * weight * (3 - 2 * weight);
          }
        }

        if (weight > 0) targetZ = -maxDepth * weight;
      }

      targets[index] = targetZ;
      if (Math.abs(matrices[index * 16 + 14] - targetZ) > epsilon) {
        needsAnimation = true;
      }
    }

    this._depthAnimating = needsAnimation;
    return needsAnimation;
  }

  _animateCubeDepth(deltaSeconds) {
    if (!this._depthAnimating) return false;

    const grid = this._cubeGrid;
    const numberGrid = this._numberGrid;
    const targets = this._depthTargets;
    if (!grid || !numberGrid || !targets) {
      this._depthAnimating = false;
      return false;
    }

    const speed = Number.isFinite(this._cubeSinkAnimationSpeed)
      ? Math.max(0, this._cubeSinkAnimationSpeed)
      : CUBE_SINK_ANIMATION_SPEED;
    // Exponential damping keeps the perceived speed stable across 60/120 Hz and frame drops.
    const alpha = speed <= 0
      ? 1
      : 1 - Math.exp(-speed * Math.max(0, Math.min(deltaSeconds, 0.05)));
    const epsilon = Math.max(1e-5, this._cubeDepth * 1e-4);
    const matrices = grid.instanceMatrix.array;
    const numberMatrices = numberGrid.instanceMatrix.array;
    let changed = false;
    let remaining = false;

    for (let index = 0; index < grid.count; index++) {
      const matrixIndex = index * 16 + 14;
      const current = matrices[matrixIndex];
      const target = targets[index];
      const difference = target - current;
      let next = current;

      if (Math.abs(difference) <= epsilon) {
        next = target;
      } else {
        next = current + difference * alpha;
        if (Math.abs(target - next) <= epsilon) {
          next = target;
        } else {
          remaining = true;
        }
      }

      if (Math.abs(next - current) > DEPTH_EPSILON) {
        matrices[matrixIndex] = next;
        numberMatrices[matrixIndex] = next;
        changed = true;
      }
    }

    if (changed) {
      grid.instanceMatrix.needsUpdate = true;
      numberGrid.instanceMatrix.needsUpdate = true;
    }

    this._depthAnimating = remaining;
    return changed;
  }

  _scheduleFrame() {
    if (this._disposed || this._frameId) return;
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

    if (document.visibilityState === 'hidden') {
      this._lastFrameTime = 0;
      return;
    }

    const now = Number.isFinite(timestamp) ? timestamp : performance.now();
    const deltaSeconds = this._lastFrameTime > 0
      ? Math.max(0, Math.min((now - this._lastFrameTime) / 1000, 0.05))
      : 1 / 60;
    this._lastFrameTime = now;

    if (this._activeMotionCount) this._layoutDirty = true;
    if (this._layoutDirty) this._updateLayerLayout();

    if (this._layerVisible) {
      if (this._tiltDirty) this._syncBoardTilt();
      if (this._gridDirty && this._syncGridBounds()) this._needsRender = true;
      if (this._projectionDirty) this._syncGridProjection();
      if (this._depthDirty) this._syncCubeDepthTargets();
      if (this._depthAnimating && this._animateCubeDepth(deltaSeconds)) this._needsRender = true;
      if (this._needsRender) {
        this._renderer.render(this._scene, this._camera);
        this._needsRender = false;
      }
    }

    if (this._activeMotionCount || this._depthAnimating) {
      this._scheduleFrame();
    } else {
      this._lastFrameTime = 0;
    }
  }

  dispose() {
    if (this._disposed) return;
    this._disposed = true;

    if (this._frameId) cancelAnimationFrame(this._frameId);
    this._frameId = 0;

    window.removeEventListener('mousemove', this._onMouseMove);
    window.removeEventListener('resize', this._onResize);
    window.removeEventListener('scroll', this._onResize, true);
    document.removeEventListener('visibilitychange', this._onVisibilityChange);
    this._mutationObserver?.disconnect();
    this._resizeObserver?.disconnect();

    if (this._motionTarget) {
      for (const eventName of ['transitionstart', 'animationstart']) {
        this._motionTarget.removeEventListener(eventName, this._onMotionStart, true);
      }
      for (const eventName of ['transitionend', 'transitioncancel', 'animationend', 'animationcancel']) {
        this._motionTarget.removeEventListener(eventName, this._onMotionEnd, true);
      }
    }

    this._stopDragTracking?.();
    this._shapePath.removeEventListener('pointerdown', this._onPathPointerDown);
    this._shapePath.removeEventListener('click', this._onPathClick);

    if (this._controls) {
      this._controls.removeEventListener('change', this._onControlsChange);
      this._controls.dispose();
    }

    if (this._cubeGrid) {
      this._boardGroup.remove(this._cubeGrid);
      this._cubeGrid.dispose?.();
    }
    if (this._numberGrid) {
      this._boardGroup.remove(this._numberGrid);
      this._numberGrid.dispose?.();
    }
    if (this._boardGroup) this._scene.remove(this._boardGroup);
    this._cubeGeometry?.dispose();
    this._cubeMaterial?.dispose();
    this._numberGeometry?.dispose();
    this._numberMaterial?.dispose();
    this._numberTexture?.dispose();

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
    const app = new BlackAndWhite1_3D();
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
      error?.message ?? '3d blackAndWhite1.js error'
    );
  }
};
