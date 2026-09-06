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