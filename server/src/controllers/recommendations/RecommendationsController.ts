import { Request, Response, Express } from 'express';
import { getAuthId, checkJwt } from '../../Utils';
import {
  IRecommendation,
  recommendationCreateHandler,
  recommendationsGetHandler,
} from './RecommendationsRequestHandlers';
import { profileGetHandler } from '../profile/ProfileRequestHandlers';

const createRecommendation = async (req: Request, res: Response) => {
  const userId = getAuthId(req);
  const currentProfile = await profileGetHandler({ userId });

  if (currentProfile == null) {
    res.status(404).send('Profile not found');
    return;
  }
  const fromUsername = currentProfile.username;
  const toUsername = req.body.toUsername;
  const videoID = req.body.videoID;

  const recommendation: IRecommendation = {
    fromUsername,
    toUsername,
    videoID,
  };

  await recommendationCreateHandler(recommendation);
  res.status(200);
};

const getRecommendations = async (req: Request, res: Response) => {
  const userId = getAuthId(req);
  const currentProfile = await profileGetHandler({ userId });

  if (currentProfile == null) {
    res.status(404).send('Profile not found');
    return;
  }
  const username = currentProfile.username;

  const recommendations = await recommendationsGetHandler(username);

  res.status(200).json(recommendations);
};

export default (app: Express) => {
  app.post('/api/recommendations', checkJwt, createRecommendation);
  app.get('/api/recommendations', checkJwt, getRecommendations);
};
