import { Request, Response, NextFunction } from "express";
import collaborationModel from "../database/model/collabSchema";
import crypto from "crypto";

class CollabController {
    constructor() { }

    async createRoom(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {

            const roomName = req.body.name;


            const length: number = 6;
            const roomId: string = crypto
                .randomBytes(Math.ceil(length / 2))
                .toString("hex")
                .slice(0, length);

            const session = new collaborationModel({
                roomName,
                roomId
            });

            await session.save();


            res.status(201).json({
                message: "Room created successfully",
                roomId,
                roomName
            });
        } catch (error: any) {

            res.status(500).send(error.message)
        }
    }

    async getRoomList(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const sessions = await collaborationModel.find();
            res.status(200).json(sessions)
        } catch (error: any) {
            res.status(500).send(error.message)
        }
    }

    async getRoomById(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const {id} = req.params;
            const session = await collaborationModel.findById(id)
            if (!session) {
                res.status(400).json({ message: 'Session not found' })
            }
        } catch (error : any) {
            res.status(500).send(error.message)
        }
    }
}

export default CollabController;
