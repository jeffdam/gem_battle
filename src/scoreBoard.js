class ScoreBoard {
  constructor(ctx) {
    this.ctx = ctx;
    this.score = 0;
  }

  get() {
    return this.score;
  }

  update(score) {
    this.score += score;
  }

  render() {
    this.ctx.clearRect(0, 0, 300, 650);
    this.ctx.font =
      "30px 'Permanent Marker','Sedgwick Ave Display', Helvetica, sans-serif";
    this.ctx.strokeStyle = "white";
    this.ctx.strokeText(this.score, 10, 40);
  }
}

export default ScoreBoard;
