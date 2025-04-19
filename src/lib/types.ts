export type signupFormData = {
  username: string;
} & loginFormData;
export type loginFormData = {
  email: string;
  password: string;
};
export type ProfileImageType = {
  id: number;
  url: string;
  userId: number;
};
export type skillType = {
  id: number;
  name: string;
  userId: string;
};
export type UserType = {
  id: number;
  username: string;
  email: string;
  image: ProfileImageType | null;
  firstName: string;
  lastName: string;
  bio: string;
  status: string;
  pronouns: string;
  skills: skillType[];
};
export type useAppType = {
  claimedUsername: string;
  setClaimedUsername: (username: string) => void;
  user: UserType | null;
  signup: (formData: signupFormData, redirectTo: (url: string) => void) => void;
  searchUsername: (username: string) => Promise<Boolean>;
  login: (formData: loginFormData, redirectTo: (url: string) => void) => void;
  logout: (redirectTo: (url: string) => void) => void;
  fetchUser: () => void;
  updateProfile: (formData: FormData) => void;
  addTag: (tag: string) => void;
  deleteTag: (tagId: number) => void;
};
