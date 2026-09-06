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
        window.location.href = 'stretching-routine.html';
    } catch (error) {
        console.error('Failed to start stretching routine:', error);
    }
});