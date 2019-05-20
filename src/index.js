const Game = require('./game');

document.addEventListener('DOMContentLoaded', () => {
  const canvasPF1 = document.getElementById("play-field-1");
  canvasPF1.width = 300;
  canvasPF1.height = 650;
  const ctxPF1 = canvasPF1.getContext('2d');
  const game = new Game(ctxPF1);

  game.gameStart();
});