class Gems {
  constructor({ pos, colors }) {
    this.pos = pos,
    this.size = { width: 50, height: 50 }
    this.colors = colors;
    // this.drop = this.drop.bind(this);
    // this.render = this.render.bind(this);
  }

  render(ctx) {
    ctx.fillStyle = this.colors[0];
    ctx.fillRect(
      this.pos.x,
      this.pos.y,
      this.size.width,
      this.size.height
      );
    ctx.fillStyle = this.colors[1];
    ctx.fillRect(
      this.pos.x,
      this.pos.y + 50,
      this.size.width,
      this.size.height
      );
  }

  // drop(ctx) {
  //   requestAnimationFrame(this.drop(ctx));
  //   ctx.clearRect(0,0, 300, 650);
  //   this.pos = { x: this.pos.x, y: this.pos.y + 1 };
  //   this.render(ctx);
  // }

}

module.exports = Gems;