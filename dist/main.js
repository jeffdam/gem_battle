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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _gemPrimary__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gemPrimary */ \"./src/gemPrimary.js\");\n/* harmony import */ var _gemSecondary__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./gemSecondary */ \"./src/gemSecondary.js\");\n/* harmony import */ var _gemNull__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./gemNull */ \"./src/gemNull.js\");\n/* harmony import */ var _menus__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./menus */ \"./src/menus.js\");\n\n\n\n\n\nclass Game {\n  constructor(ctx, ctxScoreboard, ctxNextGem) {\n    this.ctx = ctx;\n    this.ctxScoreboard = ctxScoreboard;\n    this.ctxNextGem = ctxNextGem;\n\n    this.gemCount = 0;\n    this.gemVel = 1;\n    this.gemPrimaryLive = undefined;\n    this.gemSecondaryLive = undefined;\n    this.gemPrimaryStaging = new _gemPrimary__WEBPACK_IMPORTED_MODULE_0__[\"default\"](this.ctxNextGem, this.gemVel);\n    this.gemSecondaryStaging = new _gemSecondary__WEBPACK_IMPORTED_MODULE_1__[\"default\"](this.ctxNextGem, this.gemVel);\n    this.gemNull = new _gemNull__WEBPACK_IMPORTED_MODULE_2__[\"default\"](this.ctx);\n    this.gemStorage = [\n      [this.gemNull],\n      [this.gemNull],\n      [this.gemNull],\n      [this.gemNull],\n      [this.gemNull],\n      [this.gemNull],\n    ];\n    this.deleteArr = [[],[],[],[],[],[]];\n    this.score = 0;\n    this.renderCycle = this.renderCycle.bind(this);\n    this.gameStart = this.gameStart.bind(this);\n  }\n\n  storeCurrentGem(){\n    const gems = this.gemPrimaryLive.posRel === 2 ? [this.gemPrimaryLive, this.gemSecondaryLive] : [this.gemSecondaryLive, this.gemPrimaryLive];\n\n    gems.forEach(gem => {\n      switch(gem.posX) {\n        case 0:\n          this.gemStorage[0].push(gem);\n          break;\n        case 50:\n          this.gemStorage[1].push(gem);\n          break;\n        case 100:\n          this.gemStorage[2].push(gem);\n          break;\n        case 150:\n          this.gemStorage[3].push(gem);\n          break;\n        case 200:\n          this.gemStorage[4].push(gem);\n          break;\n        case 250:\n          this.gemStorage[5].push(gem);\n          break;\n      }\n    });\n  }\n\n  colHeight(col) {\n    if (this.gemStorage[col]) {\n      return this.gemStorage[col].slice(this.gemStorage[col].length - 1)[0].posY - 50;\n    } else {\n      return 0;\n    }\n  }\n  \n  moveHorizontal(direction) {\n    if (direction === \"left\") {\n      this.gemPrimaryLive.moveHorizontal('left', this.colHeight(this.gemPrimaryLive.col - 1));\n      this.gemSecondaryLive.moveHorizontal('left', this.colHeight(this.gemSecondaryLive.col - 1));\n    } else {\n      this.gemPrimaryLive.moveHorizontal('right', this.colHeight(this.gemPrimaryLive.col + 1));\n      this.gemSecondaryLive.moveHorizontal('right', this.colHeight(this.gemSecondaryLive.col + 1));\n    }\n  }\n\n  rotate(direction) {\n    this.gemPrimaryLive.rotate(direction);\n    this.gemSecondaryLive.rotate(direction);\n  }\n\n  rotateCW() {\n    let adjColHeight;\n    switch (this.gemSecondaryLive.posRel) {\n      case 0:\n        adjColHeight = this.colHeight(this.gemSecondaryLive.col + 1) - 50;\n        if (this.gemSecondaryLive.posY < adjColHeight) { \n          this.rotate('cw'); \n        }\n        break;\n      case 1:\n        adjColHeight = this.colHeight(this.gemSecondaryLive.col - 1) - 50;\n        if (this.gemSecondaryLive.posY < this.colHeight(this.gemSecondaryLive.col) && this.gemSecondaryLive.posY < adjColHeight) { this.rotate('cw'); }\n        break;\n      case 2:\n        adjColHeight = this.colHeight(this.gemSecondaryLive.col - 1);\n        if (this.gemSecondaryLive.posY < adjColHeight) { this.rotate('cw'); }\n        break;\n      case 3:\n        this.rotate('cw');\n        break;\n    }\n  }\n\n  rotateCCW() {\n    let adjColHeight;\n    switch (this.gemSecondaryLive.posRel) {\n      case 0:\n        adjColHeight = this.colHeight(this.gemSecondaryLive.col - 1) - 50;\n        if (this.gemSecondaryLive.posY < adjColHeight) { this.rotate('ccw'); }\n        break;\n      case 1:\n        this.rotate('ccw');\n        break;\n      case 2:\n        adjColHeight = this.colHeight(this.gemSecondaryLive.col + 1);\n        if (this.gemSecondaryLive.posY < adjColHeight) { this.rotate('ccw'); }\n        break;\n      case 3:\n        adjColHeight = this.colHeight(this.gemSecondaryLive.col + 1) - 50;\n        if (this.gemSecondaryLive.posY < this.colHeight(this.gemSecondaryLive.col) && this.gemSecondaryLive.posY < adjColHeight) { this.rotate('ccw'); }\n        break;\n    }\n  }\n  \n  removeBelow(arr, color, colNum) {\n    let hasAdj = false;\n    for (let i = arr.length-1; i > 0; i--) {\n      if (arr[i].color === color && !this.deleteArr[colNum].includes(i)) {\n        hasAdj = true;\n        this.deleteArr[colNum].push(i);\n        this.checkRow(colNum, i, color);\n        this.score += 50;\n      } else {\n        break;\n      }\n    } \n    return hasAdj;\n  }\n\n  removeAbove(arr, color, colNum, idx) {\n    let hasAdj = false;\n    for (let i = 0; i < arr.length; i++) {\n      if (arr[i].color === color && !this.deleteArr[colNum].includes(i + idx + 1)) {\n        hasAdj = true;\n        this.deleteArr[colNum].push(i + idx + 1);\n        this.checkRow(colNum, i + idx + 1, color);\n\n        this.score += 50;\n      } else {\n        break;\n      }\n    }\n    return hasAdj;\n  }\n\n  checkCol(colNum, idx, color) {\n    let column = this.gemStorage[colNum];\n    const below = column.slice(0, idx);\n    const above = column.slice(idx+1);\n    const belowHasAdj = this.removeBelow(below, color, colNum);\n    const aboveHasAdj =  this.removeAbove(above, color, colNum, idx);\n    return (belowHasAdj || aboveHasAdj);\n  }\n\n  checkRow(colNum, idx, color) {\n    let adjGem;\n    let hasAdj = false;\n    for (let i = colNum - 1; i >= 0; i--) {\n      adjGem = this.gemStorage[i][idx];\n      if (adjGem && adjGem.color === color) {\n        hasAdj = true;\n        if (!this.deleteArr[i].includes(idx)) {\n          this.deleteArr[i].push(idx);\n          this.score += 50;\n        }\n        this.checkCol(i, idx, color);\n      } else {\n        break;\n      }\n    }\n    for (let j = colNum + 1; j <= 5; j++) {\n      adjGem = this.gemStorage[j][idx];\n      if (adjGem && adjGem.color === color) {\n        hasAdj = true;\n        if (!this.deleteArr[j].includes(idx)) {\n          this.deleteArr[j].push(idx);\n          this.score += 50;\n        }\n        this.checkCol(j, idx, color);\n      } else {\n        break;\n      }\n    }\n    return hasAdj;\n  }\n\n  checkCrashGems() {\n    this.gemStorage.forEach((col, colNum) => {\n      col.forEach((gem,idx) => {\n        if (gem.type === \"crash\") {\n          const colHasAdj = this.checkCol(colNum, idx, gem.color);\n          const rowHasAdj = this.checkRow(colNum, idx, gem.color);\n          if (colHasAdj || rowHasAdj) {\n            if (!this.deleteArr[colNum].includes(idx)) {\n              this.deleteArr[colNum].push(idx);\n              this.score += 50;\n            }\n          }\n        }\n      });\n    });\n  }\n\n  // updateGem(gem, colHeight){\n  //   let id = requestAnimationFrame(() => {\n  //     const gemSave = gem;\n  //     const colHeightSave = colHeight;\n  //     this.updateGem(gemSave, colHeightSave);\n  //   });\n  //   gem.drop(colHeight, 10);\n  //   if (gem.vel === 0) {\n  //     cancelAnimationFrame(id);\n  //   }\n  // }\n\n  handleCrashGems() {\n    let clearedAllValidCrashGems = true;\n    this.checkCrashGems();\n    for (let colNum = 0; colNum < 6; colNum++) {\n      if (this.deleteArr[colNum].length > 0) { clearedAllValidCrashGems = false;}\n      this.gemStorage[colNum] = this.gemStorage[colNum].filter((gem, gemIdx) => !this.deleteArr[colNum].includes(gemIdx));\n    }\n    this.deleteArr = [[], [], [], [], [], []];\n    this.gemStorage.forEach((col) => {\n      col.forEach((gem, idx) => {\n        if (idx > 0 && gem.posY < col[idx - 1].posY - 50) {\n          gem.updatePosY(col[idx - 1].posY - 50);\n          // this.updateGem(gem, col[idx-1].posY-50);\n        }\n      });\n    });\n    if (!clearedAllValidCrashGems) {\n      this.handleCrashGems();\n    } \n  }\n\n\n  handleKeyEvent() {\n    window.addEventListener(\"keydown\", (event) => {\n      if (event.defaultPrevented) {\n        return; // Do nothing if the event was already processed\n      }\n      switch (event.key) {\n        case \"Left\": // IE/Edge specific value\n        case \"ArrowLeft\":\n          if (this.gemPrimaryLive.posRel === 1 && this.gemSecondaryLive.posY < this.colHeight(this.gemSecondaryLive.col - 1)) {\n            this.gemPrimaryLive.moveHorizontal('left', this.colHeight(this.gemSecondaryLive.col));\n            this.gemSecondaryLive.moveHorizontal('left', this.colHeight(this.gemSecondaryLive.col - 1));\n          } else if (this.gemSecondaryLive.posRel === 1 && this.gemPrimaryLive.posY < this.colHeight(this.gemPrimaryLive.col - 1)) {\n            this.gemPrimaryLive.moveHorizontal('left', this.colHeight(this.gemPrimaryLive.col - 1));\n            this.gemSecondaryLive.moveHorizontal('left', this.colHeight(this.gemPrimaryLive.col));\n          } else if (this.gemPrimaryLive.posRel !== 3 && this.gemSecondaryLive.posRel !== 3) {\n            this.moveHorizontal('left');\n          } \n          break;\n        case \"Right\": // IE/Edge specific value\n        case \"ArrowRight\":\n          if (this.gemPrimaryLive.posRel === 3 && this.gemSecondaryLive.posY < this.colHeight(this.gemSecondaryLive.col + 1)) {\n            this.gemPrimaryLive.moveHorizontal('right', this.colHeight(this.gemSecondaryLive.col));\n            this.gemSecondaryLive.moveHorizontal('right', this.colHeight(this.gemSecondaryLive.col + 1));\n          } else if (this.gemSecondaryLive.posRel === 3 && this.gemPrimaryLive.posY < this.colHeight(this.gemPrimaryLive.col + 1)) {\n            this.gemPrimaryLive.moveHorizontal('right', this.colHeight(this.gemPrimaryLive.col + 1));\n            this.gemSecondaryLive.moveHorizontal('right', this.colHeight(this.gemPrimaryLive.col));\n          } else if (this.gemPrimaryLive.posRel !== 3 && this.gemSecondaryLive.posRel !== 3){\n            this.moveHorizontal('right');\n          } \n          break;\n        case \"z\": // Rotate Clockwise\n          this.rotateCW(); \n          break;\n        case \"x\": // Rotate Counter-clockwise\n          this.rotateCCW();\n          break;\n        default:\n          return; // Quit when this doesn't handle the key event.\n      }\n      event.preventDefault();\n    }, true);\n  }\n\n  handleDownArrowKeyEvent() {\n    const handleDownArrow = (event) => {\n      if (event.defaultPrevented) {\n        return;\n      }\n      switch (event.key) {\n        case \"Down\": // IE/Edge specific value\n        case \"ArrowDown\":\n          this.gemPrimaryLive.hardDrop(this.colHeight(this.gemPrimaryLive.col));\n          this.gemSecondaryLive.hardDrop(this.colHeight(this.gemSecondaryLive.col));\n          break;\n        default:\n          return;\n      }\n      event.preventDefault();\n      window.removeEventListener(\"keydown\", handleDownArrow, true);\n    };\n\n    window.addEventListener(\"keydown\", handleDownArrow, true);\n\n  }\n\n  moveStagingToLive() {\n    this.gemPrimaryStaging.goLive(this.ctx);\n    this.gemPrimaryLive = this.gemPrimaryStaging;\n    this.gemPrimaryStaging = new _gemPrimary__WEBPACK_IMPORTED_MODULE_0__[\"default\"](this.ctxNextGem, this.gemVel);\n    this.gemSecondaryStaging.goLive(this.ctx);\n    this.gemSecondaryLive = this.gemSecondaryStaging;\n    this.gemSecondaryStaging = new _gemSecondary__WEBPACK_IMPORTED_MODULE_1__[\"default\"](this.ctxNextGem, this.gemVel);\n  }\n\n  renderStaging() {\n    this.gemPrimaryStaging.render();\n    this.gemSecondaryStaging.render();\n  }\n\n  renderGems() {    \n    this.handleKeyEvent();\n\n    if (!this.gemPrimaryLive) {\n      this.moveStagingToLive();\n    }\n\n    this.gemSecondaryLive.drop(this.colHeight(this.gemSecondaryLive.col));\n    this.gemPrimaryLive.drop(this.colHeight(this.gemPrimaryLive.col));\n    if (this.gemPrimaryLive.vel === 0) {\n      this.gemSecondaryLive.updateOtherVel();\n    } else if (this.gemSecondaryLive.vel === 0) {\n      this.gemPrimaryLive.updateOtherVel();\n    }\n  }\n\n  renderGemStorage() {\n    this.gemStorage.forEach(col => {\n      col.forEach(gem => {\n        gem.render();\n      });\n    });\n  }\n\n  updateScore() {\n    this.ctxScoreboard.font = \"30px 'Permanent Marker','Sedgwick Ave Display', Helvetica, sans-serif\";\n    this.ctxScoreboard.strokeStyle = \"white\";\n    this.ctxScoreboard.strokeText(this.score, 10, 40);\n  }\n\n  renderCycle() {\n    let id = requestAnimationFrame(this.renderCycle);\n\n    this.ctx.clearRect(0, 0, 300, 650);\n    this.ctxNextGem.clearRect(0, 0, 300, 650);\n    this.ctxScoreboard.clearRect(0, 0, 300, 650);\n\n    this.renderGemStorage();\n    this.renderStaging();\n    this.renderGems();\n\n    this.updateScore();\n\n    if (this.gemPrimaryLive.vel === 0 && this.gemSecondaryLive.vel === 0) {\n      cancelAnimationFrame(id);\n\n      this.storeCurrentGem();\n      this.moveStagingToLive();\n      \n      this.handleCrashGems();\n\n      if (this.gemCount % 15 === 0) {\n        this.gemVel++;\n      }\n\n      if (this.colHeight(3) >= -50) {\n        this.score += 10;\n        this.gemCount++;\n        this.handleDownArrowKeyEvent();\n        this.renderCycle();\n      } else {\n        Object(_menus__WEBPACK_IMPORTED_MODULE_3__[\"endGameMenu\"])(this.ctx, this.score, this.gameStart);\n      }\n    }\n  }\n  \n  gameRender() {\n    Object(_menus__WEBPACK_IMPORTED_MODULE_3__[\"startGameMenu\"])(this.ctx, this.ctxNextGem, this.ctxScoreboard, this.gameStart);\n  }\n\n  gameStart() {\n    if (this.gemPrimaryLive) this.reset();\n    this.handleDownArrowKeyEvent();\n    this.renderCycle();\n  }\n\n  reset() {\n    this.gemCount = 0;\n    this.gemVel = 1;\n    this.gemPrimaryLive = undefined;\n    this.gemSecondaryLive = undefined;\n    this.gemPrimaryStaging = new _gemPrimary__WEBPACK_IMPORTED_MODULE_0__[\"default\"](this.ctxNextGem, this.gemVel);\n    this.gemSecondaryStaging = new _gemSecondary__WEBPACK_IMPORTED_MODULE_1__[\"default\"](this.ctxNextGem, this.gemVel);\n    this.gemStorage = [\n      [this.gemNull],\n      [this.gemNull],\n      [this.gemNull],\n      [this.gemNull],\n      [this.gemNull],\n      [this.gemNull],\n    ];\n    this.score = 0;\n    this.deleteArr = [[], [], [], [], [], []];\n  }\n \n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Game);\n\n\n//# sourceURL=webpack:///./src/game.js?");

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

