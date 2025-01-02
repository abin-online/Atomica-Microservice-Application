import { Request, Response, NextFunction } from "express";
import { IUserMcq } from "../../domain/entities/user-mcq";
import { IMcqUserUseCase } from "../../application/interfaces/useCaseInterfaces/IMcqUserUseCase";
import userModel from "../../infrastructure/database/models/user-mcq";
import { BadgeModel } from "../../infrastructure/database/models/badgeModel";

export class UserController {
    private mcqUserUseCase: IMcqUserUseCase;

    constructor(mcqUserUseCase: IMcqUserUseCase) {
        this.mcqUserUseCase = mcqUserUseCase;
    }

    // Endpoint to create a new user
    async createUser(req: Request, res: Response, next: NextFunction) {
        try {
            const userData = req.body;
            const newUser: IUserMcq = await this.mcqUserUseCase.createUser(userData);
            res.status(201).json({
                message: "User created successfully",
                data: newUser,
            });
        } catch (error) {
            next(error);
        }
    }

    async updateTestPoint(req: Request, res: Response, next: NextFunction) {
        try {
            const {
                name,
                email,
                questionAttended,
                wrongAnswers,
                rightAnswers
            } = req.body;
            console.log(req.body)  
            const user = await userModel.findOne({ email: email });
            if (!user) {
                res.json({ message: "user not found" })
                return
            }

            user.questionAttended += questionAttended;
            user.wrongAnswers += wrongAnswers;
            user.rightAnswers += rightAnswers;

            user.testAttended += 1;

            const points = Math.ceil((user.rightAnswers / user.testAttended) * 100);
            user.points += points;

            const badges = await BadgeModel.find({isActive: true});
            let newBadge: string | null = null;
            let badgeData: object | null = null;

            for (const badge of badges) {
                console.log(user.rightAnswers , "_____", badge.minQuestionsSolved , "____", !user.badges.includes(badge.name))
                if (user.rightAnswers >= badge.minQuestionsSolved && !user.badges.includes(badge.name)) {
                    user.badges.push(badge.name);
                    newBadge = badge.name;
                    badgeData = badge; 
                    break;  
                }
            }
            
            
            await user.save();
         
            if (newBadge) {
                res.json({ message: "Test data updated and new badge awarded!", newBadge, badgeData, user });
            } else {
                res.json({ message: "Test data updated", user });
            }

        } catch (error) {
            console.error("Error updating test point:", error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    }

}


