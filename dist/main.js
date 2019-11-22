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
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _menus__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./menus */ \"./src/menus.js\");\n/* harmony import */ var _gemStorage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./gemStorage */ \"./src/gemStorage.js\");\n/* harmony import */ var _gemPair__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./gemPair */ \"./src/gemPair.js\");\n\n\n\n\n\nclass Game {\n  constructor(ctx, ctxScoreboard, ctxNextGem, ctxMenu) {\n    this.ctx = ctx;\n    this.ctxMenu = ctxMenu;\n    this.ctxScoreboard = ctxScoreboard;\n    this.ctxNextGem = ctxNextGem;\n\n    this.gemCount = 0;\n    this.gemLevel = 15;\n    this.gemVel = 1;\n    this.gemPairLive = undefined;\n    this.gemPairStaging = new _gemPair__WEBPACK_IMPORTED_MODULE_2__[\"default\"](this.ctxNextGem, this.gemVel);\n    this.gemStorage = new _gemStorage__WEBPACK_IMPORTED_MODULE_1__[\"default\"](this.ctx);\n    this.score = 0;\n    this.renderCycle = this.renderCycle.bind(this);\n    this.gameStart = this.gameStart.bind(this);\n    this.updateScore = this.updateScore.bind(this);\n  }\n\n  handleKeyEvent() {\n    window.addEventListener(\n      \"keydown\",\n      event => {\n        if (event.defaultPrevented) {\n          return; // Do nothing if the event was already processed\n        }\n        switch (event.key) {\n          case \"Left\": // IE/Edge specific value\n          case \"ArrowLeft\":\n            this.gemPairLive.moveLeft(this.gemStorage);\n            break;\n          case \"Right\": // IE/Edge specific value\n          case \"ArrowRight\":\n            this.gemPairLive.moveRight(this.gemStorage);\n            break;\n          case \"z\": // Rotate Clockwise\n            this.gemPairLive.rotateCW(this.gemStorage);\n            break;\n          case \"x\": // Rotate Counter-clockwise\n            this.gemPairLive.rotateCCW(this.gemStorage);\n            break;\n          default:\n            return; // Quit when this doesn't handle the key event.\n        }\n        event.preventDefault();\n      },\n      true\n    );\n  }\n\n  handleDownArrowKeyEvent() {\n    const handleDownArrow = event => {\n      if (event.defaultPrevented) {\n        return;\n      }\n      switch (event.key) {\n        case \"Down\": // IE/Edge specific value\n        case \"ArrowDown\":\n          this.gemPairLive.hardDrop(this.gemStorage);\n          break;\n        default:\n          return;\n      }\n      event.preventDefault();\n      window.removeEventListener(\"keydown\", handleDownArrow, true);\n    };\n\n    window.addEventListener(\"keydown\", handleDownArrow, true);\n  }\n\n  updateScore(score) {\n    this.score += score;\n  }\n\n  displayScore() {\n    this.ctxScoreboard.font =\n      \"30px 'Permanent Marker','Sedgwick Ave Display', Helvetica, sans-serif\";\n    this.ctxScoreboard.strokeStyle = \"white\";\n    this.ctxScoreboard.strokeText(this.score, 10, 40);\n  }\n\n  moveStagingToLive() {\n    this.gemPairStaging.goLive(this.ctx);\n    this.gemPairLive = this.gemPairStaging;\n    this.gemPairStaging = new _gemPair__WEBPACK_IMPORTED_MODULE_2__[\"default\"](this.ctxNextGem, this.gemVel);\n  }\n\n  renderGems() {\n    this.handleKeyEvent();\n    if (!this.gemPairLive) {\n      this.moveStagingToLive();\n    }\n    this.gemPairLive.render(this.gemStorage);\n  }\n\n  renderCycle() {\n    let id = requestAnimationFrame(this.renderCycle);\n    this.ctx.clearRect(0, 0, 300, 650);\n    this.ctxNextGem.clearRect(0, 0, 300, 650);\n    this.ctxScoreboard.clearRect(0, 0, 300, 650);\n    this.gemStorage.render();\n    this.gemPairStaging.renderStaging();\n    this.renderGems();\n\n    this.displayScore();\n\n    if (this.gemPairLive.hasStopped()) {\n      cancelAnimationFrame(id);\n\n      this.gemStorage.update(\n        this.gemPairLive.getGems(),\n        this.updateScore\n      );\n      this.moveStagingToLive();\n\n      if (this.gemCount % this.gemLevel === 0) {\n        this.gemVel++;\n        this.gemLevel += 25;\n      }\n\n      if (this.gemStorage.height(3) >= -50) {\n        this.score += 10;\n        this.gemCount++;\n        this.handleDownArrowKeyEvent();\n        this.renderCycle();\n      } else {\n        Object(_menus__WEBPACK_IMPORTED_MODULE_0__[\"endGameMenu\"])(this.ctx, this.score, this.gameStart);\n      }\n    }\n  }\n\n  gameRender() {\n    Object(_menus__WEBPACK_IMPORTED_MODULE_0__[\"startGameMenu\"])(this.gameStart);\n  }\n\n  gameStart() {\n    if (this.gemPairLive) this.reset();\n    this.handleDownArrowKeyEvent();\n    this.renderCycle();\n  }\n\n  reset() {\n    this.gemCount = 0;\n    this.gemVel = 1;\n    this.gemPairLive = undefined;\n    this.gemPairStaging = new _gemPair__WEBPACK_IMPORTED_MODULE_2__[\"default\"](this.ctxNextGem, this.gemVel);\n    this.gemStorage = new _gemStorage__WEBPACK_IMPORTED_MODULE_1__[\"default\"](this.ctx);\n    this.score = 0;\n  }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Game);\n\n\n//# sourceURL=webpack:///./src/game.js?");

