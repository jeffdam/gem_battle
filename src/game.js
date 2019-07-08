import GemPrimary from './gemPrimary';
import GemSecondary from './gemSecondary';
import GemNull from './gemNull';
import { startGameMenu, endGameMenu } from "./menus";

class Game {
  constructor(ctx, ctxScoreboard, ctxNextGem, ctxMenu) {
    this.ctx = ctx;
    this.ctxMenu = ctxMenu;
    this.ctxScoreboard = ctxScoreboard;
    this.ctxNextGem = ctxNextGem;

    this.gemCount = 0;
    this.gemLevel = 15;
    this.gemVel = 1;
    this.gemPrimaryLive = undefined;
    this.gemSecondaryLive = undefined;
    this.gemPrimaryStaging = new GemPrimary(this.ctxNextGem, this.gemVel);
    this.gemSecondaryStaging = new GemSecondary(this.ctxNextGem, this.gemVel);
    this.gemNull = new GemNull(this.ctx);
    this.gemStorage = [
      [this.gemNull],
      [this.gemNull],
      [this.gemNull],
      [this.gemNull],
      [this.gemNull],
      [this.gemNull],
    ];
    this.deleteArr = [[],[],[],[],[],[]];
    this.score = 0;
    this.renderCycle = this.renderCycle.bind(this);
    this.gameStart = this.gameStart.bind(this);
  }

  storeCurrentGem(){
    const gems = this.gemPrimaryLive.posRel === 2 ? [this.gemPrimaryLive, this.gemSecondaryLive] : [this.gemSecondaryLive, this.gemPrimaryLive];

    gems.forEach(gem => {
      switch(gem.posX) {
        case 0:
          this.gemStorage[0].push(gem);
          break;
        case 50:
          this.gemStorage[1].push(gem);
          break;
        case 100:
          this.gemStorage[2].push(gem);
          break;
        case 150:
          this.gemStorage[3].push(gem);
          break;
        case 200:
          this.gemStorage[4].push(gem);
          break;
        case 250:
          this.gemStorage[5].push(gem);
          break;
      }
    });
  }

  colHeight(col) {
    if (this.gemStorage[col]) {
      return this.gemStorage[col].slice(this.gemStorage[col].length - 1)[0].posY - 50;
    } else {
      return 0;
    }
  }
  
  moveHorizontal(direction) {
    if (direction === "left") {
      this.gemPrimaryLive.moveHorizontal('left', this.colHeight(this.gemPrimaryLive.col - 1));
      this.gemSecondaryLive.moveHorizontal('left', this.colHeight(this.gemSecondaryLive.col - 1));
    } else {
      this.gemPrimaryLive.moveHorizontal('right', this.colHeight(this.gemPrimaryLive.col + 1));
      this.gemSecondaryLive.moveHorizontal('right', this.colHeight(this.gemSecondaryLive.col + 1));
    }
  }

  rotate(direction) {
    this.gemPrimaryLive.rotate(direction);
    this.gemSecondaryLive.rotate(direction);
  }

  rotateCW() {
    let adjColHeight;
    switch (this.gemSecondaryLive.posRel) {
      case 0:
        adjColHeight = this.colHeight(this.gemSecondaryLive.col + 1) - 50;
        if (this.gemSecondaryLive.posY < adjColHeight) { 
          this.rotate('cw'); 
        }
        break;
      case 1:
        adjColHeight = this.colHeight(this.gemSecondaryLive.col - 1) - 50;
        if (this.gemSecondaryLive.posY < this.colHeight(this.gemSecondaryLive.col) && this.gemSecondaryLive.posY < adjColHeight) { this.rotate('cw'); }
        break;
      case 2:
        adjColHeight = this.colHeight(this.gemSecondaryLive.col - 1);
        if (this.gemSecondaryLive.posY < adjColHeight) { this.rotate('cw'); }
        break;
      case 3:
        this.rotate('cw');
        break;
    }
  }

