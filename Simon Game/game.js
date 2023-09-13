var buttonColours = ["red","blue","yellow","green"];
var gamePattern = [];
var userClickedPattern = [];
var flag = false;
var lvl =0;
var pressed = 0;

function nextSequence(){
    lvl++;
    var randomNumber = Math.random();
    randomNumber = randomNumber*4;
    randomNumber = Math.floor(randomNumber);
    console.log(randomNumber);

    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    
    $("#"+randomChosenColour).fadeOut(100);
    console.log($("#"+randomChosenColour));
    $("#"+randomChosenColour).fadeIn(100);
    playSound(randomChosenColour);
    $("h1").text("Level "+lvl);
    userClickedPattern = [];
    pressed = 0;
}

function playSound(name){
    var sound = new Audio('./sounds/'+name+'.mp3');
    sound.play();
}

function reset(){
    flag = false;
    lvl = 0;
    pressed = 0;
    userClickedPattern = [];
    gamePattern = [];
    setTimeout(()=>{
        $("body").removeClass("game-over")
    },200);
    
}

$(document).on("keypress",function(){
    if(!flag){
        $("h1").text("Level 0");
        nextSequence();
        flag = true 
    }
})

$(".btn").on("click",function(event){
    var userChosenColour = event.target.id; // same in different way : $(this).attr("id")
    userClickedPattern.push(userChosenColour);
    
    
    playSound(userChosenColour);
    $(this).addClass("pressed");
    setTimeout(() => {
        $(this).removeClass("pressed");
    },100); 
    if(gamePattern[pressed]===userChosenColour){
        console.log("success")
    } else{
        $("body").addClass("game-over")
        $("h1").text("Game over, press any key to restart")
        reset();
    }
    pressed++;
    if(pressed === lvl){
        setTimeout(()=>{
            nextSequence()
        },1000);
    }
})