export type signupFormData =  {
    username: string;
    email: string;
    password: string;
}
export type useAppType = {
    claimedUsername: string;
    setClaimedUsername: (username: string) => void;
    signup: (formData: signupFormData) => void;
    searchUsername: (username: string) => Promise<Boolean>
}