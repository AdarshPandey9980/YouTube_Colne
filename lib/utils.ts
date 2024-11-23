import { clsx, type ClassValue } from "clsx"
import { json } from "stream/consumers"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const parseStringify = (value: any) => {
  return JSON.parse(JSON.stringify(value))
}
