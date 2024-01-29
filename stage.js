function lose() {
  background(255, 0, 0);

  //outer border
  stroke(255, 0, 0);
  noFill();
  strokeWeight(3);
  rect(width / 2, height / 2, width, height);
  noStroke();

  //words for splash
  fill(0);
  textSize(80);
  textFont(titleFont);
  text("YOU LOSE", width / 2, 100);
  text("BUDDY!", width / 2, 180);

  textSize(40);
  textFont(bodyFont);
  text("REFRESH TO PLAY AGAIN", width / 2, 300);
}

function win() {
  background(0, 255, 0);

  //outer border
  stroke(0, 255, 0);
  noFill();
  strokeWeight(3);
  rect(width / 2, height / 2, width, height);
  noStroke();

  //words for splash
  fill(0);
  textSize(80);
  textFont(titleFont);
  text("YOU ARE CHAMP", width / 2, 100);
  text("BUDDY!", width / 2, 180);

  textSize(40);
  textFont(bodyFont);
  text("YOUR GAMETIME WAS", width / 2, 300);
  text(gameTime + " seconds", width / 2, 340);
  text("REFRESH TO PLAY AGAIN", width / 2, 450);
}

function splash() {
  //start clock
  splashTime = totalTime;
  background(0);

  //outer border
  stroke(0, 255, 0);
  noFill();
  strokeWeight(3);
  rect(width / 2, height / 2, width, height);
  noStroke();

  //words for splash
  fill(0, 255, 0);
  textSize(80);
  textFont(titleFont);
  text("SPACE INVADERS", width / 2, 100);
  textSize(35);
  textFont(bodyFont);
  text("PROGRAMMED BY SHUBH MORE IN 2024", width / 2, 130);

  textSize(80);
  textFont(titleFont);
  text("HOW TO PLAY", width / 2, 250);
  textSize(25);
  textFont(bodyFont);
  text("PRESS LEFT AND RIGHT ARROWS TO MOVE", width / 2, 290);
  text("PRESS S TO FIRE ROCKETS", width / 2, 320);
  text("DESTROY ALL ALIENS TO WIN", width / 2, 350);

  textSize(30);
  text("CLICK THE SCREEN TO BEGIN", width / 2, 450);
}

function displayBoard() {
  // score-board
  //live
  fill(0);
  textSize(25);
  textFont(titleFont);
  text("Lives:", 50, 20);
  textFont(bodyFont);
  textSize(35);
  text(player.life, 110, 20);

  //score
  textSize(25);
  textFont(titleFont);
  text("Score:", 50, 45);
  textFont(bodyFont);
  textSize(35);
  text(score, score.length > 3 ? 100 : 110, 45);

  //timer
  fill(0);
  textSize(25);
  textFont(titleFont);
  text("Time:", 510, 35);
  textFont(bodyFont);
  textSize(35);
  text(timeLimit - gameTime, 570, 35);
}
