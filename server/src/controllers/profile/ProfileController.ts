import { Request, Response, Express } from "express";
import { getAuthId, checkJwt } from "../../Utils";
import axios from "axios";
import {
  IUserProfile,
  IUserPublicProfile,
  profileCreateHandler,
  profileGetHandler,
  profileUpdateHandler,
} from "./ProfileRequestHandlers";

const createProfile = async (req: Request, res: Response) => {
  const userId = getAuthId(req);
  if (await profileGetHandler({ userId })) {
    res.status(200).send("Profile already exists");
  } else {
    const prof = await axios.get(
      `https://${process.env.AUTH0_DOMAIN}/api/v2/users/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.AUTH0_MANAGEMENT_TOKEN}`,
        },
      }
    );

    const userProf: IUserProfile = {
      name: prof.data.name,
      username: prof.data.nickname,
      email: prof.data.email,
      userId: prof.data.user_id,
      picture: prof.data.picture,
      bio: "No information provided",
      pendingFriendRequests: [],
      banner:
        "https://media.licdn.com/dms/image/C4D12AQHMPBvE3avWzg/article-inline_image-shrink_1000_1488/0/1616872522462?e=1686182400&v=beta&t=Pr3elSNZK8egLBUg78EFAEuEiJHB9wDvWZaX7EbeuVw",
      friends: [],
    };
    await profileCreateHandler(userProf);
    res.status(201).json(userProf);
  }
};

const getPublicProfile = async (req: Request, res: Response) => {
  const username = req.params.username;
  const profile = await profileGetHandler({ username });

  if (profile) {
    const publicProfile: IUserPublicProfile = {
      name: profile.name,
      bio: profile.bio,
      username: profile.username,
      picture: profile.picture,
      banner: profile.banner,
    };
    res.status(200).json(publicProfile);
  } else {
    res.status(404).send("Profile not found");
  }
};

const getProfile = async (req: Request, res: Response) => {
  const userId = getAuthId(req);
  const profile = await profileGetHandler({ userId });

  if (profile) {
    res.status(200).json(profile);
  } else {
    res.status(404).send("Profile not found");
  }
};

const updateProfile = async (req: Request, res: Response) => {
  const userId = getAuthId(req);
  const toUpdate = req.body;
  const updatedProf = await profileUpdateHandler(userId, toUpdate);

  if (updatedProf) {
    res.status(200).json(updatedProf);
  } else{
    res.status(404).send("Profile not found");
  }
};

export default (app: Express) => {
  app.post("/api/profile", checkJwt, createProfile);
  app.get("/api/profile/:username", getPublicProfile);
  app.get("/api/profile", checkJwt, getProfile);
  app.patch("/api/profile", checkJwt, updateProfile);
};
