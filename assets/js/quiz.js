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
let questionMax = 11;
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
},
{ "id": "5",
    "question": "Which of the following methods is used to access HTML elements using Javascript?",
    "choice1": "getElementbyId()",
    "choice2": "getElementsByClassName()",
    "choice3": "Both A and B",
    "choice4": "None of the above",
    "answer": "optionc"
},
{ "id": "6",
    "question": "How can a datatype be declared to be a constant type?",
    "choice1": "var",
    "choice2": "const",
    "choice3": "let",
    "choice4": "constant",
    "answer": "optionb"
},
{ "id": "7",
    "question": "What is the correct order for the CSS box model when going from the inner to the outermost components?",
    "choice1": "Padding, content, margins, border",
    "choice2": "Content, padding, border, margins",
    "choice3": "Padding, content, border, margins",
    "choice4": "Content, border, padding, margins",
    "answer": "optionb"
},
{ "id": "8",
    "question": "Which function is used to serialize an object into a JSON string in Javascript?",
    "choice1": "stringify()",
    "choice2": "parse()",
    "choice3": "convert()",
    "choice4": "None of the above",
    "answer": "choicea"
},
{ "id": "9",
    "question":"When selecting a specific class in CSS, what symbol should precede the class name? ",    
    "choice1": "*",
    "choice2": "#",
    "choice3": ".",
    "choice4": "::",
    "answer": "optionc"
},
{ "id": "10",
    "question": "What is the difference between em and vw in CSS?",
    "choice1": "There are no fundamental differences between em and vw",
    "choice2": "em handles the viewport width, while vw handles the viewport height",
    "choice3": "em refers to the viewport width, while vw handles font scaling",
    "choice4": "em refers to font scaling, while vw is a percentage width of the viewport",
    "answer": "optiond"
},
{ "id": "11",
    "question": "Which of the following HTML elements is a self-closing tag?",
    "choice1": "<body>",
    "choice2": "<li>",
    "choice3": "<img>",
    "choice4": "<a>",
    "answer": "option"
}
];

function startQuiz() {
  questionCounter = 0;
  userScore = 0;
  /* Create a copy of the question object: JSON approach clones the contents
   of the array, not just the array itself. The copy is used to select a question randomly
   which is then deleted so its not reslected*/
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

  //keeps track of number of questions asked
  questionCounter++;
 //Adds a delay so user can see right/wrong answer before changing to next question 
 setTimeout(function() {getNewQuestion()} ,1000);
} 



