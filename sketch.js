// variáveis da bolinha

let xBolinha = 300;
let yBolinha = 200;
let diametro = 16;
let xBallSpd = 5;
let yBallSpd = 2;

// variáveis do player

let xPlayer = 7
let yPlayer = 160;

// rack

let lRack = 10;
let hRack = 80;

// variáveis do oponente

let xCpu = 583;
let yCpu = 160;
let cpuSpd;

// controle de colisão

let colidiu = false;

// placar

let playerPoints = 0;
let cpuPoints = 0;

// sons

let raquetada;
let point;
let trilha;

function preload(){
  trilha = loadSound("trilha.mp3");
  point = loadSound("ponto.mp3");
  raquetada = loadSound("raquetada.mp3");
}

function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

function draw() {
  background(0);
  spawnBall();
  spawnPlayer(xPlayer, yPlayer);
  spawnPlayer(xCpu, yCpu);
  showScoreboard();
  scorePoint();
  moveOpponent();
  moveBall();
  verifyCollision(xPlayer, yPlayer);
  verifyCollision(xCpu, yCpu);
  freeBall();
}

function spawnBall(){
  circle(xBolinha, yBolinha, diametro);
}

function spawnPlayer(x, y){
  rect(x, y, lRack, hRack);
  moving();
}

function moving(){
  if (keyIsDown(UP_ARROW)) {
    yPlayer -= 5
  }
  if (keyIsDown(DOWN_ARROW)) {
    yPlayer += 5
  }
}

function moveBall(){
  xBolinha += xBallSpd;
  yBolinha += yBallSpd
  if (xBolinha > width - diametro / 2 || xBolinha <= diametro / 2){
    xBallSpd *= -1
  }
  if (yBolinha > height - diametro /2 || yBolinha <= diametro /2){
    yBallSpd *= -1
  }
}

function moveOpponent(){
  if (keyIsDown(87)) {
    yCpu -= 5
  }
  if (keyIsDown(83)) {
    yCpu += 5
  }
}

function verifyCollision(x, y){
  
  colidiu = collideRectCircle(x, y, lRack, hRack, xBolinha, yBolinha, diametro);
  if (colidiu){
    xBallSpd *= -1
    raquetada.play()
  }
}

function showScoreboard(){
  stroke(255)
  textAlign(CENTER);
  textSize(16);
  fill(color(255, 140, 0));
  rect(150, 10, 40, 20);
  fill(255);
  text(playerPoints, 170, 26);
  fill(color(255, 140, 0));
  rect(450, 10, 40, 20);
  fill(255);
  text(cpuPoints, 470, 26);
}

function scorePoint(){
  if (xBolinha > 590){
    playerPoints += 1
    point.play()
  }
  
  if (xBolinha < 10){
    cpuPoints += 1
    point.play();
  }
}

function freeBall(){
    if (xBolinha - diametro / 2 == 0){
    console.log('bolinha ficou presa');
    xBolinha = 300;
    }
}
