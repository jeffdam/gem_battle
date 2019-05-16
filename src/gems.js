class Gems {
  constructor() {
    this.pos = { x: 150, y: 0 },
    this.size = { width: 50, height: 50 }
    this.color = ["#ff0000", "#0000ff", "#00ff00", "#ffff00"]
  }

  render(ctx) {
    ctx.fillStyle = this.color[Math.floor(Math.random() * this.color.length)];
    ctx.fillRect(
      this.pos.x,
      this.pos.y,
      this.size.width,
      this.size.height)
    ctx.fillStyle = this.color[Math.floor(Math.random() * this.color.length)];
    ctx.fillRect(
      this.pos.x,
      this.pos.y + 50,
      this.size.width,
      this.size.height
    );
  }
}

module.exports = Gems;