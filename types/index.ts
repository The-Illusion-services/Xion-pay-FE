export type TAppUser = {
  _id: string;
  avatar: string | null;
  fname: string;
  lname: string;
  mobile: string;
  username: string;
  streak_count: number;
};

export type TAppUserState = {
  token: string;
  userData: TAppUser;
};

export type TAppUserProfile = {
  _id: string;
  contact_id: TAppUser;
  createdAt: string;
  updatedAt: string;
  user_id: string;
};
