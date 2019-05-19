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

eval("const GemPrimary = __webpack_require__(/*! ./gemPrimary */ \"./src/gemPrimary.js\");\nconst GemSecondary = __webpack_require__(/*! ./gemSecondary */ \"./src/gemSecondary.js\");\n\nclass Game {\n  constructor(ctx) {\n    this.ctx = ctx;\n    this.renderGem = this.renderGem.bind(this);\n    this.gemPrimary = new GemPrimary({ gemImages: this.randomGemImages() });\n    this.gemSecondary = new GemSecondary({ gemImages: this.randomGemImages() });\n    this.gemsFalling = false;\n    this.gemStorage = {\n      col1: [],\n      col2: [],\n      col3: [],\n      col4: [],\n      col5: [],\n      col6: [],\n    };\n  }\n\n  randomGemImages() {\n    const gemImages = [\n      // { color: \"blue\", imgSrc: \"../assets/images/cat.png\" },\n      // { color: \"red\", imgSrc: \"../assets/images/cat.png\" },\n      // { color: \"green\", imgSrc: \"../assets/images/cat.png\" },\n      // { color: \"yellow\", imgSrc: \"../assets/images/cat.png\" }\n      { color: \"blue\", imgSrc: \"../assets/images/SPF2T_Gem_Blue.png\" },\n      { color: \"red\", imgSrc: \"../assets/images/SPF2T_Gem_Red.png\" },\n      { color: \"green\", imgSrc: \"../assets/images/SPF2T_Gem_Green.png\" },\n      { color: \"yellow\", imgSrc: \"../assets/images/SPF2T_Gem_Yellow.png\" }\n    ];\n    return gemImages[Math.floor(Math.random() * 4)];\n  }\n\n  storeCurrentGem(){\n    const gems = this.gemPrimary.posRel === 2 ? [this.gemPrimary, this.gemSecondary] : [this.gemSecondary, this.gemPrimary];\n\n    gems.forEach(gem => {\n      switch(gem.posX) {\n        case 0:\n          this.gemStorage.col1.push(gem);\n          break;\n        case 50:\n          this.gemStorage.col2.push(gem);\n          break;\n        case 100:\n          this.gemStorage.col3.push(gem);\n          break;\n        case 150:\n          this.gemStorage.col4.push(gem);\n          break;\n        case 200:\n          this.gemStorage.col5.push(gem);\n          break;\n        case 250:\n          this.gemStorage.col6.push(gem);\n          break;\n      }\n    });\n  }\n\n  colHeight(colNum) {\n    const col = `col${colNum}`;\n    if (this.gemStorage[col]) {\n      if (this.gemStorage[col].slice(this.gemStorage[col].length - 1)[0]) {\n        return this.gemStorage[col].slice(this.gemStorage[col].length - 1)[0].posY - 50;\n      } else {\n        return 600;\n      }\n    } else {\n      return 0;\n    }\n  }\n  \n  moveHorizontal(direction) {\n    if (direction === \"left\") {\n      this.gemPrimary.moveHorizontal('left', this.colHeight(this.gemPrimary.col - 1));\n      this.gemSecondary.moveHorizontal('left', this.colHeight(this.gemSecondary.col - 1));\n    } else {\n      this.gemPrimary.moveHorizontal('right', this.colHeight(this.gemPrimary.col + 1));\n      this.gemSecondary.moveHorizontal('right', this.colHeight(this.gemSecondary.col + 1));\n    }\n  }\n\n  rotate(direction) {\n    this.gemPrimary.rotate(direction);\n    this.gemSecondary.rotate(direction);\n  }\n\n  rotateCW() {\n    let adjColHeight;\n    switch (this.gemSecondary.posRel) {\n      case 0:\n        adjColHeight = this.colHeight(this.gemSecondary.col + 1) - 50;\n        if (this.gemSecondary.posY < adjColHeight) { this.rotate('cw'); }\n        break;\n      case 1:\n        adjColHeight = this.colHeight(this.gemSecondary.col - 1) - 50;\n        if (this.gemSecondary.posY < this.colHeight(this.gemSecondary.col) && this.gemSecondary.posY < adjColHeight) { this.rotate('cw'); }\n        break;\n      case 2:\n        adjColHeight = this.colHeight(this.gemSecondary.col - 1);\n        if (this.gemSecondary.posY < adjColHeight) { this.rotate('cw'); }\n        break;\n      case 3:\n        this.rotate('cw');\n        break;\n    }\n  }\n\n  rotateCCW() {\n    let adjColHeight;\n    switch (this.gemSecondary.posRel) {\n      case 0:\n        adjColHeight = this.colHeight(this.gemSecondary.col - 1) - 50;\n        if (this.gemSecondary.posY < adjColHeight) { this.rotate('ccw'); }\n        break;\n      case 1:\n        this.rotate('ccw');\n        break;\n      case 2:\n        adjColHeight = this.colHeight(this.gemSecondary.col + 1);\n        if (this.gemSecondary.posY < adjColHeight) { this.rotate('ccw'); }\n        break;\n      case 3:\n        adjColHeight = this.colHeight(this.gemSecondary.col + 1) - 50;\n        if (this.gemSecondary.posY < this.colHeight(this.gemSecondary.col) && this.gemSecondary.posY < adjColHeight) { this.rotate('ccw'); }\n        break;\n    }\n  }\n\n  handleKeyEvent() {\n    window.addEventListener(\"keydown\", (event) => {\n      if (event.defaultPrevented) {\n        return; // Do nothing if the event was already processed\n      }\n      switch (event.key) {\n        case \"Left\": // IE/Edge specific value\n        case \"ArrowLeft\":\n          this.moveHorizontal('left');\n          break;\n        case \"Right\": // IE/Edge specific value\n        case \"ArrowRight\":\n          if ((this.gemPrimary.posRel === 3 && this.gemSecondary.posY < this.colHeight(this.gemSecondary.col + 1)) || (this.gemSecondary.posRel === 3 && this.gemPrimary.posY < this.colHeight(this.gemPrimary.col + 1)) || (this.gemPrimary.posRel !== 3) || (this.gemSecondary.posRel !== 3) ) {\n            this.moveHorizontal('right');\n          }\n          break;\n        case \"z\": // Rotate Clockwise\n          this.rotateCW(); \n          break;\n        case \"x\": // Rotate Counter-clockwise\n          this.rotateCCW();\n          break;\n        default:\n          return; // Quit when this doesn't handle the key event.\n      }\n      event.preventDefault();\n    }, true);\n  }\n\n  renderGem() {\n    let id = requestAnimationFrame(this.renderGem);\n    \n    this.handleKeyEvent();\n    this.ctx.clearRect(0, 0, 300, 650);\n\n    this.gemSecondary.drop(this.ctx, this.colHeight(this.gemSecondary.col));\n    this.gemPrimary.drop(this.ctx, this.colHeight(this.gemPrimary.col));\n    \n    if (this.gemPrimary.vel === 0) {\n      this.gemSecondary.updateOtherVel(this.colHeight(this.gemSecondary.col));\n    } else if (this.gemSecondary.vel === 0) {\n      this.gemPrimary.updateOtherVel(this.colHeight(this.gemPrimary.col));\n    }\n    \n    for (let i = 1; i <= 6; i++) {\n      this.gemStorage[`col${i}`].forEach(gem => {\n        gem.render(this.ctx);\n      });\n    }\n\n    if (this.gemPrimary.vel === 0 && this.gemSecondary.vel === 0 ) {\n      cancelAnimationFrame(id);\n\n      this.storeCurrentGem();\n\n      this.gemPrimary = new GemPrimary({ \n        gemImages: this.randomGemImages(), \n      });\n      this.gemSecondary = new GemSecondary({ \n        gemImages: this.randomGemImages(), \n      });\n\n      if (this.colHeight(4) >= -50) {\n        this.renderGem();\n      } else {\n        console.log(\"YOU LOSE!\");\n      }\n    }\n    \n  }\n  \n  gameStart() {\n    this.renderGem();\n  }\n \n}\n\nmodule.exports = Game;\n\n\n\n//# sourceURL=webpack:///./src/game.js?");

