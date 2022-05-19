const { client } = require("../redis");
const axios = require("axios");

const slug = "photos";
const redisKey = "photo";

const controller = {
  all: async (_, response, _) => {
    const cache = await client.get(`${slug}`);

    if (cache) {
      return response.json(JSON.parse(cache));
    }

    const { data } = await axios.get(`${ENDPOINT}/${slug}`);
    client.setEx(`${slug}`, DEFAULT_EXPIRATION, JSON.stringify(data));

    return response.json(data);
  },

  byId: async (request, response, _) => {
    const { id } = request.params;
    const cache = await client.get(`${redisKey}-${id}`);

    if (cache) {
      return response.json(JSON.parse(cache));
    }

    const { data } = await axios.get(`${ENDPOINT}/${slug}/${id}`);
    client.setEx(`${redisKey}-${id}`, DEFAULT_EXPIRATION, JSON.stringify(data));

    return response.json(data);
  },

  create: async (request, response, _) => {
    const { key, value } = request.body;
    const { data } = await axios.post(`${ENDPOINT}/${slug}`);
    await client.set(`${key}-${data["id"]}`, value);
    return response.json(data);
  },
};

module.exports = controller;
