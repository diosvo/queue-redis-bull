import { client }  from "../redis";
import { expect, sinon }  from "../utils/helpers";
import controller  from "../controllers/photos.controller";

describe("should test photos controller", () => {
  describe("should retrieve the list of photos", () => {
    it("should cache the data at the first call", () => {
      const spy = sinon.spy(client, "setEx");
      const request = {
        params: {
          id: 1,
        },
      };
      controller.byId(request).then((response) => {
        expect(response).to.equal({});
      });
      expect(spy.calledOnce).to.be.true;
    });
  });
});
