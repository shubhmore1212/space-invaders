class GameObject {
  constructor(xpos, ypos, image) {
    this.xpos = xpos;
    this.ypos = ypos;
    this.image = image;
  }
}

class Player extends GameObject {
  constructor(xpos, ypos, image, speed, width, height, life) {
    super(xpos, ypos, image);
    this.speed = speed;
    this.width = width;
    this.height = height;
    this.life = life;
  }

  collisionWithRocket = function (bossEnemy) {
    if (bossEnemy.rocket.isCollision(this)) {
      this.life--;
      this.xpos = width / 2;
      bossEnemy.rocket.currentPos = 2;
      gameOverSound.play();
    }
  };
}

class Rocket extends GameObject {
  constructor(xpos, ypos, image, speed, width, height, currentPos) {
    super(xpos, ypos, image);
    this.speed = speed;
    this.width = width;
    this.height = height;
    this.currentPos = currentPos;
  }

  isCollision = function (enemy) {
    return (
      this.xpos >= enemy.xpos - enemy.width / 2 &&
      this.xpos <= enemy.xpos + enemy.width / 2 &&
      this.ypos >= enemy.ypos - enemy.height / 2 &&
      this.ypos <= enemy.ypos + enemy.height / 2
    );
  };
}

class Enemy extends GameObject {
  constructor(xpos, ypos, image, width, height) {
    super(xpos, ypos, image);
    this.width = width;
    this.height = height;
  }
}

class BossEnemy extends Enemy {
  constructor(
    xpos,
    ypos,
    image,
    width,
    height,
    direction,
    speed,
    life,
    rocket
  ) {
    super(xpos, ypos, image, width, height);
    this.direction = direction;
    this.speed = speed;
    this.life = life;
    this.rocket = rocket;
  }
}

function playerSetup() {
  player = new Player(300, 475, playerImage, 3, 60, 40, 3);
}

function rocketSetup() {
  rocket = new Rocket(player.xpos, player.ypos, null, 5, 7, 20, 0);
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

function bossSetup() {
  bossEnemy = new BossEnemy(
    300,
    90,
    bossImage,
    60,
    30,
    1,
    2,
    100,
    new Rocket(300, 90, null, 3, 10, 10, 1)
  );
}
