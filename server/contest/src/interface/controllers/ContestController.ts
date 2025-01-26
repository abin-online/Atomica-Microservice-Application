import { Next, Req, Res } from "../framework/serverTypes";
import { IContestUseCase } from "../../application/interface/useCase/ContestUseCase";
import { IContest } from "../../domain/entities/IContest";

export class ContestController {
    private ContestUseCase: IContestUseCase;

    constructor(ContestUseCase: IContestUseCase) {
        this.ContestUseCase = ContestUseCase;

        this.createContest = this.createContest.bind(this);
        this.editContest = this.editContest.bind(this);
        this.listContests = this.listContests.bind(this);
        this.getContest = this.getContest.bind(this);
    }

    async createContest(req: Req, res: Res, next: Next): Promise<void> {
        try {
            const solution: IContest = req.body;
            const contest = await this.ContestUseCase.createContest(solution)
            res.status(201).json(contest);

        } catch (error) {
            next(error);
        }
    }

    async editContest(req: Req, res: Res, next: Next): Promise<void> {
        try {
            const { contestId } = req.params;
            const contest: any = req.body
            const updated = await this.ContestUseCase.editContest(contestId, contest);
            res.status(201).json({ updated, message: 'contest updated successfully' });
        } catch (error) {
            next(error)
        }
    }

    async listContests(req: Req, res: Res, next: Next): Promise<void> {
        try {
            const contests = await this.ContestUseCase.listContests();
            res.status(201).json({ contests, message: 'contest listed successfully' });
        } catch (error) {
            next(error)
        }
    }

    async getContest(req: Req, res: Res, next: Next): Promise<void> {
        try {
            const { contestId } = req.params;
            const contest = await this.ContestUseCase.getContest(contestId);
            console.log("contest   ", contest)
            res.status(201).json(contest);
        } catch (error) {
            next(error)
        }
    }
}

