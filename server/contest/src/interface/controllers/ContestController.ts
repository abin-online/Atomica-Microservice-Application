import { Next, Req, Res } from "../framework/serverTypes";
import { IContestUseCase } from "../../application/interface/useCase/ContestUseCase";
import { IContest } from "../../domain/entities/IContest";
import ErrorHandler from "../middlewares/errorMiddleware/errorHandler";

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
            console.log("_________")
            const solution: IContest = req.body;
            const contest = await this.ContestUseCase.createContest(solution)
            res.status(HttpStatusCode.Created).json(contest);

        } catch (error) {
            next(error);
        }
    }

    async editContest(req: Req, res: Res, next: Next): Promise<void> {
        try {
            const { contestId } = req.params;
            console.log("abin")
            const contest: any = req.body
            const updated = await this.ContestUseCase.editContest(contestId, contest);
            res.status(HttpStatusCode.Created).json({ updated, message: 'contest updated successfully' });
        } catch (error : any) {
            next(new ErrorHandler(error.status, error.message))

        }
    }

    async listContests(req: Req, res: Res, next: Next): Promise<void> {
        try {
            const contests = await this.ContestUseCase.listContests();
            res.status(HttpStatusCode.Created).json({ contests, message: 'contest listed successfully' });
        } catch (error : any) {
            next(new ErrorHandler(error.status, error.message))

        }
    }

    async updateResult(req: Req, res: Res, next: Next): Promise<void> {
        try {
            console.log("nnnnnnn")
            const { contestId } = req.params;
            const data = req.body;
            const contest = await this.ContestUseCase.updateResult(contestId, data);
            console.log("contest   ", contest)
            res.status(HttpStatusCode.Created).json(contest);
        } catch (error : any) {
            next(new ErrorHandler(error.status, error.message))

        }
    }


    async getContest(req: Req, res: Res, next: Next): Promise<void> {
        try {
            const { contestId } = req.params;
            const contest = await this.ContestUseCase.getContest(contestId);
            console.log("contest   ", contest)
            res.status(HttpStatusCode.Created).json(contest);
        } catch (error : any) {
            next(new ErrorHandler(error.status, error.message))

        }
    }

    async getUserContestData(req: Req, res: Res, next: Next): Promise<void> {
        try {
            const {  username } = req.body;
            console.log("get user contest ",username.username)
            const userData = await this.ContestUseCase.getContestData(username)
            res.status(HttpStatusCode.Created).json(userData);

         } catch (error : any) {
            next(new ErrorHandler(error.status, error.message))

        }
    }

    async userList(req: Req, res: Res, next: Next): Promise<void> {
        try {
            const data = await this.ContestUseCase.userList();
            res.status(HttpStatusCode.Created).json(data)
        } catch (error : any) {
            next(new ErrorHandler(error.status, error.message))

        }
    }

}