/***/ "./src/gemPrimary.js":
/*!***************************!*\
  !*** ./src/gemPrimary.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nclass GemPrimary {\n  constructor(ctx, vel) {\n    const gemImages = [\n      // { color: \"blue\", imgSrc: \"./assets/images/cat.png\" },\n      // { color: \"red\", imgSrc: \"./assets/images/cat.png\" },\n      // { color: \"green\", imgSrc: \"./assets/images/cat.png\" },\n      // { color: \"yellow\", imgSrc: \"./assets/images/cat.png\" }\n      { type: \"gem\", color: \"blue\", imgSrc: \"./assets/images/SPF2T_Gem_Blue.png\" },\n      { type: \"gem\", color: \"red\", imgSrc: \"./assets/images/SPF2T_Gem_Red.png\" },\n      { type: \"gem\", color: \"green\", imgSrc: \"./assets/images/SPF2T_Gem_Green.png\" },\n      { type: \"gem\", color: \"yellow\", imgSrc: \"./assets/images/SPF2T_Gem_Yellow.png\" },\n      { type: \"gem\", color: \"blue\", imgSrc: \"./assets/images/SPF2T_Gem_Blue.png\" },\n      { type: \"gem\", color: \"red\", imgSrc: \"./assets/images/SPF2T_Gem_Red.png\" },\n      { type: \"gem\", color: \"green\", imgSrc: \"./assets/images/SPF2T_Gem_Green.png\" },\n      { type: \"gem\", color: \"yellow\", imgSrc: \"./assets/images/SPF2T_Gem_Yellow.png\" },\n      { type: \"gem\", color: \"blue\", imgSrc: \"./assets/images/SPF2T_Gem_Blue.png\" },\n      { type: \"gem\", color: \"red\", imgSrc: \"./assets/images/SPF2T_Gem_Red.png\" },\n      { type: \"gem\", color: \"green\", imgSrc: \"./assets/images/SPF2T_Gem_Green.png\" },\n      { type: \"gem\", color: \"yellow\", imgSrc: \"./assets/images/SPF2T_Gem_Yellow.png\" },\n      { type: \"gem\", color: \"blue\", imgSrc: \"./assets/images/SPF2T_Gem_Blue.png\" },\n      { type: \"gem\", color: \"red\", imgSrc: \"./assets/images/SPF2T_Gem_Red.png\" },\n      { type: \"gem\", color: \"green\", imgSrc: \"./assets/images/SPF2T_Gem_Green.png\" },\n      { type: \"gem\", color: \"yellow\", imgSrc: \"./assets/images/SPF2T_Gem_Yellow.png\" },\n      { type: \"crash\", color: \"blue\", imgSrc: \"./assets/images/SPF2T_Crash_Blue.png\" },\n      { type: \"crash\", color: \"red\", imgSrc: \"./assets/images/SPF2T_Crash_Red.png\" },\n      { type: \"crash\", color: \"green\", imgSrc: \"./assets/images/SPF2T_Crash_Green.png\" },\n      { type: \"crash\", color: \"yellow\", imgSrc: \"./assets/images/SPF2T_Crash_Yellow.png\" }\n    ];\n    this.gem = gemImages[Math.floor(Math.random() * gemImages.length)];\n    this.ctx = ctx;\n    this.posX = 10;\n    this.posY = 60;\n    this.color = this.gem.color;\n    this.type = this.gem.type;\n    const img = new Image();\n    img.src = this.gem.imgSrc;\n    this.img = img;\n    this.widthHeight = 50;\n    this.vel = vel;\n    this.col = 3;\n    this.posRel = 2;\n    this.otherVel = 5;\n  }\n\n  handleCollision(colHeight) {\n    if ((this.posRel === 0 && this.posY >= colHeight - 50) || (this.posRel !== 0 && this.posY >= colHeight)) {\n      this.posY = this.posRel === 0 ? colHeight - 50 : colHeight;\n      this.vel = 0;\n    }\n  }\n\n  updatePosY(newPosY) {\n    this.posY = newPosY;\n  }\n\n  hardDrop(colHeight) {\n    this.posY = this.posRel === 0 ? colHeight - 65 : colHeight - 15;\n  }\n\n  goLive(ctx) {\n    this.ctx = ctx;\n    this.posX = 150;\n    this.posY = -5;\n  }\n\n  updateOtherVel() {\n    this.otherVel = 0;\n  }\n\n  render() {\n    this.ctx.drawImage(this.img, this.posX, this.posY, this.widthHeight, this.widthHeight);\n  }\n\n  drop(colHeight, vel = this.vel) {\n    this.vel = vel;\n    this.posY += vel;\n    this.handleCollision(colHeight);\n    this.render();\n  }\n\n  moveHorizontal(direction, adjColHeight) {\n    if (this.otherVel !== 0 && this.vel !== 0) {\n      if ((this.posRel === 0 && this.posY < adjColHeight - 50) || (this.posRel !== 0 && this.posY < adjColHeight)) {\n        if (direction === \"left\") {\n          this.posX -= 50;\n          this.col -= 1;\n        } else if (direction === \"right\") {\n          this.posX += 50;\n          this.col += 1;\n        }\n      }\n    }\n  }\n\n  rotate(direction) {\n    if (this.otherVel !== 0 && this.vel !== 0) {\n      if (direction === 'cw') {\n        this.posRel = (this.posRel + 1) % 4;\n      } else {\n        this.posRel = this.posRel - 1 < 0 ? 3 : this.posRel - 1;\n      }\n    }\n  }\n\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (GemPrimary);\n\n//# sourceURL=webpack:///./src/gemPrimary.js?");

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

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game */ \"./src/game.js\");\n\n\ndocument.addEventListener('DOMContentLoaded', () => {\n  const canvasPF1 = document.getElementById(\"play-field-1\");\n  canvasPF1.width = 300;\n  canvasPF1.height = 650;\n  const ctxPF1 = canvasPF1.getContext('2d');\n\n  const scoreboard = document.getElementById(\"scoreboard\");\n  scoreboard.width = 150;\n  scoreboard.height = 60;\n  const ctxScoreboard = scoreboard.getContext('2d');\n\n  const nextGem = document.getElementById(\"next-gems\");\n  nextGem.width = 70;\n  nextGem.height = 120;\n  const ctxnextGem = nextGem.getContext('2d');\n\n  const game = new _game__WEBPACK_IMPORTED_MODULE_0__[\"default\"](ctxPF1, ctxScoreboard, ctxnextGem);\n    \n  game.gameRender();\n});\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/menus.js":
/*!**********************!*\
  !*** ./src/menus.js ***!
  \**********************/
