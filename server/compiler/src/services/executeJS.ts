import { exec } from "child_process";
// import fs from 'fs'
// import path from "path";

// const outputPath = path.join(__dirname, '../../src/outputs');

// if (!fs.existsSync(outputPath)) {
//     fs.mkdirSync(outputPath, { recursive: true });
// }


const executeJavascript = (filePath: string) => {
    return new Promise((resolve, reject) => {
      exec(`node ${filePath}`, (error, stdout, stderr) => {
        if (error) {
          return reject({
            message: error.message,
            stack: error.stack,
            stderr,
          });
        }
        if (stderr) {
          return reject({
            message: stderr,
            stderr,
          });
        }
  

        const lines = stdout.trim().split("\n");
  
        const logs = lines.slice(0, -1);
        const result = lines[lines.length - 1]; 
        
        resolve({ logs, result });
      });
    });
  };
  



export {
    executeJavascript
}