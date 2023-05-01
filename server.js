const express = require("express");
const { PORT } = require("./config");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const swaggerUI = require("swagger-ui-express");
const swaggerJSON = require("./swagger.json");

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

app.use("/", swaggerUI.serve, swaggerUI.setup(swaggerJSON));

/* declared routes */

const photosRoute = require("./routes/photos.route");
const emailRoute = require("./routes/email.route");

/* use those api now !! */

app.use("/email", emailRoute);
app.use("/photos", photosRoute);

app.listen(PORT, () => console.log("\x1b[35m%s\x1b[0m", "[server]", `http://localhost:${PORT}`));
