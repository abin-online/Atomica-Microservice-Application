import {Router} from 'express';
import { Request, Response, NextFunction } from "express";
import { compilerController } from './injection';

export const compilerRouter = (router: Router) => {
    router.post('/run', (req: Request, res: Response, next: NextFunction) => {
        console.log(req.body)
        compilerController.runCode(req, res, next)
    })
    router.post('/submit', (req: Request, res: Response, next: NextFunction) => {
        console.log(req.body)
        compilerController.submitCode(req, res, next)
    })
    router.post('/submit/contest', (req: Request, res: Response, next: NextFunction) => {
        console.log(req.body)
        compilerController.submitCode(req, res, next)
    })
}