/***/ }),

/***/ "./src/gemNull.js":
/*!************************!*\
  !*** ./src/gemNull.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _gemPrimary__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gemPrimary */ \"./src/gemPrimary.js\");\n\n\nclass GemNull extends _gemPrimary__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\n  constructor(ctx) {\n    super(ctx);\n    this.posY = 650;\n    this.color = \"gray\";\n    this.type = \"cat\";\n    const img = new Image();\n    img.src = \"./assets/images/cat.png\";\n    this.img = img;\n  }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (GemNull);\n\n//# sourceURL=webpack:///./src/gemNull.js?");

/***/ }),

/***/ "./src/gemPair.js":
/*!************************!*\
  !*** ./src/gemPair.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _gemPrimary__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gemPrimary */ \"./src/gemPrimary.js\");\n/* harmony import */ var _gemSecondary__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./gemSecondary */ \"./src/gemSecondary.js\");\n\n\n\nclass GemPair {\n  constructor(ctx, vel) {\n    this.gemPrimary = new _gemPrimary__WEBPACK_IMPORTED_MODULE_0__[\"default\"](ctx, vel);\n    this.gemSecondary = new _gemSecondary__WEBPACK_IMPORTED_MODULE_1__[\"default\"](ctx, vel);\n  }\n\n  getGems() {\n    return {\n      gemPrimary: this.gemPrimary,\n      gemSecondary: this.gemSecondary\n    };\n  }\n\n  hasStopped() {\n    return this.gemPrimary.vel === 0 && this.gemSecondary.vel === 0;\n  }\n\n  rotate(direction) {\n    this.gemPrimary.rotate(direction);\n    this.gemSecondary.rotate(direction);\n  }\n\n  rotateCW(gemStorage) {\n    let adjColHeight;\n    switch (this.gemSecondary.posRel) {\n      case 0:\n        adjColHeight = gemStorage.height(this.gemSecondary.col + 1) - 50;\n        if (this.gemSecondary.posY < adjColHeight) {\n          this.rotate(\"cw\");\n        }\n        break;\n      case 1:\n        adjColHeight = gemStorage.height(this.gemSecondary.col - 1) - 50;\n        if (\n          this.gemSecondary.posY < gemStorage.height(this.gemSecondary.col) &&\n          this.gemSecondary.posY < adjColHeight\n        ) {\n          this.rotate(\"cw\");\n        }\n        break;\n      case 2:\n        adjColHeight = gemStorage.height(this.gemSecondary.col - 1);\n        if (this.gemSecondary.posY < adjColHeight) {\n          this.rotate(\"cw\");\n        }\n        break;\n      case 3:\n        this.rotate(\"cw\");\n        break;\n    }\n  }\n\n  rotateCCW(gemStorage) {\n    let adjColHeight;\n    switch (this.gemSecondary.posRel) {\n      case 0:\n        adjColHeight = gemStorage.height(this.gemSecondary.col - 1) - 50;\n        if (this.gemSecondary.posY < adjColHeight) {\n          this.rotate(\"ccw\");\n        }\n        break;\n      case 1:\n        this.rotate(\"ccw\");\n        break;\n      case 2:\n        adjColHeight = gemStorage.height(this.gemSecondary.col + 1);\n        if (this.gemSecondary.posY < adjColHeight) {\n          this.rotate(\"ccw\");\n        }\n        break;\n      case 3:\n        adjColHeight = gemStorage.height(this.gemSecondary.col + 1) - 50;\n        if (\n          this.gemSecondary.posY < gemStorage.height(this.gemSecondary.col) &&\n          this.gemSecondary.posY < adjColHeight\n        ) {\n          this.rotate(\"ccw\");\n        }\n        break;\n    }\n  }\n\n  moveHorizontal(direction, gemStorage) {\n    if (direction === \"left\") {\n      this.gemPrimary.moveHorizontal(\n        \"left\",\n        gemStorage.height(this.gemPrimary.col - 1)\n      );\n      this.gemSecondary.moveHorizontal(\n        \"left\",\n        gemStorage.height(this.gemSecondary.col - 1)\n      );\n    } else {\n      this.gemPrimary.moveHorizontal(\n        \"right\",\n        gemStorage.height(this.gemPrimary.col + 1)\n      );\n      this.gemSecondary.moveHorizontal(\n        \"right\",\n        gemStorage.height(this.gemSecondary.col + 1)\n      );\n    }\n  }\n\n  moveLeft(gemStorage) {\n    if (\n      this.gemPrimary.posRel === 1 &&\n      this.gemSecondary.posY < gemStorage.height(this.gemSecondary.col - 1)\n    ) {\n      this.gemPrimary.moveHorizontal(\n        \"left\",\n        gemStorage.height(this.gemSecondary.col)\n      );\n      this.gemSecondary.moveHorizontal(\n        \"left\",\n        gemStorage.height(this.gemSecondary.col - 1)\n      );\n    } else if (\n      this.gemSecondary.posRel === 1 &&\n      this.gemPrimary.posY < gemStorage.height(this.gemPrimary.col - 1)\n    ) {\n      this.gemPrimary.moveHorizontal(\n        \"left\",\n        gemStorage.height(this.gemPrimary.col - 1)\n      );\n      this.gemSecondary.moveHorizontal(\n        \"left\",\n        gemStorage.height(this.gemPrimary.col)\n      );\n    } else if (this.gemPrimary.posRel !== 3 && this.gemSecondary.posRel !== 3) {\n      this.moveHorizontal(\"left\", gemStorage);\n    }\n  }\n\n  moveRight(gemStorage) {\n    if (\n      this.gemPrimary.posRel === 3 &&\n      this.gemSecondary.posY < gemStorage.height(this.gemSecondary.col + 1)\n    ) {\n      this.gemPrimary.moveHorizontal(\n        \"right\",\n        gemStorage.height(this.gemSecondary.col)\n      );\n      this.gemSecondary.moveHorizontal(\n        \"right\",\n        gemStorage.height(this.gemSecondary.col + 1)\n      );\n    } else if (\n      this.gemSecondary.posRel === 3 &&\n      this.gemPrimary.posY < gemStorage.height(this.gemPrimary.col + 1)\n    ) {\n      this.gemPrimary.moveHorizontal(\n        \"right\",\n        gemStorage.height(this.gemPrimary.col + 1)\n      );\n      this.gemSecondary.moveHorizontal(\n        \"right\",\n        gemStorage.height(this.gemPrimary.col)\n      );\n    } else if (this.gemPrimary.posRel !== 3 && this.gemSecondary.posRel !== 3) {\n      this.moveHorizontal(\"right\", gemStorage);\n    }\n  }\n\n  hardDrop(gemStorage) {\n    this.gemPrimary.hardDrop(gemStorage.height(this.gemPrimary.col));\n    this.gemSecondary.hardDrop(gemStorage.height(this.gemSecondary.col));\n  }\n\n  render(gemStorage) {\n    this.gemSecondary.drop(gemStorage.height(this.gemSecondary.col));\n    this.gemPrimary.drop(gemStorage.height(this.gemPrimary.col));\n    if (this.gemPrimary.vel === 0) {\n      this.gemSecondary.updateOtherVel();\n    } else if (this.gemSecondary.vel === 0) {\n      this.gemPrimary.updateOtherVel();\n    }\n  }\n\n  renderStaging() {\n    this.gemPrimary.render();\n    this.gemSecondary.render();\n  }\n\n  goLive(ctx) {\n    this.gemPrimary.goLive(ctx);\n    this.gemSecondary.goLive(ctx);\n  }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (GemPair);\n\n\n//# sourceURL=webpack:///./src/gemPair.js?");

