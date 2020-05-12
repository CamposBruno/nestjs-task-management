import * as config from 'config'

const jwt = config.get('jwt')

export const jwtConfig = {
    secret : process.env.JWT_SECRET || jwt.secret,
    signOptions : {
        expiresIn : jwt.expiresIn
    }
}