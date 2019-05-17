/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Gems = __webpack_require__(/*! ./gems */ \"./src/gems.js\")\n\nclass Game {\n  constructor(ctx) {\n    this.ctx = ctx;\n    this.renderGem = this.renderGem.bind(this);\n    this.gems = [new Gems({ pos: { x: 150, y: 0 }, colors: this.randomGemColors(), prevHeight:600 })];\n    this.gemsFalling = false;\n  }\n\n  randomGemColors() {\n    const colors = [\"#ff0000\", \"#0000ff\", \"#3c9600\", \"#f4d041\"];\n    return [colors[Math.floor(Math.random() * 4)], colors[Math.floor(Math.random() * 4)]];\n  }\n\n  renderGem() {\n    let id = requestAnimationFrame(this.renderGem);\n    this.gems.slice(this.gems.length-1)[0].drop(this.ctx, id);\n    this.gems.slice(0, this.gems.length-1).forEach(gem => {\n      gem.render(this.ctx);\n    });\n    if (this.gems.slice(this.gems.length - 1)[0].vel === 0) {\n      const prevHeight = (this.gems.slice(this.gems.length - 1)[0].gem1.pos.y - 50);\n      console.log(prevHeight);\n\n      this.gems.push(new Gems({ pos: { x: 150, y: 0 }, colors: this.randomGemColors(), prevHeight: prevHeight}));\n      if (prevHeight > -50) {\n        this.renderGem();\n      }\n    }\n  }\n  \n  gameStart() {\n    this.renderGem();\n  }\n \n}\n\nmodule.exports = Game;\n\n//# sourceURL=webpack:///./src/game.js?");

/***/ }),

/***/ "./src/gems.js":
/*!*********************!*\
  !*** ./src/gems.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("class Gems {\n  constructor({ pos, colors, prevHeight }) {\n    this.gem1 = {\n      pos: pos,\n      color: colors[0]\n    };\n    this.gem2 = {\n      pos: {x: pos.x, y: pos.y +50},\n      color: colors[1]\n    };\n    this.width = 50;\n    this.height = 50;\n    this.vel = 5;\n    this.prevHeight = prevHeight;\n  }\n\n  handleCollision(id) {\n    if (this.gem1.pos.y >= this.prevHeight || this.gem2.pos.y >= this.prevHeight) {\n      this.vel = 0;\n      cancelAnimationFrame(id);\n    }\n  }\n\n  render(ctx) {\n    ctx.fillStyle = this.gem1.color;\n    ctx.fillRect(\n      this.gem1.pos.x,\n      this.gem1.pos.y,\n      this.width,\n      this.height\n      );\n    ctx.fillStyle = this.gem2.color;\n    ctx.fillRect(\n      this.gem2.pos.x,\n      this.gem2.pos.y,\n      this.width,\n      this.height\n      );\n  }\n\n  drop(ctx, id) {\n    this.handleCollision(id);\n    ctx.clearRect(0,0, 300, 650);\n    this.gem1.pos.y += this.vel;\n    this.gem2.pos.y += this.vel;\n    this.render(ctx);\n  }\n\n}\n\nmodule.exports = Gems;\n\n//# sourceURL=webpack:///./src/gems.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Game = __webpack_require__(/*! ./game */ \"./src/game.js\")\n\n\ndocument.addEventListener('DOMContentLoaded', () => {\n  const canvasPF1 = document.getElementById(\"play-field-1\");\n  canvasPF1.width = 300;\n  canvasPF1.height = 650;\n  const ctxPF1 = canvasPF1.getContext('2d');\n  const game = new Game(ctxPF1);\n\n  game.gameStart();\n});\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });