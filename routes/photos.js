const express = require("express");
const router = express.Router();
const axios = require("axios");
const { ENDPOINT } = require("../config");

router.get("/", async (request, response) => {
  const albumId = request.query.albumId;
  const { data } = await axios.get(`${ENDPOINT}/photos`, {
    params: { albumId },
  });

  return response.json(data);
});

router.get("/:id", async (request, response) => {
  const { data } = await axios.get(`${ENDPOINT}/photos/${request.params.id}`, {
    params: { albumId },
  });

  return response.json(data);
});

module.exports = router;
