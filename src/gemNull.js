const GemPrimary = require('./gemPrimary');

class GemNull extends GemPrimary {
  constructor(ctx) {
    super(ctx);
    this.posY = 650;
    this.color = "gray";
    this.type = "cat";
    const img = new Image();
    img.src = "./assets/images/cat.png";
    this.img = img;
  }
}

module.exports = GemNull;