var quizPrompt = document.querySelector("#start-screen");
var startBtn = document.querySelector(".startBtn");
var timeLeft = document.querySelector("#time-left");
var highScores = document.querySelector("#high-scores");
var quizSection = document.querySelector("#quiz-holder");
var leaderBoard = document.querySelector(".leader-board");
var scoreList = document.querySelector("#score-list");
var nameInput = document.querySelector("#name");
var scoreForm = document.querySelector("#score-form");
var submitButton = document.querySelector(".submit-button");
var timeSection = document.querySelector("#time-left");
var questionHolder = document.querySelector("#question-element");
var answerHolder = document.querySelector("#answer-holder");

var timer = "";
var timerCount = 100;
var gameEnd = true;
var correctAnswers = 0;
var leaders = [];
var questionIdx = 0;
var questionsBase = [
  {
    question: "Who led MLB in homeruns in 2022?",
    correct: "Aaron Judge",
    choices: [
      "Aaron Judge",
      "Kyle Schwarber",
      "Paul Goldschmidt",
      "Shohei Ohtani",
    ],
  },
    {
      question: "Which team is not in the American League?",
      correct: "Mets",
      choices: ["Yankees", "Mets", "Orioles", "Angels"],
    },
    {
      question: "Which team won the 2021 World Series?",
      correct: "Braves",
      choices: ["Dodgers", "Astros", "Cardinals", "Braves"],
    },
    {
      question: "What milestone did Albert Pujols achieve in 2022?",
      correct: "700 career homeruns",
      choices: [
        "3000 hits",
        "Most games ever played",
        "700 career homeruns",
        "Most RBIs in MLB history",
      ],
    },
    {
      question: "Who has the record for most career homeruns?",
      correct: "Barry Bonds",
      choices: ["Barry Bonds", "Babe Ruth", "Albert Pujols", "Hank Aaron"],
    },
    {
      question: "Who won the Homerun Derby in 2022?",
      correct: "Juan Soto",
      choices: ["Julio Rodriguez", "Juan Soto", "Aaron Judge", "Albert Pujols"],
    },
    {
      question: "What team had the highest total attendance in 2022?",
      correct: "Dodgers",
      choices: ["Yankees", "Cardinals", "Dodgers", "Braves"],
    },
    {
      question: "What team is not in the National League?",
      correct: "Astros",
      choices: ["Giants", "Astros", "Padres", "Marlins"],
    },
    {
      question: "Who led MLB in strikeouts in 2022?",
      correct: "Gerrit Cole",
      choices: [
        "Shohei Ohtani",
        "Justin Verlander",
        "Gerrit Cole",
        "Clayton Kershaw",
      ],
    },
    {
      question: "Who has the most hits in MLB history?",
      correct: "Pete Rose",
      choices: ["Pete Rose", "Ty Cobb", "Derek Jeter", "Ichiro Suzuki"],
    },
];

function startQuiz() {
  quizPrompt.classList.add("hide");
  quizSection.classList.remove("hide");
  timeSection.classList.remove("hide");

  timer = setInterval(function () {
    if (timerCount > 0) {
      timerCount--;
      timeLeft.textContent = timerCount;
    } else if (timerCount <= 0) {
      alert("Time's Up!!!");
      clearInterval(timer);
      return endQuiz();
    }
  }, 1000);
  displayQuestion();
}

function displayQuestion() {
  questionHolder.innerHTML = questionsBase[questionIdx].question;
  answerHolder.innerHTML = "";
  for (let i = 0; i < questionsBase[questionIdx].choices.length; i++) {
    var button = document.createElement("button");
    button.innerHTML = questionsBase[questionIdx].choices[i];
    answerHolder.appendChild(button);
    button.addEventListener("click", checkIfRight);
  }
}

function checkIfRight(event) {
  event.preventDefault();
  var answer = event.target.innerHTML;
  if (answer === questionsBase[questionIdx].correct) {
    alert("Correct! Good Job!");
    correctAnswers++;
  } else {
    alert("That is incorrect! You lost 10 seconds!");
    timerCount -= 10;
  }

  checkIfOver();
}

function checkIfOver() {
  if (questionIdx === questionsBase.length - 1) {
    clearInterval(timer);
    return endQuiz();
  } else {
    questionIdx++;
    displayQuestion();
  }
}

function endQuiz() {
  quizSection.classList.add("hide");
  highScores.classList.remove("hide");
}

function renderScores() {
  scoreList.innerHTML = "";

  var leaders = JSON.parse(localStorage.getItem("highscores"));
  for (var i = 0; i < leaders.length; i++) {
    var leader = leaders[i];
    var li = document.createElement("li");
    li.textContent = leader.name + ": " + leader.score;
    li.setAttribute("data-index", i);

    scoreList.appendChild(li);
  }
}

function init() {
    if (localStorage.getItem("highscores")){
    renderScores();
    }
}

function storeScores(score) {
  localStorage.setItem("highscores", JSON.stringify(score));
}

submitButton.addEventListener("click", function (event) {
  event.preventDefault();
  var nameText = { name: nameInput.value.trim(), score: correctAnswers };
  var scores = JSON.parse(localStorage.getItem("highscores")) || [];
  scores.push(nameText);
  nameInput.value = "";

  storeScores(scores);
  renderScores();
});

startBtn.addEventListener("click", startQuiz);

init();