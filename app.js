const http = require("http");

const server = http.createServer((req, res) => {
  if (req.url === "/health") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    return res.end("OK");
  }

  res.writeHead(200, { "Content-Type": "text/html" });
  res.end(`
    <h1>Production DevOps Application</h1>
    <p>GitHub + Jenkins + Docker + Kubernetes + Helm</p>
    <p>Status: Running successfully!</p>
  `);
});

server.listen(3000, "0.0.0.0", () => {
  console.log("Application running on port 3000");
});