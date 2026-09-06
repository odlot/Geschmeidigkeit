const stopStretchingRoutineButton = document.getElementById('stop-stretching-routine');

stopStretchingRoutineButton.addEventListener('click', async () => {
    try {
        console.log('Stopping stretching routine...');
        window.location.href = 'index.html';
    } catch (error) {
        console.error('Failed to stop stretching routine:', error);
    }
});