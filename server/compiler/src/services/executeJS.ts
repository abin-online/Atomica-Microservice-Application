// import { exec } from "child_process";


// const executeJavascript = (filePath: string) => {
//     return new Promise((resolve, reject) => {
//       exec(`node ${filePath}`, (error, stdout, stderr) => {
//         if (error) {
//           return reject({
//             message: error.message,
//             stack: error.stack,
//             stderr,
//           });
//         }
//         if (stderr) {
//           return reject({
//             message: stderr,
//             stderr,
//           });
//         }
  

//         const lines = stdout.trim().split("\n");
  
//         const logs = lines.slice(0, -1);
//         const result = lines[lines.length - 1]; 
        
//         resolve({ logs, result });
//       });
//     });
//   };
  



// export {
//     executeJavascript
// }


import { VM } from "vm2";

const executeJavascript = async (code: string, input: any[], functionName: string) => {
    const logs: string[] = [];

    const vm = new VM({
        timeout: 1000, // Limit execution time to 1 second
        sandbox: {
            capturedLogs: logs, // Add capturedLogs to sandbox
            console: {
                log: (...args: any[]) => {
                    logs.push(args.map(String).join(" ")); // Ensure all logged values are captured as strings
                },
            },
        },
    });

    try {
        console.log("Function Name:", functionName);
        console.log("Code:", code);
        console.log("Input (Raw):", JSON.stringify(input, null, 2));

        const completeCode = `
            ${code}
            const result = ${functionName}(...${JSON.stringify(input)});
            result;
        `;

        
        // Execute the complete code in the VM
        const result = vm.run(completeCode);
        console.log("vm ", result)
        return { logs, result };
    } catch (error: any) {
        return { logs, error: error.message };
    }
};

export { executeJavascript };
