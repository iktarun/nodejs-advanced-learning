const cluster = require("cluster");
const express = require("express");
const totalCPUs = require("os").cpus().length;
cluster.schedulingPolicy = cluster.SCHED_RR;
console.log(cluster.isMaster);

// Is the file is being executed in cluster mode, if yes then fork child?
//Cluster manager itself will not execute the code instead it will fork a new child to do that
if (cluster.isMaster) {
  console.log(`Number of CPUs is ${totalCPUs}`);
  console.log(`Master ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < totalCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
    console.log("Let's fork another worker!");
    cluster.fork();
  });
} else {
  const app = express();

  console.log(`Worker ${process.pid} started`);

  app.get("/", (req, res) => {
    let start = Date.now();
    while (Date.now() - start < 5000) {}
    res.send("Slow");
  });

  app.get("/fast", (req, res) => {
    console.log("Fast Request recieved");
    res.send("This was fast!");
  });

  app.listen(3002, () => {
    console.log(`App listening on port ${3002}`);
  });
}
