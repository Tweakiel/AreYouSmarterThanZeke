const quizQuestions = [
  {
    question: "What is the correct way to declare a variable in JavaScript?",
    choices: [
      "var myVar = 'hello';",
      "myVar = 'hello';",
      "variable myVar = 'hello';",
      "let myVar = 'hello';",
    ],
    answer: "4",
  },
  {
    question: "What is the output of the following code? console.log(3 + '4');",
    choices: ["7", "'7'", "'34'", "12"],
    answer: "3",
  },
  {
    question: "What is the correct way to write an if statement in JavaScript?",
    choices: ["if (x == 5) {", "if x = 5 {", "if (x === 5)", "if x == 5"],
    answer: "1",
  },
  {
    question:
      "What is the output of the following code? var arr = [1, 2, 3]; console.log(arr.length);",
    choices: ["0", "1", "2", "3"],
    answer: "4",
  },
  {
    question: "What is the correct way to write a function in JavaScript?",
    choices: [
      "function myFunction() {",
      "myFunction = function() {",
      "def myFunction() {",
      "let myFunction = function() {",
    ],
    answer: "1",
  },
];

//Global variables for the timer & buttons
let currentTime = document.querySelector(".current-time");
let timer = document.querySelector(".start-button");
let resetButton = document.querySelector("#reset-button");
let submitButton = document.querySelector("#submit-button");
let timerCount = 61;
let timerPenalty = 10;
let holdInterval = 0;
let score = 0;

//Global variables for the question function
let questionArea = document.querySelector("#questionArea");
let questionText = document.querySelector("#questionText");
let introduction = document.querySelector("#introduction");
let questionIndex = 0;

//Global variables for added text for High Scores
let questionEl = document.createElement("div");
let scoreEl = document.getElementById("final-score");
let highScoresEl = document.getElementById("high-scores");
let initEl = document.getElementById("initials");

//Function to countdown timer and display it on the browswer
function startTimer() {
  introduction.classList.add("hide");
  questionArea.classList.remove("hide");
  timer.classList.add("hide");
  renderQuestions();
  holdInterval = setInterval(function () {
    timerCount--;
    currentTime.textContent = "Time left: " + timerCount;
    if (timerCount <= 0) {
      clearInterval(holdInterval);
      currentTime.textContent = "Out of Time";
      endQuiz();
    }
  }, 1000);
}

//When start button clicked, calls startTimer function
timer.addEventListener("click", startTimer);

//function to check the user input against the answer array, add either to score or penalize time
function checkAnswer(index) {
  let currentQuestion = quizQuestions[questionIndex];
  if (currentQuestion.answer === index) {
    score++;
  } else {
    timerCount = timerCount - timerPenalty; //takes 10 seconds off for wrong answer
  }
  questionIndex++;
  if (questionIndex < quizArray.length) {
    renderQuestions();
  } else {
    endQuiz();
  }
}

// Function to render questions/options as buttons
function renderQuestions() {
  let currentQuestion = quizArray[questionIndex];
  questionText.textContent = currentQuestion.question;
  for (var i = 0; i < currentQuestion.options.length; i++) {
    var choice = currentQuestion.options[i];
    let buttonEl = document.getElementById("button" + i);
    buttonEl.textContent = choice;
  }
}

// Function to retrieve previous high scores from local storage
function showAllScores() {
  var existingScores = JSON.parse(localStorage.getItem("high-score")) || [];
  var scoreHTML = ``;
  for (var i = 0; i < existingScores.length; i++) {
    var scoreObj = existingScores[i];
    scoreHTML += `
    <li>Initials: ${scoreObj.initials}  Score: ${scoreObj.finalScore}</li>
    `;
  }
  var scoreListEl = document.getElementById("score-list");
  scoreListEl.innerHTML = scoreHTML;
}

//Function to to add new highscore to local storage
function addNewScore() {
  var existingScores = JSON.parse(localStorage.getItem("high-score")) || [];
  var initials = initEl.value;
  var scoreObj = { initials: initials, finalScore: score };
  existingScores.push(scoreObj);
  localStorage.setItem("high-score", JSON.stringify(existingScores));
  showAllScores();
}

//Function to end the Quiz, and show score
function endQuiz() {
  questionArea.classList.add("hide");
  scoreEl.classList.remove("hide");
  scoreEl.textContent = "You scored " + score + " out of 5 correctly!";
  highScoresEl.classList.remove("hide");
  clearInterval(holdInterval);
  currentTime.classList.add("hide");
}
