import { Router } from "express";
import { mcqController } from "./injection";
import { Req, Res, Next } from "../../interface/framework/types/serverTypes";
import { isUser } from "../../interface/framework/middleware/roleAuth";

export const QuestionRoute = (router: Router) => {
  router.post("/addQuestion", (req: Req, res: Res, next: Next) =>
    mcqController.createQuestion(req, res, next)
  );
  router.get("/getAllQuestions", (req: Req, res: Res, next: Next) =>
    mcqController.getAllQuestions(req, res, next)
  );
  router.put("/blockQuestion", (req: Req, res: Res, next: Next) =>
    mcqController.blockQuestion(req, res, next)
  );
  router.get("/getQuestion/:id", (req: Req, res: Res, next: Next) =>
    mcqController.getEditQuestion(req, res, next)
  );
  router.put("/updateQuestion/:id", (req: Req, res: Res, next: Next) =>
    mcqController.updateQuestion(req, res, next)
  );

  router.get('/getAllMcq', (req: Req, res: Res, next: Next) =>
    mcqController.getMCQ(req, res, next)
  );

  router.post('/mcq/contest', (req: Req, res: Res, next: Next) =>
    mcqController.getMCQForContest(req, res, next)
  )

  return router;
};
