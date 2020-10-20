window.onload = function() {
    
if (document.domain != "charpstar.se"){
checkForARSupport();
checkForiOSSupport();
}
    
}

const openIOSARQuickLook = (() => {
    const anchor = document.createElement('a');
    anchor.setAttribute('rel', 'ar');
    anchor.appendChild(document.createElement('img'));
    anchor.setAttribute("id", "charpstar");
       return (usdzSrc) => {
        anchor.setAttribute('href', usdzSrc);
        anchor.click();
       };
})();

const openSceneViewer = (() => {
    const anchor = document.createElement('a');
    const noArViewerSigil = '#model-viewer-no-ar-fallback';
    let fallbackInvoked = false;
    return (gltfSrc, title, arScale) => {
        // If the fallback has ever been invoked this session, bounce early:
        if (fallbackInvoked) {
            return;
        }
        
        const location = self.location.toString();
        const locationUrl = new URL(location);
        const modelUrl = new URL(gltfSrc, location);
        const scheme = modelUrl.protocol.replace(':', '');
        locationUrl.hash = noArViewerSigil;
        let intentParams = `?file=${encodeURIComponent(modelUrl.toString())}&mode=3d_preferred&link=${location}&title=${encodeURIComponent(document.title)}`;
        if (arScale === 'fixed') {
            intentParams += `&resizable=false`;
        }
        const intent = `intent://arvr.google.com/scene-viewer/1.0${intentParams}#Intent;scheme=${scheme};package=com.google.android.googlequicksearchbox;action=android.intent.action.VIEW;S.browser_fallback_url=https://developers.google.com/ar;end;`;
        const undoHashChange = () => {
            if (self.location.hash === noArViewerSigil && !fallbackInvoked) {
                fallbackInvoked = true;
                self.history.back();
            }
        };
        self.addEventListener('hashchange', undoHashChange, { once: true });
        anchor.setAttribute('href', intent);
        anchor.click();
    };
})();


function activateAR(e) {
     var userAgent = navigator.userAgent || navigator.vendor || window.opera;
     if (/android/i.test(userAgent)) {
          openSceneViewer(e.getAttribute("data-androidSrc"));
    }
    else if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
     openIOSARQuickLook(e.getAttribute("data-iosSrc"));
    }
}

function checkForiOSSupport() {
	var userAgent = navigator.userAgent || navigator.vendor || window.opera;
	// check for AR support
	const a = document.createElement('a'),
		  supportsAR = a.relList.supports('ar') ? true : false;
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream &&  !supportsAR) {
          var x = document.getElementsByClassName("charpstarARViewer");
        var i;
         for (i = 0; i < x.length; i++) {
         x[i].style.display = "none";
  }
        
    }
    
}

function checkForARSupport() {

 var isMobile = {
            Android: function () {
                return navigator.userAgent.match(/Android/i);
            },
            iOS: function () {
                return navigator.userAgent.match(/iPhone/i) ;
            },
            iPad: function(){
                return (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
            },
            any: function () {
                return (isMobile.Android() ||  isMobile.iOS() || isMobile.iPad());
            }
         
        };
if (!isMobile.any()) {
   var x = document.getElementsByClassName("charpstarARViewer");
        var i;
         for (i = 0; i < x.length; i++) {
         x[i].style.display = "none";
}
}
else {
      var x = document.getElementsByClassName("charpstarARViewer");
        var i;
         for (i = 0; i < x.length; i++) {
         x[i].style.display = "inline-block";
}
}

}
 