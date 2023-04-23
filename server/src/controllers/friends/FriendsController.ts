import { checkJwt, getAuthId } from "../../Utils";
import { Express, Request, Response } from "express";
import {
  friendsGetHandler,
  friendsAcceptHandler,
  friendsSendInviteHandler,
  friendInvitesGetHandler,
  friendsDeleteHandler,
} from "./FriendsRequestHandlers";
import { IUserProfile } from "../profile/ProfileRequestHandlers";

const getFriends = async (req: Request, res: Response) => {
  const userId = getAuthId(req);
  const friends = await friendsGetHandler(userId);
  res.status(200).json({ friends });
};

const acceptFriendInvite = async (req: Request, res: Response) => {
  const thisUserId = getAuthId(req);
  const friendUsername = req.params.username;

  const updatedProfs = await friendsAcceptHandler(thisUserId, friendUsername);
  res.status(200).json(updatedProfs);
};

const sendFriendInvite = async (req: Request, res: Response) => {
  const userId = getAuthId(req);
  const friendUsername = req.params.username;

  const updatedFriend: IUserProfile | null = await friendsSendInviteHandler(
    userId,
    friendUsername
  );

  if (updatedFriend) {
    res.status(200).json(updatedFriend);
  } else {
    res.status(404).send("Could not perform update.");
  }
};

const getFriendInvites = async (req: Request, res: Response) => {
  const userId = getAuthId(req);
  const invites = await friendInvitesGetHandler(userId);
  res.status(200).json({ invites });
};

const deleteFriend = async (req: Request, res: Response) => {
  const userId = getAuthId(req);
  const friendUsername = req.params.username;
  await friendsDeleteHandler(userId, friendUsername);
  res.status(200);
}

export default (app: Express) => {
  app.post("/api/friends/:username", checkJwt, acceptFriendInvite);
  app.get("/api/friends", checkJwt, getFriends);
  app.post("/api/friends/invite/:username", checkJwt, sendFriendInvite);
  app.get("/api/friends/invite", checkJwt, getFriendInvites);
  app.delete("/api/friends/:username", checkJwt, deleteFriend)
};
