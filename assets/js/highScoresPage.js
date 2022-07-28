function renderLastScore() {
  // Use JSON.parse() to convert text to JavaScript object
  var lastScore = JSON.parse(localStorage.getItem("userScore"));
  // Check if data is returned, if not exit out of the function
  if (lastScore !== null) {
  document.getElementById("saved-initials").innerHTML = lastScore.initials;
  document.getElementById("saved-score").innerHTML = lastScore.score;
  document.getElementById("saved-time").innerHTML = lastScore.time;
  } else {
    return;
  }
}
renderLastScore();

clearhighscoresBtn.addEventListener("click", function(event) {

  document.getElementById("saved-initials").innerHTML = "";
  document.getElementById("saved-score").innerHTML = 0;
  document.getElementById("saved-time").innerHTML = 0;
   
  });

  RestartQuizBtn.addEventListener("click", function(event) {
    event.preventDefault();
    window.location.href = "../../index.html";
    });