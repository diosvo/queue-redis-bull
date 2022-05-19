const express = require("express");
const router = express.Router();
const { send_email, adapter } = require("../queues/email.queue");

router.post("/send", async (request, response) => {
  const { message, ...rest } = request.body;
  await send_email({
    ...rest,
    html: `<div>${message}</div>`,
  });
  response.send("OK");
});

router.use("/admin/queues", adapter.getRouter());

module.exports = router;