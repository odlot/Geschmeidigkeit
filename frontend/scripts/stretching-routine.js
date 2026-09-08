const routine = JSON.parse(sessionStorage.getItem("routine") || "[]");

let timerId = null;
let currentExerciseIndex = 0;
let remainingSeconds = routine.length > 0 ? routine[currentExerciseIndex].duration : 0;

const currentExerciseElement = document.getElementById('current-exercise');
const stopStretchingRoutineButton = document.getElementById('stop-stretching-routine');

stopStretchingRoutineButton.addEventListener('click', async () => {
    try {
        clearInterval(timerId);
        console.log('Stopping stretching routine...');
        window.location.href = 'index.html';
    } catch (error) {
        console.error('Failed to stop stretching routine:', error);
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
    } else {
        clearInterval(timerId);
        console.log('Stretching routine completed.');
        window.location.href = 'index.html';
    }
}

function startTimer() {
    clearInterval(timerId);
    timerId = setInterval(() => {
        const timerElement = document.getElementById('timer');
        remainingSeconds--;
        if (remainingSeconds <= 0) {
            nextExercise();
        }
        timerElement.textContent = `Current: ${remainingSeconds}s`;
    }, 1000);
}

renderCurrentExercise();
startTimer();