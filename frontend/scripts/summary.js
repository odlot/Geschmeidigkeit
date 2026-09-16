const finishedRoutine = JSON.parse(
  sessionStorage.getItem("finishedRoutine") || "false",
);
const completedExercises = JSON.parse(
  sessionStorage.getItem("completedExercises") || "[]",
);

let timerId = null;

const summaryElement = document.getElementById("summary");
if (finishedRoutine) {
  summaryElement.innerHTML = `<p>Congratulations! You have completed the routine.</p>`;
} else {
  summaryElement.innerHTML = `<p>You did not finish the routine.</p>`;
}
if (completedExercises.length > 0) {
  const list = document.createElement("ul");
  completedExercises.forEach((exercise) => {
    const listItem = document.createElement("li");
    listItem.textContent = exercise;
    list.appendChild(listItem);
  });
  summaryElement.appendChild(list);
}

const countdownElement = document.getElementById("countdown");
let remainingSeconds = 5;
function startTimer() {
  clearInterval(timerId);
  timerId = setInterval(() => {
    remainingSeconds--;
    if (countdownElement) {
      countdownElement.textContent = remainingSeconds;
    }
    if (remainingSeconds <= 0) {
      clearInterval(timerId);
      window.location.href = "index.html";
    }
  }, 1000);
}
startTimer();
