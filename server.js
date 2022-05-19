const express = require("express");
const { PORT } = require("./config");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use((_, response, next) => {
  response.header("Access-Control-Allow-Origin", "*");
  response.header(
    "Access-Control-Allow-Methods",
    "GET,PUT,POST,DELETE,PATCH,OPTIONS"
  );
  next();
});

app.get("/", async (_, response) => {
  response.sendFile("index.html", { root: __dirname });
});

/* declared routes */

const photosRoute = require("./routes/photos.route");
const emailRoute = require("./bull/events/email.route");

/* use those api now !! */

app.use("/email", emailRoute);
app.use("/photos", photosRoute);

app.listen(PORT, () => console.log(`Listening at http://localhost:${PORT}`));
