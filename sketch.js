//player
var p1X = 300;
var p1Y = 475;
var pWidth = 50;
var pHeight = 30;
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

function setup() {
  createCanvas(600, 500);
  rectMode(CENTER);
}

function draw() {
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
  rect(a1X, a1Y, aWidth, aHeight);

  //player
  noStroke();
  fill(0, 0, 255);
  rect(p1X, p1Y, pWidth, pHeight);

  //rockets
  rockets();
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

    if (r1Y <= 0) {
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
    if (p1X == 0) p1X = width;
  }

  if (keyCode == RIGHT_ARROW && keyIsPressed) {
    p1X = p1X + pSpeed;
    if (p1X == width) p1X = 0;
  }
}

//only for alphanumeric types
function keyTyped() {
  if (key == "s" && keyIsPressed) {
    fire = true;
  } else {
    fire = false;
  }
}
