parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"M1bX":[function(require,module,exports) {
"use strict";function o(o,t,e,n){var i,u=!1,r=0;function c(){i&&clearTimeout(i)}function a(){var a=this,f=Date.now()-r,d=arguments;function s(){r=Date.now(),e.apply(a,d)}u||(n&&!i&&s(),c(),void 0===n&&f>o?s():!0!==t&&(i=setTimeout(n?function(){i=void 0}:s,void 0===n?o-f:o)))}return"boolean"!=typeof t&&(n=e,e=t,t=void 0),a.cancel=function(){c(),u=!0},a}function t(t,e,n){return void 0===n?o(t,e,!1):o(t,n,!1!==e)}Object.defineProperty(exports,"__esModule",{value:!0}),exports.throttle=o,exports.debounce=t;
},{}],"LqxF":[function(require,module,exports) {

},{}],"n7g0":[function(require,module,exports) {
"use strict";function e(e){var t=new Map,n=new Map;return e.forEach(function(e){t.has(e)?t.set(e,t.get(e)+1):t.set(e,1)}),t.forEach(function(t,r){n.set(r,t/e.length)}),n}Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=e;
},{}],"DWo4":[function(require,module,exports) {
"use strict";var e=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(exports,"__esModule",{value:!0});var r=e(require("./_calc-frequency"));function t(e){var t=u(e=e.toLowerCase().replace(/[^a-zа-яёїієґ]+/g,""));return r.default(t)}function u(e){for(var r=e.split(""),t=[],u=r.length,a=0;a<u-1;a++)t.push(r[a]+r[a+1]);return t}exports.default=t;
},{"./_calc-frequency":"n7g0"}],"gQxs":[function(require,module,exports) {
"use strict";var e=this&&this.__assign||function(){return(e=Object.assign||function(e){for(var t,r=1,n=arguments.length;r<n;r++)for(var s in t=arguments[r])Object.prototype.hasOwnProperty.call(t,s)&&(e[s]=t[s]);return e}).apply(this,arguments)},t=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(exports,"__esModule",{value:!0});var r=t(require("./_calc-frequency")),n={ignoreCase:!0,spaces:!1,digits:!1,punctuation:!1};function s(t,s){return console.log(s),t=i(t,s=e(e({},n),s||{})),r.default(t.split(""))}function i(e,t){var r=t.ignoreCase,n=t.spaces,s=t.digits,i=t.punctuation;return e=e.trim(),r&&(e=e.toLowerCase()),n||(e=e.replace(/\s+/g,"")),s||(e=e.replace(/\d+/g,"")),i||(e=e.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]+/g,"")),e}exports.default=s;
},{"./_calc-frequency":"n7g0"}],"ugEF":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var t=function(){function t(){this._handlers={}}return t.prototype.addListener=function(t,e){return this._handlers[t]=this._handlers[t]||[],this._handlers[t].push(e),e},t.prototype.removeListener=function(t,e){this._handlers[t]&&(this._handlers[t]=this._handlers[t].filter(function(t){return t!=e}))},t.prototype.emit=function(t){for(var e=[],n=1;n<arguments.length;n++)e[n-1]=arguments[n];t in this._handlers&&this._handlers[t].forEach(function(t){t.apply(void 0,e)})},t}();exports.default=t;
},{}],"jbKP":[function(require,module,exports) {
"use strict";var t=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(exports,"__esModule",{value:!0});var e=require("throttle-debounce"),i=t(require("./Events")),n=function(){function t(t){this.root=t,this.MAX_HIGHLIGHT_LEN=5e3,this.MAX_LIVE_HIGHLIGHT_LEN=1e3,this._value="",this.$={},this._decTextUpdatingFrame=0,this._highlight=!1,this._highlightMap=new Map,this.events=new i.default,this.init()}return t.prototype.init=function(){this.getElements(),this.initValue(),this.setHighlight(this._highlight),this.initEvents()},t.prototype.setHighlight=function(t){this._highlight=t,this.updateDecText();var e=t?"remove":"add";this.root.classList[e]("app-editor--no-highlight")},t.prototype.setHighlightMap=function(t){this._highlightMap=t,this.updateDecText()},t.prototype.getText=function(){return this._value},t.prototype.initEvents=function(){var t=this;this.$.realText.addEventListener("input",function(){t._value.length>t.MAX_LIVE_HIGHLIGHT_LEN||(t.startDecTextUpdating(),setTimeout(function(){return t.stopDecTextUpdating()},1e3))}),this.$.realText.addEventListener("input",e.throttle(300,function(){t._value.length>t.MAX_LIVE_HIGHLIGHT_LEN&&(t.updateDecTextScrolls(),t.readRealText())})),this.$.realText.addEventListener("keyup",e.throttle(300,function(){t.stopDecTextUpdating(),t.updateDecTextScrolls(),t.readRealText(),t.events.emit("input")})),this.$.realText.addEventListener("scroll",function(){t.updateDecTextScrolls()})},t.prototype.startDecTextUpdating=function(){if(!this._decTextUpdatingFrame){var t=this;this._decTextUpdatingFrame=requestAnimationFrame(function e(){t.readRealText(),t._decTextUpdatingFrame=requestAnimationFrame(e)})}},t.prototype.stopDecTextUpdating=function(){cancelAnimationFrame(this._decTextUpdatingFrame),this._decTextUpdatingFrame=0},t.prototype.readRealText=function(){this._value=this.$.realText.value,this.updateDecText()},t.prototype.updateDecTextScrolls=function(){this.$.decText.scrollTop=this.$.realText.scrollTop,this.$.decText.scrollLeft=this.$.realText.scrollLeft},t.prototype.updateDecText=function(){var t=this;!this._highlight||this._value.length>this.MAX_HIGHLIGHT_LEN?this.$.decText.innerHTML=this._value:this.$.decText.innerHTML=this._value.split("").map(function(e,i){return e=t.escape(e),t._highlightMap.has(e)?'<span style="color: '+t._highlightMap.get(e)+'">'+e+"</span>":e}).join("")},t.prototype.escape=function(t){return t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")},t.prototype.initValue=function(){this._value=this.$.realText.value},t.prototype.getElements=function(){this.$.decText=this.root.querySelector(".app-editor__dec-text"),this.$.realText=this.root.querySelector(".app-editor__real-text")},t}();exports.default=n;
},{"throttle-debounce":"M1bX","./Events":"ugEF"}],"QCba":[function(require,module,exports) {
"use strict";var e=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(exports,"__esModule",{value:!0});var t=require("throttle-debounce");require("normalize.scss/normalize.scss"),require("./index.scss");var r=e(require("./scripts/algorithms/char-frequency/calc-char-pair-frequency")),c=e(require("./scripts/algorithms/char-frequency/calc-char-frequency")),n=e(require("./scripts/editor")),i={};i.root=document.querySelector(".app"),i.editor=i.root.querySelector(".app-editor");var a=i.root.querySelector(".app-toolbar__form"),o=new n.default(i.editor),s=t.debounce(500,function(){var e=o.getText(),t=c.default(e,{ignoreCase:a.case.checked,spaces:!a.spaces.checked,digits:!a.digits.checked,punctuation:!a.punctuation.checked}),r=h(t);o.setHighlightMap(r),console.log(t),console.log(r)});function u(){o.setHighlight(a.highlight.checked)}function d(){o.events.addListener("input",function(){s()}),a.highlight.addEventListener("change",function(){o.setHighlight(a.highlight.checked)}),a.case.addEventListener("change",s),a.spaces.addEventListener("change",s),a.digits.addEventListener("change",s),a.punctuation.addEventListener("change",s)}function h(e){var t=new Map,r=l(e).val;return e.forEach(function(e,c){t.set(c,"rgb("+255*e/r+",0,0)")}),t}function l(e){var t=0,r=null;return e.forEach(function(e,c){t>=e||(t=e,r=c)}),{val:t,key:r}}u(),d(),s(),window.calcCharFrequency=c.default,window.calcCharPairFrequency=r.default;
},{"throttle-debounce":"M1bX","normalize.scss/normalize.scss":"LqxF","./index.scss":"LqxF","./scripts/algorithms/char-frequency/calc-char-pair-frequency":"DWo4","./scripts/algorithms/char-frequency/calc-char-frequency":"gQxs","./scripts/editor":"jbKP"}]},{},["QCba"], null)
//# sourceMappingURL=src.b2cd4753.js.map