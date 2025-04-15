import { IContestRepository } from "../../application/interface/repository/ContestRepository";
import { IContest } from "../../domain/entities/IContest";
import Contest from "../database/mongodb/contestModel";

export class ContestRepository implements IContestRepository {
    async createContest(contest: IContest): Promise<IContest> {
        return await Contest.create(contest)
    }

    async editContest(id: string, contest: any): Promise<any> {
        return await Contest.findByIdAndUpdate(id, contest)
    }

    async listContests(username: string): Promise<IContest[]> {
        return await Contest.find({
            expiryDate: { $gt: new Date() },
            $or: [
              { candidate: { $exists: false } },
              { candidate: { $size: 0 } },
              { candidate: { $not: { $elemMatch: { name: username } } } }
            ]
          });
          
    }


    async getContest(id: string): Promise<IContest | null> {
        return await Contest.findById(id)
    }

    async adminlistContests(): Promise<IContest[]> {
        const contests = await Contest.find();
        console.log('contest fetched for admin' , contests)
        return contests
    }

    async updateResult(contestId: string, formData: any): Promise<any> {
        try {
            console.log(formData)
            const updatedContest = await Contest.findByIdAndUpdate(
                contestId,
                { $push: { candidate: formData } },
                { new: true, upsert: false }
            );
            console.log(updatedContest)

            if (!updatedContest) {
                throw new Error(`Contest with ID ${contestId} not found`);
            }

            return updatedContest;
        } catch (error: any) {
            console.error("Error updating contest:", error);
            throw new Error(error.message || "Failed to update contest");
        }
    }

    async contestData(user: string): Promise<any> {
        try {
            console.log("user  ", user)
            const contests = await Contest.find(
                {
                    "candidate.name": user
                },
                {
                    contestName: 1,
                    "candidate.$": 1,
                    createdAt: 1
                }
            );

            const formattedResult = contests.map((contest: any) => ({
                contestName: contest.contestName,
                name: contest.candidate[0].name,
                duration: contest.candidate[0].duration,
                points: contest.candidate[0].points,
                createdAt: contest.createdAt || Date.now()
            }));
            console.log(formattedResult)

            return formattedResult;

        } catch (error) {
            console.error("Error fetching contests:", error);
            throw error;
        }
    }

    async userList(): Promise<any> {

        try {
            const result = await Contest.aggregate([
                { $unwind: "$candidate" },
                {
                    $group: {
                        _id: "$candidate.name",
                        totalPoints: { $sum: "$candidate.points" },
                        contestCount: { $sum: 1 }
                    }
                },
                {
                    $project: {
                        _id: 0,
                        userName: "$_id",
                        totalPoints: 1,
                        contestCount: 1
                    }
                }
            ]);

            console.log(result)

            return result;
        } catch (error) {
            console.error("Error fetching user list:", error);
            throw error;
        }
    }





}