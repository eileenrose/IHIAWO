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
var yVelocity = 0;
var isUpPressed = false;
var isRightPressed = false;
var isLeftPressed = false;
var delay = 50;
var codeX;
var dogeX = 600;
var myScore;
var currentScore = 0;
var recentlyCollided = false;
var lifebar;
var numLives = 0;
var backgroundStep = 10;
var recentlyTouchedDoge = false;

var background = new Image();
var background2 = new Image();
var duckImage = new Image();
var obstacleRight = 0;
var dogeImage = new Image();

window.onload = function() {
 console.log("loaded window");
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
 dogeImage.onload = function () {
     context.drawImage(dogeImage, dogeX, 200, 150, 200);
 }

 // spikeImage.onload = function () {
 //     context.drawImage(spikeImage, spikeX, 200, 150, 200);
 // }

 background.src = "static/background.png";
 background2.src = "static/background.png";
 duckImage.src = "static/duck option one.png";
 dogeImage.src = "static/Doge.png";

 // spikeImage.src = "static/spiked platform.png";



 setupMainObstacle();
 setupListeners();
 setupIntervals();
 setuplifeBar();
 setupScore();
 runningGame();

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

function incrementScore() { //allows the score to go from 0 up by 1 for every pixle moved by the background
 currentScore += 1;
 scoreDiv = document.getElementById('score');
 scoreDiv.innerHTML = 'Score: ' + currentScore;

}



function addLife() { //Allows the player to have three lives
 lifebar = document.getElementById('lifebar');
 var life = new Image();
 life.src='static/duck-lives.png';
 lifebar.appendChild(life);
 numLives++;
}

function removeLife(){ //Removes lives
 numLives--;
 var life = lifebar.children;
 if(numLives>=0){
   lifebar.removeChild(lifebar.lastChild);
 }
 else{
 window.location.assign('/gameOver?currentScore=' + currentScore);
 }
}

function setupIntervals(){
 console.log("intervals");
 window.setInterval(runningGame, delay);
 window.setInterval(moveMainObstacle, 50);
}


function setupListeners() {
 document.addEventListener("keydown", keyDownHandler, false); // the next two lines are calling the function. When the keys are pressed
 document.addEventListener("keyup", keyUpHandler, false); //when the keys aren't pressed
}
function updateCanvasRight(fasterScrolling){
//  context.clearRect(0,0,canvas.width,canvas.height)
 //mapX += 35;

 if (currentx < 400){ //When the duck gets to the center of image, it stops.
     if ((currentx + 158) > (dogeX-12) && (currentx + 158) < (dogeX + 250)
   && currenty >= 200) {
     if (recentlyTouchedDoge == false){
       removeLife();
     }
       currentx += 5;
       window.setTimeout(function(){
       recentlyTouchedDoge = true;
     }, 10);

     }
     else {
       currentx += 5;
     }

 }
 backgroundX -= (backgroundStep + fasterScrolling);
 background2X -= (backgroundStep + fasterScrolling);
 dogeX -= (backgroundStep + fasterScrolling);
 if (background2X < 0){
   backgroundX = -backgroundStep;
   background2X = 1788 - backgroundStep;
 }
 codeX -= 2; //makes code move back
//  context.drawImage(background, backgroundX, 0)
 //context.drawImage(background2, background2X, 0)
 //context.drawImage(duckImage, currentx,currenty)
//  drawImage(context, codeX  ,0, canvasWidth, canvasHeight);
 //$("#1").css("right", obstacleRight);

}
function updateCanvasLeft(){

 //context.clearRect(0,0,canvas.width,canvas.height)
 if (currentx > 0){
   currentx -= 5;
 }
 //context.drawImage(background, backgroundX, 0)
 //context.drawImage(background2, background2X, 0)

 //context.drawImage(duckImage, currentx,currenty);
}


function update(){
   if (currenty == groundy && isUpPressed){
     yVelocity = 3;
   }//this makes the duck jump and fall
   //console.log(yVelocity);
   yVelocity = yVelocity - delay*gravity;
   //console.log(yVelocity);
   //console.log(currenty);
   currenty = currenty - yVelocity*delay;
   if (currenty >= groundy){
     yVelocity = 0;
     currenty = groundy;
   }
   if (isRightPressed && currenty < 75) {
    updateCanvasRight(10);
   }
   if(isRightPressed){
     updateCanvasRight(0);
   }
   if (isLeftPressed) {
     updateCanvasLeft();
   }
     context.clearRect(0,0,canvas.width,canvas.height);
     context.drawImage(background, backgroundX, 0);
     context.drawImage(background2, background2X, 0);
     context.drawImage(duckImage, currentx,currenty);
     context.drawImage(dogeImage, dogeX, 200, 150, 200);

     incrementScore();
}

function keyDownHandler(e) {
   if(e.keyCode == 39) {
       isRightPressed = true; //when the right key is pressed, the character will move
       console.log("rightPressed");
     //  updateCanvasRight();

   }
   if(e.keyCode == 37) {
       isLeftPressed = true;
       console.log("leftPressed");
     // updateCanvasLeft();
   }
   if(e.keyCode == 32) {
       isUpPressed = true;
       console.log("upPressed");
     //  updateCanvasLeft();

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

function getPositions() {
 var posX = currentx;
 var posY = currenty;
 var width = duckImage.width;
 var height = duckImage.height;
 return [ [ posX, posX + width ], [ posY, posY + height ] ];
}

function comparePositionsCode(p1, p2) {
 // var x1 = p1[0] < p2[0] ? p1 : p2;
 // var x2 = p1[0] < p2[0] ? p2 : p1;
 // return x1[1] > x2[0] || x1[0] === x2[0] ? true : false;
 return p1[0] < p2;
}

function checkCollisionsCode(){
 if (recentlyCollided) return;
 var codePos = [codeX+canvas.width, 400];
 var pos = getPositions();
 var horizontalMatch = comparePositionsCode(pos[0], codePos[0]);
 // var verticalMatch = comparePositions(pos[1], codePos[1]);
 // var match = horizontalMatch && verticalMatch;
 var match = horizontalMatch;
 if (match) {
   removeLife();
   recentlyCollided = true
   window.setTimeout(function(){
     recentlyCollided = false;
   }, 2000);
 }

 // make a new function for collisions with obstacles, code, tub
}

function runningGame(){
 update();
 checkCollisionsCode();

}
function moveMainObstacle(){
 codeX += 1;
 drawImage(context, codeX  ,0, canvasWidth, canvasHeight);
}
var audio = new Audio('static/Music.mp3');
audio.play();