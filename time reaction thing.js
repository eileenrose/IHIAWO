function setupHandlers(){
  var isReaction = false;
  var reactionTime;
  $("#PEP").click(function(){
    console.log("click");
    var d = new Date();
    if (!isReaction){
      isReaction = true;
      reactionTime = d.getTime();
      //console.log(reactionTime);
    }
    else{
      var endTime = d.getTime();
      console.log(endTime-reactionTime);
      isReaction = false;
    }
  })
}
