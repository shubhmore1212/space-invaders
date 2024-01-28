function mousePressed() {
  if (stage == 0) {
    stage = 1;
    startSound.play();
  }
}

//only for arrow keys
function keyPressed() {
  if (keyCode == LEFT_ARROW && keyIsPressed) {
    player.xpos = player.xpos - player.speed;
    if (player.xpos <= 0) player.xpos = width;
  }

  if (keyCode == RIGHT_ARROW && keyIsPressed) {
    player.xpos = player.xpos + player.speed;
    if (player.xpos >= width) player.xpos = 0;
  }
}

//only for alphanumeric types
function keyTyped() {
  if ((key == "s" || key == "S") && keyIsPressed) {
    fire = true;
    fireSound.play();
  } else {
    fire = false;
  }
}
