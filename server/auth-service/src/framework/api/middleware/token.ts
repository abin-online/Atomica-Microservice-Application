const access_token_expire = parseInt(process.env.ACCESS_TOKEN_EXPIRE || '3000', 10);
const refresh_token_expire = parseInt(process.env.REFRESH_TOKEN_EXPIRE || '1200', 10)

interface Itoken_options {
    expires: Date,
    maxAge: number,
    httpOnly: boolean,
    sameSite: 'lax' | 'strict' | 'none' | undefined
    secure?: boolean
}

const access_token_production_mode = process.env.NODE_ENV == 'production'

export const access_token_options: Itoken_options = {
    expires: new Date(Date.now() + access_token_expire * 24 * 60 * 60 * 1000),
    maxAge: access_token_expire * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: 'none',
    secure: access_token_production_mode
}

export const refresh_token_options: Itoken_options = {
    expires: new Date(Date.now() + refresh_token_expire * 24 * 60 * 60 * 1000),
    maxAge: refresh_token_expire * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: 'none',
    secure: access_token_production_mode
}

export const role_options: Itoken_options = {
    expires: new Date(Date.now() + refresh_token_expire * 24 * 60 * 60 * 1000),
    maxAge: refresh_token_expire * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: 'none',
    secure: access_token_production_mode
}