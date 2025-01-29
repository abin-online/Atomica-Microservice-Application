import {Router} from 'express';
import { Request, Response, NextFunction } from "express";
import { collabController } from './injection';
import { isUser } from '../middlewares/authMiddleware/roleAuth';

export const collabRouter = (router: Router) => {
    router.post('/session', isUser, (req: Request, res: Response, next: NextFunction) => {
        console.log(req.body)
        collabController.createRoom(req, res, next);
    })

    router.put('/session', isUser, (req: Request, res: Response, next: NextFunction) => {
        console.log(req.body)
        collabController.closeRoom(req, res, next);
    })

    router.put('/session/:id', isUser, (req: Request, res: Response, next: NextFunction) => {
        console.log(req.body)
        collabController.joinRoom(req, res, next);
    })

    router.get('/session', isUser,  (req: Request, res: Response, next: NextFunction) => {
        collabController.getRoomList(req, res, next)
    })

    router.get('/session/:id', (req: Request, res: Response, next: NextFunction) => {
        collabController.getRoomById(req, res, next)
    })
}   

