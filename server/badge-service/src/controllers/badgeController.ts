import { Request, Response, NextFunction } from 'express';
import { BadgeModel } from '../model/badgeModel';

class BadgeController {
    constructor() {

    }
    async addBadge(req: Request, res: Response): Promise<void> {
        console.log(req.body, "__________________")
        const { name, description, minQuestionsSolved } = req.body;
        //console.log(req.body, "__________________")
        try {
            const newBadge = new BadgeModel({
                name,
                description,
                minQuestionsSolved,
                createdBy: "Admin",
            });

            const savedBadge = await newBadge.save();

            res.status(201).json({
                message: 'Badge added successfully',
                badge: savedBadge,
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: 'Failed to add badge'
            });
        }
    }

    async updateBadge(req: Request, res: Response): Promise<void> {
        try {
            const { id, isActive } = req.body;
            console.log(req.body)
            const updated = await BadgeModel.findByIdAndUpdate(id, { isActive }, { new: true })
            console.log(updated)
            res.status(200).json({ message: 'successfully updated' });
        } catch (error) {

        }
    }

    async getBadge(req: Request, res: Response): Promise<void> {
        try {
            const badgeData = await BadgeModel.find({});
            console.log(badgeData)
            res.status(200).json(badgeData)
        } catch (error) {
            console.log(error)
        }
    }

    async getBadgeById(req: Request, res: Response) : Promise <void> {
        try {
            const id = req.params;
            const badgeData = await BadgeModel.findById(id)
            res.status(200).json(badgeData)
        } catch (error) {
            console.log(error)
        }
    }
}

export default BadgeController;
