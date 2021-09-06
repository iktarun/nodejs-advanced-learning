// process.env.UV_THREADPOOL_SIZE;
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
