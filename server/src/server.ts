import Express from "express";
import CORS from "cors";
import { getAuthId } from "./Utils";
import { checkJwt } from "./Utils";
import ProfileController from "./controllers/profile/ProfileController";
import { config } from "dotenv";
import FriendsController from "./controllers/friends/FriendsController";
import RecommendationsController from "./controllers/recommendations/RecommendationsController";
import axios from "axios";

config();

const app = Express();
app.use(CORS());
app.use(Express.json());

app.get("/api/public", function (_req, res) {
  res.json({
    message:
      "Hello from a public endpoint! You don't need to be authenticated to see this.",
  });
});

// This route needs authentication
app.get("/api/private", checkJwt, function (req, res) {
  const sub = getAuthId(req);
  res.json({
    sub,
    message:
      "Hello from a private endpoint! You need to be authenticated to see this.",
  });
});

app.get("/api/identity", checkJwt, async function (req, res) {
  const userId = getAuthId(req);

  const management_token = (
    await axios.post(
      `https://${process.env.AUTH0_DOMAIN}/oauth/token`,
      {
        client_id: process.env.AUTH0_CLIENT_ID,
        client_secret: process.env.AUTH0_CLIENT_SECRET,
        audience: process.env.AUTH0_AUDIENCE,
        grant_type: "client_credentials",
      },
      { headers: { "content-type": "application/json" } }
    )
  ).data.access_token;

  const prof = await axios.get(
    `https://${process.env.AUTH0_DOMAIN}/api/v2/users/${userId}`,
    {
      headers: {
        Authorization: `Bearer ${management_token}`,
      },
    }
  );

  const googleAuth = prof.data.identities[0].access_token;
  res.status(200).send(googleAuth);
});

ProfileController(app);
FriendsController(app);
RecommendationsController(app);

app.listen(process.env.PORT || 8081);
