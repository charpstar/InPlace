EaseIn  = function(power){return function(t){return Math.pow(t, power)}};
EaseOut = function(power){return function(t){return 1 - Math.abs(Math.pow(t-1, power))}};
EaseInOut = function(power){return function(t){return t<0.5 ? EaseIn(power)(t*2)/2 : EaseOut(power)(t*2 - 1)/2+0.5}};
  var maxOrbitRadius = 9;
  var minOrbitRadius = 4;
  var currentOrbitRadius = 6;
  var isSafari = window.safari !== undefined;
  var isIE = /MSIE|Trident/.test(window.navigator.userAgent);
  
document.addEventListener('DOMContentLoaded', function() {
if (document.documentElement.lang == 'sv'){
  document.getElementsByClassName('inplace-model-viewer__zoom-in-btn')[0].setAttribute("data-tooltip", "Zooma in"); 
   document.getElementsByClassName('inplace-model-viewer__zoom-out-btn')[0].setAttribute("data-tooltip", "Zooma ut"); 
    document.getElementsByClassName('inplace-model-viewer__fullscreen-btn')[0].setAttribute("data-tooltip", "Helskärmsläge/Avsluta helskärmsläge"); 
     document.getElementsByClassName('inplace-model-viewer__exitViewer-btn')[0].setAttribute("data-tooltip", "Stäng 3D Vy"); 
}
});


var inplace3DViewer = function (element) {
  this.modelViewer = element;
  this.loaded = false;
  this.interacted = false;
  this.introAnimation = {
    targetOrbit: {
      theta: 45,
      phi: 70,
      radius: 2.96
    },
    duration: 1200,
    easing: EaseInOut(3)
  };
  
  if (this.modelViewer.getAttribute("target-orbit")) {
    var target = this.modelViewer.getAttribute("target-orbit").split(" ");
    this.introAnimation.targetOrbit.theta = target[0];
    this.introAnimation.targetOrbit.phi = target[1];
    this.introAnimation.targetOrbit.radius = target[2];
  }
  this.introAnimation.targetOrbit;
  this.modelViewer.cameraOrbit = this.modelViewer.getAttribute("start-orbit") || "90deg 90deg 243";
  

  this.element = this.wrapModelViewer();
  this.controlArea = this.element.getElementsByClassName("inplace-model-viewer__control-area")[0];
  this.zoomInButton = this.element.getElementsByClassName("inplace-model-viewer__zoom-in-btn")[0];
  this.zoomOutButton = this.element.getElementsByClassName("inplace-model-viewer__zoom-out-btn")[0];
  this.fullscreenButton = this.element.getElementsByClassName("inplace-model-viewer__fullscreen-btn")[0];
  this.exitViewerButton = this.element.getElementsByClassName("inplace-model-viewer__exitViewer-btn")[0];
  
  this.element.classList.add("inplace-model-viewer--" + this.getDeviceType());
  
  
  if (isSafari) {
     this.fullscreenButton.style.display = "none";
  }


  var _self = this;
  this.modelViewer.addEventListener("load", function() {
    _self.loaded = true;
    _self.addEventHandlers();
    
    _self.element.classList.add("inplace-model-viewer--loaded");

    setTimeout(function() {
      _self.animateIn();
    }, 500);
  });
};

inplace3DViewer.prototype.wrapModelViewer = function() {
  var container = document.getElementById('model-viewer-container-template').content.cloneNode(true);
  var parent = this.modelViewer.parentNode;
  parent.insertBefore(container, this.modelViewer);

  var containerDiv = parent.getElementsByClassName("inplace-model-viewer")[0];

  containerDiv.appendChild(this.modelViewer);
  return containerDiv;
};

inplace3DViewer.init = function (querySelector) {
  var modelViewers = document.querySelectorAll(querySelector);
  var inplaceViewers = [];
  
  for (var i = 0; i < modelViewers.length; i++) {
    inplaceViewers.push(new inplace3DViewer(modelViewers[i]));
  }
  return inplaceViewers;
};

