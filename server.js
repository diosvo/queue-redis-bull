const express = require("express");
const { PORT } = require("./config");
const cors = require("cors");
const app = express();

app.use(cors());
app.use((_, response, next) => {
  response.header("Access-Control-Allow-Origin", "*");
  response.header(
    "Access-Control-Allow-Methods",
    "GET,PUT,POST,DELETE,PATCH,OPTIONS"
  );
  next();
});

app.get("/", (_, response) => {
  response.sendFile("index.html", { root: __dirname });
});

/* declared routes */

const photosRoute = require("./routes/photos");

/* use those api now !! */

app.use("/photos", photosRoute);

app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}`);
});
