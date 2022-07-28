console.log("Inside Quiz OVer Page!");
//Get correct questions and timer from local storage
var userTimer = document.querySelector(".timer");
var userCorrectAnswers = document.querySelector(".correctAnswers");
var storedAnswers = localStorage.getItem("localUserScore");
var storedTime = localStorage.getItem("localTimeCount");

console.log(storedAnswers + " " + storedTime);
//storedTime =12;
//storedAnswers=3;
userTimer.textContent = storedTime;
userCorrectAnswers.textContent = storedAnswers;

/********************Save last score*************** */
var userInitials = document.getElementById("initials");
var saveBtn = document.getElementById("save");

function saveLastScore() {
  // Save related form data as an object
  var userScore = {
    initials: userInitials.value,
    time: storedTime,
    score: storedAnswers
  };
  // Use .setItem() to store object in storage and JSON.stringify to convert it as a string
  localStorage.setItem("userScore", JSON.stringify(userScore));
}


/************render last score***************/
var userInitials = document.getElementById("initials");




saveBtn.addEventListener("click", function(event) {
  event.preventDefault();
  saveLastScore();
  setTimeout(function() {window.location.href = "highScoresPage.html"} ,500);
  });

  RestartQuizBtn.addEventListener("click", function(event) {
    event.preventDefault();
    window.location.href = "index.html";
    });