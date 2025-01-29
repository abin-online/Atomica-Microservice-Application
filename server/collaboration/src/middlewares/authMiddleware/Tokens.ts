const accessTokenExpire  = parseInt(process.env.ACCES_TOKEN_EXPIRE||'300',10);
const refreshTokenExpire  = parseInt(process.env.REFRESH_TOKEN_EXPIRE||'1200',10 )

interface ITokenOptions {
    expires:Date;
    maxAge:number;
    httpOnly:boolean;
    sameSite:'lax'|'strict'|'none'|undefined;
    secure?:boolean;
}

const accessTokenProductionMode = process.env.NODE_ENV=='production'

export const accessTokenOptions: ITokenOptions = {
    expires: new Date(Date.now() + accessTokenExpire * 24 * 60 * 60 * 1000), // 3 days
    maxAge: accessTokenExpire * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "none",
    secure: accessTokenProductionMode,
};

export const refreshTokenOptions: ITokenOptions = {
    expires: new Date(Date.now() + refreshTokenExpire * 24 * 60 * 60 * 1000), // 3 days
    maxAge: refreshTokenExpire * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "none",
    secure: accessTokenProductionMode,
};

export const roleOptions: ITokenOptions = {
    expires: new Date(Date.now() + refreshTokenExpire * 24 * 60 * 60 * 1000), // 3 days
    maxAge: refreshTokenExpire * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "none",
    secure: accessTokenProductionMode,
};