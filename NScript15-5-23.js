const charpstarVTO = {
	element: null,
	artNo: null,
	glbLink: null,
	videoElement: null,
	canvasElement: null,
	sceneManager: null,
	useOrtho: true,
	debug: false,
	glassClass: null,
	facemeshLandmarksProvider: null,
	popup: null,
	cameraDistance: function (height, fov) {
		return (height / 2) / Math.tan((fov / 2) * Math.PI / 180);
	},

	createDepthPackingShader: function () {
		const vertexShader = `
		varying vec2 vUv;

		void main() {
			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
		}
	`;

		const fragmentShader = `
		varying vec2 vUv;
		uniform sampler2D tDiffuse;
		uniform float cameraNear;
		uniform float cameraFar;

		void main() {
			float depth = texture2D(tDiffuse, vUv).r;
			float clipZ = cameraNear * cameraFar / (depth * (cameraFar - cameraNear) - cameraFar);
			gl_FragColor = vec4(vec3(1.0 - ((clipZ - cameraNear) / (cameraFar - cameraNear))), 1.0);
		}
	`;

		return {
			vertexShader: vertexShader,
			fragmentShader: fragmentShader,
		};
	},

	scaleLandmark: function (landmark, width, height) {
		let {
			x,
			y,
			z
		} = landmark;
		return {
			...landmark,
			x: x * width,
			y: y * height,
			z: z * width,
		}
	},


	transformLandmarks: function (landmarks) {
		if (!landmarks) {
			return landmarks;
		}

		let hasVisiblity = !!landmarks.find(l => l.visibility);

		let minZ = 1e-2;

		if (hasVisiblity) {
			console.log(z);
			landmarks.forEach(landmark => {
				let {
					z,
					visibility
				} = landmark;
				z = -z;
				if (z < minZ && visibility) {
					minZ = z
				}
			});
		} else {
			minZ = Math.max(-landmarks[234].z, -landmarks[454].z) - 0.1;
		}

		return landmarks.map(landmark => {
			let {
				x,
				y,
				z
			} = landmark;
			return {
				x: -0.5 + x,
				y: 0.5 - y,
				z: -z - minZ,
				visibility: landmark.visibility,
			}
		});
	},

	init: function () {
		this.element = document.getElementById("charpstarVTOE");
		this.glbLink = this.element.getAttribute("data-glburl");
		if (this.element) {
			this.element.addEventListener('click', this.createPopup.bind(this), false);
		}

	},

	createPopup() {
		if (typeof this.popup != 'undefined') {
			if (this.popup != null) {
				return;
			}
		}
		// Create popup
		this.popup = document.createElement("div");
		this.popup.style.position = "fixed";
		this.popup.style.top = "0";
		this.popup.style.left = "0";
		this.popup.style.width = "100%";
		this.popup.style.height = "100%";
		this.popup.style.zIndex = "9999";
		this.popup.style.backgroundColor = "rgba(0, 0, 0, 0.5)"; // Adding some transparency to see the content beneath
		this.popup.style.display = "flex";
		this.popup.style.justifyContent = "center";
		this.popup.style.alignItems = "center";
		this.popup.id = "charpstar-vtopop";

		var videoWrapper = document.createElement("div");
		videoWrapper.style.overflow = "hidden";
		videoWrapper.style.position = "relative";
		videoWrapper.style.display = "flex";
		videoWrapper.style.flexDirection = "column";
		videoWrapper.style.alignItems = "center"; // Centers children vertically in the container
		videoWrapper.style.justifyContent = "center";
		videoWrapper.style.height = "100%";
		videoWrapper.style.width = "auto";
		videoWrapper.style.aspectRatio = "550/500";
		videoWrapper.style.maxHeight = "min(90%,90vw/1.1)";
		videoWrapper.style.maxWidth = "90vw";
		videoWrapper.style.borderRadius = "2%"
		videoWrapper.style.backgroundColor = "#000"
		//	videoWrapper.style.transform = "translate3d(0,30%,0)";

		// Create video element
		var video = document.createElement("video");
		video.className = "charpstarVTOV";
		video.id = "charpstar-video";
		video.autoplay = true;
		video.playsInline = true;
		video.style.height = "100%";
		video.style.position = "absolute";
		video.style.zIndex = "10000";
		video.style.transform = "scaleX(-1)";
		video.style.objectFit = "cover";
		video.style.visibility = "hidden";
		video.style.zIndex = "10000";

		// Create canvas element
		var canvas = document.createElement("canvas");
		canvas.className = "charpstarVTOC";
		canvas.id = "charpstar-canvas";
		canvas.style.height = "100%";
		canvas.style.position = "absolute";
		canvas.style.zIndex = "10002"; // To overlap the video element
		canvas.style.transform = "scaleX(-1)";
		
		// Create canvas element
		var canvasV = document.createElement("canvas");
		canvasV.className = "charpstarVTOVid";
		canvasV.id = "charpstar-canvasVid";
		canvasV.style.height = "100%";
		canvasV.style.position = "absolute";
		canvasV.style.zIndex = "10001"; // To overlap the video element
		canvasV.style.transform = "scaleX(-1)";


		// Create close button
		var closeButton = document.createElement("span");
		closeButton.innerHTML = "&times;";
		closeButton.style.position = "absolute";
		closeButton.style.top = "10px";
		closeButton.style.right = "30px";
		closeButton.style.fontSize = "70";
		closeButton.style.fontWeight = "bold";
		closeButton.style.color = "#fff";
		closeButton.style.cursor = "pointer";
		closeButton.style.zIndex = "10003"; // To make sure it's above the video and canvas
		closeButton.onclick = function () {
			charpstarVTO.terminateVTO();
		};

		videoWrapper.appendChild(video);
		videoWrapper.appendChild(canvasV);
		videoWrapper.appendChild(canvas);
		videoWrapper.appendChild(closeButton);

		// Append video and canvas to popup
		this.popup.appendChild(videoWrapper);

		// Append popup to body
		document.body.appendChild(this.popup);
		this.sceneManager = new SceneManager(canvas, canvasV, true, this.useOrtho);
		this.videoElement = video;
		this.initateVTO()

	},

	terminateVTO() {
		if (this.popup != null) {
			this.popup.parentElement.removeChild(this.popup);
			this.popup = null;
		}
		let stream = charpstarVTO.videoElement.srcObject;
		if (stream) {
			let tracks = stream.getTracks();
			tracks.forEach(function (track) {
				track.stop();
			});
		}
		charpstarVTO.videoElement.srcObject = null;
		if (typeof charpstarVTO.facemeshLandmarksProvider.remove === 'function') {
			charpstarVTO.facemeshLandmarksProvider.remove();
		} else {
			console.error('facemeshLandmarksProvider.remove is not a function');
		}
		if (charpstarVTO.glassClass) {
			charpstarVTO.glassClass.removeGlasses();
		}
	},

	async initateVTO() {
		let videoFrameProvider;
		let previousLandmarks = null;
		const onLandmarks = ({
			image,
			landmarks
		}) => {
			if (landmarks && previousLandmarks) {
				const alpha = 0.8;
				for (let i = 0; i < landmarks.length; i++) {
					landmarks[i].x = exponentialMovingAverage(alpha, landmarks[i].x, previousLandmarks[i].x);
					landmarks[i].y = exponentialMovingAverage(alpha, landmarks[i].y, previousLandmarks[i].y);
					landmarks[i].z = exponentialMovingAverage(alpha, landmarks[i].z, previousLandmarks[i].z);
				}
			}
			if (landmarks) {
				previousLandmarks = landmarks;
				charpstarVTO.sceneManager.onLandmarks(image, landmarks);
			}
		};

		function exponentialMovingAverage(alpha, newValue, oldValue) {
			return alpha * newValue + (1 - alpha) * oldValue;
		}
		const onFrame = async (video) => {
			try {
				await charpstarVTO.facemeshLandmarksProvider.send(charpstarVTO.videoElement);
			} catch (e) {
				charpstarVTO.terminateVTO();
				videoFrameProvider.stop();
			}
		}

		function animate() {
			requestAnimationFrame(animate);
			charpstarVTO.sceneManager.resize(charpstarVTO.videoElement.clientWidth, charpstarVTO.videoElement.clientHeight);
			charpstarVTO.sceneManager.animate();
		}


		charpstarVTO.facemeshLandmarksProvider = new FacemeshLandmarksProvider(onLandmarks);



		if (confirm("Use Camera?")) {
			charpstarVTO.videoElement.pause();
			charpstarVTO.videoElement.removeAttribute('src');
			charpstarVTO.videoElement.load();

			videoFrameProvider = new CameraFrameProvider(charpstarVTO.videoElement, onFrame);

		} else {
			charpstarVTO.terminateVTO();
			videoFrameProvider.stop();
			console.log("Cannot start VTO without Camera Permission. Ending session");
			return;
			//videoFrameProvider = new VideoFrameProvider(charpstarVTO.videoElement, onFrame);

		}

		await charpstarVTO.facemeshLandmarksProvider.initialize();
		videoFrameProvider.start();
		animate();

	},

};

