const express = require("express");
const router = express.Router();
const axios = require("axios");
const { ENDPOINT, DEFAULT_EXPIRATION } = require("../config");
const client = require("../redis");

const redisKey = "photos";

router.get("/", async (_, response) => {
  return await client.get(redisKey, async (error, photos) => {
    console.log("hi");
    if (error) response.json(error);
    if (photos != null) {
      return response.json({ cache: true, data: JSON.parse(photos) });
    } else {
      const { data } = axios.get(`${ENDPOINT}/photos`);
      client.setEx(redisKey, DEFAULT_EXPIRATION, JSON.stringify(data));
      return response.json({ cache: false, data });
    }
  });
});

router.get("/:id", async (request, response) => {
  const albumId = request.query.albumId;
  const { data } = await axios.get(`${ENDPOINT}/photos/${albumId}`, {
    params: { albumId },
  });

  return response.json(data);
});

module.exports = router;
