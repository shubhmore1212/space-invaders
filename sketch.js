//player
var p1X = 300;
var p1Y = 475;
var pWidth = 60;
var pHeight = 40;
var pSpeed = 3;

//rocket
var r1X = p1X;
var r1Y = p1Y;
var r1Position = 0;
var rWidth = 7;
var rHeight = 20;
var rSpeed = 5;
var fire = false;

//aliens
var aWidth = 40;
var aHeight = 40;

var a1X = 50;
var a1Y = 150;

var a2X = 110;
var a2Y = 150;

var a3X = 170;
var a3Y = 150;

var a4X = 230;
var a4Y = 150;

var a5X = 290;
var a5Y = 150;

//score-pointer
var score = 0;

//stage
var stage = 0;
//stage 0 = splash
//stage 1 = game
//stage 2 = win

var totalTime;
var splashTime;
var gameTime;
var timeLimit = 10;

//multimedia;
var playerImage;
var enemyImage;
var fireSound;
var shootSound;
var titleFont;
var bodyFont;

function setup() {
  createCanvas(600, 500);
  rectMode(CENTER);
  textAlign(CENTER);
  imageMode(CENTER);
  enemy();
  backgroundMusic.play();
}

function draw() {
  //start clock
  totalTime = millis();

  if (stage == 0) {
    splash();
  }

  if (stage == 1) {
    game();
  }

  if (stage == 2) {
    win();
    startSound = null;
    fireSound = null;
  }

  if (stage == 3) {
    lose();
  }
}

function mousePressed() {
  if (stage == 0) {
    stage = 1;
    startSound.play();
  }
}

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
  image(playerImage, p1X, p1Y, pWidth, pHeight);

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

  //collision betn rockets and aliens
  for (let i = 0; i < enemyList.length; i++) {
    if (
      r1X >= enemyList[i].xpos - aWidth / 2 &&
      r1X <= enemyList[i].xpos + aWidth / 2 &&
      r1Y >= enemyList[i].ypos - aHeight / 2 &&
      r1Y <= enemyList[i].ypos + aHeight / 2
    ) {
      //remove alien
      enemyList[i].xpos = -1000;
      explosionSound.play();
      r1Position = 2;
      //add point
      score = score + 1;
    }
  }

  // score-board
  //score
  fill(0);
  textSize(25);
  textFont(titleFont);
  text("Score:", 50, 35);
  textFont(bodyFont);
  textSize(35);
  text(score, score.length > 3 ? 100 : 110, 35);

  //timer
  fill(0);
  textSize(25);
  textFont(titleFont);
  text("Time:", 510, 35);
  textFont(bodyFont);
  textSize(35);
  text(timeLimit - gameTime, 570, 35);

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

let enemyList = [];
function enemy() {
  for (let i = 0; i < 9; i++) {
    let enemy = new Enemy();
    enemy.xpos = a1X + i * 60;
    enemyList.push(enemy);
  }

  for (let i = 0; i < 9; i++) {
    let enemy = new Enemy();
    enemy.xpos = a1X + i * 60;
    enemy.ypos = a1Y + 60;
    enemyList.push(enemy);
  }
  console.log(enemyList);
}

function rockets() {
  //rocket position
  //0 = with p1
  //1 = in motion after firing
  //2 = collision with object, return to p1
  fill(26, 175, 255);
  rect(r1X, r1Y, rWidth, rHeight);

  //fire rockets
  if (fire && r1Position == 0) {
    r1Position = 1;
  }

  if (r1Position == 1) {
    r1X = r1X;
    r1Y = r1Y - rSpeed;

    if (r1Y <= 60) {
      r1Position = 2;
    }
  } else {
    r1Y = r1Y;
    r1X = p1X;
  }

  if (r1Position == 2) {
    r1X = p1X;
    r1Y = p1Y;
    r1Position = 0;
  }
}

//only for arrow keys
function keyPressed() {
  if (keyCode == LEFT_ARROW && keyIsPressed) {
    p1X = p1X - pSpeed;
    if (p1X <= 0) p1X = width;
  }

  if (keyCode == RIGHT_ARROW && keyIsPressed) {
    p1X = p1X + pSpeed;
    if (p1X >= width) p1X = 0;
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

function preload() {
  playerImage = loadImage("asset/spaceship.png");
  enemyImage = loadImage("asset/invader.png");

  //fonts
  titleFont = loadFont("font/gabs_pixel.ttf");
  bodyFont = loadFont("font/rounded_pixel.ttf");

  //sounds
  fireSound = loadSound("audio/shoot.wav");
  backgroundMusic = loadSound("audio/backgroundMusic.wav");
  explosionSound = loadSound("audio/explode.wav");
  gameOverSound = loadSound("audio/gameOver.mp3");
  startSound = loadSound("audio/start.mp3");
  winSound = loadSound("audio/bonus.mp3");
}

class Enemy {
  constructor() {
    this.xpos = a1X;
    this.ypos = a1Y;
    this.image = enemyImage;
  }
}
