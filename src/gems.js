class Gems {
  constructor({ pos, gemImages, prevHeight }) {
    this.gem1 = {
      pos: pos,
      color: gemImages[0].color,
      img: gemImages[0].imgSrc
    };
    this.gem2 = {
      pos: {x: pos.x, y: pos.y +50},
      color: gemImages[1].color,
      img: gemImages[1].imgSrc
    };
    this.width = 50;
    this.height = 50;
    this.vel = 5;
    this.prevHeight = prevHeight;
  }

  handleCollision(id) {
    if (this.gem1.pos.y >= this.prevHeight || this.gem2.pos.y >= this.prevHeight) {
      this.vel = 0;
      cancelAnimationFrame(id);
    }
  }

  render(ctx) {
    const img1 = new Image();
    img1.src = this.gem1.img;
    const img2 = new Image();
    img2.src = this.gem2.img;
    ctx.drawImage(img1, this.gem1.pos.x, this.gem1.pos.y, this.width, this.height);
    ctx.drawImage(img2, this.gem2.pos.x, this.gem2.pos.y, this.width, this.height);
  }

  drop(ctx, id) {
    this.handleCollision(id);
    ctx.clearRect(0,0, 300, 650);
    this.gem1.pos.y += this.vel;
    this.gem2.pos.y += this.vel;
    this.render(ctx);
  }

}

module.exports = Gems;