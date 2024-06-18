
var buttonColors = ["red","blue","green","yellow"]; // Array of buttons
var gamePattern = [] // Array of system choosen colors
var userClickedPattern = [] // Array of User clicked colors
var level = 0; // Variable to track the level

// Sound playing function for user click and system click
function playSound(name){
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();
}

// Start over function
function startOver(){
    level=0;
    gamePattern=[]
    userClickedPattern=[]
}



// Function to animate the user click and system press
function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed");
    }, 100)
}

// Function to enable system click
function nextSequence(){
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    animatePress(randomChosenColor)
    playSound(randomChosenColor);
    $("h1").text("Level "+level)
    level = level+1;
    console.log(gamePattern)

}

$(document).on("keypress",nextSequence)


// Function to enable User click
$(".btn").click(function(){
    var userChosenColour = $(this).attr("id");
    playSound(userChosenColour);
    animatePress(userChosenColour);
    userClickedPattern.push(userChosenColour);
    console.log(userClickedPattern)
    var userPattern = userClickedPattern.length-1;
    checkAnswer(userPattern)
    // console.log(userPattern)
})

// Function to check user pattern match with system pattern
function checkAnswer(currentLevel){
    if(gamePattern[currentLevel]==userClickedPattern[currentLevel]){
        // console.log("Match")
        if(gamePattern.length==userClickedPattern.length){
            setTimeout(nextSequence,1000)
            // nextSequence();
            userClickedPattern=[]
        }else{
            
        }
    }else{
        $("body").addClass("game-over");
        var audio = new Audio("sounds/wrong.mp3");
        $("h1").text("Game Over. Press any key to restsrt!");
        audio.play();
        startOver();
        setTimeout(function(){
            $("body").removeClass("game-over")
        },200)
    }
    
}


$("h1").click(function(){
    
    var audio = new Audio("sounds/wrong.mp3");
    audio.play();
})

