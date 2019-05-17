const Gems = require('./gems')

class Game {
  constructor(ctx) {
    this.ctx = ctx;
    this.renderGem = this.renderGem.bind(this);
    this.gemPrimary = new Gems({ pos: { x: 150, y: 0 }, gemImages: this.randomGemImages(), col:"col4" });
    this.gemSecondary = new Gems({ pos: { x: 150, y: -50 }, gemImages: this.randomGemImages(), col: "col4" });
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

  storeCurrentGem(gem){
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
  }

  colHeight(gem, gemCol) {
    if (this.gemStorage[gemCol].slice(this.gemStorage[gemCol].length - 1)[0]) {
      if (gem === "sec" && this.gemPrimary.col === this.gemSecondary.col) {
        return this.gemStorage[gemCol].slice(this.gemStorage[gemCol].length - 1)[0].posY;
      } else {
        return this.gemStorage[gemCol].slice(this.gemStorage[gemCol].length - 1)[0].posY - 50;
      }
    } else {
      if (gem === "sec" && this.gemPrimary.col === this.gemSecondary.col) {
        return 550;
      } else {
        return 600;
      }
    }
  }

  renderGem() {
 
    let id = requestAnimationFrame(this.renderGem);
    console.log("Prim",this.gemPrimary.color);
    console.log("Sec",this.gemSecondary.color);

    this.gemSecondary.drop(this.ctx, id, this.colHeight("sec", this.gemSecondary.col));
    this.gemPrimary.drop(this.ctx, id, this.colHeight("prim", this.gemPrimary.col));
    
    window.addEventListener("keydown", (event) => {
      if (event.defaultPrevented) {
        return; // Do nothing if the event was already processed
      }
      
      switch (event.key) {
        case "Left": // IE/Edge specific value
        case "ArrowLeft":
          this.gemPrimary.moveHorizontal('left');
          this.gemSecondary.moveHorizontal('left');
          break;
        case "Right": // IE/Edge specific value
        case "ArrowRight":
          this.gemPrimary.moveHorizontal('right');
          this.gemSecondary.moveHorizontal('right');
          break;
        default:
          return; // Quit when this doesn't handle the key event.
      }
      event.preventDefault();
    }, true);

    for (let i = 1; i < 6; i++) {
      this.gemStorage[`col${i}`].forEach(gem => {
        gem.render(this.ctx);
      });
    }

    if (this.gemPrimary.vel === 0 || this.gemSecondary.vel === 0 ) {
      const prevHeightPrim = (this.gemPrimary.posY - 50);
      const prevHeightSec = (this.gemSecondary.posY - 50);

      this.storeCurrentGem(this.gemPrimary);
      this.storeCurrentGem(this.gemSecondary);
      console.log(this.gemStorage);
      

      this.gemPrimary = new Gems({ 
        pos: { x: 150, y: 0 }, 
        gemImages: this.randomGemImages(), 
        col: "col4" 
      });
      this.gemSecondary = new Gems({ 
        pos: { x: 150, y: -50 }, 
        gemImages: this.randomGemImages(), 
        col: "col4" 
      });

      if (prevHeightPrim > -50 && prevHeightSec > -50) {
        this.renderGem();
      }
    }
  }
  
  gameStart() {
    this.renderGem();
  }
 
}

module.exports = Game;

