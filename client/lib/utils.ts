import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function shortenAfterDash(value: string): string {
  if (typeof value !== "string") return value as unknown as string;
  return value.replace(/-(\d{6,})/g, (_match, digits: string) => `-${digits.slice(0, 5)}`);
}