/*! exports provided: startGameMenu, endGameMenu */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"startGameMenu\", function() { return startGameMenu; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"endGameMenu\", function() { return endGameMenu; });\nconst startGameMenu = (ctx, ctxNextGem, ctxScoreboard, gameStart) => {\n  ctxNextGem.fillRect(0, 0, 300, 650);\n  ctxNextGem.fillStyle = \"black\";\n  ctxScoreboard.fillRect(0, 0, 300, 650);\n  ctxScoreboard.fillStyle = \"black\";\n\n  ctx.fillRect(0, 0, 300, 650);\n  ctx.fillStyle = \"black\";\n  ctx.textAlign = \"center\";\n  ctx.fillStyle = \"white\";\n  const linePosYStart = 125;\n  const subLines = (lineNum) => (linePosYStart + (lineNum * 30));\n\n  ctx.font = \"24px 'Permanent Marker','Sedgwick Ave Display', Helvetica, sans-serif\";\n  ctx.fillText(\"Welcome to\", 150, 40, 280);\n  ctx.font = \"30px 'Permanent Marker','Sedgwick Ave Display', Helvetica, sans-serif\";\n  ctx.fillText(\"Gem Battle!\", 150, 75, 280);\n\n  ctx.font = \"20px 'Permanent Marker','Sedgwick Ave Display', Helvetica, sans-serif\";\n  ctx.fillText(\"Clear as many gems as you can!\", 150, subLines(0), 280);\n  ctx.fillText(\"Use left arrow to move left.\", 150, subLines(1), 280);\n  ctx.fillText(\"Use right arrow to move right.\", 150, subLines(2), 280);\n  ctx.fillText(\"Use down arrow to hard drop.\", 150, subLines(3), 280);\n  ctx.fillText(\"Use 'z' to rotate clockwise.\", 150, subLines(4), 280);\n  ctx.fillText(\"Use 'x' to rotate counter-clockwise.\", 150, subLines(5), 280);\n\n  ctx.fillText(\"Place similar colored gems next\", 150, subLines(7), 280);\n  ctx.fillText(\"to each other. Use the round gems\", 150, subLines(8), 280);\n  ctx.fillText(\"to clear the same colored gems.\", 150, subLines(9), 280);\n  ctx.fillText(\"The game is over when the drop\", 150, subLines(10), 280);\n  ctx.fillText(\"alley is blocked.\", 150, subLines(11), 280);\n\n  ctx.font = \"30px 'Permanent Marker','Sedgwick Ave Display', Helvetica, sans-serif\";\n  ctx.fillText(\"Press Enter to Start\", 150, subLines(13), 280);\n\n  const handleEnter = (event) => {\n    if (event.defaultPrevented) {\n      return;\n    }\n    switch (event.key) {\n      case \"Enter\":\n        gameStart();\n        break;\n      default:\n        return;\n    }\n    event.preventDefault();\n    window.removeEventListener(\"keydown\", handleEnter, true);\n  };\n\n  window.addEventListener(\"keydown\", handleEnter, true);\n\n};\n\n\nconst endGameMenu = (ctx, score, gameStart) => {\n  ctx.fillStyle = \"black\";\n  ctx.globalAlpha = 0.5;\n  ctx.fillRect(0, 0, 300, 650);\n  ctx.globalAlpha = 1;\n  ctx.fillRect(0, 275, 300, 150);\n  ctx.fillStyle = \"red\";\n  ctx.font = \"40px 'Permanent Marker','Sedgwick Ave Display', Helvetica, sans-serif\";\n  ctx.textAlign = \"center\";\n  ctx.fillText(\"GAME OVER\", 150, 330);\n  ctx.font = \"20px 'Permanent Marker','Sedgwick Ave Display', Helvetica, sans-serif\";\n  ctx.textAlign = \"center\";\n  ctx.fillText(`Your score: ${score}`, 150, 365);\n  ctx.fillText(`Press Enter to play again.`, 150, 395);\n\n  const handleEnter = (event) => {\n    if (event.defaultPrevented) {\n      return;\n    }\n    switch (event.key) {\n      case \"Enter\":\n        gameStart();\n        break;\n      default:\n        return;\n    }\n    event.preventDefault();\n    window.removeEventListener(\"keydown\", handleEnter, true);\n  };\n\n  window.addEventListener(\"keydown\", handleEnter, true);\n};\n\n\n\n//# sourceURL=webpack:///./src/menus.js?");

/***/ })

/******/ });