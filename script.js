let level = 0;
let gamePattern = [];
let  userClickedPattern = [];//usd for correct entry by user
let buttonColours = ["red", "blue", "green", "yellow"];
let start = false; // Track if game has started

//  Step 1: Function to play the sound
function playSound(name) {
  let audio = new Audio("../../sounds/" + name + ".mp3");
  audio.play();
}

//  Step 2: Next sequence function
function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " +level);
  let random1 = Math.floor(Math.random() * 4);
  let randomChosenColour = buttonColours[random1];

  gamePattern.push(randomChosenColour); // not =, use push() game pattern 

  //  Step 3: Flash the button
  $("#" + randomChosenColour).fadeOut(100).fadeIn(100);

  // Step 4: Play sound for that button
  playSound(randomChosenColour);

  console.log("Game pattern:", gamePattern); // confirmation
}
$(document).on("keydown", function () {
  if (!start) {
    start = true;
    nextSequence();
  }
});
// $(document).on("keydown", function () {
//   nextSequence();

// });
$(".btn").on("click",(e)=>{
 let userChosenColour = $(e.target).attr("id");
 //console.log(userChosenColour);

 //console.log(userClickedPattern);

playSound(userChosenColour);
animatePress(userChosenColour);
if(start){
 userClickedPattern.push(userChosenColour);
 checkAnswer(userClickedPattern.length - 1);
}

});

 function animatePress(currentColor){

$("#"+currentColor).addClass("pressed");
setTimeout(function(){
$("#"+currentColor).removeClass("pressed");

},100);
}
// $("#level-title").alert("hello");
$("#level-title").on("click",()=>{
$("#level-title").text("Level " +level)
});
  //what we did we took the latest index and compare also when user clicks on that color js quick triggers checkfunction and compares the game pattern and proceed


 function checkAnswer(index) {
  if (userClickedPattern[index] === gamePattern[index]) {
    console.log(" Correct");

    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(() => {
        nextSequence();
      }, 1000);
    }
  } else {
   // console.log("Wrong choice");
    // You can add Game Over logic here later
    startOver();
  }
}
function startOver(){
  $("body").addClass("game-over");
  $("#level-title").text("Game Over, Press Any Key to Restart");
playSound("wrong");

  setTimeout(()=>{
    $("body").removeClass("game-over");
  },200);
gamePattern=[];
level=0;
start = false;


}
