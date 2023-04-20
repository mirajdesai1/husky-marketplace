import ProfileCollection from '../../database/ProfileCollection';
import { Filter, Document } from 'mongodb';

export interface IUserProfile {
    name: string;
    username: string;
    email: string;
    bio: string;
    userId: string;
    picture: string;
    pendingFriendRequests: Array<string>;
    banner: string;
}


export async function profileCreateHandler(
    requestData: IUserProfile
) {
    const collection = await ProfileCollection();

    await collection.insertOne(requestData);
}

export async function profileGetHandler(
    query: Filter<Document>,
): Promise<IUserProfile | null> {
    const collection = await ProfileCollection();

    return await collection.findOne<IUserProfile>(query);
}