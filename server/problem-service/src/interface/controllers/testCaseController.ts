import { Request, Response, NextFunction } from "express";
import { ITestCaseUseCase } from "../../application/interfaces/useCaseInterface/testCaseUseCaseInterface";
import ErrorHandler from "../../application/useCases/middleware/errorHandler";


export default class TestCaseController {
    private testCaseUseCase: ITestCaseUseCase;
    constructor(testCaseUseCase: ITestCaseUseCase) {
        this.testCaseUseCase = testCaseUseCase;
        this.createTestCase = this.createTestCase.bind(this);
        this.getTestCase = this.getTestCase.bind(this);
        this.updateTestCase = this.updateTestCase.bind(this);
        this.getTestCases = this.getTestCases.bind(this);
        this.publicTestCases = this.publicTestCases.bind(this)
    }

    async createTestCase(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const testCaseData = req.body;
            const newTestCase = await this.testCaseUseCase.addTestCase(testCaseData);
            res.status(201).json({ message: 'Test Case created' , newTestCase});
        } catch (error: any) {
            return next(new ErrorHandler(error.status, error.message))
        }
    }

    async getTestCase(req: Request, res: Response, next: NextFunction): Promise<void> {
        const { id } = req.params;
        console.log(id)
        try {
            const testCase = await this.testCaseUseCase.getTestCase(id);
            console.log("trs", testCase)
            res.status(200).json(testCase);
        } catch (error: any) {
            return next(new ErrorHandler(error.status, error.message));
        }
    }

    async updateTestCase(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id } = req.params;
            const testCaseData = req.body
            const updated = await this.testCaseUseCase.updateTestCase(id, testCaseData);
            res.status(200).json(updated);
        } catch (error: any) {
            return next(new ErrorHandler(error.status, error.message));
        }
    }

    async getTestCases(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const testCase = await this.testCaseUseCase.getTestCases();
            res.status(200).json(testCase);
        } catch (error: any) {
            return next(new ErrorHandler(error.status, error.message))
        }
    }

    
    async publicTestCases(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { problem } = req.params;
            
            const testCase = await this.testCaseUseCase.publicTestCases(decodeURIComponent(problem));
            res.status(200).json(testCase);
        } catch (error: any) {
            return next(new ErrorHandler(error.status, error.message))
        }
    }
}

