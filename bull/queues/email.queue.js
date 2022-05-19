const { queue } = require("../../redis");
const email_process = require("../processes/email.process");

const email_queue = queue("email");
email_queue.process(email_process);

const send_email = (data) => {
  email_queue.add(data, {
    attempts: 2,
  });
};

module.exports = { send_email };
