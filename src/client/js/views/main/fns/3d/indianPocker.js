import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

import card1Url from '@/client/assets/images/svg/indian_poker/indian_poker_card/card_1.svg';
import card2Url from '@/client/assets/images/svg/indian_poker/indian_poker_card/card_2.svg';
import card3Url from '@/client/assets/images/svg/indian_poker/indian_poker_card/card_3.svg';
import card4Url from '@/client/assets/images/svg/indian_poker/indian_poker_card/card_4.svg';
import card5Url from '@/client/assets/images/svg/indian_poker/indian_poker_card/card_5.svg';
import card6Url from '@/client/assets/images/svg/indian_poker/indian_poker_card/card_6.svg';
import card7Url from '@/client/assets/images/svg/indian_poker/indian_poker_card/card_7.svg';
import card8Url from '@/client/assets/images/svg/indian_poker/indian_poker_card/card_8.svg';
import card9Url from '@/client/assets/images/svg/indian_poker/indian_poker_card/card_9.svg';
import card10Url from '@/client/assets/images/svg/indian_poker/indian_poker_card/card_10.svg';
import cardBackUrl from '@/client/assets/images/svg/indian_poker/indian_poker_card/back.svg';

import throwObj from '@/client/js/module/errorHandler/throwObj';

const CARD_FACE_URLS = [
  card1Url, card2Url, card3Url, card4Url, card5Url, card6Url,
  card7Url, card8Url, card9Url, card10Url, cardBackUrl
];
const SVG_NS = 'http://www.w3.org/2000/svg';
const XHTML_NS = 'http://www.w3.org/1999/xhtml';
const PATH_NUMBER = /-?(?:\d+\.?\d*|\.\d+)(?:e[-+]?\d+)?/gi;
const MAX_PIXEL_RATIO = 3;
const TEXTURE_WIDTH_STEPS = [384, 512, 768, 1024, 1280, 1536];
const TEXTURE_REFRESH_DELAY_MS = 180;
let nextLayerId = 0;
let activeApp = null;

class App {
  constructor() {
    // Keep the original main-screen SVG and its path as the sole hit-test surface.
    this._svg = document.querySelector('svg.card.indianPocker');
    if (!this._svg) {
      throw throwObj('elementLoss', 'indianPocker.js - svg.card.indianPocker element failed.');
    }
    this._cardPath = this._svg.querySelector("path.shape-path[data-shape='indianPocker']");
    if (!this._cardPath) {
      throw throwObj('elementLoss', 'indianPocker.js - indianPocker shape path failed.');
    }

    this._cardWidth = 2;
    this._cardHeight = 2.8;
    this._cardDepth = 0.01;
    this._cardRadius = 0.16;
    this._cardMargin = 0.4;
    this._pitchX = this._cardWidth + this._cardMargin;
    this._pitchY = this._cardHeight + this._cardMargin;
    this._cardTiltStrength = 3.0; // 0: no additional tilt; higher: stronger distance effect.
    this._cardBackgroundColor = '#e9eff6'; // The actual XHTML div below transparent WebGL.
    this._maxCardTextureWidth = 1536; // GPU memory cap per SVG face; height keeps the 2:2.8 ratio.
    this._cardTextureOversample = 1.35; // Slight extra source detail for oblique cards.
    this._canvasResolutionScale = 1.25; // card mapping SVG 선명도 - 1: screen-pixel match, >1: extra crispness (GPU cost is quadratic). 기본값: 1.25, cpu 부하로 인해 최대 1.5

    this.mouse = { x: 0, y: 0 }; // Whole-window normalized pointer: preserve prior board sway.
    this._pointerClientX = window.innerWidth * 0.5;
    this._pointerClientY = window.innerHeight * 0.5;
    this.defaultCameraPos = { x: 0, y: 0, z: 20 };
    this._maxMouseSway = 0.4;

    this._disposed = false;
    this._layoutDirty = true;
    this._needsRender = true;
    this._layerVisible = false;
    this._activeMotionCount = 0;
    this._layerMetrics = null;
    this._layerBounds = null;
    this._layoutKey = '';
    this._pixelRatio = 0;
    this._requestedTextureWidth = 0;
    this._textureRefreshTimer = 0;
    this._textureRefreshFrame = 0;

    this._grids = new Array(CARD_FACE_URLS.length).fill(null);
    this._gridCapacities = new Uint32Array(CARD_FACE_URLS.length);
    this._gridCells = [];
    this._gridBounds = null;
    this._cardPatternSeed = (Math.random() * 0x100000000) >>> 0;
    this._gridPoint = new THREE.Vector3();
    this._gridMatrix = new THREE.Matrix4();
    this._gridRotation = new THREE.Euler(0, 0, 0, 'XYZ');
    this._viewProjection = new THREE.Matrix4();
    this._lastViewProjection = new Float64Array(16);
    this._hasViewProjection = false;
    this._lastPointerX = NaN;
    this._lastPointerY = NaN;
    this._lastClientX = NaN;
    this._lastClientY = NaN;
    this._lastTiltStrength = NaN;

    this._renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this._renderer.setClearColor(0x000000, 0); // Let the XHTML background show between cards.
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
    this._setupObservers();
    this._updateLayerLayout();
    void this._loadCardTextures();

    this._boundRender = this.render.bind(this);
    requestAnimationFrame(this._boundRender);
  }

  _setupCamera() {
    // A square *virtual* camera. Only its cropped region receives a real GPU buffer.
    this._camera = new THREE.PerspectiveCamera(75, 1, 0.1, 100);
    this._camera.position.set(
      this.defaultCameraPos.x, this.defaultCameraPos.y, this.defaultCameraPos.z
    );
    this._camera.lookAt(0, 0, 0);
  }

  _setupLight() {
    this._scene.add(new THREE.AmbientLight(0xffffff, 5));
  }

  _setupModel() {
    const w = this._cardWidth;
    const h = this._cardHeight;
    const r = this._cardRadius;
    const shape = new THREE.Shape();
    shape.moveTo(-w / 2 + r, h / 2);
    shape.lineTo(w / 2 - r, h / 2);
    shape.quadraticCurveTo(w / 2, h / 2, w / 2, h / 2 - r);
    shape.lineTo(w / 2, -h / 2 + r);
    shape.quadraticCurveTo(w / 2, -h / 2, w / 2 - r, -h / 2);
    shape.lineTo(-w / 2 + r, -h / 2);
    shape.quadraticCurveTo(-w / 2, -h / 2, -w / 2, -h / 2 + r);
    shape.lineTo(-w / 2, h / 2 - r);
    shape.quadraticCurveTo(-w / 2, h / 2, -w / 2 + r, h / 2);

    this._cardGeometry = new THREE.ExtrudeGeometry(shape, {
      depth: this._cardDepth, bevelEnabled: false, curveSegments: 24
    });
    this._cardGeometry.center();

    // Normalize only front/back cap UVs; leave the sidewall UVs intact.
    const cap = this._cardGeometry.groups.find(group => group.materialIndex === 0);
    if (!cap) throw new Error('Card geometry has no front/back material group.');
    const positions = this._cardGeometry.getAttribute('position');
    const uv = this._cardGeometry.getAttribute('uv');
    for (let i = cap.start, end = cap.start + cap.count; i < end; i++) {
      uv.setXY(i, (positions.getX(i) + w / 2) / w, (positions.getY(i) + h / 2) / h);
    }
    uv.needsUpdate = true;

    this._fallbackFaceMaterial = new THREE.MeshBasicMaterial({
      color: 0xffffff, side: THREE.DoubleSide, toneMapped: false
    });
    this._rimMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff, side: THREE.DoubleSide
    });
    this._cardMaterialsByType = CARD_FACE_URLS.map(() => [
      this._fallbackFaceMaterial, this._rimMaterial
    ]);
    this._cardFaceTextures = new Array(CARD_FACE_URLS.length).fill(null);
    this._loadedFaceMaterials = new Array(CARD_FACE_URLS.length).fill(null);
    this._cardFaceImages = new Array(CARD_FACE_URLS.length).fill(null);
    this._cardFaceTextureWidths = new Uint16Array(CARD_FACE_URLS.length);
  }

  // SVG assets remain vector until drawn into a GPU texture. Resize that texture
  // at discrete quality levels instead of uploading 11 textures on every frame.
  _getTargetTextureWidth() {
    const maxTextureSize = this._renderer.capabilities.maxTextureSize || 4096;
    const cap = Math.max(1, Math.floor(Math.min(
      this._maxCardTextureWidth,
      maxTextureSize * this._cardWidth / this._cardHeight
    )));
    const virtualSize = this._layerMetrics?.renderSize || Math.max(window.innerWidth, window.innerHeight);
    const ratio = this._pixelRatio || Math.min(window.devicePixelRatio || 1, MAX_PIXEL_RATIO);
    const tangent = Math.tan(this._camera.fov * Math.PI / 360) / this._camera.zoom;
    // Allow for a closer side/corner as the board and individual cards tilt.
    const distance = Math.max(0.25, Math.abs(this._camera.position.z) * 0.7);
    const required = this._cardWidth * virtualSize * ratio *
      this._cardTextureOversample / (2 * tangent * distance);
    return Math.min(cap, TEXTURE_WIDTH_STEPS.find(width => width >= required) || cap);
  }

  _applyCardTexture(type, image, width) {
    if (this._disposed || this._cardFaceTextureWidths[type] === width) return;
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = Math.max(1, Math.round(width * this._cardHeight / this._cardWidth));
    const context = canvas.getContext('2d');
    if (!context) throw new Error(`Could not create card texture canvas: ${CARD_FACE_URLS[type]}`);
    context.imageSmoothingEnabled = true;
    context.imageSmoothingQuality = 'high';
    context.fillStyle = '#ffffff';
    context.fillRect(0, 0, canvas.width, canvas.height);
    // Draw the original SVG again at this size, NOT the previous low-res bitmap.
    context.drawImage(image, 0, 0, canvas.width, canvas.height);

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.generateMipmaps = true;
    texture.minFilter = THREE.LinearMipmapLinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.anisotropy = Math.min(8, this._renderer.capabilities.getMaxAnisotropy());
    const material = new THREE.MeshBasicMaterial({
      color: 0xffffff, map: texture, side: THREE.DoubleSide, toneMapped: false
    });
    if (this._disposed) {
      texture.dispose();
      material.dispose();
      return;
    }

    const previousMaterial = this._loadedFaceMaterials[type];
    const previousTexture = this._cardFaceTextures[type];
    this._cardFaceTextures[type] = texture;
    this._loadedFaceMaterials[type] = material;
    this._cardFaceTextureWidths[type] = width;
    this._cardMaterialsByType[type][0] = material;
    if (this._grids[type]) this._grids[type].material = this._cardMaterialsByType[type];
    previousMaterial?.dispose();
    previousTexture?.dispose();
    this._needsRender = true;
  }

  _scheduleTextureQuality() {
    if (this._disposed || !this._layerVisible) return;
    const target = this._getTargetTextureWidth();
    if (target === this._requestedTextureWidth) return;
    this._requestedTextureWidth = target;
    clearTimeout(this._textureRefreshTimer);
    if (this._textureRefreshFrame) cancelAnimationFrame(this._textureRefreshFrame);
    this._textureRefreshFrame = 0;
    // Wheel zoom / resize must settle before any potentially expensive rasterization.
    this._textureRefreshTimer = setTimeout(() => {
      this._textureRefreshTimer = 0;
      let type = 0;
      const updateOneType = () => {
        this._textureRefreshFrame = 0;
        if (this._disposed || target !== this._requestedTextureWidth) return;
        while (type < CARD_FACE_URLS.length &&
          (!this._cardFaceImages[type] || this._cardFaceTextureWidths[type] === target)) type++;
        if (type >= CARD_FACE_URLS.length) return;
        try {
          this._applyCardTexture(type, this._cardFaceImages[type], target);
        } catch (error) {
          console.error('[indianPocker] Card SVG rasterization failed:', CARD_FACE_URLS[type], error);
        }
        type++;
        if (type < CARD_FACE_URLS.length) this._textureRefreshFrame = requestAnimationFrame(updateOneType);
      };
      updateOneType();
    }, TEXTURE_REFRESH_DELAY_MS);
  }

  async _loadCardTextures() {
    await Promise.all(CARD_FACE_URLS.map(async (url, type) => {
      try {
        const image = await new Promise((resolve, reject) => {
          const img = new Image();
          img.crossOrigin = 'anonymous';
          img.onload = () => resolve(img);
          img.onerror = () => reject(new Error(`Unable to load SVG: ${url}`));
          img.src = url;
        });
        if (this._disposed) return;
        this._cardFaceImages[type] = image;
        this._applyCardTexture(type, image,
          this._requestedTextureWidth || this._getTargetTextureWidth());
      } catch (error) {
        if (!this._disposed) console.error('[indianPocker] Card SVG texture failed:', url, error);
      }
    }));
  }

  _mountCanvas() {
    const serial = ++nextLayerId;
    this._defs = document.createElementNS(SVG_NS, 'defs');
    const clipPath = document.createElementNS(SVG_NS, 'clipPath');
    const clipUse = document.createElementNS(SVG_NS, 'use');
    this._foreignObject = document.createElementNS(SVG_NS, 'foreignObject');

    this._addedSourceId = !this._cardPath.id;
    if (this._addedSourceId) this._cardPath.id = `indianPocker-three-source-${serial}`;
    clipPath.id = `indianPocker-three-clip-${serial}`;
    clipPath.setAttribute('clipPathUnits', 'userSpaceOnUse');
    clipUse.setAttribute('href', `#${this._cardPath.id}`);
    clipPath.appendChild(clipUse);
    this._defs.appendChild(clipPath);

    const layer = this._foreignObject;
    layer.classList.add('indianPocker-three-layer');
    layer.setAttribute('clip-path', `url(#${clipPath.id})`);
    layer.setAttribute('pointer-events', 'none');
    layer.style.pointerEvents = 'none';
    layer.style.visibility = 'hidden';

    // HTML is only valid inside SVG through foreignObject. This is an actual
    // editable background div, not a WebGL-colored rectangle or scene clear.
    this._backgroundDiv = document.createElementNS(XHTML_NS, 'div');
    this._backgroundDiv.className = 'indianPocker-three-background';
    this._backgroundDiv.style.position = 'relative';
    this._backgroundDiv.style.width = '100%';
    this._backgroundDiv.style.height = '100%';
    this._backgroundDiv.style.backgroundColor = this._cardBackgroundColor;
    this._backgroundDiv.style.overflow = 'hidden';
    this._backgroundDiv.style.pointerEvents = 'none';

    const canvas = this._renderer.domElement;
    canvas.classList.add('indianPocker-three-canvas');
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

    // OrbitControls receives bubbling events from the ORIGINAL path. The WebGL
    // layer never blocks clicks/hover on gameCardEvent.js's existing SVG surface.
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
    this._cardPath.addEventListener('pointerdown', this._onPathPointerDown, { passive: true });
    this._cardPath.addEventListener('click', this._onPathClick);
  }

  _setupControls() {
    this._controls = new OrbitControls(this._camera, this._svg);
    this._controls.minDistance = 2;
    this._controls.maxDistance = 60;
  }

  _setupObservers() {
    this._onMouseMove = this.mousemove.bind(this);
    this._onResize = () => { this._layoutDirty = true; };
    window.addEventListener('mousemove', this._onMouseMove, { passive: true });
    window.addEventListener('resize', this._onResize, { passive: true });
    window.addEventListener('scroll', this._onResize, { passive: true, capture: true });

    // Observe the actual main-card geometry, not attributes written to our canvas.
    this._mutationObserver = new MutationObserver(() => { this._layoutDirty = true; });
    this._mutationObserver.observe(this._cardPath, {
      attributes: true, attributeFilter: ['d', 'transform', 'style']
    });
    this._mutationObserver.observe(this._svg, {
      attributes: true, attributeFilter: ['style', 'class', 'transform', 'viewBox']
    });
    if (this._svg.parentElement) {
      this._mutationObserver.observe(this._svg.parentElement, {
        attributes: true, attributeFilter: ['style', 'class', 'transform']
      });
    }
    if (typeof ResizeObserver !== 'undefined') {
      this._resizeObserver = new ResizeObserver(this._onResize);
      this._resizeObserver.observe(this._svg);
      if (this._svg.parentElement) this._resizeObserver.observe(this._svg.parentElement);
    }

    // During a CSS transition, getScreenCTM() can change without attribute mutations.
    this._motionTarget = this._svg.parentElement || this._svg;
    this._onMotionStart = () => { this._activeMotionCount++; this._layoutDirty = true; };
    this._onMotionEnd = () => {
      this._activeMotionCount = Math.max(0, this._activeMotionCount - 1);
      this._layoutDirty = true;
    };
    for (const eventName of ['transitionstart', 'animationstart']) {
      this._motionTarget.addEventListener(eventName, this._onMotionStart, true);
    }
    for (const eventName of ['transitionend', 'transitioncancel', 'animationend', 'animationcancel']) {
      this._motionTarget.addEventListener(eventName, this._onMotionEnd, true);
    }
    this._onVisibilityChange = () => { this._layoutDirty = true; };
    document.addEventListener('visibilitychange', this._onVisibilityChange);
  }

  _getPathPolygonPoints() {
    const d = this._cardPath.getAttribute('d') || '';
    // gameCard.js generates M/L/Z polygons. Fall back safely if it ever changes.
    if (d && !d.replace(PATH_NUMBER, '').replace(/[MLZmlz,\s]/g, '')) {
      const numbers = d.match(PATH_NUMBER);
      if (numbers && numbers.length >= 6 && numbers.length % 2 === 0 && !/[ml]/.test(d.replace(PATH_NUMBER, ''))) {
        const points = [];
        for (let i = 0; i < numbers.length; i += 2) {
          points.push({ x: Number(numbers[i]), y: Number(numbers[i + 1]) });
        }
        return points;
      }
    }
    try {
      const box = this._cardPath.getBBox();
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
      let wasInside = inside(previous);
      for (const point of points) {
        const isInside = inside(point);
        if (isInside !== wasInside) result.push(intersection(previous, point));
        if (isInside) result.push(point);
        previous = point;
        wasInside = isInside;
      }
      return result;
    };
    let points = polygon;
    points = clipEdge(points, p => p.x >= 0, (a, b) => ({ x: 0, y: a.y + (b.y - a.y) * (-a.x) / (b.x - a.x) }));
    points = clipEdge(points, p => p.x <= width, (a, b) => ({ x: width, y: a.y + (b.y - a.y) * (width - a.x) / (b.x - a.x) }));
    points = clipEdge(points, p => p.y >= 0, (a, b) => ({ x: a.x + (b.x - a.x) * (-a.y) / (b.y - a.y), y: 0 }));
    return clipEdge(points, p => p.y <= height, (a, b) => ({ x: a.x + (b.x - a.x) * (height - a.y) / (b.y - a.y), y: height }));
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
    // Keep the same *virtual* square so the board scale and view offset do not change.
    // Its old renderSize=max(viewport width,height) was SMALLER than its physical
    // screen footprint (viewport diagonal), so foreignObject enlarged a blurry
    // WebGL bitmap even when the source SVG texture was already high resolution.
    const coverSize = (Math.hypot(width, height) + 8) / unitScale;
    // Largest singular value of the SVG->screen 2x2 transform, including shear.
    // One calculation on layout updates; avoids per-frame layout work.
    const sum = xScale * xScale + yScale * yScale;
    const maxScale = Math.sqrt((sum + Math.sqrt(Math.max(0, sum * sum - 4 * determinant * determinant))) * 0.5);
    const quality = Math.max(1, Math.min(2, this._canvasResolutionScale || 1));
    return {
      width, height, matrix, determinant, unitScale, coverSize,
      coverX: viewBox.x + viewBox.width / 2 - coverSize / 2,
      coverY: viewBox.y + viewBox.height / 2 - coverSize / 2,
      renderSize: Math.ceil(coverSize * maxScale * quality)
    };
  }

  _getTightVisibleBounds(metrics) {
    const localPoints = this._getPathPolygonPoints();
    if (localPoints.length < 3) return null;
    const m = metrics.matrix;
    const screenPoints = localPoints.map(point => ({
      x: m.a * point.x + m.c * point.y + m.e,
      y: m.b * point.x + m.d * point.y + m.f
    }));
    const clipped = this._clipPolygonToViewport(screenPoints, metrics.width, metrics.height);
    if (clipped.length < 3) return null;
    let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
    for (const point of clipped) {
      const dx = point.x - m.e;
      const dy = point.y - m.f;
      const x = (m.d * dx - m.c * dy) / metrics.determinant;
      const y = (-m.b * dx + m.a * dy) / metrics.determinant;
      minX = Math.min(minX, x); maxX = Math.max(maxX, x);
      minY = Math.min(minY, y); maxY = Math.max(maxY, y);
    }
    const padding = 2 / metrics.unitScale; // Prevent fractional-transform seams.
    minX = Math.max(minX - padding, metrics.coverX);
    minY = Math.max(minY - padding, metrics.coverY);
    maxX = Math.min(maxX + padding, metrics.coverX + metrics.coverSize);
    maxY = Math.min(maxY + padding, metrics.coverY + metrics.coverSize);
    if (maxX <= minX || maxY <= minY) return null;
    return { x: minX, y: minY, width: maxX - minX, height: maxY - minY };
  }

  _updateLayerLayout() {
    this._layoutDirty = false;
    const metrics = this._getLayoutMetrics();
    const bounds = metrics && this._getTightVisibleBounds(metrics);
    if (!bounds) {
      if (this._layerVisible) {
        this._foreignObject.style.visibility = 'hidden';
        this._layerVisible = false;
        this._renderer.setSize(1, 1, false);
      }
      return;
    }

    const ratio = Math.min(window.devicePixelRatio || 1, MAX_PIXEL_RATIO);
    // Oversample ONLY the cropped canvas, and never exceed the physical GPU
    // renderbuffer / texture side limit. Virtual size and view-offset use one scale.
    const maxCropSide = Math.max(bounds.width, bounds.height);
    const gpuLimit = this._gpuMaxCanvasSide || 16384;
    const safeVirtualSize = Math.max(1, Math.floor(
      (gpuLimit - ratio - 1) * metrics.coverSize / (maxCropSide * ratio)
    ));
    metrics.renderSize = Math.min(metrics.renderSize, safeVirtualSize);
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
      metrics.renderSize, bounds.x, bounds.y, bounds.width, bounds.height,
      offsetX, offsetY, renderWidth, renderHeight, ratio
    ].join('|');

    // The SVG may rotate in CSS while this camera crop remains identical. Always
    // update the screen transform for exact pointer-to-card distance calculations.
    const old = this._layerMetrics && this._layerMetrics.matrix;
    const m = metrics.matrix;
    if (!old || old.a !== m.a || old.b !== m.b || old.c !== m.c || old.d !== m.d || old.e !== m.e || old.f !== m.f) {
      this._hasViewProjection = false;
    }
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
        metrics.renderSize, metrics.renderSize,
        offsetX, offsetY, renderWidth, renderHeight
      );
      this._renderer.setSize(renderWidth, renderHeight, false);
      this._layoutKey = key;
      this._needsRender = true;
      this._hasViewProjection = false;
      this._maxMouseSway = this._safeMouseSway();
    }
    if (!this._layerVisible) {
      this._foreignObject.style.visibility = 'visible';
      this._layerVisible = true;
    }
    this._scheduleTextureQuality();
  }

  _safeMouseSway() {
    const camera = this._camera;
    const vertical = Math.tan(camera.fov * Math.PI / 360) / camera.zoom;
    const horizontal = vertical * camera.aspect;
    const clearance = sway => {
      const side = Math.hypot(1, sway);
      const diagonal = Math.hypot(1, sway, sway);
      return 1 / diagonal - horizontal * sway / side - vertical * sway / (diagonal * side);
    };
    const original = 0.4;
    if (clearance(original) >= 0.35) return original;
    let low = 0, high = original;
    for (let i = 0; i < 20; i++) {
      const mid = (low + high) / 2;
      if (clearance(mid) >= 0.35) low = mid;
      else high = mid;
    }
    return low;
  }

  _visiblePlaneBounds() {
    const camera = this._camera;
    const origin = camera.position;
    const p = this._gridPoint;
    let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
    for (let i = 0; i < 4; i++) {
      p.set(i & 1 ? 1 : -1, i & 2 ? 1 : -1, 0.5).unproject(camera);
      const dz = p.z - origin.z;
      if (Math.abs(dz) < 1e-8) return null;
      const t = -origin.z / dz;
      if (t <= 0 || !Number.isFinite(t)) return null;
      const x = origin.x + (p.x - origin.x) * t;
      const y = origin.y + (p.y - origin.y) * t;
      if (!Number.isFinite(x) || !Number.isFinite(y)) return null;
      minX = Math.min(minX, x); maxX = Math.max(maxX, x);
      minY = Math.min(minY, y); maxY = Math.max(maxY, y);
    }
    return { minX, maxX, minY, maxY };
  }

  _cardTypeAt(row, col) {
    let hash = (Math.imul(col, 0x9e3779b1) ^
      Math.imul(row, 0x85ebca77) ^ this._cardPatternSeed) | 0;
    hash ^= hash >>> 16;
    hash = Math.imul(hash, 0x7feb352d);
    hash ^= hash >>> 15;
    hash = Math.imul(hash, 0x846ca68b);
    hash ^= hash >>> 16;
    return (hash >>> 0) % CARD_FACE_URLS.length;
  }

  _ensureGridCapacity(type, required) {
    if (!required || required <= this._gridCapacities[type]) return;
    let capacity = Math.max(4, this._gridCapacities[type]);
    while (capacity < required) capacity *= 2;
    const previous = this._grids[type];
    const next = new THREE.InstancedMesh(
      this._cardGeometry, this._cardMaterialsByType[type], capacity
    );
    next.count = 0;
    next.frustumCulled = false;
    next.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    this._scene.add(next);
    this._grids[type] = next;
    this._gridCapacities[type] = capacity;
    if (previous) {
      this._scene.remove(previous);
      previous.dispose?.(); // Do not dispose shared geometry/materials.
    }
  }

  _rebuildGridCells(bounds) {
    const counts = new Uint32Array(CARD_FACE_URLS.length);
    const cells = [];
    for (let row = bounds.minRow; row <= bounds.maxRow; row++) {
      for (let col = bounds.minCol; col <= bounds.maxCol; col++) {
        const type = this._cardTypeAt(row, col);
        cells.push({
          x: col * this._pitchX, y: row * this._pitchY,
          type, instanceIndex: counts[type]++
        });
      }
    }
    for (let type = 0; type < CARD_FACE_URLS.length; type++) {
      this._ensureGridCapacity(type, counts[type]);
      if (this._grids[type]) this._grids[type].count = counts[type];
    }
    this._gridCells = cells;
    this._gridBounds = bounds;
  }

  _syncCards() {
    const camera = this._camera;
    camera.updateMatrixWorld(true);
    const matrix = this._viewProjection.multiplyMatrices(
      camera.projectionMatrix, camera.matrixWorldInverse
    ).elements;
    let cameraChanged = !this._hasViewProjection;
    if (!cameraChanged) {
      for (let i = 0; i < 16; i++) {
        if (Math.abs(matrix[i] - this._lastViewProjection[i]) > 1e-6) {
          cameraChanged = true;
          break;
        }
      }
    }
    const pointerChanged = this.mouse.x !== this._lastPointerX ||
      this.mouse.y !== this._lastPointerY ||
      this._pointerClientX !== this._lastClientX ||
      this._pointerClientY !== this._lastClientY;
    const strengthChanged = this._cardTiltStrength !== this._lastTiltStrength;
    if (cameraChanged) this._scheduleTextureQuality();
    if (!cameraChanged && !pointerChanged && !strengthChanged && this._gridBounds) return false;

    if (cameraChanged || !this._gridBounds) {
      const view = this._visiblePlaneBounds();
      if (!view) return false;
      const minCol = Math.floor((view.minX - this._cardWidth / 2) / this._pitchX) - 1;
      const maxCol = Math.ceil((view.maxX + this._cardWidth / 2) / this._pitchX) + 1;
      const minRow = Math.floor((view.minY - this._cardHeight / 2) / this._pitchY) - 1;
      const maxRow = Math.ceil((view.maxY + this._cardHeight / 2) / this._pitchY) + 1;
      const previous = this._gridBounds;
      if (!previous || previous.minCol !== minCol || previous.maxCol !== maxCol ||
        previous.minRow !== minRow || previous.maxRow !== maxRow) {
        this._rebuildGridCells({ minCol, maxCol, minRow, maxRow });
      }
    }

    const strength = Math.max(0, this._cardTiltStrength);
    const tiltX = Math.atan2(camera.position.y, camera.position.z) * strength;
    const tiltY = -Math.atan2(camera.position.x, camera.position.z) * strength;
    const hasTilt = strength > 0 && (Math.abs(tiltX) > 1e-8 || Math.abs(tiltY) > 1e-8);
    const bounds = this._layerBounds;
    const m = this._layerMetrics.matrix;
    // Screen-space distance works even while the outer SVG is CSS-rotated.
    let maxDistanceSquared = 1;
    if (hasTilt) {
      for (let i = 0; i < 4; i++) {
        const localX = i & 1 ? bounds.x + bounds.width : bounds.x;
        const localY = i & 2 ? bounds.y + bounds.height : bounds.y;
        const dx = m.a * localX + m.c * localY + m.e - this._pointerClientX;
        const dy = m.b * localX + m.d * localY + m.f - this._pointerClientY;
        maxDistanceSquared = Math.max(maxDistanceSquared, dx * dx + dy * dy);
      }
    }
    const invMaxDistanceSquared = 1 / maxDistanceSquared;
    const e0 = matrix[0], e1 = matrix[1], e3 = matrix[3];
    const e4 = matrix[4], e5 = matrix[5], e7 = matrix[7];
    const e12 = matrix[12], e13 = matrix[13], e15 = matrix[15];
    const toLocalX = bounds.width * 0.5;
    const toLocalY = bounds.height * 0.5;

    // Reuse one matrix/Euler. No per-card vectors, materials or draw calls.
    for (let i = 0; i < this._gridCells.length; i++) {
      const cell = this._gridCells[i];
      const x = cell.x, y = cell.y;
      if (hasTilt) {
        const invW = 1 / (e3 * x + e7 * y + e15);
        const localX = bounds.x + ((e0 * x + e4 * y + e12) * invW + 1) * toLocalX;
        const localY = bounds.y + (1 - (e1 * x + e5 * y + e13) * invW) * toLocalY;
        const dx = m.a * localX + m.c * localY + m.e - this._pointerClientX;
        const dy = m.b * localX + m.d * localY + m.f - this._pointerClientY;
        const weight = Math.min(1, (dx * dx + dy * dy) * invMaxDistanceSquared);
        this._gridRotation.set(tiltX * weight, tiltY * weight, 0);
        this._gridMatrix.makeRotationFromEuler(this._gridRotation);
        this._gridMatrix.setPosition(x, y, 0);
      } else {
        this._gridMatrix.makeTranslation(x, y, 0);
      }
      this._grids[cell.type].setMatrixAt(cell.instanceIndex, this._gridMatrix);
    }
    for (const grid of this._grids) {
      if (grid && grid.count) grid.instanceMatrix.needsUpdate = true;
    }
    this._lastViewProjection.set(matrix);
    this._hasViewProjection = true;
    this._lastPointerX = this.mouse.x;
    this._lastPointerY = this.mouse.y;
    this._lastClientX = this._pointerClientX;
    this._lastClientY = this._pointerClientY;
    this._lastTiltStrength = this._cardTiltStrength;
    return true;
  }

  mousemove(event) {
    this._pointerClientX = event.clientX;
    this._pointerClientY = event.clientY;
    this.mouse.x = THREE.MathUtils.clamp(event.clientX / window.innerWidth * 2 - 1, -1, 1);
    this.mouse.y = THREE.MathUtils.clamp(1 - event.clientY / window.innerHeight * 2, -1, 1);
  }

  update() {
    const camera = this._camera;
    const distance = Math.max(Math.abs(camera.position.z), 0.001);
    const sway = distance * this._maxMouseSway;
    camera.position.x += (-this.mouse.x * sway - camera.position.x) * 0.05;
    camera.position.y += (-this.mouse.y * sway - camera.position.y) * 0.05;
    camera.position.x = THREE.MathUtils.clamp(camera.position.x, -sway, sway);
    camera.position.y = THREE.MathUtils.clamp(camera.position.y, -sway, sway);
    camera.lookAt(0, 0, 0);
  }

  render() {
    if (this._disposed) return;
    if (!this._svg.isConnected) {
      this.dispose();
      if (activeApp === this) activeApp = null;
      return;
    }
    if (document.visibilityState !== 'hidden') {
      if (this._activeMotionCount) this._layoutDirty = true;
      if (this._layoutDirty) this._updateLayerLayout();
      if (this._layerVisible) {
        this.update();
        const cardsChanged = this._syncCards();
        if (cardsChanged || this._needsRender) {
          this._renderer.render(this._scene, this._camera);
          this._needsRender = false;
        }
      }
    }
    requestAnimationFrame(this._boundRender);
  }

  dispose() {
    if (this._disposed) return;
    this._disposed = true;
    clearTimeout(this._textureRefreshTimer);
    if (this._textureRefreshFrame) cancelAnimationFrame(this._textureRefreshFrame);
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
    this._stopDragTracking();
    this._cardPath.removeEventListener('pointerdown', this._onPathPointerDown);
    this._cardPath.removeEventListener('click', this._onPathClick);
    this._controls?.dispose();
    for (const grid of this._grids) {
      if (!grid) continue;
      this._scene.remove(grid);
      grid.dispose?.();
    }
    for (const material of this._loadedFaceMaterials) material?.dispose();
    for (const texture of this._cardFaceTextures) texture?.dispose();
    this._fallbackFaceMaterial?.dispose();
    this._rimMaterial?.dispose();
    this._cardGeometry?.dispose();
    this._renderer.dispose();
    this._renderer.forceContextLoss?.();
    this._renderer.domElement.remove();
    this._foreignObject.remove();
    this._defs.remove();
    if (this._addedSourceId) this._cardPath.removeAttribute('id');
  }
}

export default () => {
  try {
    activeApp?.dispose();
    const app = new App();
    activeApp = app;
    // Safe to call on view teardown; a stale disposer never tears down a new view.
    return () => {
      if (activeApp === app) {
        activeApp.dispose();
        activeApp = null;
      }
    };
  } catch (error) {
    throw throwObj(error?.errCase ?? 'errorComn', error?.message ?? 'indianPocker.js error');
  }
};
