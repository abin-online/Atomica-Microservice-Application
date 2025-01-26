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

    router.get('/contest/:contestId', isAdmin, (req: Req, res: Res, next: Next) =>
        contestController.getContest(req, res, next)
    );

    router.get('/contests/user', isUser, (req: Req, res: Res, next: Next) =>
        contestController.listContests(req, res, next)
    );

    return router
}