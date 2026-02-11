// APM must be the first thing that runs
require("elastic-apm-node").start({
  serviceName: "checkout-demo",
  serverUrl: process.env.ELASTIC_APM_SERVER_URL,
  apiKey: process.env.ELASTIC_APM_API_KEY, // recommended
  environment: "dev",
});

const http = require("http");

const server = http.createServer((req, res) => {
  const delay = Math.random() * 2000;

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

server.listen(3000, () => console.log("Demo app running on port 3000"));
