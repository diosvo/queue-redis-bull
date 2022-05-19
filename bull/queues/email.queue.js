const Queue = require("bull");
const {
  REDIS_URI,
  REDIS_PORT,
  REDIS_USERNAME,
  REDIS_PASSWORD,
} = require("../../config");
const { slug } = require("../lib/email.model");
const email_process = require("../processes/email.process");

const queue = new Queue(slug, {
  redis: {
    username: REDIS_USERNAME,
    password: REDIS_PASSWORD,
    host: REDIS_URI,
    port: REDIS_PORT,
  },
});
queue.process(email_process);

const send_email = (data) => {
  queue.add(data, {
    attempts: 2,
  });
};

module.exports = { send_email };
