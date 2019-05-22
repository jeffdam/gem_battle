const GemPrimary = require('./gemPrimary');
const GemSecondary = require('./gemSecondary');
const GemNull = require('./gemNull');

class Game {
  constructor(ctx, ctxScoreboard, ctxNextGem) {
    this.ctx = ctx;
    this.ctxScoreboard = ctxScoreboard;
    this.ctxNextGem = ctxNextGem;
    this.gemPrimaryLive = undefined;
    this.gemSecondaryLive = undefined;
    this.gemPrimaryStaging = new GemPrimary(this.ctxNextGem);
    this.gemSecondaryStaging = new GemSecondary(this.ctxNextGem);
    this.gemNull = new GemNull(this.ctx);
    this.gemsFalling = false;
    this.gemStorage = [
      [this.gemNull],
      [this.gemNull],
      [this.gemNull],
      [this.gemNull],
      [this.gemNull],
      [this.gemNull],
    ];
    this.score = 0;
    this.renderCycle = this.renderCycle.bind(this);
    this.gameinProgress = false;
    this.deleteArr = [[],[],[],[],[],[]];
  }

  startMenu() {
    this.ctxNextGem.fillRect(0,0,300, 650);
    this.ctxNextGem.fillStyle = "black";
    this.ctxScoreboard.fillRect(0,0,300, 650);
    this.ctxScoreboard.fillStyle = "black";

    this.ctx.fillRect(0,0,300, 650);
    this.ctx.fillStyle = "black";
    this.ctx.textAlign = "center";
    this.ctx.fillStyle = "white";
    this.ctx.font = "24px Permanent Marker";
    this.ctx.fillText("Welcome to Gem Battle!", 150, 40, 280);
    this.ctx.font = "20px Permanent Marker";
    
    this.ctx.fillText("Clear as many gems as you can!", 150, 100, 280);
    this.ctx.fillText("Use left arrow to move left.", 150, 130, 280);
    this.ctx.fillText("Use right arrow to move right.", 150, 160, 280);
    this.ctx.fillText("Use 'z' to rotate clockwise.", 150, 190, 280);
    this.ctx.fillText("Use 'x' to rotate counter-clockwise.", 150, 220, 280);
    
    this.ctx.fillText("Place similar colored gems next", 150, 280, 280);
    this.ctx.fillText("to each other. Use the round gems", 150, 310, 280);
    this.ctx.fillText("to clear the same colored gems.", 150, 340, 280);
    this.ctx.fillText("The game is over when the drop", 150, 370, 280);
    this.ctx.fillText("alley is blocked.", 150, 400, 280);
    
    this.ctx.font = "30px Permanent Marker";
    this.ctx.fillText("Press Enter to Start", 150, 460, 280);
    
    if (this.gameinProgress === false) {
      window.addEventListener("keydown", (event) => {
        if (event.defaultPrevented) {
          return;
        }
        switch (event.key) {
          case "Enter": 
            this.gameinProgress = true;
            this.gameStart();
            break;
          default:
            return; 
        }
        event.preventDefault();
      }, true);
    }
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
      if (this.gemStorage[col].slice(this.gemStorage[col].length - 1)[0]) {
        return this.gemStorage[col].slice(this.gemStorage[col].length - 1)[0].posY - 50;
      } else {
        return 600;
      }
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
        if (this.gemSecondaryLive.posY < adjColHeight) { this.rotate('cw'); }
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


  // removeBelow(arr, color) {
  //   if (arr.length === 0) return arr;
  //   if (arr.slice(arr.length-1)[0].color !== color) return arr;
  //   arr.pop();
  //   this.score += 50;
  //   return this.removeBelow(arr, color);
  // }

  // removeAbove(arr, color) {
  //   if (arr.length === 0) return arr;
  //   if (arr[0].color !== color) return arr;
  //   arr.shift();
  //   this.score += 50;
  //   return this.removeAbove(arr, color);
  // }

  checkCol(col, idx, color) {
    let column = this.gemStorage[col];
    const below = column.slice(0, idx);
    const above = column.slice(idx+1);
    const belowLength = below.length; 
    const aboveLength = above.length; 
    const belowRemoved = this.removeBelow(below, color);
    const aboveRemoved = this.removeAbove(above, color);
    if (!(belowLength === belowRemoved.length && aboveLength === aboveRemoved.length)) {
      this.gemStorage[col] = belowRemoved.concat(aboveRemoved);
      this.gemStorage[col].forEach((gem,idx) => {
        if (idx > 0) {
          gem.updatePosY(this.gemStorage[col][idx-1].posY - 50);
        }
      });
    }
  }

  // checkRow(col, idx, color) {
  //   let adjGem;
  //   for (let i = col - 1; i > 0; i--) {
  //     adjGem = this.gemStorage[col][idx];
  //     if (adjGem && adjGem.color === color) {
  //       this.checkCol(i, idx, color);
  //     } else {
  //       break;
  //     }
  //   }
  //   for (let j = col + 1; j < 7; j++) {
  //     adjGem = this.gemStorage[col][idx];
  //     if (adjGem && adjGem.color === color) {
  //       this.checkCol(j, idx, color);
  //     } else {
  //       break;
  //     }
  //   }
  // }

  checkCrash() {
    this.gemStorage.forEach(col => {
      col.forEach((gem,idx) => {
        if (gem.type === "crash") {
          this.checkCol(col, idx, gem.color);
          this.checkRow(col, idx, gem.color);
        }
      });
    });
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

  moveStagingToLive() {
    this.gemPrimaryStaging.goLive(this.ctx);
    this.gemPrimaryLive = this.gemPrimaryStaging;
    this.gemPrimaryStaging = new GemPrimary(this.ctxNextGem);
    this.gemSecondaryStaging.goLive(this.ctx);
    this.gemSecondaryLive = this.gemSecondaryStaging;
    this.gemSecondaryStaging = new GemSecondary(this.ctxNextGem);
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
    this.ctxScoreboard.font = "30px Permanent Marker";
    this.ctxScoreboard.strokeStyle = "white";
    this.ctxScoreboard.strokeText(this.score, 10, 40);
  }

  renderCycle() {
    let id = requestAnimationFrame(this.renderCycle);

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
      // this.checkCrash();

      if (this.colHeight(3) >= -50) {
        this.score += 10;
        this.renderCycle();
      } else {
        this.gameinProgress = false;

        this.ctx.fillStyle = "black";
        this.ctx.globalAlpha = 0.5;
        this.ctx.fillRect(0, 0, 300, 650);
        this.ctx.globalAlpha = 1;
        this.ctx.fillRect(0, 275, 300, 100);
        this.ctx.fillStyle = "red";
        this.ctx.font = "40px Permanent Marker";
        this.ctx.textAlign = "center"; 
        this.ctx.fillText("GAME OVER", 150, 330);
        this.ctx.font = "20px Permanent Marker";
        this.ctx.textAlign = "center"; 
        this.ctx.fillText(`Your score: ${this.score}`, 150, 355);
      }
    }
  }
  
  gameStart() {
    this.renderCycle();
  }
 
}

module.exports = Game;

