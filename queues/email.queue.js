const { queue } = require("../redis");
const email_process = require("../processes/email.process");
const { BullAdapter } = require("@bull-board/api/bullAdapter");
const { ExpressAdapter } = require("@bull-board/express");
const { createBullBoard } = require("@bull-board/api");

const adapter = new ExpressAdapter();
const email_queue = queue("email");
adapter.setBasePath("/email");

createBullBoard({
  queues: [new BullAdapter(email_queue)],
  serverAdapter: adapter,
});
email_queue.process(email_process);

const send_email = (data) => {
  email_queue.add(data, {
    attempts: 2, // If job fails it will retry till 2 times
    backoff: 30000, // static 30s delay between retry
    repeat: {
      limit: 5, // 5 jobs should repeat at max
    },
  });
};

module.exports = { send_email, adapter };
