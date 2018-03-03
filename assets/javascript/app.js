// Define variables
$(document).ready(function () {
    var count = 0;
    var time = 26;
    var isSelected = false;
    var ticker;
    var correct = 0;
    var incorrect = 0;
    var unanswered = 0;

    //Attempt to play Johnny Cash Background Music Through The Quiz
    // Googled around and didnt get a quick answer on this....I imagine I need to play a youtube link but hide it with CSS??/

    // Questions and Answer Arrays
    var question = ["Where was Johnny Cash born?",
        "What year was Ring Of Fire Released?", "How old was a boy named sue when his dad left?", "What was Johnny Cash's nickname?", 
        "In which U.S. State is San Quentin State Prison located?", "What was Johnny's very first single?"
    ]; 
    var answer = ["Arkansas", "1963", "3", "The Man In Black", "California", "Cry, Cry, Cry", ];
    var firstChoice = ["Arkansas", "1959", "15", "The Man In Black", "New York", "Hurt", ];
    var secondChoice = ["Texas", "1974", "3", "Dr. Rhythm", "Florida", "Cry, Cry, Cry", ];
    var thirdChoice = ["North Carolina", "1963","8", "The Great One", "California", "Folsom Prison Blues",];
    var fourthChoice = ["Georgia", "1965", "12", "The King", "Texas", "A Boy Named Sue", ];

    // Show & Hide Functions
    function showHolders() {
        $("#question-holder").show();
        $("#choice-holder-1").show();
        $("#choice-holder-2").show();
        $("#choice-holder-3").show();
        $("#choice-holder-4").show();
    }

    function hideHolders() {
        $("#question-holder").hide();
        $("#choice-holder-1").hide();
        $("#choice-holder-2").hide();
        $("#choice-holder-3").hide();
        $("#choice-holder-4").hide();
    }

    function hideResults() {
        $("#correct-holder").hide();
        $("#incorrect-holder").hide();
        $("#unanswered-holder").hide();
        $("#restart-holder").hide();
    }

    function displayQuestion() {
        hideResults();
        $("#answer-holder").hide();
        $("#image-holder").hide();
        $("#time-holder").show();
        showHolders();
        $("#question-holder").html(question[count]);
        $("#choice-holder-1").html(firstChoice[count]);
        $("#choice-holder-2").html(secondChoice[count]);
        $("#choice-holder-3").html(thirdChoice[count]);
        $("#choice-holder-4").html(fourthChoice[count]);


    }
    $("#choice-holder-1").on("click", checkAnswer)
    $("#choice-holder-2").on("click", checkAnswer)
    $("#choice-holder-3").on("click", checkAnswer)
    $("#choice-holder-4").on("click", checkAnswer)

    // Check Answer
    function checkAnswer() {

        hideHolders();

        if ($(this).text() === answer[count]) {
            stopTime();
            isSelected = true;
            $("#answer-holder").show();
            $("#answer-holder").html("Johnny Cash would be proud! You're right!" + answer[count]);
            displayImage();
            correct++;
            count++;
        } else {
            stopTime();
            isSelected = true;
            $("#answer-holder").show();
            $("#answer-holder").html("What are you thinking? The Correct Answer Is: " + answer[count]);
            displayImage();
            incorrect++;
            count++;
        }

        checkGameEnd();
    }

    // End Game
    function checkGameEnd() {
        if (count === question.length) {
            $("#time-holder").hide();
            showResults();
            count = 0;
            $(".start").show();
            $(".start").on("click", function () {
                resetResults();
                startGame();
            });
        }
    }

    function resetTime() {
        time = 26;
    }

    function displayTime() {
        time--;
        $("#time-holder").html("Time remaining: " + time);

        if (time <= 0) {
            hideHolders();
            stopTime();
            $("#answer-holder").show();
            $("#answer-holder").html("You're SLOW!! The Correct Answer Is: " + answer[count]);
            displayImage();
            unanswered++;
            count++;
            checkGameEnd();
        }
    }

    function startTime() {
        clearInterval(ticker);
        ticker = setInterval(displayTime, 1000);
    }

    function stopTime() {
        clearInterval(ticker);
        resetTime();
        if (count < question.length - 1) {
            setTimeout(startTime, 2000);
            setTimeout(displayQuestion, 3000);
        }
    }

    resetTime();

    // Display Images With Answer
    //Figure out why its not functioning correctly////
    //Wont display correctly on correct/ wrong answers//
    

    // Show Results Function   
    function showResults() {
        $("#correct-holder").show();
        $("#correct-holder").html("Correct: " + correct);
        $("#incorrect-holder").show();
        $("#incorrect-holder").html("Incorrect: " + incorrect);
        $("#unanswered-holder").show();
        $("#unanswered-holder").html("Unanswered: " + unanswered);
        $("#restart-holder").show();
        $("#restart-holder").html("Click Start above to play again!");
    }

    // Reset 
    function resetResults() {
        correct = 0;
        incorrect = 0;
        unanswered = 0;
    }

    // Start Game
    function startGame() {
        $(".start").hide();
        startTime();
        displayQuestion();
    }

    
    $(".start").on("click", function () {
        startGame();
    });
});