/***/ }),

/***/ "./src/gemPrimary.js":
/*!***************************!*\
  !*** ./src/gemPrimary.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nclass GemPrimary {\n  constructor(ctx, vel) {\n    const gemImages = [\n      { type: \"gem\", color: \"blue\", imgSrc: \"./assets/images/gem_blue.png\" },\n      { type: \"gem\", color: \"red\", imgSrc: \"./assets/images/gem_red.png\" },\n      { type: \"gem\", color: \"green\", imgSrc: \"./assets/images/gem_green.png\" },\n      { type: \"gem\", color: \"yellow\", imgSrc: \"./assets/images/gem_yellow.png\" },\n      { type: \"gem\", color: \"blue\", imgSrc: \"./assets/images/gem_blue.png\" },\n      { type: \"gem\", color: \"red\", imgSrc: \"./assets/images/gem_red.png\" },\n      { type: \"gem\", color: \"green\", imgSrc: \"./assets/images/gem_green.png\" },\n      { type: \"gem\", color: \"yellow\", imgSrc: \"./assets/images/gem_yellow.png\" },\n      { type: \"gem\", color: \"blue\", imgSrc: \"./assets/images/gem_blue.png\" },\n      { type: \"gem\", color: \"red\", imgSrc: \"./assets/images/gem_red.png\" },\n      { type: \"gem\", color: \"green\", imgSrc: \"./assets/images/gem_green.png\" },\n      { type: \"gem\", color: \"yellow\", imgSrc: \"./assets/images/gem_yellow.png\" },\n      { type: \"gem\", color: \"blue\", imgSrc: \"./assets/images/gem_blue.png\" },\n      { type: \"gem\", color: \"red\", imgSrc: \"./assets/images/gem_red.png\" },\n      { type: \"gem\", color: \"green\", imgSrc: \"./assets/images/gem_green.png\" },\n      { type: \"gem\", color: \"yellow\", imgSrc: \"./assets/images/gem_yellow.png\" },\n      { type: \"crash\", color: \"blue\", imgSrc: \"./assets/images/crash_blue.png\" },\n      { type: \"crash\", color: \"red\", imgSrc: \"./assets/images/crash_red.png\" },\n      { type: \"crash\", color: \"green\", imgSrc: \"./assets/images/crash_green.png\" },\n      { type: \"crash\", color: \"yellow\", imgSrc: \"./assets/images/crash_yellow.png\" }\n    ];\n    this.gem = gemImages[Math.floor(Math.random() * gemImages.length)];\n    this.ctx = ctx;\n    this.posX = 10;\n    this.posY = 60;\n    this.color = this.gem.color;\n    this.type = this.gem.type;\n    this.img = new Image();\n    this.img.src = this.gem.imgSrc;\n    this.widthHeight = 50;\n    this.vel = vel;\n    this.col = 3;\n    this.posRel = 2;\n    this.otherVel = 5;\n  }\n\n  handleCollision(colHeight) {\n    if ((this.posRel === 0 && this.posY >= colHeight - 50) || (this.posRel !== 0 && this.posY >= colHeight)) {\n      this.posY = this.posRel === 0 ? colHeight - 50 : colHeight;\n      this.vel = 0;\n    }\n  }\n\n  updatePosY(newPosY) {\n    this.posY = newPosY;\n  }\n\n  hardDrop(colHeight) {\n    this.posY = this.posRel === 0 ? colHeight - 55 : colHeight - 5;\n  }\n\n  goLive(ctx) {\n    this.ctx = ctx;\n    this.posX = 150;\n    this.posY = -5;\n  }\n\n  updateOtherVel() {\n    this.otherVel = 0;\n  }\n\n  render() {\n    this.ctx.drawImage(this.img, this.posX, this.posY, this.widthHeight, this.widthHeight);\n  }\n\n  drop(colHeight, vel = this.vel) {\n    this.vel = vel;\n    this.posY += vel;\n    this.handleCollision(colHeight);\n    this.render();\n  }\n\n  moveHorizontal(direction, adjColHeight) {\n    if (this.otherVel !== 0 && this.vel !== 0) {\n      if ((this.posRel === 0 && this.posY < adjColHeight - 50) || (this.posRel !== 0 && this.posY < adjColHeight)) {\n        if (direction === \"left\") {\n          this.posX -= 50;\n          this.col -= 1;\n        } else if (direction === \"right\") {\n          this.posX += 50;\n          this.col += 1;\n        }\n      }\n    }\n  }\n\n  rotate(direction) {\n    if (this.otherVel !== 0 && this.vel !== 0) {\n      if (direction === 'cw') {\n        this.posRel = (this.posRel + 1) % 4;\n      } else {\n        this.posRel = this.posRel - 1 < 0 ? 3 : this.posRel - 1;\n      }\n    }\n  }\n\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (GemPrimary);\n\n//# sourceURL=webpack:///./src/gemPrimary.js?");

/***/ }),

