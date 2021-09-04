const cluster = require("cluster");

console.log(cluster.isMaster);

if (cluster.isMaster) {
  cluster.fork();
  cluster.fork();
} else {
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
}
