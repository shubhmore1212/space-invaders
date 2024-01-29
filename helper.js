function collisionWithEnemyEffect(rocket) {
  explosionSound.play();
  rocket.currentPos = 2;
  //add point
  score++;
}

function movementOfAlien(enemy) {
  enemy.xpos = enemy.xpos + enemy.speed * bossEnemy.direction;

  if (enemy.xpos >= width) {
    bossEnemy.direction = -1;
  } else if (enemy.xpos <= 0) {
    bossEnemy.direction = 1;
  }
}

function existingStages() {
  if (score >= 28) {
    gameTime = gameTime; //stop game timer
    stage = 2;
    winSound.play();
  }

  if (gameTime >= timeLimit || player.life === 0) {
    stage = 3;
    gameOverSound.play();
  }
}

function rocketStatus(rocket, player) {
  if (fire && rocket.currentPos == 0) {
    rocket.currentPos = 1;
  }

  if (rocket.currentPos == 1) {
    rocket.xpos = rocket.xpos;
    rocket.ypos = rocket.ypos - rocket.speed;

    if (rocket.ypos <= 60) {
      rocket.currentPos = 2;
    }
  } else {
    rocket.ypos = rocket.ypos;
    rocket.xpos = player.xpos;
  }

  if (rocket.currentPos == 2) {
    rocket.xpos = player.xpos;
    rocket.ypos = player.ypos;
    rocket.currentPos = 0;
  }
}

function firingBossRockets(bossEnemy) {
  if (bossEnemy.rocket.currentPos == 1) {
    bossEnemy.rocket.xpos = bossEnemy.rocket.xpos; //stop following boss
    bossEnemy.rocket.ypos = bossEnemy.rocket.ypos + bossEnemy.rocket.speed;

    if (bossEnemy.rocket.ypos >= height) {
      bossEnemy.rocket.currentPos = 2;
    }
  } else {
    bossEnemy.rocket.ypos = bossEnemy.ypos;
    bossEnemy.rocket.xpos = bossEnemy.xpos;
  }

  //send rocket
  if (bossEnemy.rocket.currentPos == 2 && bossEnemy.ypos != -1000) {
    bossEnemy.rocket.xpos = bossEnemy.xpos;
    bossEnemy.rocket.ypos = bossEnemy.ypos;
    bossEnemy.rocket.currentPos = 1;
  }
}

function playerHittingBoss(rocket, bossEnemy) {
  if (rocket.isCollision(bossEnemy)) {
    collisionWithEnemyEffect(rocket);
    if (bossEnemy.life >= 10) {
      bossEnemy.life -= 10;
    } else {
      bossEnemy.speed = 0;
      bossEnemy.xpos = -1000;
      bossEnemy.ypos = -1000;
    }
  }
}
