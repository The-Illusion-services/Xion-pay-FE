export type TAppUser = {
  _id: string;
};

export type TAppUserState = {
  token: string;
  userData: TAppUser;
};