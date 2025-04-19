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
