const Queue = require("bull");
const { createClient } = require("redis");

const {
  REDIS_URI,
  REDIS_PORT,
  REDIS_USERNAME,
  REDIS_PASSWORD,
  DEFAULT_EXPIRATION,
} = require("./config");

/* Connect to Redis Cloud */

const client = createClient({
  url: `redis://${REDIS_USERNAME}:${REDIS_PASSWORD}@${REDIS_URI}:${REDIS_PORT}`,
});
client.connect();
client.on("connect", () => console.log("::> Redis Client Connected"));
client.on("error", (error) => console.log("<::", error));

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
