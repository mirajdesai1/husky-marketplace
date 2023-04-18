import Express, { Request } from "express";
import CORS from "cors";
import { auth } from "express-oauth2-jwt-bearer";
import jwt from 'jsonwebtoken';

const checkJwt = auth({
    audience: "https://dev-iawnw1854qf62qlg.us.auth0.com/api/v2/",
    issuerBaseURL: 'https://dev-iawnw1854qf62qlg.us.auth0.com/',
    tokenSigningAlg: 'RS256'
});

const getSub = (req: Request): string => {
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

const app = Express();
app.use(CORS());
app.use(Express.json());

app.get('/api/public', function (_req, res) {
    res.json({
        message: 'Hello from a public endpoint! You don\'t need to be authenticated to see this.'
    });
});

// This route needs authentication
app.get('/api/private', checkJwt, function (req, res) {
    const sub = getSub(req);
    res.json({
        sub,
        message: 'Hello from a private endpoint! You need to be authenticated to see this.'
    });
});

app.listen(process.env.PORT || 8081);