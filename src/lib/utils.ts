import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const personalPronounsList = [
  {
    value: "he_him",
    label: "he/him",
  },
  {
    value: "she_her",
    label: "she/her",
  },
  {
    value: "they_their",
    label: "they/their",
  },
  {
    value: "prefer_not_to_say",
    label: "Prefer not to say",
  },
];

export const status = [
  {
    value: "open",
    label: "Open to work",
  },
  {
    value: "hiring",
    label: "Hiring",
  },
];

export const platforms = [
  { name: "GitHub", key: "GITHUB", svg: "/icons/github.png" },
  { name: "Dribbble", key: "DRIBBLE", svg: "/icons/dribbble.png" },
  { name: "Medium", key: "MEDIUM", svg: "/icons/medium.png" },
  { name: "X", key: "X", svg: "/icons/x.png" },
  { name: "LinkedIn", key: "LINKEDIN", svg: "/icons/linkedin.png" },
  { name: "YouTube", key: "YOUTUBE", svg: "/icons/youtube.png" },
  { name: "Figma", key: "FIGMA", svg: "/icons/figma.png" },
  { name: "Instagram", key: "INSTAGRAM", svg: "/icons/instagram.png" },
  { name: "Facebook", key: "FACEBOOK", svg: "/icons/facebook.png" },
  { name: "Threads", key: "THREADS", svg: "/icons/threads.png" },
  { name: "Gumroad", key: "GUMROAD", svg: "/icons/gumroad.png" },
];
