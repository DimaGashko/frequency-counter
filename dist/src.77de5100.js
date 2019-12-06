// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"../node_modules/throttle-debounce/dist/index.esm.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.throttle = throttle;
exports.debounce = debounce;

/* eslint-disable no-undefined,no-param-reassign,no-shadow */

/**
 * Throttle execution of a function. Especially useful for rate limiting
 * execution of handlers on events like resize and scroll.
 *
 * @param  {Number}    delay          A zero-or-greater delay in milliseconds. For event callbacks, values around 100 or 250 (or even higher) are most useful.
 * @param  {Boolean}   [noTrailing]   Optional, defaults to false. If noTrailing is true, callback will only execute every `delay` milliseconds while the
 *                                    throttled-function is being called. If noTrailing is false or unspecified, callback will be executed one final time
 *                                    after the last throttled-function call. (After the throttled-function has not been called for `delay` milliseconds,
 *                                    the internal counter is reset)
 * @param  {Function}  callback       A function to be executed after delay milliseconds. The `this` context and all arguments are passed through, as-is,
 *                                    to `callback` when the throttled-function is executed.
 * @param  {Boolean}   [debounceMode] If `debounceMode` is true (at begin), schedule `clear` to execute after `delay` ms. If `debounceMode` is false (at end),
 *                                    schedule `callback` to execute after `delay` ms.
 *
 * @return {Function}  A new, throttled, function.
 */
function throttle(delay, noTrailing, callback, debounceMode) {
  /*
   * After wrapper has stopped being called, this timeout ensures that
   * `callback` is executed at the proper times in `throttle` and `end`
   * debounce modes.
   */
  var timeoutID;
  var cancelled = false; // Keep track of the last time `callback` was executed.

  var lastExec = 0; // Function to clear existing timeout

  function clearExistingTimeout() {
    if (timeoutID) {
      clearTimeout(timeoutID);
    }
  } // Function to cancel next exec


  function cancel() {
    clearExistingTimeout();
    cancelled = true;
  } // `noTrailing` defaults to falsy.


  if (typeof noTrailing !== 'boolean') {
    debounceMode = callback;
    callback = noTrailing;
    noTrailing = undefined;
  }
  /*
   * The `wrapper` function encapsulates all of the throttling / debouncing
   * functionality and when executed will limit the rate at which `callback`
   * is executed.
   */


  function wrapper() {
    var self = this;
    var elapsed = Date.now() - lastExec;
    var args = arguments;

    if (cancelled) {
      return;
    } // Execute `callback` and update the `lastExec` timestamp.


    function exec() {
      lastExec = Date.now();
      callback.apply(self, args);
    }
    /*
     * If `debounceMode` is true (at begin) this is used to clear the flag
     * to allow future `callback` executions.
     */


    function clear() {
      timeoutID = undefined;
    }

    if (debounceMode && !timeoutID) {
      /*
       * Since `wrapper` is being called for the first time and
       * `debounceMode` is true (at begin), execute `callback`.
       */
      exec();
    }

    clearExistingTimeout();

    if (debounceMode === undefined && elapsed > delay) {
      /*
       * In throttle mode, if `delay` time has been exceeded, execute
       * `callback`.
       */
      exec();
    } else if (noTrailing !== true) {
      /*
       * In trailing throttle mode, since `delay` time has not been
       * exceeded, schedule `callback` to execute `delay` ms after most
       * recent execution.
       *
       * If `debounceMode` is true (at begin), schedule `clear` to execute
       * after `delay` ms.
       *
       * If `debounceMode` is false (at end), schedule `callback` to
       * execute after `delay` ms.
       */
      timeoutID = setTimeout(debounceMode ? clear : exec, debounceMode === undefined ? delay - elapsed : delay);
    }
  }

  wrapper.cancel = cancel; // Return the wrapper function.

  return wrapper;
}
/* eslint-disable no-undefined */

