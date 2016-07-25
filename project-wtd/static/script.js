
var currY = 0;
var canvas = document.getElementById('canvas')
var context = canvas.getContext("2d");


function drawDuck() {
  context.clearRect(0,0,canvas.width,canvas.height);
  context.drawImage(img,0,currY);
}

var img = new Image();
img.src = "static/duck option one.png";
img.onload = function () {
  drawDuck()
}

document.addEventListener("keydown", keyDownHandler, false); // the next two lines are calling the function. When the keys are pressed

function keyDownHandler(e) {
    if(e.keyCode == 38) { //up key
        console.log("upPressed");
        currY -= 10;
        drawDuck();
    }
    else if(e.keyCode == 40) { //down key
        console.log("downPressed");
        currY += 10;
        drawDuck();
    }
}
