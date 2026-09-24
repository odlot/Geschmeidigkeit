const http = require("node:http");
const path = require("node:path");
const fs = require("node:fs");

const hostname = "127.0.0.1";
const port = 3000;
const allowed_origin = `http://[::]:8080`;

const jsonRoutes = {
  "/api/state": "state.json",
  "/api/muscles": "muscles.json",
};

const server = http.createServer((req, res) => {
  const origin = req.headers.origin;
  if (origin && origin === allowed_origin) {
    res.setHeader("Access-Control-Allow-Origin", allowed_origin);
    res.setHeader("Access-Control-Allow-Methods", "OPTIONS, GET");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  }

  if (req.method === "OPTIONS") {
    res.statusCode = 204;
    res.end();
    return;
  }

  const url = new URL(req.url, `http://${req.headers.host}`);
  if (req.method === "GET" && jsonRoutes[url.pathname]) {
    serveJsonFile(res, jsonRoutes[url.pathname]);
    return;
  } else if (req.method === "GET" && url.pathname === "/api/routine") {
    serveRoutine(res);
    return;
  }

  res.statusCode = 404;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify({ error: "Not Found" }));
});

function serveJsonFile(res, filename) {
  const filePath = path.join(__dirname, "data", filename);
  const data = JSON.parse(fs.readFileSync(filePath, "utf8"));
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(data));
}

function serveRoutine(res) {
  const filePath = path.join(__dirname, "data", "exercises.json");
  const data = JSON.parse(fs.readFileSync(filePath, "utf8"));
  const routine = buildRoutine(data);
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(routine));
}

const BREAK_DURATION = 3;

function buildRoutine(exercises) {
  const expandedExercises = exercises.flatMap(expandExercise);
  const routine = [];
  expandedExercises.forEach((exercise, index) => {
    routine.push(exercise);
    if (index < expandedExercises.length - 1) {
      routine.push({ name: "Break", duration: BREAK_DURATION });
    }
  });
  return routine;
}

function expandExercise(exercise) {
  if (exercise.targets.length == 1) {
    return exercise;
  }
  return exercise.targets.map((target) => ({
    name: `${exercise.name} (${sideLabel(target)})`,
    duration: exercise.duration,
    target: target,
  }));
}

function sideLabel(target) {
  if (target.endsWith("-left")) {
    return "Left";
  } else if (target.endsWith("-right")) {
    return "Right";
  }
  return target;
}

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
