import Game from './game';

document.addEventListener('DOMContentLoaded', () => {

  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;

  const menu = document.getElementById("menu");
  menu.width = windowWidth;
  menu.height = windowHeight;
  const ctxMenu = menu.getContext('2d');

  const canvasPF1 = document.getElementById("play-field-1");
  canvasPF1.width = 300;
  canvasPF1.height = 650;
  const ctxPF1 = canvasPF1.getContext('2d');

  const scoreboard = document.getElementById("scoreboard");
  scoreboard.width = 150;
  scoreboard.height = 60;
  const ctxScoreboard = scoreboard.getContext('2d');

  const nextGem = document.getElementById("next-gems");
  nextGem.width = 70;
  nextGem.height = 120;
  const ctxnextGem = nextGem.getContext('2d');

  const game = new Game(ctxPF1, ctxScoreboard, ctxnextGem, ctxMenu);
    
  game.gameRender();
});