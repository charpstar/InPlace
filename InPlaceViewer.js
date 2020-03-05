EaseIn=function(e){return function(t){return Math.pow(t,e)}},EaseOut=function(e){return function(t){return 1-Math.abs(Math.pow(t-1,e))}},EaseInOut=function(e){return function(t){return t<.5?EaseIn(e)(2*t)/2:EaseOut(e)(2*t-1)/2+.5}};var maxOrbitRadius=9,minOrbitRadius=4,currentOrbitRadius=6,isSafari=void 0!==window.safari,isIE=/MSIE|Trident/.test(window.navigator.userAgent),isMobile={Android:function(){return navigator.userAgent.match(/Android/i)},BlackBerry:function(){return navigator.userAgent.match(/BlackBerry/i)},iOS:function(){return navigator.userAgent.match(/iPhone|iPad|iPod/i)},Opera:function(){return navigator.userAgent.match(/Opera Mini/i)},Windows:function(){return navigator.userAgent.match(/IEMobile/i)||navigator.userAgent.match(/WPDesktop/i)},any:function(){return isMobile.Android()||isMobile.BlackBerry()||isMobile.iOS()||isMobile.Opera()||isMobile.Windows()}};isMobile.any()?document.getElementById("3d-Viewer")&&document.getElementById("3d-Viewer").remove():document.getElementById("inplace-viewer")&&document.getElementById("inplace-viewer").remove(),window.addEventListener("load",function(){"sv"==document.documentElement.lang?(document.getElementsByClassName("inplace-model-viewer__zoom-in-btn")[0].setAttribute("data-tooltip","Zooma in"),document.getElementsByClassName("inplace-model-viewer__zoom-out-btn")[0].setAttribute("data-tooltip","Zooma ut"),document.getElementsByClassName("inplace-model-viewer__fullscreen-btn")[0].setAttribute("data-tooltip","Helskärmsläge/Avsluta helskärmsläge"),document.getElementsByClassName("inplace-model-viewer__exitViewer-btn")[0].setAttribute("data-tooltip","Stäng 3D Vy")):document.documentElement.lang});var inplace3DViewer=function(e){if(this.modelViewer=e,this.loaded=!1,this.interacted=!1,this.introAnimation={targetOrbit:{theta:45,phi:70,radius:2.96},duration:1200,easing:EaseInOut(3)},this.modelViewer.getAttribute("target-orbit")){var t=this.modelViewer.getAttribute("target-orbit").split(" ");this.introAnimation.targetOrbit.theta=t[0],this.introAnimation.targetOrbit.phi=t[1],this.introAnimation.targetOrbit.radius=t[2]}this.introAnimation.targetOrbit,this.modelViewer.cameraOrbit=this.modelViewer.getAttribute("start-orbit")||"90deg 90deg 243",this.element=this.wrapModelViewer(),this.controlArea=this.element.getElementsByClassName("inplace-model-viewer__control-area")[0],this.zoomInButton=this.element.getElementsByClassName("inplace-model-viewer__zoom-in-btn")[0],this.zoomOutButton=this.element.getElementsByClassName("inplace-model-viewer__zoom-out-btn")[0],this.fullscreenButton=this.element.getElementsByClassName("inplace-model-viewer__fullscreen-btn")[0],this.exitViewerButton=this.element.getElementsByClassName("inplace-model-viewer__exitViewer-btn")[0],this.element.classList.add("inplace-model-viewer--"+this.getDeviceType()),isSafari&&(this.fullscreenButton.style.display="none");var i=this;this.modelViewer.addEventListener("load",function(){i.loaded=!0,i.addEventHandlers(),i.element.classList.add("inplace-model-viewer--loaded"),setTimeout(function(){i.animateIn()},500)})};inplace3DViewer.prototype.wrapModelViewer=function(){var e=document.getElementById("model-viewer-container-template").content.cloneNode(!0),t=this.modelViewer.parentNode;t.insertBefore(e,this.modelViewer);var i=t.getElementsByClassName("inplace-model-viewer")[0];return i.appendChild(this.modelViewer),i},inplace3DViewer.init=function(e){for(var t=document.querySelectorAll(e),i=[],n=0;n<t.length;n++)i.push(new inplace3DViewer(t[n]));return i},inplace3DViewer.prototype.addEventHandlers=function(){var e=this;e.zoomInButton.addEventListener("click",function(){e.zoom(-.5)}),e.zoomOutButton.addEventListener("click",function(){e.zoom(.5)}),e.fullscreenButton.addEventListener("click",function(){e.toggleFullscreen(),e.modelViewer.focus()}),this.exitViewerButton&&(e.exitViewerButton.addEventListener("click",function(){e.togglePosterOn(),!0===e.modelViewer.isPosterActive&&(e.controlArea.style.display="none",e.isFullscreen()&&(e.toggleFullscreen(),e.modelViewer.focus()))}),e.modelViewer.addEventListener("click",function(){"none"==e.controlArea.style.display&&(e.togglePosterOff(),e.controlArea.style.display="block")})),e.modelViewer.addEventListener("mousedown",function(){e.interacted=!0,e.element.classList.add("inplace-model-viewer--interacting")}),document.addEventListener("mouseup",function(){e.element.classList.remove("inplace-model-viewer--interacting")}),e.modelViewer.addEventListener("wheel",function(t){!1===e.modelViewer.isPosterActive&&(t.deltaY<0?e.zoom(-.5):t.deltaY>0&&e.zoom(.5))}),["fullscreenchange","mozfullscreenchange","webkitfullscreenchange"].forEach(function(t){document.addEventListener(t,function(){e.isFullscreen()?e.element.classList.add("fullscreen"):e.element.classList.remove("fullscreen")},!1)})},inplace3DViewer.prototype.getDeviceType=function(){return window.mobileAndTabletcheck()?"mobile":"desktop"},inplace3DViewer.prototype.zoom=function(e){this.interacted=!0;var t=this.modelViewer.getCameraOrbit();t.radius+=e,this.modelViewer.cameraOrbit=t.theta+"rad "+t.phi+"rad "+t.radius+"m",this.modelViewer.focus()},inplace3DViewer.prototype.togglePosterOn=function(){this.modelViewer.reactivatePoster()},inplace3DViewer.prototype.togglePosterOff=function(){this.modelViewer.dismissPoster()},inplace3DViewer.prototype.isFullscreen=function(){return document.fullscreenElement||document.mozFullScreenElement||document.webkitFullscreenElement},inplace3DViewer.prototype.toggleFullscreen=function(){this.isFullscreen()?document.cancelFullScreen?document.cancelFullScreen():document.mozCancelFullScreen?document.mozCancelFullScreen():document.webkitCancelFullScreen&&document.webkitCancelFullScreen():this.element.requestFullscreen?this.element.requestFullscreen():this.element.mozRequestFullScreen?this.element.mozRequestFullScreen():this.element.webkitRequestFullscreen&&this.element.webkitRequestFullscreen()},inplace3DViewer.prototype.displayShortcut=function(){},inplace3DViewer.prototype.animateIn=function(){var e=this.modelViewer.getCameraOrbit();e.theta=180*e.theta/Math.PI,e.phi=180*e.phi/Math.PI;var t=Date.now(),i=t,n=0,o=0,r={theta:0,phi:0,radius:0},a=0,l=this,s=function(){l.interacted||(t=Date.now(),n=t-i,i=t,o+=n,a=l.introAnimation.easing(Math.min(o/l.introAnimation.duration,1)),r.theta=e.theta+(l.introAnimation.targetOrbit.theta-e.theta)*a,r.phi=e.phi+(l.introAnimation.targetOrbit.phi-e.phi)*a,r.radius=e.radius+(l.introAnimation.targetOrbit.radius-e.radius)*a,l.modelViewer.cameraOrbit=r.theta+"deg "+r.phi+"deg "+r.radius,l.modelViewer.jumpCameraToGoal(),o<l.introAnimation.duration&&requestAnimationFrame(s))};requestAnimationFrame(s)},document.addEventListener("DOMContentLoaded",function(e){inplace3DViewer.init("model-viewer"),$(function(){$(".media-wrapper").on("mediaVisible",function(){var e=$(this).find("model-viewer")[0];e&&$(e).attr("reveal","auto")})})}),window.mobileAndTabletcheck=function(){var e,t=!1;return e=navigator.userAgent||navigator.vendor||window.opera,(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(e)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(e.substr(0,4)))&&(t=!0),t};