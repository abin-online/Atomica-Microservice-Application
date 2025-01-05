import { exec } from "child_process";
import fs from 'fs'
import path from "path";

const outputPath = path.join(__dirname, '../../src/outputs');

if(!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath, {recursive : true});
}

// const executeJavascript = (filePath: any)=> {
//     console.log(filePath)
//     const jobId = path.basename(filePath).split(".")[0];
//     console.log(jobId)
//     const outPath = path.join(outputPath, `${jobId}.out`)
//     console.log('promise')
//     return new Promise((resolve, reject)=> {
//         console.log(`node ${filePath} -o ${outPath} && cd ${outputPath} && ./${jobId}.out`)
//         exec(`node ${filePath} -o ${outPath} && cd ${outputPath} && ./${jobId}.out`, 
//             (error, stdout, stderr)=> {
//                 error && reject({error, stderr});
//                 stderr && reject(stderr);
//                 resolve(stdout)
//             })
//     })
// }

const executeJavascript = (filePath: string) => {
    return new Promise((resolve, reject) => {
        exec(`node ${filePath}`, (error, stdout, stderr) => {
            if (error) return reject({ error, stderr });
            if (stderr) return reject(stderr);
            resolve(stdout);
        });
    });
};

export {
    executeJavascript
}