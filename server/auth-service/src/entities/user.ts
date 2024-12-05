export interface IUser {
    _id?: string,
    role?: string,
    name: string,
    email: string,
    password: string,
    is_blocked?: boolean,
    is_verified?: boolean
}