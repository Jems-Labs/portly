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
  volunteerExperience: VolunteeringType[];
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
  name: string;
  certificationUrl: string;
  issuedBy: string;
  issueMonth: string;
  issueYear: string | number;
  expirationMonth: string;
  expirationYear: string | number;
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

export type AddVoluteeringType = {
  role: string;
  organization: string;
  organizationWebsite: string;
  fromMonth: string;
  fromYear: string | number;
  isCurrentlyWorking: boolean;
  toMonth: string;
  toYear: string | number;
  description: string;
};
export type VolunteeringType = {
  id: number;
} & AddVoluteeringType;

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
  fetchEducation: (eduId: number | string) => Promise<EducationType | null>;
  editEducation: (formData: AddEducationType, eduId: number | string) => void;
  deleteEducation: (eduId: number | string) => void;
  addCertification: (formData: AddCertificationType) => void;
  fetchCertificate: (
    cerId: string | number
  ) => Promise<CertificationType | null>;
  editCertificate: (
    formData: AddCertificationType,
    cerId: number | string
  ) => void;
  deleteCertificate: (cerId: number | string) => void;
  addVolunteering: (formData: AddVoluteeringType) => void;
  fetchVolunteerExperience: (
    id: string | number
  ) => Promise<VolunteeringType | null>;
  editVolunteerExperience: (
    formData: AddVoluteeringType,
    id: string | number
  ) => void;
  deleteVolunteerExperience: (id: string | number) => void;
  getUser: (username: string) => Promise<UserType | null>
};
