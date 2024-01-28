class GameObject {
  constructor(xpos, ypos, image) {
    this.xpos = xpos;
    this.ypos = ypos;
    this.image = image;
  }
}

class Player extends GameObject {
  constructor(xpos, ypos, image, speed, width, height) {
    super(xpos, ypos, image);
    console.log("Image:", image);
    this.speed = speed;
    this.width = width;
    this.height = height;
  }
}

class Rocket extends GameObject {
  constructor(xpos, ypos, image, speed, width, height, currentPos) {
    super(xpos, ypos, image);
    this.speed = speed;
    this.width = width;
    this.height = height;
    this.currentPos = currentPos;
  }
}

class Enemy extends GameObject {
  constructor(xpos, ypos, image, width, height) {
    super(xpos, ypos, image);
    this.width = width;
    this.height = height;
  }
}

function playerSetup() {
  player = new Player(300, 475, playerImage, 3, 60, 40);
  console.log(player);
}

function rocketSetup() {
  rocket = new Rocket(player.xpos, player.ypos, enemyImage, 5, 7, 20, 0);
}

function enemySetup() {
  for (let i = 0; i < 9; i++) {
    let enemy = new Enemy(50, 150, enemyImage, 40, 40);
    enemy.xpos = enemy.xpos + i * 60;
    enemyList.push(enemy);
  }

  for (let i = 0; i < 9; i++) {
    let enemy = new Enemy(50, 150, enemyImage, 40, 40);
    enemy.xpos = enemy.xpos + i * 60;
    enemy.ypos = enemy.ypos + 60;
    enemyList.push(enemy);
  }
}
