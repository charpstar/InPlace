window.onload = function() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const ARClass = urlParams.get('ARClass');
    if (ARClass !== null) {
        activateAR(document.getElementsByClassName(ARClass)[0]);
    }
    
    checkForARSupport();
    
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
        self.addEventListener('hashchange', undoHashChange, {
            once: true
        });
        anchor.setAttribute('href', intent);
        anchor.click();
    };
})();

function activateAR(e) {
    var userAgent = navigator.userAgent || navigator.vendor || window.opera;
    if (/android/i.test(userAgent)) {
        openSceneViewer(e.getAttribute("data-androidSrc"));
    } else if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        openIOSARQuickLook(e.getAttribute("data-iosSrc"));
    } else {
     //QR Code Toggle on Desktops
        toggleModal();
    }
}

function checkForiOSSupport() {
    var userAgent = navigator.userAgent || navigator.vendor || window.opera;
    // check for AR support
    const a = document.createElement('a'),
        supportsAR = a.relList.supports('ar') ? true : false;
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream && !supportsAR) {
        hideARButton();
    }
}

function checkForAndroidSupport() {
    var a = navigator.userAgent;
    if (!(a.match(/Android/i) && (a.match(/SM-G93/i) || a.match(/SM-G94/i) || a.match(/SM-G95/i) || a.match(/SM-G96/i) || a.match(/SM-G97/i) || a.match(/SM-G98/i) || a.match(/Z01QD/i) || a.match(/ZS600KL/i) || a.match(/I001D/i) || a.match(/I001DE/i) || a.match(/I001DA/i) || a.match(/ZS630KL/i) || a.match(/I01WD/i) || a.match(/V570KL/i) || a.match(/A002/i) || a.match(/ZS571KL/i) || a.match(/GA011/i) || a.match(/G020/i) || a.match(/GM190/i) || a.match(/HD19/i) || a.match(/A60/i) || a.match(/A50/i) || a.match(/SM-T83/i) || a.match(/SM-T72/i) || a.match(/SM-T86/i) || a.match(/H94/i) || a.match(/J82/i) || a.match(/M190/i) || a.match(/M180/i) || a.match(/SM-A805/i) || a.match(/SM-A705/i) || a.match(/SM-A606/i) || a.match(/SM-A50/i) || a.match(/SM-A405/i) || a.match(/SM-A730/i) || a.match(/XT2027/i) || a.match(/Xperia Z2/i) || a.match(/SO-03F/i) || a.match(/D6502/i) || a.match(/D6503/i) || a.match(/SGP5/i) || a.match(/D6563/i) || a.match(/D66/i) || a.match(/SO-01G/i) || a.match(/SOL26/i) || a.match(/D67/i) || a.match(/J91/i) || a.match(/J81/i) || a.match(/J92/i) || a.match(/CLT-TL/i) || a.match(/CLT-AL/i) || a.match(/CLT-L/i) || a.match(/HW-01K/i) || a.match(/EML-L/i) || a.match(/EML-A/i) || a.match(/EML-T/i) || a.match(/VOG-L/i) || a.match(/VOG-A/i) || a.match(/VOG-T/i) || a.match(/ELE/i) || a.match(/H82/i) || a.match(/702/i) || a.match(/SOV/i) || a.match(/H81/i) || a.match(/H83/i) || a.match(/SM-N96/i) || a.match(/SM-N95/i) || a.match(/SM-N97/i) || a.match(/SM-N77/i) || a.match(/SM-A51/i)))) {
        hideARButton();
    }
}

function checkForARSupport() {
    var isMobile = {
        Android: function() {
            return navigator.userAgent.match(/Android/i);
        },
        iOS: function() {
            return navigator.userAgent.match(/iPhone/i);
        },
        iPad: function() {
            return (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
        },
        any: function() {
            return (isMobile.Android() || isMobile.iOS() || isMobile.iPad());
        }
    };
    if (!isMobile.any()) {
        //You can either Hide the AR Button Here for desktop devices or decide to show it. If Visible and When clicked, the button will pop up a QR code. 
        //hideARButton();
    } else if (isMobile.Android()) {
        checkForAndroidSupport();
    } else if (isMobile.iOS() || isMobile.iPad()) {
        checkForiOSSupport();
    }
}

function hideARButton() {
    var x = document.getElementsByClassName("charpstarARViewer");
    var i;
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }
}




//QR Code Logic 

var QRCodeModalActive = false;
var QRMainSrc = "https://charpstar.se/InPlace-Integration-Full/QRGen.html?charpstar-ar-href=";
var QRCurrentProductAppend = window.location.href + "?ARClass=charpstarARViewer";
var fullQRSrc = QRMainSrc + QRCurrentProductAppend;
var QRModalDiv = document.createElement("div");
QRModalDiv.setAttribute('class', 'QRModal');
QRModalDiv.style.width = "100%";
QRModalDiv.style.height = "100%";
QRModalDiv.style.position = "fixed";
QRModalDiv.style.background = "rgba(0, 0, 0, 0.5)";
QRModalDiv.style.opacity = "1";
QRModalDiv.style.visibility = "visible";
QRModalDiv.style.transform = "scale(1.1)";
QRModalDiv.style.transition = "visibility 0s linear 0.25s, opacity 0.25s 0s, transform 0.25s";
QRModalDiv.style.top = "0";
QRModalDiv.style.left = "0";
var QRModaliframe = document.createElement('iframe');
QRModaliframe.src = fullQRSrc;
QRModaliframe.frameborder = "0";
QRModaliframe.height = "585px";
QRModaliframe.width = "404px";
QRModaliframe.style.top = "50%";
QRModaliframe.style.left = "50%";
QRModaliframe.style.position = "absolute";
QRModaliframe.style.transform = "translate(-50%, -50%)";
QRModalDiv.appendChild(QRModaliframe);

function toggleModal() {
    if (QRCodeModalActive == false) {
        document.body.appendChild(QRModalDiv);
        setTimeout(function() {
            QRCodeModalActive = true;
        }, 200);
    } else {
        document.body.removeChild(QRModalDiv);
        QRCodeModalActive = false;
    }
}

function windowOnClick(event) {
    if (QRCodeModalActive == true) {
        toggleModal();
    }
}
window.addEventListener("click", windowOnClick);

function QRCloseButtonEvent(msg) {
    if (msg.data == "CloseQRModal") {
        toggleModal();
    }
}
if (window.addEventListener) {
    window.addEventListener("message", QRCloseButtonEvent, false);
} else {
    window.attachEvent("onmessage", QRCloseButtonEvent);
}