  rotateCCW() {
    let adjColHeight;
    switch (this.gemSecondaryLive.posRel) {
      case 0:
        adjColHeight = this.colHeight(this.gemSecondaryLive.col - 1) - 50;
        if (this.gemSecondaryLive.posY < adjColHeight) { this.rotate('ccw'); }
        break;
      case 1:
        this.rotate('ccw');
        break;
      case 2:
        adjColHeight = this.colHeight(this.gemSecondaryLive.col + 1);
        if (this.gemSecondaryLive.posY < adjColHeight) { this.rotate('ccw'); }
        break;
      case 3:
        adjColHeight = this.colHeight(this.gemSecondaryLive.col + 1) - 50;
        if (this.gemSecondaryLive.posY < this.colHeight(this.gemSecondaryLive.col) && this.gemSecondaryLive.posY < adjColHeight) { this.rotate('ccw'); }
        break;
    }
  }
  
  removeBelow(arr, color, colNum) {
    let hasAdj = false;
    for (let i = arr.length-1; i > 0; i--) {
      if (arr[i].color === color && !this.deleteArr[colNum].includes(i)) {
        hasAdj = true;
        this.deleteArr[colNum].push(i);
        this.checkRow(colNum, i, color);
        this.score += 50;
      } else {
        break;
      }
    } 
    return hasAdj;
  }

