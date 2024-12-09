export interface IsentEmail {
    sentEmailVerification(name: string, email: string, verification: string) : Promise <boolean>
}