/***/ "./src/gemSecondary.js":
/*!*****************************!*\
  !*** ./src/gemSecondary.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _gemPrimary__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gemPrimary */ \"./src/gemPrimary.js\");\n\n\nclass GemSecondary extends _gemPrimary__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\n  constructor(ctx, vel) {\n    super(ctx, vel);\n    this.posY = 10;\n    this.posRel = 0;\n  }\n\n  goLive(ctx) {\n    super.goLive(ctx);\n    this.posY = -55;\n  }\n\n  rotate(direction) {\n    if (this.otherVel !== 0 && this.vel !== 0) {\n      if (direction === 'cw') {\n        if (!(this.col === 0 && this.posRel === 2) && !(this.col === 5 && this.posRel === 0)) {\n          const rotationsCW = [{ dx: 50, dy: -50 }, { dx: 50, dy: 50 }, { dx: -50, dy: 50 }, { dx: -50, dy: -50 }];\n          this.col = (this.posRel === 1 || this.posRel === 2) ? (this.col - 1) : (this.col + 1);\n          this.posRel = (this.posRel + 1) % 4;\n          this.posX += rotationsCW[this.posRel].dx;\n          this.posY += rotationsCW[this.posRel].dy;\n        }\n      } else {\n        if (!(this.col === 0 && this.posRel === 0) && !(this.col === 5 && this.posRel === 2)) {\n          const rotationsCCW = [{ dx: 50, dy: 50 }, { dx: -50, dy: 50 }, { dx: -50, dy: -50 }, { dx: 50, dy: -50 }];\n          this.col = (this.posRel === 0 || this.posRel === 1) ? (this.col - 1) : (this.col + 1);\n          this.posRel = this.posRel - 1 < 0 ? 3 : this.posRel - 1;\n          this.posX -= rotationsCCW[this.posRel].dx;\n          this.posY -= rotationsCCW[this.posRel].dy;\n        }\n      }\n    }\n  }\n\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (GemSecondary);\n\n//# sourceURL=webpack:///./src/gemSecondary.js?");