class Glasses {
	constructor(scene, width, height, environmentMap, renderer) {
		this.scene = scene;
		this.renderer = renderer;
		this.width = width;
		this.height = height;
		this.needsUpdate = false;
		this.landmarks = null;
		this.environmentMap = environmentMap;
		this.loadGlasses();
		this.loadFaceOccluder("FO.glb");
		this.midEyesSmoother = new Smoother(0.9, new THREE.Vector3(0, 0, 0));
		this.scaleSmoother = new Smoother(0.3, 1);
		this.xRotSmoother = new Smoother(0, 0);
		this.yRotSmoother = new Smoother(0, 0);
		this.zRotSmoother = new Smoother(0.5, 0);
	}


	async loadFaceOccluder(e) {
		return new Promise(((t, s) => {
			(new THREE.GLTFLoader).load(e, (e => {
				this.faceOccluder = e.scene;
				this.faceOccluder.visible = !0;
				this.faceOccluder.traverse((e => {
					if (e.isMesh) {
						const depthPackingShader = charpstarVTO.createDepthPackingShader();
						e.material = new THREE.MeshDepthMaterial({
							depthPacking: THREE.RGBADepthPacking,
							side: THREE.DoubleSide,
						});
						e.material.colorWrite = false;
						e.position.set(1, 0, 0);
						e.scale.set(1, 1, 1);
						e.renderOrder = 1;
					}
				}));
				this.scene.add(this.faceOccluder);
				t();
			}), void 0, (e => {
				s(e);
			}));
		}));
	}

