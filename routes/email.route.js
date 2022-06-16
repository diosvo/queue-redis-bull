import controller from "../controllers/email.controller";
import { adapter } from "../queues/email.queue";
import { router } from "../utils/helpers";

router.post("/send", controller.send).use("/admin/queues", adapter.getRouter());

module.exports = router;
