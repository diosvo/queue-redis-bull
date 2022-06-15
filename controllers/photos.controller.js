const { client } = require("../redis");
const { ENDPOINT, DEFAULT_EXPIRATION } = require("../config");
const axios = require("axios");

const slug = "photos";

const controller = {
  all: async (request, response) => {
    const { _limit = 10, albumId = null } = request.query;
    const queries = `${ENDPOINT}/${slug}?_limit=${_limit}`;

    const key = `${slug}:albumId:${albumId ?? "all"}:limit:${_limit}`;
    const cache = await client.get(`${key}`);

    if (cache) {
      return response.json(JSON.parse(cache));
    }

    const { data } = await axios.get(
      albumId && albumId > 0 ? queries.concat(`&albumId=${albumId}`) : queries
    );

    client.setEx(key, DEFAULT_EXPIRATION, JSON.stringify(data));
    return response.json(data);
  },

  byId: async (request, response, _) => {
    const { id } = request.params;
    const cache = await client.get(`photo:${id}`);

    if (cache) {
      return response.json(JSON.parse(cache));
    }

    const { data } = await axios.get(`${ENDPOINT}/${slug}/${id}`);
    client.setEx(`photo:${id}`, DEFAULT_EXPIRATION, JSON.stringify(data));

    return response.json(data);
  },

  create: async (request, response, __) => {
    const { data } = await axios.post(`${ENDPOINT}/${slug}`);
    const created = { ...request.body, ...data };
    await client.setEx(
      `photo:${data["id"]}`,
      DEFAULT_EXPIRATION,
      JSON.stringify(created)
    );
    return response.json(data);
  },
};

module.exports = controller;
