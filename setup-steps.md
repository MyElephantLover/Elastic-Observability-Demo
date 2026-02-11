## Install Node.js

```
curl -fsSL https://rpm.nodesource.com/setup_18.x | sudo bash -
sudo yum install -y nodejs
```

## Create the demo app

```
mkdir -p ~/demo-app && cd ~/demo-app
npm init -y
npm i express pino

```