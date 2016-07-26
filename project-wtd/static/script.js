
var canvas = document.getElementById('canvas')
var context = canvas.getContext("2d");


var background = new Image();
var background2 = new Image();
var duckImage = new Image();
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


var currentx = 100;
var currenty = 200;
var backgroundX = 0;
var background2X = 1788;
var rightPressed = false;
var leftPressed = false;
var upPressed = false; //set to false to begin with since the character shouldn't be moving until we call the function

document.addEventListener("keydown", keyDownHandler, false); // the next two lines are calling the function. When the keys are pressed
document.addEventListener("keyup", keyUpHandler, false); //when the keys aren't pressed

function keyDownHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = true; //when the right key is pressed, the character will move
        console.log("rightPressed")
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
        context.drawImage(background, backgroundX, 0)
        context.drawImage(background2, background2X, 0)
        context.drawImage(duckImage, currentx,currenty);
    }
    else if(e.keyCode == 37) {
        leftPressed = true;
        console.log("leftPressed")
        context.clearRect(0,0,canvas.width,canvas.height)
        context.drawImage(background, backgroundX, 0)
        context.drawImage(background2, background2X, 0)
        if (currentx > 0){
          currentx -= 35;
        }
        context.drawImage(duckImage, currentx,currenty);
    }
    else if(e.keyCode == 38) {
        upPressed = true;
        console.log("upPressed")
        context.clearRect(0,0,canvas.width,canvas.height)
        context.drawImage(background, backgroundX, 0)
        context.drawImage(background2, background2X, 0)
        if (currenty > 0){
          currenty -= 35;
        }
        context.drawImage(duckImage, currentx,currenty);
        duckImage.velX +=10;
    }
    else if(e.keyCode == 40){
      downPressed = true;
      console.log("downPressed")
      context.clearRect(0,0,canvas.width,canvas.height)
      context.drawImage(background, backgroundX, 0)
      context.drawImage(background2, background2X, 0)
      if (currenty < 200){
        currenty += 35;
      }
      context.drawImage(duckImage, currentx,currenty);
      duckImage.velX +=10;
    }
}
function keyUpHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = false;
    }
    else if(e.keyCode == 37) {
        leftPressed = false;
    }
    else if (e.keyCode == 38) {
        upPressed = false;
    }
    else if (e.keyCode == 40) {
        downPressed = false;
    }
}

function scrollWrapper(x, y){
    var wrapper = document.getElementById('wrapper');
    wrapper.scrollTop = x;
    wrapper.scrollLeft = y;
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
window.setTimeout(duckLocation, 100);

var audio = new Audio('static/Music.mp3');
audio.play();
