const http = require('node:http');
const path = require('node:path');
const fs = require('node:fs');

const hostname = '127.0.0.1';
const port = 3000;
const allowed_origin = `http://[::]:8080`;

const server = http.createServer((req, res) => {
    const origin = req.headers.origin;
    if (origin && origin === allowed_origin) {
        res.setHeader('Access-Control-Allow-Origin', allowed_origin);
        res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    }
    
    if (req.method === "OPTIONS") {
        res.statusCode = 204;
        res.end();
        return;
    }
    
    const url = new URL(req.url, `http://${req.headers.host}`);
    if (req.method === "GET" && url.pathname === "/api/exercises") {
        const filePath = path.join(__dirname, "data", "exercises.json");
        const exercises = JSON.parse(fs.readFileSync(filePath, "utf8"));
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(exercises));
        return;
    }
    res.statusCode = 404;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ error: 'Not Found' }));
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});