const hostname = process.env.NEXT_PUBLIC_WORDPRESS_HOSTNAME;

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getURL(path = "") {
  const isExternal = path.includes("http");

  if (isExternal) {
    const url = new URL(path);
    if (url.hostname === hostname) {
      return url.pathname;
    }
  }

  return `${path || "/"}`;
}
