const GemPrimary = require('./gemPrimary');
const GemSecondary = require('./gemSecondary');

class Game {
  constructor(ctx) {
    this.ctx = ctx;
    this.renderGem = this.renderGem.bind(this);
    this.gemPrimary = new GemPrimary({ gemImages: this.randomGemImages() });
    this.gemSecondary = new GemSecondary({ gemImages: this.randomGemImages() });
    this.gemsFalling = false;
    this.gemStorage = {
      col1: [],
      col2: [],
      col3: [],
      col4: [],
      col5: [],
      col6: [],
    };
  }

  randomGemImages() {
    const gemImages = [
      // { color: "blue", imgSrc: "../assets/images/cat.png" },
      // { color: "red", imgSrc: "../assets/images/cat.png" },
      // { color: "green", imgSrc: "../assets/images/cat.png" },
      // { color: "yellow", imgSrc: "../assets/images/cat.png" }
      { color: "blue", imgSrc: "../assets/images/SPF2T_Gem_Blue.png" },
      { color: "red", imgSrc: "../assets/images/SPF2T_Gem_Red.png" },
      { color: "green", imgSrc: "../assets/images/SPF2T_Gem_Green.png" },
      { color: "yellow", imgSrc: "../assets/images/SPF2T_Gem_Yellow.png" }
    ];
    return gemImages[Math.floor(Math.random() * 4)];
  }

  storeCurrentGem(){
    const gems = this.gemPrimary.posRel === 2 ? [this.gemPrimary, this.gemSecondary] : [this.gemSecondary, this.gemPrimary];

    gems.forEach(gem => {
      switch(gem.posX) {
        case 0:
          this.gemStorage.col1.push(gem);
          break;
        case 50:
          this.gemStorage.col2.push(gem);
          break;
        case 100:
          this.gemStorage.col3.push(gem);
          break;
        case 150:
          this.gemStorage.col4.push(gem);
          break;
        case 200:
          this.gemStorage.col5.push(gem);
          break;
        case 250:
          this.gemStorage.col6.push(gem);
          break;
      }
    });
  }

  colHeight(colNum) {
    const col = `col${colNum}`;
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
      this.gemPrimary.moveHorizontal('left', this.colHeight(this.gemPrimary.col - 1));
      this.gemSecondary.moveHorizontal('left', this.colHeight(this.gemSecondary.col - 1));
    } else {
      this.gemPrimary.moveHorizontal('right', this.colHeight(this.gemPrimary.col + 1));
      this.gemSecondary.moveHorizontal('right', this.colHeight(this.gemSecondary.col + 1));
    }
  }

  rotate(direction) {
    this.gemPrimary.rotate(direction);
    this.gemSecondary.rotate(direction);
  }

  rotateCW() {
    let adjColHeight;
    switch (this.gemSecondary.posRel) {
      case 0:
        adjColHeight = this.colHeight(this.gemSecondary.col + 1) - 50;
        if (this.gemSecondary.posY < adjColHeight) { this.rotate('cw'); }
        break;
      case 1:
        adjColHeight = this.colHeight(this.gemSecondary.col - 1) - 50;
        if (this.gemSecondary.posY < this.colHeight(this.gemSecondary.col) && this.gemSecondary.posY < adjColHeight) { this.rotate('cw'); }
        break;
      case 2:
        adjColHeight = this.colHeight(this.gemSecondary.col - 1);
        if (this.gemSecondary.posY < adjColHeight) { this.rotate('cw'); }
        break;
      case 3:
        this.rotate('cw');
        break;
    }
  }

  rotateCCW() {
    let adjColHeight;
    switch (this.gemSecondary.posRel) {
      case 0:
        adjColHeight = this.colHeight(this.gemSecondary.col - 1) - 50;
        if (this.gemSecondary.posY < adjColHeight) { this.rotate('ccw'); }
        break;
      case 1:
        this.rotate('ccw');
        break;
      case 2:
        adjColHeight = this.colHeight(this.gemSecondary.col + 1);
        if (this.gemSecondary.posY < adjColHeight) { this.rotate('ccw'); }
        break;
      case 3:
        adjColHeight = this.colHeight(this.gemSecondary.col + 1) - 50;
        if (this.gemSecondary.posY < this.colHeight(this.gemSecondary.col) && this.gemSecondary.posY < adjColHeight) { this.rotate('ccw'); }
        break;
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
          this.moveHorizontal('left');
          break;
          case "Right": // IE/Edge specific value
          case "ArrowRight":
          this.moveHorizontal('right');
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

  renderGem() {
    let id = requestAnimationFrame(this.renderGem);
    
    this.handleKeyEvent();
    this.ctx.clearRect(0, 0, 300, 650);

    this.gemSecondary.drop(this.ctx, this.colHeight(this.gemSecondary.col));
    this.gemPrimary.drop(this.ctx, this.colHeight(this.gemPrimary.col));
    
    if (this.gemPrimary.vel === 0) {
      this.gemSecondary.updateOtherVel(this.colHeight(this.gemSecondary.col));
    } else if (this.gemSecondary.vel === 0) {
      this.gemPrimary.updateOtherVel(this.colHeight(this.gemPrimary.col));
    }
    
    for (let i = 1; i <= 6; i++) {
      this.gemStorage[`col${i}`].forEach(gem => {
        gem.render(this.ctx);
      });
    }

    if (this.gemPrimary.vel === 0 && this.gemSecondary.vel === 0 ) {
      cancelAnimationFrame(id);

      this.storeCurrentGem();

      this.gemPrimary = new GemPrimary({ 
        gemImages: this.randomGemImages(), 
      });
      this.gemSecondary = new GemSecondary({ 
        gemImages: this.randomGemImages(), 
      });

      if (this.colHeight(4) >= -50) {
        this.renderGem();
      } else {
        console.log(this.gemStorage);
        console.log("YOU LOSE!");
      }
    }
    
  }
  
  gameStart() {
    this.renderGem();
  }
 
}

module.exports = Game;

