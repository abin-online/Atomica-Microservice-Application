export interface IhashPassword {
    createHash(password: string) : Promise <string>
    compareHashPassword(password: string, hashPassword: string): Promise <boolean>
}