export const typeDefs = ["type AdminCheckResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype Query {\n  AdminCheck: AdminCheckResponse\n  GetFavoriteVideoList(page: Int!, num: Int!): GetFavoriteVideoListResponse\n  GetVideo(id: String!): GetVideoResponse!\n  GetVideoList(page: Int!, tag: String, keyword: String, level: String): GetVideoListResponse\n}\n\ntype AdminLoginResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype Mutation {\n  AdminLogin(password: String!): AdminLoginResponse\n  AdminLogout: AdminLogoutResponse\n  SocialLogin(provider: String!, accessToken: String!): SocialLoginResponse\n  AddFavoriteVideo(videoId: String!): AddFavoriteVideoResponse\n  DeleteFavoriteVideo(id: String!): DeleteFavoriteVideoResponse\n  AddVideo(youtubeId: String!, title: String!, overayTime: String!, tags: [String], level: String!, isPublic: Boolean!, transcript: [Script]!): AddVideoResponse\n  DeleteVideo(id: String!): DeleteVideoResponse\n  EditVideo(id: String!, patchData: VideoPatch!): EditVideoResponse\n}\n\ntype AdminLogoutResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype SocialLoginResponse {\n  ok: Boolean!\n  error: String\n  token: String\n}\n\ntype User {\n  _id: String!\n  email: String!\n  fbId: String\n  fbToken: String\n  googleId: String\n  googleToken: String\n  displayName: String!\n  thumbnail: String!\n  createdAt: String!\n  updatedAt: String!\n}\n\ntype AddFavoriteVideoResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype DeleteFavoriteVideoResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype FavoriteVideo {\n  _id: String!\n  user: String!\n  video: String!\n  createdAt: String!\n}\n\ntype GetFavoriteVideoListResponse {\n  ok: Boolean!\n  error: String\n  videos: [FavoriteVideo]\n}\n\ntype AddVideoResponse {\n  ok: Boolean!\n  error: String\n}\n\ninput Script {\n  start: Float!\n  end: Float!\n  textContent: String!\n}\n\ntype DeleteVideoResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype EditVideoResponse {\n  ok: Boolean!\n  error: String\n}\n\ninput VideoPatch {\n  title: String\n  overayTime: String\n  tags: [String]\n  level: String\n  isPublic: Boolean\n}\n\ntype GetVideoResponse {\n  ok: Boolean!\n  error: String\n  video: Video\n}\n\ntype GetVideoListResponse {\n  ok: Boolean!\n  error: String\n  videos: [Video]\n  pageCount: Int!\n}\n\ntype ScriptType {\n  start: Float!\n  end: Float!\n  textContent: String!\n}\n\ntype Subtitle {\n  _id: String!\n  transcript: [ScriptType]\n}\n\ntype StringBox {\n  value: String\n}\n\nunion SubtitleField = StringBox | Subtitle\n\ntype Video {\n  _id: String!\n  youtubeId: String!\n  title: String!\n  overayTime: String!\n  tags: [String]\n  level: String!\n  isPublic: Boolean!\n  views: Int!\n  subtitle: Subtitle!\n  createdAt: String!\n  updatedAt: String!\n}\n"];
/* tslint:disable */

export interface Query {
  AdminCheck: AdminCheckResponse | null;
  GetFavoriteVideoList: GetFavoriteVideoListResponse | null;
  GetVideo: GetVideoResponse;
  GetVideoList: GetVideoListResponse | null;
}

export interface GetFavoriteVideoListQueryArgs {
  page: number;
  num: number;
}

export interface GetVideoQueryArgs {
  id: string;
}

export interface GetVideoListQueryArgs {
  page: number;
  tag: string | null;
  keyword: string | null;
  level: string | null;
}

export interface AdminCheckResponse {
  ok: boolean;
  error: string | null;
}

export interface GetFavoriteVideoListResponse {
  ok: boolean;
  error: string | null;
  videos: Array<FavoriteVideo> | null;
}

export interface FavoriteVideo {
  _id: string;
  user: string;
  video: string;
  createdAt: string;
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
  isPublic: boolean;
  views: number;
  subtitle: Subtitle;
  createdAt: string;
  updatedAt: string;
}

export interface Subtitle {
  _id: string;
  transcript: Array<ScriptType> | null;
}

export interface ScriptType {
  start: number;
  end: number;
  textContent: string;
}

export interface GetVideoListResponse {
  ok: boolean;
  error: string | null;
  videos: Array<Video> | null;
  pageCount: number;
}

export interface Mutation {
  AdminLogin: AdminLoginResponse | null;
  AdminLogout: AdminLogoutResponse | null;
  SocialLogin: SocialLoginResponse | null;
  AddFavoriteVideo: AddFavoriteVideoResponse | null;
  DeleteFavoriteVideo: DeleteFavoriteVideoResponse | null;
  AddVideo: AddVideoResponse | null;
  DeleteVideo: DeleteVideoResponse | null;
  EditVideo: EditVideoResponse | null;
}

export interface AdminLoginMutationArgs {
  password: string;
}

export interface SocialLoginMutationArgs {
  provider: string;
  accessToken: string;
}

export interface AddFavoriteVideoMutationArgs {
  videoId: string;
}

export interface DeleteFavoriteVideoMutationArgs {
  id: string;
}

export interface AddVideoMutationArgs {
  youtubeId: string;
  title: string;
  overayTime: string;
  tags: Array<string> | null;
  level: string;
  isPublic: boolean;
  transcript: Array<Script>;
}

export interface DeleteVideoMutationArgs {
  id: string;
}

export interface EditVideoMutationArgs {
  id: string;
  patchData: VideoPatch;
}

export interface AdminLoginResponse {
  ok: boolean;
  error: string | null;
}

export interface AdminLogoutResponse {
  ok: boolean;
  error: string | null;
}

export interface SocialLoginResponse {
  ok: boolean;
  error: string | null;
  token: string | null;
}

export interface AddFavoriteVideoResponse {
  ok: boolean;
  error: string | null;
}

export interface DeleteFavoriteVideoResponse {
  ok: boolean;
  error: string | null;
}

export interface Script {
  start: number;
  end: number;
  textContent: string;
}

export interface AddVideoResponse {
  ok: boolean;
  error: string | null;
}

export interface DeleteVideoResponse {
  ok: boolean;
  error: string | null;
}

export interface VideoPatch {
  title: string | null;
  overayTime: string | null;
  tags: Array<string> | null;
  level: string | null;
  isPublic: boolean | null;
}

export interface EditVideoResponse {
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

export interface StringBox {
  value: string | null;
}

export type SubtitleField = StringBox | Subtitle;
