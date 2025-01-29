import { Request, Response, NextFunction } from "express";
import userProblemModel from "../../infrastructure/database/models/user-problem";
import userMcqModel from "../../infrastructure/database/models/user-mcq";
import { BadgeModel } from "../../infrastructure/database/models/badgeModel";
import s3Service from "../../infrastructure/aws/s3Service";
import { calculateStreak } from "../../infrastructure/services/streak";

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
                        console.log("badgee", badge)
                        testBadges.push(badge);
                    }
                }
            }

            console.log(userProblem,
                userMCQ,
                problemBadges,
                testBadges)


            res.status(200).json({
                userProblem,
                userMCQ,
                problemBadges,
                testBadges
            })

            return
        } catch (error) {

        }
    }


    async updateProfile(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {

            let userEmail
            if ((req as any).user) {
                console.log("userEmail =>", (req as any).user.userId);
                userEmail = (req as any).user.userId
            }

            let formData = req.body;
            const image = req.file as Express.Multer.File;


            if (image) {
                const s3Response = await s3Service.uploadFile(image);
                formData.profilePicture = s3Response.Location;
            }


            const Response: any = await userMcqModel.findOneAndUpdate({ email: userEmail },
                { $set: formData },
                { new: true })

            res.status(200).json({ message: "profile updated", Response });


        } catch (error) {

        }
    }

    async getProfilePicture(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {

            let userEmail
            if ((req as any).user) {
                console.log("userEmail =>", (req as any).user.userId);
                userEmail = (req as any).user.userId
            }
            const response = await userMcqModel.findOne({email: userEmail}, {profilePicture: 1, _id:0});
            console.log(response)
            res.status(200).json({response, message: 'IMAGE FETCHED !'})
            
        } catch (error) {
            
        }
    }

    async getUserStreak(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {

            let userEmail
            if ((req as any).user) {
                console.log("userEmail =>", (req as any).user.userId);
                userEmail = (req as any).user.userId
            }


            const { year, month } = req.query;

            const user : any = await userProblemModel.findOne({email: userEmail});

            let filteredCompleted = user.completed;

            // if (year && month) {
            //     const yearNum = parseInt(year as string, 10);
            //     const monthNum = parseInt(month as string, 10);

            //     filteredCompleted = user.completed.filter((item: any) => {

            //         const submissionDate = new Date(item.submissionDate);
            //         const submissionYear = submissionDate.getFullYear();
            //         const submissionMonth = submissionDate.getMonth();
                
            //         return (
            //             submissionYear === yearNum && submissionMonth === monthNum
            //         );
            //     });
                
            // }

            if (year && month) {
                const yearNum = parseInt(year as string, 10);
                const monthNum = parseInt(month as string, 10);
    
                filteredCompleted = user.completed.filter((item: any) => {
                    const submissionDate = new Date(item.submissionDate);
    
                    return (
                        submissionDate.getFullYear() === yearNum &&
                        submissionDate.getMonth() === monthNum
                    );
                });
            }

            const { currentStreak, highestStreak } = calculateStreak(user.completed);
        
            res.json({
                streak: {
                    current: currentStreak,
                    highest: highestStreak
                },
                completed: user.completed
            });
            
        } catch (error) {
            console.error("Error fetching user streak:", error);
            res.status(500).json({ message: "An error occurred while fetching streak data" });
        }
    }
}

