// renderer.js

// functions
function submitResults() {

  const team1 = document.getElementById('name_team1').value;
  const team2 = document.getElementById('name_team2').value;
  const score1 = document.getElementById('score_team1').innerText;
  const score2 = document.getElementById('score_team2').innerText;
  const bestOf = document.getElementById('bestof').innerText;

  const data = { team1, score1, team2, score2, bestOf };

  window.electronAPI.saveResults(data);
}

function updateNumber(elementId, increase) {
  let scoreElement = document.getElementById(elementId);
  let score = parseInt(scoreElement.innerText, 10);
  if (increase)
    scoreElement.innerText = score + 1; 
  else
    if (score > 0 && elementId !== "bestof" || score > 1) scoreElement.innerText = score - 1;
  submitResults();
}

function switchTeams() {
  let team1 = document.getElementById("name_team1").value;
  let team2 = document.getElementById("name_team2").value;
  let score1 = document.getElementById("score_team1").innerText;
  let score2 = document.getElementById("score_team2").innerText;

  document.getElementById("name_team1").value = team2;
  document.getElementById("name_team2").value = team1;
  document.getElementById("score_team1").innerText = score2;
  document.getElementById("score_team2").innerText = score1;

  submitResults();
}

// Team 1
document.getElementById("increase_team1").addEventListener("click", () => updateNumber("score_team1", true));
document.getElementById("decrease_team1").addEventListener("click", () => updateNumber("score_team1", false));
// Team 2
document.getElementById("increase_team2").addEventListener("click", () => updateNumber("score_team2", true));
document.getElementById("decrease_team2").addEventListener("click", () => updateNumber("score_team2", false));
// Bestof
document.getElementById("increase_bestof").addEventListener("click", () => updateNumber("bestof", true));
document.getElementById("decrease_bestof").addEventListener("click", () => updateNumber("bestof", false));

// Settings Buttons
document.getElementById("reset").addEventListener("click", () => {
  const confirmation = confirm("All data will be reset to default.");
  if (confirmation) {
    document.getElementById("name_team1").value = "Team 1";
    document.getElementById("name_team2").value = "Team 2";
    document.getElementById("score_team1").innerText = 0;
    document.getElementById("score_team2").innerText = 0;
    document.getElementById("bestof").innerText = 1;
  }
});

document.getElementById("submit").addEventListener("click", submitResults);

document.getElementById("switch").addEventListener("click", () => switchTeams());

// Shortcuts
window.electronAPI.onSwitchActivateFunction(() => {
  switchTeams();
});
window.electronAPI.onIncreaseTeam1ActivateFunction(() => {
  updateNumber("score_team1", true);
});
window.electronAPI.onDecreaseTeam1ActivateFunction(() => {
  updateNumber("score_team1", false);
});
window.electronAPI.onIncreaseTeam2ActivateFunction(() => {
  updateNumber("score_team2", true);
});
window.electronAPI.onDecreaseTeam2ActivateFunction(() => {
  updateNumber("score_team2", false);
});