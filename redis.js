const { createClient } = require("redis");
const {
  REDIS_URI,
  REDIS_PORT,
  REDIS_USERNAME,
  REDIS_PASSWORD,
} = require("./config");

const client = createClient({
  url: `redis://${REDIS_USERNAME}:${REDIS_PASSWORD}@${REDIS_URI}:${REDIS_PORT}`,
});
client.connect();

client.on("connect", () => console.log("::> Redis Client Connected"));
client.on("error", (error) => console.log("<:: Redis Client Error", error));
module.exports = client;
