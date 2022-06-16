import { router} from '../utils/helpers'
import controller from "../controllers/photos.controller";

router
  .get("/", controller.all)
  .get("/:id", controller.byId)
  .post("/", controller.create);

module.exports = router;
