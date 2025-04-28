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
export type socialLinkType = {
  id: number;
  platform: string;
  url: string;
};
export type projectType = {
  id: number;
  name: string;
  tagline: string;
  projectUrl: string;
  logo: string;
  tools: string[];
  userId: number;
  videoUrl: string;
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
  socialLinks: socialLinkType[];
  projects: projectType[];
  workExperience: ExperienceType[];
  education: EducationType[];
  certifications: CertificationType[];
};
export type ExperienceType = {
  id: number;
} & AddExperienceType;
export type EducationType = {
  id: number;
} & AddEducationType;
export type CertificationType = {
  id: number;
} & AddCertificationType;

export type AddCertificationType = {
  name: String;
  issuedBy: String;
  issueMonth: String;
  issueYear: String;
  expirationMonth: String;
  expirationYear: String | number;
};
export type AddExperienceType = {
  company: string;
  companyWebsite: string;
  title: string;
  description: string;
  fromMonth: string;
  fromYear: string;
  toMonth: string;
  toYear: string;
  isCurrentlyWorking: boolean;
};
export type AddEducationType = {
  school: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate: string;
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
  addSocialLink: (socialLinks: { key: string; url: string }[]) => void;
  addProject: (formData: FormData) => void;
  deleteProject: (projectId: number) => void;
  getProject: (projectId: string) => Promise<projectType>;
  updateProject: (formData: FormData, projectId: number | undefined) => void;
  addExperience: (formData: AddExperienceType) => void;
  addEducation: (formData: AddEducationType) => void;
  fetchExperience: (expId: number | string) => Promise<ExperienceType | null>;
  editExperience: (formData: AddExperienceType, expId: number | string) => void;
  deleteExperience: (expId: number | string) => void;
};
