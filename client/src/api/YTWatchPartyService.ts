import axios, { AxiosInstance } from "axios";
import youtubeAPI from "./youtubeAPI";

export interface IUserPublicProfile {
  name: string;
  username: string;
  bio: string;
  picture: string;
  banner: string;
}

export interface IUserProfile {
  name: string;
  username: string;
  email: string;
  bio: string;
  userId: string;
  picture: string;
  pendingFriendRequests: Array<string>;
  banner: string;
  friends: Array<string>;
}

export interface IRecommendation {
  fromUsername: string;
  toUsername: string;
  videoID: string;
}

export default class YTWatchPartyService {
  private _axios: AxiosInstance;

  constructor() {
    const baseURL = "http://localhost:8081";
    this._axios = axios.create({ baseURL });
  }

  async getPublicProfile(username: string): Promise<IUserPublicProfile> {
    return (await this._axios.get(`/api/profile/${username}`)).data;
  }

  async getUserProfile(token: string): Promise<IUserProfile> {
    return (
      await this._axios.get(`/api/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      })
    ).data;
  }

  async updateProfile(token: string, toUpdate: any): Promise<IUserProfile> {
    return await this._axios.patch(`/api/profile`, toUpdate, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  async getFriends(token: string): Promise<Array<IUserPublicProfile>> {
    return (
      await this._axios.get("/api/friends", {
        headers: { Authorization: `Bearer ${token}` },
      })
    ).data.friends;
  }

  async getFriendInvites(token: string): Promise<Array<IUserPublicProfile>> {
    return (
      await this._axios.get("/api/friends/invite", {
        headers: { Authorization: `Bearer ${token}` },
      })
    ).data.invites;
  }

  getRecommendationsPromise(token: string) {
    return this._axios.get<Array<IRecommendation>>("/api/recommendations", {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  getVideoPromise(videoID: string) {
    return youtubeAPI.get<
      GoogleApiYouTubePageInfo<GoogleApiYouTubeVideoResource>
    >("/videos", {
      params: {
        id: videoID,
        part: "snippet,contentDetails,statistics",
        maxResults: 1,
      },
    });
  }

  async acceptFriendInvite(
    token: string,
    username: string
  ): Promise<[IUserProfile | null, IUserProfile | null]> {
    return (
      await this._axios.post(
        `/api/friends/${username}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      )
    ).data;
  }

  async sendFriendInvite(
    token: string,
    username: string
  ): Promise<IUserProfile | null> {
    return (
      await this._axios.post(
        `/api/friends/invite/${username}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      )
    ).data;
  }

  async deleteFriend(token: string, username: string): Promise<void> {
    await this._axios.delete(`/api/friends/${username}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  async getLikedVideos(
    userId: string
  ): Promise<Array<GoogleApiYouTubeVideoResource>> {
    const prof = await this._axios.get(
      `https://${process.env.REACT_APP_AUTH0_DOMAIN}/api/v2/users/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_AUTH0_MANAGEMENT_TOKEN}`,
        },
      }
    );

    const googleAuth = prof.data.identities[0].access_token;
    const query = `key=${process.env.REACT_APP_YOUTUBE_API_KEY}&part=snippet,contentDetails,statistics&myRating=like&maxResults=25`;
    const response = await this._axios.get<
      GoogleApiYouTubePageInfo<GoogleApiYouTubeVideoResource>
    >(`https://www.googleapis.com/youtube/v3/videos?${query}`, {
      headers: { Authorization: `Bearer ${googleAuth}` },
    });
    return response.data.items;
  }
}
