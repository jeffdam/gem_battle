export const startGameMenu = (gameStart) => {  
  const handleEnter = (event) => {
    if (event.defaultPrevented) {
      return;
    }
    switch (event.key) { 
      case "Enter":
        document.getElementById("menu").setAttribute("style", "display:none;");
        gameStart();
        break;
      default:
        return;
    }
    event.preventDefault();
    window.removeEventListener("keydown", handleEnter, true);
  };

  window.addEventListener("keydown", handleEnter, true);

};


export const endGameMenu = (ctx, score, gameStart) => {
  let highScore = localStorage.getItem("highscore") || score;
  if (score >= highScore) {
    localStorage.setItem("highscore", score);
    highScore = score;
  }
  ctx.fillStyle = "white";
  ctx.globalAlpha = 0.25;
  ctx.fillRect(0, 0, 300, 650);
  ctx.fillStyle = "black";
  ctx.globalAlpha = 1;
  ctx.fillRect(0, 275, 300, 180);
  ctx.fillStyle = "red";
  ctx.font = "40px 'Permanent Marker','Sedgwick Ave Display', Helvetica, sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("GAME OVER", 150, 330);
  ctx.font = "20px 'Permanent Marker','Sedgwick Ave Display', Helvetica, sans-serif";
  ctx.textAlign = "center";
  ctx.fillText(`Your score: ${score}`, 150, 365);
  ctx.fillText(`High score: ${highScore}`, 150, 395);
  ctx.fillText(`Press Enter to play again`, 150, 425);

  const handleEnter = (event) => {
    if (event.defaultPrevented) {
      return;
    }
    switch (event.key) {
      case "Enter":
        gameStart();
        break;
      default:
        return;
    }
    event.preventDefault();
    window.removeEventListener("keydown", handleEnter, true);
  };

  window.addEventListener("keydown", handleEnter, true);
};

