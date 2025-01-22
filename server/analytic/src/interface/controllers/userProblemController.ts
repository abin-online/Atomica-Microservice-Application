import { Request, Response, NextFunction } from "express";
import { BadgeModel } from "../../infrastructure/database/models/badgeModel";
import { UserProblem } from "../../domain/entities/user-problem";
import { IProblemUserUseCase } from "../../application/interfaces/useCaseInterfaces/IProblemUserUseCase";
import userProblemModel from "../../infrastructure/database/models/user-problem";

export class UserProblemController {

    private problemUserUseCase: IProblemUserUseCase;

    constructor(problemUserUseCase: IProblemUserUseCase) {
        this.problemUserUseCase = problemUserUseCase;
    }
    async createUser(req: Request, res: Response, next: NextFunction) {
        try {
            const userData = req.body;
            const newUser: UserProblem = await this.problemUserUseCase.createUser(userData);
            res.status(201).json({
                message: "User created successfully",
                data: newUser,
            });
        } catch (error) {
            next(error);
        }
    }

    async updateProblemScore(req: Request, res: Response, next: NextFunction) : Promise<void> {
        try {
            const { email, problem , submitted } = req.body;
    
            console.log("Request body:", req.body);
    
            let userEmail = email;
            if ((req as any).user) {
                console.log("Authenticated user email =>", (req as any).user.userId);
                userEmail = (req as any).user.userId;
            }

            console.log("userEmail", userEmail)
    
            if (!userEmail) {
                 res.status(400).json({ message: "Email or user authentication is required." });
                 return
            }
    
            if (!problem) {
                 res.status(400).json({ message: "Problem information is required." });
                 return
            }
    
            // Fetch the user
            const user : any = await userProblemModel.findOne({ email: userEmail });
            if (!user) {
                 res.status(404).json({ message: "User not found." });
                 return
            }
    
            if (submitted) {

                user.completed = user.completed || [];
    

                const alreadyCompleted = user.completed.some(
                    (entry: { problem: string }) => entry.problem === problem
                );
    
                if (!alreadyCompleted) {

                    user.solved = (user.solved || 0) + 1;
                    user.completed.push({
                        problem,
                        submissionDate: new Date(),
                    });
    

                    user.points = (user.points || 0) + 10;
                } else {
                    console.log(`Problem '${problem}' is already completed by the user.`);
                }
            }
    
            // Check and award badges
            const badges = await BadgeModel.find({ isActive: true, category: 'problem' });
            let newBadge: string | null = null;
            let badgeData: object | null = null;
    
            for (const badge of badges) {
                if (user.solved >= badge.minQuestionsSolved && !user.badges.includes(badge.name)) {
                    user.badges.push(badge.name);
                    newBadge = badge.name;
                    badgeData = badge;
                    break;
                }
            }
    
            await user.save();
    
            if (newBadge) {
                 res.json({
                    message: "Problem data updated and new badge awarded!",
                    newBadge,
                    badgeData,
                    user,
                });
                return
            }
    
             res.json({
                message: "Problem data updated successfully.",
                user,
            });
            return
    
        } catch (error) {
            console.error("Error updating problem score:", error);
            
             res.status(500).json({ message: "Internal Server Error" });
             return
        }
    }
    

}


