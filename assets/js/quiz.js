console.log("Inside Quiz Js");

const question = document.getElementById("question");
let choiceA = document.getElementById ("optiona");
let choiceB = document.getElementById ("optionb");
let choiceC = document.getElementById ("optionc");
let choiceD = document.getElementById ("optiond");
let revealAnswer = document.getElementById ("answer");
let timerElement = document.getElementById ("timer-count");

//Globals
let currentQuestion ={}; //holds current question
let userScore = 0;  //keeps count of the current score
let questionCounter;
let questionMax = 4;
let availableQuestions = [];//copy of question array
let timer;
let QuizTime = 60;
let timerCount = QuizTime;


let questions = [
  {
    "id": "1",
    "question": "Which of the following attributes is not needed when linking a CSS stylesheet?",
    "choice1": "<type>",
    "choice2": "<src>",
    "choice3": "<rel>",
    "choice4": "<href>",
    "answer": "optiond"
  },
  {
    "id": "2",
    "question": "Which of the following tags is used for inserting the largest heading in HTML?",
    "choice1": "head",
    "choice2": "heading",
    "choice3": "<h6>",
    "choice4": "<h1>",
    "answer": "optiond"
  },
  {
    "id": "3",
    "question": "Which HTML tag is used to insert an image?",
    "choice1": "<img url=”htmllogo.jpg” />",
    "choice2": "<img alt=”htmllogo.jpg” />",
    "choice3": " <img src=”htmllogo.jpg” />",
    "choice4": "<img link=”htmllogo.jpg” />",
    "answer": "optionc"
  },
  { "id": "4",
    "question": "What does DOM stand for?",
    "choice1": "Document Object Model",
    "choice2": "Document Over Model",
    "choice3": "Diving Over Medium",
    "choice4": "Document Object Meta",
    "answer": "optiona"
}
];

function startQuiz() {
  questionCounter = 0;
  userScore = 0;
  /* Create acopy of the question: JSON apprroach clones the contents
   of the array, not just the array itself. */
  availableQuestions = JSON.parse(JSON.stringify(questions));
  console.log(availableQuestions);

  //render first question
  getNewQuestion();

  //start the quiz timer
  startTimer()
}
//
function startTimer() {
  // Sets timer
  timer = setInterval(function() {
    timerCount--;
    timerElement.textContent = timerCount;
    if (timerCount >= 0) {
      // Tests if win condition is met
      if (questionCounter == questionMax && timerCount > 0) {
        // Clears interval and stops timer
        clearInterval(timer);
        //Store time, and questions answered to local storage

        //call EndQuiz() switch to end page
        
        endQuiz();
      }
    }
    // Tests if time has run out
    if (timerCount === 0) {
      // Clears interval
      clearInterval(timer);
      //change to Quiz over and scores page
      endQuiz();
    }
  }, 1000);
}

//Local storage is used to hold the user time and score so they can be accessed in the game over page
function setLocalStorage() {
  //set  questions answered
  localStorage.setItem("localUserScore", userScore);
  //set time to answer questions
  localStorage.setItem("localTimeCount", QuizTime - timerCount);
  console.log(userScore + "  " + timerCount);
}

//Store scores and time to local storage 
//change to quiz over page
function endQuiz() {
  setLocalStorage();
  //add a delay before transitioning the quiz over page
  setTimeout(function() {window.location.href = "../../quizOverPage.html"} ,1000);
} 

function getNewQuestion() {
//keeps track of number of questions asked
questionCounter++;
//clear answer reveal
revealAnswer.textContent = " ";

var questionIndex = Math.floor(Math.random()*availableQuestions.length);
currentQuestion = availableQuestions[questionIndex];

//render questions 
question.textContent = currentQuestion.question;
console.log(currentQuestion);
optiona.textContent = currentQuestion.choice1;
optionb.textContent = currentQuestion.choice2;
optionc.textContent = currentQuestion.choice3;
optiond.textContent = currentQuestion.choice4;

//remove question from available array so it's not repeated
availableQuestions.splice(questionIndex, 1);

}


startQuiz();
console.log(currentQuestion);

choiceA.addEventListener("click", checkQuestion);
choiceB.addEventListener("click", checkQuestion);
choiceC.addEventListener("click", checkQuestion);
choiceD.addEventListener("click", checkQuestion);

function checkQuestion(event) {
  console.log("inside checkquestion()");
  acceptingAnswers = false;
  
  if(event.target.id == currentQuestion.answer){
    console.log(true);
    //increment user score
    userScore++;
    revealAnswer.textContent = "Correct Answer";
    console.log(event.target.id);
  } else if(event.target.id != currentQuestion.answer){
    console.log(false);
    revealAnswer.textContent = "Wrong Answer";
    timerCount = timerCount - 10;
    //Deduct 10 seconds from the timer for an incorrect answer
  } else{console.log("problem");}

 //Adds a delay so user can see right/wrong answer before changing to next question 
 setTimeout(function() {getNewQuestion()} ,1000);
} 



