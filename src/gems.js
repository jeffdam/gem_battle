class Gems {
  constructor({ pos, gemImages, col }) {
    this.posX = pos.x;
    this.posY = pos.y;
    this.color = gemImages.color;
    this.img = gemImages.imgSrc;
    this.width = 50;
    this.height = 50;
    this.vel = 5;
    this.col = col;
  }

  handleCollision(id,colHeight) {
    if (this.posY >= colHeight) {
      this.vel = 0;
      cancelAnimationFrame(id);
    }
  }

  render(ctx) {
    const img = new Image();
    img.src = this.img;
    ctx.drawImage(img, this.posX, this.posY, this.width, this.height);
  }

  drop(ctx, id, colHeight) {
    this.handleCollision(id, colHeight);
    this.posY += this.vel;
    this.render(ctx);
  }

  moveHorizontal(direction) {
    if (direction === "left" && this.posX > 0) {
      this.posX -= 50;
      this.col -= 1;
    } else if (direction === "right" && this.posX < 250) {
      this.posX += 50;
      this.col += 1;
    }
  }

}

module.exports = Gems;