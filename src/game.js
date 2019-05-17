const Gems = require('./gems')

class Game {
  constructor(ctx) {
    this.ctx = ctx;
    this.renderGem = this.renderGem.bind(this);
    this.gems = [new Gems({ pos: { x: 150, y: 0 }, colors: this.randomGemColors(), prevHeight:600 })];
    this.gemsFalling = false;
  }

  randomGemColors() {
    const colors = ["#ff0000", "#0000ff", "#3c9600", "#f4d041"];
    return [colors[Math.floor(Math.random() * 4)], colors[Math.floor(Math.random() * 4)]];
  }

  renderGem() {
    let id = requestAnimationFrame(this.renderGem);
    this.gems.slice(this.gems.length-1)[0].drop(this.ctx, id);
    this.gems.slice(0, this.gems.length-1).forEach(gem => {
      gem.render(this.ctx);
    });
    if (this.gems.slice(this.gems.length - 1)[0].vel === 0) {
      const prevHeight = (this.gems.slice(this.gems.length - 1)[0].gem1.pos.y - 50);
      console.log(prevHeight);

      this.gems.push(new Gems({ pos: { x: 150, y: 0 }, colors: this.randomGemColors(), prevHeight: prevHeight}));
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