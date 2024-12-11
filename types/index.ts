export type TAppUser = {
  _id: string;
  avatar: string | null;
  fname: string;
  lname: string;
  mobile: string;
  username: string;
}

export type TAppUserState = {
  token: string;
  userData: TAppUser;
};

// @TODO: remove if not in use
