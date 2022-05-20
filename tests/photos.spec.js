const assert = require("assert");
const { client } = require("../redis");
const { expect, sinon } = require("./helpers");
const controller = require("../controllers/photos.controller");

describe("should test photos controller", () => {
  describe("should retrieve the list of photos", () => {
    beforeEach(() => {
      sinon.spy(client, "setEx");
    });

    it("should cache the data at the first call", async () => {
      const request = {
        params: {
          id: 1,
        },
      };
      const { data } = await controller.byId(request);
    });
  });
});
