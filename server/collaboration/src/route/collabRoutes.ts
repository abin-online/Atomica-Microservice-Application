import {Router} from 'express';
import { Request, Response, NextFunction } from "express";
import { collabController } from './injection';

export const collabRouter = (router: Router) => {
    router.post('/session', (req: Request, res: Response, next: NextFunction) => {
        console.log(req.body)
        collabController.createRoom(req, res, next);
    })

    router.get('/session', (req: Request, res: Response, next: NextFunction) => {
        collabController.getRoomList(req, res, next)
    })

    router.get('/session/:id', (req: Request, res: Response, next: NextFunction) => {
        collabController.getRoomById(req, res, next)
    })
}   

