const cluster = require("cluster");

console.log(cluster.isMaster);

if (cluster.isMaster) {
  cluster.fork();
  cluster.fork();
} else {
  const express = require("express");
  const app = express();
  const crypto = require("crypto");
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
// const Worker = require('webworker-threads').Worker;

// app.get("/", (req, res) => {
//   const worker = new Worker(function () {
//     this.onmessage = function () {
//       let counter = 0;
//       while (counter < 1e9) {
//         counter++;
//       }

//       postMessage(counter);
//     };
//   });

//   worker.onmessage = function (message) {
//     console.log(message.data);
//     res.send("" + message.data);
//   };

//   worker.postMessage();
// });