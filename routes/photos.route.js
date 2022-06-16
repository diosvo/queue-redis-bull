const router = require("express").Router();
const controller = require("../controllers/photos.controller");

router
  .get("/", controller.all)
  .get("/:id", controller.byId)
  .post("/", controller.create);

module.exports = router;
