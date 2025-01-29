import { Router } from "express";
import {problemController} from "../routes/injection";
import { Req, Res, Next } from "../../interface/framework/serverTypes";
import { isAdmin } from "../middlewares/authMiddleware/roleAuth";

export const ProblemRoute = (router: Router) => {
  router.post("/addProblem", isAdmin, (req: Req, res: Res, next: Next) =>
    problemController.createProblem(req, res, next)
  );
  router.get('/getTags', (req: Req, res: Res, next: Next)=> {
    problemController.getTags(req, res, next)
  });
  router.put("/updateProblem/:id", isAdmin, (req: Req, res: Res, next: Next) =>
    problemController.updateProblem(req, res, next)
  ); 
  router.put("/blockProblem", (req: Req, res: Res, next: Next) =>
    problemController.blockProblem(req, res, next)
  );
  router.get("/getProblem/:id", (req: Req, res: Res, next: Next) =>
    problemController.getProblem(req, res, next)
  );
  router.get('/viewProblem/:id' , (req: Req, res: Res, next: Next) => {
    problemController.viewProblem(req, res, next)
  })
  router.get("/getAllProblems", isAdmin, (req: Req, res: Res, next: Next) =>
    problemController.getAllProblems(req, res, next)
  );

  router.get('/getProblems' , (req: Req, res: Res, next: Next) => {
    problemController.getUnblockedProblems(req, res, next)
  })

  router.post('/problems/user' , (req: Req, res: Res, next: Next) => {
    problemController.getProblemsForContest(req, res, next)
  })

  return router;
};
