import { Router } from "express";
import { testCaseController } from "../routes/injection";
import { Req, Res, Next } from "../../interface/framework/serverTypes";

export const TestCaseRoute = (router: Router) => {
    router.post("/testCase", (req: Req, res: Res, next: Next) => {
        testCaseController.createTestCase(req, res, next)
    });
    router.get('/testCase/:id', (req: Req, res: Res, next: Next) => {
        testCaseController.getTestCase(req, res, next)
    });
    router.get('/testCase/:id', (req: Req, res: Res, next: Next) => {
        testCaseController.updateTestCase(req, res, next)
    });

    router.get('/testcases', (req: Req, res: Res, next: Next) => {
        testCaseController.getTestCases(req, res, next)
    });
    return router;
};
