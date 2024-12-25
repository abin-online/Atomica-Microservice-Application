import { Router } from "express";
import { tagController } from "./injection";
import { Req, Res, Next } from "../../interface/framework/types/serverTypes";

export const TagRoute = (router: Router) => {
  router.post("/addTag", (req: Req, res: Res, next: Next) =>
    tagController.createTag(req, res, next)
  );
  router.get("/getAllTags", (req: Req, res: Res, next: Next) =>
    tagController.getTags(req, res, next)
  );
  router.put("/blockTag", (req: Req, res: Res, next: Next) =>
    tagController.blockTag(req, res, next)
  );
  return router;
};
