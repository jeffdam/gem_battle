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

eval("const GemPrimary = __webpack_require__(/*! ./gemPrimary */ \"./src/gemPrimary.js\");\nconst GemSecondary = __webpack_require__(/*! ./gemSecondary */ \"./src/gemSecondary.js\");\nconst GemNull = __webpack_require__(/*! ./gemNull */ \"./src/gemNull.js\");\n\nclass Game {\n  constructor(ctx, ctxScoreboard, ctxNextGem) {\n    this.ctx = ctx;\n    this.ctxScoreboard = ctxScoreboard;\n    this.ctxNextGem = ctxNextGem;\n    this.gemPrimaryLive = undefined;\n    this.gemSecondaryLive = undefined;\n    this.gemPrimaryStaging = new GemPrimary(this.ctxNextGem);\n    this.gemSecondaryStaging = new GemSecondary(this.ctxNextGem);\n    this.gemNull = new GemNull(this.ctx);\n    this.gemStorage = [\n      [this.gemNull],\n      [this.gemNull],\n      [this.gemNull],\n      [this.gemNull],\n      [this.gemNull],\n      [this.gemNull],\n    ];\n    this.score = 0;\n    this.renderCycle = this.renderCycle.bind(this);\n    this.updateGem = this.updateGem.bind(this);\n    this.deleteArr = [[],[],[],[],[],[]];\n  }\n\n  startMenu() {\n    this.ctxNextGem.fillRect(0,0,300, 650);\n    this.ctxNextGem.fillStyle = \"black\";\n    this.ctxScoreboard.fillRect(0,0,300, 650);\n    this.ctxScoreboard.fillStyle = \"black\";\n\n    this.ctx.fillRect(0,0,300, 650);\n    this.ctx.fillStyle = \"black\";\n    this.ctx.textAlign = \"center\";\n    this.ctx.fillStyle = \"white\";\n    this.ctx.font = \"24px 'Permanent Marker','Sedgwick Ave Display', Helvetica, sans-serif, Arial\";\n    this.ctx.fillText(\"Welcome to Gem Battle!\", 150, 40, 280);\n    this.ctx.font = \"20px 'Permanent Marker','Sedgwick Ave Display', Helvetica, sans-serif\";\n    \n    this.ctx.fillText(\"Clear as many gems as you can!\", 150, 100, 280);\n    this.ctx.fillText(\"Use left arrow to move left.\", 150, 130, 280);\n    this.ctx.fillText(\"Use right arrow to move right.\", 150, 160, 280);\n    this.ctx.fillText(\"Use 'z' to rotate clockwise.\", 150, 190, 280);\n    this.ctx.fillText(\"Use 'x' to rotate counter-clockwise.\", 150, 220, 280);\n    \n    this.ctx.fillText(\"Place similar colored gems next\", 150, 280, 280);\n    this.ctx.fillText(\"to each other. Use the round gems\", 150, 310, 280);\n    this.ctx.fillText(\"to clear the same colored gems.\", 150, 340, 280);\n    this.ctx.fillText(\"The game is over when the drop\", 150, 370, 280);\n    this.ctx.fillText(\"alley is blocked.\", 150, 400, 280);\n    \n    this.ctx.font = \"30px 'Permanent Marker','Sedgwick Ave Display', Helvetica, sans-serif\";\n    this.ctx.fillText(\"Press Enter to Start\", 150, 460, 280);\n    \n    const handleEnter = (event) => {\n      if (event.defaultPrevented) {\n        return;\n      }\n      switch (event.key) {\n        case \"Enter\":\n          this.gameStart();\n          break;\n        default:\n          return;\n      }\n      event.preventDefault();\n      window.removeEventListener(\"keydown\", handleEnter, true);\n    };\n\n    window.addEventListener(\"keydown\", handleEnter , true);\n\n  }\n\n  storeCurrentGem(){\n    const gems = this.gemPrimaryLive.posRel === 2 ? [this.gemPrimaryLive, this.gemSecondaryLive] : [this.gemSecondaryLive, this.gemPrimaryLive];\n\n    gems.forEach(gem => {\n      switch(gem.posX) {\n        case 0:\n          this.gemStorage[0].push(gem);\n          break;\n        case 50:\n          this.gemStorage[1].push(gem);\n          break;\n        case 100:\n          this.gemStorage[2].push(gem);\n          break;\n        case 150:\n          this.gemStorage[3].push(gem);\n          break;\n        case 200:\n          this.gemStorage[4].push(gem);\n          break;\n        case 250:\n          this.gemStorage[5].push(gem);\n          break;\n      }\n    });\n  }\n\n  colHeight(col) {\n    if (this.gemStorage[col]) {\n      return this.gemStorage[col].slice(this.gemStorage[col].length - 1)[0].posY - 50;\n    } else {\n      return 0;\n    }\n  }\n  \n  moveHorizontal(direction) {\n    if (direction === \"left\") {\n      this.gemPrimaryLive.moveHorizontal('left', this.colHeight(this.gemPrimaryLive.col - 1));\n      this.gemSecondaryLive.moveHorizontal('left', this.colHeight(this.gemSecondaryLive.col - 1));\n    } else {\n      this.gemPrimaryLive.moveHorizontal('right', this.colHeight(this.gemPrimaryLive.col + 1));\n      this.gemSecondaryLive.moveHorizontal('right', this.colHeight(this.gemSecondaryLive.col + 1));\n    }\n  }\n\n  rotate(direction) {\n    this.gemPrimaryLive.rotate(direction);\n    this.gemSecondaryLive.rotate(direction);\n  }\n\n  rotateCW() {\n    let adjColHeight;\n    switch (this.gemSecondaryLive.posRel) {\n      case 0:\n        adjColHeight = this.colHeight(this.gemSecondaryLive.col + 1) - 50;\n        if (this.gemSecondaryLive.posY < adjColHeight) { this.rotate('cw'); }\n        break;\n      case 1:\n        adjColHeight = this.colHeight(this.gemSecondaryLive.col - 1) - 50;\n        if (this.gemSecondaryLive.posY < this.colHeight(this.gemSecondaryLive.col) && this.gemSecondaryLive.posY < adjColHeight) { this.rotate('cw'); }\n        break;\n      case 2:\n        adjColHeight = this.colHeight(this.gemSecondaryLive.col - 1);\n        if (this.gemSecondaryLive.posY < adjColHeight) { this.rotate('cw'); }\n        break;\n      case 3:\n        this.rotate('cw');\n        break;\n    }\n  }\n\n  rotateCCW() {\n    let adjColHeight;\n    switch (this.gemSecondaryLive.posRel) {\n      case 0:\n        adjColHeight = this.colHeight(this.gemSecondaryLive.col - 1) - 50;\n        if (this.gemSecondaryLive.posY < adjColHeight) { this.rotate('ccw'); }\n        break;\n      case 1:\n        this.rotate('ccw');\n        break;\n      case 2:\n        adjColHeight = this.colHeight(this.gemSecondaryLive.col + 1);\n        if (this.gemSecondaryLive.posY < adjColHeight) { this.rotate('ccw'); }\n        break;\n      case 3:\n        adjColHeight = this.colHeight(this.gemSecondaryLive.col + 1) - 50;\n        if (this.gemSecondaryLive.posY < this.colHeight(this.gemSecondaryLive.col) && this.gemSecondaryLive.posY < adjColHeight) { this.rotate('ccw'); }\n        break;\n    }\n  }\n\n  checkLeftRight(color, colNum, idx) {\n    const adjColNums = [colNum - 1, colNum + 1];\n    adjColNums.forEach(colNum => {\n      if (this.gemStorage[colNum] && this.gemStorage[colNum][idx] && this.gemStorage[colNum][idx].color === color && !this.deleteArr[colNum].includes(idx)) {\n        this.deleteArr[colNum].push(idx);\n      }\n    });\n  }\n  \n  removeBelow(arr, color, colNum) {\n    let hasAdj = false;\n    for (let i = arr.length-1; i > 0; i--) {\n      if (arr[i].color === color && !this.deleteArr[colNum].includes(i)) {\n        hasAdj = true;\n        this.deleteArr[colNum].push(i);\n        this.checkLeftRight(color, colNum, i);\n        this.score += 50;\n      } else {\n        break;\n      }\n    } \n    return hasAdj;\n  }\n\n  removeAbove(arr, color, colNum, idx) {\n    let hasAdj = false;\n    for (let i = 0; i < arr.length; i++) {\n      if (arr[i].color === color && !this.deleteArr[colNum].includes(i + idx + 1)) {\n        hasAdj = true;\n        this.deleteArr[colNum].push(i + idx + 1);\n        this.checkLeftRight(color, colNum, i + idx + 1);\n        this.score += 50;\n      } else {\n        break;\n      }\n    }\n    return hasAdj;\n  }\n\n  checkCol(colNum, idx, color) {\n    let column = this.gemStorage[colNum];\n    const below = column.slice(0, idx);\n    const above = column.slice(idx+1);\n    const belowHasAdj = this.removeBelow(below, color, colNum);\n    const aboveHasAdj =  this.removeAbove(above, color, colNum, idx);\n    return (belowHasAdj || aboveHasAdj);\n  }\n\n  checkRow(colNum, idx, color) {\n    let adjGem;\n    let hasAdj = false;\n    for (let i = colNum - 1; i >= 0; i--) {\n      adjGem = this.gemStorage[i][idx];\n      if (adjGem && adjGem.color === color) {\n        hasAdj = true;\n        if (!this.deleteArr[i].includes(idx)) {\n          this.deleteArr[i].push(idx);\n          this.checkLeftRight(color, colNum, idx);\n          this.score += 50;\n        }\n        this.checkCol(i, idx, color);\n      } else {\n        break;\n      }\n    }\n    for (let j = colNum + 1; j <= 5; j++) {\n      adjGem = this.gemStorage[j][idx];\n      if (adjGem && adjGem.color === color) {\n        hasAdj = true;\n        if (!this.deleteArr[j].includes(idx)) {\n          this.deleteArr[j].push(idx);\n          this.checkLeftRight(color, colNum, idx);\n          this.score += 50;\n        }\n        this.checkCol(j, idx, color);\n      } else {\n        break;\n      }\n    }\n    return hasAdj;\n  }\n\n  checkCrashGems() {\n    this.gemStorage.forEach((col, colNum) => {\n      col.forEach((gem,idx) => {\n        if (gem.type === \"crash\") {\n          const colHasAdj = this.checkCol(colNum, idx, gem.color);\n          const rowHasAdj = this.checkRow(colNum, idx, gem.color);\n          if (colHasAdj || rowHasAdj) {\n            if (!this.deleteArr[colNum].includes(idx)) {\n              this.deleteArr[colNum].push(idx);\n              this.score += 50;\n            }\n          }\n        }\n      });\n    });\n  }\n\n  updateGem(gem, colHeight){\n    let id = requestAnimationFrame((gem, colHeight) => this.updateGem(gem, colHeight));\n    gem.drop(colHeight, 10);\n    if (gem.vel === 0) {\n      cancelAnimationFrame(id);\n    }\n  }\n\n  handleCrashGems() {\n    this.checkCrashGems();\n    for (let colNum = 0; colNum < 6; colNum++) {\n      this.gemStorage[colNum] = this.gemStorage[colNum].filter((gem, gemIdx) => !this.deleteArr[colNum].includes(gemIdx));\n    }\n    this.deleteArr = [[], [], [], [], [], []];\n    this.gemStorage.forEach((col, colNum) => {\n      col.forEach((gem, idx) => {\n        if (idx > 0 && gem.posY < col[idx - 1].posY - 50) {\n          this.updateGem(gem, col[idx-1].posY-50);\n        }\n      });\n    });\n  }\n\n\n  handleKeyEvent() {\n    window.addEventListener(\"keydown\", (event) => {\n      if (event.defaultPrevented) {\n        return; // Do nothing if the event was already processed\n      }\n      switch (event.key) {\n        case \"Left\": // IE/Edge specific value\n        case \"ArrowLeft\":\n          if (this.gemPrimaryLive.posRel === 1 && this.gemSecondaryLive.posY < this.colHeight(this.gemSecondaryLive.col - 1)) {\n            this.gemPrimaryLive.moveHorizontal('left', this.colHeight(this.gemSecondaryLive.col));\n            this.gemSecondaryLive.moveHorizontal('left', this.colHeight(this.gemSecondaryLive.col - 1));\n          } else if (this.gemSecondaryLive.posRel === 1 && this.gemPrimaryLive.posY < this.colHeight(this.gemPrimaryLive.col - 1)) {\n            this.gemPrimaryLive.moveHorizontal('left', this.colHeight(this.gemPrimaryLive.col - 1));\n            this.gemSecondaryLive.moveHorizontal('left', this.colHeight(this.gemPrimaryLive.col));\n          } else if (this.gemPrimaryLive.posRel !== 3 && this.gemSecondaryLive.posRel !== 3) {\n            this.moveHorizontal('left');\n          } \n          break;\n        case \"Right\": // IE/Edge specific value\n        case \"ArrowRight\":\n          if (this.gemPrimaryLive.posRel === 3 && this.gemSecondaryLive.posY < this.colHeight(this.gemSecondaryLive.col + 1)) {\n            this.gemPrimaryLive.moveHorizontal('right', this.colHeight(this.gemSecondaryLive.col));\n            this.gemSecondaryLive.moveHorizontal('right', this.colHeight(this.gemSecondaryLive.col + 1));\n          } else if (this.gemSecondaryLive.posRel === 3 && this.gemPrimaryLive.posY < this.colHeight(this.gemPrimaryLive.col + 1)) {\n            this.gemPrimaryLive.moveHorizontal('right', this.colHeight(this.gemPrimaryLive.col + 1));\n            this.gemSecondaryLive.moveHorizontal('right', this.colHeight(this.gemPrimaryLive.col));\n          } else if (this.gemPrimaryLive.posRel !== 3 && this.gemSecondaryLive.posRel !== 3){\n            this.moveHorizontal('right');\n          } \n          break;\n        case \"z\": // Rotate Clockwise\n          this.rotateCW(); \n          break;\n        case \"x\": // Rotate Counter-clockwise\n          this.rotateCCW();\n          break;\n        default:\n          return; // Quit when this doesn't handle the key event.\n      }\n      event.preventDefault();\n    }, true);\n  }\n\n  moveStagingToLive() {\n    this.gemPrimaryStaging.goLive(this.ctx);\n    this.gemPrimaryLive = this.gemPrimaryStaging;\n    this.gemPrimaryStaging = new GemPrimary(this.ctxNextGem);\n    this.gemSecondaryStaging.goLive(this.ctx);\n    this.gemSecondaryLive = this.gemSecondaryStaging;\n    this.gemSecondaryStaging = new GemSecondary(this.ctxNextGem);\n  }\n\n  renderStaging() {\n    this.gemPrimaryStaging.render();\n    this.gemSecondaryStaging.render();\n  }\n\n  renderGems() {    \n    this.handleKeyEvent();\n\n    if (!this.gemPrimaryLive) {\n      this.moveStagingToLive();\n    }\n\n    this.gemSecondaryLive.drop(this.colHeight(this.gemSecondaryLive.col));\n    this.gemPrimaryLive.drop(this.colHeight(this.gemPrimaryLive.col));\n    if (this.gemPrimaryLive.vel === 0) {\n      this.gemSecondaryLive.updateOtherVel();\n    } else if (this.gemSecondaryLive.vel === 0) {\n      this.gemPrimaryLive.updateOtherVel();\n    }\n  }\n\n  renderGemStorage() {\n    this.gemStorage.forEach(col => {\n      col.forEach(gem => {\n        gem.render();\n      });\n    });\n  }\n\n  updateScore() {\n    this.ctxScoreboard.font = \"30px 'Permanent Marker','Sedgwick Ave Display', Helvetica, sans-serif\";\n    this.ctxScoreboard.strokeStyle = \"white\";\n    this.ctxScoreboard.strokeText(this.score, 10, 40);\n  }\n\n  renderCycle() {\n    let id = requestAnimationFrame(this.renderCycle);\n\n    this.ctx.clearRect(0, 0, 300, 650);\n    this.ctxNextGem.clearRect(0, 0, 300, 650);\n    this.ctxScoreboard.clearRect(0, 0, 300, 650);\n\n    this.renderGemStorage();\n    this.renderStaging();\n    this.renderGems();\n\n    this.updateScore();\n\n    if (this.gemPrimaryLive.vel === 0 && this.gemSecondaryLive.vel === 0) {\n      cancelAnimationFrame(id);\n\n      this.storeCurrentGem();\n      this.moveStagingToLive();\n      \n      this.handleCrashGems();\n\n\n      if (this.colHeight(3) >= -50) {\n        this.score += 10;\n        this.renderCycle();\n      } else {\n        this.ctx.fillStyle = \"black\";\n        this.ctx.globalAlpha = 0.5;\n        this.ctx.fillRect(0, 0, 300, 650);\n        this.ctx.globalAlpha = 1;\n        this.ctx.fillRect(0, 275, 300, 130);\n        this.ctx.fillStyle = \"red\";\n        // this.ctx.font = \"40px 'Permanent Marker','Sedgwick Ave Display', Helvetica, sans-serif\";\n        this.ctx.font = \"40px 'Permanent Marker','Sedgwick Ave Display', Helvetica, sans-serif\";\n        this.ctx.textAlign = \"center\"; \n        this.ctx.fillText(\"GAME OVER\", 150, 330);\n        this.ctx.font = \"20px 'Permanent Marker','Sedgwick Ave Display', Helvetica, sans-serif\";\n        this.ctx.textAlign = \"center\"; \n        this.ctx.fillText(`Your score: ${this.score}`, 150, 355);\n        this.ctx.fillText(`Press Enter to play again.`, 150, 385);\n\n        const handleEnter = (event) => {\n          if (event.defaultPrevented) {\n            return;\n          }\n          switch (event.key) {\n            case \"Enter\":\n              this.gameStart();\n              break;\n            default:\n              return;\n          }\n          event.preventDefault();\n          window.removeEventListener(\"keydown\", handleEnter, true);\n        };\n\n        window.addEventListener(\"keydown\", handleEnter, true);\n      }\n    }\n  }\n  \n  gameStart() {\n    if (this.gemPrimaryLive) this.reset();\n    this.renderCycle();\n  }\n\n  reset() {\n    this.gemPrimaryLive = undefined;\n    this.gemSecondaryLive = undefined;\n    this.gemPrimaryStaging = new GemPrimary(this.ctxNextGem);\n    this.gemSecondaryStaging = new GemSecondary(this.ctxNextGem);\n    this.gemStorage = [\n      [this.gemNull],\n      [this.gemNull],\n      [this.gemNull],\n      [this.gemNull],\n      [this.gemNull],\n      [this.gemNull],\n    ];\n    this.score = 0;\n    this.deleteArr = [[], [], [], [], [], []];\n  }\n \n}\n\nmodule.exports = Game;\n\n\n\n//# sourceURL=webpack:///./src/game.js?");

