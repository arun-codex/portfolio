export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  verificationUrl?: string;
  status: "verified" | "pending";
}

/**
 * Add certifications here as they are earned.
 * Each entry must use real, verifiable credentials only.
 */
export const certifications: Certification[] = [
  {
    id: "google-intro-generative-ai-2026",
    name: "Introduction to Generative AI",
    issuer: "Google",
    date: "Feb 2026",
    verificationUrl:
      "https://www.skills.google/public_profiles/28c98619-745d-4f60-ac6e-900f1f52afff/badges/21915333",
    status: "verified",
  },
];
