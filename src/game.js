const Gems = require('./gems')

class Game {
  constructor(ctx) {
    this.ctx = ctx;
    this.renderGem = this.renderGem.bind(this);
    this.gems = [new Gems({ pos: { x: 150, y: 0 }, gemImages: this.randomGemImages(), prevHeight:600 })];
    this.gemsFalling = false;
  }

  randomGemImages() {
    const gemImages = [
      { color: "blue", imgSrc: "../assets/images/SPF2T_Gem_Blue.png" },
      { color: "red", imgSrc: "../assets/images/SPF2T_Gem_Red.png" },
      { color: "green", imgSrc: "../assets/images/SPF2T_Gem_Green.png" },
      { color: "yellow", imgSrc: "../assets/images/SPF2T_Gem_Yellow.png" },
    ];
    return [gemImages[Math.floor(Math.random() * 4)], gemImages[Math.floor(Math.random() * 4)]];
  }

  renderGem() {
    let id = requestAnimationFrame(this.renderGem);
    this.gems.slice(this.gems.length-1)[0].drop(this.ctx, id);
    this.gems.slice(0, this.gems.length-1).forEach(gem => {
      gem.render(this.ctx);
    });
    if (this.gems.slice(this.gems.length - 1)[0].vel === 0) {
      const prevHeight = (this.gems.slice(this.gems.length - 1)[0].gem1.pos.y - 50);

      this.gems.push(new Gems({ pos: { x: 150, y: 0 }, gemImages: this.randomGemImages(), prevHeight: prevHeight}));
      if (prevHeight > -50) {
        this.renderGem();
      }
    }
  }
  
  gameStart() {
    this.renderGem();
  }
 
}

module.exports = Game;