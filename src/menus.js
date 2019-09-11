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
  ctx.fillStyle = "black";
  ctx.globalAlpha = 0.5;
  ctx.fillRect(0, 0, 300, 650);
  ctx.globalAlpha = 1;
  ctx.fillRect(0, 275, 300, 150);
  ctx.fillStyle = "red";
  ctx.font = "40px 'Permanent Marker','Sedgwick Ave Display', Helvetica, sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("GAME OVER", 150, 330);
  ctx.font = "20px 'Permanent Marker','Sedgwick Ave Display', Helvetica, sans-serif";
  ctx.textAlign = "center";
  ctx.fillText(`Your score: ${score}`, 150, 365);
  ctx.fillText(`Press Enter to play again`, 150, 395);

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

