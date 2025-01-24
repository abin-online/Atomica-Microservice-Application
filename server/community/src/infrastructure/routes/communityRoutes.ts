import { Router } from "express";
import { solutionController } from "./injection";
import { commentController } from "./injection";
import { Req, Res, Next } from "../../interface/framework/serverTypes";
import { isUser } from "../../interface/middlewares/authMiddleware/roleAuth";

export const CommunityRoute = (router: Router) => {
  router.post('/solutions', isUser,
    (req: Req, res: Res, next: Next) =>
      solutionController.postSolution(req, res, next));
  
  router.get('/solutions/:problem', isUser,
      (req: Req, res: Res, next: Next) =>
        solutionController.getSolutions(req, res, next));

  router.post('/solutions/:solutionId/comments', isUser,
    (req: Req, res: Res, next: Next) =>
      commentController.postComment(req, res, next));

  router.post('/comments/:commentId/replies', isUser,
    (req: Req, res: Res, next: Next) =>
      commentController.postReply(req, res, next));

  return router;

};

//Routes il auth middleware pass cheyumbol , 
// No overload matches the call error vannal , nere IUser il poyi return type ayit ": void | Promise<void>" koduthal mathy
//         " "                           chatGPT yod choikan nikanda, samayam pokathe ollu, kittathilla 

