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
})({"src/scripts/util.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Utility function to generate random integers between
 * @param min value include
 * @param max value included
 */

function randomBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

exports.randomBetween = randomBetween;
/**
 * Utility function to generate random floats between
 * @param min value include
 * @param max value included
 */

function randomFloatBetween(min, max) {
  return Math.random() * (max - min + 1) + min;
}

exports.randomFloatBetween = randomFloatBetween;
},{}],"src/index.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var util_1 = require("./scripts/util");

if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
  console.log(true);
} else {
  console.log(false);
} //* Hamburger functionality


var button = document.querySelector(".ham-container");
var linkWrap = document.querySelector(".link-wrap");

function toggleMenu() {
  button.classList.toggle("is-open");
  linkWrap.classList.toggle("is-visible");
}

button.addEventListener("click", toggleMenu); //* Navigation positioning

var nav = document.getElementsByTagName("nav")[0];
var navTopPos = document.querySelector(".home-wrap").offsetHeight - 53;
var lastPos = 0;
var isFixed = false;
/**
 * Closes mobile hamburger menu if window size increases
 * to desktop size and hamburger menu was left open
 */

var hamCont = document.querySelector(".ham-container");
window.addEventListener("resize", function () {
  var winWidth = window.innerWidth;

  if (winWidth >= 600 && hamCont.classList.contains("is-open")) {
    hamCont.classList.remove("is-open");
    linkWrap.classList.remove("is-visible");
  }
});
window.addEventListener("scroll", function () {
  var winYPos = window.scrollY;

  if (winYPos >= navTopPos && lastPos < winYPos && !isFixed) {
    nav.classList.add("fixed");
    isFixed = true;
  }

  if (winYPos <= navTopPos && lastPos > winYPos && isFixed) {
    nav.classList.remove("fixed");
    isFixed = false;
  }

  lastPos = winYPos;

  if (winYPos >= navTopPos / 2 && scrollBtn.style.opacity == 0) {
    scrollBtn.style.cssText = "opacity: 0.8";
    scrollBtn.style.visibility = "visible";
    setCanvasAnim(false);
  }

  if (winYPos < navTopPos / 2 && scrollBtn.style.opacity == 0.8) {
    scrollBtn.style.cssText = "opacity: 0";
    scrollBtn.style.visibility = "hidden";
    setCanvasAnim(true);
  }
});

window.onresize = function () {
  navTopPos = document.querySelector(".home-wrap").offsetHeight - 53; // Adjust Canvas size

  canvas.width = canvas.parentNode.offsetWidth * dpi;
  canvas.height = canvas.parentNode.offsetHeight * dpi;
  drawCanvas();
  updatePointsPos();
};
/**
 * Scroll button functionality
 */


var scrollBtn = document.querySelector(".scroll-button");
scrollBtn.addEventListener("click", function () {
  return scrollToTop(0, 50);
});

function scrollToTop(to, duration) {
  if (duration < 0) {
    return;
  }

  var difference = to - window.scrollY;
  var perTick = difference / duration * 2;
  setTimeout(function () {
    window.scrollTo(0, window.scrollY + perTick);
    scrollToTop(to, duration - 2);
  }, 10);
}
/** Header Canvas Background animation */


var canvas = document.getElementById("animation-canvas");
var ctx = canvas.getContext("2d");
var dpi = window.devicePixelRatio;
canvas.width = canvas.parentNode.offsetWidth * dpi;
canvas.height = canvas.parentNode.offsetHeight * dpi;
var points = [];
var canvasOrig = {
  w: canvas.width,
  h: canvas.height
};
var colorSelect = ["#ee79b6", "#9d3e60", "#e6627d"];
var isPlaying = true;
var isAnimLoopPaused = false;

function setCanvasAnim(value) {
  isPlaying = value;

  if (isPlaying) {
    isAnimLoopPaused = false;
    startPointAnim();
  } else {
    isAnimLoopPaused = true;
    pausePointAnim();
  }
}
/**
 * Initializes the properties of each Point
 * Then calls itself
 */


(function setPoints() {
  var maxPoint = 13;

  for (var i = 0; i < maxPoint; i++) {
    var x = i * (canvas.width / maxPoint) + canvas.width * 0.05;

    for (var j = 0; j < maxPoint; j++) {
      var y = j * ((canvas.height - 50) / maxPoint) + canvas.height * 0.05;
      points.push({
        x: x,
        y: y,
        origX: x,
        origY: y,
        size: util_1.randomBetween(2, 5),
        color: "rgba(255, 255, 255, 1)"
      });
    }
  }
})();

function getDistance(pointA, pointB) {
  return Math.sqrt(Math.pow(pointB.x - pointA.x, 2) + Math.pow(pointB.y - pointA.y, 2));
}
/** Redraws the Canvas
 * @param ctx takes a Context
 */


function drawCanvas() {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  points.forEach(function (point) {
    drawLines(point);
    drawCircle(point);
  });
}
/**
 * Draws a Circle with given params
 * @param point to be drawn on the screen
 */


