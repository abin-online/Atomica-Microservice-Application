import fs from 'fs';
import path from 'path';


const directoryCodes = path.join(__dirname, '../../src/codes/')
console.log(directoryCodes)

if (!fs.existsSync(directoryCodes)) {
    fs.mkdirSync(directoryCodes, { recursive: true })
}
const generateFile = async (format: string, code: any) => {
    // const codeId = uuidv4();
    // const filename = `${codeId}.${format}`;
    const filename = `javaScript.${format}`
    const filePath = path.join(directoryCodes, filename);

    //await fs.writeFileSync(filePath, code);
 
    await fs.writeFileSync(filePath, code); 

    return filePath;
}

export {
    generateFile
}