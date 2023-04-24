import ProfileCollection from "../../database/ProfileCollection";
import {
  IUserProfile,
  IUserPublicProfile,
} from "../profile/ProfileRequestHandlers";

export interface IFriends {
  friends: Array<string>;
}

export async function friendsGetHandler(
  userId: string
): Promise<Array<IUserPublicProfile>> {
  const collection = await ProfileCollection();
  const userProf = await collection.findOne<IUserProfile>({ userId });

  let friendProfs: Array<IUserPublicProfile> = [];
  if (userProf) {
    friendProfs = await collection
      .find<IUserPublicProfile>({ username: { $in: userProf.friends } })
      .toArray();
  }

  return friendProfs;
}

export async function friendInvitesGetHandler(
  userId: string
): Promise<Array<IUserPublicProfile>> {
  const collection = await ProfileCollection();
  const userProf = await collection.findOne<IUserProfile>({ userId });

  let friendProfs: Array<IUserPublicProfile> = [];
  if (userProf) {
    friendProfs = await collection
      .find<IUserPublicProfile>({
        userId: { $in: userProf.pendingFriendRequests },
      })
      .toArray();
  }

  return friendProfs;
}

export async function friendsAcceptHandler(
  friend1UserId: string,
  friend2Username: string
): Promise<[IUserProfile | null, IUserProfile | null]> {
  const collection = await ProfileCollection();
  const friend2Prof = await collection.findOne<IUserProfile>({
    username: friend2Username,
  });
  if (friend2Prof) {
    await collection.updateOne(
      { userId: friend1UserId },
      {
        $addToSet: { friends: friend2Username },
        $pull: { pendingFriendRequests: friend2Prof.userId },
      }
    );
  }

  const friend1ProfUpdated = await collection.findOne<IUserProfile>({
    userId: friend1UserId,
  });
  if (friend1ProfUpdated) {
    await collection.updateOne(
      { username: friend2Username },
      { $addToSet: { friends: friend1ProfUpdated.username } }
    );
  }

  const friend2ProfUpdated = await collection.findOne<IUserProfile>({
    username: friend2Username,
  });
  return [friend1ProfUpdated, friend2ProfUpdated];
}

export async function friendsSendInviteHandler(
  friend1UserId: string,
  friend2Username: string
): Promise<IUserProfile | null> {
  const collection = await ProfileCollection();

  await collection.updateOne(
    { username: friend2Username },
    { $addToSet: { pendingFriendRequests: friend1UserId } }
  );
  return await collection.findOne<IUserProfile>({ username: friend2Username });
}

export async function friendsDeleteHandler(
  friend1UserId: string,
  friend2Username: string
): Promise<void> {
  const collection = await ProfileCollection();

  let updateObj: Record<string, any> = {
    friends: friend2Username
  } 

  const updatedFriend1Prof = (await collection.findOneAndUpdate(
    {userId: friend1UserId},
    {$pull: updateObj},
    {returnDocument: 'after'}
  )).value
  
  if (updatedFriend1Prof) {
    updateObj = {
      friends: updatedFriend1Prof.username,
    }
    await collection.findOneAndUpdate(
      {username: friend2Username},
      {$pull: updateObj},
      {returnDocument: 'after'}
    )
  }
}
