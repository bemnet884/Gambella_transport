export type Role = "clerk" | "supervisor";

export interface Driver {
  id?: string;
  licenseNumber: string;
  fullNameAmharic?: string;
  fullNameEnglish?: string;
  issueDate?: string | Date;
  expiryDate?: string | Date;
  region?: string;
  status?: string;
}
