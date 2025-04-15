import { Router } from "express";
import { Req, Res, Next } from "../../interface/framework/serverTypes";
import { isAdmin, isUser } from "../../interface/middlewares/authMiddleware/roleAuth";
import { contestController } from "./injection";

export const ContestRoute = (router: Router) => {
    router.post('/contest', isUser,
        (req: Req, res: Res, next: Next) =>
            contestController.createContest(req, res, next));

    router.put('/contest/:contestId', isAdmin, (req: Req, res: Res, next: Next) =>
        contestController.editContest(req, res, next)
    );

    router.get('/contests', isAdmin, (req: Req, res: Res, next: Next) =>
        contestController.listContests(req, res, next)
    );

    router.get('/contest/:contestId', (req: Req, res: Res, next: Next) =>
        contestController.getContest(req, res, next)
    );

    router.get('/contests/user/:username', (req: Req, res: Res, next: Next) =>
        contestController.listContests(req, res, next)
    );

    router.post('/contest/:contestId', isUser, (req: Req, res: Res, next: Next) =>
        contestController.updateResult(req, res, next)
    );

    router.post('/user', (req: Req, res: Res, next: Next) => 
        //console.log(req.body)
        contestController.getUserContestData(req, res, next)
           );

    router.get('/users', (req: Req, res: Res, next: Next) => 
        contestController.userList(req, res, next)
    );
    return router
}