/**
 * Debounce execution of a function. Debouncing, unlike throttling,
 * guarantees that a function is only executed a single time, either at the
 * very beginning of a series of calls, or at the very end.
 *
 * @param  {Number}   delay         A zero-or-greater delay in milliseconds. For event callbacks, values around 100 or 250 (or even higher) are most useful.
 * @param  {Boolean}  [atBegin]     Optional, defaults to false. If atBegin is false or unspecified, callback will only be executed `delay` milliseconds
 *                                  after the last debounced-function call. If atBegin is true, callback will be executed only at the first debounced-function call.
 *                                  (After the throttled-function has not been called for `delay` milliseconds, the internal counter is reset).
 * @param  {Function} callback      A function to be executed after delay milliseconds. The `this` context and all arguments are passed through, as-is,
 *                                  to `callback` when the debounced-function is executed.
 *
 * @return {Function} A new, debounced function.
 */


function debounce(delay, atBegin, callback) {
  return callback === undefined ? throttle(delay, atBegin, false) : throttle(delay, callback, atBegin !== false);
}
},{}],"../../../../../../usr/lib/node_modules/parcel-bundler/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;

function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp|chrome-extension|moz-extension):\/\/[^)\n]+/g);

    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp|chrome-extension|moz-extension):\/\/.+)\/[^/]+$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"../../../../../../usr/lib/node_modules/parcel-bundler/src/builtins/css-loader.js":[function(require,module,exports) {
var bundle = require('./bundle-url');

function updateLink(link) {
  var newLink = link.cloneNode();

  newLink.onload = function () {
    link.remove();
  };

  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;

function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');

    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

module.exports = reloadCSS;
},{"./bundle-url":"../../../../../../usr/lib/node_modules/parcel-bundler/src/builtins/bundle-url.js"}],"../node_modules/normalize.scss/normalize.scss":[function(require,module,exports) {

        var reloadCSS = require('_css_loader');
        module.hot.dispose(reloadCSS);
        module.hot.accept(reloadCSS);
      
},{"_css_loader":"../../../../../../usr/lib/node_modules/parcel-bundler/src/builtins/css-loader.js"}],"index.scss":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"../../../../../../usr/lib/node_modules/parcel-bundler/src/builtins/css-loader.js"}],"scripts/algorithms/char-frequency/_calc-frequency.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _calcFrequency(arr) {
  var charsMap = new Map();
  var frequencyMap = new Map();
  arr.forEach(function (char) {
    if (charsMap.has(char)) {
      charsMap.set(char, charsMap.get(char) + 1);
    } else {
      charsMap.set(char, 1);
    }
  });
  charsMap.forEach(function (value, key) {
    frequencyMap.set(key, value / arr.length);
  });
  return frequencyMap;
}

exports.default = _calcFrequency;
},{}],"scripts/algorithms/char-frequency/calc-char-pair-frequency.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _calc_frequency_1 = __importDefault(require("./_calc-frequency"));
/**
 * Calculate frequency of two-character sequences in the text
 * @param text
 * @returns map of two-character sequences and its frequency (in range [0, 1])
 */


function calcCharPairFrequency(text) {
  text = text.toLowerCase().replace(/[^a-zа-яёїієґ]+/g, '');
  var pairs = toPairs(text);
  return _calc_frequency_1.default(pairs);
}

exports.default = calcCharPairFrequency;

function toPairs(text) {
  var chars = text.split('');
  var pairs = [];
  var len = chars.length;

  for (var i = 0; i < len - 1; i++) {
    pairs.push(chars[i] + chars[i + 1]);
  }

  return pairs;
}
},{"./_calc-frequency":"scripts/algorithms/char-frequency/_calc-frequency.ts"}],"scripts/algorithms/char-frequency/calc-char-frequency.ts":[function(require,module,exports) {
"use strict";

var __assign = this && this.__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
    }

    return t;
  };

  return __assign.apply(this, arguments);
};

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _calc_frequency_1 = __importDefault(require("./_calc-frequency"));

var DEF_FREQUENCY_OPTIONS = {
  ignoreCase: true,
  spaces: false,
  digits: false,
  punctuation: false
};
/**
 * Calculate character frequency in the text
 * @param text
 * @param options
 * @returns map of characters and character frequency (in range [0, 1])
 */

function calcCharFrequency(text, options) {
  console.log(options);
  options = __assign(__assign({}, DEF_FREQUENCY_OPTIONS), options || {});
  text = prepareText(text, options);
  return _calc_frequency_1.default(text.split(''));
}

exports.default = calcCharFrequency;

