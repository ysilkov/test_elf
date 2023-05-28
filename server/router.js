import Router from "express";
import PostController from "./PostController.js";

const router = new Router();

router.post("/archiveOrder", PostController.archiveOrder);
router.post("/burgersCountry", PostController.getBurgers);
router.post("/createOrder", PostController.postOrder);

export default router;