	async loadGlasses() {
		let file = document.getElementById("charpstarVTOE").getAttribute("data-glburl");
		const ktx2Loader = new THREE.KTX2Loader();	
		ktx2Loader.setTranscoderPath('https://charpstar.se/ar/VTO/Git4/Compression/');
		ktx2Loader.detectSupport(this.renderer);
		return new Promise((res, rej) => {
			const loader = new THREE.GLTFLoader();
			const dracoLoader = new THREE.DRACOLoader()
			dracoLoader.setDecoderPath('https://charpstar.se/ar/VTO/Git4/Compression/')
			loader.setDRACOLoader(dracoLoader)
			loader.setKTX2Loader(ktx2Loader);
			loader.load(
				file,
				(gltf) => {
					gltf.scene.traverse((node) => {
						if (node.isMesh) {
							const material = node.material;
							material.envMap = this.environmentMap;
							// Set encoding, format, and type for all relevant textures
							const setTextureEncoding = (texture) => {
								if (texture) {
									texture.encoding = THREE.LinearEncoding;
								}
							};
							setTextureEncoding(material.map);
							setTextureEncoding(material.roughnessMap);
							setTextureEncoding(material.metalnessMap);
							setTextureEncoding(material.normalMap);
							setTextureEncoding(material.alphaMap);
							// setTextureEncoding(material.emissiveMap);
							setTextureEncoding(material.aoMap);
							material.needsUpdate = true;

							if (node.isMesh && node.material) {
								node.material.depthTest = true;
								node.renderOrder = 2;
							}

							material.needsUpdate = true;
						}
					});

					this.glasses = gltf.scene;

					// scale glasses
					const bbox = new THREE.Box3().setFromObject(this.glasses);
					const size = bbox.getSize(new THREE.Vector3());
					this.scaleFactor = size.x * 1; // Increase the size by 20%
					this.glasses.name = "glasses";

					res();
				},
				undefined,
				function (error) {
					rej(error);
				}
			);
		});
	}

	updateDimensions(width, height) {
		this.width = width;
		this.height = height;
		this.needsUpdate = true;
	}

	updateLandmarks(landmarks) {
		this.landmarks = landmarks;
		this.needsUpdate = true;
	}

	updateGlasses() {
		// Points for reference
		let midEyes = charpstarVTO.scaleLandmark(this.landmarks[168], this.width, this.height);
		let leftEyeInnerCorner = charpstarVTO.scaleLandmark(this.landmarks[463], this.width, this.height);
		let rightEyeInnerCorner = charpstarVTO.scaleLandmark(this.landmarks[243], this.width, this.height);
		let noseBottom = charpstarVTO.scaleLandmark(this.landmarks[2], this.width, this.height);
		let leftEyeUpper1 = charpstarVTO.scaleLandmark(this.landmarks[264], this.width, this.height);
		let rightEyeUpper1 = charpstarVTO.scaleLandmark(this.landmarks[34], this.width, this.height);

		if (this.glasses) {
			// position
			this.glasses.position.set(
				midEyes.x,
				midEyes.y-13,
				midEyes.z-30,
			)

			// scale to make glasses as wide as distance between left eye corner and right eye corner
			const eyeDist = Math.sqrt(
				(leftEyeUpper1.x - rightEyeUpper1.x) ** 2 +
				(leftEyeUpper1.y - rightEyeUpper1.y) ** 2 +
				(leftEyeUpper1.z - rightEyeUpper1.z) ** 2
			);
			const scale = eyeDist / this.scaleFactor;
			this.glasses.scale.set(scale, scale, scale);

			// use two vectors to rotate glasses
			let upVector = new THREE.Vector3(
				midEyes.x - noseBottom.x,
				midEyes.y - noseBottom.y,
				midEyes.z - noseBottom.z,
			).normalize();

			let sideVector = new THREE.Vector3(
				leftEyeInnerCorner.x - rightEyeInnerCorner.x,
				leftEyeInnerCorner.y - rightEyeInnerCorner.y,
				leftEyeInnerCorner.z - rightEyeInnerCorner.z,
			).normalize();

			let zRot = (new THREE.Vector3(1, 0, 0)).angleTo(
				upVector.clone().projectOnPlane(
					new THREE.Vector3(0, 0, 1)
				)
			) - (Math.PI / 2)

			let xRot = (Math.PI / 2) - (new THREE.Vector3(0, 0, 1)).angleTo(
				upVector.clone().projectOnPlane(
					new THREE.Vector3(1, 0, 0)
				)
			);

			let yRot = (
				new THREE.Vector3(sideVector.x, 0, sideVector.z)
			).angleTo(new THREE.Vector3(0, 0, 1)) - (Math.PI / 2);

			// Add the rotation values to the smoothers
			this.xRotSmoother.addValue(xRot);
			this.yRotSmoother.addValue(yRot);
			this.zRotSmoother.addValue(zRot);

			// Use the smoothed rotation values
			let smoothedXRot = this.xRotSmoother.getAverage();
			let smoothedYRot = this.yRotSmoother.getAverage();
			let smoothedZRot = this.zRotSmoother.getAverage();
			this.glasses.rotation.set(smoothedXRot, smoothedYRot, smoothedZRot);
		}
	}


	updateFaceOccluder(occluder) {
		if (!occluder) {
			return;
		}

		let midEyes = charpstarVTO.scaleLandmark(this.landmarks[168], this.width, this.height);

		let leftEyeInnerCorner = charpstarVTO.scaleLandmark(this.landmarks[463], this.width, this.height);
		let rightEyeInnerCorner = charpstarVTO.scaleLandmark(this.landmarks[243], this.width, this.height);
		let noseBottom = charpstarVTO.scaleLandmark(this.landmarks[2], this.width, this.height);
		let leftCheek = charpstarVTO.scaleLandmark(this.landmarks[234], this.width, this.height);
		let rightCheek = charpstarVTO.scaleLandmark(this.landmarks[454], this.width, this.height);


		// position
		occluder.position.set(
			midEyes.x,
			midEyes.y,
			midEyes.z - 70, // Adjust this value to change the occluder's distance from the face
		);

		// scale to make occluder
		// 50% bigger than the distance between
		// left cheek and right cheek
		let scaleX = Math.abs(leftCheek.x - rightCheek.x) * 1.1;
		if (scaleX <= 320) {
			scaleX = 320;
		}
		const scaleY = Math.abs(noseBottom.y - midEyes.y) * 3;
		const scaleZ = 300;
		occluder.scale.set(scaleX / 100, scaleY / 100, scaleZ / 100);

		let upVector = new THREE.Vector3(
			midEyes.x - noseBottom.x,
			midEyes.y - noseBottom.y,
			midEyes.z - noseBottom.z,
		).normalize();

		let sideVector = new THREE.Vector3(
			leftEyeInnerCorner.x - rightEyeInnerCorner.x,
			leftEyeInnerCorner.y - rightEyeInnerCorner.y,
			leftEyeInnerCorner.z - rightEyeInnerCorner.z,
		).normalize();

		let zRot = (new THREE.Vector3(1, 0, 0)).angleTo(
			upVector.clone().projectOnPlane(
				new THREE.Vector3(0, 0, 1)
			)
		) - (Math.PI / 2);

		let xRot = (Math.PI / 2) - (new THREE.Vector3(0, 0, 1)).angleTo(
			upVector.clone().projectOnPlane(
				new THREE.Vector3(1, 0, 0)
			)
		);

		xRot = Math.max(-Math.PI / 4, Math.min(Math.PI / 4, xRot));

		let yRot = (
			new THREE.Vector3(sideVector.x, 0, sideVector.z)
		).angleTo(new THREE.Vector3(0, 0, 1)) - (Math.PI / 2);

		occluder.rotation.set(xRot, yRot, zRot);

		occluder.visible = true;
	}

	addGlasses() {
		if (this.glasses) {
			this.scene.add(this.glasses);
		}
	}

	removeGlasses() {
		this.scene.remove(this.glasses);
	}

	update() {
		if (this.needsUpdate) {
			let inScene = !!this.scene.getObjectByName('glasses');
			let shouldShow = !!this.landmarks;
			if (inScene) {
				shouldShow ? this.updateGlasses() : this.removeGlasses();
			} else {
				if (shouldShow) {
					this.addGlasses();
				}
			}
		}
	}
}

class SceneManager {
	constructor(canvas, canvasV, debug = false, useOrtho = true) {
		this.canvas = canvas;
		this.canvasV = canvasV;
		this.scene = new THREE.Scene();
		this.videoScene = new THREE.Scene();

		this.useOrtho = useOrtho;
		this.renderer = new THREE.WebGLRenderer({
			canvas: this.canvas,
			devicePixelRatio: window.devicePixelRatio || 1,
			context: canvas.getContext("webgl2"),
			antialias: true,
			alpha: true
		});
		this.rendererVideo = new THREE.WebGLRenderer({
			canvas: this.canvasV,
			 devicePixelRatio: window.devicePixelRatio || 1,
			context: canvasV.getContext("webgl2"),
		});

	//	this.rendererVideo.outputEncoding = THREE.sRGBEncoding;
		
		this.renderer.outputEncoding = THREE.sRGBEncoding;
		this.renderer.physicallyCorrectLights = true;
		this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
		this.renderer.toneMappingExposure = 0.7;

		this.fov = 63;
		this.environmentMap = null;
		this.buildCamera();
		this.buildControls();
		this.buildVideoBg();
		this.loadEnvironmentMap();

		const renderSceneVideo = new THREE.RenderPass(this.videoScene, this.camera);
		const renderScene = new THREE.RenderPass(this.scene, this.camera);
		


		//	const bloomPass = new THREE.UnrealBloomPass( new THREE.Vector2( window.innerWidth, window.innerHeight ), 1.5, 0.4, 0.85 );
		//	bloomPass.threshold = 1
		//	bloomPass.strength = 1;
		//	bloomPass.radius = 1;

	//	this.composer = new THREE.EffectComposer(this.renderer);
	//	this.composer.addPass(renderScene);
	//	this.composer.addPass(renderSceneVideo);
		
		//	this.composer.addPass( bloomPass );



	}

	async loadEnvironmentMap() {
		const loader = new THREE.RGBELoader();
		const texture = await new Promise((resolve, reject) => {
			loader.load(
				'Sweef.hdr',
				(texture) => {
					// Set the encoding of the texture
					texture.encoding = THREE.sRGBEncoding;
					texture.mapping = THREE.EquirectangularReflectionMapping;
					resolve(texture);
				},
				undefined,
				reject
			);
		});

		
		const envMap = texture;
		//this.environmentMap = envMap;
		this.scene.background = envMap;
		this.scene.environment  = envMap;
		this.buildLights();
		this.buildGlasses();

		return envMap;
	}


	buildVideoBg() {
		// video background for canvas
		this.videoBg = new VideoBackground(this.videoScene,
			this.rendererVideo.domElement.width,
			this.rendererVideo.domElement.height
		);
	}


	buildGlasses() {
		charpstarVTO.glassClass = new Glasses(this.scene, this.renderer.domElement.width, this.renderer.domElement.height, this.environmentMap, this.renderer)
	}

	buildLights() {
		// Add an ambient light
		const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
		this.scene.add(ambientLight);

		// Add a directional light
		const pointLight  = new THREE.PointLight(0xffffff, 0.1);
		pointLight.position.set(0, 50, 100);
		this.scene.add(pointLight);

	}



	buildControls() {
		if (this.debug) {
			this.controls = new OrbitControls(
				this.camera, this.renderer.domElement
			);
			this.controls.update();
		}
	}

	buildCamera() {
		this.useOrtho ? this.buildOrthoCamera() : this.buildPerspectiveCamera();
	}

	buildOrthoCamera() {
		this.camera = new THREE.OrthographicCamera(
			-this.renderer.domElement.width / 2,
			this.renderer.domElement.width / 2,
			this.renderer.domElement.height / 2,
			-this.renderer.domElement.height / 2,
			-2000,
			2000
		)
		this.camera.position.z = 1
	}

	buildPerspectiveCamera() {
		this.camera = new THREE.PerspectiveCamera(
			this.fov,
			this.renderer.domElement.width / this.renderer.domElement.height,
			0.06, // near
			10000, // far
		)

		this.camera.position.z = charpstarVTO.cameraDistance(
			this.renderer.domElement.height,
			this.fov
		);
	}

	// we need to resize canvas rendering dimensions
	// when canvas sytling dimensions change
	resizeRendererToDisplaySize() {

		const canvas = this.renderer.domElement;
		const canvasV = this.rendererVideo.domElement;

		// match dimension of canvas with
		// dimension of video
		if (this.videoWidth != canvas.clientWidth ||
			this.videoHeight != canvas.clientHeight) {
			const width = this.videoWidth;
			const height = this.videoHeight;
			canvas.style.width = `${width}px`;
			canvas.style.height = `${height}px`;
			canvasV.style.width = `${width}px`;
			canvasV.style.height = `${height}px`;
		}

		// canvas has 2 width
		// 1) style width set with style attribute
		// 2) rendering width set with width and height attribute
		// update rendering width to match styling width.
		const width = canvas.clientWidth | 0;
		const height = canvas.clientHeight | 0;
		const needResize = canvas.width !== width || canvas.height !== height;
		if (needResize) {
			this.renderer.setSize(width, height, false);
			this.rendererVideo.setSize(width, height, false);
		}
		return needResize;
	}

	updateCamera() {
		// camera need to be adjusted according to
		// renderer dimensions
		this.camera.aspect = this.videoWidth / this.videoHeight;
		if (this.camera.type == 'OrthographicCamera') {
			this.camera.top = this.videoHeight / 2
			this.camera.bottom = -this.videoHeight / 2
			this.camera.left = -this.videoWidth / 2
			this.camera.right = this.videoWidth / 2
		} else {
			this.camera.position.z = charpstarVTO.cameraDistance(this.videoHeight, this.fov);
		}
		this.camera.updateProjectionMatrix();
	}

	animate() {
		if (this.controls) {
			this.controls.update();
		}
		if (this.resizeRendererToDisplaySize()) {
			charpstarVTO.glassClass.updateDimensions(
				this.renderer.domElement.width,
				this.renderer.domElement.height
			);
			this.videoBg.updateDimensions(
				this.rendererVideo.domElement.width,
				this.rendererVideo.domElement.height
			);
			this.updateCamera();
		}
		this.videoBg.update();
		charpstarVTO.glassClass.update();

		if (charpstarVTO.glassClass.landmarks && charpstarVTO.glassClass.faceOccluder) {
			charpstarVTO.glassClass.updateFaceOccluder(
				charpstarVTO.glassClass.faceOccluder,
				charpstarVTO.glassClass.landmarks
			);
		}
		// render scene
		 this.renderer.render(this.scene, this.camera);
 		this.rendererVideo.render(this.videoScene, this.camera);
	}

	resize(videoWidth, videoHeight) {
		this.videoWidth = videoWidth;
		this.videoHeight = videoHeight;
	}