function prepareText(text, options) {
  var ignoreCase = options.ignoreCase,
      spaces = options.spaces,
      digits = options.digits,
      punctuation = options.punctuation;
  text = text.trim();
  if (ignoreCase) text = text.toLowerCase();
  if (!spaces) text = text.replace(/\s+/g, '');
  if (!digits) text = text.replace(/\d+/g, '');

  if (!punctuation) {
    text = text.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]+/g, '');
  }

  return text;
}
},{"./_calc-frequency":"scripts/algorithms/char-frequency/_calc-frequency.ts"}],"scripts/Events.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Events =
/** @class */
function () {
  function Events() {
    this._handlers = {};
  }

  Events.prototype.addListener = function (type, handler) {
    this._handlers[type] = this._handlers[type] || [];

    this._handlers[type].push(handler);

    return handler;
  };

  Events.prototype.removeListener = function (type, handler) {
    if (!this._handlers[type]) return;
    this._handlers[type] = this._handlers[type].filter(function (item) {
      return item != handler;
    });
  };

  Events.prototype.emit = function (type) {
    var args = [];

    for (var _i = 1; _i < arguments.length; _i++) {
      args[_i - 1] = arguments[_i];
    }

    if (!(type in this._handlers)) return;

    this._handlers[type].forEach(function (handler) {
      handler.apply(void 0, args);
    });
  };

  return Events;
}();

exports.default = Events;
},{}],"scripts/editor.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var throttle_debounce_1 = require("throttle-debounce");

var Events_1 = __importDefault(require("./Events"));

var Editor =
/** @class */
function () {
  function Editor(root) {
    this.root = root;
    this.MAX_HIGHLIGHT_LEN = 5000;
    this.MAX_LIVE_HIGHLIGHT_LEN = 1000;
    this._value = '';
    this.$ = {};
    this._decTextUpdatingFrame = 0;
    this._highlight = false;
    this._highlightMap = new Map();
    this._highlightIgnoreCase = false;
    this.events = new Events_1.default();
    this.init();
  }

  Editor.prototype.init = function () {
    this.getElements();
    this.initValue();
    this.setHighlight(this._highlight);
    this.initEvents();
  };

  Editor.prototype.setHighlight = function (val) {
    this._highlight = val;
    this.updateDecText();
    var type = val ? 'remove' : 'add';
    this.root.classList[type]('app-editor--no-highlight');
  };

  Editor.prototype.setHighlightMap = function (highlightMap) {
    this._highlightMap = highlightMap;
    this.updateDecText();
  };

  Editor.prototype.getText = function () {
    return this._value;
  };

  Editor.prototype.initEvents = function () {
    var _this = this;

    this.$.realText.addEventListener('input', function () {
      if (_this._value.length > _this.MAX_LIVE_HIGHLIGHT_LEN) {
        return;
      }

      _this.startDecTextUpdating();

      setTimeout(function () {
        return _this.stopDecTextUpdating();
      }, 1000);
    });
    this.$.realText.addEventListener('input', throttle_debounce_1.throttle(300, function () {
      if (_this._value.length > _this.MAX_LIVE_HIGHLIGHT_LEN) {
        _this.updateDecTextScrolls();

        _this.readRealText();
      }
    }));
    this.$.realText.addEventListener('keyup', throttle_debounce_1.throttle(300, function () {
      _this.stopDecTextUpdating();

      _this.updateDecTextScrolls();

      _this.readRealText();

      _this.events.emit('input');
    }));
    this.$.realText.addEventListener('scroll', function () {
      _this.updateDecTextScrolls();
    });
  };
  /** Start automatic dec text updating */


  Editor.prototype.startDecTextUpdating = function () {
    if (this._decTextUpdatingFrame) return;
    var editor = this;
    this._decTextUpdatingFrame = requestAnimationFrame(function tik() {
      editor.readRealText();
      editor._decTextUpdatingFrame = requestAnimationFrame(tik);
    });
  };

  Editor.prototype.stopDecTextUpdating = function () {
    cancelAnimationFrame(this._decTextUpdatingFrame);
    this._decTextUpdatingFrame = 0;
  };

  Editor.prototype.readRealText = function () {
    this._value = this.$.realText.value;
    this.updateDecText();
  };

  Editor.prototype.updateDecTextScrolls = function () {
    this.$.decText.scrollTop = this.$.realText.scrollTop;
    this.$.decText.scrollLeft = this.$.realText.scrollLeft;
  };

  Editor.prototype.updateDecText = function () {
    var _this = this;

    if (!this._highlight || this._value.length > this.MAX_HIGHLIGHT_LEN) {
      this.$.decText.innerHTML = this._value;
      return;
    }

    this.$.decText.innerHTML = this._value.split('').map(function (item, i) {
      var map = _this._highlightMap;
      item = _this.escape(item);

      if (!map.has(item) && !map.has(item.toLowerCase())) {
        return item;
      }

      var color = map.get(item) || map.get(item.toLowerCase());
      return "<span style=\"color: " + color + "\">" + item + "</span>";
    }).join('');
  };

  Editor.prototype.escape = function (str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;');
  };

  Editor.prototype.initValue = function () {
    this._value = this.$.realText.value;
  };

  Editor.prototype.getElements = function () {
    this.$.decText = this.root.querySelector('.app-editor__dec-text');
    this.$.realText = this.root.querySelector('.app-editor__real-text');
  };

  return Editor;
}();

