const access_token_expire = parseInt(process.env.ACCESS_TOKEN_EXPIRE || '3000', 100);
const refresh_token_expire = parseInt(process.env.REFRESH_TOKEN_EXPIRE || '1200', 10)

interface Itoken_options {
    expires: Date,
    max_age: number,
    http_only: boolean,
    same_site: 'lax' | 'strict' | 'none' | undefined
    secure?: boolean
}

const access_token_production_mode = process.env.NODE_ENV == 'production'

export const access_token_options: Itoken_options = {
    expires: new Date(Date.now() + access_token_expire * 24 * 60 * 60 * 1000),
    max_age: access_token_expire * 24 * 60 * 60 * 1000,
    http_only: true,
    same_site: 'none',
    secure: access_token_production_mode
}

export const refresh_token_options: Itoken_options = {
    expires: new Date(Date.now() + refresh_token_expire * 24 * 60 * 60 * 1000),
    max_age: refresh_token_expire * 24 * 60 * 60 * 1000,
    http_only: true,
    same_site: 'none',
    secure: access_token_production_mode
}

export const role_options: Itoken_options = {
    expires: new Date(Date.now() + refresh_token_expire * 24 * 60 * 60 * 1000),
    max_age: refresh_token_expire * 24 * 60 * 60 * 1000,
    http_only: true,
    same_site: 'none',
    secure: access_token_production_mode
}