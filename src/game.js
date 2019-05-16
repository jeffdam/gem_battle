const Gems = require('./gems')

class Game {
  constructor(ctx) {
    this.ctx = ctx;
  }

  randomGemColors() {
    const colors = ["#ff0000", "#0000ff", "#08d123", "#fce305"];
    return [colors[Math.floor(Math.random() * 4)], colors[Math.floor(Math.random() * 4)]];
  }

  gameStart() {
    const gem = new Gems({ pos: { x: 150, y: 0 }, colors: this.randomGemColors() });
    gem.render(this.ctx);
  }



 
}

module.exports = Game;