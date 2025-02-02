// import fs from "fs";
// import { executeJavascript } from "../services/executeJS";
// import { analyzeComplexityWithAI } from "./complexityAnalysis";

// export const executeTestCases = async (
//     filePath: string,
//     code: string,
//     testCases: Array<{ input: Array<{ params: string }>; expectedOutput: string }>,
//     outputType: string
// ) => {
//     const results = [];


// //   const complexityAnalysis = await analyzeComplexityWithAI(code);
// //   console.log("Complexity Analysis: ", complexityAnalysis);

//     for (const testCase of testCases) {
//         const { input, expectedOutput } = testCase;
        
//         try {
//             // Prepare the input data by parsing each parameter
//             const parsedInput = input.map(param => JSON.parse(param.params));

//             // Generate the test code dynamically
//             const testCode = `
//                 const input = ${JSON.stringify(parsedInput)};
//                 const result = ${code}(...input);
//                 console.log(result); // Ensure the result is logged last
//             `;

//             await fs.writeFileSync(filePath, testCode);

//             const { logs, result }: any = await executeJavascript(filePath);

//             // Check the output against expected output based on outputType
//             let passed;
//             console.log("output type ", outputType)
//             if (outputType === 'array') {
//             let expected = JSON.parse(result).sort((a:any,b: any)=> a-b).join("");
//             let output = JSON.parse(expectedOutput).sort((a:any,b: any)=> a-b).join("")
//                 passed = expected == output;

//             } else if (outputType === 'number') {
//                 passed = result.trim() === expectedOutput.trim();
//             }

//             results.push({
//                 input,
//                 expectedOutput,
//                 output: result.trim(),
//                 logs,
//                 passed,
//             });
//         } catch (error: any) {
//             results.push({
//                 input,
//                 expectedOutput,
//                 error: error.stack || error.message,
//                 logs: [],
//                 passed: false,
//             });
//         }
//     }

//     console.log("Test case results with logs =======", results);
//     return results;
// };



import { executeJavascript } from '../services/executeJS';
import { TestCaseModel } from '../database/model/testCaseModel';

const executeTestCases = async (
    code: string,
    testCases: Array<{ input: Array<{ params: string }>; expectedOutput: string }>,
    outputType: string,
    functionName: string
) => {
    const results = [];

    for (const testCase of testCases) {
        const { input, expectedOutput } = testCase;

        try {
            // Prepare the input data by parsing each parameter
            const parsedInput = input.map(param => JSON.parse(param.params));

  
            const { logs, result, error } = await executeJavascript(code, parsedInput, functionName);

            if (error) {
                throw new Error(error);
            }

            console.log("checking=>","logs",logs, "result",result, error)

            // Check the output against expected output based on outputType
            let passed;
            console.log("output type" , outputType, typeof outputType)
            if (outputType === 'array') {
                const expected = result.sort((a: any, b: any) => a - b).join('');
                console.log(expected)
                const output = JSON.parse(expectedOutput).sort((a: any, b: any) => a - b).join('');
                console.log(output)
                passed = expected === output;
                console.log(passed)
            } else if (outputType === 'number') {
                console.log("passed",result,  passed , typeof(result) , expectedOutput)
                passed = result == parseInt(expectedOutput)

            }

            results.push({
                input,
                expectedOutput,
                output: typeof result == 'number' ? result : result,
                logs,
                passed,
            });
        } catch (error: any) {
            results.push({
                input,
                expectedOutput,
                error: error.message,
                logs: [],
                passed: false,
            });
        }
    }
    console.log(results)
    return results;
};

export { executeTestCases };

