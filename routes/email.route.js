const router = require("express").Router();
const { adapter } = require("../queues/email.queue");
const controller = require("../controllers/email.controller");
const middleware = require('../middlewares/validators');
const validation = require('../validations/email.validation');

router
  .post("/send", middleware(validation), controller.send).use("/", adapter.getRouter());

module.exports = router;
