export interface IMessageState {
  id: string;
  message: string;
  status?: EStatus;
  responseMessage?: string | undefined;
}

export interface IUserResponse {
  username: string;
  uid: string;
}

export interface IUserProfilesResponse {
  address: string;
  birthdate: string;
  userUid?: string;
}

export interface ISendMessageAction {
  user?: IUser;
  message: string;
  code: string;
}

export type IUser = IUserProfilesResponse & IUserResponse;

export enum EStatus {
  loading = "loading",
  idle = "idle",
  success = "success",
  failed = "failed",
}
