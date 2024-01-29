//player
let player;

//rocket
let rocket;
var fire = false;

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
let timeLimit = 10;

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

  //headbar
  displayBoard();

  //collision betn rockets and aliens
  for (let i = 0; i < enemyList.length; i++) {
    if (
      rocket.xpos >= enemyList[i].xpos - enemyList[i].width / 2 &&
      rocket.xpos <= enemyList[i].xpos + enemyList[i].width / 2 &&
      rocket.ypos >= enemyList[i].ypos - enemyList[i].height / 2 &&
      rocket.ypos <= enemyList[i].ypos + enemyList[i].height / 2
    ) {
      //remove alien
      enemyList[i].xpos = -1000;
      explosionSound.play();
      rocket.currentPos = 2;
      //add point
      score = score + 1;
    }
  }

  //exiting stages
  if (score >= 3) {
    gameTime = gameTime; //stop game timer
    stage = 2;
    winSound.play();
  }

  if (gameTime >= timeLimit) {
    stage = 3;
    gameOverSound.play();
  }
}

function rockets() {
  //rocket position
  //0 = with p1
  //1 = in motion after firing
  //2 = collision with object, return to p1
  fill(26, 175, 255);
  rect(rocket.xpos, rocket.ypos, rocket.width, rocket.height);

  //fire rockets
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
