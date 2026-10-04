import { githubAdapter } from "./github";
import { instagramAdapter } from "./instagram";
import { linkedinAdapter } from "./linkedin";
import { websiteAdapter } from "./website";
import type { LiveSourceAdapter } from "../types";

export const adapters: Record<string, LiveSourceAdapter> = {
  github: githubAdapter,
  instagram: instagramAdapter,
  linkedin: linkedinAdapter,
  website: websiteAdapter,
};

export {
  githubAdapter,
  instagramAdapter,
  linkedinAdapter,
  websiteAdapter,
};
