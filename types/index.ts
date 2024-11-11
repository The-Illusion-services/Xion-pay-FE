export type TAppUser = {
  _id: string;
};

export type TAppUserState = {
  token: string;
  userData: TAppUser;
};

export type TAppUserProdileDetails = {
  _id: string;
  avatar: string | null;
  fname: string;
  lname: string;
  mobile: string;
  username: string;
};

export type TAppUserProfile = {
  _id: string;
  contact_id: TAppUserProdileDetails;
  createdAt: string;
  updatedAt: string;
  user_id: string;
};
