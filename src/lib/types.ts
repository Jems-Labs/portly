export type signupFormData = {
  username: string;
} & loginFormData;
export type loginFormData = {
  email: string;
  password: string;
};

export type UserType = {
  id: number;
  username: string;
  email: string;
  image: string | null;
};
export type useAppType = {
  claimedUsername: string;
  setClaimedUsername: (username: string) => void;
  user: UserType | null;
  signup: (formData: signupFormData, redirectTo: (url: string) => void) => void;
  searchUsername: (username: string) => Promise<Boolean>;
  login: (formData: loginFormData, redirectTo: (url: string) => void) => void;
};