/***/ }),

/***/ "./src/gemStorage.js":
/*!***************************!*\
  !*** ./src/gemStorage.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _gemNull__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gemNull */ \"./src/gemNull.js\");\n\n\nclass GemStorage {\n  constructor(ctx) {\n    this.gemNull = new _gemNull__WEBPACK_IMPORTED_MODULE_0__[\"default\"](ctx);\n    this.gemStorage = [\n      [this.gemNull],\n      [this.gemNull],\n      [this.gemNull],\n      [this.gemNull],\n      [this.gemNull],\n      [this.gemNull]\n    ];\n  }\n\n  get() {\n    return this.gemStorage;\n  }\n\n  height(col) {\n    if (this.gemStorage[col]) {\n      const highestGem = this.gemStorage[col][this.gemStorage[col].length - 1];\n      return highestGem.posY - 50;\n    } else {\n      return 0;\n    }\n  }\n\n  render() {\n    this.gemStorage.forEach(col => {\n      col.forEach(gem => {\n        gem.render();\n      });\n    });\n  }\n\n  update({gemPrimary, gemSecondary}, updateScore) {\n    this.store(gemPrimary, gemSecondary);\n    this.handleCrashGems(updateScore);\n  }\n\n  store(gemPrimary, gemSecondary) {\n    const gems =\n      gemPrimary.posRel === 2\n        ? [gemPrimary, gemSecondary]\n        : [gemSecondary, gemPrimary];\n\n    gems.forEach(gem => {\n      switch (gem.posX) {\n        case 0:\n          this.gemStorage[0].push(gem);\n          break;\n        case 50:\n          this.gemStorage[1].push(gem);\n          break;\n        case 100:\n          this.gemStorage[2].push(gem);\n          break;\n        case 150:\n          this.gemStorage[3].push(gem);\n          break;\n        case 200:\n          this.gemStorage[4].push(gem);\n          break;\n        case 250:\n          this.gemStorage[5].push(gem);\n          break;\n      }\n    });\n  }\n\n  handleCrashGems(updateScore, scoreBonus = 1) {\n    let clearedAllValidCrashGems = true;\n    const deleteArr = this.checkCrashGems(updateScore, scoreBonus);\n    const gemStorage = this.gemStorage;\n    for (let col = 0; col < 6; col++) {\n      if (deleteArr[col].length > 0) {\n        clearedAllValidCrashGems = false;\n      }\n      gemStorage[col] = gemStorage[col].filter(\n        (gem, gemIdx) => !deleteArr[col].includes(gemIdx)\n      );\n    }\n    gemStorage.forEach(col => {\n      col.forEach((gem, idx) => {\n        if (idx > 0 && gem.posY < col[idx - 1].posY - 50) {\n          gem.updatePosY(col[idx - 1].posY - 50);\n        }\n      });\n    });\n    if (!clearedAllValidCrashGems) {\n      this.handleCrashGems(updateScore, scoreBonus + 1);\n    }\n  }\n\n  checkCrashGems(updateScore, scoreBonus) {\n    const deleteArr = [[], [], [], [], [], []],\n      remove = [];\n    const gemStorage = this.gemStorage;\n    gemStorage.forEach((col, colNum) => {\n      col.forEach((gem, rowNum) => {\n        if (gem.type === \"crash\") {\n          remove.push(...this.checkNeighbors(colNum, rowNum, gem.color));\n        }\n      });\n    });\n    updateScore(50 * remove.length * scoreBonus);\n    remove.forEach(gem => {\n      deleteArr[gem.col].push(gem.row);\n    });\n\n    return deleteArr;\n  }\n\n  checkNeighbors(col, row, color) {\n    const direction = [\n      [-1, 0],\n      [0, -1],\n      [1, 0],\n      [0, 1]\n    ];\n    const seen = {};\n    const gemStorage = this.gemStorage;\n    const remove = [];\n    helper(col, row);\n\n    function helper(col, row) {\n      if (\n        seen[`${col}#${row}`] ||\n        !gemStorage[col][row] ||\n        gemStorage[col][row].color !== color\n      )\n        return;\n      seen[`${col}#${row}`] = true;\n      if (gemStorage[col][row].color === color) {\n        remove.push({ col, row });\n      }\n      direction.forEach(dir => {\n        let adjCol = col + dir[0],\n          adjRow = row + dir[1];\n        if (adjCol >= 0 && adjCol <= 5 && !seen[`${adjCol}#${adjRow}`]) {\n          helper(adjCol, adjRow);\n        }\n      });\n    }\n\n    return remove.length > 1 ? remove : [];\n  }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (GemStorage);\n\n\n//# sourceURL=webpack:///./src/gemStorage.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game */ \"./src/game.js\");\n\n\ndocument.addEventListener('DOMContentLoaded', () => {\n\n  const canvasPF1 = document.getElementById(\"play-field-1\");\n  canvasPF1.width = 300;\n  canvasPF1.height = 650;\n  const ctxPF1 = canvasPF1.getContext('2d');\n\n  const scoreboard = document.getElementById(\"scoreboard\");\n  scoreboard.width = 150;\n  scoreboard.height = 60;\n  const ctxScoreboard = scoreboard.getContext('2d');\n\n  const nextGem = document.getElementById(\"next-gems\");\n  nextGem.width = 70;\n  nextGem.height = 120;\n  const ctxnextGem = nextGem.getContext('2d');\n\n  const game = new _game__WEBPACK_IMPORTED_MODULE_0__[\"default\"](ctxPF1, ctxScoreboard, ctxnextGem);\n    \n  game.gameRender();\n});\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/menus.js":
