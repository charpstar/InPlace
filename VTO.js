var i = (this.index + r) % this.historyLength,
        a = (this.historyLength, t - (this.history[i] - this.minValue) / n * t);
if (r == this.historyLength - 1) return a
}
}
}
class _c {
        active = !0;
        constructor(e, t, n) {
                this.processFrame = this.processFrame.bind(this), this.processData = {
                        timestamp: 0,
                        video: e,
                        onFrame: n.onFrame,
                        onStart: n.onStart
                }, this.processVideoStream(t)
        }
        processVideoStream(e) {
                if (this.processData.onStart) {
                        let t = e.getVideoTracks()[0].getSettings(),
                                n = t.width,
                                r = t.height;
                        this.processData.onStart(n, r)
                }
                this.processData.video.srcObject = e, this.processData.video.onloadedmetadata = () => {
                        this.active = !0, this.processData.video.play(), this.processFrame()
                }
        }
        stop() {
                this.active = !1, this.processData.video.srcObject.getTracks().forEach((e => e.stop())), window.cancelAnimationFrame(this.animationId)
        }
        async processFrame() {
                this.processData.video.paused || this.processData.video.currentTime === this.processData.timestamp || (this.processData.timestamp = this.processData.video.currentTime, await this.processData.onFrame()), this.active && (this.animationId = window.requestAnimationFrame(this.processFrame))
        }
}
class vc {
        constructor(e, t = (() => {})) {
                this.setCanvasDimensions = e.setCanvasDimensions, this.videoStream = e.videoStream, this.delta = 2, this.canvasWidth = e.canvasWidth, this.canvasHeight = e.canvasHeight, this.cssWidth = this.canvasWidth / devicePixelRatio, this.cssHeight = this.canvasHeight / devicePixelRatio, this.camera_fov = e.camera_fov, this.camera_near = e.camera_near, this.camera_far = e.camera_far, this.facingMode = e.facingMode, this.videoElement = e.videoElement, this.kalman = e.kalman, this.oneEuro = e.oneEuro, this.stats = e.stats, this.onReady = t, this.options = e, this.lastFrame = null, this.pose_matrixes = [], this.keypoints = [], this.bounding_box_points = [], this.cut_frames = [], this.geometryLibInit = !1, this.matricies = [], this.noseLength = 30;
                let {
                        KalmanFilter: n
                } = pc;
                this.kFilter = new n({
                        observation: 12
                }), this.step = 8, this.previousPixels = [], this.uMotionGraph = new gc(100, -this.step / 2, +this.step / 2), this.vMotionGraph = new gc(100, -this.step / 2, +this.step / 2), this.flow = new mc(this.step), this.u_prev = 0, this.v_prev = 0, this.bb_width = 3 / 4 * this.canvasWidth, this.bb_height = .5 * this.canvasHeight, this.bb_previous_top_x = -1, this.bb_previous_top_y = -1, this.previous_face_center_x = -1, this.previous_face_center_y = -1, this.face_movement_limit_x = .3, this.face_movement_limit_y = .3, this.center_face_x = null, this.center_face_y = null, this.extreme_left_x = null, this.extreme_left_y = null, this.extreme_right_x = null, this.extreme_right_y = null, this.extreme_top_x = null, this.extreme_top_y = null, this.extreme_botom_x = null, this.extreme_botom_y = null, this.landmarks = null, this.rotMat = null, this.pose_transform_mat = null, this.useStillImage = !1, this.customFilter = e.customFilter, this.previousDetect = null, this.faceMesh = new cc.FaceMesh({
                        locateFile: e => new URL(`./face_mesh/${e}`, import.meta.url).toString()
                }), this.faceMesh.setOptions({
                        maxNumFaces: 1,
                        refineLandmarks: !0,
                        minDetectionConfidence: .5,
                        minTrackingConfidence: .5
                }), this.initCamera(this.videoStream), this.faceMesh.onResults(((...e) => {
                        this.onReady();
                        const t = this.onResults.bind(this),
                                n = t(...e);
                        return this.faceMesh.onResults(t), n
                })), uc().then((e => {
                        console.time("FrameProcessing"), this.pcfInstance = new e.PerspectiveCameraFrustum(this.camera_near, this.camera_far, this.canvasWidth, this.canvasHeight, this.canvasHeight / (2 * Math.tan(this.camera_fov / 2 * Math.PI / 180))), this.geometryLibInit = !0, this.faceGeometryModule = e, this.landmarks = new this.faceGeometryModule.vector$float$, console.log("GeometryLib module loaded")
                })), this.debug = {
                        switch: !1,
                        optical_flow: !0,
                        freezeCamera: !0,
                        lenghtOfHistory: 10,
                        displayPoints: !0,
                        drawArrows: !1,
                        multiplyByWeights: !0,
                        showBBox: !1,
                        showUnusedForProcrustes: !0,
                        verboseLevel: 0
                }
        }
        async initCamera(e = null) {
                e || (e = await this.getCameraStream(this.facingMode)), this.camera = new _c(this.videoElement, e, {
                        onFrame: async () => {
                                null != this.faceMesh && await this.faceMesh.send({
                                        image: this.videoElement
                                })
                        },
                        facingMode: this.facingMode,
                        onStart: this.setDimensionsFromVideoStream
                })
        }
        updateDimensionsIfRequired = (e, t) => {
                if (this.cssWidth === e && this.cssHeight === t) return;
                this.options.onResize && this.options.onResize(e, t), this.cssWidth = e, this.cssHeight = t;
                const n = window.devicePixelRatio * e,
                        r = window.devicePixelRatio * t;
                this.canvasWidth = n, this.canvasHeight = r, this.geometryLibInit && (this.pcfInstance = new this.faceGeometryModule.PerspectiveCameraFrustum(this.camera_near, this.camera_far, this.canvasWidth, this.canvasHeight, this.canvasHeight / (2 * Math.tan(this.camera_fov / 2 * Math.PI / 180)))), this.setCanvasDimensions(n, r)
        };
        async getCameraStream(e) {
                navigator.mediaDevices && navigator.mediaDevices.getUserMedia || alert("No navigator.mediaDevices.getUserMedia exists.");
                try {
                        var t = {
                                video: {
                                        facingMode: e
                                }
                        };
                        return await navigator.mediaDevices.getUserMedia(t)
                } catch (e) {
                        var n = "Failed to acquire camera feed: " + e;
                        throw console.error(e), alert(n), e
                }
        }
        copyImage(e, t) {
                var n = e.length;
                for (t && t.length == n || (t = new e.constructor(n)); n--;) t[n] = e[n];
                return t
        }
        compute_optical_flow(e, t) {
                if (!this.debug.optical_flow) return;
                var n = e.canvas;
                let r = n.width,
                        i = n.height;
                if (t && t.GLctxObject.GLctx) {
                        var a = t.GLctxObject.GLctx,
                                s = new Uint8Array(a.drawingBufferWidth * a.drawingBufferHeight * 4);
                        a.readPixels(0, 0, a.drawingBufferWidth, a.drawingBufferHeight, a.RGBA, a.UNSIGNED_BYTE, s)
                } else console.time("imagedata - canvas"), s = e.getImageData(0, 0, r, i).data, console.timeEnd("imagedata - canvas");
                if (s.length > 0) {
                        this.flow.calculate(this.previousPixels, s, r, i), this.previousPixels.length || (this.previousPixels = this.copyImage(s, this.previousPixels));
                        var o = 0,
                                c = [],
                                l = [];
                        this.flow.flow && 0 != this.flow.flow.u && 0 != this.flow.flow.v && (this.uMotionGraph.addSample(this.flow.flow.u), this.vMotionGraph.addSample(this.flow.flow.v), this.flow.flow.zones.forEach(function(t) {
                                (Math.abs(t.u) > 3.5 || Math.abs(t.v) > 3.5) && (this.canvas_arrow(e, [t.x, t.y], [t.x + t.u, t.y + t.v]), c.push([t]), o++), l.push(Math.sqrt(t.u * t.u + t.v * t.v))
                        }.bind(this)));
                        const t = l.reduce(((e, t) => e + t), 0) / l.length || 0;
                        parseInt(this.uMotionGraph.distance(r, i / 2)), parseInt(this.vMotionGraph.distance(r, i / 2)), t < 1 || o < 25 ? this.pose_matrixes.pop() : this.previousPixels = this.copyImage(s, this.previousPixels)
                }
        }
        canvas_arrow(e, t, n) {
                if (this.debug.drawArrows) {
                        var r = n[0] - t[0],
                                i = n[1] - t[1],
                                a = Math.atan2(i, r);
                        e.moveTo(t[0], t[1]), e.lineTo(n[0], n[1]), e.lineTo(n[0] - 5 * Math.cos(a - Math.PI / 6), n[1] - 5 * Math.sin(a - Math.PI / 6)), e.moveTo(n[0], n[1]), e.lineTo(n[0] - 5 * Math.cos(a + Math.PI / 6), n[1] - 5 * Math.sin(a + Math.PI / 6))
                }
        }
        onFilterConfigUpdate() {
                this.faceGeometryModule.setVerboseLevel(this.debug.verboseLevel), this.oneEuro.switch && this.faceGeometryModule.initializeOneEuro(this.oneEuro.frequency, this.oneEuro.min_cutoff, this.oneEuro.beta, this.oneEuro.derivate_cutoff)
        }
        optical_flow(e, t, n) {
                this.debug.drawArrows && (e.strokeStyle = "#0000FF", e.beginPath()), e.stroke(), e.strokeStyle = "#FF0000";
                const r = [],
                        i = [];
                if (this.keypoints.length >= 2) {
                        var a = this.keypoints[this.keypoints.length - 1],
                                s = this.keypoints[this.keypoints.length - 2];
                        this.debug.drawArrows && e.beginPath();
                        for (var o = 0; o < 468; o++)
                                if (this.debug.showUnusedForProcrustes) {
                                        var c = Math.sqrt((s[o].x - a[o].x) * (s[o].x - a[o].x) + (s[o].y - a[o].y) * (s[o].y - a[o].y) + (s[o].z - a[o].z) * (s[o].z - a[o].z));
                                        if (this.prevousKeypoints) var l = Math.sqrt((this.prevousKeypoints[o].x - a[o].x) * (this.prevousKeypoints[o].x - a[o].x) + (this.prevousKeypoints[o].y - a[o].y) * (this.prevousKeypoints[o].y - a[o].y)) + (this.prevousKeypoints[o].z - a[o].z) * (this.prevousKeypoints[o].z - a[o].z);
                                        r.push(c), i.push(l), this.debug.drawArrows && this.canvas_arrow(e, [s[o].x * t.width, s[o].y * t.height], [a[o].x * t.width, a[o].y * t.height])
                                } this.debug.drawArrows && e.stroke();
                        const n = r.reduce(((e, t) => e + t), 0) / r.length || 0,
                                u = i.reduce(((e, t) => e + t), 0) / i.length;
                        for (n < .007 && u != 1 / 0 && u < .007 || this.skipFrame > 0 ? (0 == this.skipFrame && this.skipFrame, this.pose_matrixes.pop()) : this.prevousKeypoints = a; this.keypoints.length > 2 && !this.kalman.switch;) this.keypoints.reverse().pop(), this.keypoints.reverse()
                }
        }
        distance(e, t) {
                return Math.sqrt((t[0] - e[0]) * (t[0] - e[0]) + (t[1] - e[1]) * (t[1] - e[1]) + (t[2] - e[2]) * (t[2] - e[2]))
        }
        onResults({
                multiFaceLandmarks: e,
                image: t
        }) {
                if (this.updateDimensionsIfRequired(t.width, t.height), e && this.geometryLibInit && e[0]) {
                        if (this.landmarks = new this.faceGeometryModule.vector$float$, this.customFilter.switch)
                                if (null == this.previousDetect) {
                                        this.previousDetect = e[0];
                                        for (var n = 0; n < 468; n++) this.landmarks.push_back(e[0][n].x), this.landmarks.push_back(e[0][n].y), this.landmarks.push_back(e[0][n].z)
                                } else {
                                        for (n = 0; n < 468; n++) Math.abs(e[0][n].x - this.previousDetect[n].x) < this.customFilter.cutoff && (e[0][n].x = this.previousDetect[n].x), Math.abs(e[0][n].y - this.previousDetect[n].y) < this.customFilter.cutoff && (e[0][n].y = this.previousDetect[n].y), Math.abs(e[0][n].z - this.previousDetect[n].z) < this.customFilter.cutoff && (e[0][n].z = this.previousDetect[n].z), this.landmarks.push_back(e[0][n].x), this.landmarks.push_back(e[0][n].y), this.landmarks.push_back(e[0][n].z);
                                        this.previousDetect = e[0]
                                }
                        else
                                for (n = 0; n < 468; n++) this.landmarks.push_back(e[0][n].x), this.landmarks.push_back(e[0][n].y), this.landmarks.push_back(e[0][n].z);
                        let t = [e[0][168].x, e[0][168].y, e[0][168].z],
                                i = (e[0][8].x, e[0][8].y, e[0][8].z, [e[0][4].x, e[0][4].y, e[0][4].z]),
                                a = [e[0][4].x, e[0][4].y, e[0][168].z],
                                s = this.distance(t, i);
                        this.distance(i, a), this.distance(a, t), this.noseLength = s * this.canvasHeight, this.debug.switch && this.debug.showBBox && (this.center_face_x = e[0][168].x * this.canvasWidth, this.center_face_y = e[0][168].y * this.canvasHeight, this.extreme_left_x = e[0][234].x * this.canvasWidth, this.extreme_left_y = e[0][234].y * this.canvasHeight, this.extreme_right_x = e[0][454].x * this.canvasWidth, this.extreme_right_y = e[0][454].y * this.canvasHeight, this.extreme_top_x = e[0][10].x * this.canvasWidth, this.extreme_top_y = e[0][10].y * this.canvasHeight, this.extreme_botom_x = e[0][152].x * this.canvasWidth, this.extreme_botom_y = e[0][152].y * this.canvasHeight, this.bounding_box_points.push({
                                center_face_x: this.center_face_x,
                                center_face_y: this.center_face_y,
                                extreme_left_x: this.extreme_left_x,
                                extreme_left_y: this.extreme_left_y,
                                extreme_right_x: this.extreme_right_x,
                                extreme_right_y: this.extreme_right_y,
                                extreme_top_x: this.extreme_top_x,
                                extreme_top_y: this.extreme_top_y,
                                extreme_botom_x: this.extreme_botom_x,
                                extreme_botom_y: this.extreme_botom_y
                        })), this.rotMat = this.faceGeometryModule.getPoseTransformationMatrix(this.pcfInstance, this.landmarks, this.oneEuro.switch ? 1 : 0), this.landmarks.delete(), this.pose_transform_mat = [
                                [this.rotMat.get(0), this.rotMat.get(1), this.rotMat.get(2), this.rotMat.get(3)],
                                [this.rotMat.get(4), this.rotMat.get(5), this.rotMat.get(6), this.rotMat.get(7)],
                                [this.rotMat.get(8), this.rotMat.get(9), this.rotMat.get(10), this.rotMat.get(11)],
                                [0, 0, 0, 1]
                        ], this.rotMat.delete();
                        let o = [],
                                c = [];
                        if (this.kalman.switch) {
                                if (console.time("kalman"), this.matricies.length > this.kalman.queuelength && (this.matricies.reverse().pop(), this.matricies.reverse()), this.matricies.length > 0 && (c = this.matricies[this.matricies.length - 1]), this.matricies.push(this.pose_transform_mat.flat().slice(0, 12)), c.length > 0) var r = this.matricies[this.matricies.length - 1].map((function(e, t) {
                                        return Math.sqrt((e - c[t]) * (e - c[t]))
                                }));
                                (null != r ? r.reduce(((e, t) => e + t), 0) : Number.POSITIVE_INFINITY) <= this.delta ? (o = this.kFilter.filterAll(this.matricies), o.reverse(), this.pose_transform_mat = [o[0].slice(0, 4), o[0].slice(4, 8), o[0].slice(8, 12), [0, 0, 0, 1]]) : (console.log("Skipping kalman filter for now ---------------------------\x3e"), this.matricies.length > 2 && (this.matricies = [])), console.timeEnd("kalman")
                        }
                        for (this.pose_matrixes.push(this.pose_transform_mat), this.keypoints.push(e[0]); this.keypoints.length > 3 && !this.kalman.switch;) this.keypoints.reverse().pop(), this.keypoints.reverse()
                }
                this.lastFrame = t, this.stats && this.stats.update()
        }
}
class yc extends ma {
        constructor() {
                super();
                const e = new xn;
                e.deleteAttribute("uv");
                const t = new Qa({
                                side: 1
                        }),
                        n = new Qa,
                        r = new zs(16777215, 5, 28, 2);
                r.position.set(.418, 16.199, .3), this.add(r);
                const i = new yn(e, t);
                i.position.set(-.757, 13.219, .717), i.scale.set(31.713, 28.305, 28.591), this.add(i);
                const a = new yn(e, n);
                a.position.set(-10.906, 2.009, 1.846), a.rotation.set(0, -.195, 0), a.scale.set(2.328, 7.905, 4.651), this.add(a);
                const s = new yn(e, n);
                s.position.set(-5.607, -.754, -.758), s.rotation.set(0, .994, 0), s.scale.set(1.97, 1.534, 3.955), this.add(s);
                const o = new yn(e, n);
                o.position.set(6.167, .857, 7.803), o.rotation.set(0, .561, 0), o.scale.set(3.927, 6.285, 3.687), this.add(o);
                const c = new yn(e, n);
                c.position.set(-2.017, .018, 6.124), c.rotation.set(0, .333, 0), c.scale.set(2.002, 4.566, 2.064), this.add(c);
                const l = new yn(e, n);
                l.position.set(2.291, -.756, -2.621), l.rotation.set(0, -.286, 0), l.scale.set(1.546, 1.552, 1.496), this.add(l);
                const u = new yn(e, n);
                u.position.set(-2.193, -.369, -5.547), u.rotation.set(0, .516, 0), u.scale.set(3.875, 3.487, 2.986), this.add(u);
                const h = new yn(e, bc(50));
                h.position.set(-16.116, 14.37, 8.208), h.scale.set(.1, 2.428, 2.739), this.add(h);
                const d = new yn(e, bc(50));
                d.position.set(-16.109, 18.021, -8.207), d.scale.set(.1, 2.425, 2.751), this.add(d);
                const p = new yn(e, bc(17));
                p.position.set(14.904, 12.198, -1.832), p.scale.set(.15, 4.265, 6.331), this.add(p);
                const f = new yn(e, bc(43));
                f.position.set(-.462, 8.89, 14.52), f.scale.set(4.38, 5.441, .088), this.add(f);
                const m = new yn(e, bc(20));
                m.position.set(3.235, 11.486, -12.541), m.scale.set(2.5, 2, .1), this.add(m);
                const g = new yn(e, bc(100));
                g.position.set(0, 20, 0), g.scale.set(1, .1, 1), this.add(g)
        }
        dispose() {
                const e = new Set;
                this.traverse((t => {
                        t.isMesh && (e.add(t.geometry), e.add(t.material))
                }));
                for (const t of e) t.dispose()
        }
}

