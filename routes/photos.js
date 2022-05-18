const express = require("express");
const router = express.Router();
const axios = require("axios");
const { ENDPOINT } = require("../config");
const client = require("../redis");
const util = require("util");

const slug = "photos";
client.get = util.promisify(client.get);

router.get("/", async (request, response) => {
  const { data } = await axios.get(`${ENDPOINT}/${slug}`);
  return response.json(data);
});

router.get("/:id", async (request, response) => {
  const albumId = request.query.albumId;
  const { data } = await axios.get(`${ENDPOINT}/${slug}/${albumId}`, {
    params: { albumId },
  });

  return response.json(data);
});

router.post("/", async (request, response) => {
  const { key, value } = request.body;
  const { data } = await axios.post(`${ENDPOINT}/${slug}`);
  await client.set(`${key}-${data["id"]}`, value);
  return response.json(data);
});

module.exports = router;