  removeAbove(arr, color, colNum, idx) {
    let hasAdj = false;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].color === color && !this.deleteArr[colNum].includes(i + idx + 1)) {
        hasAdj = true;
        this.deleteArr[colNum].push(i + idx + 1);
        this.checkRow(colNum, i + idx + 1, color);

        this.score += 50;
      } else {
        break;
      }
    }
    return hasAdj;
  }

  checkCol(colNum, idx, color) {
    let column = this.gemStorage[colNum];
    const below = column.slice(0, idx);
    const above = column.slice(idx+1);
    const belowHasAdj = this.removeBelow(below, color, colNum);
    const aboveHasAdj =  this.removeAbove(above, color, colNum, idx);
    return (belowHasAdj || aboveHasAdj);
  }

  checkRow(colNum, idx, color) {
    let adjGem;
    let hasAdj = false;
    for (let i = colNum - 1; i >= 0; i--) {
      adjGem = this.gemStorage[i][idx];
      if (adjGem && adjGem.color === color) {
        hasAdj = true;
        if (!this.deleteArr[i].includes(idx)) {
          this.deleteArr[i].push(idx);
          this.score += 50;
        }
        this.checkCol(i, idx, color);
      } else {
        break;
      }
    }
    for (let j = colNum + 1; j <= 5; j++) {
      adjGem = this.gemStorage[j][idx];
      if (adjGem && adjGem.color === color) {
        hasAdj = true;
        if (!this.deleteArr[j].includes(idx)) {
          this.deleteArr[j].push(idx);
          this.score += 50;
        }
        this.checkCol(j, idx, color);
      } else {
        break;
      }
    }
    return hasAdj;
  }

  checkCrashGems() {
    this.gemStorage.forEach((col, colNum) => {
      col.forEach((gem,idx) => {
        if (gem.type === "crash") {
          const colHasAdj = this.checkCol(colNum, idx, gem.color);
          const rowHasAdj = this.checkRow(colNum, idx, gem.color);
          if (colHasAdj || rowHasAdj) {
            if (!this.deleteArr[colNum].includes(idx)) {
              this.deleteArr[colNum].push(idx);
              this.score += 50;
            }
          }
        }
      });
    });
  }

  // updateGem(gem, colHeight){
  //   let id = requestAnimationFrame(() => {
  //     const gemSave = gem;
  //     const colHeightSave = colHeight;
  //     this.updateGem(gemSave, colHeightSave);
  //   });
  //   gem.drop(colHeight, 10);
  //   if (gem.vel === 0) {
  //     cancelAnimationFrame(id);
  //   }
  // }

  handleCrashGems() {
    let clearedAllValidCrashGems = true;
    this.checkCrashGems();
    for (let colNum = 0; colNum < 6; colNum++) {
      if (this.deleteArr[colNum].length > 0) { clearedAllValidCrashGems = false;}
      this.gemStorage[colNum] = this.gemStorage[colNum].filter((gem, gemIdx) => !this.deleteArr[colNum].includes(gemIdx));
    }
    this.deleteArr = [[], [], [], [], [], []];
    this.gemStorage.forEach((col) => {
      col.forEach((gem, idx) => {
        if (idx > 0 && gem.posY < col[idx - 1].posY - 50) {
          gem.updatePosY(col[idx - 1].posY - 50);
          // this.updateGem(gem, col[idx-1].posY-50);
        }
      });
    });
    if (!clearedAllValidCrashGems) {
      this.handleCrashGems();
    } 
  }

  handleKeyEvent() {
    window.addEventListener("keydown", (event) => {
      if (event.defaultPrevented) {
        return; // Do nothing if the event was already processed
      }
      switch (event.key) {
        case "Left": // IE/Edge specific value
        case "ArrowLeft":
          if (this.gemPrimaryLive.posRel === 1 && this.gemSecondaryLive.posY < this.colHeight(this.gemSecondaryLive.col - 1)) {
            this.gemPrimaryLive.moveHorizontal('left', this.colHeight(this.gemSecondaryLive.col));
            this.gemSecondaryLive.moveHorizontal('left', this.colHeight(this.gemSecondaryLive.col - 1));
          } else if (this.gemSecondaryLive.posRel === 1 && this.gemPrimaryLive.posY < this.colHeight(this.gemPrimaryLive.col - 1)) {
            this.gemPrimaryLive.moveHorizontal('left', this.colHeight(this.gemPrimaryLive.col - 1));
            this.gemSecondaryLive.moveHorizontal('left', this.colHeight(this.gemPrimaryLive.col));
          } else if (this.gemPrimaryLive.posRel !== 3 && this.gemSecondaryLive.posRel !== 3) {
            this.moveHorizontal('left');
          } 
          break;
        case "Right": // IE/Edge specific value
        case "ArrowRight":
          if (this.gemPrimaryLive.posRel === 3 && this.gemSecondaryLive.posY < this.colHeight(this.gemSecondaryLive.col + 1)) {
            this.gemPrimaryLive.moveHorizontal('right', this.colHeight(this.gemSecondaryLive.col));
            this.gemSecondaryLive.moveHorizontal('right', this.colHeight(this.gemSecondaryLive.col + 1));
          } else if (this.gemSecondaryLive.posRel === 3 && this.gemPrimaryLive.posY < this.colHeight(this.gemPrimaryLive.col + 1)) {
            this.gemPrimaryLive.moveHorizontal('right', this.colHeight(this.gemPrimaryLive.col + 1));
            this.gemSecondaryLive.moveHorizontal('right', this.colHeight(this.gemPrimaryLive.col));
          } else if (this.gemPrimaryLive.posRel !== 3 && this.gemSecondaryLive.posRel !== 3){
            this.moveHorizontal('right');
          } 
          break;
        case "z": // Rotate Clockwise
          this.rotateCW(); 
          break;
        case "x": // Rotate Counter-clockwise
          this.rotateCCW();
          break;
        default:
          return; // Quit when this doesn't handle the key event.
      }
      event.preventDefault();
    }, true);
  }

  handleDownArrowKeyEvent() {
    const handleDownArrow = (event) => {
      if (event.defaultPrevented) {
        return;
      }
      switch (event.key) {
        case "Down": // IE/Edge specific value
        case "ArrowDown":
          this.gemPrimaryLive.hardDrop(this.colHeight(this.gemPrimaryLive.col));
          this.gemSecondaryLive.hardDrop(this.colHeight(this.gemSecondaryLive.col));
          break;
        default:
          return;
      }
      event.preventDefault();
      window.removeEventListener("keydown", handleDownArrow, true);
    };

    window.addEventListener("keydown", handleDownArrow, true);

  }

  moveStagingToLive() {
    this.gemPrimaryStaging.goLive(this.ctx);
    this.gemPrimaryLive = this.gemPrimaryStaging;
    this.gemPrimaryStaging = new GemPrimary(this.ctxNextGem, this.gemVel);
    this.gemSecondaryStaging.goLive(this.ctx);
    this.gemSecondaryLive = this.gemSecondaryStaging;
    this.gemSecondaryStaging = new GemSecondary(this.ctxNextGem, this.gemVel);
  }

  renderStaging() {
    this.gemPrimaryStaging.render();
    this.gemSecondaryStaging.render();
  }

  renderGems() {    
    this.handleKeyEvent();

    if (!this.gemPrimaryLive) {
      this.moveStagingToLive();
    }

    this.gemSecondaryLive.drop(this.colHeight(this.gemSecondaryLive.col));
    this.gemPrimaryLive.drop(this.colHeight(this.gemPrimaryLive.col));
    if (this.gemPrimaryLive.vel === 0) {
      this.gemSecondaryLive.updateOtherVel();
    } else if (this.gemSecondaryLive.vel === 0) {
      this.gemPrimaryLive.updateOtherVel();
    }
  }

  renderGemStorage() {
    this.gemStorage.forEach(col => {
      col.forEach(gem => {
        gem.render();
      });
    });
  }

  updateScore() {
    this.ctxScoreboard.font = "30px 'Permanent Marker','Sedgwick Ave Display', Helvetica, sans-serif";
    this.ctxScoreboard.strokeStyle = "white";
    this.ctxScoreboard.strokeText(this.score, 10, 40);
  }

  renderCycle() {
    let id = requestAnimationFrame(this.renderCycle);

    this.ctxMenu.clearRect(5,5,window.innerWidth-10,window.innerHeight-10);
    this.ctx.clearRect(0, 0, 300, 650);
    this.ctxNextGem.clearRect(0, 0, 300, 650);
    this.ctxScoreboard.clearRect(0, 0, 300, 650);

    this.renderGemStorage();
    this.renderStaging();
    this.renderGems();

    this.updateScore();

    if (this.gemPrimaryLive.vel === 0 && this.gemSecondaryLive.vel === 0) {
      cancelAnimationFrame(id);

      this.storeCurrentGem();
      this.moveStagingToLive();
      
      this.handleCrashGems();

      if (this.gemCount % this.gemLevel === 0) {
        this.gemVel++;
        this.gemLevel += 25;
      }

      if (this.colHeight(3) >= -50) {
        this.score += 10;
        this.gemCount++;
        this.handleDownArrowKeyEvent();
        this.renderCycle();
      } else {
        endGameMenu(this.ctx, this.score, this.gameStart);
      }
    }
  }
  
  gameRender() {
    startGameMenu(
      this.ctx,
      this.ctxNextGem,
      this.ctxScoreboard,
      this.gameStart,
      this.ctxMenu
    );
  }

  gameStart() {
    if (this.gemPrimaryLive) this.reset();
    this.handleDownArrowKeyEvent();
    this.renderCycle();
  }

  reset() {
    this.gemCount = 0;
    this.gemVel = 1;
    this.gemPrimaryLive = undefined;
    this.gemSecondaryLive = undefined;
    this.gemPrimaryStaging = new GemPrimary(this.ctxNextGem, this.gemVel);
    this.gemSecondaryStaging = new GemSecondary(this.ctxNextGem, this.gemVel);
    this.gemStorage = [
      [this.gemNull],
      [this.gemNull],
      [this.gemNull],
      [this.gemNull],
      [this.gemNull],
      [this.gemNull],
    ];
    this.score = 0;
    this.deleteArr = [[], [], [], [], [], []];
  }
 
}

export default Game;
