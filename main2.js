function loadModel(file) {
        return new Promise((res, rej) => {
                const loader = new THREE.GLTFLoader();
                loader.load(file, function(gltf) {
                          gltf.scene.traverse((node) => {
                            if (node.isMesh) {
                              const material = node.material;
                              // Set encoding for all relevant textures
                              if (material.map) {
                                material.map.encoding = THREE.sRGBEncoding;
                              }
                              if (material.roughnessMap) {
                                material.roughnessMap.encoding = THREE.sRGBEncoding;
                              }
                              if (material.metalnessMap) {
                                material.metalnessMap.encoding = THREE.sRGBEncoding;
                              }
                              if (material.normalMap) {
                                material.normalMap.encoding = THREE.sRGBEncoding;
                              }
                              if (material.emissiveMap) {
                                material.emissiveMap.encoding = THREE.sRGBEncoding;
                              }
                              if (material.aoMap) {
                                material.aoMap.encoding = THREE.sRGBEncoding;
                              }
                               if (node.isMesh && node.material) {
                                    console.log(node);
                                  }
                            }
                            
                            
                      });
                      res(gltf.scene);
                }, undefined, function(error) {
                        rej(error);
                });
        });
}



class Glasses {
        constructor(scene, width, height) {
                this.scene = scene;
                this.width = width;
                this.height = height;
                this.needsUpdate = false;
                this.landmarks = null;
                this.loadGlasses();
        }