exports.default = Editor;
},{"throttle-debounce":"../node_modules/throttle-debounce/dist/index.esm.js","./Events":"scripts/Events.ts"}],"index.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var throttle_debounce_1 = require("throttle-debounce");

require("normalize.scss/normalize.scss");

require("./index.scss");

var calc_char_pair_frequency_1 = __importDefault(require("./scripts/algorithms/char-frequency/calc-char-pair-frequency"));

var calc_char_frequency_1 = __importDefault(require("./scripts/algorithms/char-frequency/calc-char-frequency"));

var editor_1 = __importDefault(require("./scripts/editor"));

var $ = {};
$.root = document.querySelector('.app');
$.editor = $.root.querySelector('.app-editor');
var toolbarForm = $.root.querySelector('.app-toolbar__form');
var editor = new editor_1.default($.editor);
var run = throttle_debounce_1.debounce(500, function run() {
  var text = editor.getText();
  var frequency = calc_char_frequency_1.default(text, {
    ignoreCase: toolbarForm.case.checked,
    spaces: !toolbarForm.spaces.checked,
    digits: !toolbarForm.digits.checked,
    punctuation: !toolbarForm.punctuation.checked
  });
  var highlightMap = frequencyToHighlightMap(frequency);
  editor.setHighlightMap(highlightMap);
  console.log(frequency);
  console.log(highlightMap);
});
init();
initEvents();
run();

function init() {
  editor.setHighlight(toolbarForm.highlight.checked);
}

function initEvents() {
  editor.events.addListener('input', function () {
    run();
  });
  toolbarForm.highlight.addEventListener('change', function () {
    editor.setHighlight(toolbarForm.highlight.checked);
  });
  toolbarForm.case.addEventListener('change', run);
  toolbarForm.spaces.addEventListener('change', run);
  toolbarForm.digits.addEventListener('change', run);
  toolbarForm.punctuation.addEventListener('change', run);
}

function frequencyToHighlightMap(frequency) {
  var highlightMap = new Map();
  var maxFrequency = getMostFrequent(frequency).val;
  frequency.forEach(function (value, key) {
    highlightMap.set(key, "rgb(" + value * 255 / maxFrequency + ",0,0)");
  });
  return highlightMap;
}

function getMostFrequent(frequency) {
  var val = 0;
  var key = null;
  frequency.forEach(function (curVal, curKey) {
    if (val >= curVal) return;
    val = curVal;
    key = curKey;
  });
  return {
    val: val,
    key: key
  };
}

window.calcCharFrequency = calc_char_frequency_1.default;
window.calcCharPairFrequency = calc_char_pair_frequency_1.default;
},{"throttle-debounce":"../node_modules/throttle-debounce/dist/index.esm.js","normalize.scss/normalize.scss":"../node_modules/normalize.scss/normalize.scss","./index.scss":"index.scss","./scripts/algorithms/char-frequency/calc-char-pair-frequency":"scripts/algorithms/char-frequency/calc-char-pair-frequency.ts","./scripts/algorithms/char-frequency/calc-char-frequency":"scripts/algorithms/char-frequency/calc-char-frequency.ts","./scripts/editor":"scripts/editor.ts"}],"../../../../../../usr/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "43145" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../../../../usr/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.ts"], null)
//# sourceMappingURL=/src.77de5100.js.map