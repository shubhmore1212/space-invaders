//multimedia;
let playerImage;
let enemyImage;
let bossImage;
let fireSound;
let shootSound;
let titleFont;
let bodyFont;

function preload() {
  playerImage = loadImage("asset/spaceship.png");
  enemyImage = loadImage("asset/invader.png");
  bossImage = loadImage("asset/boss-alien.png");
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
