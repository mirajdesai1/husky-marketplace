import { Request, Response, Express } from "express";
import { getAuthId, checkJwt } from "../../Utils";
import axios from "axios";
import { IUserProfile, profileCreateHandler, profileGetHandler } from "../ProfileRequestHandlers";

const createProfile = async (req: Request, res: Response) => {
    const userId = getAuthId(req);
    if (await profileGetHandler({userId})) {
        res.status(200).send("Profile already exists");
    } else {
        const prof = await axios.get(
            `https://${process.env.AUTH0_DOMAIN}/api/v2/users/${userId}`,
            { headers: { "Authorization": `Bearer ${process.env.AUTH0_MANAGEMENT_TOKEN}` } }
        );

        const userProf: IUserProfile = {
            "name": prof.data.name,
            "username": prof.data.nickname,
            "email": prof.data.email,
            "userId": prof.data.user_id,
            "picture": prof.data.picture,
            "bio": "No information provided",
            "pendingFriendRequests": [],
        }
        await profileCreateHandler(userProf);
        res.status(201).json(userProf);
    }
}

const getPublicProfile = async (req: Request, res: Response) => {
    const username = req.params.username;
    const profile = await profileGetHandler({username});

    if (profile) {
        res.status(200).json({
            "name": profile.name,
            "bio": profile.bio,
            "username": profile.username,
            "picture": profile.picture,
        });
    } else {
        res.status(404).send("Profile not found");
    }
}

const getProfile = async (req: Request, res: Response) => {
    const userId = getAuthId(req);
    const profile = await profileGetHandler({userId});

    if (profile) {
        res.status(200).json(profile);
    } else {
        res.status(404).send("Profile not found");
    }
}


export default (app: Express) => {
    app.post('/api/profile', checkJwt, createProfile);
    app.get('/api/profile/:username', getPublicProfile);
    app.get('/api/profile', checkJwt, getProfile);
}