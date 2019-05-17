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

eval("const Gems = __webpack_require__(/*! ./gems */ \"./src/gems.js\")\n\nclass Game {\n  constructor(ctx) {\n    this.ctx = ctx;\n    this.renderGem = this.renderGem.bind(this);\n    this.gemPrimary = new Gems({ pos: { x: 150, y: 0 }, gemImages: this.randomGemImages(), col:\"col4\" });\n    this.gemSecondary = new Gems({ pos: { x: 150, y: -50 }, gemImages: this.randomGemImages(), col: \"col4\" });\n    this.gemsFalling = false;\n    this.gemStorage = {\n      col1: [],\n      col2: [],\n      col3: [],\n      col4: [],\n      col5: [],\n      col6: [],\n    };\n  }\n\n  randomGemImages() {\n    const gemImages = [\n      // { color: \"blue\", imgSrc: \"../assets/images/cat.png\" },\n      // { color: \"red\", imgSrc: \"../assets/images/cat.png\" },\n      // { color: \"green\", imgSrc: \"../assets/images/cat.png\" },\n      // { color: \"yellow\", imgSrc: \"../assets/images/cat.png\" }\n      { color: \"blue\", imgSrc: \"../assets/images/SPF2T_Gem_Blue.png\" },\n      { color: \"red\", imgSrc: \"../assets/images/SPF2T_Gem_Red.png\" },\n      { color: \"green\", imgSrc: \"../assets/images/SPF2T_Gem_Green.png\" },\n      { color: \"yellow\", imgSrc: \"../assets/images/SPF2T_Gem_Yellow.png\" }\n    ];\n    return gemImages[Math.floor(Math.random() * 4)];\n  }\n\n  storeCurrentGem(gem){\n    switch(gem.posX) {\n      case 0:\n        this.gemStorage.col1.push(gem);\n        break;\n      case 50:\n        this.gemStorage.col2.push(gem);\n        break;\n      case 100:\n        this.gemStorage.col3.push(gem);\n        break;\n      case 150:\n        this.gemStorage.col4.push(gem);\n        break;\n      case 200:\n        this.gemStorage.col5.push(gem);\n        break;\n      case 250:\n        this.gemStorage.col6.push(gem);\n        break;\n    }\n  }\n\n  colHeight(gem, gemCol) {\n    if (this.gemStorage[gemCol].slice(this.gemStorage[gemCol].length - 1)[0]) {\n      if (gem === \"sec\" && this.gemPrimary.col === this.gemSecondary.col) {\n        return this.gemStorage[gemCol].slice(this.gemStorage[gemCol].length - 1)[0].posY;\n      } else {\n        return this.gemStorage[gemCol].slice(this.gemStorage[gemCol].length - 1)[0].posY - 50;\n      }\n    } else {\n      if (gem === \"sec\" && this.gemPrimary.col === this.gemSecondary.col) {\n        return 550;\n      } else {\n        return 600;\n      }\n    }\n  }\n\n  renderGem() {\n \n    let id = requestAnimationFrame(this.renderGem);\n    console.log(\"Prim\",this.gemPrimary.color);\n    console.log(\"Sec\",this.gemSecondary.color);\n\n    this.gemSecondary.drop(this.ctx, id, this.colHeight(\"sec\", this.gemSecondary.col));\n    this.gemPrimary.drop(this.ctx, id, this.colHeight(\"prim\", this.gemPrimary.col));\n    \n    window.addEventListener(\"keydown\", (event) => {\n      if (event.defaultPrevented) {\n        return; // Do nothing if the event was already processed\n      }\n      \n      switch (event.key) {\n        case \"Left\": // IE/Edge specific value\n        case \"ArrowLeft\":\n          this.gemPrimary.moveHorizontal('left');\n          this.gemSecondary.moveHorizontal('left');\n          break;\n        case \"Right\": // IE/Edge specific value\n        case \"ArrowRight\":\n          this.gemPrimary.moveHorizontal('right');\n          this.gemSecondary.moveHorizontal('right');\n          break;\n        default:\n          return; // Quit when this doesn't handle the key event.\n      }\n      event.preventDefault();\n    }, true);\n\n    for (let i = 1; i < 6; i++) {\n      this.gemStorage[`col${i}`].forEach(gem => {\n        gem.render(this.ctx);\n      });\n    }\n\n    if (this.gemPrimary.vel === 0 || this.gemSecondary.vel === 0 ) {\n      const prevHeightPrim = (this.gemPrimary.posY - 50);\n      const prevHeightSec = (this.gemSecondary.posY - 50);\n\n      this.storeCurrentGem(this.gemPrimary);\n      this.storeCurrentGem(this.gemSecondary);\n      console.log(this.gemStorage);\n      \n\n      this.gemPrimary = new Gems({ \n        pos: { x: 150, y: 0 }, \n        gemImages: this.randomGemImages(), \n        col: \"col4\" \n      });\n      this.gemSecondary = new Gems({ \n        pos: { x: 150, y: -50 }, \n        gemImages: this.randomGemImages(), \n        col: \"col4\" \n      });\n\n      if (prevHeightPrim > -50 && prevHeightSec > -50) {\n        this.renderGem();\n      }\n    }\n  }\n  \n  gameStart() {\n    this.renderGem();\n  }\n \n}\n\nmodule.exports = Game;\n\n\n\n//# sourceURL=webpack:///./src/game.js?");

/***/ }),

/***/ "./src/gems.js":
/*!*********************!*\
  !*** ./src/gems.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("class Gems {\n  constructor({ pos, gemImages, col }) {\n    this.posX = pos.x;\n    this.posY = pos.y;\n    this.color = gemImages.color;\n    this.img = gemImages.imgSrc;\n    this.width = 50;\n    this.height = 50;\n    this.vel = 5;\n    this.col = col;\n  }\n\n  handleCollision(id,colHeight) {\n    if (this.posY >= colHeight) {\n      this.vel = 0;\n      cancelAnimationFrame(id);\n    }\n  }\n\n  render(ctx) {\n    const img = new Image();\n    img.src = this.img;\n    ctx.drawImage(img, this.posX, this.posY, this.width, this.height);\n  }\n\n  drop(ctx, id, colHeight) {\n    this.handleCollision(id, colHeight);\n    ctx.clearRect(0,0, 300, 650);\n    this.posY += this.vel;\n    this.render(ctx);\n  }\n\n  moveHorizontal(direction) {\n    if (direction === \"left\" && this.posX > 0) {\n      this.posX -= 50;\n    } else if (direction === \"right\" && this.posX < 250) {\n      this.posX += 50;\n    }\n  }\n\n}\n\nmodule.exports = Gems;\n\n//# sourceURL=webpack:///./src/gems.js?");

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