	onLandmarks(image, landmarks) {
		if (image && landmarks) {
			this.videoBg.setImage(image);
			charpstarVTO.glassClass.updateLandmarks(landmarks);
		}
	}
}

class VideoBackground {
	constructor(scene, width, height) {
		this.scene = scene;
		this.image = null;
		this.plane = null;
		this.width = width;
		this.height = height;
		this.imageUpdated = false;
		this.sizeUpdated = false;
	}

	updateDimensions(width, height) {
		this.width = width;
		this.height = height;
		this.sizeUpdated = true;
	}

	setImage(image) {
		this.image = image;
		this.imageUpdated = true;
	}

	createNewPlane() {
		const geometry = this.createGeometry();
		const material = this.createMaterial();
		this.plane = new THREE.Mesh(geometry, material);
		 this.updateDimensions();
		this.addPlaneToScene();
	}

	addPlaneToScene() {
		if (this.plane != null) {
			 this.updateDimensions();
			this.scene.add(this.plane);
			this.plane.position.set(0, 0, 0);
		}
	}

	createGeometry() {
		return new THREE.PlaneGeometry(
			this.width,
			this.height,
		)
	}

	createMaterial() {
		if (this.image == null) {
			return new THREE.MeshBasicMaterial({
				color: new THREE.Color(0xcccccc)
			});
		}
		let material = new THREE.MeshBasicMaterial({
			map: new THREE.CanvasTexture(this.image),
		});
		return material;
	}

	removePlaneFromScene() {
		this.scene.remove(this.plane);
		this.plane = null;
	}

	async update() {
		if (this.plane == null) {
			this.createNewPlane();
		}

		if (this.sizeUpdated) {
			this.removePlaneFromScene();
			this.createNewPlane();
			this.sizeUpdated = false;
			this.imageUpdated = false;
		}

		if (this.imageUpdated) {
			this.plane.material = this.createMaterial();
			this.imageUpdated = false;
		}

		if (this.faceController && this.faceController.faceLandmarks) {
			// Update faceController
			this.faceController.update(this.videoTexture);

			// Update the face occluder
			const faceLandmarks = this.faceController.faceLandmarks;
		}

		const faceLandmarks = this.landmarks;
		if (faceLandmarks) {
			const transformedLandmarks = charpstarVTO.transformLandmarks(faceLandmarks);
			updateFaceGeometry(faceGeometry, transformedLandmarks);
			updateFaceOccluder(faceOccluder, transformedLandmarks);
		}
	}
}

class Smoother {
	constructor(alpha, initialValue) {
		this.alpha = alpha;
		this.value = initialValue;
	}

	addValue(newValue) {
		this.value = this.alpha * this.value + (1 - this.alpha) * newValue;
	}

	getAverage() {
		return this.value;
	}
}

class FacemeshLandmarksProvider {
	constructor(callback) {
		this.callback = callback;
		this.faceMesh = null;
	}

	send(image) {
		return this.faceMesh.send({
			image: image
		});
	}

	onResults({
		image,
		multiFaceLandmarks
	}) {
		if (image != null && multiFaceLandmarks != null) {
			const landmarks = charpstarVTO.transformLandmarks(multiFaceLandmarks[0]);
			this.callback({
				image: image,
				landmarks: landmarks
			});
		}
	}

	async initialize() {
		let onResults = this.onResults.bind(this);
		this.faceMesh = new FaceMesh({
			locateFile: (file) => {
				let url = `mediapipe/${file}`;
				return url
			}
		});

		this.faceMesh.setOptions({
			maxNumFaces: 1,
			refineLandmarks: true,
			minDetectionConfidence: 0.9,
			minTrackingConfidence: 0.9,
			useCpuInference: true,
		});

		this.faceMesh.onResults(onResults);
		await this.faceMesh.initialize();
	}

	remove() {
		const scripts = document.getElementsByClassName('charpstar-VTO-script');
		Array.from(scripts).forEach((script) => {
			script.parentNode.removeChild(script);
		});
	}
}

class CameraFrameProvider {
	constructor(videoElement, onFrame) {
		const camera = new Camera(videoElement, {
			onFrame: async () => {
				onFrame(videoElement)
			},
			width: 1200,
			height: 1000
		});
		this.camera = camera;
	}

	start() {
		this.camera.start();
	}

	stop() {
		this.camera.stop();
	}
}


charpstarVTO.init();