/*!**********************!*\
  !*** ./src/menus.js ***!
  \**********************/
/*! exports provided: startGameMenu, endGameMenu */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"startGameMenu\", function() { return startGameMenu; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"endGameMenu\", function() { return endGameMenu; });\nconst startGameMenu = (gameStart) => {  \n  const handleEnter = (event) => {\n    if (event.defaultPrevented) {\n      return;\n    }\n    switch (event.key) { \n      case \"Enter\":\n        document.getElementById(\"menu\").setAttribute(\"style\", \"display:none;\");\n        gameStart();\n        break;\n      default:\n        return;\n    }\n    event.preventDefault();\n    window.removeEventListener(\"keydown\", handleEnter, true);\n  };\n\n  window.addEventListener(\"keydown\", handleEnter, true);\n\n};\n\n\nconst endGameMenu = (ctx, score, gameStart) => {\n  let highScore = localStorage.getItem(\"highscore\") || score;\n  if (score >= highScore) {\n    localStorage.setItem(\"highscore\", score);\n    highScore = score;\n  }\n  ctx.fillStyle = \"white\";\n  ctx.globalAlpha = 0.25;\n  ctx.fillRect(0, 0, 300, 650);\n  ctx.fillStyle = \"black\";\n  ctx.globalAlpha = 1;\n  ctx.fillRect(0, 275, 300, 180);\n  ctx.fillStyle = \"red\";\n  ctx.font = \"40px 'Permanent Marker','Sedgwick Ave Display', Helvetica, sans-serif\";\n  ctx.textAlign = \"center\";\n  ctx.fillText(\"GAME OVER\", 150, 330);\n  ctx.font = \"20px 'Permanent Marker','Sedgwick Ave Display', Helvetica, sans-serif\";\n  ctx.textAlign = \"center\";\n  ctx.fillText(`Your score: ${score}`, 150, 365);\n  ctx.fillText(`High score: ${highScore}`, 150, 395);\n  ctx.fillText(`Press Enter to play again`, 150, 425);\n\n  const handleEnter = (event) => {\n    if (event.defaultPrevented) {\n      return;\n    }\n    switch (event.key) {\n      case \"Enter\":\n        gameStart();\n        break;\n      default:\n        return;\n    }\n    event.preventDefault();\n    window.removeEventListener(\"keydown\", handleEnter, true);\n  };\n\n  window.addEventListener(\"keydown\", handleEnter, true);\n};\n\n\n\n//# sourceURL=webpack:///./src/menus.js?");

/***/ })

/******/ });