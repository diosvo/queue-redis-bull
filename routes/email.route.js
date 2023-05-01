const router = require("express").Router();
const { adapter } = require("../queues/email.queue");
const controller = require("../controllers/email.controller");
const middleware = require('../middlewares/validators');
const { body } = require('express-validator');

router
  .post("/send", middleware([body('subject').notEmpty(), body('text').notEmpty()]), controller.send).use("/", adapter.getRouter());

module.exports = router;
