export type TAppUser = {
  _id: string;
  email: string;
};

export type TAppUserState = {
  token: string;
  userData: TAppUser;
};

// @TODO: remove if not in use