        async loadGlasses() {
                this.glasses = await loadModel("https://charpstar.se/ar/VTO/Git3/3d/4.glb");
                // scale glasses
                const bbox = new THREE.Box3().setFromObject(this.glasses);
                const size = bbox.getSize(new THREE.Vector3());
                this.scaleFactor = size.x;

                this.glasses.name = 'glasses';
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
                // https://raw.githubusercontent.com/google/mediapipe/master/mediapipe/modules/face_geometry/data/canonical_face_model_uv_visualization.png

                let midEyes = scaleLandmark(this.landmarks[168], this.width, this.height);
                let leftEyeInnerCorner = scaleLandmark(this.landmarks[463], this.width, this.height);
                let rightEyeInnerCorner = scaleLandmark(this.landmarks[243], this.width, this.height);
                let noseBottom = scaleLandmark(this.landmarks[2], this.width, this.height);

                // These points seem appropriate 446, 265, 372, 264
                let leftEyeUpper1 = scaleLandmark(this.landmarks[264], this.width, this.height);
                // These points seem appropriate 226, 35, 143, 34
                let rightEyeUpper1 = scaleLandmark(this.landmarks[34], this.width, this.height);

                if (this.glasses) {

                        // position
                        this.glasses.position.set(
                                midEyes.x,
                                midEyes.y,
                                midEyes.z,
                        )

                        // scale to make glasses
                        // as wide as distance between
                        // left eye corner and right eye corner
                        const eyeDist = Math.sqrt(
                                (leftEyeUpper1.x - rightEyeUpper1.x) ** 2 +
                                (leftEyeUpper1.y - rightEyeUpper1.y) ** 2 +
                                (leftEyeUpper1.z - rightEyeUpper1.z) ** 2
                        );
                        const scale = eyeDist / this.scaleFactor;
                        this.glasses.scale.set(scale, scale, scale);

                        // use two vectors to rotate glasses
                        // Vertical Vector from midEyes to noseBottom
                        // is used for calculating rotation around x and z axis
                        // Horizontal Vector from leftEyeCorner to rightEyeCorner
                        // us use to calculate rotation around y axis
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

                        this.glasses.rotation.set(xRot, yRot, zRot);

                }
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

const transformLandmarks = (landmarks) => {
        if (!landmarks) {
                return landmarks;
        }

        let hasVisiblity = !!landmarks.find(l => l.visibility);

        let minZ = 1e-4;

        // currently mediapipe facemesh js
        // has visibility set to undefined
        // so we use a heuristic to set z position of facemesh
        if (hasVisiblity) {
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
                minZ = Math.max(-landmarks[234].z, -landmarks[454].z);
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
}

const scaleLandmark = (landmark, width, height) => {
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
}


const makeGeometry = (landmarks) => {
        let geometry = new THREE.BufferGeometry();

        let vertices = [];
        let uvs = [];

        for (let i = 0; i < 468; i++) {
                let {
                        x,
                        y,
                        z
                } = landmarks[i];
                let vertex = [x, y, z];
                vertices.push(...vertex);
        }
        for (let j = 0; j < 468; j++) {
                uvs[j * 2] = FACE_MESH_UV[j][0];
                uvs[j * 2 + 1] = FACE_MESH_UV[j][1];
        }

        geometry.setIndex(FACE_MESH_INDEX_BUFFER);
        geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
        geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
        geometry.computeVertexNormals();

        return geometry;
}


const cameraDistance = (height, fov) => {
        return (height / 2) / Math.tan((fov / 2) * Math.PI / 180);
}

class SceneManager {
        constructor(canvas, debug = false, useOrtho = true) {
                this.canvas = canvas;
                this.scene = new THREE.Scene();
                this.debug = debug;
                this.useOrtho = useOrtho;
                this.renderer = new THREE.WebGLRenderer({
                        canvas: this.canvas,
                        devicePixelRation: window.devicePixelRatio || 1
                });
                
            
                this.renderer.toneMappingExposure = 1; 
                this.fov = 63;
                this.buildCamera();
                this.buildControls();
                this.buildVideoBg();
                this.buildGlasses();
                this.buildLights();
                this.loadEnvironmentMap();
        }
        
                async  loadEnvironmentMap() {
                  const loader = new THREE.RGBELoader();
                  const texture = await new Promise((resolve, reject) => {
                    loader.load(
                      'https://charpstar.se/ar/VTO/Git3/3d/HDRI_for_glasses.hdr',
                      (texture) => {
                        // Set the encoding of the texture
                        texture.encoding = THREE.sRGBEncoding;
                        resolve(texture);
                      },
                      undefined,
                      reject
                    );
                  });
                
                  const pmremGenerator = new THREE.PMREMGenerator(this.renderer);
                  const envMap = pmremGenerator.fromEquirectangular(texture).texture;
                  this.glasses.scene.traverse((node) => {
                  if (node.isMesh && node.material) {
                    node.material.envMap = envMap;
                    console.log (node);
                    node.material.needsUpdate = true;
                  }
                });
                
                  pmremGenerator.dispose();
                  return envMap;
                }


        buildVideoBg() {
                // video background for canvas
                this.videoBg = new VideoBackground(this.scene,
                        this.renderer.domElement.width,
                        this.renderer.domElement.height
                );
        }


        buildGlasses() {
                this.glasses = new Glasses(this.scene,
                        this.renderer.domElement.width,
                        this.renderer.domElement.height
                )
               
        }

        buildLights() {
          // Add an ambient light
          const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
          this.scene.add(ambientLight);
        
          // Add a directional light
          const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
          directionalLight.position.set(0, 10, 10);
          this.scene.add(directionalLight);
          
         const pointLight = new THREE.PointLight(0xffffff, 0.5, 100);
          pointLight.position.set(0, 10, 10);
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
                        1.0, // near
                        10000, // far
                )

                this.camera.position.z = cameraDistance(
                        this.renderer.domElement.height,
                        this.fov
                );
        }

        // we need to resize canvas rendering dimensions
        // when canvas sytling dimensions change
        resizeRendererToDisplaySize() {

                const canvas = this.renderer.domElement;

                // match dimension of canvas with
                // dimension of video
                if (this.videoWidth != canvas.clientWidth ||
                        this.videoHeight != canvas.clientHeight) {
                        const width = this.videoWidth;
                        const height = this.videoHeight;
                        canvas.style.width = `${width}px`;
                        canvas.style.height = `${height}px`;
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
                        this.camera.position.z = cameraDistance(this.videoHeight, this.fov);
                }
                this.camera.updateProjectionMatrix();
        }

        animate() {
                if (this.controls) {
                        this.controls.update();
                }

                if (this.resizeRendererToDisplaySize()) {

                        // facemask needs to scale faces according to 
                        // renderer dimensions

                        this.glasses.updateDimensions(
                                this.renderer.domElement.width,
                                this.renderer.domElement.height,
                        )

                        // update video width and height
                        this.videoBg.updateDimensions(
                                this.renderer.domElement.width,
                                this.renderer.domElement.height
                        );

                        this.updateCamera();
                }


                // update video background
                this.videoBg.update();


                // update glasses
                this.glasses.update();

                // render scene
                this.renderer.render(this.scene, this.camera);

        }

        resize(videoWidth, videoHeight) {
                this.videoWidth = videoWidth;
                this.videoHeight = videoHeight;
        }

        onLandmarks(image, landmarks) {
                if (image && landmarks) {
                        this.videoBg.setImage(image);
                        this.glasses.updateLandmarks(landmarks);
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
                // this.updateDimensions();
                this.addPlaneToScene();
        }

        addPlaneToScene() {
                if (this.plane != null) {
                        // this.updateDimensions();
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

        update() {
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
                        multiFaceLandmarks = transformLandmarks(multiFaceLandmarks[0]);
                        this.callback({
                                image: image,
                                landmarks: multiFaceLandmarks
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
                        minDetectionConfidence: 0.5,
                        minTrackingConfidence: 0.5,
                        useCpuInference: true,
                });

                this.faceMesh.onResults(onResults);

                await this.faceMesh.initialize();
        }
}

class CameraFrameProvider {
        constructor(videoElement, onFrame) {
                const camera = new Camera(videoElement, {
                        onFrame: async () => {
                                onFrame(videoElement)
                        },
                        width: 1280,
                        height: 720
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

async function main() {
        const video = document.querySelector('.input_video');
        const canvas = document.querySelector('.output_canvas');

        console.log(video);
        const useOrtho = true;
        const debug = false;

        let sceneManager;
        let facemeshLandmarksProvider;
        let videoFrameProvider;

        let previousLandmarks = null;

        const onLandmarks = ({ image, landmarks }) => {
          if (previousLandmarks) {
            const alpha = 0.8;
            for (let i = 0; i < landmarks.length; i++) {
              landmarks[i].x = exponentialMovingAverage(alpha, landmarks[i].x, previousLandmarks[i].x);
              landmarks[i].y = exponentialMovingAverage(alpha, landmarks[i].y, previousLandmarks[i].y);
              landmarks[i].z = exponentialMovingAverage(alpha, landmarks[i].z, previousLandmarks[i].z);
            }
          }
          previousLandmarks = landmarks;
          sceneManager.onLandmarks(image, landmarks);
        };

        
        function exponentialMovingAverage(alpha, newValue, oldValue) {
          return alpha * newValue + (1 - alpha) * oldValue;
        }


        const onFrame = async (video) => {
                try {
                        await facemeshLandmarksProvider.send(video);
                } catch (e) {
                        alert("Not Supported on your device")
                        console.error(e);
                        videoFrameProvider.stop();
                }
        }

        function animate() {
                requestAnimationFrame(animate);
                sceneManager.resize(video.clientWidth, video.clientHeight);
                sceneManager.animate();
        }

        sceneManager = new SceneManager(canvas, debug, useOrtho);
        facemeshLandmarksProvider = new FacemeshLandmarksProvider(onLandmarks);

        if (confirm("Use Camera?")) {
                // unload video
                video.pause();
                // video.querySelector("source").remove();
                video.removeAttribute('src');
                video.load();

                videoFrameProvider = new CameraFrameProvider(video, onFrame);

        } else {

                videoFrameProvider = new VideoFrameProvider(video, onFrame);

        }

        await facemeshLandmarksProvider.initialize();
        videoFrameProvider.start();

        animate();

}

main();