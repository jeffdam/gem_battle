class Gems {
  constructor({ pos, colors, prevHeight }) {
    this.gem1 = {
      pos: pos,
      color: colors[0]
    };
    this.gem2 = {
      pos: {x: pos.x, y: pos.y +50},
      color: colors[1]
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
    ctx.fillStyle = this.gem1.color;
    ctx.fillRect(
      this.gem1.pos.x,
      this.gem1.pos.y,
      this.width,
      this.height
      );
    ctx.fillStyle = this.gem2.color;
    ctx.fillRect(
      this.gem2.pos.x,
      this.gem2.pos.y,
      this.width,
      this.height
      );
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