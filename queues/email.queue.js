const { queue } = require("../redis");
const email_process = require("../processes/email.process");
const { BullAdapter } = require("@bull-board/api/bullAdapter");
const { ExpressAdapter } = require("@bull-board/express");
const { createBullBoard } = require("@bull-board/api");
const { QUEUE_ATTEMPTS, QUEUE_REMOVE_ON_COMPLETE, QUEUE_REMOVE_ON_FAIL } = require("../config");
const { handlerFailure, handlerCompleted, handlerStalled } = require('../configs/queue-handler');

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
    attempts: QUEUE_ATTEMPTS,
    removeOnFail: QUEUE_REMOVE_ON_FAIL,
  });
};

email_queue.on('failed', handlerFailure);
email_queue.on('completed', handlerCompleted);
email_queue.on('stalled', handlerStalled);

module.exports = { send_email, adapter };
