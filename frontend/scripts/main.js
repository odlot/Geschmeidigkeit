const STATUS_COLORS = {
    red: '#e74c3c',
    yellow: '#f1c40f',
    green: '#2ecc71',
};

async function fetchBodyAnatomy(containerSelector, asset, state) {
    const response = await fetch(asset);
    if (!response.ok) {
        throw new Error(`Failed to fetch ${asset}`);
    }
    const container = document.querySelector(containerSelector);
    container.innerHTML = await response.text();
    for (const [id, status] of Object.entries(state)) {
        const element = container.querySelector(`#${id}`);
        if (element) {
            element.style.fill = STATUS_COLORS[status];
        }
    }
}

async function renderBodyAnatomy() {
    const stateResponse = await fetch('http://127.0.0.1:3000/api/state');
    const state = await stateResponse.json();
    await Promise.all([
        fetchBodyAnatomy('.body-front', 'assets/anatomy/body-front.svg', state),
        fetchBodyAnatomy('.body-back', 'assets/anatomy/body-back.svg', state),
    ]);
}

renderBodyAnatomy();

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