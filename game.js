let buttonColours = ["red","blue", "green","yellow"];
let userClickedPattern = [];
let gamePattern = [];
let lvl = 0;
let started = false;
function nextSequence(){
    let randomNumber = Math.floor(Math.random()*4);
    let randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    $("h1").text("Level " + lvl);
    lvl++;
}
$(".btn").on("click",function(){
    if(started){
        let userChosenColour = $(this).attr("id");
        userClickedPattern.push(userChosenColour);
        playSound(userChosenColour);
        animatePress(userChosenColour);
        if(userChosenColour !== gamePattern[gamePattern.length - 1]){
            $("h1").text("You Lose !");
            $("body").addClass("game-over");
            setTimeout(function(){
                $("body").removeClass("game-over");
            },200);
            $("h1").text("Game Over, Press A Key to Restart !");
            started = false;
            lvl = 0;
            gamePattern = [];
            userClickedPattern = [];
            exit(1);
        }
        nextSequence();
    }
});
function playSound(name){
    new Audio('./sounds/'+ name +'.mp3').play();
}
function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){
        $(".btn").removeClass("pressed");
    },100);
}
$("html").keypress(function(event){
    if(event.key == "A" || event.key == "a"){
        $("h1").text("Level 0");
        started = true;
        nextSequence();
    }
});