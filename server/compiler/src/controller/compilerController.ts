import { Request, Response, NextFunction } from "express";

import { generateFile } from "../services/generateFile";
import { executeJavascript } from "../services/executeJS";

export class CompilerController {
    async runCode (req: Request, res: Response, next: NextFunction) {
        
            const {language , code} = req.body;
            if (code == undefined) {
                return res.status(400).json({success: false, error : 'Empty code'})
            }
            try {
            const filePath = await generateFile(language, code);
            const output = await executeJavascript(filePath)
            return res.json({filePath, output});
        } catch (error) {
            res.status(500).json({error})
        }
    }
}