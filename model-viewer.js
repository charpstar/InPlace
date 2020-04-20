const isCEPolyfill=void 0!==window.customElements&&void 0!==window.customElements.polyfillWrapFlushCallback,marker=`{{lit-${String(Math.random()).slice(2)}}}`;try
{const e={get capture()
{return!1}};window.addEventListener("test",e,e),window.removeEventListener("test",e,e)}
catch(_e)
{}
var _a;(window.litHtmlVersions||(window.litHtmlVersions=[])).push("1.1.2"),void 0===window.ShadyCSS||void 0===window.ShadyCSS.prepareTemplateDom&&console.warn("Incompatible ShadyCSS version detected. Please update to at least @webcomponents/webcomponentsjs@2.0.2 and @webcomponents/shadycss@1.3.1."),window.JSCompiler_renameProperty=((e,t)=>e);const defaultConverter={toAttribute(e,t)
{switch(t)
{case Boolean:return e?"":null;case Object:case Array:return null==e?e:JSON.stringify(e)}
return e},fromAttribute(e,t)
{switch(t)
{case Boolean:return null!==e;case Number:return null===e?null:Number(e);case Object:case Array:return JSON.parse(e)}
return e}},notEqual=(e,t)=>t!==e&&(t==t||e==e),defaultPropertyDeclaration={attribute:!0,type:String,converter:defaultConverter,reflect:!1,hasChanged:notEqual},microtaskPromise=Promise.resolve(!0),STATE_HAS_UPDATED=1,STATE_UPDATE_REQUESTED=4,STATE_IS_REFLECTING_TO_ATTRIBUTE=8,STATE_IS_REFLECTING_TO_PROPERTY=16,STATE_HAS_CONNECTED=32,finalized="finalized";class UpdatingElement extends HTMLElement
{constructor()
{super(),this._updateState=0,this._instanceProperties=void 0,this._updatePromise=microtaskPromise,this._hasConnectedResolver=void 0,this._changedProperties=new Map,this._reflectingProperties=void 0,this.initialize()}
static get observedAttributes()
{this.finalize();const e=[];return this._classProperties.forEach((t,r)=>{const n=this._attributeNameForProperty(r,t);void 0!==n&&(this._attributeToPropertyMap.set(n,r),e.push(n))}),e}
static _ensureClassProperties()
{if(!this.hasOwnProperty(JSCompiler_renameProperty("_classProperties",this)))
{this._classProperties=new Map;const e=Object.getPrototypeOf(this)._classProperties;void 0!==e&&e.forEach((e,t)=>this._classProperties.set(t,e))}}
static createProperty(e,t=defaultPropertyDeclaration)
{if(this._ensureClassProperties(),this._classProperties.set(e,t),t.noAccessor||this.prototype.hasOwnProperty(e))return;const r="symbol"==typeof e?Symbol():`__${e}`;Object.defineProperty(this.prototype,e,{get()
{return this[r]},set(t)
{const n=this[e];this[r]=t,this._requestUpdate(e,n)},configurable:!0,enumerable:!0})}
static finalize()
{const e=Object.getPrototypeOf(this);if(e.hasOwnProperty(finalized)||e.finalize(),this[finalized]=!0,this._ensureClassProperties(),this._attributeToPropertyMap=new Map,this.hasOwnProperty(JSCompiler_renameProperty("properties",this)))
{const e=this.properties,t=[...Object.getOwnPropertyNames(e),..."function"==typeof Object.getOwnPropertySymbols?Object.getOwnPropertySymbols(e):[]];for(const r of t)this.createProperty(r,e[r])}}
static _attributeNameForProperty(e,t)
{const r=t.attribute;return!1===r?void 0:"string"==typeof r?r:"string"==typeof e?e.toLowerCase():void 0}
static _valueHasChanged(e,t,r=notEqual)
{return r(e,t)}
static _propertyValueFromAttribute(e,t)
{const r=t.type,n=t.converter||defaultConverter,i="function"==typeof n?n:n.fromAttribute;return i?i(e,r):e}
static _propertyValueToAttribute(e,t)
{if(void 0===t.reflect)return;const r=t.type,n=t.converter;return(n&&n.toAttribute||defaultConverter.toAttribute)(e,r)}
initialize()
{this._saveInstanceProperties(),this._requestUpdate()}
_saveInstanceProperties()
{this.constructor._classProperties.forEach((e,t)=>{if(this.hasOwnProperty(t))
{const e=this[t];delete this[t],this._instanceProperties||(this._instanceProperties=new Map),this._instanceProperties.set(t,e)}})}
_applyInstanceProperties()
{this._instanceProperties.forEach((e,t)=>this[t]=e),this._instanceProperties=void 0}
connectedCallback()
{this._updateState=this._updateState|STATE_HAS_CONNECTED,this._hasConnectedResolver&&(this._hasConnectedResolver(),this._hasConnectedResolver=void 0)}
disconnectedCallback()
{}
attributeChangedCallback(e,t,r)
{t!==r&&this._attributeToProperty(e,r)}
_propertyToAttribute(e,t,r=defaultPropertyDeclaration)
{const n=this.constructor,i=n._attributeNameForProperty(e,r);if(void 0!==i)
{const e=n._propertyValueToAttribute(t,r);if(void 0===e)return;this._updateState=this._updateState|STATE_IS_REFLECTING_TO_ATTRIBUTE,null==e?this.removeAttribute(i):this.setAttribute(i,e),this._updateState=this._updateState&~STATE_IS_REFLECTING_TO_ATTRIBUTE}}
_attributeToProperty(e,t)
{if(this._updateState&STATE_IS_REFLECTING_TO_ATTRIBUTE)return;const r=this.constructor,n=r._attributeToPropertyMap.get(e);if(void 0!==n)
{const e=r._classProperties.get(n)||defaultPropertyDeclaration;this._updateState=this._updateState|STATE_IS_REFLECTING_TO_PROPERTY,this[n]=r._propertyValueFromAttribute(t,e),this._updateState=this._updateState&~STATE_IS_REFLECTING_TO_PROPERTY}}
_requestUpdate(e,t)
{let r=!0;if(void 0!==e)
{const n=this.constructor,i=n._classProperties.get(e)||defaultPropertyDeclaration;n._valueHasChanged(this[e],t,i.hasChanged)?(this._changedProperties.has(e)||this._changedProperties.set(e,t),!0!==i.reflect||this._updateState&STATE_IS_REFLECTING_TO_PROPERTY||(void 0===this._reflectingProperties&&(this._reflectingProperties=new Map),this._reflectingProperties.set(e,i))):r=!1}!this._hasRequestedUpdate&&r&&this._enqueueUpdate()}
requestUpdate(e,t)
{return this._requestUpdate(e,t),this.updateComplete}
async _enqueueUpdate()
{let e,t;this._updateState=this._updateState|STATE_UPDATE_REQUESTED;const r=this._updatePromise;this._updatePromise=new Promise((r,n)=>{e=r,t=n});try
{await r}
catch(e)
{}
this._hasConnected||await new Promise(e=>this._hasConnectedResolver=e);try
{const e=this.performUpdate();null!=e&&await e}
catch(e)
{t(e)}
e(!this._hasRequestedUpdate)}
get _hasConnected()
{return this._updateState&STATE_HAS_CONNECTED}
get _hasRequestedUpdate()
{return this._updateState&STATE_UPDATE_REQUESTED}
get hasUpdated()
{return this._updateState&STATE_HAS_UPDATED}
performUpdate()
{this._instanceProperties&&this._applyInstanceProperties();let e=!1;const t=this._changedProperties;try
{(e=this.shouldUpdate(t))&&this.update(t)}
catch(t)
{throw e=!1,t}
finally
{this._markUpdated()}
e&&(this._updateState&STATE_HAS_UPDATED||(this._updateState=this._updateState|STATE_HAS_UPDATED,this.firstUpdated(t)),this.updated(t))}
_markUpdated()
{this._changedProperties=new Map,this._updateState=this._updateState&~STATE_UPDATE_REQUESTED}
get updateComplete()
{return this._getUpdateComplete()}
_getUpdateComplete()
{return this._updatePromise}
shouldUpdate(e)
{return!0}
update(e)
{void 0!==this._reflectingProperties&&this._reflectingProperties.size>0&&(this._reflectingProperties.forEach((e,t)=>this._propertyToAttribute(t,this[t],e)),this._reflectingProperties=void 0)}
updated(e)
{}
firstUpdated(e)
{}}
UpdatingElement[_a=finalized]=!0;const standardProperty=(e,t)=>"method"!==t.kind||!t.descriptor||"value" in t.descriptor?{kind:"field",key:Symbol(),placement:"own",descriptor:{},initializer()
{"function"==typeof t.initializer&&(this[t.key]=t.initializer.call(this))},finisher(r)
{r.createProperty(t.key,e)}}:Object.assign({},t,{finisher(r)
{r.createProperty(t.key,e)}}),legacyProperty=(e,t,r)=>{t.constructor.createProperty(r,e)};function property(e)
{return(t,r)=>void 0!==r?legacyProperty(e,t,r):standardProperty(e,t)}
const supportsAdoptingStyleSheets="adoptedStyleSheets" in Document.prototype&&"replace" in CSSStyleSheet.prototype;(window.litElementVersions||(window.litElementVersions=[])).push("2.2.1");const HAS_WEBXR_DEVICE_API=null!=navigator.xr&&null!=self.XRSession&&null!=navigator.xr.isSessionSupported,HAS_WEBXR_HIT_TEST_API=HAS_WEBXR_DEVICE_API&&self.XRSession.prototype.requestHitTestSource,HAS_RESIZE_OBSERVER=null!=self.ResizeObserver,HAS_INTERSECTION_OBSERVER=null!=self.IntersectionObserver,IS_WEBXR_AR_CANDIDATE=HAS_WEBXR_HIT_TEST_API,IS_MOBILE=(()=>{const e=navigator.userAgent||navigator.vendor||self.opera;let t=!1;return(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(e)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(e.substr(0,4)))&&(t=!0),t})(),HAS_OFFSCREEN_CANVAS=Boolean(self.OffscreenCanvas),OFFSCREEN_CANVAS_SUPPORT_BITMAP=Boolean(self.OffscreenCanvas)&&Boolean(self.OffscreenCanvas.prototype.transferToImageBitmap),IS_ANDROID=/android/i.test(navigator.userAgent),IS_IOS=/iPad|iPhone|iPod/.test(navigator.userAgent)&&!self.MSStream||"MacIntel"===navigator.platform&&navigator.maxTouchPoints>1,IS_AR_QUICKLOOK_CANDIDATE=(()=>{const e=document.createElement("a");return Boolean(e.relList&&e.relList.supports&&e.relList.supports("ar"))})(),IS_IOS_CHROME=IS_IOS&&/CriOS\//.test(navigator.userAgent),IS_IOS_SAFARI=IS_IOS&&/Safari\//.test(navigator.userAgent),IS_IE11=!window.ActiveXObject&&"ActiveXObject" in window;var CloseIcon='\n<svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" fill="#000000">\n    \x3c!-- NOTE(cdata): This SVG filter is a stop-gap until we can implement\n         support for dynamic re-coloring of UI components --\x3e\n    <defs>\n      <filter id="drop-shadow" x="-100%" y="-100%" width="300%" height="300%">\n        <feGaussianBlur in="SourceAlpha" stdDeviation="1"/>\n        <feOffset dx="0" dy="0" result="offsetblur"/>\n        <feFlood flood-color="#000000"/>\n        <feComposite in2="offsetblur" operator="in"/>\n        <feMerge>\n          <feMergeNode/>\n          <feMergeNode in="SourceGraphic"/>\n        </feMerge>\n      </filter>\n    </defs>\n    <path filter="url(#drop-shadow)" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>\n    <path d="M0 0h24v24H0z" fill="none"/>\n</svg>',ControlsPrompt='\n<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="25" height="36">\n    <defs>\n        <path id="A" d="M.001.232h24.997V36H.001z" />\n    </defs>\n    <g transform="translate(-11 -4)" fill="none" fill-rule="evenodd">\n        <path fill-opacity="0" fill="#fff" d="M0 0h44v44H0z" />\n        <g transform="translate(11 3)">\n            <path d="M8.733 11.165c.04-1.108.766-2.027 1.743-2.307a2.54 2.54 0 0 1 .628-.089c.16 0 .314.017.463.044 1.088.2 1.9 1.092 1.9 2.16v8.88h1.26c2.943-1.39 5-4.45 5-8.025a9.01 9.01 0 0 0-1.9-5.56l-.43-.5c-.765-.838-1.683-1.522-2.712-2-1.057-.49-2.226-.77-3.46-.77s-2.4.278-3.46.77c-1.03.478-1.947 1.162-2.71 2l-.43.5a9.01 9.01 0 0 0-1.9 5.56 9.04 9.04 0 0 0 .094 1.305c.03.21.088.41.13.617l.136.624c.083.286.196.56.305.832l.124.333a8.78 8.78 0 0 0 .509.953l.065.122a8.69 8.69 0 0 0 3.521 3.191l1.11.537v-9.178z" fill-opacity=".5" fill="#e4e4e4" />\n            <path d="M22.94 26.218l-2.76 7.74c-.172.485-.676.8-1.253.8H12.24c-1.606 0-3.092-.68-3.98-1.82-1.592-2.048-3.647-3.822-6.11-5.27-.095-.055-.15-.137-.152-.23-.004-.1.046-.196.193-.297.56-.393 1.234-.6 1.926-.6a3.43 3.43 0 0 1 .691.069l4.922.994V10.972c0-.663.615-1.203 1.37-1.203s1.373.54 1.373 1.203v9.882h2.953c.273 0 .533.073.757.21l6.257 3.874c.027.017.045.042.07.06.41.296.586.77.426 1.22M4.1 16.614c-.024-.04-.042-.083-.065-.122a8.69 8.69 0 0 1-.509-.953c-.048-.107-.08-.223-.124-.333l-.305-.832c-.058-.202-.09-.416-.136-.624l-.13-.617a9.03 9.03 0 0 1-.094-1.305c0-2.107.714-4.04 1.9-5.56l.43-.5c.764-.84 1.682-1.523 2.71-2 1.058-.49 2.226-.77 3.46-.77s2.402.28 3.46.77c1.03.477 1.947 1.16 2.712 2l.428.5a9 9 0 0 1 1.901 5.559c0 3.577-2.056 6.636-5 8.026h-1.26v-8.882c0-1.067-.822-1.96-1.9-2.16-.15-.028-.304-.044-.463-.044-.22 0-.427.037-.628.09-.977.28-1.703 1.198-1.743 2.306v9.178l-1.11-.537C6.18 19.098 4.96 18 4.1 16.614M22.97 24.09l-6.256-3.874c-.102-.063-.218-.098-.33-.144 2.683-1.8 4.354-4.855 4.354-8.243 0-.486-.037-.964-.104-1.43a9.97 9.97 0 0 0-1.57-4.128l-.295-.408-.066-.092a10.05 10.05 0 0 0-.949-1.078c-.342-.334-.708-.643-1.094-.922-1.155-.834-2.492-1.412-3.94-1.65l-.732-.088-.748-.03a9.29 9.29 0 0 0-1.482.119c-1.447.238-2.786.816-3.94 1.65a9.33 9.33 0 0 0-.813.686 9.59 9.59 0 0 0-.845.877l-.385.437-.36.5-.288.468-.418.778-.04.09c-.593 1.28-.93 2.71-.93 4.222 0 3.832 2.182 7.342 5.56 8.938l1.437.68v4.946L5 25.64a4.44 4.44 0 0 0-.888-.086c-.017 0-.034.003-.05.003-.252.004-.503.033-.75.08a5.08 5.08 0 0 0-.237.056c-.193.046-.382.107-.568.18-.075.03-.15.057-.225.1-.25.114-.494.244-.723.405a1.31 1.31 0 0 0-.566 1.122 1.28 1.28 0 0 0 .645 1.051C4 29.925 5.96 31.614 7.473 33.563a5.06 5.06 0 0 0 .434.491c1.086 1.082 2.656 1.713 4.326 1.715h6.697c.748-.001 1.43-.333 1.858-.872.142-.18.256-.38.336-.602l2.757-7.74c.094-.26.13-.53.112-.794s-.088-.52-.203-.76a2.19 2.19 0 0 0-.821-.91" fill-opacity=".6" fill="#000" />\n            <path d="M22.444 24.94l-6.257-3.874a1.45 1.45 0 0 0-.757-.211h-2.953v-9.88c0-.663-.616-1.203-1.373-1.203s-1.37.54-1.37 1.203v16.643l-4.922-.994a3.44 3.44 0 0 0-.692-.069 3.35 3.35 0 0 0-1.925.598c-.147.102-.198.198-.194.298.004.094.058.176.153.23 2.462 1.448 4.517 3.22 6.11 5.27.887 1.14 2.373 1.82 3.98 1.82h6.686c.577 0 1.08-.326 1.253-.8l2.76-7.74c.16-.448-.017-.923-.426-1.22-.025-.02-.043-.043-.07-.06z" fill="#fff" />\n            <g transform="translate(0 .769)">\n                <mask id="B" fill="#fff">\n                    <use xlink:href="#A" />\n                </mask>\n                <path d="M23.993 24.992a1.96 1.96 0 0 1-.111.794l-2.758 7.74c-.08.22-.194.423-.336.602-.427.54-1.11.87-1.857.872h-6.698c-1.67-.002-3.24-.633-4.326-1.715-.154-.154-.3-.318-.434-.49C5.96 30.846 4 29.157 1.646 27.773c-.385-.225-.626-.618-.645-1.05a1.31 1.31 0 0 1 .566-1.122 4.56 4.56 0 0 1 .723-.405l.225-.1a4.3 4.3 0 0 1 .568-.18l.237-.056c.248-.046.5-.075.75-.08.018 0 .034-.003.05-.003.303-.001.597.027.89.086l3.722.752V20.68l-1.436-.68c-3.377-1.596-5.56-5.106-5.56-8.938 0-1.51.336-2.94.93-4.222.015-.03.025-.06.04-.09.127-.267.268-.525.418-.778.093-.16.186-.316.288-.468.063-.095.133-.186.2-.277L3.773 5c.118-.155.26-.29.385-.437.266-.3.544-.604.845-.877a9.33 9.33 0 0 1 .813-.686C6.97 2.167 8.31 1.59 9.757 1.35a9.27 9.27 0 0 1 1.481-.119 8.82 8.82 0 0 1 .748.031c.247.02.49.05.733.088 1.448.238 2.786.816 3.94 1.65.387.28.752.588 1.094.922a9.94 9.94 0 0 1 .949 1.078l.066.092c.102.133.203.268.295.408a9.97 9.97 0 0 1 1.571 4.128c.066.467.103.945.103 1.43 0 3.388-1.67 6.453-4.353 8.243.11.046.227.08.33.144l6.256 3.874c.37.23.645.55.82.9.115.24.185.498.203.76m.697-1.195c-.265-.55-.677-1.007-1.194-1.326l-5.323-3.297c2.255-2.037 3.564-4.97 3.564-8.114 0-2.19-.637-4.304-1.84-6.114-.126-.188-.26-.37-.4-.552-.645-.848-1.402-1.6-2.252-2.204C15.472.91 13.393.232 11.238.232A10.21 10.21 0 0 0 5.23 2.19c-.848.614-1.606 1.356-2.253 2.205-.136.18-.272.363-.398.55C1.374 6.756.737 8.87.737 11.06c0 4.218 2.407 8.08 6.133 9.842l.863.41v3.092l-2.525-.51c-.356-.07-.717-.106-1.076-.106a5.45 5.45 0 0 0-3.14.996c-.653.46-1.022 1.202-.99 1.983a2.28 2.28 0 0 0 1.138 1.872c2.24 1.318 4.106 2.923 5.543 4.772 1.26 1.62 3.333 2.59 5.55 2.592h6.698c1.42-.001 2.68-.86 3.134-2.138l2.76-7.74c.272-.757.224-1.584-.134-2.325" fill-opacity=".05" fill="#000" mask="url(#B)" />\n            </g>\n        </g>\n    </g>\n</svg>',ARGlyph='\n<svg version="1.1" id="view_x5F_in_x5F_AR_x5F_icon"\n\t xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="24px" height="24px"\n\t viewBox="0 0 24 24" enable-background="new 0 0 24 24" xml:space="preserve">\n<rect id="Bounding_Box" x="0" y="0" fill="none" width="24" height="24"/>\n<g id="Art_layer">\n\t<path d="M3,4c0-0.55,0.45-1,1-1h2V1H4C2.35,1,1,2.35,1,4v2h2V4z"/>\n\t<path d="M20,3c0.55,0,1,0.45,1,1v2h2V4c0-1.65-1.35-3-3-3h-2v2H20z"/>\n\t<path d="M4,21c-0.55,0-1-0.45-1-1v-2H1v2c0,1.65,1.35,3,3,3h2v-2H4z"/>\n\t<path d="M20,21c0.55,0,1-0.45,1-1v-2h2v2c0,1.65-1.35,3-3,3h-2v-2H20z"/>\n\t<g>\n\t\t<path d="M18.25,7.6l-5.5-3.18c-0.46-0.27-1.04-0.27-1.5,0L5.75,7.6C5.29,7.87,5,8.36,5,8.9v6.35c0,0.54,0.29,1.03,0.75,1.3\n\t\t\tl5.5,3.18c0.46,0.27,1.04,0.27,1.5,0l5.5-3.18c0.46-0.27,0.75-0.76,0.75-1.3V8.9C19,8.36,18.71,7.87,18.25,7.6z M7,14.96v-4.62\n\t\t\tl4,2.32v4.61L7,14.96z M12,10.93L8,8.61l4-2.31l4,2.31L12,10.93z M13,17.27v-4.61l4-2.32v4.62L13,17.27z"/>\n\t</g>\n</g>\n</svg>';const template=document.createElement("template");template.innerHTML=`\n<style>\n:host {\n  display: block;\n  position: relative;\n  contain: strict;\n  width: 300px;\n  height: 150px;\n}\n\n/* NOTE: This ruleset is our integration surface area with the\n * :focus-visible polyfill.\n *\n * @see https://github.com/WICG/focus-visible/pull/196 */\n:host([data-js-focus-visible]:focus:not(.focus-visible)),\n:host([data-js-focus-visible]) :focus:not(.focus-visible) {\n  outline: none;\n}\n\n.container {\n  position: relative;\n}\n\n.annotation-container {\n  position: absolute;\n  pointer-events: none;\n  top: 0;\n}\n\ncanvas {\n  width: 100%;\n  height: 100%;\n  display: none;\n  /* NOTE(cdata): Chrome 76 and below apparently have a bug\n   * that causes our canvas not to display pixels unless it is\n   * on its own render layer\n   * @see https://github.com/GoogleWebComponents/model-viewer/pull/755#issuecomment-536597893\n   */\n  transform: translateZ(0);\n}\n\ncanvas.show {\n  display: block;\n}\n\n/* Adapted from HTML5 Boilerplate\n *\n * @see https://github.com/h5bp/html5-boilerplate/blob/ceb4620c78fc82e13534fc44202a3f168754873f/dist/css/main.css#L122-L133 */\n.screen-reader-only {\n  border: 0;\n  clip: rect(0, 0, 0, 0);\n  height: 1px;\n  margin: -1px;\n  overflow: hidden;\n  padding: 0;\n  position: absolute;\n  white-space: nowrap;\n  width: 1px;\n}\n\n.slot {\n  position: absolute;\n  pointer-events: none;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n}\n\n.slot > * {\n  pointer-events: initial;\n}\n\n.annotation-wrapper ::slotted(*) {\n  opacity: var(--max-hotspot-opacity, 1);\n  transition: opacity 0.3s;\n}\n\n.pointer-tumbling .annotation-wrapper ::slotted(*) {\n  pointer-events: none;\n}\n\n.annotation-wrapper ::slotted(*) {\n  pointer-events: initial;\n}\n\n.annotation-wrapper.hide ::slotted(*) {\n  opacity: var(--min-hotspot-opacity, 0.25);\n}\n\n.slot.poster {\n  opacity: 0;\n  transition: opacity 0.3s 0.3s;\n  background-color: inherit;\n}\n\n.slot.poster.show {\n  opacity: 1;\n  transition: none;\n}\n\n.slot.poster > * {\n  pointer-events: initial;\n}\n\n.slot.poster:not(.show) > * {\n  pointer-events: none;\n}\n\n#default-poster {\n  width: 100%;\n  height: 100%;\n  /* The default poster is a <button> so we need to set display\n   * to prevent it from being affected by text-align: */\n  display: block;\n  position: absolute;\n  border: none;\n  padding: 0;\n  background-size: contain;\n  background-repeat: no-repeat;\n  background-position: center;\n  background-color: var(--poster-color, inherit);\n  background-image: var(--poster-image, none);\n}\n\n#default-progress-bar {\n  display: block;\n  position: relative;\n  width: 100%;\n  height: 100%;\n  pointer-events: none;\n  overflow: hidden;\n}\n\n#default-progress-bar > .mask {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  background: var(--progress-mask, #fff);\n  transition: opacity 0.3s;\n  opacity: 0.2;\n}\n\n#default-progress-bar > .bar {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: var(--progress-bar-height, 5px);\n  transition: transform 0.09s;\n  transform-origin: top left;\n  transform: scaleX(0);\n  overflow: hidden;\n}\n\n#default-progress-bar > .bar:before {\n  content: '';\n  display: block;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n\n  background-color: var(--progress-bar-color, rgba(0, 0, 0, 0.4));\n\n  transition: none;\n  transform-origin: top left;\n  transform: translateY(0);\n}\n\n#default-progress-bar > .bar.hide:before {\n  transition: transform 0.3s 1s;\n  transform: translateY(-100%);\n}\n\n.slot.interaction-prompt {\n  display: var(--interaction-prompt-display, flex);\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  pointer-events: none;\n  align-items: center;\n  justify-content: center;\n\n  opacity: 0;\n  will-change: opacity;\n  overflow: hidden;\n  transition: opacity 0.3s;\n}\n\n.slot.interaction-prompt.visible {\n  opacity: 1;\n}\n\n.slot.interaction-prompt > .animated-container {\n  will-change: transform, opacity;\n}\n\n.slot.interaction-prompt > * {\n  pointer-events: none;\n}\n\n.slot.ar-button {\n  -moz-user-select: none;\n  -webkit-tap-highlight-color: transparent;\n  user-select: none;\n\n  display: var(--ar-button-display, block);\n}\n\n.slot.ar-button:not(.enabled),\n.fullscreen .slot.ar-button {\n  display: none;\n}\n\n.fab {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  box-sizing: border-box;\n  width: 40px;\n  height: 40px;\n  cursor: pointer;\n  background-color: #fff;\n  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.15);\n  border-radius: 100px;\n}\n\n.fab > * {\n  opacity: 0.87;\n}\n\n#default-ar-button {\n  position: absolute;\n  bottom: 16px;\n  right: 16px;\n}\n\n:not(.fullscreen) .slot.exit-fullscreen-button {\n  display: none;\n}\n\n#default-exit-fullscreen-button {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  position: absolute;\n  top: 16px;\n  left: 16px;\n  width: 40px;\n  height: 40px;\n  box-sizing: border-box;\n}\n\n#default-exit-fullscreen-button > svg {\n  fill: #fff;\n}\n</style>\n<div class="container">\n  <canvas tabindex="1"\n    aria-label="A depiction of a 3D model"\n    aria-live="polite">\n  </canvas>\n\n  \x3c!-- NOTE(cdata): We need to wrap slots because browsers without ShadowDOM\n        will have their <slot> elements removed by ShadyCSS --\x3e\n  <div class="slot poster">\n    <slot name="poster">\n      <button type="button" id="default-poster" aria-hidden="true" aria-label="Activate to view in 3D!"></button>\n    </slot>\n  </div>\n\n  <div class="slot progress-bar">\n    <slot name="progress-bar">\n      <div id="default-progress-bar" aria-hidden="true">\n        <div class="mask"></div>\n        <div class="bar"></div>\n      </div>\n    </slot>\n  </div>\n\n  <div class="slot ar-button">\n    <slot name="ar-button">\n      <a id="default-ar-button" class="fab"\n          tabindex="2"\n          aria-label="View this 3D model up close">\n        ${ARGlyph}\n      </a>\n    </slot>\n  </div>\n\n  <div class="slot exit-fullscreen-button">\n    <slot name="exit-fullscreen-button">\n      <a id="default-exit-fullscreen-button"\n          tabindex="3"\n          aria-label="Exit fullscreen"\n          aria-hidden="true">\n        ${CloseIcon}\n      </a>\n    </slot>\n  </div>\n\n  <div class="slot interaction-prompt">\n    <div class="animated-container" part="interaction-prompt">\n      <slot name="interaction-prompt" aria-hidden="true">\n        ${ControlsPrompt}\n      </slot>\n    </div>\n  </div>\n\n  <div class="slot default">\n    <slot></slot>\n  </div>\n</div>`;const makeTemplate=e=>{const t=document.createElement("template");return t.innerHTML=template.innerHTML,window.ShadyCSS&&window.ShadyCSS.prepareTemplate(t,e),t};void 0===Number.EPSILON&&(Number.EPSILON=Math.pow(2,-52)),void 0===Number.isInteger&&(Number.isInteger=function(e)
{return"number"==typeof e&&isFinite(e)&&Math.floor(e)===e}),void 0===Math.sign&&(Math.sign=function(e)
{return e<0?-1:e>0?1:+e}),"name" in Function.prototype==!1&&Object.defineProperty(Function.prototype,"name",{get:function()
{return this.toString().match(/^\s*function\s*([^\(\s]*)/)[1]}}),void 0===Object.assign&&(Object.assign=function(e)
{if(null==e)throw new TypeError("Cannot convert undefined or null to object");for(var t=Object(e),r=1;r<arguments.length;r++)
{var n=arguments[r];if(null!=n)
for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&(t[i]=n[i])}
return t});var REVISION="113",CullFaceNone=0,CullFaceBack=1,CullFaceFront=2,PCFShadowMap=1,PCFSoftShadowMap=2,VSMShadowMap=3,FrontSide=0,BackSide=1,DoubleSide=2,FlatShading=1,NoColors=0,FaceColors=1,VertexColors=2,NoBlending=0,NormalBlending=1,AdditiveBlending=2,SubtractiveBlending=3,MultiplyBlending=4,CustomBlending=5,AddEquation=100,SubtractEquation=101,ReverseSubtractEquation=102,MinEquation=103,MaxEquation=104,ZeroFactor=200,OneFactor=201,SrcColorFactor=202,OneMinusSrcColorFactor=203,SrcAlphaFactor=204,OneMinusSrcAlphaFactor=205,DstAlphaFactor=206,OneMinusDstAlphaFactor=207,DstColorFactor=208,OneMinusDstColorFactor=209,SrcAlphaSaturateFactor=210,NeverDepth=0,AlwaysDepth=1,LessDepth=2,LessEqualDepth=3,EqualDepth=4,GreaterEqualDepth=5,GreaterDepth=6,NotEqualDepth=7,MultiplyOperation=0,MixOperation=1,AddOperation=2,NoToneMapping=0,LinearToneMapping=1,ReinhardToneMapping=2,Uncharted2ToneMapping=3,CineonToneMapping=4,ACESFilmicToneMapping=5,UVMapping=300,CubeReflectionMapping=301,CubeRefractionMapping=302,EquirectangularReflectionMapping=303,EquirectangularRefractionMapping=304,SphericalReflectionMapping=305,CubeUVReflectionMapping=306,CubeUVRefractionMapping=307,RepeatWrapping=1e3,ClampToEdgeWrapping=1001,MirroredRepeatWrapping=1002,NearestFilter=1003,NearestMipmapNearestFilter=1004,NearestMipmapLinearFilter=1005,LinearFilter=1006,LinearMipmapNearestFilter=1007,LinearMipmapLinearFilter=1008,LinearMipMapLinearFilter=1008,UnsignedByteType=1009,ByteType=1010,ShortType=1011,UnsignedShortType=1012,IntType=1013,UnsignedIntType=1014,FloatType=1015,HalfFloatType=1016,UnsignedShort4444Type=1017,UnsignedShort5551Type=1018,UnsignedShort565Type=1019,UnsignedInt248Type=1020,AlphaFormat=1021,RGBFormat=1022,RGBAFormat=1023,LuminanceFormat=1024,LuminanceAlphaFormat=1025,RGBEFormat=RGBAFormat,DepthFormat=1026,DepthStencilFormat=1027,RedFormat=1028,RedIntegerFormat=1029,RGFormat=1030,RGIntegerFormat=1031,RGBIntegerFormat=1032,RGBAIntegerFormat=1033,RGB_S3TC_DXT1_Format=33776,RGBA_S3TC_DXT1_Format=33777,RGBA_S3TC_DXT3_Format=33778,RGBA_S3TC_DXT5_Format=33779,RGB_PVRTC_4BPPV1_Format=35840,RGB_PVRTC_2BPPV1_Format=35841,RGBA_PVRTC_4BPPV1_Format=35842,RGBA_PVRTC_2BPPV1_Format=35843,RGB_ETC1_Format=36196,RGBA_ASTC_4x4_Format=37808,RGBA_ASTC_5x4_Format=37809,RGBA_ASTC_5x5_Format=37810,RGBA_ASTC_6x5_Format=37811,RGBA_ASTC_6x6_Format=37812,RGBA_ASTC_8x5_Format=37813,RGBA_ASTC_8x6_Format=37814,RGBA_ASTC_8x8_Format=37815,RGBA_ASTC_10x5_Format=37816,RGBA_ASTC_10x6_Format=37817,RGBA_ASTC_10x8_Format=37818,RGBA_ASTC_10x10_Format=37819,RGBA_ASTC_12x10_Format=37820,RGBA_ASTC_12x12_Format=37821,LoopOnce=2200,LoopRepeat=2201,LoopPingPong=2202,InterpolateDiscrete=2300,InterpolateLinear=2301,InterpolateSmooth=2302,ZeroCurvatureEnding=2400,ZeroSlopeEnding=2401,WrapAroundEnding=2402,TrianglesDrawMode=0,TriangleStripDrawMode=1,TriangleFanDrawMode=2,LinearEncoding=3e3,sRGBEncoding=3001,GammaEncoding=3007,RGBEEncoding=3002,LogLuvEncoding=3003,RGBM7Encoding=3004,RGBM16Encoding=3005,RGBDEncoding=3006,BasicDepthPacking=3200,RGBADepthPacking=3201,TangentSpaceNormalMap=0,ObjectSpaceNormalMap=1,KeepStencilOp=7680,AlwaysStencilFunc=519,StaticDrawUsage=35044,DynamicDrawUsage=35048;function EventDispatcher()
{}
Object.assign(EventDispatcher.prototype,{addEventListener:function(e,t)
{void 0===this._listeners&&(this._listeners={});var r=this._listeners;void 0===r[e]&&(r[e]=[]),-1===r[e].indexOf(t)&&r[e].push(t)},hasEventListener:function(e,t)
{if(void 0===this._listeners)return!1;var r=this._listeners;return void 0!==r[e]&&-1!==r[e].indexOf(t)},removeEventListener:function(e,t)
{if(void 0!==this._listeners)
{var r=this._listeners[e];if(void 0!==r)
{var n=r.indexOf(t);-1!==n&&r.splice(n,1)}}},dispatchEvent:function(e)
{if(void 0!==this._listeners)
{var t=this._listeners[e.type];if(void 0!==t)
{e.target=this;for(var r=t.slice(0),n=0,i=r.length;n<i;n++)r[n].call(this,e)}}}});for(var _lut=[],i=0;i<256;i++)_lut[i]=(i<16?"0":"")+i.toString(16);var _canvas,MathUtils={DEG2RAD:Math.PI/180,RAD2DEG:180/Math.PI,generateUUID:function()
{var e=4294967295*Math.random()|0,t=4294967295*Math.random()|0,r=4294967295*Math.random()|0,n=4294967295*Math.random()|0;return(_lut[255&e]+_lut[e>>8&255]+_lut[e>>16&255]+_lut[e>>24&255]+"-"+_lut[255&t]+_lut[t>>8&255]+"-"+_lut[t>>16&15|64]+_lut[t>>24&255]+"-"+_lut[63&r|128]+_lut[r>>8&255]+"-"+_lut[r>>16&255]+_lut[r>>24&255]+_lut[255&n]+_lut[n>>8&255]+_lut[n>>16&255]+_lut[n>>24&255]).toUpperCase()},clamp:function(e,t,r)
{return Math.max(t,Math.min(r,e))},euclideanModulo:function(e,t)
{return(e%t+t)%t},mapLinear:function(e,t,r,n,i)
{return n+(e-t)*(i-n)/(r-t)},lerp:function(e,t,r)
{return(1-r)*e+r*t},smoothstep:function(e,t,r)
{return e<=t?0:e>=r?1:(e=(e-t)/(r-t))*e*(3-2*e)},smootherstep:function(e,t,r)
{return e<=t?0:e>=r?1:(e=(e-t)/(r-t))*e*e*(e*(6*e-15)+10)},randInt:function(e,t)
{return e+Math.floor(Math.random()*(t-e+1))},randFloat:function(e,t)
{return e+Math.random()*(t-e)},randFloatSpread:function(e)
{return e*(.5-Math.random())},degToRad:function(e)
{return e*MathUtils.DEG2RAD},radToDeg:function(e)
{return e*MathUtils.RAD2DEG},isPowerOfTwo:function(e)
{return 0==(e&e-1)&&0!==e},ceilPowerOfTwo:function(e)
{return Math.pow(2,Math.ceil(Math.log(e)/Math.LN2))},floorPowerOfTwo:function(e)
{return Math.pow(2,Math.floor(Math.log(e)/Math.LN2))},setQuaternionFromProperEuler:function(e,t,r,n,i)
{var a=Math.cos,o=Math.sin,s=a(r/2),l=o(r/2),c=a((t+n)/2),h=o((t+n)/2),u=a((t-n)/2),d=o((t-n)/2),p=a((n-t)/2),m=o((n-t)/2);"XYX"===i?e.set(s*h,l*u,l*d,s*c):"YZY"===i?e.set(l*d,s*h,l*u,s*c):"ZXZ"===i?e.set(l*u,l*d,s*h,s*c):"XZX"===i?e.set(s*h,l*m,l*p,s*c):"YXY"===i?e.set(l*p,s*h,l*m,s*c):"ZYZ"===i?e.set(l*m,l*p,s*h,s*c):console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order.")}};function Vector2(e,t)
{this.x=e||0,this.y=t||0}
function Matrix3()
{this.elements=[1,0,0,0,1,0,0,0,1],arguments.length>0&&console.error("THREE.Matrix3: the constructor no longer reads arguments. use .set() instead.")}
Object.defineProperties(Vector2.prototype,{width:{get:function()
{return this.x},set:function(e)
{this.x=e}},height:{get:function()
{return this.y},set:function(e)
{this.y=e}}}),Object.assign(Vector2.prototype,{isVector2:!0,set:function(e,t)
{return this.x=e,this.y=t,this},setScalar:function(e)
{return this.x=e,this.y=e,this},setX:function(e)
{return this.x=e,this},setY:function(e)
{return this.y=e,this},setComponent:function(e,t)
{switch(e)
{case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}
return this},getComponent:function(e)
{switch(e)
{case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}},clone:function()
{return new this.constructor(this.x,this.y)},copy:function(e)
{return this.x=e.x,this.y=e.y,this},add:function(e,t)
{return void 0!==t?(console.warn("THREE.Vector2: .add() now only accepts one argument. Use .addVectors( a, b ) instead."),this.addVectors(e,t)):(this.x+=e.x,this.y+=e.y,this)},addScalar:function(e)
{return this.x+=e,this.y+=e,this},addVectors:function(e,t)
{return this.x=e.x+t.x,this.y=e.y+t.y,this},addScaledVector:function(e,t)
{return this.x+=e.x*t,this.y+=e.y*t,this},sub:function(e,t)
{return void 0!==t?(console.warn("THREE.Vector2: .sub() now only accepts one argument. Use .subVectors( a, b ) instead."),this.subVectors(e,t)):(this.x-=e.x,this.y-=e.y,this)},subScalar:function(e)
{return this.x-=e,this.y-=e,this},subVectors:function(e,t)
{return this.x=e.x-t.x,this.y=e.y-t.y,this},multiply:function(e)
{return this.x*=e.x,this.y*=e.y,this},multiplyScalar:function(e)
{return this.x*=e,this.y*=e,this},divide:function(e)
{return this.x/=e.x,this.y/=e.y,this},divideScalar:function(e)
{return this.multiplyScalar(1/e)},applyMatrix3:function(e)
{var t=this.x,r=this.y,n=e.elements;return this.x=n[0]*t+n[3]*r+n[6],this.y=n[1]*t+n[4]*r+n[7],this},min:function(e)
{return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this},max:function(e)
{return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this},clamp:function(e,t)
{return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this},clampScalar:function(e,t)
{return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this},clampLength:function(e,t)
{var r=this.length();return this.divideScalar(r||1).multiplyScalar(Math.max(e,Math.min(t,r)))},floor:function()
{return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this},ceil:function()
{return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this},round:function()
{return this.x=Math.round(this.x),this.y=Math.round(this.y),this},roundToZero:function()
{return this.x=this.x<0?Math.ceil(this.x):Math.floor(this.x),this.y=this.y<0?Math.ceil(this.y):Math.floor(this.y),this},negate:function()
{return this.x=-this.x,this.y=-this.y,this},dot:function(e)
{return this.x*e.x+this.y*e.y},cross:function(e)
{return this.x*e.y-this.y*e.x},lengthSq:function()
{return this.x*this.x+this.y*this.y},length:function()
{return Math.sqrt(this.x*this.x+this.y*this.y)},manhattanLength:function()
{return Math.abs(this.x)+Math.abs(this.y)},normalize:function()
{return this.divideScalar(this.length()||1)},angle:function()
{var e=Math.atan2(this.y,this.x);return e<0&&(e+=2*Math.PI),e},distanceTo:function(e)
{return Math.sqrt(this.distanceToSquared(e))},distanceToSquared:function(e)
{var t=this.x-e.x,r=this.y-e.y;return t*t+r*r},manhattanDistanceTo:function(e)
{return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)},setLength:function(e)
{return this.normalize().multiplyScalar(e)},lerp:function(e,t)
{return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this},lerpVectors:function(e,t,r)
{return this.subVectors(t,e).multiplyScalar(r).add(e)},equals:function(e)
{return e.x===this.x&&e.y===this.y},fromArray:function(e,t)
{return void 0===t&&(t=0),this.x=e[t],this.y=e[t+1],this},toArray:function(e,t)
{return void 0===e&&(e=[]),void 0===t&&(t=0),e[t]=this.x,e[t+1]=this.y,e},fromBufferAttribute:function(e,t,r)
{return void 0!==r&&console.warn("THREE.Vector2: offset has been removed from .fromBufferAttribute()."),this.x=e.getX(t),this.y=e.getY(t),this},rotateAround:function(e,t)
{var r=Math.cos(t),n=Math.sin(t),i=this.x-e.x,a=this.y-e.y;return this.x=i*r-a*n+e.x,this.y=i*n+a*r+e.y,this}}),Object.assign(Matrix3.prototype,{isMatrix3:!0,set:function(e,t,r,n,i,a,o,s,l)
{var c=this.elements;return c[0]=e,c[1]=n,c[2]=o,c[3]=t,c[4]=i,c[5]=s,c[6]=r,c[7]=a,c[8]=l,this},identity:function()
{return this.set(1,0,0,0,1,0,0,0,1),this},clone:function()
{return(new this.constructor).fromArray(this.elements)},copy:function(e)
{var t=this.elements,r=e.elements;return t[0]=r[0],t[1]=r[1],t[2]=r[2],t[3]=r[3],t[4]=r[4],t[5]=r[5],t[6]=r[6],t[7]=r[7],t[8]=r[8],this},setFromMatrix4:function(e)
{var t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this},multiply:function(e)
{return this.multiplyMatrices(this,e)},premultiply:function(e)
{return this.multiplyMatrices(e,this)},multiplyMatrices:function(e,t)
{var r=e.elements,n=t.elements,i=this.elements,a=r[0],o=r[3],s=r[6],l=r[1],c=r[4],h=r[7],u=r[2],d=r[5],p=r[8],m=n[0],f=n[3],g=n[6],v=n[1],y=n[4],_=n[7],b=n[2],x=n[5],M=n[8];return i[0]=a*m+o*v+s*b,i[3]=a*f+o*y+s*x,i[6]=a*g+o*_+s*M,i[1]=l*m+c*v+h*b,i[4]=l*f+c*y+h*x,i[7]=l*g+c*_+h*M,i[2]=u*m+d*v+p*b,i[5]=u*f+d*y+p*x,i[8]=u*g+d*_+p*M,this},multiplyScalar:function(e)
{var t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this},determinant:function()
{var e=this.elements,t=e[0],r=e[1],n=e[2],i=e[3],a=e[4],o=e[5],s=e[6],l=e[7],c=e[8];return t*a*c-t*o*l-r*i*c+r*o*s+n*i*l-n*a*s},getInverse:function(e,t)
{e&&e.isMatrix4&&console.error("THREE.Matrix3: .getInverse() no longer takes a Matrix4 argument.");var r=e.elements,n=this.elements,i=r[0],a=r[1],o=r[2],s=r[3],l=r[4],c=r[5],h=r[6],u=r[7],d=r[8],p=d*l-c*u,m=c*h-d*s,f=u*s-l*h,g=i*p+a*m+o*f;if(0===g)
{var v="THREE.Matrix3: .getInverse() can't invert matrix, determinant is 0";if(!0===t)throw new Error(v);return console.warn(v),this.identity()}
var y=1/g;return n[0]=p*y,n[1]=(o*u-d*a)*y,n[2]=(c*a-o*l)*y,n[3]=m*y,n[4]=(d*i-o*h)*y,n[5]=(o*s-c*i)*y,n[6]=f*y,n[7]=(a*h-u*i)*y,n[8]=(l*i-a*s)*y,this},transpose:function()
{var e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this},getNormalMatrix:function(e)
{return this.setFromMatrix4(e).getInverse(this).transpose()},transposeIntoArray:function(e)
{var t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this},setUvTransform:function(e,t,r,n,i,a,o)
{var s=Math.cos(i),l=Math.sin(i);this.set(r*s,r*l,-r*(s*a+l*o)+a+e,-n*l,n*s,-n*(-l*a+s*o)+o+t,0,0,1)},scale:function(e,t)
{var r=this.elements;return r[0]*=e,r[3]*=e,r[6]*=e,r[1]*=t,r[4]*=t,r[7]*=t,this},rotate:function(e)
{var t=Math.cos(e),r=Math.sin(e),n=this.elements,i=n[0],a=n[3],o=n[6],s=n[1],l=n[4],c=n[7];return n[0]=t*i+r*s,n[3]=t*a+r*l,n[6]=t*o+r*c,n[1]=-r*i+t*s,n[4]=-r*a+t*l,n[7]=-r*o+t*c,this},translate:function(e,t)
{var r=this.elements;return r[0]+=e*r[2],r[3]+=e*r[5],r[6]+=e*r[8],r[1]+=t*r[2],r[4]+=t*r[5],r[7]+=t*r[8],this},equals:function(e)
{for(var t=this.elements,r=e.elements,n=0;n<9;n++)
if(t[n]!==r[n])return!1;return!0},fromArray:function(e,t)
{void 0===t&&(t=0);for(var r=0;r<9;r++)this.elements[r]=e[r+t];return this},toArray:function(e,t)
{void 0===e&&(e=[]),void 0===t&&(t=0);var r=this.elements;return e[t]=r[0],e[t+1]=r[1],e[t+2]=r[2],e[t+3]=r[3],e[t+4]=r[4],e[t+5]=r[5],e[t+6]=r[6],e[t+7]=r[7],e[t+8]=r[8],e}});var ImageUtils={getDataURL:function(e)
{var t;if("undefined"==typeof HTMLCanvasElement)return e.src;if(e instanceof HTMLCanvasElement)t=e;else{void 0===_canvas&&(_canvas=document.createElementNS("http://www.w3.org/1999/xhtml","canvas")),_canvas.width=e.width,_canvas.height=e.height;var r=_canvas.getContext("2d");e instanceof ImageData?r.putImageData(e,0,0):r.drawImage(e,0,0,e.width,e.height),t=_canvas}
return t.width>2048||t.height>2048?t.toDataURL("image/jpeg",.6):t.toDataURL("image/png")}},textureId=0;function Texture(e,t,r,n,i,a,o,s,l,c)
{Object.defineProperty(this,"id",{value:textureId++}),this.uuid=MathUtils.generateUUID(),this.name="",this.image=void 0!==e?e:Texture.DEFAULT_IMAGE,this.mipmaps=[],this.mapping=void 0!==t?t:Texture.DEFAULT_MAPPING,this.wrapS=void 0!==r?r:ClampToEdgeWrapping,this.wrapT=void 0!==n?n:ClampToEdgeWrapping,this.magFilter=void 0!==i?i:LinearFilter,this.minFilter=void 0!==a?a:LinearMipmapLinearFilter,this.anisotropy=void 0!==l?l:1,this.format=void 0!==o?o:RGBAFormat,this.internalFormat=null,this.type=void 0!==s?s:UnsignedByteType,this.offset=new Vector2(0,0),this.repeat=new Vector2(1,1),this.center=new Vector2(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Matrix3,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.encoding=void 0!==c?c:LinearEncoding,this.version=0,this.onUpdate=null}
function Vector4(e,t,r,n)
{this.x=e||0,this.y=t||0,this.z=r||0,this.w=void 0!==n?n:1}
function WebGLRenderTarget(e,t,r)
{this.width=e,this.height=t,this.scissor=new Vector4(0,0,e,t),this.scissorTest=!1,this.viewport=new Vector4(0,0,e,t),r=r||{},this.texture=new Texture(void 0,r.mapping,r.wrapS,r.wrapT,r.magFilter,r.minFilter,r.format,r.type,r.anisotropy,r.encoding),this.texture.image={},this.texture.image.width=e,this.texture.image.height=t,this.texture.generateMipmaps=void 0!==r.generateMipmaps&&r.generateMipmaps,this.texture.minFilter=void 0!==r.minFilter?r.minFilter:LinearFilter,this.depthBuffer=void 0===r.depthBuffer||r.depthBuffer,this.stencilBuffer=void 0===r.stencilBuffer||r.stencilBuffer,this.depthTexture=void 0!==r.depthTexture?r.depthTexture:null}
function WebGLMultisampleRenderTarget(e,t,r)
{WebGLRenderTarget.call(this,e,t,r),this.samples=4}
function Quaternion(e,t,r,n)
{this._x=e||0,this._y=t||0,this._z=r||0,this._w=void 0!==n?n:1}
Texture.DEFAULT_IMAGE=void 0,Texture.DEFAULT_MAPPING=UVMapping,Texture.prototype=Object.assign(Object.create(EventDispatcher.prototype),{constructor:Texture,isTexture:!0,updateMatrix:function()
{this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)},clone:function()
{return(new this.constructor).copy(this)},copy:function(e)
{return this.name=e.name,this.image=e.image,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.encoding=e.encoding,this},toJSON:function(e)
{var t=void 0===e||"string"==typeof e;if(!t&&void 0!==e.textures[this.uuid])return e.textures[this.uuid];var r={metadata:{version:4.5,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,mapping:this.mapping,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,type:this.type,encoding:this.encoding,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};if(void 0!==this.image)
{var n=this.image;if(void 0===n.uuid&&(n.uuid=MathUtils.generateUUID()),!t&&void 0===e.images[n.uuid])
{var i;if(Array.isArray(n))
{i=[];for(var a=0,o=n.length;a<o;a++)i.push(ImageUtils.getDataURL(n[a]))}
else i=ImageUtils.getDataURL(n);e.images[n.uuid]={uuid:n.uuid,url:i}}
r.image=n.uuid}
return t||(e.textures[this.uuid]=r),r},dispose:function()
{this.dispatchEvent({type:"dispose"})},transformUv:function(e)
{if(this.mapping!==UVMapping)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS)
{case RepeatWrapping:e.x=e.x-Math.floor(e.x);break;case ClampToEdgeWrapping:e.x=e.x<0?0:1;break;case MirroredRepeatWrapping:1===Math.abs(Math.floor(e.x)%2)?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x)}
if(e.y<0||e.y>1)switch(this.wrapT)
{case RepeatWrapping:e.y=e.y-Math.floor(e.y);break;case ClampToEdgeWrapping:e.y=e.y<0?0:1;break;case MirroredRepeatWrapping:1===Math.abs(Math.floor(e.y)%2)?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y)}
return this.flipY&&(e.y=1-e.y),e}}),Object.defineProperty(Texture.prototype,"needsUpdate",{set:function(e)
{!0===e&&this.version++}}),Object.defineProperties(Vector4.prototype,{width:{get:function()
{return this.z},set:function(e)
{this.z=e}},height:{get:function()
{return this.w},set:function(e)
{this.w=e}}}),Object.assign(Vector4.prototype,{isVector4:!0,set:function(e,t,r,n)
{return this.x=e,this.y=t,this.z=r,this.w=n,this},setScalar:function(e)
{return this.x=e,this.y=e,this.z=e,this.w=e,this},setX:function(e)
{return this.x=e,this},setY:function(e)
{return this.y=e,this},setZ:function(e)
{return this.z=e,this},setW:function(e)
{return this.w=e,this},setComponent:function(e,t)
{switch(e)
{case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}
return this},getComponent:function(e)
{switch(e)
{case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}},clone:function()
{return new this.constructor(this.x,this.y,this.z,this.w)},copy:function(e)
{return this.x=e.x,this.y=e.y,this.z=e.z,this.w=void 0!==e.w?e.w:1,this},add:function(e,t)
{return void 0!==t?(console.warn("THREE.Vector4: .add() now only accepts one argument. Use .addVectors( a, b ) instead."),this.addVectors(e,t)):(this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this)},addScalar:function(e)
{return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this},addVectors:function(e,t)
{return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this},addScaledVector:function(e,t)
{return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this},sub:function(e,t)
{return void 0!==t?(console.warn("THREE.Vector4: .sub() now only accepts one argument. Use .subVectors( a, b ) instead."),this.subVectors(e,t)):(this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this)},subScalar:function(e)
{return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this},subVectors:function(e,t)
{return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this},multiplyScalar:function(e)
{return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this},applyMatrix4:function(e)
{var t=this.x,r=this.y,n=this.z,i=this.w,a=e.elements;return this.x=a[0]*t+a[4]*r+a[8]*n+a[12]*i,this.y=a[1]*t+a[5]*r+a[9]*n+a[13]*i,this.z=a[2]*t+a[6]*r+a[10]*n+a[14]*i,this.w=a[3]*t+a[7]*r+a[11]*n+a[15]*i,this},divideScalar:function(e)
{return this.multiplyScalar(1/e)},setAxisAngleFromQuaternion:function(e)
{this.w=2*Math.acos(e.w);var t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this},setAxisAngleFromRotationMatrix:function(e)
{var t,r,n,i,a=e.elements,o=a[0],s=a[4],l=a[8],c=a[1],h=a[5],u=a[9],d=a[2],p=a[6],m=a[10];if(Math.abs(s-c)<.01&&Math.abs(l-d)<.01&&Math.abs(u-p)<.01)
{if(Math.abs(s+c)<.1&&Math.abs(l+d)<.1&&Math.abs(u+p)<.1&&Math.abs(o+h+m-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;var f=(o+1)/2,g=(h+1)/2,v=(m+1)/2,y=(s+c)/4,_=(l+d)/4,b=(u+p)/4;return f>g&&f>v?f<.01?(r=0,n=.707106781,i=.707106781):(n=y/(r=Math.sqrt(f)),i=_/r):g>v?g<.01?(r=.707106781,n=0,i=.707106781):(r=y/(n=Math.sqrt(g)),i=b/n):v<.01?(r=.707106781,n=.707106781,i=0):(r=_/(i=Math.sqrt(v)),n=b/i),this.set(r,n,i,t),this}
var x=Math.sqrt((p-u)*(p-u)+(l-d)*(l-d)+(c-s)*(c-s));return Math.abs(x)<.001&&(x=1),this.x=(p-u)/x,this.y=(l-d)/x,this.z=(c-s)/x,this.w=Math.acos((o+h+m-1)/2),this},min:function(e)
{return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this},max:function(e)
{return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this},clamp:function(e,t)
{return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this},clampScalar:function(e,t)
{return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this},clampLength:function(e,t)
{var r=this.length();return this.divideScalar(r||1).multiplyScalar(Math.max(e,Math.min(t,r)))},floor:function()
{return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this},ceil:function()
{return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this},round:function()
{return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this},roundToZero:function()
{return this.x=this.x<0?Math.ceil(this.x):Math.floor(this.x),this.y=this.y<0?Math.ceil(this.y):Math.floor(this.y),this.z=this.z<0?Math.ceil(this.z):Math.floor(this.z),this.w=this.w<0?Math.ceil(this.w):Math.floor(this.w),this},negate:function()
{return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this},dot:function(e)
{return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w},lengthSq:function()
{return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w},length:function()
{return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)},manhattanLength:function()
{return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)},normalize:function()
{return this.divideScalar(this.length()||1)},setLength:function(e)
{return this.normalize().multiplyScalar(e)},lerp:function(e,t)
{return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this},lerpVectors:function(e,t,r)
{return this.subVectors(t,e).multiplyScalar(r).add(e)},equals:function(e)
{return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w},fromArray:function(e,t)
{return void 0===t&&(t=0),this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this},toArray:function(e,t)
{return void 0===e&&(e=[]),void 0===t&&(t=0),e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e},fromBufferAttribute:function(e,t,r)
{return void 0!==r&&console.warn("THREE.Vector4: offset has been removed from .fromBufferAttribute()."),this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}}),WebGLRenderTarget.prototype=Object.assign(Object.create(EventDispatcher.prototype),{constructor:WebGLRenderTarget,isWebGLRenderTarget:!0,setSize:function(e,t)
{this.width===e&&this.height===t||(this.width=e,this.height=t,this.texture.image.width=e,this.texture.image.height=t,this.dispose()),this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)},clone:function()
{return(new this.constructor).copy(this)},copy:function(e)
{return this.width=e.width,this.height=e.height,this.viewport.copy(e.viewport),this.texture=e.texture.clone(),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.depthTexture=e.depthTexture,this},dispose:function()
{this.dispatchEvent({type:"dispose"})}}),WebGLMultisampleRenderTarget.prototype=Object.assign(Object.create(WebGLRenderTarget.prototype),{constructor:WebGLMultisampleRenderTarget,isWebGLMultisampleRenderTarget:!0,copy:function(e)
{return WebGLRenderTarget.prototype.copy.call(this,e),this.samples=e.samples,this}}),Object.assign(Quaternion,{slerp:function(e,t,r,n)
{return r.copy(e).slerp(t,n)},slerpFlat:function(e,t,r,n,i,a,o)
{var s=r[n+0],l=r[n+1],c=r[n+2],h=r[n+3],u=i[a+0],d=i[a+1],p=i[a+2],m=i[a+3];if(h!==m||s!==u||l!==d||c!==p)
{var f=1-o,g=s*u+l*d+c*p+h*m,v=g>=0?1:-1,y=1-g*g;if(y>Number.EPSILON)
{var _=Math.sqrt(y),b=Math.atan2(_,g*v);f=Math.sin(f*b)/_,o=Math.sin(o*b)/_}
var x=o*v;if(s=s*f+u*x,l=l*f+d*x,c=c*f+p*x,h=h*f+m*x,f===1-o)
{var M=1/Math.sqrt(s*s+l*l+c*c+h*h);s*=M,l*=M,c*=M,h*=M}}
e[t]=s,e[t+1]=l,e[t+2]=c,e[t+3]=h}}),Object.defineProperties(Quaternion.prototype,{x:{get:function()
{return this._x},set:function(e)
{this._x=e,this._onChangeCallback()}},y:{get:function()
{return this._y},set:function(e)
{this._y=e,this._onChangeCallback()}},z:{get:function()
{return this._z},set:function(e)
{this._z=e,this._onChangeCallback()}},w:{get:function()
{return this._w},set:function(e)
{this._w=e,this._onChangeCallback()}}}),Object.assign(Quaternion.prototype,{isQuaternion:!0,set:function(e,t,r,n)
{return this._x=e,this._y=t,this._z=r,this._w=n,this._onChangeCallback(),this},clone:function()
{return new this.constructor(this._x,this._y,this._z,this._w)},copy:function(e)
{return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this},setFromEuler:function(e,t)
{if(!e||!e.isEuler)throw new Error("THREE.Quaternion: .setFromEuler() now expects an Euler rotation rather than a Vector3 and order.");var r=e._x,n=e._y,i=e._z,a=e.order,o=Math.cos,s=Math.sin,l=o(r/2),c=o(n/2),h=o(i/2),u=s(r/2),d=s(n/2),p=s(i/2);return"XYZ"===a?(this._x=u*c*h+l*d*p,this._y=l*d*h-u*c*p,this._z=l*c*p+u*d*h,this._w=l*c*h-u*d*p):"YXZ"===a?(this._x=u*c*h+l*d*p,this._y=l*d*h-u*c*p,this._z=l*c*p-u*d*h,this._w=l*c*h+u*d*p):"ZXY"===a?(this._x=u*c*h-l*d*p,this._y=l*d*h+u*c*p,this._z=l*c*p+u*d*h,this._w=l*c*h-u*d*p):"ZYX"===a?(this._x=u*c*h-l*d*p,this._y=l*d*h+u*c*p,this._z=l*c*p-u*d*h,this._w=l*c*h+u*d*p):"YZX"===a?(this._x=u*c*h+l*d*p,this._y=l*d*h+u*c*p,this._z=l*c*p-u*d*h,this._w=l*c*h-u*d*p):"XZY"===a&&(this._x=u*c*h-l*d*p,this._y=l*d*h-u*c*p,this._z=l*c*p+u*d*h,this._w=l*c*h+u*d*p),!1!==t&&this._onChangeCallback(),this},setFromAxisAngle:function(e,t)
{var r=t/2,n=Math.sin(r);return this._x=e.x*n,this._y=e.y*n,this._z=e.z*n,this._w=Math.cos(r),this._onChangeCallback(),this},setFromRotationMatrix:function(e)
{var t,r=e.elements,n=r[0],i=r[4],a=r[8],o=r[1],s=r[5],l=r[9],c=r[2],h=r[6],u=r[10],d=n+s+u;return d>0?(t=.5/Math.sqrt(d+1),this._w=.25/t,this._x=(h-l)*t,this._y=(a-c)*t,this._z=(o-i)*t):n>s&&n>u?(t=2*Math.sqrt(1+n-s-u),this._w=(h-l)/t,this._x=.25*t,this._y=(i+o)/t,this._z=(a+c)/t):s>u?(t=2*Math.sqrt(1+s-n-u),this._w=(a-c)/t,this._x=(i+o)/t,this._y=.25*t,this._z=(l+h)/t):(t=2*Math.sqrt(1+u-n-s),this._w=(o-i)/t,this._x=(a+c)/t,this._y=(l+h)/t,this._z=.25*t),this._onChangeCallback(),this},setFromUnitVectors:function(e,t)
{var r=e.dot(t)+1;return r<1e-6?(r=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=r):(this._x=0,this._y=-e.z,this._z=e.y,this._w=r)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=r),this.normalize()},angleTo:function(e)
{return 2*Math.acos(Math.abs(MathUtils.clamp(this.dot(e),-1,1)))},rotateTowards:function(e,t)
{var r=this.angleTo(e);if(0===r)return this;var n=Math.min(1,t/r);return this.slerp(e,n),this},inverse:function()
{return this.conjugate()},conjugate:function()
{return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this},dot:function(e)
{return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w},lengthSq:function()
{return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w},length:function()
{return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)},normalize:function()
{var e=this.length();return 0===e?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this},multiply:function(e,t)
{return void 0!==t?(console.warn("THREE.Quaternion: .multiply() now only accepts one argument. Use .multiplyQuaternions( a, b ) instead."),this.multiplyQuaternions(e,t)):this.multiplyQuaternions(this,e)},premultiply:function(e)
{return this.multiplyQuaternions(e,this)},multiplyQuaternions:function(e,t)
{var r=e._x,n=e._y,i=e._z,a=e._w,o=t._x,s=t._y,l=t._z,c=t._w;return this._x=r*c+a*o+n*l-i*s,this._y=n*c+a*s+i*o-r*l,this._z=i*c+a*l+r*s-n*o,this._w=a*c-r*o-n*s-i*l,this._onChangeCallback(),this},slerp:function(e,t)
{if(0===t)return this;if(1===t)return this.copy(e);var r=this._x,n=this._y,i=this._z,a=this._w,o=a*e._w+r*e._x+n*e._y+i*e._z;if(o<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,o=-o):this.copy(e),o>=1)return this._w=a,this._x=r,this._y=n,this._z=i,this;var s=1-o*o;if(s<=Number.EPSILON)
{var l=1-t;return this._w=l*a+t*this._w,this._x=l*r+t*this._x,this._y=l*n+t*this._y,this._z=l*i+t*this._z,this.normalize(),this._onChangeCallback(),this}
var c=Math.sqrt(s),h=Math.atan2(c,o),u=Math.sin((1-t)*h)/c,d=Math.sin(t*h)/c;return this._w=a*u+this._w*d,this._x=r*u+this._x*d,this._y=n*u+this._y*d,this._z=i*u+this._z*d,this._onChangeCallback(),this},equals:function(e)
{return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w},fromArray:function(e,t)
{return void 0===t&&(t=0),this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this},toArray:function(e,t)
{return void 0===e&&(e=[]),void 0===t&&(t=0),e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e},_onChange:function(e)
{return this._onChangeCallback=e,this},_onChangeCallback:function(){}});var _vector=new Vector3,_quaternion=new Quaternion;function Vector3(e,t,r)
{this.x=e||0,this.y=t||0,this.z=r||0}
Object.assign(Vector3.prototype,{isVector3:!0,set:function(e,t,r)
{return this.x=e,this.y=t,this.z=r,this},setScalar:function(e)
{return this.x=e,this.y=e,this.z=e,this},setX:function(e)
{return this.x=e,this},setY:function(e)
{return this.y=e,this},setZ:function(e)
{return this.z=e,this},setComponent:function(e,t)
{switch(e)
{case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}
return this},getComponent:function(e)
{switch(e)
{case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}},clone:function()
{return new this.constructor(this.x,this.y,this.z)},copy:function(e)
{return this.x=e.x,this.y=e.y,this.z=e.z,this},add:function(e,t)
{return void 0!==t?(console.warn("THREE.Vector3: .add() now only accepts one argument. Use .addVectors( a, b ) instead."),this.addVectors(e,t)):(this.x+=e.x,this.y+=e.y,this.z+=e.z,this)},addScalar:function(e)
{return this.x+=e,this.y+=e,this.z+=e,this},addVectors:function(e,t)
{return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this},addScaledVector:function(e,t)
{return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this},sub:function(e,t)
{return void 0!==t?(console.warn("THREE.Vector3: .sub() now only accepts one argument. Use .subVectors( a, b ) instead."),this.subVectors(e,t)):(this.x-=e.x,this.y-=e.y,this.z-=e.z,this)},subScalar:function(e)
{return this.x-=e,this.y-=e,this.z-=e,this},subVectors:function(e,t)
{return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this},multiply:function(e,t)
{return void 0!==t?(console.warn("THREE.Vector3: .multiply() now only accepts one argument. Use .multiplyVectors( a, b ) instead."),this.multiplyVectors(e,t)):(this.x*=e.x,this.y*=e.y,this.z*=e.z,this)},multiplyScalar:function(e)
{return this.x*=e,this.y*=e,this.z*=e,this},multiplyVectors:function(e,t)
{return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this},applyEuler:function(e)
{return e&&e.isEuler||console.error("THREE.Vector3: .applyEuler() now expects an Euler rotation rather than a Vector3 and order."),this.applyQuaternion(_quaternion.setFromEuler(e))},applyAxisAngle:function(e,t)
{return this.applyQuaternion(_quaternion.setFromAxisAngle(e,t))},applyMatrix3:function(e)
{var t=this.x,r=this.y,n=this.z,i=e.elements;return this.x=i[0]*t+i[3]*r+i[6]*n,this.y=i[1]*t+i[4]*r+i[7]*n,this.z=i[2]*t+i[5]*r+i[8]*n,this},applyNormalMatrix:function(e)
{return this.applyMatrix3(e).normalize()},applyMatrix4:function(e)
{var t=this.x,r=this.y,n=this.z,i=e.elements,a=1/(i[3]*t+i[7]*r+i[11]*n+i[15]);return this.x=(i[0]*t+i[4]*r+i[8]*n+i[12])*a,this.y=(i[1]*t+i[5]*r+i[9]*n+i[13])*a,this.z=(i[2]*t+i[6]*r+i[10]*n+i[14])*a,this},applyQuaternion:function(e)
{var t=this.x,r=this.y,n=this.z,i=e.x,a=e.y,o=e.z,s=e.w,l=s*t+a*n-o*r,c=s*r+o*t-i*n,h=s*n+i*r-a*t,u=-i*t-a*r-o*n;return this.x=l*s+u*-i+c*-o-h*-a,this.y=c*s+u*-a+h*-i-l*-o,this.z=h*s+u*-o+l*-a-c*-i,this},project:function(e)
{return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)},unproject:function(e)
{return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)},transformDirection:function(e)
{var t=this.x,r=this.y,n=this.z,i=e.elements;return this.x=i[0]*t+i[4]*r+i[8]*n,this.y=i[1]*t+i[5]*r+i[9]*n,this.z=i[2]*t+i[6]*r+i[10]*n,this.normalize()},divide:function(e)
{return this.x/=e.x,this.y/=e.y,this.z/=e.z,this},divideScalar:function(e)
{return this.multiplyScalar(1/e)},min:function(e)
{return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this},max:function(e)
{return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this},clamp:function(e,t)
{return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this},clampScalar:function(e,t)
{return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this},clampLength:function(e,t)
{var r=this.length();return this.divideScalar(r||1).multiplyScalar(Math.max(e,Math.min(t,r)))},floor:function()
{return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this},ceil:function()
{return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this},round:function()
{return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this},roundToZero:function()
{return this.x=this.x<0?Math.ceil(this.x):Math.floor(this.x),this.y=this.y<0?Math.ceil(this.y):Math.floor(this.y),this.z=this.z<0?Math.ceil(this.z):Math.floor(this.z),this},negate:function()
{return this.x=-this.x,this.y=-this.y,this.z=-this.z,this},dot:function(e)
{return this.x*e.x+this.y*e.y+this.z*e.z},lengthSq:function()
{return this.x*this.x+this.y*this.y+this.z*this.z},length:function()
{return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)},manhattanLength:function()
{return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)},normalize:function()
{return this.divideScalar(this.length()||1)},setLength:function(e)
{return this.normalize().multiplyScalar(e)},lerp:function(e,t)
{return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this},lerpVectors:function(e,t,r)
{return this.subVectors(t,e).multiplyScalar(r).add(e)},cross:function(e,t)
{return void 0!==t?(console.warn("THREE.Vector3: .cross() now only accepts one argument. Use .crossVectors( a, b ) instead."),this.crossVectors(e,t)):this.crossVectors(this,e)},crossVectors:function(e,t)
{var r=e.x,n=e.y,i=e.z,a=t.x,o=t.y,s=t.z;return this.x=n*s-i*o,this.y=i*a-r*s,this.z=r*o-n*a,this},projectOnVector:function(e)
{var t=e.lengthSq();if(0===t)return this.set(0,0,0);var r=e.dot(this)/t;return this.copy(e).multiplyScalar(r)},projectOnPlane:function(e)
{return _vector.copy(this).projectOnVector(e),this.sub(_vector)},reflect:function(e)
{return this.sub(_vector.copy(e).multiplyScalar(2*this.dot(e)))},angleTo:function(e)
{var t=Math.sqrt(this.lengthSq()*e.lengthSq());if(0===t)return Math.PI/2;var r=this.dot(e)/t;return Math.acos(MathUtils.clamp(r,-1,1))},distanceTo:function(e)
{return Math.sqrt(this.distanceToSquared(e))},distanceToSquared:function(e)
{var t=this.x-e.x,r=this.y-e.y,n=this.z-e.z;return t*t+r*r+n*n},manhattanDistanceTo:function(e)
{return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)},setFromSpherical:function(e)
{return this.setFromSphericalCoords(e.radius,e.phi,e.theta)},setFromSphericalCoords:function(e,t,r)
{var n=Math.sin(t)*e;return this.x=n*Math.sin(r),this.y=Math.cos(t)*e,this.z=n*Math.cos(r),this},setFromCylindrical:function(e)
{return this.setFromCylindricalCoords(e.radius,e.theta,e.y)},setFromCylindricalCoords:function(e,t,r)
{return this.x=e*Math.sin(t),this.y=r,this.z=e*Math.cos(t),this},setFromMatrixPosition:function(e)
{var t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this},setFromMatrixScale:function(e)
{var t=this.setFromMatrixColumn(e,0).length(),r=this.setFromMatrixColumn(e,1).length(),n=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=r,this.z=n,this},setFromMatrixColumn:function(e,t)
{return this.fromArray(e.elements,4*t)},setFromMatrix3Column:function(e,t)
{return this.fromArray(e.elements,3*t)},equals:function(e)
{return e.x===this.x&&e.y===this.y&&e.z===this.z},fromArray:function(e,t)
{return void 0===t&&(t=0),this.x=e[t],this.y=e[t+1],this.z=e[t+2],this},toArray:function(e,t)
{return void 0===e&&(e=[]),void 0===t&&(t=0),e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e},fromBufferAttribute:function(e,t,r)
{return void 0!==r&&console.warn("THREE.Vector3: offset has been removed from .fromBufferAttribute()."),this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}});var _v1=new Vector3,_m1=new Matrix4,_zero=new Vector3(0,0,0),_one=new Vector3(1,1,1),_x=new Vector3,_y=new Vector3,_z=new Vector3;function Matrix4()
{this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],arguments.length>0&&console.error("THREE.Matrix4: the constructor no longer reads arguments. use .set() instead.")}
Object.assign(Matrix4.prototype,{isMatrix4:!0,set:function(e,t,r,n,i,a,o,s,l,c,h,u,d,p,m,f)
{var g=this.elements;return g[0]=e,g[4]=t,g[8]=r,g[12]=n,g[1]=i,g[5]=a,g[9]=o,g[13]=s,g[2]=l,g[6]=c,g[10]=h,g[14]=u,g[3]=d,g[7]=p,g[11]=m,g[15]=f,this},identity:function()
{return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this},clone:function()
{return(new Matrix4).fromArray(this.elements)},copy:function(e)
{var t=this.elements,r=e.elements;return t[0]=r[0],t[1]=r[1],t[2]=r[2],t[3]=r[3],t[4]=r[4],t[5]=r[5],t[6]=r[6],t[7]=r[7],t[8]=r[8],t[9]=r[9],t[10]=r[10],t[11]=r[11],t[12]=r[12],t[13]=r[13],t[14]=r[14],t[15]=r[15],this},copyPosition:function(e)
{var t=this.elements,r=e.elements;return t[12]=r[12],t[13]=r[13],t[14]=r[14],this},extractBasis:function(e,t,r)
{return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),r.setFromMatrixColumn(this,2),this},makeBasis:function(e,t,r)
{return this.set(e.x,t.x,r.x,0,e.y,t.y,r.y,0,e.z,t.z,r.z,0,0,0,0,1),this},extractRotation:function(e)
{var t=this.elements,r=e.elements,n=1/_v1.setFromMatrixColumn(e,0).length(),i=1/_v1.setFromMatrixColumn(e,1).length(),a=1/_v1.setFromMatrixColumn(e,2).length();return t[0]=r[0]*n,t[1]=r[1]*n,t[2]=r[2]*n,t[3]=0,t[4]=r[4]*i,t[5]=r[5]*i,t[6]=r[6]*i,t[7]=0,t[8]=r[8]*a,t[9]=r[9]*a,t[10]=r[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this},makeRotationFromEuler:function(e)
{e&&e.isEuler||console.error("THREE.Matrix4: .makeRotationFromEuler() now expects a Euler rotation rather than a Vector3 and order.");var t=this.elements,r=e.x,n=e.y,i=e.z,a=Math.cos(r),o=Math.sin(r),s=Math.cos(n),l=Math.sin(n),c=Math.cos(i),h=Math.sin(i);if("XYZ"===e.order)
{var u=a*c,d=a*h,p=o*c,m=o*h;t[0]=s*c,t[4]=-s*h,t[8]=l,t[1]=d+p*l,t[5]=u-m*l,t[9]=-o*s,t[2]=m-u*l,t[6]=p+d*l,t[10]=a*s}
else if("YXZ"===e.order)
{var f=s*c,g=s*h,v=l*c,y=l*h;t[0]=f+y*o,t[4]=v*o-g,t[8]=a*l,t[1]=a*h,t[5]=a*c,t[9]=-o,t[2]=g*o-v,t[6]=y+f*o,t[10]=a*s}
else if("ZXY"===e.order)
{f=s*c,g=s*h,v=l*c,y=l*h;t[0]=f-y*o,t[4]=-a*h,t[8]=v+g*o,t[1]=g+v*o,t[5]=a*c,t[9]=y-f*o,t[2]=-a*l,t[6]=o,t[10]=a*s}
else if("ZYX"===e.order)
{u=a*c,d=a*h,p=o*c,m=o*h;t[0]=s*c,t[4]=p*l-d,t[8]=u*l+m,t[1]=s*h,t[5]=m*l+u,t[9]=d*l-p,t[2]=-l,t[6]=o*s,t[10]=a*s}
else if("YZX"===e.order)
{var _=a*s,b=a*l,x=o*s,M=o*l;t[0]=s*c,t[4]=M-_*h,t[8]=x*h+b,t[1]=h,t[5]=a*c,t[9]=-o*c,t[2]=-l*c,t[6]=b*h+x,t[10]=_-M*h}
else if("XZY"===e.order)
{_=a*s,b=a*l,x=o*s,M=o*l;t[0]=s*c,t[4]=-h,t[8]=l*c,t[1]=_*h+M,t[5]=a*c,t[9]=b*h-x,t[2]=x*h-b,t[6]=o*c,t[10]=M*h+_}
return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this},makeRotationFromQuaternion:function(e)
{return this.compose(_zero,e,_one)},lookAt:function(e,t,r)
{var n=this.elements;return _z.subVectors(e,t),0===_z.lengthSq()&&(_z.z=1),_z.normalize(),_x.crossVectors(r,_z),0===_x.lengthSq()&&(1===Math.abs(r.z)?_z.x+=1e-4:_z.z+=1e-4,_z.normalize(),_x.crossVectors(r,_z)),_x.normalize(),_y.crossVectors(_z,_x),n[0]=_x.x,n[4]=_y.x,n[8]=_z.x,n[1]=_x.y,n[5]=_y.y,n[9]=_z.y,n[2]=_x.z,n[6]=_y.z,n[10]=_z.z,this},multiply:function(e,t)
{return void 0!==t?(console.warn("THREE.Matrix4: .multiply() now only accepts one argument. Use .multiplyMatrices( a, b ) instead."),this.multiplyMatrices(e,t)):this.multiplyMatrices(this,e)},premultiply:function(e)
{return this.multiplyMatrices(e,this)},multiplyMatrices:function(e,t)
{var r=e.elements,n=t.elements,i=this.elements,a=r[0],o=r[4],s=r[8],l=r[12],c=r[1],h=r[5],u=r[9],d=r[13],p=r[2],m=r[6],f=r[10],g=r[14],v=r[3],y=r[7],_=r[11],b=r[15],x=n[0],M=n[4],w=n[8],S=n[12],T=n[1],E=n[5],A=n[9],L=n[13],C=n[2],R=n[6],P=n[10],I=n[14],O=n[3],D=n[7],B=n[11],$=n[15];return i[0]=a*x+o*T+s*C+l*O,i[4]=a*M+o*E+s*R+l*D,i[8]=a*w+o*A+s*P+l*B,i[12]=a*S+o*L+s*I+l*$,i[1]=c*x+h*T+u*C+d*O,i[5]=c*M+h*E+u*R+d*D,i[9]=c*w+h*A+u*P+d*B,i[13]=c*S+h*L+u*I+d*$,i[2]=p*x+m*T+f*C+g*O,i[6]=p*M+m*E+f*R+g*D,i[10]=p*w+m*A+f*P+g*B,i[14]=p*S+m*L+f*I+g*$,i[3]=v*x+y*T+_*C+b*O,i[7]=v*M+y*E+_*R+b*D,i[11]=v*w+y*A+_*P+b*B,i[15]=v*S+y*L+_*I+b*$,this},multiplyScalar:function(e)
{var t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this},determinant:function()
{var e=this.elements,t=e[0],r=e[4],n=e[8],i=e[12],a=e[1],o=e[5],s=e[9],l=e[13],c=e[2],h=e[6],u=e[10],d=e[14];return e[3]*(+i*s*h-n*l*h-i*o*u+r*l*u+n*o*d-r*s*d)+e[7]*(+t*s*d-t*l*u+i*a*u-n*a*d+n*l*c-i*s*c)+e[11]*(+t*l*h-t*o*d-i*a*h+r*a*d+i*o*c-r*l*c)+e[15]*(-n*o*c-t*s*h+t*o*u+n*a*h-r*a*u+r*s*c)},transpose:function()
{var e,t=this.elements;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this},setPosition:function(e,t,r)
{var n=this.elements;return e.isVector3?(n[12]=e.x,n[13]=e.y,n[14]=e.z):(n[12]=e,n[13]=t,n[14]=r),this},getInverse:function(e,t)
{var r=this.elements,n=e.elements,i=n[0],a=n[1],o=n[2],s=n[3],l=n[4],c=n[5],h=n[6],u=n[7],d=n[8],p=n[9],m=n[10],f=n[11],g=n[12],v=n[13],y=n[14],_=n[15],b=p*y*u-v*m*u+v*h*f-c*y*f-p*h*_+c*m*_,x=g*m*u-d*y*u-g*h*f+l*y*f+d*h*_-l*m*_,M=d*v*u-g*p*u+g*c*f-l*v*f-d*c*_+l*p*_,w=g*p*h-d*v*h-g*c*m+l*v*m+d*c*y-l*p*y,S=i*b+a*x+o*M+s*w;if(0===S)
{var T="THREE.Matrix4: .getInverse() can't invert matrix, determinant is 0";if(!0===t)throw new Error(T);return console.warn(T),this.identity()}
var E=1/S;return r[0]=b*E,r[1]=(v*m*s-p*y*s-v*o*f+a*y*f+p*o*_-a*m*_)*E,r[2]=(c*y*s-v*h*s+v*o*u-a*y*u-c*o*_+a*h*_)*E,r[3]=(p*h*s-c*m*s-p*o*u+a*m*u+c*o*f-a*h*f)*E,r[4]=x*E,r[5]=(d*y*s-g*m*s+g*o*f-i*y*f-d*o*_+i*m*_)*E,r[6]=(g*h*s-l*y*s-g*o*u+i*y*u+l*o*_-i*h*_)*E,r[7]=(l*m*s-d*h*s+d*o*u-i*m*u-l*o*f+i*h*f)*E,r[8]=M*E,r[9]=(g*p*s-d*v*s-g*a*f+i*v*f+d*a*_-i*p*_)*E,r[10]=(l*v*s-g*c*s+g*a*u-i*v*u-l*a*_+i*c*_)*E,r[11]=(d*c*s-l*p*s-d*a*u+i*p*u+l*a*f-i*c*f)*E,r[12]=w*E,r[13]=(d*v*o-g*p*o+g*a*m-i*v*m-d*a*y+i*p*y)*E,r[14]=(g*c*o-l*v*o-g*a*h+i*v*h+l*a*y-i*c*y)*E,r[15]=(l*p*o-d*c*o+d*a*h-i*p*h-l*a*m+i*c*m)*E,this},scale:function(e)
{var t=this.elements,r=e.x,n=e.y,i=e.z;return t[0]*=r,t[4]*=n,t[8]*=i,t[1]*=r,t[5]*=n,t[9]*=i,t[2]*=r,t[6]*=n,t[10]*=i,t[3]*=r,t[7]*=n,t[11]*=i,this},getMaxScaleOnAxis:function()
{var e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],r=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],n=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,r,n))},makeTranslation:function(e,t,r)
{return this.set(1,0,0,e,0,1,0,t,0,0,1,r,0,0,0,1),this},makeRotationX:function(e)
{var t=Math.cos(e),r=Math.sin(e);return this.set(1,0,0,0,0,t,-r,0,0,r,t,0,0,0,0,1),this},makeRotationY:function(e)
{var t=Math.cos(e),r=Math.sin(e);return this.set(t,0,r,0,0,1,0,0,-r,0,t,0,0,0,0,1),this},makeRotationZ:function(e)
{var t=Math.cos(e),r=Math.sin(e);return this.set(t,-r,0,0,r,t,0,0,0,0,1,0,0,0,0,1),this},makeRotationAxis:function(e,t)
{var r=Math.cos(t),n=Math.sin(t),i=1-r,a=e.x,o=e.y,s=e.z,l=i*a,c=i*o;return this.set(l*a+r,l*o-n*s,l*s+n*o,0,l*o+n*s,c*o+r,c*s-n*a,0,l*s-n*o,c*s+n*a,i*s*s+r,0,0,0,0,1),this},makeScale:function(e,t,r)
{return this.set(e,0,0,0,0,t,0,0,0,0,r,0,0,0,0,1),this},makeShear:function(e,t,r)
{return this.set(1,t,r,0,e,1,r,0,e,t,1,0,0,0,0,1),this},compose:function(e,t,r)
{var n=this.elements,i=t._x,a=t._y,o=t._z,s=t._w,l=i+i,c=a+a,h=o+o,u=i*l,d=i*c,p=i*h,m=a*c,f=a*h,g=o*h,v=s*l,y=s*c,_=s*h,b=r.x,x=r.y,M=r.z;return n[0]=(1-(m+g))*b,n[1]=(d+_)*b,n[2]=(p-y)*b,n[3]=0,n[4]=(d-_)*x,n[5]=(1-(u+g))*x,n[6]=(f+v)*x,n[7]=0,n[8]=(p+y)*M,n[9]=(f-v)*M,n[10]=(1-(u+m))*M,n[11]=0,n[12]=e.x,n[13]=e.y,n[14]=e.z,n[15]=1,this},decompose:function(e,t,r)
{var n=this.elements,i=_v1.set(n[0],n[1],n[2]).length(),a=_v1.set(n[4],n[5],n[6]).length(),o=_v1.set(n[8],n[9],n[10]).length();this.determinant()<0&&(i=-i),e.x=n[12],e.y=n[13],e.z=n[14],_m1.copy(this);var s=1/i,l=1/a,c=1/o;return _m1.elements[0]*=s,_m1.elements[1]*=s,_m1.elements[2]*=s,_m1.elements[4]*=l,_m1.elements[5]*=l,_m1.elements[6]*=l,_m1.elements[8]*=c,_m1.elements[9]*=c,_m1.elements[10]*=c,t.setFromRotationMatrix(_m1),r.x=i,r.y=a,r.z=o,this},makePerspective:function(e,t,r,n,i,a)
{void 0===a&&console.warn("THREE.Matrix4: .makePerspective() has been redefined and has a new signature. Please check the docs.");var o=this.elements,s=2*i/(t-e),l=2*i/(r-n),c=(t+e)/(t-e),h=(r+n)/(r-n),u=-(a+i)/(a-i),d=-2*a*i/(a-i);return o[0]=s,o[4]=0,o[8]=c,o[12]=0,o[1]=0,o[5]=l,o[9]=h,o[13]=0,o[2]=0,o[6]=0,o[10]=u,o[14]=d,o[3]=0,o[7]=0,o[11]=-1,o[15]=0,this},makeOrthographic:function(e,t,r,n,i,a)
{var o=this.elements,s=1/(t-e),l=1/(r-n),c=1/(a-i),h=(t+e)*s,u=(r+n)*l,d=(a+i)*c;return o[0]=2*s,o[4]=0,o[8]=0,o[12]=-h,o[1]=0,o[5]=2*l,o[9]=0,o[13]=-u,o[2]=0,o[6]=0,o[10]=-2*c,o[14]=-d,o[3]=0,o[7]=0,o[11]=0,o[15]=1,this},equals:function(e)
{for(var t=this.elements,r=e.elements,n=0;n<16;n++)
if(t[n]!==r[n])return!1;return!0},fromArray:function(e,t)
{void 0===t&&(t=0);for(var r=0;r<16;r++)this.elements[r]=e[r+t];return this},toArray:function(e,t)
{void 0===e&&(e=[]),void 0===t&&(t=0);var r=this.elements;return e[t]=r[0],e[t+1]=r[1],e[t+2]=r[2],e[t+3]=r[3],e[t+4]=r[4],e[t+5]=r[5],e[t+6]=r[6],e[t+7]=r[7],e[t+8]=r[8],e[t+9]=r[9],e[t+10]=r[10],e[t+11]=r[11],e[t+12]=r[12],e[t+13]=r[13],e[t+14]=r[14],e[t+15]=r[15],e}});var _matrix=new Matrix4,_quaternion$1=new Quaternion;function Euler(e,t,r,n)
{this._x=e||0,this._y=t||0,this._z=r||0,this._order=n||Euler.DefaultOrder}
function Layers()
{this.mask=1}
Euler.RotationOrders=["XYZ","YZX","ZXY","XZY","YXZ","ZYX"],Euler.DefaultOrder="XYZ",Object.defineProperties(Euler.prototype,{x:{get:function()
{return this._x},set:function(e)
{this._x=e,this._onChangeCallback()}},y:{get:function()
{return this._y},set:function(e)
{this._y=e,this._onChangeCallback()}},z:{get:function()
{return this._z},set:function(e)
{this._z=e,this._onChangeCallback()}},order:{get:function()
{return this._order},set:function(e)
{this._order=e,this._onChangeCallback()}}}),Object.assign(Euler.prototype,{isEuler:!0,set:function(e,t,r,n)
{return this._x=e,this._y=t,this._z=r,this._order=n||this._order,this._onChangeCallback(),this},clone:function()
{return new this.constructor(this._x,this._y,this._z,this._order)},copy:function(e)
{return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this},setFromRotationMatrix:function(e,t,r)
{var n=MathUtils.clamp,i=e.elements,a=i[0],o=i[4],s=i[8],l=i[1],c=i[5],h=i[9],u=i[2],d=i[6],p=i[10];return"XYZ"===(t=t||this._order)?(this._y=Math.asin(n(s,-1,1)),Math.abs(s)<.9999999?(this._x=Math.atan2(-h,p),this._z=Math.atan2(-o,a)):(this._x=Math.atan2(d,c),this._z=0)):"YXZ"===t?(this._x=Math.asin(-n(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(s,p),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,a),this._z=0)):"ZXY"===t?(this._x=Math.asin(n(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,p),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,a))):"ZYX"===t?(this._y=Math.asin(-n(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,p),this._z=Math.atan2(l,a)):(this._x=0,this._z=Math.atan2(-o,c))):"YZX"===t?(this._z=Math.asin(n(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-u,a)):(this._x=0,this._y=Math.atan2(s,p))):"XZY"===t?(this._z=Math.asin(-n(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(s,a)):(this._x=Math.atan2(-h,p),this._y=0)):console.warn("THREE.Euler: .setFromRotationMatrix() given unsupported order: "+t),this._order=t,!1!==r&&this._onChangeCallback(),this},setFromQuaternion:function(e,t,r)
{return _matrix.makeRotationFromQuaternion(e),this.setFromRotationMatrix(_matrix,t,r)},setFromVector3:function(e,t)
{return this.set(e.x,e.y,e.z,t||this._order)},reorder:function(e)
{return _quaternion$1.setFromEuler(this),this.setFromQuaternion(_quaternion$1,e)},equals:function(e)
{return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order},fromArray:function(e)
{return this._x=e[0],this._y=e[1],this._z=e[2],void 0!==e[3]&&(this._order=e[3]),this._onChangeCallback(),this},toArray:function(e,t)
{return void 0===e&&(e=[]),void 0===t&&(t=0),e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e},toVector3:function(e)
{return e?e.set(this._x,this._y,this._z):new Vector3(this._x,this._y,this._z)},_onChange:function(e)
{return this._onChangeCallback=e,this},_onChangeCallback:function(){}}),Object.assign(Layers.prototype,{set:function(e)
{this.mask=1<<e|0},enable:function(e)
{this.mask|=1<<e|0},enableAll:function()
{this.mask=-1},toggle:function(e)
{this.mask^=1<<e|0},disable:function(e)
{this.mask&=~(1<<e|0)},disableAll:function()
{this.mask=0},test:function(e)
{return 0!=(this.mask&e.mask)}});var _object3DId=0,_v1$1=new Vector3,_q1=new Quaternion,_m1$1=new Matrix4,_target=new Vector3,_position=new Vector3,_scale=new Vector3,_quaternion$2=new Quaternion,_xAxis=new Vector3(1,0,0),_yAxis=new Vector3(0,1,0),_zAxis=new Vector3(0,0,1),_addedEvent={type:"added"},_removedEvent={type:"removed"};function Object3D()
{Object.defineProperty(this,"id",{value:_object3DId++}),this.uuid=MathUtils.generateUUID(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Object3D.DefaultUp.clone();var e=new Vector3,t=new Euler,r=new Quaternion,n=new Vector3(1,1,1);t._onChange(function()
{r.setFromEuler(t,!1)}),r._onChange(function()
{t.setFromQuaternion(r,void 0,!1)}),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:r},scale:{configurable:!0,enumerable:!0,value:n},modelViewMatrix:{value:new Matrix4},normalMatrix:{value:new Matrix3}}),this.matrix=new Matrix4,this.matrixWorld=new Matrix4,this.matrixAutoUpdate=Object3D.DefaultMatrixAutoUpdate,this.matrixWorldNeedsUpdate=!1,this.layers=new Layers,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.userData={}}
function Scene()
{Object3D.call(this),this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.overrideMaterial=null,this.autoUpdate=!0,"undefined"!=typeof __THREE_DEVTOOLS__&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}
Object3D.DefaultUp=new Vector3(0,1,0),Object3D.DefaultMatrixAutoUpdate=!0,Object3D.prototype=Object.assign(Object.create(EventDispatcher.prototype),{constructor:Object3D,isObject3D:!0,onBeforeRender:function(){},onAfterRender:function(){},applyMatrix4:function(e)
{this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)},applyQuaternion:function(e)
{return this.quaternion.premultiply(e),this},setRotationFromAxisAngle:function(e,t)
{this.quaternion.setFromAxisAngle(e,t)},setRotationFromEuler:function(e)
{this.quaternion.setFromEuler(e,!0)},setRotationFromMatrix:function(e)
{this.quaternion.setFromRotationMatrix(e)},setRotationFromQuaternion:function(e)
{this.quaternion.copy(e)},rotateOnAxis:function(e,t)
{return _q1.setFromAxisAngle(e,t),this.quaternion.multiply(_q1),this},rotateOnWorldAxis:function(e,t)
{return _q1.setFromAxisAngle(e,t),this.quaternion.premultiply(_q1),this},rotateX:function(e)
{return this.rotateOnAxis(_xAxis,e)},rotateY:function(e)
{return this.rotateOnAxis(_yAxis,e)},rotateZ:function(e)
{return this.rotateOnAxis(_zAxis,e)},translateOnAxis:function(e,t)
{return _v1$1.copy(e).applyQuaternion(this.quaternion),this.position.add(_v1$1.multiplyScalar(t)),this},translateX:function(e)
{return this.translateOnAxis(_xAxis,e)},translateY:function(e)
{return this.translateOnAxis(_yAxis,e)},translateZ:function(e)
{return this.translateOnAxis(_zAxis,e)},localToWorld:function(e)
{return e.applyMatrix4(this.matrixWorld)},worldToLocal:function(e)
{return e.applyMatrix4(_m1$1.getInverse(this.matrixWorld))},lookAt:function(e,t,r)
{e.isVector3?_target.copy(e):_target.set(e,t,r);var n=this.parent;this.updateWorldMatrix(!0,!1),_position.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?_m1$1.lookAt(_position,_target,this.up):_m1$1.lookAt(_target,_position,this.up),this.quaternion.setFromRotationMatrix(_m1$1),n&&(_m1$1.extractRotation(n.matrixWorld),_q1.setFromRotationMatrix(_m1$1),this.quaternion.premultiply(_q1.inverse()))},add:function(e)
{if(arguments.length>1)
{for(var t=0;t<arguments.length;t++)this.add(arguments[t]);return this}
return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(null!==e.parent&&e.parent.remove(e),e.parent=this,this.children.push(e),e.dispatchEvent(_addedEvent)):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)},remove:function(e)
{if(arguments.length>1)
{for(var t=0;t<arguments.length;t++)this.remove(arguments[t]);return this}
var r=this.children.indexOf(e);return-1!==r&&(e.parent=null,this.children.splice(r,1),e.dispatchEvent(_removedEvent)),this},attach:function(e)
{return this.updateWorldMatrix(!0,!1),_m1$1.getInverse(this.matrixWorld),null!==e.parent&&(e.parent.updateWorldMatrix(!0,!1),_m1$1.multiply(e.parent.matrixWorld)),e.applyMatrix4(_m1$1),e.updateWorldMatrix(!1,!1),this.add(e),this},getObjectById:function(e)
{return this.getObjectByProperty("id",e)},getObjectByName:function(e)
{return this.getObjectByProperty("name",e)},getObjectByProperty:function(e,t)
{if(this[e]===t)return this;for(var r=0,n=this.children.length;r<n;r++)
{var i=this.children[r].getObjectByProperty(e,t);if(void 0!==i)return i}},getWorldPosition:function(e)
{return void 0===e&&(console.warn("THREE.Object3D: .getWorldPosition() target is now required"),e=new Vector3),this.updateMatrixWorld(!0),e.setFromMatrixPosition(this.matrixWorld)},getWorldQuaternion:function(e)
{return void 0===e&&(console.warn("THREE.Object3D: .getWorldQuaternion() target is now required"),e=new Quaternion),this.updateMatrixWorld(!0),this.matrixWorld.decompose(_position,e,_scale),e},getWorldScale:function(e)
{return void 0===e&&(console.warn("THREE.Object3D: .getWorldScale() target is now required"),e=new Vector3),this.updateMatrixWorld(!0),this.matrixWorld.decompose(_position,_quaternion$2,e),e},getWorldDirection:function(e)
{void 0===e&&(console.warn("THREE.Object3D: .getWorldDirection() target is now required"),e=new Vector3),this.updateMatrixWorld(!0);var t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()},raycast:function(){},traverse:function(e)
{e(this);for(var t=this.children,r=0,n=t.length;r<n;r++)t[r].traverse(e)},traverseVisible:function(e)
{if(!1!==this.visible)
{e(this);for(var t=this.children,r=0,n=t.length;r<n;r++)t[r].traverseVisible(e)}},traverseAncestors:function(e)
{var t=this.parent;null!==t&&(e(t),t.traverseAncestors(e))},updateMatrix:function()
{this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0},updateMatrixWorld:function(e)
{this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(null===this.parent?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,e=!0);for(var t=this.children,r=0,n=t.length;r<n;r++)t[r].updateMatrixWorld(e)},updateWorldMatrix:function(e,t)
{var r=this.parent;if(!0===e&&null!==r&&r.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),null===this.parent?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),!0===t)
for(var n=this.children,i=0,a=n.length;i<a;i++)n[i].updateWorldMatrix(!1,!0)},toJSON:function(e)
{var t=void 0===e||"string"==typeof e,r={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{}},r.metadata={version:4.5,type:"Object",generator:"Object3D.toJSON"});var n={};function i(t,r)
{return void 0===t[r.uuid]&&(t[r.uuid]=r.toJSON(e)),r.uuid}
if(n.uuid=this.uuid,n.type=this.type,""!==this.name&&(n.name=this.name),!0===this.castShadow&&(n.castShadow=!0),!0===this.receiveShadow&&(n.receiveShadow=!0),!1===this.visible&&(n.visible=!1),!1===this.frustumCulled&&(n.frustumCulled=!1),0!==this.renderOrder&&(n.renderOrder=this.renderOrder),"{}"!==JSON.stringify(this.userData)&&(n.userData=this.userData),n.layers=this.layers.mask,n.matrix=this.matrix.toArray(),!1===this.matrixAutoUpdate&&(n.matrixAutoUpdate=!1),this.isInstancedMesh&&(n.type="InstancedMesh",n.count=this.count,n.instanceMatrix=this.instanceMatrix.toJSON()),this.isMesh||this.isLine||this.isPoints)
{n.geometry=i(e.geometries,this.geometry);var a=this.geometry.parameters;if(void 0!==a&&void 0!==a.shapes)
{var o=a.shapes;if(Array.isArray(o))
for(var s=0,l=o.length;s<l;s++)
{var c=o[s];i(e.shapes,c)}
else i(e.shapes,o)}}
if(void 0!==this.material)
if(Array.isArray(this.material))
{var h=[];for(s=0,l=this.material.length;s<l;s++)h.push(i(e.materials,this.material[s]));n.material=h}
else n.material=i(e.materials,this.material);if(this.children.length>0)
{n.children=[];for(s=0;s<this.children.length;s++)n.children.push(this.children[s].toJSON(e).object)}
if(t)
{var u=f(e.geometries),d=f(e.materials),p=f(e.textures),m=f(e.images);o=f(e.shapes);u.length>0&&(r.geometries=u),d.length>0&&(r.materials=d),p.length>0&&(r.textures=p),m.length>0&&(r.images=m),o.length>0&&(r.shapes=o)}
return r.object=n,r;function f(e)
{var t=[];for(var r in e)
{var n=e[r];delete n.metadata,t.push(n)}
return t}},clone:function(e)
{return(new this.constructor).copy(this,e)},copy:function(e,t)
{if(void 0===t&&(t=!0),this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.userData=JSON.parse(JSON.stringify(e.userData)),!0===t)
for(var r=0;r<e.children.length;r++)
{var n=e.children[r];this.add(n.clone())}
return this}}),Scene.prototype=Object.assign(Object.create(Object3D.prototype),{constructor:Scene,isScene:!0,copy:function(e,t)
{return Object3D.prototype.copy.call(this,e,t),null!==e.background&&(this.background=e.background.clone()),null!==e.environment&&(this.environment=e.environment.clone()),null!==e.fog&&(this.fog=e.fog.clone()),null!==e.overrideMaterial&&(this.overrideMaterial=e.overrideMaterial.clone()),this.autoUpdate=e.autoUpdate,this.matrixAutoUpdate=e.matrixAutoUpdate,this},toJSON:function(e)
{var t=Object3D.prototype.toJSON.call(this,e);return null!==this.background&&(t.object.background=this.background.toJSON(e)),null!==this.environment&&(t.object.environment=this.environment.toJSON(e)),null!==this.fog&&(t.object.fog=this.fog.toJSON()),t},dispose:function()
{this.dispatchEvent({type:"dispose"})}});var _points=[new Vector3,new Vector3,new Vector3,new Vector3,new Vector3,new Vector3,new Vector3,new Vector3],_vector$1=new Vector3,_box=new Box3,_v0=new Vector3,_v1$2=new Vector3,_v2=new Vector3,_f0=new Vector3,_f1=new Vector3,_f2=new Vector3,_center=new Vector3,_extents=new Vector3,_triangleNormal=new Vector3,_testAxis=new Vector3;function Box3(e,t)
{this.min=void 0!==e?e:new Vector3(1/0,1/0,1/0),this.max=void 0!==t?t:new Vector3(-1/0,-1/0,-1/0)}
function satForAxes(e,t,r,n,i)
{var a,o;for(a=0,o=e.length-3;a<=o;a+=3)
{_testAxis.fromArray(e,a);var s=i.x*Math.abs(_testAxis.x)+i.y*Math.abs(_testAxis.y)+i.z*Math.abs(_testAxis.z),l=t.dot(_testAxis),c=r.dot(_testAxis),h=n.dot(_testAxis);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>s)return!1}
return!0}
Object.assign(Box3.prototype,{isBox3:!0,set:function(e,t)
{return this.min.copy(e),this.max.copy(t),this},setFromArray:function(e)
{for(var t=1/0,r=1/0,n=1/0,i=-1/0,a=-1/0,o=-1/0,s=0,l=e.length;s<l;s+=3)
{var c=e[s],h=e[s+1],u=e[s+2];c<t&&(t=c),h<r&&(r=h),u<n&&(n=u),c>i&&(i=c),h>a&&(a=h),u>o&&(o=u)}
return this.min.set(t,r,n),this.max.set(i,a,o),this},setFromBufferAttribute:function(e)
{for(var t=1/0,r=1/0,n=1/0,i=-1/0,a=-1/0,o=-1/0,s=0,l=e.count;s<l;s++)
{var c=e.getX(s),h=e.getY(s),u=e.getZ(s);c<t&&(t=c),h<r&&(r=h),u<n&&(n=u),c>i&&(i=c),h>a&&(a=h),u>o&&(o=u)}
return this.min.set(t,r,n),this.max.set(i,a,o),this},setFromPoints:function(e)
{this.makeEmpty();for(var t=0,r=e.length;t<r;t++)this.expandByPoint(e[t]);return this},setFromCenterAndSize:function(e,t)
{var r=_vector$1.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(r),this.max.copy(e).add(r),this},setFromObject:function(e)
{return this.makeEmpty(),this.expandByObject(e)},clone:function()
{return(new this.constructor).copy(this)},copy:function(e)
{return this.min.copy(e.min),this.max.copy(e.max),this},makeEmpty:function()
{return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this},isEmpty:function()
{return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z},getCenter:function(e)
{return void 0===e&&(console.warn("THREE.Box3: .getCenter() target is now required"),e=new Vector3),this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)},getSize:function(e)
{return void 0===e&&(console.warn("THREE.Box3: .getSize() target is now required"),e=new Vector3),this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)},expandByPoint:function(e)
{return this.min.min(e),this.max.max(e),this},expandByVector:function(e)
{return this.min.sub(e),this.max.add(e),this},expandByScalar:function(e)
{return this.min.addScalar(-e),this.max.addScalar(e),this},expandByObject:function(e)
{e.updateWorldMatrix(!1,!1);var t=e.geometry;void 0!==t&&(null===t.boundingBox&&t.computeBoundingBox(),_box.copy(t.boundingBox),_box.applyMatrix4(e.matrixWorld),this.expandByPoint(_box.min),this.expandByPoint(_box.max));for(var r=e.children,n=0,i=r.length;n<i;n++)this.expandByObject(r[n]);return this},containsPoint:function(e)
{return!(e.x<this.min.x||e.x>this.max.x||e.y<this.min.y||e.y>this.max.y||e.z<this.min.z||e.z>this.max.z)},containsBox:function(e)
{return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z},getParameter:function(e,t)
{return void 0===t&&(console.warn("THREE.Box3: .getParameter() target is now required"),t=new Vector3),t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))},intersectsBox:function(e)
{return!(e.max.x<this.min.x||e.min.x>this.max.x||e.max.y<this.min.y||e.min.y>this.max.y||e.max.z<this.min.z||e.min.z>this.max.z)},intersectsSphere:function(e)
{return this.clampPoint(e.center,_vector$1),_vector$1.distanceToSquared(e.center)<=e.radius*e.radius},intersectsPlane:function(e)
{var t,r;return e.normal.x>0?(t=e.normal.x*this.min.x,r=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,r=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,r+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,r+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,r+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,r+=e.normal.z*this.min.z),t<=-e.constant&&r>=-e.constant},intersectsTriangle:function(e)
{if(this.isEmpty())return!1;this.getCenter(_center),_extents.subVectors(this.max,_center),_v0.subVectors(e.a,_center),_v1$2.subVectors(e.b,_center),_v2.subVectors(e.c,_center),_f0.subVectors(_v1$2,_v0),_f1.subVectors(_v2,_v1$2),_f2.subVectors(_v0,_v2);var t=[0,-_f0.z,_f0.y,0,-_f1.z,_f1.y,0,-_f2.z,_f2.y,_f0.z,0,-_f0.x,_f1.z,0,-_f1.x,_f2.z,0,-_f2.x,-_f0.y,_f0.x,0,-_f1.y,_f1.x,0,-_f2.y,_f2.x,0];return!!satForAxes(t,_v0,_v1$2,_v2,_extents)&&(!!satForAxes(t=[1,0,0,0,1,0,0,0,1],_v0,_v1$2,_v2,_extents)&&(_triangleNormal.crossVectors(_f0,_f1),satForAxes(t=[_triangleNormal.x,_triangleNormal.y,_triangleNormal.z],_v0,_v1$2,_v2,_extents)))},clampPoint:function(e,t)
{return void 0===t&&(console.warn("THREE.Box3: .clampPoint() target is now required"),t=new Vector3),t.copy(e).clamp(this.min,this.max)},distanceToPoint:function(e)
{return _vector$1.copy(e).clamp(this.min,this.max).sub(e).length()},getBoundingSphere:function(e)
{return void 0===e&&console.error("THREE.Box3: .getBoundingSphere() target is now required"),this.getCenter(e.center),e.radius=.5*this.getSize(_vector$1).length(),e},intersect:function(e)
{return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this},union:function(e)
{return this.min.min(e.min),this.max.max(e.max),this},applyMatrix4:function(e)
{return this.isEmpty()?this:(_points[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),_points[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),_points[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),_points[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),_points[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),_points[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),_points[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),_points[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(_points),this)},translate:function(e)
{return this.min.add(e),this.max.add(e),this},equals:function(e)
{return e.min.equals(this.min)&&e.max.equals(this.max)}});var _box$1=new Box3;function Sphere(e,t)
{this.center=void 0!==e?e:new Vector3,this.radius=void 0!==t?t:0}
Object.assign(Sphere.prototype,{set:function(e,t)
{return this.center.copy(e),this.radius=t,this},setFromPoints:function(e,t)
{var r=this.center;void 0!==t?r.copy(t):_box$1.setFromPoints(e).getCenter(r);for(var n=0,i=0,a=e.length;i<a;i++)n=Math.max(n,r.distanceToSquared(e[i]));return this.radius=Math.sqrt(n),this},clone:function()
{return(new this.constructor).copy(this)},copy:function(e)
{return this.center.copy(e.center),this.radius=e.radius,this},empty:function()
{return this.radius<=0},containsPoint:function(e)
{return e.distanceToSquared(this.center)<=this.radius*this.radius},distanceToPoint:function(e)
{return e.distanceTo(this.center)-this.radius},intersectsSphere:function(e)
{var t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t},intersectsBox:function(e)
{return e.intersectsSphere(this)},intersectsPlane:function(e)
{return Math.abs(e.distanceToPoint(this.center))<=this.radius},clampPoint:function(e,t)
{var r=this.center.distanceToSquared(e);return void 0===t&&(console.warn("THREE.Sphere: .clampPoint() target is now required"),t=new Vector3),t.copy(e),r>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t},getBoundingBox:function(e)
{return void 0===e&&(console.warn("THREE.Sphere: .getBoundingBox() target is now required"),e=new Box3),e.set(this.center,this.center),e.expandByScalar(this.radius),e},applyMatrix4:function(e)
{return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this},translate:function(e)
{return this.center.add(e),this},equals:function(e)
{return e.center.equals(this.center)&&e.radius===this.radius}});var _vector$2=new Vector3,_segCenter=new Vector3,_segDir=new Vector3,_diff=new Vector3,_edge1=new Vector3,_edge2=new Vector3,_normal=new Vector3;function Ray(e,t)
{this.origin=void 0!==e?e:new Vector3,this.direction=void 0!==t?t:new Vector3(0,0,-1)}
Object.assign(Ray.prototype,{set:function(e,t)
{return this.origin.copy(e),this.direction.copy(t),this},clone:function()
{return(new this.constructor).copy(this)},copy:function(e)
{return this.origin.copy(e.origin),this.direction.copy(e.direction),this},at:function(e,t)
{return void 0===t&&(console.warn("THREE.Ray: .at() target is now required"),t=new Vector3),t.copy(this.direction).multiplyScalar(e).add(this.origin)},lookAt:function(e)
{return this.direction.copy(e).sub(this.origin).normalize(),this},recast:function(e)
{return this.origin.copy(this.at(e,_vector$2)),this},closestPointToPoint:function(e,t)
{void 0===t&&(console.warn("THREE.Ray: .closestPointToPoint() target is now required"),t=new Vector3),t.subVectors(e,this.origin);var r=t.dot(this.direction);return r<0?t.copy(this.origin):t.copy(this.direction).multiplyScalar(r).add(this.origin)},distanceToPoint:function(e)
{return Math.sqrt(this.distanceSqToPoint(e))},distanceSqToPoint:function(e)
{var t=_vector$2.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(_vector$2.copy(this.direction).multiplyScalar(t).add(this.origin),_vector$2.distanceToSquared(e))},distanceSqToSegment:function(e,t,r,n)
{_segCenter.copy(e).add(t).multiplyScalar(.5),_segDir.copy(t).sub(e).normalize(),_diff.copy(this.origin).sub(_segCenter);var i,a,o,s,l=.5*e.distanceTo(t),c=-this.direction.dot(_segDir),h=_diff.dot(this.direction),u=-_diff.dot(_segDir),d=_diff.lengthSq(),p=Math.abs(1-c*c);if(p>0)
if(a=c*h-u,s=l*p,(i=c*u-h)>=0)
if(a>=-s)
if(a<=s)
{var m=1/p;o=(i*=m)*(i+c*(a*=m)+2*h)+a*(c*i+a+2*u)+d}
else a=l,o=-(i=Math.max(0,-(c*a+h)))*i+a*(a+2*u)+d;else a=-l,o=-(i=Math.max(0,-(c*a+h)))*i+a*(a+2*u)+d;else a<=-s?o=-(i=Math.max(0,-(-c*l+h)))*i+(a=i>0?-l:Math.min(Math.max(-l,-u),l))*(a+2*u)+d:a<=s?(i=0,o=(a=Math.min(Math.max(-l,-u),l))*(a+2*u)+d):o=-(i=Math.max(0,-(c*l+h)))*i+(a=i>0?l:Math.min(Math.max(-l,-u),l))*(a+2*u)+d;else a=c>0?-l:l,o=-(i=Math.max(0,-(c*a+h)))*i+a*(a+2*u)+d;return r&&r.copy(this.direction).multiplyScalar(i).add(this.origin),n&&n.copy(_segDir).multiplyScalar(a).add(_segCenter),o},intersectSphere:function(e,t)
{_vector$2.subVectors(e.center,this.origin);var r=_vector$2.dot(this.direction),n=_vector$2.dot(_vector$2)-r*r,i=e.radius*e.radius;if(n>i)return null;var a=Math.sqrt(i-n),o=r-a,s=r+a;return o<0&&s<0?null:o<0?this.at(s,t):this.at(o,t)},intersectsSphere:function(e)
{return this.distanceSqToPoint(e.center)<=e.radius*e.radius},distanceToPlane:function(e)
{var t=e.normal.dot(this.direction);if(0===t)return 0===e.distanceToPoint(this.origin)?0:null;var r=-(this.origin.dot(e.normal)+e.constant)/t;return r>=0?r:null},intersectPlane:function(e,t)
{var r=this.distanceToPlane(e);return null===r?null:this.at(r,t)},intersectsPlane:function(e)
{var t=e.distanceToPoint(this.origin);return 0===t||e.normal.dot(this.direction)*t<0},intersectBox:function(e,t)
{var r,n,i,a,o,s,l=1/this.direction.x,c=1/this.direction.y,h=1/this.direction.z,u=this.origin;return l>=0?(r=(e.min.x-u.x)*l,n=(e.max.x-u.x)*l):(r=(e.max.x-u.x)*l,n=(e.min.x-u.x)*l),c>=0?(i=(e.min.y-u.y)*c,a=(e.max.y-u.y)*c):(i=(e.max.y-u.y)*c,a=(e.min.y-u.y)*c),r>a||i>n?null:((i>r||r!=r)&&(r=i),(a<n||n!=n)&&(n=a),h>=0?(o=(e.min.z-u.z)*h,s=(e.max.z-u.z)*h):(o=(e.max.z-u.z)*h,s=(e.min.z-u.z)*h),r>s||o>n?null:((o>r||r!=r)&&(r=o),(s<n||n!=n)&&(n=s),n<0?null:this.at(r>=0?r:n,t)))},intersectsBox:function(e)
{return null!==this.intersectBox(e,_vector$2)},intersectTriangle:function(e,t,r,n,i)
{_edge1.subVectors(t,e),_edge2.subVectors(r,e),_normal.crossVectors(_edge1,_edge2);var a,o=this.direction.dot(_normal);if(o>0)
{if(n)return null;a=1}
else{if(!(o<0))return null;a=-1,o=-o}
_diff.subVectors(this.origin,e);var s=a*this.direction.dot(_edge2.crossVectors(_diff,_edge2));if(s<0)return null;var l=a*this.direction.dot(_edge1.cross(_diff));if(l<0)return null;if(s+l>o)return null;var c=-a*_diff.dot(_normal);return c<0?null:this.at(c/o,i)},applyMatrix4:function(e)
{return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this},equals:function(e)
{return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}});var _vector1=new Vector3,_vector2=new Vector3,_normalMatrix=new Matrix3;function Plane(e,t)
{this.normal=void 0!==e?e:new Vector3(1,0,0),this.constant=void 0!==t?t:0}
Object.assign(Plane.prototype,{isPlane:!0,set:function(e,t)
{return this.normal.copy(e),this.constant=t,this},setComponents:function(e,t,r,n)
{return this.normal.set(e,t,r),this.constant=n,this},setFromNormalAndCoplanarPoint:function(e,t)
{return this.normal.copy(e),this.constant=-t.dot(this.normal),this},setFromCoplanarPoints:function(e,t,r)
{var n=_vector1.subVectors(r,t).cross(_vector2.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(n,e),this},clone:function()
{return(new this.constructor).copy(this)},copy:function(e)
{return this.normal.copy(e.normal),this.constant=e.constant,this},normalize:function()
{var e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this},negate:function()
{return this.constant*=-1,this.normal.negate(),this},distanceToPoint:function(e)
{return this.normal.dot(e)+this.constant},distanceToSphere:function(e)
{return this.distanceToPoint(e.center)-e.radius},projectPoint:function(e,t)
{return void 0===t&&(console.warn("THREE.Plane: .projectPoint() target is now required"),t=new Vector3),t.copy(this.normal).multiplyScalar(-this.distanceToPoint(e)).add(e)},intersectLine:function(e,t)
{void 0===t&&(console.warn("THREE.Plane: .intersectLine() target is now required"),t=new Vector3);var r=e.delta(_vector1),n=this.normal.dot(r);if(0===n)return 0===this.distanceToPoint(e.start)?t.copy(e.start):void 0;var i=-(e.start.dot(this.normal)+this.constant)/n;return i<0||i>1?void 0:t.copy(r).multiplyScalar(i).add(e.start)},intersectsLine:function(e)
{var t=this.distanceToPoint(e.start),r=this.distanceToPoint(e.end);return t<0&&r>0||r<0&&t>0},intersectsBox:function(e)
{return e.intersectsPlane(this)},intersectsSphere:function(e)
{return e.intersectsPlane(this)},coplanarPoint:function(e)
{return void 0===e&&(console.warn("THREE.Plane: .coplanarPoint() target is now required"),e=new Vector3),e.copy(this.normal).multiplyScalar(-this.constant)},applyMatrix4:function(e,t)
{var r=t||_normalMatrix.getNormalMatrix(e),n=this.coplanarPoint(_vector1).applyMatrix4(e),i=this.normal.applyMatrix3(r).normalize();return this.constant=-n.dot(i),this},translate:function(e)
{return this.constant-=e.dot(this.normal),this},equals:function(e)
{return e.normal.equals(this.normal)&&e.constant===this.constant}});var _v0$1=new Vector3,_v1$3=new Vector3,_v2$1=new Vector3,_v3=new Vector3,_vab=new Vector3,_vac=new Vector3,_vbc=new Vector3,_vap=new Vector3,_vbp=new Vector3,_vcp=new Vector3;function Triangle(e,t,r)
{this.a=void 0!==e?e:new Vector3,this.b=void 0!==t?t:new Vector3,this.c=void 0!==r?r:new Vector3}
Object.assign(Triangle,{getNormal:function(e,t,r,n)
{void 0===n&&(console.warn("THREE.Triangle: .getNormal() target is now required"),n=new Vector3),n.subVectors(r,t),_v0$1.subVectors(e,t),n.cross(_v0$1);var i=n.lengthSq();return i>0?n.multiplyScalar(1/Math.sqrt(i)):n.set(0,0,0)},getBarycoord:function(e,t,r,n,i)
{_v0$1.subVectors(n,t),_v1$3.subVectors(r,t),_v2$1.subVectors(e,t);var a=_v0$1.dot(_v0$1),o=_v0$1.dot(_v1$3),s=_v0$1.dot(_v2$1),l=_v1$3.dot(_v1$3),c=_v1$3.dot(_v2$1),h=a*l-o*o;if(void 0===i&&(console.warn("THREE.Triangle: .getBarycoord() target is now required"),i=new Vector3),0===h)return i.set(-2,-1,-1);var u=1/h,d=(l*s-o*c)*u,p=(a*c-o*s)*u;return i.set(1-d-p,p,d)},containsPoint:function(e,t,r,n)
{return Triangle.getBarycoord(e,t,r,n,_v3),_v3.x>=0&&_v3.y>=0&&_v3.x+_v3.y<=1},getUV:function(e,t,r,n,i,a,o,s)
{return this.getBarycoord(e,t,r,n,_v3),s.set(0,0),s.addScaledVector(i,_v3.x),s.addScaledVector(a,_v3.y),s.addScaledVector(o,_v3.z),s},isFrontFacing:function(e,t,r,n)
{return _v0$1.subVectors(r,t),_v1$3.subVectors(e,t),_v0$1.cross(_v1$3).dot(n)<0}}),Object.assign(Triangle.prototype,{set:function(e,t,r)
{return this.a.copy(e),this.b.copy(t),this.c.copy(r),this},setFromPointsAndIndices:function(e,t,r,n)
{return this.a.copy(e[t]),this.b.copy(e[r]),this.c.copy(e[n]),this},clone:function()
{return(new this.constructor).copy(this)},copy:function(e)
{return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this},getArea:function()
{return _v0$1.subVectors(this.c,this.b),_v1$3.subVectors(this.a,this.b),.5*_v0$1.cross(_v1$3).length()},getMidpoint:function(e)
{return void 0===e&&(console.warn("THREE.Triangle: .getMidpoint() target is now required"),e=new Vector3),e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)},getNormal:function(e)
{return Triangle.getNormal(this.a,this.b,this.c,e)},getPlane:function(e)
{return void 0===e&&(console.warn("THREE.Triangle: .getPlane() target is now required"),e=new Plane),e.setFromCoplanarPoints(this.a,this.b,this.c)},getBarycoord:function(e,t)
{return Triangle.getBarycoord(e,this.a,this.b,this.c,t)},getUV:function(e,t,r,n,i)
{return Triangle.getUV(e,this.a,this.b,this.c,t,r,n,i)},containsPoint:function(e)
{return Triangle.containsPoint(e,this.a,this.b,this.c)},isFrontFacing:function(e)
{return Triangle.isFrontFacing(this.a,this.b,this.c,e)},intersectsBox:function(e)
{return e.intersectsTriangle(this)},closestPointToPoint:function(e,t)
{void 0===t&&(console.warn("THREE.Triangle: .closestPointToPoint() target is now required"),t=new Vector3);var r,n,i=this.a,a=this.b,o=this.c;_vab.subVectors(a,i),_vac.subVectors(o,i),_vap.subVectors(e,i);var s=_vab.dot(_vap),l=_vac.dot(_vap);if(s<=0&&l<=0)return t.copy(i);_vbp.subVectors(e,a);var c=_vab.dot(_vbp),h=_vac.dot(_vbp);if(c>=0&&h<=c)return t.copy(a);var u=s*h-c*l;if(u<=0&&s>=0&&c<=0)return r=s/(s-c),t.copy(i).addScaledVector(_vab,r);_vcp.subVectors(e,o);var d=_vab.dot(_vcp),p=_vac.dot(_vcp);if(p>=0&&d<=p)return t.copy(o);var m=d*l-s*p;if(m<=0&&l>=0&&p<=0)return n=l/(l-p),t.copy(i).addScaledVector(_vac,n);var f=c*p-d*h;if(f<=0&&h-c>=0&&d-p>=0)return _vbc.subVectors(o,a),n=(h-c)/(h-c+(d-p)),t.copy(a).addScaledVector(_vbc,n);var g=1/(f+m+u);return r=m*g,n=u*g,t.copy(i).addScaledVector(_vab,r).addScaledVector(_vac,n)},equals:function(e)
{return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}});var _colorKeywords={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},_hslA={h:0,s:0,l:0},_hslB={h:0,s:0,l:0};function Color(e,t,r)
{return void 0===t&&void 0===r?this.set(e):this.setRGB(e,t,r)}
function hue2rgb(e,t,r)
{return r<0&&(r+=1),r>1&&(r-=1),r<1/6?e+6*(t-e)*r:r<.5?t:r<2/3?e+6*(t-e)*(2/3-r):e}
function SRGBToLinear(e)
{return e<.04045?.0773993808*e:Math.pow(.9478672986*e+.0521327014,2.4)}
function LinearToSRGB(e)
{return e<.0031308?12.92*e:1.055*Math.pow(e,.41666)-.055}
function Face3(e,t,r,n,i,a)
{this.a=e,this.b=t,this.c=r,this.normal=n&&n.isVector3?n:new Vector3,this.vertexNormals=Array.isArray(n)?n:[],this.color=i&&i.isColor?i:new Color,this.vertexColors=Array.isArray(i)?i:[],this.materialIndex=void 0!==a?a:0}
Object.assign(Color.prototype,{isColor:!0,r:1,g:1,b:1,set:function(e)
{return e&&e.isColor?this.copy(e):"number"==typeof e?this.setHex(e):"string"==typeof e&&this.setStyle(e),this},setScalar:function(e)
{return this.r=e,this.g=e,this.b=e,this},setHex:function(e)
{return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(255&e)/255,this},setRGB:function(e,t,r)
{return this.r=e,this.g=t,this.b=r,this},setHSL:function(e,t,r)
{if(e=MathUtils.euclideanModulo(e,1),t=MathUtils.clamp(t,0,1),r=MathUtils.clamp(r,0,1),0===t)this.r=this.g=this.b=r;else{var n=r<=.5?r*(1+t):r+t-r*t,i=2*r-n;this.r=hue2rgb(i,n,e+1/3),this.g=hue2rgb(i,n,e),this.b=hue2rgb(i,n,e-1/3)}
return this},setStyle:function(e)
{function t(t)
{void 0!==t&&parseFloat(t)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}
var r;if(r=/^((?:rgb|hsl)a?)\(\s*([^\)]*)\)/.exec(e))
{var n,i=r[1],a=r[2];switch(i)
{case "rgb":case "rgba":if(n=/^(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(,\s*([0-9]*\.?[0-9]+)\s*)?$/.exec(a))return this.r=Math.min(255,parseInt(n[1],10))/255,this.g=Math.min(255,parseInt(n[2],10))/255,this.b=Math.min(255,parseInt(n[3],10))/255,t(n[5]),this;if(n=/^(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(,\s*([0-9]*\.?[0-9]+)\s*)?$/.exec(a))return this.r=Math.min(100,parseInt(n[1],10))/100,this.g=Math.min(100,parseInt(n[2],10))/100,this.b=Math.min(100,parseInt(n[3],10))/100,t(n[5]),this;break;case "hsl":case "hsla":if(n=/^([0-9]*\.?[0-9]+)\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(,\s*([0-9]*\.?[0-9]+)\s*)?$/.exec(a))
{var o=parseFloat(n[1])/360,s=parseInt(n[2],10)/100,l=parseInt(n[3],10)/100;return t(n[5]),this.setHSL(o,s,l)}}}
else if(r=/^\#([A-Fa-f0-9]+)$/.exec(e))
{var c=r[1],h=c.length;if(3===h)return this.r=parseInt(c.charAt(0)+c.charAt(0),16)/255,this.g=parseInt(c.charAt(1)+c.charAt(1),16)/255,this.b=parseInt(c.charAt(2)+c.charAt(2),16)/255,this;if(6===h)return this.r=parseInt(c.charAt(0)+c.charAt(1),16)/255,this.g=parseInt(c.charAt(2)+c.charAt(3),16)/255,this.b=parseInt(c.charAt(4)+c.charAt(5),16)/255,this}
return e&&e.length>0?this.setColorName(e):this},setColorName:function(e)
{var t=_colorKeywords[e];return void 0!==t?this.setHex(t):console.warn("THREE.Color: Unknown color "+e),this},clone:function()
{return new this.constructor(this.r,this.g,this.b)},copy:function(e)
{return this.r=e.r,this.g=e.g,this.b=e.b,this},copyGammaToLinear:function(e,t)
{return void 0===t&&(t=2),this.r=Math.pow(e.r,t),this.g=Math.pow(e.g,t),this.b=Math.pow(e.b,t),this},copyLinearToGamma:function(e,t)
{void 0===t&&(t=2);var r=t>0?1/t:1;return this.r=Math.pow(e.r,r),this.g=Math.pow(e.g,r),this.b=Math.pow(e.b,r),this},convertGammaToLinear:function(e)
{return this.copyGammaToLinear(this,e),this},convertLinearToGamma:function(e)
{return this.copyLinearToGamma(this,e),this},copySRGBToLinear:function(e)
{return this.r=SRGBToLinear(e.r),this.g=SRGBToLinear(e.g),this.b=SRGBToLinear(e.b),this},copyLinearToSRGB:function(e)
{return this.r=LinearToSRGB(e.r),this.g=LinearToSRGB(e.g),this.b=LinearToSRGB(e.b),this},convertSRGBToLinear:function()
{return this.copySRGBToLinear(this),this},convertLinearToSRGB:function()
{return this.copyLinearToSRGB(this),this},getHex:function()
{return 255*this.r<<16^255*this.g<<8^255*this.b<<0},getHexString:function()
{return("000000"+this.getHex().toString(16)).slice(-6)},getHSL:function(e)
{void 0===e&&(console.warn("THREE.Color: .getHSL() target is now required"),e={h:0,s:0,l:0});var t,r,n=this.r,i=this.g,a=this.b,o=Math.max(n,i,a),s=Math.min(n,i,a),l=(s+o)/2;if(s===o)t=0,r=0;else{var c=o-s;switch(r=l<=.5?c/(o+s):c/(2-o-s),o)
{case n:t=(i-a)/c+(i<a?6:0);break;case i:t=(a-n)/c+2;break;case a:t=(n-i)/c+4}
t/=6}
return e.h=t,e.s=r,e.l=l,e},getStyle:function()
{return"rgb("+(255*this.r|0)+","+(255*this.g|0)+","+(255*this.b|0)+")"},offsetHSL:function(e,t,r)
{return this.getHSL(_hslA),_hslA.h+=e,_hslA.s+=t,_hslA.l+=r,this.setHSL(_hslA.h,_hslA.s,_hslA.l),this},add:function(e)
{return this.r+=e.r,this.g+=e.g,this.b+=e.b,this},addColors:function(e,t)
{return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this},addScalar:function(e)
{return this.r+=e,this.g+=e,this.b+=e,this},sub:function(e)
{return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this},multiply:function(e)
{return this.r*=e.r,this.g*=e.g,this.b*=e.b,this},multiplyScalar:function(e)
{return this.r*=e,this.g*=e,this.b*=e,this},lerp:function(e,t)
{return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this},lerpHSL:function(e,t)
{this.getHSL(_hslA),e.getHSL(_hslB);var r=MathUtils.lerp(_hslA.h,_hslB.h,t),n=MathUtils.lerp(_hslA.s,_hslB.s,t),i=MathUtils.lerp(_hslA.l,_hslB.l,t);return this.setHSL(r,n,i),this},equals:function(e)
{return e.r===this.r&&e.g===this.g&&e.b===this.b},fromArray:function(e,t)
{return void 0===t&&(t=0),this.r=e[t],this.g=e[t+1],this.b=e[t+2],this},toArray:function(e,t)
{return void 0===e&&(e=[]),void 0===t&&(t=0),e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e},toJSON:function()
{return this.getHex()}}),Color.NAMES=_colorKeywords,Object.assign(Face3.prototype,{clone:function()
{return(new this.constructor).copy(this)},copy:function(e)
{this.a=e.a,this.b=e.b,this.c=e.c,this.normal.copy(e.normal),this.color.copy(e.color),this.materialIndex=e.materialIndex;for(var t=0,r=e.vertexNormals.length;t<r;t++)this.vertexNormals[t]=e.vertexNormals[t].clone();for(t=0,r=e.vertexColors.length;t<r;t++)this.vertexColors[t]=e.vertexColors[t].clone();return this}});var materialId=0;function Material()
{Object.defineProperty(this,"id",{value:materialId++}),this.uuid=MathUtils.generateUUID(),this.name="",this.type="Material",this.fog=!0,this.blending=NormalBlending,this.side=FrontSide,this.flatShading=!1,this.vertexTangents=!1,this.vertexColors=NoColors,this.opacity=1,this.transparent=!1,this.blendSrc=SrcAlphaFactor,this.blendDst=OneMinusSrcAlphaFactor,this.blendEquation=AddEquation,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.depthFunc=LessEqualDepth,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=AlwaysStencilFunc,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=KeepStencilOp,this.stencilZFail=KeepStencilOp,this.stencilZPass=KeepStencilOp,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaTest=0,this.premultipliedAlpha=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0}
function MeshBasicMaterial(e)
{Material.call(this),this.type="MeshBasicMaterial",this.color=new Color(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=MultiplyOperation,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.skinning=!1,this.morphTargets=!1,this.setValues(e)}
Material.prototype=Object.assign(Object.create(EventDispatcher.prototype),{constructor:Material,isMaterial:!0,onBeforeCompile:function(){},setValues:function(e)
{if(void 0!==e)
for(var t in e)
{var r=e[t];if(void 0!==r)
if("shading"!==t)
{var n=this[t];void 0!==n?n&&n.isColor?n.set(r):n&&n.isVector3&&r&&r.isVector3?n.copy(r):this[t]=r:console.warn("THREE."+this.type+": '"+t+"' is not a property of this material.")}
else console.warn("THREE."+this.type+": .shading has been removed. Use the boolean .flatShading instead."),this.flatShading=r===FlatShading;else console.warn("THREE.Material: '"+t+"' parameter is undefined.")}},toJSON:function(e)
{var t=void 0===e||"string"==typeof e;t&&(e={textures:{},images:{}});var r={metadata:{version:4.5,type:"Material",generator:"Material.toJSON"}};function n(e)
{var t=[];for(var r in e)
{var n=e[r];delete n.metadata,t.push(n)}
return t}
if(r.uuid=this.uuid,r.type=this.type,""!==this.name&&(r.name=this.name),this.color&&this.color.isColor&&(r.color=this.color.getHex()),void 0!==this.roughness&&(r.roughness=this.roughness),void 0!==this.metalness&&(r.metalness=this.metalness),this.sheen&&this.sheen.isColor&&(r.sheen=this.sheen.getHex()),this.emissive&&this.emissive.isColor&&(r.emissive=this.emissive.getHex()),this.emissiveIntensity&&1!==this.emissiveIntensity&&(r.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(r.specular=this.specular.getHex()),void 0!==this.shininess&&(r.shininess=this.shininess),void 0!==this.clearcoat&&(r.clearcoat=this.clearcoat),void 0!==this.clearcoatRoughness&&(r.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(r.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,r.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.map&&this.map.isTexture&&(r.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(r.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(r.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(r.lightMap=this.lightMap.toJSON(e).uuid),this.aoMap&&this.aoMap.isTexture&&(r.aoMap=this.aoMap.toJSON(e).uuid,r.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(r.bumpMap=this.bumpMap.toJSON(e).uuid,r.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(r.normalMap=this.normalMap.toJSON(e).uuid,r.normalMapType=this.normalMapType,r.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(r.displacementMap=this.displacementMap.toJSON(e).uuid,r.displacementScale=this.displacementScale,r.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(r.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(r.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(r.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(r.specularMap=this.specularMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(r.envMap=this.envMap.toJSON(e).uuid,r.reflectivity=this.reflectivity,r.refractionRatio=this.refractionRatio,void 0!==this.combine&&(r.combine=this.combine),void 0!==this.envMapIntensity&&(r.envMapIntensity=this.envMapIntensity)),this.gradientMap&&this.gradientMap.isTexture&&(r.gradientMap=this.gradientMap.toJSON(e).uuid),void 0!==this.size&&(r.size=this.size),void 0!==this.sizeAttenuation&&(r.sizeAttenuation=this.sizeAttenuation),this.blending!==NormalBlending&&(r.blending=this.blending),!0===this.flatShading&&(r.flatShading=this.flatShading),this.side!==FrontSide&&(r.side=this.side),this.vertexColors!==NoColors&&(r.vertexColors=this.vertexColors),this.opacity<1&&(r.opacity=this.opacity),!0===this.transparent&&(r.transparent=this.transparent),r.depthFunc=this.depthFunc,r.depthTest=this.depthTest,r.depthWrite=this.depthWrite,r.stencilWrite=this.stencilWrite,r.stencilWriteMask=this.stencilWriteMask,r.stencilFunc=this.stencilFunc,r.stencilRef=this.stencilRef,r.stencilFuncMask=this.stencilFuncMask,r.stencilFail=this.stencilFail,r.stencilZFail=this.stencilZFail,r.stencilZPass=this.stencilZPass,this.rotation&&0!==this.rotation&&(r.rotation=this.rotation),!0===this.polygonOffset&&(r.polygonOffset=!0),0!==this.polygonOffsetFactor&&(r.polygonOffsetFactor=this.polygonOffsetFactor),0!==this.polygonOffsetUnits&&(r.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth&&1!==this.linewidth&&(r.linewidth=this.linewidth),void 0!==this.dashSize&&(r.dashSize=this.dashSize),void 0!==this.gapSize&&(r.gapSize=this.gapSize),void 0!==this.scale&&(r.scale=this.scale),!0===this.dithering&&(r.dithering=!0),this.alphaTest>0&&(r.alphaTest=this.alphaTest),!0===this.premultipliedAlpha&&(r.premultipliedAlpha=this.premultipliedAlpha),!0===this.wireframe&&(r.wireframe=this.wireframe),this.wireframeLinewidth>1&&(r.wireframeLinewidth=this.wireframeLinewidth),"round"!==this.wireframeLinecap&&(r.wireframeLinecap=this.wireframeLinecap),"round"!==this.wireframeLinejoin&&(r.wireframeLinejoin=this.wireframeLinejoin),!0===this.morphTargets&&(r.morphTargets=!0),!0===this.morphNormals&&(r.morphNormals=!0),!0===this.skinning&&(r.skinning=!0),!1===this.visible&&(r.visible=!1),!1===this.toneMapped&&(r.toneMapped=!1),"{}"!==JSON.stringify(this.userData)&&(r.userData=this.userData),t)
{var i=n(e.textures),a=n(e.images);i.length>0&&(r.textures=i),a.length>0&&(r.images=a)}
return r},clone:function()
{return(new this.constructor).copy(this)},copy:function(e)
{this.name=e.name,this.fog=e.fog,this.blending=e.blending,this.side=e.side,this.flatShading=e.flatShading,this.vertexTangents=e.vertexTangents,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;var t=e.clippingPlanes,r=null;if(null!==t)
{var n=t.length;r=new Array(n);for(var i=0;i!==n;++i)r[i]=t[i].clone()}
return this.clippingPlanes=r,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.premultipliedAlpha=e.premultipliedAlpha,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this},dispose:function()
{this.dispatchEvent({type:"dispose"})}}),Object.defineProperty(Material.prototype,"needsUpdate",{set:function(e)
{!0===e&&this.version++}}),MeshBasicMaterial.prototype=Object.create(Material.prototype),MeshBasicMaterial.prototype.constructor=MeshBasicMaterial,MeshBasicMaterial.prototype.isMeshBasicMaterial=!0,MeshBasicMaterial.prototype.copy=function(e)
{return Material.prototype.copy.call(this,e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.skinning=e.skinning,this.morphTargets=e.morphTargets,this};var _vector$3=new Vector3;function BufferAttribute(e,t,r)
{if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.name="",this.array=e,this.itemSize=t,this.count=void 0!==e?e.length/t:0,this.normalized=!0===r,this.usage=StaticDrawUsage,this.updateRange={offset:0,count:-1},this.version=0}
function Int8BufferAttribute(e,t,r)
{BufferAttribute.call(this,new Int8Array(e),t,r)}
function Uint8BufferAttribute(e,t,r)
{BufferAttribute.call(this,new Uint8Array(e),t,r)}
function Uint8ClampedBufferAttribute(e,t,r)
{BufferAttribute.call(this,new Uint8ClampedArray(e),t,r)}
function Int16BufferAttribute(e,t,r)
{BufferAttribute.call(this,new Int16Array(e),t,r)}
function Uint16BufferAttribute(e,t,r)
{BufferAttribute.call(this,new Uint16Array(e),t,r)}
function Int32BufferAttribute(e,t,r)
{BufferAttribute.call(this,new Int32Array(e),t,r)}
function Uint32BufferAttribute(e,t,r)
{BufferAttribute.call(this,new Uint32Array(e),t,r)}
function Float32BufferAttribute(e,t,r)
{BufferAttribute.call(this,new Float32Array(e),t,r)}
function Float64BufferAttribute(e,t,r)
{BufferAttribute.call(this,new Float64Array(e),t,r)}
function DirectGeometry()
{this.vertices=[],this.normals=[],this.colors=[],this.uvs=[],this.uvs2=[],this.groups=[],this.morphTargets={},this.skinWeights=[],this.skinIndices=[],this.boundingBox=null,this.boundingSphere=null,this.verticesNeedUpdate=!1,this.normalsNeedUpdate=!1,this.colorsNeedUpdate=!1,this.uvsNeedUpdate=!1,this.groupsNeedUpdate=!1}
function arrayMax(e)
{if(0===e.length)return-1/0;for(var t=e[0],r=1,n=e.length;r<n;++r)e[r]>t&&(t=e[r]);return t}
Object.defineProperty(BufferAttribute.prototype,"needsUpdate",{set:function(e)
{!0===e&&this.version++}}),Object.assign(BufferAttribute.prototype,{isBufferAttribute:!0,onUploadCallback:function(){},setUsage:function(e)
{return this.usage=e,this},copy:function(e)
{return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this},copyAt:function(e,t,r)
{e*=this.itemSize,r*=t.itemSize;for(var n=0,i=this.itemSize;n<i;n++)this.array[e+n]=t.array[r+n];return this},copyArray:function(e)
{return this.array.set(e),this},copyColorsArray:function(e)
{for(var t=this.array,r=0,n=0,i=e.length;n<i;n++)
{var a=e[n];void 0===a&&(console.warn("THREE.BufferAttribute.copyColorsArray(): color is undefined",n),a=new Color),t[r++]=a.r,t[r++]=a.g,t[r++]=a.b}
return this},copyVector2sArray:function(e)
{for(var t=this.array,r=0,n=0,i=e.length;n<i;n++)
{var a=e[n];void 0===a&&(console.warn("THREE.BufferAttribute.copyVector2sArray(): vector is undefined",n),a=new Vector2),t[r++]=a.x,t[r++]=a.y}
return this},copyVector3sArray:function(e)
{for(var t=this.array,r=0,n=0,i=e.length;n<i;n++)
{var a=e[n];void 0===a&&(console.warn("THREE.BufferAttribute.copyVector3sArray(): vector is undefined",n),a=new Vector3),t[r++]=a.x,t[r++]=a.y,t[r++]=a.z}
return this},copyVector4sArray:function(e)
{for(var t=this.array,r=0,n=0,i=e.length;n<i;n++)
{var a=e[n];void 0===a&&(console.warn("THREE.BufferAttribute.copyVector4sArray(): vector is undefined",n),a=new Vector4),t[r++]=a.x,t[r++]=a.y,t[r++]=a.z,t[r++]=a.w}
return this},applyMatrix3:function(e)
{for(var t=0,r=this.count;t<r;t++)_vector$3.x=this.getX(t),_vector$3.y=this.getY(t),_vector$3.z=this.getZ(t),_vector$3.applyMatrix3(e),this.setXYZ(t,_vector$3.x,_vector$3.y,_vector$3.z);return this},applyMatrix4:function(e)
{for(var t=0,r=this.count;t<r;t++)_vector$3.x=this.getX(t),_vector$3.y=this.getY(t),_vector$3.z=this.getZ(t),_vector$3.applyMatrix4(e),this.setXYZ(t,_vector$3.x,_vector$3.y,_vector$3.z);return this},applyNormalMatrix:function(e)
{for(var t=0,r=this.count;t<r;t++)_vector$3.x=this.getX(t),_vector$3.y=this.getY(t),_vector$3.z=this.getZ(t),_vector$3.applyNormalMatrix(e),this.setXYZ(t,_vector$3.x,_vector$3.y,_vector$3.z);return this},transformDirection:function(e)
{for(var t=0,r=this.count;t<r;t++)_vector$3.x=this.getX(t),_vector$3.y=this.getY(t),_vector$3.z=this.getZ(t),_vector$3.transformDirection(e),this.setXYZ(t,_vector$3.x,_vector$3.y,_vector$3.z);return this},set:function(e,t)
{return void 0===t&&(t=0),this.array.set(e,t),this},getX:function(e)
{return this.array[e*this.itemSize]},setX:function(e,t)
{return this.array[e*this.itemSize]=t,this},getY:function(e)
{return this.array[e*this.itemSize+1]},setY:function(e,t)
{return this.array[e*this.itemSize+1]=t,this},getZ:function(e)
{return this.array[e*this.itemSize+2]},setZ:function(e,t)
{return this.array[e*this.itemSize+2]=t,this},getW:function(e)
{return this.array[e*this.itemSize+3]},setW:function(e,t)
{return this.array[e*this.itemSize+3]=t,this},setXY:function(e,t,r)
{return e*=this.itemSize,this.array[e+0]=t,this.array[e+1]=r,this},setXYZ:function(e,t,r,n)
{return e*=this.itemSize,this.array[e+0]=t,this.array[e+1]=r,this.array[e+2]=n,this},setXYZW:function(e,t,r,n,i)
{return e*=this.itemSize,this.array[e+0]=t,this.array[e+1]=r,this.array[e+2]=n,this.array[e+3]=i,this},onUpload:function(e)
{return this.onUploadCallback=e,this},clone:function()
{return new this.constructor(this.array,this.itemSize).copy(this)},toJSON:function()
{return{itemSize:this.itemSize,type:this.array.constructor.name,array:Array.prototype.slice.call(this.array),normalized:this.normalized}}}),Int8BufferAttribute.prototype=Object.create(BufferAttribute.prototype),Int8BufferAttribute.prototype.constructor=Int8BufferAttribute,Uint8BufferAttribute.prototype=Object.create(BufferAttribute.prototype),Uint8BufferAttribute.prototype.constructor=Uint8BufferAttribute,Uint8ClampedBufferAttribute.prototype=Object.create(BufferAttribute.prototype),Uint8ClampedBufferAttribute.prototype.constructor=Uint8ClampedBufferAttribute,Int16BufferAttribute.prototype=Object.create(BufferAttribute.prototype),Int16BufferAttribute.prototype.constructor=Int16BufferAttribute,Uint16BufferAttribute.prototype=Object.create(BufferAttribute.prototype),Uint16BufferAttribute.prototype.constructor=Uint16BufferAttribute,Int32BufferAttribute.prototype=Object.create(BufferAttribute.prototype),Int32BufferAttribute.prototype.constructor=Int32BufferAttribute,Uint32BufferAttribute.prototype=Object.create(BufferAttribute.prototype),Uint32BufferAttribute.prototype.constructor=Uint32BufferAttribute,Float32BufferAttribute.prototype=Object.create(BufferAttribute.prototype),Float32BufferAttribute.prototype.constructor=Float32BufferAttribute,Float64BufferAttribute.prototype=Object.create(BufferAttribute.prototype),Float64BufferAttribute.prototype.constructor=Float64BufferAttribute,Object.assign(DirectGeometry.prototype,{computeGroups:function(e)
{for(var t,r=[],n=void 0,i=e.faces,a=0;a<i.length;a++)
{var o=i[a];o.materialIndex!==n&&(n=o.materialIndex,void 0!==t&&(t.count=3*a-t.start,r.push(t)),t={start:3*a,materialIndex:n})}
void 0!==t&&(t.count=3*a-t.start,r.push(t)),this.groups=r},fromGeometry:function(e)
{var t,r=e.faces,n=e.vertices,i=e.faceVertexUvs,a=i[0]&&i[0].length>0,o=i[1]&&i[1].length>0,s=e.morphTargets,l=s.length;if(l>0)
{t=[];for(var c=0;c<l;c++)t[c]={name:s[c].name,data:[]};this.morphTargets.position=t}
var h,u=e.morphNormals,d=u.length;if(d>0)
{h=[];for(c=0;c<d;c++)h[c]={name:u[c].name,data:[]};this.morphTargets.normal=h}
var p=e.skinIndices,m=e.skinWeights,f=p.length===n.length,g=m.length===n.length;n.length>0&&0===r.length&&console.error("THREE.DirectGeometry: Faceless geometries are not supported.");for(c=0;c<r.length;c++)
{var v=r[c];this.vertices.push(n[v.a],n[v.b],n[v.c]);var y=v.vertexNormals;if(3===y.length)this.normals.push(y[0],y[1],y[2]);else{var _=v.normal;this.normals.push(_,_,_)}
var b,x=v.vertexColors;if(3===x.length)this.colors.push(x[0],x[1],x[2]);else{var M=v.color;this.colors.push(M,M,M)}
if(!0===a)void 0!==(b=i[0][c])?this.uvs.push(b[0],b[1],b[2]):(console.warn("THREE.DirectGeometry.fromGeometry(): Undefined vertexUv ",c),this.uvs.push(new Vector2,new Vector2,new Vector2));if(!0===o)void 0!==(b=i[1][c])?this.uvs2.push(b[0],b[1],b[2]):(console.warn("THREE.DirectGeometry.fromGeometry(): Undefined vertexUv2 ",c),this.uvs2.push(new Vector2,new Vector2,new Vector2));for(var w=0;w<l;w++)
{var S=s[w].vertices;t[w].data.push(S[v.a],S[v.b],S[v.c])}
for(w=0;w<d;w++)
{var T=u[w].vertexNormals[c];h[w].data.push(T.a,T.b,T.c)}
f&&this.skinIndices.push(p[v.a],p[v.b],p[v.c]),g&&this.skinWeights.push(m[v.a],m[v.b],m[v.c])}
return this.computeGroups(e),this.verticesNeedUpdate=e.verticesNeedUpdate,this.normalsNeedUpdate=e.normalsNeedUpdate,this.colorsNeedUpdate=e.colorsNeedUpdate,this.uvsNeedUpdate=e.uvsNeedUpdate,this.groupsNeedUpdate=e.groupsNeedUpdate,null!==e.boundingSphere&&(this.boundingSphere=e.boundingSphere.clone()),null!==e.boundingBox&&(this.boundingBox=e.boundingBox.clone()),this}});var _bufferGeometryId=1,_m1$2=new Matrix4,_obj=new Object3D,_offset=new Vector3,_box$2=new Box3,_boxMorphTargets=new Box3,_vector$4=new Vector3;function BufferGeometry()
{Object.defineProperty(this,"id",{value:_bufferGeometryId+=2}),this.uuid=MathUtils.generateUUID(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}
BufferGeometry.prototype=Object.assign(Object.create(EventDispatcher.prototype),{constructor:BufferGeometry,isBufferGeometry:!0,getIndex:function()
{return this.index},setIndex:function(e)
{Array.isArray(e)?this.index=new(arrayMax(e)>65535?Uint32BufferAttribute:Uint16BufferAttribute)(e,1):this.index=e},getAttribute:function(e)
{return this.attributes[e]},setAttribute:function(e,t)
{return this.attributes[e]=t,this},deleteAttribute:function(e)
{return delete this.attributes[e],this},addGroup:function(e,t,r)
{this.groups.push({start:e,count:t,materialIndex:void 0!==r?r:0})},clearGroups:function()
{this.groups=[]},setDrawRange:function(e,t)
{this.drawRange.start=e,this.drawRange.count=t},applyMatrix4:function(e)
{var t=this.attributes.position;void 0!==t&&(t.applyMatrix4(e),t.needsUpdate=!0);var r=this.attributes.normal;if(void 0!==r)
{var n=(new Matrix3).getNormalMatrix(e);r.applyNormalMatrix(n),r.needsUpdate=!0}
var i=this.attributes.tangent;return void 0!==i&&(i.transformDirection(e),i.needsUpdate=!0),null!==this.boundingBox&&this.computeBoundingBox(),null!==this.boundingSphere&&this.computeBoundingSphere(),this},rotateX:function(e)
{return _m1$2.makeRotationX(e),this.applyMatrix4(_m1$2),this},rotateY:function(e)
{return _m1$2.makeRotationY(e),this.applyMatrix4(_m1$2),this},rotateZ:function(e)
{return _m1$2.makeRotationZ(e),this.applyMatrix4(_m1$2),this},translate:function(e,t,r)
{return _m1$2.makeTranslation(e,t,r),this.applyMatrix4(_m1$2),this},scale:function(e,t,r)
{return _m1$2.makeScale(e,t,r),this.applyMatrix4(_m1$2),this},lookAt:function(e)
{return _obj.lookAt(e),_obj.updateMatrix(),this.applyMatrix4(_obj.matrix),this},center:function()
{return this.computeBoundingBox(),this.boundingBox.getCenter(_offset).negate(),this.translate(_offset.x,_offset.y,_offset.z),this},setFromObject:function(e)
{var t=e.geometry;if(e.isPoints||e.isLine)
{var r=new Float32BufferAttribute(3*t.vertices.length,3),n=new Float32BufferAttribute(3*t.colors.length,3);if(this.setAttribute("position",r.copyVector3sArray(t.vertices)),this.setAttribute("color",n.copyColorsArray(t.colors)),t.lineDistances&&t.lineDistances.length===t.vertices.length)
{var i=new Float32BufferAttribute(t.lineDistances.length,1);this.setAttribute("lineDistance",i.copyArray(t.lineDistances))}
null!==t.boundingSphere&&(this.boundingSphere=t.boundingSphere.clone()),null!==t.boundingBox&&(this.boundingBox=t.boundingBox.clone())}
else e.isMesh&&t&&t.isGeometry&&this.fromGeometry(t);return this},setFromPoints:function(e)
{for(var t=[],r=0,n=e.length;r<n;r++)
{var i=e[r];t.push(i.x,i.y,i.z||0)}
return this.setAttribute("position",new Float32BufferAttribute(t,3)),this},updateFromObject:function(e)
{var t,r=e.geometry;if(e.isMesh)
{var n=r.__directGeometry;if(!0===r.elementsNeedUpdate&&(n=void 0,r.elementsNeedUpdate=!1),void 0===n)return this.fromGeometry(r);n.verticesNeedUpdate=r.verticesNeedUpdate,n.normalsNeedUpdate=r.normalsNeedUpdate,n.colorsNeedUpdate=r.colorsNeedUpdate,n.uvsNeedUpdate=r.uvsNeedUpdate,n.groupsNeedUpdate=r.groupsNeedUpdate,r.verticesNeedUpdate=!1,r.normalsNeedUpdate=!1,r.colorsNeedUpdate=!1,r.uvsNeedUpdate=!1,r.groupsNeedUpdate=!1,r=n}
return!0===r.verticesNeedUpdate&&(void 0!==(t=this.attributes.position)&&(t.copyVector3sArray(r.vertices),t.needsUpdate=!0),r.verticesNeedUpdate=!1),!0===r.normalsNeedUpdate&&(void 0!==(t=this.attributes.normal)&&(t.copyVector3sArray(r.normals),t.needsUpdate=!0),r.normalsNeedUpdate=!1),!0===r.colorsNeedUpdate&&(void 0!==(t=this.attributes.color)&&(t.copyColorsArray(r.colors),t.needsUpdate=!0),r.colorsNeedUpdate=!1),r.uvsNeedUpdate&&(void 0!==(t=this.attributes.uv)&&(t.copyVector2sArray(r.uvs),t.needsUpdate=!0),r.uvsNeedUpdate=!1),r.lineDistancesNeedUpdate&&(void 0!==(t=this.attributes.lineDistance)&&(t.copyArray(r.lineDistances),t.needsUpdate=!0),r.lineDistancesNeedUpdate=!1),r.groupsNeedUpdate&&(r.computeGroups(e.geometry),this.groups=r.groups,r.groupsNeedUpdate=!1),this},fromGeometry:function(e)
{return e.__directGeometry=(new DirectGeometry).fromGeometry(e),this.fromDirectGeometry(e.__directGeometry)},fromDirectGeometry:function(e)
{var t=new Float32Array(3*e.vertices.length);if(this.setAttribute("position",new BufferAttribute(t,3).copyVector3sArray(e.vertices)),e.normals.length>0)
{var r=new Float32Array(3*e.normals.length);this.setAttribute("normal",new BufferAttribute(r,3).copyVector3sArray(e.normals))}
if(e.colors.length>0)
{var n=new Float32Array(3*e.colors.length);this.setAttribute("color",new BufferAttribute(n,3).copyColorsArray(e.colors))}
if(e.uvs.length>0)
{var i=new Float32Array(2*e.uvs.length);this.setAttribute("uv",new BufferAttribute(i,2).copyVector2sArray(e.uvs))}
if(e.uvs2.length>0)
{var a=new Float32Array(2*e.uvs2.length);this.setAttribute("uv2",new BufferAttribute(a,2).copyVector2sArray(e.uvs2))}
for(var o in this.groups=e.groups,e.morphTargets)
{for(var s=[],l=e.morphTargets[o],c=0,h=l.length;c<h;c++)
{var u=l[c],d=new Float32BufferAttribute(3*u.data.length,3);d.name=u.name,s.push(d.copyVector3sArray(u.data))}
this.morphAttributes[o]=s}
if(e.skinIndices.length>0)
{var p=new Float32BufferAttribute(4*e.skinIndices.length,4);this.setAttribute("skinIndex",p.copyVector4sArray(e.skinIndices))}
if(e.skinWeights.length>0)
{var m=new Float32BufferAttribute(4*e.skinWeights.length,4);this.setAttribute("skinWeight",m.copyVector4sArray(e.skinWeights))}
return null!==e.boundingSphere&&(this.boundingSphere=e.boundingSphere.clone()),null!==e.boundingBox&&(this.boundingBox=e.boundingBox.clone()),this},computeBoundingBox:function()
{null===this.boundingBox&&(this.boundingBox=new Box3);var e=this.attributes.position,t=this.morphAttributes.position;if(void 0!==e)
{if(this.boundingBox.setFromBufferAttribute(e),t)
for(var r=0,n=t.length;r<n;r++)
{var i=t[r];_box$2.setFromBufferAttribute(i),this.morphTargetsRelative?(_vector$4.addVectors(this.boundingBox.min,_box$2.min),this.boundingBox.expandByPoint(_vector$4),_vector$4.addVectors(this.boundingBox.max,_box$2.max),this.boundingBox.expandByPoint(_vector$4)):(this.boundingBox.expandByPoint(_box$2.min),this.boundingBox.expandByPoint(_box$2.max))}}
else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox: Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)},computeBoundingSphere:function()
{null===this.boundingSphere&&(this.boundingSphere=new Sphere);var e=this.attributes.position,t=this.morphAttributes.position;if(e)
{var r=this.boundingSphere.center;if(_box$2.setFromBufferAttribute(e),t)
for(var n=0,i=t.length;n<i;n++)
{var a=t[n];_boxMorphTargets.setFromBufferAttribute(a),this.morphTargetsRelative?(_vector$4.addVectors(_box$2.min,_boxMorphTargets.min),_box$2.expandByPoint(_vector$4),_vector$4.addVectors(_box$2.max,_boxMorphTargets.max),_box$2.expandByPoint(_vector$4)):(_box$2.expandByPoint(_boxMorphTargets.min),_box$2.expandByPoint(_boxMorphTargets.max))}
_box$2.getCenter(r);var o=0;for(n=0,i=e.count;n<i;n++)_vector$4.fromBufferAttribute(e,n),o=Math.max(o,r.distanceToSquared(_vector$4));if(t)
for(n=0,i=t.length;n<i;n++)
{a=t[n];for(var s=this.morphTargetsRelative,l=0,c=a.count;l<c;l++)_vector$4.fromBufferAttribute(a,l),s&&(_offset.fromBufferAttribute(e,l),_vector$4.add(_offset)),o=Math.max(o,r.distanceToSquared(_vector$4))}
this.boundingSphere.radius=Math.sqrt(o),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}},computeFaceNormals:function(){},computeVertexNormals:function()
{var e=this.index,t=this.attributes;if(t.position)
{var r=t.position.array;if(void 0===t.normal)this.setAttribute("normal",new BufferAttribute(new Float32Array(r.length),3));else for(var n=t.normal.array,i=0,a=n.length;i<a;i++)n[i]=0;var o,s,l,c=t.normal.array,h=new Vector3,u=new Vector3,d=new Vector3,p=new Vector3,m=new Vector3;if(e)
{var f=e.array;for(i=0,a=e.count;i<a;i+=3)o=3*f[i+0],s=3*f[i+1],l=3*f[i+2],h.fromArray(r,o),u.fromArray(r,s),d.fromArray(r,l),p.subVectors(d,u),m.subVectors(h,u),p.cross(m),c[o]+=p.x,c[o+1]+=p.y,c[o+2]+=p.z,c[s]+=p.x,c[s+1]+=p.y,c[s+2]+=p.z,c[l]+=p.x,c[l+1]+=p.y,c[l+2]+=p.z}
else for(i=0,a=r.length;i<a;i+=9)h.fromArray(r,i),u.fromArray(r,i+3),d.fromArray(r,i+6),p.subVectors(d,u),m.subVectors(h,u),p.cross(m),c[i]=p.x,c[i+1]=p.y,c[i+2]=p.z,c[i+3]=p.x,c[i+4]=p.y,c[i+5]=p.z,c[i+6]=p.x,c[i+7]=p.y,c[i+8]=p.z;this.normalizeNormals(),t.normal.needsUpdate=!0}},merge:function(e,t)
{if(e&&e.isBufferGeometry)
{void 0===t&&(t=0,console.warn("THREE.BufferGeometry.merge(): Overwriting original geometry, starting at offset=0. Use BufferGeometryUtils.mergeBufferGeometries() for lossless merge."));var r=this.attributes;for(var n in r)
if(void 0!==e.attributes[n])
for(var i=r[n].array,a=e.attributes[n],o=a.array,s=a.itemSize*t,l=Math.min(o.length,i.length-s),c=0,h=s;c<l;c++,h++)i[h]=o[c];return this}
console.error("THREE.BufferGeometry.merge(): geometry not an instance of THREE.BufferGeometry.",e)},normalizeNormals:function()
{for(var e=this.attributes.normal,t=0,r=e.count;t<r;t++)_vector$4.x=e.getX(t),_vector$4.y=e.getY(t),_vector$4.z=e.getZ(t),_vector$4.normalize(),e.setXYZ(t,_vector$4.x,_vector$4.y,_vector$4.z)},toNonIndexed:function()
{function e(e,t)
{for(var r=e.array,n=e.itemSize,i=new r.constructor(t.length*n),a=0,o=0,s=0,l=t.length;s<l;s++)
{a=t[s]*n;for(var c=0;c<n;c++)i[o++]=r[a++]}
return new BufferAttribute(i,n)}
if(null===this.index)return console.warn("THREE.BufferGeometry.toNonIndexed(): Geometry is already non-indexed."),this;var t=new BufferGeometry,r=this.index.array,n=this.attributes;for(var i in n)
{var a=e(n[i],r);t.setAttribute(i,a)}
var o=this.morphAttributes;for(i in o)
{for(var s=[],l=o[i],c=0,h=l.length;c<h;c++)
{a=e(l[c],r);s.push(a)}
t.morphAttributes[i]=s}
t.morphTargetsRelative=this.morphTargetsRelative;for(var u=this.groups,d=(c=0,u.length);c<d;c++)
{var p=u[c];t.addGroup(p.start,p.count,p.materialIndex)}
return t},toJSON:function()
{var e={metadata:{version:4.5,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,""!==this.name&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),void 0!==this.parameters)
{var t=this.parameters;for(var r in t)void 0!==t[r]&&(e[r]=t[r]);return e}
e.data={attributes:{}};var n=this.index;null!==n&&(e.data.index={type:n.array.constructor.name,array:Array.prototype.slice.call(n.array)});var i=this.attributes;for(var r in i)
{var a=(d=i[r]).toJSON();""!==d.name&&(a.name=d.name),e.data.attributes[r]=a}
var o={},s=!1;for(var r in this.morphAttributes)
{for(var l=this.morphAttributes[r],c=[],h=0,u=l.length;h<u;h++)
{var d;a=(d=l[h]).toJSON();""!==d.name&&(a.name=d.name),c.push(a)}
c.length>0&&(o[r]=c,s=!0)}
s&&(e.data.morphAttributes=o,e.data.morphTargetsRelative=this.morphTargetsRelative);var p=this.groups;p.length>0&&(e.data.groups=JSON.parse(JSON.stringify(p)));var m=this.boundingSphere;return null!==m&&(e.data.boundingSphere={center:m.center.toArray(),radius:m.radius}),e},clone:function()
{return(new BufferGeometry).copy(this)},copy:function(e)
{var t,r,n;this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.name=e.name;var i=e.index;null!==i&&this.setIndex(i.clone());var a=e.attributes;for(t in a)
{var o=a[t];this.setAttribute(t,o.clone())}
var s=e.morphAttributes;for(t in s)
{var l=[],c=s[t];for(r=0,n=c.length;r<n;r++)l.push(c[r].clone());this.morphAttributes[t]=l}
this.morphTargetsRelative=e.morphTargetsRelative;var h=e.groups;for(r=0,n=h.length;r<n;r++)
{var u=h[r];this.addGroup(u.start,u.count,u.materialIndex)}
var d=e.boundingBox;null!==d&&(this.boundingBox=d.clone());var p=e.boundingSphere;return null!==p&&(this.boundingSphere=p.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this},dispose:function()
{this.dispatchEvent({type:"dispose"})}});var _inverseMatrix=new Matrix4,_ray=new Ray,_sphere=new Sphere,_vA=new Vector3,_vB=new Vector3,_vC=new Vector3,_tempA=new Vector3,_tempB=new Vector3,_tempC=new Vector3,_morphA=new Vector3,_morphB=new Vector3,_morphC=new Vector3,_uvA=new Vector2,_uvB=new Vector2,_uvC=new Vector2,_intersectionPoint=new Vector3,_intersectionPointWorld=new Vector3;function Mesh(e,t)
{Object3D.call(this),this.type="Mesh",this.geometry=void 0!==e?e:new BufferGeometry,this.material=void 0!==t?t:new MeshBasicMaterial,this.updateMorphTargets()}
function checkIntersection(e,t,r,n,i,a,o,s)
{if(null===(t.side===BackSide?n.intersectTriangle(o,a,i,!0,s):n.intersectTriangle(i,a,o,t.side!==DoubleSide,s)))return null;_intersectionPointWorld.copy(s),_intersectionPointWorld.applyMatrix4(e.matrixWorld);var l=r.ray.origin.distanceTo(_intersectionPointWorld);return l<r.near||l>r.far?null:{distance:l,point:_intersectionPointWorld.clone(),object:e}}
function checkBufferGeometryIntersection(e,t,r,n,i,a,o,s,l,c,h,u)
{_vA.fromBufferAttribute(i,c),_vB.fromBufferAttribute(i,h),_vC.fromBufferAttribute(i,u);var d=e.morphTargetInfluences;if(t.morphTargets&&a&&d)
{_morphA.set(0,0,0),_morphB.set(0,0,0),_morphC.set(0,0,0);for(var p=0,m=a.length;p<m;p++)
{var f=d[p],g=a[p];0!==f&&(_tempA.fromBufferAttribute(g,c),_tempB.fromBufferAttribute(g,h),_tempC.fromBufferAttribute(g,u),o?(_morphA.addScaledVector(_tempA,f),_morphB.addScaledVector(_tempB,f),_morphC.addScaledVector(_tempC,f)):(_morphA.addScaledVector(_tempA.sub(_vA),f),_morphB.addScaledVector(_tempB.sub(_vB),f),_morphC.addScaledVector(_tempC.sub(_vC),f)))}
_vA.add(_morphA),_vB.add(_morphB),_vC.add(_morphC)}
var v=checkIntersection(e,t,r,n,_vA,_vB,_vC,_intersectionPoint);if(v)
{s&&(_uvA.fromBufferAttribute(s,c),_uvB.fromBufferAttribute(s,h),_uvC.fromBufferAttribute(s,u),v.uv=Triangle.getUV(_intersectionPoint,_vA,_vB,_vC,_uvA,_uvB,_uvC,new Vector2)),l&&(_uvA.fromBufferAttribute(l,c),_uvB.fromBufferAttribute(l,h),_uvC.fromBufferAttribute(l,u),v.uv2=Triangle.getUV(_intersectionPoint,_vA,_vB,_vC,_uvA,_uvB,_uvC,new Vector2));var y=new Face3(c,h,u);Triangle.getNormal(_vA,_vB,_vC,y.normal),v.face=y}
return v}
Mesh.prototype=Object.assign(Object.create(Object3D.prototype),{constructor:Mesh,isMesh:!0,copy:function(e)
{return Object3D.prototype.copy.call(this,e),void 0!==e.morphTargetInfluences&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),void 0!==e.morphTargetDictionary&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this},updateMorphTargets:function()
{var e,t,r,n=this.geometry;if(n.isBufferGeometry)
{var i=n.morphAttributes,a=Object.keys(i);if(a.length>0)
{var o=i[a[0]];if(void 0!==o)
for(this.morphTargetInfluences=[],this.morphTargetDictionary={},e=0,t=o.length;e<t;e++)r=o[e].name||String(e),this.morphTargetInfluences.push(0),this.morphTargetDictionary[r]=e}}
else{var s=n.morphTargets;void 0!==s&&s.length>0&&console.error("THREE.Mesh.updateMorphTargets() no longer supports THREE.Geometry. Use THREE.BufferGeometry instead.")}},raycast:function(e,t)
{var r,n=this.geometry,i=this.material,a=this.matrixWorld;if(void 0!==i&&(null===n.boundingSphere&&n.computeBoundingSphere(),_sphere.copy(n.boundingSphere),_sphere.applyMatrix4(a),!1!==e.ray.intersectsSphere(_sphere)&&(_inverseMatrix.getInverse(a),_ray.copy(e.ray).applyMatrix4(_inverseMatrix),null===n.boundingBox||!1!==_ray.intersectsBox(n.boundingBox))))
if(n.isBufferGeometry)
{var o,s,l,c,h,u,d,p,m,f=n.index,g=n.attributes.position,v=n.morphAttributes.position,y=n.morphTargetsRelative,_=n.attributes.uv,b=n.attributes.uv2,x=n.groups,M=n.drawRange;if(null!==f)
if(Array.isArray(i))
for(c=0,u=x.length;c<u;c++)
for(m=i[(p=x[c]).materialIndex],h=Math.max(p.start,M.start),d=Math.min(p.start+p.count,M.start+M.count);h<d;h+=3)o=f.getX(h),s=f.getX(h+1),l=f.getX(h+2),(r=checkBufferGeometryIntersection(this,m,e,_ray,g,v,y,_,b,o,s,l))&&(r.faceIndex=Math.floor(h/3),r.face.materialIndex=p.materialIndex,t.push(r));else for(c=Math.max(0,M.start),u=Math.min(f.count,M.start+M.count);c<u;c+=3)o=f.getX(c),s=f.getX(c+1),l=f.getX(c+2),(r=checkBufferGeometryIntersection(this,i,e,_ray,g,v,y,_,b,o,s,l))&&(r.faceIndex=Math.floor(c/3),t.push(r));else if(void 0!==g)
if(Array.isArray(i))
for(c=0,u=x.length;c<u;c++)
for(m=i[(p=x[c]).materialIndex],h=Math.max(p.start,M.start),d=Math.min(p.start+p.count,M.start+M.count);h<d;h+=3)(r=checkBufferGeometryIntersection(this,m,e,_ray,g,v,y,_,b,o=h,s=h+1,l=h+2))&&(r.faceIndex=Math.floor(h/3),r.face.materialIndex=p.materialIndex,t.push(r));else for(c=Math.max(0,M.start),u=Math.min(g.count,M.start+M.count);c<u;c+=3)(r=checkBufferGeometryIntersection(this,i,e,_ray,g,v,y,_,b,o=c,s=c+1,l=c+2))&&(r.faceIndex=Math.floor(c/3),t.push(r))}
else if(n.isGeometry)
{var w,S,T,E,A=Array.isArray(i),L=n.vertices,C=n.faces,R=n.faceVertexUvs[0];R.length>0&&(E=R);for(var P=0,I=C.length;P<I;P++)
{var O=C[P],D=A?i[O.materialIndex]:i;if(void 0!==D&&(w=L[O.a],S=L[O.b],T=L[O.c],r=checkIntersection(this,D,e,_ray,w,S,T,_intersectionPoint)))
{if(E&&E[P])
{var B=E[P];_uvA.copy(B[0]),_uvB.copy(B[1]),_uvC.copy(B[2]),r.uv=Triangle.getUV(_intersectionPoint,w,S,T,_uvA,_uvB,_uvC,new Vector2)}
r.face=O,r.faceIndex=P,t.push(r)}}}},clone:function()
{return new this.constructor(this.geometry,this.material).copy(this)}});var _geometryId=0,_m1$3=new Matrix4,_obj$1=new Object3D,_offset$1=new Vector3;function Geometry()
{Object.defineProperty(this,"id",{value:_geometryId+=2}),this.uuid=MathUtils.generateUUID(),this.name="",this.type="Geometry",this.vertices=[],this.colors=[],this.faces=[],this.faceVertexUvs=[[]],this.morphTargets=[],this.morphNormals=[],this.skinWeights=[],this.skinIndices=[],this.lineDistances=[],this.boundingBox=null,this.boundingSphere=null,this.elementsNeedUpdate=!1,this.verticesNeedUpdate=!1,this.uvsNeedUpdate=!1,this.normalsNeedUpdate=!1,this.colorsNeedUpdate=!1,this.lineDistancesNeedUpdate=!1,this.groupsNeedUpdate=!1}
Geometry.prototype=Object.assign(Object.create(EventDispatcher.prototype),{constructor:Geometry,isGeometry:!0,applyMatrix4:function(e)
{for(var t=(new Matrix3).getNormalMatrix(e),r=0,n=this.vertices.length;r<n;r++)
{this.vertices[r].applyMatrix4(e)}
for(r=0,n=this.faces.length;r<n;r++)
{var i=this.faces[r];i.normal.applyMatrix3(t).normalize();for(var a=0,o=i.vertexNormals.length;a<o;a++)i.vertexNormals[a].applyMatrix3(t).normalize()}
return null!==this.boundingBox&&this.computeBoundingBox(),null!==this.boundingSphere&&this.computeBoundingSphere(),this.verticesNeedUpdate=!0,this.normalsNeedUpdate=!0,this},rotateX:function(e)
{return _m1$3.makeRotationX(e),this.applyMatrix4(_m1$3),this},rotateY:function(e)
{return _m1$3.makeRotationY(e),this.applyMatrix4(_m1$3),this},rotateZ:function(e)
{return _m1$3.makeRotationZ(e),this.applyMatrix4(_m1$3),this},translate:function(e,t,r)
{return _m1$3.makeTranslation(e,t,r),this.applyMatrix4(_m1$3),this},scale:function(e,t,r)
{return _m1$3.makeScale(e,t,r),this.applyMatrix4(_m1$3),this},lookAt:function(e)
{return _obj$1.lookAt(e),_obj$1.updateMatrix(),this.applyMatrix4(_obj$1.matrix),this},fromBufferGeometry:function(e)
{var t=this,r=null!==e.index?e.index.array:void 0,n=e.attributes;if(void 0===n.position)return console.error("THREE.Geometry.fromBufferGeometry(): Position attribute required for conversion."),this;var i=n.position.array,a=void 0!==n.normal?n.normal.array:void 0,o=void 0!==n.color?n.color.array:void 0,s=void 0!==n.uv?n.uv.array:void 0,l=void 0!==n.uv2?n.uv2.array:void 0;void 0!==l&&(this.faceVertexUvs[1]=[]);for(var c=0;c<i.length;c+=3)t.vertices.push((new Vector3).fromArray(i,c)),void 0!==o&&t.colors.push((new Color).fromArray(o,c));function h(e,r,n,i)
{var c=void 0===o?[]:[t.colors[e].clone(),t.colors[r].clone(),t.colors[n].clone()],h=new Face3(e,r,n,void 0===a?[]:[(new Vector3).fromArray(a,3*e),(new Vector3).fromArray(a,3*r),(new Vector3).fromArray(a,3*n)],c,i);t.faces.push(h),void 0!==s&&t.faceVertexUvs[0].push([(new Vector2).fromArray(s,2*e),(new Vector2).fromArray(s,2*r),(new Vector2).fromArray(s,2*n)]),void 0!==l&&t.faceVertexUvs[1].push([(new Vector2).fromArray(l,2*e),(new Vector2).fromArray(l,2*r),(new Vector2).fromArray(l,2*n)])}
var u=e.groups;if(u.length>0)
for(c=0;c<u.length;c++)
for(var d=u[c],p=d.start,m=p,f=p+d.count;m<f;m+=3)void 0!==r?h(r[m],r[m+1],r[m+2],d.materialIndex):h(m,m+1,m+2,d.materialIndex);else if(void 0!==r)
for(c=0;c<r.length;c+=3)h(r[c],r[c+1],r[c+2]);else for(c=0;c<i.length/3;c+=3)h(c,c+1,c+2);return this.computeFaceNormals(),null!==e.boundingBox&&(this.boundingBox=e.boundingBox.clone()),null!==e.boundingSphere&&(this.boundingSphere=e.boundingSphere.clone()),this},center:function()
{return this.computeBoundingBox(),this.boundingBox.getCenter(_offset$1).negate(),this.translate(_offset$1.x,_offset$1.y,_offset$1.z),this},normalize:function()
{this.computeBoundingSphere();var e=this.boundingSphere.center,t=this.boundingSphere.radius,r=0===t?1:1/t,n=new Matrix4;return n.set(r,0,0,-r*e.x,0,r,0,-r*e.y,0,0,r,-r*e.z,0,0,0,1),this.applyMatrix4(n),this},computeFaceNormals:function()
{for(var e=new Vector3,t=new Vector3,r=0,n=this.faces.length;r<n;r++)
{var i=this.faces[r],a=this.vertices[i.a],o=this.vertices[i.b],s=this.vertices[i.c];e.subVectors(s,o),t.subVectors(a,o),e.cross(t),e.normalize(),i.normal.copy(e)}},computeVertexNormals:function(e)
{var t,r,n,i,a,o;for(void 0===e&&(e=!0),o=new Array(this.vertices.length),t=0,r=this.vertices.length;t<r;t++)o[t]=new Vector3;if(e)
{var s,l,c,h=new Vector3,u=new Vector3;for(n=0,i=this.faces.length;n<i;n++)a=this.faces[n],s=this.vertices[a.a],l=this.vertices[a.b],c=this.vertices[a.c],h.subVectors(c,l),u.subVectors(s,l),h.cross(u),o[a.a].add(h),o[a.b].add(h),o[a.c].add(h)}
else for(this.computeFaceNormals(),n=0,i=this.faces.length;n<i;n++)o[(a=this.faces[n]).a].add(a.normal),o[a.b].add(a.normal),o[a.c].add(a.normal);for(t=0,r=this.vertices.length;t<r;t++)o[t].normalize();for(n=0,i=this.faces.length;n<i;n++)
{var d=(a=this.faces[n]).vertexNormals;3===d.length?(d[0].copy(o[a.a]),d[1].copy(o[a.b]),d[2].copy(o[a.c])):(d[0]=o[a.a].clone(),d[1]=o[a.b].clone(),d[2]=o[a.c].clone())}
this.faces.length>0&&(this.normalsNeedUpdate=!0)},computeFlatVertexNormals:function()
{var e,t,r;for(this.computeFaceNormals(),e=0,t=this.faces.length;e<t;e++)
{var n=(r=this.faces[e]).vertexNormals;3===n.length?(n[0].copy(r.normal),n[1].copy(r.normal),n[2].copy(r.normal)):(n[0]=r.normal.clone(),n[1]=r.normal.clone(),n[2]=r.normal.clone())}
this.faces.length>0&&(this.normalsNeedUpdate=!0)},computeMorphNormals:function()
{var e,t,r,n,i;for(r=0,n=this.faces.length;r<n;r++)
for((i=this.faces[r]).__originalFaceNormal?i.__originalFaceNormal.copy(i.normal):i.__originalFaceNormal=i.normal.clone(),i.__originalVertexNormals||(i.__originalVertexNormals=[]),e=0,t=i.vertexNormals.length;e<t;e++)i.__originalVertexNormals[e]?i.__originalVertexNormals[e].copy(i.vertexNormals[e]):i.__originalVertexNormals[e]=i.vertexNormals[e].clone();var a=new Geometry;for(a.faces=this.faces,e=0,t=this.morphTargets.length;e<t;e++)
{if(!this.morphNormals[e])
{this.morphNormals[e]={},this.morphNormals[e].faceNormals=[],this.morphNormals[e].vertexNormals=[];var o=this.morphNormals[e].faceNormals,s=this.morphNormals[e].vertexNormals;for(r=0,n=this.faces.length;r<n;r++)l=new Vector3,c={a:new Vector3,b:new Vector3,c:new Vector3},o.push(l),s.push(c)}
var l,c,h=this.morphNormals[e];for(a.vertices=this.morphTargets[e].vertices,a.computeFaceNormals(),a.computeVertexNormals(),r=0,n=this.faces.length;r<n;r++)i=this.faces[r],l=h.faceNormals[r],c=h.vertexNormals[r],l.copy(i.normal),c.a.copy(i.vertexNormals[0]),c.b.copy(i.vertexNormals[1]),c.c.copy(i.vertexNormals[2])}
for(r=0,n=this.faces.length;r<n;r++)(i=this.faces[r]).normal=i.__originalFaceNormal,i.vertexNormals=i.__originalVertexNormals},computeBoundingBox:function()
{null===this.boundingBox&&(this.boundingBox=new Box3),this.boundingBox.setFromPoints(this.vertices)},computeBoundingSphere:function()
{null===this.boundingSphere&&(this.boundingSphere=new Sphere),this.boundingSphere.setFromPoints(this.vertices)},merge:function(e,t,r)
{if(e&&e.isGeometry)
{var n,i=this.vertices.length,a=this.vertices,o=e.vertices,s=this.faces,l=e.faces,c=this.colors,h=e.colors;void 0===r&&(r=0),void 0!==t&&(n=(new Matrix3).getNormalMatrix(t));for(var u=0,d=o.length;u<d;u++)
{var p=o[u].clone();void 0!==t&&p.applyMatrix4(t),a.push(p)}
for(u=0,d=h.length;u<d;u++)c.push(h[u].clone());for(u=0,d=l.length;u<d;u++)
{var m,f,g,v=l[u],y=v.vertexNormals,_=v.vertexColors;(m=new Face3(v.a+i,v.b+i,v.c+i)).normal.copy(v.normal),void 0!==n&&m.normal.applyMatrix3(n).normalize();for(var b=0,x=y.length;b<x;b++)f=y[b].clone(),void 0!==n&&f.applyMatrix3(n).normalize(),m.vertexNormals.push(f);m.color.copy(v.color);for(b=0,x=_.length;b<x;b++)g=_[b],m.vertexColors.push(g.clone());m.materialIndex=v.materialIndex+r,s.push(m)}
for(u=0,d=e.faceVertexUvs.length;u<d;u++)
{var M=e.faceVertexUvs[u];void 0===this.faceVertexUvs[u]&&(this.faceVertexUvs[u]=[]);for(b=0,x=M.length;b<x;b++)
{for(var w=M[b],S=[],T=0,E=w.length;T<E;T++)S.push(w[T].clone());this.faceVertexUvs[u].push(S)}}}
else console.error("THREE.Geometry.merge(): geometry not an instance of THREE.Geometry.",e)},mergeMesh:function(e)
{e&&e.isMesh?(e.matrixAutoUpdate&&e.updateMatrix(),this.merge(e.geometry,e.matrix)):console.error("THREE.Geometry.mergeMesh(): mesh not an instance of THREE.Mesh.",e)},mergeVertices:function()
{var e,t,r,n,i,a,o,s,l={},c=[],h=[],u=Math.pow(10,4);for(r=0,n=this.vertices.length;r<n;r++)e=this.vertices[r],void 0===l[t=Math.round(e.x*u)+"_"+Math.round(e.y*u)+"_"+Math.round(e.z*u)]?(l[t]=r,c.push(this.vertices[r]),h[r]=c.length-1):h[r]=h[l[t]];var d=[];for(r=0,n=this.faces.length;r<n;r++)
{(i=this.faces[r]).a=h[i.a],i.b=h[i.b],i.c=h[i.c],a=[i.a,i.b,i.c];for(var p=0;p<3;p++)
if(a[p]===a[(p+1)%3])
{d.push(r);break}}
for(r=d.length-1;r>=0;r--)
{var m=d[r];for(this.faces.splice(m,1),o=0,s=this.faceVertexUvs.length;o<s;o++)this.faceVertexUvs[o].splice(m,1)}
var f=this.vertices.length-c.length;return this.vertices=c,f},setFromPoints:function(e)
{this.vertices=[];for(var t=0,r=e.length;t<r;t++)
{var n=e[t];this.vertices.push(new Vector3(n.x,n.y,n.z||0))}
return this},sortFacesByMaterialIndex:function()
{for(var e=this.faces,t=e.length,r=0;r<t;r++)e[r]._id=r;e.sort(function(e,t)
{return e.materialIndex-t.materialIndex});var n,i,a=this.faceVertexUvs[0],o=this.faceVertexUvs[1];a&&a.length===t&&(n=[]),o&&o.length===t&&(i=[]);for(r=0;r<t;r++)
{var s=e[r]._id;n&&n.push(a[s]),i&&i.push(o[s])}
n&&(this.faceVertexUvs[0]=n),i&&(this.faceVertexUvs[1]=i)},toJSON:function()
{var e={metadata:{version:4.5,type:"Geometry",generator:"Geometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,""!==this.name&&(e.name=this.name),void 0!==this.parameters)
{var t=this.parameters;for(var r in t)void 0!==t[r]&&(e[r]=t[r]);return e}
for(var n=[],i=0;i<this.vertices.length;i++)
{var a=this.vertices[i];n.push(a.x,a.y,a.z)}
var o=[],s=[],l={},c=[],h={},u=[],d={};for(i=0;i<this.faces.length;i++)
{var p=this.faces[i],m=void 0!==this.faceVertexUvs[0][i],f=p.normal.length()>0,g=p.vertexNormals.length>0,v=1!==p.color.r||1!==p.color.g||1!==p.color.b,y=p.vertexColors.length>0,_=0;if(_=w(_,0,0),_=w(_,1,!0),_=w(_,2,!1),_=w(_,3,m),_=w(_,4,f),_=w(_,5,g),_=w(_,6,v),_=w(_,7,y),o.push(_),o.push(p.a,p.b,p.c),o.push(p.materialIndex),m)
{var b=this.faceVertexUvs[0][i];o.push(E(b[0]),E(b[1]),E(b[2]))}
if(f&&o.push(S(p.normal)),g)
{var x=p.vertexNormals;o.push(S(x[0]),S(x[1]),S(x[2]))}
if(v&&o.push(T(p.color)),y)
{var M=p.vertexColors;o.push(T(M[0]),T(M[1]),T(M[2]))}}
function w(e,t,r)
{return r?e|1<<t:e&~(1<<t)}
function S(e)
{var t=e.x.toString()+e.y.toString()+e.z.toString();return void 0!==l[t]?l[t]:(l[t]=s.length/3,s.push(e.x,e.y,e.z),l[t])}
function T(e)
{var t=e.r.toString()+e.g.toString()+e.b.toString();return void 0!==h[t]?h[t]:(h[t]=c.length,c.push(e.getHex()),h[t])}
function E(e)
{var t=e.x.toString()+e.y.toString();return void 0!==d[t]?d[t]:(d[t]=u.length/2,u.push(e.x,e.y),d[t])}
return e.data={},e.data.vertices=n,e.data.normals=s,c.length>0&&(e.data.colors=c),u.length>0&&(e.data.uvs=[u]),e.data.faces=o,e},clone:function()
{return(new Geometry).copy(this)},copy:function(e)
{var t,r,n,i,a,o;this.vertices=[],this.colors=[],this.faces=[],this.faceVertexUvs=[[]],this.morphTargets=[],this.morphNormals=[],this.skinWeights=[],this.skinIndices=[],this.lineDistances=[],this.boundingBox=null,this.boundingSphere=null,this.name=e.name;var s=e.vertices;for(t=0,r=s.length;t<r;t++)this.vertices.push(s[t].clone());var l=e.colors;for(t=0,r=l.length;t<r;t++)this.colors.push(l[t].clone());var c=e.faces;for(t=0,r=c.length;t<r;t++)this.faces.push(c[t].clone());for(t=0,r=e.faceVertexUvs.length;t<r;t++)
{var h=e.faceVertexUvs[t];for(void 0===this.faceVertexUvs[t]&&(this.faceVertexUvs[t]=[]),n=0,i=h.length;n<i;n++)
{var u=h[n],d=[];for(a=0,o=u.length;a<o;a++)
{var p=u[a];d.push(p.clone())}
this.faceVertexUvs[t].push(d)}}
var m=e.morphTargets;for(t=0,r=m.length;t<r;t++)
{var f={};if(f.name=m[t].name,void 0!==m[t].vertices)
for(f.vertices=[],n=0,i=m[t].vertices.length;n<i;n++)f.vertices.push(m[t].vertices[n].clone());if(void 0!==m[t].normals)
for(f.normals=[],n=0,i=m[t].normals.length;n<i;n++)f.normals.push(m[t].normals[n].clone());this.morphTargets.push(f)}
var g=e.morphNormals;for(t=0,r=g.length;t<r;t++)
{var v={};if(void 0!==g[t].vertexNormals)
for(v.vertexNormals=[],n=0,i=g[t].vertexNormals.length;n<i;n++)
{var y=g[t].vertexNormals[n],_={};_.a=y.a.clone(),_.b=y.b.clone(),_.c=y.c.clone(),v.vertexNormals.push(_)}
if(void 0!==g[t].faceNormals)
for(v.faceNormals=[],n=0,i=g[t].faceNormals.length;n<i;n++)v.faceNormals.push(g[t].faceNormals[n].clone());this.morphNormals.push(v)}
var b=e.skinWeights;for(t=0,r=b.length;t<r;t++)this.skinWeights.push(b[t].clone());var x=e.skinIndices;for(t=0,r=x.length;t<r;t++)this.skinIndices.push(x[t].clone());var M=e.lineDistances;for(t=0,r=M.length;t<r;t++)this.lineDistances.push(M[t]);var w=e.boundingBox;null!==w&&(this.boundingBox=w.clone());var S=e.boundingSphere;return null!==S&&(this.boundingSphere=S.clone()),this.elementsNeedUpdate=e.elementsNeedUpdate,this.verticesNeedUpdate=e.verticesNeedUpdate,this.uvsNeedUpdate=e.uvsNeedUpdate,this.normalsNeedUpdate=e.normalsNeedUpdate,this.colorsNeedUpdate=e.colorsNeedUpdate,this.lineDistancesNeedUpdate=e.lineDistancesNeedUpdate,this.groupsNeedUpdate=e.groupsNeedUpdate,this},dispose:function()
{this.dispatchEvent({type:"dispose"})}});class BoxGeometry extends Geometry
{constructor(e,t,r,n,i,a)
{super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:r,widthSegments:n,heightSegments:i,depthSegments:a},this.fromBufferGeometry(new BoxBufferGeometry(e,t,r,n,i,a)),this.mergeVertices()}}
class BoxBufferGeometry extends BufferGeometry
{constructor(e,t,r,n,i,a)
{super(),this.type="BoxBufferGeometry",this.parameters={width:e,height:t,depth:r,widthSegments:n,heightSegments:i,depthSegments:a};var o=this;e=e||1,t=t||1,r=r||1,n=Math.floor(n)||1,i=Math.floor(i)||1,a=Math.floor(a)||1;var s=[],l=[],c=[],h=[],u=0,d=0;function p(e,t,r,n,i,a,p,m,f,g,v)
{var y,_,b=a/f,x=p/g,M=a/2,w=p/2,S=m/2,T=f+1,E=g+1,A=0,L=0,C=new Vector3;for(_=0;_<E;_++)
{var R=_*x-w;for(y=0;y<T;y++)
{var P=y*b-M;C[e]=P*n,C[t]=R*i,C[r]=S,l.push(C.x,C.y,C.z),C[e]=0,C[t]=0,C[r]=m>0?1:-1,c.push(C.x,C.y,C.z),h.push(y/f),h.push(1-_/g),A+=1}}
for(_=0;_<g;_++)
for(y=0;y<f;y++)
{var I=u+y+T*_,O=u+y+T*(_+1),D=u+(y+1)+T*(_+1),B=u+(y+1)+T*_;s.push(I,O,B),s.push(O,D,B),L+=6}
o.addGroup(d,L,v),d+=L,u+=A}
p("z","y","x",-1,-1,r,t,e,a,i,0),p("z","y","x",1,-1,r,t,-e,a,i,1),p("x","z","y",1,1,e,r,t,n,a,2),p("x","z","y",1,-1,e,r,-t,n,a,3),p("x","y","z",1,-1,e,t,r,n,i,4),p("x","y","z",-1,-1,e,t,-r,n,i,5),this.setIndex(s),this.setAttribute("position",new Float32BufferAttribute(l,3)),this.setAttribute("normal",new Float32BufferAttribute(c,3)),this.setAttribute("uv",new Float32BufferAttribute(h,2))}}
function cloneUniforms(e)
{var t={};for(var r in e)
for(var n in t[r]={},e[r])
{var i=e[r][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture)?t[r][n]=i.clone():Array.isArray(i)?t[r][n]=i.slice():t[r][n]=i}
return t}
function mergeUniforms(e)
{for(var t={},r=0;r<e.length;r++)
{var n=cloneUniforms(e[r]);for(var i in n)t[i]=n[i]}
return t}
var UniformsUtils={clone:cloneUniforms,merge:mergeUniforms},default_vertex="void main() {\n\tgl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n}",default_fragment="void main() {\n\tgl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );\n}";function ShaderMaterial(e)
{Material.call(this),this.type="ShaderMaterial",this.defines={},this.uniforms={},this.vertexShader=default_vertex,this.fragmentShader=default_fragment,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.skinning=!1,this.morphTargets=!1,this.morphNormals=!1,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv2:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,void 0!==e&&(void 0!==e.attributes&&console.error("THREE.ShaderMaterial: attributes should now be defined in THREE.BufferGeometry instead."),this.setValues(e))}
function Camera()
{Object3D.call(this),this.type="Camera",this.matrixWorldInverse=new Matrix4,this.projectionMatrix=new Matrix4,this.projectionMatrixInverse=new Matrix4}
function PerspectiveCamera(e,t,r,n)
{Camera.call(this),this.type="PerspectiveCamera",this.fov=void 0!==e?e:50,this.zoom=1,this.near=void 0!==r?r:.1,this.far=void 0!==n?n:2e3,this.focus=10,this.aspect=void 0!==t?t:1,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}
ShaderMaterial.prototype=Object.create(Material.prototype),ShaderMaterial.prototype.constructor=ShaderMaterial,ShaderMaterial.prototype.isShaderMaterial=!0,ShaderMaterial.prototype.copy=function(e)
{return Material.prototype.copy.call(this,e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=cloneUniforms(e.uniforms),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.lights=e.lights,this.clipping=e.clipping,this.skinning=e.skinning,this.morphTargets=e.morphTargets,this.morphNormals=e.morphNormals,this.extensions=e.extensions,this},ShaderMaterial.prototype.toJSON=function(e)
{var t=Material.prototype.toJSON.call(this,e);for(var r in t.uniforms={},this.uniforms)
{var n=this.uniforms[r].value;n&&n.isTexture?t.uniforms[r]={type:"t",value:n.toJSON(e).uuid}:n&&n.isColor?t.uniforms[r]={type:"c",value:n.getHex()}:n&&n.isVector2?t.uniforms[r]={type:"v2",value:n.toArray()}:n&&n.isVector3?t.uniforms[r]={type:"v3",value:n.toArray()}:n&&n.isVector4?t.uniforms[r]={type:"v4",value:n.toArray()}:n&&n.isMatrix3?t.uniforms[r]={type:"m3",value:n.toArray()}:n&&n.isMatrix4?t.uniforms[r]={type:"m4",value:n.toArray()}:t.uniforms[r]={value:n}}
Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader;var i={};for(var a in this.extensions)!0===this.extensions[a]&&(i[a]=!0);return Object.keys(i).length>0&&(t.extensions=i),t},Camera.prototype=Object.assign(Object.create(Object3D.prototype),{constructor:Camera,isCamera:!0,copy:function(e,t)
{return Object3D.prototype.copy.call(this,e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this},getWorldDirection:function(e)
{void 0===e&&(console.warn("THREE.Camera: .getWorldDirection() target is now required"),e=new Vector3),this.updateMatrixWorld(!0);var t=this.matrixWorld.elements;return e.set(-t[8],-t[9],-t[10]).normalize()},updateMatrixWorld:function(e)
{Object3D.prototype.updateMatrixWorld.call(this,e),this.matrixWorldInverse.getInverse(this.matrixWorld)},updateWorldMatrix:function(e,t)
{Object3D.prototype.updateWorldMatrix.call(this,e,t),this.matrixWorldInverse.getInverse(this.matrixWorld)},clone:function()
{return(new this.constructor).copy(this)}}),PerspectiveCamera.prototype=Object.assign(Object.create(Camera.prototype),{constructor:PerspectiveCamera,isPerspectiveCamera:!0,copy:function(e,t)
{return Camera.prototype.copy.call(this,e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=null===e.view?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this},setFocalLength:function(e)
{var t=.5*this.getFilmHeight()/e;this.fov=2*MathUtils.RAD2DEG*Math.atan(t),this.updateProjectionMatrix()},getFocalLength:function()
{var e=Math.tan(.5*MathUtils.DEG2RAD*this.fov);return.5*this.getFilmHeight()/e},getEffectiveFOV:function()
{return 2*MathUtils.RAD2DEG*Math.atan(Math.tan(.5*MathUtils.DEG2RAD*this.fov)/this.zoom)},getFilmWidth:function()
{return this.filmGauge*Math.min(this.aspect,1)},getFilmHeight:function()
{return this.filmGauge/Math.max(this.aspect,1)},setViewOffset:function(e,t,r,n,i,a)
{this.aspect=e/t,null===this.view&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=r,this.view.offsetY=n,this.view.width=i,this.view.height=a,this.updateProjectionMatrix()},clearViewOffset:function()
{null!==this.view&&(this.view.enabled=!1),this.updateProjectionMatrix()},updateProjectionMatrix:function()
{var e=this.near,t=e*Math.tan(.5*MathUtils.DEG2RAD*this.fov)/this.zoom,r=2*t,n=this.aspect*r,i=-.5*n,a=this.view;if(null!==this.view&&this.view.enabled)
{var o=a.fullWidth,s=a.fullHeight;i+=a.offsetX*n/o,t-=a.offsetY*r/s,n*=a.width/o,r*=a.height/s}
var l=this.filmOffset;0!==l&&(i+=e*l/this.getFilmWidth()),this.projectionMatrix.makePerspective(i,i+n,t,t-r,e,this.far),this.projectionMatrixInverse.getInverse(this.projectionMatrix)},toJSON:function(e)
{var t=Object3D.prototype.toJSON.call(this,e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,null!==this.view&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}});var fov=90,aspect=1;function CubeCamera(e,t,r,n)
{Object3D.call(this),this.type="CubeCamera";var i=new PerspectiveCamera(fov,aspect,e,t);i.up.set(0,-1,0),i.lookAt(new Vector3(1,0,0)),this.add(i);var a=new PerspectiveCamera(fov,aspect,e,t);a.up.set(0,-1,0),a.lookAt(new Vector3(-1,0,0)),this.add(a);var o=new PerspectiveCamera(fov,aspect,e,t);o.up.set(0,0,1),o.lookAt(new Vector3(0,1,0)),this.add(o);var s=new PerspectiveCamera(fov,aspect,e,t);s.up.set(0,0,-1),s.lookAt(new Vector3(0,-1,0)),this.add(s);var l=new PerspectiveCamera(fov,aspect,e,t);l.up.set(0,-1,0),l.lookAt(new Vector3(0,0,1)),this.add(l);var c=new PerspectiveCamera(fov,aspect,e,t);c.up.set(0,-1,0),c.lookAt(new Vector3(0,0,-1)),this.add(c),n=n||{format:RGBFormat,magFilter:LinearFilter,minFilter:LinearFilter},this.renderTarget=new WebGLCubeRenderTarget(r,n),this.renderTarget.texture.name="CubeCamera",this.update=function(e,t)
{null===this.parent&&this.updateMatrixWorld();var r=e.getRenderTarget(),n=this.renderTarget,h=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0),e.render(t,i),e.setRenderTarget(n,1),e.render(t,a),e.setRenderTarget(n,2),e.render(t,o),e.setRenderTarget(n,3),e.render(t,s),e.setRenderTarget(n,4),e.render(t,l),n.texture.generateMipmaps=h,e.setRenderTarget(n,5),e.render(t,c),e.setRenderTarget(r)},this.clear=function(e,t,r,n)
{for(var i=e.getRenderTarget(),a=this.renderTarget,o=0;o<6;o++)e.setRenderTarget(a,o),e.clear(t,r,n);e.setRenderTarget(i)}}
function WebGLCubeRenderTarget(e,t,r)
{Number.isInteger(t)&&(console.warn("THREE.WebGLCubeRenderTarget: constructor signature is now WebGLCubeRenderTarget( size, options )"),t=r),WebGLRenderTarget.call(this,e,e,t)}
function DataTexture(e,t,r,n,i,a,o,s,l,c,h,u)
{Texture.call(this,null,a,o,s,l,c,n,i,h,u),this.image={data:e||null,width:t||1,height:r||1},this.magFilter=void 0!==l?l:NearestFilter,this.minFilter=void 0!==c?c:NearestFilter,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.needsUpdate=!0}
CubeCamera.prototype=Object.create(Object3D.prototype),CubeCamera.prototype.constructor=CubeCamera,WebGLCubeRenderTarget.prototype=Object.create(WebGLRenderTarget.prototype),WebGLCubeRenderTarget.prototype.constructor=WebGLCubeRenderTarget,WebGLCubeRenderTarget.prototype.isWebGLCubeRenderTarget=!0,WebGLCubeRenderTarget.prototype.fromEquirectangularTexture=function(e,t)
{this.texture.type=t.type,this.texture.format=t.format,this.texture.encoding=t.encoding;var r=new Scene,n={uniforms:{tEquirect:{value:null}},vertexShader:["varying vec3 vWorldDirection;","vec3 transformDirection( in vec3 dir, in mat4 matrix ) {","\treturn normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );","}","void main() {","\tvWorldDirection = transformDirection( position, modelMatrix );","\t#include <begin_vertex>","\t#include <project_vertex>","}"].join("\n"),fragmentShader:["uniform sampler2D tEquirect;","varying vec3 vWorldDirection;","#define RECIPROCAL_PI 0.31830988618","#define RECIPROCAL_PI2 0.15915494","void main() {","\tvec3 direction = normalize( vWorldDirection );","\tvec2 sampleUV;","\tsampleUV.y = asin( clamp( direction.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;","\tsampleUV.x = atan( direction.z, direction.x ) * RECIPROCAL_PI2 + 0.5;","\tgl_FragColor = texture2D( tEquirect, sampleUV );","}"].join("\n")},i=new ShaderMaterial({type:"CubemapFromEquirect",uniforms:cloneUniforms(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:BackSide,blending:NoBlending});i.uniforms.tEquirect.value=t;var a=new Mesh(new BoxBufferGeometry(5,5,5),i);r.add(a);var o=new CubeCamera(1,10,1);return o.renderTarget=this,o.renderTarget.texture.name="CubeCameraTexture",o.update(e,r),a.geometry.dispose(),a.material.dispose(),this},DataTexture.prototype=Object.create(Texture.prototype),DataTexture.prototype.constructor=DataTexture,DataTexture.prototype.isDataTexture=!0;var _sphere$1=new Sphere,_vector$5=new Vector3;function Frustum(e,t,r,n,i,a)
{this.planes=[void 0!==e?e:new Plane,void 0!==t?t:new Plane,void 0!==r?r:new Plane,void 0!==n?n:new Plane,void 0!==i?i:new Plane,void 0!==a?a:new Plane]}
Object.assign(Frustum.prototype,{set:function(e,t,r,n,i,a)
{var o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(r),o[3].copy(n),o[4].copy(i),o[5].copy(a),this},clone:function()
{return(new this.constructor).copy(this)},copy:function(e)
{for(var t=this.planes,r=0;r<6;r++)t[r].copy(e.planes[r]);return this},setFromProjectionMatrix:function(e)
{var t=this.planes,r=e.elements,n=r[0],i=r[1],a=r[2],o=r[3],s=r[4],l=r[5],c=r[6],h=r[7],u=r[8],d=r[9],p=r[10],m=r[11],f=r[12],g=r[13],v=r[14],y=r[15];return t[0].setComponents(o-n,h-s,m-u,y-f).normalize(),t[1].setComponents(o+n,h+s,m+u,y+f).normalize(),t[2].setComponents(o+i,h+l,m+d,y+g).normalize(),t[3].setComponents(o-i,h-l,m-d,y-g).normalize(),t[4].setComponents(o-a,h-c,m-p,y-v).normalize(),t[5].setComponents(o+a,h+c,m+p,y+v).normalize(),this},intersectsObject:function(e)
{var t=e.geometry;return null===t.boundingSphere&&t.computeBoundingSphere(),_sphere$1.copy(t.boundingSphere).applyMatrix4(e.matrixWorld),this.intersectsSphere(_sphere$1)},intersectsSprite:function(e)
{return _sphere$1.center.set(0,0,0),_sphere$1.radius=.7071067811865476,_sphere$1.applyMatrix4(e.matrixWorld),this.intersectsSphere(_sphere$1)},intersectsSphere:function(e)
{for(var t=this.planes,r=e.center,n=-e.radius,i=0;i<6;i++)
{if(t[i].distanceToPoint(r)<n)return!1}
return!0},intersectsBox:function(e)
{for(var t=this.planes,r=0;r<6;r++)
{var n=t[r];if(_vector$5.x=n.normal.x>0?e.max.x:e.min.x,_vector$5.y=n.normal.y>0?e.max.y:e.min.y,_vector$5.z=n.normal.z>0?e.max.z:e.min.z,n.distanceToPoint(_vector$5)<0)return!1}
return!0},containsPoint:function(e)
{for(var t=this.planes,r=0;r<6;r++)
if(t[r].distanceToPoint(e)<0)return!1;return!0}});var UniformsLib={common:{diffuse:{value:new Color(15658734)},opacity:{value:1},map:{value:null},uvTransform:{value:new Matrix3},uv2Transform:{value:new Matrix3},alphaMap:{value:null}},specularmap:{specularMap:{value:null}},envmap:{envMap:{value:null},flipEnvMap:{value:-1},reflectivity:{value:1},refractionRatio:{value:.98},maxMipLevel:{value:0}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1}},emissivemap:{emissiveMap:{value:null}},bumpmap:{bumpMap:{value:null},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalScale:{value:new Vector2(1,1)}},displacementmap:{displacementMap:{value:null},displacementScale:{value:1},displacementBias:{value:0}},roughnessmap:{roughnessMap:{value:null}},metalnessmap:{metalnessMap:{value:null}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Color(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{},shadow:{},shadowBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{},shadow:{},shadowBias:{},shadowRadius:{},shadowMapSize:{}}},spotShadowMap:{value:[]},spotShadowMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{},shadow:{},shadowBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}}},points:{diffuse:{value:new Color(15658734)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},uvTransform:{value:new Matrix3}},sprite:{diffuse:{value:new Color(15658734)},opacity:{value:1},center:{value:new Vector2(.5,.5)},rotation:{value:0},map:{value:null},alphaMap:{value:null},uvTransform:{value:new Matrix3}}};function WebGLAnimation()
{var e=null,t=!1,r=null;function n(i,a)
{!1!==t&&(r(i,a),e.requestAnimationFrame(n))}
return{start:function()
{!0!==t&&null!==r&&(e.requestAnimationFrame(n),t=!0)},stop:function()
{t=!1},setAnimationLoop:function(e)
{r=e},setContext:function(t)
{e=t}}}
function WebGLAttributes(e,t)
{var r=t.isWebGL2,n=new WeakMap;return{get:function(e)
{return e.isInterleavedBufferAttribute&&(e=e.data),n.get(e)},remove:function(t)
{t.isInterleavedBufferAttribute&&(t=t.data);var r=n.get(t);r&&(e.deleteBuffer(r.buffer),n.delete(t))},update:function(t,i)
{t.isInterleavedBufferAttribute&&(t=t.data);var a=n.get(t);void 0===a?n.set(t,function(t,r)
{var n=t.array,i=t.usage,a=e.createBuffer();e.bindBuffer(r,a),e.bufferData(r,n,i),t.onUploadCallback();var o=5126;return n instanceof Float32Array?o=5126:n instanceof Float64Array?console.warn("THREE.WebGLAttributes: Unsupported data buffer format: Float64Array."):n instanceof Uint16Array?o=5123:n instanceof Int16Array?o=5122:n instanceof Uint32Array?o=5125:n instanceof Int32Array?o=5124:n instanceof Int8Array?o=5120:n instanceof Uint8Array&&(o=5121),{buffer:a,type:o,bytesPerElement:n.BYTES_PER_ELEMENT,version:t.version}}(t,i)):a.version<t.version&&(function(t,n,i)
{var a=n.array,o=n.updateRange;e.bindBuffer(i,t),-1===o.count?e.bufferSubData(i,0,a):(r?e.bufferSubData(i,o.offset*a.BYTES_PER_ELEMENT,a,o.offset,o.count):e.bufferSubData(i,o.offset*a.BYTES_PER_ELEMENT,a.subarray(o.offset,o.offset+o.count)),o.count=-1)}(a.buffer,t,i),a.version=t.version)}}}
function PlaneGeometry(e,t,r,n)
{Geometry.call(this),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:r,heightSegments:n},this.fromBufferGeometry(new PlaneBufferGeometry(e,t,r,n)),this.mergeVertices()}
function PlaneBufferGeometry(e,t,r,n)
{BufferGeometry.call(this),this.type="PlaneBufferGeometry",this.parameters={width:e,height:t,widthSegments:r,heightSegments:n};var i,a,o=(e=e||1)/2,s=(t=t||1)/2,l=Math.floor(r)||1,c=Math.floor(n)||1,h=l+1,u=c+1,d=e/l,p=t/c,m=[],f=[],g=[],v=[];for(a=0;a<u;a++)
{var y=a*p-s;for(i=0;i<h;i++)
{var _=i*d-o;f.push(_,-y,0),g.push(0,0,1),v.push(i/l),v.push(1-a/c)}}
for(a=0;a<c;a++)
for(i=0;i<l;i++)
{var b=i+h*a,x=i+h*(a+1),M=i+1+h*(a+1),w=i+1+h*a;m.push(b,x,w),m.push(x,M,w)}
this.setIndex(m),this.setAttribute("position",new Float32BufferAttribute(f,3)),this.setAttribute("normal",new Float32BufferAttribute(g,3)),this.setAttribute("uv",new Float32BufferAttribute(v,2))}
PlaneGeometry.prototype=Object.create(Geometry.prototype),PlaneGeometry.prototype.constructor=PlaneGeometry,PlaneBufferGeometry.prototype=Object.create(BufferGeometry.prototype),PlaneBufferGeometry.prototype.constructor=PlaneBufferGeometry;var alphamap_fragment="#ifdef USE_ALPHAMAP\n\tdiffuseColor.a *= texture2D( alphaMap, vUv ).g;\n#endif",alphamap_pars_fragment="#ifdef USE_ALPHAMAP\n\tuniform sampler2D alphaMap;\n#endif",alphatest_fragment="#ifdef ALPHATEST\n\tif ( diffuseColor.a < ALPHATEST ) discard;\n#endif",aomap_fragment="#ifdef USE_AOMAP\n\tfloat ambientOcclusion = ( texture2D( aoMap, vUv2 ).r - 1.0 ) * aoMapIntensity + 1.0;\n\treflectedLight.indirectDiffuse *= ambientOcclusion;\n\t#if defined( USE_ENVMAP ) && defined( STANDARD )\n\t\tfloat dotNV = saturate( dot( geometry.normal, geometry.viewDir ) );\n\t\treflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.specularRoughness );\n\t#endif\n#endif",aomap_pars_fragment="#ifdef USE_AOMAP\n\tuniform sampler2D aoMap;\n\tuniform float aoMapIntensity;\n#endif",begin_vertex="vec3 transformed = vec3( position );",beginnormal_vertex="vec3 objectNormal = vec3( normal );\n#ifdef USE_TANGENT\n\tvec3 objectTangent = vec3( tangent.xyz );\n#endif",bsdfs="vec2 integrateSpecularBRDF( const in float dotNV, const in float roughness ) {\n\tconst vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );\n\tconst vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );\n\tvec4 r = roughness * c0 + c1;\n\tfloat a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;\n\treturn vec2( -1.04, 1.04 ) * a004 + r.zw;\n}\nfloat punctualLightIntensityToIrradianceFactor( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {\n#if defined ( PHYSICALLY_CORRECT_LIGHTS )\n\tfloat distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );\n\tif( cutoffDistance > 0.0 ) {\n\t\tdistanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );\n\t}\n\treturn distanceFalloff;\n#else\n\tif( cutoffDistance > 0.0 && decayExponent > 0.0 ) {\n\t\treturn pow( saturate( -lightDistance / cutoffDistance + 1.0 ), decayExponent );\n\t}\n\treturn 1.0;\n#endif\n}\nvec3 BRDF_Diffuse_Lambert( const in vec3 diffuseColor ) {\n\treturn RECIPROCAL_PI * diffuseColor;\n}\nvec3 F_Schlick( const in vec3 specularColor, const in float dotLH ) {\n\tfloat fresnel = exp2( ( -5.55473 * dotLH - 6.98316 ) * dotLH );\n\treturn ( 1.0 - specularColor ) * fresnel + specularColor;\n}\nvec3 F_Schlick_RoughnessDependent( const in vec3 F0, const in float dotNV, const in float roughness ) {\n\tfloat fresnel = exp2( ( -5.55473 * dotNV - 6.98316 ) * dotNV );\n\tvec3 Fr = max( vec3( 1.0 - roughness ), F0 ) - F0;\n\treturn Fr * fresnel + F0;\n}\nfloat G_GGX_Smith( const in float alpha, const in float dotNL, const in float dotNV ) {\n\tfloat a2 = pow2( alpha );\n\tfloat gl = dotNL + sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );\n\tfloat gv = dotNV + sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );\n\treturn 1.0 / ( gl * gv );\n}\nfloat G_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {\n\tfloat a2 = pow2( alpha );\n\tfloat gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );\n\tfloat gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );\n\treturn 0.5 / max( gv + gl, EPSILON );\n}\nfloat D_GGX( const in float alpha, const in float dotNH ) {\n\tfloat a2 = pow2( alpha );\n\tfloat denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;\n\treturn RECIPROCAL_PI * a2 / pow2( denom );\n}\nvec3 BRDF_Specular_GGX( const in IncidentLight incidentLight, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float roughness ) {\n\tfloat alpha = pow2( roughness );\n\tvec3 halfDir = normalize( incidentLight.direction + viewDir );\n\tfloat dotNL = saturate( dot( normal, incidentLight.direction ) );\n\tfloat dotNV = saturate( dot( normal, viewDir ) );\n\tfloat dotNH = saturate( dot( normal, halfDir ) );\n\tfloat dotLH = saturate( dot( incidentLight.direction, halfDir ) );\n\tvec3 F = F_Schlick( specularColor, dotLH );\n\tfloat G = G_GGX_SmithCorrelated( alpha, dotNL, dotNV );\n\tfloat D = D_GGX( alpha, dotNH );\n\treturn F * ( G * D );\n}\nvec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {\n\tconst float LUT_SIZE  = 64.0;\n\tconst float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;\n\tconst float LUT_BIAS  = 0.5 / LUT_SIZE;\n\tfloat dotNV = saturate( dot( N, V ) );\n\tvec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );\n\tuv = uv * LUT_SCALE + LUT_BIAS;\n\treturn uv;\n}\nfloat LTC_ClippedSphereFormFactor( const in vec3 f ) {\n\tfloat l = length( f );\n\treturn max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );\n}\nvec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {\n\tfloat x = dot( v1, v2 );\n\tfloat y = abs( x );\n\tfloat a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;\n\tfloat b = 3.4175940 + ( 4.1616724 + y ) * y;\n\tfloat v = a / b;\n\tfloat theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;\n\treturn cross( v1, v2 ) * theta_sintheta;\n}\nvec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {\n\tvec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];\n\tvec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];\n\tvec3 lightNormal = cross( v1, v2 );\n\tif( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );\n\tvec3 T1, T2;\n\tT1 = normalize( V - N * dot( V, N ) );\n\tT2 = - cross( N, T1 );\n\tmat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );\n\tvec3 coords[ 4 ];\n\tcoords[ 0 ] = mat * ( rectCoords[ 0 ] - P );\n\tcoords[ 1 ] = mat * ( rectCoords[ 1 ] - P );\n\tcoords[ 2 ] = mat * ( rectCoords[ 2 ] - P );\n\tcoords[ 3 ] = mat * ( rectCoords[ 3 ] - P );\n\tcoords[ 0 ] = normalize( coords[ 0 ] );\n\tcoords[ 1 ] = normalize( coords[ 1 ] );\n\tcoords[ 2 ] = normalize( coords[ 2 ] );\n\tcoords[ 3 ] = normalize( coords[ 3 ] );\n\tvec3 vectorFormFactor = vec3( 0.0 );\n\tvectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );\n\tvectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );\n\tvectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );\n\tvectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );\n\tfloat result = LTC_ClippedSphereFormFactor( vectorFormFactor );\n\treturn vec3( result );\n}\nvec3 BRDF_Specular_GGX_Environment( const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float roughness ) {\n\tfloat dotNV = saturate( dot( normal, viewDir ) );\n\tvec2 brdf = integrateSpecularBRDF( dotNV, roughness );\n\treturn specularColor * brdf.x + brdf.y;\n}\nvoid BRDF_Specular_Multiscattering_Environment( const in GeometricContext geometry, const in vec3 specularColor, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {\n\tfloat dotNV = saturate( dot( geometry.normal, geometry.viewDir ) );\n\tvec3 F = F_Schlick_RoughnessDependent( specularColor, dotNV, roughness );\n\tvec2 brdf = integrateSpecularBRDF( dotNV, roughness );\n\tvec3 FssEss = F * brdf.x + brdf.y;\n\tfloat Ess = brdf.x + brdf.y;\n\tfloat Ems = 1.0 - Ess;\n\tvec3 Favg = specularColor + ( 1.0 - specularColor ) * 0.047619;\tvec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );\n\tsingleScatter += FssEss;\n\tmultiScatter += Fms * Ems;\n}\nfloat G_BlinnPhong_Implicit( ) {\n\treturn 0.25;\n}\nfloat D_BlinnPhong( const in float shininess, const in float dotNH ) {\n\treturn RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );\n}\nvec3 BRDF_Specular_BlinnPhong( const in IncidentLight incidentLight, const in GeometricContext geometry, const in vec3 specularColor, const in float shininess ) {\n\tvec3 halfDir = normalize( incidentLight.direction + geometry.viewDir );\n\tfloat dotNH = saturate( dot( geometry.normal, halfDir ) );\n\tfloat dotLH = saturate( dot( incidentLight.direction, halfDir ) );\n\tvec3 F = F_Schlick( specularColor, dotLH );\n\tfloat G = G_BlinnPhong_Implicit( );\n\tfloat D = D_BlinnPhong( shininess, dotNH );\n\treturn F * ( G * D );\n}\nfloat GGXRoughnessToBlinnExponent( const in float ggxRoughness ) {\n\treturn ( 2.0 / pow2( ggxRoughness + 0.0001 ) - 2.0 );\n}\nfloat BlinnExponentToGGXRoughness( const in float blinnExponent ) {\n\treturn sqrt( 2.0 / ( blinnExponent + 2.0 ) );\n}\n#if defined( USE_SHEEN )\nfloat D_Charlie(float roughness, float NoH) {\n\tfloat invAlpha  = 1.0 / roughness;\n\tfloat cos2h = NoH * NoH;\n\tfloat sin2h = max(1.0 - cos2h, 0.0078125);\treturn (2.0 + invAlpha) * pow(sin2h, invAlpha * 0.5) / (2.0 * PI);\n}\nfloat V_Neubelt(float NoV, float NoL) {\n\treturn saturate(1.0 / (4.0 * (NoL + NoV - NoL * NoV)));\n}\nvec3 BRDF_Specular_Sheen( const in float roughness, const in vec3 L, const in GeometricContext geometry, vec3 specularColor ) {\n\tvec3 N = geometry.normal;\n\tvec3 V = geometry.viewDir;\n\tvec3 H = normalize( V + L );\n\tfloat dotNH = saturate( dot( N, H ) );\n\treturn specularColor * D_Charlie( roughness, dotNH ) * V_Neubelt( dot(N, V), dot(N, L) );\n}\n#endif",bumpmap_pars_fragment="#ifdef USE_BUMPMAP\n\tuniform sampler2D bumpMap;\n\tuniform float bumpScale;\n\tvec2 dHdxy_fwd() {\n\t\tvec2 dSTdx = dFdx( vUv );\n\t\tvec2 dSTdy = dFdy( vUv );\n\t\tfloat Hll = bumpScale * texture2D( bumpMap, vUv ).x;\n\t\tfloat dBx = bumpScale * texture2D( bumpMap, vUv + dSTdx ).x - Hll;\n\t\tfloat dBy = bumpScale * texture2D( bumpMap, vUv + dSTdy ).x - Hll;\n\t\treturn vec2( dBx, dBy );\n\t}\n\tvec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy ) {\n\t\tvec3 vSigmaX = vec3( dFdx( surf_pos.x ), dFdx( surf_pos.y ), dFdx( surf_pos.z ) );\n\t\tvec3 vSigmaY = vec3( dFdy( surf_pos.x ), dFdy( surf_pos.y ), dFdy( surf_pos.z ) );\n\t\tvec3 vN = surf_norm;\n\t\tvec3 R1 = cross( vSigmaY, vN );\n\t\tvec3 R2 = cross( vN, vSigmaX );\n\t\tfloat fDet = dot( vSigmaX, R1 );\n\t\tfDet *= ( float( gl_FrontFacing ) * 2.0 - 1.0 );\n\t\tvec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );\n\t\treturn normalize( abs( fDet ) * surf_norm - vGrad );\n\t}\n#endif",clipping_planes_fragment="#if NUM_CLIPPING_PLANES > 0\n\tvec4 plane;\n\t#pragma unroll_loop\n\tfor ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {\n\t\tplane = clippingPlanes[ i ];\n\t\tif ( dot( vViewPosition, plane.xyz ) > plane.w ) discard;\n\t}\n\t#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES\n\t\tbool clipped = true;\n\t\t#pragma unroll_loop\n\t\tfor ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {\n\t\t\tplane = clippingPlanes[ i ];\n\t\t\tclipped = ( dot( vViewPosition, plane.xyz ) > plane.w ) && clipped;\n\t\t}\n\t\tif ( clipped ) discard;\n\t#endif\n#endif",clipping_planes_pars_fragment="#if NUM_CLIPPING_PLANES > 0\n\t#if ! defined( STANDARD ) && ! defined( PHONG ) && ! defined( MATCAP )\n\t\tvarying vec3 vViewPosition;\n\t#endif\n\tuniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];\n#endif",clipping_planes_pars_vertex="#if NUM_CLIPPING_PLANES > 0 && ! defined( STANDARD ) && ! defined( PHONG ) && ! defined( MATCAP )\n\tvarying vec3 vViewPosition;\n#endif",clipping_planes_vertex="#if NUM_CLIPPING_PLANES > 0 && ! defined( STANDARD ) && ! defined( PHONG ) && ! defined( MATCAP )\n\tvViewPosition = - mvPosition.xyz;\n#endif",color_fragment="#ifdef USE_COLOR\n\tdiffuseColor.rgb *= vColor;\n#endif",color_pars_fragment="#ifdef USE_COLOR\n\tvarying vec3 vColor;\n#endif",color_pars_vertex="#ifdef USE_COLOR\n\tvarying vec3 vColor;\n#endif",color_vertex="#ifdef USE_COLOR\n\tvColor.xyz = color.xyz;\n#endif",common="#define PI 3.14159265359\n#define PI2 6.28318530718\n#define PI_HALF 1.5707963267949\n#define RECIPROCAL_PI 0.31830988618\n#define RECIPROCAL_PI2 0.15915494\n#define LOG2 1.442695\n#define EPSILON 1e-6\n#ifndef saturate\n#define saturate(a) clamp( a, 0.0, 1.0 )\n#endif\n#define whiteComplement(a) ( 1.0 - saturate( a ) )\nfloat pow2( const in float x ) { return x*x; }\nfloat pow3( const in float x ) { return x*x*x; }\nfloat pow4( const in float x ) { float x2 = x*x; return x2*x2; }\nfloat average( const in vec3 color ) { return dot( color, vec3( 0.3333 ) ); }\nhighp float rand( const in vec2 uv ) {\n\tconst highp float a = 12.9898, b = 78.233, c = 43758.5453;\n\thighp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );\n\treturn fract(sin(sn) * c);\n}\n#ifdef HIGH_PRECISION\n\tfloat precisionSafeLength( vec3 v ) { return length( v ); }\n#else\n\tfloat max3( vec3 v ) { return max( max( v.x, v.y ), v.z ); }\n\tfloat precisionSafeLength( vec3 v ) {\n\t\tfloat maxComponent = max3( abs( v ) );\n\t\treturn length( v / maxComponent ) * maxComponent;\n\t}\n#endif\nstruct IncidentLight {\n\tvec3 color;\n\tvec3 direction;\n\tbool visible;\n};\nstruct ReflectedLight {\n\tvec3 directDiffuse;\n\tvec3 directSpecular;\n\tvec3 indirectDiffuse;\n\tvec3 indirectSpecular;\n};\nstruct GeometricContext {\n\tvec3 position;\n\tvec3 normal;\n\tvec3 viewDir;\n#ifdef CLEARCOAT\n\tvec3 clearcoatNormal;\n#endif\n};\nvec3 transformDirection( in vec3 dir, in mat4 matrix ) {\n\treturn normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );\n}\nvec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {\n\treturn normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );\n}\nvec3 projectOnPlane(in vec3 point, in vec3 pointOnPlane, in vec3 planeNormal ) {\n\tfloat distance = dot( planeNormal, point - pointOnPlane );\n\treturn - distance * planeNormal + point;\n}\nfloat sideOfPlane( in vec3 point, in vec3 pointOnPlane, in vec3 planeNormal ) {\n\treturn sign( dot( point - pointOnPlane, planeNormal ) );\n}\nvec3 linePlaneIntersect( in vec3 pointOnLine, in vec3 lineDirection, in vec3 pointOnPlane, in vec3 planeNormal ) {\n\treturn lineDirection * ( dot( planeNormal, pointOnPlane - pointOnLine ) / dot( planeNormal, lineDirection ) ) + pointOnLine;\n}\nmat3 transposeMat3( const in mat3 m ) {\n\tmat3 tmp;\n\ttmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );\n\ttmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );\n\ttmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );\n\treturn tmp;\n}\nfloat linearToRelativeLuminance( const in vec3 color ) {\n\tvec3 weights = vec3( 0.2126, 0.7152, 0.0722 );\n\treturn dot( weights, color.rgb );\n}\nbool isPerspectiveMatrix( mat4 m ) {\n  return m[ 2 ][ 3 ] == - 1.0;\n}",cube_uv_reflection_fragment="#ifdef ENVMAP_TYPE_CUBE_UV\n#define cubeUV_maxMipLevel 8.0\n#define cubeUV_minMipLevel 4.0\n#define cubeUV_maxTileSize 256.0\n#define cubeUV_minTileSize 16.0\nfloat getFace(vec3 direction) {\n    vec3 absDirection = abs(direction);\n    float face = -1.0;\n    if (absDirection.x > absDirection.z) {\n      if (absDirection.x > absDirection.y)\n        face = direction.x > 0.0 ? 0.0 : 3.0;\n      else\n        face = direction.y > 0.0 ? 1.0 : 4.0;\n    } else {\n      if (absDirection.z > absDirection.y)\n        face = direction.z > 0.0 ? 2.0 : 5.0;\n      else\n        face = direction.y > 0.0 ? 1.0 : 4.0;\n    }\n    return face;\n}\nvec2 getUV(vec3 direction, float face) {\n    vec2 uv;\n    if (face == 0.0) {\n      uv = vec2(-direction.z, direction.y) / abs(direction.x);\n    } else if (face == 1.0) {\n      uv = vec2(direction.x, -direction.z) / abs(direction.y);\n    } else if (face == 2.0) {\n      uv = direction.xy / abs(direction.z);\n    } else if (face == 3.0) {\n      uv = vec2(direction.z, direction.y) / abs(direction.x);\n    } else if (face == 4.0) {\n      uv = direction.xz / abs(direction.y);\n    } else {\n      uv = vec2(-direction.x, direction.y) / abs(direction.z);\n    }\n    return 0.5 * (uv + 1.0);\n}\nvec3 bilinearCubeUV(sampler2D envMap, vec3 direction, float mipInt) {\n  float face = getFace(direction);\n  float filterInt = max(cubeUV_minMipLevel - mipInt, 0.0);\n  mipInt = max(mipInt, cubeUV_minMipLevel);\n  float faceSize = exp2(mipInt);\n  float texelSize = 1.0 / (3.0 * cubeUV_maxTileSize);\n  vec2 uv = getUV(direction, face) * (faceSize - 1.0);\n  vec2 f = fract(uv);\n  uv += 0.5 - f;\n  if (face > 2.0) {\n    uv.y += faceSize;\n    face -= 3.0;\n  }\n  uv.x += face * faceSize;\n  if(mipInt < cubeUV_maxMipLevel){\n    uv.y += 2.0 * cubeUV_maxTileSize;\n  }\n  uv.y += filterInt * 2.0 * cubeUV_minTileSize;\n  uv.x += 3.0 * max(0.0, cubeUV_maxTileSize - 2.0 * faceSize);\n  uv *= texelSize;\n  vec3 tl = envMapTexelToLinear(texture2D(envMap, uv)).rgb;\n  uv.x += texelSize;\n  vec3 tr = envMapTexelToLinear(texture2D(envMap, uv)).rgb;\n  uv.y += texelSize;\n  vec3 br = envMapTexelToLinear(texture2D(envMap, uv)).rgb;\n  uv.x -= texelSize;\n  vec3 bl = envMapTexelToLinear(texture2D(envMap, uv)).rgb;\n  vec3 tm = mix(tl, tr, f.x);\n  vec3 bm = mix(bl, br, f.x);\n  return mix(tm, bm, f.y);\n}\n#define r0 1.0\n#define v0 0.339\n#define m0 -2.0\n#define r1 0.8\n#define v1 0.276\n#define m1 -1.0\n#define r4 0.4\n#define v4 0.046\n#define m4 2.0\n#define r5 0.305\n#define v5 0.016\n#define m5 3.0\n#define r6 0.21\n#define v6 0.0038\n#define m6 4.0\nfloat roughnessToMip(float roughness) {\n  float mip = 0.0;\n  if (roughness >= r1) {\n    mip = (r0 - roughness) * (m1 - m0) / (r0 - r1) + m0;\n  } else if (roughness >= r4) {\n    mip = (r1 - roughness) * (m4 - m1) / (r1 - r4) + m1;\n  } else if (roughness >= r5) {\n    mip = (r4 - roughness) * (m5 - m4) / (r4 - r5) + m4;\n  } else if (roughness >= r6) {\n    mip = (r5 - roughness) * (m6 - m5) / (r5 - r6) + m5;\n  } else {\n    mip = -2.0 * log2(1.16 * roughness);  }\n  return mip;\n}\nvec4 textureCubeUV(sampler2D envMap, vec3 sampleDir, float roughness) {\n  float mip = clamp(roughnessToMip(roughness), m0, cubeUV_maxMipLevel);\n  float mipF = fract(mip);\n  float mipInt = floor(mip);\n  vec3 color0 = bilinearCubeUV(envMap, sampleDir, mipInt);\n  if (mipF == 0.0) {\n    return vec4(color0, 1.0);\n  } else {\n    vec3 color1 = bilinearCubeUV(envMap, sampleDir, mipInt + 1.0);\n    return vec4(mix(color0, color1, mipF), 1.0);\n  }\n}\n#endif",defaultnormal_vertex="vec3 transformedNormal = objectNormal;\n#ifdef USE_INSTANCING\n\ttransformedNormal = mat3( instanceMatrix ) * transformedNormal;\n#endif\ntransformedNormal = normalMatrix * transformedNormal;\n#ifdef FLIP_SIDED\n\ttransformedNormal = - transformedNormal;\n#endif\n#ifdef USE_TANGENT\n\tvec3 transformedTangent = ( modelViewMatrix * vec4( objectTangent, 0.0 ) ).xyz;\n\t#ifdef FLIP_SIDED\n\t\ttransformedTangent = - transformedTangent;\n\t#endif\n#endif",displacementmap_pars_vertex="#ifdef USE_DISPLACEMENTMAP\n\tuniform sampler2D displacementMap;\n\tuniform float displacementScale;\n\tuniform float displacementBias;\n#endif",displacementmap_vertex="#ifdef USE_DISPLACEMENTMAP\n\ttransformed += normalize( objectNormal ) * ( texture2D( displacementMap, vUv ).x * displacementScale + displacementBias );\n#endif",emissivemap_fragment="#ifdef USE_EMISSIVEMAP\n\tvec4 emissiveColor = texture2D( emissiveMap, vUv );\n\temissiveColor.rgb = emissiveMapTexelToLinear( emissiveColor ).rgb;\n\ttotalEmissiveRadiance *= emissiveColor.rgb;\n#endif",emissivemap_pars_fragment="#ifdef USE_EMISSIVEMAP\n\tuniform sampler2D emissiveMap;\n#endif",encodings_fragment="gl_FragColor = linearToOutputTexel( gl_FragColor );",encodings_pars_fragment="\nvec4 LinearToLinear( in vec4 value ) {\n\treturn value;\n}\nvec4 GammaToLinear( in vec4 value, in float gammaFactor ) {\n\treturn vec4( pow( value.rgb, vec3( gammaFactor ) ), value.a );\n}\nvec4 LinearToGamma( in vec4 value, in float gammaFactor ) {\n\treturn vec4( pow( value.rgb, vec3( 1.0 / gammaFactor ) ), value.a );\n}\nvec4 sRGBToLinear( in vec4 value ) {\n\treturn vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );\n}\nvec4 LinearTosRGB( in vec4 value ) {\n\treturn vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );\n}\nvec4 RGBEToLinear( in vec4 value ) {\n\treturn vec4( value.rgb * exp2( value.a * 255.0 - 128.0 ), 1.0 );\n}\nvec4 LinearToRGBE( in vec4 value ) {\n\tfloat maxComponent = max( max( value.r, value.g ), value.b );\n\tfloat fExp = clamp( ceil( log2( maxComponent ) ), -128.0, 127.0 );\n\treturn vec4( value.rgb / exp2( fExp ), ( fExp + 128.0 ) / 255.0 );\n}\nvec4 RGBMToLinear( in vec4 value, in float maxRange ) {\n\treturn vec4( value.rgb * value.a * maxRange, 1.0 );\n}\nvec4 LinearToRGBM( in vec4 value, in float maxRange ) {\n\tfloat maxRGB = max( value.r, max( value.g, value.b ) );\n\tfloat M = clamp( maxRGB / maxRange, 0.0, 1.0 );\n\tM = ceil( M * 255.0 ) / 255.0;\n\treturn vec4( value.rgb / ( M * maxRange ), M );\n}\nvec4 RGBDToLinear( in vec4 value, in float maxRange ) {\n\treturn vec4( value.rgb * ( ( maxRange / 255.0 ) / value.a ), 1.0 );\n}\nvec4 LinearToRGBD( in vec4 value, in float maxRange ) {\n\tfloat maxRGB = max( value.r, max( value.g, value.b ) );\n\tfloat D = max( maxRange / maxRGB, 1.0 );\n\tD = clamp( floor( D ) / 255.0, 0.0, 1.0 );\n\treturn vec4( value.rgb * ( D * ( 255.0 / maxRange ) ), D );\n}\nconst mat3 cLogLuvM = mat3( 0.2209, 0.3390, 0.4184, 0.1138, 0.6780, 0.7319, 0.0102, 0.1130, 0.2969 );\nvec4 LinearToLogLuv( in vec4 value )  {\n\tvec3 Xp_Y_XYZp = cLogLuvM * value.rgb;\n\tXp_Y_XYZp = max( Xp_Y_XYZp, vec3( 1e-6, 1e-6, 1e-6 ) );\n\tvec4 vResult;\n\tvResult.xy = Xp_Y_XYZp.xy / Xp_Y_XYZp.z;\n\tfloat Le = 2.0 * log2(Xp_Y_XYZp.y) + 127.0;\n\tvResult.w = fract( Le );\n\tvResult.z = ( Le - ( floor( vResult.w * 255.0 ) ) / 255.0 ) / 255.0;\n\treturn vResult;\n}\nconst mat3 cLogLuvInverseM = mat3( 6.0014, -2.7008, -1.7996, -1.3320, 3.1029, -5.7721, 0.3008, -1.0882, 5.6268 );\nvec4 LogLuvToLinear( in vec4 value ) {\n\tfloat Le = value.z * 255.0 + value.w;\n\tvec3 Xp_Y_XYZp;\n\tXp_Y_XYZp.y = exp2( ( Le - 127.0 ) / 2.0 );\n\tXp_Y_XYZp.z = Xp_Y_XYZp.y / value.y;\n\tXp_Y_XYZp.x = value.x * Xp_Y_XYZp.z;\n\tvec3 vRGB = cLogLuvInverseM * Xp_Y_XYZp.rgb;\n\treturn vec4( max( vRGB, 0.0 ), 1.0 );\n}",envmap_fragment="#ifdef USE_ENVMAP\n\t#ifdef ENV_WORLDPOS\n\t\tvec3 cameraToFrag;\n\t\t\n\t\tif ( isOrthographic ) {\n\t\t\tcameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );\n\t\t}  else {\n\t\t\tcameraToFrag = normalize( vWorldPosition - cameraPosition );\n\t\t}\n\t\tvec3 worldNormal = inverseTransformDirection( normal, viewMatrix );\n\t\t#ifdef ENVMAP_MODE_REFLECTION\n\t\t\tvec3 reflectVec = reflect( cameraToFrag, worldNormal );\n\t\t#else\n\t\t\tvec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );\n\t\t#endif\n\t#else\n\t\tvec3 reflectVec = vReflect;\n\t#endif\n\t#ifdef ENVMAP_TYPE_CUBE\n\t\tvec4 envColor = textureCube( envMap, vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );\n\t#elif defined( ENVMAP_TYPE_CUBE_UV )\n\t\tvec4 envColor = textureCubeUV( envMap, reflectVec, 0.0 );\n\t#elif defined( ENVMAP_TYPE_EQUIREC )\n\t\tvec2 sampleUV;\n\t\treflectVec = normalize( reflectVec );\n\t\tsampleUV.y = asin( clamp( reflectVec.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;\n\t\tsampleUV.x = atan( reflectVec.z, reflectVec.x ) * RECIPROCAL_PI2 + 0.5;\n\t\tvec4 envColor = texture2D( envMap, sampleUV );\n\t#elif defined( ENVMAP_TYPE_SPHERE )\n\t\treflectVec = normalize( reflectVec );\n\t\tvec3 reflectView = normalize( ( viewMatrix * vec4( reflectVec, 0.0 ) ).xyz + vec3( 0.0, 0.0, 1.0 ) );\n\t\tvec4 envColor = texture2D( envMap, reflectView.xy * 0.5 + 0.5 );\n\t#else\n\t\tvec4 envColor = vec4( 0.0 );\n\t#endif\n\t#ifndef ENVMAP_TYPE_CUBE_UV\n\t\tenvColor = envMapTexelToLinear( envColor );\n\t#endif\n\t#ifdef ENVMAP_BLENDING_MULTIPLY\n\t\toutgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );\n\t#elif defined( ENVMAP_BLENDING_MIX )\n\t\toutgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );\n\t#elif defined( ENVMAP_BLENDING_ADD )\n\t\toutgoingLight += envColor.xyz * specularStrength * reflectivity;\n\t#endif\n#endif",envmap_common_pars_fragment="#ifdef USE_ENVMAP\n\tuniform float envMapIntensity;\n\tuniform float flipEnvMap;\n\tuniform int maxMipLevel;\n\t#ifdef ENVMAP_TYPE_CUBE\n\t\tuniform samplerCube envMap;\n\t#else\n\t\tuniform sampler2D envMap;\n\t#endif\n\t\n#endif",envmap_pars_fragment="#ifdef USE_ENVMAP\n\tuniform float reflectivity;\n\t#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG )\n\t\t#define ENV_WORLDPOS\n\t#endif\n\t#ifdef ENV_WORLDPOS\n\t\tvarying vec3 vWorldPosition;\n\t\tuniform float refractionRatio;\n\t#else\n\t\tvarying vec3 vReflect;\n\t#endif\n#endif",envmap_pars_vertex="#ifdef USE_ENVMAP\n\t#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) ||defined( PHONG )\n\t\t#define ENV_WORLDPOS\n\t#endif\n\t#ifdef ENV_WORLDPOS\n\t\t\n\t\tvarying vec3 vWorldPosition;\n\t#else\n\t\tvarying vec3 vReflect;\n\t\tuniform float refractionRatio;\n\t#endif\n#endif",envmap_vertex="#ifdef USE_ENVMAP\n\t#ifdef ENV_WORLDPOS\n\t\tvWorldPosition = worldPosition.xyz;\n\t#else\n\t\tvec3 cameraToVertex;\n\t\tif ( isOrthographic ) { \n\t\t\tcameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );\n\t\t} else {\n\t\t\tcameraToVertex = normalize( worldPosition.xyz - cameraPosition );\n\t\t}\n\t\tvec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );\n\t\t#ifdef ENVMAP_MODE_REFLECTION\n\t\t\tvReflect = reflect( cameraToVertex, worldNormal );\n\t\t#else\n\t\t\tvReflect = refract( cameraToVertex, worldNormal, refractionRatio );\n\t\t#endif\n\t#endif\n#endif",fog_vertex="#ifdef USE_FOG\n\tfogDepth = -mvPosition.z;\n#endif",fog_pars_vertex="#ifdef USE_FOG\n\tvarying float fogDepth;\n#endif",fog_fragment="#ifdef USE_FOG\n\t#ifdef FOG_EXP2\n\t\tfloat fogFactor = 1.0 - exp( - fogDensity * fogDensity * fogDepth * fogDepth );\n\t#else\n\t\tfloat fogFactor = smoothstep( fogNear, fogFar, fogDepth );\n\t#endif\n\tgl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );\n#endif",fog_pars_fragment="#ifdef USE_FOG\n\tuniform vec3 fogColor;\n\tvarying float fogDepth;\n\t#ifdef FOG_EXP2\n\t\tuniform float fogDensity;\n\t#else\n\t\tuniform float fogNear;\n\t\tuniform float fogFar;\n\t#endif\n#endif",gradientmap_pars_fragment="#ifdef USE_GRADIENTMAP\n\tuniform sampler2D gradientMap;\n#endif\nvec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {\n\tfloat dotNL = dot( normal, lightDirection );\n\tvec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );\n\t#ifdef USE_GRADIENTMAP\n\t\treturn texture2D( gradientMap, coord ).rgb;\n\t#else\n\t\treturn ( coord.x < 0.7 ) ? vec3( 0.7 ) : vec3( 1.0 );\n\t#endif\n}",lightmap_fragment="#ifdef USE_LIGHTMAP\n\tvec4 lightMapTexel= texture2D( lightMap, vUv2 );\n\treflectedLight.indirectDiffuse += PI * lightMapTexelToLinear( lightMapTexel ).rgb * lightMapIntensity;\n#endif",lightmap_pars_fragment="#ifdef USE_LIGHTMAP\n\tuniform sampler2D lightMap;\n\tuniform float lightMapIntensity;\n#endif",lights_lambert_vertex="vec3 diffuse = vec3( 1.0 );\nGeometricContext geometry;\ngeometry.position = mvPosition.xyz;\ngeometry.normal = normalize( transformedNormal );\ngeometry.viewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( -mvPosition.xyz );\nGeometricContext backGeometry;\nbackGeometry.position = geometry.position;\nbackGeometry.normal = -geometry.normal;\nbackGeometry.viewDir = geometry.viewDir;\nvLightFront = vec3( 0.0 );\nvIndirectFront = vec3( 0.0 );\n#ifdef DOUBLE_SIDED\n\tvLightBack = vec3( 0.0 );\n\tvIndirectBack = vec3( 0.0 );\n#endif\nIncidentLight directLight;\nfloat dotNL;\nvec3 directLightColor_Diffuse;\n#if NUM_POINT_LIGHTS > 0\n\t#pragma unroll_loop\n\tfor ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {\n\t\tgetPointDirectLightIrradiance( pointLights[ i ], geometry, directLight );\n\t\tdotNL = dot( geometry.normal, directLight.direction );\n\t\tdirectLightColor_Diffuse = PI * directLight.color;\n\t\tvLightFront += saturate( dotNL ) * directLightColor_Diffuse;\n\t\t#ifdef DOUBLE_SIDED\n\t\t\tvLightBack += saturate( -dotNL ) * directLightColor_Diffuse;\n\t\t#endif\n\t}\n#endif\n#if NUM_SPOT_LIGHTS > 0\n\t#pragma unroll_loop\n\tfor ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {\n\t\tgetSpotDirectLightIrradiance( spotLights[ i ], geometry, directLight );\n\t\tdotNL = dot( geometry.normal, directLight.direction );\n\t\tdirectLightColor_Diffuse = PI * directLight.color;\n\t\tvLightFront += saturate( dotNL ) * directLightColor_Diffuse;\n\t\t#ifdef DOUBLE_SIDED\n\t\t\tvLightBack += saturate( -dotNL ) * directLightColor_Diffuse;\n\t\t#endif\n\t}\n#endif\n#if NUM_DIR_LIGHTS > 0\n\t#pragma unroll_loop\n\tfor ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {\n\t\tgetDirectionalDirectLightIrradiance( directionalLights[ i ], geometry, directLight );\n\t\tdotNL = dot( geometry.normal, directLight.direction );\n\t\tdirectLightColor_Diffuse = PI * directLight.color;\n\t\tvLightFront += saturate( dotNL ) * directLightColor_Diffuse;\n\t\t#ifdef DOUBLE_SIDED\n\t\t\tvLightBack += saturate( -dotNL ) * directLightColor_Diffuse;\n\t\t#endif\n\t}\n#endif\n#if NUM_HEMI_LIGHTS > 0\n\t#pragma unroll_loop\n\tfor ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {\n\t\tvIndirectFront += getHemisphereLightIrradiance( hemisphereLights[ i ], geometry );\n\t\t#ifdef DOUBLE_SIDED\n\t\t\tvIndirectBack += getHemisphereLightIrradiance( hemisphereLights[ i ], backGeometry );\n\t\t#endif\n\t}\n#endif",lights_pars_begin="uniform bool receiveShadow;\nuniform vec3 ambientLightColor;\nuniform vec3 lightProbe[ 9 ];\nvec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {\n\tfloat x = normal.x, y = normal.y, z = normal.z;\n\tvec3 result = shCoefficients[ 0 ] * 0.886227;\n\tresult += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;\n\tresult += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;\n\tresult += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;\n\tresult += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;\n\tresult += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;\n\tresult += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );\n\tresult += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;\n\tresult += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );\n\treturn result;\n}\nvec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in GeometricContext geometry ) {\n\tvec3 worldNormal = inverseTransformDirection( geometry.normal, viewMatrix );\n\tvec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );\n\treturn irradiance;\n}\nvec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {\n\tvec3 irradiance = ambientLightColor;\n\t#ifndef PHYSICALLY_CORRECT_LIGHTS\n\t\tirradiance *= PI;\n\t#endif\n\treturn irradiance;\n}\n#if NUM_DIR_LIGHTS > 0\n\tstruct DirectionalLight {\n\t\tvec3 direction;\n\t\tvec3 color;\n\t\tint shadow;\n\t\tfloat shadowBias;\n\t\tfloat shadowRadius;\n\t\tvec2 shadowMapSize;\n\t};\n\tuniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];\n\tvoid getDirectionalDirectLightIrradiance( const in DirectionalLight directionalLight, const in GeometricContext geometry, out IncidentLight directLight ) {\n\t\tdirectLight.color = directionalLight.color;\n\t\tdirectLight.direction = directionalLight.direction;\n\t\tdirectLight.visible = true;\n\t}\n#endif\n#if NUM_POINT_LIGHTS > 0\n\tstruct PointLight {\n\t\tvec3 position;\n\t\tvec3 color;\n\t\tfloat distance;\n\t\tfloat decay;\n\t\tint shadow;\n\t\tfloat shadowBias;\n\t\tfloat shadowRadius;\n\t\tvec2 shadowMapSize;\n\t\tfloat shadowCameraNear;\n\t\tfloat shadowCameraFar;\n\t};\n\tuniform PointLight pointLights[ NUM_POINT_LIGHTS ];\n\tvoid getPointDirectLightIrradiance( const in PointLight pointLight, const in GeometricContext geometry, out IncidentLight directLight ) {\n\t\tvec3 lVector = pointLight.position - geometry.position;\n\t\tdirectLight.direction = normalize( lVector );\n\t\tfloat lightDistance = length( lVector );\n\t\tdirectLight.color = pointLight.color;\n\t\tdirectLight.color *= punctualLightIntensityToIrradianceFactor( lightDistance, pointLight.distance, pointLight.decay );\n\t\tdirectLight.visible = ( directLight.color != vec3( 0.0 ) );\n\t}\n#endif\n#if NUM_SPOT_LIGHTS > 0\n\tstruct SpotLight {\n\t\tvec3 position;\n\t\tvec3 direction;\n\t\tvec3 color;\n\t\tfloat distance;\n\t\tfloat decay;\n\t\tfloat coneCos;\n\t\tfloat penumbraCos;\n\t\tint shadow;\n\t\tfloat shadowBias;\n\t\tfloat shadowRadius;\n\t\tvec2 shadowMapSize;\n\t};\n\tuniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];\n\tvoid getSpotDirectLightIrradiance( const in SpotLight spotLight, const in GeometricContext geometry, out IncidentLight directLight  ) {\n\t\tvec3 lVector = spotLight.position - geometry.position;\n\t\tdirectLight.direction = normalize( lVector );\n\t\tfloat lightDistance = length( lVector );\n\t\tfloat angleCos = dot( directLight.direction, spotLight.direction );\n\t\tif ( angleCos > spotLight.coneCos ) {\n\t\t\tfloat spotEffect = smoothstep( spotLight.coneCos, spotLight.penumbraCos, angleCos );\n\t\t\tdirectLight.color = spotLight.color;\n\t\t\tdirectLight.color *= spotEffect * punctualLightIntensityToIrradianceFactor( lightDistance, spotLight.distance, spotLight.decay );\n\t\t\tdirectLight.visible = true;\n\t\t} else {\n\t\t\tdirectLight.color = vec3( 0.0 );\n\t\t\tdirectLight.visible = false;\n\t\t}\n\t}\n#endif\n#if NUM_RECT_AREA_LIGHTS > 0\n\tstruct RectAreaLight {\n\t\tvec3 color;\n\t\tvec3 position;\n\t\tvec3 halfWidth;\n\t\tvec3 halfHeight;\n\t};\n\tuniform sampler2D ltc_1;\tuniform sampler2D ltc_2;\n\tuniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];\n#endif\n#if NUM_HEMI_LIGHTS > 0\n\tstruct HemisphereLight {\n\t\tvec3 direction;\n\t\tvec3 skyColor;\n\t\tvec3 groundColor;\n\t};\n\tuniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];\n\tvec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in GeometricContext geometry ) {\n\t\tfloat dotNL = dot( geometry.normal, hemiLight.direction );\n\t\tfloat hemiDiffuseWeight = 0.5 * dotNL + 0.5;\n\t\tvec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );\n\t\t#ifndef PHYSICALLY_CORRECT_LIGHTS\n\t\t\tirradiance *= PI;\n\t\t#endif\n\t\treturn irradiance;\n\t}\n#endif",envmap_physical_pars_fragment="#if defined( USE_ENVMAP )\n\t#ifdef ENVMAP_MODE_REFRACTION\n\t\tuniform float refractionRatio;\n\t#endif\n\tvec3 getLightProbeIndirectIrradiance( const in GeometricContext geometry, const in int maxMIPLevel ) {\n\t\tvec3 worldNormal = inverseTransformDirection( geometry.normal, viewMatrix );\n\t\t#ifdef ENVMAP_TYPE_CUBE\n\t\t\tvec3 queryVec = vec3( flipEnvMap * worldNormal.x, worldNormal.yz );\n\t\t\t#ifdef TEXTURE_LOD_EXT\n\t\t\t\tvec4 envMapColor = textureCubeLodEXT( envMap, queryVec, float( maxMIPLevel ) );\n\t\t\t#else\n\t\t\t\tvec4 envMapColor = textureCube( envMap, queryVec, float( maxMIPLevel ) );\n\t\t\t#endif\n\t\t\tenvMapColor.rgb = envMapTexelToLinear( envMapColor ).rgb;\n\t\t#elif defined( ENVMAP_TYPE_CUBE_UV )\n\t\t\tvec4 envMapColor = textureCubeUV( envMap, worldNormal, 1.0 );\n\t\t#else\n\t\t\tvec4 envMapColor = vec4( 0.0 );\n\t\t#endif\n\t\treturn PI * envMapColor.rgb * envMapIntensity;\n\t}\n\tfloat getSpecularMIPLevel( const in float roughness, const in int maxMIPLevel ) {\n\t\tfloat maxMIPLevelScalar = float( maxMIPLevel );\n\t\tfloat sigma = PI * roughness * roughness / ( 1.0 + roughness );\n\t\tfloat desiredMIPLevel = maxMIPLevelScalar + log2( sigma );\n\t\treturn clamp( desiredMIPLevel, 0.0, maxMIPLevelScalar );\n\t}\n\tvec3 getLightProbeIndirectRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in int maxMIPLevel ) {\n\t\t#ifdef ENVMAP_MODE_REFLECTION\n\t\t  vec3 reflectVec = reflect( -viewDir, normal );\n\t\t  reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );\n\t\t#else\n\t\t  vec3 reflectVec = refract( -viewDir, normal, refractionRatio );\n\t\t#endif\n\t\treflectVec = inverseTransformDirection( reflectVec, viewMatrix );\n\t\tfloat specularMIPLevel = getSpecularMIPLevel( roughness, maxMIPLevel );\n\t\t#ifdef ENVMAP_TYPE_CUBE\n\t\t\tvec3 queryReflectVec = vec3( flipEnvMap * reflectVec.x, reflectVec.yz );\n\t\t\t#ifdef TEXTURE_LOD_EXT\n\t\t\t\tvec4 envMapColor = textureCubeLodEXT( envMap, queryReflectVec, specularMIPLevel );\n\t\t\t#else\n\t\t\t\tvec4 envMapColor = textureCube( envMap, queryReflectVec, specularMIPLevel );\n\t\t\t#endif\n\t\t\tenvMapColor.rgb = envMapTexelToLinear( envMapColor ).rgb;\n\t\t#elif defined( ENVMAP_TYPE_CUBE_UV )\n\t\t\tvec4 envMapColor = textureCubeUV( envMap, reflectVec, roughness );\n\t\t#elif defined( ENVMAP_TYPE_EQUIREC )\n\t\t\tvec2 sampleUV;\n\t\t\tsampleUV.y = asin( clamp( reflectVec.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;\n\t\t\tsampleUV.x = atan( reflectVec.z, reflectVec.x ) * RECIPROCAL_PI2 + 0.5;\n\t\t\t#ifdef TEXTURE_LOD_EXT\n\t\t\t\tvec4 envMapColor = texture2DLodEXT( envMap, sampleUV, specularMIPLevel );\n\t\t\t#else\n\t\t\t\tvec4 envMapColor = texture2D( envMap, sampleUV, specularMIPLevel );\n\t\t\t#endif\n\t\t\tenvMapColor.rgb = envMapTexelToLinear( envMapColor ).rgb;\n\t\t#elif defined( ENVMAP_TYPE_SPHERE )\n\t\t\tvec3 reflectView = normalize( ( viewMatrix * vec4( reflectVec, 0.0 ) ).xyz + vec3( 0.0,0.0,1.0 ) );\n\t\t\t#ifdef TEXTURE_LOD_EXT\n\t\t\t\tvec4 envMapColor = texture2DLodEXT( envMap, reflectView.xy * 0.5 + 0.5, specularMIPLevel );\n\t\t\t#else\n\t\t\t\tvec4 envMapColor = texture2D( envMap, reflectView.xy * 0.5 + 0.5, specularMIPLevel );\n\t\t\t#endif\n\t\t\tenvMapColor.rgb = envMapTexelToLinear( envMapColor ).rgb;\n\t\t#endif\n\t\treturn envMapColor.rgb * envMapIntensity;\n\t}\n#endif",lights_toon_fragment="ToonMaterial material;\nmaterial.diffuseColor = diffuseColor.rgb;\nmaterial.specularColor = specular;\nmaterial.specularShininess = shininess;\nmaterial.specularStrength = specularStrength;",lights_toon_pars_fragment="varying vec3 vViewPosition;\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n#endif\nstruct ToonMaterial {\n\tvec3\tdiffuseColor;\n\tvec3\tspecularColor;\n\tfloat\tspecularShininess;\n\tfloat\tspecularStrength;\n};\nvoid RE_Direct_Toon( const in IncidentLight directLight, const in GeometricContext geometry, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {\n\tvec3 irradiance = getGradientIrradiance( geometry.normal, directLight.direction ) * directLight.color;\n\t#ifndef PHYSICALLY_CORRECT_LIGHTS\n\t\tirradiance *= PI;\n\t#endif\n\treflectedLight.directDiffuse += irradiance * BRDF_Diffuse_Lambert( material.diffuseColor );\n\treflectedLight.directSpecular += irradiance * BRDF_Specular_BlinnPhong( directLight, geometry, material.specularColor, material.specularShininess ) * material.specularStrength;\n}\nvoid RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in GeometricContext geometry, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {\n\treflectedLight.indirectDiffuse += irradiance * BRDF_Diffuse_Lambert( material.diffuseColor );\n}\n#define RE_Direct\t\t\t\tRE_Direct_Toon\n#define RE_IndirectDiffuse\t\tRE_IndirectDiffuse_Toon\n#define Material_LightProbeLOD( material )\t(0)",lights_phong_fragment="BlinnPhongMaterial material;\nmaterial.diffuseColor = diffuseColor.rgb;\nmaterial.specularColor = specular;\nmaterial.specularShininess = shininess;\nmaterial.specularStrength = specularStrength;",lights_phong_pars_fragment="varying vec3 vViewPosition;\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n#endif\nstruct BlinnPhongMaterial {\n\tvec3\tdiffuseColor;\n\tvec3\tspecularColor;\n\tfloat\tspecularShininess;\n\tfloat\tspecularStrength;\n};\nvoid RE_Direct_BlinnPhong( const in IncidentLight directLight, const in GeometricContext geometry, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {\n\tfloat dotNL = saturate( dot( geometry.normal, directLight.direction ) );\n\tvec3 irradiance = dotNL * directLight.color;\n\t#ifndef PHYSICALLY_CORRECT_LIGHTS\n\t\tirradiance *= PI;\n\t#endif\n\treflectedLight.directDiffuse += irradiance * BRDF_Diffuse_Lambert( material.diffuseColor );\n\treflectedLight.directSpecular += irradiance * BRDF_Specular_BlinnPhong( directLight, geometry, material.specularColor, material.specularShininess ) * material.specularStrength;\n}\nvoid RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in GeometricContext geometry, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {\n\treflectedLight.indirectDiffuse += irradiance * BRDF_Diffuse_Lambert( material.diffuseColor );\n}\n#define RE_Direct\t\t\t\tRE_Direct_BlinnPhong\n#define RE_IndirectDiffuse\t\tRE_IndirectDiffuse_BlinnPhong\n#define Material_LightProbeLOD( material )\t(0)",lights_physical_fragment="PhysicalMaterial material;\nmaterial.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );\nvec3 dxy = max( abs( dFdx( geometryNormal ) ), abs( dFdy( geometryNormal ) ) );\nfloat geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );\nmaterial.specularRoughness = max( roughnessFactor, 0.0525 );material.specularRoughness += geometryRoughness;\nmaterial.specularRoughness = min( material.specularRoughness, 1.0 );\n#ifdef REFLECTIVITY\n\tmaterial.specularColor = mix( vec3( MAXIMUM_SPECULAR_COEFFICIENT * pow2( reflectivity ) ), diffuseColor.rgb, metalnessFactor );\n#else\n\tmaterial.specularColor = mix( vec3( DEFAULT_SPECULAR_COEFFICIENT ), diffuseColor.rgb, metalnessFactor );\n#endif\n#ifdef CLEARCOAT\n\tmaterial.clearcoat = saturate( clearcoat );\tmaterial.clearcoatRoughness = max( clearcoatRoughness, 0.0525 );\n\tmaterial.clearcoatRoughness += geometryRoughness;\n\tmaterial.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );\n#endif\n#ifdef USE_SHEEN\n\tmaterial.sheenColor = sheen;\n#endif",lights_physical_pars_fragment="struct PhysicalMaterial {\n\tvec3\tdiffuseColor;\n\tfloat\tspecularRoughness;\n\tvec3\tspecularColor;\n#ifdef CLEARCOAT\n\tfloat clearcoat;\n\tfloat clearcoatRoughness;\n#endif\n#ifdef USE_SHEEN\n\tvec3 sheenColor;\n#endif\n};\n#define MAXIMUM_SPECULAR_COEFFICIENT 0.16\n#define DEFAULT_SPECULAR_COEFFICIENT 0.04\nfloat clearcoatDHRApprox( const in float roughness, const in float dotNL ) {\n\treturn DEFAULT_SPECULAR_COEFFICIENT + ( 1.0 - DEFAULT_SPECULAR_COEFFICIENT ) * ( pow( 1.0 - dotNL, 5.0 ) * pow( 1.0 - roughness, 2.0 ) );\n}\n#if NUM_RECT_AREA_LIGHTS > 0\n\tvoid RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {\n\t\tvec3 normal = geometry.normal;\n\t\tvec3 viewDir = geometry.viewDir;\n\t\tvec3 position = geometry.position;\n\t\tvec3 lightPos = rectAreaLight.position;\n\t\tvec3 halfWidth = rectAreaLight.halfWidth;\n\t\tvec3 halfHeight = rectAreaLight.halfHeight;\n\t\tvec3 lightColor = rectAreaLight.color;\n\t\tfloat roughness = material.specularRoughness;\n\t\tvec3 rectCoords[ 4 ];\n\t\trectCoords[ 0 ] = lightPos + halfWidth - halfHeight;\t\trectCoords[ 1 ] = lightPos - halfWidth - halfHeight;\n\t\trectCoords[ 2 ] = lightPos - halfWidth + halfHeight;\n\t\trectCoords[ 3 ] = lightPos + halfWidth + halfHeight;\n\t\tvec2 uv = LTC_Uv( normal, viewDir, roughness );\n\t\tvec4 t1 = texture2D( ltc_1, uv );\n\t\tvec4 t2 = texture2D( ltc_2, uv );\n\t\tmat3 mInv = mat3(\n\t\t\tvec3( t1.x, 0, t1.y ),\n\t\t\tvec3(    0, 1,    0 ),\n\t\t\tvec3( t1.z, 0, t1.w )\n\t\t);\n\t\tvec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );\n\t\treflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );\n\t\treflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );\n\t}\n#endif\nvoid RE_Direct_Physical( const in IncidentLight directLight, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {\n\tfloat dotNL = saturate( dot( geometry.normal, directLight.direction ) );\n\tvec3 irradiance = dotNL * directLight.color;\n\t#ifndef PHYSICALLY_CORRECT_LIGHTS\n\t\tirradiance *= PI;\n\t#endif\n\t#ifdef CLEARCOAT\n\t\tfloat ccDotNL = saturate( dot( geometry.clearcoatNormal, directLight.direction ) );\n\t\tvec3 ccIrradiance = ccDotNL * directLight.color;\n\t\t#ifndef PHYSICALLY_CORRECT_LIGHTS\n\t\t\tccIrradiance *= PI;\n\t\t#endif\n\t\tfloat clearcoatDHR = material.clearcoat * clearcoatDHRApprox( material.clearcoatRoughness, ccDotNL );\n\t\treflectedLight.directSpecular += ccIrradiance * material.clearcoat * BRDF_Specular_GGX( directLight, geometry.viewDir, geometry.clearcoatNormal, vec3( DEFAULT_SPECULAR_COEFFICIENT ), material.clearcoatRoughness );\n\t#else\n\t\tfloat clearcoatDHR = 0.0;\n\t#endif\n\t#ifdef USE_SHEEN\n\t\treflectedLight.directSpecular += ( 1.0 - clearcoatDHR ) * irradiance * BRDF_Specular_Sheen(\n\t\t\tmaterial.specularRoughness,\n\t\t\tdirectLight.direction,\n\t\t\tgeometry,\n\t\t\tmaterial.sheenColor\n\t\t);\n\t#else\n\t\treflectedLight.directSpecular += ( 1.0 - clearcoatDHR ) * irradiance * BRDF_Specular_GGX( directLight, geometry.viewDir, geometry.normal, material.specularColor, material.specularRoughness);\n\t#endif\n\treflectedLight.directDiffuse += ( 1.0 - clearcoatDHR ) * irradiance * BRDF_Diffuse_Lambert( material.diffuseColor );\n}\nvoid RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {\n\treflectedLight.indirectDiffuse += irradiance * BRDF_Diffuse_Lambert( material.diffuseColor );\n}\nvoid RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {\n\t#ifdef CLEARCOAT\n\t\tfloat ccDotNV = saturate( dot( geometry.clearcoatNormal, geometry.viewDir ) );\n\t\treflectedLight.indirectSpecular += clearcoatRadiance * material.clearcoat * BRDF_Specular_GGX_Environment( geometry.viewDir, geometry.clearcoatNormal, vec3( DEFAULT_SPECULAR_COEFFICIENT ), material.clearcoatRoughness );\n\t\tfloat ccDotNL = ccDotNV;\n\t\tfloat clearcoatDHR = material.clearcoat * clearcoatDHRApprox( material.clearcoatRoughness, ccDotNL );\n\t#else\n\t\tfloat clearcoatDHR = 0.0;\n\t#endif\n\tfloat clearcoatInv = 1.0 - clearcoatDHR;\n\tvec3 singleScattering = vec3( 0.0 );\n\tvec3 multiScattering = vec3( 0.0 );\n\tvec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;\n\tBRDF_Specular_Multiscattering_Environment( geometry, material.specularColor, material.specularRoughness, singleScattering, multiScattering );\n\tvec3 diffuse = material.diffuseColor * ( 1.0 - ( singleScattering + multiScattering ) );\n\treflectedLight.indirectSpecular += clearcoatInv * radiance * singleScattering;\n\treflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;\n\treflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;\n}\n#define RE_Direct\t\t\t\tRE_Direct_Physical\n#define RE_Direct_RectArea\t\tRE_Direct_RectArea_Physical\n#define RE_IndirectDiffuse\t\tRE_IndirectDiffuse_Physical\n#define RE_IndirectSpecular\t\tRE_IndirectSpecular_Physical\nfloat computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {\n\treturn saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );\n}",lights_fragment_begin="\nGeometricContext geometry;\ngeometry.position = - vViewPosition;\ngeometry.normal = normal;\ngeometry.viewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );\n#ifdef CLEARCOAT\n\tgeometry.clearcoatNormal = clearcoatNormal;\n#endif\nIncidentLight directLight;\n#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )\n\tPointLight pointLight;\n\t#pragma unroll_loop\n\tfor ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {\n\t\tpointLight = pointLights[ i ];\n\t\tgetPointDirectLightIrradiance( pointLight, geometry, directLight );\n\t\t#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )\n\t\tdirectLight.color *= all( bvec3( pointLight.shadow, directLight.visible, receiveShadow ) ) ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;\n\t\t#endif\n\t\tRE_Direct( directLight, geometry, material, reflectedLight );\n\t}\n#endif\n#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )\n\tSpotLight spotLight;\n\t#pragma unroll_loop\n\tfor ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {\n\t\tspotLight = spotLights[ i ];\n\t\tgetSpotDirectLightIrradiance( spotLight, geometry, directLight );\n\t\t#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )\n\t\tdirectLight.color *= all( bvec3( spotLight.shadow, directLight.visible, receiveShadow ) ) ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotShadowCoord[ i ] ) : 1.0;\n\t\t#endif\n\t\tRE_Direct( directLight, geometry, material, reflectedLight );\n\t}\n#endif\n#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )\n\tDirectionalLight directionalLight;\n\t#pragma unroll_loop\n\tfor ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {\n\t\tdirectionalLight = directionalLights[ i ];\n\t\tgetDirectionalDirectLightIrradiance( directionalLight, geometry, directLight );\n\t\t#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )\n\t\tdirectLight.color *= all( bvec3( directionalLight.shadow, directLight.visible, receiveShadow ) ) ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;\n\t\t#endif\n\t\tRE_Direct( directLight, geometry, material, reflectedLight );\n\t}\n#endif\n#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )\n\tRectAreaLight rectAreaLight;\n\t#pragma unroll_loop\n\tfor ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {\n\t\trectAreaLight = rectAreaLights[ i ];\n\t\tRE_Direct_RectArea( rectAreaLight, geometry, material, reflectedLight );\n\t}\n#endif\n#if defined( RE_IndirectDiffuse )\n\tvec3 iblIrradiance = vec3( 0.0 );\n\tvec3 irradiance = getAmbientLightIrradiance( ambientLightColor );\n\tirradiance += getLightProbeIrradiance( lightProbe, geometry );\n\t#if ( NUM_HEMI_LIGHTS > 0 )\n\t\t#pragma unroll_loop\n\t\tfor ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {\n\t\t\tirradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometry );\n\t\t}\n\t#endif\n#endif\n#if defined( RE_IndirectSpecular )\n\tvec3 radiance = vec3( 0.0 );\n\tvec3 clearcoatRadiance = vec3( 0.0 );\n#endif",lights_fragment_maps="#if defined( RE_IndirectDiffuse )\n\t#ifdef USE_LIGHTMAP\n\t\tvec4 lightMapTexel= texture2D( lightMap, vUv2 );\n\t\tvec3 lightMapIrradiance = lightMapTexelToLinear( lightMapTexel ).rgb * lightMapIntensity;\n\t\t#ifndef PHYSICALLY_CORRECT_LIGHTS\n\t\t\tlightMapIrradiance *= PI;\n\t\t#endif\n\t\tirradiance += lightMapIrradiance;\n\t#endif\n\t#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )\n\t\tiblIrradiance += getLightProbeIndirectIrradiance( geometry, maxMipLevel );\n\t#endif\n#endif\n#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )\n\tradiance += getLightProbeIndirectRadiance( geometry.viewDir, geometry.normal, material.specularRoughness, maxMipLevel );\n\t#ifdef CLEARCOAT\n\t\tclearcoatRadiance += getLightProbeIndirectRadiance( geometry.viewDir, geometry.clearcoatNormal, material.clearcoatRoughness, maxMipLevel );\n\t#endif\n#endif",lights_fragment_end="#if defined( RE_IndirectDiffuse )\n\tRE_IndirectDiffuse( irradiance, geometry, material, reflectedLight );\n#endif\n#if defined( RE_IndirectSpecular )\n\tRE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometry, material, reflectedLight );\n#endif",logdepthbuf_fragment="#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )\n\tgl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;\n#endif",logdepthbuf_pars_fragment="#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )\n\tuniform float logDepthBufFC;\n\tvarying float vFragDepth;\n\tvarying float vIsPerspective;\n#endif",logdepthbuf_pars_vertex="#ifdef USE_LOGDEPTHBUF\n\t#ifdef USE_LOGDEPTHBUF_EXT\n\t\tvarying float vFragDepth;\n\t\tvarying float vIsPerspective;\n\t#else\n\t\tuniform float logDepthBufFC;\n\t#endif\n#endif",logdepthbuf_vertex="#ifdef USE_LOGDEPTHBUF\n\t#ifdef USE_LOGDEPTHBUF_EXT\n\t\tvFragDepth = 1.0 + gl_Position.w;\n\t\tvIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );\n\t#else\n\t\tif ( isPerspectiveMatrix( projectionMatrix ) ) {\n\t\t\tgl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;\n\t\t\tgl_Position.z *= gl_Position.w;\n\t\t}\n\t#endif\n#endif",map_fragment="#ifdef USE_MAP\n\tvec4 texelColor = texture2D( map, vUv );\n\ttexelColor = mapTexelToLinear( texelColor );\n\tdiffuseColor *= texelColor;\n#endif",map_pars_fragment="#ifdef USE_MAP\n\tuniform sampler2D map;\n#endif",map_particle_fragment="#if defined( USE_MAP ) || defined( USE_ALPHAMAP )\n\tvec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;\n#endif\n#ifdef USE_MAP\n\tvec4 mapTexel = texture2D( map, uv );\n\tdiffuseColor *= mapTexelToLinear( mapTexel );\n#endif\n#ifdef USE_ALPHAMAP\n\tdiffuseColor.a *= texture2D( alphaMap, uv ).g;\n#endif",map_particle_pars_fragment="#if defined( USE_MAP ) || defined( USE_ALPHAMAP )\n\tuniform mat3 uvTransform;\n#endif\n#ifdef USE_MAP\n\tuniform sampler2D map;\n#endif\n#ifdef USE_ALPHAMAP\n\tuniform sampler2D alphaMap;\n#endif",metalnessmap_fragment="float metalnessFactor = metalness;\n#ifdef USE_METALNESSMAP\n\tvec4 texelMetalness = texture2D( metalnessMap, vUv );\n\tmetalnessFactor *= texelMetalness.b;\n#endif",metalnessmap_pars_fragment="#ifdef USE_METALNESSMAP\n\tuniform sampler2D metalnessMap;\n#endif",morphnormal_vertex="#ifdef USE_MORPHNORMALS\n\tobjectNormal *= morphTargetBaseInfluence;\n\tobjectNormal += morphNormal0 * morphTargetInfluences[ 0 ];\n\tobjectNormal += morphNormal1 * morphTargetInfluences[ 1 ];\n\tobjectNormal += morphNormal2 * morphTargetInfluences[ 2 ];\n\tobjectNormal += morphNormal3 * morphTargetInfluences[ 3 ];\n#endif",morphtarget_pars_vertex="#ifdef USE_MORPHTARGETS\n\tuniform float morphTargetBaseInfluence;\n\t#ifndef USE_MORPHNORMALS\n\tuniform float morphTargetInfluences[ 8 ];\n\t#else\n\tuniform float morphTargetInfluences[ 4 ];\n\t#endif\n#endif",morphtarget_vertex="#ifdef USE_MORPHTARGETS\n\ttransformed *= morphTargetBaseInfluence;\n\ttransformed += morphTarget0 * morphTargetInfluences[ 0 ];\n\ttransformed += morphTarget1 * morphTargetInfluences[ 1 ];\n\ttransformed += morphTarget2 * morphTargetInfluences[ 2 ];\n\ttransformed += morphTarget3 * morphTargetInfluences[ 3 ];\n\t#ifndef USE_MORPHNORMALS\n\ttransformed += morphTarget4 * morphTargetInfluences[ 4 ];\n\ttransformed += morphTarget5 * morphTargetInfluences[ 5 ];\n\ttransformed += morphTarget6 * morphTargetInfluences[ 6 ];\n\ttransformed += morphTarget7 * morphTargetInfluences[ 7 ];\n\t#endif\n#endif",normal_fragment_begin="#ifdef FLAT_SHADED\n\tvec3 fdx = vec3( dFdx( vViewPosition.x ), dFdx( vViewPosition.y ), dFdx( vViewPosition.z ) );\n\tvec3 fdy = vec3( dFdy( vViewPosition.x ), dFdy( vViewPosition.y ), dFdy( vViewPosition.z ) );\n\tvec3 normal = normalize( cross( fdx, fdy ) );\n#else\n\tvec3 normal = normalize( vNormal );\n\t#ifdef DOUBLE_SIDED\n\t\tnormal = normal * ( float( gl_FrontFacing ) * 2.0 - 1.0 );\n\t#endif\n\t#ifdef USE_TANGENT\n\t\tvec3 tangent = normalize( vTangent );\n\t\tvec3 bitangent = normalize( vBitangent );\n\t\t#ifdef DOUBLE_SIDED\n\t\t\ttangent = tangent * ( float( gl_FrontFacing ) * 2.0 - 1.0 );\n\t\t\tbitangent = bitangent * ( float( gl_FrontFacing ) * 2.0 - 1.0 );\n\t\t#endif\n\t\t#if defined( TANGENTSPACE_NORMALMAP ) || defined( USE_CLEARCOAT_NORMALMAP )\n\t\t\tmat3 vTBN = mat3( tangent, bitangent, normal );\n\t\t#endif\n\t#endif\n#endif\nvec3 geometryNormal = normal;",normal_fragment_maps="#ifdef OBJECTSPACE_NORMALMAP\n\tnormal = texture2D( normalMap, vUv ).xyz * 2.0 - 1.0;\n\t#ifdef FLIP_SIDED\n\t\tnormal = - normal;\n\t#endif\n\t#ifdef DOUBLE_SIDED\n\t\tnormal = normal * ( float( gl_FrontFacing ) * 2.0 - 1.0 );\n\t#endif\n\tnormal = normalize( normalMatrix * normal );\n#elif defined( TANGENTSPACE_NORMALMAP )\n\tvec3 mapN = texture2D( normalMap, vUv ).xyz * 2.0 - 1.0;\n\tmapN.xy *= normalScale;\n\t#ifdef USE_TANGENT\n\t\tnormal = normalize( vTBN * mapN );\n\t#else\n\t\tnormal = perturbNormal2Arb( -vViewPosition, normal, mapN );\n\t#endif\n#elif defined( USE_BUMPMAP )\n\tnormal = perturbNormalArb( -vViewPosition, normal, dHdxy_fwd() );\n#endif",normalmap_pars_fragment="#ifdef USE_NORMALMAP\n\tuniform sampler2D normalMap;\n\tuniform vec2 normalScale;\n#endif\n#ifdef OBJECTSPACE_NORMALMAP\n\tuniform mat3 normalMatrix;\n#endif\n#if ! defined ( USE_TANGENT ) && ( defined ( TANGENTSPACE_NORMALMAP ) || defined ( USE_CLEARCOAT_NORMALMAP ) )\n\tvec3 perturbNormal2Arb( vec3 eye_pos, vec3 surf_norm, vec3 mapN ) {\n\t\tvec3 q0 = vec3( dFdx( eye_pos.x ), dFdx( eye_pos.y ), dFdx( eye_pos.z ) );\n\t\tvec3 q1 = vec3( dFdy( eye_pos.x ), dFdy( eye_pos.y ), dFdy( eye_pos.z ) );\n\t\tvec2 st0 = dFdx( vUv.st );\n\t\tvec2 st1 = dFdy( vUv.st );\n\t\tfloat scale = sign( st1.t * st0.s - st0.t * st1.s );\n\t\tvec3 S = normalize( ( q0 * st1.t - q1 * st0.t ) * scale );\n\t\tvec3 T = normalize( ( - q0 * st1.s + q1 * st0.s ) * scale );\n\t\tvec3 N = normalize( surf_norm );\n\t\tmat3 tsn = mat3( S, T, N );\n\t\tmapN.xy *= ( float( gl_FrontFacing ) * 2.0 - 1.0 );\n\t\treturn normalize( tsn * mapN );\n\t}\n#endif",clearcoat_normal_fragment_begin="#ifdef CLEARCOAT\n\tvec3 clearcoatNormal = geometryNormal;\n#endif",clearcoat_normal_fragment_maps="#ifdef USE_CLEARCOAT_NORMALMAP\n\tvec3 clearcoatMapN = texture2D( clearcoatNormalMap, vUv ).xyz * 2.0 - 1.0;\n\tclearcoatMapN.xy *= clearcoatNormalScale;\n\t#ifdef USE_TANGENT\n\t\tclearcoatNormal = normalize( vTBN * clearcoatMapN );\n\t#else\n\t\tclearcoatNormal = perturbNormal2Arb( - vViewPosition, clearcoatNormal, clearcoatMapN );\n\t#endif\n#endif",clearcoat_normalmap_pars_fragment="#ifdef USE_CLEARCOAT_NORMALMAP\n\tuniform sampler2D clearcoatNormalMap;\n\tuniform vec2 clearcoatNormalScale;\n#endif",packing="vec3 packNormalToRGB( const in vec3 normal ) {\n\treturn normalize( normal ) * 0.5 + 0.5;\n}\nvec3 unpackRGBToNormal( const in vec3 rgb ) {\n\treturn 2.0 * rgb.xyz - 1.0;\n}\nconst float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;\nconst vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256.,  256. );\nconst vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );\nconst float ShiftRight8 = 1. / 256.;\nvec4 packDepthToRGBA( const in float v ) {\n\tvec4 r = vec4( fract( v * PackFactors ), v );\n\tr.yzw -= r.xyz * ShiftRight8;\treturn r * PackUpscale;\n}\nfloat unpackRGBAToDepth( const in vec4 v ) {\n\treturn dot( v, UnpackFactors );\n}\nvec4 pack2HalfToRGBA( vec2 v ) {\n\tvec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ));\n\treturn vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w);\n}\nvec2 unpackRGBATo2Half( vec4 v ) {\n\treturn vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );\n}\nfloat viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {\n\treturn ( viewZ + near ) / ( near - far );\n}\nfloat orthographicDepthToViewZ( const in float linearClipZ, const in float near, const in float far ) {\n\treturn linearClipZ * ( near - far ) - near;\n}\nfloat viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {\n\treturn (( near + viewZ ) * far ) / (( far - near ) * viewZ );\n}\nfloat perspectiveDepthToViewZ( const in float invClipZ, const in float near, const in float far ) {\n\treturn ( near * far ) / ( ( far - near ) * invClipZ - far );\n}",premultiplied_alpha_fragment="#ifdef PREMULTIPLIED_ALPHA\n\tgl_FragColor.rgb *= gl_FragColor.a;\n#endif",project_vertex="vec4 mvPosition = vec4( transformed, 1.0 );\n#ifdef USE_INSTANCING\n\tmvPosition = instanceMatrix * mvPosition;\n#endif\nmvPosition = modelViewMatrix * mvPosition;\ngl_Position = projectionMatrix * mvPosition;",dithering_fragment="#ifdef DITHERING\n\tgl_FragColor.rgb = dithering( gl_FragColor.rgb );\n#endif",dithering_pars_fragment="#ifdef DITHERING\n\tvec3 dithering( vec3 color ) {\n\t\tfloat grid_position = rand( gl_FragCoord.xy );\n\t\tvec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );\n\t\tdither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );\n\t\treturn color + dither_shift_RGB;\n\t}\n#endif",roughnessmap_fragment="float roughnessFactor = roughness;\n#ifdef USE_ROUGHNESSMAP\n\tvec4 texelRoughness = texture2D( roughnessMap, vUv );\n\troughnessFactor *= texelRoughness.g;\n#endif",roughnessmap_pars_fragment="#ifdef USE_ROUGHNESSMAP\n\tuniform sampler2D roughnessMap;\n#endif",shadowmap_pars_fragment="#ifdef USE_SHADOWMAP\n\t#if NUM_DIR_LIGHT_SHADOWS > 0\n\t\tuniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];\n\t\tvarying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];\n\t#endif\n\t#if NUM_SPOT_LIGHT_SHADOWS > 0\n\t\tuniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];\n\t\tvarying vec4 vSpotShadowCoord[ NUM_SPOT_LIGHT_SHADOWS ];\n\t#endif\n\t#if NUM_POINT_LIGHT_SHADOWS > 0\n\t\tuniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];\n\t\tvarying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];\n\t#endif\n\tfloat texture2DCompare( sampler2D depths, vec2 uv, float compare ) {\n\t\treturn step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );\n\t}\n\tvec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {\n\t\treturn unpackRGBATo2Half( texture2D( shadow, uv ) );\n\t}\n\tfloat VSMShadow (sampler2D shadow, vec2 uv, float compare ){\n\t\tfloat occlusion = 1.0;\n\t\tvec2 distribution = texture2DDistribution( shadow, uv );\n\t\tfloat hard_shadow = step( compare , distribution.x );\n\t\tif (hard_shadow != 1.0 ) {\n\t\t\tfloat distance = compare - distribution.x ;\n\t\t\tfloat variance = max( 0.00000, distribution.y * distribution.y );\n\t\t\tfloat softness_probability = variance / (variance + distance * distance );\t\t\tsoftness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );\t\t\tocclusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );\n\t\t}\n\t\treturn occlusion;\n\t}\n\tfloat getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord ) {\n\t\tfloat shadow = 1.0;\n\t\tshadowCoord.xyz /= shadowCoord.w;\n\t\tshadowCoord.z += shadowBias;\n\t\tbvec4 inFrustumVec = bvec4 ( shadowCoord.x >= 0.0, shadowCoord.x <= 1.0, shadowCoord.y >= 0.0, shadowCoord.y <= 1.0 );\n\t\tbool inFrustum = all( inFrustumVec );\n\t\tbvec2 frustumTestVec = bvec2( inFrustum, shadowCoord.z <= 1.0 );\n\t\tbool frustumTest = all( frustumTestVec );\n\t\tif ( frustumTest ) {\n\t\t#if defined( SHADOWMAP_TYPE_PCF )\n\t\t\tvec2 texelSize = vec2( 1.0 ) / shadowMapSize;\n\t\t\tfloat dx0 = - texelSize.x * shadowRadius;\n\t\t\tfloat dy0 = - texelSize.y * shadowRadius;\n\t\t\tfloat dx1 = + texelSize.x * shadowRadius;\n\t\t\tfloat dy1 = + texelSize.y * shadowRadius;\n\t\t\tfloat dx2 = dx0 / 2.0;\n\t\t\tfloat dy2 = dy0 / 2.0;\n\t\t\tfloat dx3 = dx1 / 2.0;\n\t\t\tfloat dy3 = dy1 / 2.0;\n\t\t\tshadow = (\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )\n\t\t\t) * ( 1.0 / 17.0 );\n\t\t#elif defined( SHADOWMAP_TYPE_PCF_SOFT )\n\t\t\tvec2 texelSize = vec2( 1.0 ) / shadowMapSize;\n\t\t\tfloat dx = texelSize.x;\n\t\t\tfloat dy = texelSize.y;\n\t\t\tvec2 uv = shadowCoord.xy;\n\t\t\tvec2 f = fract( uv * shadowMapSize + 0.5 );\n\t\t\tuv -= f * texelSize;\n\t\t\tshadow = (\n\t\t\t\ttexture2DCompare( shadowMap, uv, shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +\n\t\t\t\tmix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ), \n\t\t\t\t\t texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),\n\t\t\t\t\t f.x ) +\n\t\t\t\tmix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ), \n\t\t\t\t\t texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),\n\t\t\t\t\t f.x ) +\n\t\t\t\tmix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ), \n\t\t\t\t\t texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),\n\t\t\t\t\t f.y ) +\n\t\t\t\tmix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ), \n\t\t\t\t\t texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),\n\t\t\t\t\t f.y ) +\n\t\t\t\tmix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ), \n\t\t\t\t\t\t  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),\n\t\t\t\t\t\t  f.x ),\n\t\t\t\t\t mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ), \n\t\t\t\t\t\t  texture2DCompare( shadowMap, uv + + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),\n\t\t\t\t\t\t  f.x ),\n\t\t\t\t\t f.y )\n\t\t\t) * ( 1.0 / 9.0 );\n\t\t#elif defined( SHADOWMAP_TYPE_VSM )\n\t\t\tshadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );\n\t\t#else\n\t\t\tshadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );\n\t\t#endif\n\t\t}\n\t\treturn shadow;\n\t}\n\tvec2 cubeToUV( vec3 v, float texelSizeY ) {\n\t\tvec3 absV = abs( v );\n\t\tfloat scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );\n\t\tabsV *= scaleToCube;\n\t\tv *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );\n\t\tvec2 planar = v.xy;\n\t\tfloat almostATexel = 1.5 * texelSizeY;\n\t\tfloat almostOne = 1.0 - almostATexel;\n\t\tif ( absV.z >= almostOne ) {\n\t\t\tif ( v.z > 0.0 )\n\t\t\t\tplanar.x = 4.0 - v.x;\n\t\t} else if ( absV.x >= almostOne ) {\n\t\t\tfloat signX = sign( v.x );\n\t\t\tplanar.x = v.z * signX + 2.0 * signX;\n\t\t} else if ( absV.y >= almostOne ) {\n\t\t\tfloat signY = sign( v.y );\n\t\t\tplanar.x = v.x + 2.0 * signY + 2.0;\n\t\t\tplanar.y = v.z * signY - 2.0;\n\t\t}\n\t\treturn vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );\n\t}\n\tfloat getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {\n\t\tvec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );\n\t\tvec3 lightToPosition = shadowCoord.xyz;\n\t\tfloat dp = ( length( lightToPosition ) - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );\t\tdp += shadowBias;\n\t\tvec3 bd3D = normalize( lightToPosition );\n\t\t#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )\n\t\t\tvec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;\n\t\t\treturn (\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )\n\t\t\t) * ( 1.0 / 9.0 );\n\t\t#else\n\t\t\treturn texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );\n\t\t#endif\n\t}\n#endif",shadowmap_pars_vertex="#ifdef USE_SHADOWMAP\n\t#if NUM_DIR_LIGHT_SHADOWS > 0\n\t\tuniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];\n\t\tvarying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];\n\t#endif\n\t#if NUM_SPOT_LIGHT_SHADOWS > 0\n\t\tuniform mat4 spotShadowMatrix[ NUM_SPOT_LIGHT_SHADOWS ];\n\t\tvarying vec4 vSpotShadowCoord[ NUM_SPOT_LIGHT_SHADOWS ];\n\t#endif\n\t#if NUM_POINT_LIGHT_SHADOWS > 0\n\t\tuniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];\n\t\tvarying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];\n\t#endif\n#endif",shadowmap_vertex="#ifdef USE_SHADOWMAP\n\t#if NUM_DIR_LIGHT_SHADOWS > 0\n\t#pragma unroll_loop\n\tfor ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {\n\t\tvDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * worldPosition;\n\t}\n\t#endif\n\t#if NUM_SPOT_LIGHT_SHADOWS > 0\n\t#pragma unroll_loop\n\tfor ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {\n\t\tvSpotShadowCoord[ i ] = spotShadowMatrix[ i ] * worldPosition;\n\t}\n\t#endif\n\t#if NUM_POINT_LIGHT_SHADOWS > 0\n\t#pragma unroll_loop\n\tfor ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {\n\t\tvPointShadowCoord[ i ] = pointShadowMatrix[ i ] * worldPosition;\n\t}\n\t#endif\n#endif",shadowmask_pars_fragment="float getShadowMask() {\n\tfloat shadow = 1.0;\n\t#ifdef USE_SHADOWMAP\n\t#if NUM_DIR_LIGHT_SHADOWS > 0\n\tDirectionalLight directionalLight;\n\t#pragma unroll_loop\n\tfor ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {\n\t\tdirectionalLight = directionalLights[ i ];\n\t\tshadow *= all( bvec2( directionalLight.shadow, receiveShadow ) ) ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;\n\t}\n\t#endif\n\t#if NUM_SPOT_LIGHT_SHADOWS > 0\n\tSpotLight spotLight;\n\t#pragma unroll_loop\n\tfor ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {\n\t\tspotLight = spotLights[ i ];\n\t\tshadow *= all( bvec2( spotLight.shadow, receiveShadow ) ) ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotShadowCoord[ i ] ) : 1.0;\n\t}\n\t#endif\n\t#if NUM_POINT_LIGHT_SHADOWS > 0\n\tPointLight pointLight;\n\t#pragma unroll_loop\n\tfor ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {\n\t\tpointLight = pointLights[ i ];\n\t\tshadow *= all( bvec2( pointLight.shadow, receiveShadow ) ) ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;\n\t}\n\t#endif\n\t#endif\n\treturn shadow;\n}",skinbase_vertex="#ifdef USE_SKINNING\n\tmat4 boneMatX = getBoneMatrix( skinIndex.x );\n\tmat4 boneMatY = getBoneMatrix( skinIndex.y );\n\tmat4 boneMatZ = getBoneMatrix( skinIndex.z );\n\tmat4 boneMatW = getBoneMatrix( skinIndex.w );\n#endif",skinning_pars_vertex="#ifdef USE_SKINNING\n\tuniform mat4 bindMatrix;\n\tuniform mat4 bindMatrixInverse;\n\t#ifdef BONE_TEXTURE\n\t\tuniform highp sampler2D boneTexture;\n\t\tuniform int boneTextureSize;\n\t\tmat4 getBoneMatrix( const in float i ) {\n\t\t\tfloat j = i * 4.0;\n\t\t\tfloat x = mod( j, float( boneTextureSize ) );\n\t\t\tfloat y = floor( j / float( boneTextureSize ) );\n\t\t\tfloat dx = 1.0 / float( boneTextureSize );\n\t\t\tfloat dy = 1.0 / float( boneTextureSize );\n\t\t\ty = dy * ( y + 0.5 );\n\t\t\tvec4 v1 = texture2D( boneTexture, vec2( dx * ( x + 0.5 ), y ) );\n\t\t\tvec4 v2 = texture2D( boneTexture, vec2( dx * ( x + 1.5 ), y ) );\n\t\t\tvec4 v3 = texture2D( boneTexture, vec2( dx * ( x + 2.5 ), y ) );\n\t\t\tvec4 v4 = texture2D( boneTexture, vec2( dx * ( x + 3.5 ), y ) );\n\t\t\tmat4 bone = mat4( v1, v2, v3, v4 );\n\t\t\treturn bone;\n\t\t}\n\t#else\n\t\tuniform mat4 boneMatrices[ MAX_BONES ];\n\t\tmat4 getBoneMatrix( const in float i ) {\n\t\t\tmat4 bone = boneMatrices[ int(i) ];\n\t\t\treturn bone;\n\t\t}\n\t#endif\n#endif",skinning_vertex="#ifdef USE_SKINNING\n\tvec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );\n\tvec4 skinned = vec4( 0.0 );\n\tskinned += boneMatX * skinVertex * skinWeight.x;\n\tskinned += boneMatY * skinVertex * skinWeight.y;\n\tskinned += boneMatZ * skinVertex * skinWeight.z;\n\tskinned += boneMatW * skinVertex * skinWeight.w;\n\ttransformed = ( bindMatrixInverse * skinned ).xyz;\n#endif",skinnormal_vertex="#ifdef USE_SKINNING\n\tmat4 skinMatrix = mat4( 0.0 );\n\tskinMatrix += skinWeight.x * boneMatX;\n\tskinMatrix += skinWeight.y * boneMatY;\n\tskinMatrix += skinWeight.z * boneMatZ;\n\tskinMatrix += skinWeight.w * boneMatW;\n\tskinMatrix  = bindMatrixInverse * skinMatrix * bindMatrix;\n\tobjectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;\n\t#ifdef USE_TANGENT\n\t\tobjectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;\n\t#endif\n#endif",specularmap_fragment="float specularStrength;\n#ifdef USE_SPECULARMAP\n\tvec4 texelSpecular = texture2D( specularMap, vUv );\n\tspecularStrength = texelSpecular.r;\n#else\n\tspecularStrength = 1.0;\n#endif",specularmap_pars_fragment="#ifdef USE_SPECULARMAP\n\tuniform sampler2D specularMap;\n#endif",tonemapping_fragment="#if defined( TONE_MAPPING )\n\tgl_FragColor.rgb = toneMapping( gl_FragColor.rgb );\n#endif",tonemapping_pars_fragment="#ifndef saturate\n#define saturate(a) clamp( a, 0.0, 1.0 )\n#endif\nuniform float toneMappingExposure;\nuniform float toneMappingWhitePoint;\nvec3 LinearToneMapping( vec3 color ) {\n\treturn toneMappingExposure * color;\n}\nvec3 ReinhardToneMapping( vec3 color ) {\n\tcolor *= toneMappingExposure;\n\treturn saturate( color / ( vec3( 1.0 ) + color ) );\n}\n#define Uncharted2Helper( x ) max( ( ( x * ( 0.15 * x + 0.10 * 0.50 ) + 0.20 * 0.02 ) / ( x * ( 0.15 * x + 0.50 ) + 0.20 * 0.30 ) ) - 0.02 / 0.30, vec3( 0.0 ) )\nvec3 Uncharted2ToneMapping( vec3 color ) {\n\tcolor *= toneMappingExposure;\n\treturn saturate( Uncharted2Helper( color ) / Uncharted2Helper( vec3( toneMappingWhitePoint ) ) );\n}\nvec3 OptimizedCineonToneMapping( vec3 color ) {\n\tcolor *= toneMappingExposure;\n\tcolor = max( vec3( 0.0 ), color - 0.004 );\n\treturn pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );\n}\nvec3 ACESFilmicToneMapping( vec3 color ) {\n\tcolor *= toneMappingExposure;\n\treturn saturate( ( color * ( 2.51 * color + 0.03 ) ) / ( color * ( 2.43 * color + 0.59 ) + 0.14 ) );\n}",uv_pars_fragment="#if ( defined( USE_UV ) && ! defined( UVS_VERTEX_ONLY ) )\n\tvarying vec2 vUv;\n#endif",uv_pars_vertex="#ifdef USE_UV\n\t#ifdef UVS_VERTEX_ONLY\n\t\tvec2 vUv;\n\t#else\n\t\tvarying vec2 vUv;\n\t#endif\n\tuniform mat3 uvTransform;\n#endif",uv_vertex="#ifdef USE_UV\n\tvUv = ( uvTransform * vec3( uv, 1 ) ).xy;\n#endif",uv2_pars_fragment="#if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )\n\tvarying vec2 vUv2;\n#endif",uv2_pars_vertex="#if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )\n\tattribute vec2 uv2;\n\tvarying vec2 vUv2;\n\tuniform mat3 uv2Transform;\n#endif",uv2_vertex="#if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )\n\tvUv2 = ( uv2Transform * vec3( uv2, 1 ) ).xy;\n#endif",worldpos_vertex="#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP )\n\tvec4 worldPosition = vec4( transformed, 1.0 );\n\t#ifdef USE_INSTANCING\n\t\tworldPosition = instanceMatrix * worldPosition;\n\t#endif\n\tworldPosition = modelMatrix * worldPosition;\n#endif",background_frag="uniform sampler2D t2D;\nvarying vec2 vUv;\nvoid main() {\n\tvec4 texColor = texture2D( t2D, vUv );\n\tgl_FragColor = mapTexelToLinear( texColor );\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n}",background_vert="varying vec2 vUv;\nuniform mat3 uvTransform;\nvoid main() {\n\tvUv = ( uvTransform * vec3( uv, 1 ) ).xy;\n\tgl_Position = vec4( position.xy, 1.0, 1.0 );\n}",cube_frag="#include <envmap_common_pars_fragment>\nuniform float opacity;\nvarying vec3 vWorldDirection;\n#include <cube_uv_reflection_fragment>\nvoid main() {\n\tvec3 vReflect = vWorldDirection;\n\t#include <envmap_fragment>\n\tgl_FragColor = envColor;\n\tgl_FragColor.a *= opacity;\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n}",cube_vert="varying vec3 vWorldDirection;\n#include <common>\nvoid main() {\n\tvWorldDirection = transformDirection( position, modelMatrix );\n\t#include <begin_vertex>\n\t#include <project_vertex>\n\tgl_Position.z = gl_Position.w;\n}",depth_frag="#if DEPTH_PACKING == 3200\n\tuniform float opacity;\n#endif\n#include <common>\n#include <packing>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( 1.0 );\n\t#if DEPTH_PACKING == 3200\n\t\tdiffuseColor.a = opacity;\n\t#endif\n\t#include <map_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <logdepthbuf_fragment>\n\t#if DEPTH_PACKING == 3200\n\t\tgl_FragColor = vec4( vec3( 1.0 - gl_FragCoord.z ), opacity );\n\t#elif DEPTH_PACKING == 3201\n\t\tgl_FragColor = packDepthToRGBA( gl_FragCoord.z );\n\t#endif\n}",depth_vert="#include <common>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <skinbase_vertex>\n\t#ifdef USE_DISPLACEMENTMAP\n\t\t#include <beginnormal_vertex>\n\t\t#include <morphnormal_vertex>\n\t\t#include <skinnormal_vertex>\n\t#endif\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n}",distanceRGBA_frag="#define DISTANCE\nuniform vec3 referencePosition;\nuniform float nearDistance;\nuniform float farDistance;\nvarying vec3 vWorldPosition;\n#include <common>\n#include <packing>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main () {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( 1.0 );\n\t#include <map_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\tfloat dist = length( vWorldPosition - referencePosition );\n\tdist = ( dist - nearDistance ) / ( farDistance - nearDistance );\n\tdist = saturate( dist );\n\tgl_FragColor = packDepthToRGBA( dist );\n}",distanceRGBA_vert="#define DISTANCE\nvarying vec3 vWorldPosition;\n#include <common>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <skinbase_vertex>\n\t#ifdef USE_DISPLACEMENTMAP\n\t\t#include <beginnormal_vertex>\n\t\t#include <morphnormal_vertex>\n\t\t#include <skinnormal_vertex>\n\t#endif\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <worldpos_vertex>\n\t#include <clipping_planes_vertex>\n\tvWorldPosition = worldPosition.xyz;\n}",equirect_frag="uniform sampler2D tEquirect;\nvarying vec3 vWorldDirection;\n#include <common>\nvoid main() {\n\tvec3 direction = normalize( vWorldDirection );\n\tvec2 sampleUV;\n\tsampleUV.y = asin( clamp( direction.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;\n\tsampleUV.x = atan( direction.z, direction.x ) * RECIPROCAL_PI2 + 0.5;\n\tvec4 texColor = texture2D( tEquirect, sampleUV );\n\tgl_FragColor = mapTexelToLinear( texColor );\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n}",equirect_vert="varying vec3 vWorldDirection;\n#include <common>\nvoid main() {\n\tvWorldDirection = transformDirection( position, modelMatrix );\n\t#include <begin_vertex>\n\t#include <project_vertex>\n}",linedashed_frag="uniform vec3 diffuse;\nuniform float opacity;\nuniform float dashSize;\nuniform float totalSize;\nvarying float vLineDistance;\n#include <common>\n#include <color_pars_fragment>\n#include <fog_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tif ( mod( vLineDistance, totalSize ) > dashSize ) {\n\t\tdiscard;\n\t}\n\tvec3 outgoingLight = vec3( 0.0 );\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\t#include <logdepthbuf_fragment>\n\t#include <color_fragment>\n\toutgoingLight = diffuseColor.rgb;\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n}",linedashed_vert="uniform float scale;\nattribute float lineDistance;\nvarying float vLineDistance;\n#include <common>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <color_vertex>\n\tvLineDistance = scale * lineDistance;\n\tvec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );\n\tgl_Position = projectionMatrix * mvPosition;\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\t#include <fog_vertex>\n}",meshbasic_frag="uniform vec3 diffuse;\nuniform float opacity;\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n#endif\n#include <common>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <uv2_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <envmap_common_pars_fragment>\n#include <envmap_pars_fragment>\n#include <cube_uv_reflection_fragment>\n#include <fog_pars_fragment>\n#include <specularmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <color_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <specularmap_fragment>\n\tReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n\t#ifdef USE_LIGHTMAP\n\t\n\t\tvec4 lightMapTexel= texture2D( lightMap, vUv2 );\n\t\treflectedLight.indirectDiffuse += lightMapTexelToLinear( lightMapTexel ).rgb * lightMapIntensity;\n\t#else\n\t\treflectedLight.indirectDiffuse += vec3( 1.0 );\n\t#endif\n\t#include <aomap_fragment>\n\treflectedLight.indirectDiffuse *= diffuseColor.rgb;\n\tvec3 outgoingLight = reflectedLight.indirectDiffuse;\n\t#include <envmap_fragment>\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n}",meshbasic_vert="#include <common>\n#include <uv_pars_vertex>\n#include <uv2_pars_vertex>\n#include <envmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <uv2_vertex>\n\t#include <color_vertex>\n\t#include <skinbase_vertex>\n\t#ifdef USE_ENVMAP\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n\t#endif\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <worldpos_vertex>\n\t#include <clipping_planes_vertex>\n\t#include <envmap_vertex>\n\t#include <fog_vertex>\n}",meshlambert_frag="uniform vec3 diffuse;\nuniform vec3 emissive;\nuniform float opacity;\nvarying vec3 vLightFront;\nvarying vec3 vIndirectFront;\n#ifdef DOUBLE_SIDED\n\tvarying vec3 vLightBack;\n\tvarying vec3 vIndirectBack;\n#endif\n#include <common>\n#include <packing>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <uv2_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <envmap_common_pars_fragment>\n#include <envmap_pars_fragment>\n#include <cube_uv_reflection_fragment>\n#include <bsdfs>\n#include <lights_pars_begin>\n#include <fog_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <shadowmask_pars_fragment>\n#include <specularmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\tReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n\tvec3 totalEmissiveRadiance = emissive;\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <color_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <specularmap_fragment>\n\t#include <emissivemap_fragment>\n\treflectedLight.indirectDiffuse = getAmbientLightIrradiance( ambientLightColor );\n\t#ifdef DOUBLE_SIDED\n\t\treflectedLight.indirectDiffuse += ( gl_FrontFacing ) ? vIndirectFront : vIndirectBack;\n\t#else\n\t\treflectedLight.indirectDiffuse += vIndirectFront;\n\t#endif\n\t#include <lightmap_fragment>\n\treflectedLight.indirectDiffuse *= BRDF_Diffuse_Lambert( diffuseColor.rgb );\n\t#ifdef DOUBLE_SIDED\n\t\treflectedLight.directDiffuse = ( gl_FrontFacing ) ? vLightFront : vLightBack;\n\t#else\n\t\treflectedLight.directDiffuse = vLightFront;\n\t#endif\n\treflectedLight.directDiffuse *= BRDF_Diffuse_Lambert( diffuseColor.rgb ) * getShadowMask();\n\t#include <aomap_fragment>\n\tvec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;\n\t#include <envmap_fragment>\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n\t#include <dithering_fragment>\n}",meshlambert_vert="#define LAMBERT\nvarying vec3 vLightFront;\nvarying vec3 vIndirectFront;\n#ifdef DOUBLE_SIDED\n\tvarying vec3 vLightBack;\n\tvarying vec3 vIndirectBack;\n#endif\n#include <common>\n#include <uv_pars_vertex>\n#include <uv2_pars_vertex>\n#include <envmap_pars_vertex>\n#include <bsdfs>\n#include <lights_pars_begin>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <uv2_vertex>\n\t#include <color_vertex>\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\t#include <worldpos_vertex>\n\t#include <envmap_vertex>\n\t#include <lights_lambert_vertex>\n\t#include <shadowmap_vertex>\n\t#include <fog_vertex>\n}",meshmatcap_frag="#define MATCAP\nuniform vec3 diffuse;\nuniform float opacity;\nuniform sampler2D matcap;\nvarying vec3 vViewPosition;\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n#endif\n#include <common>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <fog_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <normal_fragment_begin>\n\t#include <normal_fragment_maps>\n\tvec3 viewDir = normalize( vViewPosition );\n\tvec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );\n\tvec3 y = cross( viewDir, x );\n\tvec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;\n\t#ifdef USE_MATCAP\n\t\tvec4 matcapColor = texture2D( matcap, uv );\n\t\tmatcapColor = matcapTexelToLinear( matcapColor );\n\t#else\n\t\tvec4 matcapColor = vec4( 1.0 );\n\t#endif\n\tvec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n}",meshmatcap_vert="#define MATCAP\nvarying vec3 vViewPosition;\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n#endif\n#include <common>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n\t#ifndef FLAT_SHADED\n\t\tvNormal = normalize( transformedNormal );\n\t#endif\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\t#include <fog_vertex>\n\tvViewPosition = - mvPosition.xyz;\n}",meshtoon_frag="#define TOON\nuniform vec3 diffuse;\nuniform vec3 emissive;\nuniform vec3 specular;\nuniform float shininess;\nuniform float opacity;\n#include <common>\n#include <packing>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <uv2_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <gradientmap_pars_fragment>\n#include <fog_pars_fragment>\n#include <bsdfs>\n#include <lights_pars_begin>\n#include <lights_toon_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <specularmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\tReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n\tvec3 totalEmissiveRadiance = emissive;\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <color_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <specularmap_fragment>\n\t#include <normal_fragment_begin>\n\t#include <normal_fragment_maps>\n\t#include <emissivemap_fragment>\n\t#include <lights_toon_fragment>\n\t#include <lights_fragment_begin>\n\t#include <lights_fragment_maps>\n\t#include <lights_fragment_end>\n\t#include <aomap_fragment>\n\tvec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n\t#include <dithering_fragment>\n}",meshtoon_vert="#define TOON\nvarying vec3 vViewPosition;\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n#endif\n#include <common>\n#include <uv_pars_vertex>\n#include <uv2_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <uv2_vertex>\n\t#include <color_vertex>\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n#ifndef FLAT_SHADED\n\tvNormal = normalize( transformedNormal );\n#endif\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\tvViewPosition = - mvPosition.xyz;\n\t#include <worldpos_vertex>\n\t#include <shadowmap_vertex>\n\t#include <fog_vertex>\n}",meshphong_frag="#define PHONG\nuniform vec3 diffuse;\nuniform vec3 emissive;\nuniform vec3 specular;\nuniform float shininess;\nuniform float opacity;\n#include <common>\n#include <packing>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <uv2_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <envmap_common_pars_fragment>\n#include <envmap_pars_fragment>\n#include <cube_uv_reflection_fragment>\n#include <fog_pars_fragment>\n#include <bsdfs>\n#include <lights_pars_begin>\n#include <lights_phong_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <specularmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\tReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n\tvec3 totalEmissiveRadiance = emissive;\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <color_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <specularmap_fragment>\n\t#include <normal_fragment_begin>\n\t#include <normal_fragment_maps>\n\t#include <emissivemap_fragment>\n\t#include <lights_phong_fragment>\n\t#include <lights_fragment_begin>\n\t#include <lights_fragment_maps>\n\t#include <lights_fragment_end>\n\t#include <aomap_fragment>\n\tvec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;\n\t#include <envmap_fragment>\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n\t#include <dithering_fragment>\n}",meshphong_vert="#define PHONG\nvarying vec3 vViewPosition;\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n#endif\n#include <common>\n#include <uv_pars_vertex>\n#include <uv2_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <envmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <uv2_vertex>\n\t#include <color_vertex>\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n#ifndef FLAT_SHADED\n\tvNormal = normalize( transformedNormal );\n#endif\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\tvViewPosition = - mvPosition.xyz;\n\t#include <worldpos_vertex>\n\t#include <envmap_vertex>\n\t#include <shadowmap_vertex>\n\t#include <fog_vertex>\n}",meshphysical_frag="#define STANDARD\n#ifdef PHYSICAL\n\t#define REFLECTIVITY\n\t#define CLEARCOAT\n\t#define TRANSPARENCY\n#endif\nuniform vec3 diffuse;\nuniform vec3 emissive;\nuniform float roughness;\nuniform float metalness;\nuniform float opacity;\n#ifdef TRANSPARENCY\n\tuniform float transparency;\n#endif\n#ifdef REFLECTIVITY\n\tuniform float reflectivity;\n#endif\n#ifdef CLEARCOAT\n\tuniform float clearcoat;\n\tuniform float clearcoatRoughness;\n#endif\n#ifdef USE_SHEEN\n\tuniform vec3 sheen;\n#endif\nvarying vec3 vViewPosition;\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n\t#ifdef USE_TANGENT\n\t\tvarying vec3 vTangent;\n\t\tvarying vec3 vBitangent;\n\t#endif\n#endif\n#include <common>\n#include <packing>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <uv2_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <bsdfs>\n#include <cube_uv_reflection_fragment>\n#include <envmap_common_pars_fragment>\n#include <envmap_physical_pars_fragment>\n#include <fog_pars_fragment>\n#include <lights_pars_begin>\n#include <lights_physical_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <clearcoat_normalmap_pars_fragment>\n#include <roughnessmap_pars_fragment>\n#include <metalnessmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\tReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n\tvec3 totalEmissiveRadiance = emissive;\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <color_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <roughnessmap_fragment>\n\t#include <metalnessmap_fragment>\n\t#include <normal_fragment_begin>\n\t#include <normal_fragment_maps>\n\t#include <clearcoat_normal_fragment_begin>\n\t#include <clearcoat_normal_fragment_maps>\n\t#include <emissivemap_fragment>\n\t#include <lights_physical_fragment>\n\t#include <lights_fragment_begin>\n\t#include <lights_fragment_maps>\n\t#include <lights_fragment_end>\n\t#include <aomap_fragment>\n\tvec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;\n\t#ifdef TRANSPARENCY\n\t\tdiffuseColor.a *= saturate( 1. - transparency + linearToRelativeLuminance( reflectedLight.directSpecular + reflectedLight.indirectSpecular ) );\n\t#endif\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n\t#include <dithering_fragment>\n}",meshphysical_vert="#define STANDARD\nvarying vec3 vViewPosition;\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n\t#ifdef USE_TANGENT\n\t\tvarying vec3 vTangent;\n\t\tvarying vec3 vBitangent;\n\t#endif\n#endif\n#include <common>\n#include <uv_pars_vertex>\n#include <uv2_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <uv2_vertex>\n\t#include <color_vertex>\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n#ifndef FLAT_SHADED\n\tvNormal = normalize( transformedNormal );\n\t#ifdef USE_TANGENT\n\t\tvTangent = normalize( transformedTangent );\n\t\tvBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );\n\t#endif\n#endif\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\tvViewPosition = - mvPosition.xyz;\n\t#include <worldpos_vertex>\n\t#include <shadowmap_vertex>\n\t#include <fog_vertex>\n}",normal_frag="#define NORMAL\nuniform float opacity;\n#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( TANGENTSPACE_NORMALMAP )\n\tvarying vec3 vViewPosition;\n#endif\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n\t#ifdef USE_TANGENT\n\t\tvarying vec3 vTangent;\n\t\tvarying vec3 vBitangent;\n\t#endif\n#endif\n#include <packing>\n#include <uv_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\t#include <logdepthbuf_fragment>\n\t#include <normal_fragment_begin>\n\t#include <normal_fragment_maps>\n\tgl_FragColor = vec4( packNormalToRGB( normal ), opacity );\n}",normal_vert="#define NORMAL\n#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( TANGENTSPACE_NORMALMAP )\n\tvarying vec3 vViewPosition;\n#endif\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n\t#ifdef USE_TANGENT\n\t\tvarying vec3 vTangent;\n\t\tvarying vec3 vBitangent;\n\t#endif\n#endif\n#include <common>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n#ifndef FLAT_SHADED\n\tvNormal = normalize( transformedNormal );\n\t#ifdef USE_TANGENT\n\t\tvTangent = normalize( transformedTangent );\n\t\tvBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );\n\t#endif\n#endif\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( TANGENTSPACE_NORMALMAP )\n\tvViewPosition = - mvPosition.xyz;\n#endif\n}",points_frag="uniform vec3 diffuse;\nuniform float opacity;\n#include <common>\n#include <color_pars_fragment>\n#include <map_particle_pars_fragment>\n#include <fog_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec3 outgoingLight = vec3( 0.0 );\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\t#include <logdepthbuf_fragment>\n\t#include <map_particle_fragment>\n\t#include <color_fragment>\n\t#include <alphatest_fragment>\n\toutgoingLight = diffuseColor.rgb;\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n}",points_vert="uniform float size;\nuniform float scale;\n#include <common>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <color_vertex>\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <project_vertex>\n\tgl_PointSize = size;\n\t#ifdef USE_SIZEATTENUATION\n\t\tbool isPerspective = isPerspectiveMatrix( projectionMatrix );\n\t\tif ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );\n\t#endif\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\t#include <worldpos_vertex>\n\t#include <fog_vertex>\n}",shadow_frag="uniform vec3 color;\nuniform float opacity;\n#include <common>\n#include <packing>\n#include <fog_pars_fragment>\n#include <bsdfs>\n#include <lights_pars_begin>\n#include <shadowmap_pars_fragment>\n#include <shadowmask_pars_fragment>\nvoid main() {\n\tgl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n}",shadow_vert="#include <fog_pars_vertex>\n#include <shadowmap_pars_vertex>\nvoid main() {\n\t#include <begin_vertex>\n\t#include <project_vertex>\n\t#include <worldpos_vertex>\n\t#include <shadowmap_vertex>\n\t#include <fog_vertex>\n}",sprite_frag="uniform vec3 diffuse;\nuniform float opacity;\n#include <common>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <fog_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec3 outgoingLight = vec3( 0.0 );\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\toutgoingLight = diffuseColor.rgb;\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n}",sprite_vert="uniform float rotation;\nuniform vec2 center;\n#include <common>\n#include <uv_pars_vertex>\n#include <fog_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\tvec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );\n\tvec2 scale;\n\tscale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );\n\tscale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );\n\t#ifndef USE_SIZEATTENUATION\n\t\tbool isPerspective = isPerspectiveMatrix( projectionMatrix );\n\t\tif ( isPerspective ) scale *= - mvPosition.z;\n\t#endif\n\tvec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;\n\tvec2 rotatedPosition;\n\trotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;\n\trotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;\n\tmvPosition.xy += rotatedPosition;\n\tgl_Position = projectionMatrix * mvPosition;\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\t#include <fog_vertex>\n}",ShaderChunk={alphamap_fragment:alphamap_fragment,alphamap_pars_fragment:alphamap_pars_fragment,alphatest_fragment:alphatest_fragment,aomap_fragment:aomap_fragment,aomap_pars_fragment:aomap_pars_fragment,begin_vertex:begin_vertex,beginnormal_vertex:beginnormal_vertex,bsdfs:bsdfs,bumpmap_pars_fragment:bumpmap_pars_fragment,clipping_planes_fragment:clipping_planes_fragment,clipping_planes_pars_fragment:clipping_planes_pars_fragment,clipping_planes_pars_vertex:clipping_planes_pars_vertex,clipping_planes_vertex:clipping_planes_vertex,color_fragment:color_fragment,color_pars_fragment:color_pars_fragment,color_pars_vertex:color_pars_vertex,color_vertex:color_vertex,common:common,cube_uv_reflection_fragment:cube_uv_reflection_fragment,defaultnormal_vertex:defaultnormal_vertex,displacementmap_pars_vertex:displacementmap_pars_vertex,displacementmap_vertex:displacementmap_vertex,emissivemap_fragment:emissivemap_fragment,emissivemap_pars_fragment:emissivemap_pars_fragment,encodings_fragment:encodings_fragment,encodings_pars_fragment:encodings_pars_fragment,envmap_fragment:envmap_fragment,envmap_common_pars_fragment:envmap_common_pars_fragment,envmap_pars_fragment:envmap_pars_fragment,envmap_pars_vertex:envmap_pars_vertex,envmap_physical_pars_fragment:envmap_physical_pars_fragment,envmap_vertex:envmap_vertex,fog_vertex:fog_vertex,fog_pars_vertex:fog_pars_vertex,fog_fragment:fog_fragment,fog_pars_fragment:fog_pars_fragment,gradientmap_pars_fragment:gradientmap_pars_fragment,lightmap_fragment:lightmap_fragment,lightmap_pars_fragment:lightmap_pars_fragment,lights_lambert_vertex:lights_lambert_vertex,lights_pars_begin:lights_pars_begin,lights_toon_fragment:lights_toon_fragment,lights_toon_pars_fragment:lights_toon_pars_fragment,lights_phong_fragment:lights_phong_fragment,lights_phong_pars_fragment:lights_phong_pars_fragment,lights_physical_fragment:lights_physical_fragment,lights_physical_pars_fragment:lights_physical_pars_fragment,lights_fragment_begin:lights_fragment_begin,lights_fragment_maps:lights_fragment_maps,lights_fragment_end:lights_fragment_end,logdepthbuf_fragment:logdepthbuf_fragment,logdepthbuf_pars_fragment:logdepthbuf_pars_fragment,logdepthbuf_pars_vertex:logdepthbuf_pars_vertex,logdepthbuf_vertex:logdepthbuf_vertex,map_fragment:map_fragment,map_pars_fragment:map_pars_fragment,map_particle_fragment:map_particle_fragment,map_particle_pars_fragment:map_particle_pars_fragment,metalnessmap_fragment:metalnessmap_fragment,metalnessmap_pars_fragment:metalnessmap_pars_fragment,morphnormal_vertex:morphnormal_vertex,morphtarget_pars_vertex:morphtarget_pars_vertex,morphtarget_vertex:morphtarget_vertex,normal_fragment_begin:normal_fragment_begin,normal_fragment_maps:normal_fragment_maps,normalmap_pars_fragment:normalmap_pars_fragment,clearcoat_normal_fragment_begin:clearcoat_normal_fragment_begin,clearcoat_normal_fragment_maps:clearcoat_normal_fragment_maps,clearcoat_normalmap_pars_fragment:clearcoat_normalmap_pars_fragment,packing:packing,premultiplied_alpha_fragment:premultiplied_alpha_fragment,project_vertex:project_vertex,dithering_fragment:dithering_fragment,dithering_pars_fragment:dithering_pars_fragment,roughnessmap_fragment:roughnessmap_fragment,roughnessmap_pars_fragment:roughnessmap_pars_fragment,shadowmap_pars_fragment:shadowmap_pars_fragment,shadowmap_pars_vertex:shadowmap_pars_vertex,shadowmap_vertex:shadowmap_vertex,shadowmask_pars_fragment:shadowmask_pars_fragment,skinbase_vertex:skinbase_vertex,skinning_pars_vertex:skinning_pars_vertex,skinning_vertex:skinning_vertex,skinnormal_vertex:skinnormal_vertex,specularmap_fragment:specularmap_fragment,specularmap_pars_fragment:specularmap_pars_fragment,tonemapping_fragment:tonemapping_fragment,tonemapping_pars_fragment:tonemapping_pars_fragment,uv_pars_fragment:uv_pars_fragment,uv_pars_vertex:uv_pars_vertex,uv_vertex:uv_vertex,uv2_pars_fragment:uv2_pars_fragment,uv2_pars_vertex:uv2_pars_vertex,uv2_vertex:uv2_vertex,worldpos_vertex:worldpos_vertex,background_frag:background_frag,background_vert:background_vert,cube_frag:cube_frag,cube_vert:cube_vert,depth_frag:depth_frag,depth_vert:depth_vert,distanceRGBA_frag:distanceRGBA_frag,distanceRGBA_vert:distanceRGBA_vert,equirect_frag:equirect_frag,equirect_vert:equirect_vert,linedashed_frag:linedashed_frag,linedashed_vert:linedashed_vert,meshbasic_frag:meshbasic_frag,meshbasic_vert:meshbasic_vert,meshlambert_frag:meshlambert_frag,meshlambert_vert:meshlambert_vert,meshmatcap_frag:meshmatcap_frag,meshmatcap_vert:meshmatcap_vert,meshtoon_frag:meshtoon_frag,meshtoon_vert:meshtoon_vert,meshphong_frag:meshphong_frag,meshphong_vert:meshphong_vert,meshphysical_frag:meshphysical_frag,meshphysical_vert:meshphysical_vert,normal_frag:normal_frag,normal_vert:normal_vert,points_frag:points_frag,points_vert:points_vert,shadow_frag:shadow_frag,shadow_vert:shadow_vert,sprite_frag:sprite_frag,sprite_vert:sprite_vert},ShaderLib={basic:{uniforms:mergeUniforms([UniformsLib.common,UniformsLib.specularmap,UniformsLib.envmap,UniformsLib.aomap,UniformsLib.lightmap,UniformsLib.fog]),vertexShader:ShaderChunk.meshbasic_vert,fragmentShader:ShaderChunk.meshbasic_frag},lambert:{uniforms:mergeUniforms([UniformsLib.common,UniformsLib.specularmap,UniformsLib.envmap,UniformsLib.aomap,UniformsLib.lightmap,UniformsLib.emissivemap,UniformsLib.fog,UniformsLib.lights,{emissive:{value:new Color(0)}}]),vertexShader:ShaderChunk.meshlambert_vert,fragmentShader:ShaderChunk.meshlambert_frag},phong:{uniforms:mergeUniforms([UniformsLib.common,UniformsLib.specularmap,UniformsLib.envmap,UniformsLib.aomap,UniformsLib.lightmap,UniformsLib.emissivemap,UniformsLib.bumpmap,UniformsLib.normalmap,UniformsLib.displacementmap,UniformsLib.fog,UniformsLib.lights,{emissive:{value:new Color(0)},specular:{value:new Color(1118481)},shininess:{value:30}}]),vertexShader:ShaderChunk.meshphong_vert,fragmentShader:ShaderChunk.meshphong_frag},standard:{uniforms:mergeUniforms([UniformsLib.common,UniformsLib.envmap,UniformsLib.aomap,UniformsLib.lightmap,UniformsLib.emissivemap,UniformsLib.bumpmap,UniformsLib.normalmap,UniformsLib.displacementmap,UniformsLib.roughnessmap,UniformsLib.metalnessmap,UniformsLib.fog,UniformsLib.lights,{emissive:{value:new Color(0)},roughness:{value:.5},metalness:{value:.5},envMapIntensity:{value:1}}]),vertexShader:ShaderChunk.meshphysical_vert,fragmentShader:ShaderChunk.meshphysical_frag},toon:{uniforms:mergeUniforms([UniformsLib.common,UniformsLib.specularmap,UniformsLib.aomap,UniformsLib.lightmap,UniformsLib.emissivemap,UniformsLib.bumpmap,UniformsLib.normalmap,UniformsLib.displacementmap,UniformsLib.gradientmap,UniformsLib.fog,UniformsLib.lights,{emissive:{value:new Color(0)},specular:{value:new Color(1118481)},shininess:{value:30}}]),vertexShader:ShaderChunk.meshtoon_vert,fragmentShader:ShaderChunk.meshtoon_frag},matcap:{uniforms:mergeUniforms([UniformsLib.common,UniformsLib.bumpmap,UniformsLib.normalmap,UniformsLib.displacementmap,UniformsLib.fog,{matcap:{value:null}}]),vertexShader:ShaderChunk.meshmatcap_vert,fragmentShader:ShaderChunk.meshmatcap_frag},points:{uniforms:mergeUniforms([UniformsLib.points,UniformsLib.fog]),vertexShader:ShaderChunk.points_vert,fragmentShader:ShaderChunk.points_frag},dashed:{uniforms:mergeUniforms([UniformsLib.common,UniformsLib.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:ShaderChunk.linedashed_vert,fragmentShader:ShaderChunk.linedashed_frag},depth:{uniforms:mergeUniforms([UniformsLib.common,UniformsLib.displacementmap]),vertexShader:ShaderChunk.depth_vert,fragmentShader:ShaderChunk.depth_frag},normal:{uniforms:mergeUniforms([UniformsLib.common,UniformsLib.bumpmap,UniformsLib.normalmap,UniformsLib.displacementmap,{opacity:{value:1}}]),vertexShader:ShaderChunk.normal_vert,fragmentShader:ShaderChunk.normal_frag},sprite:{uniforms:mergeUniforms([UniformsLib.sprite,UniformsLib.fog]),vertexShader:ShaderChunk.sprite_vert,fragmentShader:ShaderChunk.sprite_frag},background:{uniforms:{uvTransform:{value:new Matrix3},t2D:{value:null}},vertexShader:ShaderChunk.background_vert,fragmentShader:ShaderChunk.background_frag},cube:{uniforms:mergeUniforms([UniformsLib.envmap,{opacity:{value:1}}]),vertexShader:ShaderChunk.cube_vert,fragmentShader:ShaderChunk.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:ShaderChunk.equirect_vert,fragmentShader:ShaderChunk.equirect_frag},distanceRGBA:{uniforms:mergeUniforms([UniformsLib.common,UniformsLib.displacementmap,{referencePosition:{value:new Vector3},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:ShaderChunk.distanceRGBA_vert,fragmentShader:ShaderChunk.distanceRGBA_frag},shadow:{uniforms:mergeUniforms([UniformsLib.lights,UniformsLib.fog,{color:{value:new Color(0)},opacity:{value:1}}]),vertexShader:ShaderChunk.shadow_vert,fragmentShader:ShaderChunk.shadow_frag}};function WebGLBackground(e,t,r,n)
{var i,a,o=new Color(0),s=0,l=null,c=0,h=null;function u(e,r)
{t.buffers.color.setClear(e.r,e.g,e.b,r,n)}
return{getClearColor:function()
{return o},setClearColor:function(e,t)
{o.set(e),u(o,s=void 0!==t?t:1)},getClearAlpha:function()
{return s},setClearAlpha:function(e)
{u(o,s=e)},render:function(t,n,d,p)
{var m=n.background,f=e.xr,g=f.getSession&&f.getSession();if(g&&"additive"===g.environmentBlendMode&&(m=null),null===m?u(o,s):m&&m.isColor&&(u(m,1),p=!0),(e.autoClear||p)&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),m&&(m.isCubeTexture||m.isWebGLCubeRenderTarget||m.mapping===CubeUVReflectionMapping))
{void 0===a&&((a=new Mesh(new BoxBufferGeometry(1,1,1),new ShaderMaterial({type:"BackgroundCubeMaterial",uniforms:cloneUniforms(ShaderLib.cube.uniforms),vertexShader:ShaderLib.cube.vertexShader,fragmentShader:ShaderLib.cube.fragmentShader,side:BackSide,depthTest:!1,depthWrite:!1,fog:!1}))).geometry.deleteAttribute("normal"),a.geometry.deleteAttribute("uv"),a.onBeforeRender=function(e,t,r)
{this.matrixWorld.copyPosition(r.matrixWorld)},Object.defineProperty(a.material,"envMap",{get:function()
{return this.uniforms.envMap.value}}),r.update(a));var v=m.isWebGLCubeRenderTarget?m.texture:m;a.material.uniforms.envMap.value=v,a.material.uniforms.flipEnvMap.value=v.isCubeTexture?-1:1,l===m&&c===v.version&&h===e.toneMapping||(a.material.needsUpdate=!0,l=m,c=v.version,h=e.toneMapping),t.unshift(a,a.geometry,a.material,0,0,null)}
else m&&m.isTexture&&(void 0===i&&((i=new Mesh(new PlaneBufferGeometry(2,2),new ShaderMaterial({type:"BackgroundMaterial",uniforms:cloneUniforms(ShaderLib.background.uniforms),vertexShader:ShaderLib.background.vertexShader,fragmentShader:ShaderLib.background.fragmentShader,side:FrontSide,depthTest:!1,depthWrite:!1,fog:!1}))).geometry.deleteAttribute("normal"),Object.defineProperty(i.material,"map",{get:function()
{return this.uniforms.t2D.value}}),r.update(i)),i.material.uniforms.t2D.value=m,!0===m.matrixAutoUpdate&&m.updateMatrix(),i.material.uniforms.uvTransform.value.copy(m.matrix),l===m&&c===m.version&&h===e.toneMapping||(i.material.needsUpdate=!0,l=m,c=m.version,h=e.toneMapping),t.unshift(i,i.geometry,i.material,0,0,null))}}}
function WebGLBufferRenderer(e,t,r,n)
{var i,a=n.isWebGL2;this.setMode=function(e)
{i=e},this.render=function(t,n)
{e.drawArrays(i,t,n),r.update(n,i)},this.renderInstances=function(n,o,s,l)
{if(0!==l)
{var c,h;if(a)c=e,h="drawArraysInstanced";else if(h="drawArraysInstancedANGLE",null===(c=t.get("ANGLE_instanced_arrays")))return void console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");c[h](i,o,s,l),r.update(s,i,l)}}}
function WebGLCapabilities(e,t,r)
{var n;function i(t)
{if("highp"===t)
{if(e.getShaderPrecisionFormat(35633,36338).precision>0&&e.getShaderPrecisionFormat(35632,36338).precision>0)return"highp";t="mediump"}
return"mediump"===t&&e.getShaderPrecisionFormat(35633,36337).precision>0&&e.getShaderPrecisionFormat(35632,36337).precision>0?"mediump":"lowp"}
var a="undefined"!=typeof WebGL2RenderingContext&&e instanceof WebGL2RenderingContext||"undefined"!=typeof WebGL2ComputeRenderingContext&&e instanceof WebGL2ComputeRenderingContext,o=void 0!==r.precision?r.precision:"highp",s=i(o);s!==o&&(console.warn("THREE.WebGLRenderer:",o,"not supported, using",s,"instead."),o=s);var l=!0===r.logarithmicDepthBuffer,c=e.getParameter(34930),h=e.getParameter(35660),u=e.getParameter(3379),d=e.getParameter(34076),p=e.getParameter(34921),m=e.getParameter(36347),f=e.getParameter(36348),g=e.getParameter(36349),v=h>0,y=a||!!t.get("OES_texture_float");return{isWebGL2:a,getMaxAnisotropy:function()
{if(void 0!==n)return n;var r=t.get("EXT_texture_filter_anisotropic");return n=null!==r?e.getParameter(r.MAX_TEXTURE_MAX_ANISOTROPY_EXT):0},getMaxPrecision:i,precision:o,logarithmicDepthBuffer:l,maxTextures:c,maxVertexTextures:h,maxTextureSize:u,maxCubemapSize:d,maxAttributes:p,maxVertexUniforms:m,maxVaryings:f,maxFragmentUniforms:g,vertexTextures:v,floatFragmentTextures:y,floatVertexTextures:v&&y,maxSamples:a?e.getParameter(36183):0}}
function WebGLClipping()
{var e=this,t=null,r=0,n=!1,i=!1,a=new Plane,o=new Matrix3,s={value:null,needsUpdate:!1};function l()
{s.value!==t&&(s.value=t,s.needsUpdate=r>0),e.numPlanes=r,e.numIntersection=0}
function c(t,r,n,i)
{var l=null!==t?t.length:0,c=null;if(0!==l)
{if(c=s.value,!0!==i||null===c)
{var h=n+4*l,u=r.matrixWorldInverse;o.getNormalMatrix(u),(null===c||c.length<h)&&(c=new Float32Array(h));for(var d=0,p=n;d!==l;++d,p+=4)a.copy(t[d]).applyMatrix4(u,o),a.normal.toArray(c,p),c[p+3]=a.constant}
s.value=c,s.needsUpdate=!0}
return e.numPlanes=l,c}
this.uniform=s,this.numPlanes=0,this.numIntersection=0,this.init=function(e,i,a)
{var o=0!==e.length||i||0!==r||n;return n=i,t=c(e,a,0),r=e.length,o},this.beginShadows=function()
{i=!0,c(null)},this.endShadows=function()
{i=!1,l()},this.setState=function(e,a,o,h,u,d)
{if(!n||null===e||0===e.length||i&&!o)i?c(null):l();else{var p=i?0:r,m=4*p,f=u.clippingState||null;s.value=f,f=c(e,h,m,d);for(var g=0;g!==m;++g)f[g]=t[g];u.clippingState=f,this.numIntersection=a?this.numPlanes:0,this.numPlanes+=p}}}
function WebGLExtensions(e)
{var t={};return{get:function(r)
{if(void 0!==t[r])return t[r];var n;switch(r)
{case "WEBGL_depth_texture":n=e.getExtension("WEBGL_depth_texture")||e.getExtension("MOZ_WEBGL_depth_texture")||e.getExtension("WEBKIT_WEBGL_depth_texture");break;case "EXT_texture_filter_anisotropic":n=e.getExtension("EXT_texture_filter_anisotropic")||e.getExtension("MOZ_EXT_texture_filter_anisotropic")||e.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case "WEBGL_compressed_texture_s3tc":n=e.getExtension("WEBGL_compressed_texture_s3tc")||e.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||e.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case "WEBGL_compressed_texture_pvrtc":n=e.getExtension("WEBGL_compressed_texture_pvrtc")||e.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:n=e.getExtension(r)}
return null===n&&console.warn("THREE.WebGLRenderer: "+r+" extension not supported."),t[r]=n,n}}}
function WebGLGeometries(e,t,r)
{var n=new WeakMap,i=new WeakMap;function a(e)
{var o=e.target,s=n.get(o);for(var l in null!==s.index&&t.remove(s.index),s.attributes)t.remove(s.attributes[l]);o.removeEventListener("dispose",a),n.delete(o);var c=i.get(s);c&&(t.remove(c),i.delete(s)),r.memory.geometries--}
function o(e)
{var r=[],n=e.index,a=e.attributes.position,o=0;if(null!==n)
{var s=n.array;o=n.version;for(var l=0,c=s.length;l<c;l+=3)
{var h=s[l+0],u=s[l+1],d=s[l+2];r.push(h,u,u,d,d,h)}}
else{s=a.array;o=a.version;for(l=0,c=s.length/3-1;l<c;l+=3)
{h=l+0,u=l+1,d=l+2;r.push(h,u,u,d,d,h)}}
var p=new(arrayMax(r)>65535?Uint32BufferAttribute:Uint16BufferAttribute)(r,1);p.version=o,t.update(p,34963);var m=i.get(e);m&&t.remove(m),i.set(e,p)}
return{get:function(e,t)
{var i=n.get(t);return i||(t.addEventListener("dispose",a),t.isBufferGeometry?i=t:t.isGeometry&&(void 0===t._bufferGeometry&&(t._bufferGeometry=(new BufferGeometry).setFromObject(e)),i=t._bufferGeometry),n.set(t,i),r.memory.geometries++,i)},update:function(e)
{var r=e.index,n=e.attributes;for(var i in null!==r&&t.update(r,34963),n)t.update(n[i],34962);var a=e.morphAttributes;for(var i in a)
for(var o=a[i],s=0,l=o.length;s<l;s++)t.update(o[s],34962)},getWireframeAttribute:function(e)
{var t=i.get(e);if(t)
{var r=e.index;null!==r&&t.version<r.version&&o(e)}
else o(e);return i.get(e)}}}
function WebGLIndexedBufferRenderer(e,t,r,n)
{var i,a,o,s=n.isWebGL2;this.setMode=function(e)
{i=e},this.setIndex=function(e)
{a=e.type,o=e.bytesPerElement},this.render=function(t,n)
{e.drawElements(i,n,a,t*o),r.update(n,i)},this.renderInstances=function(n,l,c,h)
{if(0!==h)
{var u,d;if(s)u=e,d="drawElementsInstanced";else if(d="drawElementsInstancedANGLE",null===(u=t.get("ANGLE_instanced_arrays")))return void console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");u[d](i,c,a,l*o,h),r.update(c,i,h)}}}
function WebGLInfo(e)
{var t={frame:0,calls:0,triangles:0,points:0,lines:0};return{memory:{geometries:0,textures:0},render:t,programs:null,autoReset:!0,reset:function()
{t.frame++,t.calls=0,t.triangles=0,t.points=0,t.lines=0},update:function(e,r,n)
{switch(n=n||1,t.calls++,r)
{case 4:t.triangles+=n*(e/3);break;case 1:t.lines+=n*(e/2);break;case 3:t.lines+=n*(e-1);break;case 2:t.lines+=n*e;break;case 0:t.points+=n*e;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",r)}}}}
function absNumericalSort(e,t)
{return Math.abs(t[1])-Math.abs(e[1])}
function WebGLMorphtargets(e)
{var t={},r=new Float32Array(8);return{update:function(n,i,a,o)
{var s=n.morphTargetInfluences,l=void 0===s?0:s.length,c=t[i.id];if(void 0===c)
{c=[];for(var h=0;h<l;h++)c[h]=[h,0];t[i.id]=c}
var u=a.morphTargets&&i.morphAttributes.position,d=a.morphNormals&&i.morphAttributes.normal;for(h=0;h<l;h++)0!==(m=c[h])[1]&&(u&&i.deleteAttribute("morphTarget"+h),d&&i.deleteAttribute("morphNormal"+h));for(h=0;h<l;h++)(m=c[h])[0]=h,m[1]=s[h];c.sort(absNumericalSort);var p=0;for(h=0;h<8;h++)
{var m;if(m=c[h])
{var f=m[0],g=m[1];if(g)
{u&&i.setAttribute("morphTarget"+h,u[f]),d&&i.setAttribute("morphNormal"+h,d[f]),r[h]=g,p+=g;continue}}
r[h]=0}
var v=i.morphTargetsRelative?1:1-p;o.getUniforms().setValue(e,"morphTargetBaseInfluence",v),o.getUniforms().setValue(e,"morphTargetInfluences",r)}}}
function WebGLObjects(e,t,r,n)
{var i={};return{update:function(e)
{var a=n.render.frame,o=e.geometry,s=t.get(e,o);return i[s.id]!==a&&(o.isGeometry&&s.updateFromObject(e),t.update(s),i[s.id]=a),e.isInstancedMesh&&r.update(e.instanceMatrix,34962),s},dispose:function()
{i={}}}}
function CubeTexture(e,t,r,n,i,a,o,s,l,c)
{e=void 0!==e?e:[],t=void 0!==t?t:CubeReflectionMapping,o=void 0!==o?o:RGBFormat,Texture.call(this,e,t,r,n,i,a,o,s,l,c),this.flipY=!1}
function DataTexture2DArray(e,t,r,n)
{Texture.call(this,null),this.image={data:e||null,width:t||1,height:r||1,depth:n||1},this.magFilter=NearestFilter,this.minFilter=NearestFilter,this.wrapR=ClampToEdgeWrapping,this.generateMipmaps=!1,this.flipY=!1,this.needsUpdate=!0}
function DataTexture3D(e,t,r,n)
{Texture.call(this,null),this.image={data:e||null,width:t||1,height:r||1,depth:n||1},this.magFilter=NearestFilter,this.minFilter=NearestFilter,this.wrapR=ClampToEdgeWrapping,this.generateMipmaps=!1,this.flipY=!1,this.needsUpdate=!0}
ShaderLib.physical={uniforms:mergeUniforms([ShaderLib.standard.uniforms,{transparency:{value:0},clearcoat:{value:0},clearcoatRoughness:{value:0},sheen:{value:new Color(0)},clearcoatNormalScale:{value:new Vector2(1,1)},clearcoatNormalMap:{value:null}}]),vertexShader:ShaderChunk.meshphysical_vert,fragmentShader:ShaderChunk.meshphysical_frag},CubeTexture.prototype=Object.create(Texture.prototype),CubeTexture.prototype.constructor=CubeTexture,CubeTexture.prototype.isCubeTexture=!0,Object.defineProperty(CubeTexture.prototype,"images",{get:function()
{return this.image},set:function(e)
{this.image=e}}),DataTexture2DArray.prototype=Object.create(Texture.prototype),DataTexture2DArray.prototype.constructor=DataTexture2DArray,DataTexture2DArray.prototype.isDataTexture2DArray=!0,DataTexture3D.prototype=Object.create(Texture.prototype),DataTexture3D.prototype.constructor=DataTexture3D,DataTexture3D.prototype.isDataTexture3D=!0;var emptyTexture=new Texture,emptyTexture2dArray=new DataTexture2DArray,emptyTexture3d=new DataTexture3D,emptyCubeTexture=new CubeTexture,arrayCacheF32=[],arrayCacheI32=[],mat4array=new Float32Array(16),mat3array=new Float32Array(9),mat2array=new Float32Array(4);function flatten(e,t,r)
{var n=e[0];if(n<=0||n>0)return e;var i=t*r,a=arrayCacheF32[i];if(void 0===a&&(a=new Float32Array(i),arrayCacheF32[i]=a),0!==t)
{n.toArray(a,0);for(var o=1,s=0;o!==t;++o)s+=r,e[o].toArray(a,s)}
return a}
function arraysEqual(e,t)
{if(e.length!==t.length)return!1;for(var r=0,n=e.length;r<n;r++)
if(e[r]!==t[r])return!1;return!0}
function copyArray(e,t)
{for(var r=0,n=t.length;r<n;r++)e[r]=t[r]}
function allocTexUnits(e,t)
{var r=arrayCacheI32[t];void 0===r&&(r=new Int32Array(t),arrayCacheI32[t]=r);for(var n=0;n!==t;++n)r[n]=e.allocateTextureUnit();return r}
function setValueV1f(e,t)
{var r=this.cache;r[0]!==t&&(e.uniform1f(this.addr,t),r[0]=t)}
function setValueV2f(e,t)
{var r=this.cache;if(void 0!==t.x)r[0]===t.x&&r[1]===t.y||(e.uniform2f(this.addr,t.x,t.y),r[0]=t.x,r[1]=t.y);else{if(arraysEqual(r,t))return;e.uniform2fv(this.addr,t),copyArray(r,t)}}
function setValueV3f(e,t)
{var r=this.cache;if(void 0!==t.x)r[0]===t.x&&r[1]===t.y&&r[2]===t.z||(e.uniform3f(this.addr,t.x,t.y,t.z),r[0]=t.x,r[1]=t.y,r[2]=t.z);else if(void 0!==t.r)r[0]===t.r&&r[1]===t.g&&r[2]===t.b||(e.uniform3f(this.addr,t.r,t.g,t.b),r[0]=t.r,r[1]=t.g,r[2]=t.b);else{if(arraysEqual(r,t))return;e.uniform3fv(this.addr,t),copyArray(r,t)}}
function setValueV4f(e,t)
{var r=this.cache;if(void 0!==t.x)r[0]===t.x&&r[1]===t.y&&r[2]===t.z&&r[3]===t.w||(e.uniform4f(this.addr,t.x,t.y,t.z,t.w),r[0]=t.x,r[1]=t.y,r[2]=t.z,r[3]=t.w);else{if(arraysEqual(r,t))return;e.uniform4fv(this.addr,t),copyArray(r,t)}}
function setValueM2(e,t)
{var r=this.cache,n=t.elements;if(void 0===n)
{if(arraysEqual(r,t))return;e.uniformMatrix2fv(this.addr,!1,t),copyArray(r,t)}
else{if(arraysEqual(r,n))return;mat2array.set(n),e.uniformMatrix2fv(this.addr,!1,mat2array),copyArray(r,n)}}
function setValueM3(e,t)
{var r=this.cache,n=t.elements;if(void 0===n)
{if(arraysEqual(r,t))return;e.uniformMatrix3fv(this.addr,!1,t),copyArray(r,t)}
else{if(arraysEqual(r,n))return;mat3array.set(n),e.uniformMatrix3fv(this.addr,!1,mat3array),copyArray(r,n)}}
function setValueM4(e,t)
{var r=this.cache,n=t.elements;if(void 0===n)
{if(arraysEqual(r,t))return;e.uniformMatrix4fv(this.addr,!1,t),copyArray(r,t)}
else{if(arraysEqual(r,n))return;mat4array.set(n),e.uniformMatrix4fv(this.addr,!1,mat4array),copyArray(r,n)}}
function setValueT1(e,t,r)
{var n=this.cache,i=r.allocateTextureUnit();n[0]!==i&&(e.uniform1i(this.addr,i),n[0]=i),r.safeSetTexture2D(t||emptyTexture,i)}
function setValueT2DArray1(e,t,r)
{var n=this.cache,i=r.allocateTextureUnit();n[0]!==i&&(e.uniform1i(this.addr,i),n[0]=i),r.setTexture2DArray(t||emptyTexture2dArray,i)}
function setValueT3D1(e,t,r)
{var n=this.cache,i=r.allocateTextureUnit();n[0]!==i&&(e.uniform1i(this.addr,i),n[0]=i),r.setTexture3D(t||emptyTexture3d,i)}
function setValueT6(e,t,r)
{var n=this.cache,i=r.allocateTextureUnit();n[0]!==i&&(e.uniform1i(this.addr,i),n[0]=i),r.safeSetTextureCube(t||emptyCubeTexture,i)}
function setValueV1i(e,t)
{var r=this.cache;r[0]!==t&&(e.uniform1i(this.addr,t),r[0]=t)}
function setValueV2i(e,t)
{var r=this.cache;arraysEqual(r,t)||(e.uniform2iv(this.addr,t),copyArray(r,t))}
function setValueV3i(e,t)
{var r=this.cache;arraysEqual(r,t)||(e.uniform3iv(this.addr,t),copyArray(r,t))}
function setValueV4i(e,t)
{var r=this.cache;arraysEqual(r,t)||(e.uniform4iv(this.addr,t),copyArray(r,t))}
function setValueV1ui(e,t)
{var r=this.cache;r[0]!==t&&(e.uniform1ui(this.addr,t),r[0]=t)}
function getSingularSetter(e)
{switch(e)
{case 5126:return setValueV1f;case 35664:return setValueV2f;case 35665:return setValueV3f;case 35666:return setValueV4f;case 35674:return setValueM2;case 35675:return setValueM3;case 35676:return setValueM4;case 5124:case 35670:return setValueV1i;case 35667:case 35671:return setValueV2i;case 35668:case 35672:return setValueV3i;case 35669:case 35673:return setValueV4i;case 5125:return setValueV1ui;case 35678:case 36198:case 36298:case 36306:case 35682:return setValueT1;case 35679:case 36299:case 36307:return setValueT3D1;case 35680:case 36300:case 36308:case 36293:return setValueT6;case 36289:case 36303:case 36311:case 36292:return setValueT2DArray1}}
function setValueV1fArray(e,t)
{e.uniform1fv(this.addr,t)}
function setValueV1iArray(e,t)
{e.uniform1iv(this.addr,t)}
function setValueV2iArray(e,t)
{e.uniform2iv(this.addr,t)}
function setValueV3iArray(e,t)
{e.uniform3iv(this.addr,t)}
function setValueV4iArray(e,t)
{e.uniform4iv(this.addr,t)}
function setValueV2fArray(e,t)
{var r=flatten(t,this.size,2);e.uniform2fv(this.addr,r)}
function setValueV3fArray(e,t)
{var r=flatten(t,this.size,3);e.uniform3fv(this.addr,r)}
function setValueV4fArray(e,t)
{var r=flatten(t,this.size,4);e.uniform4fv(this.addr,r)}
function setValueM2Array(e,t)
{var r=flatten(t,this.size,4);e.uniformMatrix2fv(this.addr,!1,r)}
function setValueM3Array(e,t)
{var r=flatten(t,this.size,9);e.uniformMatrix3fv(this.addr,!1,r)}
function setValueM4Array(e,t)
{var r=flatten(t,this.size,16);e.uniformMatrix4fv(this.addr,!1,r)}
function setValueT1Array(e,t,r)
{var n=t.length,i=allocTexUnits(r,n);e.uniform1iv(this.addr,i);for(var a=0;a!==n;++a)r.safeSetTexture2D(t[a]||emptyTexture,i[a])}
function setValueT6Array(e,t,r)
{var n=t.length,i=allocTexUnits(r,n);e.uniform1iv(this.addr,i);for(var a=0;a!==n;++a)r.safeSetTextureCube(t[a]||emptyCubeTexture,i[a])}
function getPureArraySetter(e)
{switch(e)
{case 5126:return setValueV1fArray;case 35664:return setValueV2fArray;case 35665:return setValueV3fArray;case 35666:return setValueV4fArray;case 35674:return setValueM2Array;case 35675:return setValueM3Array;case 35676:return setValueM4Array;case 5124:case 35670:return setValueV1iArray;case 35667:case 35671:return setValueV2iArray;case 35668:case 35672:return setValueV3iArray;case 35669:case 35673:return setValueV4iArray;case 35678:case 36198:case 36298:case 36306:case 35682:return setValueT1Array;case 35680:case 36300:case 36308:case 36293:return setValueT6Array}}
function SingleUniform(e,t,r)
{this.id=e,this.addr=r,this.cache=[],this.setValue=getSingularSetter(t.type)}
function PureArrayUniform(e,t,r)
{this.id=e,this.addr=r,this.cache=[],this.size=t.size,this.setValue=getPureArraySetter(t.type)}
function StructuredUniform(e)
{this.id=e,this.seq=[],this.map={}}
PureArrayUniform.prototype.updateCache=function(e)
{var t=this.cache;e instanceof Float32Array&&t.length!==e.length&&(this.cache=new Float32Array(e.length)),copyArray(t,e)},StructuredUniform.prototype.setValue=function(e,t,r)
{for(var n=this.seq,i=0,a=n.length;i!==a;++i)
{var o=n[i];o.setValue(e,t[o.id],r)}};var RePathPart=/([\w\d_]+)(\])?(\[|\.)?/g;function addUniform(e,t)
{e.seq.push(t),e.map[t.id]=t}
function parseUniform(e,t,r)
{var n=e.name,i=n.length;for(RePathPart.lastIndex=0;;)
{var a=RePathPart.exec(n),o=RePathPart.lastIndex,s=a[1],l="]"===a[2],c=a[3];if(l&&(s|=0),void 0===c||"["===c&&o+2===i)
{addUniform(r,void 0===c?new SingleUniform(s,e,t):new PureArrayUniform(s,e,t));break}
var h=r.map[s];void 0===h&&addUniform(r,h=new StructuredUniform(s)),r=h}}
function WebGLUniforms(e,t)
{this.seq=[],this.map={};for(var r=e.getProgramParameter(t,35718),n=0;n<r;++n)
{var i=e.getActiveUniform(t,n);parseUniform(i,e.getUniformLocation(t,i.name),this)}}
function WebGLShader(e,t,r)
{var n=e.createShader(t);return e.shaderSource(n,r),e.compileShader(n),n}
WebGLUniforms.prototype.setValue=function(e,t,r,n)
{var i=this.map[t];void 0!==i&&i.setValue(e,r,n)},WebGLUniforms.prototype.setOptional=function(e,t,r)
{var n=t[r];void 0!==n&&this.setValue(e,r,n)},WebGLUniforms.upload=function(e,t,r,n)
{for(var i=0,a=t.length;i!==a;++i)
{var o=t[i],s=r[o.id];!1!==s.needsUpdate&&o.setValue(e,s.value,n)}},WebGLUniforms.seqWithValue=function(e,t)
{for(var r=[],n=0,i=e.length;n!==i;++n)
{var a=e[n];a.id in t&&r.push(a)}
return r};var programIdCount=0;function addLineNumbers(e)
{for(var t=e.split("\n"),r=0;r<t.length;r++)t[r]=r+1+": "+t[r];return t.join("\n")}
function getEncodingComponents(e)
{switch(e)
{case LinearEncoding:return["Linear","( value )"];case sRGBEncoding:return["sRGB","( value )"];case RGBEEncoding:return["RGBE","( value )"];case RGBM7Encoding:return["RGBM","( value, 7.0 )"];case RGBM16Encoding:return["RGBM","( value, 16.0 )"];case RGBDEncoding:return["RGBD","( value, 256.0 )"];case GammaEncoding:return["Gamma","( value, float( GAMMA_FACTOR ) )"];case LogLuvEncoding:return["LogLuv","( value )"];default:throw new Error("unsupported encoding: "+e)}}
function getShaderErrors(e,t,r)
{var n=e.getShaderParameter(t,35713),i=e.getShaderInfoLog(t).trim();return n&&""===i?"":"THREE.WebGLShader: gl.getShaderInfoLog() "+r+"\n"+i+addLineNumbers(e.getShaderSource(t))}
function getTexelDecodingFunction(e,t)
{var r=getEncodingComponents(t);return"vec4 "+e+"( vec4 value ) { return "+r[0]+"ToLinear"+r[1]+"; }"}
function getTexelEncodingFunction(e,t)
{var r=getEncodingComponents(t);return"vec4 "+e+"( vec4 value ) { return LinearTo"+r[0]+r[1]+"; }"}
function getToneMappingFunction(e,t)
{var r;switch(t)
{case LinearToneMapping:r="Linear";break;case ReinhardToneMapping:r="Reinhard";break;case Uncharted2ToneMapping:r="Uncharted2";break;case CineonToneMapping:r="OptimizedCineon";break;case ACESFilmicToneMapping:r="ACESFilmic";break;default:throw new Error("unsupported toneMapping: "+t)}
return"vec3 "+e+"( vec3 color ) { return "+r+"ToneMapping( color ); }"}
function generateExtensions(e)
{return[e.extensionDerivatives||e.envMapCubeUV||e.bumpMap||e.tangentSpaceNormalMap||e.clearcoatNormalMap||e.flatShading||"physical"===e.shaderID?"#extension GL_OES_standard_derivatives : enable":"",(e.extensionFragDepth||e.logarithmicDepthBuffer)&&e.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",e.extensionDrawBuffers&&e.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(e.extensionShaderTextureLOD||e.envMap)&&e.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""].filter(filterEmptyLine).join("\n")}
function generateDefines(e)
{var t=[];for(var r in e)
{var n=e[r];!1!==n&&t.push("#define "+r+" "+n)}
return t.join("\n")}
function fetchAttributeLocations(e,t)
{for(var r={},n=e.getProgramParameter(t,35721),i=0;i<n;i++)
{var a=e.getActiveAttrib(t,i).name;r[a]=e.getAttribLocation(t,a)}
return r}
function filterEmptyLine(e)
{return""!==e}
function replaceLightNums(e,t)
{return e.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}
function replaceClippingPlaneNums(e,t)
{return e.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}
var includePattern=/^[ \t]*#include +<([\w\d.\/]+)>/gm;function resolveIncludes(e)
{return e.replace(includePattern,includeReplacer)}
function includeReplacer(e,t)
{var r=ShaderChunk[t];if(void 0===r)throw new Error("Can not resolve #include <"+t+">");return resolveIncludes(r)}
var loopPattern=/#pragma unroll_loop[\s]+?for \( int i \= (\d+)\; i < (\d+)\; i \+\+ \) \{([\s\S]+?)(?=\})\}/g;function unrollLoops(e)
{return e.replace(loopPattern,loopReplacer)}
function loopReplacer(e,t,r,n)
{for(var i="",a=parseInt(t);a<parseInt(r);a++)i+=n.replace(/\[ i \]/g,"[ "+a+" ]").replace(/UNROLLED_LOOP_INDEX/g,a);return i}
function generatePrecision(e)
{var t="precision "+e.precision+" float;\nprecision "+e.precision+" int;";return"highp"===e.precision?t+="\n#define HIGH_PRECISION":"mediump"===e.precision?t+="\n#define MEDIUM_PRECISION":"lowp"===e.precision&&(t+="\n#define LOW_PRECISION"),t}
function generateShadowMapTypeDefine(e)
{var t="SHADOWMAP_TYPE_BASIC";return e.shadowMapType===PCFShadowMap?t="SHADOWMAP_TYPE_PCF":e.shadowMapType===PCFSoftShadowMap?t="SHADOWMAP_TYPE_PCF_SOFT":e.shadowMapType===VSMShadowMap&&(t="SHADOWMAP_TYPE_VSM"),t}
function generateEnvMapTypeDefine(e)
{var t="ENVMAP_TYPE_CUBE";if(e.envMap)switch(e.envMapMode)
{case CubeReflectionMapping:case CubeRefractionMapping:t="ENVMAP_TYPE_CUBE";break;case CubeUVReflectionMapping:case CubeUVRefractionMapping:t="ENVMAP_TYPE_CUBE_UV";break;case EquirectangularReflectionMapping:case EquirectangularRefractionMapping:t="ENVMAP_TYPE_EQUIREC";break;case SphericalReflectionMapping:t="ENVMAP_TYPE_SPHERE"}
return t}
function generateEnvMapModeDefine(e)
{var t="ENVMAP_MODE_REFLECTION";if(e.envMap)switch(e.envMapMode)
{case CubeRefractionMapping:case EquirectangularRefractionMapping:t="ENVMAP_MODE_REFRACTION"}
return t}
function generateEnvMapBlendingDefine(e)
{var t="ENVMAP_BLENDING_NONE";if(e.envMap)switch(e.combine)
{case MultiplyOperation:t="ENVMAP_BLENDING_MULTIPLY";break;case MixOperation:t="ENVMAP_BLENDING_MIX";break;case AddOperation:t="ENVMAP_BLENDING_ADD"}
return t}
function WebGLProgram(e,t,r)
{var n,i,a=e.getContext(),o=r.defines,s=r.vertexShader,l=r.fragmentShader,c=generateShadowMapTypeDefine(r),h=generateEnvMapTypeDefine(r),u=generateEnvMapModeDefine(r),d=generateEnvMapBlendingDefine(r),p=e.gammaFactor>0?e.gammaFactor:1,m=r.isWebGL2?"":generateExtensions(r),f=generateDefines(o),g=a.createProgram(),v=r.numMultiviewViews;if(r.isRawShaderMaterial?((n=[f].filter(filterEmptyLine).join("\n")).length>0&&(n+="\n"),(i=[m,f].filter(filterEmptyLine).join("\n")).length>0&&(i+="\n")):(n=[generatePrecision(r),"#define SHADER_NAME "+r.shaderName,f,r.instancing?"#define USE_INSTANCING":"",r.supportsVertexTextures?"#define VERTEX_TEXTURES":"","#define GAMMA_FACTOR "+p,"#define MAX_BONES "+r.maxBones,r.useFog&&r.fog?"#define USE_FOG":"",r.useFog&&r.fogExp2?"#define FOG_EXP2":"",r.map?"#define USE_MAP":"",r.envMap?"#define USE_ENVMAP":"",r.envMap?"#define "+u:"",r.lightMap?"#define USE_LIGHTMAP":"",r.aoMap?"#define USE_AOMAP":"",r.emissiveMap?"#define USE_EMISSIVEMAP":"",r.bumpMap?"#define USE_BUMPMAP":"",r.normalMap?"#define USE_NORMALMAP":"",r.normalMap&&r.objectSpaceNormalMap?"#define OBJECTSPACE_NORMALMAP":"",r.normalMap&&r.tangentSpaceNormalMap?"#define TANGENTSPACE_NORMALMAP":"",r.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",r.displacementMap&&r.supportsVertexTextures?"#define USE_DISPLACEMENTMAP":"",r.specularMap?"#define USE_SPECULARMAP":"",r.roughnessMap?"#define USE_ROUGHNESSMAP":"",r.metalnessMap?"#define USE_METALNESSMAP":"",r.alphaMap?"#define USE_ALPHAMAP":"",r.vertexTangents?"#define USE_TANGENT":"",r.vertexColors?"#define USE_COLOR":"",r.vertexUvs?"#define USE_UV":"",r.uvsVertexOnly?"#define UVS_VERTEX_ONLY":"",r.flatShading?"#define FLAT_SHADED":"",r.skinning?"#define USE_SKINNING":"",r.useVertexTexture?"#define BONE_TEXTURE":"",r.morphTargets?"#define USE_MORPHTARGETS":"",r.morphNormals&&!1===r.flatShading?"#define USE_MORPHNORMALS":"",r.doubleSided?"#define DOUBLE_SIDED":"",r.flipSided?"#define FLIP_SIDED":"",r.shadowMapEnabled?"#define USE_SHADOWMAP":"",r.shadowMapEnabled?"#define "+c:"",r.sizeAttenuation?"#define USE_SIZEATTENUATION":"",r.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",r.logarithmicDepthBuffer&&r.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING"," attribute mat4 instanceMatrix;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_TANGENT","\tattribute vec4 tangent;","#endif","#ifdef USE_COLOR","\tattribute vec3 color;","#endif","#ifdef USE_MORPHTARGETS","\tattribute vec3 morphTarget0;","\tattribute vec3 morphTarget1;","\tattribute vec3 morphTarget2;","\tattribute vec3 morphTarget3;","\t#ifdef USE_MORPHNORMALS","\t\tattribute vec3 morphNormal0;","\t\tattribute vec3 morphNormal1;","\t\tattribute vec3 morphNormal2;","\t\tattribute vec3 morphNormal3;","\t#else","\t\tattribute vec3 morphTarget4;","\t\tattribute vec3 morphTarget5;","\t\tattribute vec3 morphTarget6;","\t\tattribute vec3 morphTarget7;","\t#endif","#endif","#ifdef USE_SKINNING","\tattribute vec4 skinIndex;","\tattribute vec4 skinWeight;","#endif","\n"].filter(filterEmptyLine).join("\n"),i=[m,generatePrecision(r),"#define SHADER_NAME "+r.shaderName,f,r.alphaTest?"#define ALPHATEST "+r.alphaTest+(r.alphaTest%1?"":".0"):"","#define GAMMA_FACTOR "+p,r.useFog&&r.fog?"#define USE_FOG":"",r.useFog&&r.fogExp2?"#define FOG_EXP2":"",r.map?"#define USE_MAP":"",r.matcap?"#define USE_MATCAP":"",r.envMap?"#define USE_ENVMAP":"",r.envMap?"#define "+h:"",r.envMap?"#define "+u:"",r.envMap?"#define "+d:"",r.lightMap?"#define USE_LIGHTMAP":"",r.aoMap?"#define USE_AOMAP":"",r.emissiveMap?"#define USE_EMISSIVEMAP":"",r.bumpMap?"#define USE_BUMPMAP":"",r.normalMap?"#define USE_NORMALMAP":"",r.normalMap&&r.objectSpaceNormalMap?"#define OBJECTSPACE_NORMALMAP":"",r.normalMap&&r.tangentSpaceNormalMap?"#define TANGENTSPACE_NORMALMAP":"",r.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",r.specularMap?"#define USE_SPECULARMAP":"",r.roughnessMap?"#define USE_ROUGHNESSMAP":"",r.metalnessMap?"#define USE_METALNESSMAP":"",r.alphaMap?"#define USE_ALPHAMAP":"",r.sheen?"#define USE_SHEEN":"",r.vertexTangents?"#define USE_TANGENT":"",r.vertexColors?"#define USE_COLOR":"",r.vertexUvs?"#define USE_UV":"",r.uvsVertexOnly?"#define UVS_VERTEX_ONLY":"",r.gradientMap?"#define USE_GRADIENTMAP":"",r.flatShading?"#define FLAT_SHADED":"",r.doubleSided?"#define DOUBLE_SIDED":"",r.flipSided?"#define FLIP_SIDED":"",r.shadowMapEnabled?"#define USE_SHADOWMAP":"",r.shadowMapEnabled?"#define "+c:"",r.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",r.physicallyCorrectLights?"#define PHYSICALLY_CORRECT_LIGHTS":"",r.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",r.logarithmicDepthBuffer&&r.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"",(r.extensionShaderTextureLOD||r.envMap)&&r.rendererExtensionShaderTextureLod?"#define TEXTURE_LOD_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",r.toneMapping!==NoToneMapping?"#define TONE_MAPPING":"",r.toneMapping!==NoToneMapping?ShaderChunk.tonemapping_pars_fragment:"",r.toneMapping!==NoToneMapping?getToneMappingFunction("toneMapping",r.toneMapping):"",r.dithering?"#define DITHERING":"",r.outputEncoding||r.mapEncoding||r.matcapEncoding||r.envMapEncoding||r.emissiveMapEncoding||r.lightMapEncoding?ShaderChunk.encodings_pars_fragment:"",r.mapEncoding?getTexelDecodingFunction("mapTexelToLinear",r.mapEncoding):"",r.matcapEncoding?getTexelDecodingFunction("matcapTexelToLinear",r.matcapEncoding):"",r.envMapEncoding?getTexelDecodingFunction("envMapTexelToLinear",r.envMapEncoding):"",r.emissiveMapEncoding?getTexelDecodingFunction("emissiveMapTexelToLinear",r.emissiveMapEncoding):"",r.lightMapEncoding?getTexelDecodingFunction("lightMapTexelToLinear",r.lightMapEncoding):"",r.outputEncoding?getTexelEncodingFunction("linearToOutputTexel",r.outputEncoding):"",r.depthPacking?"#define DEPTH_PACKING "+r.depthPacking:"","\n"].filter(filterEmptyLine).join("\n")),s=replaceClippingPlaneNums(s=replaceLightNums(s=resolveIncludes(s),r),r),l=replaceClippingPlaneNums(l=replaceLightNums(l=resolveIncludes(l),r),r),s=unrollLoops(s),l=unrollLoops(l),r.isWebGL2&&!r.isRawShaderMaterial)
{var y=!1,_=/^\s*#version\s+300\s+es\s*\n/;r.isShaderMaterial&&null!==s.match(_)&&null!==l.match(_)&&(y=!0,s=s.replace(_,""),l=l.replace(_,"")),n=["#version 300 es\n","#define attribute in","#define varying out","#define texture2D texture"].join("\n")+"\n"+n,i=["#version 300 es\n","#define varying in",y?"":"out highp vec4 pc_fragColor;",y?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join("\n")+"\n"+i,v>0&&(n=(n=n.replace("#version 300 es\n",["#version 300 es\n","#extension GL_OVR_multiview2 : require","layout(num_views = "+v+") in;","#define VIEW_ID gl_ViewID_OVR"].join("\n"))).replace(["uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;"].join("\n"),["uniform mat4 modelViewMatrices["+v+"];","uniform mat4 projectionMatrices["+v+"];","uniform mat4 viewMatrices["+v+"];","uniform mat3 normalMatrices["+v+"];","#define modelViewMatrix modelViewMatrices[VIEW_ID]","#define projectionMatrix projectionMatrices[VIEW_ID]","#define viewMatrix viewMatrices[VIEW_ID]","#define normalMatrix normalMatrices[VIEW_ID]"].join("\n")),i=(i=i.replace("#version 300 es\n",["#version 300 es\n","#extension GL_OVR_multiview2 : require","#define VIEW_ID gl_ViewID_OVR"].join("\n"))).replace("uniform mat4 viewMatrix;",["uniform mat4 viewMatrices["+v+"];","#define viewMatrix viewMatrices[VIEW_ID]"].join("\n")))}
var b,x,M=i+l,w=WebGLShader(a,35633,n+s),S=WebGLShader(a,35632,M);if(a.attachShader(g,w),a.attachShader(g,S),void 0!==r.index0AttributeName?a.bindAttribLocation(g,0,r.index0AttributeName):!0===r.morphTargets&&a.bindAttribLocation(g,0,"position"),a.linkProgram(g),e.debug.checkShaderErrors)
{var T=a.getProgramInfoLog(g).trim(),E=a.getShaderInfoLog(w).trim(),A=a.getShaderInfoLog(S).trim(),L=!0,C=!0;if(!1===a.getProgramParameter(g,35714))
{L=!1;var R=getShaderErrors(a,w,"vertex"),P=getShaderErrors(a,S,"fragment");console.error("THREE.WebGLProgram: shader error: ",a.getError(),"35715",a.getProgramParameter(g,35715),"gl.getProgramInfoLog",T,R,P)}
else ""!==T?console.warn("THREE.WebGLProgram: gl.getProgramInfoLog()",T):""!==E&&""!==A||(C=!1);C&&(this.diagnostics={runnable:L,programLog:T,vertexShader:{log:E,prefix:n},fragmentShader:{log:A,prefix:i}})}
return a.deleteShader(w),a.deleteShader(S),this.getUniforms=function()
{return void 0===b&&(b=new WebGLUniforms(a,g)),b},this.getAttributes=function()
{return void 0===x&&(x=fetchAttributeLocations(a,g)),x},this.destroy=function()
{a.deleteProgram(g),this.program=void 0},this.name=r.shaderName,this.id=programIdCount++,this.cacheKey=t,this.usedTimes=1,this.program=g,this.vertexShader=w,this.fragmentShader=S,this.numMultiviewViews=v,this}
function WebGLPrograms(e,t,r)
{var n=[],i=r.isWebGL2,a=r.logarithmicDepthBuffer,o=r.floatVertexTextures,s=r.precision,l=r.maxVertexUniforms,c=r.vertexTextures,h={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"},u=["precision","isWebGL2","supportsVertexTextures","outputEncoding","instancing","numMultiviewViews","map","mapEncoding","matcap","matcapEncoding","envMap","envMapMode","envMapEncoding","envMapCubeUV","lightMap","lightMapEncoding","aoMap","emissiveMap","emissiveMapEncoding","bumpMap","normalMap","objectSpaceNormalMap","tangentSpaceNormalMap","clearcoatNormalMap","displacementMap","specularMap","roughnessMap","metalnessMap","gradientMap","alphaMap","combine","vertexColors","vertexTangents","vertexUvs","uvsVertexOnly","fog","useFog","fogExp2","flatShading","sizeAttenuation","logarithmicDepthBuffer","skinning","maxBones","useVertexTexture","morphTargets","morphNormals","maxMorphTargets","maxMorphNormals","premultipliedAlpha","numDirLights","numPointLights","numSpotLights","numHemiLights","numRectAreaLights","numDirLightShadows","numPointLightShadows","numSpotLightShadows","shadowMapEnabled","shadowMapType","toneMapping","physicallyCorrectLights","alphaTest","doubleSided","flipSided","numClippingPlanes","numClipIntersection","depthPacking","dithering","sheen"];function d(e)
{var t;return e?e.isTexture?t=e.encoding:e.isWebGLRenderTarget&&(console.warn("THREE.WebGLPrograms.getTextureEncodingFromMap: don't use render targets as textures. Use their .texture property instead."),t=e.texture.encoding):t=LinearEncoding,t}
this.getParameters=function(n,u,p,m,f,g,v)
{var y=m.fog,_=n.isMeshStandardMaterial?m.environment:null,b=n.envMap||_,x=h[n.type],M=v.isSkinnedMesh?function(e)
{var t=e.skeleton.bones;if(o)return 1024;var r=l,n=Math.floor((r-20)/4),i=Math.min(n,t.length);return i<t.length?(console.warn("THREE.WebGLRenderer: Skeleton has "+t.length+" bones. This GPU supports "+i+"."),0):i}(v):0;null!==n.precision&&(s=r.getMaxPrecision(n.precision))!==n.precision&&console.warn("THREE.WebGLProgram.getParameters:",n.precision,"not supported, using",s,"instead.");var w=function(e,t)
{var r;if(t)
{var n=ShaderLib[t];r={name:e.type,uniforms:UniformsUtils.clone(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader}}
else r={name:e.type,uniforms:e.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader};return r}(n,x);n.onBeforeCompile(w,e);var S=e.getRenderTarget(),T=S&&S.isWebGLMultiviewRenderTarget?S.numViews:0;return{isWebGL2:i,shaderID:x,shaderName:w.name,uniforms:w.uniforms,vertexShader:w.vertexShader,fragmentShader:w.fragmentShader,defines:n.defines,isRawShaderMaterial:n.isRawShaderMaterial,isShaderMaterial:n.isShaderMaterial,precision:s,instancing:!0===v.isInstancedMesh,supportsVertexTextures:c,numMultiviewViews:T,outputEncoding:null!==S?d(S.texture):e.outputEncoding,map:!!n.map,mapEncoding:d(n.map),matcap:!!n.matcap,matcapEncoding:d(n.matcap),envMap:!!b,envMapMode:b&&b.mapping,envMapEncoding:d(b),envMapCubeUV:!!b&&(b.mapping===CubeUVReflectionMapping||b.mapping===CubeUVRefractionMapping),lightMap:!!n.lightMap,lightMapEncoding:d(n.lightMap),aoMap:!!n.aoMap,emissiveMap:!!n.emissiveMap,emissiveMapEncoding:d(n.emissiveMap),bumpMap:!!n.bumpMap,normalMap:!!n.normalMap,objectSpaceNormalMap:n.normalMapType===ObjectSpaceNormalMap,tangentSpaceNormalMap:n.normalMapType===TangentSpaceNormalMap,clearcoatNormalMap:!!n.clearcoatNormalMap,displacementMap:!!n.displacementMap,roughnessMap:!!n.roughnessMap,metalnessMap:!!n.metalnessMap,specularMap:!!n.specularMap,alphaMap:!!n.alphaMap,gradientMap:!!n.gradientMap,sheen:!!n.sheen,combine:n.combine,vertexTangents:n.normalMap&&n.vertexTangents,vertexColors:n.vertexColors,vertexUvs:!!(n.map||n.bumpMap||n.normalMap||n.specularMap||n.alphaMap||n.emissiveMap||n.roughnessMap||n.metalnessMap||n.clearcoatNormalMap||n.displacementMap),uvsVertexOnly:!(n.map||n.bumpMap||n.normalMap||n.specularMap||n.alphaMap||n.emissiveMap||n.roughnessMap||n.metalnessMap||n.clearcoatNormalMap||!n.displacementMap),fog:!!y,useFog:n.fog,fogExp2:y&&y.isFogExp2,flatShading:n.flatShading,sizeAttenuation:n.sizeAttenuation,logarithmicDepthBuffer:a,skinning:n.skinning&&M>0,maxBones:M,useVertexTexture:o,morphTargets:n.morphTargets,morphNormals:n.morphNormals,maxMorphTargets:e.maxMorphTargets,maxMorphNormals:e.maxMorphNormals,numDirLights:u.directional.length,numPointLights:u.point.length,numSpotLights:u.spot.length,numRectAreaLights:u.rectArea.length,numHemiLights:u.hemi.length,numDirLightShadows:u.directionalShadowMap.length,numPointLightShadows:u.pointShadowMap.length,numSpotLightShadows:u.spotShadowMap.length,numClippingPlanes:f,numClipIntersection:g,dithering:n.dithering,shadowMapEnabled:e.shadowMap.enabled&&p.length>0,shadowMapType:e.shadowMap.type,toneMapping:n.toneMapped?e.toneMapping:NoToneMapping,physicallyCorrectLights:e.physicallyCorrectLights,premultipliedAlpha:n.premultipliedAlpha,alphaTest:n.alphaTest,doubleSided:n.side===DoubleSide,flipSided:n.side===BackSide,depthPacking:void 0!==n.depthPacking&&n.depthPacking,index0AttributeName:n.index0AttributeName,extensionDerivatives:n.extensions&&n.extensions.derivatives,extensionFragDepth:n.extensions&&n.extensions.frawbuffers,extensionDrawbuffers:n.extensions&&n.extensions.drawbuffers,extensionShaderTextureLOD:n.extensions&&n.extensions.shaderTextureLOD,rendererExtensionFragDepth:i||null!==t.get("EXT_frag_depth"),rendererExtensionDrawBuffers:i||null!==t.get("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:i||null!==t.get("EXT_shader_texture_lod"),onBeforeCompile:n.onBeforeCompile}},this.getProgramCacheKey=function(t)
{var r=[];if(t.shaderID?r.push(t.shaderID):(r.push(t.fragmentShader),r.push(t.vertexShader)),void 0!==t.defines)
for(var n in t.defines)r.push(n),r.push(t.defines[n]);if(void 0===t.isRawShaderMaterial)
{for(var i=0;i<u.length;i++)r.push(t[u[i]]);r.push(e.outputEncoding),r.push(e.gammaFactor)}
return r.push(t.onBeforeCompile.toString()),r.join()},this.acquireProgram=function(t,r)
{for(var i,a=0,o=n.length;a<o;a++)
{var s=n[a];if(s.cacheKey===r)
{++(i=s).usedTimes;break}}
return void 0===i&&(i=new WebGLProgram(e,r,t),n.push(i)),i},this.releaseProgram=function(e)
{if(0==--e.usedTimes)
{var t=n.indexOf(e);n[t]=n[n.length-1],n.pop(),e.destroy()}},this.programs=n}
function WebGLProperties()
{var e=new WeakMap;return{get:function(t)
{var r=e.get(t);return void 0===r&&(r={},e.set(t,r)),r},remove:function(t)
{e.delete(t)},update:function(t,r,n)
{e.get(t)[r]=n},dispose:function()
{e=new WeakMap}}}
function painterSortStable(e,t)
{return e.groupOrder!==t.groupOrder?e.groupOrder-t.groupOrder:e.renderOrder!==t.renderOrder?e.renderOrder-t.renderOrder:e.program!==t.program?e.program.id-t.program.id:e.material.id!==t.material.id?e.material.id-t.material.id:e.z!==t.z?e.z-t.z:e.id-t.id}
function reversePainterSortStable(e,t)
{return e.groupOrder!==t.groupOrder?e.groupOrder-t.groupOrder:e.renderOrder!==t.renderOrder?e.renderOrder-t.renderOrder:e.z!==t.z?t.z-e.z:e.id-t.id}
function WebGLRenderList()
{var e=[],t=0,r=[],n=[],i={id:-1};function a(r,n,a,o,s,l)
{var c=e[t];return void 0===c?(c={id:r.id,object:r,geometry:n,material:a,program:a.program||i,groupOrder:o,renderOrder:r.renderOrder,z:s,group:l},e[t]=c):(c.id=r.id,c.object=r,c.geometry=n,c.material=a,c.program=a.program||i,c.groupOrder=o,c.renderOrder=r.renderOrder,c.z=s,c.group=l),t++,c}
return{opaque:r,transparent:n,init:function()
{t=0,r.length=0,n.length=0},push:function(e,t,i,o,s,l)
{var c=a(e,t,i,o,s,l);(!0===i.transparent?n:r).push(c)},unshift:function(e,t,i,o,s,l)
{var c=a(e,t,i,o,s,l);(!0===i.transparent?n:r).unshift(c)},sort:function(e,t)
{r.length>1&&r.sort(e||painterSortStable),n.length>1&&n.sort(t||reversePainterSortStable)}}}
function WebGLRenderLists()
{var e=new WeakMap;function t(r)
{var n=r.target;n.removeEventListener("dispose",t),e.delete(n)}
return{get:function(r,n)
{var i,a=e.get(r);return void 0===a?(i=new WebGLRenderList,e.set(r,new WeakMap),e.get(r).set(n,i),r.addEventListener("dispose",t)):void 0===(i=a.get(n))&&(i=new WebGLRenderList,a.set(n,i)),i},dispose:function()
{e=new WeakMap}}}
function UniformsCache()
{var e={};return{get:function(t)
{if(void 0!==e[t.id])return e[t.id];var r;switch(t.type)
{case "DirectionalLight":r={direction:new Vector3,color:new Color,shadow:!1,shadowBias:0,shadowRadius:1,shadowMapSize:new Vector2};break;case "SpotLight":r={position:new Vector3,direction:new Vector3,color:new Color,distance:0,coneCos:0,penumbraCos:0,decay:0,shadow:!1,shadowBias:0,shadowRadius:1,shadowMapSize:new Vector2};break;case "PointLight":r={position:new Vector3,color:new Color,distance:0,decay:0,shadow:!1,shadowBias:0,shadowRadius:1,shadowMapSize:new Vector2,shadowCameraNear:1,shadowCameraFar:1e3};break;case "HemisphereLight":r={direction:new Vector3,skyColor:new Color,groundColor:new Color};break;case "RectAreaLight":r={color:new Color,position:new Vector3,halfWidth:new Vector3,halfHeight:new Vector3}}
return e[t.id]=r,r}}}
var nextVersion=0;function shadowCastingLightsFirst(e,t)
{return(t.castShadow?1:0)-(e.castShadow?1:0)}
function WebGLLights()
{for(var e=new UniformsCache,t={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotShadowMap:[],spotShadowMatrix:[],rectArea:[],point:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1},r=0;r<9;r++)t.probe.push(new Vector3);var n=new Vector3,i=new Matrix4,a=new Matrix4;return{setup:function(r,o,s)
{for(var l=0,c=0,h=0,u=0;u<9;u++)t.probe[u].set(0,0,0);var d=0,p=0,m=0,f=0,g=0,v=0,y=0,_=0,b=s.matrixWorldInverse;r.sort(shadowCastingLightsFirst),u=0;for(var x=r.length;u<x;u++)
{var M=r[u],w=M.color,S=M.intensity,T=M.distance,E=M.shadow&&M.shadow.map?M.shadow.map.texture:null;if(M.isAmbientLight)l+=w.r*S,c+=w.g*S,h+=w.b*S;else if(M.isLightProbe)
for(var A=0;A<9;A++)t.probe[A].addScaledVector(M.sh.coefficients[A],S);else if(M.isDirectionalLight)
{if((C=e.get(M)).color.copy(M.color).multiplyScalar(M.intensity),C.direction.setFromMatrixPosition(M.matrixWorld),n.setFromMatrixPosition(M.target.matrixWorld),C.direction.sub(n),C.direction.transformDirection(b),C.shadow=M.castShadow,M.castShadow)
{var L=M.shadow;C.shadowBias=L.bias,C.shadowRadius=L.radius,C.shadowMapSize=L.mapSize,t.directionalShadowMap[d]=E,t.directionalShadowMatrix[d]=M.shadow.matrix,v++}
t.directional[d]=C,d++}
else if(M.isSpotLight)(C=e.get(M)).position.setFromMatrixPosition(M.matrixWorld),C.position.applyMatrix4(b),C.color.copy(w).multiplyScalar(S),C.distance=T,C.direction.setFromMatrixPosition(M.matrixWorld),n.setFromMatrixPosition(M.target.matrixWorld),C.direction.sub(n),C.direction.transformDirection(b),C.coneCos=Math.cos(M.angle),C.penumbraCos=Math.cos(M.angle*(1-M.penumbra)),C.decay=M.decay,C.shadow=M.castShadow,M.castShadow&&(L=M.shadow,C.shadowBias=L.bias,C.shadowRadius=L.radius,C.shadowMapSize=L.mapSize,t.spotShadowMap[m]=E,t.spotShadowMatrix[m]=M.shadow.matrix,_++),t.spot[m]=C,m++;else if(M.isRectAreaLight)(C=e.get(M)).color.copy(w).multiplyScalar(S),C.position.setFromMatrixPosition(M.matrixWorld),C.position.applyMatrix4(b),a.identity(),i.copy(M.matrixWorld),i.premultiply(b),a.extractRotation(i),C.halfWidth.set(.5*M.width,0,0),C.halfHeight.set(0,.5*M.height,0),C.halfWidth.applyMatrix4(a),C.halfHeight.applyMatrix4(a),t.rectArea[f]=C,f++;else if(M.isPointLight)(C=e.get(M)).position.setFromMatrixPosition(M.matrixWorld),C.position.applyMatrix4(b),C.color.copy(M.color).multiplyScalar(M.intensity),C.distance=M.distance,C.decay=M.decay,C.shadow=M.castShadow,M.castShadow&&(L=M.shadow,C.shadowBias=L.bias,C.shadowRadius=L.radius,C.shadowMapSize=L.mapSize,C.shadowCameraNear=L.camera.near,C.shadowCameraFar=L.camera.far,t.pointShadowMap[p]=E,t.pointShadowMatrix[p]=M.shadow.matrix,y++),t.point[p]=C,p++;else if(M.isHemisphereLight)
{var C;(C=e.get(M)).direction.setFromMatrixPosition(M.matrixWorld),C.direction.transformDirection(b),C.direction.normalize(),C.skyColor.copy(M.color).multiplyScalar(S),C.groundColor.copy(M.groundColor).multiplyScalar(S),t.hemi[g]=C,g++}}
t.ambient[0]=l,t.ambient[1]=c,t.ambient[2]=h;var R=t.hash;R.directionalLength===d&&R.pointLength===p&&R.spotLength===m&&R.rectAreaLength===f&&R.hemiLength===g&&R.numDirectionalShadows===v&&R.numPointShadows===y&&R.numSpotShadows===_||(t.directional.length=d,t.spot.length=m,t.rectArea.length=f,t.point.length=p,t.hemi.length=g,t.directionalShadowMap.length=v,t.pointShadowMap.length=y,t.spotShadowMap.length=_,t.directionalShadowMatrix.length=v,t.pointShadowMatrix.length=y,t.spotShadowMatrix.length=_,R.directionalLength=d,R.pointLength=p,R.spotLength=m,R.rectAreaLength=f,R.hemiLength=g,R.numDirectionalShadows=v,R.numPointShadows=y,R.numSpotShadows=_,t.version=nextVersion++)},state:t}}
function WebGLRenderState()
{var e=new WebGLLights,t=[],r=[];return{init:function()
{t.length=0,r.length=0},state:{lightsArray:t,shadowsArray:r,lights:e},setupLights:function(n)
{e.setup(t,r,n)},pushLight:function(e)
{t.push(e)},pushShadow:function(e)
{r.push(e)}}}
function WebGLRenderStates()
{var e=new WeakMap;function t(r)
{var n=r.target;n.removeEventListener("dispose",t),e.delete(n)}
return{get:function(r,n)
{var i;return!1===e.has(r)?(i=new WebGLRenderState,e.set(r,new WeakMap),e.get(r).set(n,i),r.addEventListener("dispose",t)):!1===e.get(r).has(n)?(i=new WebGLRenderState,e.get(r).set(n,i)):i=e.get(r).get(n),i},dispose:function()
{e=new WeakMap}}}
function MeshDepthMaterial(e)
{Material.call(this),this.type="MeshDepthMaterial",this.depthPacking=BasicDepthPacking,this.skinning=!1,this.morphTargets=!1,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.setValues(e)}
function MeshDistanceMaterial(e)
{Material.call(this),this.type="MeshDistanceMaterial",this.referencePosition=new Vector3,this.nearDistance=1,this.farDistance=1e3,this.skinning=!1,this.morphTargets=!1,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.fog=!1,this.setValues(e)}
MeshDepthMaterial.prototype=Object.create(Material.prototype),MeshDepthMaterial.prototype.constructor=MeshDepthMaterial,MeshDepthMaterial.prototype.isMeshDepthMaterial=!0,MeshDepthMaterial.prototype.copy=function(e)
{return Material.prototype.copy.call(this,e),this.depthPacking=e.depthPacking,this.skinning=e.skinning,this.morphTargets=e.morphTargets,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this},MeshDistanceMaterial.prototype=Object.create(Material.prototype),MeshDistanceMaterial.prototype.constructor=MeshDistanceMaterial,MeshDistanceMaterial.prototype.isMeshDistanceMaterial=!0,MeshDistanceMaterial.prototype.copy=function(e)
{return Material.prototype.copy.call(this,e),this.referencePosition.copy(e.referencePosition),this.nearDistance=e.nearDistance,this.farDistance=e.farDistance,this.skinning=e.skinning,this.morphTargets=e.morphTargets,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this};var vsm_frag="uniform sampler2D shadow_pass;\nuniform vec2 resolution;\nuniform float radius;\n#include <packing>\nvoid main() {\n  float mean = 0.0;\n  float squared_mean = 0.0;\n\tfloat depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy  ) / resolution ) );\n  for ( float i = -1.0; i < 1.0 ; i += SAMPLE_RATE) {\n    #ifdef HORIZONAL_PASS\n      vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( i, 0.0 ) * radius ) / resolution ) );\n      mean += distribution.x;\n      squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;\n    #else\n      float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0,  i )  * radius ) / resolution ) );\n      mean += depth;\n      squared_mean += depth * depth;\n    #endif\n  }\n  mean = mean * HALF_SAMPLE_RATE;\n  squared_mean = squared_mean * HALF_SAMPLE_RATE;\n  float std_dev = sqrt( squared_mean - mean * mean );\n  gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );\n}",vsm_vert="void main() {\n\tgl_Position = vec4( position, 1.0 );\n}";function WebGLShadowMap(e,t,r)
{var n=new Frustum,i=new Vector2,a=new Vector2,o=new Vector4,s=[],l=[],c={},h={0:BackSide,1:FrontSide,2:DoubleSide},u=new ShaderMaterial({defines:{SAMPLE_RATE:.25,HALF_SAMPLE_RATE:1/8},uniforms:{shadow_pass:{value:null},resolution:{value:new Vector2},radius:{value:4}},vertexShader:vsm_vert,fragmentShader:vsm_frag}),d=u.clone();d.defines.HORIZONAL_PASS=1;var p=new BufferGeometry;p.setAttribute("position",new BufferAttribute(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));var m=new Mesh(p,u),f=this;function g(r,n)
{var i=t.update(m);u.uniforms.shadow_pass.value=r.map.texture,u.uniforms.resolution.value=r.mapSize,u.uniforms.radius.value=r.radius,e.setRenderTarget(r.mapPass),e.clear(),e.renderBufferDirect(n,null,i,u,m,null),d.uniforms.shadow_pass.value=r.mapPass.texture,d.uniforms.resolution.value=r.mapSize,d.uniforms.radius.value=r.radius,e.setRenderTarget(r.map),e.clear(),e.renderBufferDirect(n,null,i,d,m,null)}
function v(e,t,r)
{var n=e<<0|t<<1|r<<2,i=s[n];return void 0===i&&(i=new MeshDepthMaterial({depthPacking:RGBADepthPacking,morphTargets:e,skinning:t}),s[n]=i),i}
function y(e,t,r)
{var n=e<<0|t<<1|r<<2,i=l[n];return void 0===i&&(i=new MeshDistanceMaterial({morphTargets:e,skinning:t}),l[n]=i),i}
function _(t,r,n,i,a,o)
{var s=t.geometry,l=null,u=v,d=t.customDepthMaterial;if(!0===n.isPointLight&&(u=y,d=t.customDistanceMaterial),void 0===d)
{var p=!1;!0===r.morphTargets&&(!0===s.isBufferGeometry?p=s.morphAttributes&&s.morphAttributes.position&&s.morphAttributes.position.length>0:!0===s.isGeometry&&(p=s.morphTargets&&s.morphTargets.length>0));var m=!1;!0===t.isSkinnedMesh&&(!0===r.skinning?m=!0:console.warn("THREE.WebGLShadowMap: THREE.SkinnedMesh with material.skinning set to false:",t)),l=u(p,m,!0===t.isInstancedMesh)}
else l=d;if(e.localClippingEnabled&&!0===r.clipShadows&&0!==r.clippingPlanes.length)
{var f=l.uuid,g=r.uuid,_=c[f];void 0===_&&(_={},c[f]=_);var b=_[g];void 0===b&&(b=l.clone(),_[g]=b),l=b}
return l.visible=r.visible,l.wireframe=r.wireframe,l.side=o===VSMShadowMap?null!==r.shadowSide?r.shadowSide:r.side:null!==r.shadowSide?r.shadowSide:h[r.side],l.clipShadows=r.clipShadows,l.clippingPlanes=r.clippingPlanes,l.clipIntersection=r.clipIntersection,l.wireframeLinewidth=r.wireframeLinewidth,l.linewidth=r.linewidth,!0===n.isPointLight&&!0===l.isMeshDistanceMaterial&&(l.referencePosition.setFromMatrixPosition(n.matrixWorld),l.nearDistance=i,l.farDistance=a),l}
function b(r,i,a,o,s)
{if(!1!==r.visible)
{if(r.layers.test(i.layers)&&(r.isMesh||r.isLine||r.isPoints)&&(r.castShadow||r.receiveShadow&&s===VSMShadowMap)&&(!r.frustumCulled||n.intersectsObject(r)))
{r.modelViewMatrix.multiplyMatrices(a.matrixWorldInverse,r.matrixWorld);var l=t.update(r),c=r.material;if(Array.isArray(c))
for(var h=l.groups,u=0,d=h.length;u<d;u++)
{var p=h[u],m=c[p.materialIndex];if(m&&m.visible)
{var f=_(r,m,o,a.near,a.far,s);e.renderBufferDirect(a,null,l,f,r,p)}}
else if(c.visible)
{f=_(r,c,o,a.near,a.far,s);e.renderBufferDirect(a,null,l,f,r,null)}}
for(var g=r.children,v=0,y=g.length;v<y;v++)b(g[v],i,a,o,s)}}
this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=PCFShadowMap,this.render=function(t,s,l)
{if(!1!==f.enabled&&(!1!==f.autoUpdate||!1!==f.needsUpdate)&&0!==t.length)
{var c=e.getRenderTarget(),h=e.getActiveCubeFace(),u=e.getActiveMipmapLevel(),d=e.state;d.setBlending(NoBlending),d.buffers.color.setClear(1,1,1,1),d.buffers.depth.setTest(!0),d.setScissorTest(!1);for(var p=0,m=t.length;p<m;p++)
{var v=t[p],y=v.shadow;if(void 0!==y)
{i.copy(y.mapSize);var _=y.getFrameExtents();if(i.multiply(_),a.copy(y.mapSize),(i.x>r||i.y>r)&&(console.warn("THREE.WebGLShadowMap:",v,"has shadow exceeding max texture size, reducing"),i.x>r&&(a.x=Math.floor(r/_.x),i.x=a.x*_.x,y.mapSize.x=a.x),i.y>r&&(a.y=Math.floor(r/_.y),i.y=a.y*_.y,y.mapSize.y=a.y)),null===y.map&&!y.isPointLightShadow&&this.type===VSMShadowMap)
{var x={minFilter:LinearFilter,magFilter:LinearFilter,format:RGBAFormat};y.map=new WebGLRenderTarget(i.x,i.y,x),y.map.texture.name=v.name+".shadowMap",y.mapPass=new WebGLRenderTarget(i.x,i.y,x),y.camera.updateProjectionMatrix()}
if(null===y.map)
{x={minFilter:NearestFilter,magFilter:NearestFilter,format:RGBAFormat};y.map=new WebGLRenderTarget(i.x,i.y,x),y.map.texture.name=v.name+".shadowMap",y.camera.updateProjectionMatrix()}
e.setRenderTarget(y.map),e.clear();for(var M=y.getViewportCount(),w=0;w<M;w++)
{var S=y.getViewport(w);o.set(a.x*S.x,a.y*S.y,a.x*S.z,a.y*S.w),d.viewport(o),y.updateMatrices(v,w),n=y.getFrustum(),b(s,l,y.camera,v,this.type)}
y.isPointLightShadow||this.type!==VSMShadowMap||g(y,l)}
else console.warn("THREE.WebGLShadowMap:",v,"has no shadow.")}
f.needsUpdate=!1,e.setRenderTarget(c,h,u)}}}
function WebGLState(e,t,r)
{var n=r.isWebGL2;var i=new function()
{var t=!1,r=new Vector4,n=null,i=new Vector4(0,0,0,0);return{setMask:function(r)
{n===r||t||(e.colorMask(r,r,r,r),n=r)},setLocked:function(e)
{t=e},setClear:function(t,n,a,o,s)
{!0===s&&(t*=o,n*=o,a*=o),r.set(t,n,a,o),!1===i.equals(r)&&(e.clearColor(t,n,a,o),i.copy(r))},reset:function()
{t=!1,n=null,i.set(-1,0,0,0)}}},a=new function()
{var t=!1,r=null,n=null,i=null;return{setTest:function(e)
{e?G(2929):F(2929)},setMask:function(n)
{r===n||t||(e.depthMask(n),r=n)},setFunc:function(t)
{if(n!==t)
{if(t)switch(t)
{case NeverDepth:e.depthFunc(512);break;case AlwaysDepth:e.depthFunc(519);break;case LessDepth:e.depthFunc(513);break;case LessEqualDepth:e.depthFunc(515);break;case EqualDepth:e.depthFunc(514);break;case GreaterEqualDepth:e.depthFunc(518);break;case GreaterDepth:e.depthFunc(516);break;case NotEqualDepth:e.depthFunc(517);break;default:e.depthFunc(515)}
else e.depthFunc(515);n=t}},setLocked:function(e)
{t=e},setClear:function(t)
{i!==t&&(e.clearDepth(t),i=t)},reset:function()
{t=!1,r=null,n=null,i=null}}},o=new function()
{var t=!1,r=null,n=null,i=null,a=null,o=null,s=null,l=null,c=null;return{setTest:function(e)
{t||(e?G(2960):F(2960))},setMask:function(n)
{r===n||t||(e.stencilMask(n),r=n)},setFunc:function(t,r,o)
{n===t&&i===r&&a===o||(e.stencilFunc(t,r,o),n=t,i=r,a=o)},setOp:function(t,r,n)
{o===t&&s===r&&l===n||(e.stencilOp(t,r,n),o=t,s=r,l=n)},setLocked:function(e)
{t=e},setClear:function(t)
{c!==t&&(e.clearStencil(t),c=t)},reset:function()
{t=!1,r=null,n=null,i=null,a=null,o=null,s=null,l=null,c=null}}},s=e.getParameter(34921),l=new Uint8Array(s),c=new Uint8Array(s),h=new Uint8Array(s),u={},d=null,p=null,m=null,f=null,g=null,v=null,y=null,_=null,b=null,x=!1,M=null,w=null,S=null,T=null,E=null,A=e.getParameter(35661),L=!1,C=0,R=e.getParameter(7938);-1!==R.indexOf("WebGL")?(C=parseFloat(/^WebGL\ ([0-9])/.exec(R)[1]),L=C>=1):-1!==R.indexOf("OpenGL ES")&&(C=parseFloat(/^OpenGL\ ES\ ([0-9])/.exec(R)[1]),L=C>=2);var P=null,I={},O=new Vector4,D=new Vector4;function B(t,r,n)
{var i=new Uint8Array(4),a=e.createTexture();e.bindTexture(t,a),e.texParameteri(t,10241,9728),e.texParameteri(t,10240,9728);for(var o=0;o<n;o++)e.texImage2D(r+o,0,6408,1,1,0,6408,5121,i);return a}
var $={};function N(r,i)
{(l[r]=1,0===c[r]&&(e.enableVertexAttribArray(r),c[r]=1),h[r]!==i)&&((n?e:t.get("ANGLE_instanced_arrays"))[n?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](r,i),h[r]=i)}
function G(t)
{!0!==u[t]&&(e.enable(t),u[t]=!0)}
function F(t)
{!1!==u[t]&&(e.disable(t),u[t]=!1)}
$[3553]=B(3553,3553,1),$[34067]=B(34067,34069,6),i.setClear(0,0,0,1),a.setClear(1),o.setClear(0),G(2929),a.setFunc(LessEqualDepth),H(!1),j(CullFaceBack),G(2884),z(NoBlending);var U={[AddEquation]:32774,[SubtractEquation]:32778,[ReverseSubtractEquation]:32779};if(n)U[MinEquation]=32775,U[MaxEquation]=32776;else{var V=t.get("EXT_blend_minmax");null!==V&&(U[MinEquation]=V.MIN_EXT,U[MaxEquation]=V.MAX_EXT)}
var k={[ZeroFactor]:0,[OneFactor]:1,[SrcColorFactor]:768,[SrcAlphaFactor]:770,[SrcAlphaSaturateFactor]:776,[DstColorFactor]:774,[DstAlphaFactor]:772,[OneMinusSrcColorFactor]:769,[OneMinusSrcAlphaFactor]:771,[OneMinusDstColorFactor]:775,[OneMinusDstAlphaFactor]:773};function z(t,r,n,i,a,o,s,l)
{if(t!==NoBlending)
{if(p||(G(3042),p=!0),t===CustomBlending)a=a||r,o=o||n,s=s||i,r===f&&a===y||(e.blendEquationSeparate(U[r],U[a]),f=r,y=a),n===g&&i===v&&o===_&&s===b||(e.blendFuncSeparate(k[n],k[i],k[o],k[s]),g=n,v=i,_=o,b=s),m=t,x=null;else if(t!==m||l!==x)
{if(f===AddEquation&&y===AddEquation||(e.blendEquation(32774),f=AddEquation,y=AddEquation),l)switch(t)
{case NormalBlending:e.blendFuncSeparate(1,771,1,771);break;case AdditiveBlending:e.blendFunc(1,1);break;case SubtractiveBlending:e.blendFuncSeparate(0,0,769,771);break;case MultiplyBlending:e.blendFuncSeparate(0,768,0,770);break;default:console.error("THREE.WebGLState: Invalid blending: ",t)}
else switch(t)
{case NormalBlending:e.blendFuncSeparate(770,771,1,771);break;case AdditiveBlending:e.blendFunc(770,1);break;case SubtractiveBlending:e.blendFunc(0,769);break;case MultiplyBlending:e.blendFunc(0,768);break;default:console.error("THREE.WebGLState: Invalid blending: ",t)}
g=null,v=null,_=null,b=null,m=t,x=l}}
else p&&(F(3042),p=!1)}
function H(t)
{M!==t&&(t?e.frontFace(2304):e.frontFace(2305),M=t)}
function j(t)
{t!==CullFaceNone?(G(2884),t!==w&&(t===CullFaceBack?e.cullFace(1029):t===CullFaceFront?e.cullFace(1028):e.cullFace(1032))):F(2884),w=t}
function W(t,r,n)
{t?(G(32823),T===r&&E===n||(e.polygonOffset(r,n),T=r,E=n)):F(32823)}
function q(t)
{void 0===t&&(t=33984+A-1),P!==t&&(e.activeTexture(t),P=t)}
return{buffers:{color:i,depth:a,stencil:o},initAttributes:function()
{for(var e=0,t=l.length;e<t;e++)l[e]=0},enableAttribute:function(e)
{N(e,0)},enableAttributeAndDivisor:N,disableUnusedAttributes:function()
{for(var t=0,r=c.length;t!==r;++t)c[t]!==l[t]&&(e.disableVertexAttribArray(t),c[t]=0)},enable:G,disable:F,useProgram:function(t)
{return d!==t&&(e.useProgram(t),d=t,!0)},setBlending:z,setMaterial:function(e,t)
{e.side===DoubleSide?F(2884):G(2884);var r=e.side===BackSide;t&&(r=!r),H(r),e.blending===NormalBlending&&!1===e.transparent?z(NoBlending):z(e.blending,e.blendEquation,e.blendSrc,e.blendDst,e.blendEquationAlpha,e.blendSrcAlpha,e.blendDstAlpha,e.premultipliedAlpha),a.setFunc(e.depthFunc),a.setTest(e.depthTest),a.setMask(e.depthWrite),i.setMask(e.colorWrite);var n=e.stencilWrite;o.setTest(n),n&&(o.setMask(e.stencilWriteMask),o.setFunc(e.stencilFunc,e.stencilRef,e.stencilFuncMask),o.setOp(e.stencilFail,e.stencilZFail,e.stencilZPass)),W(e.polygonOffset,e.polygonOffsetFactor,e.polygonOffsetUnits)},setFlipSided:H,setCullFace:j,setLineWidth:function(t)
{t!==S&&(L&&e.lineWidth(t),S=t)},setPolygonOffset:W,setScissorTest:function(e)
{e?G(3089):F(3089)},activeTexture:q,bindTexture:function(t,r)
{null===P&&q();var n=I[P];void 0===n&&(n={type:void 0,texture:void 0},I[P]=n),n.type===t&&n.texture===r||(e.bindTexture(t,r||$[t]),n.type=t,n.texture=r)},unbindTexture:function()
{var t=I[P];void 0!==t&&void 0!==t.type&&(e.bindTexture(t.type,null),t.type=void 0,t.texture=void 0)},compressedTexImage2D:function()
{try
{e.compressedTexImage2D.apply(e,arguments)}
catch(e)
{console.error("THREE.WebGLState:",e)}},texImage2D:function()
{try
{e.texImage2D.apply(e,arguments)}
catch(e)
{console.error("THREE.WebGLState:",e)}},texImage3D:function()
{try
{e.texImage3D.apply(e,arguments)}
catch(e)
{console.error("THREE.WebGLState:",e)}},scissor:function(t)
{!1===O.equals(t)&&(e.scissor(t.x,t.y,t.z,t.w),O.copy(t))},viewport:function(t)
{!1===D.equals(t)&&(e.viewport(t.x,t.y,t.z,t.w),D.copy(t))},reset:function()
{for(var t=0;t<c.length;t++)1===c[t]&&(e.disableVertexAttribArray(t),c[t]=0);u={},P=null,I={},d=null,m=null,M=null,w=null,i.reset(),a.reset(),o.reset()}}}
function WebGLTextures(e,t,r,n,i,a,o)
{var s,l=i.isWebGL2,c=i.maxTextures,h=i.maxCubemapSize,u=i.maxTextureSize,d=i.maxSamples,p=new WeakMap,m=!1;try
{m="undefined"!=typeof OffscreenCanvas&&null!==new OffscreenCanvas(1,1).getContext("2d")}
catch(e)
{}
function f(e,t)
{return m?new OffscreenCanvas(e,t):document.createElementNS("http://www.w3.org/1999/xhtml","canvas")}
function g(e,t,r,n)
{var i=1;if((e.width>n||e.height>n)&&(i=n/Math.max(e.width,e.height)),i<1||!0===t)
{if("undefined"!=typeof HTMLImageElement&&e instanceof HTMLImageElement||"undefined"!=typeof HTMLCanvasElement&&e instanceof HTMLCanvasElement||"undefined"!=typeof ImageBitmap&&e instanceof ImageBitmap)
{var a=t?MathUtils.floorPowerOfTwo:Math.floor,o=a(i*e.width),l=a(i*e.height);void 0===s&&(s=f(o,l));var c=r?f(o,l):s;return c.width=o,c.height=l,c.getContext("2d").drawImage(e,0,0,o,l),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+e.width+"x"+e.height+") to ("+o+"x"+l+")."),c}
return"data" in e&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+e.width+"x"+e.height+")."),e}
return e}
function v(e)
{return MathUtils.isPowerOfTwo(e.width)&&MathUtils.isPowerOfTwo(e.height)}
function y(e,t)
{return e.generateMipmaps&&t&&e.minFilter!==NearestFilter&&e.minFilter!==LinearFilter}
function _(t,r,i,a)
{e.generateMipmap(t),n.get(r).__maxMipLevel=Math.log(Math.max(i,a))*Math.LOG2E}
function b(r,n,i)
{if(!1===l)return n;if(null!==r)
{if(void 0!==e[r])return e[r];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+r+"'")}
var a=n;return 6403===n&&(5126===i&&(a=33326),5131===i&&(a=33325),5121===i&&(a=33321)),6407===n&&(5126===i&&(a=34837),5131===i&&(a=34843),5121===i&&(a=32849)),6408===n&&(5126===i&&(a=34836),5131===i&&(a=34842),5121===i&&(a=32856)),33325===a||33326===a||34842===a||34836===a?t.get("EXT_color_buffer_float"):34843!==a&&34837!==a||console.warn("THREE.WebGLRenderer: Floating point textures with RGB format not supported. Please use RGBA instead."),a}
function x(e)
{return e===NearestFilter||e===NearestMipmapNearestFilter||e===NearestMipmapLinearFilter?9728:9729}
function M(t)
{var r=t.target;r.removeEventListener("dispose",M),function(t)
{var r=n.get(t);if(void 0===r.__webglInit)return;e.deleteTexture(r.__webglTexture),n.remove(t)}(r),r.isVideoTexture&&p.delete(r),o.memory.textures--}
function w(t)
{var r=t.target;r.removeEventListener("dispose",w),function(t)
{var r=n.get(t),i=n.get(t.texture);if(!t)return;void 0!==i.__webglTexture&&e.deleteTexture(i.__webglTexture);t.depthTexture&&t.depthTexture.dispose();if(t.isWebGLCubeRenderTarget)
for(var a=0;a<6;a++)e.deleteFramebuffer(r.__webglFramebuffer[a]),r.__webglDepthbuffer&&e.deleteRenderbuffer(r.__webglDepthbuffer[a]);else e.deleteFramebuffer(r.__webglFramebuffer),r.__webglDepthbuffer&&e.deleteRenderbuffer(r.__webglDepthbuffer);if(t.isWebGLMultiviewRenderTarget)
{e.deleteTexture(r.__webglColorTexture),e.deleteTexture(r.__webglDepthStencilTexture),o.memory.textures-=2;for(var a=0,s=r.__webglViewFramebuffers.length;a<s;a++)e.deleteFramebuffer(r.__webglViewFramebuffers[a])}
n.remove(t.texture),n.remove(t)}(r),o.memory.textures--}
var S=0;function T(e,t)
{var i=n.get(e);if(e.isVideoTexture&&function(e)
{var t=o.render.frame;p.get(e)!==t&&(p.set(e,t),e.update())}(e),e.version>0&&i.__version!==e.version)
{var a=e.image;if(void 0===a)console.warn("THREE.WebGLRenderer: Texture marked for update but image is undefined");else{if(!1!==a.complete)return void I(i,e,t);console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete")}}
r.activeTexture(33984+t),r.bindTexture(3553,i.__webglTexture)}
function E(t,i)
{if(6===t.image.length)
{var o=n.get(t);if(t.version>0&&o.__version!==t.version)
{P(o,t),r.activeTexture(33984+i),r.bindTexture(34067,o.__webglTexture),e.pixelStorei(37440,t.flipY);for(var s=t&&(t.isCompressedTexture||t.image[0].isCompressedTexture),c=t.image[0]&&t.image[0].isDataTexture,u=[],d=0;d<6;d++)u[d]=s||c?c?t.image[d].image:t.image[d]:g(t.image[d],!1,!0,h);var p,m=u[0],f=v(m)||l,x=a.convert(t.format),M=a.convert(t.type),w=b(t.internalFormat,x,M);if(R(34067,t,f),s)
{for(d=0;d<6;d++)
{p=u[d].mipmaps;for(var S=0;S<p.length;S++)
{var T=p[S];t.format!==RGBAFormat&&t.format!==RGBFormat?null!==x?r.compressedTexImage2D(34069+d,S,w,T.width,T.height,0,T.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):r.texImage2D(34069+d,S,w,T.width,T.height,0,x,M,T.data)}}
o.__maxMipLevel=p.length-1}
else{p=t.mipmaps;for(d=0;d<6;d++)
if(c)
{r.texImage2D(34069+d,0,w,u[d].width,u[d].height,0,x,M,u[d].data);for(S=0;S<p.length;S++)
{var E=(T=p[S]).image[d].image;r.texImage2D(34069+d,S+1,w,E.width,E.height,0,x,M,E.data)}}
else{r.texImage2D(34069+d,0,w,x,M,u[d]);for(S=0;S<p.length;S++)
{T=p[S];r.texImage2D(34069+d,S+1,w,x,M,T.image[d])}}
o.__maxMipLevel=p.length}
y(t,f)&&_(34067,t,m.width,m.height),o.__version=t.version,t.onUpdate&&t.onUpdate(t)}
else r.activeTexture(33984+i),r.bindTexture(34067,o.__webglTexture)}}
function A(e,t)
{r.activeTexture(33984+t),r.bindTexture(34067,n.get(e).__webglTexture)}
var L={[RepeatWrapping]:10497,[ClampToEdgeWrapping]:33071,[MirroredRepeatWrapping]:33648},C={[NearestFilter]:9728,[NearestMipmapNearestFilter]:9984,[NearestMipmapLinearFilter]:9986,[LinearFilter]:9729,[LinearMipmapNearestFilter]:9985,[LinearMipmapLinearFilter]:9987};function R(r,a,o)
{o?(e.texParameteri(r,10242,L[a.wrapS]),e.texParameteri(r,10243,L[a.wrapT]),32879!==r&&35866!==r||e.texParameteri(r,32882,L[a.wrapR]),e.texParameteri(r,10240,C[a.magFilter]),e.texParameteri(r,10241,C[a.minFilter])):(e.texParameteri(r,10242,33071),e.texParameteri(r,10243,33071),32879!==r&&35866!==r||e.texParameteri(r,32882,33071),a.wrapS===ClampToEdgeWrapping&&a.wrapT===ClampToEdgeWrapping||console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),e.texParameteri(r,10240,x(a.magFilter)),e.texParameteri(r,10241,x(a.minFilter)),a.minFilter!==NearestFilter&&a.minFilter!==LinearFilter&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter."));var s=t.get("EXT_texture_filter_anisotropic");if(s)
{if(a.type===FloatType&&null===t.get("OES_texture_float_linear"))return;if(a.type===HalfFloatType&&null===(l||t.get("OES_texture_half_float_linear")))return;(a.anisotropy>1||n.get(a).__currentAnisotropy)&&(e.texParameterf(r,s.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(a.anisotropy,i.getMaxAnisotropy())),n.get(a).__currentAnisotropy=a.anisotropy)}}
function P(t,r)
{void 0===t.__webglInit&&(t.__webglInit=!0,r.addEventListener("dispose",M),t.__webglTexture=e.createTexture(),o.memory.textures++)}
function I(t,n,i)
{var o=3553;n.isDataTexture2DArray&&(o=35866),n.isDataTexture3D&&(o=32879),P(t,n),r.activeTexture(33984+i),r.bindTexture(o,t.__webglTexture),e.pixelStorei(37440,n.flipY),e.pixelStorei(37441,n.premultiplyAlpha),e.pixelStorei(3317,n.unpackAlignment);var s=function(e)
{return!l&&(e.wrapS!==ClampToEdgeWrapping||e.wrapT!==ClampToEdgeWrapping||e.minFilter!==NearestFilter&&e.minFilter!==LinearFilter)}(n)&&!1===v(n.image),c=g(n.image,s,!1,u),h=v(c)||l,d=a.convert(n.format),p=a.convert(n.type),m=b(n.internalFormat,d,p);R(o,n,h);var f,x=n.mipmaps;if(n.isDepthTexture)
{if(m=6402,n.type===FloatType)
{if(!1===l)throw new Error("Float Depth Texture only supported in WebGL2.0");m=36012}
else l&&(m=33189);n.format===DepthFormat&&6402===m&&n.type!==UnsignedShortType&&n.type!==UnsignedIntType&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),n.type=UnsignedShortType,p=a.convert(n.type)),n.format===DepthStencilFormat&&(m=34041,n.type!==UnsignedInt248Type&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),n.type=UnsignedInt248Type,p=a.convert(n.type))),r.texImage2D(3553,0,m,c.width,c.height,0,d,p,null)}
else if(n.isDataTexture)
if(x.length>0&&h)
{for(var M=0,w=x.length;M<w;M++)f=x[M],r.texImage2D(3553,M,m,f.width,f.height,0,d,p,f.data);n.generateMipmaps=!1,t.__maxMipLevel=x.length-1}
else r.texImage2D(3553,0,m,c.width,c.height,0,d,p,c.data),t.__maxMipLevel=0;else if(n.isCompressedTexture)
{for(M=0,w=x.length;M<w;M++)f=x[M],n.format!==RGBAFormat&&n.format!==RGBFormat?null!==d?r.compressedTexImage2D(3553,M,m,f.width,f.height,0,f.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):r.texImage2D(3553,M,m,f.width,f.height,0,d,p,f.data);t.__maxMipLevel=x.length-1}
else if(n.isDataTexture2DArray)r.texImage3D(35866,0,m,c.width,c.height,c.depth,0,d,p,c.data),t.__maxMipLevel=0;else if(n.isDataTexture3D)r.texImage3D(32879,0,m,c.width,c.height,c.depth,0,d,p,c.data),t.__maxMipLevel=0;else if(x.length>0&&h)
{for(M=0,w=x.length;M<w;M++)f=x[M],r.texImage2D(3553,M,m,d,p,f);n.generateMipmaps=!1,t.__maxMipLevel=x.length-1}
else r.texImage2D(3553,0,m,d,p,c),t.__maxMipLevel=0;y(n,h)&&_(o,n,c.width,c.height),t.__version=n.version,n.onUpdate&&n.onUpdate(n)}
function O(t,i,o,s)
{var l=a.convert(i.texture.format),c=a.convert(i.texture.type),h=b(i.texture.internalFormat,l,c);r.texImage2D(s,0,h,i.width,i.height,0,l,c,null),e.bindFramebuffer(36160,t),e.framebufferTexture2D(36160,o,s,n.get(i.texture).__webglTexture,0),e.bindFramebuffer(36160,null)}
function D(t,r,n)
{if(e.bindRenderbuffer(36161,t),r.depthBuffer&&!r.stencilBuffer)
{if(n)
{var i=$(r);e.renderbufferStorageMultisample(36161,i,33189,r.width,r.height)}
else e.renderbufferStorage(36161,33189,r.width,r.height);e.framebufferRenderbuffer(36160,36096,36161,t)}
else if(r.depthBuffer&&r.stencilBuffer)
{if(n)
{i=$(r);e.renderbufferStorageMultisample(36161,i,35056,r.width,r.height)}
else e.renderbufferStorage(36161,34041,r.width,r.height);e.framebufferRenderbuffer(36160,33306,36161,t)}
else{var o=a.convert(r.texture.format),s=a.convert(r.texture.type),l=b(r.texture.internalFormat,o,s);if(n)
{i=$(r);e.renderbufferStorageMultisample(36161,i,l,r.width,r.height)}
else e.renderbufferStorage(36161,l,r.width,r.height)}
e.bindRenderbuffer(36161,null)}
function B(t)
{var r=n.get(t),i=!0===t.isWebGLCubeRenderTarget;if(t.depthTexture)
{if(i)throw new Error("target.depthTexture not supported in Cube render targets");!function(t,r)
{if(r&&r.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(36160,t),!r.depthTexture||!r.depthTexture.isDepthTexture)throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");n.get(r.depthTexture).__webglTexture&&r.depthTexture.image.width===r.width&&r.depthTexture.image.height===r.height||(r.depthTexture.image.width=r.width,r.depthTexture.image.height=r.height,r.depthTexture.needsUpdate=!0),T(r.depthTexture,0);var i=n.get(r.depthTexture).__webglTexture;if(r.depthTexture.format===DepthFormat)e.framebufferTexture2D(36160,36096,3553,i,0);else{if(r.depthTexture.format!==DepthStencilFormat)throw new Error("Unknown depthTexture format");e.framebufferTexture2D(36160,33306,3553,i,0)}}(r.__webglFramebuffer,t)}
else if(i)
{r.__webglDepthbuffer=[];for(var a=0;a<6;a++)e.bindFramebuffer(36160,r.__webglFramebuffer[a]),r.__webglDepthbuffer[a]=e.createRenderbuffer(),D(r.__webglDepthbuffer[a],t)}
else e.bindFramebuffer(36160,r.__webglFramebuffer),r.__webglDepthbuffer=e.createRenderbuffer(),D(r.__webglDepthbuffer,t);e.bindFramebuffer(36160,null)}
function $(e)
{return l&&e.isWebGLMultisampleRenderTarget?Math.min(d,e.samples):0}
var N=!1,G=!1;this.allocateTextureUnit=function()
{var e=S;return e>=c&&console.warn("THREE.WebGLTextures: Trying to use "+e+" texture units while this GPU supports only "+c),S+=1,e},this.resetTextureUnits=function()
{S=0},this.setTexture2D=T,this.setTexture2DArray=function(e,t)
{var i=n.get(e);e.version>0&&i.__version!==e.version?I(i,e,t):(r.activeTexture(33984+t),r.bindTexture(35866,i.__webglTexture))},this.setTexture3D=function(e,t)
{var i=n.get(e);e.version>0&&i.__version!==e.version?I(i,e,t):(r.activeTexture(33984+t),r.bindTexture(32879,i.__webglTexture))},this.setTextureCube=E,this.setTextureCubeDynamic=A,this.setupRenderTarget=function(i)
{var s=n.get(i),c=n.get(i.texture);i.addEventListener("dispose",w),c.__webglTexture=e.createTexture(),o.memory.textures++;var h=!0===i.isWebGLCubeRenderTarget,u=!0===i.isWebGLMultisampleRenderTarget,d=!0===i.isWebGLMultiviewRenderTarget,p=v(i)||l;if(h)
{s.__webglFramebuffer=[];for(var m=0;m<6;m++)s.__webglFramebuffer[m]=e.createFramebuffer()}
else if(s.__webglFramebuffer=e.createFramebuffer(),u)
if(l)
{s.__webglMultisampledFramebuffer=e.createFramebuffer(),s.__webglColorRenderbuffer=e.createRenderbuffer(),e.bindRenderbuffer(36161,s.__webglColorRenderbuffer);var f=a.convert(i.texture.format),g=a.convert(i.texture.type),x=b(i.texture.internalFormat,f,g),M=$(i);e.renderbufferStorageMultisample(36161,M,x,i.width,i.height),e.bindFramebuffer(36160,s.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(36160,36064,36161,s.__webglColorRenderbuffer),e.bindRenderbuffer(36161,null),i.depthBuffer&&(s.__webglDepthRenderbuffer=e.createRenderbuffer(),D(s.__webglDepthRenderbuffer,i,!0)),e.bindFramebuffer(36160,null)}
else console.warn("THREE.WebGLRenderer: WebGLMultisampleRenderTarget can only be used with WebGL2.");else if(d)
{var S=i.width,T=i.height,E=i.numViews;e.bindFramebuffer(36160,s.__webglFramebuffer);var A=t.get("OVR_multiview2");o.memory.textures+=2;var L=e.createTexture();e.bindTexture(35866,L),e.texParameteri(35866,10240,9728),e.texParameteri(35866,10241,9728),e.texImage3D(35866,0,32856,S,T,E,0,6408,5121,null),A.framebufferTextureMultiviewOVR(36160,36064,L,0,0,E);var C=e.createTexture();e.bindTexture(35866,C),e.texParameteri(35866,10240,9728),e.texParameteri(35866,10241,9728),e.texImage3D(35866,0,35056,S,T,E,0,34041,34042,null),A.framebufferTextureMultiviewOVR(36160,33306,C,0,0,E);var P=new Array(E);for(m=0;m<E;++m)P[m]=e.createFramebuffer(),e.bindFramebuffer(36160,P[m]),e.framebufferTextureLayer(36160,36064,L,0,m);s.__webglColorTexture=L,s.__webglDepthStencilTexture=C,s.__webglViewFramebuffers=P,e.bindFramebuffer(36160,null),e.bindTexture(35866,null)}
if(h)
{for(r.bindTexture(34067,c.__webglTexture),R(34067,i.texture,p),m=0;m<6;m++)O(s.__webglFramebuffer[m],i,36064,34069+m);y(i.texture,p)&&_(34067,i.texture,i.width,i.height),r.bindTexture(34067,null)}
else d||(r.bindTexture(3553,c.__webglTexture),R(3553,i.texture,p),O(s.__webglFramebuffer,i,36064,3553),y(i.texture,p)&&_(3553,i.texture,i.width,i.height),r.bindTexture(3553,null));i.depthBuffer&&B(i)},this.updateRenderTargetMipmap=function(e)
{var t=e.texture;if(y(t,v(e)||l))
{var i=e.isWebGLCubeRenderTarget?34067:3553,a=n.get(t).__webglTexture;r.bindTexture(i,a),_(i,t,e.width,e.height),r.bindTexture(i,null)}},this.updateMultisampleRenderTarget=function(t)
{if(t.isWebGLMultisampleRenderTarget)
if(l)
{var r=n.get(t);e.bindFramebuffer(36008,r.__webglMultisampledFramebuffer),e.bindFramebuffer(36009,r.__webglFramebuffer);var i=t.width,a=t.height,o=16384;t.depthBuffer&&(o|=256),t.stencilBuffer&&(o|=1024),e.blitFramebuffer(0,0,i,a,0,0,i,a,o,9728)}
else console.warn("THREE.WebGLRenderer: WebGLMultisampleRenderTarget can only be used with WebGL2.")},this.safeSetTexture2D=function(e,t)
{e&&e.isWebGLRenderTarget&&(!1===N&&(console.warn("THREE.WebGLTextures.safeSetTexture2D: don't use render targets as textures. Use their .texture property instead."),N=!0),e=e.texture),T(e,t)},this.safeSetTextureCube=function(e,t)
{e&&e.isWebGLCubeRenderTarget&&(!1===G&&(console.warn("THREE.WebGLTextures.safeSetTextureCube: don't use cube render targets as textures. Use their .texture property instead."),G=!0),e=e.texture),e&&e.isCubeTexture||Array.isArray(e.image)&&6===e.image.length?E(e,t):A(e,t)}}
function WebGLUtils(e,t,r)
{var n=r.isWebGL2;return{convert:function(e)
{var r;if(e===UnsignedByteType)return 5121;if(e===UnsignedShort4444Type)return 32819;if(e===UnsignedShort5551Type)return 32820;if(e===UnsignedShort565Type)return 33635;if(e===ByteType)return 5120;if(e===ShortType)return 5122;if(e===UnsignedShortType)return 5123;if(e===IntType)return 5124;if(e===UnsignedIntType)return 5125;if(e===FloatType)return 5126;if(e===HalfFloatType)return n?5131:null!==(r=t.get("OES_texture_half_float"))?r.HALF_FLOAT_OES:null;if(e===AlphaFormat)return 6406;if(e===RGBFormat)return 6407;if(e===RGBAFormat)return 6408;if(e===LuminanceFormat)return 6409;if(e===LuminanceAlphaFormat)return 6410;if(e===DepthFormat)return 6402;if(e===DepthStencilFormat)return 34041;if(e===RedFormat)return 6403;if(e===RedIntegerFormat)return 36244;if(e===RGFormat)return 33319;if(e===RGIntegerFormat)return 33320;if(e===RGBIntegerFormat)return 36248;if(e===RGBAIntegerFormat)return 36249;if(e===RGB_S3TC_DXT1_Format||e===RGBA_S3TC_DXT1_Format||e===RGBA_S3TC_DXT3_Format||e===RGBA_S3TC_DXT5_Format)
{if(null===(r=t.get("WEBGL_compressed_texture_s3tc")))return null;if(e===RGB_S3TC_DXT1_Format)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(e===RGBA_S3TC_DXT1_Format)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(e===RGBA_S3TC_DXT3_Format)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(e===RGBA_S3TC_DXT5_Format)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}
if(e===RGB_PVRTC_4BPPV1_Format||e===RGB_PVRTC_2BPPV1_Format||e===RGBA_PVRTC_4BPPV1_Format||e===RGBA_PVRTC_2BPPV1_Format)
{if(null===(r=t.get("WEBGL_compressed_texture_pvrtc")))return null;if(e===RGB_PVRTC_4BPPV1_Format)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(e===RGB_PVRTC_2BPPV1_Format)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(e===RGBA_PVRTC_4BPPV1_Format)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(e===RGBA_PVRTC_2BPPV1_Format)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}
return e===RGB_ETC1_Format?null!==(r=t.get("WEBGL_compressed_texture_etc1"))?r.COMPRESSED_RGB_ETC1_WEBGL:null:e===RGBA_ASTC_4x4_Format||e===RGBA_ASTC_5x4_Format||e===RGBA_ASTC_5x5_Format||e===RGBA_ASTC_6x5_Format||e===RGBA_ASTC_6x6_Format||e===RGBA_ASTC_8x5_Format||e===RGBA_ASTC_8x6_Format||e===RGBA_ASTC_8x8_Format||e===RGBA_ASTC_10x5_Format||e===RGBA_ASTC_10x6_Format||e===RGBA_ASTC_10x8_Format||e===RGBA_ASTC_10x10_Format||e===RGBA_ASTC_12x10_Format||e===RGBA_ASTC_12x12_Format?null!==(r=t.get("WEBGL_compressed_texture_astc"))?e:null:e===UnsignedInt248Type?n?34042:null!==(r=t.get("WEBGL_depth_texture"))?r.UNSIGNED_INT_24_8_WEBGL:null:void 0}}}
function WebGLMultiviewRenderTarget(e,t,r,n)
{WebGLRenderTarget.call(this,e,t,n),this.depthBuffer=!1,this.stencilBuffer=!1,this.numViews=r}
function WebGLMultiview(e,t)
{var r,n,i,a,o,s,l,c=2,h=e.extensions,u=e.properties,d=0;function p(e)
{return e.isArrayCamera?e.cameras:(o[0]=e,o)}
this.isAvailable=function()
{if(void 0===l)
{var e=h.get("OVR_multiview2");if(l=null!==e&&!1===t.getContextAttributes().antialias)
{d=t.getParameter(e.MAX_VIEWS_OVR),r=new WebGLMultiviewRenderTarget(0,0,c),s=new Vector2,a=[],i=[],o=[];for(var n=0;n<d;n++)a[n]=new Matrix4,i[n]=new Matrix3}}
return l},this.attachCamera=function(t)
{!1!==function(e)
{if(void 0===e.isArrayCamera)return!0;var t=e.cameras;if(t.length>d)return!1;for(var r=1,n=t.length;r<n;r++)
if(t[0].viewport.z!==t[r].viewport.z||t[0].viewport.w!==t[r].viewport.w)return!1;return!0}(t)&&(n=e.getRenderTarget(),function(t)
{if(n?s.set(n.width,n.height):e.getDrawingBufferSize(s),t.isArrayCamera)
{var i=t.cameras[0].viewport;r.setSize(i.z,i.w),r.setNumViews(t.cameras.length)}
else r.setSize(s.x,s.y),r.setNumViews(c)}(t),e.setRenderTarget(r))},this.detachCamera=function(i)
{r===e.getRenderTarget()&&(e.setRenderTarget(n),function(e)
{var n=r,i=n.numViews,a=u.get(n).__webglViewFramebuffers,o=n.width,l=n.height;if(e.isArrayCamera)
for(var c=0;c<i;c++)
{var h=e.cameras[c].viewport,d=h.x,p=h.y,m=d+h.z,f=p+h.w;t.bindFramebuffer(36008,a[c]),t.blitFramebuffer(0,0,o,l,d,p,m,f,16384,9728)}
else t.bindFramebuffer(36008,a[0]),t.blitFramebuffer(0,0,o,l,0,0,s.x,s.y,16384,9728)}(i))},this.updateCameraProjectionMatricesUniform=function(e,r)
{for(var n=p(e),i=0;i<n.length;i++)a[i].copy(n[i].projectionMatrix);r.setValue(t,"projectionMatrices",a)},this.updateCameraViewMatricesUniform=function(e,r)
{for(var n=p(e),i=0;i<n.length;i++)a[i].copy(n[i].matrixWorldInverse);r.setValue(t,"viewMatrices",a)},this.updateObjectMatricesUniforms=function(e,r,n)
{for(var o=p(r),s=0;s<o.length;s++)a[s].multiplyMatrices(o[s].matrixWorldInverse,e.matrixWorld),i[s].getNormalMatrix(a[s]);n.setValue(t,"modelViewMatrices",a),n.setValue(t,"normalMatrices",i)}}
function ArrayCamera(e)
{PerspectiveCamera.call(this),this.cameras=e||[]}
function Group()
{Object3D.call(this),this.type="Group"}
function WebXRManager(e,t)
{var r=this,n=null,i=null,a="local-floor",o=null,s=[],l=new Map,c=new PerspectiveCamera;c.layers.enable(1),c.viewport=new Vector4;var h=new PerspectiveCamera;h.layers.enable(2),h.viewport=new Vector4;var u=new ArrayCamera([c,h]);u.layers.enable(1),u.layers.enable(2);var d=null,p=null;function m(e)
{var t=l.get(e.inputSource);t&&(t.targetRay&&t.targetRay.dispatchEvent({type:e.type}),t.grip&&t.grip.dispatchEvent({type:e.type}))}
function f()
{l.forEach(function(e,t)
{e.targetRay&&(e.targetRay.dispatchEvent({type:"disconnected",data:t}),e.targetRay.visible=!1),e.grip&&(e.grip.dispatchEvent({type:"disconnected",data:t}),e.grip.visible=!1)}),l.clear(),e.setFramebuffer(null),e.setRenderTarget(e.getRenderTarget()),M.stop(),r.isPresenting=!1,r.dispatchEvent({type:"sessionend"})}
function g(e)
{i=e,M.setContext(n),M.start(),r.isPresenting=!0,r.dispatchEvent({type:"sessionstart"})}
function v(e)
{for(var t=n.inputSources,r=0;r<s.length;r++)l.set(t[r],s[r]);for(r=0;r<e.removed.length;r++)
{var i=e.removed[r];(a=l.get(i))&&(a.targetRay&&a.targetRay.dispatchEvent({type:"disconnected",data:i}),a.grip&&a.grip.dispatchEvent({type:"disconnected",data:i}),l.delete(i))}
for(r=0;r<e.added.length;r++)
{var a;i=e.added[r];(a=l.get(i))&&(a.targetRay&&a.targetRay.dispatchEvent({type:"connected",data:i}),a.grip&&a.grip.dispatchEvent({type:"connected",data:i}))}}
this.enabled=!1,this.isPresenting=!1,this.getController=function(e)
{var t=s[e];return void 0===t&&(t={},s[e]=t),void 0===t.targetRay&&(t.targetRay=new Group,t.targetRay.matrixAutoUpdate=!1,t.targetRay.visible=!1),t.targetRay},this.getControllerGrip=function(e)
{var t=s[e];return void 0===t&&(t={},s[e]=t),void 0===t.grip&&(t.grip=new Group,t.grip.matrixAutoUpdate=!1,t.grip.visible=!1),t.grip},this.setFramebufferScaleFactor=function(){},this.setReferenceSpaceType=function(e)
{a=e},this.getReferenceSpace=function()
{return i},this.getSession=function()
{return n},this.setSession=function(e)
{if(null!==(n=e))
{n.addEventListener("select",m),n.addEventListener("selectstart",m),n.addEventListener("selectend",m),n.addEventListener("squeeze",m),n.addEventListener("squeezestart",m),n.addEventListener("squeezeend",m),n.addEventListener("end",f);var r=t.getContextAttributes(),i={antialias:r.antialias,alpha:r.alpha,depth:r.depth,stencil:r.stencil},o=new XRWebGLLayer(n,t,i);n.updateRenderState({baseLayer:o}),n.requestReferenceSpace(a).then(g),n.addEventListener("inputsourceschange",v)}};var y=new Vector3,_=new Vector3;function b(e,t)
{null===t?e.matrixWorld.copy(e.matrix):e.matrixWorld.multiplyMatrices(t.matrixWorld,e.matrix),e.matrixWorldInverse.getInverse(e.matrixWorld)}
this.getCamera=function(e)
{u.near=h.near=c.near=e.near,u.far=h.far=c.far=e.far,d===u.near&&p===u.far||(n.updateRenderState({depthNear:u.near,depthFar:u.far}),d=u.near,p=u.far);var t=e.parent,r=u.cameras;b(u,t);for(var i=0;i<r.length;i++)b(r[i],t);e.matrixWorld.copy(u.matrixWorld);for(var a=e.children,o=(i=0,a.length);i<o;i++)a[i].updateMatrixWorld(!0);return function(e,t,r)
{y.setFromMatrixPosition(t.matrixWorld),_.setFromMatrixPosition(r.matrixWorld);var n=y.distanceTo(_),i=t.projectionMatrix.elements,a=r.projectionMatrix.elements,o=i[14]/(i[10]-1),s=i[14]/(i[10]+1),l=(i[9]+1)/i[5],c=(i[9]-1)/i[5],h=(i[8]-1)/i[0],u=(a[8]+1)/a[0],d=o*h,p=o*u,m=n/(-h+u),f=m*-h;t.matrixWorld.decompose(e.position,e.quaternion,e.scale),e.translateX(f),e.translateZ(m),e.matrixWorld.compose(e.position,e.quaternion,e.scale),e.matrixWorldInverse.getInverse(e.matrixWorld);var g=o+m,v=s+m,b=d-f,x=p+(n-f),M=l*s/v*g,w=c*s/v*g;e.projectionMatrix.makePerspective(b,x,M,w,g,v)}(u,c,h),u};var x=null;var M=new WebGLAnimation;M.setAnimationLoop(function(t,r)
{if(null!==(o=r.getViewerPose(i)))
{var a=o.views,l=n.renderState.baseLayer;e.setFramebuffer(l.framebuffer);for(var c=0;c<a.length;c++)
{var h=a[c],d=l.getViewport(h),p=u.cameras[c];p.matrix.fromArray(h.transform.matrix),p.projectionMatrix.fromArray(h.projectionMatrix),p.viewport.set(d.x,d.y,d.width,d.height),0===c&&u.matrix.copy(p.matrix)}}
var m=n.inputSources;for(c=0;c<s.length;c++)
{var f=s[c],g=m[c],v=null,y=null;g&&(f.targetRay&&null!==(v=r.getPose(g.targetRaySpace,i))&&(f.targetRay.matrix.fromArray(v.transform.matrix),f.targetRay.matrix.decompose(f.targetRay.position,f.targetRay.rotation,f.targetRay.scale)),f.grip&&g.gripSpace&&null!==(y=r.getPose(g.gripSpace,i))&&(f.grip.matrix.fromArray(y.transform.matrix),f.grip.matrix.decompose(f.grip.position,f.grip.rotation,f.grip.scale))),f.targetRay&&(f.targetRay.visible=null!==v),f.grip&&(f.grip.visible=null!==y)}
x&&x(t,r)}),this.setAnimationLoop=function(e)
{x=e},this.dispose=function(){}}
function WebGLRenderer(e)
{var t=void 0!==(e=e||{}).canvas?e.canvas:document.createElementNS("http://www.w3.org/1999/xhtml","canvas"),r=void 0!==e.context?e.context:null,n=void 0!==e.alpha&&e.alpha,i=void 0===e.depth||e.depth,a=void 0===e.stencil||e.stencil,o=void 0!==e.antialias&&e.antialias,s=void 0===e.premultipliedAlpha||e.premultipliedAlpha,l=void 0!==e.preserveDrawingBuffer&&e.preserveDrawingBuffer,c=void 0!==e.powerPreference?e.powerPreference:"default",h=void 0!==e.failIfMajorPerformanceCaveat&&e.failIfMajorPerformanceCaveat,u=null,d=null;this.domElement=t,this.debug={checkShaderErrors:!0},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.gammaFactor=2,this.outputEncoding=LinearEncoding,this.physicallyCorrectLights=!1,this.toneMapping=LinearToneMapping,this.toneMappingExposure=1,this.toneMappingWhitePoint=1,this.maxMorphTargets=8,this.maxMorphNormals=4;var p,m,f,g,v,y,_,b,x,M,w,S,T,E,A,L,C,R,P=this,I=!1,O=null,D=0,B=0,$=null,N=null,G=-1,F={geometry:null,program:null,wireframe:!1},U=null,V=null,k=new Vector4,z=new Vector4,H=null,j=t.width,W=t.height,q=1,X=null,Y=null,Z=new Vector4(0,0,j,W),K=new Vector4(0,0,j,W),J=!1,Q=new Frustum,ee=new WebGLClipping,te=!1,re=!1,ne=new Matrix4,ie=new Vector3;function ae()
{return null===$?q:1}
try
{var oe={alpha:n,depth:i,stencil:a,antialias:o,premultipliedAlpha:s,preserveDrawingBuffer:l,powerPreference:c,failIfMajorPerformanceCaveat:h,xrCompatible:!0};if(t.addEventListener("webglcontextlost",ue,!1),t.addEventListener("webglcontextrestored",de,!1),null===(p=r||t.getContext("webgl",oe)||t.getContext("experimental-webgl",oe)))throw null!==t.getContext("webgl")?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.");void 0===p.getShaderPrecisionFormat&&(p.getShaderPrecisionFormat=function()
{return{rangeMin:1,rangeMax:1,precision:1}})}
catch(e)
{throw console.error("THREE.WebGLRenderer: "+e.message),e}
function se()
{m=new WebGLExtensions(p),!1===(f=new WebGLCapabilities(p,m,e)).isWebGL2&&(m.get("WEBGL_depth_texture"),m.get("OES_texture_float"),m.get("OES_texture_half_float"),m.get("OES_texture_half_float_linear"),m.get("OES_standard_derivatives"),m.get("OES_element_index_uint"),m.get("ANGLE_instanced_arrays")),m.get("OES_texture_float_linear"),R=new WebGLUtils(p,m,f),(g=new WebGLState(p,m,f)).scissor(z.copy(K).multiplyScalar(q).floor()),g.viewport(k.copy(Z).multiplyScalar(q).floor()),v=new WebGLInfo(p),y=new WebGLProperties,_=new WebGLTextures(p,m,g,y,f,R,v),b=new WebGLAttributes(p,f),x=new WebGLGeometries(p,b,v),M=new WebGLObjects(p,x,b,v),A=new WebGLMorphtargets(p),w=new WebGLPrograms(P,m,f),S=new WebGLRenderLists,T=new WebGLRenderStates,E=new WebGLBackground(P,g,M,s),L=new WebGLBufferRenderer(p,m,v,f),C=new WebGLIndexedBufferRenderer(p,m,v,f),v.programs=w.programs,P.capabilities=f,P.extensions=m,P.properties=y,P.renderLists=S,P.state=g,P.info=v}
se();var le=new WebXRManager(P,p);this.xr=le;var ce=new WebGLMultiview(P,p),he=new WebGLShadowMap(P,M,f.maxTextureSize);function ue(e)
{e.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),I=!0}
function de()
{console.log("THREE.WebGLRenderer: Context Restored."),I=!1,se()}
function pe(e)
{var t=e.target;t.removeEventListener("dispose",pe),function(e)
{me(e),y.remove(e)}(t)}
function me(e)
{var t=y.get(e).program;e.program=void 0,void 0!==t&&w.releaseProgram(t)}
this.shadowMap=he,this.getContext=function()
{return p},this.getContextAttributes=function()
{return p.getContextAttributes()},this.forceContextLoss=function()
{var e=m.get("WEBGL_lose_context");e&&e.loseContext()},this.forceContextRestore=function()
{var e=m.get("WEBGL_lose_context");e&&e.restoreContext()},this.getPixelRatio=function()
{return q},this.setPixelRatio=function(e)
{void 0!==e&&(q=e,this.setSize(j,W,!1))},this.getSize=function(e)
{return void 0===e&&(console.warn("WebGLRenderer: .getsize() now requires a Vector2 as an argument"),e=new Vector2),e.set(j,W)},this.setSize=function(e,r,n)
{le.isPresenting?console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting."):(j=e,W=r,t.width=Math.floor(e*q),t.height=Math.floor(r*q),!1!==n&&(t.style.width=e+"px",t.style.height=r+"px"),this.setViewport(0,0,e,r))},this.getDrawingBufferSize=function(e)
{return void 0===e&&(console.warn("WebGLRenderer: .getdrawingBufferSize() now requires a Vector2 as an argument"),e=new Vector2),e.set(j*q,W*q).floor()},this.setDrawingBufferSize=function(e,r,n)
{j=e,W=r,q=n,t.width=Math.floor(e*n),t.height=Math.floor(r*n),this.setViewport(0,0,e,r)},this.getCurrentViewport=function(e)
{return void 0===e&&(console.warn("WebGLRenderer: .getCurrentViewport() now requires a Vector4 as an argument"),e=new Vector4),e.copy(k)},this.getViewport=function(e)
{return e.copy(Z)},this.setViewport=function(e,t,r,n)
{e.isVector4?Z.set(e.x,e.y,e.z,e.w):Z.set(e,t,r,n),g.viewport(k.copy(Z).multiplyScalar(q).floor())},this.getScissor=function(e)
{return e.copy(K)},this.setScissor=function(e,t,r,n)
{e.isVector4?K.set(e.x,e.y,e.z,e.w):K.set(e,t,r,n),g.scissor(z.copy(K).multiplyScalar(q).floor())},this.getScissorTest=function()
{return J},this.setScissorTest=function(e)
{g.setScissorTest(J=e)},this.setOpaqueSort=function(e)
{X=e},this.setTransparentSort=function(e)
{Y=e},this.getClearColor=function()
{return E.getClearColor()},this.setClearColor=function()
{E.setClearColor.apply(E,arguments)},this.getClearAlpha=function()
{return E.getClearAlpha()},this.setClearAlpha=function()
{E.setClearAlpha.apply(E,arguments)},this.clear=function(e,t,r)
{var n=0;(void 0===e||e)&&(n|=16384),(void 0===t||t)&&(n|=256),(void 0===r||r)&&(n|=1024),p.clear(n)},this.clearColor=function()
{this.clear(!0,!1,!1)},this.clearDepth=function()
{this.clear(!1,!0,!1)},this.clearStencil=function()
{this.clear(!1,!1,!0)},this.dispose=function()
{t.removeEventListener("webglcontextlost",ue,!1),t.removeEventListener("webglcontextrestored",de,!1),S.dispose(),T.dispose(),y.dispose(),M.dispose(),le.dispose(),ve.stop()},this.renderBufferImmediate=function(e,t)
{g.initAttributes();var r=y.get(e);e.hasPositions&&!r.position&&(r.position=p.createBuffer()),e.hasNormals&&!r.normal&&(r.normal=p.createBuffer()),e.hasUvs&&!r.uv&&(r.uv=p.createBuffer()),e.hasColors&&!r.color&&(r.color=p.createBuffer());var n=t.getAttributes();e.hasPositions&&(p.bindBuffer(34962,r.position),p.bufferData(34962,e.positionArray,35048),g.enableAttribute(n.position),p.vertexAttribPointer(n.position,3,5126,!1,0,0)),e.hasNormals&&(p.bindBuffer(34962,r.normal),p.bufferData(34962,e.normalArray,35048),g.enableAttribute(n.normal),p.vertexAttribPointer(n.normal,3,5126,!1,0,0)),e.hasUvs&&(p.bindBuffer(34962,r.uv),p.bufferData(34962,e.uvArray,35048),g.enableAttribute(n.uv),p.vertexAttribPointer(n.uv,2,5126,!1,0,0)),e.hasColors&&(p.bindBuffer(34962,r.color),p.bufferData(34962,e.colorArray,35048),g.enableAttribute(n.color),p.vertexAttribPointer(n.color,3,5126,!1,0,0)),g.disableUnusedAttributes(),p.drawArrays(4,0,e.count),e.count=0};var fe=new Scene;this.renderBufferDirect=function(e,t,r,n,i,a)
{null===t&&(t=fe);var o=i.isMesh&&i.matrixWorld.determinant()<0,s=xe(e,t,n,i);g.setMaterial(n,o);var l=!1;F.geometry===r.id&&F.program===s.id&&F.wireframe===(!0===n.wireframe)||(F.geometry=r.id,F.program=s.id,F.wireframe=!0===n.wireframe,l=!0),(n.morphTargets||n.morphNormals)&&(A.update(i,r,n,s),l=!0);var c=r.index,h=r.attributes.position;if(null===c)
{if(void 0===h||0===h.count)return}
else if(0===c.count)return;var u,d=1;!0===n.wireframe&&(c=x.getWireframeAttribute(r),d=2);var v=L;null!==c&&(u=b.get(c),(v=C).setIndex(u)),l&&(!function(e,t,r,n)
{if(!1===f.isWebGL2&&(e.isInstancedMesh||t.isInstancedBufferGeometry)&&null===m.get("ANGLE_instanced_arrays"))return;g.initAttributes();var i=t.attributes,a=n.getAttributes(),o=r.defaultAttributeValues;for(var s in a)
{var l=a[s];if(l>=0)
{var c=i[s];if(void 0!==c)
{var h=c.normalized,u=c.itemSize,d=b.get(c);if(void 0===d)continue;var v=d.buffer,y=d.type,_=d.bytesPerElement;if(c.isInterleavedBufferAttribute)
{var x=c.data,M=x.stride,w=c.offset;x&&x.isInstancedInterleavedBuffer?(g.enableAttributeAndDivisor(l,x.meshPerAttribute),void 0===t.maxInstancedCount&&(t.maxInstancedCount=x.meshPerAttribute*x.count)):g.enableAttribute(l),p.bindBuffer(34962,v),p.vertexAttribPointer(l,u,y,h,M*_,w*_)}
else c.isInstancedBufferAttribute?(g.enableAttributeAndDivisor(l,c.meshPerAttribute),void 0===t.maxInstancedCount&&(t.maxInstancedCount=c.meshPerAttribute*c.count)):g.enableAttribute(l),p.bindBuffer(34962,v),p.vertexAttribPointer(l,u,y,h,0,0)}
else if("instanceMatrix"===s)
{var d=b.get(e.instanceMatrix);if(void 0===d)continue;var v=d.buffer,y=d.type;g.enableAttributeAndDivisor(l+0,1),g.enableAttributeAndDivisor(l+1,1),g.enableAttributeAndDivisor(l+2,1),g.enableAttributeAndDivisor(l+3,1),p.bindBuffer(34962,v),p.vertexAttribPointer(l+0,4,y,!1,64,0),p.vertexAttribPointer(l+1,4,y,!1,64,16),p.vertexAttribPointer(l+2,4,y,!1,64,32),p.vertexAttribPointer(l+3,4,y,!1,64,48)}
else if(void 0!==o)
{var S=o[s];if(void 0!==S)switch(S.length)
{case 2:p.vertexAttrib2fv(l,S);break;case 3:p.vertexAttrib3fv(l,S);break;case 4:p.vertexAttrib4fv(l,S);break;default:p.vertexAttrib1fv(l,S)}}}}
g.disableUnusedAttributes()}(i,r,n,s),null!==c&&p.bindBuffer(34963,u.buffer));var y=null!==c?c.count:h.count,_=r.drawRange.start*d,M=r.drawRange.count*d,w=null!==a?a.start*d:0,S=null!==a?a.count*d:1/0,T=Math.max(_,w),E=Math.min(y,_+M,w+S)-1,R=Math.max(0,E-T+1);if(0!==R)
{if(i.isMesh)!0===n.wireframe?(g.setLineWidth(n.wireframeLinewidth*ae()),v.setMode(1)):v.setMode(4);else if(i.isLine)
{var P=n.linewidth;void 0===P&&(P=1),g.setLineWidth(P*ae()),i.isLineSegments?v.setMode(1):i.isLineLoop?v.setMode(2):v.setMode(3)}
else i.isPoints?v.setMode(0):i.isSprite&&v.setMode(4);i.isInstancedMesh?v.renderInstances(r,T,R,i.count):r.isInstancedBufferGeometry?v.renderInstances(r,T,R,r.maxInstancedCount):v.render(T,R)}},this.compile=function(e,t)
{(d=T.get(e,t)).init(),e.traverse(function(e)
{e.isLight&&(d.pushLight(e),e.castShadow&&d.pushShadow(e))}),d.setupLights(t);var r={};e.traverse(function(t)
{if(t.material)
if(Array.isArray(t.material))
for(var n=0;n<t.material.length;n++)t.material[n].uuid in r==!1&&(be(t.material[n],e,t),r[t.material[n].uuid]=!0);else t.material.uuid in r==!1&&(be(t.material,e,t),r[t.material.uuid]=!0)})};var ge=null;var ve=new WebGLAnimation;function ye(e,t,r,n)
{for(var i=0,a=e.length;i<a;i++)
{var o=e[i],s=o.object,l=o.geometry,c=void 0===n?o.material:n,h=o.group;if(r.isArrayCamera)
if(V=r,le.enabled&&ce.isAvailable())_e(s,t,r,l,c,h);else for(var u=r.cameras,p=0,m=u.length;p<m;p++)
{var f=u[p];s.layers.test(f.layers)&&(g.viewport(k.copy(f.viewport)),d.setupLights(f),_e(s,t,f,l,c,h))}
else V=null,_e(s,t,r,l,c,h)}}
function _e(e,t,r,n,i,a)
{if(e.onBeforeRender(P,t,r,n,i,a),d=T.get(t,V||r),e.modelViewMatrix.multiplyMatrices(r.matrixWorldInverse,e.matrixWorld),e.normalMatrix.getNormalMatrix(e.modelViewMatrix),e.isImmediateRenderObject)
{var o=xe(r,t,i,e);g.setMaterial(i),F.geometry=null,F.program=null,F.wireframe=!1,function(e,t)
{e.render(function(e)
{P.renderBufferImmediate(e,t)})}(e,o)}
else P.renderBufferDirect(r,t,n,i,e,a);e.onAfterRender(P,t,r,n,i,a),d=T.get(t,V||r)}
function be(e,t,r)
{var n=y.get(e),i=d.state.lights,a=d.state.shadowsArray,o=i.state.version,s=w.getParameters(e,i.state,a,t,ee.numPlanes,ee.numIntersection,r),l=w.getProgramCacheKey(s),c=n.program,h=!0;if(void 0===c)e.addEventListener("dispose",pe);else if(c.cacheKey!==l)me(e);else if(n.lightsStateVersion!==o)n.lightsStateVersion=o,h=!1;else{if(void 0!==s.shaderID)return;h=!1}
h&&(c=w.acquireProgram(s,l),n.program=c,n.uniforms=s.uniforms,n.environment=e.isMeshStandardMaterial?t.environment:null,n.outputEncoding=P.outputEncoding,e.program=c);var u=c.getAttributes();if(e.morphTargets)
{e.numSupportedMorphTargets=0;for(var p=0;p<P.maxMorphTargets;p++)u["morphTarget"+p]>=0&&e.numSupportedMorphTargets++}
if(e.morphNormals)
{e.numSupportedMorphNormals=0;for(p=0;p<P.maxMorphNormals;p++)u["morphNormal"+p]>=0&&e.numSupportedMorphNormals++}
var m=n.uniforms;(e.isShaderMaterial||e.isRawShaderMaterial)&&!0!==e.clipping||(n.numClippingPlanes=ee.numPlanes,n.numIntersection=ee.numIntersection,m.clippingPlanes=ee.uniform),n.fog=t.fog,n.needsLights=function(e)
{return e.isMeshLambertMaterial||e.isMeshToonMaterial||e.isMeshPhongMaterial||e.isMeshStandardMaterial||e.isShadowMaterial||e.isShaderMaterial&&!0===e.lights}(e),n.lightsStateVersion=o,n.needsLights&&(m.ambientLightColor.value=i.state.ambient,m.lightProbe.value=i.state.probe,m.directionalLights.value=i.state.directional,m.spotLights.value=i.state.spot,m.rectAreaLights.value=i.state.rectArea,m.pointLights.value=i.state.point,m.hemisphereLights.value=i.state.hemi,m.directionalShadowMap.value=i.state.directionalShadowMap,m.directionalShadowMatrix.value=i.state.directionalShadowMatrix,m.spotShadowMap.value=i.state.spotShadowMap,m.spotShadowMatrix.value=i.state.spotShadowMatrix,m.pointShadowMap.value=i.state.pointShadowMap,m.pointShadowMatrix.value=i.state.pointShadowMatrix);var f=n.program.getUniforms(),g=WebGLUniforms.seqWithValue(f.seq,m);n.uniformsList=g}
function xe(e,t,r,n)
{_.resetTextureUnits();var i=t.fog,a=r.isMeshStandardMaterial?t.environment:null,o=y.get(r),s=d.state.lights;if(te&&(re||e!==U))
{var l=e===U&&r.id===G;ee.setState(r.clippingPlanes,r.clipIntersection,r.clipShadows,e,o,l)}
r.version===o.__version?void 0===o.program?be(r,t,n):r.fog&&o.fog!==i?be(r,t,n):o.environment!==a?be(r,t,n):o.needsLights&&o.lightsStateVersion!==s.state.version?be(r,t,n):void 0===o.numClippingPlanes||o.numClippingPlanes===ee.numPlanes&&o.numIntersection===ee.numIntersection?o.outputEncoding!==P.outputEncoding&&be(r,t,n):be(r,t,n):(be(r,t,n),o.__version=r.version);var c,h,u=!1,m=!1,v=!1,b=o.program,x=b.getUniforms(),M=o.uniforms;if(g.useProgram(b.program)&&(u=!0,m=!0,v=!0),r.id!==G&&(G=r.id,m=!0),u||U!==e)
{if(b.numMultiviewViews>0?ce.updateCameraProjectionMatricesUniform(e,x):x.setValue(p,"projectionMatrix",e.projectionMatrix),f.logarithmicDepthBuffer&&x.setValue(p,"logDepthBufFC",2/(Math.log(e.far+1)/Math.LN2)),U!==e&&(U=e,m=!0,v=!0),r.isShaderMaterial||r.isMeshPhongMaterial||r.isMeshToonMaterial||r.isMeshStandardMaterial||r.envMap)
{var w=x.map.cameraPosition;void 0!==w&&w.setValue(p,ie.setFromMatrixPosition(e.matrixWorld))}(r.isMeshPhongMaterial||r.isMeshToonMaterial||r.isMeshLambertMaterial||r.isMeshBasicMaterial||r.isMeshStandardMaterial||r.isShaderMaterial)&&x.setValue(p,"isOrthographic",!0===e.isOrthographicCamera),(r.isMeshPhongMaterial||r.isMeshToonMaterial||r.isMeshLambertMaterial||r.isMeshBasicMaterial||r.isMeshStandardMaterial||r.isShaderMaterial||r.skinning)&&(b.numMultiviewViews>0?ce.updateCameraViewMatricesUniform(e,x):x.setValue(p,"viewMatrix",e.matrixWorldInverse))}
if(r.skinning)
{x.setOptional(p,n,"bindMatrix"),x.setOptional(p,n,"bindMatrixInverse");var S=n.skeleton;if(S)
{var T=S.bones;if(f.floatVertexTextures)
{if(void 0===S.boneTexture)
{var E=Math.sqrt(4*T.length);E=MathUtils.ceilPowerOfTwo(E),E=Math.max(E,4);var A=new Float32Array(E*E*4);A.set(S.boneMatrices);var L=new DataTexture(A,E,E,RGBAFormat,FloatType);S.boneMatrices=A,S.boneTexture=L,S.boneTextureSize=E}
x.setValue(p,"boneTexture",S.boneTexture,_),x.setValue(p,"boneTextureSize",S.boneTextureSize)}
else x.setOptional(p,S,"boneMatrices")}}
return(m||o.receiveShadow!==n.receiveShadow)&&(o.receiveShadow=n.receiveShadow,x.setValue(p,"receiveShadow",n.receiveShadow)),m&&(x.setValue(p,"toneMappingExposure",P.toneMappingExposure),x.setValue(p,"toneMappingWhitePoint",P.toneMappingWhitePoint),o.needsLights&&(h=v,(c=M).ambientLightColor.needsUpdate=h,c.lightProbe.needsUpdate=h,c.directionalLights.needsUpdate=h,c.pointLights.needsUpdate=h,c.spotLights.needsUpdate=h,c.rectAreaLights.needsUpdate=h,c.hemisphereLights.needsUpdate=h),i&&r.fog&&function(e,t)
{e.fogColor.value.copy(t.color),t.isFog?(e.fogNear.value=t.near,e.fogFar.value=t.far):t.isFogExp2&&(e.fogDensity.value=t.density)}(M,i),r.isMeshBasicMaterial?Me(M,r):r.isMeshLambertMaterial?(Me(M,r),function(e,t)
{t.emissiveMap&&(e.emissiveMap.value=t.emissiveMap)}(M,r)):r.isMeshToonMaterial?(Me(M,r),function(e,t)
{e.specular.value.copy(t.specular),e.shininess.value=Math.max(t.shininess,1e-4),t.gradientMap&&(e.gradientMap.value=t.gradientMap);t.emissiveMap&&(e.emissiveMap.value=t.emissiveMap);t.bumpMap&&(e.bumpMap.value=t.bumpMap,e.bumpScale.value=t.bumpScale,t.side===BackSide&&(e.bumpScale.value*=-1));t.normalMap&&(e.normalMap.value=t.normalMap,e.normalScale.value.copy(t.normalScale),t.side===BackSide&&e.normalScale.value.negate());t.displacementMap&&(e.displacementMap.value=t.displacementMap,e.displacementScale.value=t.displacementScale,e.displacementBias.value=t.displacementBias)}(M,r)):r.isMeshPhongMaterial?(Me(M,r),function(e,t)
{e.specular.value.copy(t.specular),e.shininess.value=Math.max(t.shininess,1e-4),t.emissiveMap&&(e.emissiveMap.value=t.emissiveMap);t.bumpMap&&(e.bumpMap.value=t.bumpMap,e.bumpScale.value=t.bumpScale,t.side===BackSide&&(e.bumpScale.value*=-1));t.normalMap&&(e.normalMap.value=t.normalMap,e.normalScale.value.copy(t.normalScale),t.side===BackSide&&e.normalScale.value.negate());t.displacementMap&&(e.displacementMap.value=t.displacementMap,e.displacementScale.value=t.displacementScale,e.displacementBias.value=t.displacementBias)}(M,r)):r.isMeshStandardMaterial?(Me(M,r,a),r.isMeshPhysicalMaterial?function(e,t,r)
{we(e,t,r),e.reflectivity.value=t.reflectivity,e.clearcoat.value=t.clearcoat,e.clearcoatRoughness.value=t.clearcoatRoughness,t.sheen&&e.sheen.value.copy(t.sheen);t.clearcoatNormalMap&&(e.clearcoatNormalScale.value.copy(t.clearcoatNormalScale),e.clearcoatNormalMap.value=t.clearcoatNormalMap,t.side===BackSide&&e.clearcoatNormalScale.value.negate());e.transparency.value=t.transparency}(M,r,a):we(M,r,a)):r.isMeshMatcapMaterial?(Me(M,r),function(e,t)
{t.matcap&&(e.matcap.value=t.matcap);t.bumpMap&&(e.bumpMap.value=t.bumpMap,e.bumpScale.value=t.bumpScale,t.side===BackSide&&(e.bumpScale.value*=-1));t.normalMap&&(e.normalMap.value=t.normalMap,e.normalScale.value.copy(t.normalScale),t.side===BackSide&&e.normalScale.value.negate());t.displacementMap&&(e.displacementMap.value=t.displacementMap,e.displacementScale.value=t.displacementScale,e.displacementBias.value=t.displacementBias)}(M,r)):r.isMeshDepthMaterial?(Me(M,r),function(e,t)
{t.displacementMap&&(e.displacementMap.value=t.displacementMap,e.displacementScale.value=t.displacementScale,e.displacementBias.value=t.displacementBias)}(M,r)):r.isMeshDistanceMaterial?(Me(M,r),function(e,t)
{t.displacementMap&&(e.displacementMap.value=t.displacementMap,e.displacementScale.value=t.displacementScale,e.displacementBias.value=t.displacementBias);e.referencePosition.value.copy(t.referencePosition),e.nearDistance.value=t.nearDistance,e.farDistance.value=t.farDistance}(M,r)):r.isMeshNormalMaterial?(Me(M,r),function(e,t)
{t.bumpMap&&(e.bumpMap.value=t.bumpMap,e.bumpScale.value=t.bumpScale,t.side===BackSide&&(e.bumpScale.value*=-1));t.normalMap&&(e.normalMap.value=t.normalMap,e.normalScale.value.copy(t.normalScale),t.side===BackSide&&e.normalScale.value.negate());t.displacementMap&&(e.displacementMap.value=t.displacementMap,e.displacementScale.value=t.displacementScale,e.displacementBias.value=t.displacementBias)}(M,r)):r.isLineBasicMaterial?(function(e,t)
{e.diffuse.value.copy(t.color),e.opacity.value=t.opacity}(M,r),r.isLineDashedMaterial&&function(e,t)
{e.dashSize.value=t.dashSize,e.totalSize.value=t.dashSize+t.gapSize,e.scale.value=t.scale}(M,r)):r.isPointsMaterial?function(e,t)
{e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,e.size.value=t.size*q,e.scale.value=.5*W,t.map&&(e.map.value=t.map);t.alphaMap&&(e.alphaMap.value=t.alphaMap);var r;t.map?r=t.map:t.alphaMap&&(r=t.alphaMap);void 0!==r&&(!0===r.matrixAutoUpdate&&r.updateMatrix(),e.uvTransform.value.copy(r.matrix))}(M,r):r.isSpriteMaterial?function(e,t)
{e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,e.rotation.value=t.rotation,t.map&&(e.map.value=t.map);t.alphaMap&&(e.alphaMap.value=t.alphaMap);var r;t.map?r=t.map:t.alphaMap&&(r=t.alphaMap);void 0!==r&&(!0===r.matrixAutoUpdate&&r.updateMatrix(),e.uvTransform.value.copy(r.matrix))}(M,r):r.isShadowMaterial&&(M.color.value.copy(r.color),M.opacity.value=r.opacity),void 0!==M.ltc_1&&(M.ltc_1.value=UniformsLib.LTC_1),void 0!==M.ltc_2&&(M.ltc_2.value=UniformsLib.LTC_2),WebGLUniforms.upload(p,o.uniformsList,M,_),r.isShaderMaterial&&(r.uniformsNeedUpdate=!1)),r.isShaderMaterial&&!0===r.uniformsNeedUpdate&&(WebGLUniforms.upload(p,o.uniformsList,M,_),r.uniformsNeedUpdate=!1),r.isSpriteMaterial&&x.setValue(p,"center",n.center),b.numMultiviewViews>0?ce.updateObjectMatricesUniforms(n,e,x):(x.setValue(p,"modelViewMatrix",n.modelViewMatrix),x.setValue(p,"normalMatrix",n.normalMatrix)),x.setValue(p,"modelMatrix",n.matrixWorld),b}
function Me(e,t,r)
{e.opacity.value=t.opacity,t.color&&e.diffuse.value.copy(t.color),t.emissive&&e.emissive.value.copy(t.emissive).multiplyScalar(t.emissiveIntensity),t.map&&(e.map.value=t.map),t.alphaMap&&(e.alphaMap.value=t.alphaMap),t.specularMap&&(e.specularMap.value=t.specularMap);var n,i,a=t.envMap||r;a&&(e.envMap.value=a,e.flipEnvMap.value=a.isCubeTexture?-1:1,e.reflectivity.value=t.reflectivity,e.refractionRatio.value=t.refractionRatio,e.maxMipLevel.value=y.get(a).__maxMipLevel),t.lightMap&&(e.lightMap.value=t.lightMap,e.lightMapIntensity.value=t.lightMapIntensity),t.aoMap&&(e.aoMap.value=t.aoMap,e.aoMapIntensity.value=t.aoMapIntensity),t.map?n=t.map:t.specularMap?n=t.specularMap:t.displacementMap?n=t.displacementMap:t.normalMap?n=t.normalMap:t.bumpMap?n=t.bumpMap:t.roughnessMap?n=t.roughnessMap:t.metalnessMap?n=t.metalnessMap:t.alphaMap?n=t.alphaMap:t.emissiveMap&&(n=t.emissiveMap),void 0!==n&&(n.isWebGLRenderTarget&&(n=n.texture),!0===n.matrixAutoUpdate&&n.updateMatrix(),e.uvTransform.value.copy(n.matrix)),t.aoMap?i=t.aoMap:t.lightMap&&(i=t.lightMap),void 0!==i&&(i.isWebGLRenderTarget&&(i=i.texture),!0===i.matrixAutoUpdate&&i.updateMatrix(),e.uv2Transform.value.copy(i.matrix))}
function we(e,t,r)
{e.roughness.value=t.roughness,e.metalness.value=t.metalness,t.roughnessMap&&(e.roughnessMap.value=t.roughnessMap),t.metalnessMap&&(e.metalnessMap.value=t.metalnessMap),t.emissiveMap&&(e.emissiveMap.value=t.emissiveMap),t.bumpMap&&(e.bumpMap.value=t.bumpMap,e.bumpScale.value=t.bumpScale,t.side===BackSide&&(e.bumpScale.value*=-1)),t.normalMap&&(e.normalMap.value=t.normalMap,e.normalScale.value.copy(t.normalScale),t.side===BackSide&&e.normalScale.value.negate()),t.displacementMap&&(e.displacementMap.value=t.displacementMap,e.displacementScale.value=t.displacementScale,e.displacementBias.value=t.displacementBias),(t.envMap||r)&&(e.envMapIntensity.value=t.envMapIntensity)}
ve.setAnimationLoop(function(e)
{le.isPresenting||ge&&ge(e)}),"undefined"!=typeof window&&ve.setContext(window),this.setAnimationLoop=function(e)
{ge=e,le.setAnimationLoop(e),ve.start()},this.render=function(e,t)
{var r,n;if(void 0!==arguments[2]&&(console.warn("THREE.WebGLRenderer.render(): the renderTarget argument has been removed. Use .setRenderTarget() instead."),r=arguments[2]),void 0!==arguments[3]&&(console.warn("THREE.WebGLRenderer.render(): the forceClear argument has been removed. Use .clear() instead."),n=arguments[3]),t&&t.isCamera)
{if(!I)
{F.geometry=null,F.program=null,F.wireframe=!1,G=-1,U=null,!0===e.autoUpdate&&e.updateMatrixWorld(),null===t.parent&&t.updateMatrixWorld(),le.enabled&&le.isPresenting&&(t=le.getCamera(t)),(d=T.get(e,t)).init(),e.onBeforeRender(P,e,t,r||$),ne.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),Q.setFromProjectionMatrix(ne),re=this.localClippingEnabled,te=ee.init(this.clippingPlanes,re,t),(u=S.get(e,t)).init(),function e(t,r,n,i)
{if(!1===t.visible)return;var a=t.layers.test(r.layers);if(a)
if(t.isGroup)n=t.renderOrder;else if(t.isLOD)!0===t.autoUpdate&&t.update(r);else if(t.isLight)d.pushLight(t),t.castShadow&&d.pushShadow(t);else if(t.isSprite)
{if(!t.frustumCulled||Q.intersectsSprite(t))
{i&&ie.setFromMatrixPosition(t.matrixWorld).applyMatrix4(ne);var o=M.update(t),s=t.material;s.visible&&u.push(t,o,s,n,ie.z,null)}}
else if(t.isImmediateRenderObject)i&&ie.setFromMatrixPosition(t.matrixWorld).applyMatrix4(ne),u.push(t,null,t.material,n,ie.z,null);else if((t.isMesh||t.isLine||t.isPoints)&&(t.isSkinnedMesh&&t.skeleton.frame!==v.render.frame&&(t.skeleton.update(),t.skeleton.frame=v.render.frame),!t.frustumCulled||Q.intersectsObject(t)))
{i&&ie.setFromMatrixPosition(t.matrixWorld).applyMatrix4(ne);var o=M.update(t),s=t.material;if(Array.isArray(s))
for(var l=o.groups,c=0,h=l.length;c<h;c++)
{var p=l[c],m=s[p.materialIndex];m&&m.visible&&u.push(t,o,m,n,ie.z,p)}
else s.visible&&u.push(t,o,s,n,ie.z,null)}
var f=t.children;for(var c=0,h=f.length;c<h;c++)e(f[c],r,n,i)}(e,t,0,P.sortObjects),!0===P.sortObjects&&u.sort(X,Y),te&&ee.beginShadows();var i=d.state.shadowsArray;he.render(i,e,t),d.setupLights(t),te&&ee.endShadows(),this.info.autoReset&&this.info.reset(),void 0!==r&&this.setRenderTarget(r),le.enabled&&ce.isAvailable()&&ce.attachCamera(t),E.render(u,e,t,n);var a=u.opaque,o=u.transparent;if(e.overrideMaterial)
{var s=e.overrideMaterial;a.length&&ye(a,e,t,s),o.length&&ye(o,e,t,s)}
else a.length&&ye(a,e,t),o.length&&ye(o,e,t);e.onAfterRender(P,e,t),null!==$&&(_.updateRenderTargetMipmap($),_.updateMultisampleRenderTarget($)),g.buffers.depth.setTest(!0),g.buffers.depth.setMask(!0),g.buffers.color.setMask(!0),g.setPolygonOffset(!1),le.enabled&&ce.isAvailable()&&ce.detachCamera(t),u=null,d=null}}
else console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.")},this.setFramebuffer=function(e)
{O!==e&&null===$&&p.bindFramebuffer(36160,e),O=e},this.getActiveCubeFace=function()
{return D},this.getActiveMipmapLevel=function()
{return B},this.getRenderTarget=function()
{return $},this.setRenderTarget=function(e,t,r)
{$=e,D=t,B=r,e&&void 0===y.get(e).__webglFramebuffer&&_.setupRenderTarget(e);var n=O,i=!1;if(e)
{var a=y.get(e).__webglFramebuffer;e.isWebGLCubeRenderTarget?(n=a[t||0],i=!0):n=e.isWebGLMultisampleRenderTarget?y.get(e).__webglMultisampledFramebuffer:a,k.copy(e.viewport),z.copy(e.scissor),H=e.scissorTest}
else k.copy(Z).multiplyScalar(q).floor(),z.copy(K).multiplyScalar(q).floor(),H=J;if(N!==n&&(p.bindFramebuffer(36160,n),N=n),g.viewport(k),g.scissor(z),g.setScissorTest(H),i)
{var o=y.get(e.texture);p.framebufferTexture2D(36160,36064,34069+(t||0),o.__webglTexture,r||0)}},this.readRenderTargetPixels=function(e,t,r,n,i,a,o)
{if(e&&e.isWebGLRenderTarget)
{var s=y.get(e).__webglFramebuffer;if(e.isWebGLCubeRenderTarget&&void 0!==o&&(s=s[o]),s)
{var l=!1;s!==N&&(p.bindFramebuffer(36160,s),l=!0);try
{var c=e.texture,h=c.format,u=c.type;if(h!==RGBAFormat&&R.convert(h)!==p.getParameter(35739))return void console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");if(!(u===UnsignedByteType||R.convert(u)===p.getParameter(35738)||u===FloatType&&(f.isWebGL2||m.get("OES_texture_float")||m.get("WEBGL_color_buffer_float"))||u===HalfFloatType&&(f.isWebGL2?m.get("EXT_color_buffer_float"):m.get("EXT_color_buffer_half_float"))))return void console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");36053===p.checkFramebufferStatus(36160)?t>=0&&t<=e.width-n&&r>=0&&r<=e.height-i&&p.readPixels(t,r,n,i,R.convert(h),R.convert(u),a):console.error("THREE.WebGLRenderer.readRenderTargetPixels: readPixels from renderTarget failed. Framebuffer not complete.")}
finally
{l&&p.bindFramebuffer(36160,N)}}}
else console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.")},this.copyFramebufferToTexture=function(e,t,r)
{void 0===r&&(r=0);var n=Math.pow(2,-r),i=Math.floor(t.image.width*n),a=Math.floor(t.image.height*n),o=R.convert(t.format);_.setTexture2D(t,0),p.copyTexImage2D(3553,r,o,e.x,e.y,i,a,0),g.unbindTexture()},this.copyTextureToTexture=function(e,t,r,n)
{var i=t.image.width,a=t.image.height,o=R.convert(r.format),s=R.convert(r.type);_.setTexture2D(r,0),t.isDataTexture?p.texSubImage2D(3553,n||0,e.x,e.y,i,a,o,s,t.image.data):p.texSubImage2D(3553,n||0,e.x,e.y,o,s,t.image),g.unbindTexture()},this.initTexture=function(e)
{_.setTexture2D(e,0),g.unbindTexture()},"undefined"!=typeof __THREE_DEVTOOLS__&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}
function FogExp2(e,t)
{this.name="",this.color=new Color(e),this.density=void 0!==t?t:25e-5}
function Fog(e,t,r)
{this.name="",this.color=new Color(e),this.near=void 0!==t?t:1,this.far=void 0!==r?r:1e3}
function InterleavedBuffer(e,t)
{this.array=e,this.stride=t,this.count=void 0!==e?e.length/t:0,this.usage=StaticDrawUsage,this.updateRange={offset:0,count:-1},this.version=0}
WebGLMultiviewRenderTarget.prototype=Object.assign(Object.create(WebGLRenderTarget.prototype),{constructor:WebGLMultiviewRenderTarget,isWebGLMultiviewRenderTarget:!0,copy:function(e)
{return WebGLRenderTarget.prototype.copy.call(this,e),this.numViews=e.numViews,this},setNumViews:function(e)
{return this.numViews!==e&&(this.numViews=e,this.dispose()),this}}),ArrayCamera.prototype=Object.assign(Object.create(PerspectiveCamera.prototype),{constructor:ArrayCamera,isArrayCamera:!0}),Group.prototype=Object.assign(Object.create(Object3D.prototype),{constructor:Group,isGroup:!0}),Object.assign(WebXRManager.prototype,EventDispatcher.prototype),Object.assign(FogExp2.prototype,{isFogExp2:!0,clone:function()
{return new FogExp2(this.color,this.density)},toJSON:function()
{return{type:"FogExp2",color:this.color.getHex(),density:this.density}}}),Object.assign(Fog.prototype,{isFog:!0,clone:function()
{return new Fog(this.color,this.near,this.far)},toJSON:function()
{return{type:"Fog",color:this.color.getHex(),near:this.near,far:this.far}}}),Object.defineProperty(InterleavedBuffer.prototype,"needsUpdate",{set:function(e)
{!0===e&&this.version++}}),Object.assign(InterleavedBuffer.prototype,{isInterleavedBuffer:!0,onUploadCallback:function(){},setUsage:function(e)
{return this.usage=e,this},copy:function(e)
{return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this},copyAt:function(e,t,r)
{e*=this.stride,r*=t.stride;for(var n=0,i=this.stride;n<i;n++)this.array[e+n]=t.array[r+n];return this},set:function(e,t)
{return void 0===t&&(t=0),this.array.set(e,t),this},clone:function()
{return(new this.constructor).copy(this)},onUpload:function(e)
{return this.onUploadCallback=e,this}});var _geometry,_vector$6=new Vector3;function InterleavedBufferAttribute(e,t,r,n)
{this.data=e,this.itemSize=t,this.offset=r,this.normalized=!0===n}
function SpriteMaterial(e)
{Material.call(this),this.type="SpriteMaterial",this.color=new Color(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.setValues(e)}
Object.defineProperties(InterleavedBufferAttribute.prototype,{count:{get:function()
{return this.data.count}},array:{get:function()
{return this.data.array}}}),Object.assign(InterleavedBufferAttribute.prototype,{isInterleavedBufferAttribute:!0,applyMatrix4:function(e)
{for(var t=0,r=this.data.count;t<r;t++)_vector$6.x=this.getX(t),_vector$6.y=this.getY(t),_vector$6.z=this.getZ(t),_vector$6.applyMatrix4(e),this.setXYZ(t,_vector$6.x,_vector$6.y,_vector$6.z);return this},setX:function(e,t)
{return this.data.array[e*this.data.stride+this.offset]=t,this},setY:function(e,t)
{return this.data.array[e*this.data.stride+this.offset+1]=t,this},setZ:function(e,t)
{return this.data.array[e*this.data.stride+this.offset+2]=t,this},setW:function(e,t)
{return this.data.array[e*this.data.stride+this.offset+3]=t,this},getX:function(e)
{return this.data.array[e*this.data.stride+this.offset]},getY:function(e)
{return this.data.array[e*this.data.stride+this.offset+1]},getZ:function(e)
{return this.data.array[e*this.data.stride+this.offset+2]},getW:function(e)
{return this.data.array[e*this.data.stride+this.offset+3]},setXY:function(e,t,r)
{return e=e*this.data.stride+this.offset,this.data.array[e+0]=t,this.data.array[e+1]=r,this},setXYZ:function(e,t,r,n)
{return e=e*this.data.stride+this.offset,this.data.array[e+0]=t,this.data.array[e+1]=r,this.data.array[e+2]=n,this},setXYZW:function(e,t,r,n,i)
{return e=e*this.data.stride+this.offset,this.data.array[e+0]=t,this.data.array[e+1]=r,this.data.array[e+2]=n,this.data.array[e+3]=i,this}}),SpriteMaterial.prototype=Object.create(Material.prototype),SpriteMaterial.prototype.constructor=SpriteMaterial,SpriteMaterial.prototype.isSpriteMaterial=!0,SpriteMaterial.prototype.copy=function(e)
{return Material.prototype.copy.call(this,e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this};var _intersectPoint=new Vector3,_worldScale=new Vector3,_mvPosition=new Vector3,_alignedPosition=new Vector2,_rotatedPosition=new Vector2,_viewWorldMatrix=new Matrix4,_vA$1=new Vector3,_vB$1=new Vector3,_vC$1=new Vector3,_uvA$1=new Vector2,_uvB$1=new Vector2,_uvC$1=new Vector2;function Sprite(e)
{if(Object3D.call(this),this.type="Sprite",void 0===_geometry)
{_geometry=new BufferGeometry;var t=new InterleavedBuffer(new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),5);_geometry.setIndex([0,1,2,0,2,3]),_geometry.setAttribute("position",new InterleavedBufferAttribute(t,3,0,!1)),_geometry.setAttribute("uv",new InterleavedBufferAttribute(t,2,3,!1))}
this.geometry=_geometry,this.material=void 0!==e?e:new SpriteMaterial,this.center=new Vector2(.5,.5)}
function transformVertex(e,t,r,n,i,a)
{_alignedPosition.subVectors(e,r).addScalar(.5).multiply(n),void 0!==i?(_rotatedPosition.x=a*_alignedPosition.x-i*_alignedPosition.y,_rotatedPosition.y=i*_alignedPosition.x+a*_alignedPosition.y):_rotatedPosition.copy(_alignedPosition),e.copy(t),e.x+=_rotatedPosition.x,e.y+=_rotatedPosition.y,e.applyMatrix4(_viewWorldMatrix)}
Sprite.prototype=Object.assign(Object.create(Object3D.prototype),{constructor:Sprite,isSprite:!0,raycast:function(e,t)
{null===e.camera&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),_worldScale.setFromMatrixScale(this.matrixWorld),_viewWorldMatrix.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),_mvPosition.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&!1===this.material.sizeAttenuation&&_worldScale.multiplyScalar(-_mvPosition.z);var r,n,i=this.material.rotation;0!==i&&(n=Math.cos(i),r=Math.sin(i));var a=this.center;transformVertex(_vA$1.set(-.5,-.5,0),_mvPosition,a,_worldScale,r,n),transformVertex(_vB$1.set(.5,-.5,0),_mvPosition,a,_worldScale,r,n),transformVertex(_vC$1.set(.5,.5,0),_mvPosition,a,_worldScale,r,n),_uvA$1.set(0,0),_uvB$1.set(1,0),_uvC$1.set(1,1);var o=e.ray.intersectTriangle(_vA$1,_vB$1,_vC$1,!1,_intersectPoint);if(null!==o||(transformVertex(_vB$1.set(-.5,.5,0),_mvPosition,a,_worldScale,r,n),_uvB$1.set(0,1),null!==(o=e.ray.intersectTriangle(_vA$1,_vC$1,_vB$1,!1,_intersectPoint))))
{var s=e.ray.origin.distanceTo(_intersectPoint);s<e.near||s>e.far||t.push({distance:s,point:_intersectPoint.clone(),uv:Triangle.getUV(_intersectPoint,_vA$1,_vB$1,_vC$1,_uvA$1,_uvB$1,_uvC$1,new Vector2),face:null,object:this})}},clone:function()
{return new this.constructor(this.material).copy(this)},copy:function(e)
{return Object3D.prototype.copy.call(this,e),void 0!==e.center&&this.center.copy(e.center),this}});var _v1$4=new Vector3,_v2$2=new Vector3;function LOD()
{Object3D.call(this),this.type="LOD",Object.defineProperties(this,{levels:{enumerable:!0,value:[]}}),this.autoUpdate=!0}
function SkinnedMesh(e,t)
{e&&e.isGeometry&&console.error("THREE.SkinnedMesh no longer supports THREE.Geometry. Use THREE.BufferGeometry instead."),Mesh.call(this,e,t),this.type="SkinnedMesh",this.bindMode="attached",this.bindMatrix=new Matrix4,this.bindMatrixInverse=new Matrix4}
LOD.prototype=Object.assign(Object.create(Object3D.prototype),{constructor:LOD,isLOD:!0,copy:function(e)
{Object3D.prototype.copy.call(this,e,!1);for(var t=e.levels,r=0,n=t.length;r<n;r++)
{var i=t[r];this.addLevel(i.object.clone(),i.distance)}
return this.autoUpdate=e.autoUpdate,this},addLevel:function(e,t)
{void 0===t&&(t=0),t=Math.abs(t);for(var r=this.levels,n=0;n<r.length&&!(t<r[n].distance);n++);return r.splice(n,0,{distance:t,object:e}),this.add(e),this},getObjectForDistance:function(e)
{var t=this.levels;if(t.length>0)
{for(var r=1,n=t.length;r<n&&!(e<t[r].distance);r++);return t[r-1].object}
return null},raycast:function(e,t)
{if(this.levels.length>0)
{_v1$4.setFromMatrixPosition(this.matrixWorld);var r=e.ray.origin.distanceTo(_v1$4);this.getObjectForDistance(r).raycast(e,t)}},update:function(e)
{var t=this.levels;if(t.length>1)
{_v1$4.setFromMatrixPosition(e.matrixWorld),_v2$2.setFromMatrixPosition(this.matrixWorld);var r=_v1$4.distanceTo(_v2$2);t[0].object.visible=!0;for(var n=1,i=t.length;n<i&&r>=t[n].distance;n++)t[n-1].object.visible=!1,t[n].object.visible=!0;for(;n<i;n++)t[n].object.visible=!1}},toJSON:function(e)
{var t=Object3D.prototype.toJSON.call(this,e);!1===this.autoUpdate&&(t.object.autoUpdate=!1),t.object.levels=[];for(var r=this.levels,n=0,i=r.length;n<i;n++)
{var a=r[n];t.object.levels.push({object:a.object.uuid,distance:a.distance})}
return t}}),SkinnedMesh.prototype=Object.assign(Object.create(Mesh.prototype),{constructor:SkinnedMesh,isSkinnedMesh:!0,bind:function(e,t)
{this.skeleton=e,void 0===t&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.getInverse(t)},pose:function()
{this.skeleton.pose()},normalizeSkinWeights:function()
{for(var e=new Vector4,t=this.geometry.attributes.skinWeight,r=0,n=t.count;r<n;r++)
{e.x=t.getX(r),e.y=t.getY(r),e.z=t.getZ(r),e.w=t.getW(r);var i=1/e.manhattanLength();i!==1/0?e.multiplyScalar(i):e.set(1,0,0,0),t.setXYZW(r,e.x,e.y,e.z,e.w)}},updateMatrixWorld:function(e)
{Mesh.prototype.updateMatrixWorld.call(this,e),"attached"===this.bindMode?this.bindMatrixInverse.getInverse(this.matrixWorld):"detached"===this.bindMode?this.bindMatrixInverse.getInverse(this.bindMatrix):console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)},clone:function()
{return new this.constructor(this.geometry,this.material).copy(this)}});var _offsetMatrix=new Matrix4,_identityMatrix=new Matrix4;function Skeleton(e,t)
{if(e=e||[],this.bones=e.slice(0),this.boneMatrices=new Float32Array(16*this.bones.length),this.frame=-1,void 0===t)this.calculateInverses();else if(this.bones.length===t.length)this.boneInverses=t.slice(0);else{console.warn("THREE.Skeleton boneInverses is the wrong length."),this.boneInverses=[];for(var r=0,n=this.bones.length;r<n;r++)this.boneInverses.push(new Matrix4)}}
function Bone()
{Object3D.call(this),this.type="Bone"}
Object.assign(Skeleton.prototype,{calculateInverses:function()
{this.boneInverses=[];for(var e=0,t=this.bones.length;e<t;e++)
{var r=new Matrix4;this.bones[e]&&r.getInverse(this.bones[e].matrixWorld),this.boneInverses.push(r)}},pose:function()
{var e,t,r;for(t=0,r=this.bones.length;t<r;t++)(e=this.bones[t])&&e.matrixWorld.getInverse(this.boneInverses[t]);for(t=0,r=this.bones.length;t<r;t++)(e=this.bones[t])&&(e.parent&&e.parent.isBone?(e.matrix.getInverse(e.parent.matrixWorld),e.matrix.multiply(e.matrixWorld)):e.matrix.copy(e.matrixWorld),e.matrix.decompose(e.position,e.quaternion,e.scale))},update:function()
{for(var e=this.bones,t=this.boneInverses,r=this.boneMatrices,n=this.boneTexture,i=0,a=e.length;i<a;i++)
{var o=e[i]?e[i].matrixWorld:_identityMatrix;_offsetMatrix.multiplyMatrices(o,t[i]),_offsetMatrix.toArray(r,16*i)}
void 0!==n&&(n.needsUpdate=!0)},clone:function()
{return new Skeleton(this.bones,this.boneInverses)},getBoneByName:function(e)
{for(var t=0,r=this.bones.length;t<r;t++)
{var n=this.bones[t];if(n.name===e)return n}}}),Bone.prototype=Object.assign(Object.create(Object3D.prototype),{constructor:Bone,isBone:!0});var _instanceLocalMatrix=new Matrix4,_instanceWorldMatrix=new Matrix4,_instanceIntersects=[],_mesh=new Mesh;function InstancedMesh(e,t,r)
{Mesh.call(this,e,t),this.instanceMatrix=new BufferAttribute(new Float32Array(16*r),16),this.count=r,this.frustumCulled=!1}
function LineBasicMaterial(e)
{Material.call(this),this.type="LineBasicMaterial",this.color=new Color(16777215),this.linewidth=1,this.linecap="round",this.linejoin="round",this.setValues(e)}
InstancedMesh.prototype=Object.assign(Object.create(Mesh.prototype),{constructor:InstancedMesh,isInstancedMesh:!0,getMatrixAt:function(e,t)
{t.fromArray(this.instanceMatrix.array,16*e)},raycast:function(e,t)
{var r=this.matrixWorld,n=this.count;if(_mesh.geometry=this.geometry,_mesh.material=this.material,void 0!==_mesh.material)
for(var i=0;i<n;i++)this.getMatrixAt(i,_instanceLocalMatrix),_instanceWorldMatrix.multiplyMatrices(r,_instanceLocalMatrix),_mesh.matrixWorld=_instanceWorldMatrix,_mesh.raycast(e,_instanceIntersects),_instanceIntersects.length>0&&(_instanceIntersects[0].instanceId=i,_instanceIntersects[0].object=this,t.push(_instanceIntersects[0]),_instanceIntersects.length=0)},setMatrixAt:function(e,t)
{t.toArray(this.instanceMatrix.array,16*e)},updateMorphTargets:function(){}}),LineBasicMaterial.prototype=Object.create(Material.prototype),LineBasicMaterial.prototype.constructor=LineBasicMaterial,LineBasicMaterial.prototype.isLineBasicMaterial=!0,LineBasicMaterial.prototype.copy=function(e)
{return Material.prototype.copy.call(this,e),this.color.copy(e.color),this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this};var _start=new Vector3,_end=new Vector3,_inverseMatrix$1=new Matrix4,_ray$1=new Ray,_sphere$2=new Sphere;function Line(e,t,r)
{1===r&&console.error("THREE.Line: parameter THREE.LinePieces no longer supported. Use THREE.LineSegments instead."),Object3D.call(this),this.type="Line",this.geometry=void 0!==e?e:new BufferGeometry,this.material=void 0!==t?t:new LineBasicMaterial}
Line.prototype=Object.assign(Object.create(Object3D.prototype),{constructor:Line,isLine:!0,computeLineDistances:function()
{var e=this.geometry;if(e.isBufferGeometry)
if(null===e.index)
{for(var t=e.attributes.position,r=[0],n=1,i=t.count;n<i;n++)_start.fromBufferAttribute(t,n-1),_end.fromBufferAttribute(t,n),r[n]=r[n-1],r[n]+=_start.distanceTo(_end);e.setAttribute("lineDistance",new Float32BufferAttribute(r,1))}
else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");else if(e.isGeometry)
{var a=e.vertices;(r=e.lineDistances)[0]=0;for(n=1,i=a.length;n<i;n++)r[n]=r[n-1],r[n]+=a[n-1].distanceTo(a[n])}
return this},raycast:function(e,t)
{var r=e.linePrecision,n=this.geometry,i=this.matrixWorld;if(null===n.boundingSphere&&n.computeBoundingSphere(),_sphere$2.copy(n.boundingSphere),_sphere$2.applyMatrix4(i),_sphere$2.radius+=r,!1!==e.ray.intersectsSphere(_sphere$2))
{_inverseMatrix$1.getInverse(i),_ray$1.copy(e.ray).applyMatrix4(_inverseMatrix$1);var a=r/((this.scale.x+this.scale.y+this.scale.z)/3),o=a*a,s=new Vector3,l=new Vector3,c=new Vector3,h=new Vector3,u=this&&this.isLineSegments?2:1;if(n.isBufferGeometry)
{var d=n.index,p=n.attributes.position.array;if(null!==d)
for(var m=d.array,f=0,g=m.length-1;f<g;f+=u)
{var v=m[f],y=m[f+1];if(s.fromArray(p,3*v),l.fromArray(p,3*y),!(_ray$1.distanceSqToSegment(s,l,h,c)>o))h.applyMatrix4(this.matrixWorld),(x=e.ray.origin.distanceTo(h))<e.near||x>e.far||t.push({distance:x,point:c.clone().applyMatrix4(this.matrixWorld),index:f,face:null,faceIndex:null,object:this})}
else for(f=0,g=p.length/3-1;f<g;f+=u)
{if(s.fromArray(p,3*f),l.fromArray(p,3*f+3),!(_ray$1.distanceSqToSegment(s,l,h,c)>o))h.applyMatrix4(this.matrixWorld),(x=e.ray.origin.distanceTo(h))<e.near||x>e.far||t.push({distance:x,point:c.clone().applyMatrix4(this.matrixWorld),index:f,face:null,faceIndex:null,object:this})}}
else if(n.isGeometry)
{var _=n.vertices,b=_.length;for(f=0;f<b-1;f+=u)
{var x;if(!(_ray$1.distanceSqToSegment(_[f],_[f+1],h,c)>o))h.applyMatrix4(this.matrixWorld),(x=e.ray.origin.distanceTo(h))<e.near||x>e.far||t.push({distance:x,point:c.clone().applyMatrix4(this.matrixWorld),index:f,face:null,faceIndex:null,object:this})}}}},clone:function()
{return new this.constructor(this.geometry,this.material).copy(this)}});var _start$1=new Vector3,_end$1=new Vector3;function LineSegments(e,t)
{Line.call(this,e,t),this.type="LineSegments"}
function LineLoop(e,t)
{Line.call(this,e,t),this.type="LineLoop"}
function PointsMaterial(e)
{Material.call(this),this.type="PointsMaterial",this.color=new Color(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.morphTargets=!1,this.setValues(e)}
LineSegments.prototype=Object.assign(Object.create(Line.prototype),{constructor:LineSegments,isLineSegments:!0,computeLineDistances:function()
{var e=this.geometry;if(e.isBufferGeometry)
if(null===e.index)
{for(var t=e.attributes.position,r=[],n=0,i=t.count;n<i;n+=2)_start$1.fromBufferAttribute(t,n),_end$1.fromBufferAttribute(t,n+1),r[n]=0===n?0:r[n-1],r[n+1]=r[n]+_start$1.distanceTo(_end$1);e.setAttribute("lineDistance",new Float32BufferAttribute(r,1))}
else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");else if(e.isGeometry)
{var a=e.vertices;for(r=e.lineDistances,n=0,i=a.length;n<i;n+=2)_start$1.copy(a[n]),_end$1.copy(a[n+1]),r[n]=0===n?0:r[n-1],r[n+1]=r[n]+_start$1.distanceTo(_end$1)}
return this}}),LineLoop.prototype=Object.assign(Object.create(Line.prototype),{constructor:LineLoop,isLineLoop:!0}),PointsMaterial.prototype=Object.create(Material.prototype),PointsMaterial.prototype.constructor=PointsMaterial,PointsMaterial.prototype.isPointsMaterial=!0,PointsMaterial.prototype.copy=function(e)
{return Material.prototype.copy.call(this,e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.morphTargets=e.morphTargets,this};var _inverseMatrix$2=new Matrix4,_ray$2=new Ray,_sphere$3=new Sphere,_position$1=new Vector3;function Points(e,t)
{Object3D.call(this),this.type="Points",this.geometry=void 0!==e?e:new BufferGeometry,this.material=void 0!==t?t:new PointsMaterial,this.updateMorphTargets()}
function testPoint(e,t,r,n,i,a,o)
{var s=_ray$2.distanceSqToPoint(e);if(s<r)
{var l=new Vector3;_ray$2.closestPointToPoint(e,l),l.applyMatrix4(n);var c=i.ray.origin.distanceTo(l);if(c<i.near||c>i.far)return;a.push({distance:c,distanceToRay:Math.sqrt(s),point:l,index:t,face:null,object:o})}}
function VideoTexture(e,t,r,n,i,a,o,s,l)
{Texture.call(this,e,t,r,n,i,a,o,s,l),this.format=void 0!==o?o:RGBFormat,this.minFilter=void 0!==a?a:LinearFilter,this.magFilter=void 0!==i?i:LinearFilter,this.generateMipmaps=!1}
function CompressedTexture(e,t,r,n,i,a,o,s,l,c,h,u)
{Texture.call(this,null,a,o,s,l,c,n,i,h,u),this.image={width:t,height:r},this.mipmaps=e,this.flipY=!1,this.generateMipmaps=!1}
function CanvasTexture(e,t,r,n,i,a,o,s,l)
{Texture.call(this,e,t,r,n,i,a,o,s,l),this.needsUpdate=!0}
function DepthTexture(e,t,r,n,i,a,o,s,l,c)
{if((c=void 0!==c?c:DepthFormat)!==DepthFormat&&c!==DepthStencilFormat)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");void 0===r&&c===DepthFormat&&(r=UnsignedShortType),void 0===r&&c===DepthStencilFormat&&(r=UnsignedInt248Type),Texture.call(this,null,n,i,a,o,s,c,r,l),this.image={width:e,height:t},this.magFilter=void 0!==o?o:NearestFilter,this.minFilter=void 0!==s?s:NearestFilter,this.flipY=!1,this.generateMipmaps=!1}
function WireframeGeometry(e)
{BufferGeometry.call(this),this.type="WireframeGeometry";var t,r,n,i,a,o,s,l,c,h,u=[],d=[0,0],p={},m=["a","b","c"];if(e&&e.isGeometry)
{var f=e.faces;for(t=0,n=f.length;t<n;t++)
{var g=f[t];for(r=0;r<3;r++)s=g[m[r]],l=g[m[(r+1)%3]],d[0]=Math.min(s,l),d[1]=Math.max(s,l),void 0===p[c=d[0]+","+d[1]]&&(p[c]={index1:d[0],index2:d[1]})}
for(c in p)o=p[c],h=e.vertices[o.index1],u.push(h.x,h.y,h.z),h=e.vertices[o.index2],u.push(h.x,h.y,h.z)}
else if(e&&e.isBufferGeometry)
{var v,y,_,b,x,M,w;if(h=new Vector3,null!==e.index)
{for(v=e.attributes.position,y=e.index,0===(_=e.groups).length&&(_=[{start:0,count:y.count,materialIndex:0}]),i=0,a=_.length;i<a;++i)
for(t=x=(b=_[i]).start,n=x+b.count;t<n;t+=3)
for(r=0;r<3;r++)s=y.getX(t+r),l=y.getX(t+(r+1)%3),d[0]=Math.min(s,l),d[1]=Math.max(s,l),void 0===p[c=d[0]+","+d[1]]&&(p[c]={index1:d[0],index2:d[1]});for(c in p)o=p[c],h.fromBufferAttribute(v,o.index1),u.push(h.x,h.y,h.z),h.fromBufferAttribute(v,o.index2),u.push(h.x,h.y,h.z)}
else for(t=0,n=(v=e.attributes.position).count/3;t<n;t++)
for(r=0;r<3;r++)M=3*t+r,h.fromBufferAttribute(v,M),u.push(h.x,h.y,h.z),w=3*t+(r+1)%3,h.fromBufferAttribute(v,w),u.push(h.x,h.y,h.z)}
this.setAttribute("position",new Float32BufferAttribute(u,3))}
function ParametricGeometry(e,t,r)
{Geometry.call(this),this.type="ParametricGeometry",this.parameters={func:e,slices:t,stacks:r},this.fromBufferGeometry(new ParametricBufferGeometry(e,t,r)),this.mergeVertices()}
function ParametricBufferGeometry(e,t,r)
{BufferGeometry.call(this),this.type="ParametricBufferGeometry",this.parameters={func:e,slices:t,stacks:r};var n,i,a=[],o=[],s=[],l=[],c=new Vector3,h=new Vector3,u=new Vector3,d=new Vector3,p=new Vector3;e.length<3&&console.error("THREE.ParametricGeometry: Function must now modify a Vector3 as third parameter.");var m=t+1;for(n=0;n<=r;n++)
{var f=n/r;for(i=0;i<=t;i++)
{var g=i/t;e(g,f,h),o.push(h.x,h.y,h.z),g-1e-5>=0?(e(g-1e-5,f,u),d.subVectors(h,u)):(e(g+1e-5,f,u),d.subVectors(u,h)),f-1e-5>=0?(e(g,f-1e-5,u),p.subVectors(h,u)):(e(g,f+1e-5,u),p.subVectors(u,h)),c.crossVectors(d,p).normalize(),s.push(c.x,c.y,c.z),l.push(g,f)}}
for(n=0;n<r;n++)
for(i=0;i<t;i++)
{var v=n*m+i,y=n*m+i+1,_=(n+1)*m+i+1,b=(n+1)*m+i;a.push(v,y,b),a.push(y,_,b)}
this.setIndex(a),this.setAttribute("position",new Float32BufferAttribute(o,3)),this.setAttribute("normal",new Float32BufferAttribute(s,3)),this.setAttribute("uv",new Float32BufferAttribute(l,2))}
function PolyhedronGeometry(e,t,r,n)
{Geometry.call(this),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:r,detail:n},this.fromBufferGeometry(new PolyhedronBufferGeometry(e,t,r,n)),this.mergeVertices()}
function PolyhedronBufferGeometry(e,t,r,n)
{BufferGeometry.call(this),this.type="PolyhedronBufferGeometry",this.parameters={vertices:e,indices:t,radius:r,detail:n},r=r||1;var i=[],a=[];function o(e,t,r,n)
{var i,a,o=Math.pow(2,n),l=[];for(i=0;i<=o;i++)
{l[i]=[];var c=e.clone().lerp(r,i/o),h=t.clone().lerp(r,i/o),u=o-i;for(a=0;a<=u;a++)l[i][a]=0===a&&i===o?c:c.clone().lerp(h,a/u)}
for(i=0;i<o;i++)
for(a=0;a<2*(o-i)-1;a++)
{var d=Math.floor(a/2);a%2==0?(s(l[i][d+1]),s(l[i+1][d]),s(l[i][d])):(s(l[i][d+1]),s(l[i+1][d+1]),s(l[i+1][d]))}}
function s(e)
{i.push(e.x,e.y,e.z)}
function l(t,r)
{var n=3*t;r.x=e[n+0],r.y=e[n+1],r.z=e[n+2]}
function c(e,t,r,n)
{n<0&&1===e.x&&(a[t]=e.x-1),0===r.x&&0===r.z&&(a[t]=n/2/Math.PI+.5)}
function h(e)
{return Math.atan2(e.z,-e.x)}!function(e)
{for(var r=new Vector3,n=new Vector3,i=new Vector3,a=0;a<t.length;a+=3)l(t[a+0],r),l(t[a+1],n),l(t[a+2],i),o(r,n,i,e)}(n=n||0),function(e)
{for(var t=new Vector3,r=0;r<i.length;r+=3)t.x=i[r+0],t.y=i[r+1],t.z=i[r+2],t.normalize().multiplyScalar(e),i[r+0]=t.x,i[r+1]=t.y,i[r+2]=t.z}(r),function()
{for(var e=new Vector3,t=0;t<i.length;t+=3)
{e.x=i[t+0],e.y=i[t+1],e.z=i[t+2];var r=h(e)/2/Math.PI+.5,n=(o=e,Math.atan2(-o.y,Math.sqrt(o.x*o.x+o.z*o.z))/Math.PI+.5);a.push(r,1-n)}
var o;(function()
{for(var e=new Vector3,t=new Vector3,r=new Vector3,n=new Vector3,o=new Vector2,s=new Vector2,l=new Vector2,u=0,d=0;u<i.length;u+=9,d+=6)
{e.set(i[u+0],i[u+1],i[u+2]),t.set(i[u+3],i[u+4],i[u+5]),r.set(i[u+6],i[u+7],i[u+8]),o.set(a[d+0],a[d+1]),s.set(a[d+2],a[d+3]),l.set(a[d+4],a[d+5]),n.copy(e).add(t).add(r).divideScalar(3);var p=h(n);c(o,d+0,e,p),c(s,d+2,t,p),c(l,d+4,r,p)}})(),function()
{for(var e=0;e<a.length;e+=6)
{var t=a[e+0],r=a[e+2],n=a[e+4],i=Math.max(t,r,n),o=Math.min(t,r,n);i>.9&&o<.1&&(t<.2&&(a[e+0]+=1),r<.2&&(a[e+2]+=1),n<.2&&(a[e+4]+=1))}}()}(),this.setAttribute("position",new Float32BufferAttribute(i,3)),this.setAttribute("normal",new Float32BufferAttribute(i.slice(),3)),this.setAttribute("uv",new Float32BufferAttribute(a,2)),0===n?this.computeVertexNormals():this.normalizeNormals()}
function TetrahedronGeometry(e,t)
{Geometry.call(this),this.type="TetrahedronGeometry",this.parameters={radius:e,detail:t},this.fromBufferGeometry(new TetrahedronBufferGeometry(e,t)),this.mergeVertices()}
function TetrahedronBufferGeometry(e,t)
{PolyhedronBufferGeometry.call(this,[1,1,1,-1,-1,1,-1,1,-1,1,-1,-1],[2,1,0,0,3,2,1,3,0,2,3,1],e,t),this.type="TetrahedronBufferGeometry",this.parameters={radius:e,detail:t}}
function OctahedronGeometry(e,t)
{Geometry.call(this),this.type="OctahedronGeometry",this.parameters={radius:e,detail:t},this.fromBufferGeometry(new OctahedronBufferGeometry(e,t)),this.mergeVertices()}
function OctahedronBufferGeometry(e,t)
{PolyhedronBufferGeometry.call(this,[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2],e,t),this.type="OctahedronBufferGeometry",this.parameters={radius:e,detail:t}}
function IcosahedronGeometry(e,t)
{Geometry.call(this),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t},this.fromBufferGeometry(new IcosahedronBufferGeometry(e,t)),this.mergeVertices()}
function IcosahedronBufferGeometry(e,t)
{var r=(1+Math.sqrt(5))/2,n=[-1,r,0,1,r,0,-1,-r,0,1,-r,0,0,-1,r,0,1,r,0,-1,-r,0,1,-r,r,0,-1,r,0,1,-r,0,-1,-r,0,1];PolyhedronBufferGeometry.call(this,n,[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1],e,t),this.type="IcosahedronBufferGeometry",this.parameters={radius:e,detail:t}}
function DodecahedronGeometry(e,t)
{Geometry.call(this),this.type="DodecahedronGeometry",this.parameters={radius:e,detail:t},this.fromBufferGeometry(new DodecahedronBufferGeometry(e,t)),this.mergeVertices()}
function DodecahedronBufferGeometry(e,t)
{var r=(1+Math.sqrt(5))/2,n=1/r,i=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-n,-r,0,-n,r,0,n,-r,0,n,r,-n,-r,0,-n,r,0,n,-r,0,n,r,0,-r,0,-n,r,0,-n,-r,0,n,r,0,n];PolyhedronBufferGeometry.call(this,i,[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9],e,t),this.type="DodecahedronBufferGeometry",this.parameters={radius:e,detail:t}}
function TubeGeometry(e,t,r,n,i,a)
{Geometry.call(this),this.type="TubeGeometry",this.parameters={path:e,tubularSegments:t,radius:r,radialSegments:n,closed:i},void 0!==a&&console.warn("THREE.TubeGeometry: taper has been removed.");var o=new TubeBufferGeometry(e,t,r,n,i);this.tangents=o.tangents,this.normals=o.normals,this.binormals=o.binormals,this.fromBufferGeometry(o),this.mergeVertices()}
function TubeBufferGeometry(e,t,r,n,i)
{BufferGeometry.call(this),this.type="TubeBufferGeometry",this.parameters={path:e,tubularSegments:t,radius:r,radialSegments:n,closed:i},t=t||64,r=r||1,n=n||8,i=i||!1;var a=e.computeFrenetFrames(t,i);this.tangents=a.tangents,this.normals=a.normals,this.binormals=a.binormals;var o,s,l=new Vector3,c=new Vector3,h=new Vector2,u=new Vector3,d=[],p=[],m=[],f=[];function g(i)
{u=e.getPointAt(i/t,u);var o=a.normals[i],h=a.binormals[i];for(s=0;s<=n;s++)
{var m=s/n*Math.PI*2,f=Math.sin(m),g=-Math.cos(m);c.x=g*o.x+f*h.x,c.y=g*o.y+f*h.y,c.z=g*o.z+f*h.z,c.normalize(),p.push(c.x,c.y,c.z),l.x=u.x+r*c.x,l.y=u.y+r*c.y,l.z=u.z+r*c.z,d.push(l.x,l.y,l.z)}}!function()
{for(o=0;o<t;o++)g(o);g(!1===i?t:0),function()
{for(o=0;o<=t;o++)
for(s=0;s<=n;s++)h.x=o/t,h.y=s/n,m.push(h.x,h.y)}(),function()
{for(s=1;s<=t;s++)
for(o=1;o<=n;o++)
{var e=(n+1)*(s-1)+(o-1),r=(n+1)*s+(o-1),i=(n+1)*s+o,a=(n+1)*(s-1)+o;f.push(e,r,a),f.push(r,i,a)}}()}(),this.setIndex(f),this.setAttribute("position",new Float32BufferAttribute(d,3)),this.setAttribute("normal",new Float32BufferAttribute(p,3)),this.setAttribute("uv",new Float32BufferAttribute(m,2))}
function TorusKnotGeometry(e,t,r,n,i,a,o)
{Geometry.call(this),this.type="TorusKnotGeometry",this.parameters={radius:e,tube:t,tubularSegments:r,radialSegments:n,p:i,q:a},void 0!==o&&console.warn("THREE.TorusKnotGeometry: heightScale has been deprecated. Use .scale( x, y, z ) instead."),this.fromBufferGeometry(new TorusKnotBufferGeometry(e,t,r,n,i,a)),this.mergeVertices()}
function TorusKnotBufferGeometry(e,t,r,n,i,a)
{BufferGeometry.call(this),this.type="TorusKnotBufferGeometry",this.parameters={radius:e,tube:t,tubularSegments:r,radialSegments:n,p:i,q:a},e=e||1,t=t||.4,r=Math.floor(r)||64,n=Math.floor(n)||8,i=i||2,a=a||3;var o,s,l=[],c=[],h=[],u=[],d=new Vector3,p=new Vector3,m=new Vector3,f=new Vector3,g=new Vector3,v=new Vector3,y=new Vector3;for(o=0;o<=r;++o)
{var _=o/r*i*Math.PI*2;for(A(_,i,a,e,m),A(_+.01,i,a,e,f),v.subVectors(f,m),y.addVectors(f,m),g.crossVectors(v,y),y.crossVectors(g,v),g.normalize(),y.normalize(),s=0;s<=n;++s)
{var b=s/n*Math.PI*2,x=-t*Math.cos(b),M=t*Math.sin(b);d.x=m.x+(x*y.x+M*g.x),d.y=m.y+(x*y.y+M*g.y),d.z=m.z+(x*y.z+M*g.z),c.push(d.x,d.y,d.z),p.subVectors(d,m).normalize(),h.push(p.x,p.y,p.z),u.push(o/r),u.push(s/n)}}
for(s=1;s<=r;s++)
for(o=1;o<=n;o++)
{var w=(n+1)*(s-1)+(o-1),S=(n+1)*s+(o-1),T=(n+1)*s+o,E=(n+1)*(s-1)+o;l.push(w,S,E),l.push(S,T,E)}
function A(e,t,r,n,i)
{var a=Math.cos(e),o=Math.sin(e),s=r/t*e,l=Math.cos(s);i.x=n*(2+l)*.5*a,i.y=n*(2+l)*o*.5,i.z=n*Math.sin(s)*.5}
this.setIndex(l),this.setAttribute("position",new Float32BufferAttribute(c,3)),this.setAttribute("normal",new Float32BufferAttribute(h,3)),this.setAttribute("uv",new Float32BufferAttribute(u,2))}
function TorusGeometry(e,t,r,n,i)
{Geometry.call(this),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:r,tubularSegments:n,arc:i},this.fromBufferGeometry(new TorusBufferGeometry(e,t,r,n,i)),this.mergeVertices()}
function TorusBufferGeometry(e,t,r,n,i)
{BufferGeometry.call(this),this.type="TorusBufferGeometry",this.parameters={radius:e,tube:t,radialSegments:r,tubularSegments:n,arc:i},e=e||1,t=t||.4,r=Math.floor(r)||8,n=Math.floor(n)||6,i=i||2*Math.PI;var a,o,s=[],l=[],c=[],h=[],u=new Vector3,d=new Vector3,p=new Vector3;for(a=0;a<=r;a++)
for(o=0;o<=n;o++)
{var m=o/n*i,f=a/r*Math.PI*2;d.x=(e+t*Math.cos(f))*Math.cos(m),d.y=(e+t*Math.cos(f))*Math.sin(m),d.z=t*Math.sin(f),l.push(d.x,d.y,d.z),u.x=e*Math.cos(m),u.y=e*Math.sin(m),p.subVectors(d,u).normalize(),c.push(p.x,p.y,p.z),h.push(o/n),h.push(a/r)}
for(a=1;a<=r;a++)
for(o=1;o<=n;o++)
{var g=(n+1)*a+o-1,v=(n+1)*(a-1)+o-1,y=(n+1)*(a-1)+o,_=(n+1)*a+o;s.push(g,v,_),s.push(v,y,_)}
this.setIndex(s),this.setAttribute("position",new Float32BufferAttribute(l,3)),this.setAttribute("normal",new Float32BufferAttribute(c,3)),this.setAttribute("uv",new Float32BufferAttribute(h,2))}
Points.prototype=Object.assign(Object.create(Object3D.prototype),{constructor:Points,isPoints:!0,raycast:function(e,t)
{var r=this.geometry,n=this.matrixWorld,i=e.params.Points.threshold;if(null===r.boundingSphere&&r.computeBoundingSphere(),_sphere$3.copy(r.boundingSphere),_sphere$3.applyMatrix4(n),_sphere$3.radius+=i,!1!==e.ray.intersectsSphere(_sphere$3))
{_inverseMatrix$2.getInverse(n),_ray$2.copy(e.ray).applyMatrix4(_inverseMatrix$2);var a=i/((this.scale.x+this.scale.y+this.scale.z)/3),o=a*a;if(r.isBufferGeometry)
{var s=r.index,l=r.attributes.position.array;if(null!==s)
for(var c=s.array,h=0,u=c.length;h<u;h++)
{var d=c[h];_position$1.fromArray(l,3*d),testPoint(_position$1,d,o,n,e,t,this)}
else{h=0;for(var p=l.length/3;h<p;h++)_position$1.fromArray(l,3*h),testPoint(_position$1,h,o,n,e,t,this)}}
else{var m=r.vertices;for(h=0,p=m.length;h<p;h++)testPoint(m[h],h,o,n,e,t,this)}}},updateMorphTargets:function()
{var e,t,r,n=this.geometry;if(n.isBufferGeometry)
{var i=n.morphAttributes,a=Object.keys(i);if(a.length>0)
{var o=i[a[0]];if(void 0!==o)
for(this.morphTargetInfluences=[],this.morphTargetDictionary={},e=0,t=o.length;e<t;e++)r=o[e].name||String(e),this.morphTargetInfluences.push(0),this.morphTargetDictionary[r]=e}}
else{var s=n.morphTargets;void 0!==s&&s.length>0&&console.error("THREE.Points.updateMorphTargets() does not support THREE.Geometry. Use THREE.BufferGeometry instead.")}},clone:function()
{return new this.constructor(this.geometry,this.material).copy(this)}}),VideoTexture.prototype=Object.assign(Object.create(Texture.prototype),{constructor:VideoTexture,isVideoTexture:!0,update:function()
{var e=this.image;e.readyState>=e.HAVE_CURRENT_DATA&&(this.needsUpdate=!0)}}),CompressedTexture.prototype=Object.create(Texture.prototype),CompressedTexture.prototype.constructor=CompressedTexture,CompressedTexture.prototype.isCompressedTexture=!0,CanvasTexture.prototype=Object.create(Texture.prototype),CanvasTexture.prototype.constructor=CanvasTexture,CanvasTexture.prototype.isCanvasTexture=!0,DepthTexture.prototype=Object.create(Texture.prototype),DepthTexture.prototype.constructor=DepthTexture,DepthTexture.prototype.isDepthTexture=!0,WireframeGeometry.prototype=Object.create(BufferGeometry.prototype),WireframeGeometry.prototype.constructor=WireframeGeometry,ParametricGeometry.prototype=Object.create(Geometry.prototype),ParametricGeometry.prototype.constructor=ParametricGeometry,ParametricBufferGeometry.prototype=Object.create(BufferGeometry.prototype),ParametricBufferGeometry.prototype.constructor=ParametricBufferGeometry,PolyhedronGeometry.prototype=Object.create(Geometry.prototype),PolyhedronGeometry.prototype.constructor=PolyhedronGeometry,PolyhedronBufferGeometry.prototype=Object.create(BufferGeometry.prototype),PolyhedronBufferGeometry.prototype.constructor=PolyhedronBufferGeometry,TetrahedronGeometry.prototype=Object.create(Geometry.prototype),TetrahedronGeometry.prototype.constructor=TetrahedronGeometry,TetrahedronBufferGeometry.prototype=Object.create(PolyhedronBufferGeometry.prototype),TetrahedronBufferGeometry.prototype.constructor=TetrahedronBufferGeometry,OctahedronGeometry.prototype=Object.create(Geometry.prototype),OctahedronGeometry.prototype.constructor=OctahedronGeometry,OctahedronBufferGeometry.prototype=Object.create(PolyhedronBufferGeometry.prototype),OctahedronBufferGeometry.prototype.constructor=OctahedronBufferGeometry,IcosahedronGeometry.prototype=Object.create(Geometry.prototype),IcosahedronGeometry.prototype.constructor=IcosahedronGeometry,IcosahedronBufferGeometry.prototype=Object.create(PolyhedronBufferGeometry.prototype),IcosahedronBufferGeometry.prototype.constructor=IcosahedronBufferGeometry,DodecahedronGeometry.prototype=Object.create(Geometry.prototype),DodecahedronGeometry.prototype.constructor=DodecahedronGeometry,DodecahedronBufferGeometry.prototype=Object.create(PolyhedronBufferGeometry.prototype),DodecahedronBufferGeometry.prototype.constructor=DodecahedronBufferGeometry,TubeGeometry.prototype=Object.create(Geometry.prototype),TubeGeometry.prototype.constructor=TubeGeometry,TubeBufferGeometry.prototype=Object.create(BufferGeometry.prototype),TubeBufferGeometry.prototype.constructor=TubeBufferGeometry,TubeBufferGeometry.prototype.toJSON=function()
{var e=BufferGeometry.prototype.toJSON.call(this);return e.path=this.parameters.path.toJSON(),e},TorusKnotGeometry.prototype=Object.create(Geometry.prototype),TorusKnotGeometry.prototype.constructor=TorusKnotGeometry,TorusKnotBufferGeometry.prototype=Object.create(BufferGeometry.prototype),TorusKnotBufferGeometry.prototype.constructor=TorusKnotBufferGeometry,TorusGeometry.prototype=Object.create(Geometry.prototype),TorusGeometry.prototype.constructor=TorusGeometry,TorusBufferGeometry.prototype=Object.create(BufferGeometry.prototype),TorusBufferGeometry.prototype.constructor=TorusBufferGeometry;var Earcut={triangulate:function(e,t,r)
{r=r||2;var n,i,a,o,s,l,c,h=t&&t.length,u=h?t[0]*r:e.length,d=linkedList(e,0,u,r,!0),p=[];if(!d||d.next===d.prev)return p;if(h&&(d=eliminateHoles(e,t,d,r)),e.length>80*r)
{n=a=e[0],i=o=e[1];for(var m=r;m<u;m+=r)(s=e[m])<n&&(n=s),(l=e[m+1])<i&&(i=l),s>a&&(a=s),l>o&&(o=l);c=0!==(c=Math.max(a-n,o-i))?1/c:0}
return earcutLinked(d,p,r,n,i,c),p}};function linkedList(e,t,r,n,i)
{var a,o;if(i===signedArea(e,t,r,n)>0)
for(a=t;a<r;a+=n)o=insertNode(a,e[a],e[a+1],o);else for(a=r-n;a>=t;a-=n)o=insertNode(a,e[a],e[a+1],o);return o&&equals(o,o.next)&&(removeNode(o),o=o.next),o}
function filterPoints(e,t)
{if(!e)return e;t||(t=e);var r,n=e;do{if(r=!1,n.steiner||!equals(n,n.next)&&0!==area(n.prev,n,n.next))n=n.next;else{if(removeNode(n),(n=t=n.prev)===n.next)break;r=!0}}while(r||n!==t);return t}
function earcutLinked(e,t,r,n,i,a,o)
{if(e)
{!o&&a&&indexCurve(e,n,i,a);for(var s,l,c=e;e.prev!==e.next;)
if(s=e.prev,l=e.next,a?isEarHashed(e,n,i,a):isEar(e))t.push(s.i/r),t.push(e.i/r),t.push(l.i/r),removeNode(e),e=l.next,c=l.next;else if((e=l)===c)
{o?1===o?earcutLinked(e=cureLocalIntersections(e,t,r),t,r,n,i,a,2):2===o&&splitEarcut(e,t,r,n,i,a):earcutLinked(filterPoints(e),t,r,n,i,a,1);break}}}
function isEar(e)
{var t=e.prev,r=e,n=e.next;if(area(t,r,n)>=0)return!1;for(var i=e.next.next;i!==e.prev;)
{if(pointInTriangle(t.x,t.y,r.x,r.y,n.x,n.y,i.x,i.y)&&area(i.prev,i,i.next)>=0)return!1;i=i.next}
return!0}
function isEarHashed(e,t,r,n)
{var i=e.prev,a=e,o=e.next;if(area(i,a,o)>=0)return!1;for(var s=i.x<a.x?i.x<o.x?i.x:o.x:a.x<o.x?a.x:o.x,l=i.y<a.y?i.y<o.y?i.y:o.y:a.y<o.y?a.y:o.y,c=i.x>a.x?i.x>o.x?i.x:o.x:a.x>o.x?a.x:o.x,h=i.y>a.y?i.y>o.y?i.y:o.y:a.y>o.y?a.y:o.y,u=zOrder(s,l,t,r,n),d=zOrder(c,h,t,r,n),p=e.prevZ,m=e.nextZ;p&&p.z>=u&&m&&m.z<=d;)
{if(p!==e.prev&&p!==e.next&&pointInTriangle(i.x,i.y,a.x,a.y,o.x,o.y,p.x,p.y)&&area(p.prev,p,p.next)>=0)return!1;if(p=p.prevZ,m!==e.prev&&m!==e.next&&pointInTriangle(i.x,i.y,a.x,a.y,o.x,o.y,m.x,m.y)&&area(m.prev,m,m.next)>=0)return!1;m=m.nextZ}
for(;p&&p.z>=u;)
{if(p!==e.prev&&p!==e.next&&pointInTriangle(i.x,i.y,a.x,a.y,o.x,o.y,p.x,p.y)&&area(p.prev,p,p.next)>=0)return!1;p=p.prevZ}
for(;m&&m.z<=d;)
{if(m!==e.prev&&m!==e.next&&pointInTriangle(i.x,i.y,a.x,a.y,o.x,o.y,m.x,m.y)&&area(m.prev,m,m.next)>=0)return!1;m=m.nextZ}
return!0}
function cureLocalIntersections(e,t,r)
{var n=e;do{var i=n.prev,a=n.next.next;!equals(i,a)&&intersects(i,n,n.next,a)&&locallyInside(i,a)&&locallyInside(a,i)&&(t.push(i.i/r),t.push(n.i/r),t.push(a.i/r),removeNode(n),removeNode(n.next),n=e=a),n=n.next}while(n!==e);return n}
function splitEarcut(e,t,r,n,i,a)
{var o=e;do{for(var s=o.next.next;s!==o.prev;)
{if(o.i!==s.i&&isValidDiagonal(o,s))
{var l=splitPolygon(o,s);return o=filterPoints(o,o.next),l=filterPoints(l,l.next),earcutLinked(o,t,r,n,i,a),void earcutLinked(l,t,r,n,i,a)}
s=s.next}
o=o.next}while(o!==e)}
function eliminateHoles(e,t,r,n)
{var i,a,o,s=[];for(i=0,a=t.length;i<a;i++)(o=linkedList(e,t[i]*n,i<a-1?t[i+1]*n:e.length,n,!1))===o.next&&(o.steiner=!0),s.push(getLeftmost(o));for(s.sort(compareX),i=0;i<s.length;i++)eliminateHole(s[i],r),r=filterPoints(r,r.next);return r}
function compareX(e,t)
{return e.x-t.x}
function eliminateHole(e,t)
{if(t=findHoleBridge(e,t))
{var r=splitPolygon(t,e);filterPoints(r,r.next)}}
function findHoleBridge(e,t)
{var r,n=t,i=e.x,a=e.y,o=-1/0;do{if(a<=n.y&&a>=n.next.y&&n.next.y!==n.y)
{var s=n.x+(a-n.y)*(n.next.x-n.x)/(n.next.y-n.y);if(s<=i&&s>o)
{if(o=s,s===i)
{if(a===n.y)return n;if(a===n.next.y)return n.next}
r=n.x<n.next.x?n:n.next}}
n=n.next}while(n!==t);if(!r)return null;if(i===o)return r.prev;var l,c=r,h=r.x,u=r.y,d=1/0;for(n=r.next;n!==c;)i>=n.x&&n.x>=h&&i!==n.x&&pointInTriangle(a<u?i:o,a,h,u,a<u?o:i,a,n.x,n.y)&&((l=Math.abs(a-n.y)/(i-n.x))<d||l===d&&n.x>r.x)&&locallyInside(n,e)&&(r=n,d=l),n=n.next;return r}
function indexCurve(e,t,r,n)
{var i=e;do{null===i.z&&(i.z=zOrder(i.x,i.y,t,r,n)),i.prevZ=i.prev,i.nextZ=i.next,i=i.next}while(i!==e);i.prevZ.nextZ=null,i.prevZ=null,sortLinked(i)}
function sortLinked(e)
{var t,r,n,i,a,o,s,l,c=1;do{for(r=e,e=null,a=null,o=0;r;)
{for(o++,n=r,s=0,t=0;t<c&&(s++,n=n.nextZ);t++);for(l=c;s>0||l>0&&n;)0!==s&&(0===l||!n||r.z<=n.z)?(i=r,r=r.nextZ,s--):(i=n,n=n.nextZ,l--),a?a.nextZ=i:e=i,i.prevZ=a,a=i;r=n}
a.nextZ=null,c*=2}while(o>1);return e}
function zOrder(e,t,r,n,i)
{return(e=1431655765&((e=858993459&((e=252645135&((e=16711935&((e=32767*(e-r)*i)|e<<8))|e<<4))|e<<2))|e<<1))|(t=1431655765&((t=858993459&((t=252645135&((t=16711935&((t=32767*(t-n)*i)|t<<8))|t<<4))|t<<2))|t<<1))<<1}
function getLeftmost(e)
{var t=e,r=e;do{(t.x<r.x||t.x===r.x&&t.y<r.y)&&(r=t),t=t.next}while(t!==e);return r}
function pointInTriangle(e,t,r,n,i,a,o,s)
{return(i-o)*(t-s)-(e-o)*(a-s)>=0&&(e-o)*(n-s)-(r-o)*(t-s)>=0&&(r-o)*(a-s)-(i-o)*(n-s)>=0}
function isValidDiagonal(e,t)
{return e.next.i!==t.i&&e.prev.i!==t.i&&!intersectsPolygon(e,t)&&locallyInside(e,t)&&locallyInside(t,e)&&middleInside(e,t)}
function area(e,t,r)
{return(t.y-e.y)*(r.x-t.x)-(t.x-e.x)*(r.y-t.y)}
function equals(e,t)
{return e.x===t.x&&e.y===t.y}
function intersects(e,t,r,n)
{return!!(equals(e,r)&&equals(t,n)||equals(e,n)&&equals(r,t))||area(e,t,r)>0!=area(e,t,n)>0&&area(r,n,e)>0!=area(r,n,t)>0}
function intersectsPolygon(e,t)
{var r=e;do{if(r.i!==e.i&&r.next.i!==e.i&&r.i!==t.i&&r.next.i!==t.i&&intersects(r,r.next,e,t))return!0;r=r.next}while(r!==e);return!1}
function locallyInside(e,t)
{return area(e.prev,e,e.next)<0?area(e,t,e.next)>=0&&area(e,e.prev,t)>=0:area(e,t,e.prev)<0||area(e,e.next,t)<0}
function middleInside(e,t)
{var r=e,n=!1,i=(e.x+t.x)/2,a=(e.y+t.y)/2;do{r.y>a!=r.next.y>a&&r.next.y!==r.y&&i<(r.next.x-r.x)*(a-r.y)/(r.next.y-r.y)+r.x&&(n=!n),r=r.next}while(r!==e);return n}
function splitPolygon(e,t)
{var r=new Node$1(e.i,e.x,e.y),n=new Node$1(t.i,t.x,t.y),i=e.next,a=t.prev;return e.next=t,t.prev=e,r.next=i,i.prev=r,n.next=r,r.prev=n,a.next=n,n.prev=a,n}
function insertNode(e,t,r,n)
{var i=new Node$1(e,t,r);return n?(i.next=n.next,i.prev=n,n.next.prev=i,n.next=i):(i.prev=i,i.next=i),i}
function removeNode(e)
{e.next.prev=e.prev,e.prev.next=e.next,e.prevZ&&(e.prevZ.nextZ=e.nextZ),e.nextZ&&(e.nextZ.prevZ=e.prevZ)}
function Node$1(e,t,r)
{this.i=e,this.x=t,this.y=r,this.prev=null,this.next=null,this.z=null,this.prevZ=null,this.nextZ=null,this.steiner=!1}
function signedArea(e,t,r,n)
{for(var i=0,a=t,o=r-n;a<r;a+=n)i+=(e[o]-e[a])*(e[a+1]+e[o+1]),o=a;return i}
var ShapeUtils={area:function(e)
{for(var t=e.length,r=0,n=t-1,i=0;i<t;n=i++)r+=e[n].x*e[i].y-e[i].x*e[n].y;return.5*r},isClockWise:function(e)
{return ShapeUtils.area(e)<0},triangulateShape:function(e,t)
{var r=[],n=[],i=[];removeDupEndPts(e),addContour(r,e);var a=e.length;t.forEach(removeDupEndPts);for(var o=0;o<t.length;o++)n.push(a),a+=t[o].length,addContour(r,t[o]);var s=Earcut.triangulate(r,n);for(o=0;o<s.length;o+=3)i.push(s.slice(o,o+3));return i}};function removeDupEndPts(e)
{var t=e.length;t>2&&e[t-1].equals(e[0])&&e.pop()}
function addContour(e,t)
{for(var r=0;r<t.length;r++)e.push(t[r].x),e.push(t[r].y)}
function ExtrudeGeometry(e,t)
{Geometry.call(this),this.type="ExtrudeGeometry",this.parameters={shapes:e,options:t},this.fromBufferGeometry(new ExtrudeBufferGeometry(e,t)),this.mergeVertices()}
function ExtrudeBufferGeometry(e,t)
{BufferGeometry.call(this),this.type="ExtrudeBufferGeometry",this.parameters={shapes:e,options:t},e=Array.isArray(e)?e:[e];for(var r=this,n=[],i=[],a=0,o=e.length;a<o;a++)
{s(e[a])}
function s(e)
{var a=[],o=void 0!==t.curveSegments?t.curveSegments:12,s=void 0!==t.steps?t.steps:1,l=void 0!==t.depth?t.depth:100,c=void 0===t.bevelEnabled||t.bevelEnabled,h=void 0!==t.bevelThickness?t.bevelThickness:6,u=void 0!==t.bevelSize?t.bevelSize:h-2,d=void 0!==t.bevelOffset?t.bevelOffset:0,p=void 0!==t.bevelSegments?t.bevelSegments:3,m=t.extrudePath,f=void 0!==t.UVGenerator?t.UVGenerator:WorldUVGenerator;void 0!==t.amount&&(console.warn("THREE.ExtrudeBufferGeometry: amount has been renamed to depth."),l=t.amount);var g,v,y,_,b,x,M,w,S=!1;m&&(g=m.getSpacedPoints(s),S=!0,c=!1,v=m.computeFrenetFrames(s,!1),y=new Vector3,_=new Vector3,b=new Vector3),c||(p=0,h=0,u=0,d=0);var T=e.extractPoints(o),E=T.shape,A=T.holes;if(!ShapeUtils.isClockWise(E))
for(E=E.reverse(),M=0,w=A.length;M<w;M++)x=A[M],ShapeUtils.isClockWise(x)&&(A[M]=x.reverse());var L=ShapeUtils.triangulateShape(E,A),C=E;for(M=0,w=A.length;M<w;M++)x=A[M],E=E.concat(x);function R(e,t,r)
{return t||console.error("THREE.ExtrudeGeometry: vec does not exist"),t.clone().multiplyScalar(r).add(e)}
var P,I,O,D,B,$,N=E.length,G=L.length;function F(e,t,r)
{var n,i,a,o=e.x-t.x,s=e.y-t.y,l=r.x-e.x,c=r.y-e.y,h=o*o+s*s,u=o*c-s*l;if(Math.abs(u)>Number.EPSILON)
{var d=Math.sqrt(h),p=Math.sqrt(l*l+c*c),m=t.x-s/d,f=t.y+o/d,g=((r.x-c/p-m)*c-(r.y+l/p-f)*l)/(o*c-s*l),v=(n=m+o*g-e.x)*n+(i=f+s*g-e.y)*i;if(v<=2)return new Vector2(n,i);a=Math.sqrt(v/2)}
else{var y=!1;o>Number.EPSILON?l>Number.EPSILON&&(y=!0):o<-Number.EPSILON?l<-Number.EPSILON&&(y=!0):Math.sign(s)===Math.sign(c)&&(y=!0),y?(n=-s,i=o,a=Math.sqrt(h)):(n=o,i=s,a=Math.sqrt(h/2))}
return new Vector2(n/a,i/a)}
for(var U=[],V=0,k=C.length,z=k-1,H=V+1;V<k;V++,z++,H++)z===k&&(z=0),H===k&&(H=0),U[V]=F(C[V],C[z],C[H]);var j,W,q=[],X=U.concat();for(M=0,w=A.length;M<w;M++)
{for(x=A[M],j=[],V=0,z=(k=x.length)-1,H=V+1;V<k;V++,z++,H++)z===k&&(z=0),H===k&&(H=0),j[V]=F(x[V],x[z],x[H]);q.push(j),X=X.concat(j)}
for(P=0;P<p;P++)
{for(O=P/p,D=h*Math.cos(O*Math.PI/2),I=u*Math.sin(O*Math.PI/2)+d,V=0,k=C.length;V<k;V++)Z((B=R(C[V],U[V],I)).x,B.y,-D);for(M=0,w=A.length;M<w;M++)
for(x=A[M],j=q[M],V=0,k=x.length;V<k;V++)Z((B=R(x[V],j[V],I)).x,B.y,-D)}
for(I=u+d,V=0;V<N;V++)B=c?R(E[V],X[V],I):E[V],S?(_.copy(v.normals[0]).multiplyScalar(B.x),y.copy(v.binormals[0]).multiplyScalar(B.y),b.copy(g[0]).add(_).add(y),Z(b.x,b.y,b.z)):Z(B.x,B.y,0);for(W=1;W<=s;W++)
for(V=0;V<N;V++)B=c?R(E[V],X[V],I):E[V],S?(_.copy(v.normals[W]).multiplyScalar(B.x),y.copy(v.binormals[W]).multiplyScalar(B.y),b.copy(g[W]).add(_).add(y),Z(b.x,b.y,b.z)):Z(B.x,B.y,l/s*W);for(P=p-1;P>=0;P--)
{for(O=P/p,D=h*Math.cos(O*Math.PI/2),I=u*Math.sin(O*Math.PI/2)+d,V=0,k=C.length;V<k;V++)Z((B=R(C[V],U[V],I)).x,B.y,l+D);for(M=0,w=A.length;M<w;M++)
for(x=A[M],j=q[M],V=0,k=x.length;V<k;V++)B=R(x[V],j[V],I),S?Z(B.x,B.y+g[s-1].y,g[s-1].x+D):Z(B.x,B.y,l+D)}
function Y(e,t)
{var r,n;for(V=e.length;--V>=0;)
{r=V,(n=V-1)<0&&(n=e.length-1);var i=0,a=s+2*p;for(i=0;i<a;i++)
{var o=N*i,l=N*(i+1);J(t+r+o,t+n+o,t+n+l,t+r+l)}}}
function Z(e,t,r)
{a.push(e),a.push(t),a.push(r)}
function K(e,t,i)
{Q(e),Q(t),Q(i);var a=n.length/3,o=f.generateTopUV(r,n,a-3,a-2,a-1);ee(o[0]),ee(o[1]),ee(o[2])}
function J(e,t,i,a)
{Q(e),Q(t),Q(a),Q(t),Q(i),Q(a);var o=n.length/3,s=f.generateSideWallUV(r,n,o-6,o-3,o-2,o-1);ee(s[0]),ee(s[1]),ee(s[3]),ee(s[1]),ee(s[2]),ee(s[3])}
function Q(e)
{n.push(a[3*e+0]),n.push(a[3*e+1]),n.push(a[3*e+2])}
function ee(e)
{i.push(e.x),i.push(e.y)}!function()
{var e=n.length/3;if(c)
{var t=0,i=N*t;for(V=0;V<G;V++)K(($=L[V])[2]+i,$[1]+i,$[0]+i);for(i=N*(t=s+2*p),V=0;V<G;V++)K(($=L[V])[0]+i,$[1]+i,$[2]+i)}
else{for(V=0;V<G;V++)K(($=L[V])[2],$[1],$[0]);for(V=0;V<G;V++)K(($=L[V])[0]+N*s,$[1]+N*s,$[2]+N*s)}
r.addGroup(e,n.length/3-e,0)}(),function()
{var e=n.length/3,t=0;for(Y(C,t),t+=C.length,M=0,w=A.length;M<w;M++)Y(x=A[M],t),t+=x.length;r.addGroup(e,n.length/3-e,1)}()}
this.setAttribute("position",new Float32BufferAttribute(n,3)),this.setAttribute("uv",new Float32BufferAttribute(i,2)),this.computeVertexNormals()}
ExtrudeGeometry.prototype=Object.create(Geometry.prototype),ExtrudeGeometry.prototype.constructor=ExtrudeGeometry,ExtrudeGeometry.prototype.toJSON=function()
{var e=Geometry.prototype.toJSON.call(this);return toJSON(this.parameters.shapes,this.parameters.options,e)},ExtrudeBufferGeometry.prototype=Object.create(BufferGeometry.prototype),ExtrudeBufferGeometry.prototype.constructor=ExtrudeBufferGeometry,ExtrudeBufferGeometry.prototype.toJSON=function()
{var e=BufferGeometry.prototype.toJSON.call(this);return toJSON(this.parameters.shapes,this.parameters.options,e)};var WorldUVGenerator={generateTopUV:function(e,t,r,n,i)
{var a=t[3*r],o=t[3*r+1],s=t[3*n],l=t[3*n+1],c=t[3*i],h=t[3*i+1];return[new Vector2(a,o),new Vector2(s,l),new Vector2(c,h)]},generateSideWallUV:function(e,t,r,n,i,a)
{var o=t[3*r],s=t[3*r+1],l=t[3*r+2],c=t[3*n],h=t[3*n+1],u=t[3*n+2],d=t[3*i],p=t[3*i+1],m=t[3*i+2],f=t[3*a],g=t[3*a+1],v=t[3*a+2];return Math.abs(s-h)<.01?[new Vector2(o,1-l),new Vector2(c,1-u),new Vector2(d,1-m),new Vector2(f,1-v)]:[new Vector2(s,1-l),new Vector2(h,1-u),new Vector2(p,1-m),new Vector2(g,1-v)]}};function toJSON(e,t,r)
{if(r.shapes=[],Array.isArray(e))
for(var n=0,i=e.length;n<i;n++)
{var a=e[n];r.shapes.push(a.uuid)}
else r.shapes.push(e.uuid);return void 0!==t.extrudePath&&(r.options.extrudePath=t.extrudePath.toJSON()),r}
function TextGeometry(e,t)
{Geometry.call(this),this.type="TextGeometry",this.parameters={text:e,parameters:t},this.fromBufferGeometry(new TextBufferGeometry(e,t)),this.mergeVertices()}
function TextBufferGeometry(e,t)
{var r=(t=t||{}).font;if(!r||!r.isFont)return console.error("THREE.TextGeometry: font parameter is not an instance of THREE.Font."),new Geometry;var n=r.generateShapes(e,t.size);t.depth=void 0!==t.height?t.height:50,void 0===t.bevelThickness&&(t.bevelThickness=10),void 0===t.bevelSize&&(t.bevelSize=8),void 0===t.bevelEnabled&&(t.bevelEnabled=!1),ExtrudeBufferGeometry.call(this,n,t),this.type="TextBufferGeometry"}
function SphereGeometry(e,t,r,n,i,a,o)
{Geometry.call(this),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:r,phiStart:n,phiLength:i,thetaStart:a,thetaLength:o},this.fromBufferGeometry(new SphereBufferGeometry(e,t,r,n,i,a,o)),this.mergeVertices()}
function SphereBufferGeometry(e,t,r,n,i,a,o)
{BufferGeometry.call(this),this.type="SphereBufferGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:r,phiStart:n,phiLength:i,thetaStart:a,thetaLength:o},e=e||1,t=Math.max(3,Math.floor(t)||8),r=Math.max(2,Math.floor(r)||6),n=void 0!==n?n:0,i=void 0!==i?i:2*Math.PI,a=void 0!==a?a:0,o=void 0!==o?o:Math.PI;var s,l,c=Math.min(a+o,Math.PI),h=0,u=[],d=new Vector3,p=new Vector3,m=[],f=[],g=[],v=[];for(l=0;l<=r;l++)
{var y=[],_=l/r,b=0;for(0==l&&0==a?b=.5/t:l==r&&c==Math.PI&&(b=-.5/t),s=0;s<=t;s++)
{var x=s/t;d.x=-e*Math.cos(n+x*i)*Math.sin(a+_*o),d.y=e*Math.cos(a+_*o),d.z=e*Math.sin(n+x*i)*Math.sin(a+_*o),f.push(d.x,d.y,d.z),p.copy(d).normalize(),g.push(p.x,p.y,p.z),v.push(x+b,1-_),y.push(h++)}
u.push(y)}
for(l=0;l<r;l++)
for(s=0;s<t;s++)
{var M=u[l][s+1],w=u[l][s],S=u[l+1][s],T=u[l+1][s+1];(0!==l||a>0)&&m.push(M,w,T),(l!==r-1||c<Math.PI)&&m.push(w,S,T)}
this.setIndex(m),this.setAttribute("position",new Float32BufferAttribute(f,3)),this.setAttribute("normal",new Float32BufferAttribute(g,3)),this.setAttribute("uv",new Float32BufferAttribute(v,2))}
function RingGeometry(e,t,r,n,i,a)
{Geometry.call(this),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:r,phiSegments:n,thetaStart:i,thetaLength:a},this.fromBufferGeometry(new RingBufferGeometry(e,t,r,n,i,a)),this.mergeVertices()}
function RingBufferGeometry(e,t,r,n,i,a)
{BufferGeometry.call(this),this.type="RingBufferGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:r,phiSegments:n,thetaStart:i,thetaLength:a},e=e||.5,t=t||1,i=void 0!==i?i:0,a=void 0!==a?a:2*Math.PI,r=void 0!==r?Math.max(3,r):8;var o,s,l,c=[],h=[],u=[],d=[],p=e,m=(t-e)/(n=void 0!==n?Math.max(1,n):1),f=new Vector3,g=new Vector2;for(s=0;s<=n;s++)
{for(l=0;l<=r;l++)o=i+l/r*a,f.x=p*Math.cos(o),f.y=p*Math.sin(o),h.push(f.x,f.y,f.z),u.push(0,0,1),g.x=(f.x/t+1)/2,g.y=(f.y/t+1)/2,d.push(g.x,g.y);p+=m}
for(s=0;s<n;s++)
{var v=s*(r+1);for(l=0;l<r;l++)
{var y=o=l+v,_=o+r+1,b=o+r+2,x=o+1;c.push(y,_,x),c.push(_,b,x)}}
this.setIndex(c),this.setAttribute("position",new Float32BufferAttribute(h,3)),this.setAttribute("normal",new Float32BufferAttribute(u,3)),this.setAttribute("uv",new Float32BufferAttribute(d,2))}
function LatheGeometry(e,t,r,n)
{Geometry.call(this),this.type="LatheGeometry",this.parameters={points:e,segments:t,phiStart:r,phiLength:n},this.fromBufferGeometry(new LatheBufferGeometry(e,t,r,n)),this.mergeVertices()}
function LatheBufferGeometry(e,t,r,n)
{BufferGeometry.call(this),this.type="LatheBufferGeometry",this.parameters={points:e,segments:t,phiStart:r,phiLength:n},t=Math.floor(t)||12,r=r||0,n=n||2*Math.PI,n=MathUtils.clamp(n,0,2*Math.PI);var i,a,o,s=[],l=[],c=[],h=1/t,u=new Vector3,d=new Vector2;for(a=0;a<=t;a++)
{var p=r+a*h*n,m=Math.sin(p),f=Math.cos(p);for(o=0;o<=e.length-1;o++)u.x=e[o].x*m,u.y=e[o].y,u.z=e[o].x*f,l.push(u.x,u.y,u.z),d.x=a/t,d.y=o/(e.length-1),c.push(d.x,d.y)}
for(a=0;a<t;a++)
for(o=0;o<e.length-1;o++)
{var g=i=o+a*e.length,v=i+e.length,y=i+e.length+1,_=i+1;s.push(g,v,_),s.push(v,y,_)}
if(this.setIndex(s),this.setAttribute("position",new Float32BufferAttribute(l,3)),this.setAttribute("uv",new Float32BufferAttribute(c,2)),this.computeVertexNormals(),n===2*Math.PI)
{var b=this.attributes.normal.array,x=new Vector3,M=new Vector3,w=new Vector3;for(i=t*e.length*3,a=0,o=0;a<e.length;a++,o+=3)x.x=b[o+0],x.y=b[o+1],x.z=b[o+2],M.x=b[i+o+0],M.y=b[i+o+1],M.z=b[i+o+2],w.addVectors(x,M).normalize(),b[o+0]=b[i+o+0]=w.x,b[o+1]=b[i+o+1]=w.y,b[o+2]=b[i+o+2]=w.z}}
function ShapeGeometry(e,t)
{Geometry.call(this),this.type="ShapeGeometry","object"==typeof t&&(console.warn("THREE.ShapeGeometry: Options parameter has been removed."),t=t.curveSegments),this.parameters={shapes:e,curveSegments:t},this.fromBufferGeometry(new ShapeBufferGeometry(e,t)),this.mergeVertices()}
function ShapeBufferGeometry(e,t)
{BufferGeometry.call(this),this.type="ShapeBufferGeometry",this.parameters={shapes:e,curveSegments:t},t=t||12;var r=[],n=[],i=[],a=[],o=0,s=0;if(!1===Array.isArray(e))c(e);else for(var l=0;l<e.length;l++)c(e[l]),this.addGroup(o,s,l),o+=s,s=0;function c(e)
{var o,l,c,h=n.length/3,u=e.extractPoints(t),d=u.shape,p=u.holes;for(!1===ShapeUtils.isClockWise(d)&&(d=d.reverse()),o=0,l=p.length;o<l;o++)c=p[o],!0===ShapeUtils.isClockWise(c)&&(p[o]=c.reverse());var m=ShapeUtils.triangulateShape(d,p);for(o=0,l=p.length;o<l;o++)c=p[o],d=d.concat(c);for(o=0,l=d.length;o<l;o++)
{var f=d[o];n.push(f.x,f.y,0),i.push(0,0,1),a.push(f.x,f.y)}
for(o=0,l=m.length;o<l;o++)
{var g=m[o],v=g[0]+h,y=g[1]+h,_=g[2]+h;r.push(v,y,_),s+=3}}
this.setIndex(r),this.setAttribute("position",new Float32BufferAttribute(n,3)),this.setAttribute("normal",new Float32BufferAttribute(i,3)),this.setAttribute("uv",new Float32BufferAttribute(a,2))}
function toJSON$1(e,t)
{if(t.shapes=[],Array.isArray(e))
for(var r=0,n=e.length;r<n;r++)
{var i=e[r];t.shapes.push(i.uuid)}
else t.shapes.push(e.uuid);return t}
function EdgesGeometry(e,t)
{BufferGeometry.call(this),this.type="EdgesGeometry",this.parameters={thresholdAngle:t},t=void 0!==t?t:1;var r,n,i,a,o=[],s=Math.cos(MathUtils.DEG2RAD*t),l=[0,0],c={},h=["a","b","c"];e.isBufferGeometry?(a=new Geometry).fromBufferGeometry(e):a=e.clone(),a.mergeVertices(),a.computeFaceNormals();for(var u=a.vertices,d=a.faces,p=0,m=d.length;p<m;p++)
for(var f=d[p],g=0;g<3;g++)r=f[h[g]],n=f[h[(g+1)%3]],l[0]=Math.min(r,n),l[1]=Math.max(r,n),void 0===c[i=l[0]+","+l[1]]?c[i]={index1:l[0],index2:l[1],face1:p,face2:void 0}:c[i].face2=p;for(i in c)
{var v=c[i];if(void 0===v.face2||d[v.face1].normal.dot(d[v.face2].normal)<=s)
{var y=u[v.index1];o.push(y.x,y.y,y.z),y=u[v.index2],o.push(y.x,y.y,y.z)}}
this.setAttribute("position",new Float32BufferAttribute(o,3))}
function CylinderGeometry(e,t,r,n,i,a,o,s)
{Geometry.call(this),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:r,radialSegments:n,heightSegments:i,openEnded:a,thetaStart:o,thetaLength:s},this.fromBufferGeometry(new CylinderBufferGeometry(e,t,r,n,i,a,o,s)),this.mergeVertices()}
function CylinderBufferGeometry(e,t,r,n,i,a,o,s)
{BufferGeometry.call(this),this.type="CylinderBufferGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:r,radialSegments:n,heightSegments:i,openEnded:a,thetaStart:o,thetaLength:s};var l=this;e=void 0!==e?e:1,t=void 0!==t?t:1,r=r||1,n=Math.floor(n)||8,i=Math.floor(i)||1,a=void 0!==a&&a,o=void 0!==o?o:0,s=void 0!==s?s:2*Math.PI;var c=[],h=[],u=[],d=[],p=0,m=[],f=r/2,g=0;function v(r)
{var i,a,m,v=new Vector2,y=new Vector3,_=0,b=!0===r?e:t,x=!0===r?1:-1;for(a=p,i=1;i<=n;i++)h.push(0,f*x,0),u.push(0,x,0),d.push(.5,.5),p++;for(m=p,i=0;i<=n;i++)
{var M=i/n*s+o,w=Math.cos(M),S=Math.sin(M);y.x=b*S,y.y=f*x,y.z=b*w,h.push(y.x,y.y,y.z),u.push(0,x,0),v.x=.5*w+.5,v.y=.5*S*x+.5,d.push(v.x,v.y),p++}
for(i=0;i<n;i++)
{var T=a+i,E=m+i;!0===r?c.push(E,E+1,T):c.push(E+1,E,T),_+=3}
l.addGroup(g,_,!0===r?1:2),g+=_}!function()
{var a,v,y=new Vector3,_=new Vector3,b=0,x=(t-e)/r;for(v=0;v<=i;v++)
{var M=[],w=v/i,S=w*(t-e)+e;for(a=0;a<=n;a++)
{var T=a/n,E=T*s+o,A=Math.sin(E),L=Math.cos(E);_.x=S*A,_.y=-w*r+f,_.z=S*L,h.push(_.x,_.y,_.z),y.set(A,x,L).normalize(),u.push(y.x,y.y,y.z),d.push(T,1-w),M.push(p++)}
m.push(M)}
for(a=0;a<n;a++)
for(v=0;v<i;v++)
{var C=m[v][a],R=m[v+1][a],P=m[v+1][a+1],I=m[v][a+1];c.push(C,R,I),c.push(R,P,I),b+=6}
l.addGroup(g,b,0),g+=b}(),!1===a&&(e>0&&v(!0),t>0&&v(!1)),this.setIndex(c),this.setAttribute("position",new Float32BufferAttribute(h,3)),this.setAttribute("normal",new Float32BufferAttribute(u,3)),this.setAttribute("uv",new Float32BufferAttribute(d,2))}
function ConeGeometry(e,t,r,n,i,a,o)
{CylinderGeometry.call(this,0,e,t,r,n,i,a,o),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:r,heightSegments:n,openEnded:i,thetaStart:a,thetaLength:o}}
function ConeBufferGeometry(e,t,r,n,i,a,o)
{CylinderBufferGeometry.call(this,0,e,t,r,n,i,a,o),this.type="ConeBufferGeometry",this.parameters={radius:e,height:t,radialSegments:r,heightSegments:n,openEnded:i,thetaStart:a,thetaLength:o}}
function CircleGeometry(e,t,r,n)
{Geometry.call(this),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:r,thetaLength:n},this.fromBufferGeometry(new CircleBufferGeometry(e,t,r,n)),this.mergeVertices()}
function CircleBufferGeometry(e,t,r,n)
{BufferGeometry.call(this),this.type="CircleBufferGeometry",this.parameters={radius:e,segments:t,thetaStart:r,thetaLength:n},e=e||1,t=void 0!==t?Math.max(3,t):8,r=void 0!==r?r:0,n=void 0!==n?n:2*Math.PI;var i,a,o=[],s=[],l=[],c=[],h=new Vector3,u=new Vector2;for(s.push(0,0,0),l.push(0,0,1),c.push(.5,.5),a=0,i=3;a<=t;a++,i+=3)
{var d=r+a/t*n;h.x=e*Math.cos(d),h.y=e*Math.sin(d),s.push(h.x,h.y,h.z),l.push(0,0,1),u.x=(s[i]/e+1)/2,u.y=(s[i+1]/e+1)/2,c.push(u.x,u.y)}
for(i=1;i<=t;i++)o.push(i,i+1,0);this.setIndex(o),this.setAttribute("position",new Float32BufferAttribute(s,3)),this.setAttribute("normal",new Float32BufferAttribute(l,3)),this.setAttribute("uv",new Float32BufferAttribute(c,2))}
TextGeometry.prototype=Object.create(Geometry.prototype),TextGeometry.prototype.constructor=TextGeometry,TextBufferGeometry.prototype=Object.create(ExtrudeBufferGeometry.prototype),TextBufferGeometry.prototype.constructor=TextBufferGeometry,SphereGeometry.prototype=Object.create(Geometry.prototype),SphereGeometry.prototype.constructor=SphereGeometry,SphereBufferGeometry.prototype=Object.create(BufferGeometry.prototype),SphereBufferGeometry.prototype.constructor=SphereBufferGeometry,RingGeometry.prototype=Object.create(Geometry.prototype),RingGeometry.prototype.constructor=RingGeometry,RingBufferGeometry.prototype=Object.create(BufferGeometry.prototype),RingBufferGeometry.prototype.constructor=RingBufferGeometry,LatheGeometry.prototype=Object.create(Geometry.prototype),LatheGeometry.prototype.constructor=LatheGeometry,LatheBufferGeometry.prototype=Object.create(BufferGeometry.prototype),LatheBufferGeometry.prototype.constructor=LatheBufferGeometry,ShapeGeometry.prototype=Object.create(Geometry.prototype),ShapeGeometry.prototype.constructor=ShapeGeometry,ShapeGeometry.prototype.toJSON=function()
{var e=Geometry.prototype.toJSON.call(this);return toJSON$1(this.parameters.shapes,e)},ShapeBufferGeometry.prototype=Object.create(BufferGeometry.prototype),ShapeBufferGeometry.prototype.constructor=ShapeBufferGeometry,ShapeBufferGeometry.prototype.toJSON=function()
{var e=BufferGeometry.prototype.toJSON.call(this);return toJSON$1(this.parameters.shapes,e)},EdgesGeometry.prototype=Object.create(BufferGeometry.prototype),EdgesGeometry.prototype.constructor=EdgesGeometry,CylinderGeometry.prototype=Object.create(Geometry.prototype),CylinderGeometry.prototype.constructor=CylinderGeometry,CylinderBufferGeometry.prototype=Object.create(BufferGeometry.prototype),CylinderBufferGeometry.prototype.constructor=CylinderBufferGeometry,ConeGeometry.prototype=Object.create(CylinderGeometry.prototype),ConeGeometry.prototype.constructor=ConeGeometry,ConeBufferGeometry.prototype=Object.create(CylinderBufferGeometry.prototype),ConeBufferGeometry.prototype.constructor=ConeBufferGeometry,CircleGeometry.prototype=Object.create(Geometry.prototype),CircleGeometry.prototype.constructor=CircleGeometry,CircleBufferGeometry.prototype=Object.create(BufferGeometry.prototype),CircleBufferGeometry.prototype.constructor=CircleBufferGeometry;var Geometries=Object.freeze({__proto__:null,WireframeGeometry:WireframeGeometry,ParametricGeometry:ParametricGeometry,ParametricBufferGeometry:ParametricBufferGeometry,TetrahedronGeometry:TetrahedronGeometry,TetrahedronBufferGeometry:TetrahedronBufferGeometry,OctahedronGeometry:OctahedronGeometry,OctahedronBufferGeometry:OctahedronBufferGeometry,IcosahedronGeometry:IcosahedronGeometry,IcosahedronBufferGeometry:IcosahedronBufferGeometry,DodecahedronGeometry:DodecahedronGeometry,DodecahedronBufferGeometry:DodecahedronBufferGeometry,PolyhedronGeometry:PolyhedronGeometry,PolyhedronBufferGeometry:PolyhedronBufferGeometry,TubeGeometry:TubeGeometry,TubeBufferGeometry:TubeBufferGeometry,TorusKnotGeometry:TorusKnotGeometry,TorusKnotBufferGeometry:TorusKnotBufferGeometry,TorusGeometry:TorusGeometry,TorusBufferGeometry:TorusBufferGeometry,TextGeometry:TextGeometry,TextBufferGeometry:TextBufferGeometry,SphereGeometry:SphereGeometry,SphereBufferGeometry:SphereBufferGeometry,RingGeometry:RingGeometry,RingBufferGeometry:RingBufferGeometry,PlaneGeometry:PlaneGeometry,PlaneBufferGeometry:PlaneBufferGeometry,LatheGeometry:LatheGeometry,LatheBufferGeometry:LatheBufferGeometry,ShapeGeometry:ShapeGeometry,ShapeBufferGeometry:ShapeBufferGeometry,ExtrudeGeometry:ExtrudeGeometry,ExtrudeBufferGeometry:ExtrudeBufferGeometry,EdgesGeometry:EdgesGeometry,ConeGeometry:ConeGeometry,ConeBufferGeometry:ConeBufferGeometry,CylinderGeometry:CylinderGeometry,CylinderBufferGeometry:CylinderBufferGeometry,CircleGeometry:CircleGeometry,CircleBufferGeometry:CircleBufferGeometry,BoxGeometry:BoxGeometry,BoxBufferGeometry:BoxBufferGeometry});function ShadowMaterial(e)
{Material.call(this),this.type="ShadowMaterial",this.color=new Color(0),this.transparent=!0,this.setValues(e)}
function RawShaderMaterial(e)
{ShaderMaterial.call(this,e),this.type="RawShaderMaterial"}
function MeshStandardMaterial(e)
{Material.call(this),this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new Color(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Color(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=TangentSpaceNormalMap,this.normalScale=new Vector2(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.skinning=!1,this.morphTargets=!1,this.morphNormals=!1,this.setValues(e)}
function MeshPhysicalMaterial(e)
{MeshStandardMaterial.call(this),this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.reflectivity=.5,this.clearcoat=0,this.clearcoatRoughness=0,this.sheen=null,this.clearcoatNormalScale=new Vector2(1,1),this.clearcoatNormalMap=null,this.transparency=0,this.setValues(e)}
function MeshPhongMaterial(e)
{Material.call(this),this.type="MeshPhongMaterial",this.color=new Color(16777215),this.specular=new Color(1118481),this.shininess=30,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Color(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=TangentSpaceNormalMap,this.normalScale=new Vector2(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=MultiplyOperation,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.skinning=!1,this.morphTargets=!1,this.morphNormals=!1,this.setValues(e)}
function MeshToonMaterial(e)
{Material.call(this),this.defines={TOON:""},this.type="MeshToonMaterial",this.color=new Color(16777215),this.specular=new Color(1118481),this.shininess=30,this.map=null,this.gradientMap=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Color(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=TangentSpaceNormalMap,this.normalScale=new Vector2(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.skinning=!1,this.morphTargets=!1,this.morphNormals=!1,this.setValues(e)}
function MeshNormalMaterial(e)
{Material.call(this),this.type="MeshNormalMaterial",this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=TangentSpaceNormalMap,this.normalScale=new Vector2(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.skinning=!1,this.morphTargets=!1,this.morphNormals=!1,this.setValues(e)}
function MeshLambertMaterial(e)
{Material.call(this),this.type="MeshLambertMaterial",this.color=new Color(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Color(0),this.emissiveIntensity=1,this.emissiveMap=null,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=MultiplyOperation,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.skinning=!1,this.morphTargets=!1,this.morphNormals=!1,this.setValues(e)}
function MeshMatcapMaterial(e)
{Material.call(this),this.defines={MATCAP:""},this.type="MeshMatcapMaterial",this.color=new Color(16777215),this.matcap=null,this.map=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=TangentSpaceNormalMap,this.normalScale=new Vector2(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.alphaMap=null,this.skinning=!1,this.morphTargets=!1,this.morphNormals=!1,this.setValues(e)}
function LineDashedMaterial(e)
{LineBasicMaterial.call(this),this.type="LineDashedMaterial",this.scale=1,this.dashSize=3,this.gapSize=1,this.setValues(e)}
ShadowMaterial.prototype=Object.create(Material.prototype),ShadowMaterial.prototype.constructor=ShadowMaterial,ShadowMaterial.prototype.isShadowMaterial=!0,ShadowMaterial.prototype.copy=function(e)
{return Material.prototype.copy.call(this,e),this.color.copy(e.color),this},RawShaderMaterial.prototype=Object.create(ShaderMaterial.prototype),RawShaderMaterial.prototype.constructor=RawShaderMaterial,RawShaderMaterial.prototype.isRawShaderMaterial=!0,MeshStandardMaterial.prototype=Object.create(Material.prototype),MeshStandardMaterial.prototype.constructor=MeshStandardMaterial,MeshStandardMaterial.prototype.isMeshStandardMaterial=!0,MeshStandardMaterial.prototype.copy=function(e)
{return Material.prototype.copy.call(this,e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapIntensity=e.envMapIntensity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.skinning=e.skinning,this.morphTargets=e.morphTargets,this.morphNormals=e.morphNormals,this},MeshPhysicalMaterial.prototype=Object.create(MeshStandardMaterial.prototype),MeshPhysicalMaterial.prototype.constructor=MeshPhysicalMaterial,MeshPhysicalMaterial.prototype.isMeshPhysicalMaterial=!0,MeshPhysicalMaterial.prototype.copy=function(e)
{return MeshStandardMaterial.prototype.copy.call(this,e),this.defines={STANDARD:"",PHYSICAL:""},this.reflectivity=e.reflectivity,this.clearcoat=e.clearcoat,this.clearcoatRoughness=e.clearcoatRoughness,e.sheen?this.sheen=(this.sheen||new Color).copy(e.sheen):this.sheen=null,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.transparency=e.transparency,this},MeshPhongMaterial.prototype=Object.create(Material.prototype),MeshPhongMaterial.prototype.constructor=MeshPhongMaterial,MeshPhongMaterial.prototype.isMeshPhongMaterial=!0,MeshPhongMaterial.prototype.copy=function(e)
{return Material.prototype.copy.call(this,e),this.color.copy(e.color),this.specular.copy(e.specular),this.shininess=e.shininess,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.skinning=e.skinning,this.morphTargets=e.morphTargets,this.morphNormals=e.morphNormals,this},MeshToonMaterial.prototype=Object.create(Material.prototype),MeshToonMaterial.prototype.constructor=MeshToonMaterial,MeshToonMaterial.prototype.isMeshToonMaterial=!0,MeshToonMaterial.prototype.copy=function(e)
{return Material.prototype.copy.call(this,e),this.color.copy(e.color),this.specular.copy(e.specular),this.shininess=e.shininess,this.map=e.map,this.gradientMap=e.gradientMap,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.skinning=e.skinning,this.morphTargets=e.morphTargets,this.morphNormals=e.morphNormals,this},MeshNormalMaterial.prototype=Object.create(Material.prototype),MeshNormalMaterial.prototype.constructor=MeshNormalMaterial,MeshNormalMaterial.prototype.isMeshNormalMaterial=!0,MeshNormalMaterial.prototype.copy=function(e)
{return Material.prototype.copy.call(this,e),this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.skinning=e.skinning,this.morphTargets=e.morphTargets,this.morphNormals=e.morphNormals,this},MeshLambertMaterial.prototype=Object.create(Material.prototype),MeshLambertMaterial.prototype.constructor=MeshLambertMaterial,MeshLambertMaterial.prototype.isMeshLambertMaterial=!0,MeshLambertMaterial.prototype.copy=function(e)
{return Material.prototype.copy.call(this,e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.skinning=e.skinning,this.morphTargets=e.morphTargets,this.morphNormals=e.morphNormals,this},MeshMatcapMaterial.prototype=Object.create(Material.prototype),MeshMatcapMaterial.prototype.constructor=MeshMatcapMaterial,MeshMatcapMaterial.prototype.isMeshMatcapMaterial=!0,MeshMatcapMaterial.prototype.copy=function(e)
{return Material.prototype.copy.call(this,e),this.defines={MATCAP:""},this.color.copy(e.color),this.matcap=e.matcap,this.map=e.map,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.alphaMap=e.alphaMap,this.skinning=e.skinning,this.morphTargets=e.morphTargets,this.morphNormals=e.morphNormals,this},LineDashedMaterial.prototype=Object.create(LineBasicMaterial.prototype),LineDashedMaterial.prototype.constructor=LineDashedMaterial,LineDashedMaterial.prototype.isLineDashedMaterial=!0,LineDashedMaterial.prototype.copy=function(e)
{return LineBasicMaterial.prototype.copy.call(this,e),this.scale=e.scale,this.dashSize=e.dashSize,this.gapSize=e.gapSize,this};var Materials=Object.freeze({__proto__:null,ShadowMaterial:ShadowMaterial,SpriteMaterial:SpriteMaterial,RawShaderMaterial:RawShaderMaterial,ShaderMaterial:ShaderMaterial,PointsMaterial:PointsMaterial,MeshPhysicalMaterial:MeshPhysicalMaterial,MeshStandardMaterial:MeshStandardMaterial,MeshPhongMaterial:MeshPhongMaterial,MeshToonMaterial:MeshToonMaterial,MeshNormalMaterial:MeshNormalMaterial,MeshLambertMaterial:MeshLambertMaterial,MeshDepthMaterial:MeshDepthMaterial,MeshDistanceMaterial:MeshDistanceMaterial,MeshBasicMaterial:MeshBasicMaterial,MeshMatcapMaterial:MeshMatcapMaterial,LineDashedMaterial:LineDashedMaterial,LineBasicMaterial:LineBasicMaterial,Material:Material}),AnimationUtils={arraySlice:function(e,t,r)
{return AnimationUtils.isTypedArray(e)?new e.constructor(e.subarray(t,void 0!==r?r:e.length)):e.slice(t,r)},convertArray:function(e,t,r)
{return!e||!r&&e.constructor===t?e:"number"==typeof t.BYTES_PER_ELEMENT?new t(e):Array.prototype.slice.call(e)},isTypedArray:function(e)
{return ArrayBuffer.isView(e)&&!(e instanceof DataView)},getKeyframeOrder:function(e)
{for(var t=e.length,r=new Array(t),n=0;n!==t;++n)r[n]=n;return r.sort(function(t,r)
{return e[t]-e[r]}),r},sortedArray:function(e,t,r)
{for(var n=e.length,i=new e.constructor(n),a=0,o=0;o!==n;++a)
for(var s=r[a]*t,l=0;l!==t;++l)i[o++]=e[s+l];return i},flattenJSON:function(e,t,r,n)
{for(var i=1,a=e[0];void 0!==a&&void 0===a[n];)a=e[i++];if(void 0!==a)
{var o=a[n];if(void 0!==o)
if(Array.isArray(o))
do{void 0!==(o=a[n])&&(t.push(a.time),r.push.apply(r,o)),a=e[i++]}while(void 0!==a);else if(void 0!==o.toArray)
do{void 0!==(o=a[n])&&(t.push(a.time),o.toArray(r,r.length)),a=e[i++]}while(void 0!==a);else do{void 0!==(o=a[n])&&(t.push(a.time),r.push(o)),a=e[i++]}while(void 0!==a)}},subclip:function(e,t,r,n,i)
{i=i||30;var a=e.clone();a.name=t;for(var o=[],s=0;s<a.tracks.length;++s)
{for(var l=a.tracks[s],c=l.getValueSize(),h=[],u=[],d=0;d<l.times.length;++d)
{var p=l.times[d]*i;if(!(p<r||p>=n))
{h.push(l.times[d]);for(var m=0;m<c;++m)u.push(l.values[d*c+m])}}
0!==h.length&&(l.times=AnimationUtils.convertArray(h,l.times.constructor),l.values=AnimationUtils.convertArray(u,l.values.constructor),o.push(l))}
a.tracks=o;var f=1/0;for(s=0;s<a.tracks.length;++s)f>a.tracks[s].times[0]&&(f=a.tracks[s].times[0]);for(s=0;s<a.tracks.length;++s)a.tracks[s].shift(-1*f);return a.resetDuration(),a}};function Interpolant(e,t,r,n)
{this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=void 0!==n?n:new t.constructor(r),this.sampleValues=t,this.valueSize=r}
function CubicInterpolant(e,t,r,n)
{Interpolant.call(this,e,t,r,n),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0}
function LinearInterpolant(e,t,r,n)
{Interpolant.call(this,e,t,r,n)}
function DiscreteInterpolant(e,t,r,n)
{Interpolant.call(this,e,t,r,n)}
function KeyframeTrack(e,t,r,n)
{if(void 0===e)throw new Error("THREE.KeyframeTrack: track name is undefined");if(void 0===t||0===t.length)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=AnimationUtils.convertArray(t,this.TimeBufferType),this.values=AnimationUtils.convertArray(r,this.ValueBufferType),this.setInterpolation(n||this.DefaultInterpolation)}
function BooleanKeyframeTrack(e,t,r)
{KeyframeTrack.call(this,e,t,r)}
function ColorKeyframeTrack(e,t,r,n)
{KeyframeTrack.call(this,e,t,r,n)}
function NumberKeyframeTrack(e,t,r,n)
{KeyframeTrack.call(this,e,t,r,n)}
function QuaternionLinearInterpolant(e,t,r,n)
{Interpolant.call(this,e,t,r,n)}
function QuaternionKeyframeTrack(e,t,r,n)
{KeyframeTrack.call(this,e,t,r,n)}
function StringKeyframeTrack(e,t,r,n)
{KeyframeTrack.call(this,e,t,r,n)}
function VectorKeyframeTrack(e,t,r,n)
{KeyframeTrack.call(this,e,t,r,n)}
function AnimationClip(e,t,r)
{this.name=e,this.tracks=r,this.duration=void 0!==t?t:-1,this.uuid=MathUtils.generateUUID(),this.duration<0&&this.resetDuration()}
function getTrackTypeForValueTypeName(e)
{switch(e.toLowerCase())
{case "scalar":case "double":case "float":case "number":case "integer":return NumberKeyframeTrack;case "vector":case "vector2":case "vector3":case "vector4":return VectorKeyframeTrack;case "color":return ColorKeyframeTrack;case "quaternion":return QuaternionKeyframeTrack;case "bool":case "boolean":return BooleanKeyframeTrack;case "string":return StringKeyframeTrack}
throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+e)}
function parseKeyframeTrack(e)
{if(void 0===e.type)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");var t=getTrackTypeForValueTypeName(e.type);if(void 0===e.times)
{var r=[],n=[];AnimationUtils.flattenJSON(e.keys,r,n,"value"),e.times=r,e.values=n}
return void 0!==t.parse?t.parse(e):new t(e.name,e.times,e.values,e.interpolation)}
Object.assign(Interpolant.prototype,{evaluate:function(e)
{var t=this.parameterPositions,r=this._cachedIndex,n=t[r],i=t[r-1];e:{t:{var a;r:{n:if(!(e<n))
{for(var o=r+2;;)
{if(void 0===n)
{if(e<i)break n;return r=t.length,this._cachedIndex=r,this.afterEnd_(r-1,e,i)}
if(r===o)break;if(i=n,e<(n=t[++r]))break t}
a=t.length;break r}if(e>=i)break e;var s=t[1];e<s&&(r=2,i=s);for(o=r-2;;)
{if(void 0===i)return this._cachedIndex=0,this.beforeStart_(0,e,n);if(r===o)break;if(n=i,e>=(i=t[--r-1]))break t}
a=r,r=0}
for(;r<a;)
{var l=r+a>>>1;e<t[l]?a=l:r=l+1}
if(n=t[r],void 0===(i=t[r-1]))return this._cachedIndex=0,this.beforeStart_(0,e,n);if(void 0===n)return r=t.length,this._cachedIndex=r,this.afterEnd_(r-1,i,e)}
this._cachedIndex=r,this.intervalChanged_(r,i,n)}
return this.interpolate_(r,i,e,n)},settings:null,DefaultSettings_:{},getSettings_:function()
{return this.settings||this.DefaultSettings_},copySampleValue_:function(e)
{for(var t=this.resultBuffer,r=this.sampleValues,n=this.valueSize,i=e*n,a=0;a!==n;++a)t[a]=r[i+a];return t},interpolate_:function()
{throw new Error("call to abstract method")},intervalChanged_:function(){}}),Object.assign(Interpolant.prototype,{beforeStart_:Interpolant.prototype.copySampleValue_,afterEnd_:Interpolant.prototype.copySampleValue_}),CubicInterpolant.prototype=Object.assign(Object.create(Interpolant.prototype),{constructor:CubicInterpolant,DefaultSettings_:{endingStart:ZeroCurvatureEnding,endingEnd:ZeroCurvatureEnding},intervalChanged_:function(e,t,r)
{var n=this.parameterPositions,i=e-2,a=e+1,o=n[i],s=n[a];if(void 0===o)switch(this.getSettings_().endingStart)
{case ZeroSlopeEnding:i=e,o=2*t-r;break;case WrapAroundEnding:o=t+n[i=n.length-2]-n[i+1];break;default:i=e,o=r}
if(void 0===s)switch(this.getSettings_().endingEnd)
{case ZeroSlopeEnding:a=e,s=2*r-t;break;case WrapAroundEnding:a=1,s=r+n[1]-n[0];break;default:a=e-1,s=t}
var l=.5*(r-t),c=this.valueSize;this._weightPrev=l/(t-o),this._weightNext=l/(s-r),this._offsetPrev=i*c,this._offsetNext=a*c},interpolate_:function(e,t,r,n)
{for(var i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,l=s-o,c=this._offsetPrev,h=this._offsetNext,u=this._weightPrev,d=this._weightNext,p=(r-t)/(n-t),m=p*p,f=m*p,g=-u*f+2*u*m-u*p,v=(1+u)*f+(-1.5-2*u)*m+(-.5+u)*p+1,y=(-1-d)*f+(1.5+d)*m+.5*p,_=d*f-d*m,b=0;b!==o;++b)i[b]=g*a[c+b]+v*a[l+b]+y*a[s+b]+_*a[h+b];return i}}),LinearInterpolant.prototype=Object.assign(Object.create(Interpolant.prototype),{constructor:LinearInterpolant,interpolate_:function(e,t,r,n)
{for(var i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,l=s-o,c=(r-t)/(n-t),h=1-c,u=0;u!==o;++u)i[u]=a[l+u]*h+a[s+u]*c;return i}}),DiscreteInterpolant.prototype=Object.assign(Object.create(Interpolant.prototype),{constructor:DiscreteInterpolant,interpolate_:function(e)
{return this.copySampleValue_(e-1)}}),Object.assign(KeyframeTrack,{toJSON:function(e)
{var t,r=e.constructor;if(void 0!==r.toJSON)t=r.toJSON(e);else{t={name:e.name,times:AnimationUtils.convertArray(e.times,Array),values:AnimationUtils.convertArray(e.values,Array)};var n=e.getInterpolation();n!==e.DefaultInterpolation&&(t.interpolation=n)}
return t.type=e.ValueTypeName,t}}),Object.assign(KeyframeTrack.prototype,{constructor:KeyframeTrack,TimeBufferType:Float32Array,ValueBufferType:Float32Array,DefaultInterpolation:InterpolateLinear,InterpolantFactoryMethodDiscrete:function(e)
{return new DiscreteInterpolant(this.times,this.values,this.getValueSize(),e)},InterpolantFactoryMethodLinear:function(e)
{return new LinearInterpolant(this.times,this.values,this.getValueSize(),e)},InterpolantFactoryMethodSmooth:function(e)
{return new CubicInterpolant(this.times,this.values,this.getValueSize(),e)},setInterpolation:function(e)
{var t;switch(e)
{case InterpolateDiscrete:t=this.InterpolantFactoryMethodDiscrete;break;case InterpolateLinear:t=this.InterpolantFactoryMethodLinear;break;case InterpolateSmooth:t=this.InterpolantFactoryMethodSmooth}
if(void 0===t)
{var r="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(void 0===this.createInterpolant)
{if(e===this.DefaultInterpolation)throw new Error(r);this.setInterpolation(this.DefaultInterpolation)}
return console.warn("THREE.KeyframeTrack:",r),this}
return this.createInterpolant=t,this},getInterpolation:function()
{switch(this.createInterpolant)
{case this.InterpolantFactoryMethodDiscrete:return InterpolateDiscrete;case this.InterpolantFactoryMethodLinear:return InterpolateLinear;case this.InterpolantFactoryMethodSmooth:return InterpolateSmooth}},getValueSize:function()
{return this.values.length/this.times.length},shift:function(e)
{if(0!==e)
for(var t=this.times,r=0,n=t.length;r!==n;++r)t[r]+=e;return this},scale:function(e)
{if(1!==e)
for(var t=this.times,r=0,n=t.length;r!==n;++r)t[r]*=e;return this},trim:function(e,t)
{for(var r=this.times,n=r.length,i=0,a=n-1;i!==n&&r[i]<e;)++i;for(;-1!==a&&r[a]>t;)--a;if(++a,0!==i||a!==n)
{i>=a&&(i=(a=Math.max(a,1))-1);var o=this.getValueSize();this.times=AnimationUtils.arraySlice(r,i,a),this.values=AnimationUtils.arraySlice(this.values,i*o,a*o)}
return this},validate:function()
{var e=!0,t=this.getValueSize();t-Math.floor(t)!=0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);var r=this.times,n=this.values,i=r.length;0===i&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);for(var a=null,o=0;o!==i;o++)
{var s=r[o];if("number"==typeof s&&isNaN(s))
{console.error("THREE.KeyframeTrack: Time is not a valid number.",this,o,s),e=!1;break}
if(null!==a&&a>s)
{console.error("THREE.KeyframeTrack: Out of order keys.",this,o,s,a),e=!1;break}
a=s}
if(void 0!==n&&AnimationUtils.isTypedArray(n))
{o=0;for(var l=n.length;o!==l;++o)
{var c=n[o];if(isNaN(c))
{console.error("THREE.KeyframeTrack: Value is not a valid number.",this,o,c),e=!1;break}}}
return e},optimize:function()
{for(var e=AnimationUtils.arraySlice(this.times),t=AnimationUtils.arraySlice(this.values),r=this.getValueSize(),n=this.getInterpolation()===InterpolateSmooth,i=1,a=e.length-1,o=1;o<a;++o)
{var s=!1,l=e[o];if(l!==e[o+1]&&(1!==o||l!==l[0]))
if(n)s=!0;else for(var c=o*r,h=c-r,u=c+r,d=0;d!==r;++d)
{var p=t[c+d];if(p!==t[h+d]||p!==t[u+d])
{s=!0;break}}
if(s)
{if(o!==i)
{e[i]=e[o];var m=o*r,f=i*r;for(d=0;d!==r;++d)t[f+d]=t[m+d]}++i}}
if(a>0)
{e[i]=e[a];for(m=a*r,f=i*r,d=0;d!==r;++d)t[f+d]=t[m+d];++i}
return i!==e.length?(this.times=AnimationUtils.arraySlice(e,0,i),this.values=AnimationUtils.arraySlice(t,0,i*r)):(this.times=e,this.values=t),this},clone:function()
{var e=AnimationUtils.arraySlice(this.times,0),t=AnimationUtils.arraySlice(this.values,0),r=new(0,this.constructor)(this.name,e,t);return r.createInterpolant=this.createInterpolant,r}}),BooleanKeyframeTrack.prototype=Object.assign(Object.create(KeyframeTrack.prototype),{constructor:BooleanKeyframeTrack,ValueTypeName:"bool",ValueBufferType:Array,DefaultInterpolation:InterpolateDiscrete,InterpolantFactoryMethodLinear:void 0,InterpolantFactoryMethodSmooth:void 0}),ColorKeyframeTrack.prototype=Object.assign(Object.create(KeyframeTrack.prototype),{constructor:ColorKeyframeTrack,ValueTypeName:"color"}),NumberKeyframeTrack.prototype=Object.assign(Object.create(KeyframeTrack.prototype),{constructor:NumberKeyframeTrack,ValueTypeName:"number"}),QuaternionLinearInterpolant.prototype=Object.assign(Object.create(Interpolant.prototype),{constructor:QuaternionLinearInterpolant,interpolate_:function(e,t,r,n)
{for(var i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,l=(r-t)/(n-t),c=s+o;s!==c;s+=4)Quaternion.slerpFlat(i,0,a,s-o,a,s,l);return i}}),QuaternionKeyframeTrack.prototype=Object.assign(Object.create(KeyframeTrack.prototype),{constructor:QuaternionKeyframeTrack,ValueTypeName:"quaternion",DefaultInterpolation:InterpolateLinear,InterpolantFactoryMethodLinear:function(e)
{return new QuaternionLinearInterpolant(this.times,this.values,this.getValueSize(),e)},InterpolantFactoryMethodSmooth:void 0}),StringKeyframeTrack.prototype=Object.assign(Object.create(KeyframeTrack.prototype),{constructor:StringKeyframeTrack,ValueTypeName:"string",ValueBufferType:Array,DefaultInterpolation:InterpolateDiscrete,InterpolantFactoryMethodLinear:void 0,InterpolantFactoryMethodSmooth:void 0}),VectorKeyframeTrack.prototype=Object.assign(Object.create(KeyframeTrack.prototype),{constructor:VectorKeyframeTrack,ValueTypeName:"vector"}),Object.assign(AnimationClip,{parse:function(e)
{for(var t=[],r=e.tracks,n=1/(e.fps||1),i=0,a=r.length;i!==a;++i)t.push(parseKeyframeTrack(r[i]).scale(n));return new AnimationClip(e.name,e.duration,t)},toJSON:function(e)
{for(var t=[],r=e.tracks,n={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid},i=0,a=r.length;i!==a;++i)t.push(KeyframeTrack.toJSON(r[i]));return n},CreateFromMorphTargetSequence:function(e,t,r,n)
{for(var i=t.length,a=[],o=0;o<i;o++)
{var s=[],l=[];s.push((o+i-1)%i,o,(o+1)%i),l.push(0,1,0);var c=AnimationUtils.getKeyframeOrder(s);s=AnimationUtils.sortedArray(s,1,c),l=AnimationUtils.sortedArray(l,1,c),n||0!==s[0]||(s.push(i),l.push(l[0])),a.push(new NumberKeyframeTrack(".morphTargetInfluences["+t[o].name+"]",s,l).scale(1/r))}
return new AnimationClip(e,-1,a)},findByName:function(e,t)
{var r=e;if(!Array.isArray(e))
{var n=e;r=n.geometry&&n.geometry.animations||n.animations}
for(var i=0;i<r.length;i++)
if(r[i].name===t)return r[i];return null},CreateClipsFromMorphTargetSequences:function(e,t,r)
{for(var n={},i=/^([\w-]*?)([\d]+)$/,a=0,o=e.length;a<o;a++)
{var s=e[a],l=s.name.match(i);if(l&&l.length>1)
{var c=n[u=l[1]];c||(n[u]=c=[]),c.push(s)}}
var h=[];for(var u in n)h.push(AnimationClip.CreateFromMorphTargetSequence(u,n[u],t,r));return h},parseAnimation:function(e,t)
{if(!e)return console.error("THREE.AnimationClip: No animation in JSONLoader data."),null;for(var r=function(e,t,r,n,i)
{if(0!==r.length)
{var a=[],o=[];AnimationUtils.flattenJSON(r,a,o,n),0!==a.length&&i.push(new e(t,a,o))}},n=[],i=e.name||"default",a=e.length||-1,o=e.fps||30,s=e.hierarchy||[],l=0;l<s.length;l++)
{var c=s[l].keys;if(c&&0!==c.length)
if(c[0].morphTargets)
{for(var h={},u=0;u<c.length;u++)
if(c[u].morphTargets)
for(var d=0;d<c[u].morphTargets.length;d++)h[c[u].morphTargets[d]]=-1;for(var p in h)
{var m=[],f=[];for(d=0;d!==c[u].morphTargets.length;++d)
{var g=c[u];m.push(g.time),f.push(g.morphTarget===p?1:0)}
n.push(new NumberKeyframeTrack(".morphTargetInfluence["+p+"]",m,f))}
a=h.length*(o||1)}
else{var v=".bones["+t[l].name+"]";r(VectorKeyframeTrack,v+".position",c,"pos",n),r(QuaternionKeyframeTrack,v+".quaternion",c,"rot",n),r(VectorKeyframeTrack,v+".scale",c,"scl",n)}}
return 0===n.length?null:new AnimationClip(i,a,n)}}),Object.assign(AnimationClip.prototype,{resetDuration:function()
{for(var e=0,t=0,r=this.tracks.length;t!==r;++t)
{var n=this.tracks[t];e=Math.max(e,n.times[n.times.length-1])}
return this.duration=e,this},trim:function()
{for(var e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this},validate:function()
{for(var e=!0,t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e},optimize:function()
{for(var e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this},clone:function()
{for(var e=[],t=0;t<this.tracks.length;t++)e.push(this.tracks[t].clone());return new AnimationClip(this.name,this.duration,e)}});var Cache={enabled:!1,files:{},add:function(e,t)
{!1!==this.enabled&&(this.files[e]=t)},get:function(e)
{if(!1!==this.enabled)return this.files[e]},remove:function(e)
{delete this.files[e]},clear:function()
{this.files={}}};function LoadingManager(e,t,r)
{var n=this,i=!1,a=0,o=0,s=void 0,l=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=r,this.itemStart=function(e)
{o++,!1===i&&void 0!==n.onStart&&n.onStart(e,a,o),i=!0},this.itemEnd=function(e)
{a++,void 0!==n.onProgress&&n.onProgress(e,a,o),a===o&&(i=!1,void 0!==n.onLoad&&n.onLoad())},this.itemError=function(e)
{void 0!==n.onError&&n.onError(e)},this.resolveURL=function(e)
{return s?s(e):e},this.setURLModifier=function(e)
{return s=e,this},this.addHandler=function(e,t)
{return l.push(e,t),this},this.removeHandler=function(e)
{var t=l.indexOf(e);return-1!==t&&l.splice(t,2),this},this.getHandler=function(e)
{for(var t=0,r=l.length;t<r;t+=2)
{var n=l[t],i=l[t+1];if(n.global&&(n.lastIndex=0),n.test(e))return i}
return null}}
var DefaultLoadingManager=new LoadingManager;function Loader(e)
{this.manager=void 0!==e?e:DefaultLoadingManager,this.crossOrigin="anonymous",this.path="",this.resourcePath=""}
Object.assign(Loader.prototype,{load:function(){},parse:function(){},setCrossOrigin:function(e)
{return this.crossOrigin=e,this},setPath:function(e)
{return this.path=e,this},setResourcePath:function(e)
{return this.resourcePath=e,this}});var loading={};function FileLoader(e)
{Loader.call(this,e)}
function AnimationLoader(e)
{Loader.call(this,e)}
function CompressedTextureLoader(e)
{Loader.call(this,e)}
function DataTextureLoader(e)
{Loader.call(this,e)}
function ImageLoader(e)
{Loader.call(this,e)}
function CubeTextureLoader(e)
{Loader.call(this,e)}
function TextureLoader(e)
{Loader.call(this,e)}
function Curve()
{this.type="Curve",this.arcLengthDivisions=200}
function EllipseCurve(e,t,r,n,i,a,o,s)
{Curve.call(this),this.type="EllipseCurve",this.aX=e||0,this.aY=t||0,this.xRadius=r||1,this.yRadius=n||1,this.aStartAngle=i||0,this.aEndAngle=a||2*Math.PI,this.aClockwise=o||!1,this.aRotation=s||0}
function ArcCurve(e,t,r,n,i,a)
{EllipseCurve.call(this,e,t,r,r,n,i,a),this.type="ArcCurve"}
function CubicPoly()
{var e=0,t=0,r=0,n=0;function i(i,a,o,s)
{e=i,t=o,r=-3*i+3*a-2*o-s,n=2*i-2*a+o+s}
return{initCatmullRom:function(e,t,r,n,a)
{i(t,r,a*(r-e),a*(n-t))},initNonuniformCatmullRom:function(e,t,r,n,a,o,s)
{var l=(t-e)/a-(r-e)/(a+o)+(r-t)/o,c=(r-t)/o-(n-t)/(o+s)+(n-r)/s;i(t,r,l*=o,c*=o)},calc:function(i)
{var a=i*i;return e+t*i+r*a+n*(a*i)}}}
FileLoader.prototype=Object.assign(Object.create(Loader.prototype),{constructor:FileLoader,load:function(e,t,r,n)
{void 0===e&&(e=""),void 0!==this.path&&(e=this.path+e),e=this.manager.resolveURL(e);var i=this,a=Cache.get(e);if(void 0!==a)return i.manager.itemStart(e),setTimeout(function()
{t&&t(a),i.manager.itemEnd(e)},0),a;if(void 0===loading[e])
{var o=e.match(/^data:(.*?)(;base64)?,(.*)$/);if(o)
{var s=o[1],l=!!o[2],c=o[3];c=decodeURIComponent(c),l&&(c=atob(c));try
{var h,u=(this.responseType||"").toLowerCase();switch(u)
{case "arraybuffer":case "blob":for(var d=new Uint8Array(c.length),p=0;p<c.length;p++)d[p]=c.charCodeAt(p);h="blob"===u?new Blob([d.buffer],{type:s}):d.buffer;break;case "document":var m=new DOMParser;h=m.parseFromString(c,s);break;case "json":h=JSON.parse(c);break;default:h=c}
setTimeout(function()
{t&&t(h),i.manager.itemEnd(e)},0)}
catch(t)
{setTimeout(function()
{n&&n(t),i.manager.itemError(e),i.manager.itemEnd(e)},0)}}
else{loading[e]=[],loading[e].push({onLoad:t,onProgress:r,onError:n});var f=new XMLHttpRequest;for(var g in f.open("GET",e,!0),f.addEventListener("load",function(t)
{var r=this.response,n=loading[e];if(delete loading[e],200===this.status||0===this.status)
{0===this.status&&console.warn("THREE.FileLoader: HTTP Status 0 received."),Cache.add(e,r);for(var a=0,o=n.length;a<o;a++)
{(s=n[a]).onLoad&&s.onLoad(r)}
i.manager.itemEnd(e)}
else{for(a=0,o=n.length;a<o;a++)
{var s;(s=n[a]).onError&&s.onError(t)}
i.manager.itemError(e),i.manager.itemEnd(e)}},!1),f.addEventListener("progress",function(t)
{for(var r=loading[e],n=0,i=r.length;n<i;n++)
{var a=r[n];a.onProgress&&a.onProgress(t)}},!1),f.addEventListener("error",function(t)
{var r=loading[e];delete loading[e];for(var n=0,a=r.length;n<a;n++)
{var o=r[n];o.onError&&o.onError(t)}
i.manager.itemError(e),i.manager.itemEnd(e)},!1),f.addEventListener("abort",function(t)
{var r=loading[e];delete loading[e];for(var n=0,a=r.length;n<a;n++)
{var o=r[n];o.onError&&o.onError(t)}
i.manager.itemError(e),i.manager.itemEnd(e)},!1),void 0!==this.responseType&&(f.responseType=this.responseType),void 0!==this.withCredentials&&(f.withCredentials=this.withCredentials),f.overrideMimeType&&f.overrideMimeType(void 0!==this.mimeType?this.mimeType:"text/plain"),this.requestHeader)f.setRequestHeader(g,this.requestHeader[g]);f.send(null)}
return i.manager.itemStart(e),f}
loading[e].push({onLoad:t,onProgress:r,onError:n})},setResponseType:function(e)
{return this.responseType=e,this},setWithCredentials:function(e)
{return this.withCredentials=e,this},setMimeType:function(e)
{return this.mimeType=e,this},setRequestHeader:function(e)
{return this.requestHeader=e,this}}),AnimationLoader.prototype=Object.assign(Object.create(Loader.prototype),{constructor:AnimationLoader,load:function(e,t,r,n)
{var i=this,a=new FileLoader(i.manager);a.setPath(i.path),a.load(e,function(e)
{t(i.parse(JSON.parse(e)))},r,n)},parse:function(e)
{for(var t=[],r=0;r<e.length;r++)
{var n=AnimationClip.parse(e[r]);t.push(n)}
return t}}),CompressedTextureLoader.prototype=Object.assign(Object.create(Loader.prototype),{constructor:CompressedTextureLoader,load:function(e,t,r,n)
{var i=this,a=[],o=new CompressedTexture;o.image=a;var s=new FileLoader(this.manager);function l(l)
{s.load(e[l],function(e)
{var r=i.parse(e,!0);a[l]={width:r.width,height:r.height,format:r.format,mipmaps:r.mipmaps},6===(c+=1)&&(1===r.mipmapCount&&(o.minFilter=LinearFilter),o.format=r.format,o.needsUpdate=!0,t&&t(o))},r,n)}
if(s.setPath(this.path),s.setResponseType("arraybuffer"),Array.isArray(e))
for(var c=0,h=0,u=e.length;h<u;++h)l(h);else s.load(e,function(e)
{var r=i.parse(e,!0);if(r.isCubemap)
for(var n=r.mipmaps.length/r.mipmapCount,s=0;s<n;s++)
{a[s]={mipmaps:[]};for(var l=0;l<r.mipmapCount;l++)a[s].mipmaps.push(r.mipmaps[s*r.mipmapCount+l]),a[s].format=r.format,a[s].width=r.width,a[s].height=r.height}
else o.image.width=r.width,o.image.height=r.height,o.mipmaps=r.mipmaps;1===r.mipmapCount&&(o.minFilter=LinearFilter),o.format=r.format,o.needsUpdate=!0,t&&t(o)},r,n);return o}}),DataTextureLoader.prototype=Object.assign(Object.create(Loader.prototype),{constructor:DataTextureLoader,load:function(e,t,r,n)
{var i=this,a=new DataTexture,o=new FileLoader(this.manager);return o.setResponseType("arraybuffer"),o.setPath(this.path),o.load(e,function(e)
{var r=i.parse(e);r&&(void 0!==r.image?a.image=r.image:void 0!==r.data&&(a.image.width=r.width,a.image.height=r.height,a.image.data=r.data),a.wrapS=void 0!==r.wrapS?r.wrapS:ClampToEdgeWrapping,a.wrapT=void 0!==r.wrapT?r.wrapT:ClampToEdgeWrapping,a.magFilter=void 0!==r.magFilter?r.magFilter:LinearFilter,a.minFilter=void 0!==r.minFilter?r.minFilter:LinearFilter,a.anisotropy=void 0!==r.anisotropy?r.anisotropy:1,void 0!==r.format&&(a.format=r.format),void 0!==r.type&&(a.type=r.type),void 0!==r.mipmaps&&(a.mipmaps=r.mipmaps,a.minFilter=LinearMipmapLinearFilter),1===r.mipmapCount&&(a.minFilter=LinearFilter),a.needsUpdate=!0,t&&t(a,r))},r,n),a}}),ImageLoader.prototype=Object.assign(Object.create(Loader.prototype),{constructor:ImageLoader,load:function(e,t,r,n)
{void 0!==this.path&&(e=this.path+e),e=this.manager.resolveURL(e);var i=this,a=Cache.get(e);if(void 0!==a)return i.manager.itemStart(e),setTimeout(function()
{t&&t(a),i.manager.itemEnd(e)},0),a;var o=document.createElementNS("http://www.w3.org/1999/xhtml","img");function s()
{o.removeEventListener("load",s,!1),o.removeEventListener("error",l,!1),Cache.add(e,this),t&&t(this),i.manager.itemEnd(e)}
function l(t)
{o.removeEventListener("load",s,!1),o.removeEventListener("error",l,!1),n&&n(t),i.manager.itemError(e),i.manager.itemEnd(e)}
return o.addEventListener("load",s,!1),o.addEventListener("error",l,!1),"data:"!==e.substr(0,5)&&void 0!==this.crossOrigin&&(o.crossOrigin=this.crossOrigin),i.manager.itemStart(e),o.src=e,o}}),CubeTextureLoader.prototype=Object.assign(Object.create(Loader.prototype),{constructor:CubeTextureLoader,load:function(e,t,r,n)
{var i=new CubeTexture,a=new ImageLoader(this.manager);a.setCrossOrigin(this.crossOrigin),a.setPath(this.path);var o=0;function s(r)
{a.load(e[r],function(e)
{i.images[r]=e,6===++o&&(i.needsUpdate=!0,t&&t(i))},void 0,n)}
for(var l=0;l<e.length;++l)s(l);return i}}),TextureLoader.prototype=Object.assign(Object.create(Loader.prototype),{constructor:TextureLoader,load:function(e,t,r,n)
{var i=new Texture,a=new ImageLoader(this.manager);return a.setCrossOrigin(this.crossOrigin),a.setPath(this.path),a.load(e,function(r)
{i.image=r;var n=e.search(/\.jpe?g($|\?)/i)>0||0===e.search(/^data\:image\/jpeg/);i.format=n?RGBFormat:RGBAFormat,i.needsUpdate=!0,void 0!==t&&t(i)},r,n),i}}),Object.assign(Curve.prototype,{getPoint:function()
{return console.warn("THREE.Curve: .getPoint() not implemented."),null},getPointAt:function(e,t)
{var r=this.getUtoTmapping(e);return this.getPoint(r,t)},getPoints:function(e)
{void 0===e&&(e=5);for(var t=[],r=0;r<=e;r++)t.push(this.getPoint(r/e));return t},getSpacedPoints:function(e)
{void 0===e&&(e=5);for(var t=[],r=0;r<=e;r++)t.push(this.getPointAt(r/e));return t},getLength:function()
{var e=this.getLengths();return e[e.length-1]},getLengths:function(e)
{if(void 0===e&&(e=this.arcLengthDivisions),this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;var t,r,n=[],i=this.getPoint(0),a=0;for(n.push(0),r=1;r<=e;r++)a+=(t=this.getPoint(r/e)).distanceTo(i),n.push(a),i=t;return this.cacheArcLengths=n,n},updateArcLengths:function()
{this.needsUpdate=!0,this.getLengths()},getUtoTmapping:function(e,t)
{var r,n=this.getLengths(),i=0,a=n.length;r=t||e*n[a-1];for(var o,s=0,l=a-1;s<=l;)
if((o=n[i=Math.floor(s+(l-s)/2)]-r)<0)s=i+1;else{if(!(o>0))
{l=i;break}
l=i-1}if(n[i=l]===r)return i/(a-1);var c=n[i];return(i+(r-c)/(n[i+1]-c))/(a-1)},getTangent:function(e)
{var t=e-1e-4,r=e+1e-4;t<0&&(t=0),r>1&&(r=1);var n=this.getPoint(t);return this.getPoint(r).clone().sub(n).normalize()},getTangentAt:function(e)
{var t=this.getUtoTmapping(e);return this.getTangent(t)},computeFrenetFrames:function(e,t)
{var r,n,i,a=new Vector3,o=[],s=[],l=[],c=new Vector3,h=new Matrix4;for(r=0;r<=e;r++)n=r/e,o[r]=this.getTangentAt(n),o[r].normalize();s[0]=new Vector3,l[0]=new Vector3;var u=Number.MAX_VALUE,d=Math.abs(o[0].x),p=Math.abs(o[0].y),m=Math.abs(o[0].z);for(d<=u&&(u=d,a.set(1,0,0)),p<=u&&(u=p,a.set(0,1,0)),m<=u&&a.set(0,0,1),c.crossVectors(o[0],a).normalize(),s[0].crossVectors(o[0],c),l[0].crossVectors(o[0],s[0]),r=1;r<=e;r++)s[r]=s[r-1].clone(),l[r]=l[r-1].clone(),c.crossVectors(o[r-1],o[r]),c.length()>Number.EPSILON&&(c.normalize(),i=Math.acos(MathUtils.clamp(o[r-1].dot(o[r]),-1,1)),s[r].applyMatrix4(h.makeRotationAxis(c,i))),l[r].crossVectors(o[r],s[r]);if(!0===t)
for(i=Math.acos(MathUtils.clamp(s[0].dot(s[e]),-1,1)),i/=e,o[0].dot(c.crossVectors(s[0],s[e]))>0&&(i=-i),r=1;r<=e;r++)s[r].applyMatrix4(h.makeRotationAxis(o[r],i*r)),l[r].crossVectors(o[r],s[r]);return{tangents:o,normals:s,binormals:l}},clone:function()
{return(new this.constructor).copy(this)},copy:function(e)
{return this.arcLengthDivisions=e.arcLengthDivisions,this},toJSON:function()
{var e={metadata:{version:4.5,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e},fromJSON:function(e)
{return this.arcLengthDivisions=e.arcLengthDivisions,this}}),EllipseCurve.prototype=Object.create(Curve.prototype),EllipseCurve.prototype.constructor=EllipseCurve,EllipseCurve.prototype.isEllipseCurve=!0,EllipseCurve.prototype.getPoint=function(e,t)
{for(var r=t||new Vector2,n=2*Math.PI,i=this.aEndAngle-this.aStartAngle,a=Math.abs(i)<Number.EPSILON;i<0;)i+=n;for(;i>n;)i-=n;i<Number.EPSILON&&(i=a?0:n),!0!==this.aClockwise||a||(i===n?i=-n:i-=n);var o=this.aStartAngle+e*i,s=this.aX+this.xRadius*Math.cos(o),l=this.aY+this.yRadius*Math.sin(o);if(0!==this.aRotation)
{var c=Math.cos(this.aRotation),h=Math.sin(this.aRotation),u=s-this.aX,d=l-this.aY;s=u*c-d*h+this.aX,l=u*h+d*c+this.aY}
return r.set(s,l)},EllipseCurve.prototype.copy=function(e)
{return Curve.prototype.copy.call(this,e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this},EllipseCurve.prototype.toJSON=function()
{var e=Curve.prototype.toJSON.call(this);return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e},EllipseCurve.prototype.fromJSON=function(e)
{return Curve.prototype.fromJSON.call(this,e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this},ArcCurve.prototype=Object.create(EllipseCurve.prototype),ArcCurve.prototype.constructor=ArcCurve,ArcCurve.prototype.isArcCurve=!0;var tmp=new Vector3,px=new CubicPoly,py=new CubicPoly,pz=new CubicPoly;function CatmullRomCurve3(e,t,r,n)
{Curve.call(this),this.type="CatmullRomCurve3",this.points=e||[],this.closed=t||!1,this.curveType=r||"centripetal",this.tension=n||.5}
function CatmullRom(e,t,r,n,i)
{var a=.5*(n-t),o=.5*(i-r),s=e*e;return(2*r-2*n+a+o)*(e*s)+(-3*r+3*n-2*a-o)*s+a*e+r}
function QuadraticBezierP0(e,t)
{var r=1-e;return r*r*t}
function QuadraticBezierP1(e,t)
{return 2*(1-e)*e*t}
function QuadraticBezierP2(e,t)
{return e*e*t}
function QuadraticBezier(e,t,r,n)
{return QuadraticBezierP0(e,t)+QuadraticBezierP1(e,r)+QuadraticBezierP2(e,n)}
function CubicBezierP0(e,t)
{var r=1-e;return r*r*r*t}
function CubicBezierP1(e,t)
{var r=1-e;return 3*r*r*e*t}
function CubicBezierP2(e,t)
{return 3*(1-e)*e*e*t}
function CubicBezierP3(e,t)
{return e*e*e*t}
function CubicBezier(e,t,r,n,i)
{return CubicBezierP0(e,t)+CubicBezierP1(e,r)+CubicBezierP2(e,n)+CubicBezierP3(e,i)}
function CubicBezierCurve(e,t,r,n)
{Curve.call(this),this.type="CubicBezierCurve",this.v0=e||new Vector2,this.v1=t||new Vector2,this.v2=r||new Vector2,this.v3=n||new Vector2}
function CubicBezierCurve3(e,t,r,n)
{Curve.call(this),this.type="CubicBezierCurve3",this.v0=e||new Vector3,this.v1=t||new Vector3,this.v2=r||new Vector3,this.v3=n||new Vector3}
function LineCurve(e,t)
{Curve.call(this),this.type="LineCurve",this.v1=e||new Vector2,this.v2=t||new Vector2}
function LineCurve3(e,t)
{Curve.call(this),this.type="LineCurve3",this.v1=e||new Vector3,this.v2=t||new Vector3}
function QuadraticBezierCurve(e,t,r)
{Curve.call(this),this.type="QuadraticBezierCurve",this.v0=e||new Vector2,this.v1=t||new Vector2,this.v2=r||new Vector2}
function QuadraticBezierCurve3(e,t,r)
{Curve.call(this),this.type="QuadraticBezierCurve3",this.v0=e||new Vector3,this.v1=t||new Vector3,this.v2=r||new Vector3}
function SplineCurve(e)
{Curve.call(this),this.type="SplineCurve",this.points=e||[]}
CatmullRomCurve3.prototype=Object.create(Curve.prototype),CatmullRomCurve3.prototype.constructor=CatmullRomCurve3,CatmullRomCurve3.prototype.isCatmullRomCurve3=!0,CatmullRomCurve3.prototype.getPoint=function(e,t)
{var r,n,i,a,o=t||new Vector3,s=this.points,l=s.length,c=(l-(this.closed?0:1))*e,h=Math.floor(c),u=c-h;if(this.closed?h+=h>0?0:(Math.floor(Math.abs(h)/l)+1)*l:0===u&&h===l-1&&(h=l-2,u=1),this.closed||h>0?r=s[(h-1)%l]:(tmp.subVectors(s[0],s[1]).add(s[0]),r=tmp),n=s[h%l],i=s[(h+1)%l],this.closed||h+2<l?a=s[(h+2)%l]:(tmp.subVectors(s[l-1],s[l-2]).add(s[l-1]),a=tmp),"centripetal"===this.curveType||"chordal"===this.curveType)
{var d="chordal"===this.curveType?.5:.25,p=Math.pow(r.distanceToSquared(n),d),m=Math.pow(n.distanceToSquared(i),d),f=Math.pow(i.distanceToSquared(a),d);m<1e-4&&(m=1),p<1e-4&&(p=m),f<1e-4&&(f=m),px.initNonuniformCatmullRom(r.x,n.x,i.x,a.x,p,m,f),py.initNonuniformCatmullRom(r.y,n.y,i.y,a.y,p,m,f),pz.initNonuniformCatmullRom(r.z,n.z,i.z,a.z,p,m,f)}
else "catmullrom"===this.curveType&&(px.initCatmullRom(r.x,n.x,i.x,a.x,this.tension),py.initCatmullRom(r.y,n.y,i.y,a.y,this.tension),pz.initCatmullRom(r.z,n.z,i.z,a.z,this.tension));return o.set(px.calc(u),py.calc(u),pz.calc(u)),o},CatmullRomCurve3.prototype.copy=function(e)
{Curve.prototype.copy.call(this,e),this.points=[];for(var t=0,r=e.points.length;t<r;t++)
{var n=e.points[t];this.points.push(n.clone())}
return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this},CatmullRomCurve3.prototype.toJSON=function()
{var e=Curve.prototype.toJSON.call(this);e.points=[];for(var t=0,r=this.points.length;t<r;t++)
{var n=this.points[t];e.points.push(n.toArray())}
return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e},CatmullRomCurve3.prototype.fromJSON=function(e)
{Curve.prototype.fromJSON.call(this,e),this.points=[];for(var t=0,r=e.points.length;t<r;t++)
{var n=e.points[t];this.points.push((new Vector3).fromArray(n))}
return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this},CubicBezierCurve.prototype=Object.create(Curve.prototype),CubicBezierCurve.prototype.constructor=CubicBezierCurve,CubicBezierCurve.prototype.isCubicBezierCurve=!0,CubicBezierCurve.prototype.getPoint=function(e,t)
{var r=t||new Vector2,n=this.v0,i=this.v1,a=this.v2,o=this.v3;return r.set(CubicBezier(e,n.x,i.x,a.x,o.x),CubicBezier(e,n.y,i.y,a.y,o.y)),r},CubicBezierCurve.prototype.copy=function(e)
{return Curve.prototype.copy.call(this,e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this},CubicBezierCurve.prototype.toJSON=function()
{var e=Curve.prototype.toJSON.call(this);return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e},CubicBezierCurve.prototype.fromJSON=function(e)
{return Curve.prototype.fromJSON.call(this,e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this},CubicBezierCurve3.prototype=Object.create(Curve.prototype),CubicBezierCurve3.prototype.constructor=CubicBezierCurve3,CubicBezierCurve3.prototype.isCubicBezierCurve3=!0,CubicBezierCurve3.prototype.getPoint=function(e,t)
{var r=t||new Vector3,n=this.v0,i=this.v1,a=this.v2,o=this.v3;return r.set(CubicBezier(e,n.x,i.x,a.x,o.x),CubicBezier(e,n.y,i.y,a.y,o.y),CubicBezier(e,n.z,i.z,a.z,o.z)),r},CubicBezierCurve3.prototype.copy=function(e)
{return Curve.prototype.copy.call(this,e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this},CubicBezierCurve3.prototype.toJSON=function()
{var e=Curve.prototype.toJSON.call(this);return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e},CubicBezierCurve3.prototype.fromJSON=function(e)
{return Curve.prototype.fromJSON.call(this,e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this},LineCurve.prototype=Object.create(Curve.prototype),LineCurve.prototype.constructor=LineCurve,LineCurve.prototype.isLineCurve=!0,LineCurve.prototype.getPoint=function(e,t)
{var r=t||new Vector2;return 1===e?r.copy(this.v2):(r.copy(this.v2).sub(this.v1),r.multiplyScalar(e).add(this.v1)),r},LineCurve.prototype.getPointAt=function(e,t)
{return this.getPoint(e,t)},LineCurve.prototype.getTangent=function()
{return this.v2.clone().sub(this.v1).normalize()},LineCurve.prototype.copy=function(e)
{return Curve.prototype.copy.call(this,e),this.v1.copy(e.v1),this.v2.copy(e.v2),this},LineCurve.prototype.toJSON=function()
{var e=Curve.prototype.toJSON.call(this);return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e},LineCurve.prototype.fromJSON=function(e)
{return Curve.prototype.fromJSON.call(this,e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this},LineCurve3.prototype=Object.create(Curve.prototype),LineCurve3.prototype.constructor=LineCurve3,LineCurve3.prototype.isLineCurve3=!0,LineCurve3.prototype.getPoint=function(e,t)
{var r=t||new Vector3;return 1===e?r.copy(this.v2):(r.copy(this.v2).sub(this.v1),r.multiplyScalar(e).add(this.v1)),r},LineCurve3.prototype.getPointAt=function(e,t)
{return this.getPoint(e,t)},LineCurve3.prototype.copy=function(e)
{return Curve.prototype.copy.call(this,e),this.v1.copy(e.v1),this.v2.copy(e.v2),this},LineCurve3.prototype.toJSON=function()
{var e=Curve.prototype.toJSON.call(this);return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e},LineCurve3.prototype.fromJSON=function(e)
{return Curve.prototype.fromJSON.call(this,e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this},QuadraticBezierCurve.prototype=Object.create(Curve.prototype),QuadraticBezierCurve.prototype.constructor=QuadraticBezierCurve,QuadraticBezierCurve.prototype.isQuadraticBezierCurve=!0,QuadraticBezierCurve.prototype.getPoint=function(e,t)
{var r=t||new Vector2,n=this.v0,i=this.v1,a=this.v2;return r.set(QuadraticBezier(e,n.x,i.x,a.x),QuadraticBezier(e,n.y,i.y,a.y)),r},QuadraticBezierCurve.prototype.copy=function(e)
{return Curve.prototype.copy.call(this,e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this},QuadraticBezierCurve.prototype.toJSON=function()
{var e=Curve.prototype.toJSON.call(this);return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e},QuadraticBezierCurve.prototype.fromJSON=function(e)
{return Curve.prototype.fromJSON.call(this,e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this},QuadraticBezierCurve3.prototype=Object.create(Curve.prototype),QuadraticBezierCurve3.prototype.constructor=QuadraticBezierCurve3,QuadraticBezierCurve3.prototype.isQuadraticBezierCurve3=!0,QuadraticBezierCurve3.prototype.getPoint=function(e,t)
{var r=t||new Vector3,n=this.v0,i=this.v1,a=this.v2;return r.set(QuadraticBezier(e,n.x,i.x,a.x),QuadraticBezier(e,n.y,i.y,a.y),QuadraticBezier(e,n.z,i.z,a.z)),r},QuadraticBezierCurve3.prototype.copy=function(e)
{return Curve.prototype.copy.call(this,e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this},QuadraticBezierCurve3.prototype.toJSON=function()
{var e=Curve.prototype.toJSON.call(this);return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e},QuadraticBezierCurve3.prototype.fromJSON=function(e)
{return Curve.prototype.fromJSON.call(this,e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this},SplineCurve.prototype=Object.create(Curve.prototype),SplineCurve.prototype.constructor=SplineCurve,SplineCurve.prototype.isSplineCurve=!0,SplineCurve.prototype.getPoint=function(e,t)
{var r=t||new Vector2,n=this.points,i=(n.length-1)*e,a=Math.floor(i),o=i-a,s=n[0===a?a:a-1],l=n[a],c=n[a>n.length-2?n.length-1:a+1],h=n[a>n.length-3?n.length-1:a+2];return r.set(CatmullRom(o,s.x,l.x,c.x,h.x),CatmullRom(o,s.y,l.y,c.y,h.y)),r},SplineCurve.prototype.copy=function(e)
{Curve.prototype.copy.call(this,e),this.points=[];for(var t=0,r=e.points.length;t<r;t++)
{var n=e.points[t];this.points.push(n.clone())}
return this},SplineCurve.prototype.toJSON=function()
{var e=Curve.prototype.toJSON.call(this);e.points=[];for(var t=0,r=this.points.length;t<r;t++)
{var n=this.points[t];e.points.push(n.toArray())}
return e},SplineCurve.prototype.fromJSON=function(e)
{Curve.prototype.fromJSON.call(this,e),this.points=[];for(var t=0,r=e.points.length;t<r;t++)
{var n=e.points[t];this.points.push((new Vector2).fromArray(n))}
return this};var Curves=Object.freeze({__proto__:null,ArcCurve:ArcCurve,CatmullRomCurve3:CatmullRomCurve3,CubicBezierCurve:CubicBezierCurve,CubicBezierCurve3:CubicBezierCurve3,EllipseCurve:EllipseCurve,LineCurve:LineCurve,LineCurve3:LineCurve3,QuadraticBezierCurve:QuadraticBezierCurve,QuadraticBezierCurve3:QuadraticBezierCurve3,SplineCurve:SplineCurve});function CurvePath()
{Curve.call(this),this.type="CurvePath",this.curves=[],this.autoClose=!1}
function Path(e)
{CurvePath.call(this),this.type="Path",this.currentPoint=new Vector2,e&&this.setFromPoints(e)}
function Shape(e)
{Path.call(this,e),this.uuid=MathUtils.generateUUID(),this.type="Shape",this.holes=[]}
function Light(e,t)
{Object3D.call(this),this.type="Light",this.color=new Color(e),this.intensity=void 0!==t?t:1,this.receiveShadow=void 0}
function HemisphereLight(e,t,r)
{Light.call(this,e,r),this.type="HemisphereLight",this.castShadow=void 0,this.position.copy(Object3D.DefaultUp),this.updateMatrix(),this.groundColor=new Color(t)}
function LightShadow(e)
{this.camera=e,this.bias=0,this.radius=1,this.mapSize=new Vector2(512,512),this.map=null,this.mapPass=null,this.matrix=new Matrix4,this._frustum=new Frustum,this._frameExtents=new Vector2(1,1),this._viewportCount=1,this._viewports=[new Vector4(0,0,1,1)]}
function SpotLightShadow()
{LightShadow.call(this,new PerspectiveCamera(50,1,.5,500))}
function SpotLight(e,t,r,n,i,a)
{Light.call(this,e,t),this.type="SpotLight",this.position.copy(Object3D.DefaultUp),this.updateMatrix(),this.target=new Object3D,Object.defineProperty(this,"power",{get:function()
{return this.intensity*Math.PI},set:function(e)
{this.intensity=e/Math.PI}}),this.distance=void 0!==r?r:0,this.angle=void 0!==n?n:Math.PI/3,this.penumbra=void 0!==i?i:0,this.decay=void 0!==a?a:1,this.shadow=new SpotLightShadow}
function PointLightShadow()
{LightShadow.call(this,new PerspectiveCamera(90,1,.5,500)),this._frameExtents=new Vector2(4,2),this._viewportCount=6,this._viewports=[new Vector4(2,1,1,1),new Vector4(0,1,1,1),new Vector4(3,1,1,1),new Vector4(1,1,1,1),new Vector4(3,0,1,1),new Vector4(1,0,1,1)],this._cubeDirections=[new Vector3(1,0,0),new Vector3(-1,0,0),new Vector3(0,0,1),new Vector3(0,0,-1),new Vector3(0,1,0),new Vector3(0,-1,0)],this._cubeUps=[new Vector3(0,1,0),new Vector3(0,1,0),new Vector3(0,1,0),new Vector3(0,1,0),new Vector3(0,0,1),new Vector3(0,0,-1)]}
function PointLight(e,t,r,n)
{Light.call(this,e,t),this.type="PointLight",Object.defineProperty(this,"power",{get:function()
{return 4*this.intensity*Math.PI},set:function(e)
{this.intensity=e/(4*Math.PI)}}),this.distance=void 0!==r?r:0,this.decay=void 0!==n?n:1,this.shadow=new PointLightShadow}
function OrthographicCamera(e,t,r,n,i,a)
{Camera.call(this),this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=void 0!==e?e:-1,this.right=void 0!==t?t:1,this.top=void 0!==r?r:1,this.bottom=void 0!==n?n:-1,this.near=void 0!==i?i:.1,this.far=void 0!==a?a:2e3,this.updateProjectionMatrix()}
function DirectionalLightShadow()
{LightShadow.call(this,new OrthographicCamera(-5,5,5,-5,.5,500))}
function DirectionalLight(e,t)
{Light.call(this,e,t),this.type="DirectionalLight",this.position.copy(Object3D.DefaultUp),this.updateMatrix(),this.target=new Object3D,this.shadow=new DirectionalLightShadow}
function AmbientLight(e,t)
{Light.call(this,e,t),this.type="AmbientLight",this.castShadow=void 0}
function RectAreaLight(e,t,r,n)
{Light.call(this,e,t),this.type="RectAreaLight",this.width=void 0!==r?r:10,this.height=void 0!==n?n:10}
function MaterialLoader(e)
{Loader.call(this,e),this.textures={}}
CurvePath.prototype=Object.assign(Object.create(Curve.prototype),{constructor:CurvePath,add:function(e)
{this.curves.push(e)},closePath:function()
{var e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);e.equals(t)||this.curves.push(new LineCurve(t,e))},getPoint:function(e)
{for(var t=e*this.getLength(),r=this.getCurveLengths(),n=0;n<r.length;)
{if(r[n]>=t)
{var i=r[n]-t,a=this.curves[n],o=a.getLength(),s=0===o?0:1-i/o;return a.getPointAt(s)}
n++}
return null},getLength:function()
{var e=this.getCurveLengths();return e[e.length-1]},updateArcLengths:function()
{this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()},getCurveLengths:function()
{if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;for(var e=[],t=0,r=0,n=this.curves.length;r<n;r++)t+=this.curves[r].getLength(),e.push(t);return this.cacheLengths=e,e},getSpacedPoints:function(e)
{void 0===e&&(e=40);for(var t=[],r=0;r<=e;r++)t.push(this.getPoint(r/e));return this.autoClose&&t.push(t[0]),t},getPoints:function(e)
{e=e||12;for(var t,r=[],n=0,i=this.curves;n<i.length;n++)
for(var a=i[n],o=a&&a.isEllipseCurve?2*e:a&&(a.isLineCurve||a.isLineCurve3)?1:a&&a.isSplineCurve?e*a.points.length:e,s=a.getPoints(o),l=0;l<s.length;l++)
{var c=s[l];t&&t.equals(c)||(r.push(c),t=c)}
return this.autoClose&&r.length>1&&!r[r.length-1].equals(r[0])&&r.push(r[0]),r},copy:function(e)
{Curve.prototype.copy.call(this,e),this.curves=[];for(var t=0,r=e.curves.length;t<r;t++)
{var n=e.curves[t];this.curves.push(n.clone())}
return this.autoClose=e.autoClose,this},toJSON:function()
{var e=Curve.prototype.toJSON.call(this);e.autoClose=this.autoClose,e.curves=[];for(var t=0,r=this.curves.length;t<r;t++)
{var n=this.curves[t];e.curves.push(n.toJSON())}
return e},fromJSON:function(e)
{Curve.prototype.fromJSON.call(this,e),this.autoClose=e.autoClose,this.curves=[];for(var t=0,r=e.curves.length;t<r;t++)
{var n=e.curves[t];this.curves.push((new Curves[n.type]).fromJSON(n))}
return this}}),Path.prototype=Object.assign(Object.create(CurvePath.prototype),{constructor:Path,setFromPoints:function(e)
{this.moveTo(e[0].x,e[0].y);for(var t=1,r=e.length;t<r;t++)this.lineTo(e[t].x,e[t].y);return this},moveTo:function(e,t)
{return this.currentPoint.set(e,t),this},lineTo:function(e,t)
{var r=new LineCurve(this.currentPoint.clone(),new Vector2(e,t));return this.curves.push(r),this.currentPoint.set(e,t),this},quadraticCurveTo:function(e,t,r,n)
{var i=new QuadraticBezierCurve(this.currentPoint.clone(),new Vector2(e,t),new Vector2(r,n));return this.curves.push(i),this.currentPoint.set(r,n),this},bezierCurveTo:function(e,t,r,n,i,a)
{var o=new CubicBezierCurve(this.currentPoint.clone(),new Vector2(e,t),new Vector2(r,n),new Vector2(i,a));return this.curves.push(o),this.currentPoint.set(i,a),this},splineThru:function(e)
{var t=new SplineCurve([this.currentPoint.clone()].concat(e));return this.curves.push(t),this.currentPoint.copy(e[e.length-1]),this},arc:function(e,t,r,n,i,a)
{var o=this.currentPoint.x,s=this.currentPoint.y;return this.absarc(e+o,t+s,r,n,i,a),this},absarc:function(e,t,r,n,i,a)
{return this.absellipse(e,t,r,r,n,i,a),this},ellipse:function(e,t,r,n,i,a,o,s)
{var l=this.currentPoint.x,c=this.currentPoint.y;return this.absellipse(e+l,t+c,r,n,i,a,o,s),this},absellipse:function(e,t,r,n,i,a,o,s)
{var l=new EllipseCurve(e,t,r,n,i,a,o,s);if(this.curves.length>0)
{var c=l.getPoint(0);c.equals(this.currentPoint)||this.lineTo(c.x,c.y)}
this.curves.push(l);var h=l.getPoint(1);return this.currentPoint.copy(h),this},copy:function(e)
{return CurvePath.prototype.copy.call(this,e),this.currentPoint.copy(e.currentPoint),this},toJSON:function()
{var e=CurvePath.prototype.toJSON.call(this);return e.currentPoint=this.currentPoint.toArray(),e},fromJSON:function(e)
{return CurvePath.prototype.fromJSON.call(this,e),this.currentPoint.fromArray(e.currentPoint),this}}),Shape.prototype=Object.assign(Object.create(Path.prototype),{constructor:Shape,getPointsHoles:function(e)
{for(var t=[],r=0,n=this.holes.length;r<n;r++)t[r]=this.holes[r].getPoints(e);return t},extractPoints:function(e)
{return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}},copy:function(e)
{Path.prototype.copy.call(this,e),this.holes=[];for(var t=0,r=e.holes.length;t<r;t++)
{var n=e.holes[t];this.holes.push(n.clone())}
return this},toJSON:function()
{var e=Path.prototype.toJSON.call(this);e.uuid=this.uuid,e.holes=[];for(var t=0,r=this.holes.length;t<r;t++)
{var n=this.holes[t];e.holes.push(n.toJSON())}
return e},fromJSON:function(e)
{Path.prototype.fromJSON.call(this,e),this.uuid=e.uuid,this.holes=[];for(var t=0,r=e.holes.length;t<r;t++)
{var n=e.holes[t];this.holes.push((new Path).fromJSON(n))}
return this}}),Light.prototype=Object.assign(Object.create(Object3D.prototype),{constructor:Light,isLight:!0,copy:function(e)
{return Object3D.prototype.copy.call(this,e),this.color.copy(e.color),this.intensity=e.intensity,this},toJSON:function(e)
{var t=Object3D.prototype.toJSON.call(this,e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,void 0!==this.groundColor&&(t.object.groundColor=this.groundColor.getHex()),void 0!==this.distance&&(t.object.distance=this.distance),void 0!==this.angle&&(t.object.angle=this.angle),void 0!==this.decay&&(t.object.decay=this.decay),void 0!==this.penumbra&&(t.object.penumbra=this.penumbra),void 0!==this.shadow&&(t.object.shadow=this.shadow.toJSON()),t}}),HemisphereLight.prototype=Object.assign(Object.create(Light.prototype),{constructor:HemisphereLight,isHemisphereLight:!0,copy:function(e)
{return Light.prototype.copy.call(this,e),this.groundColor.copy(e.groundColor),this}}),Object.assign(LightShadow.prototype,{_projScreenMatrix:new Matrix4,_lightPositionWorld:new Vector3,_lookTarget:new Vector3,getViewportCount:function()
{return this._viewportCount},getFrustum:function()
{return this._frustum},updateMatrices:function(e)
{var t=this.camera,r=this.matrix,n=this._projScreenMatrix,i=this._lookTarget,a=this._lightPositionWorld;a.setFromMatrixPosition(e.matrixWorld),t.position.copy(a),i.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(i),t.updateMatrixWorld(),n.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(n),r.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),r.multiply(t.projectionMatrix),r.multiply(t.matrixWorldInverse)},getViewport:function(e)
{return this._viewports[e]},getFrameExtents:function()
{return this._frameExtents},copy:function(e)
{return this.camera=e.camera.clone(),this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this},clone:function()
{return(new this.constructor).copy(this)},toJSON:function()
{var e={};return 0!==this.bias&&(e.bias=this.bias),1!==this.radius&&(e.radius=this.radius),512===this.mapSize.x&&512===this.mapSize.y||(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}),SpotLightShadow.prototype=Object.assign(Object.create(LightShadow.prototype),{constructor:SpotLightShadow,isSpotLightShadow:!0,updateMatrices:function(e)
{var t=this.camera,r=2*MathUtils.RAD2DEG*e.angle,n=this.mapSize.width/this.mapSize.height,i=e.distance||t.far;r===t.fov&&n===t.aspect&&i===t.far||(t.fov=r,t.aspect=n,t.far=i,t.updateProjectionMatrix()),LightShadow.prototype.updateMatrices.call(this,e)}}),SpotLight.prototype=Object.assign(Object.create(Light.prototype),{constructor:SpotLight,isSpotLight:!0,copy:function(e)
{return Light.prototype.copy.call(this,e),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}),PointLightShadow.prototype=Object.assign(Object.create(LightShadow.prototype),{constructor:PointLightShadow,isPointLightShadow:!0,updateMatrices:function(e,t)
{void 0===t&&(t=0);var r=this.camera,n=this.matrix,i=this._lightPositionWorld,a=this._lookTarget,o=this._projScreenMatrix;i.setFromMatrixPosition(e.matrixWorld),r.position.copy(i),a.copy(r.position),a.add(this._cubeDirections[t]),r.up.copy(this._cubeUps[t]),r.lookAt(a),r.updateMatrixWorld(),n.makeTranslation(-i.x,-i.y,-i.z),o.multiplyMatrices(r.projectionMatrix,r.matrixWorldInverse),this._frustum.setFromProjectionMatrix(o)}}),PointLight.prototype=Object.assign(Object.create(Light.prototype),{constructor:PointLight,isPointLight:!0,copy:function(e)
{return Light.prototype.copy.call(this,e),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}),OrthographicCamera.prototype=Object.assign(Object.create(Camera.prototype),{constructor:OrthographicCamera,isOrthographicCamera:!0,copy:function(e,t)
{return Camera.prototype.copy.call(this,e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=null===e.view?null:Object.assign({},e.view),this},setViewOffset:function(e,t,r,n,i,a)
{null===this.view&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=r,this.view.offsetY=n,this.view.width=i,this.view.height=a,this.updateProjectionMatrix()},clearViewOffset:function()
{null!==this.view&&(this.view.enabled=!1),this.updateProjectionMatrix()},updateProjectionMatrix:function()
{var e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),r=(this.right+this.left)/2,n=(this.top+this.bottom)/2,i=r-e,a=r+e,o=n+t,s=n-t;if(null!==this.view&&this.view.enabled)
{var l=(this.right-this.left)/this.view.fullWidth/this.zoom,c=(this.top-this.bottom)/this.view.fullHeight/this.zoom;a=(i+=l*this.view.offsetX)+l*this.view.width,s=(o-=c*this.view.offsetY)-c*this.view.height}
this.projectionMatrix.makeOrthographic(i,a,o,s,this.near,this.far),this.projectionMatrixInverse.getInverse(this.projectionMatrix)},toJSON:function(e)
{var t=Object3D.prototype.toJSON.call(this,e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,null!==this.view&&(t.object.view=Object.assign({},this.view)),t}}),DirectionalLightShadow.prototype=Object.assign(Object.create(LightShadow.prototype),{constructor:DirectionalLightShadow,isDirectionalLightShadow:!0,updateMatrices:function(e)
{LightShadow.prototype.updateMatrices.call(this,e)}}),DirectionalLight.prototype=Object.assign(Object.create(Light.prototype),{constructor:DirectionalLight,isDirectionalLight:!0,copy:function(e)
{return Light.prototype.copy.call(this,e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}),AmbientLight.prototype=Object.assign(Object.create(Light.prototype),{constructor:AmbientLight,isAmbientLight:!0}),RectAreaLight.prototype=Object.assign(Object.create(Light.prototype),{constructor:RectAreaLight,isRectAreaLight:!0,copy:function(e)
{return Light.prototype.copy.call(this,e),this.width=e.width,this.height=e.height,this},toJSON:function(e)
{var t=Light.prototype.toJSON.call(this,e);return t.object.width=this.width,t.object.height=this.height,t}}),MaterialLoader.prototype=Object.assign(Object.create(Loader.prototype),{constructor:MaterialLoader,load:function(e,t,r,n)
{var i=this,a=new FileLoader(i.manager);a.setPath(i.path),a.load(e,function(e)
{t(i.parse(JSON.parse(e)))},r,n)},parse:function(e)
{var t=this.textures;function r(e)
{return void 0===t[e]&&console.warn("THREE.MaterialLoader: Undefined texture",e),t[e]}
var n=new Materials[e.type];if(void 0!==e.uuid&&(n.uuid=e.uuid),void 0!==e.name&&(n.name=e.name),void 0!==e.color&&n.color.setHex(e.color),void 0!==e.roughness&&(n.roughness=e.roughness),void 0!==e.metalness&&(n.metalness=e.metalness),void 0!==e.sheen&&(n.sheen=(new Color).setHex(e.sheen)),void 0!==e.emissive&&n.emissive.setHex(e.emissive),void 0!==e.specular&&n.specular.setHex(e.specular),void 0!==e.shininess&&(n.shininess=e.shininess),void 0!==e.clearcoat&&(n.clearcoat=e.clearcoat),void 0!==e.clearcoatRoughness&&(n.clearcoatRoughness=e.clearcoatRoughness),void 0!==e.vertexColors&&(n.vertexColors=e.vertexColors),void 0!==e.fog&&(n.fog=e.fog),void 0!==e.flatShading&&(n.flatShading=e.flatShading),void 0!==e.blending&&(n.blending=e.blending),void 0!==e.combine&&(n.combine=e.combine),void 0!==e.side&&(n.side=e.side),void 0!==e.opacity&&(n.opacity=e.opacity),void 0!==e.transparent&&(n.transparent=e.transparent),void 0!==e.alphaTest&&(n.alphaTest=e.alphaTest),void 0!==e.depthTest&&(n.depthTest=e.depthTest),void 0!==e.depthWrite&&(n.depthWrite=e.depthWrite),void 0!==e.colorWrite&&(n.colorWrite=e.colorWrite),void 0!==e.stencilWrite&&(n.stencilWrite=e.stencilWrite),void 0!==e.stencilWriteMask&&(n.stencilWriteMask=e.stencilWriteMask),void 0!==e.stencilFunc&&(n.stencilFunc=e.stencilFunc),void 0!==e.stencilRef&&(n.stencilRef=e.stencilRef),void 0!==e.stencilFuncMask&&(n.stencilFuncMask=e.stencilFuncMask),void 0!==e.stencilFail&&(n.stencilFail=e.stencilFail),void 0!==e.stencilZFail&&(n.stencilZFail=e.stencilZFail),void 0!==e.stencilZPass&&(n.stencilZPass=e.stencilZPass),void 0!==e.wireframe&&(n.wireframe=e.wireframe),void 0!==e.wireframeLinewidth&&(n.wireframeLinewidth=e.wireframeLinewidth),void 0!==e.wireframeLinecap&&(n.wireframeLinecap=e.wireframeLinecap),void 0!==e.wireframeLinejoin&&(n.wireframeLinejoin=e.wireframeLinejoin),void 0!==e.rotation&&(n.rotation=e.rotation),1!==e.linewidth&&(n.linewidth=e.linewidth),void 0!==e.dashSize&&(n.dashSize=e.dashSize),void 0!==e.gapSize&&(n.gapSize=e.gapSize),void 0!==e.scale&&(n.scale=e.scale),void 0!==e.polygonOffset&&(n.polygonOffset=e.polygonOffset),void 0!==e.polygonOffsetFactor&&(n.polygonOffsetFactor=e.polygonOffsetFactor),void 0!==e.polygonOffsetUnits&&(n.polygonOffsetUnits=e.polygonOffsetUnits),void 0!==e.skinning&&(n.skinning=e.skinning),void 0!==e.morphTargets&&(n.morphTargets=e.morphTargets),void 0!==e.morphNormals&&(n.morphNormals=e.morphNormals),void 0!==e.dithering&&(n.dithering=e.dithering),void 0!==e.visible&&(n.visible=e.visible),void 0!==e.toneMapped&&(n.toneMapped=e.toneMapped),void 0!==e.userData&&(n.userData=e.userData),void 0!==e.uniforms)
for(var i in e.uniforms)
{var a=e.uniforms[i];switch(n.uniforms[i]={},a.type)
{case "t":n.uniforms[i].value=r(a.value);break;case "c":n.uniforms[i].value=(new Color).setHex(a.value);break;case "v2":n.uniforms[i].value=(new Vector2).fromArray(a.value);break;case "v3":n.uniforms[i].value=(new Vector3).fromArray(a.value);break;case "v4":n.uniforms[i].value=(new Vector4).fromArray(a.value);break;case "m3":n.uniforms[i].value=(new Matrix3).fromArray(a.value);case "m4":n.uniforms[i].value=(new Matrix4).fromArray(a.value);break;default:n.uniforms[i].value=a.value}}
if(void 0!==e.defines&&(n.defines=e.defines),void 0!==e.vertexShader&&(n.vertexShader=e.vertexShader),void 0!==e.fragmentShader&&(n.fragmentShader=e.fragmentShader),void 0!==e.extensions)
for(var o in e.extensions)n.extensions[o]=e.extensions[o];if(void 0!==e.shading&&(n.flatShading=1===e.shading),void 0!==e.size&&(n.size=e.size),void 0!==e.sizeAttenuation&&(n.sizeAttenuation=e.sizeAttenuation),void 0!==e.map&&(n.map=r(e.map)),void 0!==e.matcap&&(n.matcap=r(e.matcap)),void 0!==e.alphaMap&&(n.alphaMap=r(e.alphaMap),n.transparent=!0),void 0!==e.bumpMap&&(n.bumpMap=r(e.bumpMap)),void 0!==e.bumpScale&&(n.bumpScale=e.bumpScale),void 0!==e.normalMap&&(n.normalMap=r(e.normalMap)),void 0!==e.normalMapType&&(n.normalMapType=e.normalMapType),void 0!==e.normalScale)
{var s=e.normalScale;!1===Array.isArray(s)&&(s=[s,s]),n.normalScale=(new Vector2).fromArray(s)}
return void 0!==e.displacementMap&&(n.displacementMap=r(e.displacementMap)),void 0!==e.displacementScale&&(n.displacementScale=e.displacementScale),void 0!==e.displacementBias&&(n.displacementBias=e.displacementBias),void 0!==e.roughnessMap&&(n.roughnessMap=r(e.roughnessMap)),void 0!==e.metalnessMap&&(n.metalnessMap=r(e.metalnessMap)),void 0!==e.emissiveMap&&(n.emissiveMap=r(e.emissiveMap)),void 0!==e.emissiveIntensity&&(n.emissiveIntensity=e.emissiveIntensity),void 0!==e.specularMap&&(n.specularMap=r(e.specularMap)),void 0!==e.envMap&&(n.envMap=r(e.envMap)),void 0!==e.envMapIntensity&&(n.envMapIntensity=e.envMapIntensity),void 0!==e.reflectivity&&(n.reflectivity=e.reflectivity),void 0!==e.refractionRatio&&(n.refractionRatio=e.refractionRatio),void 0!==e.lightMap&&(n.lightMap=r(e.lightMap)),void 0!==e.lightMapIntensity&&(n.lightMapIntensity=e.lightMapIntensity),void 0!==e.aoMap&&(n.aoMap=r(e.aoMap)),void 0!==e.aoMapIntensity&&(n.aoMapIntensity=e.aoMapIntensity),void 0!==e.gradientMap&&(n.gradientMap=r(e.gradientMap)),void 0!==e.clearcoatNormalMap&&(n.clearcoatNormalMap=r(e.clearcoatNormalMap)),void 0!==e.clearcoatNormalScale&&(n.clearcoatNormalScale=(new Vector2).fromArray(e.clearcoatNormalScale)),n},setTextures:function(e)
{return this.textures=e,this}});var LoaderUtils={decodeText:function(e)
{if("undefined"!=typeof TextDecoder)return(new TextDecoder).decode(e);for(var t="",r=0,n=e.length;r<n;r++)t+=String.fromCharCode(e[r]);try
{return decodeURIComponent(escape(t))}
catch(e)
{return t}},extractUrlBase:function(e)
{var t=e.lastIndexOf("/");return-1===t?"./":e.substr(0,t+1)}};function InstancedBufferGeometry()
{BufferGeometry.call(this),this.type="InstancedBufferGeometry",this.maxInstancedCount=void 0}
function InstancedBufferAttribute(e,t,r,n)
{"number"==typeof r&&(n=r,r=!1,console.error("THREE.InstancedBufferAttribute: The constructor now expects normalized as the third argument.")),BufferAttribute.call(this,e,t,r),this.meshPerAttribute=n||1}
function BufferGeometryLoader(e)
{Loader.call(this,e)}
InstancedBufferGeometry.prototype=Object.assign(Object.create(BufferGeometry.prototype),{constructor:InstancedBufferGeometry,isInstancedBufferGeometry:!0,copy:function(e)
{return BufferGeometry.prototype.copy.call(this,e),this.maxInstancedCount=e.maxInstancedCount,this},clone:function()
{return(new this.constructor).copy(this)},toJSON:function()
{var e=BufferGeometry.prototype.toJSON.call(this);return e.maxInstancedCount=this.maxInstancedCount,e.isInstancedBufferGeometry=!0,e}}),InstancedBufferAttribute.prototype=Object.assign(Object.create(BufferAttribute.prototype),{constructor:InstancedBufferAttribute,isInstancedBufferAttribute:!0,copy:function(e)
{return BufferAttribute.prototype.copy.call(this,e),this.meshPerAttribute=e.meshPerAttribute,this},toJSON:function()
{var e=BufferAttribute.prototype.toJSON.call(this);return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}),BufferGeometryLoader.prototype=Object.assign(Object.create(Loader.prototype),{constructor:BufferGeometryLoader,load:function(e,t,r,n)
{var i=this,a=new FileLoader(i.manager);a.setPath(i.path),a.load(e,function(e)
{t(i.parse(JSON.parse(e)))},r,n)},parse:function(e)
{var t=e.isInstancedBufferGeometry?new InstancedBufferGeometry:new BufferGeometry,r=e.data.index;if(void 0!==r)
{var n=new TYPED_ARRAYS[r.type](r.array);t.setIndex(new BufferAttribute(n,1))}
var i=e.data.attributes;for(var a in i)
{var o=i[a],s=(n=new TYPED_ARRAYS[o.type](o.array),new(o.isInstancedBufferAttribute?InstancedBufferAttribute:BufferAttribute)(n,o.itemSize,o.normalized));void 0!==o.name&&(s.name=o.name),t.setAttribute(a,s)}
var l=e.data.morphAttributes;if(l)
for(var a in l)
{for(var c=l[a],h=[],u=0,d=c.length;u<d;u++)
{o=c[u],s=new BufferAttribute(n=new TYPED_ARRAYS[o.type](o.array),o.itemSize,o.normalized);void 0!==o.name&&(s.name=o.name),h.push(s)}
t.morphAttributes[a]=h}
e.data.morphTargetsRelative&&(t.morphTargetsRelative=!0);var p=e.data.groups||e.data.drawcalls||e.data.offsets;if(void 0!==p)
{u=0;for(var m=p.length;u!==m;++u)
{var f=p[u];t.addGroup(f.start,f.count,f.materialIndex)}}
var g=e.data.boundingSphere;if(void 0!==g)
{var v=new Vector3;void 0!==g.center&&v.fromArray(g.center),t.boundingSphere=new Sphere(v,g.radius)}
return e.name&&(t.name=e.name),e.userData&&(t.userData=e.userData),t}});var TYPED_ARRAYS={Int8Array:Int8Array,Uint8Array:Uint8Array,Uint8ClampedArray:"undefined"!=typeof Uint8ClampedArray?Uint8ClampedArray:Uint8Array,Int16Array:Int16Array,Uint16Array:Uint16Array,Int32Array:Int32Array,Uint32Array:Uint32Array,Float32Array:Float32Array,Float64Array:Float64Array};function ObjectLoader(e)
{Loader.call(this,e)}
ObjectLoader.prototype=Object.assign(Object.create(Loader.prototype),{constructor:ObjectLoader,load:function(e,t,r,n)
{var i=this,a=""===this.path?LoaderUtils.extractUrlBase(e):this.path;this.resourcePath=this.resourcePath||a;var o=new FileLoader(i.manager);o.setPath(this.path),o.load(e,function(r)
{var a=null;try
{a=JSON.parse(r)}
catch(t)
{return void 0!==n&&n(t),void console.error("THREE:ObjectLoader: Can't parse "+e+".",t.message)}
var o=a.metadata;void 0!==o&&void 0!==o.type&&"geometry"!==o.type.toLowerCase()?i.parse(a,t):console.error("THREE.ObjectLoader: Can't load "+e)},r,n)},parse:function(e,t)
{var r=this.parseShape(e.shapes),n=this.parseGeometries(e.geometries,r),i=this.parseImages(e.images,function()
{void 0!==t&&t(s)}),a=this.parseTextures(e.textures,i),o=this.parseMaterials(e.materials,a),s=this.parseObject(e.object,n,o);return e.animations&&(s.animations=this.parseAnimations(e.animations)),void 0!==e.images&&0!==e.images.length||void 0!==t&&t(s),s},parseShape:function(e)
{var t={};if(void 0!==e)
for(var r=0,n=e.length;r<n;r++)
{var i=(new Shape).fromJSON(e[r]);t[i.uuid]=i}
return t},parseGeometries:function(e,t)
{var r={};if(void 0!==e)
for(var n=new BufferGeometryLoader,i=0,a=e.length;i<a;i++)
{var o,s=e[i];switch(s.type)
{case "PlaneGeometry":case "PlaneBufferGeometry":o=new Geometries[s.type](s.width,s.height,s.widthSegments,s.heightSegments);break;case "BoxGeometry":case "BoxBufferGeometry":case "CubeGeometry":o=new Geometries[s.type](s.width,s.height,s.depth,s.widthSegments,s.heightSegments,s.depthSegments);break;case "CircleGeometry":case "CircleBufferGeometry":o=new Geometries[s.type](s.radius,s.segments,s.thetaStart,s.thetaLength);break;case "CylinderGeometry":case "CylinderBufferGeometry":o=new Geometries[s.type](s.radiusTop,s.radiusBottom,s.height,s.radialSegments,s.heightSegments,s.openEnded,s.thetaStart,s.thetaLength);break;case "ConeGeometry":case "ConeBufferGeometry":o=new Geometries[s.type](s.radius,s.height,s.radialSegments,s.heightSegments,s.openEnded,s.thetaStart,s.thetaLength);break;case "SphereGeometry":case "SphereBufferGeometry":o=new Geometries[s.type](s.radius,s.widthSegments,s.heightSegments,s.phiStart,s.phiLength,s.thetaStart,s.thetaLength);break;case "DodecahedronGeometry":case "DodecahedronBufferGeometry":case "IcosahedronGeometry":case "IcosahedronBufferGeometry":case "OctahedronGeometry":case "OctahedronBufferGeometry":case "TetrahedronGeometry":case "TetrahedronBufferGeometry":o=new Geometries[s.type](s.radius,s.detail);break;case "RingGeometry":case "RingBufferGeometry":o=new Geometries[s.type](s.innerRadius,s.outerRadius,s.thetaSegments,s.phiSegments,s.thetaStart,s.thetaLength);break;case "TorusGeometry":case "TorusBufferGeometry":o=new Geometries[s.type](s.radius,s.tube,s.radialSegments,s.tubularSegments,s.arc);break;case "TorusKnotGeometry":case "TorusKnotBufferGeometry":o=new Geometries[s.type](s.radius,s.tube,s.tubularSegments,s.radialSegments,s.p,s.q);break;case "TubeGeometry":case "TubeBufferGeometry":o=new Geometries[s.type]((new Curves[s.path.type]).fromJSON(s.path),s.tubularSegments,s.radius,s.radialSegments,s.closed);break;case "LatheGeometry":case "LatheBufferGeometry":o=new Geometries[s.type](s.points,s.segments,s.phiStart,s.phiLength);break;case "PolyhedronGeometry":case "PolyhedronBufferGeometry":o=new Geometries[s.type](s.vertices,s.indices,s.radius,s.details);break;case "ShapeGeometry":case "ShapeBufferGeometry":for(var l=[],c=0,h=s.shapes.length;c<h;c++)
{var u=t[s.shapes[c]];l.push(u)}
o=new Geometries[s.type](l,s.curveSegments);break;case "ExtrudeGeometry":case "ExtrudeBufferGeometry":for(l=[],c=0,h=s.shapes.length;c<h;c++)
{u=t[s.shapes[c]];l.push(u)}
var d=s.options.extrudePath;void 0!==d&&(s.options.extrudePath=(new Curves[d.type]).fromJSON(d)),o=new Geometries[s.type](l,s.options);break;case "BufferGeometry":case "InstancedBufferGeometry":o=n.parse(s);break;case "Geometry":if("THREE" in window&&"LegacyJSONLoader" in THREE)o=(new THREE.LegacyJSONLoader).parse(s,this.resourcePath).geometry;else console.error('THREE.ObjectLoader: You have to import LegacyJSONLoader in order load geometry data of type "Geometry".');break;default:console.warn('THREE.ObjectLoader: Unsupported geometry type "'+s.type+'"');continue}
o.uuid=s.uuid,void 0!==s.name&&(o.name=s.name),!0===o.isBufferGeometry&&void 0!==s.userData&&(o.userData=s.userData),r[s.uuid]=o}
return r},parseMaterials:function(e,t)
{var r={},n={};if(void 0!==e)
{var i=new MaterialLoader;i.setTextures(t);for(var a=0,o=e.length;a<o;a++)
{var s=e[a];if("MultiMaterial"===s.type)
{for(var l=[],c=0;c<s.materials.length;c++)
{var h=s.materials[c];void 0===r[h.uuid]&&(r[h.uuid]=i.parse(h)),l.push(r[h.uuid])}
n[s.uuid]=l}
else void 0===r[s.uuid]&&(r[s.uuid]=i.parse(s)),n[s.uuid]=r[s.uuid]}}
return n},parseAnimations:function(e)
{for(var t=[],r=0;r<e.length;r++)
{var n=e[r],i=AnimationClip.parse(n);void 0!==n.uuid&&(i.uuid=n.uuid),t.push(i)}
return t},parseImages:function(e,t)
{var r=this,n={};function i(e)
{return r.manager.itemStart(e),a.load(e,function()
{r.manager.itemEnd(e)},void 0,function()
{r.manager.itemError(e),r.manager.itemEnd(e)})}
if(void 0!==e&&e.length>0)
{var a=new ImageLoader(new LoadingManager(t));a.setCrossOrigin(this.crossOrigin);for(var o=0,s=e.length;o<s;o++)
{var l=e[o],c=l.url;if(Array.isArray(c))
{n[l.uuid]=[];for(var h=0,u=c.length;h<u;h++)
{var d=c[h],p=/^(\/\/)|([a-z]+:(\/\/)?)/i.test(d)?d:r.resourcePath+d;n[l.uuid].push(i(p))}}
else{p=/^(\/\/)|([a-z]+:(\/\/)?)/i.test(l.url)?l.url:r.resourcePath+l.url;n[l.uuid]=i(p)}}}
return n},parseTextures:function(e,t)
{function r(e,t)
{return"number"==typeof e?e:(console.warn("THREE.ObjectLoader.parseTexture: Constant should be in numeric form.",e),t[e])}
var n={};if(void 0!==e)
for(var i=0,a=e.length;i<a;i++)
{var o,s=e[i];void 0===s.image&&console.warn('THREE.ObjectLoader: No "image" specified for',s.uuid),void 0===t[s.image]&&console.warn("THREE.ObjectLoader: Undefined image",s.image),(o=Array.isArray(t[s.image])?new CubeTexture(t[s.image]):new Texture(t[s.image])).needsUpdate=!0,o.uuid=s.uuid,void 0!==s.name&&(o.name=s.name),void 0!==s.mapping&&(o.mapping=r(s.mapping,TEXTURE_MAPPING)),void 0!==s.offset&&o.offset.fromArray(s.offset),void 0!==s.repeat&&o.repeat.fromArray(s.repeat),void 0!==s.center&&o.center.fromArray(s.center),void 0!==s.rotation&&(o.rotation=s.rotation),void 0!==s.wrap&&(o.wrapS=r(s.wrap[0],TEXTURE_WRAPPING),o.wrapT=r(s.wrap[1],TEXTURE_WRAPPING)),void 0!==s.format&&(o.format=s.format),void 0!==s.type&&(o.type=s.type),void 0!==s.encoding&&(o.encoding=s.encoding),void 0!==s.minFilter&&(o.minFilter=r(s.minFilter,TEXTURE_FILTER)),void 0!==s.magFilter&&(o.magFilter=r(s.magFilter,TEXTURE_FILTER)),void 0!==s.anisotropy&&(o.anisotropy=s.anisotropy),void 0!==s.flipY&&(o.flipY=s.flipY),void 0!==s.premultiplyAlpha&&(o.premultiplyAlpha=s.premultiplyAlpha),void 0!==s.unpackAlignment&&(o.unpackAlignment=s.unpackAlignment),n[s.uuid]=o}
return n},parseObject:function(e,t,r)
{var n;function i(e)
{return void 0===t[e]&&console.warn("THREE.ObjectLoader: Undefined geometry",e),t[e]}
function a(e)
{if(void 0!==e)
{if(Array.isArray(e))
{for(var t=[],n=0,i=e.length;n<i;n++)
{var a=e[n];void 0===r[a]&&console.warn("THREE.ObjectLoader: Undefined material",a),t.push(r[a])}
return t}
return void 0===r[e]&&console.warn("THREE.ObjectLoader: Undefined material",e),r[e]}}
switch(e.type)
{case "Scene":n=new Scene,void 0!==e.background&&Number.isInteger(e.background)&&(n.background=new Color(e.background)),void 0!==e.fog&&("Fog"===e.fog.type?n.fog=new Fog(e.fog.color,e.fog.near,e.fog.far):"FogExp2"===e.fog.type&&(n.fog=new FogExp2(e.fog.color,e.fog.density)));break;case "PerspectiveCamera":n=new PerspectiveCamera(e.fov,e.aspect,e.near,e.far),void 0!==e.focus&&(n.focus=e.focus),void 0!==e.zoom&&(n.zoom=e.zoom),void 0!==e.filmGauge&&(n.filmGauge=e.filmGauge),void 0!==e.filmOffset&&(n.filmOffset=e.filmOffset),void 0!==e.view&&(n.view=Object.assign({},e.view));break;case "OrthographicCamera":n=new OrthographicCamera(e.left,e.right,e.top,e.bottom,e.near,e.far),void 0!==e.zoom&&(n.zoom=e.zoom),void 0!==e.view&&(n.view=Object.assign({},e.view));break;case "AmbientLight":n=new AmbientLight(e.color,e.intensity);break;case "DirectionalLight":n=new DirectionalLight(e.color,e.intensity);break;case "PointLight":n=new PointLight(e.color,e.intensity,e.distance,e.decay);break;case "RectAreaLight":n=new RectAreaLight(e.color,e.intensity,e.width,e.height);break;case "SpotLight":n=new SpotLight(e.color,e.intensity,e.distance,e.angle,e.penumbra,e.decay);break;case "HemisphereLight":n=new HemisphereLight(e.color,e.groundColor,e.intensity);break;case "SkinnedMesh":console.warn("THREE.ObjectLoader.parseObject() does not support SkinnedMesh yet.");case "Mesh":var o=i(e.geometry),s=a(e.material);n=o.bones&&o.bones.length>0?new SkinnedMesh(o,s):new Mesh(o,s);break;case "InstancedMesh":o=i(e.geometry),s=a(e.material);var l=e.count,c=e.instanceMatrix;(n=new InstancedMesh(o,s,l)).instanceMatrix=new BufferAttribute(new Float32Array(c.array),16);break;case "LOD":n=new LOD;break;case "Line":n=new Line(i(e.geometry),a(e.material),e.mode);break;case "LineLoop":n=new LineLoop(i(e.geometry),a(e.material));break;case "LineSegments":n=new LineSegments(i(e.geometry),a(e.material));break;case "PointCloud":case "Points":n=new Points(i(e.geometry),a(e.material));break;case "Sprite":n=new Sprite(a(e.material));break;case "Group":n=new Group;break;default:n=new Object3D}
if(n.uuid=e.uuid,void 0!==e.name&&(n.name=e.name),void 0!==e.matrix?(n.matrix.fromArray(e.matrix),void 0!==e.matrixAutoUpdate&&(n.matrixAutoUpdate=e.matrixAutoUpdate),n.matrixAutoUpdate&&n.matrix.decompose(n.position,n.quaternion,n.scale)):(void 0!==e.position&&n.position.fromArray(e.position),void 0!==e.rotation&&n.rotation.fromArray(e.rotation),void 0!==e.quaternion&&n.quaternion.fromArray(e.quaternion),void 0!==e.scale&&n.scale.fromArray(e.scale)),void 0!==e.castShadow&&(n.castShadow=e.castShadow),void 0!==e.receiveShadow&&(n.receiveShadow=e.receiveShadow),e.shadow&&(void 0!==e.shadow.bias&&(n.shadow.bias=e.shadow.bias),void 0!==e.shadow.radius&&(n.shadow.radius=e.shadow.radius),void 0!==e.shadow.mapSize&&n.shadow.mapSize.fromArray(e.shadow.mapSize),void 0!==e.shadow.camera&&(n.shadow.camera=this.parseObject(e.shadow.camera))),void 0!==e.visible&&(n.visible=e.visible),void 0!==e.frustumCulled&&(n.frustumCulled=e.frustumCulled),void 0!==e.renderOrder&&(n.renderOrder=e.renderOrder),void 0!==e.userData&&(n.userData=e.userData),void 0!==e.layers&&(n.layers.mask=e.layers),void 0!==e.children)
for(var h=e.children,u=0;u<h.length;u++)n.add(this.parseObject(h[u],t,r));if("LOD"===e.type)
{void 0!==e.autoUpdate&&(n.autoUpdate=e.autoUpdate);for(var d=e.levels,p=0;p<d.length;p++)
{var m=d[p],f=n.getObjectByProperty("uuid",m.object);void 0!==f&&n.addLevel(f,m.distance)}}
return n}});var _context,TEXTURE_MAPPING={UVMapping:UVMapping,CubeReflectionMapping:CubeReflectionMapping,CubeRefractionMapping:CubeRefractionMapping,EquirectangularReflectionMapping:EquirectangularReflectionMapping,EquirectangularRefractionMapping:EquirectangularRefractionMapping,SphericalReflectionMapping:SphericalReflectionMapping,CubeUVReflectionMapping:CubeUVReflectionMapping,CubeUVRefractionMapping:CubeUVRefractionMapping},TEXTURE_WRAPPING={RepeatWrapping:RepeatWrapping,ClampToEdgeWrapping:ClampToEdgeWrapping,MirroredRepeatWrapping:MirroredRepeatWrapping},TEXTURE_FILTER={NearestFilter:NearestFilter,NearestMipmapNearestFilter:NearestMipmapNearestFilter,NearestMipmapLinearFilter:NearestMipmapLinearFilter,LinearFilter:LinearFilter,LinearMipmapNearestFilter:LinearMipmapNearestFilter,LinearMipmapLinearFilter:LinearMipmapLinearFilter};function ImageBitmapLoader(e)
{"undefined"==typeof createImageBitmap&&console.warn("THREE.ImageBitmapLoader: createImageBitmap() not supported."),"undefined"==typeof fetch&&console.warn("THREE.ImageBitmapLoader: fetch() not supported."),Loader.call(this,e),this.options=void 0}
function ShapePath()
{this.type="ShapePath",this.color=new Color,this.subPaths=[],this.currentPath=null}
function Font(e)
{this.type="Font",this.data=e}
function createPaths(e,t,r)
{for(var n=Array.from?Array.from(e):String(e).split(""),i=t/r.resolution,a=(r.boundingBox.yMax-r.boundingBox.yMin+r.underlineThickness)*i,o=[],s=0,l=0,c=0;c<n.length;c++)
{var h=n[c];if("\n"===h)s=0,l-=a;else{var u=createPath(h,i,s,l,r);s+=u.offsetX,o.push(u.path)}}
return o}
function createPath(e,t,r,n,i)
{var a=i.glyphs[e]||i.glyphs["?"];if(a)
{var o,s,l,c,h,u,d,p,m=new ShapePath;if(a.o)
for(var f=a._cachedOutline||(a._cachedOutline=a.o.split(" ")),g=0,v=f.length;g<v;)
{switch(f[g++])
{case "m":o=f[g++]*t+r,s=f[g++]*t+n,m.moveTo(o,s);break;case "l":o=f[g++]*t+r,s=f[g++]*t+n,m.lineTo(o,s);break;case "q":l=f[g++]*t+r,c=f[g++]*t+n,h=f[g++]*t+r,u=f[g++]*t+n,m.quadraticCurveTo(h,u,l,c);break;case "b":l=f[g++]*t+r,c=f[g++]*t+n,h=f[g++]*t+r,u=f[g++]*t+n,d=f[g++]*t+r,p=f[g++]*t+n,m.bezierCurveTo(h,u,d,p,l,c)}}
return{offsetX:a.ha*t,path:m}}
console.error('THREE.Font: character "'+e+'" does not exists in font family '+i.familyName+".")}
function FontLoader(e)
{Loader.call(this,e)}
ImageBitmapLoader.prototype=Object.assign(Object.create(Loader.prototype),{constructor:ImageBitmapLoader,setOptions:function(e)
{return this.options=e,this},load:function(e,t,r,n)
{void 0===e&&(e=""),void 0!==this.path&&(e=this.path+e),e=this.manager.resolveURL(e);var i=this,a=Cache.get(e);if(void 0!==a)return i.manager.itemStart(e),setTimeout(function()
{t&&t(a),i.manager.itemEnd(e)},0),a;fetch(e).then(function(e)
{return e.blob()}).then(function(e)
{return void 0===i.options?createImageBitmap(e):createImageBitmap(e,i.options)}).then(function(r)
{Cache.add(e,r),t&&t(r),i.manager.itemEnd(e)}).catch(function(t)
{n&&n(t),i.manager.itemError(e),i.manager.itemEnd(e)}),i.manager.itemStart(e)}}),Object.assign(ShapePath.prototype,{moveTo:function(e,t)
{return this.currentPath=new Path,this.subPaths.push(this.currentPath),this.currentPath.moveTo(e,t),this},lineTo:function(e,t)
{return this.currentPath.lineTo(e,t),this},quadraticCurveTo:function(e,t,r,n)
{return this.currentPath.quadraticCurveTo(e,t,r,n),this},bezierCurveTo:function(e,t,r,n,i,a)
{return this.currentPath.bezierCurveTo(e,t,r,n,i,a),this},splineThru:function(e)
{return this.currentPath.splineThru(e),this},toShapes:function(e,t)
{function r(e)
{for(var t=[],r=0,n=e.length;r<n;r++)
{var i=e[r],a=new Shape;a.curves=i.curves,t.push(a)}
return t}
function n(e,t)
{for(var r=t.length,n=!1,i=r-1,a=0;a<r;i=a++)
{var o=t[i],s=t[a],l=s.x-o.x,c=s.y-o.y;if(Math.abs(c)>Number.EPSILON)
{if(c<0&&(o=t[a],l=-l,s=t[i],c=-c),e.y<o.y||e.y>s.y)continue;if(e.y===o.y)
{if(e.x===o.x)return!0}
else{var h=c*(e.x-o.x)-l*(e.y-o.y);if(0===h)return!0;if(h<0)continue;n=!n}}
else{if(e.y!==o.y)continue;if(s.x<=e.x&&e.x<=o.x||o.x<=e.x&&e.x<=s.x)return!0}}
return n}
var i=ShapeUtils.isClockWise,a=this.subPaths;if(0===a.length)return[];if(!0===t)return r(a);var o,s,l,c=[];if(1===a.length)return s=a[0],(l=new Shape).curves=s.curves,c.push(l),c;var h=!i(a[0].getPoints());h=e?!h:h;var u,d,p=[],m=[],f=[],g=0;m[g]=void 0,f[g]=[];for(var v=0,y=a.length;v<y;v++)o=i(u=(s=a[v]).getPoints()),(o=e?!o:o)?(!h&&m[g]&&g++,m[g]={s:new Shape,p:u},m[g].s.curves=s.curves,h&&g++,f[g]=[]):f[g].push({h:s,p:u[0]});if(!m[0])return r(a);if(m.length>1)
{for(var _=!1,b=[],x=0,M=m.length;x<M;x++)p[x]=[];for(x=0,M=m.length;x<M;x++)
for(var w=f[x],S=0;S<w.length;S++)
{for(var T=w[S],E=!0,A=0;A<m.length;A++)n(T.p,m[A].p)&&(x!==A&&b.push({froms:x,tos:A,hole:S}),E?(E=!1,p[A].push(T)):_=!0);E&&p[x].push(T)}
b.length>0&&(_||(f=p))}
v=0;for(var L=m.length;v<L;v++)
{l=m[v].s,c.push(l);for(var C=0,R=(d=f[v]).length;C<R;C++)l.holes.push(d[C].h)}
return c}}),Object.assign(Font.prototype,{isFont:!0,generateShapes:function(e,t)
{void 0===t&&(t=100);for(var r=[],n=createPaths(e,t,this.data),i=0,a=n.length;i<a;i++)Array.prototype.push.apply(r,n[i].toShapes());return r}}),FontLoader.prototype=Object.assign(Object.create(Loader.prototype),{constructor:FontLoader,load:function(e,t,r,n)
{var i=this,a=new FileLoader(this.manager);a.setPath(this.path),a.load(e,function(e)
{var r;try
{r=JSON.parse(e)}
catch(t)
{console.warn("THREE.FontLoader: typeface.js support is being deprecated. Use typeface.json instead."),r=JSON.parse(e.substring(65,e.length-2))}
var n=i.parse(r);t&&t(n)},r,n)},parse:function(e)
{return new Font(e)}});var AudioContext={getContext:function()
{return void 0===_context&&(_context=new(window.AudioContext||window.webkitAudioContext)),_context},setContext:function(e)
{_context=e}};function AudioLoader(e)
{Loader.call(this,e)}
function SphericalHarmonics3()
{this.coefficients=[];for(var e=0;e<9;e++)this.coefficients.push(new Vector3)}
function LightProbe(e,t)
{Light.call(this,void 0,t),this.sh=void 0!==e?e:new SphericalHarmonics3}
function HemisphereLightProbe(e,t,r)
{LightProbe.call(this,void 0,r);var n=(new Color).set(e),i=(new Color).set(t),a=new Vector3(n.r,n.g,n.b),o=new Vector3(i.r,i.g,i.b),s=Math.sqrt(Math.PI),l=s*Math.sqrt(.75);this.sh.coefficients[0].copy(a).add(o).multiplyScalar(s),this.sh.coefficients[1].copy(a).sub(o).multiplyScalar(l)}
function AmbientLightProbe(e,t)
{LightProbe.call(this,void 0,t);var r=(new Color).set(e);this.sh.coefficients[0].set(r.r,r.g,r.b).multiplyScalar(2*Math.sqrt(Math.PI))}
AudioLoader.prototype=Object.assign(Object.create(Loader.prototype),{constructor:AudioLoader,load:function(e,t,r,n)
{var i=new FileLoader(this.manager);i.setResponseType("arraybuffer"),i.setPath(this.path),i.load(e,function(e)
{var r=e.slice(0);AudioContext.getContext().decodeAudioData(r,function(e)
{t(e)})},r,n)}}),Object.assign(SphericalHarmonics3.prototype,{isSphericalHarmonics3:!0,set:function(e)
{for(var t=0;t<9;t++)this.coefficients[t].copy(e[t]);return this},zero:function()
{for(var e=0;e<9;e++)this.coefficients[e].set(0,0,0);return this},getAt:function(e,t)
{var r=e.x,n=e.y,i=e.z,a=this.coefficients;return t.copy(a[0]).multiplyScalar(.282095),t.addScale(a[1],.488603*n),t.addScale(a[2],.488603*i),t.addScale(a[3],.488603*r),t.addScale(a[4],r*n*1.092548),t.addScale(a[5],n*i*1.092548),t.addScale(a[6],.315392*(3*i*i-1)),t.addScale(a[7],r*i*1.092548),t.addScale(a[8],.546274*(r*r-n*n)),t},getIrradianceAt:function(e,t)
{var r=e.x,n=e.y,i=e.z,a=this.coefficients;return t.copy(a[0]).multiplyScalar(.886227),t.addScale(a[1],1.023328*n),t.addScale(a[2],1.023328*i),t.addScale(a[3],1.023328*r),t.addScale(a[4],.858086*r*n),t.addScale(a[5],.858086*n*i),t.addScale(a[6],.743125*i*i-.247708),t.addScale(a[7],.858086*r*i),t.addScale(a[8],.429043*(r*r-n*n)),t},add:function(e)
{for(var t=0;t<9;t++)this.coefficients[t].add(e.coefficients[t]);return this},scale:function(e)
{for(var t=0;t<9;t++)this.coefficients[t].multiplyScalar(e);return this},lerp:function(e,t)
{for(var r=0;r<9;r++)this.coefficients[r].lerp(e.coefficients[r],t);return this},equals:function(e)
{for(var t=0;t<9;t++)
if(!this.coefficients[t].equals(e.coefficients[t]))return!1;return!0},copy:function(e)
{return this.set(e.coefficients)},clone:function()
{return(new this.constructor).copy(this)},fromArray:function(e,t)
{void 0===t&&(t=0);for(var r=this.coefficients,n=0;n<9;n++)r[n].fromArray(e,t+3*n);return this},toArray:function(e,t)
{void 0===e&&(e=[]),void 0===t&&(t=0);for(var r=this.coefficients,n=0;n<9;n++)r[n].toArray(e,t+3*n);return e}}),Object.assign(SphericalHarmonics3,{getBasisAt:function(e,t)
{var r=e.x,n=e.y,i=e.z;t[0]=.282095,t[1]=.488603*n,t[2]=.488603*i,t[3]=.488603*r,t[4]=1.092548*r*n,t[5]=1.092548*n*i,t[6]=.315392*(3*i*i-1),t[7]=1.092548*r*i,t[8]=.546274*(r*r-n*n)}}),LightProbe.prototype=Object.assign(Object.create(Light.prototype),{constructor:LightProbe,isLightProbe:!0,copy:function(e)
{return Light.prototype.copy.call(this,e),this.sh.copy(e.sh),this.intensity=e.intensity,this},toJSON:function(e)
{return Light.prototype.toJSON.call(this,e)}}),HemisphereLightProbe.prototype=Object.assign(Object.create(LightProbe.prototype),{constructor:HemisphereLightProbe,isHemisphereLightProbe:!0,copy:function(e)
{return LightProbe.prototype.copy.call(this,e),this},toJSON:function(e)
{return LightProbe.prototype.toJSON.call(this,e)}}),AmbientLightProbe.prototype=Object.assign(Object.create(LightProbe.prototype),{constructor:AmbientLightProbe,isAmbientLightProbe:!0,copy:function(e)
{return LightProbe.prototype.copy.call(this,e),this},toJSON:function(e)
{return LightProbe.prototype.toJSON.call(this,e)}});var _eyeRight=new Matrix4,_eyeLeft=new Matrix4;function StereoCamera()
{this.type="StereoCamera",this.aspect=1,this.eyeSep=.064,this.cameraL=new PerspectiveCamera,this.cameraL.layers.enable(1),this.cameraL.matrixAutoUpdate=!1,this.cameraR=new PerspectiveCamera,this.cameraR.layers.enable(2),this.cameraR.matrixAutoUpdate=!1,this._cache={focus:null,fov:null,aspect:null,near:null,far:null,zoom:null,eyeSep:null}}
function Clock(e)
{this.autoStart=void 0===e||e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}
Object.assign(StereoCamera.prototype,{update:function(e)
{var t=this._cache;if(t.focus!==e.focus||t.fov!==e.fov||t.aspect!==e.aspect*this.aspect||t.near!==e.near||t.far!==e.far||t.zoom!==e.zoom||t.eyeSep!==this.eyeSep)
{t.focus=e.focus,t.fov=e.fov,t.aspect=e.aspect*this.aspect,t.near=e.near,t.far=e.far,t.zoom=e.zoom,t.eyeSep=this.eyeSep;var r,n,i=e.projectionMatrix.clone(),a=t.eyeSep/2,o=a*t.near/t.focus,s=t.near*Math.tan(MathUtils.DEG2RAD*t.fov*.5)/t.zoom;_eyeLeft.elements[12]=-a,_eyeRight.elements[12]=a,r=-s*t.aspect+o,n=s*t.aspect+o,i.elements[0]=2*t.near/(n-r),i.elements[8]=(n+r)/(n-r),this.cameraL.projectionMatrix.copy(i),r=-s*t.aspect-o,n=s*t.aspect-o,i.elements[0]=2*t.near/(n-r),i.elements[8]=(n+r)/(n-r),this.cameraR.projectionMatrix.copy(i)}
this.cameraL.matrixWorld.copy(e.matrixWorld).multiply(_eyeLeft),this.cameraR.matrixWorld.copy(e.matrixWorld).multiply(_eyeRight)}}),Object.assign(Clock.prototype,{start:function()
{this.startTime=("undefined"==typeof performance?Date:performance).now(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0},stop:function()
{this.getElapsedTime(),this.running=!1,this.autoStart=!1},getElapsedTime:function()
{return this.getDelta(),this.elapsedTime},getDelta:function()
{var e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running)
{var t=("undefined"==typeof performance?Date:performance).now();e=(t-this.oldTime)/1e3,this.oldTime=t,this.elapsedTime+=e}
return e}});var _position$2=new Vector3,_quaternion$3=new Quaternion,_scale$1=new Vector3,_orientation=new Vector3;function AudioListener()
{Object3D.call(this),this.type="AudioListener",this.context=AudioContext.getContext(),this.gain=this.context.createGain(),this.gain.connect(this.context.destination),this.filter=null,this.timeDelta=0,this._clock=new Clock}
function Audio(e)
{Object3D.call(this),this.type="Audio",this.listener=e,this.context=e.context,this.gain=this.context.createGain(),this.gain.connect(e.getInput()),this.autoplay=!1,this.buffer=null,this.detune=0,this.loop=!1,this.loopStart=0,this.loopEnd=0,this.offset=0,this.duration=void 0,this.playbackRate=1,this.isPlaying=!1,this.hasPlaybackControl=!0,this.sourceType="empty",this._startedAt=0,this._pausedAt=0,this.filters=[]}
AudioListener.prototype=Object.assign(Object.create(Object3D.prototype),{constructor:AudioListener,getInput:function()
{return this.gain},removeFilter:function()
{return null!==this.filter&&(this.gain.disconnect(this.filter),this.filter.disconnect(this.context.destination),this.gain.connect(this.context.destination),this.filter=null),this},getFilter:function()
{return this.filter},setFilter:function(e)
{return null!==this.filter?(this.gain.disconnect(this.filter),this.filter.disconnect(this.context.destination)):this.gain.disconnect(this.context.destination),this.filter=e,this.gain.connect(this.filter),this.filter.connect(this.context.destination),this},getMasterVolume:function()
{return this.gain.gain.value},setMasterVolume:function(e)
{return this.gain.gain.setTargetAtTime(e,this.context.currentTime,.01),this},updateMatrixWorld:function(e)
{Object3D.prototype.updateMatrixWorld.call(this,e);var t=this.context.listener,r=this.up;if(this.timeDelta=this._clock.getDelta(),this.matrixWorld.decompose(_position$2,_quaternion$3,_scale$1),_orientation.set(0,0,-1).applyQuaternion(_quaternion$3),t.positionX)
{var n=this.context.currentTime+this.timeDelta;t.positionX.linearRampToValueAtTime(_position$2.x,n),t.positionY.linearRampToValueAtTime(_position$2.y,n),t.positionZ.linearRampToValueAtTime(_position$2.z,n),t.forwardX.linearRampToValueAtTime(_orientation.x,n),t.forwardY.linearRampToValueAtTime(_orientation.y,n),t.forwardZ.linearRampToValueAtTime(_orientation.z,n),t.upX.linearRampToValueAtTime(r.x,n),t.upY.linearRampToValueAtTime(r.y,n),t.upZ.linearRampToValueAtTime(r.z,n)}
else t.setPosition(_position$2.x,_position$2.y,_position$2.z),t.setOrientation(_orientation.x,_orientation.y,_orientation.z,r.x,r.y,r.z)}}),Audio.prototype=Object.assign(Object.create(Object3D.prototype),{constructor:Audio,getOutput:function()
{return this.gain},setNodeSource:function(e)
{return this.hasPlaybackControl=!1,this.sourceType="audioNode",this.source=e,this.connect(),this},setMediaElementSource:function(e)
{return this.hasPlaybackControl=!1,this.sourceType="mediaNode",this.source=this.context.createMediaElementSource(e),this.connect(),this},setMediaStreamSource:function(e)
{return this.hasPlaybackControl=!1,this.sourceType="mediaStreamNode",this.source=this.context.createMediaStreamSource(e),this.connect(),this},setBuffer:function(e)
{return this.buffer=e,this.sourceType="buffer",this.autoplay&&this.play(),this},play:function(e)
{if(void 0===e&&(e=0),!0!==this.isPlaying)
{if(!1!==this.hasPlaybackControl)
{this._startedAt=this.context.currentTime+e;var t=this.context.createBufferSource();return t.buffer=this.buffer,t.loop=this.loop,t.loopStart=this.loopStart,t.loopEnd=this.loopEnd,t.onended=this.onEnded.bind(this),t.start(this._startedAt,this._pausedAt+this.offset,this.duration),this.isPlaying=!0,this.source=t,this.setDetune(this.detune),this.setPlaybackRate(this.playbackRate),this.connect()}
console.warn("THREE.Audio: this Audio has no playback control.")}
else console.warn("THREE.Audio: Audio is already playing.")},pause:function()
{if(!1!==this.hasPlaybackControl)return!0===this.isPlaying&&(this._pausedAt=(this.context.currentTime-this._startedAt)*this.playbackRate,this.source.stop(),this.source.onended=null,this.isPlaying=!1),this;console.warn("THREE.Audio: this Audio has no playback control.")},stop:function()
{if(!1!==this.hasPlaybackControl)return this._pausedAt=0,this.source.stop(),this.source.onended=null,this.isPlaying=!1,this;console.warn("THREE.Audio: this Audio has no playback control.")},connect:function()
{if(this.filters.length>0)
{this.source.connect(this.filters[0]);for(var e=1,t=this.filters.length;e<t;e++)this.filters[e-1].connect(this.filters[e]);this.filters[this.filters.length-1].connect(this.getOutput())}
else this.source.connect(this.getOutput());return this},disconnect:function()
{if(this.filters.length>0)
{this.source.disconnect(this.filters[0]);for(var e=1,t=this.filters.length;e<t;e++)this.filters[e-1].disconnect(this.filters[e]);this.filters[this.filters.length-1].disconnect(this.getOutput())}
else this.source.disconnect(this.getOutput());return this},getFilters:function()
{return this.filters},setFilters:function(e)
{return e||(e=[]),!0===this.isPlaying?(this.disconnect(),this.filters=e,this.connect()):this.filters=e,this},setDetune:function(e)
{if(this.detune=e,void 0!==this.source.detune)return!0===this.isPlaying&&this.source.detune.setTargetAtTime(this.detune,this.context.currentTime,.01),this},getDetune:function()
{return this.detune},getFilter:function()
{return this.getFilters()[0]},setFilter:function(e)
{return this.setFilters(e?[e]:[])},setPlaybackRate:function(e)
{if(!1!==this.hasPlaybackControl)return this.playbackRate=e,!0===this.isPlaying&&this.source.playbackRate.setTargetAtTime(this.playbackRate,this.context.currentTime,.01),this;console.warn("THREE.Audio: this Audio has no playback control.")},getPlaybackRate:function()
{return this.playbackRate},onEnded:function()
{this.isPlaying=!1},getLoop:function()
{return!1===this.hasPlaybackControl?(console.warn("THREE.Audio: this Audio has no playback control."),!1):this.loop},setLoop:function(e)
{if(!1!==this.hasPlaybackControl)return this.loop=e,!0===this.isPlaying&&(this.source.loop=this.loop),this;console.warn("THREE.Audio: this Audio has no playback control.")},setLoopStart:function(e)
{return this.loopStart=e,this},setLoopEnd:function(e)
{return this.loopEnd=e,this},getVolume:function()
{return this.gain.gain.value},setVolume:function(e)
{return this.gain.gain.setTargetAtTime(e,this.context.currentTime,.01),this}});var _position$3=new Vector3,_quaternion$4=new Quaternion,_scale$2=new Vector3,_orientation$1=new Vector3;function PositionalAudio(e)
{Audio.call(this,e),this.panner=this.context.createPanner(),this.panner.panningModel="HRTF",this.panner.connect(this.gain)}
function AudioAnalyser(e,t)
{this.analyser=e.context.createAnalyser(),this.analyser.fftSize=void 0!==t?t:2048,this.data=new Uint8Array(this.analyser.frequencyBinCount),e.getOutput().connect(this.analyser)}
function PropertyMixer(e,t,r)
{this.binding=e,this.valueSize=r;var n,i=Float64Array;switch(t)
{case "quaternion":n=this._slerp;break;case "string":case "bool":i=Array,n=this._select;break;default:n=this._lerp}
this.buffer=new i(4*r),this._mixBufferRegion=n,this.cumulativeWeight=0,this.useCount=0,this.referenceCount=0}
PositionalAudio.prototype=Object.assign(Object.create(Audio.prototype),{constructor:PositionalAudio,getOutput:function()
{return this.panner},getRefDistance:function()
{return this.panner.refDistance},setRefDistance:function(e)
{return this.panner.refDistance=e,this},getRolloffFactor:function()
{return this.panner.rolloffFactor},setRolloffFactor:function(e)
{return this.panner.rolloffFactor=e,this},getDistanceModel:function()
{return this.panner.distanceModel},setDistanceModel:function(e)
{return this.panner.distanceModel=e,this},getMaxDistance:function()
{return this.panner.maxDistance},setMaxDistance:function(e)
{return this.panner.maxDistance=e,this},setDirectionalCone:function(e,t,r)
{return this.panner.coneInnerAngle=e,this.panner.coneOuterAngle=t,this.panner.coneOuterGain=r,this},updateMatrixWorld:function(e)
{if(Object3D.prototype.updateMatrixWorld.call(this,e),!0!==this.hasPlaybackControl||!1!==this.isPlaying)
{this.matrixWorld.decompose(_position$3,_quaternion$4,_scale$2),_orientation$1.set(0,0,1).applyQuaternion(_quaternion$4);var t=this.panner;if(t.positionX)
{var r=this.context.currentTime+this.listener.timeDelta;t.positionX.linearRampToValueAtTime(_position$3.x,r),t.positionY.linearRampToValueAtTime(_position$3.y,r),t.positionZ.linearRampToValueAtTime(_position$3.z,r),t.orientationX.linearRampToValueAtTime(_orientation$1.x,r),t.orientationY.linearRampToValueAtTime(_orientation$1.y,r),t.orientationZ.linearRampToValueAtTime(_orientation$1.z,r)}
else t.setPosition(_position$3.x,_position$3.y,_position$3.z),t.setOrientation(_orientation$1.x,_orientation$1.y,_orientation$1.z)}}}),Object.assign(AudioAnalyser.prototype,{getFrequencyData:function()
{return this.analyser.getByteFrequencyData(this.data),this.data},getAverageFrequency:function()
{for(var e=0,t=this.getFrequencyData(),r=0;r<t.length;r++)e+=t[r];return e/t.length}}),Object.assign(PropertyMixer.prototype,{accumulate:function(e,t)
{var r=this.buffer,n=this.valueSize,i=e*n+n,a=this.cumulativeWeight;if(0===a)
{for(var o=0;o!==n;++o)r[i+o]=r[o];a=t}
else{var s=t/(a+=t);this._mixBufferRegion(r,i,0,s,n)}
this.cumulativeWeight=a},apply:function(e)
{var t=this.valueSize,r=this.buffer,n=e*t+t,i=this.cumulativeWeight,a=this.binding;if(this.cumulativeWeight=0,i<1)
{var o=3*t;this._mixBufferRegion(r,n,o,1-i,t)}
for(var s=t,l=t+t;s!==l;++s)
if(r[s]!==r[s+t])
{a.setValue(r,n);break}},saveOriginalState:function()
{var e=this.binding,t=this.buffer,r=this.valueSize,n=3*r;e.getValue(t,n);for(var i=r,a=n;i!==a;++i)t[i]=t[n+i%r];this.cumulativeWeight=0},restoreOriginalState:function()
{var e=3*this.valueSize;this.binding.setValue(this.buffer,e)},_select:function(e,t,r,n,i)
{if(n>=.5)
for(var a=0;a!==i;++a)e[t+a]=e[r+a]},_slerp:function(e,t,r,n)
{Quaternion.slerpFlat(e,t,e,t,e,r,n)},_lerp:function(e,t,r,n,i)
{for(var a=1-n,o=0;o!==i;++o)
{var s=t+o;e[s]=e[s]*a+e[r+o]*n}}});var _RESERVED_CHARS_RE="\\[\\]\\.:\\/",_reservedRe=new RegExp("["+_RESERVED_CHARS_RE+"]","g"),_wordChar="[^"+_RESERVED_CHARS_RE+"]",_wordCharOrDot="[^"+_RESERVED_CHARS_RE.replace("\\.","")+"]",_directoryRe=/((?:WC+[\/:])*)/.source.replace("WC",_wordChar),_nodeRe=/(WCOD+)?/.source.replace("WCOD",_wordCharOrDot),_objectRe=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",_wordChar),_propertyRe=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",_wordChar),_trackRe=new RegExp("^"+_directoryRe+_nodeRe+_objectRe+_propertyRe+"$"),_supportedObjectNames=["material","materials","bones"];function Composite(e,t,r)
{var n=r||PropertyBinding.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,n)}
function PropertyBinding(e,t,r)
{this.path=t,this.parsedPath=r||PropertyBinding.parseTrackName(t),this.node=PropertyBinding.findNode(e,this.parsedPath.nodeName)||e,this.rootNode=e}
function AnimationObjectGroup()
{this.uuid=MathUtils.generateUUID(),this._objects=Array.prototype.slice.call(arguments),this.nCachedObjects_=0;var e={};this._indicesByUUID=e;for(var t=0,r=arguments.length;t!==r;++t)e[arguments[t].uuid]=t;this._paths=[],this._parsedPaths=[],this._bindings=[],this._bindingsIndicesByPath={};var n=this;this.stats={objects:{get total()
{return n._objects.length},get inUse()
{return this.total-n.nCachedObjects_}},get bindingsPerObject()
{return n._bindings.length}}}
function AnimationAction(e,t,r)
{this._mixer=e,this._clip=t,this._localRoot=r||null;for(var n=t.tracks,i=n.length,a=new Array(i),o={endingStart:ZeroCurvatureEnding,endingEnd:ZeroCurvatureEnding},s=0;s!==i;++s)
{var l=n[s].createInterpolant(null);a[s]=l,l.settings=o}
this._interpolantSettings=o,this._interpolants=a,this._propertyBindings=new Array(i),this._cacheIndex=null,this._byClipCacheIndex=null,this._timeScaleInterpolant=null,this._weightInterpolant=null,this.loop=LoopRepeat,this._loopCount=-1,this._startTime=null,this.time=0,this.timeScale=1,this._effectiveTimeScale=1,this.weight=1,this._effectiveWeight=1,this.repetitions=1/0,this.paused=!1,this.enabled=!0,this.clampWhenFinished=!1,this.zeroSlopeAtStart=!0,this.zeroSlopeAtEnd=!0}
function AnimationMixer(e)
{this._root=e,this._initMemoryManager(),this._accuIndex=0,this.time=0,this.timeScale=1}
function Uniform(e)
{"string"==typeof e&&(console.warn("THREE.Uniform: Type parameter is no longer needed."),e=arguments[1]),this.value=e}
function InstancedInterleavedBuffer(e,t,r)
{InterleavedBuffer.call(this,e,t),this.meshPerAttribute=r||1}
function Raycaster(e,t,r,n)
{this.ray=new Ray(e,t),this.near=r||0,this.far=n||1/0,this.camera=null,this.params={Mesh:{},Line:{},LOD:{},Points:{threshold:1},Sprite:{}},Object.defineProperties(this.params,{PointCloud:{get:function()
{return console.warn("THREE.Raycaster: params.PointCloud has been renamed to params.Points."),this.Points}}})}
function ascSort(e,t)
{return e.distance-t.distance}
function intersectObject(e,t,r,n)
{if(!1!==e.visible&&(e.raycast(t,r),!0===n))
for(var i=e.children,a=0,o=i.length;a<o;a++)intersectObject(i[a],t,r,!0)}
function Spherical(e,t,r)
{return this.radius=void 0!==e?e:1,this.phi=void 0!==t?t:0,this.theta=void 0!==r?r:0,this}
function Cylindrical(e,t,r)
{return this.radius=void 0!==e?e:1,this.theta=void 0!==t?t:0,this.y=void 0!==r?r:0,this}
Object.assign(Composite.prototype,{getValue:function(e,t)
{this.bind();var r=this._targetGroup.nCachedObjects_,n=this._bindings[r];void 0!==n&&n.getValue(e,t)},setValue:function(e,t)
{for(var r=this._bindings,n=this._targetGroup.nCachedObjects_,i=r.length;n!==i;++n)r[n].setValue(e,t)},bind:function()
{for(var e=this._bindings,t=this._targetGroup.nCachedObjects_,r=e.length;t!==r;++t)e[t].bind()},unbind:function()
{for(var e=this._bindings,t=this._targetGroup.nCachedObjects_,r=e.length;t!==r;++t)e[t].unbind()}}),Object.assign(PropertyBinding,{Composite:Composite,create:function(e,t,r)
{return e&&e.isAnimationObjectGroup?new PropertyBinding.Composite(e,t,r):new PropertyBinding(e,t,r)},sanitizeNodeName:function(e)
{return e.replace(/\s/g,"_").replace(_reservedRe,"")},parseTrackName:function(e)
{var t=_trackRe.exec(e);if(!t)throw new Error("PropertyBinding: Cannot parse trackName: "+e);var r={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},n=r.nodeName&&r.nodeName.lastIndexOf(".");if(void 0!==n&&-1!==n)
{var i=r.nodeName.substring(n+1);-1!==_supportedObjectNames.indexOf(i)&&(r.nodeName=r.nodeName.substring(0,n),r.objectName=i)}
if(null===r.propertyName||0===r.propertyName.length)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return r},findNode:function(e,t)
{if(!t||""===t||"root"===t||"."===t||-1===t||t===e.name||t===e.uuid)return e;if(e.skeleton)
{var r=e.skeleton.getBoneByName(t);if(void 0!==r)return r}
if(e.children)
{var n=function(e)
{for(var r=0;r<e.length;r++)
{var i=e[r];if(i.name===t||i.uuid===t)return i;var a=n(i.children);if(a)return a}
return null},i=n(e.children);if(i)return i}
return null}}),Object.assign(PropertyBinding.prototype,{_getValue_unavailable:function(){},_setValue_unavailable:function(){},BindingType:{Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3},Versioning:{None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2},GetterByBindingType:[function(e,t)
{e[t]=this.node[this.propertyName]},function(e,t)
{for(var r=this.resolvedProperty,n=0,i=r.length;n!==i;++n)e[t++]=r[n]},function(e,t)
{e[t]=this.resolvedProperty[this.propertyIndex]},function(e,t)
{this.resolvedProperty.toArray(e,t)}],SetterByBindingTypeAndVersioning:[[function(e,t)
{this.targetObject[this.propertyName]=e[t]},function(e,t)
{this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0},function(e,t)
{this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}],[function(e,t)
{for(var r=this.resolvedProperty,n=0,i=r.length;n!==i;++n)r[n]=e[t++]},function(e,t)
{for(var r=this.resolvedProperty,n=0,i=r.length;n!==i;++n)r[n]=e[t++];this.targetObject.needsUpdate=!0},function(e,t)
{for(var r=this.resolvedProperty,n=0,i=r.length;n!==i;++n)r[n]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}],[function(e,t)
{this.resolvedProperty[this.propertyIndex]=e[t]},function(e,t)
{this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0},function(e,t)
{this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}],[function(e,t)
{this.resolvedProperty.fromArray(e,t)},function(e,t)
{this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0},function(e,t)
{this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}]],getValue:function(e,t)
{this.bind(),this.getValue(e,t)},setValue:function(e,t)
{this.bind(),this.setValue(e,t)},bind:function()
{var e=this.node,t=this.parsedPath,r=t.objectName,n=t.propertyName,i=t.propertyIndex;if(e||(e=PropertyBinding.findNode(this.rootNode,t.nodeName)||this.rootNode,this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,e)
{if(r)
{var a=t.objectIndex;switch(r)
{case "materials":if(!e.material)return void console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);if(!e.material.materials)return void console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);e=e.material.materials;break;case "bones":if(!e.skeleton)return void console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);e=e.skeleton.bones;for(var o=0;o<e.length;o++)
if(e[o].name===a)
{a=o;break}break;default:if(void 0===e[r])return void console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);e=e[r]}
if(void 0!==a)
{if(void 0===e[a])return void console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);e=e[a]}}
var s=e[n];if(void 0!==s)
{var l=this.Versioning.None;this.targetObject=e,void 0!==e.needsUpdate?l=this.Versioning.NeedsUpdate:void 0!==e.matrixWorldNeedsUpdate&&(l=this.Versioning.MatrixWorldNeedsUpdate);var c=this.BindingType.Direct;if(void 0!==i)
{if("morphTargetInfluences"===n)
{if(!e.geometry)return void console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);if(e.geometry.isBufferGeometry)
{if(!e.geometry.morphAttributes)return void console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);for(o=0;o<this.node.geometry.morphAttributes.position.length;o++)
if(e.geometry.morphAttributes.position[o].name===i)
{i=o;break}}
else{if(!e.geometry.morphTargets)return void console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphTargets.",this);for(o=0;o<this.node.geometry.morphTargets.length;o++)
if(e.geometry.morphTargets[o].name===i)
{i=o;break}}}
c=this.BindingType.ArrayElement,this.resolvedProperty=s,this.propertyIndex=i}
else void 0!==s.fromArray&&void 0!==s.toArray?(c=this.BindingType.HasFromToArray,this.resolvedProperty=s):Array.isArray(s)?(c=this.BindingType.EntireArray,this.resolvedProperty=s):this.propertyName=n;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][l]}
else{var h=t.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+h+"."+n+" but it wasn't found.",e)}}
else console.error("THREE.PropertyBinding: Trying to update node for track: "+this.path+" but it wasn't found.")},unbind:function()
{this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}),Object.assign(PropertyBinding.prototype,{_getValue_unbound:PropertyBinding.prototype.getValue,_setValue_unbound:PropertyBinding.prototype.setValue}),Object.assign(AnimationObjectGroup.prototype,{isAnimationObjectGroup:!0,add:function()
{for(var e=this._objects,t=e.length,r=this.nCachedObjects_,n=this._indicesByUUID,i=this._paths,a=this._parsedPaths,o=this._bindings,s=o.length,l=void 0,c=0,h=arguments.length;c!==h;++c)
{var u=arguments[c],d=u.uuid,p=n[d];if(void 0===p)
{p=t++,n[d]=p,e.push(u);for(var m=0,f=s;m!==f;++m)o[m].push(new PropertyBinding(u,i[m],a[m]))}
else if(p<r)
{l=e[p];var g=--r,v=e[g];n[v.uuid]=p,e[p]=v,n[d]=g,e[g]=u;for(m=0,f=s;m!==f;++m)
{var y=o[m],_=y[g],b=y[p];y[p]=_,void 0===b&&(b=new PropertyBinding(u,i[m],a[m])),y[g]=b}}
else e[p]!==l&&console.error("THREE.AnimationObjectGroup: Different objects with the same UUID detected. Clean the caches or recreate your infrastructure when reloading scenes.")}
this.nCachedObjects_=r},remove:function()
{for(var e=this._objects,t=this.nCachedObjects_,r=this._indicesByUUID,n=this._bindings,i=n.length,a=0,o=arguments.length;a!==o;++a)
{var s=arguments[a],l=s.uuid,c=r[l];if(void 0!==c&&c>=t)
{var h=t++,u=e[h];r[u.uuid]=c,e[c]=u,r[l]=h,e[h]=s;for(var d=0,p=i;d!==p;++d)
{var m=n[d],f=m[h],g=m[c];m[c]=f,m[h]=g}}}
this.nCachedObjects_=t},uncache:function()
{for(var e=this._objects,t=e.length,r=this.nCachedObjects_,n=this._indicesByUUID,i=this._bindings,a=i.length,o=0,s=arguments.length;o!==s;++o)
{var l=arguments[o].uuid,c=n[l];if(void 0!==c)
if(delete n[l],c<r)
{var h=--r,u=e[h],d=e[v=--t];n[u.uuid]=c,e[c]=u,n[d.uuid]=h,e[h]=d,e.pop();for(var p=0,m=a;p!==m;++p)
{var f=(y=i[p])[h],g=y[v];y[c]=f,y[h]=g,y.pop()}}
else{var v;n[(d=e[v=--t]).uuid]=c,e[c]=d,e.pop();for(p=0,m=a;p!==m;++p)
{var y;(y=i[p])[c]=y[v],y.pop()}}}
this.nCachedObjects_=r},subscribe_:function(e,t)
{var r=this._bindingsIndicesByPath,n=r[e],i=this._bindings;if(void 0!==n)return i[n];var a=this._paths,o=this._parsedPaths,s=this._objects,l=s.length,c=this.nCachedObjects_,h=new Array(l);n=i.length,r[e]=n,a.push(e),o.push(t),i.push(h);for(var u=c,d=s.length;u!==d;++u)
{var p=s[u];h[u]=new PropertyBinding(p,e,t)}
return h},unsubscribe_:function(e)
{var t=this._bindingsIndicesByPath,r=t[e];if(void 0!==r)
{var n=this._paths,i=this._parsedPaths,a=this._bindings,o=a.length-1,s=a[o];t[e[o]]=r,a[r]=s,a.pop(),i[r]=i[o],i.pop(),n[r]=n[o],n.pop()}}}),Object.assign(AnimationAction.prototype,{play:function()
{return this._mixer._activateAction(this),this},stop:function()
{return this._mixer._deactivateAction(this),this.reset()},reset:function()
{return this.paused=!1,this.enabled=!0,this.time=0,this._loopCount=-1,this._startTime=null,this.stopFading().stopWarping()},isRunning:function()
{return this.enabled&&!this.paused&&0!==this.timeScale&&null===this._startTime&&this._mixer._isActiveAction(this)},isScheduled:function()
{return this._mixer._isActiveAction(this)},startAt:function(e)
{return this._startTime=e,this},setLoop:function(e,t)
{return this.loop=e,this.repetitions=t,this},setEffectiveWeight:function(e)
{return this.weight=e,this._effectiveWeight=this.enabled?e:0,this.stopFading()},getEffectiveWeight:function()
{return this._effectiveWeight},fadeIn:function(e)
{return this._scheduleFading(e,0,1)},fadeOut:function(e)
{return this._scheduleFading(e,1,0)},crossFadeFrom:function(e,t,r)
{if(e.fadeOut(t),this.fadeIn(t),r)
{var n=this._clip.duration,i=e._clip.duration,a=i/n,o=n/i;e.warp(1,a,t),this.warp(o,1,t)}
return this},crossFadeTo:function(e,t,r)
{return e.crossFadeFrom(this,t,r)},stopFading:function()
{var e=this._weightInterpolant;return null!==e&&(this._weightInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this},setEffectiveTimeScale:function(e)
{return this.timeScale=e,this._effectiveTimeScale=this.paused?0:e,this.stopWarping()},getEffectiveTimeScale:function()
{return this._effectiveTimeScale},setDuration:function(e)
{return this.timeScale=this._clip.duration/e,this.stopWarping()},syncWith:function(e)
{return this.time=e.time,this.timeScale=e.timeScale,this.stopWarping()},halt:function(e)
{return this.warp(this._effectiveTimeScale,0,e)},warp:function(e,t,r)
{var n=this._mixer,i=n.time,a=this._timeScaleInterpolant,o=this.timeScale;null===a&&(a=n._lendControlInterpolant(),this._timeScaleInterpolant=a);var s=a.parameterPositions,l=a.sampleValues;return s[0]=i,s[1]=i+r,l[0]=e/o,l[1]=t/o,this},stopWarping:function()
{var e=this._timeScaleInterpolant;return null!==e&&(this._timeScaleInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this},getMixer:function()
{return this._mixer},getClip:function()
{return this._clip},getRoot:function()
{return this._localRoot||this._mixer._root},_update:function(e,t,r,n)
{if(this.enabled)
{var i=this._startTime;if(null!==i)
{var a=(e-i)*r;if(a<0||0===r)return;this._startTime=null,t=r*a}
t*=this._updateTimeScale(e);var o=this._updateTime(t),s=this._updateWeight(e);if(s>0)
for(var l=this._interpolants,c=this._propertyBindings,h=0,u=l.length;h!==u;++h)l[h].evaluate(o),c[h].accumulate(n,s)}
else this._updateWeight(e)},_updateWeight:function(e)
{var t=0;if(this.enabled)
{t=this.weight;var r=this._weightInterpolant;if(null!==r)
{var n=r.evaluate(e)[0];t*=n,e>r.parameterPositions[1]&&(this.stopFading(),0===n&&(this.enabled=!1))}}
return this._effectiveWeight=t,t},_updateTimeScale:function(e)
{var t=0;if(!this.paused)
{t=this.timeScale;var r=this._timeScaleInterpolant;if(null!==r)t*=r.evaluate(e)[0],e>r.parameterPositions[1]&&(this.stopWarping(),0===t?this.paused=!0:this.timeScale=t)}
return this._effectiveTimeScale=t,t},_updateTime:function(e)
{var t=this.time+e,r=this._clip.duration,n=this.loop,i=this._loopCount,a=n===LoopPingPong;if(0===e)return-1===i?t:a&&1==(1&i)?r-t:t;if(n===LoopOnce)
{-1===i&&(this._loopCount=0,this._setEndings(!0,!0,!1));e:{if(t>=r)t=r;else{if(!(t<0))
{this.time=t;break e}
t=0}
this.clampWhenFinished?this.paused=!0:this.enabled=!1,this.time=t,this._mixer.dispatchEvent({type:"finished",action:this,direction:e<0?-1:1})}}
else{if(-1===i&&(e>=0?(i=0,this._setEndings(!0,0===this.repetitions,a)):this._setEndings(0===this.repetitions,!0,a)),t>=r||t<0)
{var o=Math.floor(t/r);t-=r*o,i+=Math.abs(o);var s=this.repetitions-i;if(s<=0)this.clampWhenFinished?this.paused=!0:this.enabled=!1,t=e>0?r:0,this.time=t,this._mixer.dispatchEvent({type:"finished",action:this,direction:e>0?1:-1});else{if(1===s)
{var l=e<0;this._setEndings(l,!l,a)}
else this._setEndings(!1,!1,a);this._loopCount=i,this.time=t,this._mixer.dispatchEvent({type:"loop",action:this,loopDelta:o})}}
else this.time=t;if(a&&1==(1&i))return r-t}
return t},_setEndings:function(e,t,r)
{var n=this._interpolantSettings;r?(n.endingStart=ZeroSlopeEnding,n.endingEnd=ZeroSlopeEnding):(n.endingStart=e?this.zeroSlopeAtStart?ZeroSlopeEnding:ZeroCurvatureEnding:WrapAroundEnding,n.endingEnd=t?this.zeroSlopeAtEnd?ZeroSlopeEnding:ZeroCurvatureEnding:WrapAroundEnding)},_scheduleFading:function(e,t,r)
{var n=this._mixer,i=n.time,a=this._weightInterpolant;null===a&&(a=n._lendControlInterpolant(),this._weightInterpolant=a);var o=a.parameterPositions,s=a.sampleValues;return o[0]=i,s[0]=t,o[1]=i+e,s[1]=r,this}}),AnimationMixer.prototype=Object.assign(Object.create(EventDispatcher.prototype),{constructor:AnimationMixer,_bindAction:function(e,t)
{var r=e._localRoot||this._root,n=e._clip.tracks,i=n.length,a=e._propertyBindings,o=e._interpolants,s=r.uuid,l=this._bindingsByRootAndName,c=l[s];void 0===c&&(c={},l[s]=c);for(var h=0;h!==i;++h)
{var u=n[h],d=u.name,p=c[d];if(void 0!==p)a[h]=p;else{if(void 0!==(p=a[h]))
{null===p._cacheIndex&&(++p.referenceCount,this._addInactiveBinding(p,s,d));continue}
var m=t&&t._propertyBindings[h].binding.parsedPath;++(p=new PropertyMixer(PropertyBinding.create(r,d,m),u.ValueTypeName,u.getValueSize())).referenceCount,this._addInactiveBinding(p,s,d),a[h]=p}
o[h].resultBuffer=p.buffer}},_activateAction:function(e)
{if(!this._isActiveAction(e))
{if(null===e._cacheIndex)
{var t=(e._localRoot||this._root).uuid,r=e._clip.uuid,n=this._actionsByClip[r];this._bindAction(e,n&&n.knownActions[0]),this._addInactiveAction(e,r,t)}
for(var i=e._propertyBindings,a=0,o=i.length;a!==o;++a)
{var s=i[a];0==s.useCount++&&(this._lendBinding(s),s.saveOriginalState())}
this._lendAction(e)}},_deactivateAction:function(e)
{if(this._isActiveAction(e))
{for(var t=e._propertyBindings,r=0,n=t.length;r!==n;++r)
{var i=t[r];0==--i.useCount&&(i.restoreOriginalState(),this._takeBackBinding(i))}
this._takeBackAction(e)}},_initMemoryManager:function()
{this._actions=[],this._nActiveActions=0,this._actionsByClip={},this._bindings=[],this._nActiveBindings=0,this._bindingsByRootAndName={},this._controlInterpolants=[],this._nActiveControlInterpolants=0;var e=this;this.stats={actions:{get total()
{return e._actions.length},get inUse()
{return e._nActiveActions}},bindings:{get total()
{return e._bindings.length},get inUse()
{return e._nActiveBindings}},controlInterpolants:{get total()
{return e._controlInterpolants.length},get inUse()
{return e._nActiveControlInterpolants}}}},_isActiveAction:function(e)
{var t=e._cacheIndex;return null!==t&&t<this._nActiveActions},_addInactiveAction:function(e,t,r)
{var n=this._actions,i=this._actionsByClip,a=i[t];if(void 0===a)a={knownActions:[e],actionByRoot:{}},e._byClipCacheIndex=0,i[t]=a;else{var o=a.knownActions;e._byClipCacheIndex=o.length,o.push(e)}
e._cacheIndex=n.length,n.push(e),a.actionByRoot[r]=e},_removeInactiveAction:function(e)
{var t=this._actions,r=t[t.length-1],n=e._cacheIndex;r._cacheIndex=n,t[n]=r,t.pop(),e._cacheIndex=null;var i=e._clip.uuid,a=this._actionsByClip,o=a[i],s=o.knownActions,l=s[s.length-1],c=e._byClipCacheIndex;l._byClipCacheIndex=c,s[c]=l,s.pop(),e._byClipCacheIndex=null,delete o.actionByRoot[(e._localRoot||this._root).uuid],0===s.length&&delete a[i],this._removeInactiveBindingsForAction(e)},_removeInactiveBindingsForAction:function(e)
{for(var t=e._propertyBindings,r=0,n=t.length;r!==n;++r)
{var i=t[r];0==--i.referenceCount&&this._removeInactiveBinding(i)}},_lendAction:function(e)
{var t=this._actions,r=e._cacheIndex,n=this._nActiveActions++,i=t[n];e._cacheIndex=n,t[n]=e,i._cacheIndex=r,t[r]=i},_takeBackAction:function(e)
{var t=this._actions,r=e._cacheIndex,n=--this._nActiveActions,i=t[n];e._cacheIndex=n,t[n]=e,i._cacheIndex=r,t[r]=i},_addInactiveBinding:function(e,t,r)
{var n=this._bindingsByRootAndName,i=n[t],a=this._bindings;void 0===i&&(i={},n[t]=i),i[r]=e,e._cacheIndex=a.length,a.push(e)},_removeInactiveBinding:function(e)
{var t=this._bindings,r=e.binding,n=r.rootNode.uuid,i=r.path,a=this._bindingsByRootAndName,o=a[n],s=t[t.length-1],l=e._cacheIndex;s._cacheIndex=l,t[l]=s,t.pop(),delete o[i],0===Object.keys(o).length&&delete a[n]},_lendBinding:function(e)
{var t=this._bindings,r=e._cacheIndex,n=this._nActiveBindings++,i=t[n];e._cacheIndex=n,t[n]=e,i._cacheIndex=r,t[r]=i},_takeBackBinding:function(e)
{var t=this._bindings,r=e._cacheIndex,n=--this._nActiveBindings,i=t[n];e._cacheIndex=n,t[n]=e,i._cacheIndex=r,t[r]=i},_lendControlInterpolant:function()
{var e=this._controlInterpolants,t=this._nActiveControlInterpolants++,r=e[t];return void 0===r&&((r=new LinearInterpolant(new Float32Array(2),new Float32Array(2),1,this._controlInterpolantsResultBuffer)).__cacheIndex=t,e[t]=r),r},_takeBackControlInterpolant:function(e)
{var t=this._controlInterpolants,r=e.__cacheIndex,n=--this._nActiveControlInterpolants,i=t[n];e.__cacheIndex=n,t[n]=e,i.__cacheIndex=r,t[r]=i},_controlInterpolantsResultBuffer:new Float32Array(1),clipAction:function(e,t)
{var r=t||this._root,n=r.uuid,i="string"==typeof e?AnimationClip.findByName(r,e):e,a=null!==i?i.uuid:e,o=this._actionsByClip[a],s=null;if(void 0!==o)
{var l=o.actionByRoot[n];if(void 0!==l)return l;s=o.knownActions[0],null===i&&(i=s._clip)}
if(null===i)return null;var c=new AnimationAction(this,i,t);return this._bindAction(c,s),this._addInactiveAction(c,a,n),c},existingAction:function(e,t)
{var r=t||this._root,n=r.uuid,i="string"==typeof e?AnimationClip.findByName(r,e):e,a=i?i.uuid:e,o=this._actionsByClip[a];return void 0!==o&&o.actionByRoot[n]||null},stopAllAction:function()
{var e=this._actions,t=this._nActiveActions,r=this._bindings,n=this._nActiveBindings;this._nActiveActions=0,this._nActiveBindings=0;for(var i=0;i!==t;++i)e[i].reset();for(i=0;i!==n;++i)r[i].useCount=0;return this},update:function(e)
{e*=this.timeScale;for(var t=this._actions,r=this._nActiveActions,n=this.time+=e,i=Math.sign(e),a=this._accuIndex^=1,o=0;o!==r;++o)
{t[o]._update(n,e,i,a)}
var s=this._bindings,l=this._nActiveBindings;for(o=0;o!==l;++o)s[o].apply(a);return this},setTime:function(e)
{this.time=0;for(var t=0;t<this._actions.length;t++)this._actions[t].time=0;return this.update(e)},getRoot:function()
{return this._root},uncacheClip:function(e)
{var t=this._actions,r=e.uuid,n=this._actionsByClip,i=n[r];if(void 0!==i)
{for(var a=i.knownActions,o=0,s=a.length;o!==s;++o)
{var l=a[o];this._deactivateAction(l);var c=l._cacheIndex,h=t[t.length-1];l._cacheIndex=null,l._byClipCacheIndex=null,h._cacheIndex=c,t[c]=h,t.pop(),this._removeInactiveBindingsForAction(l)}
delete n[r]}},uncacheRoot:function(e)
{var t=e.uuid,r=this._actionsByClip;for(var n in r)
{var i=r[n].actionByRoot[t];void 0!==i&&(this._deactivateAction(i),this._removeInactiveAction(i))}
var a=this._bindingsByRootAndName[t];if(void 0!==a)
for(var o in a)
{var s=a[o];s.restoreOriginalState(),this._removeInactiveBinding(s)}},uncacheAction:function(e,t)
{var r=this.existingAction(e,t);null!==r&&(this._deactivateAction(r),this._removeInactiveAction(r))}}),Uniform.prototype.clone=function()
{return new Uniform(void 0===this.value.clone?this.value:this.value.clone())},InstancedInterleavedBuffer.prototype=Object.assign(Object.create(InterleavedBuffer.prototype),{constructor:InstancedInterleavedBuffer,isInstancedInterleavedBuffer:!0,copy:function(e)
{return InterleavedBuffer.prototype.copy.call(this,e),this.meshPerAttribute=e.meshPerAttribute,this}}),Object.assign(Raycaster.prototype,{linePrecision:1,set:function(e,t)
{this.ray.set(e,t)},setFromCamera:function(e,t)
{t&&t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t&&t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):console.error("THREE.Raycaster: Unsupported camera type.")},intersectObject:function(e,t,r)
{var n=r||[];return intersectObject(e,this,n,t),n.sort(ascSort),n},intersectObjects:function(e,t,r)
{var n=r||[];if(!1===Array.isArray(e))return console.warn("THREE.Raycaster.intersectObjects: objects is not an Array."),n;for(var i=0,a=e.length;i<a;i++)intersectObject(e[i],this,n,t);return n.sort(ascSort),n}}),Object.assign(Spherical.prototype,{set:function(e,t,r)
{return this.radius=e,this.phi=t,this.theta=r,this},clone:function()
{return(new this.constructor).copy(this)},copy:function(e)
{return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this},makeSafe:function()
{return this.phi=Math.max(1e-6,Math.min(Math.PI-1e-6,this.phi)),this},setFromVector3:function(e)
{return this.setFromCartesianCoords(e.x,e.y,e.z)},setFromCartesianCoords:function(e,t,r)
{return this.radius=Math.sqrt(e*e+t*t+r*r),0===this.radius?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,r),this.phi=Math.acos(MathUtils.clamp(t/this.radius,-1,1))),this}}),Object.assign(Cylindrical.prototype,{set:function(e,t,r)
{return this.radius=e,this.theta=t,this.y=r,this},clone:function()
{return(new this.constructor).copy(this)},copy:function(e)
{return this.radius=e.radius,this.theta=e.theta,this.y=e.y,this},setFromVector3:function(e)
{return this.setFromCartesianCoords(e.x,e.y,e.z)},setFromCartesianCoords:function(e,t,r)
{return this.radius=Math.sqrt(e*e+r*r),this.theta=Math.atan2(e,r),this.y=t,this}});var _vector$7=new Vector2;function Box2(e,t)
{this.min=void 0!==e?e:new Vector2(1/0,1/0),this.max=void 0!==t?t:new Vector2(-1/0,-1/0)}
Object.assign(Box2.prototype,{set:function(e,t)
{return this.min.copy(e),this.max.copy(t),this},setFromPoints:function(e)
{this.makeEmpty();for(var t=0,r=e.length;t<r;t++)this.expandByPoint(e[t]);return this},setFromCenterAndSize:function(e,t)
{var r=_vector$7.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(r),this.max.copy(e).add(r),this},clone:function()
{return(new this.constructor).copy(this)},copy:function(e)
{return this.min.copy(e.min),this.max.copy(e.max),this},makeEmpty:function()
{return this.min.x=this.min.y=1/0,this.max.x=this.max.y=-1/0,this},isEmpty:function()
{return this.max.x<this.min.x||this.max.y<this.min.y},getCenter:function(e)
{return void 0===e&&(console.warn("THREE.Box2: .getCenter() target is now required"),e=new Vector2),this.isEmpty()?e.set(0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)},getSize:function(e)
{return void 0===e&&(console.warn("THREE.Box2: .getSize() target is now required"),e=new Vector2),this.isEmpty()?e.set(0,0):e.subVectors(this.max,this.min)},expandByPoint:function(e)
{return this.min.min(e),this.max.max(e),this},expandByVector:function(e)
{return this.min.sub(e),this.max.add(e),this},expandByScalar:function(e)
{return this.min.addScalar(-e),this.max.addScalar(e),this},containsPoint:function(e)
{return!(e.x<this.min.x||e.x>this.max.x||e.y<this.min.y||e.y>this.max.y)},containsBox:function(e)
{return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y},getParameter:function(e,t)
{return void 0===t&&(console.warn("THREE.Box2: .getParameter() target is now required"),t=new Vector2),t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y))},intersectsBox:function(e)
{return!(e.max.x<this.min.x||e.min.x>this.max.x||e.max.y<this.min.y||e.min.y>this.max.y)},clampPoint:function(e,t)
{return void 0===t&&(console.warn("THREE.Box2: .clampPoint() target is now required"),t=new Vector2),t.copy(e).clamp(this.min,this.max)},distanceToPoint:function(e)
{return _vector$7.copy(e).clamp(this.min,this.max).sub(e).length()},intersect:function(e)
{return this.min.max(e.min),this.max.min(e.max),this},union:function(e)
{return this.min.min(e.min),this.max.max(e.max),this},translate:function(e)
{return this.min.add(e),this.max.add(e),this},equals:function(e)
{return e.min.equals(this.min)&&e.max.equals(this.max)}});var _startP=new Vector3,_startEnd=new Vector3;function Line3(e,t)
{this.start=void 0!==e?e:new Vector3,this.end=void 0!==t?t:new Vector3}
function ImmediateRenderObject(e)
{Object3D.call(this),this.material=e,this.render=function(){}}
Object.assign(Line3.prototype,{set:function(e,t)
{return this.start.copy(e),this.end.copy(t),this},clone:function()
{return(new this.constructor).copy(this)},copy:function(e)
{return this.start.copy(e.start),this.end.copy(e.end),this},getCenter:function(e)
{return void 0===e&&(console.warn("THREE.Line3: .getCenter() target is now required"),e=new Vector3),e.addVectors(this.start,this.end).multiplyScalar(.5)},delta:function(e)
{return void 0===e&&(console.warn("THREE.Line3: .delta() target is now required"),e=new Vector3),e.subVectors(this.end,this.start)},distanceSq:function()
{return this.start.distanceToSquared(this.end)},distance:function()
{return this.start.distanceTo(this.end)},at:function(e,t)
{return void 0===t&&(console.warn("THREE.Line3: .at() target is now required"),t=new Vector3),this.delta(t).multiplyScalar(e).add(this.start)},closestPointToPointParameter:function(e,t)
{_startP.subVectors(e,this.start),_startEnd.subVectors(this.end,this.start);var r=_startEnd.dot(_startEnd),n=_startEnd.dot(_startP)/r;return t&&(n=MathUtils.clamp(n,0,1)),n},closestPointToPoint:function(e,t,r)
{var n=this.closestPointToPointParameter(e,t);return void 0===r&&(console.warn("THREE.Line3: .closestPointToPoint() target is now required"),r=new Vector3),this.delta(r).multiplyScalar(n).add(this.start)},applyMatrix4:function(e)
{return this.start.applyMatrix4(e),this.end.applyMatrix4(e),this},equals:function(e)
{return e.start.equals(this.start)&&e.end.equals(this.end)}}),ImmediateRenderObject.prototype=Object.create(Object3D.prototype),ImmediateRenderObject.prototype.constructor=ImmediateRenderObject,ImmediateRenderObject.prototype.isImmediateRenderObject=!0;var _vector$8=new Vector3;function SpotLightHelper(e,t)
{Object3D.call(this),this.light=e,this.light.updateMatrixWorld(),this.matrix=e.matrixWorld,this.matrixAutoUpdate=!1,this.color=t;for(var r=new BufferGeometry,n=[0,0,0,0,0,1,0,0,0,1,0,1,0,0,0,-1,0,1,0,0,0,0,1,1,0,0,0,0,-1,1],i=0,a=1;i<32;i++,a++)
{var o=i/32*Math.PI*2,s=a/32*Math.PI*2;n.push(Math.cos(o),Math.sin(o),1,Math.cos(s),Math.sin(s),1)}
r.setAttribute("position",new Float32BufferAttribute(n,3));var l=new LineBasicMaterial({fog:!1});this.cone=new LineSegments(r,l),this.add(this.cone),this.update()}
SpotLightHelper.prototype=Object.create(Object3D.prototype),SpotLightHelper.prototype.constructor=SpotLightHelper,SpotLightHelper.prototype.dispose=function()
{this.cone.geometry.dispose(),this.cone.material.dispose()},SpotLightHelper.prototype.update=function()
{this.light.updateMatrixWorld();var e=this.light.distance?this.light.distance:1e3,t=e*Math.tan(this.light.angle);this.cone.scale.set(t,t,e),_vector$8.setFromMatrixPosition(this.light.target.matrixWorld),this.cone.lookAt(_vector$8),void 0!==this.color?this.cone.material.color.set(this.color):this.cone.material.color.copy(this.light.color)};var _vector$9=new Vector3,_boneMatrix=new Matrix4,_matrixWorldInv=new Matrix4;function getBoneList(e)
{var t=[];e&&e.isBone&&t.push(e);for(var r=0;r<e.children.length;r++)t.push.apply(t,getBoneList(e.children[r]));return t}
function SkeletonHelper(e)
{for(var t=getBoneList(e),r=new BufferGeometry,n=[],i=[],a=new Color(0,0,1),o=new Color(0,1,0),s=0;s<t.length;s++)
{var l=t[s];l.parent&&l.parent.isBone&&(n.push(0,0,0),n.push(0,0,0),i.push(a.r,a.g,a.b),i.push(o.r,o.g,o.b))}
r.setAttribute("position",new Float32BufferAttribute(n,3)),r.setAttribute("color",new Float32BufferAttribute(i,3));var c=new LineBasicMaterial({vertexColors:VertexColors,depthTest:!1,depthWrite:!1,transparent:!0});LineSegments.call(this,r,c),this.root=e,this.bones=t,this.matrix=e.matrixWorld,this.matrixAutoUpdate=!1}
function PointLightHelper(e,t,r)
{this.light=e,this.light.updateMatrixWorld(),this.color=r;var n=new SphereBufferGeometry(t,4,2),i=new MeshBasicMaterial({wireframe:!0,fog:!1});Mesh.call(this,n,i),this.matrix=this.light.matrixWorld,this.matrixAutoUpdate=!1,this.update()}
SkeletonHelper.prototype=Object.create(LineSegments.prototype),SkeletonHelper.prototype.constructor=SkeletonHelper,SkeletonHelper.prototype.updateMatrixWorld=function(e)
{var t=this.bones,r=this.geometry,n=r.getAttribute("position");_matrixWorldInv.getInverse(this.root.matrixWorld);for(var i=0,a=0;i<t.length;i++)
{var o=t[i];o.parent&&o.parent.isBone&&(_boneMatrix.multiplyMatrices(_matrixWorldInv,o.matrixWorld),_vector$9.setFromMatrixPosition(_boneMatrix),n.setXYZ(a,_vector$9.x,_vector$9.y,_vector$9.z),_boneMatrix.multiplyMatrices(_matrixWorldInv,o.parent.matrixWorld),_vector$9.setFromMatrixPosition(_boneMatrix),n.setXYZ(a+1,_vector$9.x,_vector$9.y,_vector$9.z),a+=2)}
r.getAttribute("position").needsUpdate=!0,Object3D.prototype.updateMatrixWorld.call(this,e)},PointLightHelper.prototype=Object.create(Mesh.prototype),PointLightHelper.prototype.constructor=PointLightHelper,PointLightHelper.prototype.dispose=function()
{this.geometry.dispose(),this.material.dispose()},PointLightHelper.prototype.update=function()
{void 0!==this.color?this.material.color.set(this.color):this.material.color.copy(this.light.color)};var _vector$a=new Vector3,_color1=new Color,_color2=new Color;function HemisphereLightHelper(e,t,r)
{Object3D.call(this),this.light=e,this.light.updateMatrixWorld(),this.matrix=e.matrixWorld,this.matrixAutoUpdate=!1,this.color=r;var n=new OctahedronBufferGeometry(t);n.rotateY(.5*Math.PI),this.material=new MeshBasicMaterial({wireframe:!0,fog:!1}),void 0===this.color&&(this.material.vertexColors=VertexColors);var i=n.getAttribute("position"),a=new Float32Array(3*i.count);n.setAttribute("color",new BufferAttribute(a,3)),this.add(new Mesh(n,this.material)),this.update()}
function GridHelper(e,t,r,n)
{e=e||10,t=t||10,r=new Color(void 0!==r?r:4473924),n=new Color(void 0!==n?n:8947848);for(var i=t/2,a=e/t,o=e/2,s=[],l=[],c=0,h=0,u=-o;c<=t;c++,u+=a)
{s.push(-o,0,u,o,0,u),s.push(u,0,-o,u,0,o);var d=c===i?r:n;d.toArray(l,h),h+=3,d.toArray(l,h),h+=3,d.toArray(l,h),h+=3,d.toArray(l,h),h+=3}
var p=new BufferGeometry;p.setAttribute("position",new Float32BufferAttribute(s,3)),p.setAttribute("color",new Float32BufferAttribute(l,3));var m=new LineBasicMaterial({vertexColors:VertexColors});LineSegments.call(this,p,m)}
function PolarGridHelper(e,t,r,n,i,a)
{e=e||10,t=t||16,r=r||8,n=n||64,i=new Color(void 0!==i?i:4473924),a=new Color(void 0!==a?a:8947848);var o,s,l,c,h,u,d,p=[],m=[];for(c=0;c<=t;c++)l=c/t*(2*Math.PI),o=Math.sin(l)*e,s=Math.cos(l)*e,p.push(0,0,0),p.push(o,0,s),d=1&c?i:a,m.push(d.r,d.g,d.b),m.push(d.r,d.g,d.b);for(c=0;c<=r;c++)
for(d=1&c?i:a,u=e-e/r*c,h=0;h<n;h++)l=h/n*(2*Math.PI),o=Math.sin(l)*u,s=Math.cos(l)*u,p.push(o,0,s),m.push(d.r,d.g,d.b),l=(h+1)/n*(2*Math.PI),o=Math.sin(l)*u,s=Math.cos(l)*u,p.push(o,0,s),m.push(d.r,d.g,d.b);var f=new BufferGeometry;f.setAttribute("position",new Float32BufferAttribute(p,3)),f.setAttribute("color",new Float32BufferAttribute(m,3));var g=new LineBasicMaterial({vertexColors:VertexColors});LineSegments.call(this,f,g)}
HemisphereLightHelper.prototype=Object.create(Object3D.prototype),HemisphereLightHelper.prototype.constructor=HemisphereLightHelper,HemisphereLightHelper.prototype.dispose=function()
{this.children[0].geometry.dispose(),this.children[0].material.dispose()},HemisphereLightHelper.prototype.update=function()
{var e=this.children[0];if(void 0!==this.color)this.material.color.set(this.color);else{var t=e.geometry.getAttribute("color");_color1.copy(this.light.color),_color2.copy(this.light.groundColor);for(var r=0,n=t.count;r<n;r++)
{var i=r<n/2?_color1:_color2;t.setXYZ(r,i.r,i.g,i.b)}
t.needsUpdate=!0}
e.lookAt(_vector$a.setFromMatrixPosition(this.light.matrixWorld).negate())},GridHelper.prototype=Object.assign(Object.create(LineSegments.prototype),{constructor:GridHelper,copy:function(e)
{return LineSegments.prototype.copy.call(this,e),this.geometry.copy(e.geometry),this.material.copy(e.material),this},clone:function()
{return(new this.constructor).copy(this)}}),PolarGridHelper.prototype=Object.create(LineSegments.prototype),PolarGridHelper.prototype.constructor=PolarGridHelper;var _v1$5=new Vector3,_v2$3=new Vector3,_v3$1=new Vector3;function DirectionalLightHelper(e,t,r)
{Object3D.call(this),this.light=e,this.light.updateMatrixWorld(),this.matrix=e.matrixWorld,this.matrixAutoUpdate=!1,this.color=r,void 0===t&&(t=1);var n=new BufferGeometry;n.setAttribute("position",new Float32BufferAttribute([-t,t,0,t,t,0,t,-t,0,-t,-t,0,-t,t,0],3));var i=new LineBasicMaterial({fog:!1});this.lightPlane=new Line(n,i),this.add(this.lightPlane),(n=new BufferGeometry).setAttribute("position",new Float32BufferAttribute([0,0,0,0,0,1],3)),this.targetLine=new Line(n,i),this.add(this.targetLine),this.update()}
DirectionalLightHelper.prototype=Object.create(Object3D.prototype),DirectionalLightHelper.prototype.constructor=DirectionalLightHelper,DirectionalLightHelper.prototype.dispose=function()
{this.lightPlane.geometry.dispose(),this.lightPlane.material.dispose(),this.targetLine.geometry.dispose(),this.targetLine.material.dispose()},DirectionalLightHelper.prototype.update=function()
{_v1$5.setFromMatrixPosition(this.light.matrixWorld),_v2$3.setFromMatrixPosition(this.light.target.matrixWorld),_v3$1.subVectors(_v2$3,_v1$5),this.lightPlane.lookAt(_v2$3),void 0!==this.color?(this.lightPlane.material.color.set(this.color),this.targetLine.material.color.set(this.color)):(this.lightPlane.material.color.copy(this.light.color),this.targetLine.material.color.copy(this.light.color)),this.targetLine.lookAt(_v2$3),this.targetLine.scale.z=_v3$1.length()};var _vector$b=new Vector3,_camera=new Camera;function CameraHelper(e)
{var t=new BufferGeometry,r=new LineBasicMaterial({color:16777215,vertexColors:FaceColors}),n=[],i=[],a={},o=new Color(16755200),s=new Color(16711680),l=new Color(43775),c=new Color(16777215),h=new Color(3355443);function u(e,t,r)
{d(e,r),d(t,r)}
function d(e,t)
{n.push(0,0,0),i.push(t.r,t.g,t.b),void 0===a[e]&&(a[e]=[]),a[e].push(n.length/3-1)}
u("n1","n2",o),u("n2","n4",o),u("n4","n3",o),u("n3","n1",o),u("f1","f2",o),u("f2","f4",o),u("f4","f3",o),u("f3","f1",o),u("n1","f1",o),u("n2","f2",o),u("n3","f3",o),u("n4","f4",o),u("p","n1",s),u("p","n2",s),u("p","n3",s),u("p","n4",s),u("u1","u2",l),u("u2","u3",l),u("u3","u1",l),u("c","t",c),u("p","c",h),u("cn1","cn2",h),u("cn3","cn4",h),u("cf1","cf2",h),u("cf3","cf4",h),t.setAttribute("position",new Float32BufferAttribute(n,3)),t.setAttribute("color",new Float32BufferAttribute(i,3)),LineSegments.call(this,t,r),this.camera=e,this.camera.updateProjectionMatrix&&this.camera.updateProjectionMatrix(),this.matrix=e.matrixWorld,this.matrixAutoUpdate=!1,this.pointMap=a,this.update()}
function setPoint(e,t,r,n,i,a,o)
{_vector$b.set(i,a,o).unproject(n);var s=t[e];if(void 0!==s)
for(var l=r.getAttribute("position"),c=0,h=s.length;c<h;c++)l.setXYZ(s[c],_vector$b.x,_vector$b.y,_vector$b.z)}
CameraHelper.prototype=Object.create(LineSegments.prototype),CameraHelper.prototype.constructor=CameraHelper,CameraHelper.prototype.update=function()
{var e=this.geometry,t=this.pointMap;_camera.projectionMatrixInverse.copy(this.camera.projectionMatrixInverse),setPoint("c",t,e,_camera,0,0,-1),setPoint("t",t,e,_camera,0,0,1),setPoint("n1",t,e,_camera,-1,-1,-1),setPoint("n2",t,e,_camera,1,-1,-1),setPoint("n3",t,e,_camera,-1,1,-1),setPoint("n4",t,e,_camera,1,1,-1),setPoint("f1",t,e,_camera,-1,-1,1),setPoint("f2",t,e,_camera,1,-1,1),setPoint("f3",t,e,_camera,-1,1,1),setPoint("f4",t,e,_camera,1,1,1),setPoint("u1",t,e,_camera,.7,1.1,-1),setPoint("u2",t,e,_camera,-.7,1.1,-1),setPoint("u3",t,e,_camera,0,2,-1),setPoint("cf1",t,e,_camera,-1,0,1),setPoint("cf2",t,e,_camera,1,0,1),setPoint("cf3",t,e,_camera,0,-1,1),setPoint("cf4",t,e,_camera,0,1,1),setPoint("cn1",t,e,_camera,-1,0,-1),setPoint("cn2",t,e,_camera,1,0,-1),setPoint("cn3",t,e,_camera,0,-1,-1),setPoint("cn4",t,e,_camera,0,1,-1),e.getAttribute("position").needsUpdate=!0};var _box$3=new Box3;function BoxHelper(e,t)
{this.object=e,void 0===t&&(t=16776960);var r=new Uint16Array([0,1,1,2,2,3,3,0,4,5,5,6,6,7,7,4,0,4,1,5,2,6,3,7]),n=new Float32Array(24),i=new BufferGeometry;i.setIndex(new BufferAttribute(r,1)),i.setAttribute("position",new BufferAttribute(n,3)),LineSegments.call(this,i,new LineBasicMaterial({color:t})),this.matrixAutoUpdate=!1,this.update()}
function Box3Helper(e,t)
{this.type="Box3Helper",this.box=e,t=t||16776960;var r=new Uint16Array([0,1,1,2,2,3,3,0,4,5,5,6,6,7,7,4,0,4,1,5,2,6,3,7]),n=new BufferGeometry;n.setIndex(new BufferAttribute(r,1)),n.setAttribute("position",new Float32BufferAttribute([1,1,1,-1,1,1,-1,-1,1,1,-1,1,1,1,-1,-1,1,-1,-1,-1,-1,1,-1,-1],3)),LineSegments.call(this,n,new LineBasicMaterial({color:t})),this.geometry.computeBoundingSphere()}
function PlaneHelper(e,t,r)
{this.type="PlaneHelper",this.plane=e,this.size=void 0===t?1:t;var n=void 0!==r?r:16776960,i=new BufferGeometry;i.setAttribute("position",new Float32BufferAttribute([1,-1,1,-1,1,1,-1,-1,1,1,1,1,-1,1,1,-1,-1,1,1,-1,1,1,1,1,0,0,1,0,0,0],3)),i.computeBoundingSphere(),Line.call(this,i,new LineBasicMaterial({color:n}));var a=new BufferGeometry;a.setAttribute("position",new Float32BufferAttribute([1,1,1,-1,1,1,-1,-1,1,1,1,1,-1,-1,1,1,-1,1],3)),a.computeBoundingSphere(),this.add(new Mesh(a,new MeshBasicMaterial({color:n,opacity:.2,transparent:!0,depthWrite:!1})))}
BoxHelper.prototype=Object.create(LineSegments.prototype),BoxHelper.prototype.constructor=BoxHelper,BoxHelper.prototype.update=function(e)
{if(void 0!==e&&console.warn("THREE.BoxHelper: .update() has no longer arguments."),void 0!==this.object&&_box$3.setFromObject(this.object),!_box$3.isEmpty())
{var t=_box$3.min,r=_box$3.max,n=this.geometry.attributes.position,i=n.array;i[0]=r.x,i[1]=r.y,i[2]=r.z,i[3]=t.x,i[4]=r.y,i[5]=r.z,i[6]=t.x,i[7]=t.y,i[8]=r.z,i[9]=r.x,i[10]=t.y,i[11]=r.z,i[12]=r.x,i[13]=r.y,i[14]=t.z,i[15]=t.x,i[16]=r.y,i[17]=t.z,i[18]=t.x,i[19]=t.y,i[20]=t.z,i[21]=r.x,i[22]=t.y,i[23]=t.z,n.needsUpdate=!0,this.geometry.computeBoundingSphere()}},BoxHelper.prototype.setFromObject=function(e)
{return this.object=e,this.update(),this},BoxHelper.prototype.copy=function(e)
{return LineSegments.prototype.copy.call(this,e),this.object=e.object,this},BoxHelper.prototype.clone=function()
{return(new this.constructor).copy(this)},Box3Helper.prototype=Object.create(LineSegments.prototype),Box3Helper.prototype.constructor=Box3Helper,Box3Helper.prototype.updateMatrixWorld=function(e)
{var t=this.box;t.isEmpty()||(t.getCenter(this.position),t.getSize(this.scale),this.scale.multiplyScalar(.5),Object3D.prototype.updateMatrixWorld.call(this,e))},PlaneHelper.prototype=Object.create(Line.prototype),PlaneHelper.prototype.constructor=PlaneHelper,PlaneHelper.prototype.updateMatrixWorld=function(e)
{var t=-this.plane.constant;Math.abs(t)<1e-8&&(t=1e-8),this.scale.set(.5*this.size,.5*this.size,t),this.children[0].material.side=t<0?BackSide:FrontSide,this.lookAt(this.plane.normal),Object3D.prototype.updateMatrixWorld.call(this,e)};var _lineGeometry,_coneGeometry,_axis=new Vector3;function ArrowHelper(e,t,r,n,i,a)
{Object3D.call(this),void 0===e&&(e=new Vector3(0,0,1)),void 0===t&&(t=new Vector3(0,0,0)),void 0===r&&(r=1),void 0===n&&(n=16776960),void 0===i&&(i=.2*r),void 0===a&&(a=.2*i),void 0===_lineGeometry&&((_lineGeometry=new BufferGeometry).setAttribute("position",new Float32BufferAttribute([0,0,0,0,1,0],3)),(_coneGeometry=new CylinderBufferGeometry(0,.5,1,5,1)).translate(0,-.5,0)),this.position.copy(t),this.line=new Line(_lineGeometry,new LineBasicMaterial({color:n})),this.line.matrixAutoUpdate=!1,this.add(this.line),this.cone=new Mesh(_coneGeometry,new MeshBasicMaterial({color:n})),this.cone.matrixAutoUpdate=!1,this.add(this.cone),this.setDirection(e),this.setLength(r,i,a)}
function AxesHelper(e)
{var t=[0,0,0,e=e||1,0,0,0,0,0,0,e,0,0,0,0,0,0,e],r=new BufferGeometry;r.setAttribute("position",new Float32BufferAttribute(t,3)),r.setAttribute("color",new Float32BufferAttribute([1,0,0,1,.6,0,0,1,0,.6,1,0,0,0,1,0,.6,1],3));var n=new LineBasicMaterial({vertexColors:VertexColors});LineSegments.call(this,r,n)}
ArrowHelper.prototype=Object.create(Object3D.prototype),ArrowHelper.prototype.constructor=ArrowHelper,ArrowHelper.prototype.setDirection=function(e)
{if(e.y>.99999)this.quaternion.set(0,0,0,1);else if(e.y<-.99999)this.quaternion.set(1,0,0,0);else{_axis.set(e.z,0,-e.x).normalize();var t=Math.acos(e.y);this.quaternion.setFromAxisAngle(_axis,t)}},ArrowHelper.prototype.setLength=function(e,t,r)
{void 0===t&&(t=.2*e),void 0===r&&(r=.2*t),this.line.scale.set(1,Math.max(1e-4,e-t),1),this.line.updateMatrix(),this.cone.scale.set(r,t,r),this.cone.position.y=e,this.cone.updateMatrix()},ArrowHelper.prototype.setColor=function(e)
{this.line.material.color.set(e),this.cone.material.color.set(e)},ArrowHelper.prototype.copy=function(e)
{return Object3D.prototype.copy.call(this,e,!1),this.line.copy(e.line),this.cone.copy(e.cone),this},ArrowHelper.prototype.clone=function()
{return(new this.constructor).copy(this)},AxesHelper.prototype=Object.create(LineSegments.prototype),AxesHelper.prototype.constructor=AxesHelper;var LOD_MIN=4,LOD_MAX=8,SIZE_MAX=Math.pow(2,LOD_MAX),EXTRA_LOD_SIGMA=[.125,.215,.35,.446,.526,.582],TOTAL_LODS=LOD_MAX-LOD_MIN+1+EXTRA_LOD_SIGMA.length,MAX_SAMPLES=20,ENCODINGS={[LinearEncoding]:0,[sRGBEncoding]:1,[RGBEEncoding]:2,[RGBM7Encoding]:3,[RGBM16Encoding]:4,[RGBDEncoding]:5,[GammaEncoding]:6},_flatCamera=new OrthographicCamera,_blurMaterial=_getBlurShader(MAX_SAMPLES),_equirectShader=null,_cubemapShader=null,{_lodPlanes:_lodPlanes,_sizeLods:_sizeLods,_sigmas:_sigmas}=_createPlanes(),_pingPongRenderTarget=null,_renderer=null,_oldTarget=null,PHI=(1+Math.sqrt(5))/2,INV_PHI=1/PHI,_axisDirections=[new Vector3(1,1,1),new Vector3(-1,1,1),new Vector3(1,1,-1),new Vector3(-1,1,-1),new Vector3(0,PHI,INV_PHI),new Vector3(0,PHI,-INV_PHI),new Vector3(INV_PHI,0,PHI),new Vector3(-INV_PHI,0,PHI),new Vector3(PHI,INV_PHI,0),new Vector3(-PHI,INV_PHI,0)];function PMREMGenerator(e)
{_renderer=e,_compileMaterial(_blurMaterial)}
function _createPlanes()
{for(var e=[],t=[],r=[],n=LOD_MAX,i=0;i<TOTAL_LODS;i++)
{var a=Math.pow(2,n);t.push(a);var o=1/a;i>LOD_MAX-LOD_MIN?o=EXTRA_LOD_SIGMA[i-LOD_MAX+LOD_MIN-1]:0==i&&(o=0),r.push(o);for(var s=1/(a-1),l=-s/2,c=1+s/2,h=[l,l,c,l,c,c,l,l,c,c,l,c],u=new Float32Array(108),d=new Float32Array(72),p=new Float32Array(36),m=0;m<6;m++)
{var f=m%3*2/3-1,g=m>2?0:-1,v=[f,g,0,f+2/3,g,0,f+2/3,g+1,0,f,g,0,f+2/3,g+1,0,f,g+1,0];u.set(v,18*m),d.set(h,12*m);var y=[m,m,m,m,m,m];p.set(y,6*m)}
var _=new BufferGeometry;_.setAttribute("position",new BufferAttribute(u,3)),_.setAttribute("uv",new BufferAttribute(d,2)),_.setAttribute("faceIndex",new BufferAttribute(p,1)),e.push(_),n>LOD_MIN&&n--}
return{_lodPlanes:e,_sizeLods:t,_sigmas:r}}
function _allocateTargets(e)
{var t={magFilter:NearestFilter,minFilter:NearestFilter,generateMipmaps:!1,type:e?e.type:UnsignedByteType,format:e?e.format:RGBEFormat,encoding:e?e.encoding:RGBEEncoding,depthBuffer:!1,stencilBuffer:!1},r=_createRenderTarget(t);return r.depthBuffer=!e,_pingPongRenderTarget=_createRenderTarget(t),r}
function _cleanup(e)
{_pingPongRenderTarget.dispose(),_renderer.setRenderTarget(_oldTarget),e.scissorTest=!1,e.setSize(e.width,e.height)}
function _sceneToCubeUV(e,t,r,n)
{var i=new PerspectiveCamera(90,1,t,r),a=[1,1,1,1,-1,1],o=[1,1,-1,-1,-1,1],s=_renderer.outputEncoding,l=_renderer.toneMapping,c=_renderer.toneMappingExposure,h=_renderer.getClearColor(),u=_renderer.getClearAlpha();_renderer.toneMapping=LinearToneMapping,_renderer.toneMappingExposure=1,_renderer.outputEncoding=LinearEncoding,e.scale.z*=-1;var d=e.background;if(d&&d.isColor)
{d.convertSRGBToLinear();var p=Math.max(d.r,d.g,d.b),m=Math.min(Math.max(Math.ceil(Math.log2(p)),-128),127);d=d.multiplyScalar(Math.pow(2,-m));var f=(m+128)/255;_renderer.setClearColor(d,f),e.background=null}
for(var g=0;g<6;g++)
{var v=g%3;0==v?(i.up.set(0,a[g],0),i.lookAt(o[g],0,0)):1==v?(i.up.set(0,0,a[g]),i.lookAt(0,o[g],0)):(i.up.set(0,a[g],0),i.lookAt(0,0,o[g])),_setViewport(n,v*SIZE_MAX,g>2?SIZE_MAX:0,SIZE_MAX,SIZE_MAX),_renderer.setRenderTarget(n),_renderer.render(e,i)}
_renderer.toneMapping=l,_renderer.toneMappingExposure=c,_renderer.outputEncoding=s,_renderer.setClearColor(h,u),e.scale.z*=-1}
function _textureToCubeUV(e,t)
{var r=new Scene;e.isCubeTexture?null==_cubemapShader&&(_cubemapShader=_getCubemapShader()):null==_equirectShader&&(_equirectShader=_getEquirectShader());var n=e.isCubeTexture?_cubemapShader:_equirectShader;r.add(new Mesh(_lodPlanes[0],n));var i=n.uniforms;i.envMap.value=e,e.isCubeTexture||i.texelSize.value.set(1/e.image.width,1/e.image.height),i.inputEncoding.value=ENCODINGS[e.encoding],i.outputEncoding.value=ENCODINGS[e.encoding],_setViewport(t,0,0,3*SIZE_MAX,2*SIZE_MAX),_renderer.setRenderTarget(t),_renderer.render(r,_flatCamera)}
function _compileMaterial(e)
{var t=new Scene;t.add(new Mesh(_lodPlanes[0],e)),_renderer.compile(t,_flatCamera)}
function _createRenderTarget(e)
{var t=new WebGLRenderTarget(3*SIZE_MAX,3*SIZE_MAX,e);return t.texture.mapping=CubeUVReflectionMapping,t.texture.name="PMREM.cubeUv",t.scissorTest=!0,t}
function _setViewport(e,t,r,n,i)
{e.viewport.set(t,r,n,i),e.scissor.set(t,r,n,i)}
function _applyPMREM(e)
{var t=_renderer.autoClear;_renderer.autoClear=!1;for(var r=1;r<TOTAL_LODS;r++)
{_blur(e,r-1,r,Math.sqrt(_sigmas[r]*_sigmas[r]-_sigmas[r-1]*_sigmas[r-1]),_axisDirections[(r-1)%_axisDirections.length])}
_renderer.autoClear=t}
function _blur(e,t,r,n,i)
{_halfBlur(e,_pingPongRenderTarget,t,r,n,"latitudinal",i),_halfBlur(_pingPongRenderTarget,e,r,r,n,"longitudinal",i)}
function _halfBlur(e,t,r,n,i,a,o)
{"latitudinal"!==a&&"longitudinal"!==a&&console.error("blur direction must be either latitudinal or longitudinal!");var s=new Scene;s.add(new Mesh(_lodPlanes[n],_blurMaterial));var l=_blurMaterial.uniforms,c=_sizeLods[r]-1,h=isFinite(i)?Math.PI/(2*c):2*Math.PI/(2*MAX_SAMPLES-1),u=i/h,d=isFinite(i)?1+Math.floor(3*u):MAX_SAMPLES;d>MAX_SAMPLES&&console.warn(`sigmaRadians, ${i}, is too large and will clip, as it requested ${d} samples when the maximum is set to ${MAX_SAMPLES}`);for(var p=[],m=0,f=0;f<MAX_SAMPLES;++f)
{var g=f/u,v=Math.exp(-g*g/2);p.push(v),0==f?m+=v:f<d&&(m+=2*v)}
for(f=0;f<p.length;f++)p[f]=p[f]/m;l.envMap.value=e.texture,l.samples.value=d,l.weights.value=p,l.latitudinal.value="latitudinal"===a,o&&(l.poleAxis.value=o),l.dTheta.value=h,l.mipInt.value=LOD_MAX-r,l.inputEncoding.value=ENCODINGS[e.texture.encoding],l.outputEncoding.value=ENCODINGS[e.texture.encoding];var y=_sizeLods[n];_setViewport(t,g=3*Math.max(0,SIZE_MAX-2*y),(0===n?0:2*SIZE_MAX)+2*y*(n>LOD_MAX-LOD_MIN?n-LOD_MAX+LOD_MIN:0),3*y,2*y),_renderer.setRenderTarget(t),_renderer.render(s,_flatCamera)}
function _getBlurShader(e)
{var t=new RawShaderMaterial({defines:{n:e},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:new Float32Array(e)},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:new Vector3(0,1,0)},inputEncoding:{value:ENCODINGS[LinearEncoding]},outputEncoding:{value:ENCODINGS[LinearEncoding]}},vertexShader:_getCommonVertexShader(),fragmentShader:`\nprecision mediump float;\nprecision mediump int;\nvarying vec3 vOutputDirection;\nuniform sampler2D envMap;\nuniform int samples;\nuniform float weights[n];\nuniform bool latitudinal;\nuniform float dTheta;\nuniform float mipInt;\nuniform vec3 poleAxis;\n\n${_getEncodings()}\n\n#define ENVMAP_TYPE_CUBE_UV\n#include <cube_uv_reflection_fragment>\n\nvoid main() {\n\tgl_FragColor = vec4(0.0);\n\tfor (int i = 0; i < n; i++) {\n\t\tif (i >= samples)\n\t\t\tbreak;\n\t\tfor (int dir = -1; dir < 2; dir += 2) {\n\t\t\tif (i == 0 && dir == 1)\n\t\t\t\tcontinue;\n\t\t\tvec3 axis = latitudinal ? poleAxis : cross(poleAxis, vOutputDirection);\n\t\t\tif (all(equal(axis, vec3(0.0))))\n\t\t\t\taxis = cross(vec3(0.0, 1.0, 0.0), vOutputDirection);\n\t\t\taxis = normalize(axis);\n\t\t\tfloat theta = dTheta * float(dir * i);\n\t\t\tfloat cosTheta = cos(theta);\n\t\t\t// Rodrigues' axis-angle rotation\n\t\t\tvec3 sampleDirection = vOutputDirection * cosTheta\n\t\t\t\t\t+ cross(axis, vOutputDirection) * sin(theta)\n\t\t\t\t\t+ axis * dot(axis, vOutputDirection) * (1.0 - cosTheta);\n\t\t\tgl_FragColor.rgb +=\n\t\t\t\t\tweights[i] * bilinearCubeUV(envMap, sampleDirection, mipInt);\n\t\t}\n\t}\n\tgl_FragColor = linearToOutputTexel(gl_FragColor);\n}\n\t\t`,blending:NoBlending,depthTest:!1,depthWrite:!1});return t.type="SphericalGaussianBlur",t}
function _getEquirectShader()
{var e=new RawShaderMaterial({uniforms:{envMap:{value:null},texelSize:{value:new Vector2(1,1)},inputEncoding:{value:ENCODINGS[LinearEncoding]},outputEncoding:{value:ENCODINGS[LinearEncoding]}},vertexShader:_getCommonVertexShader(),fragmentShader:`\nprecision mediump float;\nprecision mediump int;\nvarying vec3 vOutputDirection;\nuniform sampler2D envMap;\nuniform vec2 texelSize;\n\n${_getEncodings()}\n\n#define RECIPROCAL_PI 0.31830988618\n#define RECIPROCAL_PI2 0.15915494\n\nvoid main() {\n\tgl_FragColor = vec4(0.0);\n\tvec3 outputDirection = normalize(vOutputDirection);\n\tvec2 uv;\n\tuv.y = asin(clamp(outputDirection.y, -1.0, 1.0)) * RECIPROCAL_PI + 0.5;\n\tuv.x = atan(outputDirection.z, outputDirection.x) * RECIPROCAL_PI2 + 0.5;\n\tvec2 f = fract(uv / texelSize - 0.5);\n\tuv -= f * texelSize;\n\tvec3 tl = envMapTexelToLinear(texture2D(envMap, uv)).rgb;\n\tuv.x += texelSize.x;\n\tvec3 tr = envMapTexelToLinear(texture2D(envMap, uv)).rgb;\n\tuv.y += texelSize.y;\n\tvec3 br = envMapTexelToLinear(texture2D(envMap, uv)).rgb;\n\tuv.x -= texelSize.x;\n\tvec3 bl = envMapTexelToLinear(texture2D(envMap, uv)).rgb;\n\tvec3 tm = mix(tl, tr, f.x);\n\tvec3 bm = mix(bl, br, f.x);\n\tgl_FragColor.rgb = mix(tm, bm, f.y);\n\tgl_FragColor = linearToOutputTexel(gl_FragColor);\n}\n\t\t`,blending:NoBlending,depthTest:!1,depthWrite:!1});return e.type="EquirectangularToCubeUV",e}
function _getCubemapShader()
{var e=new RawShaderMaterial({uniforms:{envMap:{value:null},inputEncoding:{value:ENCODINGS[LinearEncoding]},outputEncoding:{value:ENCODINGS[LinearEncoding]}},vertexShader:_getCommonVertexShader(),fragmentShader:`\nprecision mediump float;\nprecision mediump int;\nvarying vec3 vOutputDirection;\nuniform samplerCube envMap;\n\n${_getEncodings()}\n\nvoid main() {\n\tgl_FragColor = vec4(0.0);\n\tgl_FragColor.rgb = envMapTexelToLinear(textureCube(envMap, vec3( - vOutputDirection.x, vOutputDirection.yz ))).rgb;\n\tgl_FragColor = linearToOutputTexel(gl_FragColor);\n}\n\t\t`,blending:NoBlending,depthTest:!1,depthWrite:!1});return e.type="CubemapToCubeUV",e}
function _getCommonVertexShader()
{return"\nprecision mediump float;\nprecision mediump int;\nattribute vec3 position;\nattribute vec2 uv;\nattribute float faceIndex;\nvarying vec3 vOutputDirection;\nvec3 getDirection(vec2 uv, float face) {\n\tuv = 2.0 * uv - 1.0;\n\tvec3 direction = vec3(uv, 1.0);\n\tif (face == 0.0) {\n\t\tdirection = direction.zyx;\n\t\tdirection.z *= -1.0;\n\t} else if (face == 1.0) {\n\t\tdirection = direction.xzy;\n\t\tdirection.z *= -1.0;\n\t} else if (face == 3.0) {\n\t\tdirection = direction.zyx;\n\t\tdirection.x *= -1.0;\n\t} else if (face == 4.0) {\n\t\tdirection = direction.xzy;\n\t\tdirection.y *= -1.0;\n\t} else if (face == 5.0) {\n\t\tdirection.xz *= -1.0;\n\t}\n\treturn direction;\n}\nvoid main() {\n\tvOutputDirection = getDirection(uv, faceIndex);\n\tgl_Position = vec4( position, 1.0 );\n}\n\t"}
function _getEncodings()
{return"\nuniform int inputEncoding;\nuniform int outputEncoding;\n\n#include <encodings_pars_fragment>\n\nvec4 inputTexelToLinear(vec4 value){\n\tif(inputEncoding == 0){\n\t\treturn value;\n\t}else if(inputEncoding == 1){\n\t\treturn sRGBToLinear(value);\n\t}else if(inputEncoding == 2){\n\t\treturn RGBEToLinear(value);\n\t}else if(inputEncoding == 3){\n\t\treturn RGBMToLinear(value, 7.0);\n\t}else if(inputEncoding == 4){\n\t\treturn RGBMToLinear(value, 16.0);\n\t}else if(inputEncoding == 5){\n\t\treturn RGBDToLinear(value, 256.0);\n\t}else{\n\t\treturn GammaToLinear(value, 2.2);\n\t}\n}\n\nvec4 linearToOutputTexel(vec4 value){\n\tif(outputEncoding == 0){\n\t\treturn value;\n\t}else if(outputEncoding == 1){\n\t\treturn LinearTosRGB(value);\n\t}else if(outputEncoding == 2){\n\t\treturn LinearToRGBE(value);\n\t}else if(outputEncoding == 3){\n\t\treturn LinearToRGBM(value, 7.0);\n\t}else if(outputEncoding == 4){\n\t\treturn LinearToRGBM(value, 16.0);\n\t}else if(outputEncoding == 5){\n\t\treturn LinearToRGBD(value, 256.0);\n\t}else{\n\t\treturn LinearToGamma(value, 2.2);\n\t}\n}\n\nvec4 envMapTexelToLinear(vec4 color) {\n\treturn inputTexelToLinear(color);\n}\n\t"}
function Spline(e)
{console.warn("THREE.Spline has been removed. Use THREE.CatmullRomCurve3 instead."),CatmullRomCurve3.call(this,e),this.type="catmullrom"}
PMREMGenerator.prototype={constructor:PMREMGenerator,fromScene:function(e,t=0,r=.1,n=100)
{_oldTarget=_renderer.getRenderTarget();var i=_allocateTargets();return _sceneToCubeUV(e,r,n,i),t>0&&_blur(i,0,0,t),_applyPMREM(i),_cleanup(i),i},fromEquirectangular:function(e)
{return e.magFilter=NearestFilter,e.minFilter=NearestFilter,e.generateMipmaps=!1,this.fromCubemap(e)},fromCubemap:function(e)
{_oldTarget=_renderer.getRenderTarget();var t=_allocateTargets(e);return _textureToCubeUV(e,t),_applyPMREM(t),_cleanup(t),t},compileCubemapShader:function()
{null==_cubemapShader&&_compileMaterial(_cubemapShader=_getCubemapShader())},compileEquirectangularShader:function()
{null==_equirectShader&&_compileMaterial(_equirectShader=_getEquirectShader())},dispose:function()
{_blurMaterial.dispose(),null!=_cubemapShader&&_cubemapShader.dispose(),null!=_equirectShader&&_equirectShader.dispose();for(var e=0;e<_lodPlanes.length;e++)_lodPlanes[e].dispose()}},Curve.create=function(e,t)
{return console.log("THREE.Curve.create() has been deprecated"),e.prototype=Object.create(Curve.prototype),e.prototype.constructor=e,e.prototype.getPoint=t,e},Object.assign(CurvePath.prototype,{createPointsGeometry:function(e)
{console.warn("THREE.CurvePath: .createPointsGeometry() has been removed. Use new THREE.Geometry().setFromPoints( points ) instead.");var t=this.getPoints(e);return this.createGeometry(t)},createSpacedPointsGeometry:function(e)
{console.warn("THREE.CurvePath: .createSpacedPointsGeometry() has been removed. Use new THREE.Geometry().setFromPoints( points ) instead.");var t=this.getSpacedPoints(e);return this.createGeometry(t)},createGeometry:function(e)
{console.warn("THREE.CurvePath: .createGeometry() has been removed. Use new THREE.Geometry().setFromPoints( points ) instead.");for(var t=new Geometry,r=0,n=e.length;r<n;r++)
{var i=e[r];t.vertices.push(new Vector3(i.x,i.y,i.z||0))}
return t}}),Object.assign(Path.prototype,{fromPoints:function(e)
{return console.warn("THREE.Path: .fromPoints() has been renamed to .setFromPoints()."),this.setFromPoints(e)}}),Spline.prototype=Object.create(CatmullRomCurve3.prototype),Object.assign(Spline.prototype,{initFromArray:function()
{console.error("THREE.Spline: .initFromArray() has been removed.")},getControlPointsArray:function()
{console.error("THREE.Spline: .getControlPointsArray() has been removed.")},reparametrizeByArcLength:function()
{console.error("THREE.Spline: .reparametrizeByArcLength() has been removed.")}}),GridHelper.prototype.setColors=function()
{console.error("THREE.GridHelper: setColors() has been deprecated, pass them in the constructor instead.")},SkeletonHelper.prototype.update=function()
{console.error("THREE.SkeletonHelper: update() no longer needs to be called.")},Object.assign(Loader.prototype,{extractUrlBase:function(e)
{return console.warn("THREE.Loader: .extractUrlBase() has been deprecated. Use THREE.LoaderUtils.extractUrlBase() instead."),LoaderUtils.extractUrlBase(e)}}),Loader.Handlers={add:function()
{console.error("THREE.Loader: Handlers.add() has been removed. Use LoadingManager.addHandler() instead.")},get:function()
{console.error("THREE.Loader: Handlers.get() has been removed. Use LoadingManager.getHandler() instead.")}},Object.assign(ObjectLoader.prototype,{setTexturePath:function(e)
{return console.warn("THREE.ObjectLoader: .setTexturePath() has been renamed to .setResourcePath()."),this.setResourcePath(e)}}),Object.assign(Box2.prototype,{center:function(e)
{return console.warn("THREE.Box2: .center() has been renamed to .getCenter()."),this.getCenter(e)},empty:function()
{return console.warn("THREE.Box2: .empty() has been renamed to .isEmpty()."),this.isEmpty()},isIntersectionBox:function(e)
{return console.warn("THREE.Box2: .isIntersectionBox() has been renamed to .intersectsBox()."),this.intersectsBox(e)},size:function(e)
{return console.warn("THREE.Box2: .size() has been renamed to .getSize()."),this.getSize(e)}}),Object.assign(Box3.prototype,{center:function(e)
{return console.warn("THREE.Box3: .center() has been renamed to .getCenter()."),this.getCenter(e)},empty:function()
{return console.warn("THREE.Box3: .empty() has been renamed to .isEmpty()."),this.isEmpty()},isIntersectionBox:function(e)
{return console.warn("THREE.Box3: .isIntersectionBox() has been renamed to .intersectsBox()."),this.intersectsBox(e)},isIntersectionSphere:function(e)
{return console.warn("THREE.Box3: .isIntersectionSphere() has been renamed to .intersectsSphere()."),this.intersectsSphere(e)},size:function(e)
{return console.warn("THREE.Box3: .size() has been renamed to .getSize()."),this.getSize(e)}}),Frustum.prototype.setFromMatrix=function(e)
{return console.warn("THREE.Frustum: .setFromMatrix() has been renamed to .setFromProjectionMatrix()."),this.setFromProjectionMatrix(e)},Line3.prototype.center=function(e)
{return console.warn("THREE.Line3: .center() has been renamed to .getCenter()."),this.getCenter(e)},Object.assign(MathUtils,{random16:function()
{return console.warn("THREE.Math: .random16() has been deprecated. Use Math.random() instead."),Math.random()},nearestPowerOfTwo:function(e)
{return console.warn("THREE.Math: .nearestPowerOfTwo() has been renamed to .floorPowerOfTwo()."),MathUtils.floorPowerOfTwo(e)},nextPowerOfTwo:function(e)
{return console.warn("THREE.Math: .nextPowerOfTwo() has been renamed to .ceilPowerOfTwo()."),MathUtils.ceilPowerOfTwo(e)}}),Object.assign(Matrix3.prototype,{flattenToArrayOffset:function(e,t)
{return console.warn("THREE.Matrix3: .flattenToArrayOffset() has been deprecated. Use .toArray() instead."),this.toArray(e,t)},multiplyVector3:function(e)
{return console.warn("THREE.Matrix3: .multiplyVector3() has been removed. Use vector.applyMatrix3( matrix ) instead."),e.applyMatrix3(this)},multiplyVector3Array:function()
{console.error("THREE.Matrix3: .multiplyVector3Array() has been removed.")},applyToBufferAttribute:function(e)
{return console.warn("THREE.Matrix3: .applyToBufferAttribute() has been removed. Use attribute.applyMatrix3( matrix ) instead."),e.applyMatrix3(this)},applyToVector3Array:function()
{console.error("THREE.Matrix3: .applyToVector3Array() has been removed.")}}),Object.assign(Matrix4.prototype,{extractPosition:function(e)
{return console.warn("THREE.Matrix4: .extractPosition() has been renamed to .copyPosition()."),this.copyPosition(e)},flattenToArrayOffset:function(e,t)
{return console.warn("THREE.Matrix4: .flattenToArrayOffset() has been deprecated. Use .toArray() instead."),this.toArray(e,t)},getPosition:function()
{return console.warn("THREE.Matrix4: .getPosition() has been removed. Use Vector3.setFromMatrixPosition( matrix ) instead."),(new Vector3).setFromMatrixColumn(this,3)},setRotationFromQuaternion:function(e)
{return console.warn("THREE.Matrix4: .setRotationFromQuaternion() has been renamed to .makeRotationFromQuaternion()."),this.makeRotationFromQuaternion(e)},multiplyToArray:function()
{console.warn("THREE.Matrix4: .multiplyToArray() has been removed.")},multiplyVector3:function(e)
{return console.warn("THREE.Matrix4: .multiplyVector3() has been removed. Use vector.applyMatrix4( matrix ) instead."),e.applyMatrix4(this)},multiplyVector4:function(e)
{return console.warn("THREE.Matrix4: .multiplyVector4() has been removed. Use vector.applyMatrix4( matrix ) instead."),e.applyMatrix4(this)},multiplyVector3Array:function()
{console.error("THREE.Matrix4: .multiplyVector3Array() has been removed.")},rotateAxis:function(e)
{console.warn("THREE.Matrix4: .rotateAxis() has been removed. Use Vector3.transformDirection( matrix ) instead."),e.transformDirection(this)},crossVector:function(e)
{return console.warn("THREE.Matrix4: .crossVector() has been removed. Use vector.applyMatrix4( matrix ) instead."),e.applyMatrix4(this)},translate:function()
{console.error("THREE.Matrix4: .translate() has been removed.")},rotateX:function()
{console.error("THREE.Matrix4: .rotateX() has been removed.")},rotateY:function()
{console.error("THREE.Matrix4: .rotateY() has been removed.")},rotateZ:function()
{console.error("THREE.Matrix4: .rotateZ() has been removed.")},rotateByAxis:function()
{console.error("THREE.Matrix4: .rotateByAxis() has been removed.")},applyToBufferAttribute:function(e)
{return console.warn("THREE.Matrix4: .applyToBufferAttribute() has been removed. Use attribute.applyMatrix4( matrix ) instead."),e.applyMatrix4(this)},applyToVector3Array:function()
{console.error("THREE.Matrix4: .applyToVector3Array() has been removed.")},makeFrustum:function(e,t,r,n,i,a)
{return console.warn("THREE.Matrix4: .makeFrustum() has been removed. Use .makePerspective( left, right, top, bottom, near, far ) instead."),this.makePerspective(e,t,n,r,i,a)}}),Plane.prototype.isIntersectionLine=function(e)
{return console.warn("THREE.Plane: .isIntersectionLine() has been renamed to .intersectsLine()."),this.intersectsLine(e)},Quaternion.prototype.multiplyVector3=function(e)
{return console.warn("THREE.Quaternion: .multiplyVector3() has been removed. Use is now vector.applyQuaternion( quaternion ) instead."),e.applyQuaternion(this)},Object.assign(Ray.prototype,{isIntersectionBox:function(e)
{return console.warn("THREE.Ray: .isIntersectionBox() has been renamed to .intersectsBox()."),this.intersectsBox(e)},isIntersectionPlane:function(e)
{return console.warn("THREE.Ray: .isIntersectionPlane() has been renamed to .intersectsPlane()."),this.intersectsPlane(e)},isIntersectionSphere:function(e)
{return console.warn("THREE.Ray: .isIntersectionSphere() has been renamed to .intersectsSphere()."),this.intersectsSphere(e)}}),Object.assign(Triangle.prototype,{area:function()
{return console.warn("THREE.Triangle: .area() has been renamed to .getArea()."),this.getArea()},barycoordFromPoint:function(e,t)
{return console.warn("THREE.Triangle: .barycoordFromPoint() has been renamed to .getBarycoord()."),this.getBarycoord(e,t)},midpoint:function(e)
{return console.warn("THREE.Triangle: .midpoint() has been renamed to .getMidpoint()."),this.getMidpoint(e)},normal:function(e)
{return console.warn("THREE.Triangle: .normal() has been renamed to .getNormal()."),this.getNormal(e)},plane:function(e)
{return console.warn("THREE.Triangle: .plane() has been renamed to .getPlane()."),this.getPlane(e)}}),Object.assign(Triangle,{barycoordFromPoint:function(e,t,r,n,i)
{return console.warn("THREE.Triangle: .barycoordFromPoint() has been renamed to .getBarycoord()."),Triangle.getBarycoord(e,t,r,n,i)},normal:function(e,t,r,n)
{return console.warn("THREE.Triangle: .normal() has been renamed to .getNormal()."),Triangle.getNormal(e,t,r,n)}}),Object.assign(Shape.prototype,{extractAllPoints:function(e)
{return console.warn("THREE.Shape: .extractAllPoints() has been removed. Use .extractPoints() instead."),this.extractPoints(e)},extrude:function(e)
{return console.warn("THREE.Shape: .extrude() has been removed. Use ExtrudeGeometry() instead."),new ExtrudeGeometry(this,e)},makeGeometry:function(e)
{return console.warn("THREE.Shape: .makeGeometry() has been removed. Use ShapeGeometry() instead."),new ShapeGeometry(this,e)}}),Object.assign(Vector2.prototype,{fromAttribute:function(e,t,r)
{return console.warn("THREE.Vector2: .fromAttribute() has been renamed to .fromBufferAttribute()."),this.fromBufferAttribute(e,t,r)},distanceToManhattan:function(e)
{return console.warn("THREE.Vector2: .distanceToManhattan() has been renamed to .manhattanDistanceTo()."),this.manhattanDistanceTo(e)},lengthManhattan:function()
{return console.warn("THREE.Vector2: .lengthManhattan() has been renamed to .manhattanLength()."),this.manhattanLength()}}),Object.assign(Vector3.prototype,{setEulerFromRotationMatrix:function()
{console.error("THREE.Vector3: .setEulerFromRotationMatrix() has been removed. Use Euler.setFromRotationMatrix() instead.")},setEulerFromQuaternion:function()
{console.error("THREE.Vector3: .setEulerFromQuaternion() has been removed. Use Euler.setFromQuaternion() instead.")},getPositionFromMatrix:function(e)
{return console.warn("THREE.Vector3: .getPositionFromMatrix() has been renamed to .setFromMatrixPosition()."),this.setFromMatrixPosition(e)},getScaleFromMatrix:function(e)
{return console.warn("THREE.Vector3: .getScaleFromMatrix() has been renamed to .setFromMatrixScale()."),this.setFromMatrixScale(e)},getColumnFromMatrix:function(e,t)
{return console.warn("THREE.Vector3: .getColumnFromMatrix() has been renamed to .setFromMatrixColumn()."),this.setFromMatrixColumn(t,e)},applyProjection:function(e)
{return console.warn("THREE.Vector3: .applyProjection() has been removed. Use .applyMatrix4( m ) instead."),this.applyMatrix4(e)},fromAttribute:function(e,t,r)
{return console.warn("THREE.Vector3: .fromAttribute() has been renamed to .fromBufferAttribute()."),this.fromBufferAttribute(e,t,r)},distanceToManhattan:function(e)
{return console.warn("THREE.Vector3: .distanceToManhattan() has been renamed to .manhattanDistanceTo()."),this.manhattanDistanceTo(e)},lengthManhattan:function()
{return console.warn("THREE.Vector3: .lengthManhattan() has been renamed to .manhattanLength()."),this.manhattanLength()}}),Object.assign(Vector4.prototype,{fromAttribute:function(e,t,r)
{return console.warn("THREE.Vector4: .fromAttribute() has been renamed to .fromBufferAttribute()."),this.fromBufferAttribute(e,t,r)},lengthManhattan:function()
{return console.warn("THREE.Vector4: .lengthManhattan() has been renamed to .manhattanLength()."),this.manhattanLength()}}),Object.assign(Geometry.prototype,{computeTangents:function()
{console.error("THREE.Geometry: .computeTangents() has been removed.")},computeLineDistances:function()
{console.error("THREE.Geometry: .computeLineDistances() has been removed. Use THREE.Line.computeLineDistances() instead.")},applyMatrix:function(e)
{return console.warn("THREE.Geometry: .applyMatrix() has been renamed to .applyMatrix4()."),this.applyMatrix4(e)}}),Object.assign(Object3D.prototype,{getChildByName:function(e)
{return console.warn("THREE.Object3D: .getChildByName() has been renamed to .getObjectByName()."),this.getObjectByName(e)},renderDepth:function()
{console.warn("THREE.Object3D: .renderDepth has been removed. Use .renderOrder, instead.")},translate:function(e,t)
{return console.warn("THREE.Object3D: .translate() has been removed. Use .translateOnAxis( axis, distance ) instead."),this.translateOnAxis(t,e)},getWorldRotation:function()
{console.error("THREE.Object3D: .getWorldRotation() has been removed. Use THREE.Object3D.getWorldQuaternion( target ) instead.")},applyMatrix:function(e)
{return console.warn("THREE.Object3D: .applyMatrix() has been renamed to .applyMatrix4()."),this.applyMatrix4(e)}}),Object.defineProperties(Object3D.prototype,{eulerOrder:{get:function()
{return console.warn("THREE.Object3D: .eulerOrder is now .rotation.order."),this.rotation.order},set:function(e)
{console.warn("THREE.Object3D: .eulerOrder is now .rotation.order."),this.rotation.order=e}},useQuaternion:{get:function()
{console.warn("THREE.Object3D: .useQuaternion has been removed. The library now uses quaternions by default.")},set:function()
{console.warn("THREE.Object3D: .useQuaternion has been removed. The library now uses quaternions by default.")}}}),Object.assign(Mesh.prototype,{setDrawMode:function()
{console.error("THREE.Mesh: .setDrawMode() has been removed. The renderer now always assumes THREE.TrianglesDrawMode. Transform your geometry via BufferGeometryUtils.toTrianglesDrawMode() if necessary.")}}),Object.defineProperties(Mesh.prototype,{drawMode:{get:function()
{return console.error("THREE.Mesh: .drawMode has been removed. The renderer now always assumes THREE.TrianglesDrawMode."),TrianglesDrawMode},set:function()
{console.error("THREE.Mesh: .drawMode has been removed. The renderer now always assumes THREE.TrianglesDrawMode. Transform your geometry via BufferGeometryUtils.toTrianglesDrawMode() if necessary.")}}}),Object.defineProperties(LOD.prototype,{objects:{get:function()
{return console.warn("THREE.LOD: .objects has been renamed to .levels."),this.levels}}}),Object.defineProperty(Skeleton.prototype,"useVertexTexture",{get:function()
{console.warn("THREE.Skeleton: useVertexTexture has been removed.")},set:function()
{console.warn("THREE.Skeleton: useVertexTexture has been removed.")}}),SkinnedMesh.prototype.initBones=function()
{console.error("THREE.SkinnedMesh: initBones() has been removed.")},Object.defineProperty(Curve.prototype,"__arcLengthDivisions",{get:function()
{return console.warn("THREE.Curve: .__arcLengthDivisions is now .arcLengthDivisions."),this.arcLengthDivisions},set:function(e)
{console.warn("THREE.Curve: .__arcLengthDivisions is now .arcLengthDivisions."),this.arcLengthDivisions=e}}),PerspectiveCamera.prototype.setLens=function(e,t)
{console.warn("THREE.PerspectiveCamera.setLens is deprecated. Use .setFocalLength and .filmGauge for a photographic setup."),void 0!==t&&(this.filmGauge=t),this.setFocalLength(e)},Object.defineProperties(Light.prototype,{onlyShadow:{set:function()
{console.warn("THREE.Light: .onlyShadow has been removed.")}},shadowCameraFov:{set:function(e)
{console.warn("THREE.Light: .shadowCameraFov is now .shadow.camera.fov."),this.shadow.camera.fov=e}},shadowCameraLeft:{set:function(e)
{console.warn("THREE.Light: .shadowCameraLeft is now .shadow.camera.left."),this.shadow.camera.left=e}},shadowCameraRight:{set:function(e)
{console.warn("THREE.Light: .shadowCameraRight is now .shadow.camera.right."),this.shadow.camera.right=e}},shadowCameraTop:{set:function(e)
{console.warn("THREE.Light: .shadowCameraTop is now .shadow.camera.top."),this.shadow.camera.top=e}},shadowCameraBottom:{set:function(e)
{console.warn("THREE.Light: .shadowCameraBottom is now .shadow.camera.bottom."),this.shadow.camera.bottom=e}},shadowCameraNear:{set:function(e)
{console.warn("THREE.Light: .shadowCameraNear is now .shadow.camera.near."),this.shadow.camera.near=e}},shadowCameraFar:{set:function(e)
{console.warn("THREE.Light: .shadowCameraFar is now .shadow.camera.far."),this.shadow.camera.far=e}},shadowCameraVisible:{set:function()
{console.warn("THREE.Light: .shadowCameraVisible has been removed. Use new THREE.CameraHelper( light.shadow.camera ) instead.")}},shadowBias:{set:function(e)
{console.warn("THREE.Light: .shadowBias is now .shadow.bias."),this.shadow.bias=e}},shadowDarkness:{set:function()
{console.warn("THREE.Light: .shadowDarkness has been removed.")}},shadowMapWidth:{set:function(e)
{console.warn("THREE.Light: .shadowMapWidth is now .shadow.mapSize.width."),this.shadow.mapSize.width=e}},shadowMapHeight:{set:function(e)
{console.warn("THREE.Light: .shadowMapHeight is now .shadow.mapSize.height."),this.shadow.mapSize.height=e}}}),Object.defineProperties(BufferAttribute.prototype,{length:{get:function()
{return console.warn("THREE.BufferAttribute: .length has been deprecated. Use .count instead."),this.array.length}},dynamic:{get:function()
{return console.warn("THREE.BufferAttribute: .dynamic has been deprecated. Use .usage instead."),this.usage===DynamicDrawUsage},set:function()
{console.warn("THREE.BufferAttribute: .dynamic has been deprecated. Use .usage instead."),this.setUsage(DynamicDrawUsage)}}}),Object.assign(BufferAttribute.prototype,{setDynamic:function(e)
{return console.warn("THREE.BufferAttribute: .setDynamic() has been deprecated. Use .setUsage() instead."),this.setUsage(!0===e?DynamicDrawUsage:StaticDrawUsage),this},copyIndicesArray:function()
{console.error("THREE.BufferAttribute: .copyIndicesArray() has been removed.")},setArray:function()
{console.error("THREE.BufferAttribute: .setArray has been removed. Use BufferGeometry .setAttribute to replace/resize attribute buffers")}}),Object.assign(BufferGeometry.prototype,{addIndex:function(e)
{console.warn("THREE.BufferGeometry: .addIndex() has been renamed to .setIndex()."),this.setIndex(e)},addAttribute:function(e,t)
{return console.warn("THREE.BufferGeometry: .addAttribute() has been renamed to .setAttribute()."),t&&t.isBufferAttribute||t&&t.isInterleavedBufferAttribute?"index"===e?(console.warn("THREE.BufferGeometry.addAttribute: Use .setIndex() for index attribute."),this.setIndex(t),this):this.setAttribute(e,t):(console.warn("THREE.BufferGeometry: .addAttribute() now expects ( name, attribute )."),this.setAttribute(e,new BufferAttribute(arguments[1],arguments[2])))},addDrawCall:function(e,t,r)
{void 0!==r&&console.warn("THREE.BufferGeometry: .addDrawCall() no longer supports indexOffset."),console.warn("THREE.BufferGeometry: .addDrawCall() is now .addGroup()."),this.addGroup(e,t)},clearDrawCalls:function()
{console.warn("THREE.BufferGeometry: .clearDrawCalls() is now .clearGroups()."),this.clearGroups()},computeTangents:function()
{console.warn("THREE.BufferGeometry: .computeTangents() has been removed.")},computeOffsets:function()
{console.warn("THREE.BufferGeometry: .computeOffsets() has been removed.")},removeAttribute:function(e)
{return console.warn("THREE.BufferGeometry: .removeAttribute() has been renamed to .deleteAttribute()."),this.deleteAttribute(e)},applyMatrix:function(e)
{return console.warn("THREE.BufferGeometry: .applyMatrix() has been renamed to .applyMatrix4()."),this.applyMatrix4(e)}}),Object.defineProperties(BufferGeometry.prototype,{drawcalls:{get:function()
{return console.error("THREE.BufferGeometry: .drawcalls has been renamed to .groups."),this.groups}},offsets:{get:function()
{return console.warn("THREE.BufferGeometry: .offsets has been renamed to .groups."),this.groups}}}),Object.defineProperties(InterleavedBuffer.prototype,{dynamic:{get:function()
{return console.warn("THREE.InterleavedBuffer: .length has been deprecated. Use .usage instead."),this.usage===DynamicDrawUsage},set:function(e)
{console.warn("THREE.InterleavedBuffer: .length has been deprecated. Use .usage instead."),this.setUsage(e)}}}),Object.assign(InterleavedBuffer.prototype,{setDynamic:function(e)
{return console.warn("THREE.InterleavedBuffer: .setDynamic() has been deprecated. Use .setUsage() instead."),this.setUsage(!0===e?DynamicDrawUsage:StaticDrawUsage),this},setArray:function()
{console.error("THREE.InterleavedBuffer: .setArray has been removed. Use BufferGeometry .setAttribute to replace/resize attribute buffers")}}),Object.assign(ExtrudeBufferGeometry.prototype,{getArrays:function()
{console.error("THREE.ExtrudeBufferGeometry: .getArrays() has been removed.")},addShapeList:function()
{console.error("THREE.ExtrudeBufferGeometry: .addShapeList() has been removed.")},addShape:function()
{console.error("THREE.ExtrudeBufferGeometry: .addShape() has been removed.")}}),Object.defineProperties(Uniform.prototype,{dynamic:{set:function()
{console.warn("THREE.Uniform: .dynamic has been removed. Use object.onBeforeRender() instead.")}},onUpdate:{value:function()
{return console.warn("THREE.Uniform: .onUpdate() has been removed. Use object.onBeforeRender() instead."),this}}}),Object.defineProperties(Material.prototype,{wrapAround:{get:function()
{console.warn("THREE.Material: .wrapAround has been removed.")},set:function()
{console.warn("THREE.Material: .wrapAround has been removed.")}},overdraw:{get:function()
{console.warn("THREE.Material: .overdraw has been removed.")},set:function()
{console.warn("THREE.Material: .overdraw has been removed.")}},wrapRGB:{get:function()
{return console.warn("THREE.Material: .wrapRGB has been removed."),new Color}},shading:{get:function()
{console.error("THREE."+this.type+": .shading has been removed. Use the boolean .flatShading instead.")},set:function(e)
{console.warn("THREE."+this.type+": .shading has been removed. Use the boolean .flatShading instead."),this.flatShading=e===FlatShading}},stencilMask:{get:function()
{return console.warn("THREE."+this.type+": .stencilMask has been removed. Use .stencilFuncMask instead."),this.stencilFuncMask},set:function(e)
{console.warn("THREE."+this.type+": .stencilMask has been removed. Use .stencilFuncMask instead."),this.stencilFuncMask=e}}}),Object.defineProperties(MeshPhongMaterial.prototype,{metal:{get:function()
{return console.warn("THREE.MeshPhongMaterial: .metal has been removed. Use THREE.MeshStandardMaterial instead."),!1},set:function()
{console.warn("THREE.MeshPhongMaterial: .metal has been removed. Use THREE.MeshStandardMaterial instead")}}}),Object.defineProperties(ShaderMaterial.prototype,{derivatives:{get:function()
{return console.warn("THREE.ShaderMaterial: .derivatives has been moved to .extensions.derivatives."),this.extensions.derivatives},set:function(e)
{console.warn("THREE. ShaderMaterial: .derivatives has been moved to .extensions.derivatives."),this.extensions.derivatives=e}}}),Object.assign(WebGLRenderer.prototype,{clearTarget:function(e,t,r,n)
{console.warn("THREE.WebGLRenderer: .clearTarget() has been deprecated. Use .setRenderTarget() and .clear() instead."),this.setRenderTarget(e),this.clear(t,r,n)},animate:function(e)
{console.warn("THREE.WebGLRenderer: .animate() is now .setAnimationLoop()."),this.setAnimationLoop(e)},getCurrentRenderTarget:function()
{return console.warn("THREE.WebGLRenderer: .getCurrentRenderTarget() is now .getRenderTarget()."),this.getRenderTarget()},getMaxAnisotropy:function()
{return console.warn("THREE.WebGLRenderer: .getMaxAnisotropy() is now .capabilities.getMaxAnisotropy()."),this.capabilities.getMaxAnisotropy()},getPrecision:function()
{return console.warn("THREE.WebGLRenderer: .getPrecision() is now .capabilities.precision."),this.capabilities.precision},resetGLState:function()
{return console.warn("THREE.WebGLRenderer: .resetGLState() is now .state.reset()."),this.state.reset()},supportsFloatTextures:function()
{return console.warn("THREE.WebGLRenderer: .supportsFloatTextures() is now .extensions.get( 'OES_texture_float' )."),this.extensions.get("OES_texture_float")},supportsHalfFloatTextures:function()
{return console.warn("THREE.WebGLRenderer: .supportsHalfFloatTextures() is now .extensions.get( 'OES_texture_half_float' )."),this.extensions.get("OES_texture_half_float")},supportsStandardDerivatives:function()
{return console.warn("THREE.WebGLRenderer: .supportsStandardDerivatives() is now .extensions.get( 'OES_standard_derivatives' )."),this.extensions.get("OES_standard_derivatives")},supportsCompressedTextureS3TC:function()
{return console.warn("THREE.WebGLRenderer: .supportsCompressedTextureS3TC() is now .extensions.get( 'WEBGL_compressed_texture_s3tc' )."),this.extensions.get("WEBGL_compressed_texture_s3tc")},supportsCompressedTexturePVRTC:function()
{return console.warn("THREE.WebGLRenderer: .supportsCompressedTexturePVRTC() is now .extensions.get( 'WEBGL_compressed_texture_pvrtc' )."),this.extensions.get("WEBGL_compressed_texture_pvrtc")},supportsBlendMinMax:function()
{return console.warn("THREE.WebGLRenderer: .supportsBlendMinMax() is now .extensions.get( 'EXT_blend_minmax' )."),this.extensions.get("EXT_blend_minmax")},supportsVertexTextures:function()
{return console.warn("THREE.WebGLRenderer: .supportsVertexTextures() is now .capabilities.vertexTextures."),this.capabilities.vertexTextures},supportsInstancedArrays:function()
{return console.warn("THREE.WebGLRenderer: .supportsInstancedArrays() is now .extensions.get( 'ANGLE_instanced_arrays' )."),this.extensions.get("ANGLE_instanced_arrays")},enableScissorTest:function(e)
{console.warn("THREE.WebGLRenderer: .enableScissorTest() is now .setScissorTest()."),this.setScissorTest(e)},initMaterial:function()
{console.warn("THREE.WebGLRenderer: .initMaterial() has been removed.")},addPrePlugin:function()
{console.warn("THREE.WebGLRenderer: .addPrePlugin() has been removed.")},addPostPlugin:function()
{console.warn("THREE.WebGLRenderer: .addPostPlugin() has been removed.")},updateShadowMap:function()
{console.warn("THREE.WebGLRenderer: .updateShadowMap() has been removed.")},setFaceCulling:function()
{console.warn("THREE.WebGLRenderer: .setFaceCulling() has been removed.")},allocTextureUnit:function()
{console.warn("THREE.WebGLRenderer: .allocTextureUnit() has been removed.")},setTexture:function()
{console.warn("THREE.WebGLRenderer: .setTexture() has been removed.")},setTexture2D:function()
{console.warn("THREE.WebGLRenderer: .setTexture2D() has been removed.")},setTextureCube:function()
{console.warn("THREE.WebGLRenderer: .setTextureCube() has been removed.")},getActiveMipMapLevel:function()
{return console.warn("THREE.WebGLRenderer: .getActiveMipMapLevel() is now .getActiveMipmapLevel()."),this.getActiveMipmapLevel()}}),Object.defineProperties(WebGLRenderer.prototype,{shadowMapEnabled:{get:function()
{return this.shadowMap.enabled},set:function(e)
{console.warn("THREE.WebGLRenderer: .shadowMapEnabled is now .shadowMap.enabled."),this.shadowMap.enabled=e}},shadowMapType:{get:function()
{return this.shadowMap.type},set:function(e)
{console.warn("THREE.WebGLRenderer: .shadowMapType is now .shadowMap.type."),this.shadowMap.type=e}},shadowMapCullFace:{get:function()
{console.warn("THREE.WebGLRenderer: .shadowMapCullFace has been removed. Set Material.shadowSide instead.")},set:function()
{console.warn("THREE.WebGLRenderer: .shadowMapCullFace has been removed. Set Material.shadowSide instead.")}},context:{get:function()
{return console.warn("THREE.WebGLRenderer: .context has been removed. Use .getContext() instead."),this.getContext()}},vr:{get:function()
{return console.warn("THREE.WebGLRenderer: .vr has been renamed to .xr"),this.xr}},gammaInput:{get:function()
{return console.warn("THREE.WebGLRenderer: .gammaInput has been removed. Set the encoding for textures via Texture.encoding instead."),!1},set:function()
{console.warn("THREE.WebGLRenderer: .gammaInput has been removed. Set the encoding for textures via Texture.encoding instead.")}},gammaOutput:{get:function()
{return console.warn("THREE.WebGLRenderer: .gammaOutput has been removed. Set WebGLRenderer.outputEncoding instead."),!1},set:function(e)
{console.warn("THREE.WebGLRenderer: .gammaOutput has been removed. Set WebGLRenderer.outputEncoding instead."),this.outputEncoding=!0===e?sRGBEncoding:LinearEncoding}}}),Object.defineProperties(WebGLShadowMap.prototype,{cullFace:{get:function()
{console.warn("THREE.WebGLRenderer: .shadowMap.cullFace has been removed. Set Material.shadowSide instead.")},set:function()
{console.warn("THREE.WebGLRenderer: .shadowMap.cullFace has been removed. Set Material.shadowSide instead.")}},renderReverseSided:{get:function()
{console.warn("THREE.WebGLRenderer: .shadowMap.renderReverseSided has been removed. Set Material.shadowSide instead.")},set:function()
{console.warn("THREE.WebGLRenderer: .shadowMap.renderReverseSided has been removed. Set Material.shadowSide instead.")}},renderSingleSided:{get:function()
{console.warn("THREE.WebGLRenderer: .shadowMap.renderSingleSided has been removed. Set Material.shadowSide instead.")},set:function()
{console.warn("THREE.WebGLRenderer: .shadowMap.renderSingleSided has been removed. Set Material.shadowSide instead.")}}}),Object.defineProperties(WebGLRenderTarget.prototype,{wrapS:{get:function()
{return console.warn("THREE.WebGLRenderTarget: .wrapS is now .texture.wrapS."),this.texture.wrapS},set:function(e)
{console.warn("THREE.WebGLRenderTarget: .wrapS is now .texture.wrapS."),this.texture.wrapS=e}},wrapT:{get:function()
{return console.warn("THREE.WebGLRenderTarget: .wrapT is now .texture.wrapT."),this.texture.wrapT},set:function(e)
{console.warn("THREE.WebGLRenderTarget: .wrapT is now .texture.wrapT."),this.texture.wrapT=e}},magFilter:{get:function()
{return console.warn("THREE.WebGLRenderTarget: .magFilter is now .texture.magFilter."),this.texture.magFilter},set:function(e)
{console.warn("THREE.WebGLRenderTarget: .magFilter is now .texture.magFilter."),this.texture.magFilter=e}},minFilter:{get:function()
{return console.warn("THREE.WebGLRenderTarget: .minFilter is now .texture.minFilter."),this.texture.minFilter},set:function(e)
{console.warn("THREE.WebGLRenderTarget: .minFilter is now .texture.minFilter."),this.texture.minFilter=e}},anisotropy:{get:function()
{return console.warn("THREE.WebGLRenderTarget: .anisotropy is now .texture.anisotropy."),this.texture.anisotropy},set:function(e)
{console.warn("THREE.WebGLRenderTarget: .anisotropy is now .texture.anisotropy."),this.texture.anisotropy=e}},offset:{get:function()
{return console.warn("THREE.WebGLRenderTarget: .offset is now .texture.offset."),this.texture.offset},set:function(e)
{console.warn("THREE.WebGLRenderTarget: .offset is now .texture.offset."),this.texture.offset=e}},repeat:{get:function()
{return console.warn("THREE.WebGLRenderTarget: .repeat is now .texture.repeat."),this.texture.repeat},set:function(e)
{console.warn("THREE.WebGLRenderTarget: .repeat is now .texture.repeat."),this.texture.repeat=e}},format:{get:function()
{return console.warn("THREE.WebGLRenderTarget: .format is now .texture.format."),this.texture.format},set:function(e)
{console.warn("THREE.WebGLRenderTarget: .format is now .texture.format."),this.texture.format=e}},type:{get:function()
{return console.warn("THREE.WebGLRenderTarget: .type is now .texture.type."),this.texture.type},set:function(e)
{console.warn("THREE.WebGLRenderTarget: .type is now .texture.type."),this.texture.type=e}},generateMipmaps:{get:function()
{return console.warn("THREE.WebGLRenderTarget: .generateMipmaps is now .texture.generateMipmaps."),this.texture.generateMipmaps},set:function(e)
{console.warn("THREE.WebGLRenderTarget: .generateMipmaps is now .texture.generateMipmaps."),this.texture.generateMipmaps=e}}}),Object.defineProperties(Audio.prototype,{load:{value:function(e)
{console.warn("THREE.Audio: .load has been deprecated. Use THREE.AudioLoader instead.");var t=this;return(new AudioLoader).load(e,function(e)
{t.setBuffer(e)}),this}},startTime:{set:function()
{console.warn("THREE.Audio: .startTime is now .play( delay ).")}}}),AudioAnalyser.prototype.getData=function()
{return console.warn("THREE.AudioAnalyser: .getData() is now .getFrequencyData()."),this.getFrequencyData()},CubeCamera.prototype.updateCubeMap=function(e,t)
{return console.warn("THREE.CubeCamera: .updateCubeMap() is now .update()."),this.update(e,t)},ImageUtils.crossOrigin=void 0,ImageUtils.loadTexture=function(e,t,r,n)
{console.warn("THREE.ImageUtils.loadTexture has been deprecated. Use THREE.TextureLoader() instead.");var i=new TextureLoader;i.setCrossOrigin(this.crossOrigin);var a=i.load(e,r,void 0,n);return t&&(a.mapping=t),a},ImageUtils.loadTextureCube=function(e,t,r,n)
{console.warn("THREE.ImageUtils.loadTextureCube has been deprecated. Use THREE.CubeTextureLoader() instead.");var i=new CubeTextureLoader;i.setCrossOrigin(this.crossOrigin);var a=i.load(e,r,void 0,n);return t&&(a.mapping=t),a},ImageUtils.loadCompressedTexture=function()
{console.error("THREE.ImageUtils.loadCompressedTexture has been removed. Use THREE.DDSLoader instead.")},ImageUtils.loadCompressedTextureCube=function()
{console.error("THREE.ImageUtils.loadCompressedTextureCube has been removed. Use THREE.DDSLoader instead.")},"undefined"!=typeof __THREE_DEVTOOLS__&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:REVISION}}));var DRACOLoader=function(e)
{Loader.call(this,e),this.decoderPath="",this.decoderConfig={},this.decoderBinary=null,this.decoderPending=null,this.workerLimit=4,this.workerPool=[],this.workerNextTaskID=1,this.workerSourceURL="",this.defaultAttributeIDs={position:"POSITION",normal:"NORMAL",color:"COLOR",uv:"TEX_COORD"},this.defaultAttributeTypes={position:"Float32Array",normal:"Float32Array",color:"Float32Array",uv:"Float32Array"}};DRACOLoader.prototype=Object.assign(Object.create(Loader.prototype),{constructor:DRACOLoader,setDecoderPath:function(e)
{return this.decoderPath=e,this},setDecoderConfig:function(e)
{return this.decoderConfig=e,this},setWorkerLimit:function(e)
{return this.workerLimit=e,this},setVerbosity:function()
{console.warn("THREE.DRACOLoader: The .setVerbosity() method has been removed.")},setDrawMode:function()
{console.warn("THREE.DRACOLoader: The .setDrawMode() method has been removed.")},setSkipDequantization:function()
{console.warn("THREE.DRACOLoader: The .setSkipDequantization() method has been removed.")},load:function(e,t,r,n)
{var i=new FileLoader(this.manager);i.setPath(this.path),i.setResponseType("arraybuffer"),"use-credentials"===this.crossOrigin&&i.setWithCredentials(!0),i.load(e,e=>{var r={attributeIDs:this.defaultAttributeIDs,attributeTypes:this.defaultAttributeTypes,useUniqueIDs:!1};this.decodeGeometry(e,r).then(t).catch(n)},r,n)},decodeDracoFile:function(e,t,r,n)
{var i={attributeIDs:r||this.defaultAttributeIDs,attributeTypes:n||this.defaultAttributeTypes,useUniqueIDs:!!r};this.decodeGeometry(e,i).then(t)},decodeGeometry:function(e,t)
{for(var r in t.attributeTypes)
{var n=t.attributeTypes[r];void 0!==n.BYTES_PER_ELEMENT&&(t.attributeTypes[r]=n.name)}
var i,a=JSON.stringify(t);if(DRACOLoader.taskCache.has(e))
{var o=DRACOLoader.taskCache.get(e);if(o.key===a)return o.promise;if(0===e.byteLength)throw new Error("THREE.DRACOLoader: Unable to re-decode a buffer with different settings. Buffer has already been transferred.")}
var s=this.workerNextTaskID++,l=e.byteLength,c=this._getWorker(s,l).then(r=>(i=r,new Promise((r,n)=>{i._callbacks[s]={resolve:r,reject:n},i.postMessage({type:"decode",id:s,taskConfig:t,buffer:e},[e])}))).then(e=>this._createGeometry(e.geometry));return c.finally(()=>{i&&s&&this._releaseTask(i,s)}),DRACOLoader.taskCache.set(e,{key:a,promise:c}),c},_createGeometry:function(e)
{var t=new BufferGeometry;e.index&&t.setIndex(new BufferAttribute(e.index.array,1));for(var r=0;r<e.attributes.length;r++)
{var n=e.attributes[r],i=n.name,a=n.array,o=n.itemSize;t.setAttribute(i,new BufferAttribute(a,o))}
return t},_loadLibrary:function(e,t)
{var r=new FileLoader(this.manager);return r.setPath(this.decoderPath),r.setResponseType(t),new Promise((t,n)=>{r.load(e,t,void 0,n)})},preload:function()
{return this._initDecoder(),this},_initDecoder:function()
{if(this.decoderPending)return this.decoderPending;var e="object"!=typeof WebAssembly||"js"===this.decoderConfig.type,t=[];return e?t.push(this._loadLibrary("draco_decoder.js","text")):(t.push(this._loadLibrary("draco_wasm_wrapper.js","text")),t.push(this._loadLibrary("draco_decoder.wasm","arraybuffer"))),this.decoderPending=Promise.all(t).then(t=>{var r=t[0];e||(this.decoderConfig.wasmBinary=t[1]);var n=DRACOLoader.DRACOWorker.toString(),i=["/* draco decoder */",r,"","/* worker */",n.substring(n.indexOf("{")+1,n.lastIndexOf("}"))].join("\n");this.workerSourceURL=URL.createObjectURL(new Blob([i]))}),this.decoderPending},_getWorker:function(e,t)
{return this._initDecoder().then(()=>{var r;this.workerPool.length<this.workerLimit?((r=new Worker(this.workerSourceURL))._callbacks={},r._taskCosts={},r._taskLoad=0,r.postMessage({type:"init",decoderConfig:this.decoderConfig}),r.onmessage=function(e)
{var t=e.data;switch(t.type)
{case "decode":r._callbacks[t.id].resolve(t);break;case "error":r._callbacks[t.id].reject(t);break;default:console.error('THREE.DRACOLoader: Unexpected message, "'+t.type+'"')}},this.workerPool.push(r)):this.workerPool.sort(function(e,t)
{return e._taskLoad>t._taskLoad?-1:1});return(r=this.workerPool[this.workerPool.length-1])._taskCosts[e]=t,r._taskLoad+=t,r})},_releaseTask:function(e,t)
{e._taskLoad-=e._taskCosts[t],delete e._callbacks[t],delete e._taskCosts[t]},debug:function()
{console.log("Task load: ",this.workerPool.map(e=>e._taskLoad))},dispose:function()
{for(var e=0;e<this.workerPool.length;++e)this.workerPool[e].terminate();return this.workerPool.length=0,this}}),DRACOLoader.DRACOWorker=function()
{var e,t;function r(e,t,r,n,i,a)
{var o,s,l=a.num_components(),c=r.num_points()*l;switch(i)
{case Float32Array:o=new e.DracoFloat32Array,t.GetAttributeFloatForAllPoints(r,a,o),s=new Float32Array(c);break;case Int8Array:o=new e.DracoInt8Array,t.GetAttributeInt8ForAllPoints(r,a,o),s=new Int8Array(c);break;case Int16Array:o=new e.DracoInt16Array,t.GetAttributeInt16ForAllPoints(r,a,o),s=new Int16Array(c);break;case Int32Array:o=new e.DracoInt32Array,t.GetAttributeInt32ForAllPoints(r,a,o),s=new Int32Array(c);break;case Uint8Array:o=new e.DracoUInt8Array,t.GetAttributeUInt8ForAllPoints(r,a,o),s=new Uint8Array(c);break;case Uint16Array:o=new e.DracoUInt16Array,t.GetAttributeUInt16ForAllPoints(r,a,o),s=new Uint16Array(c);break;case Uint32Array:o=new e.DracoUInt32Array,t.GetAttributeUInt32ForAllPoints(r,a,o),s=new Uint32Array(c);break;default:throw new Error("THREE.DRACOLoader: Unexpected attribute type.")}
for(var h=0;h<c;h++)s[h]=o.GetValue(h);return e.destroy(o),{name:n,array:s,itemSize:l}}
onmessage=function(n)
{var i=n.data;switch(i.type)
{case "init":e=i.decoderConfig,t=new Promise(function(t)
{e.onModuleLoaded=function(e)
{t({draco:e})},DracoDecoderModule(e)});break;case "decode":var a=i.buffer,o=i.taskConfig;t.then(e=>{var t=e.draco,n=new t.Decoder,s=new t.DecoderBuffer;s.Init(new Int8Array(a),a.byteLength);try
{var l=function(e,t,n,i)
{var a,o,s=i.attributeIDs,l=i.attributeTypes,c=t.GetEncodedGeometryType(n);if(c===e.TRIANGULAR_MESH)a=new e.Mesh,o=t.DecodeBufferToMesh(n,a);else{if(c!==e.POINT_CLOUD)throw new Error("THREE.DRACOLoader: Unexpected geometry type.");a=new e.PointCloud,o=t.DecodeBufferToPointCloud(n,a)}
if(!o.ok()||0===a.ptr)throw new Error("THREE.DRACOLoader: Decoding failed: "+o.error_msg());var h={index:null,attributes:[]};for(var u in s)
{var d,p,m=self[l[u]];if(i.useUniqueIDs)p=s[u],d=t.GetAttributeByUniqueId(a,p);else{if(-1===(p=t.GetAttributeId(a,e[s[u]])))continue;d=t.GetAttribute(a,p)}
h.attributes.push(r(e,t,a,u,m,d))}
if(c===e.TRIANGULAR_MESH)
{for(var f=a.num_faces(),g=3*f,v=new Uint32Array(g),y=new e.DracoInt32Array,_=0;_<f;++_)
{t.GetFaceFromMesh(a,_,y);for(var b=0;b<3;++b)v[3*_+b]=y.GetValue(b)}
h.index={array:v,itemSize:1},e.destroy(y)}
return e.destroy(a),h}(t,n,s,o),c=l.attributes.map(e=>e.array.buffer);l.index&&c.push(l.index.array.buffer),self.postMessage({type:"decode",id:i.id,geometry:l},c)}
catch(e)
{console.error(e),self.postMessage({type:"error",id:i.id,error:e.message})}
finally
{t.destroy(s),t.destroy(n)}})}}},DRACOLoader.taskCache=new WeakMap,DRACOLoader.setDecoderPath=function()
{console.warn("THREE.DRACOLoader: The .setDecoderPath() method has been removed. Use instance methods.")},DRACOLoader.setDecoderConfig=function()
{console.warn("THREE.DRACOLoader: The .setDecoderConfig() method has been removed. Use instance methods.")},DRACOLoader.releaseDecoderModule=function()
{console.warn("THREE.DRACOLoader: The .releaseDecoderModule() method has been removed. Use instance methods.")},DRACOLoader.getDecoderModule=function()
{console.warn("THREE.DRACOLoader: The .getDecoderModule() method has been removed. Use instance methods.")};var _a$1,_b,GLTFLoader=function()
{function e(e)
{Loader.call(this,e),this.dracoLoader=null,this.ddsLoader=null}
function t()
{var e={};return{get:function(t)
{return e[t]},add:function(t,r)
{e[t]=r},remove:function(t)
{delete e[t]},removeAll:function()
{e={}}}}
e.prototype=Object.assign(Object.create(Loader.prototype),{constructor:e,load:function(e,t,r,n)
{var i,a=this;i=""!==this.resourcePath?this.resourcePath:""!==this.path?this.path:LoaderUtils.extractUrlBase(e),a.manager.itemStart(e);var o=function(t)
{n?n(t):console.error(t),a.manager.itemError(e),a.manager.itemEnd(e)},s=new FileLoader(a.manager);s.setPath(this.path),s.setResponseType("arraybuffer"),"use-credentials"===a.crossOrigin&&s.setWithCredentials(!0),s.load(e,function(r)
{try
{a.parse(r,i,function(r)
{t(r),a.manager.itemEnd(e)},o)}
catch(e)
{o(e)}},r,o)},setDRACOLoader:function(e)
{return this.dracoLoader=e,this},setDDSLoader:function(e)
{return this.ddsLoader=e,this},parse:function(e,t,s,l)
{var d,f={};if("string"==typeof e)d=e;else if(LoaderUtils.decodeText(new Uint8Array(e,0,4))===o)
{try
{f[r.KHR_BINARY_GLTF]=new c(e)}
catch(e)
{return void(l&&l(e))}
d=f[r.KHR_BINARY_GLTF].content}
else d=LoaderUtils.decodeText(new Uint8Array(e));var g=JSON.parse(d);if(void 0===g.asset||g.asset.version[0]<2)l&&l(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));else{if(g.extensionsUsed)
for(var v=0;v<g.extensionsUsed.length;++v)
{var y=g.extensionsUsed[v],_=g.extensionsRequired||[];switch(y)
{case r.KHR_LIGHTS_PUNCTUAL:f[y]=new i(g);break;case r.KHR_MATERIALS_UNLIT:f[y]=new a;break;case r.KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS:f[y]=new p;break;case r.KHR_DRACO_MESH_COMPRESSION:f[y]=new h(g,this.dracoLoader);break;case r.MSFT_TEXTURE_DDS:f[y]=new n(this.ddsLoader);break;case r.KHR_TEXTURE_TRANSFORM:f[y]=new u;break;case r.KHR_MESH_QUANTIZATION:f[y]=new m;break;default:_.indexOf(y)>=0&&console.warn('THREE.GLTFLoader: Unknown extension "'+y+'".')}}
new F(g,f,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,manager:this.manager}).parse(s,l)}}});var r={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS:"KHR_materials_pbrSpecularGlossiness",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",MSFT_TEXTURE_DDS:"MSFT_texture_dds"};function n(e)
{if(!e)throw new Error("THREE.GLTFLoader: Attempting to load .dds texture without importing DDSLoader");this.name=r.MSFT_TEXTURE_DDS,this.ddsLoader=e}
function i(e)
{this.name=r.KHR_LIGHTS_PUNCTUAL;var t=e.extensions&&e.extensions[r.KHR_LIGHTS_PUNCTUAL]||{};this.lightDefs=t.lights||[]}
function a()
{this.name=r.KHR_MATERIALS_UNLIT}
i.prototype.loadLight=function(e)
{var t,r=this.lightDefs[e],n=new Color(16777215);void 0!==r.color&&n.fromArray(r.color);var i=void 0!==r.range?r.range:0;switch(r.type)
{case "directional":(t=new DirectionalLight(n)).target.position.set(0,0,-1),t.add(t.target);break;case "point":(t=new PointLight(n)).distance=i;break;case "spot":(t=new SpotLight(n)).distance=i,r.spot=r.spot||{},r.spot.innerConeAngle=void 0!==r.spot.innerConeAngle?r.spot.innerConeAngle:0,r.spot.outerConeAngle=void 0!==r.spot.outerConeAngle?r.spot.outerConeAngle:Math.PI/4,t.angle=r.spot.outerConeAngle,t.penumbra=1-r.spot.innerConeAngle/r.spot.outerConeAngle,t.target.position.set(0,0,-1),t.add(t.target);break;default:throw new Error('THREE.GLTFLoader: Unexpected light type, "'+r.type+'".')}
return t.position.set(0,0,0),t.decay=2,void 0!==r.intensity&&(t.intensity=r.intensity),t.name=r.name||"light_"+e,Promise.resolve(t)},a.prototype.getMaterialType=function()
{return MeshBasicMaterial},a.prototype.extendParams=function(e,t,r)
{var n=[];e.color=new Color(1,1,1),e.opacity=1;var i=t.pbrMetallicRoughness;if(i)
{if(Array.isArray(i.baseColorFactor))
{var a=i.baseColorFactor;e.color.fromArray(a),e.opacity=a[3]}
void 0!==i.baseColorTexture&&n.push(r.assignTexture(e,"map",i.baseColorTexture))}
return Promise.all(n)};var o="glTF",s=12,l={JSON:1313821514,BIN:5130562};function c(e)
{this.name=r.KHR_BINARY_GLTF,this.content=null,this.body=null;var t=new DataView(e,0,s);if(this.header={magic:LoaderUtils.decodeText(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==o)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");for(var n=new DataView(e,s),i=0;i<n.byteLength;)
{var a=n.getUint32(i,!0);i+=4;var c=n.getUint32(i,!0);if(i+=4,c===l.JSON)
{var h=new Uint8Array(e,s+i,a);this.content=LoaderUtils.decodeText(h)}
else if(c===l.BIN)
{var u=s+i;this.body=e.slice(u,u+a)}
i+=a}
if(null===this.content)throw new Error("THREE.GLTFLoader: JSON content not found.")}
function h(e,t)
{if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=r.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}
function u()
{this.name=r.KHR_TEXTURE_TRANSFORM}
function d(e)
{MeshStandardMaterial.call(this),this.isGLTFSpecularGlossinessMaterial=!0;var t=["#ifdef USE_SPECULARMAP","\tuniform sampler2D specularMap;","#endif"].join("\n"),r=["#ifdef USE_GLOSSINESSMAP","\tuniform sampler2D glossinessMap;","#endif"].join("\n"),n=["vec3 specularFactor = specular;","#ifdef USE_SPECULARMAP","\tvec4 texelSpecular = texture2D( specularMap, vUv );","\ttexelSpecular = sRGBToLinear( texelSpecular );","\t// reads channel RGB, compatible with a glTF Specular-Glossiness (RGBA) texture","\tspecularFactor *= texelSpecular.rgb;","#endif"].join("\n"),i=["float glossinessFactor = glossiness;","#ifdef USE_GLOSSINESSMAP","\tvec4 texelGlossiness = texture2D( glossinessMap, vUv );","\t// reads channel A, compatible with a glTF Specular-Glossiness (RGBA) texture","\tglossinessFactor *= texelGlossiness.a;","#endif"].join("\n"),a=["PhysicalMaterial material;","material.diffuseColor = diffuseColor.rgb;","vec3 dxy = max( abs( dFdx( geometryNormal ) ), abs( dFdy( geometryNormal ) ) );","float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );","material.specularRoughness = max( 1.0 - glossinessFactor, 0.0525 );// 0.0525 corresponds to the base mip of a 256 cubemap.","material.specularRoughness += geometryRoughness;","material.specularRoughness = min( material.specularRoughness, 1.0 );","material.specularColor = specularFactor.rgb;"].join("\n"),o={specular:{value:(new Color).setHex(16777215)},glossiness:{value:1},specularMap:{value:null},glossinessMap:{value:null}};this._extraUniforms=o,this.onBeforeCompile=function(e)
{for(var s in o)e.uniforms[s]=o[s];e.fragmentShader=e.fragmentShader.replace("uniform float roughness;","uniform vec3 specular;"),e.fragmentShader=e.fragmentShader.replace("uniform float metalness;","uniform float glossiness;"),e.fragmentShader=e.fragmentShader.replace("#include <roughnessmap_pars_fragment>",t),e.fragmentShader=e.fragmentShader.replace("#include <metalnessmap_pars_fragment>",r),e.fragmentShader=e.fragmentShader.replace("#include <roughnessmap_fragment>",n),e.fragmentShader=e.fragmentShader.replace("#include <metalnessmap_fragment>",i),e.fragmentShader=e.fragmentShader.replace("#include <lights_physical_fragment>",a)},Object.defineProperties(this,{specular:{get:function()
{return o.specular.value},set:function(e)
{o.specular.value=e}},specularMap:{get:function()
{return o.specularMap.value},set:function(e)
{o.specularMap.value=e}},glossiness:{get:function()
{return o.glossiness.value},set:function(e)
{o.glossiness.value=e}},glossinessMap:{get:function()
{return o.glossinessMap.value},set:function(e)
{o.glossinessMap.value=e,e?(this.defines.USE_GLOSSINESSMAP="",this.defines.USE_ROUGHNESSMAP=""):(delete this.defines.USE_ROUGHNESSMAP,delete this.defines.USE_GLOSSINESSMAP)}}}),delete this.metalness,delete this.roughness,delete this.metalnessMap,delete this.roughnessMap,this.setValues(e)}
function p()
{return{name:r.KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS,specularGlossinessParams:["color","map","lightMap","lightMapIntensity","aoMap","aoMapIntensity","emissive","emissiveIntensity","emissiveMap","bumpMap","bumpScale","normalMap","normalMapType","displacementMap","displacementScale","displacementBias","specularMap","specular","glossinessMap","glossiness","alphaMap","envMap","envMapIntensity","refractionRatio"],getMaterialType:function()
{return d},extendParams:function(e,t,r)
{var n=t.extensions[this.name];e.color=new Color(1,1,1),e.opacity=1;var i=[];if(Array.isArray(n.diffuseFactor))
{var a=n.diffuseFactor;e.color.fromArray(a),e.opacity=a[3]}
if(void 0!==n.diffuseTexture&&i.push(r.assignTexture(e,"map",n.diffuseTexture)),e.emissive=new Color(0,0,0),e.glossiness=void 0!==n.glossinessFactor?n.glossinessFactor:1,e.specular=new Color(1,1,1),Array.isArray(n.specularFactor)&&e.specular.fromArray(n.specularFactor),void 0!==n.specularGlossinessTexture)
{var o=n.specularGlossinessTexture;i.push(r.assignTexture(e,"glossinessMap",o)),i.push(r.assignTexture(e,"specularMap",o))}
return Promise.all(i)},createMaterial:function(e)
{var t=new d(e);return t.fog=!0,t.color=e.color,t.map=void 0===e.map?null:e.map,t.lightMap=null,t.lightMapIntensity=1,t.aoMap=void 0===e.aoMap?null:e.aoMap,t.aoMapIntensity=1,t.emissive=e.emissive,t.emissiveIntensity=1,t.emissiveMap=void 0===e.emissiveMap?null:e.emissiveMap,t.bumpMap=void 0===e.bumpMap?null:e.bumpMap,t.bumpScale=1,t.normalMap=void 0===e.normalMap?null:e.normalMap,t.normalMapType=TangentSpaceNormalMap,e.normalScale&&(t.normalScale=e.normalScale),t.displacementMap=null,t.displacementScale=1,t.displacementBias=0,t.specularMap=void 0===e.specularMap?null:e.specularMap,t.specular=e.specular,t.glossinessMap=void 0===e.glossinessMap?null:e.glossinessMap,t.glossiness=e.glossiness,t.alphaMap=null,t.envMap=void 0===e.envMap?null:e.envMap,t.envMapIntensity=1,t.refractionRatio=.98,t}}}
function m()
{this.name=r.KHR_MESH_QUANTIZATION}
function f(e,t,r,n)
{Interpolant.call(this,e,t,r,n)}
h.prototype.decodePrimitive=function(e,t)
{var r=this.json,n=this.dracoLoader,i=e.extensions[this.name].bufferView,a=e.extensions[this.name].attributes,o={},s={},l={};for(var c in a)
{var h=A[c]||c.toLowerCase();o[h]=a[c]}
for(c in e.attributes)
{h=A[c]||c.toLowerCase();if(void 0!==a[c])
{var u=r.accessors[e.attributes[c]],d=w[u.componentType];l[h]=d,s[h]=!0===u.normalized}}
return t.getDependency("bufferView",i).then(function(e)
{return new Promise(function(t)
{n.decodeDracoFile(e,function(e)
{for(var r in e.attributes)
{var n=e.attributes[r],i=s[r];void 0!==i&&(n.normalized=i)}
t(e)},o,l)})})},u.prototype.extendTexture=function(e,t)
{return e=e.clone(),void 0!==t.offset&&e.offset.fromArray(t.offset),void 0!==t.rotation&&(e.rotation=t.rotation),void 0!==t.scale&&e.repeat.fromArray(t.scale),void 0!==t.texCoord&&console.warn('THREE.GLTFLoader: Custom UV sets in "'+this.name+'" extension not yet supported.'),e.needsUpdate=!0,e},d.prototype=Object.create(MeshStandardMaterial.prototype),d.prototype.constructor=d,d.prototype.copy=function(e)
{return MeshStandardMaterial.prototype.copy.call(this,e),this.specularMap=e.specularMap,this.specular.copy(e.specular),this.glossinessMap=e.glossinessMap,this.glossiness=e.glossiness,delete this.metalness,delete this.roughness,delete this.metalnessMap,delete this.roughnessMap,this},f.prototype=Object.create(Interpolant.prototype),f.prototype.constructor=f,f.prototype.copySampleValue_=function(e)
{for(var t=this.resultBuffer,r=this.sampleValues,n=this.valueSize,i=e*n*3+n,a=0;a!==n;a++)t[a]=r[i+a];return t},f.prototype.beforeStart_=f.prototype.copySampleValue_,f.prototype.afterEnd_=f.prototype.copySampleValue_,f.prototype.interpolate_=function(e,t,r,n)
{for(var i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=2*o,l=3*o,c=n-t,h=(r-t)/c,u=h*h,d=u*h,p=e*l,m=p-l,f=-2*d+3*u,g=d-u,v=1-f,y=g-u+h,_=0;_!==o;_++)
{var b=a[m+_+o],x=a[m+_+s]*c,M=a[p+_+o],w=a[p+_]*c;i[_]=v*b+y*x+f*M+g*w}
return i};var g=0,v=1,y=2,_=3,b=4,x=5,M=6,w={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},S={9728:NearestFilter,9729:LinearFilter,9984:NearestMipmapNearestFilter,9985:LinearMipmapNearestFilter,9986:NearestMipmapLinearFilter,9987:LinearMipmapLinearFilter},T={33071:ClampToEdgeWrapping,33648:MirroredRepeatWrapping,10497:RepeatWrapping},E={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},A={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv2",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},L={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},C={CUBICSPLINE:void 0,LINEAR:InterpolateLinear,STEP:InterpolateDiscrete},R="OPAQUE",P="MASK",I="BLEND",O={"image/png":RGBAFormat,"image/jpeg":RGBFormat};function D(e,t)
{return"string"!=typeof e||""===e?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)?e:/^data:.*,.*$/i.test(e)?e:/^blob:.*$/i.test(e)?e:t+e)}
function B(e,t,r)
{for(var n in r.extensions)void 0===e[n]&&(t.userData.gltfExtensions=t.userData.gltfExtensions||{},t.userData.gltfExtensions[n]=r.extensions[n])}
function $(e,t)
{void 0!==t.extras&&("object"==typeof t.extras?Object.assign(e.userData,t.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+t.extras))}
function N(e,t)
{if(e.updateMorphTargets(),void 0!==t.weights)
for(var r=0,n=t.weights.length;r<n;r++)e.morphTargetInfluences[r]=t.weights[r];if(t.extras&&Array.isArray(t.extras.targetNames))
{var i=t.extras.targetNames;if(e.morphTargetInfluences.length===i.length)
{e.morphTargetDictionary={};for(r=0,n=i.length;r<n;r++)e.morphTargetDictionary[i[r]]=r}
else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}
function G(e)
{for(var t="",r=Object.keys(e).sort(),n=0,i=r.length;n<i;n++)t+=r[n]+":"+e[r[n]]+";";return t}
function F(e,r,n)
{this.json=e||{},this.extensions=r||{},this.options=n||{},this.cache=new t,this.primitiveCache={},this.textureLoader=new TextureLoader(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.fileLoader=new FileLoader(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),"use-credentials"===this.options.crossOrigin&&this.fileLoader.setWithCredentials(!0)}
function U(e,t,r)
{var n=t.attributes,i=[];function a(t,n)
{return r.getDependency("accessor",t).then(function(t)
{e.setAttribute(n,t)})}
for(var o in n)
{var s=A[o]||o.toLowerCase();s in e.attributes||i.push(a(n[o],s))}
if(void 0!==t.indices&&!e.index)
{var l=r.getDependency("accessor",t.indices).then(function(t)
{e.setIndex(t)});i.push(l)}
return $(e,t),function(e,t,r)
{var n=t.attributes,i=new Box3;if(void 0!==n.POSITION)
{var a=(u=r.json.accessors[n.POSITION]).min,o=u.max;if(void 0!==a&&void 0!==o)
{i.set(new Vector3(a[0],a[1],a[2]),new Vector3(o[0],o[1],o[2]));var s=t.targets;if(void 0!==s)
for(var l=new Vector3,c=0,h=s.length;c<h;c++)
{var u,d=s[c];if(void 0!==d.POSITION)a=(u=r.json.accessors[d.POSITION]).min,o=u.max,void 0!==a&&void 0!==o?(l.setX(Math.max(Math.abs(a[0]),Math.abs(o[0]))),l.setY(Math.max(Math.abs(a[1]),Math.abs(o[1]))),l.setZ(Math.max(Math.abs(a[2]),Math.abs(o[2]))),i.expandByVector(l)):console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}
e.boundingBox=i;var p=new Sphere;i.getCenter(p.center),p.radius=i.min.distanceTo(i.max)/2,e.boundingSphere=p}
else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}(e,t,r),Promise.all(i).then(function()
{return void 0!==t.targets?function(e,t,r)
{for(var n=!1,i=!1,a=0,o=t.length;a<o&&(void 0!==(c=t[a]).POSITION&&(n=!0),void 0!==c.NORMAL&&(i=!0),!n||!i);a++);if(!n&&!i)return Promise.resolve(e);var s=[],l=[];for(a=0,o=t.length;a<o;a++)
{var c=t[a];if(n)
{var h=void 0!==c.POSITION?r.getDependency("accessor",c.POSITION):e.attributes.position;s.push(h)}
i&&(h=void 0!==c.NORMAL?r.getDependency("accessor",c.NORMAL):e.attributes.normal,l.push(h))}
return Promise.all([Promise.all(s),Promise.all(l)]).then(function(t)
{var r=t[0],a=t[1];return n&&(e.morphAttributes.position=r),i&&(e.morphAttributes.normal=a),e.morphTargetsRelative=!0,e})}(e,t.targets,r):e})}
function V(e,t)
{var r=e.getIndex();if(null===r)
{var n=[],i=e.getAttribute("position");if(void 0===i)return console.error("THREE.GLTFLoader.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),e;for(var a=0;a<i.count;a++)n.push(a);e.setIndex(n),r=e.getIndex()}
var o=r.count-2,s=[];if(t===TriangleFanDrawMode)
for(a=1;a<=o;a++)s.push(r.getX(0)),s.push(r.getX(a)),s.push(r.getX(a+1));else for(a=0;a<o;a++)a%2==0?(s.push(r.getX(a)),s.push(r.getX(a+1)),s.push(r.getX(a+2))):(s.push(r.getX(a+2)),s.push(r.getX(a+1)),s.push(r.getX(a)));s.length/3!==o&&console.error("THREE.GLTFLoader.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");var l=e.clone();return l.setIndex(s),l}
return F.prototype.parse=function(e,t)
{var r=this,n=this.json,i=this.extensions;this.cache.removeAll(),this.markDefs(),Promise.all([this.getDependencies("scene"),this.getDependencies("animation"),this.getDependencies("camera")]).then(function(t)
{var a={scene:t[0][n.scene||0],scenes:t[0],animations:t[1],cameras:t[2],asset:n.asset,parser:r,userData:{}};B(i,a,n),$(a,n),e(a)}).catch(t)},F.prototype.markDefs=function()
{for(var e=this.json.nodes||[],t=this.json.skins||[],r=this.json.meshes||[],n={},i={},a=0,o=t.length;a<o;a++)
for(var s=t[a].joints,l=0,c=s.length;l<c;l++)e[s[l]].isBone=!0;for(var h=0,u=e.length;h<u;h++)
{var d=e[h];void 0!==d.mesh&&(void 0===n[d.mesh]&&(n[d.mesh]=i[d.mesh]=0),n[d.mesh]++,void 0!==d.skin&&(r[d.mesh].isSkinnedMesh=!0))}
this.json.meshReferences=n,this.json.meshUses=i},F.prototype.getDependency=function(e,t)
{var n=e+":"+t,i=this.cache.get(n);if(!i)
{switch(e)
{case "scene":i=this.loadScene(t);break;case "node":i=this.loadNode(t);break;case "mesh":i=this.loadMesh(t);break;case "accessor":i=this.loadAccessor(t);break;case "bufferView":i=this.loadBufferView(t);break;case "buffer":i=this.loadBuffer(t);break;case "material":i=this.loadMaterial(t);break;case "texture":i=this.loadTexture(t);break;case "skin":i=this.loadSkin(t);break;case "animation":i=this.loadAnimation(t);break;case "camera":i=this.loadCamera(t);break;case "light":i=this.extensions[r.KHR_LIGHTS_PUNCTUAL].loadLight(t);break;default:throw new Error("Unknown type: "+e)}
this.cache.add(n,i)}
return i},F.prototype.getDependencies=function(e)
{var t=this.cache.get(e);if(!t)
{var r=this,n=this.json[e+("mesh"===e?"es":"s")]||[];t=Promise.all(n.map(function(t,n)
{return r.getDependency(e,n)})),this.cache.add(e,t)}
return t},F.prototype.loadBuffer=function(e)
{var t=this.json.buffers[e],n=this.fileLoader;if(t.type&&"arraybuffer"!==t.type)throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(void 0===t.uri&&0===e)return Promise.resolve(this.extensions[r.KHR_BINARY_GLTF].body);var i=this.options;return new Promise(function(e,r)
{n.load(D(t.uri,i.path),e,void 0,function()
{r(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})},F.prototype.loadBufferView=function(e)
{var t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(e)
{var r=t.byteLength||0,n=t.byteOffset||0;return e.slice(n,n+r)})},F.prototype.loadAccessor=function(e)
{var t=this,r=this.json,n=this.json.accessors[e];if(void 0===n.bufferView&&void 0===n.sparse)return Promise.resolve(null);var i=[];return void 0!==n.bufferView?i.push(this.getDependency("bufferView",n.bufferView)):i.push(null),void 0!==n.sparse&&(i.push(this.getDependency("bufferView",n.sparse.indices.bufferView)),i.push(this.getDependency("bufferView",n.sparse.values.bufferView))),Promise.all(i).then(function(e)
{var i,a=e[0],o=E[n.type],s=w[n.componentType],l=s.BYTES_PER_ELEMENT,c=l*o,h=n.byteOffset||0,u=void 0!==n.bufferView?r.bufferViews[n.bufferView].byteStride:void 0,d=!0===n.normalized;if(u&&u!==c)
{var p=Math.floor(h/u),m="InterleavedBuffer:"+n.bufferView+":"+n.componentType+":"+p+":"+n.count,f=t.cache.get(m);f||(f=new InterleavedBuffer(new s(a,p*u,n.count*u/l),u/l),t.cache.add(m,f)),i=new InterleavedBufferAttribute(f,o,h%u/l,d)}
else i=new BufferAttribute(null===a?new s(n.count*o):new s(a,h,n.count*o),o,d);if(void 0!==n.sparse)
{var g=E.SCALAR,v=w[n.sparse.indices.componentType],y=n.sparse.indices.byteOffset||0,_=n.sparse.values.byteOffset||0,b=new v(e[1],y,n.sparse.count*g),x=new s(e[2],_,n.sparse.count*o);null!==a&&(i=new BufferAttribute(i.array.slice(),i.itemSize,i.normalized));for(var M=0,S=b.length;M<S;M++)
{var T=b[M];if(i.setX(T,x[M*o]),o>=2&&i.setY(T,x[M*o+1]),o>=3&&i.setZ(T,x[M*o+2]),o>=4&&i.setW(T,x[M*o+3]),o>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}}
return i})},F.prototype.loadTexture=function(e)
{var t,n=this,i=this.json,a=this.options,o=this.textureLoader,s=window.URL||window.webkitURL,l=i.textures[e],c=l.extensions||{},h=(t=c[r.MSFT_TEXTURE_DDS]?i.images[c[r.MSFT_TEXTURE_DDS].source]:i.images[l.source]).uri,u=!1;return void 0!==t.bufferView&&(h=n.getDependency("bufferView",t.bufferView).then(function(e)
{u=!0;var r=new Blob([e],{type:t.mimeType});return h=s.createObjectURL(r)})),Promise.resolve(h).then(function(e)
{var t=a.manager.getHandler(e);return t||(t=c[r.MSFT_TEXTURE_DDS]?n.extensions[r.MSFT_TEXTURE_DDS].ddsLoader:o),new Promise(function(r,n)
{t.load(D(e,a.path),r,void 0,n)})}).then(function(e)
{!0===u&&s.revokeObjectURL(h),e.flipY=!1,void 0!==l.name&&(e.name=l.name),t.mimeType in O&&(e.format=O[t.mimeType]);var r=(i.samplers||{})[l.sampler]||{};return e.magFilter=S[r.magFilter]||LinearFilter,e.minFilter=S[r.minFilter]||LinearMipmapLinearFilter,e.wrapS=T[r.wrapS]||RepeatWrapping,e.wrapT=T[r.wrapT]||RepeatWrapping,e})},F.prototype.assignTexture=function(e,t,n)
{var i=this;return this.getDependency("texture",n.index).then(function(a)
{if(!a.isCompressedTexture)switch(t)
{case "aoMap":case "emissiveMap":case "metalnessMap":case "normalMap":case "roughnessMap":a.format=RGBFormat}
if(void 0===n.texCoord||0==n.texCoord||"aoMap"===t&&1==n.texCoord||console.warn("THREE.GLTFLoader: Custom UV set "+n.texCoord+" for texture "+t+" not yet supported."),i.extensions[r.KHR_TEXTURE_TRANSFORM])
{var o=void 0!==n.extensions?n.extensions[r.KHR_TEXTURE_TRANSFORM]:void 0;o&&(a=i.extensions[r.KHR_TEXTURE_TRANSFORM].extendTexture(a,o))}
e[t]=a})},F.prototype.assignFinalMaterial=function(e)
{var t=e.geometry,r=e.material,n=(this.extensions,void 0!==t.attributes.tangent),i=void 0!==t.attributes.color,a=void 0===t.attributes.normal,o=!0===e.isSkinnedMesh,s=Object.keys(t.morphAttributes).length>0,l=s&&void 0!==t.morphAttributes.normal;if(e.isPoints)
{var c="PointsMaterial:"+r.uuid,h=this.cache.get(c);h||(h=new PointsMaterial,Material.prototype.copy.call(h,r),h.color.copy(r.color),h.map=r.map,h.sizeAttenuation=!1,this.cache.add(c,h)),r=h}
else if(e.isLine)
{c="LineBasicMaterial:"+r.uuid;var u=this.cache.get(c);u||(u=new LineBasicMaterial,Material.prototype.copy.call(u,r),u.color.copy(r.color),this.cache.add(c,u)),r=u}
if(n||i||a||o||s)
{c="ClonedMaterial:"+r.uuid+":";r.isGLTFSpecularGlossinessMaterial&&(c+="specular-glossiness:"),o&&(c+="skinning:"),n&&(c+="vertex-tangents:"),i&&(c+="vertex-colors:"),a&&(c+="flat-shading:"),s&&(c+="morph-targets:"),l&&(c+="morph-normals:");var d=this.cache.get(c);d||(d=r.clone(),o&&(d.skinning=!0),n&&(d.vertexTangents=!0),i&&(d.vertexColors=VertexColors),a&&(d.flatShading=!0),s&&(d.morphTargets=!0),l&&(d.morphNormals=!0),this.cache.add(c,d)),r=d}
r.aoMap&&void 0===t.attributes.uv2&&void 0!==t.attributes.uv&&t.setAttribute("uv2",new BufferAttribute(t.attributes.uv.array,2)),r.normalScale&&!n&&(r.normalScale.y=-r.normalScale.y),e.material=r},F.prototype.loadMaterial=function(e)
{var t,n=this.json,i=this.extensions,a=n.materials[e],o={},s=a.extensions||{},l=[];if(s[r.KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS])
{var c=i[r.KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS];t=c.getMaterialType(),l.push(c.extendParams(o,a,this))}
else if(s[r.KHR_MATERIALS_UNLIT])
{var h=i[r.KHR_MATERIALS_UNLIT];t=h.getMaterialType(),l.push(h.extendParams(o,a,this))}
else{t=MeshStandardMaterial;var u=a.pbrMetallicRoughness||{};if(o.color=new Color(1,1,1),o.opacity=1,Array.isArray(u.baseColorFactor))
{var p=u.baseColorFactor;o.color.fromArray(p),o.opacity=p[3]}
void 0!==u.baseColorTexture&&l.push(this.assignTexture(o,"map",u.baseColorTexture)),o.metalness=void 0!==u.metallicFactor?u.metallicFactor:1,o.roughness=void 0!==u.roughnessFactor?u.roughnessFactor:1,void 0!==u.metallicRoughnessTexture&&(l.push(this.assignTexture(o,"metalnessMap",u.metallicRoughnessTexture)),l.push(this.assignTexture(o,"roughnessMap",u.metallicRoughnessTexture)))}!0===a.doubleSided&&(o.side=DoubleSide);var m=a.alphaMode||R;return m===I?o.transparent=!0:(o.transparent=!1,m===P&&(o.alphaTest=void 0!==a.alphaCutoff?a.alphaCutoff:.5)),void 0!==a.normalTexture&&t!==MeshBasicMaterial&&(l.push(this.assignTexture(o,"normalMap",a.normalTexture)),o.normalScale=new Vector2(1,1),void 0!==a.normalTexture.scale&&o.normalScale.set(a.normalTexture.scale,a.normalTexture.scale)),void 0!==a.occlusionTexture&&t!==MeshBasicMaterial&&(l.push(this.assignTexture(o,"aoMap",a.occlusionTexture)),void 0!==a.occlusionTexture.strength&&(o.aoMapIntensity=a.occlusionTexture.strength)),void 0!==a.emissiveFactor&&t!==MeshBasicMaterial&&(o.emissive=(new Color).fromArray(a.emissiveFactor)),void 0!==a.emissiveTexture&&t!==MeshBasicMaterial&&l.push(this.assignTexture(o,"emissiveMap",a.emissiveTexture)),Promise.all(l).then(function()
{var e;return e=t===d?i[r.KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS].createMaterial(o):new t(o),void 0!==a.name&&(e.name=a.name),e.map&&(e.map.encoding=sRGBEncoding),e.emissiveMap&&(e.emissiveMap.encoding=sRGBEncoding),$(e,a),a.extensions&&B(i,e,a),e})},F.prototype.loadGeometries=function(e)
{var t=this,n=this.extensions,i=this.primitiveCache;function a(e)
{return n[r.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(e,t).then(function(r)
{return U(r,e,t)})}
for(var o,s,l=[],c=0,h=e.length;c<h;c++)
{var u,d=e[c],p=(s=void 0,(s=(o=d).extensions&&o.extensions[r.KHR_DRACO_MESH_COMPRESSION])?"draco:"+s.bufferView+":"+s.indices+":"+G(s.attributes):o.indices+":"+G(o.attributes)+":"+o.mode),m=i[p];if(m)l.push(m.promise);else u=d.extensions&&d.extensions[r.KHR_DRACO_MESH_COMPRESSION]?a(d):U(new BufferGeometry,d,t),i[p]={primitive:d,promise:u},l.push(u)}
return Promise.all(l)},F.prototype.loadMesh=function(e)
{for(var t,r=this,n=this.json.meshes[e],i=n.primitives,a=[],o=0,s=i.length;o<s;o++)
{var l=void 0===i[o].material?(void 0===(t=this.cache).DefaultMaterial&&(t.DefaultMaterial=new MeshStandardMaterial({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:FrontSide})),t.DefaultMaterial):this.getDependency("material",i[o].material);a.push(l)}
return a.push(r.loadGeometries(i)),Promise.all(a).then(function(t)
{for(var a=t.slice(0,t.length-1),o=t[t.length-1],s=[],l=0,c=o.length;l<c;l++)
{var h,u=o[l],d=i[l],p=a[l];if(d.mode===b||d.mode===x||d.mode===M||void 0===d.mode)!0!==(h=!0===n.isSkinnedMesh?new SkinnedMesh(u,p):new Mesh(u,p)).isSkinnedMesh||h.geometry.attributes.skinWeight.normalized||h.normalizeSkinWeights(),d.mode===x?h.geometry=V(h.geometry,TriangleStripDrawMode):d.mode===M&&(h.geometry=V(h.geometry,TriangleFanDrawMode));else if(d.mode===v)h=new LineSegments(u,p);else if(d.mode===_)h=new Line(u,p);else if(d.mode===y)h=new LineLoop(u,p);else{if(d.mode!==g)throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+d.mode);h=new Points(u,p)}
Object.keys(h.geometry.morphAttributes).length>0&&N(h,n),h.name=n.name||"mesh_"+e,o.length>1&&(h.name+="_"+l),$(h,n),r.assignFinalMaterial(h),s.push(h)}
if(1===s.length)return s[0];var m=new Group;for(l=0,c=s.length;l<c;l++)m.add(s[l]);return m})},F.prototype.loadCamera=function(e)
{var t,r=this.json.cameras[e],n=r[r.type];if(n)return"perspective"===r.type?t=new PerspectiveCamera(MathUtils.radToDeg(n.yfov),n.aspectRatio||1,n.znear||1,n.zfar||2e6):"orthographic"===r.type&&(t=new OrthographicCamera(n.xmag/-2,n.xmag/2,n.ymag/2,n.ymag/-2,n.znear,n.zfar)),void 0!==r.name&&(t.name=r.name),$(t,r),Promise.resolve(t);console.warn("THREE.GLTFLoader: Missing camera parameters.")},F.prototype.loadSkin=function(e)
{var t=this.json.skins[e],r={joints:t.joints};return void 0===t.inverseBindMatrices?Promise.resolve(r):this.getDependency("accessor",t.inverseBindMatrices).then(function(e)
{return r.inverseBindMatrices=e,r})},F.prototype.loadAnimation=function(e)
{for(var t=this.json.animations[e],r=[],n=[],i=[],a=[],o=[],s=0,l=t.channels.length;s<l;s++)
{var c=t.channels[s],h=t.samplers[c.sampler],u=c.target,d=void 0!==u.node?u.node:u.id,p=void 0!==t.parameters?t.parameters[h.input]:h.input,m=void 0!==t.parameters?t.parameters[h.output]:h.output;r.push(this.getDependency("node",d)),n.push(this.getDependency("accessor",p)),i.push(this.getDependency("accessor",m)),a.push(h),o.push(u)}
return Promise.all([Promise.all(r),Promise.all(n),Promise.all(i),Promise.all(a),Promise.all(o)]).then(function(r)
{for(var n=r[0],i=r[1],a=r[2],o=r[3],s=r[4],l=[],c=0,h=n.length;c<h;c++)
{var u=n[c],d=i[c],p=a[c],m=o[c],g=s[c];if(void 0!==u)
{var v;switch(u.updateMatrix(),u.matrixAutoUpdate=!0,L[g.path])
{case L.weights:v=NumberKeyframeTrack;break;case L.rotation:v=QuaternionKeyframeTrack;break;case L.position:case L.scale:default:v=VectorKeyframeTrack}
var y=u.name?u.name:u.uuid,_=void 0!==m.interpolation?C[m.interpolation]:InterpolateLinear,b=[];L[g.path]===L.weights?u.traverse(function(e)
{!0===e.isMesh&&e.morphTargetInfluences&&b.push(e.name?e.name:e.uuid)}):b.push(y);var x=p.array;if(p.normalized)
{var M;if(x.constructor===Int8Array)M=1/127;else if(x.constructor===Uint8Array)M=1/255;else if(x.constructor==Int16Array)M=1/32767;else{if(x.constructor!==Uint16Array)throw new Error("THREE.GLTFLoader: Unsupported output accessor component type.");M=1/65535}
for(var w=new Float32Array(x.length),S=0,T=x.length;S<T;S++)w[S]=x[S]*M;x=w}
for(S=0,T=b.length;S<T;S++)
{var E=new v(b[S]+"."+L[g.path],d.array,x,_);"CUBICSPLINE"===m.interpolation&&(E.createInterpolant=function(e)
{return new f(this.times,this.values,this.getValueSize()/3,e)},E.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0),l.push(E)}}}
return new AnimationClip(void 0!==t.name?t.name:"animation_"+e,void 0,l)})},F.prototype.loadNode=function(e)
{var t,n=this.json,i=this.extensions,a=this,o=n.meshReferences,s=n.meshUses,l=n.nodes[e];return(t=[],void 0!==l.mesh&&t.push(a.getDependency("mesh",l.mesh).then(function(e)
{var t;if(o[l.mesh]>1)
{var r=s[l.mesh]++;(t=e.clone()).name+="_instance_"+r}
else t=e;return void 0!==l.weights&&t.traverse(function(e)
{if(e.isMesh)
for(var t=0,r=l.weights.length;t<r;t++)e.morphTargetInfluences[t]=l.weights[t]}),t})),void 0!==l.camera&&t.push(a.getDependency("camera",l.camera)),l.extensions&&l.extensions[r.KHR_LIGHTS_PUNCTUAL]&&void 0!==l.extensions[r.KHR_LIGHTS_PUNCTUAL].light&&t.push(a.getDependency("light",l.extensions[r.KHR_LIGHTS_PUNCTUAL].light)),Promise.all(t)).then(function(e)
{var t;if((t=!0===l.isBone?new Bone:e.length>1?new Group:1===e.length?e[0]:new Object3D)!==e[0])
for(var r=0,n=e.length;r<n;r++)t.add(e[r]);if(void 0!==l.name&&(t.userData.name=l.name,t.name=PropertyBinding.sanitizeNodeName(l.name)),$(t,l),l.extensions&&B(i,t,l),void 0!==l.matrix)
{var a=new Matrix4;a.fromArray(l.matrix),t.applyMatrix4(a)}
else void 0!==l.translation&&t.position.fromArray(l.translation),void 0!==l.rotation&&t.quaternion.fromArray(l.rotation),void 0!==l.scale&&t.scale.fromArray(l.scale);return t})},F.prototype.loadScene=function()
{function e(t,r,n,i)
{var a=n.nodes[t];return i.getDependency("node",t).then(function(e)
{return void 0===a.skin?e:i.getDependency("skin",a.skin).then(function(e)
{for(var r=[],n=0,a=(t=e).joints.length;n<a;n++)r.push(i.getDependency("node",t.joints[n]));return Promise.all(r)}).then(function(r)
{return e.traverse(function(e)
{if(e.isMesh)
{for(var n=[],i=[],a=0,o=r.length;a<o;a++)
{var s=r[a];if(s)
{n.push(s);var l=new Matrix4;void 0!==t.inverseBindMatrices&&l.fromArray(t.inverseBindMatrices.array,16*a),i.push(l)}
else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[a])}
e.bind(new Skeleton(n,i),e.matrixWorld)}}),e});var t}).then(function(t)
{r.add(t);var o=[];if(a.children)
for(var s=a.children,l=0,c=s.length;l<c;l++)
{var h=s[l];o.push(e(h,t,n,i))}
return Promise.all(o)})}
return function(t)
{var r=this.json,n=this.extensions,i=this.json.scenes[t],a=new Scene;void 0!==i.name&&(a.name=i.name),$(a,i),i.extensions&&B(n,a,i);for(var o=i.nodes||[],s=[],l=0,c=o.length;l<c;l++)s.push(e(o[l],a,r,this));return Promise.all(s).then(function()
{return a})}}(),e}(),RoughnessMipmapper=function()
{var e,t=((e=new RawShaderMaterial({uniforms:{roughnessMap:{value:null},normalMap:{value:null},texelSize:{value:new Vector2(1,1)}},vertexShader:"\nprecision mediump float;\nprecision mediump int;\nattribute vec3 position;\nattribute vec2 uv;\nvarying vec2 vUv;\nvoid main() {\n    vUv = uv;\n    gl_Position = vec4( position, 1.0 );\n}\n              ",fragmentShader:"\nprecision mediump float;\nprecision mediump int;\nvarying vec2 vUv;\nuniform sampler2D roughnessMap;\nuniform sampler2D normalMap;\nuniform vec2 texelSize;\n\n#define ENVMAP_TYPE_CUBE_UV\nvec4 envMapTexelToLinear(vec4 a){return a;}\n#include <cube_uv_reflection_fragment>\n\nfloat roughnessToVariance(float roughness) {\n  float variance = 0.0;\n  if (roughness >= r1) {\n    variance = (r0 - roughness) * (v1 - v0) / (r0 - r1) + v0;\n  } else if (roughness >= r4) {\n    variance = (r1 - roughness) * (v4 - v1) / (r1 - r4) + v1;\n  } else if (roughness >= r5) {\n    variance = (r4 - roughness) * (v5 - v4) / (r4 - r5) + v4;\n  } else {\n    float roughness2 = roughness * roughness;\n    variance = 1.79 * roughness2 * roughness2;\n  }\n  return variance;\n}\nfloat varianceToRoughness(float variance) {\n  float roughness = 0.0;\n  if (variance >= v1) {\n    roughness = (v0 - variance) * (r1 - r0) / (v0 - v1) + r0;\n  } else if (variance >= v4) {\n    roughness = (v1 - variance) * (r4 - r1) / (v1 - v4) + r1;\n  } else if (variance >= v5) {\n    roughness = (v4 - variance) * (r5 - r4) / (v4 - v5) + r4;\n  } else {\n    roughness = pow(0.559 * variance, 0.25);// 0.559 = 1.0 / 1.79\n  }\n  return roughness;\n}\n\nvoid main() {\n    gl_FragColor = texture2D(roughnessMap, vUv, -1.0);\n    if (texelSize.x == 0.0) return;\n    float roughness = gl_FragColor.g;\n    float variance = roughnessToVariance(roughness);\n    vec3 avgNormal;\n    for (float x = -1.0; x < 2.0; x += 2.0) {\n    for (float y = -1.0; y < 2.0; y += 2.0) {\n        vec2 uv = vUv + vec2(x, y) * 0.25 * texelSize;\n        avgNormal += normalize(texture2D(normalMap, uv, -1.0).xyz - 0.5);\n    }\n    }\n    variance += 1.0 - 0.25 * length(avgNormal);\n    gl_FragColor.g = varianceToRoughness(variance);\n}\n              ",blending:NoBlending,depthTest:!1,depthWrite:!1})).type="RoughnessMipmapper",e),r=new Scene;r.add(new Mesh(new PlaneBufferGeometry(2,2),t));var n=new OrthographicCamera(0,1,0,1,0,1),i=null,a=null,o=function(e)
{(a=e).compile(r,n)};return o.prototype={constructor:o,generateMipmaps:function(e)
{var
{roughnessMap:o,normalMap:s}=e;if(null!=o&&null!=s&&o.generateMipmaps&&!e.userData.roughnessUpdated)
{e.userData.roughnessUpdated=!0;var l=Math.max(o.image.width,s.image.width),c=Math.max(o.image.height,s.image.height);if(MathUtils.isPowerOfTwo(l)&&MathUtils.isPowerOfTwo(c))
{var h=a.getRenderTarget(),u=a.autoClear;if(a.autoClear=!1,null!=i&&i.width===l&&i.height===c||(null!=i&&i.dispose(),(i=new WebGLRenderTarget(l,c,{depthBuffer:!1,stencilBuffer:!1})).scissorTest=!0),l!==o.image.width||c!==o.image.height)
{var d=new WebGLRenderTarget(l,c,{minFilter:LinearMipMapLinearFilter,depthBuffer:!1,stencilBuffer:!1});d.texture.generateMipmaps=!0,a.setRenderTarget(d),e.roughnessMap=d.texture,e.metalnessMap==o&&(e.metalnessMap=e.roughnessMap),e.aoMap==o&&(e.aoMap=e.roughnessMap)}
t.uniforms.roughnessMap.value=o,t.uniforms.normalMap.value=s;for(var p=new Vector2(0,0),m=t.uniforms.texelSize.value,f=0;l>=1&&c>=1;++f,l/=2,c/=2)m.set(1/l,1/c),0==f&&m.set(0,0),i.viewport.set(p.x,p.y,l,c),i.scissor.set(p.x,p.y,l,c),a.setRenderTarget(i),a.render(r,n),a.copyFramebufferToTexture(p,e.roughnessMap,f),t.uniforms.roughnessMap.value=e.roughnessMap;o!==e.roughnessMap&&o.dispose(),a.setRenderTarget(h),a.autoClear=u}}},dispose:function()
{t.dispose(),r.children[0].geometry.dispose(),null!=i&&i.dispose()}},o}();const $retainerCount=Symbol("retainerCount"),$recentlyUsed=Symbol("recentlyUsed"),$evict=Symbol("evict"),$evictionThreshold=Symbol("evictionThreshold"),$cache=Symbol("cache");class CacheEvictionPolicy
{constructor(e,t=5)
{this[_a$1]=new Map,this[_b]=[],this[$cache]=e,this[$evictionThreshold]=t}
set evictionThreshold(e)
{this[$evictionThreshold]=e,this[$evict]()}
get evictionThreshold()
{return this[$evictionThreshold]}
get cache()
{return this[$cache]}
retainerCount(e)
{return this[$retainerCount].get(e)||0}
reset()
{this[$retainerCount].clear(),this[$recentlyUsed]=[]}
retain(e)
{this[$retainerCount].has(e)||this[$retainerCount].set(e,0),this[$retainerCount].set(e,this[$retainerCount].get(e)+1);const t=this[$recentlyUsed].indexOf(e);-1!==t&&this[$recentlyUsed].splice(t,1),this[$recentlyUsed].unshift(e),this[$evict]()}
release(e)
{this[$retainerCount].has(e)&&this[$retainerCount].set(e,Math.max(this[$retainerCount].get(e)-1,0)),this[$evict]()}[(_a$1=$retainerCount,_b=$recentlyUsed,$evict)]()
{if(!(this[$recentlyUsed].length<this[$evictionThreshold]))
for(let e=this[$recentlyUsed].length-1;e>=this[$evictionThreshold];--e)
{const t=this[$recentlyUsed][e];0===this[$retainerCount].get(t)&&(this[$cache].delete(t),this[$recentlyUsed].splice(e,1))}}}
var SkeletonUtils={retarget:function()
{var e=new Vector3,t=new Quaternion,r=new Vector3,n=new Matrix4,i=new Matrix4,a=new Matrix4;return function(o,s,l)
{(l=l||{}).preserveMatrix=void 0===l.preserveMatrix||l.preserveMatrix,l.preservePosition=void 0===l.preservePosition||l.preservePosition,l.preserveHipPosition=void 0!==l.preserveHipPosition&&l.preserveHipPosition,l.useTargetMatrix=void 0!==l.useTargetMatrix&&l.useTargetMatrix,l.hip=void 0!==l.hip?l.hip:"hip",l.names=l.names||{};var c,h,u,d,p,m,f=s.isObject3D?s.skeleton.bones:this.getBones(s),g=o.isObject3D?o.skeleton.bones:this.getBones(o);if(o.isObject3D?o.skeleton.pose():(l.useTargetMatrix=!0,l.preserveMatrix=!1),l.preservePosition)
for(p=[],m=0;m<g.length;m++)p.push(g[m].position.clone());if(l.preserveMatrix)
for(o.updateMatrixWorld(),o.matrixWorld.identity(),m=0;m<o.children.length;++m)o.children[m].updateMatrixWorld(!0);if(l.offsets)
for(c=[],m=0;m<g.length;++m)h=g[m],u=l.names[h.name]||h.name,l.offsets&&l.offsets[u]&&(h.matrix.multiply(l.offsets[u]),h.matrix.decompose(h.position,h.quaternion,h.scale),h.updateMatrixWorld()),c.push(h.matrixWorld.clone());for(m=0;m<g.length;++m)
{if(h=g[m],u=l.names[h.name]||h.name,d=this.getBoneByName(u,f),a.copy(h.matrixWorld),d)
{if(d.updateMatrixWorld(),l.useTargetMatrix?i.copy(d.matrixWorld):(i.getInverse(o.matrixWorld),i.multiply(d.matrixWorld)),r.setFromMatrixScale(i),i.scale(r.set(1/r.x,1/r.y,1/r.z)),a.makeRotationFromQuaternion(t.setFromRotationMatrix(i)),o.isObject3D)
{var v=g.indexOf(h),y=c?c[v]:n.getInverse(o.skeleton.boneInverses[v]);a.multiply(y)}
a.copyPosition(i)}
h.parent&&h.parent.isBone?(h.matrix.getInverse(h.parent.matrixWorld),h.matrix.multiply(a)):h.matrix.copy(a),l.preserveHipPosition&&u===l.hip&&h.matrix.setPosition(e.set(0,h.position.y,0)),h.matrix.decompose(h.position,h.quaternion,h.scale),h.updateMatrixWorld()}
if(l.preservePosition)
for(m=0;m<g.length;++m)h=g[m],(u=l.names[h.name]||h.name)!==l.hip&&h.position.copy(p[m]);l.preserveMatrix&&o.updateMatrixWorld(!0)}}(),retargetClip:function(e,t,r,n)
{(n=n||{}).useFirstFramePosition=void 0!==n.useFirstFramePosition&&n.useFirstFramePosition,n.fps=void 0!==n.fps?n.fps:30,n.names=n.names||[],t.isObject3D||(t=this.getHelperFromSkeleton(t));var i,a,o,s,l,c,h=Math.round(r.duration*(n.fps/1e3)*1e3),u=1/n.fps,d=[],p=new AnimationMixer(t),m=this.getBones(e.skeleton),f=[];for(p.clipAction(r).play(),p.update(0),t.updateMatrixWorld(),l=0;l<h;++l)
{var g=l*u;for(this.retarget(e,t,n),c=0;c<m.length;++c)s=n.names[m[c].name]||m[c].name,this.getBoneByName(s,t.skeleton)&&(a=m[c],o=f[c]=f[c]||{bone:a},n.hip===s&&(o.pos||(o.pos={times:new Float32Array(h),values:new Float32Array(3*h)}),n.useFirstFramePosition&&(0===l&&(i=a.position.clone()),a.position.sub(i)),o.pos.times[l]=g,a.position.toArray(o.pos.values,3*l)),o.quat||(o.quat={times:new Float32Array(h),values:new Float32Array(4*h)}),o.quat.times[l]=g,a.quaternion.toArray(o.quat.values,4*l));p.update(u),t.updateMatrixWorld()}
for(l=0;l<f.length;++l)(o=f[l])&&(o.pos&&d.push(new VectorKeyframeTrack(".bones["+o.bone.name+"].position",o.pos.times,o.pos.values)),d.push(new QuaternionKeyframeTrack(".bones["+o.bone.name+"].quaternion",o.quat.times,o.quat.values)));return p.uncacheAction(r),new AnimationClip(r.name,-1,d)},getHelperFromSkeleton:function(e)
{var t=new SkeletonHelper(e.bones[0]);return t.skeleton=e,t},getSkeletonOffsets:function()
{var e=new Vector3,t=new Vector3,r=new Vector3,n=new Vector3,i=new Vector2,a=new Vector2;return function(o,s,l)
{(l=l||{}).hip=void 0!==l.hip?l.hip:"hip",l.names=l.names||{},s.isObject3D||(s=this.getHelperFromSkeleton(s));var c,h,u,d,p=Object.keys(l.names),m=Object.values(l.names),f=s.isObject3D?s.skeleton.bones:this.getBones(s),g=o.isObject3D?o.skeleton.bones:this.getBones(o),v=[];for(o.skeleton.pose(),d=0;d<g.length;++d)
if(c=g[d],u=l.names[c.name]||c.name,(h=this.getBoneByName(u,f))&&u!==l.hip)
{var y=this.getNearestBone(c.parent,p),_=this.getNearestBone(h.parent,m);y.updateMatrixWorld(),_.updateMatrixWorld(),e.setFromMatrixPosition(y.matrixWorld),t.setFromMatrixPosition(c.matrixWorld),r.setFromMatrixPosition(_.matrixWorld),n.setFromMatrixPosition(h.matrixWorld),i.subVectors(new Vector2(t.x,t.y),new Vector2(e.x,e.y)).normalize(),a.subVectors(new Vector2(n.x,n.y),new Vector2(r.x,r.y)).normalize();var b=i.angle()-a.angle(),x=(new Matrix4).makeRotationFromEuler(new Euler(0,0,b));c.matrix.multiply(x),c.matrix.decompose(c.position,c.quaternion,c.scale),c.updateMatrixWorld(),v[u]=x}return v}}(),renameBones:function(e,t)
{for(var r=this.getBones(e),n=0;n<r.length;++n)
{var i=r[n];t[i.name]&&(i.name=t[i.name])}
return this},getBones:function(e)
{return Array.isArray(e)?e:e.bones},getBoneByName:function(e,t)
{for(var r=0,n=this.getBones(t);r<n.length;r++)
if(e===n[r].name)return n[r]},getNearestBone:function(e,t)
{for(;e.isBone;)
{if(-1!==t.indexOf(e.name))return e;e=e.parent}},findBoneTrackData:function(e,t)
{for(var r=/\[(.*)\]\.(.*)/,n={name:e},i=0;i<t.length;++i)
{var a=r.exec(t[i].name);a&&e===a[1]&&(n[a[2]]=i)}
return n},getEqualsBonesNames:function(e,t)
{var r=this.getBones(e),n=this.getBones(t),i=[];e:for(var a=0;a<r.length;a++)
for(var o=r[a].name,s=0;s<n.length;s++)
if(o===n[s].name)
{i.push(o);continue e}
return i},clone:function(e)
{var t=new Map,r=new Map,n=e.clone();return parallelTraverse(e,n,function(e,n)
{t.set(n,e),r.set(e,n)}),n.traverse(function(e)
{if(e.isSkinnedMesh)
{var n=e,i=t.get(e),a=i.skeleton.bones;n.skeleton=i.skeleton.clone(),n.bindMatrix.copy(i.bindMatrix),n.skeleton.bones=a.map(function(e)
{return r.get(e)}),n.bind(n.skeleton,n.bindMatrix)}}),n}};function parallelTraverse(e,t,r)
{r(e,t);for(var n=0;n<e.children.length;n++)parallelTraverse(e.children[n],t.children[n],r)}
const alphaChunk="\n#ifdef ALPHATEST\n\n    if ( diffuseColor.a < ALPHATEST ) discard;\n    diffuseColor.a = 1.0;\n\n#endif\n",cloneGltf=e=>{const t=Object.assign(Object.assign({},e),{scene:SkeletonUtils.clone(e.scene)}),r=e=>{const t=e.clone(),r=e.onBeforeCompile;return t.onBeforeCompile=e.isGLTFSpecularGlossinessMaterial?e=>{r(e,void 0),e.fragmentShader=e.fragmentShader.replace("#include <alphatest_fragment>",alphaChunk)}:e=>{e.fragmentShader=e.fragmentShader.replace("#include <alphatest_fragment>",alphaChunk),r(e,void 0)},t.shadowSide=FrontSide,t.transparent&&(t.depthWrite=!1),t.alphaTest||t.transparent||(t.alphaTest=-.5),t};return t.scene.traverse(e=>{e.renderOrder=1e3,Array.isArray(e.material)?e.material=e.material.map(r):null!=e.material&&(e.material=r(e.material))}),t},moveChildren=(e,t)=>{for(;e.children.length;)t.add(e.children.shift())},reduceVertices=(e,t)=>{let r=0;const n=new Vector3;return e.traverse(e=>{let i,a;e.updateWorldMatrix(!1,!1);let o=e.geometry;if(void 0!==o)
if(o.isGeometry)
{let s=o.vertices;for(i=0,a=s.length;i<a;i++)n.copy(s[i]),n.applyMatrix4(e.matrixWorld),r=t(r,n)}
else if(o.isBufferGeometry)
{let s=o.attributes.position;if(void 0!==s)
for(i=0,a=s.count;i<a;i++)n.fromBufferAttribute(s,i).applyMatrix4(e.matrixWorld),r=t(r,n)}}),r},deserializeUrl=e=>null!=e&&"null"!==e?toFullUrl(e):null,assertIsArCandidate=()=>{if(IS_WEBXR_AR_CANDIDATE)return;const e=[];throw HAS_WEBXR_DEVICE_API||e.push("WebXR Device API"),HAS_WEBXR_HIT_TEST_API||e.push("WebXR Hit Test API"),new Error(`The following APIs are required for AR, but are missing in this browser: ${e.join(", ")}`)},toFullUrl=e=>{return new URL(e,window.location.toString()).toString()},throttle=(e,t)=>{let r=null;const n=(...n)=>{null==r&&(e(...n),r=self.setTimeout(()=>r=null,t))};return n.flush=(()=>{null!=r&&(self.clearTimeout(r),r=null)}),n},debounce=(e,t)=>{let r=null;return(...n)=>{null!=r&&self.clearTimeout(r),r=self.setTimeout(()=>{r=null,e(...n)},t)}},clamp=(e,t,r)=>Math.max(t,Math.min(r,e)),CAPPED_DEVICE_PIXEL_RATIO=1,resolveDpr=(()=>{const e=(()=>{const e=null!=document.head?Array.from(document.head.querySelectorAll("meta")):[];for(const t of e)
if("viewport"===t.name)return!0;return!1})();return e||console.warn('No <meta name="viewport"> detected; <model-viewer> will cap pixel density at 1.'),()=>e?window.devicePixelRatio:1})(),isDebugMode=(()=>{const e=new RegExp("[?&]model-viewer-debug-mode(&|$)");return()=>self.ModelViewerElement&&self.ModelViewerElement.debugMode||self.location&&self.location.search&&self.location.search.match(e)})(),getFirstMapKey=e=>{if(null!=e.keys)return e.keys().next().value||null;let t=null;try
{e.forEach((e,r,n)=>{throw t=r,new Error})}
catch(e)
{}
return t};class Reticle extends Object3D
{constructor(e)
{super(),this.hitTestSource=null,this.hitTestSourceRequest=null,this._hitMatrix=null,this.name="Reticle";let t=new RingGeometry(.1,.11,24,1),r=new MeshBasicMaterial({color:16777215});t.applyMatrix4((new Matrix4).makeRotationX(MathUtils.degToRad(-90))),this.ring=new Mesh(t,r),this.add(this.ring),this.visible=!1,this.camera=e}
get hitMatrix()
{return this._hitMatrix}
async update(e,t,r,n)
{if(this.hitTestSourceRequest)
if(this.hitTestSource)
{const e=t.getHitTestResults(this.hitTestSource);if(e.length)
{const t=e[0];this._hitMatrix=(new Matrix4).fromArray(t.getPose(n).transform.matrix),this.position.setFromMatrixPosition(this._hitMatrix);const r=(new Vector3).setFromMatrixPosition(this.camera.matrixWorld),i=Math.atan2(r.x-this.position.x,r.z-this.position.z);this.rotation.set(0,i,0),this.visible=!0}
else this._hitMatrix=null}
else this._hitMatrix=null;else this.hitTestSourceRequest=e.requestHitTestSource({space:r}).then(e=>{this.hitTestSource=e})}}
const assertContext=e=>{if(null==e)throw new Error("WebGL is not available!");return e},getContext=(e,t)=>assertContext(e.getContext("webgl",t)||e.getContext("experimental-webgl",t)),applyExtensionCompatibility=e=>{const t={EXT_shader_texture_lod:"\n      #extension GL_EXT_shader_texture_lod : enable\n      precision mediump float;\n      uniform sampler2D tex;\n      void main() {\n        gl_FragColor = texture2DLodEXT(tex, vec2(0.0, 0.0), 0.0);\n      }"};const r=e.getExtension;e.getExtension=(n=>{let i;return t[n]?(i=r.call(e,n))&&!function(e,r)
{const n=e.createShader(e.FRAGMENT_SHADER);e.shaderSource(n,t[r]),e.compileShader(n);const i=e.getShaderParameter(n,e.COMPILE_STATUS);return e.deleteShader(n),i}(e,n)&&(i=null):i=r.call(e,n),i})};var _a$2,_b$1,_c,_d,_e,_f,_g;const $presentedScene=Symbol("presentedScene"),$rafId=Symbol("rafId"),$currentSession=Symbol("currentSession"),$tick=Symbol("tick"),$refSpace=Symbol("refSpace"),$viewerRefSpace=Symbol("viewerRefSpace"),$resolveCleanup=Symbol("resolveCleanup"),$outputContext=Symbol("outputContext"),$onWebXRFrame=Symbol("onWebXRFrame"),$postSessionCleanup=Symbol("postSessionCleanup"),matrix4=new Matrix4,vector3=new Vector3;class ARRenderer extends EventDispatcher
{constructor(e)
{super(),this.renderer=e,this.camera=new PerspectiveCamera,this.scene=new Scene,this.dolly=new Object3D,this.reticle=new Reticle(this.camera),this.raycaster=null,this[_a$2]=null,this[_b$1]=null,this[_c]=null,this[_d]=null,this[_e]=null,this[_f]=null,this[_g]=null,this.threeRenderer=e.threeRenderer,this.inputContext=e.context3D,this.camera.matrixAutoUpdate=!1,this.scene.add(this.reticle),this.scene.add(this.dolly)}
initializeRenderer()
{this.threeRenderer.setPixelRatio(1)}
async resolveARSession()
{assertIsArCandidate();const e=await navigator.xr.requestSession("immersive-ar",{requiredFeatures:["hit-test"]}),t=assertContext(this.threeRenderer.getContext());await t.makeXRCompatible(),this[$outputContext]=t,e.updateRenderState({baseLayer:new XRWebGLLayer(e,t,{alpha:!0})});let r=new Promise((t,r)=>{e.requestAnimationFrame(()=>t())});return await r,this.threeRenderer.setFramebuffer(e.renderState.baseLayer.framebuffer),this.threeRenderer.setSize(e.renderState.baseLayer.framebufferWidth,e.renderState.baseLayer.framebufferHeight,!1),e}
get presentedScene()
{return this[$presentedScene]}
async supportsPresentation()
{try
{return assertIsArCandidate(),await navigator.xr.isSessionSupported("immersive-ar")}
catch(e)
{return!1}}
async present(e)
{this.isPresenting&&console.warn("Cannot present while a model is already presenting"),e.model.scale.set(1,1,1),this[$presentedScene]=e,this.initializeRenderer(),this[$currentSession]=await this.resolveARSession(),this[$currentSession].addEventListener("end",()=>{this[$postSessionCleanup]()},{once:!0}),this[$refSpace]=await this[$currentSession].requestReferenceSpace("local"),this[$viewerRefSpace]=await this[$currentSession].requestReferenceSpace("viewer"),this[$tick]()}
async stopPresenting()
{if(!this.isPresenting)return;const e=new Promise(e=>{this[$resolveCleanup]=e});try
{const t=this[$currentSession];this[$currentSession]=null,t.cancelAnimationFrame(this[$rafId]),await t.end(),await e}
catch(e)
{console.warn("Error while trying to end AR session"),console.warn(e),this[$postSessionCleanup]()}}[(_a$2=$outputContext,_b$1=$rafId,_c=$currentSession,_d=$refSpace,_e=$viewerRefSpace,_f=$presentedScene,_g=$resolveCleanup,$postSessionCleanup)]()
{this.threeRenderer.setFramebuffer(null),null!=this[$presentedScene]&&(this.dolly.remove(this[$presentedScene]),this[$presentedScene].isDirty=!0),this.renderer.setRendererSize(1,1),this[$refSpace]=null,this[$presentedScene]=null,this.scene.environment=null,null!=this[$resolveCleanup]&&this[$resolveCleanup]()}
get isPresenting()
{return null!=this[$presentedScene]}
get outputContext()
{return this[$outputContext]}
async placeModel()
{if(null!=this[$currentSession]&&this.reticle&&this.reticle.hitMatrix)
{const e=this[$presentedScene],t=this.reticle.hitMatrix;this.dolly.position.setFromMatrixPosition(t);const r=vector3.setFromMatrixPosition(this.camera.matrix);this.dolly.lookAt(r.x,this.dolly.position.y,r.z),this.dolly.rotateY(-e.pivot.rotation.y),this.dolly.add(e),this.dispatchEvent({type:"modelmove"})}}
processXRInput(e)
{const
{session:t}=e,r=Array.from(t.inputSources).filter(e=>"screen"===e.targetRayMode);0!==r.length&&e.getPose(r[0].targetRaySpace,this[$refSpace])&&this.placeModel()}[$tick]()
{this[$rafId]=this[$currentSession].requestAnimationFrame((e,t)=>this[$onWebXRFrame](e,t))}[$onWebXRFrame](e,t)
{const
{session:r}=t,n=t.getViewerPose(this[$refSpace]);if(this[$tick](),null!=n)
{this.scene.environment!==this[$presentedScene].environment&&(this.scene.environment=this[$presentedScene].environment);for(const e of t.getViewerPose(this[$refSpace]).views)
{const n=r.renderState.baseLayer.getViewport(e);this.threeRenderer.setViewport(n.x,n.y,n.width,n.height),this.camera.projectionMatrix.fromArray(e.projectionMatrix);const i=matrix4.fromArray(e.transform.inverse.matrix);this.camera.matrix.getInverse(i),this.camera.updateMatrixWorld(!0),this.reticle.update(this[$currentSession],t,this[$viewerRefSpace],this[$refSpace]),this.processXRInput(t),this.threeRenderer.render(this.scene,this.camera)}}}}
class Debugger
{constructor(e)
{e.threeRenderer.debug={checkShaderErrors:!0},Promise.resolve().then(()=>{self.dispatchEvent(new CustomEvent("model-viewer-renderer-debug",{detail:{renderer:e,THREE:{ShaderMaterial:ShaderMaterial,Texture:Texture,Mesh:Mesh,Scene:Scene,PlaneBufferGeometry:PlaneBufferGeometry,OrthographicCamera:OrthographicCamera,WebGLRenderTarget:WebGLRenderTarget}}}))})}
addScene(e)
{self.dispatchEvent(new CustomEvent("model-viewer-scene-added-debug",{detail:{scene:e}}))}
removeScene(e)
{self.dispatchEvent(new CustomEvent("model-viewer-scene-removed-debug",{detail:{scene:e}}))}}
var _a$3,_b$2,RGBELoader=function(e)
{DataTextureLoader.call(this,e),this.type=UnsignedByteType};RGBELoader.prototype=Object.assign(Object.create(DataTextureLoader.prototype),{constructor:RGBELoader,parse:function(e)
{var t=function(e,t)
{switch(e)
{case 1:console.error("RGBELoader Read Error: "+(t||""));break;case 2:console.error("RGBELoader Write Error: "+(t||""));break;case 3:console.error("RGBELoader Bad File Format: "+(t||""));break;default:case 4:console.error("RGBELoader: Error: "+(t||""))}
return-1},r=function(e,t,r)
{t=t||1024;for(var n=e.pos,i=-1,a=0,o="",s=String.fromCharCode.apply(null,new Uint16Array(e.subarray(n,n+128)));0>(i=s.indexOf("\n"))&&a<t&&n<e.byteLength;)o+=s,a+=s.length,n+=128,s+=String.fromCharCode.apply(null,new Uint16Array(e.subarray(n,n+128)));return-1<i&&(!1!==r&&(e.pos+=a+i+1),o+s.slice(0,i))},n=function()
{var e=new Float32Array(1),t=new Int32Array(e.buffer);function r(r)
{e[0]=r;var n=t[0],i=n>>16&32768,a=n>>12&2047,o=n>>23&255;return o<103?i:o>142?(i|=31744,i|=(255==o?0:1)&&8388607&n):o<113?i|=((a|=2048)>>114-o)+(a>>113-o&1):(i|=o-112<<10|a>>1,i+=1&a)}
return function(e,t,n,i)
{var a=e[t+3],o=Math.pow(2,a-128)/255;n[i+0]=r(e[t+0]*o),n[i+1]=r(e[t+1]*o),n[i+2]=r(e[t+2]*o)}}(),i=new Uint8Array(e);i.pos=0;var a,o,s,l,c,h,u=function(e)
{var n,i,a=/^\s*GAMMA\s*=\s*(\d+(\.\d+)?)\s*$/,o=/^\s*EXPOSURE\s*=\s*(\d+(\.\d+)?)\s*$/,s=/^\s*FORMAT=(\S+)\s*$/,l=/^\s*\-Y\s+(\d+)\s+\+X\s+(\d+)\s*$/,c={valid:0,string:"",comments:"",programtype:"RGBE",format:"",gamma:1,exposure:1,width:0,height:0};if(e.pos>=e.byteLength||!(n=r(e)))return t(1,"no header found");if(!(i=n.match(/^#\?(\S+)$/)))return t(3,"bad initial token");for(c.valid|=1,c.programtype=i[1],c.string+=n+"\n";!1!==(n=r(e));)
if(c.string+=n+"\n","#"!==n.charAt(0))
{if((i=n.match(a))&&(c.gamma=parseFloat(i[1],10)),(i=n.match(o))&&(c.exposure=parseFloat(i[1],10)),(i=n.match(s))&&(c.valid|=2,c.format=i[1]),(i=n.match(l))&&(c.valid|=4,c.height=parseInt(i[1],10),c.width=parseInt(i[2],10)),2&c.valid&&4&c.valid)break}
else c.comments+=n+"\n";return 2&c.valid?4&c.valid?c:t(3,"missing image size specifier"):t(3,"missing format specifier")}(i);if(-1!==u)
{var d=u.width,p=u.height,m=function(e,r,n)
{var i,a,o,s,l,c,h,u,d,p,m,f,g,v=r,y=n;if(v<8||v>32767||2!==e[0]||2!==e[1]||128&e[2])return new Uint8Array(e);if(v!==(e[2]<<8|e[3]))return t(3,"wrong scanline width");if(!(i=new Uint8Array(4*r*n))||!i.length)return t(4,"unable to allocate buffer space");for(a=0,o=0,u=4*v,g=new Uint8Array(4),c=new Uint8Array(u);y>0&&o<e.byteLength;)
{if(o+4>e.byteLength)return t(1);if(g[0]=e[o++],g[1]=e[o++],g[2]=e[o++],g[3]=e[o++],2!=g[0]||2!=g[1]||(g[2]<<8|g[3])!=v)return t(3,"bad rgbe scanline format");for(h=0;h<u&&o<e.byteLength;)
{if((f=(s=e[o++])>128)&&(s-=128),0===s||h+s>u)return t(3,"bad scanline data");if(f)
for(l=e[o++],d=0;d<s;d++)c[h++]=l;else c.set(e.subarray(o,o+s),h),h+=s,o+=s}
for(p=v,d=0;d<p;d++)m=0,i[a]=c[d+m],m+=v,i[a+1]=c[d+m],m+=v,i[a+2]=c[d+m],m+=v,i[a+3]=c[d+m],a+=4;y--}
return i}(i.subarray(i.pos),d,p);if(-1!==m)
{switch(this.type)
{case UnsignedByteType:var f=m,g=RGBEFormat,v=UnsignedByteType;break;case FloatType:for(var y=m.length/4*3,_=new Float32Array(y),b=0;b<y;b++)s=_,l=3*b,c=void 0,h=void 0,c=(a=m)[(o=4*b)+3],h=Math.pow(2,c-128)/255,s[l+0]=a[o+0]*h,s[l+1]=a[o+1]*h,s[l+2]=a[o+2]*h;f=_,g=RGBFormat,v=FloatType;break;case HalfFloatType:y=m.length/4*3;var x=new Uint16Array(y);for(b=0;b<y;b++)n(m,4*b,x,3*b);f=x,g=RGBFormat,v=HalfFloatType;break;default:console.error("THREE.RGBELoader: unsupported type: ",this.type)}
return{width:d,height:p,data:f,header:u.string,gamma:u.gamma,exposure:u.exposure,format:g,type:v}}}
return null},setDataType:function(e)
{return this.type=e,this},load:function(e,t,r,n)
{return DataTextureLoader.prototype.load.call(this,e,function(e,r)
{switch(e.type)
{case UnsignedByteType:e.encoding=RGBEEncoding,e.minFilter=NearestFilter,e.magFilter=NearestFilter,e.generateMipmaps=!1,e.flipY=!0;break;case FloatType:case HalfFloatType:e.encoding=LinearEncoding,e.minFilter=LinearFilter,e.magFilter=LinearFilter,e.generateMipmaps=!1,e.flipY=!0}
t&&t(e,r)},r,n)}});class EnvironmentScene extends Scene
{constructor()
{super(),this.position.y=-3.5;const e=new BoxBufferGeometry;e.deleteAttribute("uv");const t=new MeshStandardMaterial({metalness:0,side:BackSide}),r=new MeshStandardMaterial({metalness:0}),n=new PointLight(16777215,500,28,2);n.position.set(.418,16.199,.3),this.add(n);const i=new Mesh(e,t);i.position.set(-.757,13.219,.717),i.scale.set(31.713,28.305,28.591),this.add(i);const a=new Mesh(e,r);a.position.set(-10.906,2.009,1.846),a.rotation.set(0,-.195,0),a.scale.set(2.328,7.905,4.651),this.add(a);const o=new Mesh(e,r);o.position.set(-5.607,-.754,-.758),o.rotation.set(0,.994,0),o.scale.set(1.97,1.534,3.955),this.add(o);const s=new Mesh(e,r);s.position.set(6.167,.857,7.803),s.rotation.set(0,.561,0),s.scale.set(3.927,6.285,3.687),this.add(s);const l=new Mesh(e,r);l.position.set(-2.017,.018,6.124),l.rotation.set(0,.333,0),l.scale.set(2.002,4.566,2.064),this.add(l);const c=new Mesh(e,r);c.position.set(2.291,-.756,-2.621),c.rotation.set(0,-.286,0),c.scale.set(1.546,1.552,1.496),this.add(c);const h=new Mesh(e,r);h.position.set(-2.193,-.369,-5.547),h.rotation.set(0,.516,0),h.scale.set(3.875,3.487,2.986),this.add(h);const u=new Mesh(e,this.createAreaLightMaterial(50));u.position.set(-16.116,14.37,8.208),u.scale.set(.1,2.428,2.739),this.add(u);const d=new Mesh(e,this.createAreaLightMaterial(50));d.position.set(-16.109,18.021,-8.207),d.scale.set(.1,2.425,2.751),this.add(d);const p=new Mesh(e,this.createAreaLightMaterial(17));p.position.set(14.904,12.198,-1.832),p.scale.set(.15,4.265,6.331),this.add(p);const m=new Mesh(e,this.createAreaLightMaterial(43));m.position.set(-.462,8.89,14.52),m.scale.set(4.38,5.441,.088),this.add(m);const f=new Mesh(e,this.createAreaLightMaterial(20));f.position.set(3.235,11.486,-12.541),f.scale.set(2.5,2,.1),this.add(f);const g=new Mesh(e,this.createAreaLightMaterial(100));g.position.set(0,20,0),g.scale.set(1,.1,1),this.add(g)}
createAreaLightMaterial(e)
{const t=new MeshBasicMaterial;return t.color.setScalar(e),t}}
const GENERATED_SIGMA=.04;Cache.enabled=!0;const HDR_FILE_RE=/\.hdr$/,ldrLoader=new TextureLoader,hdrLoader=new RGBELoader,$environmentMapCache=Symbol("environmentMapCache"),$generatedEnvironmentMap=Symbol("generatedEnvironmentMap"),$PMREMGenerator=Symbol("PMREMGenerator"),$addMetadata=Symbol("addMetadata"),$loadEnvironmentMapFromUrl=Symbol("loadEnvironmentMapFromUrl"),$loadGeneratedEnvironmentMap=Symbol("loadGeneratedEnvironmentMap"),userData={url:null,mapping:null};class TextureUtils extends EventDispatcher
{constructor(e)
{super(),this[_a$3]=null,this[_b$2]=new Map,this[$PMREMGenerator]=new PMREMGenerator(e)}
get pmremGenerator()
{return this[$PMREMGenerator]}
async load(e,t=(()=>{}))
{try
{this[$PMREMGenerator].compileEquirectangularShader();const r=HDR_FILE_RE.test(e),n=r?hdrLoader:ldrLoader,i=await new Promise((r,i)=>n.load(e,r,e=>{t(e.loaded/e.total*.9)},i));return t(1),this[$addMetadata](i,e,"Equirectangular"),r?(i.encoding=RGBEEncoding,i.minFilter=NearestFilter,i.magFilter=NearestFilter,i.flipY=!0):i.encoding=GammaEncoding,i}
finally
{t&&t(1)}}
async loadEquirectAsCubeUV(e,t=(()=>{}))
{let r=null;try
{r=await this.load(e,t);const n=this[$PMREMGenerator].fromEquirectangular(r);return this[$addMetadata](n.texture,e,"CubeUV"),n}
finally
{null!=r&&r.dispose()}}
async generateEnvironmentMapAndSkybox(e=null,t=null,r={})
{const
{progressTracker:n}=r,i=null!=n?n.beginActivity():()=>{};try
{let r,a=Promise.resolve(null);e&&(a=this[$loadEnvironmentMapFromUrl](e,n)),r=t?this[$loadEnvironmentMapFromUrl](t,n):e?a:this[$loadGeneratedEnvironmentMap]();let[o,s]=await Promise.all([r,a]);return this[$addMetadata](o.texture,t,"PMREM"),null!=s&&this[$addMetadata](s.texture,e,"PMREM"),{environmentMap:o,skybox:s}}
finally
{i(1)}}[(_a$3=$generatedEnvironmentMap,_b$2=$environmentMapCache,$addMetadata)](e,t,r)
{e.userData=Object.assign(Object.assign({},userData),{url:t,mapping:r})}[$loadEnvironmentMapFromUrl](e,t)
{if(!this[$environmentMapCache].has(e))
{const r=t?t.beginActivity():()=>{},n=this.loadEquirectAsCubeUV(e,r);this[$environmentMapCache].set(e,n)}
return this[$environmentMapCache].get(e)}[$loadGeneratedEnvironmentMap]()
{if(null==this[$generatedEnvironmentMap])
{const e=new EnvironmentScene;this[$generatedEnvironmentMap]=this[$PMREMGenerator].fromScene(e,GENERATED_SIGMA),e.dispose()}
return Promise.resolve(this[$generatedEnvironmentMap])}
async dispose()
{const e=[];this[$environmentMapCache].forEach(t=>{e.push(t)}),this[$environmentMapCache].clear();for(const t of e)try
{(await t).dispose()}
catch(e)
{}
null!=this[$generatedEnvironmentMap]&&(this[$generatedEnvironmentMap].dispose(),this[$generatedEnvironmentMap]=null)}}
var _a$4,_b$3;const $arRenderer=Symbol("arRenderer"),$onWebGLContextLost=Symbol("onWebGLContextLost"),$webGLContextLostHandler=Symbol("webGLContextLostHandler"),$singleton=Symbol("singleton");class Renderer extends EventDispatcher
{constructor(e)
{super(),this.width=0,this.height=0,this.debugger=null,this.scenes=new Set,this[_b$3]=(e=>this[$onWebGLContextLost](e));const t={alpha:!0,antialias:!0};IS_WEBXR_AR_CANDIDATE&&Object.assign(t,{alpha:!0,preserveDrawingBuffer:!0}),this.canvas3D=HAS_OFFSCREEN_CANVAS&&OFFSCREEN_CANVAS_SUPPORT_BITMAP?new OffscreenCanvas(0,0):document.createElement("canvas"),this.canvas3D.addEventListener("webglcontextlost",this[$webGLContextLostHandler]);try
{this.context3D=getContext(this.canvas3D,t),applyExtensionCompatibility(this.context3D),this.threeRenderer=new WebGLRenderer({canvas:this.canvas3D,context:this.context3D}),this.threeRenderer.autoClear=!0,this.threeRenderer.outputEncoding=GammaEncoding,this.threeRenderer.gammaFactor=2.2,this.threeRenderer.physicallyCorrectLights=!0,this.threeRenderer.setPixelRatio(resolveDpr()),this.threeRenderer.shadowMap.enabled=!0,this.threeRenderer.shadowMap.type=PCFSoftShadowMap,this.threeRenderer.shadowMap.autoUpdate=!1,this.debugger=null!=e&&e.debug?new Debugger(this):null,this.threeRenderer.debug={checkShaderErrors:!!this.debugger},this.threeRenderer.toneMapping=ACESFilmicToneMapping}
catch(e)
{this.context3D=null,console.warn(e)}
this[$arRenderer]=new ARRenderer(this),this.textureUtils=this.canRender?new TextureUtils(this.threeRenderer):null,this.setRendererSize(1,1),this.lastTick=performance.now()}
static get singleton()
{return this[$singleton]}
static resetSingleton()
{this[$singleton].dispose(),this[$singleton]=new Renderer({debug:isDebugMode()})}
get canRender()
{return null!=this.threeRenderer&&null!=this.context3D}
setRendererSize(e,t)
{this.canRender&&this.threeRenderer.setSize(e,t,!1),this.width=e,this.height=t}
registerScene(e)
{this.scenes.add(e),this.canRender&&this.scenes.size>0&&this.threeRenderer.setAnimationLoop(e=>this.render(e)),null!=this.debugger&&this.debugger.addScene(e)}
unregisterScene(e)
{this.scenes.delete(e),this.canRender&&0===this.scenes.size&&this.threeRenderer.setAnimationLoop(null),null!=this.debugger&&this.debugger.removeScene(e)}
async supportsPresentation()
{return this.canRender&&this[$arRenderer].supportsPresentation()}
get presentedScene()
{return this[$arRenderer].presentedScene}
async present(e)
{try
{return await this[$arRenderer].present(e)}
catch(e)
{throw await this[$arRenderer].stopPresenting(),e}
finally
{this.width=this.height=0}}
stopPresenting()
{return this[$arRenderer].stopPresenting()}
get isPresenting()
{return null!=this[$arRenderer]&&this[$arRenderer].isPresenting}
render(e)
{if(!this.canRender||this.isPresenting)return;const t=e-this.lastTick,r=resolveDpr();r!==this.threeRenderer.getPixelRatio()&&this.threeRenderer.setPixelRatio(r);for(let n of this.scenes)
{const
{element:i,width:a,height:o,context:s}=n;if(i[$tick$1](e,t),!n.visible||!n.isDirty||n.paused)continue;const l=n.getCamera();if(a>this.width||o>this.height)
{const e=Math.max(a,this.width),t=Math.max(o,this.height);this.setRendererSize(e,t)}
const{exposure:c,shadow:h}=n,u="number"==typeof c&&!self.isNaN(c);this.threeRenderer.toneMappingExposure=u?c:1;const d=this.threeRenderer.shadowMap.needsUpdate;null!=h&&(this.threeRenderer.shadowMap.needsUpdate=d||h.needsUpdate,h.needsUpdate=!1),this.threeRenderer.setRenderTarget(null),this.threeRenderer.setViewport(0,0,a,o),this.threeRenderer.render(n,l);const p=a*r,m=o*r;s.clearRect(0,0,p,m),s.drawImage(this.threeRenderer.domElement,0,this.canvas3D.height-m,p,m,0,0,p,m),n.isDirty=!1}
this.lastTick=e}
dispose()
{null!=this.textureUtils&&this.textureUtils.dispose(),null!=this.threeRenderer&&this.threeRenderer.dispose(),this.textureUtils=null,this.threeRenderer=null,this.scenes.clear(),this.canvas3D.removeEventListener("webglcontextlost",this[$webGLContextLostHandler])}[(_a$4=$singleton,_b$3=$webGLContextLostHandler,$onWebGLContextLost)](e)
{this.dispatchEvent({type:"contextlost",sourceEvent:e})}}
var _a$5,_b$4;Renderer[_a$4]=new Renderer({debug:isDebugMode()});const loadWithLoader=(e,t,r=(()=>{}))=>{const n=e=>{r(e.loaded/e.total)};return new Promise((r,i)=>{t.load(e,r,n,i)})},$releaseFromCache=Symbol("releaseFromCache"),cache=new Map,preloaded=new Map,$evictionPolicy=Symbol("evictionPolicy");let dracoDecoderLocation;const dracoLoader=new DRACOLoader,$loader=Symbol("loader");class CachingGLTFLoader
{constructor()
{this[_b$4]=new GLTFLoader,this.roughnessMipmapper=new RoughnessMipmapper(Renderer.singleton.threeRenderer),this[$loader].setDRACOLoader(dracoLoader)}
static setDRACODecoderLocation(e)
{dracoDecoderLocation=e,dracoLoader.setDecoderPath(e)}
static getDRACODecoderLocation()
{return dracoDecoderLocation}
static get cache()
{return cache}
static clearCache()
{cache.forEach((e,t)=>{this.delete(t)}),this[$evictionPolicy].reset()}
static has(e)
{return cache.has(e)}
static async delete(e)
{if(!this.has(e))return;const t=cache.get(e);preloaded.delete(e),cache.delete(e),(await t).scenes.forEach(e=>{e.traverse(e=>{if(!e.isMesh)return;const t=e;(Array.isArray(t.material)?t.material:[t.material]).forEach(e=>{e.dispose()}),t.geometry.dispose()})})}
static hasFinishedLoading(e)
{return!!preloaded.get(e)}
get[(_a$5=$evictionPolicy,_b$4=$loader,$evictionPolicy)]()
{return this.constructor[$evictionPolicy]}
async preload(e,t=(()=>{}))
{cache.has(e)||cache.set(e,loadWithLoader(e,this[$loader],e=>{t(.9*e)})),await cache.get(e),t&&t(1),preloaded.set(e,!0)}
async load(e,t=(()=>{}))
{await this.preload(e,t);const r=await cache.get(e),n=[];null!=r.scene&&r.scene.traverse(e=>{if(e.frustumCulled=!1,e.name||(e.name=e.uuid),!e.isMesh)return;e.castShadow=!0;const t=e;let r=!1;(Array.isArray(t.material)?t.material:[t.material]).forEach(e=>{e.isMeshStandardMaterial&&(e.transparent&&e.side===DoubleSide&&(r=!0,e.side=FrontSide),this.roughnessMipmapper.generateMipmaps(e))}),r&&n.push(t)});for(const e of n)
{const t=(Array.isArray(e.material)?e.material:[e.material]).map(e=>{const t=e.clone();return t.side=BackSide,t}),r=Array.isArray(e.material)?t:t[0],n=new Mesh(e.geometry,r);n.renderOrder=-1,e.add(n)}
const i=cloneGltf(r),a=i.scene?i.scene:null;return null!=a&&(a.userData.animations=i.animations,this[$evictionPolicy].retain(e),a[$releaseFromCache]=(()=>{let t=!1;return()=>{t||(a.traverse(e=>{if(!e.isMesh)return;const t=e;(Array.isArray(t.material)?t.material:[t.material]).forEach(e=>{e.dispose()})}),this[$evictionPolicy].release(e),t=!0)}})()),a}}
var _a$6,_b$5;CachingGLTFLoader[_a$5]=new CacheEvictionPolicy(CachingGLTFLoader);const $cancelPendingSourceChange=Symbol("cancelPendingSourceChange"),$currentScene=Symbol("currentScene"),DEFAULT_FOV_DEG=45,$loader$1=Symbol("loader");class Model extends Object3D
{constructor()
{super(),this[_a$6]=null,this[_b$5]=new CachingGLTFLoader,this.animations=[],this.animationsByName=new Map,this.currentAnimationAction=null,this.modelContainer=new Object3D,this.animationNames=[],this.boundingBox=new Box3,this.size=new Vector3,this.idealCameraDistance=0,this.fieldOfViewAspect=0,this.userData={url:null},this.url=null,this.name="Model",this.modelContainer.name="ModelContainer",this.add(this.modelContainer),this.mixer=new AnimationMixer(this.modelContainer)}
get loader()
{return this[$loader$1]}
hasModel()
{return!!this.modelContainer.children.length}
setObject(e)
{this.clear(),this.modelContainer.add(e),this.updateFraming(),this.dispatchEvent({type:"model-load"})}
async setSource(e,t)
{if(!e||e===this.url)return void(t&&t(1));null!=this[$cancelPendingSourceChange]&&(this[$cancelPendingSourceChange](),this[$cancelPendingSourceChange]=null),this.url=e;let r=null;try
{r=await new Promise(async(r,n)=>{this[$cancelPendingSourceChange]=(()=>n());try
{r(await this.loader.load(e,t))}
catch(e)
{n(e)}})}
catch(e)
{if(null==e)return;throw e}
this.clear(),this[$currentScene]=r,null!=r&&moveChildren(r,this.modelContainer),this.modelContainer.traverse(e=>{e&&"Mesh"===e.type&&(e.castShadow=!0)});const n=r?r.userData.animations:[],i=new Map,a=[];for(const e of n)i.set(e.name,e),a.push(e.name);this.animations=n,this.animationsByName=i,this.animationNames=a,this.userData.url=e,this.updateFraming(),this.dispatchEvent({type:"model-load",url:e})}
set animationTime(e)
{null!=this.currentAnimationAction&&(this.currentAnimationAction.time=e)}
get animationTime()
{return null!=this.currentAnimationAction?this.currentAnimationAction.time:0}
get hasActiveAnimation()
{return null!=this.currentAnimationAction}
playAnimation(e=null,t=0)
{const
{animations:r}=this;if(null==r||0===r.length)return void console.warn("Cannot play animation (model does not have any animations)");let n=null;null!=e&&(n=this.animationsByName.get(e)),null==n&&(n=r[0]);try
{const
{currentAnimationAction:e}=this;this.currentAnimationAction=this.mixer.clipAction(n,this).play(),this.currentAnimationAction.enabled=!0,null!=e&&this.currentAnimationAction!==e&&this.currentAnimationAction.crossFadeFrom(e,t,!1)}
catch(e)
{console.error(e)}}
stopAnimation()
{null!=this.currentAnimationAction&&(this.currentAnimationAction.stop(),this.currentAnimationAction.reset(),this.currentAnimationAction=null),this.mixer.stopAllAction()}
updateAnimation(e)
{this.mixer.update(e)}
clear()
{this.url=null,this.userData={url:null},null!=this[$currentScene]&&(moveChildren(this.modelContainer,this[$currentScene]),this[$currentScene][$releaseFromCache](),this[$currentScene]=null),null!=this.currentAnimationAction&&(this.currentAnimationAction.stop(),this.currentAnimationAction=null),this.mixer.stopAllAction(),this.mixer.uncacheRoot(this)}
updateFraming(e=null)
{this.remove(this.modelContainer),null==e&&(this.boundingBox.setFromObject(this.modelContainer),this.boundingBox.getSize(this.size),e=this.boundingBox.getCenter(new Vector3));const t=Math.sqrt(reduceVertices(this.modelContainer,(t,r)=>Math.max(t,e.distanceToSquared(r)))),r=DEFAULT_FOV_DEG/2*Math.PI/180;this.idealCameraDistance=t/Math.sin(r);const n=Math.tan(r);this.fieldOfViewAspect=reduceVertices(this.modelContainer,(t,r)=>{r.sub(e);const n=Math.sqrt(r.x*r.x+r.z*r.z);return Math.max(t,n/(this.idealCameraDistance-Math.abs(r.y)))})/n,this.add(this.modelContainer)}}
_a$6=$currentScene,_b$5=$loader$1;const OFFSET=.001,BASE_OPACITY=.1,LOG_MAX_RESOLUTION=9,LOG_MIN_RESOLUTION=6,ANIMATION_SCALING=2;class Shadow extends DirectionalLight
{constructor(e,t,r)
{super(),this.model=e,this.shadowMaterial=new ShadowMaterial,this.boundingBox=new Box3,this.size=new Vector3,this.needsUpdate=!1,this.intensity=0,this.castShadow=!0,this.frustumCulled=!1,this.floor=new Mesh(new PlaneBufferGeometry,this.shadowMaterial),this.floor.rotateX(-Math.PI/2),this.floor.receiveShadow=!0,this.floor.castShadow=!1,this.floor.frustumCulled=!1,this.add(this.floor),this.shadow.camera.up.set(0,0,1),this.target=t,this.setModel(e,r)}
setModel(e,t)
{this.model=e;const{camera:r}=this.shadow;this.boundingBox.copy(e.boundingBox),this.size.copy(e.size);const{boundingBox:n,size:i}=this;if(this.model.animationNames.length>0)
{const e=Math.max(i.x,i.y,i.z)*ANIMATION_SCALING;i.y=e,n.expandByVector(i.subScalar(e).multiplyScalar(-.5)),n.max.y=n.min.y+e,i.set(e,e,e)}
const a=i.y*OFFSET;this.position.y=n.max.y+a,n.getCenter(this.floor.position),this.floor.position.y-=i.y/2+this.position.y-2*a,r.near=0,r.far=i.y,this.setSoftness(t)}
setSoftness(e)
{const t=Math.pow(2,LOG_MAX_RESOLUTION-e*(LOG_MAX_RESOLUTION-LOG_MIN_RESOLUTION));this.setMapSize(t)}
setMapSize(e)
{const
{camera:t,mapSize:r,map:n}=this.shadow,{boundingBox:i,size:a}=this;null!=n&&(n.dispose(),this.shadow.map=null),this.model.animationNames.length>0&&(e*=ANIMATION_SCALING);const o=Math.floor(a.x>a.z?e:e*a.x/a.z),s=Math.floor(a.x>a.z?e*a.z/a.x:e);r.set(o,s);const l=2.5*a.x/o,c=2.5*a.z/s;t.left=-i.max.x-l,t.right=-i.min.x+l,t.bottom=i.min.z-c,t.top=i.max.z+c,this.updateMatrixWorld(),t.updateProjectionMatrix(),this.shadow.updateMatrices(this),this.floor.scale.set(a.x+2*l,a.z+2*c,1),this.needsUpdate=!0}
setIntensity(e)
{this.shadowMaterial.opacity=e*BASE_OPACITY,e>0?(this.visible=!0,this.floor.visible=!0):(this.visible=!1,this.floor.visible=!1)}
getIntensity()
{return this.shadowMaterial.opacity/BASE_OPACITY}
setRotation(e)
{this.shadow.camera.up.set(Math.sin(e),0,Math.cos(e)),this.shadow.updateMatrices(this)}}
var _a$7;const DEFAULT_TAN_FOV=Math.tan(DEFAULT_FOV_DEG/2*Math.PI/180),$paused=Symbol("paused");class ModelScene extends Scene
{constructor({canvas:e,element:t,width:r,height:n})
{super(),this[_a$7]=!1,this.aspect=1,this.shadow=null,this.shadowIntensity=0,this.shadowSoftness=1,this.width=1,this.height=1,this.isVisible=!1,this.isDirty=!1,this.exposure=1,this.framedFieldOfView=DEFAULT_FOV_DEG,this.camera=new PerspectiveCamera(45,1,.1,100),this.name="ModelScene",this.element=t,this.canvas=e,this.context=e.getContext("2d"),this.model=new Model,this.camera=new PerspectiveCamera(45,1,.1,100),this.camera.name="MainCamera",this.activeCamera=this.camera,this.pivot=new Object3D,this.pivot.name="Pivot",this.pivotCenter=new Vector3,this.add(this.pivot),this.pivot.add(this.model),this.setSize(r,n),this.model.addEventListener("model-load",e=>this.onModelLoad(e))}
get paused()
{return this[$paused]}
pause()
{this[$paused]=!0}
resume()
{this[$paused]=!1}
async setModelSource(e,t)
{try
{await this.model.setSource(e,t)}
catch(t)
{throw new Error(`Could not set model source to '${e}': ${t.message}`)}}
setSize(e,t)
{if(e!==this.width||t!==this.height)
{this.width=Math.max(e,1),this.height=Math.max(t,1);const r=resolveDpr();this.canvas.width=this.width*r,this.canvas.height=this.height*r,this.canvas.style.width=`${this.width}px`,this.canvas.style.height=`${this.height}px`,this.aspect=this.width/this.height,this.frameModel(),Promise.resolve().then(()=>{this.element[$renderer].render(performance.now())})}}
frameModel()
{const e=DEFAULT_TAN_FOV*Math.max(1,this.model.fieldOfViewAspect/this.aspect);this.framedFieldOfView=2*Math.atan(e)*180/Math.PI}
getSize()
{return{width:this.width,height:this.height}}
getCamera()
{return this.activeCamera}
setCamera(e)
{this.activeCamera=e}
setPivotRotation(e)
{this.pivot.rotation.y=e,this.pivot.position.x=-this.pivotCenter.x,this.pivot.position.z=-this.pivotCenter.z,this.pivot.position.applyAxisAngle(this.pivot.up,e),this.pivot.position.x+=this.pivotCenter.x,this.pivot.position.z+=this.pivotCenter.z,null!=this.shadow&&this.shadow.setRotation(e)}
getPivotRotation()
{return this.pivot.rotation.y}
onModelLoad(e)
{this.frameModel(),this.setShadowIntensity(this.shadowIntensity),null!=this.shadow&&this.shadow.setModel(this.model,this.shadowSoftness),this.element[$needsRender](),this.dispatchEvent({type:"model-load",url:e.url})}
setShadowIntensity(e)
{this.shadowIntensity=e,e>0&&this.model.hasModel()&&(null==this.shadow&&(this.shadow=new Shadow(this.model,this.pivot,this.shadowSoftness),this.pivot.add(this.shadow)),this.shadow.setIntensity(e))}
setShadowSoftness(e)
{this.shadowSoftness=e,null!=this.shadow&&this.shadow.setSoftness(e)}}
_a$7=$paused;const dataUrlToBlob=async e=>new Promise((t,r)=>{const n=e.match(/data:(.*);/);if(!n)return r(new Error(`${e} is not a valid data Url`));const i=n[1],a=e.replace(/data:image\/\w+;base64,/,""),o=atob(a),s=[];for(let e=0;e<o.length;e+=512)
{const t=o.slice(e,e+512),r=new Array(t.length);for(let e=0;e<t.length;e++)r[e]=t.charCodeAt(e);const n=new Uint8Array(r);s.push(n)}
t(new Blob(s,{type:i}))});var _a$8,_b$6;const $ongoingActivities=Symbol("ongoingActivities"),$announceTotalProgress=Symbol("announceTotalProgress"),$eventDelegate=Symbol("eventDelegate"),ACTIVITY_PROGRESS_WEIGHT=.5;class ProgressTracker
{constructor()
{this[_a$8]=document.createDocumentFragment(),this.addEventListener=((...e)=>this[$eventDelegate].addEventListener(...e)),this.removeEventListener=((...e)=>this[$eventDelegate].removeEventListener(...e)),this.dispatchEvent=((...e)=>this[$eventDelegate].dispatchEvent(...e)),this[_b$6]=new Set}
get ongoingActivityCount()
{return this[$ongoingActivities].size}
beginActivity()
{const e={progress:0};return this[$ongoingActivities].add(e),1===this.ongoingActivityCount&&this[$announceTotalProgress](),t=>{let r;return(r=Math.max(clamp(t,0,1),e.progress))!==e.progress&&(e.progress=r,this[$announceTotalProgress]()),e.progress}}[(_a$8=$eventDelegate,_b$6=$ongoingActivities,$announceTotalProgress)]()
{let e=0,t=0,r=0;for(const n of this[$ongoingActivities])
{const
{progress:i}=n;e+=i*(ACTIVITY_PROGRESS_WEIGHT/Math.pow(2,t++)),1===i&&r++}
r===this.ongoingActivityCount&&(e=1,this[$ongoingActivities].clear()),this.dispatchEvent(new CustomEvent("progress",{detail:{totalProgress:e}}))}}
var _a$9,_b$7,_c$1,_d$1,_e$1,_f$1,_g$1,_h,_j,_k,__decorate=function(e,t,r,n)
{for(var i,a=arguments.length,o=a<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n,s=e.length-1;s>=0;s--)(i=e[s])&&(o=(a<3?i(o):a>3?i(t,r,o):i(t,r))||o);return a>3&&o&&Object.defineProperty(t,r,o),o};const CLEAR_MODEL_TIMEOUT_MS=1e3,FALLBACK_SIZE_UPDATE_THRESHOLD_MS=50,UNSIZED_MEDIA_WIDTH=300,UNSIZED_MEDIA_HEIGHT=150,$updateSize=Symbol("updateSize"),$loaded=Symbol("loaded"),$template=Symbol("template"),$fallbackResizeHandler=Symbol("fallbackResizeHandler"),$defaultAriaLabel=Symbol("defaultAriaLabel"),$resizeObserver=Symbol("resizeObserver"),$intersectionObserver=Symbol("intersectionObserver"),$lastDpr=Symbol("lastDpr"),$clearModelTimeout=Symbol("clearModelTimeout"),$onContextLost=Symbol("onContextLost"),$contextLostHandler=Symbol("contextLostHandler"),$isInRenderTree=Symbol("isInRenderTree"),$ariaLabel=Symbol("ariaLabel"),$loadedTime=Symbol("loadedTime"),$updateSource=Symbol("updateSource"),$markLoaded=Symbol("markLoaded"),$container=Symbol("container"),$canvas=Symbol("canvas"),$scene=Symbol("scene"),$needsRender=Symbol("needsRender"),$tick$1=Symbol("tick"),$onModelLoad=Symbol("onModelLoad"),$onResize=Symbol("onResize"),$renderer=Symbol("renderer"),$progressTracker=Symbol("progressTracker"),$getLoaded=Symbol("getLoaded"),$getModelIsVisible=Symbol("getModelIsVisible"),toVector3D=e=>({x:e.x,y:e.y,z:e.z,toString()
{return `${this.x}m ${this.y}m ${this.z}m`}});class ModelViewerElementBase extends UpdatingElement
{constructor()
{super(),this.alt=null,this.src=null,this[_a$9]=!1,this[_b$7]=!1,this[_c$1]=0,this[_d$1]=resolveDpr(),this[_e$1]=null,this[_f$1]=debounce(()=>{const e=this.getBoundingClientRect();this[$updateSize](e)},FALLBACK_SIZE_UPDATE_THRESHOLD_MS),this[_g$1]=null,this[_h]=null,this[_j]=new ProgressTracker,this[_k]=(e=>this[$onContextLost](e));const e=this.constructor.template;window.ShadyCSS&&window.ShadyCSS.styleElement(this,{}),this.attachShadow({mode:"open"});const t=this.shadowRoot;let r,n;if(t.appendChild(e.content.cloneNode(!0)),this[$container]=t.querySelector(".container"),this[$canvas]=t.querySelector("canvas"),this[$defaultAriaLabel]=this[$canvas].getAttribute("aria-label"),this.isConnected)
{const e=this.getBoundingClientRect();r=e.width,n=e.height}
else r=UNSIZED_MEDIA_WIDTH,n=UNSIZED_MEDIA_HEIGHT;if(this[$scene]=new ModelScene({canvas:this[$canvas],element:this,width:r,height:n}),this[$scene].addEventListener("model-load",e=>{this[$markLoaded](),this[$onModelLoad](e),this.dispatchEvent(new CustomEvent("load",{detail:{url:e.url}}))}),Promise.resolve().then(()=>{this[$updateSize](this.getBoundingClientRect(),!0)}),HAS_RESIZE_OBSERVER&&(this[$resizeObserver]=new ResizeObserver(e=>{if(!this[$renderer].isPresenting)
for(let t of e)t.target===this&&this[$updateSize](t.contentRect)})),HAS_INTERSECTION_OBSERVER)
{const e=this[$progressTracker].beginActivity();this[$intersectionObserver]=new IntersectionObserver(t=>{for(let r of t)
if(r.target===this)
{const t=this[$isInRenderTree];this[$isInRenderTree]=this[$scene].visible=r.isIntersecting,this.requestUpdate($isInRenderTree,t),this[$isInRenderTree]&&Promise.resolve().then(()=>{e(1)})}},{root:null,rootMargin:"10px",threshold:0})}
else this[$isInRenderTree]=this[$scene].visible=!0,this.requestUpdate($isInRenderTree,!1)}
static get is()
{return"model-viewer"}
static get template()
{return this.hasOwnProperty($template)||(this[$template]=makeTemplate(this.is)),this[$template]}
static set modelCacheSize(e)
{CachingGLTFLoader[$evictionPolicy].evictionThreshold=e}
static get modelCacheSize()
{return CachingGLTFLoader[$evictionPolicy].evictionThreshold}
get loaded()
{return this[$getLoaded]()}
get[(_a$9=$isInRenderTree,_b$7=$loaded,_c$1=$loadedTime,_d$1=$lastDpr,_e$1=$clearModelTimeout,_f$1=$fallbackResizeHandler,_g$1=$resizeObserver,_h=$intersectionObserver,_j=$progressTracker,_k=$contextLostHandler,$renderer)]()
{return Renderer.singleton}
get modelIsVisible()
{return this[$getModelIsVisible]()}
connectedCallback()
{super.connectedCallback&&super.connectedCallback(),HAS_RESIZE_OBSERVER?this[$resizeObserver].observe(this):self.addEventListener("resize",this[$fallbackResizeHandler]),HAS_INTERSECTION_OBSERVER&&this[$intersectionObserver].observe(this),this[$renderer].addEventListener("contextlost",this[$contextLostHandler]),this[$renderer].registerScene(this[$scene]),this[$scene].isDirty=!0,null!=this[$clearModelTimeout]&&(self.clearTimeout(this[$clearModelTimeout]),this[$clearModelTimeout]=null,this.requestUpdate("src",null))}
disconnectedCallback()
{super.disconnectedCallback&&super.disconnectedCallback(),HAS_RESIZE_OBSERVER?this[$resizeObserver].unobserve(this):self.removeEventListener("resize",this[$fallbackResizeHandler]),HAS_INTERSECTION_OBSERVER&&this[$intersectionObserver].unobserve(this),this[$renderer].removeEventListener("contextlost",this[$contextLostHandler]),this[$renderer].unregisterScene(this[$scene]),this[$clearModelTimeout]=self.setTimeout(()=>{this[$scene].model.clear()},CLEAR_MODEL_TIMEOUT_MS)}
updated(e)
{if(super.updated(e),!e.has("src")||null!=this.src&&this.src===this[$scene].model.url||(this[$loaded]=!1,this[$loadedTime]=0,this[$updateSource]()),e.has("alt"))
{const e=null==this.alt?this[$defaultAriaLabel]:this.alt;this[$canvas].setAttribute("aria-label",e)}}
toDataURL(e,t)
{return this[$canvas].toDataURL(e,t)}
async toBlob(e)
{const t=e?e.mimeType:void 0,r=e?e.qualityArgument:void 0,n=e?e.idealAspect:void 0,{width:i,height:a,model:o,aspect:s}=this[$scene];if(!0===n)
{const e=o.fieldOfViewAspect>s?i:Math.round(a*o.fieldOfViewAspect),t=o.fieldOfViewAspect>s?Math.round(i/o.fieldOfViewAspect):a;this[$updateSize]({width:e,height:t}),await new Promise(e=>requestAnimationFrame(e))}
try
{return new Promise(async(e,n)=>!this[$canvas].msToBlob||t&&"image/png"!==t?this[$canvas].toBlob?void this[$canvas].toBlob(t=>{if(!t)return n(new Error("Unable to retrieve canvas blob"));e(t)},t,r):e(await dataUrlToBlob(this[$canvas].toDataURL(t,r))):e(this[$canvas].msToBlob()))}
finally
{this[$updateSize]({width:i,height:a})}}
get[$ariaLabel]()
{return null==this.alt||"null"===this.alt?this[$defaultAriaLabel]:this.alt}[$getLoaded]()
{return this[$loaded]}[$getModelIsVisible]()
{return!0}[$updateSize]({width:e,height:t},r=!1)
{const
{width:n,height:i}=this[$scene].getSize(),a=parseInt(e,10),o=parseInt(t,10);this[$container].style.width=`${e}px`,this[$container].style.height=`${t}px`,(r||n!==a||i!==o)&&this[$onResize]({width:a,height:o})}[$tick$1](e,t)
{const r=resolveDpr();r!==this[$lastDpr]&&(this[$lastDpr]=r,this[$fallbackResizeHandler]())}[$markLoaded]()
{this[$loaded]||(this[$loaded]=!0,this[$loadedTime]=performance.now(),this.requestUpdate())}[$needsRender]()
{this[$scene].isDirty=!0}[$onModelLoad](e)
{this[$needsRender]()}[$onResize](e)
{this[$scene].setSize(e.width,e.height),this[$needsRender]()}[$onContextLost](e)
{this.dispatchEvent(new CustomEvent("error",{detail:{type:"webglcontextlost",sourceError:e.sourceEvent}}))}
async[$updateSource]()
{const e=this[$progressTracker].beginActivity(),t=this.src;try
{this[$canvas].classList.add("show"),await this[$scene].setModelSource(t,t=>e(.9*t))}
catch(e)
{this[$canvas].classList.remove("show"),this.dispatchEvent(new CustomEvent("error",{detail:e}))}
finally
{e(1)}}}
__decorate([property({type:String})],ModelViewerElementBase.prototype,"alt",void 0),__decorate([property({converter:{fromAttribute:deserializeUrl}})],ModelViewerElementBase.prototype,"src",void 0);var __decorate$1=function(e,t,r,n)
{for(var i,a=arguments.length,o=a<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n,s=e.length-1;s>=0;s--)(i=e[s])&&(o=(a<3?i(o):a>3?i(t,r,o):i(t,r))||o);return a>3&&o&&Object.defineProperty(t,r,o),o};const MILLISECONDS_PER_SECOND=1e3,$changeAnimation=Symbol("changeAnimation"),$paused$1=Symbol("paused"),AnimationMixin=e=>{var t;class r extends e
{constructor()
{super(...arguments),this.autoplay=!1,this.animationName=void 0,this.animationCrossfadeDuration=300,this[t]=!0}
get availableAnimations()
{return this.loaded?this[$scene].model.animationNames:[]}
get paused()
{return this[$paused$1]}
get currentTime()
{return this[$scene].model.animationTime}
set currentTime(e)
{this[$scene].model.animationTime=e}
pause()
{this[$paused$1]||(this[$paused$1]=!0,this[$renderer].threeRenderer.shadowMap.autoUpdate=!1,this.dispatchEvent(new CustomEvent("pause")))}
play()
{this[$paused$1]&&this.availableAnimations.length>0&&(this[$paused$1]=!1,this[$renderer].threeRenderer.shadowMap.autoUpdate=!0,this[$scene].model.hasActiveAnimation||this[$changeAnimation](),this.dispatchEvent(new CustomEvent("play")))}[(t=$paused$1,$onModelLoad)]()
{this[$paused$1]=!0,this.autoplay&&(this[$changeAnimation](),this.play())}[$tick$1](e,t)
{if(super[$tick$1](e,t),this[$paused$1])return;const{model:r}=this[$scene];r.updateAnimation(t/MILLISECONDS_PER_SECOND),this[$needsRender]()}
updated(e)
{super.updated(e),e.has("autoplay")&&this.autoplay&&this.play(),e.has("animationName")&&this[$changeAnimation]()}
async[$updateSource]()
{return this[$scene].model.stopAnimation(),super[$updateSource]()}[$changeAnimation]()
{const
{model:e}=this[$scene];e.playAnimation(this.animationName,this.animationCrossfadeDuration/MILLISECONDS_PER_SECOND),this[$paused$1]&&(e.updateAnimation(0),this[$needsRender]())}}
return __decorate$1([property({type:Boolean})],r.prototype,"autoplay",void 0),__decorate$1([property({type:String,attribute:"animation-name"})],r.prototype,"animationName",void 0),__decorate$1([property({type:Number,attribute:"animation-crossfade-duration"})],r.prototype,"animationCrossfadeDuration",void 0),r};var CSS2DObject=function(e)
{Object3D.call(this),this.element=e,this.element.style.position="absolute",this.addEventListener("removed",function()
{this.traverse(function(e)
{e.element instanceof Element&&null!==e.element.parentNode&&e.element.parentNode.removeChild(e.element)})})};CSS2DObject.prototype=Object.create(Object3D.prototype),CSS2DObject.prototype.constructor=CSS2DObject;var CSS2DRenderer=function()
{var e,t,r,n,i=this,a=new Vector3,o=new Matrix4,s=new Matrix4,l={objects:new WeakMap},c=document.createElement("div");c.style.overflow="hidden",this.domElement=c,this.getSize=function()
{return{width:e,height:t}},this.setSize=function(i,a)
{r=(e=i)/2,n=(t=a)/2,c.style.width=i+"px",c.style.height=a+"px"};var h,u,d=function(e,t,o)
{if(e instanceof CSS2DObject)
{e.onBeforeRender(i,t,o),a.setFromMatrixPosition(e.matrixWorld),a.applyMatrix4(s);var h=e.element,u="translate(-50%,-50%) translate("+(a.x*r+r)+"px,"+(-a.y*n+n)+"px)";h.style.WebkitTransform=u,h.style.MozTransform=u,h.style.oTransform=u,h.style.transform=u,h.style.display=e.visible&&a.z>=-1&&a.z<=1?"":"none";var m={distanceToCameraSquared:p(o,e)};l.objects.set(e,m),h.parentNode!==c&&c.appendChild(h),e.onAfterRender(i,t,o)}
for(var f=0,g=e.children.length;f<g;f++)d(e.children[f],t,o)},p=(h=new Vector3,u=new Vector3,function(e,t)
{return h.setFromMatrixPosition(e.matrixWorld),u.setFromMatrixPosition(t.matrixWorld),h.distanceToSquared(u)}),m=function(e)
{for(var t=function(e)
{var t=[];return e.traverse(function(e)
{e instanceof CSS2DObject&&t.push(e)}),t}(e).sort(function(e,t)
{return l.objects.get(e).distanceToCameraSquared-l.objects.get(t).distanceToCameraSquared}),r=t.length,n=0,i=t.length;n<i;n++)t[n].element.style.zIndex=r-n};this.render=function(e,t)
{!0===e.autoUpdate&&e.updateMatrixWorld(),null===t.parent&&t.updateMatrixWorld(),o.copy(t.matrixWorldInverse),s.multiplyMatrices(t.projectionMatrix,o),d(e,e,t),m(e)}};const numberNode=(e,t)=>({type:"number",number:e,unit:t}),parseExpressions=(()=>{const e={};return t=>{const r=t;if(r in e)return e[r];const n=[];let i=0;for(;t;)
{if(++i>1e3)
{t="";break}
const e=parseExpression(t),r=e.nodes[0];if(null==r||0===r.terms.length)break;n.push(r),t=e.remainingInput}
return e[r]=n}})(),parseExpression=(()=>{const e=/^(\-\-|[a-z\u0240-\uffff])/i,t=/^([\*\+\/]|[\-]\s)/i,r=/^[\),]/;return n=>{const i=[];for(;n.length&&(n=n.trim(),!r.test(n));)
if("("===n[0])
{const
{nodes:e,remainingInput:t}=parseFunctionArguments(n);n=t,i.push({type:"function",name:{type:"ident",value:"calc"},arguments:e})}
else if(e.test(n))
{const e=parseIdent(n),t=e.nodes[0];if("("===(n=e.remainingInput)[0])
{const
{nodes:e,remainingInput:r}=parseFunctionArguments(n);i.push({type:"function",name:t,arguments:e}),n=r}
else i.push(t)}
else if(t.test(n))i.push({type:"operator",value:n[0]}),n=n.slice(1);else{const
{nodes:e,remainingInput:t}="#"===n[0]?parseHex(n):parseNumber(n);if(0===e.length)break;i.push(e[0]),n=t}
return{nodes:[{type:"expression",terms:i}],remainingInput:n}}})(),parseIdent=(()=>{const e=/[^a-z^0-9^_^\-^\u0240-\uffff]/i;return t=>{const r=t.match(e);return{nodes:[{type:"ident",value:null==r?t:t.substr(0,r.index)}],remainingInput:null==r?"":t.substr(r.index)}}})(),parseNumber=(()=>{const e=/[^0-9\.\-]|$/,t=/^[a-z%]+/i,r=/^(m|mm|cm|rad|deg|[%])$/;return n=>{const i=n.match(e),a=null==i?n:n.substr(0,i.index),o=(n=null==i?n:n.slice(i.index)).match(t);let s=null!=o&&""!==o[0]?o[0]:null;const l=null==o?n:n.slice(s.length);return null==s||r.test(s)||(s=null),{nodes:[{type:"number",number:parseFloat(a)||0,unit:s}],remainingInput:l}}})(),parseHex=(()=>{const e=/^[a-f0-9]*/i;return t=>{const r=(t=t.slice(1).trim()).match(e);return{nodes:null==r?[]:[{type:"hex",value:r[0]}],remainingInput:null==r?t:t.slice(r[0].length)}}})(),parseFunctionArguments=e=>{const t=[];for(e=e.slice(1).trim();e.length;)
{const r=parseExpression(e);if(t.push(r.nodes[0]),","===(e=r.remainingInput.trim())[0])e=e.slice(1).trim();else if(")"===e[0])
{e=e.slice(1);break}}
return{nodes:t,remainingInput:e}},$visitedTypes=Symbol("visitedTypes");class ASTWalker
{constructor(e)
{this[$visitedTypes]=e}
walk(e,t)
{const r=e.slice();for(;r.length;)
{const e=r.shift();switch(this[$visitedTypes].indexOf(e.type)>-1&&t(e),e.type)
{case "expression":r.unshift(...e.terms);break;case "function":r.unshift(e.name,...e.arguments)}}}}
const ZERO=Object.freeze({type:"number",number:0,unit:null}),degreesToRadians=(e,t=0)=>{let
{number:r,unit:n}=e;if(isFinite(r))
{if("rad"===e.unit||null==e.unit)return e}
else r=t,n="rad";return{type:"number",number:("deg"===n&&null!=r?r:0)*Math.PI/180,unit:"rad"}},lengthToBaseMeters=(e,t=0)=>{let r,{number:n,unit:i}=e;if(isFinite(n))
{if("m"===e.unit)return e}
else n=t,i="m";switch(i)
{default:r=1;break;case "cm":r=.01;break;case "mm":r=.001}
return{type:"number",number:r*n,unit:"m"}},normalizeUnit=(()=>{const e=e=>e,t={rad:e,deg:degreesToRadians,m:e,mm:lengthToBaseMeters,cm:lengthToBaseMeters};return(e,r=ZERO)=>{let
{number:n,unit:i}=e;if(isFinite(n)||(n=r.number,i=r.unit),null==i)return e;const a=t[i];return null==a?r:a(e)}})();var _a$a,_b$8,_c$2,_d$2;const $slot=Symbol("slot"),$referenceCount=Symbol("referenceCount"),$updateVisibility=Symbol("updateVisibility"),$visible=Symbol("visible"),$onSlotchange=Symbol("onSlotchange"),$slotchangeHandler=Symbol("slotchangeHandler");class Hotspot extends CSS2DObject
{constructor(e)
{super(document.createElement("div")),this.normal=new Vector3(0,1,0),this[_a$a]=!1,this[_b$8]=1,this[_c$2]=document.createElement("slot"),this[_d$2]=(()=>this[$onSlotchange]()),this.element.classList.add("annotation-wrapper"),this[$slot].name=e.name,this[$slot].addEventListener("slotchange",this[$slotchangeHandler]),this.element.appendChild(this[$slot]),this.updatePosition(e.position),this.updateNormal(e.normal),this.show()}
show()
{this[$visible]||(this[$visible]=!0,this[$updateVisibility]({notify:!0}))}
hide()
{this[$visible]&&(this[$visible]=!1,this[$updateVisibility]({notify:!0}))}
dispose()
{this[$slot].removeEventListener("slotchange",this[$slotchangeHandler])}
increment()
{this[$referenceCount]++}
decrement()
{return this[$referenceCount]>0&&--this[$referenceCount],0===this[$referenceCount]}
updatePosition(e)
{if(null==e)return;const t=parseExpressions(e)[0].terms;for(let e=0;e<3;++e)this.position.setComponent(e,normalizeUnit(t[e]).number)}
updateNormal(e)
{if(null==e)return;const t=parseExpressions(e)[0].terms;for(let e=0;e<3;++e)this.normal.setComponent(e,normalizeUnit(t[e]).number)}[(_a$a=$visible,_b$8=$referenceCount,_c$2=$slot,_d$2=$slotchangeHandler,$updateVisibility)]({notify:e})
{this[$visible]?this.element.classList.remove("hide"):this.element.classList.add("hide"),this[$slot].assignedNodes().forEach(t=>{if(t.nodeType!==Node.ELEMENT_NODE)return;const r=t,n=r.dataset.visibilityAttribute;if(null!=n)
{const e=`data-${n}`;this[$visible]?r.setAttribute(e,""):r.removeAttribute(e)}
e&&r.dispatchEvent(new CustomEvent("hotspot-visibility",{detail:{visible:this[$visible]}}))})}[$onSlotchange]()
{this[$updateVisibility]({notify:!1})}}
const $annotationRenderer=Symbol("annotationRenderer"),$updateHotspots=Symbol("updateHotspots"),$hotspotMap=Symbol("hotspotMap"),$mutationCallback=Symbol("mutationCallback"),$observer=Symbol("observer"),$pixelPosition=Symbol("pixelPosition"),$addHotspot=Symbol("addHotspot"),$removeHotspot=Symbol("removeHotspot"),raycaster=new Raycaster,AnnotationMixin=e=>{var t,r,n,i,a;return class extends e
{constructor(...e)
{super(...e),this[t]=new CSS2DRenderer,this[r]=new Map,this[n]=(e=>{e.forEach(e=>{e instanceof MutationRecord&&"childList"!==e.type||(e.addedNodes.forEach(e=>{this[$addHotspot](e)}),e.removedNodes.forEach(e=>{this[$removeHotspot](e)}))})}),this[i]=new MutationObserver(this[$mutationCallback]),this[a]=new Vector2;const{domElement:o}=this[$annotationRenderer];o.classList.add("annotation-container"),this.shadowRoot.querySelector(".container").appendChild(o)}
connectedCallback()
{super.connectedCallback();for(let e=0;e<this.children.length;++e)this[$addHotspot](this.children[e]);const{ShadyDOM:e}=self;null==e?this[$observer].observe(this,{childList:!0}):this[$observer]=e.observeChildren(this,this[$mutationCallback])}
disconnectedCallback()
{super.disconnectedCallback();const{ShadyDOM:e}=self;null==e?this[$observer].disconnect():e.unobserveChildren(this[$observer])}
updateHotspot(e)
{const t=this[$hotspotMap].get(e.name);null!=t&&(t.updatePosition(e.position),t.updateNormal(e.normal))}
positionAndNormalFromPoint(e,t)
{const
{width:r,height:n}=this[$scene];this[$pixelPosition].set(e/r,t/n).multiplyScalar(2).subScalar(1),this[$pixelPosition].y*=-1,raycaster.setFromCamera(this[$pixelPosition],this[$scene].getCamera());const i=raycaster.intersectObject(this[$scene],!0);if(0===i.length)return null;const a=i[0];if(null==a.face)return null;const o=(new Matrix4).getInverse(this[$scene].pivot.matrixWorld);return{position:toVector3D(a.point.applyMatrix4(o)),normal:toVector3D(a.face.normal.applyMatrix4(a.object.matrixWorld).applyMatrix4(o))}}[(t=$annotationRenderer,r=$hotspotMap,n=$mutationCallback,i=$observer,a=$pixelPosition,$tick$1)](e,t)
{super[$tick$1](e,t),this[$updateHotspots](),this[$annotationRenderer].render(this[$scene],this[$scene].activeCamera)}[$onResize](e)
{super[$onResize](e),this[$annotationRenderer].setSize(e.width,e.height)}[$updateHotspots]()
{const
{children:e}=this[$scene].pivot;for(let t=0,r=e.length;t<r;t++)
{const r=e[t];if(r instanceof Hotspot)
{const e=this[$scene].activeCamera.position.clone();e.sub(r.position);const t=r.normal.clone().transformDirection(this[$scene].pivot.matrixWorld);e.dot(t)<0?r.hide():r.show()}}}[$addHotspot](e)
{if(!(e instanceof HTMLElement&&0===e.slot.indexOf("hotspot")))return;let t=this[$hotspotMap].get(e.slot);null!=t?t.increment():(t=new Hotspot({name:e.slot,position:e.dataset.position,normal:e.dataset.normal}),this[$hotspotMap].set(e.slot,t),this[$scene].pivot.add(t))}[$removeHotspot](e)
{if(!(e instanceof HTMLElement))return;const t=this[$hotspotMap].get(e.slot);t&&t.decrement()&&(this[$scene].pivot.remove(t),this[$hotspotMap].delete(e.slot),t.dispose())}}},enumerationDeserializer=e=>t=>{try
{const r=parseExpressions(t),n=(r.length?r[0].terms:[]).filter(e=>e&&"ident"===e.type).map(e=>e.value).filter(t=>e.indexOf(t)>-1),i=new Set;for(const e of n)i.add(e);return i}
catch(e)
{}
return new Set};var __decorate$2=function(e,t,r,n)
{for(var i,a=arguments.length,o=a<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n,s=e.length-1;s>=0;s--)(i=e[s])&&(o=(a<3?i(o):a>3?i(t,r,o):i(t,r))||o);return a>3&&o&&Object.defineProperty(t,r,o),o};const openIOSARQuickLook=(()=>{const e=document.createElement("a");return e.setAttribute("rel","ar"),e.appendChild(document.createElement("img")),t=>{e.setAttribute("href",t),e.click()}})(),openSceneViewer=(()=>{const e=document.createElement("a"),t=/(link|title)(=|&)|(\?|&)(link|title)$/;let r=!1;return(n,i,a)=>{if(r)return;const o=self.location.toString(),s=new URL(o),l=new URL(n),c=encodeURIComponent(o),h=l.protocol.replace(":","");l.search&&l.search.match(t)&&console.warn(`The model URL (${l.toString()}) contains a "link" and/or "title" query parameter.\n These parameters are used to configure Scene Viewer and will be duplicated in the URL.\n You should choose different query parameter names if possible!`),s.hash="#model-viewer-no-ar-fallback",i=encodeURIComponent(i),l.protocol="intent://",l.search+=(l.search?"&":"")+`link=${c}&title=${i}`,"fixed"===a&&(l.search+="&resizable=false");const u=`${l.toString()}#Intent;scheme=${h};package=com.google.ar.core;action=android.intent.action.VIEW;S.browser_fallback_url=${encodeURIComponent(s.toString())};end;`;self.addEventListener("hashchange",()=>{"#model-viewer-no-ar-fallback"!==self.location.hash||r||(r=!0,self.history.back())},{once:!0}),e.setAttribute("href",u),e.click()}})(),deserializeQuickLookBrowsers=enumerationDeserializer(["safari","chrome"]),ARMode={QUICK_LOOK:"quick-look",AR_VIEWER:"ar-viewer",UNSTABLE_WEBXR:"unstable-webxr",NONE:"none"},$exitFullscreenButtonContainer=Symbol("exitFullscreenButtonContainer"),$arButtonContainer=Symbol("arButtonContainer"),$defaultExitFullscreenButton=Symbol("defaultExitFullscreenButton"),$enterARWithWebXR=Symbol("enterARWithWebXR"),$canActivateAR=Symbol("canActivateAR"),$arMode=Symbol("arMode"),$canLaunchQuickLook=Symbol("canLaunchQuickLook"),$quickLookBrowsers=Symbol("quickLookBrowsers"),$arButtonContainerFallbackClickHandler=Symbol("arButtonContainerFallbackClickHandler"),$onARButtonContainerFallbackClick=Symbol("onARButtonContainerFallbackClick"),$arButtonContainerClickHandler=Symbol("arButtonContainerClickHandler"),$onARButtonContainerClick=Symbol("onARButtonContainerClick"),$exitFullscreenButtonContainerClickHandler=Symbol("exitFullscreenButtonContainerClickHandler"),$onExitFullscreenButtonClick=Symbol("onExitFullscreenButtonClick"),$fullscreenchangeHandler=Symbol("fullscreenHandler"),$onFullscreenchange=Symbol("onFullscreen"),ARMixin=e=>{var t,r,n,i,a,o,s,l,c,h;class u extends e
{constructor()
{super(...arguments),this.ar=!1,this.arScale="auto",this.unstableWebxr=!1,this.iosSrc=null,this.quickLookBrowsers="safari",this[t]=!1,this[r]=this.shadowRoot.querySelector(".ar-button"),this[n]=this.shadowRoot.querySelector(".slot.exit-fullscreen-button"),this[i]=this.shadowRoot.querySelector("#default-exit-fullscreen-button"),this[a]=(e=>this[$onARButtonContainerFallbackClick](e)),this[o]=(e=>this[$onARButtonContainerClick](e)),this[s]=(()=>this[$onExitFullscreenButtonClick]()),this[l]=(()=>this[$onFullscreenchange]()),this[c]=ARMode.NONE,this[h]=new Set}
get canActivateAR()
{return this[$arMode]!==ARMode.NONE}
async activateAR()
{switch(this[$arMode])
{case ARMode.QUICK_LOOK:openIOSARQuickLook(this.iosSrc);break;case ARMode.UNSTABLE_WEBXR:await this[$enterARWithWebXR]();break;case ARMode.AR_VIEWER:openSceneViewer(this.src,this.alt||"",this.arScale);break;default:console.warn("No AR Mode can be activated. This is probably due to missing configuration or device capabilities")}}
connectedCallback()
{super.connectedCallback(),document.addEventListener("fullscreenchange",this[$fullscreenchangeHandler])}
disconnectedCallback()
{super.disconnectedCallback(),document.removeEventListener("fullscreenchange",this[$fullscreenchangeHandler])}[(t=$canActivateAR,r=$arButtonContainer,n=$exitFullscreenButtonContainer,i=$defaultExitFullscreenButton,a=$arButtonContainerFallbackClickHandler,o=$arButtonContainerClickHandler,s=$exitFullscreenButtonContainerClickHandler,l=$fullscreenchangeHandler,c=$arMode,h=$quickLookBrowsers,$onExitFullscreenButtonClick)]()
{document.fullscreenElement===this&&document.exitFullscreen()}[$onFullscreenchange]()
{const e=this[$scene];if(document.fullscreenElement===this?this[$container].classList.add("fullscreen"):this[$container].classList.remove("fullscreen"),document.fullscreenElement!==this&&this[$renderer].presentedScene===e)try
{this[$renderer].stopPresenting()}
catch(e)
{console.warn("Unexpected error while stopping AR presentation"),console.error(e)}}
async[$enterARWithWebXR]()
{console.log("Attempting to present in AR...");try
{await this[$renderer].present(this[$scene])}
catch(e)
{console.warn("Error while trying to present to AR"),console.error(e)}}
async update(e)
{if(super.update(e),e.has("quickLookBrowsers")&&(this[$quickLookBrowsers]=deserializeQuickLookBrowsers(this.quickLookBrowsers)),!(e.has("unstableWebxr")||e.has("iosSrc")||e.has("ar")||e.has("src")||e.has("alt")))return;const t=this.unstableWebxr&&IS_WEBXR_AR_CANDIDATE&&await this[$renderer].supportsPresentation(),r=IS_ANDROID&&this.ar,n=IS_IOS&&IS_AR_QUICKLOOK_CANDIDATE&&!!this.iosSrc,i=t||r||n;this[$arMode]=t?ARMode.UNSTABLE_WEBXR:r?ARMode.AR_VIEWER:n?ARMode.QUICK_LOOK:ARMode.NONE,i?(this[$arButtonContainer].classList.add("enabled"),this[$arButtonContainer].addEventListener("click",this[$arButtonContainerClickHandler]),this[$arButtonContainer].addEventListener("click",this[$arButtonContainerFallbackClickHandler]),this[$exitFullscreenButtonContainer].addEventListener("click",this[$exitFullscreenButtonContainerClickHandler]),navigator.userAgent.match(/android/i)&&(navigator.userAgent.match(/SM-G93/i)||navigator.userAgent.match(/SM-G94/i)||navigator.userAgent.match(/SM-G95/i)||navigator.userAgent.match(/SM-G96/i)||navigator.userAgent.match(/SM-G97/i)||navigator.userAgent.match(/SM-N97/i)||navigator.userAgent.match(/SM-N99/i)||navigator.userAgent.match(/SM-G98/i)||navigator.userAgent.match(/Z01QD/i)||navigator.userAgent.match(/ZS600KL/i)||navigator.userAgent.match(/I001D/i)||navigator.userAgent.match(/I001DE/i)||navigator.userAgent.match(/I001DA/i)||navigator.userAgent.match(/ZS630KL/i)||navigator.userAgent.match(/I01WD/i)||navigator.userAgent.match(/V570KL/i)||navigator.userAgent.match(/A002/i)||navigator.userAgent.match(/ZS571KL/i)||navigator.userAgent.match(/GA011/i)||navigator.userAgent.match(/G020/i)||navigator.userAgent.match(/GM190/i)||navigator.userAgent.match(/HD19/i)||navigator.userAgent.match(/A60/i)||navigator.userAgent.match(/A50/i)||navigator.userAgent.match(/SM-T83/i)||navigator.userAgent.match(/SM-T72/i)||navigator.userAgent.match(/SM-T86/i)||navigator.userAgent.match(/H94/i)||navigator.userAgent.match(/J82/i)||navigator.userAgent.match(/M190/i)||navigator.userAgent.match(/M180/i)||navigator.userAgent.match(/SM-A805/i)||navigator.userAgent.match(/SM-A705/i)||navigator.userAgent.match(/SM-A606/i)||navigator.userAgent.match(/SM-A50/i)||navigator.userAgent.match(/SM-A405/i)||navigator.userAgent.match(/SM-A730/i)||navigator.userAgent.match(/XT2027/i)||navigator.userAgent.match(/Xperia Z2/i)||navigator.userAgent.match(/SO-03F/i)||navigator.userAgent.match(/D6502/i)||navigator.userAgent.match(/D6503/i)||navigator.userAgent.match(/SGP5/i)||navigator.userAgent.match(/D6563/i)||navigator.userAgent.match(/D66/i)||navigator.userAgent.match(/SO-01G/i)||navigator.userAgent.match(/SOL26/i)||navigator.userAgent.match(/D67/i)||navigator.userAgent.match(/J91/i)||navigator.userAgent.match(/J81/i)||navigator.userAgent.match(/J92/i)||navigator.userAgent.match(/CLT-TL/i)||navigator.userAgent.match(/CLT-AL/i)||navigator.userAgent.match(/CLT-L/i)||navigator.userAgent.match(/HW-01K/i)||navigator.userAgent.match(/EML-L/i)||navigator.userAgent.match(/EML-A/i)||navigator.userAgent.match(/EML-T/i)||navigator.userAgent.match(/VOG-L/i)||navigator.userAgent.match(/VOG-A/i)||navigator.userAgent.match(/VOG-T/i)||navigator.userAgent.match(/ELE/i)||navigator.userAgent.match(/H82/i)||navigator.userAgent.match(/702/i)||navigator.userAgent.match(/SOV/i)||navigator.userAgent.match(/H81/i)||navigator.userAgent.match(/H83/i)||navigator.userAgent.match(/SM-N96/i)||navigator.userAgent.match(/SM-N95/i)||navigator.userAgent.match(/SM-A51/i))||navigator.userAgent.match(/iPhone/i)||navigator.userAgent.match(/iPad/i)||document.getElementById("inplace-viewer_ar_btn")&&(document.getElementById("inplace-viewer_ar_btn").style.display="none")):(this[$arButtonContainer].removeEventListener("click",this[$arButtonContainerClickHandler]),this[$arButtonContainer].removeEventListener("click",this[$arButtonContainerFallbackClickHandler]),this[$exitFullscreenButtonContainer].removeEventListener("click",this[$exitFullscreenButtonContainerClickHandler]),this[$arButtonContainer].classList.remove("enabled"),document.getElementById("inplace-viewer_ar_btn")&&(document.getElementById("inplace-viewer_ar_btn").style.display="none"))}[$onARButtonContainerFallbackClick](e)
{this[$arMode]===ARMode.AR_VIEWER&&this.requestFullscreen()}[$onARButtonContainerClick](e)
{e.preventDefault(),this.activateAR()}
get[$canLaunchQuickLook]()
{return IS_IOS_CHROME?this[$quickLookBrowsers].has("chrome"):!!IS_IOS_SAFARI&&this[$quickLookBrowsers].has("safari")}}
return __decorate$2([property({type:Boolean,attribute:"ar"})],u.prototype,"ar",void 0),__decorate$2([property({type:String,attribute:"ar-scale"})],u.prototype,"arScale",void 0),__decorate$2([property({type:Boolean,attribute:"unstable-webxr"})],u.prototype,"unstableWebxr",void 0),__decorate$2([property({converter:{fromAttribute:deserializeUrl},attribute:"ios-src"})],u.prototype,"iosSrc",void 0),__decorate$2([property({type:String,attribute:"quick-look-browsers"})],u.prototype,"quickLookBrowsers",void 0),u};var _a$b,_b$9,_c$3;const $evaluate=Symbol("evaluate"),$lastValue=Symbol("lastValue");class Evaluator
{constructor()
{this[_a$b]=null}
static evaluatableFor(e,t=ZERO)
{if(e instanceof Evaluator)return e;if("number"===e.type)return"%"===e.unit?new PercentageEvaluator(e,t):e;switch(e.name.value)
{case "calc":return new CalcEvaluator(e,t);case "env":return new EnvEvaluator(e)}
return ZERO}
static evaluate(e)
{return e instanceof Evaluator?e.evaluate():e}
static isConstant(e)
{return!(e instanceof Evaluator)||e.isConstant}
static applyIntrinsics(e,t)
{const
{basis:r,keywords:n}=t,{auto:i}=n;return r.map((t,r)=>{const a=null==i[r]?t:i[r];let o=e[r]?e[r]:a;if("ident"===o.type)
{const e=o.value;e in n&&(o=n[e][r])}
return null!=o&&"ident"!==o.type||(o=a),"%"===o.unit?numberNode(o.number/100*t.number,t.unit):(o=normalizeUnit(o,t)).unit!==t.unit?t:o})}
get isConstant()
{return!1}
evaluate()
{return this.isConstant&&null!=this[$lastValue]||(this[$lastValue]=this[$evaluate]()),this[$lastValue]}}
_a$b=$lastValue;const $percentage=Symbol("percentage"),$basis=Symbol("basis");class PercentageEvaluator extends Evaluator
{constructor(e,t)
{super(),this[$percentage]=e,this[$basis]=t}
get isConstant()
{return!0}[$evaluate]()
{return numberNode(this[$percentage].number/100*this[$basis].number,this[$basis].unit)}}
const $identNode=Symbol("identNode");class EnvEvaluator extends Evaluator
{constructor(e)
{super(),this[_b$9]=null;const t=e.arguments.length?e.arguments[0].terms[0]:null;null!=t&&"ident"===t.type&&(this[$identNode]=t)}
get isConstant()
{return!1}[(_b$9=$identNode,$evaluate)]()
{if(null!=this[$identNode])switch(this[$identNode].value)
{case "window-scroll-y":return{type:"number",number:window.pageYOffset/(Math.max(document.body.scrollHeight,document.body.offsetHeight,document.documentElement.clientHeight,document.documentElement.scrollHeight,document.documentElement.offsetHeight)-window.innerHeight)||0,unit:null}}
return ZERO}}
const IS_MULTIPLICATION_RE=/[\*\/]/,$evaluator=Symbol("evalutor");class CalcEvaluator extends Evaluator
{constructor(e,t=ZERO)
{if(super(),this[_c$3]=null,1!==e.arguments.length)return;const r=e.arguments[0].terms.slice(),n=[];for(;r.length;)
{const e=r.shift();if(n.length>0)
{const r=n[n.length-1];if("operator"===r.type&&IS_MULTIPLICATION_RE.test(r.value))
{const r=n.pop(),i=n.pop();if(null==i)return;n.push(new OperatorEvaluator(r,Evaluator.evaluatableFor(i,t),Evaluator.evaluatableFor(e,t)));continue}}
n.push("operator"===e.type?e:Evaluator.evaluatableFor(e,t))}
for(;n.length>2;)
{const[e,r,i]=n.splice(0,3);if("operator"!==r.type)return;n.unshift(new OperatorEvaluator(r,Evaluator.evaluatableFor(e,t),Evaluator.evaluatableFor(i,t)))}
1===n.length&&(this[$evaluator]=n[0])}
get isConstant()
{return null==this[$evaluator]||Evaluator.isConstant(this[$evaluator])}[(_c$3=$evaluator,$evaluate)]()
{return null!=this[$evaluator]?Evaluator.evaluate(this[$evaluator]):ZERO}}
const $operator=Symbol("operator"),$left=Symbol("left"),$right=Symbol("right");class OperatorEvaluator extends Evaluator
{constructor(e,t,r)
{super(),this[$operator]=e,this[$left]=t,this[$right]=r}
get isConstant()
{return Evaluator.isConstant(this[$left])&&Evaluator.isConstant(this[$right])}[$evaluate]()
{const e=normalizeUnit(Evaluator.evaluate(this[$left])),t=normalizeUnit(Evaluator.evaluate(this[$right])),{number:r,unit:n}=e,{number:i,unit:a}=t;if(null!=a&&null!=n&&a!=n)return ZERO;const o=n||a;let s;switch(this[$operator].value)
{case "+":s=r+i;break;case "-":s=r-i;break;case "/":s=r/i;break;case "*":s=r*i;break;default:return ZERO}
return{type:"number",number:s,unit:o}}}
const $evaluatables=Symbol("evaluatables"),$intrinsics=Symbol("intrinsics");class StyleEvaluator extends Evaluator
{constructor(e,t)
{super(),this[$intrinsics]=t;const r=e[0],n=null!=r?r.terms:[];this[$evaluatables]=t.basis.map((e,t)=>{const r=n[t];return null==r?{type:"ident",value:"auto"}:"ident"===r.type?r:Evaluator.evaluatableFor(r,e)})}
get isConstant()
{for(const e of this[$evaluatables])
if(!Evaluator.isConstant(e))return!1;return!0}[$evaluate]()
{const e=this[$evaluatables].map(e=>Evaluator.evaluate(e));return Evaluator.applyIntrinsics(e,this[$intrinsics]).map(e=>e.number)}}
var _a$c,_b$a,_c$4,_d$3;const $instances=Symbol("instances"),$activateListener=Symbol("activateListener"),$deactivateListener=Symbol("deactivateListener"),$notifyInstances=Symbol("notifyInstances"),$notify=Symbol("notify"),$scrollCallback=Symbol("callback");class ScrollObserver
{constructor(e)
{this[$scrollCallback]=e}
static[$notifyInstances]()
{for(const e of ScrollObserver[$instances])e[$notify]()}
static[(_a$c=$instances,$activateListener)]()
{window.addEventListener("scroll",this[$notifyInstances],{passive:!0})}
static[$deactivateListener]()
{window.removeEventListener("scroll",this[$notifyInstances])}
observe()
{0===ScrollObserver[$instances].size&&ScrollObserver[$activateListener](),ScrollObserver[$instances].add(this)}
disconnect()
{ScrollObserver[$instances].delete(this),0===ScrollObserver[$instances].size&&ScrollObserver[$deactivateListener]()}[$notify]()
{this[$scrollCallback]()}}
ScrollObserver[_a$c]=new Set;const $computeStyleCallback=Symbol("computeStyleCallback"),$astWalker=Symbol("astWalker"),$dependencies=Symbol("dependencies"),$scrollHandler=Symbol("scrollHandler"),$onScroll=Symbol("onScroll");class StyleEffector
{constructor(e)
{this[_b$a]={},this[_c$4]=new ASTWalker(["function"]),this[_d$3]=(()=>this[$onScroll]()),this[$computeStyleCallback]=e}
observeEffectsFor(e)
{const t={},r=this[$dependencies];this[$astWalker].walk(e,e=>{const
{name:n}=e,i=e.arguments[0].terms[0];if("env"===n.value&&null!=i&&"ident"===i.type)switch(i.value)
{case "window-scroll-y":if(null==t["window-scroll"])
{const e="window-scroll" in r?r["window-scroll"]:new ScrollObserver(this[$scrollHandler]);e.observe(),delete r["window-scroll"],t["window-scroll"]=e}}});for(const e in r)
{r[e].disconnect()}
this[$dependencies]=t}
dispose()
{for(const e in this[$dependencies])
{this[$dependencies][e].disconnect()}}[(_b$a=$dependencies,_c$4=$astWalker,_d$3=$scrollHandler,$onScroll)]()
{this[$computeStyleCallback]({relatedState:"window-scroll"})}}
const style=e=>{const t=e.observeEffects||!1,r=e.intrinsics instanceof Function?e.intrinsics:()=>e.intrinsics;return(n,i)=>{const a=n.updated,o=n.connectedCallback,s=n.disconnectedCallback,l=Symbol(`${i}StyleEffector`),c=Symbol(`${i}StyleEvaluator`),h=Symbol(`${i}UpdateEvaluator`),u=Symbol(`${i}EvaluateAndSync`);Object.defineProperties(n,{[l]:{value:null,writable:!0},[c]:{value:null,writable:!0},[h]:{value:function()
{const e=parseExpressions(this[i]);this[c]=new StyleEvaluator(e,r(this)),null==this[l]&&t&&(this[l]=new StyleEffector(()=>this[u]())),null!=this[l]&&this[l].observeEffectsFor(e)}},[u]:{value:function()
{if(null==this[c])return;const t=this[c].evaluate();this[e.updateHandler](t)}},updated:{value:function(e)
{e.has(i)&&(this[h](),this[u]()),a.call(this,e)}},connectedCallback:{value:function()
{o.call(this),this.requestUpdate(i,this[i])}},disconnectedCallback:{value:function()
{s.call(this),null!=this[l]&&(this[l].dispose(),this[l]=null)}}})}};var _a$d,_b$b,_c$5,_d$4,_e$2,_f$2,_g$2,_h$1,_j$1,_k$1,_l,_m,_o,_p,_q,_r,_s;const DEFAULT_OPTIONS=Object.freeze({minimumRadius:0,maximumRadius:1/0,minimumPolarAngle:Math.PI/8,maximumPolarAngle:Math.PI-Math.PI/8,minimumAzimuthalAngle:-1/0,maximumAzimuthalAngle:1/0,minimumFieldOfView:10,maximumFieldOfView:45,eventHandlingBehavior:"prevent-all",interactionPolicy:"always-allow"}),$velocity=Symbol("velocity"),$spherical=Symbol("spherical"),$goalSpherical=Symbol("goalSpherical"),$thetaDamper=Symbol("thetaDamper"),$phiDamper=Symbol("phiDamper"),$radiusDamper=Symbol("radiusDamper"),$logFov=Symbol("fov"),$goalLogFov=Symbol("goalLogFov"),$fovDamper=Symbol("fovDamper"),$target=Symbol("target"),$goalTarget=Symbol("goalTarget"),$targetDamperX=Symbol("targetDamperX"),$targetDamperY=Symbol("targetDamperY"),$targetDamperZ=Symbol("targetDamperZ"),$options=Symbol("options"),$touchMode=Symbol("touchMode"),$canInteract=Symbol("canInteract"),$interactionEnabled=Symbol("interactionEnabled"),$userAdjustOrbit=Symbol("userAdjustOrbit"),$isUserChange=Symbol("isUserChange"),$isStationary=Symbol("isMoving"),$moveCamera=Symbol("moveCamera"),$isUserPointing=Symbol("isUserPointing"),$pointerIsDown=Symbol("pointerIsDown"),$lastPointerPosition=Symbol("lastPointerPosition"),$lastTouches=Symbol("lastTouches"),$pixelLengthToSphericalAngle=Symbol("pixelLengthToSphericalAngle"),$twoTouchDistance=Symbol("twoTouchDistance"),$wrapAngle=Symbol("wrapAngle"),$onMouseMove=Symbol("onMouseMove"),$onMouseDown=Symbol("onMouseDown"),$onMouseUp=Symbol("onMouseUp"),$onTouchStart=Symbol("onTouchStart"),$onTouchEnd=Symbol("onTouchEnd"),$onTouchMove=Symbol("onTouchMove"),$onWheel=Symbol("onWheel"),$onKeyDown=Symbol("onKeyDown"),$handlePointerMove=Symbol("handlePointerMove"),$handleSinglePointerMove=Symbol("handleSinglePointerMove"),$handlePointerDown=Symbol("handlePointerDown"),$handleSinglePointerDown=Symbol("handleSinglePointerDown"),$handlePointerUp=Symbol("handlePointerUp"),$handleWheel=Symbol("handleWheel"),$handleKey=Symbol("handleKey"),TOUCH_EVENT_RE=/^touch(start|end|move)$/,KEYBOARD_ORBIT_INCREMENT=Math.PI/8,ZOOM_SENSITIVITY=.1,DECAY_MILLISECONDS=50,NATURAL_FREQUENCY=1/DECAY_MILLISECONDS,NIL_SPEED=2e-4*NATURAL_FREQUENCY,KeyCode={PAGE_UP:33,PAGE_DOWN:34,LEFT:37,UP:38,RIGHT:39,DOWN:40},ChangeSource={USER_INTERACTION:"user-interaction",NONE:"none"};class Damper
{constructor()
{this[_a$d]=0}
update(e,t,r,n)
{if(null==e)return t;if(e===t&&0===this[$velocity])return t;if(r<0)return e;const i=e-t,a=this[$velocity]+NATURAL_FREQUENCY*i,o=i+r*a,s=Math.exp(-NATURAL_FREQUENCY*r),l=(a-NATURAL_FREQUENCY*o)*s,c=-NATURAL_FREQUENCY*(l+a*s);return Math.abs(l)<NIL_SPEED*n&&c*i>=0?(this[$velocity]=0,t):(this[$velocity]=l,t+o*s)}}
_a$d=$velocity;class SmoothControls extends EventDispatcher
{constructor(e,t)
{super(),this.camera=e,this.element=t,this[_b$b]=!1,this[_c$5]=!1,this[_d$4]=!1,this[_e$2]=new Spherical,this[_f$2]=new Spherical,this[_g$2]=new Damper,this[_h$1]=new Damper,this[_j$1]=new Damper,this[_k$1]=new Damper,this[_l]=new Vector3,this[_m]=new Vector3,this[_o]=new Damper,this[_p]=new Damper,this[_q]=new Damper,this[_r]=!1,this[_s]={clientX:0,clientY:0},this[$onMouseMove]=(e=>this[$handlePointerMove](e)),this[$onMouseDown]=(e=>this[$handlePointerDown](e)),this[$onMouseUp]=(e=>this[$handlePointerUp](e)),this[$onWheel]=(e=>this[$handleWheel](e)),this[$onKeyDown]=(e=>this[$handleKey](e)),this[$onTouchStart]=(e=>this[$handlePointerDown](e)),this[$onTouchEnd]=(e=>this[$handlePointerUp](e)),this[$onTouchMove]=(e=>this[$handlePointerMove](e)),this[$options]=Object.assign({},DEFAULT_OPTIONS),this.setOrbit(0,Math.PI/2,1),this.setFieldOfView(100),this.jumpToGoal()}
get interactionEnabled()
{return this[$interactionEnabled]}
enableInteraction()
{if(!1===this[$interactionEnabled])
{const
{element:e}=this;e.addEventListener("mousemove",this[$onMouseMove]),e.addEventListener("mousedown",this[$onMouseDown]),e.addEventListener("wheel",this[$onWheel]),e.addEventListener("keydown",this[$onKeyDown]),e.addEventListener("touchstart",this[$onTouchStart]),e.addEventListener("touchmove",this[$onTouchMove]),self.addEventListener("mouseup",this[$onMouseUp]),self.addEventListener("touchend",this[$onTouchEnd]),this.element.style.cursor="grab",this[$interactionEnabled]=!0}}
disableInteraction()
{if(!0===this[$interactionEnabled])
{const
{element:e}=this;e.removeEventListener("mousemove",this[$onMouseMove]),e.removeEventListener("mousedown",this[$onMouseDown]),e.removeEventListener("wheel",this[$onWheel]),e.removeEventListener("keydown",this[$onKeyDown]),e.removeEventListener("touchstart",this[$onTouchStart]),e.removeEventListener("touchmove",this[$onTouchMove]),self.removeEventListener("mouseup",this[$onMouseUp]),self.removeEventListener("touchend",this[$onTouchEnd]),e.style.cursor="",this[$interactionEnabled]=!1}}
get options()
{return this[$options]}
getCameraSpherical(e=new Spherical)
{return e.copy(this[$spherical])}
getFieldOfView()
{return this.camera.fov}
applyOptions(e)
{Object.assign(this[$options],e),this.setOrbit(),this.setFieldOfView(Math.exp(this[$goalLogFov])),this.jumpToGoal()}
updateNearFar(e,t)
{this.camera.near=Math.max(e,t/1e3),this.camera.far=t,this.camera.updateProjectionMatrix()}
updateAspect(e)
{this.camera.aspect=e,this.camera.updateProjectionMatrix()}
setOrbit(e=this[$goalSpherical].theta,t=this[$goalSpherical].phi,r=this[$goalSpherical].radius)
{const
{minimumAzimuthalAngle:n,maximumAzimuthalAngle:i,minimumPolarAngle:a,maximumPolarAngle:o,minimumRadius:s,maximumRadius:l}=this[$options],{theta:c,phi:h,radius:u}=this[$goalSpherical],d=clamp(e,n,i);isFinite(n)||isFinite(i)||(this[$spherical].theta=this[$wrapAngle](this[$spherical].theta-d)+d);const p=clamp(t,a,o),m=clamp(r,s,l);return(d!==c||p!==h||m!==u)&&(this[$goalSpherical].theta=d,this[$goalSpherical].phi=p,this[$goalSpherical].radius=m,this[$goalSpherical].makeSafe(),this[$isUserChange]=!1,!0)}
setRadius(e)
{this[$goalSpherical].radius=e,this.setOrbit()}
setFieldOfView(e)
{const
{minimumFieldOfView:t,maximumFieldOfView:r}=this[$options];e=clamp(e,t,r),this[$goalLogFov]=Math.log(e)}
setTarget(e,t,r)
{this[$goalTarget].set(e,t,r)}
getTarget()
{return this[$target].clone()}
adjustOrbit(e,t,r,n)
{const
{theta:i,phi:a,radius:o}=this[$goalSpherical],s=this[$spherical].theta-i,l=Math.PI-.001,c=i-clamp(e,-l-s,l-s),h=a-t,u=o+r;let d=this.setOrbit(c,h,u);if(0!==n)
{const e=this[$goalLogFov]+n;this.setFieldOfView(Math.exp(e)),d=!0}
return d}
jumpToGoal()
{this.update(0,100*DECAY_MILLISECONDS)}
update(e,t)
{if(this[$isStationary]())return;const{maximumPolarAngle:r,maximumRadius:n,maximumFieldOfView:i}=this[$options],a=this[$spherical].theta-this[$goalSpherical].theta;Math.abs(a)>Math.PI&&!isFinite(this[$options].minimumAzimuthalAngle)&&!isFinite(this[$options].maximumAzimuthalAngle)&&(this[$spherical].theta-=2*Math.sign(a)*Math.PI),this[$spherical].theta=this[$thetaDamper].update(this[$spherical].theta,this[$goalSpherical].theta,t,Math.PI),this[$spherical].phi=this[$phiDamper].update(this[$spherical].phi,this[$goalSpherical].phi,t,r),this[$spherical].radius=this[$radiusDamper].update(this[$spherical].radius,this[$goalSpherical].radius,t,n),this[$logFov]=this[$fovDamper].update(this[$logFov],this[$goalLogFov],t,i),this[$target].x=this[$targetDamperX].update(this[$target].x,this[$goalTarget].x,t,n),this[$target].y=this[$targetDamperY].update(this[$target].y,this[$goalTarget].y,t,n),this[$target].z=this[$targetDamperZ].update(this[$target].z,this[$goalTarget].z,t,n),this[$moveCamera]()}[(_b$b=$interactionEnabled,_c$5=$isUserChange,_d$4=$isUserPointing,_e$2=$spherical,_f$2=$goalSpherical,_g$2=$thetaDamper,_h$1=$phiDamper,_j$1=$radiusDamper,_k$1=$fovDamper,_l=$target,_m=$goalTarget,_o=$targetDamperX,_p=$targetDamperY,_q=$targetDamperZ,_r=$pointerIsDown,_s=$lastPointerPosition,$isStationary)]()
{return this[$goalSpherical].theta===this[$spherical].theta&&this[$goalSpherical].phi===this[$spherical].phi&&this[$goalSpherical].radius===this[$spherical].radius&&this[$goalLogFov]===this[$logFov]&&this[$goalTarget].equals(this[$target])}[$moveCamera]()
{this[$spherical].makeSafe(),this.camera.position.setFromSpherical(this[$spherical]),this.camera.position.add(this[$target]),this.camera.setRotationFromEuler(new Euler(this[$spherical].phi-Math.PI/2,this[$spherical].theta,0,"YXZ")),this.camera.fov!==Math.exp(this[$logFov])&&(this.camera.fov=Math.exp(this[$logFov]),this.camera.updateProjectionMatrix());const e=this[$isUserChange]?ChangeSource.USER_INTERACTION:ChangeSource.NONE;this.dispatchEvent({type:"change",source:e})}
get[$canInteract]()
{if("allow-when-focused"==this[$options].interactionPolicy)
{return this.element.getRootNode().activeElement===this.element}
return"always-allow"===this[$options].interactionPolicy}[$userAdjustOrbit](e,t,r,n)
{const i=this.adjustOrbit(e,t,r,n);return this[$isUserChange]=!0,this.dispatchEvent({type:"change",source:ChangeSource.USER_INTERACTION}),i}[$wrapAngle](e)
{const t=(e+Math.PI)/(2*Math.PI);return 2*(t-Math.floor(t))*Math.PI-Math.PI}[$pixelLengthToSphericalAngle](e)
{return 2*Math.PI*e/this.element.clientHeight}[$twoTouchDistance](e,t)
{const
{clientX:r,clientY:n}=e,{clientX:i,clientY:a}=t,o=i-r,s=a-n;return Math.sqrt(o*o+s*s)}[$handlePointerMove](e)
{if(!this[$pointerIsDown]||!this[$canInteract])return;let t=!1;if(TOUCH_EVENT_RE.test(e.type))
{const
{touches:r}=e;switch(this[$touchMode])
{case "zoom":if(this[$lastTouches].length>1&&r.length>1)
{const e=this[$twoTouchDistance](this[$lastTouches][0],this[$lastTouches][1]),n=this[$twoTouchDistance](r[0],r[1]),i=-1*ZOOM_SENSITIVITY*(n-e)/10;t=this[$userAdjustOrbit](0,0,0,i)}
break;case "rotate":t=this[$handleSinglePointerMove](r[0])}
this[$lastTouches]=r}
else t=this[$handleSinglePointerMove](e);(t||"prevent-all"===this[$options].eventHandlingBehavior)&&e.cancelable&&e.preventDefault()}[$handleSinglePointerMove](e)
{const
{clientX:t,clientY:r}=e,n=this[$pixelLengthToSphericalAngle](t-this[$lastPointerPosition].clientX),i=this[$pixelLengthToSphericalAngle](r-this[$lastPointerPosition].clientY);return this[$lastPointerPosition].clientX=t,this[$lastPointerPosition].clientY=r,!1===this[$isUserPointing]&&(this[$isUserPointing]=!0,this.dispatchEvent({type:"pointer-change-start",pointer:Object.assign({},e)})),this[$userAdjustOrbit](n,i,0,0)}[$handlePointerDown](e)
{if(this[$pointerIsDown]=!0,this[$isUserPointing]=!1,TOUCH_EVENT_RE.test(e.type))
{const
{touches:t}=e;switch(t.length)
{default:case 1:this[$touchMode]="rotate",this[$handleSinglePointerDown](t[0]);break;case 2:this[$touchMode]="zoom"}
this[$lastTouches]=t}
else this[$handleSinglePointerDown](e)}[$handleSinglePointerDown](e)
{this[$lastPointerPosition].clientX=e.clientX,this[$lastPointerPosition].clientY=e.clientY,this.element.style.cursor="grabbing"}[$handlePointerUp](e)
{this.element.style.cursor="grab",this[$pointerIsDown]=!1,this[$isUserPointing]&&this.dispatchEvent({type:"pointer-change-end",pointer:Object.assign({},this[$lastPointerPosition])})}[$handleWheel](e)
{if(!this[$canInteract])return;const t=e.deltaY*ZOOM_SENSITIVITY/30;(this[$userAdjustOrbit](0,0,0,t)||"prevent-all"===this[$options].eventHandlingBehavior)&&e.cancelable&&e.preventDefault()}[$handleKey](e)
{let t=!1,r=!1;switch(e.keyCode)
{case KeyCode.PAGE_UP:t=!0,r=this[$userAdjustOrbit](0,0,0,ZOOM_SENSITIVITY);break;case KeyCode.PAGE_DOWN:t=!0,r=this[$userAdjustOrbit](0,0,0,-1*ZOOM_SENSITIVITY);break;case KeyCode.UP:t=!0,r=this[$userAdjustOrbit](0,-KEYBOARD_ORBIT_INCREMENT,0,0);break;case KeyCode.DOWN:t=!0,r=this[$userAdjustOrbit](0,KEYBOARD_ORBIT_INCREMENT,0,0);break;case KeyCode.LEFT:t=!0,r=this[$userAdjustOrbit](-KEYBOARD_ORBIT_INCREMENT,0,0,0);break;case KeyCode.RIGHT:t=!0,r=this[$userAdjustOrbit](KEYBOARD_ORBIT_INCREMENT,0,0,0)}
t&&(r||"prevent-all"===this[$options].eventHandlingBehavior)&&e.cancelable&&e.preventDefault()}}
const easeInOutQuad=e=>e<.5?2*e*e:(4-2*e)*e-1,interpolate=(e,t,r=easeInOutQuad)=>n=>e+(t-e)*r(n),sequence=(e,t)=>{const r=t.reduce((e,t)=>e+t,0),n=t.map(e=>e/r);return t=>{let r=0,i=1/0,a=()=>0;for(let o=0;o<n.length&&(i=n[o],a=e[o],!(t<=r+i));++o)r+=i;return a((t-r)/i)}},timeline=(e,t)=>{const r=[],n=[];let i=e;for(let e=0;e<t.length;++e)
{const a=t[e],{value:o,frames:s}=a,l=a.ease||easeInOutQuad,c=interpolate(i,o,l);r.push(c),n.push(s),i=o}
return sequence(r,n)};var __decorate$3=function(e,t,r,n)
{for(var i,a=arguments.length,o=a<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n,s=e.length-1;s>=0;s--)(i=e[s])&&(o=(a<3?i(o):a>3?i(t,r,o):i(t,r))||o);return a>3&&o&&Object.defineProperty(t,r,o),o};const PROMPT_ANIMATION_TIME=5e3,wiggle=timeline(0,[{frames:6,value:0},{frames:5,value:-1},{frames:1,value:-1},{frames:8,value:1},{frames:1,value:1},{frames:5,value:0},{frames:12,value:0}]),fade=timeline(0,[{frames:2,value:0},{frames:1,value:1},{frames:5,value:1},{frames:1,value:0},{frames:4,value:0}]),InteractionPromptStrategy={AUTO:"auto",WHEN_FOCUSED:"when-focused",NONE:"none"},InteractionPromptStyle={BASIC:"basic",WIGGLE:"wiggle"},InteractionPolicy={ALWAYS_ALLOW:"always-allow",WHEN_FOCUSED:"allow-when-focused"},DEFAULT_CAMERA_ORBIT="0deg 75deg 105%",DEFAULT_CAMERA_TARGET="auto auto auto",DEFAULT_FIELD_OF_VIEW="auto",fieldOfViewIntrinsics=e=>({basis:[numberNode(e[$zoomAdjustedFieldOfView]*Math.PI/180,"rad")],keywords:{auto:[null]}}),minFieldOfViewIntrinsics={basis:[degreesToRadians(numberNode(10,"deg"))],keywords:{auto:[null]}},maxFieldOfViewIntrinsics=e=>{const t=e[$scene];return{basis:[degreesToRadians(numberNode(45,"deg"))],keywords:{auto:[numberNode(t.framedFieldOfView,"deg")]}}},cameraOrbitIntrinsics=(()=>{const e=parseExpressions(DEFAULT_CAMERA_ORBIT)[0].terms,t=normalizeUnit(e[0]),r=normalizeUnit(e[1]);return e=>{const n=e[$scene].model.idealCameraDistance;return{basis:[t,r,numberNode(n,"m")],keywords:{auto:[null,null,numberNode(105,"%")]}}}})(),minCameraOrbitIntrinsics={basis:[numberNode(-1/0,"rad"),numberNode(Math.PI/8,"rad"),numberNode(0,"m")],keywords:{auto:[null,null,null]}},maxCameraOrbitIntrinsics={basis:[numberNode(1/0,"rad"),numberNode(Math.PI-Math.PI/8,"rad"),numberNode(1/0,"m")],keywords:{auto:[null,null,null]}},cameraTargetIntrinsics=e=>{const t=e[$scene].model.boundingBox.getCenter(new Vector3);return{basis:[numberNode(t.x,"m"),numberNode(t.y,"m"),numberNode(t.z,"m")],keywords:{auto:[null,null,null]}}},HALF_PI=Math.PI/2,THIRD_PI=Math.PI/3,QUARTER_PI=HALF_PI/2,PHI$1=2*Math.PI,AZIMUTHAL_QUADRANT_LABELS=["front","right","back","left"],POLAR_TRIENT_LABELS=["upper-","","lower-"],DEFAULT_INTERACTION_PROMPT_THRESHOLD=3e3,INTERACTION_PROMPT="Use mouse, touch or arrow keys to control the camera!",$controls=Symbol("controls"),$promptElement=Symbol("promptElement"),$promptAnimatedContainer=Symbol("promptAnimatedContainer"),$deferInteractionPrompt=Symbol("deferInteractionPrompt"),$updateAria=Symbol("updateAria"),$updateCameraForRadius=Symbol("updateCameraForRadius"),$blurHandler=Symbol("blurHandler"),$focusHandler=Symbol("focusHandler"),$changeHandler=Symbol("changeHandler"),$pointerChangeHandler=Symbol("pointerChangeHandler"),$onBlur=Symbol("onBlur"),$onFocus=Symbol("onFocus"),$onChange=Symbol("onChange"),$onPointerChange=Symbol("onPointerChange"),$shouldPromptUserToInteract=Symbol("shouldPromptUserToInteract"),$waitingToPromptUser=Symbol("waitingToPromptUser"),$userPromptedOnce=Symbol("userPromptedOnce"),$promptElementVisibleTime=Symbol("promptElementVisibleTime"),$lastPromptOffset=Symbol("lastPromptOffset"),$focusedTime=Symbol("focusedTime"),$zoomAdjustedFieldOfView=Symbol("zoomAdjustedFieldOfView"),$lastSpherical=Symbol("lastSpherical"),$jumpCamera=Symbol("jumpCamera"),$syncCameraOrbit=Symbol("syncCameraOrbit"),$syncFieldOfView=Symbol("syncFieldOfView"),$syncCameraTarget=Symbol("syncCameraTarget"),$syncMinCameraOrbit=Symbol("syncMinCameraOrbit"),$syncMaxCameraOrbit=Symbol("syncMaxCameraOrbit"),$syncMinFieldOfView=Symbol("syncMinFieldOfView"),$syncMaxFieldOfView=Symbol("syncMaxFieldOfView"),ControlsMixin=e=>{var t,r,n,i,a,o,s,l,c,h,u,d,p,m,f,g;class v extends e
{constructor()
{super(...arguments),this.cameraControls=!0,this.cameraOrbit=DEFAULT_CAMERA_ORBIT,this.cameraTarget=DEFAULT_CAMERA_TARGET,this.fieldOfView=DEFAULT_FIELD_OF_VIEW,this.minCameraOrbit="auto",this.maxCameraOrbit="auto",this.minFieldOfView="auto",this.maxFieldOfView="auto",this.interactionPromptThreshold=DEFAULT_INTERACTION_PROMPT_THRESHOLD,this.interactionPromptStyle=InteractionPromptStyle.WIGGLE,this.interactionPrompt=InteractionPromptStrategy.AUTO,this.interactionPolicy=InteractionPolicy.ALWAYS_ALLOW,this[t]=this.shadowRoot.querySelector(".interaction-prompt"),this[r]=this.shadowRoot.querySelector(".interaction-prompt > .animated-container"),this[n]=1/0,this[i]=0,this[a]=1/0,this[o]=!1,this[s]=!1,this[l]=!0,this[c]=new SmoothControls(this[$scene].getCamera(),this[$scene].canvas),this[h]=0,this[u]=new Spherical,this[d]=!1,this[p]=(e=>this[$onChange](e)),this[m]=(e=>this[$onPointerChange](e)),this[f]=(()=>this[$onFocus]()),this[g]=(()=>this[$onBlur]())}
getCameraOrbit()
{const
{theta:e,phi:t,radius:r}=this[$lastSpherical];return{theta:e,phi:t,radius:r}}
getCameraTarget()
{return this[$controls].getTarget()}
getFieldOfView()
{return this[$controls].getFieldOfView()}
jumpCameraToGoal()
{this[$jumpCamera]=!0,this.requestUpdate($jumpCamera,!1)}
resetInteractionPrompt()
{this[$lastPromptOffset]=0,this[$promptElementVisibleTime]=1/0,this[$userPromptedOnce]=!1,this[$waitingToPromptUser]=this.interactionPrompt===InteractionPromptStrategy.AUTO&&this.cameraControls,this[$shouldPromptUserToInteract]=!0}
connectedCallback()
{super.connectedCallback(),this[$controls].addEventListener("change",this[$changeHandler]),this[$controls].addEventListener("pointer-change-start",this[$pointerChangeHandler]),this[$controls].addEventListener("pointer-change-end",this[$pointerChangeHandler])}
disconnectedCallback()
{super.disconnectedCallback(),this[$controls].removeEventListener("change",this[$changeHandler]),this[$controls].removeEventListener("pointer-change-start",this[$pointerChangeHandler]),this[$controls].removeEventListener("pointer-change-end",this[$pointerChangeHandler])}
updated(e)
{super.updated(e);const t=this[$controls],r=this[$scene];if(e.has("cameraControls")&&(this.cameraControls?(t.enableInteraction(),this.interactionPrompt===InteractionPromptStrategy.AUTO&&(this[$waitingToPromptUser]=!0),r.canvas.addEventListener("focus",this[$focusHandler]),r.canvas.addEventListener("blur",this[$blurHandler])):(r.canvas.removeEventListener("focus",this[$focusHandler]),r.canvas.removeEventListener("blur",this[$blurHandler]),t.disableInteraction(),this[$deferInteractionPrompt]())),(e.has("interactionPrompt")||e.has("cameraControls")||e.has("src"))&&(this.interactionPrompt===InteractionPromptStrategy.AUTO&&this.cameraControls?this[$waitingToPromptUser]=!0:this[$deferInteractionPrompt]()),e.has("interactionPromptStyle")&&this[$promptElement].classList.toggle("wiggle",this.interactionPromptStyle===InteractionPromptStyle.WIGGLE),e.has("interactionPolicy"))
{const e=this.interactionPolicy;t.applyOptions({interactionPolicy:e})}!0===this[$jumpCamera]&&Promise.resolve().then(()=>{this[$controls].jumpToGoal(),this[$jumpCamera]=!1})}[(t=$promptElement,r=$promptAnimatedContainer,n=$focusedTime,i=$lastPromptOffset,a=$promptElementVisibleTime,o=$userPromptedOnce,s=$waitingToPromptUser,l=$shouldPromptUserToInteract,c=$controls,h=$zoomAdjustedFieldOfView,u=$lastSpherical,d=$jumpCamera,p=$changeHandler,m=$pointerChangeHandler,f=$focusHandler,g=$blurHandler,$syncFieldOfView)](e)
{this[$controls].setFieldOfView(180*e[0]/Math.PI)}[$syncCameraOrbit](e)
{this[$updateCameraForRadius](e[2]),this[$controls].setOrbit(e[0],e[1],e[2])}[$syncMinCameraOrbit](e)
{this[$controls].applyOptions({minimumAzimuthalAngle:e[0],minimumPolarAngle:e[1],minimumRadius:e[2]})}[$syncMaxCameraOrbit](e)
{this[$controls].applyOptions({maximumAzimuthalAngle:e[0],maximumPolarAngle:e[1],maximumRadius:e[2]})}[$syncMinFieldOfView](e)
{this[$controls].applyOptions({minimumFieldOfView:180*e[0]/Math.PI})}[$syncMaxFieldOfView](e)
{this[$controls].applyOptions({maximumFieldOfView:180*e[0]/Math.PI})}[$syncCameraTarget](e)
{const[t,r,n]=e,i=this[$scene];this[$controls].setTarget(t,r,n),i.pivotCenter.set(t,r,n),i.setPivotRotation(i.getPivotRotation())}[$tick$1](e,t)
{if(super[$tick$1](e,t),this[$waitingToPromptUser]&&this.interactionPrompt!==InteractionPromptStrategy.NONE)
{const t=this.interactionPrompt===InteractionPromptStrategy.AUTO?this[$loadedTime]:this[$focusedTime];this.loaded&&e>t+this.interactionPromptThreshold&&(this[$scene].canvas.setAttribute("aria-label",INTERACTION_PROMPT),this[$userPromptedOnce]=!0,this[$waitingToPromptUser]=!1,this[$promptElementVisibleTime]=e,this[$promptElement].classList.add("visible"))}
if(isFinite(this[$promptElementVisibleTime])&&this.interactionPromptStyle===InteractionPromptStyle.WIGGLE)
{const t=this[$scene],r=(e-this[$promptElementVisibleTime])/PROMPT_ANIMATION_TIME%1,n=wiggle(r),i=fade(r),a=n*t.width*.05,o=(n-this[$lastPromptOffset])*Math.PI/16;this[$promptAnimatedContainer].style.transform=`translateX(${a}px)`,this[$promptAnimatedContainer].style.opacity=`${i}`,this[$controls].adjustOrbit(o,0,0,0),this[$lastPromptOffset]=n,this[$needsRender]()}
this[$controls].update(e,t);const r=this[$controls].getTarget();this[$scene].pivotCenter.equals(r)||(this[$scene].pivotCenter.copy(r),this[$scene].setPivotRotation(this[$scene].getPivotRotation()))}[$deferInteractionPrompt]()
{this[$waitingToPromptUser]=!1,this[$promptElement].classList.remove("visible"),this[$promptElementVisibleTime]=1/0,this[$userPromptedOnce]&&(this[$shouldPromptUserToInteract]=!1)}[$updateCameraForRadius](e)
{const
{idealCameraDistance:t}=this[$scene].model,r=2*Math.max(t,e);this[$controls].updateNearFar(0,r)}[$updateAria]()
{const
{theta:e,phi:t}=this[$lastSpherical],{theta:r,phi:n}=this[$controls].getCameraSpherical(this[$lastSpherical]),i=this.getRootNode();if(null!=i&&i.activeElement===this)
{const i=(4+Math.floor((e%PHI$1+QUARTER_PI)/HALF_PI))%4,a=(4+Math.floor((r%PHI$1+QUARTER_PI)/HALF_PI))%4,o=Math.floor(t/THIRD_PI),s=Math.floor(n/THIRD_PI);if(a!==i||s!==o)
{const
{canvas:e}=this[$scene],t=AZIMUTHAL_QUADRANT_LABELS[a],r=`View from stage ${POLAR_TRIENT_LABELS[s]}${t}`;e.setAttribute("aria-label",r)}}}[$onResize](e)
{const t=this[$controls],r=this[$scene].framedFieldOfView;super[$onResize](e);const n=this[$scene].framedFieldOfView,i=t.getFieldOfView()/r;this[$zoomAdjustedFieldOfView]=n*i,t.updateAspect(this[$scene].aspect),this.requestUpdate("maxFieldOfView",this.maxFieldOfView),this.requestUpdate("fieldOfView",this.fieldOfView),this.jumpCameraToGoal()}[$onModelLoad](e)
{super[$onModelLoad](e);const{framedFieldOfView:t}=this[$scene];this[$zoomAdjustedFieldOfView]=t,this.requestUpdate("maxFieldOfView",this.maxFieldOfView),this.requestUpdate("fieldOfView",this.fieldOfView),this.requestUpdate("cameraOrbit",this.cameraOrbit),this.requestUpdate("cameraTarget",this.cameraTarget),this.jumpCameraToGoal()}[$onFocus]()
{const
{canvas:e}=this[$scene];isFinite(this[$focusedTime])||(this[$focusedTime]=performance.now());const t=this[$ariaLabel];e.getAttribute("aria-label")!==t&&e.setAttribute("aria-label",t),!isFinite(this[$promptElementVisibleTime])&&this[$shouldPromptUserToInteract]&&(this[$waitingToPromptUser]=!0)}[$onBlur]()
{this[$waitingToPromptUser]=!1,this[$promptElement].classList.remove("visible"),this[$promptElementVisibleTime]=1/0,this[$focusedTime]=1/0}[$onChange]({source:e})
{this[$updateAria](),this[$needsRender](),e===ChangeSource.USER_INTERACTION&&this[$deferInteractionPrompt](),this.dispatchEvent(new CustomEvent("camera-change",{detail:{source:e}}))}[$onPointerChange](e)
{"pointer-change-start"===e.type?this[$container].classList.add("pointer-tumbling"):this[$container].classList.remove("pointer-tumbling")}}
return __decorate$3([property({type:Boolean,attribute:"camera-controls"})],v.prototype,"cameraControls",void 0),__decorate$3([style({intrinsics:cameraOrbitIntrinsics,observeEffects:!0,updateHandler:$syncCameraOrbit}),property({type:String,attribute:"camera-orbit",hasChanged:()=>!0})],v.prototype,"cameraOrbit",void 0),__decorate$3([style({intrinsics:cameraTargetIntrinsics,observeEffects:!0,updateHandler:$syncCameraTarget}),property({type:String,attribute:"camera-target",hasChanged:()=>!0})],v.prototype,"cameraTarget",void 0),__decorate$3([style({intrinsics:fieldOfViewIntrinsics,observeEffects:!0,updateHandler:$syncFieldOfView}),property({type:String,attribute:"field-of-view",hasChanged:()=>!0})],v.prototype,"fieldOfView",void 0),__decorate$3([style({intrinsics:minCameraOrbitIntrinsics,updateHandler:$syncMinCameraOrbit}),property({type:String,attribute:"min-camera-orbit",hasChanged:()=>!0})],v.prototype,"minCameraOrbit",void 0),__decorate$3([style({intrinsics:maxCameraOrbitIntrinsics,updateHandler:$syncMaxCameraOrbit}),property({type:String,attribute:"max-camera-orbit",hasChanged:()=>!0})],v.prototype,"maxCameraOrbit",void 0),__decorate$3([style({intrinsics:minFieldOfViewIntrinsics,updateHandler:$syncMinFieldOfView}),property({type:String,attribute:"min-field-of-view",hasChanged:()=>!0})],v.prototype,"minFieldOfView",void 0),__decorate$3([style({intrinsics:maxFieldOfViewIntrinsics,updateHandler:$syncMaxFieldOfView}),property({type:String,attribute:"max-field-of-view",hasChanged:()=>!0})],v.prototype,"maxFieldOfView",void 0),__decorate$3([property({type:Number,attribute:"interaction-prompt-threshold"})],v.prototype,"interactionPromptThreshold",void 0),__decorate$3([property({type:String,attribute:"interaction-prompt-style"})],v.prototype,"interactionPromptStyle",void 0),__decorate$3([property({type:String,attribute:"interaction-prompt"})],v.prototype,"interactionPrompt",void 0),__decorate$3([property({type:String,attribute:"interaction-policy"})],v.prototype,"interactionPolicy",void 0),v};var __decorate$4=function(e,t,r,n)
{for(var i,a=arguments.length,o=a<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n,s=e.length-1;s>=0;s--)(i=e[s])&&(o=(a<3?i(o):a>3?i(t,r,o):i(t,r))||o);return a>3&&o&&Object.defineProperty(t,r,o),o};const DEFAULT_SHADOW_INTENSITY=0,DEFAULT_SHADOW_SOFTNESS=1,DEFAULT_EXPOSURE=1,$currentEnvironmentMap=Symbol("currentEnvironmentMap"),$applyEnvironmentMap=Symbol("applyEnvironmentMap"),$updateEnvironment=Symbol("updateEnvironment"),$cancelEnvironmentUpdate=Symbol("cancelEnvironmentUpdate"),EnvironmentMixin=e=>{var t,r;class n extends e
{constructor()
{super(...arguments),this.environmentImage=null,this.skyboxImage=null,this.shadowIntensity=DEFAULT_SHADOW_INTENSITY,this.shadowSoftness=DEFAULT_SHADOW_SOFTNESS,this.exposure=DEFAULT_EXPOSURE,this[t]=null,this[r]=null}
updated(e)
{super.updated(e),e.has("shadowIntensity")&&(this[$scene].setShadowIntensity(this.shadowIntensity),this[$needsRender]()),e.has("shadowSoftness")&&(this[$scene].setShadowSoftness(this.shadowSoftness),this[$needsRender]()),e.has("exposure")&&(this[$scene].exposure=this.exposure,this[$needsRender]()),(e.has("environmentImage")||e.has("skyboxImage")||e.has("experimentalPmrem")||e.has($isInRenderTree))&&this[$updateEnvironment]()}[(t=$currentEnvironmentMap,r=$cancelEnvironmentUpdate,$onModelLoad)](e)
{super[$onModelLoad](e),null!=this[$currentEnvironmentMap]&&this[$applyEnvironmentMap](this[$currentEnvironmentMap])}
async[$updateEnvironment]()
{if(!this[$isInRenderTree])return;const{skyboxImage:e,environmentImage:t}=this;null!=this[$cancelEnvironmentUpdate]&&(this[$cancelEnvironmentUpdate](),this[$cancelEnvironmentUpdate]=null);const{textureUtils:r}=this[$renderer];if(null!=r)try
{const
{environmentMap:n,skybox:i}=await new Promise(async(n,i)=>{const a=r.generateEnvironmentMapAndSkybox(e,t,{progressTracker:this[$progressTracker]});this[$cancelEnvironmentUpdate]=(()=>i(a)),n(await a)});this[$scene].background=null!=i?i.texture:null,this[$applyEnvironmentMap](n.texture),this[$scene].model.dispatchEvent({type:"envmap-update"})}
catch(e)
{if(e instanceof Error)throw this[$applyEnvironmentMap](null),e;const{environmentMap:t,skybox:r}=await e;null!=t&&t.dispose(),null!=r&&r.dispose()}}[$applyEnvironmentMap](e)
{this[$currentEnvironmentMap]=e,this[$scene].environment=this[$currentEnvironmentMap],this.dispatchEvent(new CustomEvent("environment-change")),this[$needsRender]()}}
return __decorate$4([property({type:String,attribute:"environment-image",converter:{fromAttribute:deserializeUrl}})],n.prototype,"environmentImage",void 0),__decorate$4([property({type:String,attribute:"skybox-image",converter:{fromAttribute:deserializeUrl}})],n.prototype,"skyboxImage",void 0),__decorate$4([property({type:Number,attribute:"shadow-intensity"})],n.prototype,"shadowIntensity",void 0),__decorate$4([property({type:Number,attribute:"shadow-softness"})],n.prototype,"shadowSoftness",void 0),__decorate$4([property({type:Number})],n.prototype,"exposure",void 0),n};var _a$e,_b$c;const INITIAL_STATUS_ANNOUNCEMENT="This page includes one or more 3D models that are loading",FINISHED_LOADING_ANNOUNCEMENT="All 3D models in the page have loaded",UPDATE_STATUS_DEBOUNCE_MS=100,$modelViewerStatusInstance=Symbol("modelViewerStatusInstance"),$updateStatus=Symbol("updateStatus");class LoadingStatusAnnouncer extends EventDispatcher
{constructor()
{super(),this[_a$e]=null,this.registeredInstanceStatuses=new Map,this.loadingPromises=[],this.statusElement=document.createElement("p"),this.statusUpdateInProgress=!1,this[_b$c]=debounce(()=>this.updateStatus(),UPDATE_STATUS_DEBOUNCE_MS);const{statusElement:e}=this,{style:t}=e;e.setAttribute("role","status"),e.classList.add("screen-reader-only"),t.top=t.left="0",t.pointerEvents="none"}
registerInstance(e)
{if(this.registeredInstanceStatuses.has(e))return;let t=()=>{};const r=!1===e.loaded&&!!e.src,n=new Promise(n=>{if(!r)return void n();const i=()=>{n(),e.removeEventListener("load",i),e.removeEventListener("error",i)};e.addEventListener("load",i),e.addEventListener("error",i),t=i});this.registeredInstanceStatuses.set(e,{onUnregistered:t}),this.loadingPromises.push(n),null==this.modelViewerStatusInstance&&(this.modelViewerStatusInstance=e)}
unregisterInstance(e)
{if(!this.registeredInstanceStatuses.has(e))return;const t=this.registeredInstanceStatuses,r=t.get(e);t.delete(e),r.onUnregistered(),this.modelViewerStatusInstance===e&&(this.modelViewerStatusInstance=t.size>0?getFirstMapKey(t):null)}
get modelViewerStatusInstance()
{return this[$modelViewerStatusInstance]}
set modelViewerStatusInstance(e)
{if(this[$modelViewerStatusInstance]===e)return;const{statusElement:t}=this;null!=e&&null!=e.shadowRoot?e.shadowRoot.appendChild(t):null!=t.parentNode&&t.parentNode.removeChild(t),this[$modelViewerStatusInstance]=e,this[$updateStatus]()}
async updateStatus()
{if(!this.statusUpdateInProgress&&0!==this.loadingPromises.length)
{for(this.statusElement.textContent=INITIAL_STATUS_ANNOUNCEMENT,this.statusUpdateInProgress=!0,this.dispatchEvent({type:"initial-status-announced"});this.loadingPromises.length;)
{const
{loadingPromises:e}=this;this.loadingPromises=[],await Promise.all(e)}
this.statusElement.textContent=FINISHED_LOADING_ANNOUNCEMENT,this.statusUpdateInProgress=!1,this.dispatchEvent({type:"finished-loading-announced"})}}}
_a$e=$modelViewerStatusInstance,_b$c=$updateStatus;var __decorate$5=function(e,t,r,n)
{for(var i,a=arguments.length,o=a<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n,s=e.length-1;s>=0;s--)(i=e[s])&&(o=(a<3?i(o):a>3?i(t,r,o):i(t,r))||o);return a>3&&o&&Object.defineProperty(t,r,o),o};const PROGRESS_BAR_UPDATE_THRESHOLD=100,PROGRESS_MASK_BASE_OPACITY=.2,ANNOUNCE_MODEL_VISIBILITY_DEBOUNCE_THRESHOLD=0,DEFAULT_DRACO_DECODER_LOCATION="https://www.gstatic.com/draco/versioned/decoders/1.3.5/",SPACE_KEY=32,ENTER_KEY=13,RevealStrategy={AUTO:"auto",INTERACTION:"interaction"},PosterDismissalSource={INTERACTION:"interaction"},loader=new CachingGLTFLoader,loadingStatusAnnouncer=new LoadingStatusAnnouncer,$defaultProgressBarElement=Symbol("defaultProgressBarElement"),$defaultProgressMaskElement=Symbol("defaultProgressMaskElement"),$posterContainerElement=Symbol("posterContainerElement"),$defaultPosterElement=Symbol("defaultPosterElement"),$posterDismissalSource=Symbol("posterDismissalSource"),$announceModelVisibility=Symbol("announceModelVisibility"),$modelIsReadyForReveal=Symbol("modelIsReadyForReveal"),$shouldAttemptPreload=Symbol("shouldAttemptPreload"),$shouldRevealModel=Symbol("shouldRevealModel"),$showPoster=Symbol("showPoster"),$hidePoster=Symbol("hidePoster"),$modelIsVisible=Symbol("modelIsVisible"),$reActivatePoster=Symbol("reActivatePoster"),$preloadAttempted=Symbol("preloadAttempted"),$sourceUpdated=Symbol("sourceUpdated"),$updateLoadingAndVisibility=Symbol("updateLoadingAndVisibility"),$updateProgressBar=Symbol("updateProgressBar"),$lastReportedProgress=Symbol("lastReportedProgress"),$ariaLabelCallToAction=Symbol("ariaLabelCallToAction"),$clickHandler=Symbol("clickHandler"),$keydownHandler=Symbol("keydownHandler"),$progressHandler=Symbol("processHandler"),$onClick=Symbol("onClick"),$onKeydown=Symbol("onKeydown"),$onProgress=Symbol("onProgress"),LoadingMixin=e=>{var t,r,n,i,a,o,s,l,c,h,u,d,p,m,f;class g extends e
{constructor(...e)
{super(...e),this.poster=null,this.reveal=RevealStrategy.INTERACTION,this.preload=!1,this.isPosterActive=!1,this[t]=!1,this[r]=!1,this[n]=!1,this[i]=0,this[a]=null,this[o]=this.shadowRoot.querySelector(".slot.poster"),this[s]=this.shadowRoot.querySelector("#default-poster"),this[l]=this.shadowRoot.querySelector("#default-progress-bar > .bar"),this[c]=this.shadowRoot.querySelector("#default-progress-bar > .mask"),this[h]=this[$defaultPosterElement].getAttribute("aria-label"),this[u]=(()=>this[$onClick]()),this[d]=(e=>this[$onKeydown](e)),this[p]=(e=>this[$onProgress](e)),this[m]=debounce(e=>{this.dispatchEvent(new CustomEvent("model-visibility",{detail:{visible:e}}))},ANNOUNCE_MODEL_VISIBILITY_DEBOUNCE_THRESHOLD),this[f]=throttle(e=>{const t=this[$defaultProgressBarElement].parentNode;requestAnimationFrame(()=>{this[$defaultProgressMaskElement].style.opacity=`${(1-e)*PROGRESS_MASK_BASE_OPACITY}`,this[$defaultProgressBarElement].style.transform=`scaleX(${e})`,0===e&&(t.removeChild(this[$defaultProgressBarElement]),t.appendChild(this[$defaultProgressBarElement])),1===e?this[$defaultProgressBarElement].classList.add("hide"):this[$defaultProgressBarElement].classList.remove("hide")})},PROGRESS_BAR_UPDATE_THRESHOLD);const g=(self.ModelViewerElement||{}).dracoDecoderLocation||DEFAULT_DRACO_DECODER_LOCATION;CachingGLTFLoader.setDRACODecoderLocation(g)}
static set dracoDecoderLocation(e)
{CachingGLTFLoader.setDRACODecoderLocation(e)}
static get dracoDecoderLocation()
{return CachingGLTFLoader.getDRACODecoderLocation()}
static mapURLs(e)
{loader[$loader].manager.setURLModifier(e)}
dismissPoster()
{this[$posterDismissalSource]=PosterDismissalSource.INTERACTION,this[$hidePoster](),this.isPosterActive=!1,this.requestUpdate()}
reactivatePoster()
{this[$reActivatePoster](),this.isPosterActive=!0,this[$deferInteractionPrompt]()}
connectedCallback()
{super.connectedCallback(),this[$posterContainerElement].addEventListener("click",this[$clickHandler]),this[$posterContainerElement].addEventListener("keydown",this[$keydownHandler]),this[$progressTracker].addEventListener("progress",this[$progressHandler]),loadingStatusAnnouncer.registerInstance(this)}
disconnectedCallback()
{super.disconnectedCallback(),this[$posterContainerElement].removeEventListener("click",this[$clickHandler]),this[$posterContainerElement].removeEventListener("keydown",this[$keydownHandler]),this[$progressTracker].removeEventListener("progress",this[$progressHandler]),loadingStatusAnnouncer.unregisterInstance(this)}
async updated(e)
{super.updated(e),e.has("poster")&&null!=this.poster&&(this[$defaultPosterElement].style.backgroundImage=`url(${this.poster})`),e.has("src")&&(this[$modelIsReadyForReveal]||(this[$lastReportedProgress]=0),this[$posterDismissalSource]=null,this[$preloadAttempted]=!1,this[$sourceUpdated]=!1),e.has("alt")&&this[$defaultPosterElement].setAttribute("aria-label",`${this[$ariaLabel]}. ${this[$ariaLabelCallToAction]}`),this[$updateLoadingAndVisibility]()}[(t=$modelIsVisible,r=$preloadAttempted,n=$sourceUpdated,i=$lastReportedProgress,a=$posterDismissalSource,o=$posterContainerElement,s=$defaultPosterElement,l=$defaultProgressBarElement,c=$defaultProgressMaskElement,h=$ariaLabelCallToAction,u=$clickHandler,d=$keydownHandler,p=$progressHandler,m=$announceModelVisibility,f=$updateProgressBar,$onClick)]()
{this[$posterDismissalSource]=PosterDismissalSource.INTERACTION,this.requestUpdate()}[$onKeydown](e)
{switch(e.keyCode)
{case SPACE_KEY:case ENTER_KEY:this[$posterDismissalSource]=PosterDismissalSource.INTERACTION}
this.requestUpdate()}[$onProgress](e)
{const t=e.detail.totalProgress;this.requestUpdate(),1===t&&this[$updateProgressBar].flush(),this[$updateProgressBar](t),this.dispatchEvent(new CustomEvent("progress",{detail:{totalProgress:t}})),this[$lastReportedProgress]=Math.max(t,this[$lastReportedProgress])}
get[$modelIsReadyForReveal]()
{const
{src:e}=this;return!!e&&CachingGLTFLoader.hasFinishedLoading(e)&&1===this[$lastReportedProgress]&&this[$shouldRevealModel]}
get[$shouldRevealModel]()
{return this.reveal===RevealStrategy.AUTO||!!this[$posterDismissalSource]}
get[$shouldAttemptPreload]()
{const
{src:e}=this;return!!e&&(this.preload||this[$shouldRevealModel])&&this[$isInRenderTree]}
async[$updateLoadingAndVisibility]()
{if(this[$shouldAttemptPreload]&&!this[$preloadAttempted])
{this[$preloadAttempted]=!0;const e=this[$progressTracker].beginActivity();try
{const t=this.src,r={url:t};await loader.preload(t,e),this.dispatchEvent(new CustomEvent("preload",{detail:r}))}
catch(e)
{this.dispatchEvent(new CustomEvent("error",{detail:{type:"loadfailure",sourceError:e}}))}
finally
{e(1),this.requestUpdate()}}
this[$modelIsReadyForReveal]?await this[$updateSource]():this[$showPoster]()}[$reActivatePoster]()
{const e=this[$posterContainerElement],t=(this[$defaultPosterElement],parseFloat(self.getComputedStyle(e).opacity));e.classList.add("show"),t<1&&e.addEventListener("transitionend",()=>{this[$modelIsVisible]=!1,this[$announceModelVisibility](!1)},{once:!0})}[$showPoster]()
{const e=this[$posterContainerElement],t=this[$defaultPosterElement],r=parseFloat(self.getComputedStyle(e).opacity);t.removeAttribute("tabindex"),t.removeAttribute("aria-hidden"),e.classList.add("show"),r<1&&e.addEventListener("transitionend",()=>{this[$modelIsVisible]=!1,this[$announceModelVisibility](!1)},{once:!0})}[$hidePoster]()
{const e=this[$posterContainerElement],t=this[$defaultPosterElement];e.classList.contains("show")&&(e.classList.remove("show"),e.addEventListener("transitionend",()=>{this[$announceModelVisibility](!0),requestAnimationFrame(()=>{this[$modelIsVisible]=!0;const e=this.getRootNode();e&&e.activeElement===this&&this[$canvas].focus(),t.setAttribute("aria-hidden","true"),t.tabIndex=-1})},{once:!0}))}[$getModelIsVisible]()
{return super[$getModelIsVisible]()||this[$modelIsVisible]}[$getLoaded]()
{const e=this.src;return super[$getLoaded]()||!(!e||!CachingGLTFLoader.hasFinishedLoading(e))}
async[$updateSource]()
{this[$modelIsReadyForReveal]&&!this[$sourceUpdated]&&(this[$sourceUpdated]=!0,await super[$updateSource](),this[$hidePoster]())}}
return __decorate$5([property({converter:{fromAttribute:deserializeUrl}})],g.prototype,"poster",void 0),__decorate$5([property({type:String})],g.prototype,"reveal",void 0),__decorate$5([property({type:Boolean})],g.prototype,"preload",void 0),g};var __decorate$6=function(e,t,r,n)
{for(var i,a=arguments.length,o=a<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n,s=e.length-1;s>=0;s--)(i=e[s])&&(o=(a<3?i(o):a>3?i(t,r,o):i(t,r))||o);return a>3&&o&&Object.defineProperty(t,r,o),o};const $showMlModel=Symbol("showMlModel"),$hideMlModel=Symbol("hideMlModel"),$isHeliosBrowser=Symbol("isHeliosBrowser"),$mlModel=Symbol("mlModel"),DEFAULT_HOLOGRAM_INLINE_SCALE=.65,DEFAULT_HOLOGRAM_Z_OFFSET="150px",MagicLeapMixin=e=>{var t,r;class n extends e
{constructor()
{super(...arguments),this.magicLeap=!1,this[t]=null!=self.mlWorld,this[r]=null}
updated(e)
{if(super.updated(e),!this[$isHeliosBrowser])return;if(!e.has("magicLeap")&&!e.has("src"))return;const t=this[$scene];if(this.magicLeap)
{!!customElements.get("ml-model")||console.warn("<ml-model> is not registered. Is prismatic.js loaded?"),t.pause(),this[$container].setAttribute("style","display: none;"),this[$showMlModel](),e.has("src")&&this.src&&this.src!==this[$mlModel].getAttribute("src")&&this[$mlModel].setAttribute("src",this.src)}
else this[$hideMlModel](),t.resume(),this[$container].removeAttribute("style")}[(t=$isHeliosBrowser,r=$mlModel,$showMlModel)]()
{null==this[$mlModel]&&(this[$mlModel]=document.createElement("ml-model"),this[$mlModel].setAttribute("style","display: block; top: 0; left: 0; width: 100%; height: 100%"),this[$mlModel].setAttribute("model-scale",`${DEFAULT_HOLOGRAM_INLINE_SCALE} ${DEFAULT_HOLOGRAM_INLINE_SCALE} ${DEFAULT_HOLOGRAM_INLINE_SCALE}`),this[$mlModel].setAttribute("z-offset",DEFAULT_HOLOGRAM_Z_OFFSET),this[$mlModel].setAttribute("extractable","true"),this[$mlModel].setAttribute("extracted-scale","1"),this[$mlModel].setAttribute("environment-lighting","color-intensity: 5;"),null!=this.src&&this[$mlModel].setAttribute("src",this.src)),this.shadowRoot.appendChild(this[$mlModel])}[$hideMlModel]()
{null!=this[$mlModel]&&null!=this[$mlModel].parentNode&&this[$mlModel].parentNode.removeChild(this[$mlModel])}}
return __decorate$6([property({type:Boolean,attribute:"magic-leap"})],n.prototype,"magicLeap",void 0),n},ALLOWLISTED_GLOBALS={Array:!0,ArrayBuffer:!0,BigInt:!0,BigInt64Array:!0,BigUint64Array:!0,Boolean:!0,Cache:!0,CustomEvent:!0,DataView:!0,Date:!0,Error:!0,EvalError:!0,Event:!0,EventTarget:!0,Float32Array:!0,Float64Array:!0,Function:!0,Infinity:!0,Int16Array:!0,Int32Array:!0,Int8Array:!0,Intl:!0,JSON:!0,Map:!0,Math:!0,MessagePort:!0,MessageEvent:!0,MessageChannel:!0,NaN:!0,Number:!0,Object:!0,Promise:!0,Proxy:!0,RangeError:!0,ReferenceError:!0,Reflect:!0,RegExp:!0,Set:!0,String:!0,Symbol:!0,SyntaxError:!0,TextDecoder:!0,TextEncoder:!0,TypeError:!0,URIError:!0,URL:!0,Uint16Array:!0,Uint32Array:!0,Uint8Array:!0,Uint8ClampedArray:!0,WeakMap:!0,WeakSet:!0,WebAssembly:!0,atob:!0,addEventListener:!0,removeEventListener:!0,btoa:!0,caches:!0,clearInterval:!0,clearTimeout:!0,console:!0,decodeURI:!0,decodeURIComponent:!0,document:!0,encodeURI:!0,encodeURIComponent:!0,escape:!0,fetch:!0,indexedDB:!0,isFinite:!0,isNaN:!0,location:!0,navigator:!0,onerror:!0,onrejectionhandled:!0,onunhandledrejection:!0,parseFloat:!0,parseInt:!0,performance:!0,postMessage:!0,requestAnimationFrame:!0,cancelAnimationFrame:!0,self:!0,setTimeout:!0,setInterval:!0,unescape:!0};function defineMaterial(e)
{const t=Symbol("pbrMetallicRoughness"),r=Symbol("kernel"),n=Symbol("name");return class extends e
{constructor(e,i)
{super(e,i),this[r]=e,null!=i.name&&(this[n]=i.name),this[t]=e.deserialize("pbr-metallic-roughness",i.pbrMetallicRoughness)}
get pbrMetallicRoughness()
{return this[t]}}}
const ThreeDOMMessageType={HANDSHAKE:1,IMPORT_SCRIPT:2,MODEL_CHANGE:3,MUTATION_RESULT:4,CONTEXT_INITIALIZED:5,MUTATE:6};function defineModelKernel(e,t,r)
{var n,i,a,o,s,l;const c={model:e,material:t,"pbr-metallic-roughness":r},h=Symbol("onMessageEvent"),u=Symbol("messageEventHandler"),d=Symbol("port"),p=Symbol("model"),m=Symbol("elementsByLocalId"),f=Symbol("localIdsByElement"),g=Symbol("elementsByType"),v=Symbol("pendingMutations"),y=Symbol("nextMutationId");return class{constructor(e,t)
{this[n]=new Map,this[i]=new Map,this[a]=new Map,this[o]=(e=>this[h](e)),this[s]=new Map,this[l]=0;const r=Object.keys(c);for(const e of r)this[g].set(e,new Set);this[d]=e,this[d].addEventListener("message",this[u]),this[d].start(),this[p]=this.deserialize("model",t)}
get model()
{return this[p]}
async mutate(e,t,r)
{if(!this[f].has(e))throw new Error("Cannot mutate unknown element");const n=this[f].get(e);return new Promise((e,i)=>{const a=this[y]++;this[d].postMessage({type:ThreeDOMMessageType.MUTATE,id:n,property:t,value:r,mutationId:a}),this[v].set(a,{resolve:e,reject:i})})}
deserialize(e,t)
{if(!(e in c))throw new Error(`Cannot deserialize unknown type: ${e}`);const{id:r}=t,n=new(0,c[e])(this,t);return this[m].set(r,n),this[f].set(n,r),this[g].get(e).add(n),n}
getElementsByType(e)
{return this[g].has(e)?Array.from(this[g].get(e)):[]}
deactivate()
{this[d].close(),this[d].removeEventListener("message",this[u])}[(n=m,i=f,a=g,o=u,s=v,l=y,h)](e)
{const
{data:t}=e;switch(t&&t.type)
{case ThreeDOMMessageType.MUTATION_RESULT:{const e=t,{applied:r,mutationId:n}=e,i=this[v].get(n);this[v].delete(n),null!=i&&(r?i.resolve():i.reject());break}}}}}
function defineModel(e)
{var t;const r=Symbol("material"),n=Symbol("kernel");return t=r,class extends e
{constructor(e,r)
{super(e),this[t]=Object.freeze([]),this[n]=e;for(const e of r.materials)this[n].deserialize("material",e)}
get materials()
{return this[n].getElementsByType("material")}
get ownerModel()
{}}}
function definePBRMetallicRoughness(e)
{const t=Symbol("kernel"),r=Symbol("baseColorFactor");return class extends e
{constructor(e,n)
{super(e,n),this[t]=e,this[r]=Object.freeze(n.baseColorFactor)}
get baseColorFactor()
{return this[r]}
async setBaseColorFactor(e)
{await this[t].mutate(this,"baseColorFactor",e),this[r]=Object.freeze(e)}}}
function defineThreeDOMElement()
{const e=Symbol("ownerModel");return class{constructor(t)
{if(null==t)throw new Error("Illegal constructor");this[e]=t.model}
get ownerModel()
{return this[e]}}}
const generateAPI=()=>`${defineModelKernel.toString()}\n${defineThreeDOMElement.toString()}\n${defineModel.toString()}\n${defineMaterial.toString()}\n${definePBRMetallicRoughness.toString()}\n\nvar ThreeDOMElement = defineThreeDOMElement();\nvar Model = defineModel(ThreeDOMElement);\nvar Material = defineMaterial(ThreeDOMElement);\nvar PBRMetallicRoughness = definePBRMetallicRoughness(ThreeDOMElement);\n\nvar ModelKernel = defineModelKernel(\n  Model,\n  Material,\n  PBRMetallicRoughness\n);\n\n// Populate the global scope with constructors\n// so that author code can use instanceof checks\nself.ThreeDOMElement = ThreeDOMElement;\nself.Model = Model;\nself.Material = Material;\nself.PBRMetallicRoughness = PBRMetallicRoughness;`;function filterMaterialProperties()
{Object.defineProperty(this.PBRMetallicRoughness.prototype,"setBaseColorFactor",{value:()=>{throw new Error('Capability "material-properties" not allowed')},configurable:!1,writable:!1})}
function filterMessaging()
{const e=()=>{throw new Error('Capability "messaging" not allowed')},t=this.addEventListener;Object.defineProperties(this,{postMessage:{value:e,configurable:!1},MessageChannel:{value:e,configurable:!1},MessageEvent:{value:e,configurable:!1},onmessage:{set()
{e()},configurable:!1},addEventListener:{value:function(r,n,i)
{"message"===r&&e(),t.call(this,r,n,i)},configurable:!1}})}
function filterFetch()
{Object.defineProperties(this,{fetch:{value:()=>{throw new Error('Capability "fetch" not allowed')},configurable:!1}})}
const capabilityFilterMap={messaging:filterMessaging,"material-properties":filterMaterialProperties,fetch:filterFetch},generateCapabilityFilter=e=>{const t=Object.keys(capabilityFilterMap),r=[];for(const n of t)
{if(e.indexOf(n)>-1)continue;const t=capabilityFilterMap[n];r.push(`(${t.toString()}).call(self);`)}
return r.join("\n")};function patchContext(e,t)
{for(;e&&e.constructor!==EventTarget;)Object.getOwnPropertyNames(e).forEach(r=>{if(!t.hasOwnProperty(r)||!0!==t[r])try
{delete e[r]}
catch(e)
{console.warn(e)}}),e=Object.getPrototypeOf(e)}
const generateContextPatch=e=>`(${patchContext.toString()})(self, ${JSON.stringify(e)});`;function initialize(e,t)
{let r=null;t.addEventListener("message",n=>{const
{data:i}=n;if(i&&i.type&&i.type===ThreeDOMMessageType.HANDSHAKE)
{const i=n.ports[0];i.addEventListener("message",n=>{const
{data:i}=n;if(i&&i.type)switch(i.type)
{case ThreeDOMMessageType.MODEL_CHANGE:{const t=null!=r?r.model:void 0,a=i.model,o=n.ports[0];if(null!=r)r.deactivate();else if(null==a)break;null!=a?(r=new e(o,a),this.model=r.model):(r=null,this.model=void 0);const s=new Event("model-change");s.previousModel=t,s.model=this.model,this.dispatchEvent(s);break}
case ThreeDOMMessageType.IMPORT_SCRIPT:{const e=i.url;e&&t.importScripts(e);break}}}),i.start(),i.postMessage({type:ThreeDOMMessageType.CONTEXT_INITIALIZED})}})}
const generateInitializer=()=>initialize.toString();var _a$f,_b$d;const $modelGraft=Symbol("modelGraft"),$port=Symbol("port"),$messageEventHandler=Symbol("messageEventHandler"),$onMessageEvent=Symbol("onMessageEvent");class ModelGraftManipulator
{constructor(e,t)
{this[_a$f]=(e=>this[$onMessageEvent](e)),this[$modelGraft]=e,this[$port]=t,this[$port].addEventListener("message",this[$messageEventHandler]),this[$port].start()}
dispose()
{this[$port].removeEventListener("message",this[$messageEventHandler]),this[$port].close()}[(_a$f=$messageEventHandler,$onMessageEvent)](e)
{const
{data:t}=e;if(t&&t.type&&t.type===ThreeDOMMessageType.MUTATE)
{let e=!1;const{mutationId:r}=t;try
{this[$modelGraft].mutate(t.id,t.property,t.value),e=!0}
finally
{this[$port].postMessage({type:ThreeDOMMessageType.MUTATION_RESULT,applied:e,mutationId:r})}}}}
const ALL_CAPABILITIES=Object.freeze(["messaging","material-properties","fetch"]),generateContextScriptSource=(e=ALL_CAPABILITIES)=>`;(function() {\nvar ThreeDOMMessageType = ${JSON.stringify(ThreeDOMMessageType)};\n\nvar preservedContext = {\n  postMessage: self.postMessage.bind(self),\n  addEventListener: self.addEventListener.bind(self),\n  importScripts: self.importScripts.bind(self)\n};\n\n${generateContextPatch(ALLOWLISTED_GLOBALS)}\n${generateAPI()}\n${generateCapabilityFilter(e)}\n${generateInitializer()}\n\ninitialize.call(self, ModelKernel, preservedContext);\n\n})();`,$worker=Symbol("worker"),$workerInitializes=Symbol("workerInitializes"),$modelGraftManipulator=Symbol("modelGraftManipulator");class ThreeDOMExecutionContext extends EventTarget
{constructor(e)
{super(),this[_b$d]=null;const t=generateContextScriptSource(e),r=URL.createObjectURL(new Blob([t],{type:"text/javascript"}));this[$worker]=new Worker(r),this[$workerInitializes]=new Promise(e=>{const
{port1:t,port2:r}=new MessageChannel,n=r=>{r.data&&r.data.type===ThreeDOMMessageType.CONTEXT_INITIALIZED&&(t.removeEventListener("message",n),e(t))};this[$worker].postMessage({type:ThreeDOMMessageType.HANDSHAKE},[r]),t.addEventListener("message",n),t.start()})}
get worker()
{return this[$worker]}
async changeModel(e)
{const t=await this[$workerInitializes],{port1:r,port2:n}=new MessageChannel;t.postMessage({type:ThreeDOMMessageType.MODEL_CHANGE,model:null!=e&&null!=e.model?e.model.toJSON():null},[n]);const i=this[$modelGraftManipulator];null!=i&&(i.dispose(),this[$modelGraftManipulator]=null),null!=e&&(this[$modelGraftManipulator]=new ModelGraftManipulator(e,r))}
async eval(e)
{const t=await this[$workerInitializes],r=URL.createObjectURL(new Blob([e],{type:"text/javascript"}));t.postMessage({type:ThreeDOMMessageType.IMPORT_SCRIPT,url:r})}
async terminate()
{this[$worker].terminate();const e=this[$modelGraftManipulator];null!=e&&(e.dispose(),this[$modelGraftManipulator]=null),(await this[$workerInitializes]).close()}}
_b$d=$modelGraftManipulator;const getLocallyUniqueId=(()=>{let e=0;return()=>e++})();var _a$g;const $relatedObject=Symbol("relatedObject"),$graft=Symbol("graft"),$id=Symbol("id");class ThreeDOMElement
{constructor(e,t)
{this[_a$g]=getLocallyUniqueId(),this[$relatedObject]=t,this[$graft]=e,e.adopt(this)}
get ownerModel()
{return this[$graft].model}
get internalID()
{return this[$id]}
get name()
{const e=this[$relatedObject];return(e.isObject3D||e.isMaterial)&&e.userData?e.userData.name:null}
get relatedObject()
{return this[$relatedObject]}
toJSON()
{const e={id:this[$id]},{name:t}=this;return null!=t&&(e.name=t),e}}
_a$g=$id;const $threeMaterial=Symbol("threeMaterial");class PBRMetallicRoughness extends ThreeDOMElement
{get[$threeMaterial]()
{return this[$relatedObject]}
constructor(e,t)
{super(e,t)}
get baseColorFactor()
{const e=this[$threeMaterial];return e.color?[...e.color.toArray(),e.opacity]:[1,1,1,1]}
set baseColorFactor(e)
{this[$threeMaterial].color.fromArray(e),this[$threeMaterial].opacity=e[3]}
toJSON()
{const e=super.toJSON();return e.baseColorFactor=this.baseColorFactor,e}}
const $pbrMetallicRoughness=Symbol("pbrMetallicRoughness");class Material$1 extends ThreeDOMElement
{constructor(e,t)
{super(e,t),this[$pbrMetallicRoughness]=new PBRMetallicRoughness(e,t)}
get pbrMetallicRoughness()
{return this[$pbrMetallicRoughness]}
toJSON()
{const e=super.toJSON();return e.pbrMetallicRoughness=this.pbrMetallicRoughness.toJSON(),e}}
var _a$h,_b$e;const $modelUri=Symbol("modelUri"),$gltf=Symbol("gltf"),$materials=Symbol("materials");class Model$1 extends ThreeDOMElement
{constructor(e,t,r)
{super(e,r),this[_a$h]="",this[_b$e]=[],this[$modelUri]=t,this[$gltf]=r;const n=new Set;r.scene.traverse(t=>{const r=t;let i=[];r.isMesh&&null!=r.material&&(i=Array.isArray(r.material)?r.material:[r.material]);for(const t of i)n.has(t)||(this[$materials].push(new Material$1(e,t)),n.add(t))})}
get materials()
{return this[$materials]}
toJSON()
{const e=super.toJSON();return e.modelUri=this[$modelUri],e.materials=this[$materials].map(e=>e.toJSON()),e}}
var _a$i;_a$h=$modelUri,_b$e=$materials;const $model=Symbol("model"),$elementsByInternalId=Symbol("elementsByInternalId");class ModelGraft extends EventTarget
{constructor(e,t)
{super(),this[_a$i]=new Map,this[$model]=new Model$1(this,e,t)}
get model()
{return this[$model]}
getElementByInternalId(e)
{const t=this[$elementsByInternalId].get(e);return null==t?null:t}
adopt(e)
{this[$elementsByInternalId].set(e.internalID,e)}
mutate(e,t,r)
{const n=this.getElementByInternalId(e);null!=n&&t in n&&(n[t]=r,this.dispatchEvent(new CustomEvent("mutation",{detail:{element:n}})))}}
_a$i=$elementsByInternalId;var __decorate$7=function(e,t,r,n)
{for(var i,a=arguments.length,o=a<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n,s=e.length-1;s>=0;s--)(i=e[s])&&(o=(a<3?i(o):a>3?i(t,r,o):i(t,r))||o);return a>3&&o&&Object.defineProperty(t,r,o),o};const SCENE_GRAPH_SCRIPT_TYPE="experimental-scene-graph-worklet",VALID_CAPABILITIES=new Set(["messaging","fetch","material-properties"]),$onChildListMutation=Symbol("onChildListMutation"),$childListMutationHandler=Symbol("childListMutationHandler"),$mutationObserver=Symbol("mutationObserver"),$createExecutionContext=Symbol("createExecutionContext"),$onScriptElementAdded=Symbol("onScriptElementAdded"),$executionContext=Symbol("executionContext"),$updateExecutionContextModel=Symbol("updateExecutionContextModel"),$modelGraft$1=Symbol("modelGraft"),$onModelGraftMutation=Symbol("onModelGraftMutation"),$modelGraftMutationHandler=Symbol("modelGraftMutationHandler"),SceneGraphMixin=e=>{var t,r,n,i,a;class o extends e
{constructor()
{super(...arguments),this[a]=null,this[t]=(e=>this[$onChildListMutation](e)),this[r]=(e=>this[$onModelGraftMutation](e)),this[n]=new MutationObserver(this[$childListMutationHandler]),this[i]=null}
get worklet()
{const e=this[$executionContext];return null!=e?e.worker:null}
connectedCallback()
{super.connectedCallback(),this[$mutationObserver].observe(this,{childList:!0});const e=this.querySelector(`script[type="${SCENE_GRAPH_SCRIPT_TYPE}"]:last-of-type`);null!=e&&e.textContent&&this[$onScriptElementAdded](e)}
disconnectedCallback()
{super.disconnectedCallback(),this[$mutationObserver].disconnect(),null!=this[$executionContext]&&(this[$executionContext].terminate(),this[$executionContext]=null)}
updated(e)
{if(super.updated(e),e.has($modelGraft$1))
{const t=e.get($modelGraft$1);null!=t&&t.removeEventListener("mutation",this[$modelGraftMutationHandler]);const r=this[$modelGraft$1];null!=r&&r.addEventListener("mutation",this[$modelGraftMutationHandler])}}[(a=$modelGraft$1,t=$childListMutationHandler,r=$modelGraftMutationHandler,n=$mutationObserver,i=$executionContext,$onModelLoad)](e)
{super[$onModelLoad](e),this[$updateExecutionContextModel]()}[$onChildListMutation](e)
{if(null==this.parentNode)return;let t=null;for(const r of e)
for(const e of Array.from(r.addedNodes))e instanceof HTMLScriptElement&&e.textContent&&e.getAttribute("type")===SCENE_GRAPH_SCRIPT_TYPE&&(t=e);null!=t&&this[$onScriptElementAdded](t)}[$onScriptElementAdded](e)
{if(!e.textContent||e.getAttribute("type")!==SCENE_GRAPH_SCRIPT_TYPE)return;const t=(e.getAttribute("allow")||"").split(";").map(e=>e.trim()).filter(e=>VALID_CAPABILITIES.has(e));this[$createExecutionContext](e.textContent,t)}[$createExecutionContext](e,t)
{const r=this[$executionContext];null!=r&&r.terminate(),this[$executionContext]=new ThreeDOMExecutionContext(t),this[$executionContext].eval(e),this.dispatchEvent(new CustomEvent("worklet-created",{detail:{worklet:this.worklet}})),this[$updateExecutionContextModel]()}[$updateExecutionContextModel]()
{const e=this[$executionContext];if(null==e||null==this.parentNode)return;const t=this[$scene],r=this.loaded?new ModelGraft(t.model.url||"",{scene:t,scenes:[t],animations:[],cameras:[],parser:{},asset:{},userData:{}}):null;e.changeModel(r),this[$modelGraft$1]=r}[$onModelGraftMutation](e)
{this[$needsRender]()}}
return __decorate$7([property({type:Object})],o.prototype,a,void 0),o},$time=Symbol("time"),$duration=Symbol("duration");class Timer
{constructor(e)
{this[$duration]=e,this[$time]=0}
get time()
{return this[$time]}
get timeScale()
{return this[$time]/this[$duration]}
get duration()
{return this[$duration]}
get hasStopped()
{return this[$time]>=this[$duration]}
reset()
{this[$time]=0}
stop()
{this[$time]=this[$duration]}
tick(e)
{this[$time]+=e,this.time>=this[$duration]&&(this[$time]=this[$duration])}}
var __decorate$8=function(e,t,r,n)
{for(var i,a=arguments.length,o=a<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n,s=e.length-1;s>=0;s--)(i=e[s])&&(o=(a<3?i(o):a>3?i(t,r,o):i(t,r))||o);return a>3&&o&&Object.defineProperty(t,r,o),o};const ROTATION_SPEED=Math.PI/32,AUTO_ROTATE_DELAY_DEFAULT=3e3,$autoRotateTimer=Symbol("autoRotateTimer"),$cameraChangeHandler=Symbol("cameraChangeHandler"),$onCameraChange=Symbol("onCameraChange"),StagingMixin=e=>{var t,r;class n extends e
{constructor()
{super(...arguments),this.autoRotate=!0,this.autoRotateDelay=AUTO_ROTATE_DELAY_DEFAULT,this[t]=new Timer(this.autoRotateDelay),this[r]=(e=>this[$onCameraChange](e))}
connectedCallback()
{super.connectedCallback(),this.addEventListener("camera-change",this[$cameraChangeHandler]),this[$autoRotateTimer].stop()}
disconnectedCallback()
{super.disconnectedCallback(),this.removeEventListener("camera-change",this[$cameraChangeHandler]),this[$autoRotateTimer].stop()}
updated(e)
{if(super.updated(e),e.has("autoRotate")&&this[$needsRender](),e.has("autoRotateDelay"))
{const e=new Timer(this.autoRotateDelay);e.tick(this[$autoRotateTimer].time),e.hasStopped&&e.reset(),this[$autoRotateTimer]=e}}[(t=$autoRotateTimer,r=$cameraChangeHandler,$tick$1)](e,t)
{super[$tick$1](e,t),this.autoRotate&&this.modelIsVisible&&(this[$autoRotateTimer].tick(t),this[$autoRotateTimer].hasStopped&&(this[$scene].setPivotRotation(this[$scene].getPivotRotation()+ROTATION_SPEED*t*.001),this[$needsRender]()))}[$onCameraChange](e)
{this.autoRotate&&"user-interaction"===e.detail.source&&this[$autoRotateTimer].reset()}
get turntableRotation()
{return this[$scene].getPivotRotation()}
resetTurntableRotation()
{this[$scene].setPivotRotation(0),this[$needsRender]()}}
return __decorate$8([property({type:Boolean,attribute:"auto-rotate"})],n.prototype,"autoRotate",void 0),__decorate$8([property({type:Number,attribute:"auto-rotate-delay"})],n.prototype,"autoRotateDelay",void 0),n},FocusVisiblePolyfillMixin=e=>{var t;const r=e=>{if(null==e.shadowRoot||e.hasAttribute("data-js-focus-visible"))return()=>{};if(!self.applyFocusVisiblePolyfill)
{const t=()=>{self.applyFocusVisiblePolyfill(e.shadowRoot)};return self.addEventListener("focus-visible-polyfill-ready",t,{once:!0}),()=>{self.removeEventListener("focus-visible-polyfill-ready",t)}}
return self.applyFocusVisiblePolyfill(e.shadowRoot),()=>{}},n=Symbol("endPolyfillCoordination");return t=n,class extends e
{constructor()
{super(...arguments),this[t]=null}
connectedCallback()
{super.connectedCallback&&super.connectedCallback(),null==this[n]&&(this[n]=r(this))}
disconnectedCallback()
{super.disconnectedCallback&&super.disconnectedCallback(),null!=this[n]&&(this[n](),this[n]=null)}}},ModelViewerElement=SceneGraphMixin(MagicLeapMixin(AnnotationMixin(StagingMixin(EnvironmentMixin(ControlsMixin(ARMixin(LoadingMixin(AnimationMixin(FocusVisiblePolyfillMixin(ModelViewerElementBase))))))))));customElements.define("model-viewer",ModelViewerElement);export{ModelViewerElement}