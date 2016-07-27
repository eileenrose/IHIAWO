
var canvas;
var context;
var canvasWidth;
var canvasHeight;
var currentx = 100;
var currenty = 200;
var groundy = 200;
var backgroundX = 0;
var background2X = 1788;
var runGame = true;
var gravity = .01;
var jumpspeed = -20;
var d = new Date();
var lastUpdate = d.getTime();
var yVelocity = 0;
var isUpPressed = false;
var isRightPressed = false;
var isLeftPressed = false;
var delay = 50;
var codeX;
var myScore;
var currentScore = 0;

var lifebar;
var numLives = 0;

var background = new Image();
var background2 = new Image();
var duckImage = new Image();

window.onload = function() {
  canvas = document.getElementById('canvas');
  context = canvas.getContext("2d");
  canvasWidth = canvas.width;
  canvasHeight = canvas.height;
  codeX = -canvas.width;

  background.onload = function(){
    context.drawImage(background, 0, 0)
  }
  background2.onload = function(){
    context.drawImage(background2, 1788, 0)
  }
  duckImage.onload = function () {
      context.drawImage(duckImage, 100, 200);
  }
  background.src = "static/background.png";
  background2.src = "static/background.png";
  duckImage.src = "static/duck option one.png";


  setupMainObstacle();
  setupListeners();
  setupIntervals();
  setuplifeBar();
  setupScore();

}
function setuplifeBar() {
//  output = document.getElementById('output');
//  output.innerHTML = level;


  for(var i=0; i<3; i++) addLife();
}

function setupScore() {
  scoreDiv = document.getElementById('score');
  scoreDiv.innerHTML = 'Score: ' + currentScore;
}

function incrementScore() {
  currentScore += 1;
  scoreDiv = document.getElementById('score');
  scoreDiv.innerHTML = 'Score: ' + currentScore;
}

function everyinterval(n) {
    if ((myGameArea.frameNo / n) % 1 == 0) {return true;}
    return false;
}

function addLife() {
  lifebar = document.getElementById('lifebar');
  var life = new Image();
  life.src='static/duck-lives.png';
  lifebar.appendChild(life);
  numLives++;
}

function removeLife(){
  numLives--;
  var life = lifebar.children;
  if(numLives>0){
    lifebar.removeChild(lifebar.lastChild);
  }
  else{
  msg = "Game Over";
  }
}

function setupIntervals(){
  window.setInterval(runningGame, delay);
  window.setInterval(moveMainObstacle, 50);
}


function setupListeners() {
  document.addEventListener("keydown", keyDownHandler, false); // the next two lines are calling the function. When the keys are pressed
  document.addEventListener("keyup", keyUpHandler, false); //when the keys aren't pressed
}

function updateCanvasRight(){
  context.clearRect(0,0,canvas.width,canvas.height)
  backgroundX -= 35;
  background2X -= 35;
  if (currentx < 400){
    currentx += 35;
  }
  if (background2X < 0){
    backgroundX = -35;
    background2X = 1788 - 35;
  }
  codeX -= 2; //makes code move back
  context.drawImage(background, backgroundX, 0)
  context.drawImage(background2, background2X, 0)
  context.drawImage(duckImage, currentx,currenty)
  drawImage(context, codeX  ,0, canvasWidth, canvasHeight);
}

function updateCanvasLeft(){

  context.clearRect(0,0,canvas.width,canvas.height)
  context.drawImage(background, backgroundX, 0)
  context.drawImage(background2, background2X, 0)
  if (currentx > 0){
    currentx -= 35;
  }
  context.drawImage(duckImage, currentx,currenty);
}

function scrollWrapper(x, y){
    var wrapper = document.getElementById('wrapper');
    // wrapper.scrollTop = x;
    // wrapper.scrollLeft = y;
}
function duckLocation(){
  var x = currentx - 100
  var y = currenty - 100
  if (x<0){
    x=0
  }
  if (y<0){
    y=0
  }
  scrollWrapper(x,y)
}

function update(){
    //console.log(delay);
    if (currenty == groundy && isUpPressed){
      yVelocity = 3;
    }
    //console.log(yVelocity);
    yVelocity = yVelocity - delay*gravity;
    //console.log(yVelocity);
    //console.log(currenty);
    currenty = currenty - yVelocity*delay;
    //console.log(currenty);
    if (currenty >= groundy){
      yVelocity = 0;
      currenty = groundy;
    }

      context.clearRect(0,0,canvas.width,canvas.height);
      context.drawImage(background, backgroundX, 0);
      context.drawImage(background2, background2X, 0);
      context.drawImage(duckImage, currentx,currenty);

      incrementScore();
}

function keyDownHandler(e) {
    if(e.keyCode == 39) {
        isRightPressed = true; //when the right key is pressed, the character will move
        console.log("rightPressed");
        updateCanvasRight();

    }
    if(e.keyCode == 37) {
        isLeftPressed = true;
        console.log("leftPressed");
        updateCanvasLeft();
    }
    if(e.keyCode == 32) {
        isUpPressed = true;
        console.log("upPressed");

      }
      if(e.keyCode == 80) {
          alert("Press OK to resume the game");
        }
}
function keyUpHandler(e) {
  if(e.keyCode == 39) {
      isRightPressed = false; //when the right key is pressed, the character will move
  }
  if(e.keyCode == 37) {
      isLeftPressed = false;
  }
  if(e.keyCode == 32) {
      isUpPressed = false;
    }

}
function runningGame(){
  update();
  duckLocation();

}
function moveMainObstacle(){
  codeX += 1;
  drawImage(context, codeX  ,0, canvasWidth, canvasHeight);
}
