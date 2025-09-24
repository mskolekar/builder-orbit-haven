import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function shortenAfterDash(value: string): string {
  if (typeof value !== "string") return value as unknown as string;
  const dashIdx = value.indexOf("-");
  if (dashIdx === -1) return value;
  const after = value.slice(dashIdx + 1);
  const digits = (after.match(/\d/g) || []).join("");
  const firstFive = digits.slice(0, 5);
  if (!firstFive) return value.slice(0, dashIdx + 1); // keep prefix and dash if no digits
  return `${value.slice(0, dashIdx)}-${firstFive}`;
}
