import RecommendationsCollection from "../../database/RecommendationsCollection";

export interface IRecommendation {
  fromUsername: string;
  toUsername: string;
  videoID: string
}

export interface IUserPublicProfile {
  name: string;
  username: string;
  bio: string;
  picture: string;
  banner: string;
}

export async function recommendationCreateHandler(requestData: IRecommendation) {
  const collection = await RecommendationsCollection();
  await collection.insertOne(requestData);
}

export async function recommendationsGetHandler(
  toUsername: string,
): Promise<Array<IRecommendation>> {
  const collection = await RecommendationsCollection();

  const recommendations = await collection.find<IRecommendation>({toUsername}).toArray();
  return recommendations;
}

