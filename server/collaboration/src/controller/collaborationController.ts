import { Request, Response, NextFunction } from "express";
import collaborationModel from "../database/model/collabSchema";
import { generateRoomID } from "../service/generateRoomId";

class CollabController {
    constructor() { }

    async createRoom(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {

            let userEmail
            if ((req as any).user) {
                userEmail = (req as any).user.userId
            }
            console.log("user",(req as any).user)

            const roomId = generateRoomID()
            const session = new collaborationModel({
                createdBy: userEmail,
                roomId
            });

            await session.save();


            res.status(201).json({
                message: "Room created successfully",
                roomId
            });
        } catch (error: any) {

            res.status(500).send(error.message)
        }
    }

    async closeRoom(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { roomId } = req.body;
            let userEmail;
            if ((req as any).user) {
                userEmail = (req as any).user.userId;
            }

            const session = await collaborationModel.findOne({ roomId });

            if (session?.createdAt) {
                const createdAtDate = new Date(session.createdAt as string);
                if (!isNaN(createdAtDate.getTime())) {
                    const durationInMs = new Date().getTime() - createdAtDate.getTime();

                    const duration = Math.floor(durationInMs / (1000 * 60));

                    session.duration = duration;
                    session.expired = true;

                    await session.save();
                }
            } else {
                console.error('Session or session.createdAt is undefined');
            }
        } catch (error) {
            console.error(error);
        }
    }

    async joinRoom(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id } = req.params //roomID
            let userEmail;
            if ((req as any).user) {
                userEmail = (req as any).user.userId;
            }

            const userSession: any = await collaborationModel.findOne(
                { roomId: id }
            )

            if (userSession) {

                if (userSession.expired) {
                    res.status(403).json({ message: 'Session expired' })
                    return
                }

                if (userSession.members.includes(userEmail)) {
                    res.status(409).json({ message: 'You are already in this session' })
                    return;
                }

                userSession.members.push(userEmail)
                await userSession.save()

                console.log("user updated_________", userSession)

            } else { 
                res.status(404).json({message: 'Session not found'})
                return 
            }

            res.status(201).json({
                message: "User joined successfully",
                userSession
            });

        } catch (error) {
            console.log(error)
        }
    }


    async getRoomList(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            let userEmail;
            if ((req as any).user) {
                userEmail = (req as any).user.userId;
            }

            const [createdSessions, joinedSessions] = await Promise.all([
                collaborationModel.find({createdBy: userEmail}),
                collaborationModel.find({members: userEmail})
            ])
            res.status(200).json({createdSessions, joinedSessions})
        } catch (error: any) {
            res.status(500).send(error.message)
        }
    }

    async getRoomById(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id } = req.params;
            const session = await collaborationModel.findById(id)
            if (!session) {
                res.status(400).json({ message: 'Session not found' })
            }
        } catch (error: any) {
            res.status(500).send(error.message)
        }
    }
}

export default CollabController;
