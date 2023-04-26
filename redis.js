const Queue = require("bull");
const { createClient } = require("redis");

const FgRed = "\x1b[31m%s\x1b[0m";

const {
  REDIS_URI,
  REDIS_PORT,
  REDIS_USERNAME,
  REDIS_PASSWORD,
  DEFAULT_EXPIRATION,
} = require("./config");

/* Connect to Redis Cloud */

const client = createClient({
  url: `redis://${REDIS_URI}:${REDIS_PORT}`,
});
client.connect();
client.on("connect", () => console.log(FgRed, "[redis]", "connected"));
client.on("error", (error) => console.log(FgRed, `[redis]: ${error}`));

/* Connect to Queue */

function queue(slug) {
  return new Queue(slug, {
    redis: {
      username: REDIS_USERNAME,
      password: REDIS_PASSWORD,
      host: REDIS_URI,
      port: REDIS_PORT,
    },
    limiter: {
      max: 1000,
      duration: DEFAULT_EXPIRATION,
    },
  });
}

module.exports = { client, queue };
