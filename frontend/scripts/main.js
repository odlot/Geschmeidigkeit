const STATUS_COLORS = {
  red: "#e74c3c",
  yellow: "#f1c40f",
  green: "#2ecc71",
};

async function fetchBodyAnatomy(containerSelector, asset, state, muscles) {
  const response = await fetch(asset);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${asset}`);
  }
  const container = document.querySelector(containerSelector);
  container.innerHTML = await response.text();

  for (const muscle of muscles) {
    const element = container.querySelector(`#${muscle.id}`);
    if (!element) continue;
    const status = state[muscle.id];
    element.style.fill = status ? STATUS_COLORS[status] : "#ccc";
    element.setAttribute("aria-label", muscle.name);
    element.addEventListener("click", () => console.log(muscle.name, status));
  }
}

async function renderBodyAnatomy() {
  const [stateResponse, musclesResponse] = await Promise.all([
    fetch("http://127.0.0.1:3000/api/state"),
    fetch("http://127.0.0.1:3000/api/muscles"),
  ]);
  const state = await stateResponse.json();
  const muscles = await musclesResponse.json();
  await Promise.all([
    fetchBodyAnatomy(
      ".body-front",
      "assets/anatomy/body-front.svg",
      state,
      muscles,
    ),
    fetchBodyAnatomy(
      ".body-back",
      "assets/anatomy/body-back.svg",
      state,
      muscles,
    ),
  ]);
}

renderBodyAnatomy();

const startStretchingRoutineButton = document.getElementById(
  "start-stretching-routine",
);

startStretchingRoutineButton.addEventListener("click", async () => {
  try {
    console.log("Starting stretching routine...");
    const response = await fetch("http://127.0.0.1:3000/api/exercises");
    const exercises = await response.json();
    console.log("Fetched exercises:", exercises);
    sessionStorage.setItem("routine", JSON.stringify(exercises));
    window.location.href = "stretching-routine.html";
  } catch (error) {
    console.error("Failed to start stretching routine:", error);
    alert("Failed to start stretching routine. Please try again.");
  }
});