inplace3DViewer.prototype.addEventHandlers = function() {
  var _self = this;
  
  _self.zoomInButton.addEventListener("click", function() {
     _self.zoom(-0.5);
  });
  
  _self.zoomOutButton.addEventListener("click", function() {
    _self.zoom(0.5);
  });
  
  _self.fullscreenButton.addEventListener("click", function() {
    _self.toggleFullscreen();
    _self.modelViewer.focus();
  });
  

  
  if (this.exitViewerButton) {
 _self.exitViewerButton.addEventListener("click", function() {
       _self.togglePosterOn();
       if (_self.modelViewer.isPosterActive === true){
            _self.controlArea.style.display = "none";

             if (_self.isFullscreen()){
                     _self.toggleFullscreen();
                    _self.modelViewer.focus();
             }
       }
       /*else {
             _self.element.classList.remove("exitViewer");
             _self.zoomInButton.style.display = "block";
            _self.zoomOutButton.style.display = "block";
              if (!isSafari) {
             _self.fullscreenButton.style.display = "flex";
           }
       }*/
  });
   _self.modelViewer.addEventListener("click", function() {     
       if (_self.controlArea.style.display == "none") {
                _self.togglePosterOff();
                _self.controlArea.style.display = "block";
       }
         
     });
  }
  
  // This can be removed once we get an event for "interacted"
  _self.modelViewer.addEventListener("mousedown", function() {
    _self.interacted = true;
    _self.element.classList.add("inplace-model-viewer--interacting");
  });
  
  document.addEventListener("mouseup", function() {
    _self.element.classList.remove("inplace-model-viewer--interacting");
  });
  
  _self.modelViewer.addEventListener("wheel", function(event){ 
       if (_self.modelViewer.isPosterActive === false){
      if (event.deltaY < 0)
         {
       _self.zoom(-0.5);
     }
    else if (event.deltaY > 0)
    {
      _self.zoom(0.5);
     }
       }
       else {}
  });
  
    ["fullscreenchange", "mozfullscreenchange", "webkitfullscreenchange"].forEach(function(event) {
    document.addEventListener(event, function () {
      if (_self.isFullscreen()) {
        _self.element.classList.add("fullscreen");
      } else {
        _self.element.classList.remove("fullscreen");
      }
  	}, false);
  });
};

inplace3DViewer.prototype.getDeviceType = function() {
  return window.mobileAndTabletcheck() ? "mobile" : "desktop";
}

inplace3DViewer.prototype.zoom = function(amount) {
  this.interacted = true;
  var orbit = this.modelViewer.getCameraOrbit();
     orbit.radius += amount;
     this.modelViewer.cameraOrbit = orbit.theta + "rad " + orbit.phi + "rad " + orbit.radius + "m";
     this.modelViewer.focus();
}

inplace3DViewer.prototype.togglePosterOn = function() {
       this.modelViewer.reactivatePoster();
}

inplace3DViewer.prototype.togglePosterOff = function() {
          this.modelViewer.dismissPoster();
}
inplace3DViewer.prototype.isFullscreen = function() {
  return document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement;
}

inplace3DViewer.prototype.toggleFullscreen = function() {
  if (!this.isFullscreen()) {  // current working methods
    if (this.element.requestFullscreen) {
      this.element.requestFullscreen();
    } else if (this.element.mozRequestFullScreen) {
      this.element.mozRequestFullScreen();
    } else if (this.element.webkitRequestFullscreen) {
      this.element.webkitRequestFullscreen();
    }
  } else {
    if (document.cancelFullScreen) {
      document.cancelFullScreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitCancelFullScreen) {
      document.webkitCancelFullScreen();
    }
  }
}

inplace3DViewer.prototype.displayShortcut = function() {
}
inplace3DViewer.prototype.animateIn = function() {
  var startOrbit = this.modelViewer.getCameraOrbit();
  startOrbit.theta = startOrbit.theta * 180 / Math.PI;
  startOrbit.phi = startOrbit.phi * 180 / Math.PI;
  
  var currentFrameTime = Date.now();
  var lastFrameTime = currentFrameTime;
  var delta = 0;
  var elapsedTime = 0;
  var currentOrbit = { theta: 0, phi: 0, radius: 0 };
  var t = 0;

  var _self = this;
  var _animateIn = function() {
    if (_self.interacted) {
      return;
    }

    currentFrameTime = Date.now();
    delta = currentFrameTime - lastFrameTime;
    lastFrameTime = currentFrameTime;

    elapsedTime += delta;
    

    t = _self.introAnimation.easing(Math.min(elapsedTime / _self.introAnimation.duration, 1));

    currentOrbit.theta = (startOrbit.theta + (_self.introAnimation.targetOrbit.theta - startOrbit.theta) * t);
    currentOrbit.phi = (startOrbit.phi + (_self.introAnimation.targetOrbit.phi - startOrbit.phi) * t);
    currentOrbit.radius = startOrbit.radius + (_self.introAnimation.targetOrbit.radius - startOrbit.radius) * t;
    _self.modelViewer.cameraOrbit = currentOrbit.theta + "deg " + currentOrbit.phi + "deg " + currentOrbit.radius;
    _self.modelViewer.jumpCameraToGoal();

    if (elapsedTime < _self.introAnimation.duration) {
      requestAnimationFrame(_animateIn);
    }
  }
  requestAnimationFrame(_animateIn);
}


document.addEventListener("DOMContentLoaded", function(event) { 
  inplace3DViewer.init('model-viewer');
  
  $(function() {
    $(".media-wrapper").on("mediaVisible", function() {
      var modelviewer = $(this).find("model-viewer")[0];
      if (modelviewer) {
        $(modelviewer).attr('reveal', 'auto');
      }
    });
  });
});

 window.mobileAndTabletcheck = function() {
  var check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
  return check;
};
