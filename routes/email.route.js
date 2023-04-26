const router = require("express").Router();
const { adapter } = require("../queues/email.queue");
const controller = require("../controllers/email.controller");

router.post("/send", controller.send).use("/", adapter.getRouter());

module.exports = router;
