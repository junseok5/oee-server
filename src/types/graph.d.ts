export const typeDefs = ["type AdminLoginResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype Mutation {\n  AdminLogin(password: String!): AdminLoginResponse\n}\n\ntype User {\n  _id: String!\n  email: String!\n  fbId: String\n  fbToken: String\n  googleId: String\n  googleToken: String\n  displayName: String!\n  thumbnail: String!\n  createdAt: String!\n  updatedAt: String!\n}\n\ntype GetVideoResponse {\n  ok: Boolean!\n  error: String\n  video: Video\n}\n\ntype Query {\n  GetVideo: GetVideoResponse!\n}\n\ntype Video {\n  _id: String!\n  youtubeId: String!\n  title: String!\n  overayTime: String!\n  tags: [String]\n  level: String!\n  private: Boolean!\n  views: Int!\n  createdAt: String!\n  updatedAt: String!\n}\n"];
/* tslint:disable */

export interface Query {
  GetVideo: GetVideoResponse;
}

export interface GetVideoResponse {
  ok: boolean;
  error: string | null;
  video: Video | null;
}

export interface Video {
  _id: string;
  youtubeId: string;
  title: string;
  overayTime: string;
  tags: Array<string> | null;
  level: string;
  private: boolean;
  views: number;
  createdAt: string;
  updatedAt: string;
}

export interface Mutation {
  AdminLogin: AdminLoginResponse | null;
}

export interface AdminLoginMutationArgs {
  password: string;
}

export interface AdminLoginResponse {
  ok: boolean;
  error: string | null;
}

export interface User {
  _id: string;
  email: string;
  fbId: string | null;
  fbToken: string | null;
  googleId: string | null;
  googleToken: string | null;
  displayName: string;
  thumbnail: string;
  createdAt: string;
  updatedAt: string;
}
