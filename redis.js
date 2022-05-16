const { createClient } = require("redis");
const { REDIS_HOST, REDIS_USERNAME, REDIS_PASSWORD } = require("./config");

const client = createClient({
  host: REDIS_HOST,
  username: REDIS_USERNAME,
  password: REDIS_PASSWORD,
});
client.connect();

client.on("connect", () => console.log("::> Redis Client Connected"));
client.on("error", (error) => console.log("<:: Redis Client Error", error));
module.exports = client;
