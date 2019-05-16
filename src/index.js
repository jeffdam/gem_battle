const Gems = require('./gems')


document.addEventListener('DOMContentLoaded', () => {
  const canvasPF1 = document.getElementById("play-field-1");
  const ctxPF1 = canvasPF1.getContext('2d');

  canvasPF1.width = 300;
  canvasPF1.height = 650;
  const gem = new Gems()
  gem.render(ctxPF1);
})