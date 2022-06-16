import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import swaggerUI from "swagger-ui-express";
import { PORT } from "./config";
import swaggerJSON from "./swagger.json";
const app = express();

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
const emailRoute = require("./routes/email.route");

/* use those api now !! */

app.use("/email", emailRoute);
app.use("/photos", photosRoute);

app.use("/api", swaggerUI.serve, swaggerUI.setup(swaggerJSON));
app.listen(PORT, () => console.log(`Listening at http://localhost:${PORT}`));