/***/ }),

/***/ "./src/gemPrimary.js":
/*!***************************!*\
  !*** ./src/gemPrimary.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("class GemPrimary {\n  constructor({ gemImages }) {\n    this.posX = 150;\n    this.posY = -5;\n    this.color = gemImages.color;\n    const img = new Image();\n    img.src = gemImages.imgSrc;\n    this.img = img;\n    this.widthHeight = 50;\n    this.vel = 5;\n    this.col = 4;\n    this.posRel = 2;\n    this.otherVel = 5;\n  }\n\n  handleCollision(colHeight) {\n    if ((this.posRel === 0 && this.posY >= colHeight - 50) || (this.posRel !== 0 && this.posY >= colHeight)) {\n      this.vel = 0;\n    }\n  }\n\n  updateOtherVel(colHeight) {\n    this.otherVel = 0;\n  }\n\n  render(ctx) {\n    ctx.drawImage(this.img, this.posX, this.posY, this.widthHeight, this.widthHeight);\n  }\n\n  drop(ctx, colHeight) {\n    this.posY += this.vel;\n    this.handleCollision(colHeight);\n    this.render(ctx);\n  }\n\n  moveHorizontal(direction, adjColHeight) {\n    if (this.otherVel !== 0 && this.vel !== 0) {\n      if ((this.posRel === 0 && this.posY < adjColHeight - 50) || (this.posRel !== 0 && this.posY < adjColHeight)) {\n        if ((direction === \"left\") && ((this.posRel === 1 && this.col > 2) || (this.posRel !== 1 && this.col > 1))) {\n          this.posX -= 50;\n          this.col -= 1;\n        } else if ((direction === \"right\") && ((this.posRel === 3 && this.col < 5) || (this.posRel !== 3 && this.col < 6))) {\n          this.posX += 50;\n          this.col += 1;\n        }\n      }\n    }\n  }\n\n  rotate(direction) {\n    if (this.otherVel !== 0 && this.vel !== 0) {\n      if (direction === 'cw') {\n        this.posRel = (this.posRel + 1) % 4;\n      } else {\n        this.posRel = this.posRel - 1 < 0 ? 3 : this.posRel - 1;\n      }\n    }\n  }\n\n}\n\nmodule.exports = GemPrimary;\n\n//# sourceURL=webpack:///./src/gemPrimary.js?");

/***/ }),

