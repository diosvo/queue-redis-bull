const express = require("express");
const router = express.Router();
const { send_email } = require("../queues/email.queue");

router.post("/send", async (request, response) => {
  await send_email(request.body);
  response.send("OK");
});

module.exports = router;
