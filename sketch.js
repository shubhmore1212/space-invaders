//player
let player;

//rocket
let rocket;
let fire = false;

//aliens - enemy
let enemyList = [];
let bossEnemy;

//score-pointer
let score = 0;

//stage
let stage = 0;
//stage 0 = splash
//stage 1 = game
//stage 2 = win

let totalTime;
let splashTime;
let gameTime;
let timeLimit = 100;

function setup() {
  createCanvas(600, 500);
  rectMode(CENTER);
  textAlign(CENTER);
  imageMode(CENTER);

  enemySetup();
  playerSetup();
  rocketSetup();
  bossSetup();

  backgroundMusic.play();
}

function draw() {
  //start clock
  totalTime = millis();

  switch (stage) {
    case 0:
      splash();
      break;

    case 1:
      game();
      break;

    case 2:
      win();
      startSound = null;
      fireSound = null;
      break;

    case 3:
      lose();
      break;

    default:
      splash();
      break;
  }
}

function game() {
  //call looping function
  keyPressed();
  keyTyped();

  background(0);

  //outer border
  stroke(0, 255, 0);
  noFill();
  strokeWeight(3);
  rect(width / 2, height / 2, width, height);

  //banner
  noStroke();
  fill(0, 255, 0);
  rect(width / 2, 25, width, 50);

  //player
  noStroke();
  fill(0, 0, 255);
  image(playerImage, player.xpos, player.ypos, player.width, player.height);

  //rockets
  rockets();

  //stop splash time and start game time
  splashTime = splashTime; //stop splash time to save amount of time we are on splash
  gameTime = Math.ceil((totalTime - splashTime) / 1000);

  //aliens
  noStroke();
  fill(255);
  for (let i = 0; i < enemyList.length; i++) {
    image(enemyList[i].image, enemyList[i].xpos, enemyList[i].ypos, 30, 30);
  }

  //boss-alien
  image(
    bossEnemy.image,
    bossEnemy.xpos,
    bossEnemy.ypos,
    bossEnemy.width,
    bossEnemy.height
  );
  movementOfAlien(bossEnemy);

  //boss rockets
  //position 1 = in motion after firing
  //position 2 = reset back to boss

  //draw boss rocket
  fill(255, 0, 0);
  ellipse(bossEnemy.rocket.xpos, bossEnemy.rocket.ypos, 10);

  //firing boss rockets
  firingBossRockets(bossEnemy);

  playerHittingBoss(rocket, bossEnemy);

  //boss rocket collision witgh player
  player.collisionWithRocket(bossEnemy);

  //print health
  textFont(bodyFont);
  textSize(20);
  fill(255, 0, 0);
  text(bossEnemy.life, bossEnemy.xpos, bossEnemy.ypos - 20);

  //headbar
  displayBoard();

  //collision betn rockets and aliens
  for (let i = 0; i < enemyList.length; i++) {
    if (rocket.isCollision(enemyList[i])) {
      //remove alien
      enemyList[i].xpos = -1000;
      collisionWithEnemyEffect(rocket);
    }
  }

  //exiting stages
  existingStages();
}

function rockets() {
  //rocket position
  //0 = with p1
  //1 = in motion after firing
  //2 = collision with object, return to p1
  fill(255);
  ellipse(rocket.xpos, rocket.ypos, 10);

  //fire rockets
  rocketStatus(rocket, player);
}
