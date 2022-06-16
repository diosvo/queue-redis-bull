import { createBullBoard } from "@bull-board/api";
import { BullAdapter } from "@bull-board/api/bullAdapter";
import { ExpressAdapter } from "@bull-board/express";
import email_process from "../processes/email.process";
import { queue } from "../redis";

const adapter = new ExpressAdapter();
const email_queue = queue("email");
adapter.setBasePath("/email/admin/queues");

createBullBoard({
  queues: [new BullAdapter(email_queue)],
  serverAdapter: adapter,
});
email_queue.process(email_process);

const send_email = (data) => {
  email_queue.add(data, {
    attempts: 2,
    repeat: {
      cron: "*/2 * * * * *",
    },
  });
};

module.exports = { send_email, adapter };
