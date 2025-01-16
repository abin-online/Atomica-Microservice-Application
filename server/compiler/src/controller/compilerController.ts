import { Request, Response, NextFunction } from "express";

import { generateFile } from "../services/generateFile";
import { TestCaseModel } from "../database/model/testCaseModel";
import { executeTestCases } from "../services/testcaseExecution";

export class CompilerController {
    async runCode(req: Request, res: Response, next: NextFunction) {

        const { language, problem, code } = req.body;
        console.log(req.body)
        if (code == undefined) {
            return res.status(400).json({ success: false, error: 'Empty code' })
        }
        try {

            const testCases = await TestCaseModel.find({ problem, visibility: 'public' });
            if (testCases.length == 0) {
                return res.status(404).json({ success: false, error: "No test cases found" });
            }
            const filePath = await generateFile(language, code);
            // const output = await executeJavascript(filePath)

            // return res.json({filePath, output});

            const results = await executeTestCases(filePath, code, testCases);

            return res.json({ success: true, results });
        } catch (error) {
            res.status(500).json({ error })
        }
    }

    async submitCode(req: Request, res: Response, next: NextFunction) {
        const { language, problem, code } = req.body;
        console.log(req.body)
        if (code == undefined) {
            return res.status(400).json({ success: false, error: 'Empty code' })
        }
        try {
            console.log(problem)
            const testCases = await TestCaseModel.find({ problem });
            console.log("testcasessssss" , testCases)
            if (testCases.length == 0) {
                return res.status(404).json({ success: false, error: "No test cases found" });
            }
            const filePath = await generateFile(language, code);
            // const output = await executeJavascript(filePath)

            // return res.json({filePath, output});

            const results = await executeTestCases(filePath, code, testCases);
            
            return res.json({ success: true, results });
        } catch (error) {
            res.status(500).json({ error })
        }
    }



}