/***/ }),

/***/ "./src/gemNull.js":
/*!************************!*\
  !*** ./src/gemNull.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const GemPrimary = __webpack_require__(/*! ./gemPrimary */ \"./src/gemPrimary.js\");\n\nclass GemNull extends GemPrimary {\n  constructor(ctx) {\n    super(ctx);\n    this.posY = 650;\n    this.color = \"gray\";\n    this.type = \"cat\";\n    const img = new Image();\n    img.src = \"./assets/images/cat.png\";\n    this.img = img;\n  }\n}\n\nmodule.exports = GemNull;\n\n//# sourceURL=webpack:///./src/gemNull.js?");

/***/ }),

/***/ "./src/gemPrimary.js":
/*!***************************!*\
  !*** ./src/gemPrimary.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("class GemPrimary {\n  constructor(ctx) {\n    const gemImages = [\n      // { color: \"blue\", imgSrc: \"./assets/images/cat.png\" },\n      // { color: \"red\", imgSrc: \"./assets/images/cat.png\" },\n      // { color: \"green\", imgSrc: \"./assets/images/cat.png\" },\n      // { color: \"yellow\", imgSrc: \"./assets/images/cat.png\" }\n      { type: \"gem\", color: \"blue\", imgSrc: \"./assets/images/SPF2T_Gem_Blue.png\" },\n      { type: \"gem\", color: \"red\", imgSrc: \"./assets/images/SPF2T_Gem_Red.png\" },\n      { type: \"gem\", color: \"green\", imgSrc: \"./assets/images/SPF2T_Gem_Green.png\" },\n      { type: \"gem\", color: \"yellow\", imgSrc: \"./assets/images/SPF2T_Gem_Yellow.png\" },\n      { type: \"gem\", color: \"blue\", imgSrc: \"./assets/images/SPF2T_Gem_Blue.png\" },\n      { type: \"gem\", color: \"red\", imgSrc: \"./assets/images/SPF2T_Gem_Red.png\" },\n      { type: \"gem\", color: \"green\", imgSrc: \"./assets/images/SPF2T_Gem_Green.png\" },\n      { type: \"gem\", color: \"yellow\", imgSrc: \"./assets/images/SPF2T_Gem_Yellow.png\" },\n      { type: \"crash\", color: \"blue\", imgSrc: \"./assets/images/SPF2T_Crash_Blue.png\" },\n      { type: \"crash\", color: \"red\", imgSrc: \"./assets/images/SPF2T_Crash_Red.png\" },\n      { type: \"crash\", color: \"green\", imgSrc: \"./assets/images/SPF2T_Crash_Green.png\" },\n      { type: \"crash\", color: \"yellow\", imgSrc: \"./assets/images/SPF2T_Crash_Yellow.png\" }\n    ];\n    this.gem = gemImages[Math.floor(Math.random() * gemImages.length)];\n    this.ctx = ctx;\n    this.posX = 10;\n    this.posY = 60;\n    this.color = this.gem.color;\n    this.type = this.gem.type;\n    const img = new Image();\n    img.src = this.gem.imgSrc;\n    this.img = img;\n    this.widthHeight = 50;\n    this.vel = 5;\n    this.col = 3;\n    this.posRel = 2;\n    this.otherVel = 5;\n  }\n\n  handleCollision(colHeight) {\n    if ((this.posRel === 0 && this.posY >= colHeight - 50) || (this.posRel !== 0 && this.posY >= colHeight)) {\n      this.vel = 0;\n    }\n  }\n\n  updatePosY(newPosY) {\n    this.posY = newPosY;\n  }\n\n  goLive(ctx) {\n    this.ctx = ctx;\n    this.posX = 150;\n    this.posY = -5;\n  }\n\n  updateOtherVel() {\n    this.otherVel = 0;\n  }\n\n  render() {\n    this.ctx.drawImage(this.img, this.posX, this.posY, this.widthHeight, this.widthHeight);\n  }\n\n  drop(colHeight, vel = this.vel) {\n    this.vel = vel;\n    this.posY += vel;\n    this.handleCollision(colHeight);\n    this.render();\n  }\n\n  moveHorizontal(direction, adjColHeight) {\n    if (this.otherVel !== 0 && this.vel !== 0) {\n      if ((this.posRel === 0 && this.posY < adjColHeight - 50) || (this.posRel !== 0 && this.posY < adjColHeight)) {\n        if (direction === \"left\") {\n          this.posX -= 50;\n          this.col -= 1;\n        } else if (direction === \"right\") {\n          this.posX += 50;\n          this.col += 1;\n        }\n      }\n    }\n  }\n\n  rotate(direction) {\n    if (this.otherVel !== 0 && this.vel !== 0) {\n      if (direction === 'cw') {\n        this.posRel = (this.posRel + 1) % 4;\n      } else {\n        this.posRel = this.posRel - 1 < 0 ? 3 : this.posRel - 1;\n      }\n    }\n  }\n\n}\n\nmodule.exports = GemPrimary;\n\n//# sourceURL=webpack:///./src/gemPrimary.js?");

/***/ }),

