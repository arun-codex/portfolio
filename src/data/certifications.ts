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
export const certifications: Certification[] = [];
