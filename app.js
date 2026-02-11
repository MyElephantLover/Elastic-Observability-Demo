const http = require("http");

const server = http.createServer((req, res) => {
  const delay = Math.random() * 2000; // random latency

  setTimeout(() => {
    if (Math.random() < 0.1) {
      console.error("Checkout ERROR at", new Date());
      res.writeHead(500);
      res.end("Checkout failed");
    } else {
      console.log("Checkout success at", new Date());
      res.writeHead(200);
      res.end("Checkout OK");
    }
  }, delay);
});

server.listen(3000, () => {
  console.log("Demo app running on port 3000");
});
