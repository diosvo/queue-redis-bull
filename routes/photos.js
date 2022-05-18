const express = require("express");
const router = express.Router();
const axios = require("axios");
const { ENDPOINT, DEFAULT_EXPIRATION } = require("../config");
const client = require("../redis");

const slug = "photos";
const redisKey = "photo";

router.get("/", async (_, response) => {
  const cache = await client.get(`${slug}`);

  if (cache) {
    return response.json(JSON.parse(cache));
  }

  const { data } = await axios.get(`${ENDPOINT}/${slug}`);
  client.setEx(`${slug}`, DEFAULT_EXPIRATION, JSON.stringify(data));

  return response.json(data);
});

router.get("/:id", async (request, response) => {
  const { id } = request.params;
  const cache = await client.get(`${redisKey}-${id}`);

  if (cache) {
    return response.json(JSON.parse(cache));
  }

  const { data } = await axios.get(`${ENDPOINT}/${slug}/${id}`);
  client.setEx(`${redisKey}-${id}`, DEFAULT_EXPIRATION, JSON.stringify(data));

  return response.json(data);
});

router.post("/", async (request, response) => {
  const { key, value } = request.body;
  const { data } = await axios.post(`${ENDPOINT}/${slug}`);
  await client.set(`${key}-${data["id"]}`, value);
  return response.json(data);
});

module.exports = router;
