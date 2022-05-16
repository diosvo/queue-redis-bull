const express = require("express");
const app = express();
const port = 3000;

app.get("/", (_, res) => {
  res.sendFile("index.html", { root: __dirname });
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
