var rightPressed = false;
var leftPressed = false;
var upPressed = false; //set to false to begin with since the character shouldn't be moving until we call the function

document.addEventListener("keydown", keyDownHandler, false); // the next two lines are calling the function. When the keys are pressed
document.addEventListener("keyup", keyUpHandler, false); //when the keys aren't pressed

function keyDownHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = true; //when the right key is pressed, the character will move
        console.log("rightPressed")
    }
    else if(e.keyCode == 37) {
        leftPressed = true;
        console.log("leftPressed")
    }
    else if(e.keyCode = 35) {
        upPressed = true;
        console.log("upPressed")
    }
}
function keyUpHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = false;
    }
    else if(e.keyCode == 37) {
        leftPressed = false;
    }
    else if (e.keyCode == 35) {
        upPressed = false;
    }
}