function bc(e) {
        const t = new Ht;
        return t.color.setScalar(e), t
}
const xc = ["map", "aoMap", "emissiveMap", "metalnessMap", "normalMap", "roughnessMap", "specularIntensityMap"];

function wc(e) {
        e.traverse((e => {
                if (!e.isMesh) return;
                const t = Array.isArray(e.material) ? e.material : [e.material];
                for (const e of t) {
                        for (const t of xc) {
                                const n = e[t];
                                n && (n.source?.data?.close?.(), n.dispose())
                        }
                        e.dispose()
                }
                e.geometry.dispose()
        }))
}
const Ec = document.createElement("template");
Ec.innerHTML = '<style>:host{display:block;box-sizing:border-box;height:100%;width:100%}#root{position:relative;width:100%;height:100%}canvas#video{transform:scale(-1,1);z-index:0}canvas#glasses{position:absolute;top:0;left:0;z-index:1}canvas{display:block;width:100%;height:100%;box-sizing:border-box;border:none;object-fit:scale-down}video{display:none}</style> <div id="root"> <canvas part="canvas" id="glasses"></canvas> <canvas part="canvas" id="video"></canvas> <video muted autoplay playsinline></video> </div>', customElements.define("x-fibbl-glasses-vto", class extends HTMLElement {
        constructor() {
                super(), this.attachShadow({
                        mode: "open"
                }), this.shadowRoot.append(Ec.content.cloneNode(!0)), this.glassesCanvas = this.shadowRoot.querySelector("#glasses"), this.videoCanvas = this.shadowRoot.querySelector("#video"), this.video = this.shadowRoot.querySelector("video")
        }
        getGlassesCanvas() {
                return this.glassesCanvas
        }
        getVideoCanvas() {
                return this.videoCanvas
        }
        getVideo() {
                return this.video
        }
        setSize(e, t) {
                this.glassesCanvas.width = this.videoCanvas.width = e, this.glassesCanvas.height = this.videoCanvas.height = t
        }
});
const Mc = e => new URL(e, import.meta.url).toString(),
        Tc = "https://m.cdn.fibblar.com/",
        Sc = `${Tc}HDRI_for_glasses.hdr`,
        Ac = function() {
                let e = !1;
                var t;
                return t = navigator.userAgent || navigator.vendor || window.opera, (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(t) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(t.substr(0, 4))) && (e = !0), e
        }();
