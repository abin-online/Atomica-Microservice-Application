import fs from "fs";
import { executeJavascript } from "../services/executeJS";

export const executeTestCases = async (
    filePath: string,
    code: string,
    testCases: Array<{ input: string; expectedOutput: string }>
) => {
    const results = [];

    for (const testCase of testCases) {
        const { input, expectedOutput } = testCase;
        try {
            const testCode = `
                const input = ${input};
                console.log(${code}(input));
            `;
            await fs.writeFileSync(filePath, testCode);

            const output: any = await executeJavascript(filePath);
            console.log("output", output);

            const passed = output.trim() === expectedOutput.trim();
            results.push({ input, expectedOutput, output: output.trim(), passed });
        } catch (error: any) {

            // Handle error by logging the error message and stack trace
            console.error("Error occurred:", error.message);
            console.error("Error stack:", error.stack);

            // Add error details to the result
            results.push({
                input, expectedOutput,
                error: error.stack || error.message, 
                passed: false
            });
        }
    }

    console.log("results=======", results);
    return results;
};