function drawCircle(point) {
  ctx.beginPath();
  ctx.arc(point.x, point.y, point.size, 0, 2 * Math.PI, false);
  ctx.fillStyle = "rgba(255, 255, 255,\n    " + point.y / 1.1 / canvas.height + " )"; //Opacity based on height

  ctx.fill();
}
/**
 * Moves the animation one 'tick' or 'step'
 */


function step() {
  !isAnimLoopPaused && drawCanvas();
  window.requestAnimationFrame(step);
}

window.requestAnimationFrame(step);

function startPointAnim() {
  points.forEach(function (point) {
    updatePoint(point);
  });
}

startPointAnim();

function pausePointAnim() {
  points.forEach(function (point) {
    point.anim.pause();
  });
}

function drawLines(point) {
  points.forEach(function (nextPoint) {
    var distance = getDistance(point, nextPoint);
    var val = 8;
    var maxDist = canvas.width / val > canvas.height / val ? canvas.width / val : canvas.height / val;

    if (point != nextPoint && distance < maxDist) {
      ctx.beginPath();
      ctx.moveTo(point.x, point.y);
      ctx.lineTo(nextPoint.x, nextPoint.y);
      ctx.lineWidth = 1.5;
      ctx.strokeStyle = "rgba(255, 255, 255," + (maxDist - distance) / (maxDist * 3) * (point.y / 1.1 / canvas.height) + ")"; // To Set opacity based on Height

      ctx.stroke();
    }
  });
}
/**
 * Animates a point to random canvas locations
 * @param point whose properties will be animated
 */


function updatePoint(point) {
  var val = 15;
  var change = canvas.width / val > canvas.height / val ? canvas.width / val : canvas.height / val;
  point.anim = gsap.to(point, util_1.randomFloatBetween(1, 2), {
    x: util_1.randomBetween(point.origX - change, point.origX + change),
    y: util_1.randomBetween(point.origY - change, point.origY + change),
    size: util_1.randomBetween(2, 5),
    ease: "power1.inOut",
    onComplete: function onComplete() {
      updatePoint(point);
    }
  });
}
/**
 * Updates position (evely distributed) of points based on new Canvas size.
 */


function updatePointsPos() {
  points.forEach(function (point) {
    point.origX = point.origX * (canvas.width / canvasOrig.w), point.origY = point.origY * (canvas.height / canvasOrig.h);
  });
  canvasOrig.w = canvas.width;
  canvasOrig.h = canvas.height;
}
/**
 * Access button functionality
 */


var accButton = document.querySelector(".access-button");
accButton.addEventListener("click", function () {
  setCanvasAnim(false);
  scrollToSection(document.querySelector(".about-wrap"), 53, 1, false);
});

function scrollToSection(section, offsetY, duration, shouldToggleMenu) {
  gsap.to(window, {
    duration: duration,
    scrollTo: {
      y: section,
      offsetY: offsetY,
      ease: "power3.inOut"
    },
    onComplete: shouldToggleMenuFunc(shouldToggleMenu)
  });
}

function shouldToggleMenuFunc(shouldToggleMenu) {
  if (shouldToggleMenu && document.querySelector(".ham-container").classList.contains("is-open")) {
    toggleMenu();
  }
}
/**
 * Nav To Section Functionality
 */


var navLinks = document.querySelector(".link-wrap");
navLinks.childNodes.forEach(function (link) {
  var linkName = link.textContent.toLowerCase();
  var offsetY = linkName == "about" ? 53 : 0;
  link.addEventListener("click", function () {
    return scrollToSection(document.querySelector("." + linkName + "-wrap"), offsetY, 1, true);
  });
});
/**
 * Nav Items Hightlighting functionality
 */

var sections = document.querySelectorAll("section");
var sectWaypointsDown = [];
var sectWaypointsUp = [];
var linkArr = Array.from(navLinks.children);
sections.forEach(function (section) {
  var sectStr = section.classList.item(0).substring(0, section.classList.item(0).length - 5);
  sectWaypointsDown.push(new Waypoint({
    element: section,
    handler: function handler(direction) {
      if (direction == "down") {
        linkArr.forEach(function (link) {
          link.classList.remove("link--selected");
        });
        document.querySelector(".link--" + sectStr).classList.add("link--selected");
      }
    },
    offset: "60%"
  }));
});
sections.forEach(function (section) {
  var sectStr = section.classList.item(0).substring(0, section.classList.item(0).length - 5);
  sectWaypointsUp.push(new Waypoint({
    element: section,
    handler: function handler(direction) {
      if (direction == "up") {
        linkArr.forEach(function (link) {
          link.classList.remove("link--selected");
        });
        document.querySelector(".link--" + sectStr).classList.add("link--selected");
      }
    },
    offset: "-40%"
  }));
});
},{"./scripts/util":"src/scripts/util.ts"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "57810" + '/');

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
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/index.ts"], null)
//# sourceMappingURL=/src.f10117fe.js.map