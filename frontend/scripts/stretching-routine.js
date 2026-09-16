const routine = JSON.parse(sessionStorage.getItem("routine") || "[]");

let timerId = null;
let currentExerciseIndex = 0;
let remainingSeconds =
  routine.length > 0 ? routine[currentExerciseIndex].duration : 0;

const timerElement = document.getElementById("timer");
const currentExerciseElement = document.getElementById("current-exercise");
const stopStretchingRoutineButton = document.getElementById(
  "stop-stretching-routine",
);
const completedExercises = [];

stopStretchingRoutineButton.addEventListener("click", async () => {
  try {
    clearInterval(timerId);
    console.log("Stopping stretching routine...");
    sessionStorage.setItem(
      "completedExercises",
      JSON.stringify(completedExercises),
    );
    sessionStorage.setItem("finishedRoutine", false);
    window.location.href = "summary.html";
  } catch (error) {
    console.error("Failed to stop stretching routine:", error);
  }
});

function renderCurrentExercise() {
  const currentExercise = routine[currentExerciseIndex];
  remainingSeconds = currentExercise.duration;
  currentExerciseElement.textContent = `Current Exercise: ${currentExercise.name}`;
}

function nextExercise() {
  if (currentExerciseIndex < routine.length - 1) {
    currentExerciseIndex++;
    renderCurrentExercise();
    timerElement.textContent = `Current: ${remainingSeconds}s`;
  } else {
    clearInterval(timerId);
    console.log("Stretching routine completed.");
    sessionStorage.setItem(
      "completedExercises",
      JSON.stringify(completedExercises),
    );
    sessionStorage.setItem("finishedRoutine", true);
    window.location.href = "summary.html";
  }
}

function startTimer() {
  clearInterval(timerId);
  timerElement.textContent = `Current: ${remainingSeconds}s`;
  timerId = setInterval(() => {
    remainingSeconds--;
    if (remainingSeconds < 0) {
      let exercise = routine[currentExerciseIndex].name;
      let is_break = exercise === "Break";
      if (!is_break) {
        completedExercises.push(exercise);
      }
      nextExercise();
      return;
    }
    timerElement.textContent = `Current: ${remainingSeconds}s`;
  }, 1000);
}

renderCurrentExercise();
startTimer();