class Oc {
        static videoConstraints = Object.freeze({
                facingMode: "user"
        });
        useFrameFromMediaPipe = !0;
        frameCheckCount = 10;
        renderConfig = null;
        ambientLight = new Bs(16777215, 0);
        hdriUrl = null;
        envRenderTarget = null;
        constructor({
                container: e,
                onResize: t = null,
                videoStream: n = null,
                threeJsStats: r = null
        }) {
                this.canvasWidth = 300 * devicePixelRatio, this.canvasHeight = 300 * devicePixelRatio, this.element = document.createElement("x-fibbl-glasses-vto"), this.element.setSize(this.canvasWidth, this.canvasHeight), this.videoElement = this.element.getVideo(), this.glassModel = Mc("../glasses/temples_problem.glb"), this.faceOccluderObj = Mc("../obj/canonical_face_model.obj"), this.headOccluderObj = Mc("../obj/headOccluder.obj"), this.noseOccluderObj = Mc("../obj/nose.obj"), this.earOccluderObj = Mc("../obj/right_ear.obj"), this.adjustable_distances_Y = [2, 4], this.adjustemnts = {
                        relative_translation: [0, this.adjustable_distances_Y[0] / (this.adjustable_distances_Y[0] + this.adjustable_distances_Y[1]), 0]
                }, this.MANAGER = new vs, this.ambientIntensity = .3, this.ambientColor = 16777215, this.directIntensity = .8 * Math.PI, this.directColor = 16777215, this.addednormalVector = !1, this.addedGlasses = !1, this.addedHeadOccluder = !1, this.addedNoseOccluder = !1, this.addedEarOccluder = !1, this.calculatedDimensions = !1, this.glass = null, this.faceOccluder = null, this.headOccluder = null, this.noseOccluder = null, this.earOccluder = null, this.earRightOccluder = null, this.earLeftOccluder = null, this.scaleGlassX = -100, this.scaleGlassY = 100, this.scaleGlassZ = 100, this.start_glass_position_x = 0, this.start_glass_position_y = 2.232, this.start_glass_position_z = 5.349, this.glass_start_angel_degree_x = 0, this.glass_start_angel_rad_x = this.glass_start_angel_degree_x * Math.PI / 180, this.glass_start_angel_degree_y = 0, this.glass_start_angel_rad_y = this.glass_start_angel_degree_y * Math.PI / 180, this.glass_start_angel_degree_z = 0, this.glass_start_angel_rad_z = this.glass_start_angel_degree_z * Math.PI / 180, this.left_temple_scale_x = 1, this.left_temple_scale_y = 1, this.left_temple_scale_z = 1, this.left_temple_position_x = 0, this.left_temple_position_y = 0, this.left_temple_position_z = 0, this.left_temple_angel_degree_x = 0, this.left_temple_angel_rad_x = this.left_temple_angel_degree_x * Math.PI / 180, this.left_temple_angel_degree_y = -0, this.left_temple_angel_rad_y = this.left_temple_angel_degree_y * Math.PI / 180, this.left_temple_angel_degree_z = 0, this.left_temple_angel_rad_z = this.left_temple_angel_degree_z * Math.PI / 180, this.left_temple_name = "Temple_Left", this.left_temple_order = -1, this.right_temple_scale_x = 1, this.right_temple_scale_y = 1, this.right_temple_scale_z = 1, this.right_temple_position_x = 0, this.right_temple_position_y = 0, this.right_temple_position_z = 0, this.right_temple_angel_degree_x = 0, this.right_temple_angel_rad_x = this.right_temple_angel_degree_x * Math.PI / 180, this.right_temple_angel_degree_y = 0, this.right_temple_angel_rad_y = this.right_temple_angel_degree_y * Math.PI / 180, this.right_temple_angel_degree_z = 0, this.right_temple_angel_rad_z = this.right_temple_angel_degree_z * Math.PI / 180, this.right_temple_name = "Temple_Right", this.right_temple_order = -1, this.back_name = "", this.back_order = -1, this.back_visible = 1, this.glassMovementLimit = {
                        min_y: 0,
                        max_y: 6.3,
                        min_angle_x: -20,
                        max_angle_x: 20
                }, this.faceOccluderScaleX = 1, this.faceOccluderScaleY = 1, this.faceOccluderScaleZ = 1, this.faceOccluderDefaultPositionX = 0, this.faceOccluderDefaultPositionY = 0, this.faceOccluderDefaultPositionZ = 100, this.faceOccluderDefaultRotationX = 0 * Math.PI / 180, this.faceOccluderDefaultRotationY = 0 * Math.PI / 180, this.faceOccluderDefaultRotationZ = 0 * Math.PI / 180, this.headOccluderScaleX = 1.11, this.headOccluderScaleY = 1.08, this.headOccluderScaleZ = 1.11, this.headOccluderDefaultPositionX = 0, this.headOccluderDefaultPositionY = -2.814, this.headOccluderDefaultPositionZ = 6.934, this.head_occluder_angel_degree_x = 0, this.head_occluder_angel_rad_x = this.head_occluder_angel_degree_x * Math.PI / 180, this.head_occluder_angel_degree_y = 0, this.head_occluder_angel_rad_y = this.head_occluder_angel_degree_y * Math.PI / 180, this.head_occluder_angel_degree_z = 0, this.head_occluder_angel_rad_z = this.head_occluder_angel_degree_z * Math.PI / 180, this.noseOccluderScaleX = 87, this.noseOccluderScaleY = 100, this.noseOccluderScaleZ = 106, this.noseOccluderDefaultPositionX = -0, this.noseOccluderDefaultPositionY = -.2, this.noseOccluderDefaultPositionZ = -.8, this.nose_occluder_angel_degree_x = -6, this.nose_occluder_angel_rad_x = this.nose_occluder_angel_degree_x * Math.PI / 180, this.nose_occluder_angel_degree_y = 0, this.nose_occluder_angel_rad_y = this.nose_occluder_angel_degree_y * Math.PI / 180, this.nose_occluder_angel_degree_z = 0, this.nose_occluder_angel_rad_z = this.nose_occluder_angel_degree_z * Math.PI / 180, this.earScaleX = -6, this.earScaleY = 2, this.earScaleZ = 3, this.earRightScaleX = 6, this.earRightScaleY = 2, this.earRightScaleZ = 3, this.leftEarDefaultPositionX = -37.86, this.leftEarDefaultPositionY = -1.369, this.leftEarDefaultPositionZ = 32.1, this.rightEarDefaultPositionX = 37.86, this.rightEarDefaultPositionY = -1.369, this.rightEarDefaultPositionZ = 32.1, this.ear_angel_degree_x = -4, this.ear_angel_rad_x = this.ear_angel_degree_x * Math.PI / 180, this.ear_angel_degree_y = 0, this.ear_angel_rad_y = this.ear_angel_degree_y * Math.PI / 180, this.ear_angel_degree_z = 0, this.ear_angel_rad_z = this.ear_angel_degree_z * Math.PI / 180, this.ear_right_angel_degree_x = -4, this.ear_right_angel_rad_x = this.ear_right_angel_degree_x * Math.PI / 180, this.ear_right_angel_degree_y = 0, this.ear_right_angel_rad_y = this.ear_right_angel_degree_y * Math.PI / 180, this.ear_right_angel_degree_z = 0, this.ear_right_angel_rad_z = this.ear_right_angel_degree_z * Math.PI / 180, this.camera_x = 0, this.camera_y = 0, this.camera_z = 0, this.camera_fov = 50, this.camera_near = .1, this.camera_far = 1e3, this.controls = {
                        GlassesPositionX: this.start_glass_position_x,
                        GlassesPositionY: this.start_glass_position_y,
                        GlassesPositionZ: this.start_glass_position_z,
                        GlassesAngelX: this.glass_start_angel_rad_x,
                        Scale: this.scaleGlassX
                }, this.kalman = {
                        switch: !1,
                        queuelength: 19
                }, this.stats = r, this.container = e, this.oneEuroFilter = {
                        dirty: !1,
                        switch: !1,
                        frequency: 30,
                        min_cutoff: .001,
                        beta: 57,
                        derivate_cutoff: .2,
                        min_allowed_object_scale: 1e-6,
                        disable_value_scaling: !0
                }, this.opticalFlow = {
                        switch: !1,
                        switch2: !1
                }, this.customNose = {
                        switch: !0,
                        showColor: !1,
                        RotateX: -6,
                        PositionX: -0,
                        PositionY: -.2,
                        PositionZ: -.8
                }, this.customEar = {
                        switch: !0,
                        showColor: !1,
                        PositionZ: 32.1,
                        PositionY: -1.369,
                        PositionRightZ: 32.1,
                        PositionRightY: -1.369
                };
                var i = .002;
                Ac && (i = .006), this.CustomFilter = {
                        switch: !0,
                        cutoff: i
                }, this.setCanvasDimensions = this.setCanvasDimensions.bind(this), this.options = {
                        setCanvasDimensions: this.setCanvasDimensions,
                        videoStream: n,
                        onResize: t,
                        canvasWidth: this.canvasWidth,
                        canvasHeight: this.canvasHeight,
                        camera_fov: this.camera_fov,
                        camera_near: this.camera_near,
                        camera_far: this.camera_far,
                        facingMode: Oc.videoConstraints.facingMode,
                        videoElement: this.element.getVideo(),
                        kalman: this.kalman,
                        oneEuro: this.oneEuroFilter,
                        stats: this.stats,
                        customFilter: this.CustomFilter
                }, this.readyPromise = new Promise((e => {
                        this.faceDetector = new vc(this.options, e)
                })), this.scene = new ma, this.camera = new An(this.camera_fov, this.canvasWidth / this.canvasHeight, this.camera_near, this.camera_far), this.camera.position.x = this.camera_x, this.camera.position.y = this.camera_y, this.camera.position.z = this.camera_z, this.scene.add(this.camera), this.renderer = new fa({
                        antialias: !0,
                        alpha: !0,
                        canvas: this.element.getGlassesCanvas()
                }), this.renderer.toneMapping = 4, this.defaultToneMappingExposure = this.renderer.toneMappingExposure, this.encoding = D, this.renderer.physicallyCorrectLights = !0, this.renderer.outputEncoding = this.encoding, this.renderer.setSize(this.canvasWidth, this.canvasHeight, !1), this.dracoLoader = new ac(this.MANAGER), this.dracoLoader.setDecoderPath(new URL("three_libs/draco/gltf/", import.meta.url).toString()), this.loader = new eo(this.MANAGER), this.loader.setDRACOLoader(this.dracoLoader), (new Os).name = "hemi_light", new Bs(this.ambientColor, this.ambientIntensity).name = "ambient_light";
                const a = new js(this.directColor, this.directIntensity);
                a.position.set(.5, 0, .866), a.name = "main_light", this.renderScene = this.renderScene.bind(this), this._renderStarted = !1
        }
        waitUntilReady() {
                return this.readyPromise
        }
        _startRender() {
                this._renderStarted || (this._renderStarted = !0, this.requestAnimationId = requestAnimationFrame(this.renderScene))
        }
        async stop() {
                this.faceDetector.camera.stop(), this.faceDetector.camera = null, await this.faceDetector.faceMesh.close(), this.faceDetector.faceMesh = null, this.faceDetector.faceGeometryModule = null, this.faceDetector.lastFrame = null, this.faceDetector.pose_matrixes = [], this.faceDetector = null, window.cancelAnimationFrame(this.requestAnimationId), this._renderStarted = !1, wc(this.scene), this.faceOccluder = null, this.headOccluder = null, this.glasses = null, this.noseOccluder = null, this.earOccluder = null, this.earRightOccluder = null, this.earLeftOccluder = null, this.element.remove()
        }
        async start(e = this.glassModel, t = null) {
                this.glassModel = e, this.renderConfig = t, await this.loadModelAndOccluders(), this.container.append(this.element), this._startRender()
        }
        setCanvasDimensions(e, t) {
                this.canvasWidth === e && this.canvasHeight === t || (this.canvasWidth = e, this.canvasHeight = t, this.renderer.setSize(e, t, !1), this.element.setSize(e, t), this.camera.aspect = e / t, this.camera.updateProjectionMatrix())
        }
        set_control_values() {
                this.controls.GlassesPositionX = this.start_glass_position_x, this.controls.GlassesPositionY = this.start_glass_position_y, this.controls.GlassesPositionZ = this.start_glass_position_z, this.controls.GlassesAngelX = this.glass_start_angel_degree_x, this.controls.Scale = this.scaleGlassX < 0 ? -this.scaleGlassX : this.scaleGlassX
        }
        async getMetadata(e) {
                try {
                        const t = await fetch(e).then((e => e.json()));
                        return {
                                data: t
                        }
                } catch (e) {
                        console.error("VTO: cannot fetch metadata"), console.error(e)
                }
        }
        async loadModelAndOccluders() {
                return null != this.faceOccluder && (this.scene.remove(this.faceOccluder), this.faceOccluder = null, this.headOccluder = null, this.noseOccluder = null, this.earOccluder = null, this.earRightOccluder = null, this.earLeftOccluder = null, this.glass = null, this.addedGlasses = !1, this.addedHeadOccluder = !1, this.addedNoseOccluder = !1, this.addedEarOccluder = !1, this.calculatedDimensions = !1), this.set_control_values(), await Promise.all([this.loadObject(this.faceOccluderObj).then((e => this.setFaceOccluder(e))), this.loadObject(this.headOccluderObj).then((e => this.setHeadOccluder(e))), this.loadObject(this.noseOccluderObj).then((e => this.setNoseOccluder(e))), this.loadModel(this.glassModel).then((e => this.setModel(e))), this.loadObject(this.earOccluderObj).then((e => this.setEarOccluder(e))), this.applyRenderConfig()])
        }
        setGlassesAdjustmentY(e) {
                return this.setGlassesAdjustment({
                        relative_translation: [0, e, 0]
                })
        }
        getGlassesAdjustmentY() {
                return this.getGlassesAdjustment().relative_translation[1]
        }
        setGlassesAdjustment(e) {
                let t = e.relative_translation;
                for (var n = 0; n < t.length; n++)(t[n] < 0 || t[n] > 1) && (t[n] = Math.max(0, Math.min(1, t[n])));
                let r = this.adjustable_distances_Y[0] + this.adjustable_distances_Y[1],
                        i = t[1] * r;
                this.controls.GlassesPositionY = this.start_glass_position_y - this.adjustable_distances_Y[0] + i, this.adjustemnts = e
        }
        getGlassesAdjustment() {
                return this.adjustemnts
        }
        getGlassesAdjustmentWithSize() {
                return {
                        transformation: this.getGlassesAdjustment(),
                        sizes_px: [0, this.faceDetector.noseLength, 0]
                }
        }
        set_metadata(e) {
                var t = e.data;
                this.faceOccluderScaleX = t.face_occluder.scale_x, this.faceOccluderScaleY = t.face_occluder.scale_y, this.faceOccluderScaleZ = t.face_occluder.scale_z, this.faceOccluderDefaultPositionX = t.face_occluder.position_x, this.faceOccluderDefaultPositionY = t.face_occluder.position_y, this.faceOccluderDefaultPositionZ = t.face_occluder.position_z, this.faceOccluderDefaultRotationX = t.face_occluder.rotation_x * Math.PI / 180, this.faceOccluderDefaultRotationY = t.face_occluder.rotation_y * Math.PI / 180, this.faceOccluderDefaultRotationZ = t.face_occluder.rotation_z * Math.PI / 180, this.headOccluderScaleX = t.head_occluder.scale_x, this.headOccluderScaleY = t.head_occluder.scale_y, this.headOccluderScaleZ = t.head_occluder.scale_z, this.headOccluderDefaultPositionX = t.head_occluder.position_x, this.headOccluderDefaultPositionY = t.head_occluder.position_y, this.headOccluderDefaultPositionZ = t.head_occluder.position_z, this.head_occluder_angel_degree_x = t.head_occluder.rotation_x, this.head_occluder_angel_rad_x = this.head_occluder_angel_degree_x * Math.PI / 180, this.head_occluder_angel_degree_y = t.head_occluder.rotation_y, this.head_occluder_angel_rad_y = this.head_occluder_angel_degree_y * Math.PI / 180, this.head_occluder_angel_degree_z = t.head_occluder.rotation_z, this.head_occluder_angel_rad_z = this.head_occluder_angel_degree_z * Math.PI / 180, this.scaleGlassX = t.glasses.scale_x, this.scaleGlassY = t.glasses.scale_y, this.scaleGlassZ = t.glasses.scale_z, this.start_glass_position_x = t.glasses.position_x, this.start_glass_position_y = t.glasses.position_y, this.start_glass_position_z = t.glasses.position_z, this.glass_start_angel_degree_x = t.glasses.rotation_x, this.glass_start_angel_rad_x = this.glass_start_angel_degree_x * Math.PI / 180, this.glass_start_angel_degree_y = t.glasses.rotation_y, this.glass_start_angel_rad_y = this.glass_start_angel_degree_y * Math.PI / 180, this.glass_start_angel_degree_z = t.glasses.rotation_z, this.glass_start_angel_rad_z = this.glass_start_angel_degree_z * Math.PI / 180, this.left_temple_scale_x = t.glasses.left_temple.scale_x, this.left_temple_scale_y = t.glasses.left_temple.scale_y, this.left_temple_scale_z = t.glasses.left_temple.scale_z, this.left_temple_position_x = t.glasses.left_temple.position_x, this.left_temple_position_y = t.glasses.left_temple.position_y, this.left_temple_position_z = t.glasses.left_temple.position_z, this.left_temple_angel_degree_x = t.glasses.left_temple.rotation_x, this.left_temple_angel_rad_x = this.left_temple_angel_degree_x * Math.PI / 180, this.left_temple_angel_degree_y = t.glasses.left_temple.rotation_y, this.left_temple_angel_rad_y = this.left_temple_angel_degree_y * Math.PI / 180, this.left_temple_angel_degree_z = t.glasses.left_temple.rotation_z, this.left_temple_angel_rad_z = this.left_temple_angel_degree_z * Math.PI / 180, this.left_temple_name = t.glasses.left_temple.name, this.left_temple_order = t.glasses.left_temple.order, this.right_temple_scale_x = t.glasses.right_temple.scale_x, this.right_temple_scale_y = t.glasses.right_temple.scale_y, this.right_temple_scale_z = t.glasses.right_temple.scale_z, this.right_temple_position_x = t.glasses.right_temple.position_x, this.right_temple_position_y = t.glasses.right_temple.position_y, this.right_temple_position_z = t.glasses.right_temple.position_z, this.right_temple_angel_degree_x = t.glasses.right_temple.rotation_x, this.right_temple_angel_rad_x = this.right_temple_angel_degree_x * Math.PI / 180, this.right_temple_angel_degree_y = t.glasses.right_temple.rotation_y, this.right_temple_angel_rad_y = this.right_temple_angel_degree_y * Math.PI / 180, this.right_temple_angel_degree_z = t.glasses.right_temple.rotation_z, this.right_temple_angel_rad_z = this.right_temple_angel_degree_z * Math.PI / 180, this.right_temple_name = t.glasses.right_temple.name, this.right_temple_order = t.glasses.right_temple.order, this.back_name = t.glasses.back.name, this.back_order = t.glasses.back.order, this.back_visible = t.glasses.back.visible, this.controls.GlassesPositionX = this.start_glass_position_x, this.controls.GlassesPositionY = this.start_glass_position_y, this.controls.GlassesPositionZ = this.start_glass_position_z, this.controls.GlassesAngelX = this.glass_start_angel_rad_x, this.hdriPath = t.hdri_file
        }
        set_encoding(e) {
                "SRGB" == e && (this.renderer.outputEncoding = D), "Linear" == e && (this.renderer.outputEncoding = R), this.glass && this.updateTextureEncoding(this.glass)
        }
        loadObject(e) {
                return new Promise(((t, n) => {
                        (new nc).load(e, (e => {
                                t({
                                        obj: e
                                })
                        }), void 0, n)
                }))
        }
        setFaceOccluder(e) {
                var t = e.obj;
                this.faceOccluder = t, this.faceOccluder.children[0].material.colorWrite = !1, this.faceOccluder.position.set(this.faceOccluderDefaultPositionX, this.faceOccluderDefaultPositionY, this.faceOccluderDefaultPositionZ), this.faceOccluder.scale.set(this.faceOccluderScaleX, this.faceOccluderScaleY, this.faceOccluderScaleZ), this.faceOccluder.rotateX(this.faceOccluderDefaultRotationX), this.faceOccluder.rotateY(this.faceOccluderDefaultRotationY), this.faceOccluder.rotateZ(this.faceOccluderDefaultRotationZ), this.faceOccluder.renderOrder = -1, this.faceOccluder.name = "FaceOccluder", this.scene.add(this.faceOccluder), this.onCustomNoseChange()
        }
        setHeadOccluder(e) {
                var t = e.obj;
                this.headOccluder = t, this.headOccluder.children[0].material.colorWrite = !1, this.headOccluder.position.set(this.headOccluderDefaultPositionX, this.headOccluderDefaultPositionY, this.headOccluderDefaultPositionZ), this.headOccluder.scale.set(this.headOccluderScaleX, this.headOccluderScaleY, this.headOccluderScaleZ), this.headOccluder.rotateX(this.head_occluder_angel_rad_x), this.headOccluder.rotateY(this.head_occluder_angel_rad_y), this.headOccluder.rotateZ(this.head_occluder_angel_rad_z), this.headOccluder.name = "Head occluder", this.headOccluder.renderOrder = -1, this.scene.add(this.headOccluder)
        }
        setNoseOccluder(e) {
                var t = e.obj;
                this.noseOccluder = t, this.noseOccluder.children[0].material.colorWrite = !1, this.noseOccluder.children[0].material.color.set(255), this.noseOccluder.position.set(this.noseOccluderDefaultPositionX, this.noseOccluderDefaultPositionY, this.noseOccluderDefaultPositionZ), this.noseOccluder.scale.set(this.noseOccluderScaleX, this.noseOccluderScaleY, this.noseOccluderScaleZ), this.noseOccluder.rotateX(this.nose_occluder_angel_rad_x), this.noseOccluder.rotateY(this.nose_occluder_angel_rad_y), this.noseOccluder.rotateZ(this.nose_occluder_angel_rad_z), this.noseOccluder.renderOrder = 6, this.noseOccluder.name = "Nose occluder", this.scene.add(this.noseOccluder), this.onCustomNoseChange()
        }
        setEarOccluder(e) {
                var t = e.obj;
                this.earRightOccluder = t, this.earLeftOccluder = t.clone(), this.earLeftOccluder.position.set(this.leftEarDefaultPositionX, this.leftEarDefaultPositionY, this.leftEarDefaultPositionZ), this.earLeftOccluder.scale.set(this.earScaleX, this.earScaleY, this.earScaleZ), this.earLeftOccluder.rotateX(this.ear_angel_rad_x), this.earLeftOccluder.rotateY(this.ear_angel_rad_y), this.earLeftOccluder.rotateZ(this.ear_angel_rad_z), this.earRightOccluder.position.set(this.rightEarDefaultPositionX, this.rightEarDefaultPositionY, this.rightEarDefaultPositionZ), this.earRightOccluder.scale.set(this.earRightScaleX, this.earRightScaleY, this.earRightScaleZ), this.earRightOccluder.rotateX(this.ear_right_angel_rad_x), this.earRightOccluder.rotateY(this.ear_right_angel_rad_y), this.earRightOccluder.rotateZ(this.ear_right_angel_rad_z), this.earRightOccluder.children[0].material.colorWrite = !1, this.earLeftOccluder.children[0].material.colorWrite = !1, this.earRightOccluder.renderOrder = 6, this.earRightOccluder.name = "Right ear occluder", this.earLeftOccluder.renderOrder = 6, this.earLeftOccluder.name = "Left ear occluder", this.onCustomEarChange()
        }
        loadModel(e) {
                return new Promise(((t, n) => {
                        this.loader.load(e, (e => {
                                t({
                                        obj: e
                                })
                        }), void 0, n)
                }))
        }
        updateTextureEncoding(e) {
                this.traverseMaterials(e, (e => {
                        e.map && (e.map.encoding = this.encoding), e.emissiveMap && (e.emissiveMap.encoding = this.encoding), (e.map || e.emissiveMap) && (e.needsUpdate = !0)
                }))
        }
        traverseMaterials(e, t) {
                e.traverse((e => {
                        e.isMesh && (Array.isArray(e.material) ? e.material : [e.material]).forEach(t)
                }))
        }
        setModel(e) {
                if (null != this.glass) {
                        var t = this.scene.getObjectByName(this.glass.name);
                        this.scene.remove(t), this.glass = null
                }
                var n = e.obj;
                if (this.glass = n.scene || n.scenes[0], !this.glass) throw new Error("This model contains no scene, and cannot be viewed here. However, it may contain individual 3D resources.");
                this.glass.scale.set(this.scaleGlassX, this.scaleGlassY, this.scaleGlassZ), this.glass.position.set(this.start_glass_position_x, this.start_glass_position_y, this.start_glass_position_z), this.glass.rotateX(this.glass_start_angel_rad_x), this.glass.rotateY(this.glass_start_angel_rad_y), this.glass.rotateZ(this.glass_start_angel_rad_z);
                var r = null;
                "" != this.left_temple_name ? this.glass.getObjectByName(this.left_temple_name) : -1 != this.left_temple_order && this.glass.children[0].children[this.left_temple_order], "" != this.right_temple_name ? this.glass.getObjectByName(this.right_temple_name) : -1 != this.right_temple_order && this.glass.children[0].children[this.right_temple_order], "" != this.back_name ? r = this.glass.getObjectByName(this.back_name) : -1 != this.back_order && (r = this.glass.children[0].children[this.back_order]), null != r && (r.visible = this.back_visible), this.glass.name = "Glass", this.glass.renderOrder = 4, this.scene.add(this.glass), this.updateTextureEncoding(this.glass)
        }
        async loadHDRI(e = Sc) {
                try {
                        this.scene.environment = await this.getCubeMapTexture(e)
                } catch (e) {
                        console.error(e), await this.setRoomEnvironment()
                }
        }
        async applyRenderConfig() {
                let e = this.hdriUrl || Sc;
                this.renderConfig?.hdriFileName && (e = Tc + this.renderConfig.hdriFileName), await this.loadHDRI(e), null != this.renderConfig?.ambientLightIntensity ? (this.scene.add(this.ambientLight), this.ambientLight.intensity = this.renderConfig.ambientLightIntensity) : this.scene.remove(this.ambientLight), null != this.renderConfig?.toneMappingExposure ? this.renderer.toneMappingExposure = this.renderConfig.toneMappingExposure : this.renderer.toneMappingExposure = this.defaultToneMappingExposure
        }
        getCubeMapTexture(e = Sc) {
                return new Promise(((t, n) => {
                        (new rc).load(e, (e => {
                                let r;
                                try {
                                        this.envRenderTarget?.dispose(), r = new ar(this.renderer), this.envRenderTarget = r.fromEquirectangular(e), t(this.envRenderTarget.texture)
                                } catch (e) {
                                        n(e)
                                } finally {
                                        e.dispose(), r?.dispose()
                                }
                        }), void 0, n)
                }))
        }
        setRoomEnvironment() {
                this.envRenderTarget?.dispose();
                const e = new ar(this.renderer),
                        t = new yc;
                this.envRenderTarget = e.fromScene(t, .04), this.scene.environment = this.envRenderTarget.texture, e.dispose(), wc(t)
        }
        onFilterConfigUpdate() {
                this.faceDetector.onFilterConfigUpdate()
        }
        onOpticalFlowChange() {
                this.faceDetector.debug.switch = this.opticalFlow.switch, this.faceDetector.debug.optical_flow = this.opticalFlow.switch
        }
        onCustomNoseChange() {
                this.customNose.switch ? (this.faceOccluder, null != this.noseOccluder && (this.noseOccluder.renderOrder = 2, this.customNose.showColor ? this.noseOccluder.children[0].material.colorWrite = !0 : this.noseOccluder.children[0].material.colorWrite = !1)) : (null != this.noseOccluder && (this.noseOccluder.renderOrder = 6, this.noseOccluder.children[0].material.colorWrite = !1), this.faceOccluder)
        }
        onCustomEarChange() {
                this.customEar.switch ? null != this.earRightOccluder && (this.earRightOccluder.renderOrder = -1, this.earLeftOccluder.renderOrder = -1, this.customEar.showColor ? (this.earRightOccluder.children[0].material.colorWrite = !0, this.earLeftOccluder.children[0].material.colorWrite = !0) : (this.earRightOccluder.children[0].material.colorWrite = !1, this.earLeftOccluder.children[0].material.colorWrite = !1)) : null != this.earRightOccluder && (this.earRightOccluder.renderOrder = 6, this.earRightOccluder.children[0].material.colorWrite = !1, this.earLeftOccluder.renderOrder = 6, this.earLeftOccluder.children[0].material.colorWrite = !1)
        }
        moveGlassUpDown(e) {
                if (null != this.glass && null != this.glass) {
                        if (this.controls.GlassesPositionY < this.start_glass_position_y) {
                                let e = this.controls.GlassesPositionY - this.start_glass_position_y;
                                this.controls.GlassesPositionZ = this.start_glass_position_z - .9 * e
                        } else {
                                let e = this.controls.GlassesPositionY - this.start_glass_position_y;
                                this.controls.GlassesPositionZ = e < .7 ? this.start_glass_position_z + 1 * e / .7 * .8 : this.start_glass_position_z + .9
                        }
                        var t = 0;
                        t = (t = e > this.start_glass_position_y ? (e - this.start_glass_position_y) * (this.glassMovementLimit.min_angle_x - this.glass_start_angel_degree_x) / (this.glassMovementLimit.max_y - this.start_glass_position_y) : e < this.start_glass_position_y ? (this.start_glass_position_y - e) * (this.glassMovementLimit.max_angle_x - this.glass_start_angel_degree_x) / (this.glassMovementLimit.max_y - this.start_glass_position_y) : this.glass_start_angel_degree_x) * Math.PI / 180, this.glass.position.y = e, this.glass.rotation.x = t, this.glass.position.z = this.controls.GlassesPositionZ
                }
        }
        applyVideoFallbackIfRequired(e) {
                this.frameCheckCount--, e.getImageData(0, 0, 1, 1).data[3] || (console.warn("Fibbl Glasses VTO: frame wasn't rendered; switched to the video element as a fallback."), e.drawImage(this.videoElement, 0, 0, e.canvas.width, e.canvas.height), this.useFrameFromMediaPipe = !1, this.frameCheckCount = 0)
        }
        renderScene() {
                this.addedGlasses || null != this.glass && null != this.faceOccluder && (this.faceOccluder.add(this.glass), this.addedGlasses = !0), this.addedHeadOccluder || null != this.headOccluder && null != this.faceOccluder && (this.faceOccluder.add(this.headOccluder), this.addedHeadOccluder = !0), this.addedNoseOccluder || null != this.noseOccluder && null != this.faceOccluder && (this.faceOccluder.add(this.noseOccluder), this.addedNoseOccluder = !0), this.addedEarOccluder || null != this.earRightOccluder && null != this.earLeftOccluder && null != this.faceOccluder && (this.faceOccluder.add(this.earRightOccluder), this.faceOccluder.add(this.earLeftOccluder), this.addedEarOccluder = !0);
                let e = null;
                const t = this.element.getVideoCanvas(),
                        n = t.getContext("2d");
                if (this.faceDetector.lastFrame && (e = this.faceDetector.lastFrame, this.faceDetector.lastFrame = null, this.useFrameFromMediaPipe ? n.drawImage(e, 0, 0, t.width, t.height) : n.drawImage(this.videoElement, 0, 0, n.canvas.width, n.canvas.height), this.frameCheckCount && this.applyVideoFallbackIfRequired(n)), this.faceDetector.debug.switch && this.faceDetector.optical_flow(n, t, e), this.glass) {
                        if (!this.calculatedDimensions) {
                                var r = this.calculateTemplesAngle(),
                                        i = null,
                                        a = null;
                                "" != this.right_temple_name ? i = this.glass.getObjectByName(this.right_temple_name) : -1 != this.right_temple_order && (i = this.glass.children[0].children[this.right_temple_order]), void 0 !== i && i.rotateY(r), "" != this.left_temple_name ? a = this.glass.getObjectByName(this.left_temple_name) : -1 != this.left_temple_order && (a = this.glass.children[0].children[this.left_temple_order]), void 0 !== a && (a.rotation.y = -r)
                        }
                        if (this.moveGlassUpDown(this.controls.GlassesPositionY), this.noseOccluder.position.x = this.customNose.PositionX, this.noseOccluder.position.y = this.customNose.PositionY, this.noseOccluder.position.z = this.customNose.PositionZ, this.noseOccluder.rotation.x = this.customNose.RotateX * Math.PI / 180, this.earRightOccluder.position.y = this.customEar.PositionRightY, this.earLeftOccluder.position.y = this.customEar.PositionY, this.earRightOccluder.position.z = this.customEar.PositionRightZ, this.earLeftOccluder.position.z = this.customEar.PositionZ, this.faceDetector.pose_matrixes.length) {
                                let e = this.faceDetector.pose_matrixes.pop(),
                                        t = new tt;
                                t.set(-e[0][0], -e[0][1], -e[0][2], -e[0][3], e[1][0], e[1][1], e[1][2], e[1][3], e[2][0], e[2][1], e[2][2], e[2][3], e[3][0], e[3][1], e[3][2], e[3][3]);
                                var s = new Me,
                                        o = new Ee,
                                        c = new Me;
                                t.decompose(s, o, c), this.faceOccluder.scale.x = c.x, this.faceOccluder.scale.y = c.y, this.faceOccluder.scale.z = c.z, this.faceOccluder.position.x = s.x, this.faceOccluder.position.y = s.y, this.faceOccluder.position.z = s.z, this.faceOccluder.quaternion.set(o.x, o.y, o.z, o.w);
                                var l = this.scaleGlassX / c.x,
                                        u = this.scaleGlassY / c.y,
                                        h = this.scaleGlassZ / c.z;
                                this.glass.scale.set(l, u, h)
                        }
                } else 0 != this.faceDetector.pose_matrixes.length && this.faceDetector.pose_matrixes.pop();
                this.requestAnimationId = requestAnimationFrame(this.renderScene), this.renderer.render(this.scene, this.camera)
        }
        calculateTemplesAngle() {
                var e = (new Ae).setFromObject(this.headOccluder),
                        t = e.max.x - e.min.x,
                        n = new Me;
                e.getCenter(n), e.max.x;
                var r = e.min.x,
                        i = (new Ae).setFromObject(this.glass),
                        a = i.max.x - i.min.x,
                        s = new Me;
                i.getCenter(s), i.max.x;
                var o = i.min.x,
                        c = 0,
                        l = 0,
                        u = c * Math.PI / 180,
                        h = null,
                        d = t - a,
                        p = .2;
                for (d > 6 ? p = -.8 : d > 5 ? p = -.6 : d > 4.3 ? p = -.3 : d > 4.1 && (p = -.1); !(o < r + p) && ("" != this.left_temple_name ? h = this.glass.getObjectByName(this.left_temple_name) : -1 != this.left_temple_order && (h = this.glass.children[0].children[this.left_temple_order]), void 0 !== h);) l = c, u = (c += 1) * Math.PI / 180, h.rotation.y = -u, o = (i = (new Ae).setFromObject(this.glass, !1)).min.x;
                return this.calculatedDimensions = !0, l * Math.PI / 180
        }
}
})();
var i = r.Z;
export {
        i as
        default
};