import { Request, Response, NextFunction } from "express";
import userProblemModel from "../../infrastructure/database/models/user-problem";
import userMcqModel from "../../infrastructure/database/models/user-mcq";
import { BadgeModel } from "../../infrastructure/database/models/badgeModel";

export class ProfileController {
    constructor() {

    }

    async getProfile(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {

            let userEmail
            if ((req as any).user) {
                console.log("userEmail =>", (req as any).user.userId);
                userEmail = (req as any).user.userId
            }



            // const userProblem = await userProblemModel.findOne({email: userEmail})
            // const userMCQ = await userMcqModel.findOne({email: userEmail});
            const [userProblem, userMCQ] = await Promise.all([
                userProblemModel.findOne({ email: userEmail }),
                userMcqModel.findOne({ email: userEmail })
            ]);

            const problemBadges = [];
            const testBadges = [];
            if (userProblem?.badges && userProblem?.badges.length > 0) {
                for (const badgeName of userProblem.badges) {
                    const badge = await BadgeModel.findOne({ name: badgeName, category: 'problem' });
                    if (badge) {
                        problemBadges.push(badge);
                    }
                }
            }

            if (userMCQ?.badges && userMCQ?.badges.length > 0) {
                for (const badgeName of userMCQ.badges) {
                    
                    const badge = await BadgeModel.findOne({ name: badgeName, category: 'test' });
                    if (badge) {
                        console.log("badgee" , badge)
                        testBadges.push(badge);
                    }
                }
            }

            console.log( userProblem,
                userMCQ,
                problemBadges,
                testBadges)

                
            res.status(200).json({
                userProblem,
                userMCQ,
                problemBadges,
                testBadges })

            return
        } catch (error) {

        }
    }

}

