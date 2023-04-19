import jwt from 'jsonwebtoken';
import { Request } from 'express';
import { auth } from 'express-oauth2-jwt-bearer';

export function getAuthId(req: Request): string {
    const { authorization } = req.headers;
    const token = authorization && typeof authorization === 'string' && authorization.split(' ')[1];
    if (!token) {
        throw new Error('bad token');
    }
    const decoded = jwt.decode(token) as jwt.JwtPayload;
    if (!decoded['sub']) {
        throw new Error('bad token');
    }
    return decoded['sub'];
}

export const checkJwt = auth({
    audience: "https://dev-iawnw1854qf62qlg.us.auth0.com/api/v2/",
    issuerBaseURL: 'https://dev-iawnw1854qf62qlg.us.auth0.com/',
    tokenSigningAlg: 'RS256'
});