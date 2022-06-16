const { client } = require("../redis");
const { ENDPOINT, DEFAULT_EXPIRATION } = require("../config");
const axios = require("axios");

const slug = "photos";
const URL = `${ENDPOINT}/${slug}`;

const controller = {
  all: async (request, response) => {
    const queries = new URLSearchParams(request.query).toString();
    const { data } = await axios.get(`${URL}?${queries}`);

    return response.json(data);
  },

  byId: async (request, response, _) => {
    const { id } = request.params;
    const cache = await client.get(`photo:${id}`);

    if (cache) {
      return response.json(JSON.parse(cache));
    }

    const { data } = await axios.get(`${URL}/${id}`);
    client.setEx(`photo:${id}`, DEFAULT_EXPIRATION, JSON.stringify(data));

    return response.json(data);
  },

  create: async (request, response, __) => {
    const { data } = await axios.post(`${URL}`);
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
