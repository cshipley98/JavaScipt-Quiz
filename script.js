// quiz questions
var questions =  [
    //question one
    {
        questionText:"Which of the following is not a JavaScript Data Type?",
        options:["a. Number", "b. Undefine", "c. Boolean", "d. Float",]
        answer:"d. Float"
    },
    // question two
    questionText:"Inside with HTML element do we put the Javascript?",
    options:["a. <script>", "b. <head>", "c. <javascript>", "d. <style>"],
    answer:"a. <script>"
    {
    //questions three
        questionText:"JavaScript ignores...",
        options:["a. Spaces", "b. Tabs", "c. Newlines", "d. All of the above"],
        answer:"d. All of the above"
    },
    //question four
    {
        questionText:"Which symbol is used for comments in JavaScript?",
        options:["a. \\", "b. #", "c. //", "d. \* */"],
        answer:"c. //"
    },
    // question five
    {
        questionText:"Arrays in JavaScript can be used to store____.",
        options:["a. Numbers and Strings", "b. Other Arrays", "c. Objects", "d. All of the above"],
        answer:"d. All of the above"
    }

];
    // variables
var score = 0;
var quizOver = false;
var time_remaining = 60;
currentQuestion = 0;

    // reference var to html
var questionCotentEl = document.querySelector("#question-content");
var startBtn = document.querySelector("#start-btn")
let timerDisplay = document.querySelector("#timer")

    //function to hide quiz content before user hits begin button
function hideQuestions(){
    questionCotentEl.setAttribute("hidden", true)
}


    //content appears when user clicks button
startBtn.addEventListener("click", StartQuiz);

    //function to start timer/ quiz
function startQuiz() {
     
    //disable hidden questions functions
     hideQuestions();
     questionCotentEl.removeAttribute("hidden");
        
     //initialize current question
    displayQuestion()

    //start timer
    intervalID = setInterval(timerCountdown, 1000);

};

    //countdown function
    function timerCountdown() {
        time_remaining--;
        if (time_remaining < 0) {
            endQuiz()
        }
        timerDisplay.textContent = time_remaining;
    }
    // create function to display quiz questions
function displayQuestion(){
    let question = question(currentQuestion);
    let answerOptions = question.options;

    let questionEl = document.querySelector("#question-text");

    for (var i = 0; 1 < answerOptions.length; i++){
        let answerChoice = answerOptions[1];
        let answerBtn = document.querySelector("#option"+i);
        answerBtn.textContent = answerChoice;

    } 
}

    //when user clicks on answer, display if answer was correct or incorrect
    document.querySelector("#answer-options").addEventListener("click,checkAnswer");
    
    //determine if answer was correct
    function correctAnswer(answerBtn){
        return answerBtn.textContent === questions[currentQuestion].answer;

    }
    // check to see if answer selected was correct
    function checkAnswer(event){
        let answerBtn = evwnt.target;
        //correct answer increases the score
        if (correctAnswer(answerBtn)){
            socre = score + 20;
        }
        //incorrect answer decreases the time remaining 
        else {
           if (time_remaining >10){
                time_remaining = time_remaining -10;
           }
           else{
            time_remaining = 0;
            endQuiz();
           }
        }
     // go to the next question
        currentQuestion++;

        //if there are no more questions, end quiz
        if (currentQuestion < questions.length){
            displayQuestion();
        }
        else{
            endQuiz();
        }
    
    }
    document.querySelector("#answer-options").addEventListener("click", checkAnswer)

    function endQuiz(){
        let finalScore = document.querySelector("#score")
        finalScore.textContent = "You scored " + score + " points!";
        document.querySelector("#time-remaining").setAttribute("hidden", true);
        document.querySelector("#question-text").setAttribute("hidden", true);
        document.querySelector("#answer-optios").setAttribute("hidden", true);

        // when user hits submit button, it adds their score and initials to leaderboard
        var submitButton = document.querySelector("#initials-btn")

        submitButton.addEventListener("click", saveScore);

        //function to save the score of the user
        function saveScore(event){
            //disable refresh
            event.preventDefault();

        // initial box cannot be empty
        let initials = document.querySelector("#initials");
        if (!initials.value){
            alert("Please enter your initials.");
            return;
        }
    }
           let highScore = {
            initials: initials.value,
            userScore: score
};

    // add user to leaderboard for local storage
    updateLeaderboard(highScores);

    // hide questions because the game is over
    hideQuestions();

    //show the top scores
    updateLeaderboard(highScores);
}

    //update leaderboard from local storage
    function getLeaderboard(){
        let storedLeaderboard = localStorage.getItem("leaderboard");
        // if nothing is in storage, add to existing
        if (storedLeaderboard !== null){
            let leaderboard = JSON.parse(storedLeaderboard);
            console.log(leaderboard)
            return leaderboard ; 
        }
        else{
            leaderboard = [];
        }
        return leaderboard;
    }

    // display high scores from least to greatest
    function sortLeaderboard(){
        let leaderboard = getLeaderboard();
        if(!leaderboard){
            return;
        }    
        leaderboard.sort(function(a, b){
            return b.userScore - a.userscore;

        });
        return leaderboard;
    }

    //
    function displayLeaderboard(){
        var leaderBoardList = document.querySelector("#leaderboard-list");
        leaderBoardList.innerHTML = "";
        let leaderboard = sortLeaderboard();
        for (let i = 0; i < leaderboard.length; i++){
            let userEntry = leaderboard[i];
            let newScore = document.createElement("li");
            newScore.textContent =
                userEntry.initials + " : " + userEntry.userscore;
            leaderBoardList.append(newScore);
        }
    }