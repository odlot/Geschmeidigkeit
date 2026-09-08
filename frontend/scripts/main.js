async function fetchFrontBodyAnatomy() {
    const asset = 'assets/anatomy/body-front.svg';
    const response = await fetch(asset);
    if (!response.ok) {
        throw new Error(`Failed to fetch ${asset}`);
    }
    const container = document.querySelector('.body-front');
    container.innerHTML = await response.text();
}

fetchFrontBodyAnatomy();

const startStretchingRoutineButton = document.getElementById('start-stretching-routine');

startStretchingRoutineButton.addEventListener('click', async () => {
    try {
        console.log('Starting stretching routine...');
        const response = await fetch('http://127.0.0.1:3000/api/exercises');
        const exercises = await response.json();
        console.log('Fetched exercises:', exercises);
        sessionStorage.setItem('routine', JSON.stringify(exercises));
        window.location.href = 'stretching-routine.html';
    } catch (error) {
        console.error('Failed to start stretching routine:', error);
        alert('Failed to start stretching routine. Please try again.');
    }
});