/***/ "./src/gemSecondary.js":
/*!*****************************!*\
  !*** ./src/gemSecondary.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const GemPrimary = __webpack_require__(/*! ./gemPrimary */ \"./src/gemPrimary.js\");\n\nclass GemSecondary extends GemPrimary {\n  constructor({ gemImages }) {\n    super({gemImages});\n    this.posY = -55;\n    this.posRel = 0;\n  }\n\n  rotate(direction) {\n    if (this.otherVel !== 0 && this.vel !== 0) {\n      if (direction === 'cw') {\n        if (!(this.col === 1 && this.posRel === 2) && !(this.col === 6 && this.posRel === 0)) {\n          const rotationsCW = [{ dx: 50, dy: -50 }, { dx: 50, dy: 50 }, { dx: -50, dy: 50 }, { dx: -50, dy: -50 }];\n          this.col = (this.posRel === 1 || this.posRel === 2) ? (this.col - 1) : (this.col + 1);\n          this.posRel = (this.posRel + 1) % 4;\n          this.posX += rotationsCW[this.posRel].dx;\n          this.posY += rotationsCW[this.posRel].dy;\n        }\n      } else {\n        if (!(this.col === 1 && this.posRel === 0) && !(this.col === 6 && this.posRel === 2)) {\n          const rotationsCCW = [{ dx: 50, dy: 50 }, { dx: -50, dy: 50 }, { dx: -50, dy: -50 }, { dx: 50, dy: -50 }];\n          this.col = (this.posRel === 0 || this.posRel === 1) ? (this.col - 1) : (this.col + 1);\n          this.posRel = this.posRel - 1 < 0 ? 3 : this.posRel - 1;\n          this.posX -= rotationsCCW[this.posRel].dx;\n          this.posY -= rotationsCCW[this.posRel].dy;\n        }\n      }\n    }\n  }\n\n}\n\nmodule.exports = GemSecondary;\n\n//# sourceURL=webpack:///./src/gemSecondary.js?");

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