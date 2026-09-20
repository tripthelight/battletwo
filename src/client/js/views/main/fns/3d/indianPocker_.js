import * as THREE from 'three';
import Stats from 'three/addons/libs/stats.module.js';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { radixSort } from 'three/addons/utils/SortUtils.js';

import throwObj from '@/client/js/module/errorHandler/throwObj';

export default () => {
  try {
		let camera, controls, scene, renderer;
		let indianPockerCard, indianPockerBack, foreignObject;
		let resizeFrameId = 0;
		let tightLayoutReady = false;
		let threeLayerVisible = true;
		let geometries, mesh;
		const ids = [];
		const matrix = new THREE.Matrix4();

    const position = new THREE.Vector3();
		const rotation = new THREE.Euler();
		const quaternion = new THREE.Quaternion();
		const scale = new THREE.Vector3();

		const Method = {
			BATCHED: 'BATCHED',
			NAIVE: 'NAIVE'
		};

		const api = {
			method: Method.BATCHED,
			count: 256,
			dynamic: 16,

			transparent: true,
			sortObjects: true,
			perObjectFrustumCulled: true,
			useCustomSort: true,
		};

		init();
		initGeometries();
		initMesh();

		//

		function randomizeMatrix( matrix ) {
			position.x = Math.random() * 40 - 20;
			position.y = Math.random() * 40 - 20;
			position.z = Math.random() * 40 - 20;
			rotation.x = Math.random() * 2 * Math.PI;
			rotation.y = Math.random() * 2 * Math.PI;
			rotation.z = Math.random() * 2 * Math.PI;
			quaternion.setFromEuler( rotation );
			scale.x = scale.y = scale.z = 0.5 + ( Math.random() * 0.5 );
			return matrix.compose( position, quaternion, scale );
		}

		function randomizeRotationSpeed( rotation ) {
			rotation.x = Math.random() * 0.01;
			rotation.y = Math.random() * 0.01;
			rotation.z = Math.random() * 0.01;
			return rotation;
		}

		function randomizeColor( color ) {
			return color.setHSL( Math.random() * 0.5, 0.6, 0.5 );
		}

		function randomizeAlpha() {
			// make ~20% of all objects transparent
			return Math.random() > 0.8 ? 0.5 : 1.0;
		}

		function initGeometries() {
			const cone = new THREE.ConeGeometry( 1.0, 2.0 );
			const box = new THREE.BoxGeometry( 2.0, 2.0, 2.0 );
			const sphere = new THREE.SphereGeometry( 1.0, 16, 8 );

			geometries = [ cone, box, sphere ];

			for ( const geometry of geometries ) {
				// add vertex colors for testing
				const count = geometry.getAttribute( 'position' ).count;
				const attribute = new THREE.BufferAttribute( new Float32Array( count * 3 ), 3 );
				geometry.setAttribute( 'color', attribute );
				for ( let i = 0, l = attribute.array.length; i < l; ++ i ) {
					attribute.array[ i ] = 1.0;
				}
			}
		}

		function createMaterial() {
			return new THREE.MeshPhongMaterial({
				vertexColors: true,
				transparent: api.transparent,
				depthWrite: ! api.transparent
			});
		}

		function cleanup() {
			if ( mesh ) {
				mesh.traverse( node => {
					if ( node instanceof THREE.Mesh ) {
						node.material.dispose();
					}
				});

				mesh.parent.remove( mesh );

				if ( mesh.dispose ) {
					mesh.dispose();
				}
			}
		}

		function initMesh() {
			cleanup();
			if ( api.method === Method.BATCHED ) {
				initBatchedMesh();
			} else {
				initRegularMesh();
			}
		}

		function initRegularMesh() {
			mesh = new THREE.Group();
			for ( let i = 0; i < api.count; i ++ ) {
				const material = createMaterial();
				randomizeColor( material.color );
				material.opacity = randomizeAlpha();

				const child = new THREE.Mesh( geometries[ i % geometries.length ], material );
				randomizeMatrix( child.matrix );
				child.matrix.decompose( child.position, child.quaternion, child.scale );
				child.userData.rotationSpeed = randomizeRotationSpeed( new THREE.Euler() );
				mesh.add( child );
			}
			scene.add( mesh );
		}

		function initBatchedMesh() {
			const geometryCount = api.count;
			const vertexCount = geometries.length * 512;
			const indexCount = geometries.length * 1024;

			const euler = new THREE.Euler();
			const matrix = new THREE.Matrix4();
			const color = new THREE.Color();
			const colorWithAlpha = new THREE.Vector4();
			mesh = new THREE.BatchedMesh( geometryCount, vertexCount, indexCount, createMaterial() );
			mesh.userData.rotationSpeeds = [];

			// disable full-object frustum culling since all of the objects can be dynamic.
			mesh.frustumCulled = false;

			ids.length = 0;

			const geometryIds = [
				mesh.addGeometry( geometries[ 0 ] ),
				mesh.addGeometry( geometries[ 1 ] ),
				mesh.addGeometry( geometries[ 2 ] ),
			];

			for ( let i = 0; i < api.count; i ++ ) {
				randomizeColor( color );
				colorWithAlpha.set( color.r, color.g, color.b, randomizeAlpha() );

				const id = mesh.addInstance( geometryIds[ i % geometryIds.length ] );
				mesh.setMatrixAt( id, randomizeMatrix( matrix ) );
				mesh.setColorAt( id, colorWithAlpha );

				const rotationMatrix = new THREE.Matrix4();
				rotationMatrix.makeRotationFromEuler( randomizeRotationSpeed( euler ) );
				mesh.userData.rotationSpeeds.push( rotationMatrix );

				ids.push( id );
			}
			scene.add( mesh );
		}

		function init() {
			const svgNS = 'http://www.w3.org/2000/svg';

			indianPockerCard = document.querySelector( 'svg.card.indianPocker' );
			if ( ! indianPockerCard ) {
				throw throwObj( 'elementLoss', 'indianPocker.js - svg.indianPocker element failed.' );
			}

			indianPockerBack = indianPockerCard.querySelector( "path.shape-path[data-shape='indianPocker']" );
			if ( ! indianPockerBack ) {
				throw throwObj( 'elementLoss', 'indianPocker.js - indianPocker path element failed.' );
			}


			// camera
			camera = new THREE.PerspectiveCamera( 70, 1, 1, 100 );
			camera.position.z = 30;

			// renderer
			renderer = new THREE.WebGLRenderer( { antialias: true } );
			renderer.setPixelRatio( window.devicePixelRatio );


			/*
			 * An HTML canvas cannot be inserted directly as a normal SVG child,
			 * so mount it inside foreignObject.
			 *
			 * The clipPath references the existing game-card path with <use>.
			 * gameCard.js can keep updating that path's d value during animation,
			 * and the canvas mask follows it without a second per-frame path update.
			 */
			const clipSourceId = indianPockerBack.id || 'indianPocker-three-clip-source';
			const clipPathId = 'indianPocker-three-clip';

			if ( ! indianPockerBack.id ) {
				indianPockerBack.id = clipSourceId;
			}

			const defs = document.createElementNS( svgNS, 'defs' );
			const clipPath = document.createElementNS( svgNS, 'clipPath' );
			const clipUse = document.createElementNS( svgNS, 'use' );
			foreignObject = document.createElementNS( svgNS, 'foreignObject' );

			clipPath.id = clipPathId;
			clipPath.setAttribute( 'clipPathUnits', 'userSpaceOnUse' );
			clipUse.setAttribute( 'href', `#${ clipSourceId }` );
			clipPath.appendChild( clipUse );
			defs.appendChild( clipPath );

			foreignObject.setAttribute( 'clip-path', `url(#${ clipPathId })` );
			foreignObject.setAttribute( 'pointer-events', 'none' );
			foreignObject.classList.add( 'indianPocker-three-layer' );
			foreignObject.style.pointerEvents = 'none';

			renderer.domElement.classList.add( 'indianPocker-three-canvas' );
			renderer.domElement.style.display = 'block';
			renderer.domElement.style.width = '100%';
			renderer.domElement.style.height = '100%';
			renderer.domElement.style.pointerEvents = 'none';

			/*
			 * Keep the original SVG path as the only hit-test surface. The foreignObject
			 * can extend far outside the SVG viewport after resize, while the SVG path
			 * itself already has the exact visibleFill hit area used by gameCardEvent.js.
			 * OrbitControls listens on the parent SVG and receives the path events by
			 * bubbling, so every point inside the current d path behaves consistently.
			 *
			 * A small drag guard preserves the previous behavior where an OrbitControls
			 * drag is not treated as a game-card click.
			 */
			let activePointerId = null;
			let pointerDownX = 0;
			let pointerDownY = 0;
			let dragged = false;
			let suppressNextClick = false;
			const dragThresholdSquared = 16;

			function stopDragTracking() {
				document.removeEventListener( 'pointermove', trackDrag );
				document.removeEventListener( 'pointerup', finishDrag );
				document.removeEventListener( 'pointercancel', cancelDrag );
			}

			function trackDrag( event ) {
				if ( event.pointerId !== activePointerId || dragged ) return;

				const dx = event.clientX - pointerDownX;
				const dy = event.clientY - pointerDownY;

				if ( dx * dx + dy * dy > dragThresholdSquared ) {
					dragged = true;
				}
			}

			function finishDrag( event ) {
				if ( event.pointerId !== activePointerId ) return;

				suppressNextClick = dragged;
				activePointerId = null;
				stopDragTracking();
			}

			function cancelDrag( event ) {
				if ( event.pointerId !== activePointerId ) return;

				activePointerId = null;
				dragged = false;
				suppressNextClick = false;
				stopDragTracking();
			}

			indianPockerBack.addEventListener( 'pointerdown', event => {
				activePointerId = event.pointerId;
				pointerDownX = event.clientX;
				pointerDownY = event.clientY;
				dragged = false;
				suppressNextClick = false;

				document.addEventListener( 'pointermove', trackDrag, { passive: true } );
				document.addEventListener( 'pointerup', finishDrag, { passive: true } );
				document.addEventListener( 'pointercancel', cancelDrag, { passive: true } );
			}, { passive: true } );

			indianPockerBack.addEventListener( 'click', event => {
				if ( ! suppressNextClick ) return;

				suppressNextClick = false;
				event.preventDefault();
				event.stopPropagation();
			} );

			foreignObject.appendChild( renderer.domElement );
			indianPockerCard.insertBefore( defs, indianPockerCard.firstChild );
			indianPockerCard.appendChild( foreignObject );
			updateThreeLayerLayout();
			waitForCardAnimationAndTightenLayout();
			renderer.setAnimationLoop( animate );

			// scene
			scene = new THREE.Scene();
			scene.background = new THREE.Color( 0xffffff );

			// controls
			controls = new OrbitControls( camera, indianPockerCard );
			controls.autoRotate = true;
			controls.autoRotateSpeed = 1.0;

			// light
			const ambientLight = new THREE.AmbientLight( 0xffffff, 2 );
			const directionalLight = new THREE.DirectionalLight( 0xffffff, 2 );
			directionalLight.position.set( 1, 1, 1 );
			scene.add( directionalLight, ambientLight );

			// listeners
			window.addEventListener( 'resize', onWindowResize );
		}

		//

		function sortFunction( list ) {
			// initialize options
			this._options = this._options || {
				get: el => el.z,
				aux: new Array( this.maxInstanceCount )
			};

			const options = this._options;
			options.reversed = this.material.transparent;

			let minZ = Infinity;
			let maxZ = - Infinity;
			for ( let i = 0, l = list.length; i < l; i ++ ) {

				const z = list[ i ].z;
				if ( z > maxZ ) maxZ = z;
				if ( z < minZ ) minZ = z;

			}

			// convert depth to unsigned 32 bit range
			const depthDelta = maxZ - minZ;
			const factor = ( 2 ** 32 - 1 ) / depthDelta; // UINT32_MAX / z range
			for ( let i = 0, l = list.length; i < l; i ++ ) {

				list[ i ].z -= minZ;
				list[ i ].z *= factor;

			}

			// perform a fast-sort using the hybrid radix sort function
			radixSort( list, options );

		}

		function getCurrentSvgLayoutMetrics() {
			const width = window.innerWidth;
			const height = window.innerHeight;
			const viewBox = indianPockerCard.viewBox.baseVal;
			const screenMatrix = indianPockerCard.getScreenCTM();

			if ( ! screenMatrix ) return null;

			const determinant = screenMatrix.a * screenMatrix.d - screenMatrix.b * screenMatrix.c;
			if ( ! Number.isFinite( determinant ) || Math.abs( determinant ) < 1e-12 ) return null;

			let userUnitScale = Math.min(
				Math.hypot( screenMatrix.a, screenMatrix.b ),
				Math.hypot( screenMatrix.c, screenMatrix.d )
			);

			if ( ! Number.isFinite( userUnitScale ) || userUnitScale <= 0 ) {
				const viewBoxWidth = viewBox.width || width;
				const viewBoxHeight = viewBox.height || height;
				userUnitScale = Math.min( width / viewBoxWidth, height / viewBoxHeight );
			}

			/*
			 * This is the same safe virtual square used by the previous implementation.
			 * It is kept only as the camera's full virtual render area. The actual
			 * foreignObject / canvas is cropped from this square below.
			 */
			const coverSize = ( Math.hypot( width, height ) + 8 ) / userUnitScale;
			const centerX = viewBox.x + viewBox.width / 2;
			const centerY = viewBox.y + viewBox.height / 2;
			const coverX = centerX - coverSize / 2;
			const coverY = centerY - coverSize / 2;

			return {
				width,
				height,
				screenMatrix,
				determinant,
				userUnitScale,
				coverSize,
				coverX,
				coverY,
				renderSize: Math.max( width, height )
			};
		}

		function getPathPolygonPoints() {
			const d = indianPockerBack.getAttribute( 'd' );
			if ( ! d ) return null;

			/*
			 * gameCard.js builds this path only with M / L / Z commands, so reading the
			 * coordinate pairs directly avoids expensive path sampling or per-pixel tests.
			 */
			const values = d.match( /-?(?:\d+\.?\d*|\.\d+)(?:e[-+]?\d+)?/gi );
			if ( ! values || values.length < 6 || values.length % 2 !== 0 ) return null;

			const points = new Array( values.length / 2 );
			for ( let i = 0, pointIndex = 0; i < values.length; i += 2, pointIndex ++ ) {
				points[ pointIndex ] = {
					x: Number( values[ i ] ),
					y: Number( values[ i + 1 ] )
				};
			}

			return points;
		}

		function clipPolygonToViewport( points, width, height ) {
			function clipAgainstEdge( input, isInside, getIntersection ) {
				if ( input.length === 0 ) return input;

				const output = [];
				let previous = input[ input.length - 1 ];
				let previousInside = isInside( previous );

				for ( let i = 0; i < input.length; i ++ ) {
					const current = input[ i ];
					const currentInside = isInside( current );

					if ( currentInside !== previousInside ) {
						output.push( getIntersection( previous, current ) );
					}

					if ( currentInside ) output.push( current );

					previous = current;
					previousInside = currentInside;
				}

				return output;
			}

			let clipped = points;

			clipped = clipAgainstEdge(
				clipped,
				point => point.x >= 0,
				( from, to ) => {
					const ratio = ( 0 - from.x ) / ( to.x - from.x );
					return { x: 0, y: from.y + ( to.y - from.y ) * ratio };
				}
			);

			clipped = clipAgainstEdge(
				clipped,
				point => point.x <= width,
				( from, to ) => {
					const ratio = ( width - from.x ) / ( to.x - from.x );
					return { x: width, y: from.y + ( to.y - from.y ) * ratio };
				}
			);

			clipped = clipAgainstEdge(
				clipped,
				point => point.y >= 0,
				( from, to ) => {
					const ratio = ( 0 - from.y ) / ( to.y - from.y );
					return { x: from.x + ( to.x - from.x ) * ratio, y: 0 };
				}
			);

			clipped = clipAgainstEdge(
				clipped,
				point => point.y <= height,
				( from, to ) => {
					const ratio = ( height - from.y ) / ( to.y - from.y );
					return { x: from.x + ( to.x - from.x ) * ratio, y: height };
				}
			);

			return clipped;
		}

		function getTightVisibleBounds( metrics ) {
			const localPoints = getPathPolygonPoints();
			if ( ! localPoints ) return null;

			const matrix = metrics.screenMatrix;
			const screenPoints = new Array( localPoints.length );

			for ( let i = 0; i < localPoints.length; i ++ ) {
				const point = localPoints[ i ];
				screenPoints[ i ] = {
					x: matrix.a * point.x + matrix.c * point.y + matrix.e,
					y: matrix.b * point.x + matrix.d * point.y + matrix.f
				};
			}

			const clipped = clipPolygonToViewport( screenPoints, metrics.width, metrics.height );
			if ( clipped.length < 3 ) return { visible: false };

			const determinant = metrics.determinant;
			let minX = Infinity;
			let minY = Infinity;
			let maxX = - Infinity;
			let maxY = - Infinity;

			/*
			 * Convert the already-clipped screen polygon back into this SVG's user space.
			 * The resulting AABB is the smallest axis-aligned foreignObject that can contain
			 * every currently visible pixel of the irregular indianPocker path.
			 */
			for ( let i = 0; i < clipped.length; i ++ ) {
				const screenPoint = clipped[ i ];
				const dx = screenPoint.x - metrics.screenMatrix.e;
				const dy = screenPoint.y - metrics.screenMatrix.f;
				const localX = ( metrics.screenMatrix.d * dx - metrics.screenMatrix.c * dy ) / determinant;
				const localY = ( - metrics.screenMatrix.b * dx + metrics.screenMatrix.a * dy ) / determinant;

				if ( localX < minX ) minX = localX;
				if ( localX > maxX ) maxX = localX;
				if ( localY < minY ) minY = localY;
				if ( localY > maxY ) maxY = localY;
			}

			/*
			 * A two-pixel safety margin prevents a one-pixel antialias seam from appearing
			 * at the canvas edge after fractional SVG transforms / browser zoom.
			 */
			const padding = 2 / metrics.userUnitScale;
			minX -= padding;
			minY -= padding;
			maxX += padding;
			maxY += padding;

			const coverRight = metrics.coverX + metrics.coverSize;
			const coverBottom = metrics.coverY + metrics.coverSize;
			minX = Math.max( minX, metrics.coverX );
			minY = Math.max( minY, metrics.coverY );
			maxX = Math.min( maxX, coverRight );
			maxY = Math.min( maxY, coverBottom );

			if ( maxX <= minX || maxY <= minY ) return { visible: false };

			return {
				visible: true,
				x: minX,
				y: minY,
				width: maxX - minX,
				height: maxY - minY
			};
		}

		function applySafeFullLayout( metrics ) {
			foreignObject.setAttribute( 'x', String( metrics.coverX ) );
			foreignObject.setAttribute( 'y', String( metrics.coverY ) );
			foreignObject.setAttribute( 'width', String( metrics.coverSize ) );
			foreignObject.setAttribute( 'height', String( metrics.coverSize ) );
			foreignObject.style.visibility = 'visible';
			threeLayerVisible = true;

			camera.clearViewOffset();
			camera.aspect = 1;
			camera.updateProjectionMatrix();
			renderer.setSize( metrics.renderSize, metrics.renderSize, false );
		}

		function applyTightLayout( metrics, bounds ) {
			if ( ! bounds.visible ) {
				foreignObject.style.visibility = 'hidden';
				threeLayerVisible = false;
				renderer.setSize( 1, 1, false );
				return;
			}

			foreignObject.setAttribute( 'x', String( bounds.x ) );
			foreignObject.setAttribute( 'y', String( bounds.y ) );
			foreignObject.setAttribute( 'width', String( bounds.width ) );
			foreignObject.setAttribute( 'height', String( bounds.height ) );
			foreignObject.style.visibility = 'visible';
			threeLayerVisible = true;

			/*
			 * Keep the old large square only as a virtual camera surface. setViewOffset()
			 * renders just the crop occupied by the path's visible bounding box, so the
			 * Three.js scene keeps exactly the same apparent scale / position while the
			 * real WebGL drawing buffer becomes much smaller.
			 */
			const virtualPixelsPerUserUnit = metrics.renderSize / metrics.coverSize;
			const offsetX = ( bounds.x - metrics.coverX ) * virtualPixelsPerUserUnit;
			const offsetY = ( bounds.y - metrics.coverY ) * virtualPixelsPerUserUnit;
			const renderWidth = Math.max( 1, Math.ceil( bounds.width * virtualPixelsPerUserUnit ) );
			const renderHeight = Math.max( 1, Math.ceil( bounds.height * virtualPixelsPerUserUnit ) );

			camera.aspect = 1;
			camera.setViewOffset(
				metrics.renderSize,
				metrics.renderSize,
				offsetX,
				offsetY,
				renderWidth,
				renderHeight
			);
			camera.updateProjectionMatrix();
			renderer.setSize( renderWidth, renderHeight, false );
		}

		function updateThreeLayerLayout() {
			if ( ! indianPockerCard || ! indianPockerBack || ! foreignObject || ! renderer || ! camera ) return;

			const metrics = getCurrentSvgLayoutMetrics();
			if ( ! metrics ) return;

			/*
			 * gameCard.js changes both path d and SVG rotation during its short initial
			 * animation. Keep the proven full-cover layout only for that transient phase,
			 * then permanently switch to the path's minimal visible bounding-box layout.
			 */
			if ( ! tightLayoutReady ) {
				applySafeFullLayout( metrics );
				return;
			}

			const bounds = getTightVisibleBounds( metrics );
			if ( ! bounds ) {
				applySafeFullLayout( metrics );
				return;
			}

			applyTightLayout( metrics, bounds );
		}

		function waitForCardAnimationAndTightenLayout() {
			const cardWrap = indianPockerCard.parentElement;
			if ( ! cardWrap || typeof MutationObserver === 'undefined' ) {
				tightLayoutReady = true;
				updateThreeLayerLayout();
				return;
			}

			let settleTimer = 0;
			let mutationSeen = false;
			let observer;

			function finishTightening() {
				if ( observer ) observer.disconnect();
				if ( settleTimer ) clearTimeout( settleTimer );
				tightLayoutReady = true;
				updateThreeLayerLayout();
			}

			function scheduleAfterStableGeometry() {
				if ( settleTimer ) clearTimeout( settleTimer );
				settleTimer = setTimeout( finishTightening, 80 );
			}

			observer = new MutationObserver( () => {
				mutationSeen = true;
				scheduleAfterStableGeometry();
			} );

			observer.observe( cardWrap, {
				subtree: true,
				attributes: true,
				attributeFilter: [ 'style', 'd' ]
			} );

			/*
			 * If no game-card animation is running, avoid leaving the safe full layout
			 * around indefinitely. Two frames are enough to distinguish the normal init
			 * animation from a static card layout without coupling to its 1000ms duration.
			 */
			requestAnimationFrame( () => {
				requestAnimationFrame( () => {
					if ( ! mutationSeen ) finishTightening();
				} );
			} );
		}

		function onWindowResize() {
			/*
			 * Resize can fire many times while the browser edge is being dragged.
			 * Coalesce them to at most one geometry / WebGL resize per animation frame.
			 */
			if ( resizeFrameId ) return;

			resizeFrameId = requestAnimationFrame( () => {
				resizeFrameId = 0;
				updateThreeLayerLayout();
			} );
		}

		function animate() {
			animateMeshes();
			controls.update();
			render();
		}

		function animateMeshes() {
			const loopNum = Math.min( api.count, api.dynamic );

			if ( api.method === Method.BATCHED ) {
				for ( let i = 0; i < loopNum; i ++ ) {
					const rotationMatrix = mesh.userData.rotationSpeeds[ i ];
					const id = ids[ i ];
					mesh.getMatrixAt( id, matrix );
					matrix.multiply( rotationMatrix );
					mesh.setMatrixAt( id, matrix );
				}
			} else {
				for ( let i = 0; i < loopNum; i ++ ) {
					const child = mesh.children[ i ];
					const rotationSpeed = child.userData.rotationSpeed;

					child.rotation.set(
						child.rotation.x + rotationSpeed.x,
						child.rotation.y + rotationSpeed.y,
						child.rotation.z + rotationSpeed.z
					);
				}
			}
		}

		function render() {
			if ( ! threeLayerVisible ) return;

			if ( mesh.isBatchedMesh ) {
				mesh.sortObjects = api.sortObjects;
				mesh.perObjectFrustumCulled = api.perObjectFrustumCulled;
				mesh.setCustomSort( api.useCustomSort ? sortFunction : null );
			}

			renderer.render( scene, camera );
		}
  } catch (error) {
    throw throwObj(
      error?.errCase ?? 'errorComn',
      error?.message ?? 'indianPocker.js error'
    );
  }
}
