## Step-1: Install Node.js

```
curl -fsSL https://rpm.nodesource.com/setup_18.x | sudo bash -
sudo yum install -y nodejs
```

## Step-2: Create the demo app

```
mkdir -p ~/demo-app && cd ~/demo-app
npm init -y
npm i express pino

```

### Create app.js:

```
cat > app.js <<'EOF'
const express = require("express");
const pino = require("pino");

const log = pino({ base: null, timestamp: () => `,"@timestamp":"${new Date().toISOString()}"` });
const app = express();
const PORT = process.env.PORT || 3000;

let errorRate = Number(process.env.ERROR_RATE || 0.1);
let maxLatencyMs = Number(process.env.MAX_LATENCY || 1200);

app.get("/", (req, res) => res.send("Soha demo app up. Try /checkout"));

app.get("/checkout", (req, res) => {
  const start = Date.now();
  const latency = Math.floor(Math.random() * maxLatencyMs);

  setTimeout(() => {
    const isError = Math.random() < errorRate;
    const durationMs = Date.now() - start;

    const payload = {
      service: "checkout",
      path: "/checkout",
      duration_ms: durationMs,
      status: isError ? 500 : 200,
      user_id: `u${Math.floor(Math.random() * 1000)}`,
      cart_value: Number((Math.random() * 300).toFixed(2))
    };

    if (isError) {
      log.error(payload, "Checkout failed (simulated)");
      res.status(500).send("Checkout failed");
    } else {
      log.info(payload, "Checkout success");
      res.status(200).send("Checkout ok");
    }
  }, latency);
});

app.post("/config/error-rate/:rate", (req, res) => {
  errorRate = Math.max(0, Math.min(1, Number(req.params.rate)));
  log.warn({ errorRate }, "Updated error rate");
  res.json({ errorRate });
});

app.post("/config/max-latency/:ms", (req, res) => {
  maxLatencyMs = Math.max(0, Number(req.params.ms));
  log.warn({ maxLatencyMs }, "Updated max latency");
  res.json({ maxLatencyMs });
});

app.listen(PORT, () => log.info({ port: PORT, errorRate, maxLatencyMs }, "Soha demo app started"));
EOF

```

### Install dependencies

```
npm init -y
npm i express pino

```


## Step 3 — Run the app

```
node app.js
```