/***/ "./src/gemSecondary.js":
/*!*****************************!*\
  !*** ./src/gemSecondary.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const GemPrimary = __webpack_require__(/*! ./gemPrimary */ \"./src/gemPrimary.js\");\n\nclass GemSecondary extends GemPrimary {\n  constructor(ctx) {\n    super(ctx);\n    this.posY = 10;\n    this.posRel = 0;\n  }\n\n  goLive(ctx) {\n    super.goLive(ctx);\n    this.posY = -55;\n  }\n\n  rotate(direction) {\n    if (this.otherVel !== 0 && this.vel !== 0) {\n      if (direction === 'cw') {\n        if (!(this.col === 0 && this.posRel === 2) && !(this.col === 5 && this.posRel === 0)) {\n          const rotationsCW = [{ dx: 50, dy: -50 }, { dx: 50, dy: 50 }, { dx: -50, dy: 50 }, { dx: -50, dy: -50 }];\n          this.col = (this.posRel === 1 || this.posRel === 2) ? (this.col - 1) : (this.col + 1);\n          this.posRel = (this.posRel + 1) % 4;\n          this.posX += rotationsCW[this.posRel].dx;\n          this.posY += rotationsCW[this.posRel].dy;\n        }\n      } else {\n        if (!(this.col === 0 && this.posRel === 0) && !(this.col === 5 && this.posRel === 2)) {\n          const rotationsCCW = [{ dx: 50, dy: 50 }, { dx: -50, dy: 50 }, { dx: -50, dy: -50 }, { dx: 50, dy: -50 }];\n          this.col = (this.posRel === 0 || this.posRel === 1) ? (this.col - 1) : (this.col + 1);\n          this.posRel = this.posRel - 1 < 0 ? 3 : this.posRel - 1;\n          this.posX -= rotationsCCW[this.posRel].dx;\n          this.posY -= rotationsCCW[this.posRel].dy;\n        }\n      }\n    }\n  }\n\n}\n\nmodule.exports = GemSecondary;\n\n//# sourceURL=webpack:///./src/gemSecondary.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Game = __webpack_require__(/*! ./game */ \"./src/game.js\");\n\ndocument.addEventListener('DOMContentLoaded', () => {\n  const canvasPF1 = document.getElementById(\"play-field-1\");\n  canvasPF1.width = 300;\n  canvasPF1.height = 650;\n  const ctxPF1 = canvasPF1.getContext('2d');\n\n  const scoreboard = document.getElementById(\"scoreboard\");\n  scoreboard.width = 150;\n  scoreboard.height = 60;\n  const ctxScoreboard = scoreboard.getContext('2d');\n\n  const nextGem = document.getElementById(\"next-gems\");\n  nextGem.width = 70;\n  nextGem.height = 120;\n  const ctxnextGem = nextGem.getContext('2d');\n\n  const game = new Game(ctxPF1, ctxScoreboard, ctxnextGem);\n    \n  game.startMenu();\n});\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });