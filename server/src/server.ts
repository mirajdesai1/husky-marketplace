import Express from "express";
import CORS from "cors";
import { getAuthId } from "./Utils";
import { checkJwt } from "./Utils";
import ProfileController from "./controllers/profile/ProfileController";
import { config } from "dotenv";
import FriendsController from "./controllers/friends/FriendsController";

config();

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
    const sub = getAuthId(req);
    res.json({
        sub,
        message: 'Hello from a private endpoint! You need to be authenticated to see this.'
    });
});

ProfileController(app);
FriendsController(app);

app.listen(process.env.PORT || 8081);