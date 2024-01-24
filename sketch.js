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
var a1X = 50;
var a1Y = 150;
var aWidth = 40;
var aHeight = 40;

//score-pointer
var score = 0;

//stage
var stage = 0;
//stage 0 = splash
//stage 1 = game
//stage 2 = win

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

  backgroundMusic.play();
}

function draw() {
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

  if (mouseIsPressed) {
    stage = 1;
    startSound.play();
  }
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
  text("REFRESH TO PLAY AGAIN", width / 2, 300);
}

function splash() {
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

  //aliens
  noStroke();
  fill(255);
  image(enemyImage, a1X, a1Y, aWidth, aHeight);

  //player
  noStroke();
  fill(0, 0, 255);
  image(playerImage, p1X, p1Y, pWidth, pHeight);

  //rockets
  rockets();

  //collision betn rockets and aliens
  if (
    r1X >= a1X - aWidth / 2 &&
    r1X <= a1X + aWidth / 2 &&
    r1Y >= a1Y - aHeight / 2 &&
    r1Y <= a1Y + aHeight / 2
  ) {
    //remove alien
    a1X = -1000;
    explosionSound.play();
    r1Position = 2;
    //add point
    score = score + 1;
  }

  // score-board
  fill(0);
  textSize(25);
  textFont(titleFont);
  text("Score:", 50, 35);
  textFont(bodyFont);
  textSize(35);
  text(score, score.length > 3 ? 100 : 110, 35);

  //exiting stages
  if (score >= 1) {
    stage = 2;
    winSound.play();
  }
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
  if (key == "s" && keyIsPressed) {
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
