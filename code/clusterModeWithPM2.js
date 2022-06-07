// To start: pm2 start .\clusterModeWithPM2.js -i 0
// To Kill: pm2 delete clusterModeWithPM2
const express = require("express");
const app = express();
app.get("/", (req, res) => {
  let start = Date.now();
  while (Date.now() - start < 5000) {}
  res.send("Slow");
});

app.get("/fast", (req, res) => {
  res.send("This was fast!");
});
app.listen(3000);
