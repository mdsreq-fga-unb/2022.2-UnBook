import { Router } from "express";
import { adaptRoute } from "../adapters/express/express-route-adapter";
import { makeAddPostController } from "../factories/controllers/posts/add-post-controller-factory";

export default (router: Router): void => {
  router.post("/posts", adaptRoute(makeAddPostController()));
};
